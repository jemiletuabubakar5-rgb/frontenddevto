

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { DataProvider } from './context/DataContext'; // Import DataProvider
import AuthModal from './modals/AuthModal';
import Footer from "./components/Footer";
import BrandsSection from "./components/BrandsSection";
import Navbar from "./components/Navbar"; // Fixed typo in component name
import Detail from "./components/Detail";
import Modal from "./components/Modal";
import Home from "./Pages/Home";
import Adminsignin from "./Pages/Adminsignin";
import Dashboard from './components/Dashboard';
import MerchantCreation from './components/MerchantCreation';
import PostsList from './Pages/PostList';
import CreatePost from "./Pages/CreatePost";

function AppContent() {
  const location = useLocation();
  const hideNavbarFooterPaths = ["/Login", "/Adminsignin", "/admin/dashboard", "/Game"];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BrandsSection" element={<BrandsSection />} />
        <Route path="/Adminsignin" element={<Adminsignin />} />
        <Route path="/AuthModal" element={<AuthModal />} />
        <Route path="/Modal" element={<Modal />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/creation" element={<MerchantCreation />} />
      <Route path="/post/:id" element={<Detail />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <DataProvider> {/* Wrap everything with DataProvider */}
        <AppContent />
      </DataProvider>
    </Router>
  );
}

export default AppWrapper;
