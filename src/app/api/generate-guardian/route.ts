import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  GUARDIAN_SYSTEM_PROMPT,
  GUARDIAN_JSON_SCHEMA,
  buildUserPrompt,
} from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthYear, birthMonth, birthDay, calendarType, gender, birthTime } =
      body;

    if (!birthYear || !birthMonth || !birthDay || !calendarType || !gender) {
      return NextResponse.json(
        { error: "필수 입력값이 누락되었습니다." },
        { status: 400 }
      );
    }

    const userPrompt = buildUserPrompt(
      birthYear,
      birthMonth,
      birthDay,
      calendarType,
      gender,
      birthTime
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: GUARDIAN_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "guardian_result",
          strict: true,
          schema: GUARDIAN_JSON_SCHEMA,
        },
      },
      temperature: 0.85,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI 응답이 비어있습니다." },
        { status: 500 }
      );
    }

    const result = JSON.parse(content);

    // Supabase에 결과 저장 시도
    let dbId: string | null = null;
    try {
      const { supabase } = await import("@/lib/supabase");
      const formattedDate = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
      
      const { data, error } = await supabase
        .from("guardian_results")
        .insert({
          birth_date: formattedDate,
          calendar_type: calendarType,
          gender: gender,
          birth_time: birthTime || null,
          result_json: result,
        })
        .select("id")
        .single();

      if (error) {
        console.warn("Supabase insert warning:", error.message);
      } else if (data) {
        dbId = data.id;
      }
    } catch (dbErr) {
      console.warn("Failed to connect or save to Supabase:", dbErr);
    }

    return NextResponse.json({ result, id: dbId });
  } catch (error: unknown) {
    console.error("Guardian generation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";

    return NextResponse.json(
      { error: `수호알 생성 중 오류가 발생했습니다: ${errorMessage}` },
      { status: 500 }
    );
  }
}
