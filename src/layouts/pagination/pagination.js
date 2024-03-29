import { Link, useSearchParams } from "react-router-dom";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const MainPagination = (props) => {
  let { path, pagesCount } = props;
  let [searchParams] = useSearchParams();
  const location = searchParams.get("page");
  const page = parseInt(location ? location : 1);
  console.log("SEARCH PARAMS: ", searchParams.get("page"));
  return (
    <div className="general-pagination">
      <Pagination
        variant="outlined"
        page={page}
        count={pagesCount}
        hidePrevButton={page === 1}
        renderItem={(item) => {
          return (
            <PaginationItem
              component={Link}
              to={`${path + item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          );
        }}
      />
    </div>
  );
};

export default MainPagination;
