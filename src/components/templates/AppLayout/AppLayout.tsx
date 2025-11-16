import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen">
      {/* TODO: Header буде тут */}
      <Outlet />
      {/* TODO: Footer буде тут */}
    </div>
  );
};
