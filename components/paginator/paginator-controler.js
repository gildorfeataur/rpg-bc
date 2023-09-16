import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import PaginatorView from "./paginator-view";

export default function Paginator({
  itemsPerPage,
  allItemsCount,
  pageChangeHandler,
}) {
  let allPagesCount = Math.ceil(allItemsCount / itemsPerPage);
  let allLinksArray = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(itemsPerPage-1);

  for (let index = 1; index <= allPagesCount; index++) {
    if (index) {
      allLinksArray.push(index);
    }
    if (index === allPagesCount) {
      break;
    }
  }

  // If press on page-'number' button
  const changePageNum = (page) => {
    setCurrentPage(page);
    setStart(page * itemsPerPage - itemsPerPage);
    setEnd(page * itemsPerPage - 1);
    pageChangeHandler(
      page * itemsPerPage - itemsPerPage,
      page * itemsPerPage - 1
    );
  };

  // If press 'Next'
  const pageNumIncrease = () => {
    if (currentPage !== allLinksArray.length) {
      let res = currentPage + 1;
      setCurrentPage(res);
      setStart(end + 1);
      setEnd(end + itemsPerPage);
      pageChangeHandler(end + 1, end + itemsPerPage);
    }
  };

  // If press 'Previous'
  const pageNumDecrease = () => {
    if (currentPage !== 1) {
      let res = currentPage - 1;
      setCurrentPage(res);
      setStart(start - itemsPerPage);
      setEnd(end - itemsPerPage);
      pageChangeHandler(start - itemsPerPage, end - itemsPerPage);
    }
  };
  return (
    <PaginatorView
      itemsPerPage={itemsPerPage}
      allItemsCount={allItemsCount}
      allLinksArray={allLinksArray}
      pageNumDecrease={pageNumDecrease}
      pageNumIncrease={pageNumIncrease}
      changePageNum={changePageNum}
      currentPage={currentPage}
    />
  );
}
