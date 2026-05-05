# TaskFlow

팀 업무를 생성, 할당, 추적하는 웹 앱입니다.

## 기술 스택

- **프론트엔드**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **백엔드**: Next.js API Routes
- **데이터베이스**: Prisma + SQLite
- **테스트**: Vitest + React Testing Library

## 시작하기

### 사전 요구사항

- Node.js 20+
- npm 10+

### 설치 & 실행

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 테스트

```bash
npm test
```

## 프로젝트 구조

```
src/
├── app/          # 페이지 & API 라우트
├── components/   # React 컴포넌트
├── lib/          # 유틸리티 & Prisma 클라이언트
└── types/        # TypeScript 타입 정의
```

## 주요 기능

- 업무 CRUD (생성, 조회, 수정, 삭제)
- 상태별 필터링 (대기, 진행 중, 완료)
- 정렬 (최신순, 오래된순, 우선순위순)
- 담당자 할당
- 대시보드 통계
