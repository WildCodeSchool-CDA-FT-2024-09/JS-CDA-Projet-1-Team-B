import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <UserProvider>
      <>
        <Navbar />
        <SearchBar />
        <Outlet />
      </>
    </UserProvider>
  );
}

export default App;
