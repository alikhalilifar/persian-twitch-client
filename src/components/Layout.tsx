import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};
