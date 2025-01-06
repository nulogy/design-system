import { SEPARATOR } from "./Pagination";

interface PaginationItemsToDisplay {
  totalPages: number;
  currentPage: number;
  maxVisiblePages?: number;
}

type PagesToDisplay = (number | typeof SEPARATOR)[];

function validateAndSetMaxVisiblePages(maxVisiblePages: number) {
  if (maxVisiblePages < 3) {
    console.error("Pagination maxVisiblePages prop must larger than 2. Value changed to 3.");
    return 3;
  }

  if (maxVisiblePages > 12) {
    console.error("Pagination maxVisiblePages prop must smaller than 13. Value changed to 12.");
    return 12;
  }

  return maxVisiblePages;
}

export function getPageItemsToDisplay({
  totalPages,
  currentPage,
  maxVisiblePages = 6,
}: PaginationItemsToDisplay): PagesToDisplay {
  const pages: PagesToDisplay = [];
  maxVisiblePages = validateAndSetMaxVisiblePages(maxVisiblePages);

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const remainingPages = maxVisiblePages - 2;
  const half = Math.floor((remainingPages - 1) / 2);

  let left = currentPage - half;
  let right = currentPage + Math.ceil((remainingPages - 1) / 2);

  if (left < 2) {
    left = 2;
    right = left + remainingPages - 1;
  }

  if (right > totalPages - 1) {
    right = totalPages - 1;
    left = right - remainingPages + 1;
  }

  pages.push(1); // always include the first page

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < totalPages - 1) pages.push("...");

  pages.push(totalPages); // always include the last page

  return pages;
}
