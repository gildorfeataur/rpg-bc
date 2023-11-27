import React from "react";

export async function generateStaticParams() {
  const posts = await fetch("http://localhost:3000/api/games/").then((res) =>
    res.json()
  );

  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function getPost(params) {
  const res = await fetch(`http://localhost:3000/api/games/${params.id}`);
  const post = await res.json();

  return post;
}

export default async function Post({ params }) {
  const postData = await getPost(params);

  return (
    <>
      <h1 className="text-3xl border-b-2 border-gray-300 pb-2">{postData.title}</h1>
      <h2 className="text-lg my-3 text-gray-500">Дата гри: {postData.date}</h2>
      <div className="grid gap-2">
        <h3>Правила: {postData.rules}</h3>
        <h3>Тип гри: {postData.type}</h3>
        <h3>Майстер: {postData.master}</h3>
        <h3>Ціна: {postData.cost}</h3>
        <h3>Місце проведення: {postData.place}</h3>
        <h3>
          Кількість гравців: {postData.minPlayersCount} -{" "}
          {postData.maxPlayersCount}
        </h3>
      </div>

      <p className="text-gray-400 mt-4">{postData.description}</p>
    </>
  );
}
