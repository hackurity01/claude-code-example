import { describe, it, expect } from "vitest";
import {
  formatDate,
  getStatusLabel,
  getPriorityLabel,
  changePriority,
} from "@/lib/utils";

describe("formatDate", () => {
  it("formats ISO date string to Korean format", () => {
    const result = formatDate("2026-05-01");
    expect(result).toContain("2026");
    expect(result).toContain("5");
  });
});

describe("getStatusLabel", () => {
  it("returns Korean label for pending", () => {
    expect(getStatusLabel("pending")).toBe("대기");
  });

  it("returns Korean label for in_progress", () => {
    expect(getStatusLabel("in_progress")).toBe("진행 중");
  });

  it("returns Korean label for completed", () => {
    expect(getStatusLabel("completed")).toBe("완료");
  });
});

describe("getPriorityLabel", () => {
  it("returns Korean label for priorities", () => {
    expect(getPriorityLabel("high")).toBe("높음");
    expect(getPriorityLabel("medium")).toBe("보통");
    expect(getPriorityLabel("low")).toBe("낮음");
  });
});

describe("changePriority", () => {
  const mockTask = {
    id: "1",
    title: "Test",
    description: null,
    status: "pending" as const,
    priority: "low" as const,
    assigneeId: null,
    dueDate: null,
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01",
  };

  it("changes priority from low to high", () => {
    const result = changePriority(mockTask, "high");
    expect(result.priority).toBe("high");
  });

  it("returns a new object, does not mutate original", () => {
    const result = changePriority(mockTask, "high");
    expect(result).not.toBe(mockTask);
    expect(mockTask.priority).toBe("low");
  });

  it("preserves all other fields", () => {
    const result = changePriority(mockTask, "medium");
    expect(result.id).toBe(mockTask.id);
    expect(result.title).toBe(mockTask.title);
    expect(result.status).toBe(mockTask.status);
  });
});
