import React, { useEffect, useState } from "react";
import MastersTable from "./masters-table/masters-table";
import MastersForm from "./masters-form/masters-form";
import MastersEditModal from "./masters-edit-modal/masters-edit-modal";
import DeleteModal from "../delete-modal/delete-modal";

export default function MastersTab() {
  const endpoint = "http://45.91.169.110:3000";
  const [masters, setMasters] = useState([]);
  const [master, setMaster] = useState("");

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

    formData.append("masterImg", file);
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

    formData.append("masterImg", file);
    formData.append("photoPath", master.photoPath);
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("telegram", event.target.telegram.value);
    formData.append("facebook", event.target.facebook.value);
    formData.append("instagram", event.target.instagram.value);

    const response = await fetch(`${endpoint}/api/masters/` + master._id, {
      method: "PUT",
      body: formData,
    });
    if (response.ok === true) {
      const modal = document.getElementById("dataChangeModal");
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
    let id = event.currentTarget.dataset.id;
    const response = await fetch(`${endpoint}/api/masters/${master._id}`, {
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
        const modal = document.getElementById("deleteModal");
        modal.close();
      }
    }
  };

  const editModalShow = (event) => {
    let id = event.currentTarget.dataset.id;
    setMaster(masters.find((elem) => elem._id === id));

    const modal = document.getElementById("dataChangeModal");
    modal.showModal();
  };

  const deleteModalShow = (event) => {
    let id = event.currentTarget.dataset.id;
    setMaster(masters.find((elem) => elem._id === id));

    const modal = document.getElementById("deleteModal");
    modal.showModal();
  };

  return (
    <>
      <MastersForm onSubmit={createUser} />

      <MastersTable
        data={masters}
        caption="Список майстрів"
        editModalShow={editModalShow}
        deleteItem={deleteModalShow}
      />

      <MastersEditModal data={master} onSubmit={changeUser} />

      <DeleteModal onSubmit={deleteUser} title="Видалити майстра?" />
    </>
  );
}
