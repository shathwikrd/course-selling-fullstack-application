import { adminSignup } from "../services";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = await adminSignup({ firstName, lastName, email, password });
    console.log(data.message);
    if (data.message === "Admin created successfully") {
      navigate("/signin/admin");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-4 p-4 max-w-sm mx-auto"
      >
        <input
          type="text"
          placeholder="first name"
          className="border p-2"
          id="firstName"
        />
        <input
          type="text"
          placeholder="second name"
          className="border p-2"
          id="lastName"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-2"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2"
          id="password"
        />
        <button type="submit" className="border p-2">
          Signup
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
