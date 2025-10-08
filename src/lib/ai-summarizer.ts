"use server";

/**
 * AI를 사용한 YouTube 리뷰 요약
 * Ollama 로컬 모델을 사용하여 영상의 제목과 설명을 분석 (완전 무료!)
 */

export interface ReviewSummary {
  summary: string;
  pros?: string[];
  cons?: string[];
  recommendation?: string;
}

export interface ReviewInput {
  title: string;
  description: string;
  productName: string;
  brandName: string;
}

interface VideoSummaryInput {
  title: string;
  description: string;
  productName: string;
  brandName: string;
}

interface VideoSummaryOutput {
  summary: string;
  pros?: string[];
  cons?: string[];
  recommendation?: string;
}

/**
 * 여러 리뷰를 AI로 요약
 */
export async function summarizeMultipleReviews(
  reviews: ReviewInput[]
): Promise<ReviewSummary[]> {
  try {
    // 각 리뷰를 병렬로 요약
    const summaryPromises = reviews.map((review) =>
      summarizeWithOllama(review)
    );

    const summaries = await Promise.all(summaryPromises);
    return summaries;
  } catch (error) {
    console.error("Error summarizing reviews:", error);
    return reviews.map(() => ({
      summary: "요약을 생성하는 중 오류가 발생했습니다.",
    }));
  }
}

/**
 * Ollama 로컬 모델을 사용한 리뷰 요약
 */
async function summarizeWithOllama(
  input: VideoSummaryInput
): Promise<VideoSummaryOutput> {
  const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

  try {
    const prompt = `제품: ${input.brandName} ${input.productName}
리뷰 제목: ${input.title}
리뷰 설명: ${input.description}

위 리뷰를 분석하여 다음 형식으로 답변하세요:

요약: [50자 이내로 핵심 내용을 간결하게 요약]
장점: [간결한 뉴스 스타일로 핵심만. 예: 보습력 우수, 흡수력 탁월]
단점: [간결한 뉴스 스타일로 핵심만. 예: 가격대 높음, 향 강함]
추천: [리뷰어 말투로 자연스럽게. 예: 써보니까 정말 좋더라구요, 완전 추천해요]

장점/단점이 없으면 해당 항목은 생략하세요.`;

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma2:2b", // 또는 'llama3.2:3b', 'qwen2.5:3b'
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 300,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.response?.trim() || "";

    return extractJsonFromText(text);
  } catch (error) {
    console.error("Error with Ollama:", error);
    return {
      summary:
        "로컬 AI 모델에 연결할 수 없습니다. Ollama가 실행 중인지 확인하세요.",
    };
  }
}

/**
 * 텍스트에서 구조화된 데이터 추출
 */
function extractJsonFromText(text: string): VideoSummaryOutput {
  const result: VideoSummaryOutput = {
    summary: "",
  };

  try {
    // 요약 추출
    const summaryMatch = text.match(
      /요약:\s*([\s\S]+?)(?=\n|장점:|단점:|추천:|$)/
    );
    if (summaryMatch) {
      result.summary = summaryMatch[1].trim();
    }

    // 장점 추출
    const prosMatch = text.match(/장점:\s*([\s\S]+?)(?=\n단점:|추천:|$)/);
    if (prosMatch) {
      const prosText = prosMatch[1].trim();
      result.pros = prosText
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .slice(0, 3); // 최대 3개
    }

    // 단점 추출
    const consMatch = text.match(/단점:\s*([\s\S]+?)(?=\n추천:|$)/);
    if (consMatch) {
      const consText = consMatch[1].trim();
      result.cons = consText
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .slice(0, 3); // 최대 3개
    }

    // 추천 추출
    const recommendationMatch = text.match(/추천:\s*([\s\S]+?)$/);
    if (recommendationMatch) {
      result.recommendation = recommendationMatch[1].trim();
    }

    // 요약이 비어있으면 기본값 설정
    if (!result.summary) {
      result.summary = text.substring(0, 100) || "요약을 생성할 수 없습니다.";
    }

    return result;
  } catch (error) {
    console.error("Error extracting data from text:", error);
    return {
      summary: text.substring(0, 100) || "요약을 생성할 수 없습니다.",
    };
  }
}
