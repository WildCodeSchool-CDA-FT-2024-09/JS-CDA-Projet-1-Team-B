import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <button className="btn-red">Click Me</button>
      <Outlet />
    </>
  );
}

export default App;
