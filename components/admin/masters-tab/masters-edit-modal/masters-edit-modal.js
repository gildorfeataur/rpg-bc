import { useRef, useState } from "react";
import PhotoUpload from "../../photo-upload-block/photo-upload-block";

export default function MastersEditModal({ data, onSubmit }) {
  const [formReset, setFormReset] = useState(false);
  const modal = useRef(null);
  const form = useRef(null);

  const onClose = () => {
    formResetHandler();
    modal.current.close();
  };

  const formResetHandler = (e) => {
    form.current.reset();

    setFormReset(true);
    setTimeout(() => {
      setFormReset(false);
    }, 1000);
  };

  return (
    <dialog
      id="dataChangeModal"
      ref={modal}
      className="fixed inset-0 z-10 rounded shadow shadow-slate-400 p-4"
    >
      <h3 className="font-bold text-center">Форма редагування</h3>
      <form ref={form} onSubmit={onSubmit} onReset={formResetHandler}>
        <PhotoUpload imgSource={data.photoPath} formReset={formReset} />

        <div className="form-group mt-3">
          <label htmlFor="name" className="font-medium text-gray-700">
            Ім'я (не можна редагувати):
          </label>
          <input
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="name"
            id="name"
            defaultValue={data.name}
            readOnly
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="telegram" className="font-medium text-gray-700">
            Телеграм:
          </label>
          <input
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="telegram"
            id="telegram"
            defaultValue={data.telegram}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="facebook" className="font-medium text-gray-700">
            Фейсбук:
          </label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="facebook"
            id="facebook"
            defaultValue={data.facebook}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="instagram" className="font-medium text-gray-700">
            Інстаграм:
          </label>
          <input
            type="url"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="instagram"
            id="instagram"
            defaultValue={data.instagram}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description" className="font-medium text-gray-700">
            Опис:
          </label>
          <textarea
            type="text"
            className="form-input mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="description"
            id="description"
            defaultValue={data.description}
          />
        </div>

        <div className="flex gap-5 mt-5 mb-3">
          <button
            type="submit"
            className="text-white rounded px-4 py-2 bg-lime-600 hover:bg-lime-500"
          >
            Змінити
          </button>
          <button
            data-state="close"
            type="button"
            className="text-white rounded px-4 py-2 bg-rose-500 hover:bg-rose-400"
            onClick={onClose}
          >
            Закрити
          </button>
        </div>
      </form>
    </dialog>
  );
}
