import AdminTable from "../../admin-table/admin-table";

export default function RulesTable({ ...props }) {
  return (
    <AdminTable caption={props.caption}>
      <thead>
        <tr>
          <th className="border">Назва</th>
          <th className="border">Офф сайт</th>
          <th className="border">Укр сайт</th>
          <th className="border">Опис</th>
          <th className="border">Опції</th>
        </tr>
      </thead>
      <tbody>
        {props.data
          ? props.data.map((item) => (
              <tr key={item._id}>
                <td className="border px-2 text-center">{item.title}</td>
                <td className="border px-2 text-center">
                  <a href={item.link}>Link</a>
                </td>
                <td className="border px-2 text-center">
                  {item.ualink ? (
                    <a href={item.ualink}>Link (UA)</a>
                  ) : (
                    <span className="text-gray-400">не вказаний</span>
                  )}
                </td>
                <td className="border px-2">
                  {item.description ? (
                    item.description
                  ) : (
                    <span className="text-gray-400">немає опису</span>
                  )}
                </td>
                <td className="border">
                  <button
                    type="button"
                    data-id={item._id}
                    onClick={props.deleteItem}
                    className="py-0.5 px-2 text-white bg-sky-500 hover:bg-sky-700"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </AdminTable>
  );
}
