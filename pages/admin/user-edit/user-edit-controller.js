import React, { useEffect, useState } from "react";
import UserEditModalView from "./user-edit-view";

export default function UserEditModal({ user, onSubmit }) {
  // const userPhotoHandler = () => {
  //   const uploadBtn = document.getElementById("addUserPhotoBtn");
  //   uploadBtn.classList.remove("pointer-events-none");
  //   uploadBtn.classList.remove("bg-neutral-400");
  //   uploadBtn.classList.add("bg-teal-600");
  // };

  const modalClose = () => {
    const modal = document.getElementById("userChangeModal");
    modal.close();
  };

  return (
    <dialog
      id="userChangeModal"
      className="fixed inset-0 z-10 rounded shadow shadow-slate-400 p-4"
    >
      <UserEditModalView user={user} onSubmit={onSubmit} onClose={modalClose} />
    </dialog>
  );
}
