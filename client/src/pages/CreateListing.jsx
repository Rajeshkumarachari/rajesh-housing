export default function CreateListing() {
  return (
    <main className="flex  justify-center  mt-1 h-screen">
      <div className="card bg-base-100 sm:w-[80%] w-[70%] h-fit shadow-xl">
        <h1 className=" sm:text-3xl text-xl font-semibold text-center my-5">
          CreateListing
        </h1>
        <form className="flex flex-col sm:flex:row">
          <div className=" flex flex-col  gap-4 flex-1">
            <label className="input input-bordered flex items-center gap-2 ">
              Name :
              <input
                type="text"
                className="grow"
                id="name"
                maxLength={62}
                minLength={10}
                required
              />
            </label>
            <textarea
              className="textarea textarea-secondary"
              placeholder="Description"
              id="description"
              required
            ></textarea>
            <label className="input input-bordered flex items-center gap-2 ">
              Address :
              <input
                type="text"
                className="grow"
                id="address"
                maxLength={62}
                minLength={10}
                required
              />
            </label>
            <div className=""></div>
          </div>
        </form>
      </div>
    </main>
  );
}
