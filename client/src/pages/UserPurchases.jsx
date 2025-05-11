import { useEffect, useState } from "react";
import { getUserPurchases, getCourses } from "../services";

function UserPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    getUserPurchases().then((data) => setPurchases(data.courses || []));
    getCourses().then(setAllCourses);
  }, []);

  function getCourse(courseId) {
    return allCourses.find((c) => c._id === courseId);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Purchased Courses</h1>
      <div className="flex flex-wrap gap-10">
        {purchases.map((purchase) => {
          const course = getCourse(purchase.courseId);
          if (!course) return null;
          return (
            <div
              key={purchase._id}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPurchases;
