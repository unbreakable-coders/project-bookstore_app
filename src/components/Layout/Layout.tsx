import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      {/* TODO: Header */}
      
      <Outlet />

      {/* TODO: Footer */}
    </div>
  );
};
