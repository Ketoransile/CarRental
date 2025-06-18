import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
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
