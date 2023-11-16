import FormattedDate from "../../../../components/date/date";
import AdminTable from "../../admin-table/admin-table";

export default function GamesTable({ ...props }) {
  return (
    <AdminTable caption={props.caption}>
      <thead>
        <tr>
          <th className="border text-left px-2">Назва</th>
          <th className="border text-left px-2">Дата\час</th>
          <th className="border text-left px-2">Тип</th>
          <th className="border text-left px-2">Правила</th>
          <th className="border text-left px-2">Майстер</th>
          <th className="border text-left px-2">Гравців</th>
          <th className="border text-left px-2">Опис</th>
          <th className="border text-left px-2">Ціна</th>
          <th className="border text-left px-2">Місце</th>
          <th className="border text-left px-2">Опції</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item._id} className="hover:bg-slate-100">
            <td className="border px-2">{item.title}</td>
            <td className="border px-2"><FormattedDate dateString={item.date}/></td>
            <td className="border px-2">{item.type}</td>
            <td className="border px-2">{item.rules}</td>
            <td className="border px-2">{item.master}</td>
            <td className="border px-2">
              {item.minPlayersCount} - {item.maxPlayersCount}
            </td>
            <td className="border px-2">{item.description}</td>
            <td className="border px-2">{item.cost}</td>
            <td className="border px-2">{item.place}</td>
            <td className="border p-1">
            <div className="flex justify-around gap-1">
                {/* <button
                  type="button"
                  data-id={item._id}
                  onClick={props.editModalShow}
                  className="h-8 rounded py-1 px-3 text-white bg-sky-500 hover:bg-sky-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button> */}

                <button
                  type="button"
                  data-id={item._id}
                  onClick={props.deleteItem}
                  className="h-8 rounded py-1 px-3 text-white bg-red-500 hover:bg-rose-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </AdminTable>
  );
}
