import Link from "next/link";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">업무 목록</h1>
        <Link
          href="/tasks/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          + 새 업무
        </Link>
      </div>
      <TaskList />
    </div>
  );
}
