import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/adminlayout";
import API from "../../api/api";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, BookOpen, X, ChevronDown } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [filter, setFilter] = useState({ sort: "" });
  const [form, setForm] = useState({ name: "", colleges: [] as number[] });

  useEffect(() => { fetchAll(); }, [filter]);

  const fetchAll = async () => {
    try {
      const query = new URLSearchParams(filter).toString();
      const [cou, colg] = await Promise.all([
        API.get(`/courses/?${query}`),
        API.get("/colleges/"),
      ]);
      setCourses(cou.data);
      setColleges(colg.data);
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  const handleAdd = async () => {
    try {
      await API.post("/courses/", form);
      toast.success("Course added successfully");
      setShowAdd(false);
      setForm({ name: "", colleges: [] });
      fetchAll();
    } catch {
      toast.error("Add failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/courses/${editing.id}/`, { name: editing.name, colleges: editing.colleges });
      toast.success("Course updated");
      setEditing(null);
      fetchAll();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/courses/${confirmDelete.id}/`);
      toast.success("Course deleted");
      setConfirmDelete(null);
      fetchAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  const MultiSelect = ({ value, onChange }: any) => (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 font-medium">Select Colleges (hold Ctrl/Cmd to select multiple)</p>
      <select
        multiple
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all h-28"
      >
        {colleges.map(c => (
          <option key={c.id} value={c.id} className="py-1">{c.name}</option>
        ))}
      </select>
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* Filter */}
        <div className="w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Sort</h3>
            <div className="relative">
              <select
                onChange={(e) => setFilter({ sort: e.target.value })}
                className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all pr-8"
              >
                <option value="">Default</option>
                <option value="id">By ID</option>
                <option value="name">By Name</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
              <p className="text-sm text-gray-500 mt-0.5">{courses.length} courses available</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {courses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <BookOpen size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No courses found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["ID", "Course Name", "Colleges", "Actions"].map(h => (
                      <th key={h} className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.map((c, i) => (
                    <tr key={c.id} className={`hover:bg-blue-50/30 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                      <td className="px-6 py-4 text-sm text-gray-400 font-mono w-16">#{c.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                            <BookOpen size={14} className="text-indigo-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {c.college_names?.length ? c.college_names.map((name: string, j: number) => (
                            <span key={j} className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{name}</span>
                          )) : <span className="text-xs text-gray-400">None</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditing({ ...c, colleges: c.colleges || [] })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors">
                            <Edit2 size={12} /> Edit
                          </button>
                          <button onClick={() => setConfirmDelete(c)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Add Course</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              <input
                placeholder="Course Name"
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
              <MultiSelect
                value={form.colleges}
                onChange={(e: any) => setForm({ ...form, colleges: Array.from(e.target.selectedOptions, (o: any) => Number(o.value)) })}
              />
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Edit Course</h3>
              <button onClick={() => setEditing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              <input
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
              <MultiSelect
                value={editing.colleges}
                onChange={(e: any) => setEditing({ ...editing, colleges: Array.from(e.target.selectedOptions, (o: any) => Number(o.value)) })}
              />
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
            <h3 className="font-bold text-gray-900 mb-1">Delete Course?</h3>
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