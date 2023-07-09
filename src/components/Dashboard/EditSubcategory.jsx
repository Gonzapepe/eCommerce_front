import React, { useEffect, useState } from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSubcategories } from "../../redux/reducers/subcategories/subcategories.actions";
import Spinner from "../Spinner/Spinner";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import Pagination from "../../layouts/pagination/pagination";
import EditSubcategoryModal from "../../layouts/EditSubcategoryModal/EditSubcategoryModal";

const EditSubcategory = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { subcategories, isLoading } = useSelector(
    (state) => state.subcategories
  );

  const handleModal = (id) => {
    setIsOpen(!isOpen);
    if (id === undefined) {
      id = null;
    }
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchSubcategories(search));
  }, [dispatch, search]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className=" h-screen flex flex-row">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <div className="m-auto flex align-center justify-between w-9/12 h-screen overflow-y-scroll">
        <div className="w-full bg-gray">
          <div className="m-auto mt-3 flex flex-row justify-between align-center mb-3 w-11/12">
            <p className="ml-1 font-bold text-2xl"> Editar Productos</p>
          </div>
          <table className="bg-white justify-center align-center m-auto w-11/12 rounded">
            <thead className="">
              <tr>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Categoría
                </th>
                <th className="w-2/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Nombre
                </th>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {subcategories.subcategories &&
                subcategories.subcategories.map((subcategory) => (
                  <tr
                    className="border border-gray-400 border-b h-10"
                    key={subcategory.id}
                  >
                    <td className="text-center border-gray-400 ">
                      {subcategory.category}
                    </td>
                    <td className="text-center border-gray-400 ">
                      {subcategory.name}
                    </td>
                    <td className="flex  justify-center items-center h-20">
                      <button
                        className="rounded bg-blue-500 p-2 mr-2 hover:bg-blue-500/50 "
                        onClick={() => handleModal(subcategory.id)}
                      >
                        <Edit className="white" width="14" height="14" />
                      </button>
                      <button className="rounded bg-red-500 p-2 hover:bg-red-500/50">
                        <Trash className="white" width="14" height="14" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!isLoading && (
            <div className="mt-3 pb-5 flex m-auto align-center justify-center">
              <Pagination
                path="/edit/subcategory"
                pagesCount={subcategories.last_page}
              />
            </div>
          )}
        </div>
      </div>

      {isOpen && <EditSubcategoryModal handleModal={handleModal} id={id} />}
    </div>
  );
};

export default EditSubcategory;
