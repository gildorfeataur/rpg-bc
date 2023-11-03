import GamesPage from "./home-page"

async function getPosts() {
  const endpoint = "http://172.17.0.1:3000";
  const res = await fetch(`${endpoint}/api/games`)
  const games = await res.json()
  return games
}

export default async function Page() {
  const recentPosts = await getPosts()
  return <GamesPage data={recentPosts}/>
}