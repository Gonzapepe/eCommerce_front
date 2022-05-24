import React from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";

const EditProduct = () => {
  return (
    <div className="relative w-full h-screen flex flex-row">
      <DashboardSidebar />
      <div className="w-full h-screen ">
        <div className="absolute left-1/2 top-1/3 ">Edit Product</div>
      </div>
    </div>
  );
};

export default EditProduct;
