import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Paginator from "../../components/paginator/paginator-controler";

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
  const itemsPerPage = 6
  const [pageCollection, setPageCollection] = useState(masters.slice(0, itemsPerPage))

  const pageChangeHandler = (start, end) => {
    setPageCollection(masters.slice(start, end+1))
  }
  return (
    <Layout children={undefined}>
      <div className="bg-white py-4 sm:py-3">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Наші майстри
        </h2>

        <div className="mx-auto grid grid-cols-3 grid-rows-2">
          {pageCollection.map((item) => (
            <div key={item._id} className="text-center">
              <img
                className="h-16 w-16 rounded-full border bg-slate-200 border-slate-500"
                src={item.imageUrl}
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {item.name}
                </h3>
                <p className="flex gap-x-2 text-sm font-semibold leading-6 text-indigo-600">
                  <a target="_blank" href={item.telegram}>
                    Telegram
                  </a>
                  <a target="_blank" href={item.facebook}>
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        <Paginator pageChangeHandler={pageChangeHandler} itemsPerPage={itemsPerPage} allItemsCount={masters.length} />
      </div>
    </Layout>
  );
}
