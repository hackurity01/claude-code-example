import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">새 업무 생성</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm border">
        <TaskForm />
      </div>
    </div>
  );
}
