// import React from "react";

// import Nav from "./component/Nav";
import Home from "./component/Home";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Details from "./component/Details";
import Create from "./component/Create";

const App = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);
  return (
    <div className="h-screen w-screen flex ">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to={"/"}
          className="text-red-200  absolute left-64 font-semibold mt-3"
        >
          Home{" "}
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
    </div>
  );
};

export default App;
