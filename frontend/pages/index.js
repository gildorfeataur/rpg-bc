import { getSortedPostsData } from "../utils/games";
import Layout from "../components/layout/layout";
import Link from "next/link";
import FormattedDate from "../components/date/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <p>[Your Self Introduction]</p>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allPostsData.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <FormattedDate dateString={post.date} />
                </div>
                <div className="group relative">
                  <Link
                    href={`/games/${post.id}`}
                    className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                  >
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src="/avatars/profile.jpg"
                    alt=""
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 2151.65 2057.8"
            className="w-30 h-60 text-slate-300"
          >
            <path
              d="M1070.32 156.214L1070.29 156.339L959.193 393.558L959.193 1275.71C920.476 1272.52 874.194 1264.91 808.568 1246.4C713.268 1219.53 681.801 1196.68 673.162 1195.59C672.586 1195.52 672.11 1195.53 671.724 1195.65C668.922 1196.57 670.832 1202.91 672.787 1216.62C679.043 1260.5 694.287 1346.59 694.287 1346.59C694.287 1346.59 831.854 1445.66 937.631 1474.18C952.811 1478.28 966.607 1480.48 979.256 1481.46C980.609 1503.52 984.062 1534.97 988.724 1583.18C991.89 1615.91 995.288 1647.01 998.631 1675.4C964.425 1697.57 941.912 1735.29 941.912 1778.09C941.912 1846.31 999.112 1901.59 1069.66 1901.59C1140.21 1901.59 1197.38 1846.31 1197.38 1778.09C1197.38 1734.39 1173.85 1696.08 1138.44 1674.12C1142.03 1646.27 1145.73 1615.94 1149.19 1583.96C1154.43 1535.61 1158.28 1504.09 1159.88 1482.03C1176.06 1481.73 1194.08 1479.56 1214.04 1474.18C1319.81 1445.66 1457.38 1346.59 1457.38 1346.59C1457.38 1346.59 1472.63 1260.5 1478.88 1216.62C1480.84 1202.91 1482.71 1196.57 1479.91 1195.65C1473.75 1193.64 1444.75 1217.74 1343.1 1246.4C1270.43 1266.89 1221.24 1274.13 1180.1 1276.65L1180.1 393.558L1070.38 156.339L1070.32 156.214Z"
              fill="currentColor"
              fillRule="nonzero"
              opacity="1"
              stroke="none"
            />
          </svg>
        </div>
      </div>
    </Layout>
  );
}
