import { useState } from "react";
import PhotoUpload from "../../photo-upload-block/photo-upload-block";

export default function MastersForm({ onSubmit }) {
  const [formReset, setFormReset] = useState(false)

  const formResetHandler = () => {
    setFormReset(true)
    setTimeout(() => {
      setFormReset(false)
    }, 1000);
  }

  return (
    <form onReset={formResetHandler} onSubmit={onSubmit}>
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
        <PhotoUpload previewReset={formReset} title="Фото профіля" />
      </div>

      <p className="mt-3 text-slate-500">* - Обов'язкові для заповнення поля</p>

      <div className="flex gap-5 mt-5 mb-3">
        <button
          type="submit"
          className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
        >
          Додати майстра
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
