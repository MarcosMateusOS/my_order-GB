import React from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import AdminArea from "../pages/Admin";

import History from "../pages/History";
import StoreRequest from "../pages/StoreRequest";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/history" element={<History />} />
        <Route path="/store" element={<StoreRequest />} />
        <Route path="/admin" element={<AdminArea />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
