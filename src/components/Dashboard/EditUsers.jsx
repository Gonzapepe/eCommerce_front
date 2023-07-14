import React, { useEffect, useState } from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchUsers } from "../../redux/reducers/users/users.actions";
import Spinner from "../Spinner/Spinner";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import Pagination from "../../layouts/pagination/pagination";
import EditSubcategoryModal from "../../layouts/EditSubcategoryModal/EditSubcategoryModal";

const EditUser = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { users, isLoading } = useSelector((state) => state.users);

  const handleModal = (id) => {
    setIsOpen(!isOpen);
    if (id === undefined) {
      id = null;
    }
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchUsers(search));
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
                  Email
                </th>
                <th className="w-2/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Nombre y Apellido
                </th>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {users.users &&
                users.users.map((user) => (
                  <tr
                    className="border border-gray-400 border-b h-10"
                    key={user.id}
                  >
                    <td className="text-center border-gray-400 ">
                      {user.email}
                    </td>
                    <td className="text-center border-gray-400 ">
                      {user.name} {user.surname}
                    </td>
                    <td className="flex  justify-center items-center h-20">
                      <button
                        className="rounded bg-blue-500 p-2 mr-2 hover:bg-blue-500/50 "
                        onClick={() => handleModal(user.id)}
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
              <Pagination path="/edit/user" pagesCount={users.last_page} />
            </div>
          )}
        </div>
      </div>

      {isOpen && <EditSubcategoryModal handleModal={handleModal} id={id} />}
    </div>
  );
};

export default EditUser;
