import React, { useEffect, useState } from "react";

import classNames from "classnames";

export default function MastersTable() {
  // const { origin } = location;
  // const endpoint = `${origin}`;
  const endpoint = "http://localhost:3000";
  const [masters, setMasters] = useState([]);
  const [user, setUser] = useState("");
  const [userPhotoPath, setUserPhotoPath] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${endpoint}/api/masters`, {
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

  const createUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${endpoint}/api/masters`, {
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
        photoPath: userPhotoPath,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
        event.target.reset();
      }
    }
  };

  const userPhotoHandler = () => {
    const uploadBtn = document.getElementById("addUserPhotoBtn");
    // const uploaModaldBtn = document.getElementById('masterChangeForm').getElementById("addUserPhotoBtn");
    uploadBtn.classList.remove("pointer-events-none");
    // uploaModaldBtn.classList.remove("pointer-events-none");
    uploadBtn.classList.remove("bg-neutral-400");
    uploadBtn.classList.add("bg-teal-600");
  };

  const addUserPhoto = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#profilePhoto");
    const file = fileInput.files[0];
    let formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${endpoint}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok === true) {
      const result = await response.json();
      setUserPhotoPath(`/${result.destination}/${result.filename}`);
      console.log("Файл завантажен:", result);
      fileInput.value = null;
    }
  };

  const deleteUser = async (event) => {
    let id = event.target.getAttribute("data-id");
    const response = await fetch(`${endpoint}/api/masters/` + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const master = await response.json();
      console.log(`User "${master.name}" was deleted! (id: ${master._id})`);

      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
      }
    }
  };

  const changeUserHandler = (event) => {
    //get user
    let id = event.target.getAttribute("data-id");
    const user = masters.find((elem) => elem._id === id);

    //show modal
    const state = event.target.getAttribute("data-state");
    const modal = document.getElementById("userChangeModal");
    if (state === "open") {
      modal.showModal();
      setUser(user);
    }
    if (state === "close") {
      modal.close();
    }
  };

  const changeUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${endpoint}/api/masters/` + user._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegram: event.target.telegram.value,
        facebook: event.target.facebook.value,
        instagram: event.target.instagram.value,
        photoPath: userPhotoPath,
        description: event.target.description.value,
      }),
    });
    if (response.ok === true) {
      const modal = document.getElementById("userChangeModal");
      modal.close();

      const master = await response.json();
      console.log(`User "${master.name}" was upgraded! (id: ${master._id})`);

      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
      }
    }
  };

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

        <div className="form-group mt-3">
          <label htmlFor="profilePhoto">Фото профіля:</label>
          <div className="flex items-center mt-0.5 border py-1 px-2">
            <div>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept=".jpg, .jpeg, .png"
                className="form-input block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={userPhotoHandler}
              />
              <button
                type="button"
                id="addUserPhotoBtn"
                className={classNames({
                  "mt-2 flex items-center text-white rounded px-4 py-2 bg-neutral-400 pointer-events-none":
                    !userPhotoPath,
                  "mt-2 flex items-center text-white rounded px-4 py-2 bg-teal-600 hover:bg-teal-500 pointer-events-none":
                    userPhotoPath,
                })}
                onClick={addUserPhoto}
              >
                {userPhotoPath ? (
                  <>
                    <span>Фото завантажено</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Завантажити фото</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <div className="flex ml-5 w-[120px] h-[120px] rounded-full border bg-slate-200 border-slate-500 overflow-hidden">
              {userPhotoPath ? (
                <img
                  src={`${endpoint}/${userPhotoPath}`}
                  alt="avatar"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              ) : (
                <span className="m-auto text-gray-400">Без фото</span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-3 text-slate-500">
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

      <table className="w-full table-auto border-separate border-spacing-1 bg-white">
        <caption className="caption-top">Список майстрів</caption>
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
                  <td className="border px-2 text-center">
                    <p className="max-w-[170px] truncate ...">{master.photoPath}</p>
                  </td>
                  <td className="border px-2">
                    {master.description ? (
                      master.description
                    ) : (
                      <span className="text-gray-400">немає опису</span>
                    )}
                  </td>
                  <td className="border">
                    <div className="flex flex-wrap w-min gap-1.5">
                      <button
                        type="button"
                        data-id={master._id}
                        data-state="open"
                        onClick={changeUserHandler}
                        className="w-full py-0.5 px-2 text-white bg-sky-500 hover:bg-sky-700"
                      >
                        Редагувати
                      </button>

                      <button
                        type="button"
                        data-id={master._id}
                        onClick={deleteUser}
                        className="w-full py-0.5 px-2 text-white bg-red-500 hover:bg-rose-700"
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <dialog
        id="userChangeModal"
        className="fixed inset-0 z-10 rounded shadow shadow-slate-400 p-4"
      >
        <h3>Форма редагування юзера</h3>
        <form id="masterChangeForm" onSubmit={changeUser}>
          <div className="form-group mt-3">
            <label htmlFor="name">Ім'я (не можна редагувати):</label>
            <input
              type="text"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="name"
              id="name"
              defaultValue={user.name}
              readOnly
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="telegram">Телеграм:</label>
            <input
              type="text"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="telegram"
              id="telegram"
              defaultValue={user.telegram}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="facebook">Фейсбук:</label>
            <input
              type="url"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="facebook"
              id="facebook"
              defaultValue={user.facebook}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="instagram">Інстаграм:</label>
            <input
              type="url"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="instagram"
              id="instagram"
              defaultValue={user.instagram}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="description">Опис:</label>
            <textarea
              type="text"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="description"
              id="description"
              defaultValue={user.description}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="profilePhoto">Фото профіля:</label>
            <div className="flex items-center mt-0.5 border py-1 px-2">
              <div>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept=".jpg, .jpeg, .png"
                  className="form-input block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={userPhotoHandler}
                />
                <button
                  type="button"
                  id="addUserPhotoBtn"
                  className={classNames({
                    "mt-2 flex items-center text-white rounded px-4 py-2 bg-neutral-400 pointer-events-none":
                      !userPhotoPath,
                    "mt-2 flex items-center text-white rounded px-4 py-2 bg-teal-600 hover:bg-teal-500 pointer-events-none":
                      userPhotoPath,
                  })}
                  onClick={addUserPhoto}
                >
                  {userPhotoPath ? (
                    <>
                      <span>Фото завантажено</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Завантажити фото</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <div className="flex ml-5 w-[120px] h-[120px] rounded-full border bg-slate-200 border-slate-500 overflow-hidden">
                {userPhotoPath ? (
                  <img
                    src={`${endpoint}/${userPhotoPath}`}
                    alt="avatar"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                ) : (
                  <span className="m-auto text-gray-400">Без фото</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-5 mb-3">
            <button
              type="submit"
              className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
            >
              Змінити
            </button>
            <button
              type="reset"
              className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
            >
              Очистити форму
            </button>
            <button
              data-state="close"
              type="button"
              className="text-white rounded px-4 py-2 bg-rose-500 hover:bg-rose-400"
              onClick={changeUserHandler}
            >
              Закрити
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
