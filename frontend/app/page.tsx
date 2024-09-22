import Link from "next/link";
export default function Home() {

  return (
    <div className="dark h-screen flex justify-center items-center">
      <div>
      <h1 className="text-gradient-to-r font-semibold from-slate-400 to-slate-700 text-3xl mb-3 ">Welcome to Kanban</h1>
      <Link className="bg-white rounded-xl w-fit py-2 px-3 text-black font-semibold" href={"/login"}>Get Started</Link>
      </div>
    </div>
  );
}
