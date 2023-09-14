import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import classNames from "classnames";

export default function GamesTable() {
  const [games, setGames] = useState([]);
  const [masters, setMasters] = useState([]);
  const [rules, setRules] = useState([])
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const games = await response.json();
        setGames(games);
        resetForm();
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  async function addGame(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        date: event.target.date.value,
        type: event.target.type.value,
        rules: event.target.rules.value,
        master: event.target.master.value,
        description: event.target.description.value,
        minPlayersCount: event.target.minPlayersCount.value,
        maxPlayersCount: event.target.maxPlayersCount.value,
        cost: event.target.cost.value,
        place: event.target.place.value,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch("http://localhost:3000/api/games", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const games = await refetch.json();
        setGames(games);
        resetForm();
      }
    }
  }

  async function deleteGame(e) {
    let id = e.target.getAttribute("data-game-id");
    const response = await fetch("http://localhost:3000/api/games/" + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const game = await response.json();
      console.log(`"${game.title}" was deleted! (id: ${game._id})`);

      const refetch = await fetch("http://localhost:3000/api/games", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const games = await refetch.json();
        setGames(games);
      }
    }
  }

  const fetchMasters = async () => {
    const response = await fetch("http://localhost:3000/api/masters", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const masters = await response.json();
        setMasters(masters)
      }
  }

  const fetchRules = async () => {
    const response = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const rules = await response.json();
        setRules(rules)
      }
  }

  const resetForm = () => {
    const form = document.getElementById("gamesForm");
    form.reset();
  };

  const showHint = () => {
    setHint(!hint)
  }

  return (
    <>
      <form id="gamesForm" name="gamesForm" onSubmit={addGame}>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="form-group mt-3">
            <label htmlFor="title">*Назва гри</label>
            <input
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="title"
              id="title"
              placeholder="Введіть вашу назву"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="date">*Дата</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="date"
              id="date"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="type">*Тип гри</label>

            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="type"
              id="type"
              required
            >
              <option value="" style={{ color: "#888" }}>
                Оберіть тип
              </option>
              <option value={"board-game-classic"}>Настільна</option>
              <option value={"board-game-role"}>Настільна рольова</option>
              <option value={"board-game-cards"}>Настільна карткова</option>
              <option value={"collection-card-game"}>Колекційна карткова</option>
              <option value={"board-game-wargame"}>Настільний варгейм</option>
              <option value={"indoor-game"}>Камеральна</option>
              <option value={"outdoor-game"}>Полігонна</option>
              <option value={"city-game"}>Міська</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="rules" className="flex items-center relative">
              Правила
              <button type="button" className={styles.hint} onClick={showHint}>?</button>
              <div role="tooltip" className={classNames(styles.tooltip, {[styles.isActive]: hint})}>
                - Правила в випадаючому списку беруться зі сторінки{" "}
                <Link
                  href="/rules"
                  className="text-sm font-semibold leading-6 text-sky-700"
                >
                  {' '}Правила
                </Link>
                <br />
                - Якщо правил немає в списку, ви можете додати їх во вкладці
                "Правила" в адмінці, і потім вони відобразяться тут
                <br />- Або можете додати посилання на них в описі до гри
              </div>
            </label>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="rules"
              id="rules"
              onClick={fetchRules}
            >
              <option value="" style={{ color: "#888" }}>
                Оберіть правила
              </option>
              {rules.map((item) => (<option key={item._id}>{item.title}</option>))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label>*Кількість гравців (від) - (до)</label>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="minPlayersCount"
                min={1}
                required
              />
              <span className="flex items-center">-</span>
              <input
                type="number"
                className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="maxPlayersCount"
                min={1}
                required
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="master">*Ведучий / майстер</label>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="master"
              id="master"
              onClick={fetchMasters}
              required
            >
              <option value="" style={{ color: "#888" }}>
                Оберіть майстра
              </option>
              {masters.map((item) => (<option key={item._id}>{item.name}</option>))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="cost">*Ціна (з гравця за одну сесію)</label>
            <input
              type="number"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="cost"
              id="cost"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="place">*Місце проведення</label>
            <input
              type="text"
              className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="place"
              id="place"
              placeholder="Назва місця (координати в опис)"
              required
            />
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Опис</label>
          <textarea
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="description"
            id="description"
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
            Додати гру
          </button>
          <button
            type="reset"
            className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          >
            Очистити форму
          </button>
        </div>
      </form>
      <table className="w-full table-auto border-collapse border-spacing-1 border">
        <caption className="caption-top">Список ігор</caption>
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
          {games
            ? games.map((game) => (
                <tr key={game._id}>
                  <td className="border p-1.5">{game.title}</td>
                  <td className="border p-1.5">{game.date}</td>
                  <td className="border p-1.5">{game.type}</td>
                  <td className="border p-1.5">{game.rules}</td>
                  <td className="border p-1.5">{game.master}</td>
                  <td className="border p-1.5">{game.minPlayersCount} - {game.maxPlayersCount}</td>
                  <td className="border p-1.5">{game.description}</td>
                  <td className="border p-1.5">{game.cost}</td>
                  <td className="border p-1.5">{game.place}</td>
                  <td className="border p-1.5">
                    <button
                      type="button"
                      data-game-id={game._id}
                      onClick={deleteGame}
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
