"use client";

import { ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * React Query와 통합된 ErrorBoundary
 * - QueryErrorResetBoundary로 감싸서 쿼리 에러 리셋 기능 제공
 * - throwOnError와 함께 사용하여 선언적 에러 처리
 */
export function QueryErrorBoundary({
  children,
  fallback,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={fallback} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
