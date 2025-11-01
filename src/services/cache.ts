/**
 * 간단한 메모리 캐시 구현
 * - Vercel 서버리스 환경에서도 작동
 * - TTL(Time To Live) 지원
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>>;
  private cleanupInterval: NodeJS.Timeout | null;

  constructor() {
    this.cache = new Map();
    this.cleanupInterval = null;
    this.startCleanup();
  }

  /**
   * 캐시에 데이터 저장
   * @param key 캐시 키
   * @param data 저장할 데이터
   * @param ttl TTL (초 단위, 기본: 1시간)
   */
  set<T>(key: string, data: T, ttl: number = 3600): void {
    const expiresAt = Date.now() + ttl * 1000;
    this.cache.set(key, { data, expiresAt });
  }

  /**
   * 캐시에서 데이터 가져오기
   * @param key 캐시 키
   * @returns 캐시된 데이터 또는 null
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // 만료된 캐시는 삭제하고 null 반환
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * 캐시에서 데이터 삭제
   * @param key 캐시 키
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 모든 캐시 삭제
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 캐시 존재 여부 확인
   * @param key 캐시 키
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // 만료된 캐시는 false 반환
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * 만료된 캐시 자동 정리 (5분마다)
   */
  private startCleanup(): void {
    // 서버리스 환경에서는 cleanup이 필요 없을 수 있음
    if (typeof window === "undefined" && !this.cleanupInterval) {
      this.cleanupInterval = setInterval(
        () => {
          const now = Date.now();
          for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
              this.cache.delete(key);
            }
          }
        },
        5 * 60 * 1000
      ); // 5분
    }
  }

  /**
   * 캐시 통계
   */
  getStats() {
    const now = Date.now();
    let activeCount = 0;
    let expiredCount = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expiredCount++;
      } else {
        activeCount++;
      }
    }

    return {
      total: this.cache.size,
      active: activeCount,
      expired: expiredCount,
    };
  }
}

// 싱글톤 인스턴스
const reviewCache = new MemoryCache();

export default reviewCache;
