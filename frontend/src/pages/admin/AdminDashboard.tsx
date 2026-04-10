import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/adminlayout";
import API from "../../api/api";
import toast from "react-hot-toast";
import {
  FileText,
  GraduationCap,
  Building2,
  Globe,
  BookOpen,
  UserCheck,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const email = localStorage.getItem("email") || "Admin";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/");
      setData(res.data);
    } catch {
      toast.error("Dashboard load failed");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!data)
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );

  const appCards = [
    { label: "Total", value: data.applications.total, icon: FileText, color: "blue", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    { label: "Approved", value: data.applications.approved, icon: CheckCircle, color: "green", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    { label: "Pending", value: data.applications.pending, icon: Clock, color: "amber", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
    { label: "Rejected", value: data.applications.rejected, icon: XCircle, color: "red", bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
  ];

  const systemCards = [
    { label: "Colleges", value: data.system.colleges, icon: Building2 },
    { label: "Domains", value: data.system.domains, icon: Globe },
    { label: "Courses", value: data.system.courses, icon: BookOpen },
    { label: "Mentors", value: data.system.mentors, icon: UserCheck },
    { label: "Users", value: data.system.users, icon: Users },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-7 text-white shadow-xl shadow-blue-200">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-24 w-32 h-32 bg-white rounded-full translate-y-1/2" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">{getGreeting()} 👋</p>
              <h1 className="text-2xl font-bold">{email}</h1>
              <p className="mt-1.5 text-blue-200 text-sm">Here's what's happening in your system today</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
              <TrendingUp size={20} className="text-blue-200" />
              <div>
                <p className="text-xs text-blue-200">Total Students</p>
                <p className="text-xl font-bold">{data.students.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Stats */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">Applications Overview</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {appCards.map(({ label, value, icon: Icon, bg, text, border }) => (
              <div key={label} className={`bg-white rounded-2xl p-5 border ${border} shadow-sm hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={19} className={text} />
                </div>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Students */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">Students by College</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
              <GraduationCap size={17} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">College Distribution</span>
              <span className="ml-auto bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">{data.students.total} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {data.students.by_college.map((s: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {s.college__name?.charAt(0) || "?"}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{s.college__name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System Overview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">System Overview</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {systemCards.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={19} className="text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Courses */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">Courses</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {data.courses.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <BookOpen size={13} className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{c.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    {c.college_count} Colleges
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </AdminLayout>
  );
}