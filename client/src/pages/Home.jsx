import { useEffect, useState } from "react";
import { getCourses, purchaseCourse } from "../services";
import { useAuth } from "../context/AuthContext";
import { SyncLoader } from "react-spinners";

function Home() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, role } = useAuth();

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const data = await getCourses();
      setCourses(data);
      setIsLoading(false);
    }

    fetchCourses();
  }, []);

  async function handleBuy(courseId) {
    const res = await purchaseCourse(courseId);
    setMessage(res.message || "Purchase failed");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {isLoading ? (
        <SyncLoader
          style={{ position: "fixed", top: "50%", left: "50%", zIndex: "10" }}
        />
      ) : (
        ""
      )}
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <div className="flex flex-wrap gap-10">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-2 mb-2 rounded w-50 flex flex-col justify-center items-center"
          >
            <img
              src={course.imageURL}
              alt={course.title}
              width="100px"
              className="rounded mb-3 mt-2"
            />
            <h2 className="font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="font-bold">${course.price}</p>
            {isSignedIn && role === "user" && (
              <button
                className="border px-4 py-1 mt-2 rounded bg-blue-600 text-white"
                onClick={() => handleBuy(course._id)}
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
