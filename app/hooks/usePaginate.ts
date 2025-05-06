import { useState } from "react";
import { usePagination } from "@mantine/hooks";

type Props = {
  totalItems: number;
  limit: number;
  startPaginate?: number;
};

const usePaginate = ({ totalItems, limit, startPaginate }: Props) => {
  const [page, setPage] = useState(startPaginate || 1);
  const total = totalItems;
  const pagination = usePagination({
    total,
    initialPage: 1,
    page,
    onChange: setPage,
  });

  const totalPages = Math.ceil(total / limit);
  const message = `Mostrando ${limit * (page - 1) + 1} – ${Math.min(
    total,
    limit * page
  )} de ${total}`;

  const startPage = (pagination.active - 1) * limit;
  const endPage = pagination.active * limit;

  return { totalPages, message, startPage, endPage, page, setPage, pagination };
};

export default usePaginate;
