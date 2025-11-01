"use server";

/**
 * Groq API 통신 계층
 * 순수한 API 호출만 담당
 */

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GroqChatRequest {
  model: string;
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface GroqChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Groq API로 채팅 완성 요청
 */
export async function createGroqChatCompletion(
  request: GroqChatRequest
): Promise<GroqChatResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key is not configured");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Groq API error:", response.status, errorData);

    // Rate Limit 초과 시
    if (response.status === 429) {
      throw new Error(
        "AI 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
      );
    }

    throw new Error(`Groq API error: ${response.status}`);
  }

  return response.json();
}
