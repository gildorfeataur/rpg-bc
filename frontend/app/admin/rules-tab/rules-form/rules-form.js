import { useState } from "react";
import PhotoUpload from "../../photo-upload-block/photo-upload-block";

export default function RulesForm({ onSubmit }) {
  const [formReset, setFormReset] = useState(false)

  const formResetHandler = () => {
    setFormReset(true)
    setTimeout(() => {
      setFormReset(false)
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} onReset={formResetHandler}>
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

      <div className="form-group mt-3">
        <PhotoUpload previewReset={formReset} title="Зображення" />
      </div>

      <p className="mt-1 text-slate-500">* - Обов'язкові для заповнення поля</p>

      <div className="flex gap-5 mt-5 mb-3">
        <button
          type="submit"
          className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
        >
          Додати правило
        </button>
        <button
          type="reset"
          className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
        >
          Очистити форму
        </button>
      </div>
    </form>
  );
}
