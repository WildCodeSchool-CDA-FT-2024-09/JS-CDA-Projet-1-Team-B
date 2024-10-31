import { Outlet } from "react-router-dom";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <button className="btn-red">Click Me</button>
      <SearchBar />
      <Outlet />
    </>
  );
}

export default App;
