import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="flex justify-center m-4 h-screen">
      <div className="card bg-base-100 sm:w-[35%] w-[80%] h-96  shadow-xl p-4">
        <h1 className=" sm:text-3xl text-lg text-center font-medium">
          Sign Up
        </h1>
        <form className="flex  flex-col gap-4 mx-4  mt-5">
          <label className="input input-bordered flex items-center gap-2">
            Name :
            <input
              type="text"
              id="username"
              className="grow"
              //placeholder="Ex Rajesh"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email :
            <input
              type="email"
              id="email"
              className="grow"
              //placeholder="Ex example@gmail.com"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password :
            <input
              type="password"
              id="password"
              className="grow"
              //placeholder="Complex@#123"
            />
          </label>
          <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>
        <div className=" flex gap-2 mt-4 ml-4">
          <p>Have an account ?</p>
          <Link to={"/sign-in"} className=" text-blue-700 ">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
