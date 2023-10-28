import classnames from "classnames"

export default function TabButton({ children, isActive, onClick, className }) {
  return (
    <button
      className={classnames(className, {
        'bg-neutral-200 text-gray-600': !isActive,
        'bg-neutral-100 font-semibold border border-slate-400 border-b-transparent': isActive
      })}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
