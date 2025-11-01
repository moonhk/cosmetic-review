// React Query 공통 옵션 (클라이언트)
export const QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5분
  gcTime: 10 * 60 * 1000, // 10분
} as const;

/**
 * 클라이언트 컴포넌트 전용 fetch 함수
 * - 상대 경로 사용 (브라우저가 자동으로 도메인 추가)
 * - React Query가 캐싱 담당
 */
export async function fetchFromClientAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }

  return response.json();
}
