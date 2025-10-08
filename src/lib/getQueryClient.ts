import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { queryClientConfig } from "./queryClient.config";

// 서버 컴포넌트에서 사용할 QueryClient 생성
// cache를 사용하여 요청당 하나의 인스턴스만 생성
const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: queryClientConfig,
    })
);

export default getQueryClient;
