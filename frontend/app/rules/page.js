async function getRules() {
  const endpoint = "http://46.101.101.96:3000";
  const response = await fetch(`${endpoint}/api/rules`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const rules = await response.json();
  return rules;
}

export default async function Rules() {
  const rules = await getRules();

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h2 className="p-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Правила для настільних ігор/систем
      </h2>
      <div className="p-6 grid grid-flow-row auto-rows-max hover:auto-rows-min">
        {rules.map((item) => (
          <div
            className="flex items-center border-t-2 py-4 h-40"
            key={item._id}
          >
            <div className="flex justify-center items-center mr-4 border w-[140px] h-[140px] shrink-0 bg-neutral-100">
              {item.photoPath ? (
                <img
                  src={item.photoPath}
                  alt="img"
                  className=""
                  width={140}
                  height={140}
                />
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 fill-slate-200 stroke-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              )}
            </div>

            <div>
              <h2 className="text-xl pb-3 font-medium">{item.title}</h2>
              <p className="text-base text-gray-500 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex gap-x-6">
                <a target="_blank" href={item.link}>
                  Офіційний сайт
                </a>
                {item.ualink && (
                  <a target="_blank" href={item.ualink}>
                    Українська версія
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
