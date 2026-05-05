import { Task, Priority } from "@/types";

/**
 * 업무를 날짜순으로 정렬한다.
 */
export function sortByDate(
  tasks: Task[],
  order: "asc" | "desc" = "desc"
): Task[] {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
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
