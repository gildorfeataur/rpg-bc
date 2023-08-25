import React from "react";
import Layout from "../../components/layout/layout";

export default function Rules() {
  return (
    <Layout children={undefined}>
      <h2 className="p-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Правила для настільних ігор/систем
      </h2>
      <div className="p-6 grid grid-flow-row auto-rows-max hover:auto-rows-min">
        <div className="border-y-2 py-4">
          <h2 className="text-xl pb-3 font-medium">Dungeons and Dragons</h2>
          <p className="text-base text-gray-500 pb-2">Та сама класична D&D, DnD, ДНД, Підземелля та Дракони — це настільна рольова гра в жанрі фентезі, розроблена Ґері Ґайґексом і Дейвом Арнесоном.</p>
          <div className="flex gap-x-6">
            <a target="_blank" href="https://dnd.wizards.com/">офіційний сайт</a>
            <a target="_blank" href="https://5esrd.kyiv.ua//">DnD українською</a>
          </div>
        </div>
        <div className="border-b-2 py-4">
          <h2 className="text-xl pb-3 font-medium">Magic: The Gathering</h2>
          <p className="text-base text-gray-500 pb-2">Колекційна карткова гра, створена американським математиком Річардом Гарфілдом у 1993 році та опублікована Wizards of the Coast</p>
          <a target="_blank" href="https://magic.wizards.com/">офіційний сайт</a>
        </div>
        <div className="border-b-2 py-4">
          <h2 className="text-xl pb-3 font-medium">GURPS</h2>
          <p className="text-base text-gray-500 pb-2">Cистема настільних рольових ігор, призначена для гри в будь-яких умовах, створена Steve Jackson Games і опублікована в 1986 році.</p>
          <a target="_blank" href="http://www.sjgames.com/gurps/">офіційний сайт</a>
        </div>
        <div className="border-b-2 py-4">
          <h2 className="text-xl pb-3 font-medium">Call of Ctulhu</h2>
          <p className="text-base text-gray-500 pb-2">Рольова гра в жанрі жахів, заснована на однойменній історії Х.П. Лавкрафта та пов’язаному з нею міфа про Ктулху.</p>
          <a target="_blank" href="https://cthulhuwiki.chaosium.com/">офіційне вікі</a>
        </div>
        <div className="border-b-2 py-4">
          <h2 className="text-xl pb-3 font-medium">Cyberpunk</h2>
          <p className="text-base text-gray-500 pb-2">Настільна рольова гра в жанрі антиутопічної наукової фантастики, написана Майком Пондсмітом. Лягла в основу гри Syberpunk 2077</p>
          <a target="_blank" href="https://cyberpunk.fandom.com/wiki/Cyberpunk_2020">офіційне вікі</a>
        </div>
      </div>
    </Layout>
  );
}
