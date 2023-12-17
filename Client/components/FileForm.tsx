import { useState } from "react";
import { useModal } from "@context/ModalContext";
import usePinata from "@hooks/usePinata";

const FileForm = () => {
  const BACKEND_URL = process.env.BACKEND_URL;

  const { closeModal } = useModal();
  const { uploadFile, uploading } = usePinata();

  const [formData, setFormData] = useState({
    model: "",
    plate: "",
    description: "",
    file: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const formSubmit = async (e: any) => {
    e.preventDefault();
    console.log("testing", formData);

    try {
      await uploadFile(formData);
      closeModal();

      // Now you can proceed with your axios.post or other logic
      // const result = await axios.post(piantaurl, formData);

      // Handle the result as needed
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Car Model*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Number Plate*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  name="plate"
                  value={formData.plate}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0  px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Car Description*
              </label>
              <div className="mt-2">
                <textarea
                  autoComplete="given-name"
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Vehicle Documents*
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="filename"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    {formData?.file ? (
                      <p className="pl-1">{formData?.file?.name}</p>
                    ) : (
                      <>
                        <p className="pl-1">Upload a file or drag and drop</p>
                      </>
                    )}
                    <input
                      id="filename"
                      type="file"
                      name="file"
                      className="sr-only"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={closeModal}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 h-10 w-18 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {uploading ? (
            <svg
              aria-hidden="true"
              className="inline w-[100%] h-[100%] px-4  text-gray-200 animate-spin dark:text-white-600 fill-gray-600 dark:fill-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <>Upload</>
          )}
        </button>
      </div>
    </form>
  );
};

export default FileForm;
