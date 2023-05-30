import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>

      {/* <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <hr /> */}
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};
