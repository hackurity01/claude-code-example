# TaskFlow 프로젝트 규칙

## 프로젝트 개요

팀 업무 관리 웹 앱. Next.js 15 + TypeScript + Prisma + SQLite.

## 코딩 규칙

- TypeScript strict mode 사용. `any` 타입 금지
- 컴포넌트는 함수형만 사용 (class 컴포넌트 금지)
- API 응답은 반드시 타입을 정의하고 검증
- 새 기능 추가 시 반드시 테스트 코드 포함
- `console.log`는 프로덕션 코드에 남기지 않음

## 커밋 규칙

- Conventional Commits 형식: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- 커밋 메시지는 한국어로 작성

## 테스트

- Vitest 사용
- 테스트 파일은 `__tests__/` 디렉토리에 소스 구조를 미러링
- `npm test`로 전체 테스트 실행

## 파일 구조

- `src/app/` — 페이지 & API 라우트
- `src/components/` — React 컴포넌트
- `src/lib/` — 유틸리티 & 공통 라이브러리
- `src/types/` — TypeScript 타입 정의
