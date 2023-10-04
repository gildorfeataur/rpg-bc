import AdminTable from "../../admin-table/admin-table";

export default function GamesTable({ ...props }) {
  return (
    <AdminTable caption={props.caption}>
      <thead>
        <tr>
          <th className="border text-left p-1.5">Назва</th>
          <th className="border text-left p-1.5">Дата</th>
          <th className="border text-left p-1.5">Тип</th>
          <th className="border text-left p-1.5">Правила</th>
          <th className="border text-left p-1.5">Майстер</th>
          <th className="border text-left p-1.5">Гравців</th>
          <th className="border text-left p-1.5">Опис</th>
          <th className="border text-left p-1.5">Ціна</th>
          <th className="border text-left p-1.5">Місце</th>
          <th className="border text-left p-1.5">Опції</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item._id} className="hover:bg-slate-100">
            <td className="border p-1.5">{item.title}</td>
            <td className="border p-1.5">{item.date}</td>
            <td className="border p-1.5">{item.type}</td>
            <td className="border p-1.5">{item.rules}</td>
            <td className="border p-1.5">{item.master}</td>
            <td className="border p-1.5">
              {item.minPlayersCount} - {item.maxPlayersCount}
            </td>
            <td className="border p-1.5">{item.description}</td>
            <td className="border p-1.5">{item.cost}</td>
            <td className="border p-1.5">{item.place}</td>
            <td className="border p-1.5">
              <button
                type="button"
                data-item-id={item._id}
                onClick={props.deleteItem}
                className="py-0.5 px-2 text-white bg-sky-500 hover:bg-sky-700"
              >
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </AdminTable>
  );
}
