import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-20 gap-5">
      <Outlet />
    </div>
  );
};

export default HomePage;
