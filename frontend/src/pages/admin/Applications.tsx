import { useEffect, useState } from "react";
import API from "../../api/api";
import AdminLayout from "../../components/admin/adminlayout";
import { Plus, Check, X, Edit2, Trash2, FileText, ChevronDown } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "approved" ? "bg-emerald-500" : status === "rejected" ? "bg-red-500" : "bg-amber-500"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Select = ({ label, onChange, children }: any) => (
  <div className="relative">
    <select
      onChange={onChange}
      className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8"
    >
      {children}
    </select>
    <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function Applications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [collegeFilter, setCollegeFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [showForm, setShowForm] = useState(false);
  const [editApp, setEditApp] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "", email: "", roll_no: "", mobile_no: "",
    college: null as number | null,
    course: null as number | null,
    domain: null as number | null,
    status: "pending",
  });

  const fetchAll = async () => {
    try {
      const [apps, colg, course, dom] = await Promise.all([
        API.get("/applications/"), API.get("/colleges/"),
        API.get("/courses/"), API.get("/domains/"),
      ]);
      setApplications(apps.data || []);
      setFilteredApps(apps.data || []);
      setColleges(colg.data || []);
      setCourses(course.data || []);
      setDomains(dom.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    let data = [...applications];
    if (collegeFilter) data = data.filter(a => a.college_name === collegeFilter);
    if (courseFilter) data = data.filter(a => a.course_name === courseFilter);
    if (domainFilter) data = data.filter(a => a.domain_name === domainFilter);
    if (statusFilter) data = data.filter(a => a.status === statusFilter);
    if (sortBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "roll_no") data.sort((a, b) => a.roll_no.localeCompare(b.roll_no));
    else data.sort((a, b) => a.id - b.id);
    setFilteredApps(data);
  }, [applications, collegeFilter, courseFilter, domainFilter, statusFilter, sortBy]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["college", "course", "domain"].includes(name)
        ? value === "" ? null : Number(value)
        : value,
    }));
  };

  const openAdd = () => {
    setEditApp(null);
    setFormData({ name: "", email: "", roll_no: "", mobile_no: "", college: null, course: null, domain: null, status: "pending" });
    setShowForm(true);
  };

  const openEdit = (app: any) => {
    setEditApp(app);
    setFormData({ name: app.name, email: app.email, roll_no: app.roll_no, mobile_no: app.mobile_no, college: app.college, course: app.course, domain: app.domain, status: app.status });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (editApp) await API.put(`/applications/${editApp.id}/`, formData);
      else await API.post(`/applications/`, formData);
      fetchAll();
      setShowForm(false);
    } catch (err: any) {
      console.error("SUBMIT ERROR:", err.response?.data || err);
      alert("Error saving application!");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this application?")) {
      await API.delete(`/applications/${id}/`);
      fetchAll();
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await API.patch(`/applications/${id}/`, { status });
      fetchAll();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
    }
  };
  //approve button
  const handleApprove = async (id) => {
  console.log("Approve clicked", id);

  try {
    const res = await API.post(`/approve/${id}/`);

    console.log(res.data);
    alert("Application Approved & Email Sent ✅");

    fetchAll(); // refresh UI
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    alert("Error approving application ❌");
  }
};
  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* Filter Panel */}
        <div className="w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 space-y-4">
            <h3 className="font-bold text-gray-800 text-sm">Filters</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">College</p>
                <Select onChange={(e: any) => setCollegeFilter(e.target.value)}>
                  <option value="">All Colleges</option>
                  {colleges.map(c => <option key={c.id}>{c.name}</option>)}
                </Select>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Course</p>
                <Select onChange={(e: any) => setCourseFilter(e.target.value)}>
                  <option value="">All Courses</option>
                  {courses.map(c => <option key={c.id}>{c.name}</option>)}
                </Select>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Domain</p>
                <Select onChange={(e: any) => setDomainFilter(e.target.value)}>
                  <option value="">All Domains</option>
                  {domains.map(d => <option key={d.id}>{d.name}</option>)}
                </Select>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Status</p>
                <Select onChange={(e: any) => setStatusFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Sort By</p>
                <Select onChange={(e: any) => setSortBy(e.target.value)}>
                  <option value="id">By ID</option>
                  <option value="name">By Name</option>
                  <option value="roll_no">By Roll No</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
              <p className="text-sm text-gray-500 mt-0.5">{filteredApps.length} total records</p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              <Plus size={16} />
              Add Application
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {filteredApps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <FileText size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No applications found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["ID", "Name", "Email", "College", "Course", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredApps.map((app, i) => (
                      <tr key={app.id} className={`hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                        <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{app.id}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{app.name}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{app.email}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-600">{app.college_name}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-600">{app.course_name}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                             onClick={() => handleApprove(app.id)}
                              title="Approve"
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => updateStatus(app.id, "rejected")}
                              title="Reject"
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors"
                            >
                              <X size={14} />
                            </button>
                            <button
                              onClick={() => openEdit(app)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {editApp ? "Edit Application" : "Add Application"}
              </h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {[
                { name: "name", placeholder: "Full Name" },
                { name: "email", placeholder: "Email Address" },
                { name: "roll_no", placeholder: "Roll Number" },
                { name: "mobile_no", placeholder: "Mobile Number" },
              ].map(({ name, placeholder }) => (
                <input
                  key={name}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              ))}

              {[
                { name: "college", opts: colleges },
                { name: "course", opts: courses },
                { name: "domain", opts: domains },
              ].map(({ name, opts }) => (
                <div className="relative" key={name}>
                  <select
                    name={name}
                    value={(formData as any)[name] || ""}
                    onChange={handleChange}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8"
                  >
                    <option value="">Select {name.charAt(0).toUpperCase() + name.slice(1)}</option>
                    {opts.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              ))}

              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all"
              >
                {editApp ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}