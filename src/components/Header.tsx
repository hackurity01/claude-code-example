import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-indigo-600">
          TaskFlow
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/tasks"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            업무 목록
          </Link>
        </nav>
      </div>
    </header>
  );
}
