import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import ProtectedRoute from "./components/ProtectedRoute";

import TemplatesPage from "./pages/templates";
import TemplateEditorPage from "./pages/templates/template-editor";
import InfoPage from "./pages/info";
import ComingSoonPage from "./pages/coming-soon";
import ReportsPage from "./pages/reports";
import ReportEditorPage from "./pages/reports/report-editor";
import MyOrganizationPage from "./pages/organization";

function App() {
  return (
    <div className="h-screen overflow-y-auto">
      <Routes>
        <Route path="/" element={<Navigate to={`/dashboard`} />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route
          path="/auth"
          element={
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoute>
              <MyOrganizationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/:id"
          element={
            <ProtectedRoute>
              <TemplateEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/:templateId/:id"
          element={
            <ProtectedRoute>
              <ReportEditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
