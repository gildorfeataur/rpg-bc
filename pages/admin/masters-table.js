import React, { useEffect, useState } from "react";

export default function MastersTable() {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/masters", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const masters = await response.json();
        setMasters(masters);
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  async function createUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/masters", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        telegram: event.target.telegram.value,
        facebook: event.target.facebook.value,
        instagram: event.target.instagram.value,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch("http://localhost:3000/api/masters", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
        event.target.reset();
      }
    }
  }

  async function addUserPhoto(event) {
    event.preventDefault();
    const fileInput = document.querySelector("#profilePhoto");
    const file = fileInput.files[0];
    let formData = new FormData();
    formData.append("uploaded_file", file);

    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok === true) {
      const result = await response.json();
      console.log("Файл завантажен:", result);
      fileInput.value = null
    }
  }

  async function deleteUser(event) {
    let id = event.target.getAttribute("data-id");
    const response = await fetch("http://localhost:3000/api/masters/" + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const master = await response.json();
      console.log(`User "${master.name}" was deleted! (id: ${master._id})`);

      const refetch = await fetch("http://localhost:3000/api/masters", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
      }
    }
  }

  return (
    <>
      <form id="masterForm" name="masterForm" onSubmit={createUser}>
        <div className="form-group mt-3">
          <label htmlFor="name">Ім'я*:</label>
          <input
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="name"
            id="name"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="telegram">Телеграм*:</label>
          <input
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="telegram"
            id="telegram"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="facebook">Фейсбук:</label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="facebook"
            id="facebook"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="instagram">Інстаграм:</label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="instagram"
            id="instagram"
          />
        </div>

        <div className="form-group mt-3">
          <label>Опис:</label>
          <textarea
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="description"
          />
        </div>

        <p className="mt-1 text-slate-500">
          * - Обов'язкові для заповнення поля
        </p>

        <div className="flex gap-5 mt-5 mb-3">
          <button
            type="submit"
            className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
          >
            Додати
          </button>
          <button
            type="reset"
            className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          >
            Очистити форму
          </button>
        </div>
      </form>

      <div className="form-group mt-3">
        <label htmlFor="profilePhoto">Фото профіля:</label>
        <div className="flex items-center mt-0.5">
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            className="form-input block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            className="ml-6 text-white rounded px-4 py-2 bg-teal-600 hover:bg-teal-500"
            onClick={addUserPhoto}
          >
            Завантажити фото
          </button>
        </div>
      </div>

      <table className="w-full table-auto border-separate border-spacing-1 border bg-white">
        <caption className="caption-top">Список майстрів</caption>
        <thead>
          <tr>
            <th className="border">Ім'я</th>
            <th className="border">Телеграм</th>
            <th className="border">Фейсбук</th>
            <th className="border">Інстаграм</th>
            <th className="border">Опис</th>
            <th className="border">Опції</th>
          </tr>
        </thead>
        <tbody>
          {masters
            ? masters.map((master) => (
                <tr key={master._id}>
                  <td className="border px-2 text-center">{master.name}</td>
                  <td className="border px-2 text-center">
                    <a target="_blank" href={master.telegram}>
                      Telegram
                    </a>
                  </td>
                  <td className="border px-2 text-center">
                    {master.facebook ? (
                      <a target="_blank" href={master.facebook}>
                        Facebook
                      </a>
                    ) : (
                      <span className="text-gray-400">не вказаний</span>
                    )}
                  </td>
                  <td className="border px-2 text-center">
                    {master.instagram ? (
                      <a target="_blank" href={master.instagram}>
                        Instagram
                      </a>
                    ) : (
                      <span className="text-gray-400">не вказаний</span>
                    )}
                  </td>
                  <td className="border px-2">
                    {master.description ? (
                      master.description
                    ) : (
                      <span className="text-gray-400">немає опису</span>
                    )}
                  </td>
                  <td className="border">
                    <button
                      type="button"
                      data-id={master._id}
                      onClick={deleteUser}
                      className="py-0.5 px-2 text-white bg-sky-500 hover:bg-sky-700"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
}
