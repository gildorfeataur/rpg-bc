import React, { useEffect, useState } from "react";

import EditModal from "../edit-modal/edit-modal";
import MastersTable from "./masters-table/masters-table";
import MastersForm from "./masters-form/masters-form";

export default function MastersTab() {
  // const { origin } = location;
  // const endpoint = `${origin}`;
  const endpoint = "http://localhost:3000";
  const [masters, setMasters] = useState([]);
  const [user, setUser] = useState("");

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
    const fileInput = event.target.profilePhoto;
    const file = fileInput.files[0];
    let formData = new FormData();

    formData.append("avatar", file);
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("telegram", event.target.telegram.value);
    formData.append("facebook", event.target.facebook.value);
    formData.append("instagram", event.target.instagram.value);

    const response = await fetch(`${endpoint}/api/masters`, {
      method: "POST",
      body: formData,
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
        URL.revokeObjectURL(file);
      }
    }
  };

  const changeUser = async (event) => {
    event.preventDefault();
    const fileInput = event.target.profilePhoto;
    const file = fileInput.files[0];
    let formData = new FormData();

    formData.append("avatar", file);
    formData.append("photoPath", user.photoPath);
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("telegram", event.target.telegram.value);
    formData.append("facebook", event.target.facebook.value);
    formData.append("instagram", event.target.instagram.value);

    const response = await fetch(`${endpoint}/api/masters/` + user._id, {
      method: "PUT",
      body: formData,
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

  const editModalShow = (event) => {
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
      <MastersForm onSubmit={createUser} />

      <MastersTable
        data={masters}
        caption="Список майстрів"
        editModalShow={editModalShow}
        deleteItem={deleteUser}
      />

      <EditModal user={user} onSubmit={changeUser} />
    </>
  );
}
