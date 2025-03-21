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

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // const onEnter = contextSafe(({ currentTarget }:{currentTarget:any}): void => {
  //   gsap.to(currentTarget, { rotation: "+=360" });
  // });
  return (
    <>
      <div className="container px-6 pt-14 lg:px-8">
        <section id="home" className="mx-auto max-w-4xl h-screen">
          <div className="grid grid-cols-[50%_1fr]">
            <div className="pt-30 text-center">
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
            </div>
            {/* <ThreeScene/> */}
          </div>
        </section>
        <section id="works" className="mx-auto max-w-6xl h-screen pt-20">
            {/* <strong className="text-5xl">Interactive / Softworks</strong> */}
              <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-center text-gray-800">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <img className="h-10 m-1" src="./assets/logo.png" alt="A" />
                    <div>
                      <span className="text-gray-300 text-xs">
                        Metahumanos/Personajes
                      </span>{" "}
                      <br />
                      <strong className="text-2xl">Anfitriones</strong>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center p-4 text-slate-100 border-b-2 border-gray-600 rounded-t-lg active group"
                    aria-current="page"
                  >
                    <svg
                      className="w-8 h-8 me-2 text-slate-100"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <div>
                      <span className="text-gray-300 text-xs">
                        Tótem Touch/Móvil/PC
                      </span>{" "}
                      <br />
                      <strong className="text-2xl">Videojuegos</strong>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <svg
                      className="w-8 h-8 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                    </svg>
                    <div>
                      <span className="text-gray-300 text-xs">
                        Realidad Virtual/Aumentada
                      </span>{" "}
                      <br />
                      <strong className="text-2xl">Metaverso</strong>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <svg
                      className="w-8 h-8 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <div>
                      <span className="text-gray-300 text-xs">
                        1854/Sitios corporativos
                      </span>{" "}
                      <br />
                      <strong className="text-2xl">Web</strong>
                    </div>
                  </a>
                </li>
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
        <section id="about" className="mx-auto max-w-6xl h-screen pt-25">
          <strong className="text-5xl">Nosotros</strong>
          <p className="p-7 text-justify text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab illo sed
            cumque! Perferendis adipisci eius commodi deserunt expedita, delectus
            totam fuga at quos quibusdam voluptas impedit non fugiat libero,
            dolores tempore. Modi id, ad quibusdam iusto reiciendis consequatur
            dignissimos? Voluptate laborum quos tempora illum quibusdam labore
            aliquid atque modi cupiditate.
          </p>
        </section>
        <section id="contact" className="mx-auto max-w-6xl h-screen pt-25">
          <strong className="text-5xl">Contacto</strong>
          <div className="grid grid-cols-2 mt-6">
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
            <div className="border rounded-xl border-gray-900 bg-gradient-to-br from-amber-200/5 from-0% via-yellow-100">
              <h3 className="m-3 text-center text-2xl bg-gray-900 rounded-xl p-1">Formulario de contacto</h3>
              <form>
                <div className="grid grid-cols-2 gap-4 p-4 text-gray-900">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="mt-1 px-5 w-full border shadow-xl border-gray-900 rounded-sm"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      className="mt-1 px-5 w-full border shadow-xl border-gray-900 rounded-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Asunto
                    </label>
                    <textarea
                      className="mt-1 px-5 w-full border shadow-xl border-gray-900 rounded-sm"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
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
    </>
  );
}
