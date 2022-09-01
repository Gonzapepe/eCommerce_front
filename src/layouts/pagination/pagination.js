import React from "react";
import { Route, Routes } from "react-router";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const MainPagination = (props) => {
  let { path, pagesCount } = props;
  const location = useLocation().search;
  return (
    <div className="general-pagination">
      <Routes>
        <Route path={`${path}`}>
          {() => {
            console.log("LOCATION FROM MAIN PAGINATION: ", location);
            // const page = parseInt(query.get("page") || "1", 10);
            const page = location ? location : 1;
            return (
              <Pagination
                variant="outlined"
                page={page}
                count={pagesCount}
                renderItem={(item) => {
                  console.log("ITEM: ", item);
                  return (
                    <PaginationItem
                      component={Link}
                      to={`${
                        path + item.page === 1 ? "" : `?page=${item.page}`
                      }`}
                      {...item}
                    />
                  );
                }}
              />
            );
          }}
        </Route>
      </Routes>
    </div>
  );
};

export default MainPagination;
