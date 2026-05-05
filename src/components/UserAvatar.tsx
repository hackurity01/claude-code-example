interface UserAvatarProps {
  name: string;
  avatar?: string | null;
  size?: "sm" | "md";
}

export default function UserAvatar({
  name,
  avatar,
  size = "sm",
}: UserAvatarProps) {
  const sizeClass = size === "sm" ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm";
  const initial = name.charAt(0).toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClass} rounded-full`}
        title={name}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-medium`}
      title={name}
    >
      {initial}
    </div>
  );
}
