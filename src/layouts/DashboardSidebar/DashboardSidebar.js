import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { ReactComponent as Plus } from "../../assets/icons/Plus.svg";

const DashboardSidebar = () => {
  return (
    <div>
      <div className="fixed top-0 bottom-0  p-2 w-3/12 h-screen text-center bg-white border-r border-black">
        <div className="h-10 border-b border-black border-solid">
          <p className="text-lg font-semibold text-black ">Admin Dashboard</p>
        </div>
        <div className="h-full flex flex-col">
          {/* Productos */}
          <div className="flex flex-row border-b border-black border-solid font-semibold text-black items-center text-left p-2">
            <Plus className="mr-1" height="14" width="14" />
            <Link to="/dashboard/add/product">Añadir producto</Link>
          </div>
          <div className="flex flex-row border-b border-black border-solid font-semibold text-black items-center text-left p-2">
            <Edit className="mr-1" height="14" width="14" />
            <Link to="/dashboard/edit/product">Editar productos</Link>
          </div>

          {/* Subcategorias */}
          <div className="flex flex-row border-b border-black border-solid font-semibold text-black items-center text-left p-2">
            <Plus className="mr-1" height="14" width="14" />
            <Link to="/dashboard/add/subcategory" className="w-full">
              Añadir subcategoría
            </Link>
          </div>
          <div className="flex flex-row border-b border-black border-solid font-semibold text-black items-center text-left p-2">
            <Edit className="mr-1" height="14" width="14" />
            <Link to="/dashboard/edit/subcategory">Editar subcategorías</Link>
          </div>
          {/* Usuarios */}
          <div className="flex flex-row border-b border-black border-solid font-semibold text-black items-center text-left p-2">
            <Edit className="mr-1" height="14" width="14" />
            <Link to="/dashboard/edit/user">Usuarios</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
