import Link from "next/link";
import { Task } from "@/types";
import { formatDate, getPriorityLabel } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

const priorityColors: Record<string, string> = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <div
        className={`rounded-lg border border-l-4 ${priorityColors[task.priority]} bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>

        {task.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>{getPriorityLabel(task.priority)}</span>
            {task.dueDate && <span>~ {formatDate(task.dueDate)}</span>}
          </div>

          <div className="flex items-center gap-3">
            {task.assignee ? (
              <UserAvatar name={task.assignee.name} avatar={task.assignee.avatar} />
            ) : (
              <span className="text-gray-300">미배정</span>
            )}
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
