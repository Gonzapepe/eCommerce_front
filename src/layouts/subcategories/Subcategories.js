import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategories } from "../../redux/reducers/subcategories/subcategories.actions";
import { useLocation } from "react-router-dom";

const Subcategory = ({ parentCallback }) => {
  const dispatch = useDispatch();
  const { subcategories, isLoading } = useSelector(
    (state) => state.subcategories
  );
  const search = useLocation().search;

  useEffect(() => {
    dispatch(fetchSubcategories(search));
  }, [dispatch, search]);

  const handleToggle = (name) => {
    parentCallback(name);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col mt-8">
      <h2 className="text-md font-medium text-gray-800 text-center ">
        {" "}
        Subcategorías{" "}
      </h2>
      <div className="mt-4 flex flex-col">
        {subcategories.subcategories &&
          subcategories.subcategories.map((subcategory) => {
            console.log(subcategory);
            return (
              <div key={subcategory.id} className="inline-block ml-10">
                <input
                  className="mr-1 align-middle"
                  type="checkbox"
                  id={subcategory.id}
                  name={subcategory.name}
                  value={subcategory.name}
                  onChange={() => handleToggle(subcategory.name)}
                />
                <label for={subcategory.id} className="align-middle">
                  {" "}
                  {subcategory.name}{" "}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Subcategory;
