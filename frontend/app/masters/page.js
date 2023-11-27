import Image from "next/image";
import imgPlaceholder from "../../public/avatars/dice.jpg";
import iconInstagram from "../../public/icons/instagram.svg";
import iconFacebook from "../../public/icons/facebook.svg";
import iconTelegram from "../../public/icons/telegram.svg";

export async function getMasters() {
  const endpoint = "http://46.101.101.96:3000";
  const response = await fetch(`${endpoint}/api/masters`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const masters = await response.json();
  return masters;
}

export default async function Masters({}) {
  let masters = await getMasters();

  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Наші майстри
      </h2>

      <div className="mx-auto my-16 max-w-5xl max-h-310 grid grid-cols-3 grid-rows-2 gap-12">
        {masters.map((item) => (
          <div key={item._id} className="flex flex-col items-center gap-4 h-72">
            <Image
              className="rounded-full border bg-slate-200 border-slate-500"
              src={item.photoPath || imgPlaceholder}
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
    </div>
  );
}
