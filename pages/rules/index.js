import React from "react";
import Layout from "../../components/layout/layout";

export async function getStaticProps() {
  let rules = [];
  const response = await fetch("http://localhost:3000/api/rules", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (response.ok === true) {
    rules = await response.json();
  }
  return {
    props: {
      rules,
    },
  };
}

export default function Rules({ rules }) {
  return (
    <Layout children={undefined}>
      <h2 className="p-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Правила для настільних ігор/систем
      </h2>
      <div className="p-6 grid grid-flow-row auto-rows-max hover:auto-rows-min">
        {rules.map((item) => (
          <div className="border-t-2 py-4" key={item._id}>
            <h2 className="text-xl pb-3 font-medium">{item.title}</h2>
            <p className="text-base text-gray-500 pb-2">{item.description}</p>
            <div className="flex gap-x-6">
              <a target="_blank" href={item.link}>
                Офіційний сайт
              </a>
              <a target="_blank" href={item.ualink}>
                Українська версія
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
