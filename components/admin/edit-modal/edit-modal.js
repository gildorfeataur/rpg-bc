import { useState } from "react";
import PhotoUpload from "../photo-upload-block/photo-upload-block";

export default function EditModal({ user, onSubmit }) {
  const [formReset, setFormReset] = useState(false);

  const modalClose = () => {
    const modal = document.getElementById("userChangeModal");
    formResetHandler();
    modal.close();
  };

  const formResetHandler = (e) => {
    const form = document.getElementById("masterChangeForm");
    form.reset();

    setFormReset(true);
    setTimeout(() => {
      setFormReset(false);
    }, 1000);
  };

  return (
    <dialog
      id="userChangeModal"
      className="fixed inset-0 z-10 rounded shadow shadow-slate-400 p-4"
    >
      <h3>Форма редагування юзера</h3>
      <form
        id="masterChangeForm"
        onSubmit={onSubmit}
        onReset={formResetHandler}
      >
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

        <PhotoUpload imgSource={user.photoPath} previewReset={formReset} />

        <div className="flex gap-5 mt-5 mb-3">
          <button
            type="submit"
            className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
          >
            Змінити
          </button>
          {/* <button
            type="reset"
            className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          >
            Очистити форму
          </button> */}
          <button
            data-state="close"
            type="button"
            className="text-white rounded px-4 py-2 bg-rose-500 hover:bg-rose-400"
            onClick={modalClose}
          >
            Закрити
          </button>
        </div>
      </form>
    </dialog>
  );
}
