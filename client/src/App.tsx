import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <>
        <Navbar />
        <SearchBar />
        <Outlet />
        <Footer />
      </>
    </UserProvider>
  );
}

export default App;
