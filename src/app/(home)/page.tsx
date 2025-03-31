"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
// import ThreeScene from "@/components/ThreeScene";
import { useRef } from "react";
import gsap from "gsap";
// import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(useGSAP);

export default function Home() {
  // const { contextSafe } = useGSAP();
  // useGSAP(() => {
  //   gsap.to('.box', { x: 360 });
  //   },);

  // wrapped in contextSafe() - animation will be cleaned up correctly
  // const onEnter = contextSafe(({ currentTarget }:{currentTarget:any}): void => {
  //   gsap.to(currentTarget, { rotation: "+=360" });
  // });
  return (
      <div className="px-6 lg:px-8">
        <section id="home" className="mx-auto max-w-4xl min-h-screen flex flex-col justify-center items-center text-center">
          {/* <div className="grid grid-cols-[50%_1fr]">
            <div className="pt-30 text-center"> */}
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-100 sm:text-7xl">
                Especialistas en experiencias interactivas
              </h1>
              <p className="box mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                “Todo lo que tu evento necesite”
              </p>
              {/* <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="roundpalette-bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visiblepalette-bg-gray-900"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div> */}
            {/* </div> */}
            {/* <ThreeScene/> */}
          {/* </div> */}
        </section>
        <section id="works" className="mx-auto max-w-6xl min-h-screen flex flex-col justify-center">
              <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-center text-gray-800">
              {[
            { icon: "meta", title: "Anfitriones", subtitle: "Metahumanos/Personajes" },
            { icon: "grid", title: "Videojuegos", subtitle: "Tótem Touch/Móvil/PC" },
            { icon: "vr", title: "Metaverso", subtitle: "Realidad Virtual/Aumentada" },
            { icon: "web", title: "Web", subtitle: "1854/Sitios corporativos" },
          ].map((item, index) => (
            <li key={index} className="flex items-center p-4 border-b-2 border-transparent rounded-lg hover:border-gray-300">
              <div className="w-8 h-8 bg-gray-400 rounded-full">{item.icon}</div>
              <div className="ml-3 text-center">
                <span className="text-xs text-gray-300">{item.subtitle}</span>
                <br />
                <strong className="text-2xl text-white">{item.title}</strong>
              </div>
            </li>
          ))}
              </ul>
            <div className="h-110 border rounded-xl border-gray-900 bg-white overflow-hidden mt-2">
                <div className="grid grid-cols-[50%_1fr] h-full">
                  <div className="p-7 text-justify text-gray-600">
                    Software
                    <br />
                    <p className="text-xl">Tótem Touch</p>
                    <br />
                    <button className="bg-amber-300 rounded p-3 text-amber-600">Prueba gratis</button>
                    <br />
                    <small>Programas para tótem touch en tiempo récord, control total de la experiencia, ciencia de datos y mucho más.</small>
                  </div>
              <div className="flex justify-center items-center bg-gradient-to-t from-amber-200 to-gray-50">
                  <img className="w-auto h-100" src="/assets/totem/Totem1.png" />
              </div>
                </div>
              </div>
            {/* <div className="grid grid-cols-[1fr_20%]">
    <div className="bg-red-500 p-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cumque nobis perspiciatis illo non! Possimus molestias id vel omnis dolores dicta neque ullam ex mollitia architecto minima optio, nobis hic soluta sequi illum facere cumque iure! Eaque itaque, fugit, ex eveniet beatae sit alias nostrum, earum obcaecati a voluptate totam.</div>
    <div className="bg-green-500 flex justify-center items-center w-full h-full"><p className="bg-yellow-500 [writing-mode:vertical-lr] text-5xl">Lorem, ipsum.</p></div>
  </div> */}
        </section>
        <section id="about" className="mx-auto max-w-6xl min-h-screen flex flex-col justify-center text-center">
          <strong className="text-5xl">Nosotros</strong>
          <p className="p-7 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab illo sed
            cumque! Perferendis adipisci eius commodi deserunt expedita, delectus
            totam fuga at quos quibusdam voluptas impedit non fugiat libero,
            dolores tempore. Modi id, ad quibusdam iusto reiciendis consequatur
            dignissimos? Voluptate laborum quos tempora illum quibusdam labore
            aliquid atque modi cupiditate.
          </p>
        </section>
        <section id="contact" className="mx-auto max-w-6xl min-h-screen flex flex-col justify-center text-center">
          <strong className="text-5xl">Contacto</strong>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <div className="mt-6">
    <p className="p-7 text-justify text-gray-600">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab illo sed
      cumque! Perferendis adipisci eius commodi deserunt expedita, delectus
      totam fuga at quos quibusdam voluptas impedit non fugiat libero,
      dolores tempore. Modi id, ad quibusdam iusto reiciendis consequatur
      dignissimos? Voluptate laborum quos tempora illum quibusdam labore
      aliquid atque modi cupiditate.
    </p>
  </div>
  <div className="border rounded-xl border-gray-900 bg-gradient-to-br from-amber-200/5 from-0% via-yellow-100 p-4 m-2">
    <h3 className="m-3 text-center text-2xl bg-gray-900 rounded-xl p-2">Formulario de contacto</h3>
    <form>
      <div className="grid grid-cols-1 text-start sm:grid-cols-2 gap-4 p-4 text-gray-900">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border shadow-xl border-gray-900 rounded-sm"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            type="email"
            className="mt-1 p-2 w-full border shadow-xl border-gray-900 rounded-sm"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Asunto
          </label>
          <textarea
            className="mt-1 p-2 w-full border shadow-xl border-gray-900 rounded-sm"
          />
        </div>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900"
        >
          ENVIAR
        </button>
      </div>
    </form>
  </div>
</div>

        </section>
      </div>
  );
}
