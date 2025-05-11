const url = import.meta.env.VITE_BACKEND_URL;

export async function userSignup({ firstName, lastName, email, password }) {
  const response = await fetch(`${url}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return response.json();
}

export async function userSignin({ email, password }) {
  const response = await fetch(`${url}/user/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function adminSignup({ firstName, lastName, email, password }) {
  const response = await fetch(`${url}/admin/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return response.json();
}

export async function adminSignin({ email, password }) {
  const response = await fetch(`${url}/admin/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function getCourses() {
  try {
    const response = await fetch(`${url}/course/preview`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data.course || [];
  } catch (error) {
    return [];
  }
}

export async function purchaseCourse(courseId) {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${url}/course/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });
  return response.json();
}

export async function getUserPurchases() {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${url}/user/purchases`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getAdminCourses() {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${url}/admin/course`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function createCourse({ title, description, price, imageURL }) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${url}/admin/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, price, imageURL }),
  });
  return response.json();
}

export async function updateCourse({ courseId, title, description, price, imageURL }) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${url}/admin/course`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, title, description, price, imageURL }),
  });
  return response.json();
}
