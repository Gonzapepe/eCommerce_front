import React from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";

const EditSubcategory = () => {
  return (
    <div className="relative w-full h-screen flex flex-row">
      <DashboardSidebar />
      <div className="w-full h-screen ">
        <div className="absolute left-1/2 top-1/3 ">Editar subcategoria</div>
      </div>
    </div>
  );
};

export default EditSubcategory;
