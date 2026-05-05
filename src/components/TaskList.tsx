"use client";

import { useState, useEffect } from "react";
import { Task, TaskFilter, TaskSort } from "@/types";
import { sortByDate, sortByPriority } from "@/lib/utils";
import { fetchTasks } from "@/lib/api";
import TaskCard from "./TaskCard";
import FilterBar from "./FilterBar";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sort, setSort] = useState<TaskSort>("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // BUG 1: 필터 조건이 반전되어 있음
  // completed를 선택하면 completed가 아닌 것만 표시
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.status !== "completed";
    if (filter === "in_progress") return task.status !== "in_progress";
    if (filter === "pending") return task.status !== "pending";
    return true;
  });

  const sortedTasks = (() => {
    switch (sort) {
      case "newest":
        return sortByDate(filteredTasks, "desc");
      case "oldest":
        return sortByDate(filteredTasks, "asc");
      case "priority":
        return sortByPriority(filteredTasks);
      default:
        return filteredTasks;
    }
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />

      <div className="mt-4 grid gap-3">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="py-8 text-center text-gray-400">
            표시할 업무가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
