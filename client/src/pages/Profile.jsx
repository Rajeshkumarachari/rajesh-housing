import { useDispatch, useSelector } from "react-redux";
import { FiDelete } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="h-screen flex justify-center mt-3 ">
      <div className="card bg-base-100 sm:w-[40%] w-[80%] h-fit pb-5 shadow-xl px-3">
        <h1 className=" text-3xl font-medium text-center my-3">Profile</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col mx-20 ">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
          />
          <div
            onClick={() => fileRef.current.click()}
            className="avatar flex justify-center"
          >
            <div className=" sm:h-20 h-14  rounded-full cursor-pointer">
              <img
                src={formData?.avatar || currentUser?.avatar}
                className=" object-cover self-center"
              />
              <p className="text-sm self-center">
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Name :
            <input
              type="text"
              className="grow"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Email :
            <input
              type="email"
              className="grow"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-2">
            Password :
            <input
              type="password"
              className="grow"
              id="password"
              onChange={handleChange}
            />
          </label>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg mx-2 mt-4"
          >
            {loading ? (
              <span>
                Loading
                <span className="loading loading-spinner text-white size-4"></span>
              </span>
            ) : (
              <span>Update</span>
            )}
          </button>
        </form>
        <div className=" flex justify-between mt-4 mx-10">
          <span
            onClick={handleDeleteUser}
            className=" border-red-500 border font-medium text-red-700 cursor-pointer flex p-2 gap-1 items-center justify-center hover:bg-red-50 rounded-lg"
          >
            Delete Account <FiDelete className=" size-5 " />
          </span>
          <span className="  border-red-500 border font-medium text-red-700 cursor-pointer flex p-2 gap-1 items-center justify-center hover:bg-red-50 rounded-lg">
            Sign Out <IoIosLogOut className=" size-5 " />
          </span>
        </div>
        {error && (
          <div role="alert" className="alert alert-error mt-4">
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
        <div className="text-green-700 mt-5 flex justify-center">
          {updateSuccess ? "User is updated successfully!" : ""}
        </div>
      </div>
    </div>
  );
}
