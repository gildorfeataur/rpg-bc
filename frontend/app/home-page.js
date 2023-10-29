'use client'
import Link from "next/link";
import FormattedDate from "../components/date/date";

export default function GamesPage({data}) {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data.map((post) => (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <FormattedDate dateString={post.date}/>
                </div>
                <div className="group relative">
                  <Link
                    href={`/games/${post._id}`}
                    className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                  >
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src="/avatars/profile.jpg"
                    alt="avatar"
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.master}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.system}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}