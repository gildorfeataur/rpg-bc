import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Paginator from "../../components/paginator/paginator-controler";
import Image from "next/image";
import imgPlaceholder from "../../public/images/dice.jpg";
import iconInstagram from "../../public/icons/instagram.svg";
import iconFacebook from "../../public/icons/facebook.svg";
import iconTelegram from "../../public/icons/telegram.svg";

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
  const itemsPerPage = 6;
  const [pageCollection, setPageCollection] = useState(
    masters.slice(0, itemsPerPage)
  );

  const pageChangeHandler = (start, end) => {
    setPageCollection(masters.slice(start, end + 1));
  };
  return (
    <Layout children={undefined}>
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Наші майстри
        </h2>

        <div className="mx-auto my-16 max-w-5xl max-h-310 grid grid-cols-3 grid-rows-2 gap-12">
          {pageCollection.map((item) => (
            <div key={item._id} className="flex flex-col items-center gap-4 h-72">
              <Image
                className="h-24 w-24 rounded-full border bg-slate-200 border-slate-500"
                src={item.imageUrl ? item.imageUrl : imgPlaceholder}
                alt="avatar"
                width={120}
                height={120}
              />

              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                {item.name}
              </h2>

              <div className="flex gap-4 text-sm font-semibold leading-6 text-indigo-600">
                {item.telegram && (
                  <a
                    target="_blank"
                    href={item.telegram}
                    className="scale transition-all hover:scale-110"
                  >
                    <Image
                      src={iconTelegram}
                      width={28}
                      height={28}
                      alt="insta"
                    />
                  </a>
                )}
                {item.instagram && (
                  <a
                    target="_blank"
                    href={item.instagram}
                    className="scale transition-all hover:scale-110"
                  >
                    <Image
                      src={iconInstagram}
                      width={28}
                      height={28}
                      alt="insta"
                    />
                  </a>
                )}
                {item.facebook && (
                  <a
                    target="_blank"
                    href={item.facebook}
                    className="scale transition-all hover:scale-110"
                  >
                    <Image
                      src={iconFacebook}
                      width={28}
                      height={28}
                      alt="insta"
                    />
                  </a>
                )}
              </div>

              <p className="text-center text-neutral-500 line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Paginator
          pageChangeHandler={pageChangeHandler}
          itemsPerPage={itemsPerPage}
          allItemsCount={masters.length}
        />
      </div>
    </Layout>
  );
}
