export default function AdminTable({ caption, children }) {
  return (
    <table className="w-full table-auto border-separate border-spacing-1 bg-white">
      <caption className="caption-top">{caption}</caption>
      {children}
    </table>
  );
}
