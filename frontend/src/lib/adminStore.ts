// Simple localStorage-based admin store for colleges and courses
const COLLEGES_KEY = "proworld_colleges";
const COURSES_KEY = "proworld_courses";

const defaultColleges = [
  "Savitribai Phule Pune University",
  "MIT World Peace University",
  "Symbiosis International University",
  "Bharati Vidyapeeth",
  "COEP Technological University",
  "Vishwakarma Institute of Technology",
  "Sinhgad College of Engineering",
  "DY Patil International University",
];

const defaultCourses = [
  "B.Tech Computer Science",
  "B.Tech Information Technology",
  "BCA",
  "MCA",
  "B.Sc Computer Science",
  "M.Sc Computer Science",
  "MBA (IT)",
  "B.E. Electronics",
  "Diploma in Computer Engineering",
];

export function getColleges(): string[] {
  const stored = localStorage.getItem(COLLEGES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(COLLEGES_KEY, JSON.stringify(defaultColleges));
  return defaultColleges;
}

export function setColleges(colleges: string[]) {
  localStorage.setItem(COLLEGES_KEY, JSON.stringify(colleges));
}

export function getCourses(): string[] {
  const stored = localStorage.getItem(COURSES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(COURSES_KEY, JSON.stringify(defaultCourses));
  return defaultCourses;
}

export function setCourses(courses: string[]) {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}
