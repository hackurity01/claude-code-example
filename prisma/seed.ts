import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  const alice = await prisma.user.create({
    data: {
      name: "Alice Kim",
      email: "alice@taskflow.dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Park",
      email: "bob@taskflow.dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  });

  // Tasks with varied statuses, priorities, dates
  await prisma.task.createMany({
    data: [
      {
        title: "프로젝트 README 작성",
        description: "프로젝트 구조와 실행 방법을 문서화합니다.",
        status: "completed",
        priority: "low",
        assigneeId: alice.id,
        dueDate: new Date("2026-04-20"),
        createdAt: new Date("2026-04-15T09:00:00Z"),
      },
      {
        title: "로그인 페이지 디자인",
        description: "Figma 디자인을 기반으로 로그인 UI를 구현합니다.",
        status: "in_progress",
        priority: "high",
        assigneeId: bob.id,
        dueDate: new Date("2026-05-10"),
        createdAt: new Date("2026-04-28T14:30:00Z"),
      },
      {
        title: "API 에러 핸들링 개선",
        description: "모든 API 라우트에 일관된 에러 응답 형식을 적용합니다.",
        status: "pending",
        priority: "medium",
        assigneeId: alice.id,
        dueDate: new Date("2026-05-15"),
        createdAt: new Date("2026-05-01T10:00:00Z"),
      },
      {
        title: "다크 모드 지원",
        description: "Tailwind의 dark 클래스를 활용한 다크 모드를 추가합니다.",
        status: "pending",
        priority: "low",
        assigneeId: null,
        dueDate: null,
        createdAt: new Date("2026-05-02T16:45:00Z"),
      },
      {
        title: "성능 최적화",
        description:
          "업무 목록 페이지의 렌더링 성능을 개선합니다. React.memo 적용.",
        status: "in_progress",
        priority: "high",
        assigneeId: bob.id,
        dueDate: new Date("2026-05-08"),
        createdAt: new Date("2026-4-30"),
      },
    ],
  });

  console.log("Seed data created: 2 users, 5 tasks");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
