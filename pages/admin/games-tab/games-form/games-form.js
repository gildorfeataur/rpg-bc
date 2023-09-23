import Link from "next/link";
import classNames from "classnames";

import styles from "./index.module.scss";

export default function GamesForm({...props}) {
  return (
    <form id="gamesForm" name="gamesForm" onSubmit={props.onSubmit}>
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
              <button type="button" className={styles.hint} onClick={props.showHint}>?</button>
              <div role="tooltip" className={classNames(styles.tooltip, {[styles.isActive]: props.hint})}>
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
              onClick={props.fetchRules}
            >
              <option value="" style={{ color: "#888" }}>
                Оберіть правила
              </option>
              {props.rules.map((item) => (<option key={item._id}>{item.title}</option>))}
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
              onClick={props.fetchMasters}
              required
            >
              <option value="" style={{ color: "#888" }}>
                Оберіть майстра
              </option>
              {props.masters.map((item) => (<option key={item._id}>{item.name}</option>))}
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
  )
}