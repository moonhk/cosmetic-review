# 🧴 Cosmetic Review - AI 기반 화장품 리뷰 플랫폼

올리브영 인기 화장품 제품의 YouTube 리뷰를 AI로 자동 분석하고 요약해주는 웹 애플리케이션입니다.
Domain: https://cosmetic-review-ix14.vercel.app/

## 📋 프로젝트 개요

이 프로젝트는 화장품 구매 결정에 도움을 주기 위해, YouTube에 올라온 실제 사용자 리뷰를 AI로 분석하여 핵심 내용을 요약해줍니다. 사용자는 제품의 장단점, 추천 의견 등을 빠르게 확인할 수 있습니다.

### 주요 특징

- 🤖 **AI 기반 리뷰 요약**: Groq AI (Llama 3.3 70B)를 사용한 실시간 리뷰 분석
- 📹 **YouTube 통합**: YouTube Data API v3를 통한 실시간 리뷰 영상 검색
- ⚡ **고성능**: TanStack Query를 활용한 효율적인 데이터 페칭 및 캐싱
- 🔖 **북마크 기능**: 관심 제품을 로컬 스토리지에 저장
- 🎨 **모던 UI/UX**: Radix UI + Tailwind CSS로 구현된 반응형 디자인
- 🚀 **서버 사이드 렌더링**: Next.js 15 App Router 기반 최적화된 성능

## ✨ 주요 기능

### 1. 제품 목록 조회

- 올리브영 인기 화장품 제품 리스트 확인
- 브랜드, 카테고리, 가격, 평점 정보 제공
- 페이지네이션 지원

### 2. 제품 상세 정보

- 제품의 자세한 설명 및 이미지
- 실시간 AI 리뷰 분석 버튼
- 북마크 추가/제거 기능

### 3. AI 기반 YouTube 리뷰 분석

- **실시간 검색**: YouTube에서 제품명으로 리뷰 영상 검색
- **AI 요약**: 각 영상의 제목과 설명을 AI로 분석
- **구조화된 정보 제공**:
  - 📝 핵심 요약 (50자 이내)
  - ✅ 장점 리스트
  - ❌ 단점 리스트
  - 💬 리뷰어의 추천 의견

### 4. 캐싱 시스템

- 서버 사이드 메모리 캐시 (기본 1시간 TTL)
- 동일한 제품의 중복 API 요청 방지
- 캐시 통계 및 관리 API 제공

### 5. 북마크 관리

- 브라우저 로컬 스토리지 기반
- 마이페이지에서 북마크한 제품 확인

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.9.3
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.14
- **Component Library**: Radix UI
- **State Management**: TanStack Query 5.90.2
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js (Next.js API Routes)
- **AI Service**: Groq AI (Llama 3.3 70B Versatile)
- **External APIs**:
  - YouTube Data API v3
  - Groq AI API

### DevOps & Tools

- **Linter**: ESLint 9.37.0
- **Formatter**: Prettier 3.6.2
- **Build Tool**: Turbopack (Next.js 15)
- **Version Control**: Git + Commitizen (Conventional Commits)

### UI/UX Components

- Radix UI (Aspect Ratio, Checkbox, Separator, Slot, Toggle)
- Sonner (Toast Notifications)
- Skeleton Loading States
- Responsive Design

## 📁 프로젝트 구조

```
cosmetic-review/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── cache/               # 캐시 관리 API
│   │   │   ├── clear/          # 캐시 삭제
│   │   │   │   └── route.ts
│   │   │   └── stats/          # 캐시 통계
│   │   │       └── route.ts
│   │   ├── products/           # 제품 API
│   │   │   ├── [id]/          # 제품 상세
│   │   │   │   └── route.ts
│   │   │   └── route.ts       # 제품 목록
│   │   └── youtube-reviews/    # YouTube 리뷰 API
│   │       └── [productId]/
│   │           └── route.ts
│   ├── products/                # 제품 페이지
│   │   └── [id]/
│   │       ├── page.tsx        # 제품 상세 페이지
│   │       ├── loading.tsx     # 로딩 UI
│   │       └── not-found.tsx   # 404 페이지
│   ├── mypage/                  # 마이페이지 (북마크)
│   │   └── page.tsx
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   ├── error.tsx                # 에러 페이지
│   └── loading.tsx              # 로딩 페이지
│
├── src/
│   ├── api/                     # API 클라이언트 레이어
│   │   ├── client.ts            # 클라이언트 사이드 fetch
│   │   ├── server.ts            # 서버 사이드 fetch
│   │   ├── groq.ts              # Groq AI API 통신
│   │   └── youtube.ts           # YouTube Data API 통신
│   │
│   ├── components/              # 재사용 가능한 컴포넌트
│   │   ├── error/              # 에러 처리 컴포넌트
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── QueryErrorBoundary.tsx
│   │   │   └── index.ts
│   │   ├── features/           # 기능별 컴포넌트
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductCardSkeleton.tsx
│   │   │   │   ├── ProductDetailSkeleton.tsx
│   │   │   │   ├── ProductInfoSkeleton.tsx
│   │   │   │   └── ProductList.tsx
│   │   │   └── reviews/
│   │   │       ├── AIReviewsSection.tsx
│   │   │       ├── ReviewEmpty.tsx
│   │   │       ├── ReviewError.tsx
│   │   │       ├── ReviewLoading.tsx
│   │   │       └── YoutubeReviewCard.tsx
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   └── Header.tsx
│   │   ├── providers/          # Context Provider
│   │   │   └── Providers.tsx
│   │   ├── shared/             # 공유 컴포넌트
│   │   │   ├── BackButton.tsx
│   │   │   ├── BookmarkButton.tsx
│   │   │   ├── EmptyProductsState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── ProductImage.tsx
│   │   │   ├── ProductInfoCard.tsx
│   │   │   ├── ProductRating.tsx
│   │   │   ├── ProductsGrid.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── index.ts
│   │   └── ui/                 # UI 기본 컴포넌트 (shadcn/ui)
│   │       ├── alert.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── empty.tsx
│   │       ├── skeleton.tsx
│   │       └── ... (기타 UI 컴포넌트)
│   │
│   ├── config/                  # 설정 파일
│   │   ├── api.ts               # API 엔드포인트 설정
│   │   └── queryClient.ts       # React Query 설정
│   │
│   ├── containers/              # 페이지 컨테이너 (비즈니스 로직)
│   │   ├── AIReviewsContainer.tsx
│   │   ├── HomeContainer.tsx
│   │   ├── MyPageContainer.tsx
│   │   └── ProductInfoContainer.tsx
│   │
│   ├── data/                    # Mock 데이터
│   │   └── mockProducts.ts
│   │
│   ├── hooks/                   # Custom Hooks
│   │   ├── useAIReviews.ts
│   │   ├── useBookmarks.ts
│   │   ├── useMyPage.ts
│   │   ├── useProduct.ts
│   │   ├── useProductDetail.ts
│   │   └── useProducts.ts
│   │
│   ├── services/                # 비즈니스 로직 서비스
│   │   ├── ai-summarizer.ts     # AI 요약 서비스
│   │   ├── cache.ts             # 캐시 관리
│   │   └── youtube.ts           # YouTube 검색 서비스
│   │
│   ├── types/                   # TypeScript 타입 정의
│   │   └── product.ts
│   │
│   └── utils/                   # 유틸리티 함수
│       ├── helpers.ts
│       └── queryClient.ts
│
├── public/                      # 정적 파일
│   ├── favicon.ico
│   └── *.svg
│
├── components.json              # shadcn/ui 설정
├── eslint.config.mjs            # ESLint 설정
├── next.config.ts               # Next.js 설정
├── package.json                 # 프로젝트 의존성
├── postcss.config.mjs           # PostCSS 설정
├── tailwind.config.ts           # Tailwind CSS 설정
└── tsconfig.json               # TypeScript 설정
```

## 🚀 프로젝트 실행 방법

### 1. 사전 요구사항

- Node.js 18.x 이상
- npm, yarn, pnpm 또는 bun

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# YouTube Data API v3 키
# https://console.cloud.google.com/apis/credentials 에서 발급
YOUTUBE_API_KEY=your_youtube_api_key_here

# Groq AI API 키
# https://console.groq.com/keys 에서 발급 (무료)
GROQ_API_KEY=your_groq_api_key_here

# 캐시 TTL (초 단위, 기본값: 3600 = 1시간)
CACHE_TTL=3600

# API Base URL (선택사항, 배포 시 자동 설정됨)
# NEXT_PUBLIC_API_URL=https://your-domain.com
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 5. 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드 (Turbopack)
npm run build

# 프로덕션 서버 실행
npm run start

# ESLint 실행
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# Prettier 포맷 체크
npm run format:check

# Commitizen을 사용한 커밋
npm run commit
```

## 🔑 API 키 발급 방법

### YouTube Data API v3

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" → "라이브러리"로 이동
4. "YouTube Data API v3" 검색 및 활성화
5. "사용자 인증 정보" → "사용자 인증 정보 만들기" → "API 키" 선택
6. 생성된 API 키를 `.env.local`의 `YOUTUBE_API_KEY`에 입력

### Groq AI API

1. [Groq Console](https://console.groq.com/)에 접속
2. 계정 생성 또는 로그인
3. "API Keys" 메뉴로 이동
4. "Create API Key" 클릭
5. 생성된 API 키를 `.env.local`의 `GROQ_API_KEY`에 입력

**참고**: Groq AI는 무료로 사용 가능하며, 빠른 추론 속도를 제공합니다.

## 🐛 알려진 이슈 및 해결 방법

### 1. YouTube API 할당량 초과

**문제**: YouTube Data API는 하루 10,000 units의 무료 할당량이 있습니다. 초과 시 요청이 실패합니다.

**해결 방법**:

- 캐싱 시스템이 자동으로 중복 요청을 방지합니다
- 필요 시 `.env.local`의 `CACHE_TTL`을 늘려서 캐시 유지 시간을 연장하세요
- Google Cloud Console에서 할당량 증가를 요청하거나, 유료 플랜으로 전환할 수 있습니다

### 2. Groq AI Rate Limit

**문제**: Groq AI 무료 플랜은 분당 요청 수에 제한이 있습니다.

**해결 방법**:

- 에러 발생 시 친절한 메시지가 표시됩니다: "AI 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
- 잠시 후 다시 시도하거나, 캐싱된 데이터를 활용하세요

### 3. 환경 변수 미설정

**문제**: API 키가 설정되지 않으면 YouTube 검색 및 AI 요약이 작동하지 않습니다.

**해결 방법**:

- `.env.local` 파일을 확인하고 모든 필수 환경 변수가 설정되어 있는지 확인하세요
- 개발 서버를 재시작하세요 (`npm run dev`)

### 4. 캐시 관련 문제

**문제**: 오래된 데이터가 표시되거나 캐시가 예상대로 작동하지 않습니다.

**해결 방법**:

- 캐시 삭제 API 사용: `POST http://localhost:3000/api/cache/clear`
- 캐시 통계 확인: `GET http://localhost:3000/api/cache/stats`

### 5. 빌드 에러

**문제**: TypeScript 또는 ESLint 에러로 인한 빌드 실패

**해결 방법**:

```bash
# 린트 에러 자동 수정
npm run lint:fix

# 포맷팅 적용
npm run format
```

### 6. 올리브영 실제 데이터 사용 불가

**문제**: 올리브영 웹사이트의 크롤링 방지 정책 및 저작권 문제로 인해 실제 데이터를 자동으로 수집할 수 없습니다.

**현재 상황**:

- 프로젝트는 `src/lib/data/mockProducts.ts`에 정의된 Mock 데이터를 사용합니다
- Mock 데이터는 데모 및 개발 목적으로만 제공됩니다
- 실제 올리브영 제품 정보는 수동으로 입력되었습니다

**향후 개선 방안**:

- 올리브영 공식 API가 제공될 경우 연동 가능
- 자체 데이터베이스 구축 및 수동 데이터 관리
- 다른 공개 API 또는 데이터 소스 활용 검토
- 사용자가 직접 제품 정보를 추가할 수 있는 기능 구현

**TO-DO (진행 예정 작업)**:

🔧 **Chrome Extension 개발 계획**

- **목표**: 올리브영 웹사이트에서 직접 제품 리뷰를 확인할 수 있는 브라우저 확장 프로그램 개발
- **주요 기능**:
  - 올리브영 사이트에서 제품명 텍스트 드래그/선택
  - 드래그한 제품명으로 자동 검색 활성화
  - 사이드 패널에 YouTube AI 리뷰 실시간 표시
  - 기존 웹 애플리케이션의 `/api/youtube-reviews` API 활용
  - 북마크 및 최근 검색 기록 저장
- **기술 스택 (예정)**:
  - Chrome Extension Manifest V3
  - Content Script (텍스트 선택 감지)
  - Side Panel API (Chrome 114+)
  - 기존 Next.js API와 통신
- **효과**: 올리브영 쇼핑 중 별도 탭 이동 없이 실시간 리뷰 확인 가능

**참고**: YouTube 리뷰 검색 및 AI 요약 기능은 Mock 데이터에서도 정상적으로 작동합니다.

## 🌐 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에서 GitHub 저장소 연결
2. 환경 변수 설정 (`YOUTUBE_API_KEY`, `GROQ_API_KEY`)
3. 자동 배포 완료

환경 변수는 Vercel 대시보드의 "Settings" → "Environment Variables"에서 설정할 수 있습니다.

## 📄 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 🤝 기여

버그 리포트, 기능 제안, Pull Request는 언제나 환영합니다!

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.
