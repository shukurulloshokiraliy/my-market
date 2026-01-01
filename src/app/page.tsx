import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center  ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  ">
       
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            To get started, edit the page.tsx file.
          </h1>
        
        </div>
     
      </main>
    </div>
  );
}
