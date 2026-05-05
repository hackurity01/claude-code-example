import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "@/components/TaskList";
import { Task } from "@/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "완료된 업무",
    description: null,
    status: "completed",
    priority: "low",
    assigneeId: null,
    dueDate: null,
    createdAt: "2026-05-01T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "2",
    title: "진행 중인 업무",
    description: null,
    status: "in_progress",
    priority: "medium",
    assigneeId: null,
    dueDate: null,
    createdAt: "2026-05-02T00:00:00Z",
    updatedAt: "2026-05-02T00:00:00Z",
  },
  {
    id: "3",
    title: "대기 중인 업무",
    description: null,
    status: "pending",
    priority: "high",
    assigneeId: null,
    dueDate: null,
    createdAt: "2026-05-03T00:00:00Z",
    updatedAt: "2026-05-03T00:00:00Z",
  },
];

vi.mock("@/lib/api", () => ({
  fetchTasks: vi.fn(),
}));

import { fetchTasks } from "@/lib/api";

describe("TaskList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchTasks).mockResolvedValue(mockTasks);
  });

  it("shows all tasks by default", async () => {
    render(<TaskList />);
    await waitFor(() => {
      expect(screen.getByText("완료된 업무")).toBeDefined();
      expect(screen.getByText("진행 중인 업무")).toBeDefined();
      expect(screen.getByText("대기 중인 업무")).toBeDefined();
    });
  });

  it("filters completed tasks correctly", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("완료된 업무")).toBeDefined();
    });

    await user.click(screen.getByRole("button", { name: "완료" }));

    expect(screen.getByText("완료된 업무")).toBeDefined();
    expect(screen.queryByText("진행 중인 업무")).toBeNull();
    expect(screen.queryByText("대기 중인 업무")).toBeNull();
  });

  it("filters pending tasks correctly", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("대기 중인 업무")).toBeDefined();
    });

    await user.click(screen.getByRole("button", { name: "대기" }));

    expect(screen.getByText("대기 중인 업무")).toBeDefined();
    expect(screen.queryByText("완료된 업무")).toBeNull();
    expect(screen.queryByText("진행 중인 업무")).toBeNull();
  });
});
