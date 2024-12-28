import BaseButton from "../../components/base/BaseButton";
import DocumentCard from "../../components/DocumentCard";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import { deleteReport, getAllReports } from "../../api/reports";
import CreateReport from "../../components/dialogs/reports/CreateReport";

export default function ReportsPage() {
  const auth = useAuthContext();
  const [reports, setReports] = useState([]);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState();

  const fetchReports = async () => {
    const reportResponse = await getAllReports(auth.currentUser._id);
    setReports(reportResponse);
  };

  const deletReportHandler = async (reportId) => {
    // Delete the document here
    await deleteReport(reportId);
    setReports(reports.filter((element) => element._id !== reportId));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <div className="w-full py-4 px-8 bg-white flex justify-end items-center">
        <BaseButton
          buttonText="Create New"
          onClick={() => setIsReportDialogOpen(true)}
        />
      </div>
      <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((report, index) => (
          <DocumentCard
            id={report._id}
            organizationId={report.organizationId}
            navigate={`${report.templateId}/${report._id}`}
            title={report.name}
            basePath="reports"
            modifiedAt={formatDate(report.modifiedAt)}
            actionsVisible={true}
            deleteDocumentHandler={() => deletReportHandler(report._id)}
            key={index}
            identifier="report"
          />
        ))}
      </div>
      {isReportDialogOpen && (
        <CreateReport
          user={auth.currentUser}
          documents={reports}
          isOpen={isReportDialogOpen}
          toggleDialog={() => setIsReportDialogOpen(false)}
        />
      )}
    </div>
  );
}
