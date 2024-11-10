import { useSelector } from "react-redux";
import { FiDelete } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="h-screen flex justify-center mt-3 ">
      <div className="card bg-base-100 sm:w-[40%] w-[80%] h-fit pb-5 shadow-xl px-3">
        <h1 className=" text-3xl font-medium text-center my-3">Profile</h1>
        <form className=" flex flex-col mx-20 ">
          <div className="avatar flex justify-center">
            <div className=" sm:h-20 h-14  rounded-full cursor-pointer">
              <img
                src={currentUser.avatar}
                className=" object-cover self-center"
              />
            </div>
          </div>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Name :
            <input type="text" className="grow" id="username" />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Email :
            <input type="email" className="grow" id="email" />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Password :
            <input type="password" className="grow" id="password" />
          </label>
          <button className="bg-slate-700 text-white p-3 rounded-lg mx-2 mt-4">
            Update
          </button>
        </form>
        <div className=" flex justify-between mt-2 mx-10">
          <span className=" border-red-500 border font-medium text-red-700 cursor-pointer flex p-2 gap-1 items-center justify-center hover:bg-red-50 rounded-lg">
            Delete Account <FiDelete className=" size-5 " />
          </span>
          <span className="  border-red-500 border font-medium text-red-700 cursor-pointer flex p-2 gap-1 items-center justify-center hover:bg-red-50 rounded-lg">
            Sign Out <IoIosLogOut className=" size-5 " />
          </span>
        </div>
      </div>
    </div>
  );
}
