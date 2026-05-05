import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: { assignee: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tasks);
}

// BUG 3: assigneeId를 data에 포함하지 않음
export async function POST(request: Request) {
  const body = await request.json();
  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description || null,
      status: body.status || "pending",
      priority: body.priority || "medium",
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      // assigneeId: body.assigneeId || null,  // 누락!
    },
    include: { assignee: true },
  });
  return NextResponse.json(task, { status: 201 });
}
