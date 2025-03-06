'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActiveSection] = useState(null);
  const [color, setColor] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  const elements = [
    {
      id: 'works',
      text: 'Trabajos'
    },
    {
      id: 'about',
      text: 'Nosotros'
    },
      {
        id:'contact',
        text: 'Contactos'
      }
    ]

    useEffect(()=>{
      const options ={
        root:null,
        rootMargin: "0px",
        threshold: 0.4
      };
      const observer = new IntersectionObserver((entries:any)=>{
        entries.forEach((entry:any) =>{
          if(entry.isIntersecting){
            setActiveSection(entry.target.id);
          }
        });
      }, options);
      elements.forEach((list:any)=>{
        const element = document.getElementById(list.id);
        if(element) observer.observe(element);
      });
      return () => observer.disconnect();
    }, [elements]);

    useEffect(()=>{
      const changeColor = () => {
        if(window.scrollY >= 90){
          setColor(true);
        } else {
          setColor(false);
        }
      }
      window.addEventListener('scroll', changeColor);
    })

  return (
    <nav className={`z-auto ${color?'bg-[#ffffff]':''}`}>
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-20 items-center justify-between">
        <div className="flex flex-1 items-stretch justify-start">
          <div className="flex shrink-0 items-center">
            {/* <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/> */}
            <img className="h-15 w-auto" src="./assets/1.png" alt="Tilinka"/>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              {elements.map((list:any)=>{
                return(
                  <Link key={list.id} href={`/#${list.id}`} className={`rounded-md px-3 border hover:border-emerald-900 py-2 text-gray-300 text-sm hover:font-bold ${isActive== list.id? "text-gray-800":""}`}>
                    {list.text}
                  </Link>
                )
              })}
             </div>
          </div>
          {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </button> */}
  
          {/* <!-- Profile dropdown --> */}
          <div className="relative ml-3">
            <div>
              <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                {/* <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
              </button>
            </div>
          </div>
        </div>
        <div className="flex inset-y-0 left-0 flex items-center sm:hidden">
          {/* <!-- Mobile menu button--> */}
          <button onClick={toggleDropdown} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            {
              isOpen ? 
                 <svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-slot="icon">
                 <path d="M6 18 18 6M6 6l12 12" />
               </svg>
               : 
                <svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
               
            }
          </button>
        </div>
      </div>
    </div>
  
    {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    {isOpen && (
      <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Trabajos</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Nosotros</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contacto</a>
      </div>
    </div>
    )}
  </nav>
  )
}