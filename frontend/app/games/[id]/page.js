import React from "react";

export async function generateStaticParams() {
  const posts = await fetch('http://localhost:3000/api/games/').then((res) => res.json())

  return posts.map((post) => ({
    id: post.id,
  }))
}

export async function getPost(params) {
  const res = await fetch(`http://localhost:3000/api/games/${params.id}`)
  const post = await res.json()

  return post
}

export default async function Post({params}) {
  const postData = await getPost(params)

  return (
    <>
      <h1>{postData.title}</h1>
      <h2>id is: {postData._id}</h2>
      <h3>date is: {postData.date}</h3>
    </>
  );
}