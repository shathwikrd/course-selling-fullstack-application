import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-10">
      <h1>Sign In as</h1>
      <div className="flex gap-4 max-w-sm mx-auto">
        <Link className="border p-2" to="/signin/user">
          User
        </Link>
        <Link className="border p-2" to="/signin/admin">
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Signin;
