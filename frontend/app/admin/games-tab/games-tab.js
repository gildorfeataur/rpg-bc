import React, { useEffect, useState } from "react";
import GamesForm from "./games-form/games-form";
import GamesTable from "./games-table/games-table";

export default function GamesTab() {
  const endpoint = "http://45.91.169.110:3000";
  const [games, setGames] = useState([]);
  const [masters, setMasters] = useState([]);
  const [rules, setRules] = useState([]);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${endpoint}/api/games`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok === true) {
        const games = await response.json();
        setGames(games);
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  async function addGame(event) {
    event.preventDefault();

    const response = await fetch(`${endpoint}/api/games`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        date: event.target.date.value,
        type: event.target.type.value,
        rules: event.target.rules.value,
        master: event.target.master.value,
        description: event.target.description.value,
        minPlayersCount: event.target.minPlayersCount.value,
        maxPlayersCount: event.target.maxPlayersCount.value,
        cost: event.target.cost.value,
        place: event.target.place.value,
      }),
    });
    if (response.ok === true) {
      const refetch = await fetch(`${endpoint}/api/games`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const games = await refetch.json();
        setGames(games);
        event.target.reset();
      }
    }
  }

  async function deleteGame(e) {
    let id = e.target.getAttribute("data-game-id");
    const response = await fetch(`${endpoint}/api/games/` + id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const game = await response.json();
      console.log(`"${game.title}" was deleted! (id: ${game._id})`);

      const refetch = await fetch(`${endpoint}/api/games`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (refetch.ok === true) {
        const games = await refetch.json();
        setGames(games);
      }
    }
  }

  const fetchMasters = async () => {
    const response = await fetch(`${endpoint}/api/masters`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const masters = await response.json();
      setMasters(masters);
    }
  };

  const fetchRules = async () => {
    const response = await fetch(`${endpoint}/api/rules`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const rules = await response.json();
      setRules(rules);
    }
  };

  const showHint = () => {
    setHint(!hint);
  };

  return (
    <>
      <GamesForm
        rules={rules}
        masters={masters}
        onSubmit={addGame}
        hint={hint}
        showHint={showHint}
        fetchRules={fetchRules}
        fetchMasters={fetchMasters}
      />

      <GamesTable data={games} caption="Список ігор" deleteItem={deleteGame} />
    </>
  );
}
