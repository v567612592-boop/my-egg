import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache-busting comment: 2026-07-01 11:21:00 UTC

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imagePromptSummary, resultId } = body;

    if (!imagePromptSummary) {
      return NextResponse.json(
        { error: "이미지 생성 요약이 필요합니다." },
        { status: 400 }
      );
    }

    const designSummary = `Guardian Egg: ${imagePromptSummary.guardianEgg}
Guardian Character: ${imagePromptSummary.guardianCharacter}
Representative Color: ${imagePromptSummary.representativeColor}
Symbol Pattern: ${imagePromptSummary.symbolPattern}
Overall Mood: ${imagePromptSummary.overallMood}
Character Visual: ${imagePromptSummary.characterVisual}
Egg Visual: ${imagePromptSummary.eggVisual}
Image Style: ${imagePromptSummary.imageStyle}`;

    const fullPrompt = `${designSummary}

The text above is a design summary for a brand-new image generation request.
Use the written summary above as the only design source.
Do not treat this as an image editing request. Do not edit or modify any existing image.
Create a completely new original illustration based only on the summary above.
Create a single cute illustration of one original guardian mascot character and one original guardian egg together.
The illustration should look like a bright early-2000s Japanese shoujo magical-girl anime promotional image, a kids magazine character card, or a collectible sticker-style anime merchandise illustration.
The overall image should feel:
sparkly, magical, cute, colorful, polished, charming, collectible, soft and dreamy.
Style requirements:
early-2000s Japanese shoujo magical-girl anime feeling, cute mascot illustration, bright pastel magical background, colorful sparkles and soft glowing stars, clean 2D anime line art, bold dark outlines, smooth cel shading, polished anime-style coloring, big expressive anime eyes, cute collectible illustration feeling.
Not realistic, not 3D, not painterly, not dark fantasy, not modern mobile game style, not webtoon style, not vtuber style.
Composition:
vertical composition preferred, one small guardian mascot character on the left, one very large guardian egg on the right, the mascot slightly overlaps the egg, the egg should be about 2 to 2.5 times taller than the mascot, soft pastel magical background with pink lavender blue and white glow, add floating stars sparkles and magical light effects, no text, no logo, no label, no nameplate.
Character direction: one tiny fairy-like guardian mascot, very large head and very small body, cute mascot proportions, floating beside the egg, happy open cheerful expression, large anime eyes with simple glossy highlights, adorable magical and cleanly designed appearance. May have tiny fairy-like wings and a soft magical accessory.
Egg direction: one large oval guardian egg, cute anime-style surface pattern, glossy anime-style highlights, decorative but still cute and toy-like, not realistic, not luxury-jewel rendering. The egg should include a cracked line across the middle, a bold white zigzag crack across the center, thick black decorative bands above and below the crack, small dot or lace-like motifs along the bands, large clear symbols on the egg surface.
Avoid: realistic rendering, 3D rendering, painterly texture, dark fantasy, gothic realism, mature proportions, complex luxury ornament, text, logo, label, modern mobile game art, webtoon style, vtuber style, gritty shading, muted colors.`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
      n: 1,
      size: "1024x1536",
    });

    const imageData = response.data?.[0];
    let imageSrc = "";

    if (imageData?.b64_json) {
      imageSrc = `data:image/png;base64,${imageData.b64_json}`;
    } else if (imageData?.url) {
      imageSrc = imageData.url;
    }

    if (!imageSrc) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    // 만약 데이터베이스 레코드 ID가 있다면 DB의 image_url 컬럼에 이 이미지 주소를 업데이트
    if (resultId) {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { error: updateError } = await supabase
          .from("guardian_results")
          .update({ image_url: imageSrc })
          .eq("id", resultId);
        
        if (updateError) {
          console.warn("Failed to update image in Supabase:", updateError.message);
        }
      } catch (dbErr) {
        console.warn("Failed to connect to Supabase for image update:", dbErr);
      }
    }

    return NextResponse.json({
      image: imageSrc,
    });
  } catch (error: unknown) {
    console.error("Image generation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";

    return NextResponse.json(
      { error: `이미지 생성 중 오류가 발생했습니다: ${errorMessage}` },
      { status: 500 }
    );
  }
}
