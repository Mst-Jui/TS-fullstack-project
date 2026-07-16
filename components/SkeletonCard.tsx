export default function SkeletonCard() {
  return (
    <div className="h-[380px] w-full animate-pulse overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="h-40 w-full bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />
        <div className="h-8 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
}
