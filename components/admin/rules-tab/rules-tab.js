import React, { useEffect, useState } from "react";
import RulesTable from "./rules-table/rules-table";
import RulesForm from "./rules-form/rules-form";

export default function RulesTab() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/rules", {
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

  async function createRule(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/rules", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        link: event.target.link.value,
        ualink: event.target.ualink.value,
        description: event.target.description.value,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
        event.target.reset();
      }
    }
  }

  async function deleteRule(e) {
    let id = e.target.getAttribute("data-id");
    const response = await fetch("http://localhost:3000/api/rules/" + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const rule = await response.json();
      console.log(`rule "${rule.name}" was deleted! (id: ${rule._id})`);

      const refetch = await fetch("http://localhost:3000/api/rules", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const rules = await refetch.json();
        setRules(rules);
      }
    }
  }

  return (
    <>
      <RulesForm onSubmit={createRule} />

      <RulesTable data={rules} caption="Список правил" deleteItem={deleteRule} />
    </>
  );
}
