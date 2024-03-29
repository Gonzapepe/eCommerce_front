import React from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="relative w-full h-screen flex flex-row">
      <DashboardSidebar />
      <div className="w-full h-screen ">
        <div className=" ">
          <p className=" absolute left-1/2 top-1/3 text-center text-black text-xl font-bold">
            Bienvenido, Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
