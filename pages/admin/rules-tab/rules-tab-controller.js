import React, { useEffect, useState } from "react";

export default function RulesTab() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const rules = await response.json();
        setRules(rules);
        resetForm();
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  async function createRule(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/rules", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        link: event.target.link.value,
        ualink: event.target.ualink.value,
        description: event.target.description.value,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
        resetForm();
      }
    }
  }

  async function deleteRule(e) {
    let id = e.target.getAttribute("data-id");
    const response = await fetch("http://localhost:3000/api/rules/" + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const rule = await response.json();
      console.log(`rule "${rule.name}" was deleted! (id: ${rule._id})`);

      const refetch = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
      }
    }
  }

  const resetForm = () => {
    const form = document.getElementById("masterForm");
    form.reset();
  };

  return (
    <>
      <form id="masterForm" name="masterForm" onSubmit={createRule}>
        <div className="form-group mt-3">
          <label htmlFor="title">Назва гри*:</label>
          <input
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="title"
            id="title"
            required
            placeholder="Введіть назву гри"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="link">Посилання на правила*:</label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="link"
            id="link"
            required
            placeholder="Вставте посилання на правила"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="ualink">
            Посилання на локалізовані правила (якщо треба/існує):
          </label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="ualink"
            id="ualink"
            placeholder="Вставте посилання на локалізовані правила"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Опис:</label>
          <textarea
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="description"
            id="description"
            placeholder="Пара речень про саму гру (~200 символів)"
            maxLength={300}
          />
        </div>

        <p className="mt-1 text-slate-500">
          * - Обов'язкові для заповнення поля
        </p>

        <div className="flex gap-5 mt-5 mb-3">
          <button
            type="submit"
            className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          >
            Додати
          </button>
          <button
            type="reset"
            className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          >
            Очистити
          </button>
        </div>
      </form>
      <table className="w-full table-auto border-separate border-spacing-1 bg-white">
        <caption className="caption-top">Список майстрів</caption>
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
          {rules
            ? rules.map((rule) => (
                <tr key={rule._id}>
                  <td className="border px-2 text-center">{rule.title}</td>
                  <td className="border px-2 text-center">
                    <a href={rule.link}>Link</a>
                  </td>
                  <td className="border px-2 text-center">
                    {rule.ualink ? (
                      <a href={rule.ualink}>Link (UA)</a>
                    ) : (
                      <span className="text-gray-400">не вказаний</span>
                    )}
                  </td>
                  <td className="border px-2">
                    {rule.description ? (
                      rule.description
                    ) : (
                      <span className="text-gray-400">немає опису</span>
                    )}
                  </td>
                  <td className="border">
                    <button
                      type="button"
                      data-id={rule._id}
                      onClick={deleteRule}
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
