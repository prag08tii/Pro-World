import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getColleges, setColleges, getCourses, setCourses } from "@/lib/adminStore";
import { Plus, Trash2, Edit2, Check, X, LogOut } from "lucide-react";
import logo from "@/assets/proworld-logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colleges, setCollegeList] = useState<string[]>([]);
  const [courses, setCourseList] = useState<string[]>([]);
  const [newCollege, setNewCollege] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [editIdx, setEditIdx] = useState<{ type: "college" | "course"; idx: number; value: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("proworld_auth");
    if (auth !== "admin") {
      navigate("/login");
      return;
    }
    setCollegeList(getColleges());
    setCourseList(getCourses());
  }, [navigate]);

  const addCollege = () => {
    if (!newCollege.trim()) return;
    const updated = [...colleges, newCollege.trim()];
    setColleges(updated);
    setCollegeList(updated);
    setNewCollege("");
    toast({ title: "College Added" });
  };

  const addCourse = () => {
    if (!newCourse.trim()) return;
    const updated = [...courses, newCourse.trim()];
    setCourses(updated);
    setCourseList(updated);
    setNewCourse("");
    toast({ title: "Course Added" });
  };

  const deleteItem = (type: "college" | "course", idx: number) => {
    if (type === "college") {
      const updated = colleges.filter((_, i) => i !== idx);
      setColleges(updated);
      setCollegeList(updated);
    } else {
      const updated = courses.filter((_, i) => i !== idx);
      setCourses(updated);
      setCourseList(updated);
    }
    toast({ title: `${type === "college" ? "College" : "Course"} Removed` });
  };

  const saveEdit = () => {
    if (!editIdx || !editIdx.value.trim()) return;
    if (editIdx.type === "college") {
      const updated = [...colleges];
      updated[editIdx.idx] = editIdx.value.trim();
      setColleges(updated);
      setCollegeList(updated);
    } else {
      const updated = [...courses];
      updated[editIdx.idx] = editIdx.value.trim();
      setCourses(updated);
      setCourseList(updated);
    }
    setEditIdx(null);
    toast({ title: "Updated" });
  };

  const logout = () => {
    localStorage.removeItem("proworld_auth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ProWorld" className="h-10 w-auto" />
            <span className="font-bold text-lg text-foreground">Admin Panel</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colleges */}
          <div className="bg-background rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Manage Colleges</h2>
            <div className="flex gap-2 mb-4">
              <Input value={newCollege} onChange={(e) => setNewCollege(e.target.value)} placeholder="Add college name" onKeyDown={(e) => e.key === "Enter" && addCollege()} />
              <Button onClick={addCollege} className="gradient-primary text-primary-foreground shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {colleges.map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-section-alt">
                  {editIdx?.type === "college" && editIdx.idx === i ? (
                    <>
                      <Input value={editIdx.value} onChange={(e) => setEditIdx({ ...editIdx, value: e.target.value })} className="flex-1" />
                      <Button size="sm" variant="ghost" onClick={saveEdit}><Check className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditIdx(null)}><X className="w-4 h-4" /></Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-foreground">{c}</span>
                      <Button size="sm" variant="ghost" onClick={() => setEditIdx({ type: "college", idx: i, value: c })}><Edit2 className="w-3 h-3" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteItem("college", i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="bg-background rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Manage Courses</h2>
            <div className="flex gap-2 mb-4">
              <Input value={newCourse} onChange={(e) => setNewCourse(e.target.value)} placeholder="Add course name" onKeyDown={(e) => e.key === "Enter" && addCourse()} />
              <Button onClick={addCourse} className="gradient-primary text-primary-foreground shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {courses.map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-section-alt">
                  {editIdx?.type === "course" && editIdx.idx === i ? (
                    <>
                      <Input value={editIdx.value} onChange={(e) => setEditIdx({ ...editIdx, value: e.target.value })} className="flex-1" />
                      <Button size="sm" variant="ghost" onClick={saveEdit}><Check className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditIdx(null)}><X className="w-4 h-4" /></Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-foreground">{c}</span>
                      <Button size="sm" variant="ghost" onClick={() => setEditIdx({ type: "course", idx: i, value: c })}><Edit2 className="w-3 h-3" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteItem("course", i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
