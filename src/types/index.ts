export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  assigneeId: string | null;
  assignee?: User | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilter = "all" | "pending" | "in_progress" | "completed";
export type TaskSort = "newest" | "oldest" | "priority";
export type Priority = "low" | "medium" | "high";
