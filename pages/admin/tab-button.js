import classnames from "classnames"

export default function TabButton({ children, isActive, onClick, className }) {
  return (
    <button
      className={classnames(className, {
        'bg-emerald-300': !isActive,
        'bg-emerald-600': isActive
      })}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
