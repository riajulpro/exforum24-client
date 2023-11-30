import { useState } from "react";
import ReportedCommentsTable from "./ReportedCommentsTable";
import useReports from "../../hooks/data/useReports";

const ReportedFrame = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { reports, isLoading, refetch } = useReports(currentPage);

  if (isLoading) {
    return "Loading...";
  }

  const pages = [...Array(reports?.totalPages).keys()];

  const showReports = reports?.data || [];

  return (
    <>
      <div>
        <ReportedCommentsTable reports={showReports} />
      </div>
      <div className="flex justify-center md:my-5">
        <div>
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
                refetch();
              }
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "bg-secondary text-white p-2 border-r"
                  : "bg-gray-100 p-2 border-r"
              }
              onClick={() => {
                setCurrentPage(page);
                refetch();
              }}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="bg-gray-100 p-2 border-r"
            onClick={() => {
              if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
                refetch();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportedFrame;
