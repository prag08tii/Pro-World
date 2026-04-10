import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/adminlayout";
import API from "../../api/api";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, UserCheck, X, ChevronDown, Mail, Phone, Building2 } from "lucide-react";

export default function Mentors() {

  const [mentors, setMentors] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);

  const [filter, setFilter] = useState({
    college: "",
    sort: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_no: "",   // ✅ FIXED
    college: "",
  });

  useEffect(() => {
    fetchAll();
  }, [filter]);

  const fetchAll = async () => {
    try {
      const query = new URLSearchParams(filter).toString();

      const [men, colg] = await Promise.all([
        API.get(`/mentors/?${query}`),
        API.get("/colleges/")
      ]);

      setMentors(men.data);
      setColleges(colg.data);

    } catch {
      toast.error("Failed to fetch data ❌");
    }
  };

  // ✅ ADD
  const handleAdd = async () => {
    try {
      await API.post("/mentors/", {
        ...form,
        college: Number(form.college),
      });

      toast.success("Mentor added 🎉");
      setShowAdd(false);
      fetchAll();

    } catch {
      toast.error("Error adding mentor ❌");
    }
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      await API.put(`/mentors/${editing.id}/`, {
        ...editing,
        college: Number(editing.college),
      });

      toast.success("Mentor updated ✏️");
      setEditing(null);
      fetchAll();

    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ DELETE
  const handleDelete = async () => {
    try {
      await API.delete(`/mentors/${confirmDelete.id}/`);

      toast.success("Mentor deleted 🗑️");
      setConfirmDelete(null);
      fetchAll();

    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm";
  const selectClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm";

  return (
    <AdminLayout>
      <div className="flex gap-6">

        {/* FILTER */}
        <div className="w-56">
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <h3 className="font-bold">Filters</h3>

            <select
              onChange={(e) => setFilter({ ...filter, college: e.target.value })}
              className={selectClass}
            >
              <option value="">All Colleges</option>
              {colleges.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
              className={selectClass}
            >
              <option value="">Sort</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1">

          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Mentors</h2>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={16}/> Add Mentor
            </button>
          </div>

          <table className="w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>College</th><th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {mentors.map(m => (
                <tr key={m.id} className="border-t">
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.mobile_no}</td>
                  <td>{m.college_name}</td>

                  <td className="space-x-2">
                    <button onClick={() => setEditing(m)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => setConfirmDelete(m)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 space-y-2">

            <h3 className="font-bold">Add Mentor</h3>

            <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} className={inputClass}/>
            <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className={inputClass}/>
            <input placeholder="Mobile" onChange={e => setForm({...form, mobile_no: e.target.value})} className={inputClass}/>

            <select onChange={e => setForm({...form, college: e.target.value})} className={selectClass}>
              <option>Select College</option>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <div className="flex gap-2">
              <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setShowAdd(false)} className="border px-4 py-2 rounded">Cancel</button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 space-y-2">

            <h3>Edit Mentor</h3>

            <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className={inputClass}/>
            <input value={editing.email} onChange={e => setEditing({...editing, email: e.target.value})} className={inputClass}/>
            <input value={editing.mobile_no} onChange={e => setEditing({...editing, mobile_no: e.target.value})} className={inputClass}/>

            <select value={editing.college} onChange={e => setEditing({...editing, college: Number(e.target.value)})} className={selectClass}>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <div className="flex gap-2">
              <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2">Save</button>
              <button onClick={() => setEditing(null)} className="border px-4 py-2">Cancel</button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded">
            <p>Delete this mentor?</p>
            <div className="flex gap-2 mt-3">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">Yes</button>
              <button onClick={() => setConfirmDelete(null)} className="border px-4 py-2">No</button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}