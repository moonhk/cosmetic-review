"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { queryClientConfig } from "@/lib/queryClient.config";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 클라이언트 전용 QueryClient 생성
  // 서버와 동일한 설정 사용으로 일관성 유지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryClientConfig,
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
