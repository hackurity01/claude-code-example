import { Task, Priority } from "@/types";

/**
 * 업무를 날짜순으로 정렬한다.
 * BUG: 문자열 비교를 사용하여 ISO 형식이 아닌 날짜에서 오동작한다.
 * 시드 데이터 중 "2026-4-30" (0 없는 형식)이 이 버그를 트리거한다.
 */
export function sortByDate(
  tasks: Task[],
  order: "asc" | "desc" = "desc"
): Task[] {
  return [...tasks].sort((a, b) => {
    if (order === "desc") return a.createdAt > b.createdAt ? -1 : 1;
    return a.createdAt < b.createdAt ? -1 : 1;
  });
}

export function sortByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<Priority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };
  return [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "대기",
    in_progress: "진행 중",
    completed: "완료",
  };
  return labels[status] || status;
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    low: "낮음",
    medium: "보통",
    high: "높음",
  };
  return labels[priority] || priority;
}

export function changePriority(task: Task, newPriority: Priority): Task {
  return { ...task, priority: newPriority };
}
