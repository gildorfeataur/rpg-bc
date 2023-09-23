import React, { useEffect, useState } from "react";

import UserEditModal from "../user-edit/user-edit-controller";
import MastersTable from "./masters-table/masters-table";
import MastersForm from "./masters-form/masters-form";

export default function MastersTab() {
  // const { origin } = location;
  // const endpoint = `${origin}`;
  const endpoint = "http://localhost:3000";
  const [masters, setMasters] = useState([]);
  const [user, setUser] = useState("");
  const [userPhotoPath, setUserPhotoPath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const masters = await response.json();
        setMasters(masters);
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${endpoint}/api/masters`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        telegram: event.target.telegram.value,
        facebook: event.target.facebook.value,
        instagram: event.target.instagram.value,
        photoPath: userPhotoPath,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
        event.target.reset();
      }
    }
  };

  const changeUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${endpoint}/api/masters/` + user._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegram: event.target.telegram.value,
        facebook: event.target.facebook.value,
        instagram: event.target.instagram.value,
        photoPath: userPhotoPath,
        description: event.target.description.value,
      }),
    });
    if (response.ok === true) {
      const modal = document.getElementById("userChangeModal");
      modal.close();

      const master = await response.json();
      console.log(`User "${master.name}" was upgraded! (id: ${master._id})`);

      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
      }
    }
  };

  const userPhotoHandler = () => {
    const uploadBtn = document.getElementById("addUserPhotoBtn");
    // const uploaModaldBtn = document.getElementById('masterChangeForm').getElementById("addUserPhotoBtn");
    uploadBtn.classList.remove("pointer-events-none");
    // uploaModaldBtn.classList.remove("pointer-events-none");
    uploadBtn.classList.remove("bg-neutral-400");
    uploadBtn.classList.add("bg-teal-600");
  };

  const addUserPhoto = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#profilePhoto");
    const file = fileInput.files[0];
    let formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${endpoint}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok === true) {
      const result = await response.json();
      setUserPhotoPath(`/${result.destination}/${result.filename}`);
      console.log("Файл завантажен:", result);
      fileInput.value = null;
    }
  };

  const deleteUser = async (event) => {
    let id = event.target.getAttribute("data-id");
    const response = await fetch(`${endpoint}/api/masters/` + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const master = await response.json();
      console.log(`User "${master.name}" was deleted! (id: ${master._id})`);

      const refetch = await fetch(`${endpoint}/api/masters`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const masters = await refetch.json();
        setMasters(masters);
      }
    }
  };

  const userModalShow = (event) => {
    //get user
    let id = event.target.getAttribute("data-id");
    const user = masters.find((elem) => elem._id === id);

    //show modal
    const modal = document.getElementById("userChangeModal");
    modal.showModal();
    setUser(user);
  };

  return (
    <>
      <MastersForm
        onSubmit={createUser}
        userPhotoHandler={userPhotoHandler}
        addUserPhoto={addUserPhoto}
        userPhotoPath={userPhotoPath}
      />

      <MastersTable
        data={masters}
        caption="Список майстрів"
        userModalShow={userModalShow}
        deleteItem={deleteUser}
      />

      <UserEditModal
        user={user}
        onSubmit={changeUser}
        modalVisible={modalVisible}
      />
    </>
  );
}
