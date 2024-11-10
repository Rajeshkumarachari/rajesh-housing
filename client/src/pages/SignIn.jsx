import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center m-4 h-screen">
      <div className="card bg-base-100 sm:w-[35%] w-[80%] h-[60%]  shadow-xl p-4">
        <h1 className=" sm:text-3xl text-lg text-center font-medium">
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex  flex-col gap-4 mx-4  mt-5"
        >
          <label className="input input-bordered flex items-center gap-2">
            Email :
            <input
              type="email"
              id="email"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password :
            <input
              type="password"
              id="password"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <button
            disabled={loading}
            className=" bg-slate-700 text-white p-3  rounded-lg hover:opacity-95 disabled:opacity-90"
          >
            {loading ? "Loading..." : "Sign In"}
            {loading && (
              <span className="loading loading-spinner text-white size-4"></span>
            )}
          </button>
        </form>
        <div className=" flex gap-2 mt-4 ml-4">
          <p>Do not have an account ?</p>
          <Link to={"/sign-up"} className=" text-blue-700 hover:underline ">
            <span>Sign up</span>
          </Link>
        </div>
        {error && (
          <div role="alert" className="alert alert-error p-3 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error} </span>
          </div>
        )}
      </div>
    </div>
  );
}
