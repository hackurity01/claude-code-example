import { describe, it, expect } from "vitest";
import { formatDate, getStatusLabel, getPriorityLabel } from "@/lib/utils";

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
