---
name: review-test-doc
description: 코드 리뷰 → 테스트 작성 → 문서화를 자동으로 수행하는 하네스. 코드 리뷰, 리뷰 및 테스트, 코드 점검, 하네스 실행 요청 시 사용.
---

# Review → Test → Doc 하네스

지정된 파일에 대해 3단계 파이프라인을 실행한다.

## Phase 1: 코드 리뷰

1. `.claude/agents/code-reviewer.md`의 역할과 원칙을 읽고 따른다
2. 대상 파일을 분석하여 이슈를 찾는다
3. 리뷰 결과를 code-reviewer의 출력 형식에 맞게 정리한다

## Phase 2: 테스트 작성

1. `.claude/agents/test-writer.md`의 역할과 원칙을 읽고 따른다
2. Phase 1에서 발견된 이슈를 커버하는 테스트를 작성한다
3. 기존 테스트가 없는 영역에 대한 기본 테스트도 추가한다
4. `npx vitest run`으로 실행하여 모든 테스트가 통과하는지 확인한다

## Phase 3: 문서화

1. `.claude/agents/doc-writer.md`의 역할과 원칙을 읽고 따른다
2. Phase 1 리뷰 결과 + Phase 2 테스트 결과를 종합한다
3. `docs/reviews/` 디렉토리에 마크다운 파일로 저장한다

## 실행 후

각 Phase의 결과를 요약하여 사용자에게 보고한다:
- 발견된 이슈 수 (높음/중간/낮음)
- 작성된 테스트 수 및 통과 여부
- 문서 저장 위치

$ARGUMENTS
