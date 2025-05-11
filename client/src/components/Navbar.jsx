import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isSignedIn, role, signOut } = useAuth();
  const navigate = useNavigate();

  function handleOnClick() {
    signOut();
    navigate("/");
  }

  return (
    <nav className="bg-black text-white flex justify-around items-center pt-2 pb-2">
      <div>
        <Link to={"/"}>Course Selling Application</Link>
      </div>
      <div>
        <ul className="flex gap-5 items-center">
          {isSignedIn && role === "user" && (
            <Link to="/user/purchases" className="border px-2 py-1 rounded">
              My Courses
            </Link>
          )}
          {isSignedIn && role === "admin" && (
            <Link to="/admin/courses" className="border px-2 py-1 rounded">
              Manage Courses
            </Link>
          )}
          {isSignedIn ? (
            <button onClick={handleOnClick}>Sign out</button>
          ) : (
            <Link to={"/signin"}>Signin</Link>
          )}
          {isSignedIn ? (
            <span className="ml-2">Hello, {role === "admin" ? "Admin" : "User"}</span>
          ) : (
            <Link to={"/signup"}>Signup</Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
