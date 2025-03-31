import NavBar from "@/components/NavBar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    // <html lang="en" className='scroll-smooth'>
    //   <body className="relative min-h-screen font-display body-style">
      <body className="relative min-h-screen font-display body-style">
      <header className="fixed top-0 w-full z-40">
        <NavBar></NavBar> 
      </header>
        {children}
      </body>
    //   </body>
    // </html>
  );
}
