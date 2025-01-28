import { useState, useEffect, useRef } from "react";
import { db } from "../../appwrite/database";
import { Query } from "appwrite";
import Loader from "../Loader";
import ErrorContainer from "../ErrorContainer";
import { addImage, deleteImageFile } from "../reusable";



const ExecutivesSection = () => {
  // EXECUTIVES COMPONENT STATES
  const [executives, setExecutives] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateExecutives, setIsUpdateExecutives] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isExecutiveFormOpen, setIsExecutiveFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [executiveForm, setExecutiveForm] = useState({
    executiveName: "",
    executivePosition: "",
  });
  // EXECUTIVE COMPONENT REF
  const timeoutIdRef = useRef(null);
  const idOfExecutiveToUpdate = useRef(null)

  const resetFormInfo = () => {
    setExecutiveForm({
      executiveName: "",
      executivePosition: "",
    });
    setFileName(null);
  };

  const handleEventFormChange = (e) => {
    setExecutiveForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  // clear the error message after the set duration
  const clearErrorMsg = () => {
    // Clear the previous timeout if any, before setting a new one
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout to clear the error message after 3 seconds
    timeoutIdRef.current = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  // GET ALL EXECUTIVES FROM THE DB
  const init = async () => {
    const executiveResponse = await db.executives.list([
      Query.orderDesc("$updatedAt"),
    ]);
    setExecutives(executiveResponse.documents);
  };

  // add new executive
  const addExecutive = async (e) => {
    e.preventDefault();
    // 
    if (!e.target.image.files[0]) {
      setErrorMessage("Upload Event Image");
      window.scrollTo(0, 0);
      return;
    }
    // 
    setLoading(true);
    // 
    try {
      const file = await addImage(e.target.image.files[0]);
      // 
      const body = {
        name: executiveForm.executiveName,
        title: executiveForm.executivePosition,
        image: file.$id,
      };
      const executive = await db.executives.create(body);
      // 
      setExecutives((prevExecutives) => [executive, ...prevExecutives]);
      setIsExecutiveFormOpen(false);
      resetFormInfo();
    }
    catch (error) {
      setErrorMessage(error.message);
      clearErrorMsg();
    }
    finally {
      setLoading(false);
    }
  }

  const setupExecutiveUpdate = (e) => {
    setIsUpdateExecutives(true);
    setIsExecutiveFormOpen(true);
    // get the information of the executive we want to update and populate the form
    const executiveToUpdate = executives.find(exco => exco.$id === e.target.dataset.id);
    idOfExecutiveToUpdate.current = e.target.dataset.id;
    setExecutiveForm({
      executiveName: executiveToUpdate.name,
      executivePosition: executiveToUpdate.title,
    });
    
  };

  // update an executive information
  const updateExecutives = async (e) => {
    e.preventDefault();
    //
    setLoading(true);
    // 
    try {
      let newImageResult;

      if (e.target.image.files[0]) {
        // ADD NEW FILE
        newImageResult = await addImage(e.target.image.files[0]);
        // DELETE PREV IMAGE
        await deleteImageFile(
          executives.find((exco) => exco.$id === idOfExecutiveToUpdate.current).image,
        );
      }
      // 
      const body = {
        name: executiveForm.executiveName,
        title: executiveForm.executivePosition,
        ...(newImageResult && { image: newImageResult.$id }),
      };
      const executiveId = idOfExecutiveToUpdate.current;
      const updateExecutiveInfo = await db.executives.update(executiveId, body);
      setExecutives((prevExecutives) => {
        const updatedPrevExcos = prevExecutives.filter(
          (exco) => exco.$id !== executiveId,
        );
        return [updateExecutiveInfo, ...updatedPrevExcos];
      })
      idOfExecutiveToUpdate.current = null
      setIsExecutiveFormOpen(false);
    }
    catch (error) {
      setErrorMessage(error.message);
      clearErrorMsg();
    }
    finally {
      setLoading(false);
    }
  };

  // DELETE EXECUTIVE FUNCTION
  const deleteExecutives = async (e, id) => {
    // get image id for the executive we want to delete, delete the image and then delete the executive
    const deletedExecutiveImageId = executives.find(exco => exco.$id === e.target.dataset.id).image
    deleteImageFile(deletedExecutiveImageId);
    await db.executives.delete(id);
    setExecutives((prevExecutives) =>
      prevExecutives.filter((executive) => executive.$id !== id),
    );
  };

  //  KEEP TRACK OF IMAGE NAME
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // FETCH EXECUTIVES DATA WHEN COMPONENT MOUNTS
  useEffect(() => {
    init();
  });


  return (
    <>
      <div className="mb-4 flex justify-end">
        {!isExecutiveFormOpen ? (
          <button
            onClick={() => setIsExecutiveFormOpen(true)}
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          >
            Add new Executive
            <i className="bi bi-plus font-bold"></i>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsExecutiveFormOpen(false);
              setIsUpdateExecutives(false);
              resetFormInfo();
            }}
            className="rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            <i className="bi bi-arrow-left mr-2"></i>
            Go Back
          </button>
        )}
      </div>
      <section
        className={`overflow-x-auto p-4 ${isExecutiveFormOpen ? "hidden" : ""}`}
      >
        <table className="min-w-full border border-gray-200 bg-white tab:text-sm mobile:text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="tableItem">ID</th>
              <th className="tableItem">Event Profile</th>
              <th className="tableItem">Executive Name</th>
              <th className="tableItem">Event Position</th>
              <th className="tableItem">Update</th>
              <th className="tableItem">Delete</th>
            </tr>
          </thead>
          <tbody>
            {executives?.map((executive, index) => (
              <tr
                key={executive.$id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="tableItem">{index + 1}</td>
                <td className="tableItem">
                  <img
                    className="h-[50px] w-[50px] rounded-full object-cover"
                    src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${executive.image}/view?project=${import.meta.env.VITE_PROJECT_ID}`}
                    alt=""
                  />
                </td>
                <td className="tableItem">{executive.name}</td>
                <td className="tableItem">{executive.title}</td>
                <td className="tableItem">
                  <i
                    onClick={setupExecutiveUpdate}
                    data-id={executive.$id}
                    className="bi bi-pen cursor-pointer text-softBlue"
                  ></i>
                </td>
                <td className="tableItem">
                  <i
                    onClick={(e) => deleteExecutives(e, executive.$id)}
                    data-id={executive.$id}
                    className="bi bi-trash cursor-pointer text-red-500"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <form
        onSubmit={
          !isUpdateExecutives ? addExecutive : (e) => updateExecutives(e)
        }
        className={`mx-auto flex w-[50%] flex-col gap-8 rounded bg-white px-8 py-12 shadow-md ${!isExecutiveFormOpen ? "hidden" : ""} tab:w-[80%] mobile:w-[95%]`}
      >
        {errorMessage && (
          <ErrorContainer
            errorMessage={errorMessage}
            clearErrorMessage={setErrorMessage}
          />
        )}
        <div>
          <label className="eventsLabel" htmlFor="eventTitle">
            Executive Name
          </label>
          <input
            onChange={handleEventFormChange}
            name="executiveName"
            className="eventInput"
            id="executiveName"
            type="text"
            placeholder="Executive Name"
            required
            value={executiveForm.executiveName}
          />
        </div>
        <div>
          <label className="eventsLabel" htmlFor="eventDate">
            Executive Position
          </label>
          <input
            placeholder="Executive Name"
            value={executiveForm.executivePosition}
            onChange={handleEventFormChange}
            name="executivePosition"
            className="eventInput"
            id="executivePosition"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <input
            onChange={handleFileChange}
            className="hidden"
            name="image"
            id="eventPhoto"
            accept=".jpg, .jpeg, .png"
            type="file"
          />
          <label
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
            htmlFor="eventPhoto"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <div>
                <i className="bi bi-upload"></i>
              </div>
              {fileName ? (
                <p className="mt-2 text-sm text-green-600">
                  File selected:{" "}
                  <span className="font-semibold">{fileName}</span>
                </p>
              ) : (
                <div>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-center text-xs text-gray-500">PNG, JPG</p>
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          {!isUpdateExecutives ? (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Add Executive"}
            </button>
          ) : (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Update Executive"}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ExecutivesSection;