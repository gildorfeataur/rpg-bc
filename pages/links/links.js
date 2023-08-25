import React from "react";
import Layout from "../../components/layout/layout";

export default function Links() {
  return (
    <Layout children={undefined}>
      <h2 className="text-2xl">Корисні посилання</h2>
      <div className="grid grid-flow-row auto-rows-max gap-y-4 hover:auto-rows-min">
        <div className="bg-gradient-to-tr shadow-md rounded">
          1
        </div>
        <div className="bg-gradient-to-tr shadow-md rounded">
          2
        </div>
        <div className="bg-gradient-to-tr shadow-md rounded">
          3
        </div>
      </div>
    </Layout>
  );
}