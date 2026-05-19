interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-light text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-105 hover:bg-[#4d9aff] hover:shadow-accent/40 active:scale-95"
      aria-label="Add question"
      title="Add question (N)"
    >
      +
    </button>
  );
}
