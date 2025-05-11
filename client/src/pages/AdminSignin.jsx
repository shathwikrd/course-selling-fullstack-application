import { adminSignin } from "../services";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminSignin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = await adminSignin({ email, password });
    console.log(data.token);

    if (data.token) {
      signIn("admin", data.token);
      navigate("/admin/courses");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-4 p-4 max-w-sm mx-auto"
      >
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
          Signin
        </button>
      </form>
    </div>
  );
}

export default AdminSignin;
