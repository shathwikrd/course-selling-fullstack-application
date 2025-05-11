import { useEffect, useState } from "react";
import { getAdminCourses, createCourse, updateCourse } from "../services";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", imageURL: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  function fetchCourses() {
    getAdminCourses().then(setCourses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await updateCourse({ courseId: editId, ...form, price: Number(form.price) });
      setMessage("Course updated!");
    } else {
      await createCourse({ ...form, price: Number(form.price) });
      setMessage("Course created!");
    }
    setForm({ title: "", description: "", price: "", imageURL: "" });
    setEditId(null);
    fetchCourses();
  }

  function handleEdit(course) {
    setEditId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      imageURL: course.imageURL,
    });
  }

  function handleCancel() {
    setEditId(null);
    setForm({ title: "", description: "", price: "", imageURL: "" });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mb-8">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2" required />
        <input name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="Image URL" className="border p-2" required />
        <div className="flex gap-2">
          <button type="submit" className="border p-2 bg-blue-600 text-white rounded">
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button type="button" className="border p-2 bg-gray-400 text-white rounded" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="flex flex-wrap gap-10">
        {courses.map((course) => (
          <div key={course._id} className="border p-2 mb-2 rounded w-50 flex flex-col justify-center items-center">
            <img src={course.imageURL} alt={course.title} width="100px" className="rounded mb-3 mt-2" />
            <h2 className="font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="font-bold">${course.price}</p>
            <button className="border px-4 py-1 mt-2 rounded bg-yellow-600 text-white" onClick={() => handleEdit(course)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCourses;
