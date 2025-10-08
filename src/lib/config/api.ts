// API 관련 공통 설정

// 서버에서 실행 시 절대 URL 필요
export const getBaseUrl = () => {
  // 환경 변수가 있으면 사용
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Vercel 환경
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 로컬 개발 환경
  return "http://localhost:3000";
};

// API 엔드포인트
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  PRODUCT: (id: string) => `/api/products/${id}`,
} as const;

// 공통 fetch 옵션
export const REVALIDATE_TIME = 300; // 5분
