interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="
        rounded-md px-2 py-1
        text-xs font-medium text-slate-400
        transition-colors duration-200
        hover:text-red-500
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-400
        focus-visible:ring-offset-2
        active:scale-[0.98]
        motion-reduce:transition-none
        motion-reduce:active:scale-100
      "
    >
      Reset comments
    </button>
  );
}
