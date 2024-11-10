import { useSelector } from "react-redux";
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

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
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
    // setFilePerc(0);
  };

  return (
    <div className="h-screen flex justify-center mt-3 ">
      <div className="card bg-base-100 sm:w-[40%] w-[80%] h-fit pb-5 shadow-xl px-3">
        <h1 className=" text-3xl font-medium text-center my-3">Profile</h1>
        <form className=" flex flex-col mx-20 ">
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
                src={formData.avatar || currentUser.avatar}
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
        <div className=" flex justify-between mt-4 mx-10">
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
