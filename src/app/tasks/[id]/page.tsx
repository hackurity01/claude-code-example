"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types";
import { fetchTask, updateTask, deleteTask } from "@/lib/api";
import { formatDate, getPriorityLabel } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import UserAvatar from "@/components/UserAvatar";

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask(id)
      .then(setTask)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;
    const updated = await updateTask(task.id, { status: newStatus as Task["status"] });
    setTask(updated);
  };

  const handleDelete = async () => {
    if (!task || !confirm("이 업무를 삭제하시겠습니까?")) return;
    await deleteTask(task.id);
    router.push("/tasks");
  };

  if (loading) {
    return <div className="text-gray-500">로딩 중...</div>;
  }

  if (!task) {
    return <div className="text-red-500">업무를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg bg-white p-6 shadow-sm border">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>

        {task.description && (
          <p className="mt-4 text-gray-600">{task.description}</p>
        )}

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">우선순위</span>
            <span className="font-medium">{getPriorityLabel(task.priority)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">담당자</span>
            <span className="font-medium flex items-center gap-2">
              {task.assignee ? (
                <>
                  <UserAvatar name={task.assignee.name} avatar={task.assignee.avatar} />
                  {task.assignee.name}
                </>
              ) : (
                "미배정"
              )}
            </span>
          </div>
          {task.dueDate && (
            <div className="flex justify-between">
              <span className="text-gray-500">마감일</span>
              <span className="font-medium">{formatDate(task.dueDate)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">생성일</span>
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {task.status !== "pending" && (
            <button
              onClick={() => handleStatusChange("pending")}
              className="rounded-lg bg-yellow-100 px-3 py-1.5 text-sm text-yellow-700 hover:bg-yellow-200"
            >
              대기로 변경
            </button>
          )}
          {task.status !== "in_progress" && (
            <button
              onClick={() => handleStatusChange("in_progress")}
              className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-200"
            >
              진행으로 변경
            </button>
          )}
          {task.status !== "completed" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="rounded-lg bg-green-100 px-3 py-1.5 text-sm text-green-700 hover:bg-green-200"
            >
              완료로 변경
            </button>
          )}
          <button
            onClick={handleDelete}
            className="ml-auto rounded-lg bg-red-100 px-3 py-1.5 text-sm text-red-700 hover:bg-red-200"
          >
            삭제
          </button>
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-4 text-sm text-gray-500 hover:text-gray-700"
      >
        &larr; 돌아가기
      </button>
    </div>
  );
}
