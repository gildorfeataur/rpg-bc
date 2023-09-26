import AdminTable from "../../../../components/admin-table/admin-table";

export default function MastersTable({ ...props }) {
  return (
    <AdminTable caption={props.caption}>
      <thead>
        <tr>
          <th className="border">Ім'я</th>
          <th className="border">Телеграм</th>
          <th className="border">Фейсбук</th>
          <th className="border">Інстаграм</th>
          <th className="border">Шлях до фото</th>
          <th className="border">Опис</th>
          <th className="border">Опції</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item._id}>
            <td className="border px-2 text-center">{item.name}</td>
            <td className="border px-2 text-center">
              <a target="_blank" href={item.telegram}>
                Telegram
              </a>
            </td>
            <td className="border px-2 text-center">
              {item.facebook ? (
                <a target="_blank" href={item.facebook}>
                  Facebook
                </a>
              ) : (
                <span className="text-gray-400">не вказаний</span>
              )}
            </td>
            <td className="border px-2 text-center">
              {item.instagram ? (
                <a target="_blank" href={item.instagram}>
                  Instagram
                </a>
              ) : (
                <span className="text-gray-400">не вказаний</span>
              )}
            </td>
            <td className="border px-2 text-center">
              <p className="max-w-[170px] truncate ...">{item.photoPath}</p>
            </td>
            <td className="border px-2">
              {item.description ? (
                item.description
              ) : (
                <span className="text-gray-400">немає опису</span>
              )}
            </td>
            <td className="border">
              <div className="flex flex-wrap w-min gap-1.5">
                <button
                  type="button"
                  data-id={item._id}
                  onClick={props.editModalShow}
                  className="w-full py-0.5 px-2 text-white bg-sky-500 hover:bg-sky-700"
                >
                  Редагувати
                </button>

                <button
                  type="button"
                  data-id={item._id}
                  onClick={props.deleteItem}
                  className="w-full py-0.5 px-2 text-white bg-red-500 hover:bg-rose-700"
                >
                  Видалити
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </AdminTable>
  );
}
