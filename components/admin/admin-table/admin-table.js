export default function AdminTable({ caption, children }) {
  return (
    <table className="w-full table-auto border bg-white">
      <caption className="caption-top">{caption}</caption>
      {children}
    </table>
  );
}
