import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const MainPagination = (props) => {
  let { path, pagesCount } = props;
  const location = useLocation().search;
  const page = location ? location : 1;
  return (
    <div className="general-pagination">
      <Pagination
        variant="outlined"
        page={page}
        count={pagesCount}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${path + item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default MainPagination;
