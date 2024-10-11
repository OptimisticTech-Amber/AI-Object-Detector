import Image from "next/image";
import Detection from "@/components/detection";
export default function Home() {
  return (
    <main className="flex items-center flex-col min-h-screen p-8">
      <h1 className="gradient-title tracking-tighter md:px-6 text-center md:text-6xl text-2xl font-extrabold">
        AI ObJecT DeTecTion </h1>
         <Detection/>
    </main>
  );
}
