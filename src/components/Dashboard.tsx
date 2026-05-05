"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types";
import { fetchTasks } from "@/lib/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-500">로딩 중...</div>;
  }

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-lg bg-white p-4 shadow-sm border">
        <div className="text-2xl font-bold text-gray-900">{total}</div>
        <div className="text-sm text-gray-500">전체 업무</div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm border">
        <div className="text-2xl font-bold text-yellow-600">{pending}</div>
        <div className="text-sm text-gray-500">대기</div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm border">
        <div className="text-2xl font-bold text-blue-600">{inProgress}</div>
        <div className="text-sm text-gray-500">진행 중</div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm border">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-500">완료</div>
      </div>
    </div>
  );
}
