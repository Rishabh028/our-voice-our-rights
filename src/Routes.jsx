import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import EducationCenter from './pages/education-center';
import ComparisonTool from './pages/comparison-tool';
import Dashboard from './pages/dashboard';
import DataTransparency from './pages/data-transparency';
import DistrictAnalysis from './pages/district-analysis';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/education-center" element={<EducationCenter />} />
        <Route path="/comparison-tool" element={<ComparisonTool />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-transparency" element={<DataTransparency />} />
        <Route path="/district-analysis" element={<DistrictAnalysis />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
