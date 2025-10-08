import { DefaultOptions } from "@tanstack/react-query";

// 서버와 클라이언트에서 공통으로 사용할 QueryClient 설정
export const queryClientConfig: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false,
    retry: 1,
  },
};
