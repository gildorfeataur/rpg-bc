import HomePage from "./home-page"

async function getPosts() {
  const endpoint = "http://localhost:3000";
  const res = await fetch(`${endpoint}/api/games`)
  const games = await res.json()
  return games
}

export default async function Page() {
  const recentPosts = await getPosts()
  return <HomePage data={recentPosts}/>
}