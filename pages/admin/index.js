import React, { useTransition, useState } from "react";
import Layout from "../../components/layout/layout";
import Head from "next/head";
import GamesTable from "./games-table";
import MastersTable from "./masters-table";
import RulesTable from "./rules-table";
import TabButton from "./tab-button";

const siteTitle = "Admin panel";

// export async function getStaticProps(context) {
//   let users = undefined;
//   const response = await fetch("http://localhost:3000/api/users", {
//     method: "GET",
//     headers: { Accept: "application/json" },
//   });
//   if (response.ok === true) {
//     users = await response.json();
//   }
//   return {
//     props: {
//       users,
//     },
//     revalidate: 5,
//   };
// }

export default function AdminPage({}) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("games");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

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
        {tab === "games" && <GamesTable />}
        {tab === "masters" && <MastersTable />}
        {tab === "rules" && <RulesTable />}
      </div>
    </Layout>
  );
}
