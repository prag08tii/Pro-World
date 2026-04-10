import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Internship from "./pages/Internship";
import Careers from "./pages/Careers";
import Features from "./pages/Features";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Students from "./pages/admin/Students";
import Applications from "./pages/admin/Applications";
import Mentor from "./pages/admin/mentor";
import Colleges from "./pages/admin/college";
import Courses from "./pages/admin/courses";
import Domains from "./pages/admin/domain";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/internship" element={<Layout><Internship /></Layout>} />
          <Route path="/careers" element={<Layout><Careers /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/works" element={<Layout><Works /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard"element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
          <Route path="/admin/users"element={<ProtectedRoute><Users /></ProtectedRoute>}/>
          <Route path="/admin/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/admin/mentor" element={<ProtectedRoute><Mentor /></ProtectedRoute>} />
          <Route path="/admin/colleges" element={<ProtectedRoute><Colleges /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/admin/domains" element={<ProtectedRoute><Domains /></ProtectedRoute>} />
          <Route path="/create-account/:token" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
