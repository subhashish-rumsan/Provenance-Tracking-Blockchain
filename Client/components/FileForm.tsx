import { useState } from "react";
import { useModal } from "@context/ModalContext";
import usePinata from "@hooks/usePinata";

const FileForm = () => {
  const { closeModal } = useModal();
  const { uploadFile } = usePinata();

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

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("testing", formData);

    try {
      await uploadFile(formData.file);

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
                        <span>Upload a file</span>
                        <p className="pl-1">or drag and drop</p>
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
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FileForm;
