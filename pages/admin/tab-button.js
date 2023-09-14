import classnames from "classnames"

export default function TabButton({ children, isActive, onClick, className }) {
  return (
    <button
      className={classnames(className, {
        'bg-emerald-300 text-gray-600': !isActive,
        'bg-emerald-600 text-white': isActive
      })}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
