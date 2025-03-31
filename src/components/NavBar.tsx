'use client';
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActiveSection] = useState(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const elements = [
    { id: "home", text: "Inicio" },
    { id: "works", text: "Trabajos" },
    { id: "about", text: "Nosotros" },
    { id: "contact", text: "Contacto" }
  ];

    useEffect(()=>{
      const observer = new IntersectionObserver((entries:any)=>{
        entries.forEach((entry:any) =>{
          if(entry.isIntersecting){
            setActiveSection(entry.target.id);
          }
        });
      }, {threshold:0.4});
      elements.forEach((list:any)=>{
        const element = document.getElementById(list.id);
        if(element) observer.observe(element);
      });
      return () => observer.disconnect();
    }, []);


    const handleScroll = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -50;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        let start = window.scrollY;
        let startTime: number | null = null;
    
        function scrollStep(timestamp: number) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / 500, 1);
          window.scrollTo(0, start + (y - start) * progress);
          if (progress < 1) requestAnimationFrame(scrollStep);
        }
    
        requestAnimationFrame(scrollStep);
        window.history.pushState(null, "", `#${id}`);
      }
    };
    

  return (
    <nav className="z-auto rounded-xl mx-5 mt-1 bg-gray-900">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between items-center h-15">
            <img className="h-13 w-auto" src="./assets/LogoNegroW.png" alt="Tilinka"/>
        <div className="hidden sm:flex space-x-4">
              {elements.map((item:any)=>{
                return(
                  <button key={item.id} 
                  onClick={() => handleScroll(item.id)}
                   className={`rounded-md cursor-pointer px-3 border hover:border-slate-500 py-1 text-sm tracking-tight ${isActive== item.id? "bg-palette-003 text-gray-900":""}`}>
                    {item.text}
                  </button>
                )
              })}
          </div>
        <button onClick={toggleDropdown} type="button" className="sm:hidden p-2 text-gray-400 hover:bg-gray-700 rounded-md">
            {isOpen ? <X /> : <Menu/>}
          </button>
    </div>
    {isOpen && (
          <div className="sm:hidden space-y-1 px-2 pt-2 pb-3">
            {elements.map(({ id, text }) => (
              <button
              key={id}
              onClick={() => {
                handleScroll(id);
                setIsOpen(false);
              }}
              className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-500 ${
                isActive === id ? "text-white" : ""
              }`}
            >
              {text}
            </button>
            ))}
          </div>
        )}
  </nav>
  )
}