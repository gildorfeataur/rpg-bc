import React from "react";
import Layout from "../../components/layout/layout";

const people = [
  {
    name: "Юрій Зубар",
    role: "DnD, MTG, Ctulhu",
    imageUrl: "/images/dice.jpg",
    facebook: "https://www.facebook.com/yurij.zubar",
    telegram: "https://t.me/YuriiZubar",
  },
  {
    name: "Дуновський Максим",
    role: "DnD, GURPS",
    imageUrl: "/images/dice.jpg",
    facebook: "https://www.facebook.com/maxim.dunovskiy",
    telegram: "https://t.me/TPrometey",
  },
  {
    name: "Громадський Евген",
    role: "DnD, WTM",
    imageUrl: "/images/dice.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100002981517559",
    telegram: "https://t.me/Firepaladin",
  },
  {
    name: "Кір'янов Богдан",
    role: "DnD, Cyberpunk",
    imageUrl: "/images/dice.jpg",
    facebook: "https://www.facebook.com/gildorfeataur",
    telegram: "https://t.me/GildorFeataur",
  },
];

export default function Masters() {
  return (
    <Layout children={undefined}>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Наші майстри
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ведучі настільних ігор, вони же ДМ-и. Від англійського DM - Dungeon Master.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-gray-600">
                      Системи: {person.role}
                    </p>
                    <p className="flex gap-x-2 text-sm font-semibold leading-6 text-indigo-600">
                      <a target="_blank" href={person.telegram}>Telegram</a>
                      <a target="_blank" href={person.facebook}>Facebook</a>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
