import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types";

const mockTask: Task = {
  id: "1",
  title: "테스트 업무",
  description: "테스트 설명",
  status: "pending",
  priority: "high",
  assigneeId: "user-1",
  assignee: { id: "user-1", name: "Alice", email: "alice@test.com", avatar: null, createdAt: "2026-01-01" },
  dueDate: "2026-05-15",
  createdAt: "2026-05-01",
  updatedAt: "2026-05-01",
};

describe("TaskCard", () => {
  it("renders task title", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("테스트 업무")).toBeDefined();
  });

  it("renders status badge", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("대기")).toBeDefined();
  });

  it("renders assignee name", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByTitle("Alice")).toBeDefined();
  });
});
