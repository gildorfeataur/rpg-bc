"use client";
import React, { useTransition, useState } from "react";
import TabButton from "./tab-button/tab-button";
import GamesTab from "./games-tab/games-tab";
import MastersTab from "./masters-tab/masters-tab";
import RulesTab from "./rules-tab/rules-tab";

export default function AdminPage({}) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("rules");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <div className="flex gap-1">
        <TabButton
          isActive={tab === "games"}
          onClick={() => selectTab("games")}
          className="rounded-t-lg px-4 py-2"
        >
          Ігри
        </TabButton>

        <TabButton
          isActive={tab === "masters"}
          onClick={() => selectTab("masters")}
          className="rounded-t-lg px-4 py-2"
        >
          Майстри
        </TabButton>

        <TabButton
          isActive={tab === "rules"}
          onClick={() => selectTab("rules")}
          className="rounded-t-lg px-4 py-2"
        >
          Правила
        </TabButton>
      </div>

      <div className="border border-slate-400 border-t-0 p-4 bg-neutral-100">
        {tab === "games" && <GamesTab />}
        {tab === "masters" && <MastersTab />}
        {tab === "rules" && <RulesTab />}
      </div>
    </>
  );
}