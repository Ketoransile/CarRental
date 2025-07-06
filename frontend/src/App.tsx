import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

function App() {
  const fetchSession = useAuthStore((s) => s.fetchSession);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);
  return (
    <div className="bg-white text-black">
      <Header />
      <div className=" px-4 md:px-6 lg:px-10 xl:px-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
