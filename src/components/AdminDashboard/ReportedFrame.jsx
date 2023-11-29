import { useEffect, useState } from "react";
import useReports from "../../hooks/data/useReports";
import ReportedCommentsTable from "./ReportedCommentsTable";

const ReportedFrame = () => {
  const { reports = [] } = useReports();

  return (
    <div>
      <ReportedCommentsTable reports={reports} />
    </div>
  );
};

export default ReportedFrame;
