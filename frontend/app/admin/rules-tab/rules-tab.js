import React, { useEffect, useState } from "react";
import RulesTable from "./rules-table/rules-table";
import RulesForm from "./rules-form/rules-form";
import RulesEditModal from "./rules-edit-modal/rules-edit-modal";
import DeleteModal from "../delete-modal/delete-modal";

export default function RulesTab() {
  const endpoint = "http://83.229.84.160:3000";
  const [rules, setRules] = useState([]);
  const [rule, setRule] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${endpoint}/api/rules`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const rules = await response.json();
        setRules(rules);
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const createRule = async (event) => {
    event.preventDefault();
    const fileInput = event.target.profilePhoto;
    const file = fileInput.files[0];
    let formData = new FormData();

    formData.append("ruleImg", file);
    formData.append("title", event.target.title.value);
    formData.append("link", event.target.link.value);
    formData.append("ualink", event.target.ualink.value);
    formData.append("description", event.target.description.value);

    debugger;
    const response = await fetch(`${endpoint}/api/rules`, {
      method: "POST",
      body: formData,
    });
    if (response.ok === true) {
      const refetch = await fetch(`${endpoint}/api/rules`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
        event.target.reset();
        URL.revokeObjectURL(file);
      }
    }
  };

  const changeRule = async (event) => {
    event.preventDefault();
    const fileInput = event.target.profilePhoto;
    const file = fileInput.files[0];
    let formData = new FormData();

    formData.append("ruleImg", file);
    formData.append("photoPath", rule.photoPath);
    formData.append("title", event.target.title.value);
    formData.append("link", event.target.link.value);
    formData.append("ualink", event.target.ualink.value);
    formData.append("description", event.target.description.value);

    const response = await fetch(`${endpoint}/api/rules/` + rule._id, {
      method: "PUT",
      body: formData,
    });
    if (response.ok === true) {
      const modal = document.getElementById("dataChangeModal");
      modal.close();

      const rule = await response.json();
      console.log(`Rule "${rule.title}" was upgraded! (id: ${rule._id})`);

      const refetch = await fetch(`${endpoint}/api/rules`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
      }
    }
  };

  const deleteRule = async () => {
    const response = await fetch(`${endpoint}/api/rules/${rule._id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const rule = await response.json();
      console.log(`rule "${rule.title}" was deleted! (id: ${rule._id})`);

      const refetch = await fetch(`${endpoint}/api/rules`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
        const modal = document.getElementById("deleteModal");
        modal.close();
      }
    }
  };

  const editModalShow = (event) => {
    let id = event.currentTarget.dataset.id;
    setRule(rules.find((elem) => elem._id === id));

    const modal = document.getElementById("dataChangeModal");
    modal.showModal();
  };

  const deleteModalShow = (event) => {
    let id = event.currentTarget.dataset.id;
    setRule(rules.find((elem) => elem._id === id));

    const modal = document.getElementById("deleteModal");
    modal.showModal();
  };

  return (
    <>
      <RulesForm onSubmit={createRule} />

      <RulesTable
        data={rules}
        caption="Список правил"
        deleteItem={deleteModalShow}
        editModalShow={editModalShow}
      />

      <RulesEditModal data={rule} onSubmit={changeRule} />

      <DeleteModal onSubmit={deleteRule} title="Видалити правило?" />
    </>
  );
}
