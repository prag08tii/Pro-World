import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/adminlayout";
import API from "../../api/api";
import { Plus, Edit2, Trash2, GraduationCap, X, ChevronDown, Mail, Phone } from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [filter, setFilter] = useState({ college: "", domain: "", course: "", sort: "" });
  const [form, setForm] = useState({ name: "", email: "", roll_no: "", mobile_no: "", college: "", domain: "", course: "" });

  useEffect(() => { fetchAll(); }, [filter]);

  const fetchAll = async () => {
    try {
      const query = new URLSearchParams(filter).toString();
      const [stu, colg, dom, cou] = await Promise.all([
        API.get(`/students/?${query}`),
        API.get("/colleges/"), API.get("/domains/"), API.get("/courses/"),
      ]);
      setStudents(stu.data || []);
      setColleges(colg.data || []);
      setDomains(dom.data || []);
      setCourses(cou.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await API.post("/students/", { ...form, college: Number(form.college), domain: Number(form.domain), course: Number(form.course) });
      setShowAdd(false);
      fetchAll();
    } catch (err) { console.error("ADD ERROR:", err); }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/students/${editing.id}/`, { name: editing.name, email: editing.email, roll_no: editing.roll_no, mobile_no: editing.mobile_no, college: Number(editing.college), domain: Number(editing.domain), course: Number(editing.course) });
      setEditing(null);
      fetchAll();
    } catch (err) { console.error("UPDATE ERROR:", err); }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/students/${confirmDelete.id}/`);
      setConfirmDelete(null);
      fetchAll();
    } catch (err) { console.error("DELETE ERROR:", err); }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";
  const selectClass = "w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8";

  const FilterSelect = ({ label, onChange, items }: any) => (
    <div>
      <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">{label}</p>
      <div className="relative">
        <select onChange={onChange} className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8">
          <option value="">All {label}s</option>
          {items.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );

  const FormSelect = ({ name, value, onChange, items, placeholder, editing: ed }: any) => (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className={selectClass}>
        <option value="">{placeholder}</option>
        {items.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* Filter */}
        <div className="w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 space-y-4">
            <h3 className="font-bold text-gray-800 text-sm">Filters</h3>
            <FilterSelect label="College" onChange={(e: any) => setFilter({ ...filter, college: e.target.value })} items={colleges} />
            <FilterSelect label="Domain" onChange={(e: any) => setFilter({ ...filter, domain: e.target.value })} items={domains} />
            <FilterSelect label="Course" onChange={(e: any) => setFilter({ ...filter, course: e.target.value })} items={courses} />
            <div>
              <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Sort By</p>
              <div className="relative">
                <select onChange={(e) => setFilter({ ...filter, sort: e.target.value })} className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none pr-8">
                  <option value="">Default</option>
                  <option value="id">By ID</option>
                  <option value="roll_no">By Roll No</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Students</h2>
              <p className="text-sm text-gray-500 mt-0.5">{students.length} students enrolled</p>
            </div>
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
              <Plus size={16} /> Add Student
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {students.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <GraduationCap size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No students found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Student", "Contact", "Roll No", "College", "Domain", "Course", "Actions"].map(h => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {Array.isArray(students) && students.map((s, i) => (
                      <tr key={s.id} className={`hover:bg-blue-50/30 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {s.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail size={10} className="text-gray-400" /> {s.email}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Phone size={10} className="text-gray-400" /> {s.mobile_no}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{s.roll_no}</span>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{s.college_name}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-full font-medium">{s.domain_name}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded-full font-medium">{s.course_name}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setEditing({ ...s, college: s.college, domain: s.domain, course: s.course })} className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => setConfirmDelete(s)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors">
                              <Trash2 size={12} />
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

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">Add Student</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-3">
              <input placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
              <input placeholder="Email Address" onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
              <input placeholder="Mobile Number" onChange={e => setForm({ ...form, mobile_no: e.target.value })} className={inputClass} />
              <input placeholder="Roll Number" onChange={e => setForm({ ...form, roll_no: e.target.value })} className={inputClass} />
              <FormSelect placeholder="Select College" items={colleges} value={form.college} onChange={(e: any) => setForm({ ...form, college: e.target.value })} />
              <FormSelect placeholder="Select Domain" items={domains} value={form.domain} onChange={(e: any) => setForm({ ...form, domain: e.target.value })} />
              <FormSelect placeholder="Select Course" items={courses} value={form.course} onChange={(e: any) => setForm({ ...form, course: e.target.value })} />
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">Edit Student</h3>
              <button onClick={() => setEditing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-3">
              <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className={inputClass} />
              <input value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })} className={inputClass} />
              <input value={editing.mobile_no} onChange={e => setEditing({ ...editing, mobile_no: e.target.value })} className={inputClass} />
              <input value={editing.roll_no} onChange={e => setEditing({ ...editing, roll_no: e.target.value })} className={inputClass} />
              <div className="relative">
                <select value={editing.college} onChange={e => setEditing({ ...editing, college: Number(e.target.value) })} className={selectClass}>
                  {Array.isArray(colleges) && colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={editing.domain} onChange={e => setEditing({ ...editing, domain: Number(e.target.value) })} className={selectClass}>
                  {Array.isArray(domains) && domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={editing.course} onChange={e => setEditing({ ...editing, course: Number(e.target.value) })} className={selectClass}>
                  {Array.isArray(courses) && courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setEditing(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Delete Student?</h3>
            <p className="text-sm text-gray-500 mb-6">"{confirmDelete.name}" will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}