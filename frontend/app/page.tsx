import ThemeSwitch from "./components/themeSwitch";
import { useLogin } from "./hooks";

export default function Home() {

  return (
    <div className="dark h-screen flex justify-center items-center">
      <h1 className="text-gradient-to-r font-semibold from-slate-400 to-slate-700 text-3xl">Welcome to Kanban</h1>
    </div>
  );
}
