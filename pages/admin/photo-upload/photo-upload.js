import React, { useEffect, useState } from "react";

export default function PhotoUpload({ formReset }) {
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    const fileInput = document.querySelector("#profilePhoto");
    const file = fileInput.files[0];

    if (formReset) {
      URL.revokeObjectURL(file)
      setUserImg(null)
    }
  }, [formReset])

  const onImgChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    setUserImg(URL.createObjectURL(file));
  };

  return (
    <>
      <label htmlFor="profilePhoto">Фото профіля:</label>
      <div className="flex items-center mt-0.5 border py-1 px-2">
        <div className="flex mr-5 w-[120px] h-[120px] rounded-full border bg-slate-200 border-slate-500 overflow-hidden">
          {userImg ? (
            <img
              src={userImg}
              alt="avatar"
              width={120}
              height={120}
              className="object-cover"
            />
          ) : (
            <span className="m-auto text-gray-400">Без фото</span>
          )}
        </div>

        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          accept=".jpg, .jpeg, .png"
          className="form-input block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={onImgChange}
        />
      </div>
    </>
  );
}