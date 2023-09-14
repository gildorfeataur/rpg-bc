import React from "react";
import Layout from "../../components/layout/layout";

export async function getStaticProps() {
  let masters = [];
  const response = await fetch("http://localhost:3000/api/masters", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (response.ok === true) {
    masters = await response.json();
  }
  return {
    props: {
      masters,
    },
  };
}

export default function Masters({ masters }) {
  return (
    <Layout children={undefined}>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Наші майстри
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ведучі настільних ігор, вони же ДМ-и. Від англійського DM -
              Dungeon Master.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {masters.map((person) => (
              <li key={person._id}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full border bg-slate-200 border-slate-500"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="flex gap-x-2 text-sm font-semibold leading-6 text-indigo-600">
                      <a target="_blank" href={person.telegram}>
                        Telegram
                      </a>
                      <a target="_blank" href={person.facebook}>
                        Facebook
                      </a>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
