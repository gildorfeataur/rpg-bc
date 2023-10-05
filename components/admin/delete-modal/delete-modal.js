import { useRef } from "react";

export default function DeleteModal({ onSubmit, title }) {
  const modal = useRef(null);

  const onClose = () => {
    modal.current.close();
  };

  return (
    <dialog
      id="deleteModal"
      ref={modal}
      className="fixed inset-0 z-10 rounded shadow shadow-slate-400 p-4"
    >
      <h3 className="font-bold text-center">{title}</h3>
      <div className="flex gap-5 mt-5 mb-3">
        <button
          type="submit"
          className="text-white rounded px-4 py-2 bg-rose-500 hover:bg-rose-400"
          onClick={onSubmit}
        >
          Видалити
        </button>
        <button
          data-state="close"
          type="button"
          className="text-white rounded px-4 py-2 bg-sky-600 hover:bg-sky-500"
          onClick={onClose}
        >
          Закрити
        </button>
      </div>
    </dialog>
  );
}
