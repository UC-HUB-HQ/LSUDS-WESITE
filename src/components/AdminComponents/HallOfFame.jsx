import { useState, useEffect, useRef } from "react";
import { db } from "../../appwrite/database";
import { Query } from "appwrite";
import Loader from "../Loader";
import ErrorContainer from "../ErrorContainer";
import { addImage, deleteImageFile } from "../reusable";
import { textReducer } from "../textReducer";

const HallOfFame = () => {
  // EXECUTIVES COMPONENT STATES
  const [hall0fFamers, setHall0fFamers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateHall0fFamers, setIsUpdateHall0fFamers] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isHall0fFamersFormOpen, setIsHall0fFamersFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hall0fFamerForm, setHall0fFamersForm] = useState({
    name: "",
    bio: "",
  });

  // EXECUTIVE COMPONENT REF
  const timeoutIdRef = useRef(null);
  const idOfHallOfFamerToUpdate = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleInputChange = (e) => {
    setHall0fFamersForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearErrorMessage = () => {
    console.log("cleaning err message");
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    } else {
      timeoutIdRef.current = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const resetFormInfo = () => {
    setHall0fFamersForm({
      name: "",
      bio: "",
    });
    setFileName(null);
  };

  // GET ALL HALL OF FAMERS FROM THE DB
  const init = async () => {
    const hallOfFamers = await db.hall0fFamers.list([
      Query.orderDesc("$updatedAt"),
    ]);
    setHall0fFamers(hallOfFamers.documents);
  };

  const addHallOfFamer = async (e) => {
    e.preventDefault();
    //
    if (!e.target.image.files[0]) {
      setErrorMessage("Upload Image of Hall Of Famer");
      clearErrorMessage();
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
        name: hall0fFamerForm.name,
        bio: hall0fFamerForm.bio,
        image: file.$id,
      };
      const newHallOfFamer = await db.hall0fFamers.create(body);
      //
      setHall0fFamers((prev) => [newHallOfFamer, ...prev]);
      setIsHall0fFamersFormOpen(false);
      resetFormInfo();
    } catch (error) {
      setErrorMessage(error.message);
      clearErrorMessage();
    } finally {
      setLoading(false);
    }
  };

  const updateHallOfFamer = async (e) => {
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
          hall0fFamers.find(
            (hallOfFamer) =>
              hallOfFamer.$id === idOfHallOfFamerToUpdate.current,
          ).image,
        );
      }
      //
      const body = {
        name: hall0fFamerForm.name,
        bio: hall0fFamerForm.bio,
        ...(newImageResult && { image: newImageResult.$id }),
      };
      const hallOfFamerId = idOfHallOfFamerToUpdate.current;
      const updatedHallOfFamerInfo = await db.hall0fFamers.update(
        hallOfFamerId,
        body,
      );
      setHall0fFamers((prevhallOfFamers) => {
        const updatedPrevHallOfFamers = prevhallOfFamers.filter(
          (person) => person.$id !== hallOfFamerId,
        );
        return [updatedHallOfFamerInfo, ...updatedPrevHallOfFamers];
      });
      idOfHallOfFamerToUpdate.current = null;
      setIsHall0fFamersFormOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
      clearErrorMessage();
    } finally {
      setLoading(false);
    }
  };

  const deleteHallOfFamer = async (e, id) => {
    // get image id for the halloffamer we want to delete, delete the image and then delete the hallfamer
    const deletedHallOfFamerImageId = hall0fFamers.find(
      (hall0fFamer) => hall0fFamer.$id === e.target.dataset.id,
    ).image;
    deleteImageFile(deletedHallOfFamerImageId);
    await db.hall0fFamers.delete(id);
    setHall0fFamers((prevHallOfFamers) =>
      prevHallOfFamers.filter((hall0fFamer) => hall0fFamer.$id !== id),
    );
  };

  const setupHallOfFamerUpdate = (e) => {
    setIsUpdateHall0fFamers(true);
    setIsHall0fFamersFormOpen(true);
    // get the information of the halloffamer we want to update and populate the form
    const hallOfFamerToUpdate = hall0fFamers.find(
      (hallOfFamer) => hallOfFamer.$id === e.target.dataset.id,
    );
    idOfHallOfFamerToUpdate.current = e.target.dataset.id;
    setHall0fFamersForm({
      name: hallOfFamerToUpdate.name,
      bio: hallOfFamerToUpdate.bio,
    });
  };

  //   RUN THE INIT FUNCTION ONCE WHEN THIS COMPONENT MOUNTS
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="mb-4 flex justify-end">
        {!isHall0fFamersFormOpen ? (
          <button
            onClick={() => setIsHall0fFamersFormOpen(true)}
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          >
            Add new Hall Of Famer
            <i className="bi bi-plus font-bold"></i>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsHall0fFamersFormOpen(false);
              setIsUpdateHall0fFamers(false);
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
        className={`overflow-x-auto p-4 ${isHall0fFamersFormOpen ? "hidden" : ""}`}
      >
        <table className="min-w-full border border-gray-200 bg-white tab:text-sm mobile:text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="tableItem">ID</th>
              <th className="tableItem">Hall Of Famer</th>
              <th className="tableItem">Name</th>
              <th className="tableItem">Bio</th>
              <th className="tableItem">Update</th>
              <th className="tableItem">Delete</th>
            </tr>
          </thead>
          <tbody>
            {hall0fFamers?.map((hall0fFamer, index) => (
              <tr
                key={hall0fFamer.$id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="tableItem">{index + 1}</td>
                <td className="tableItem">
                  <img
                    className="h-[50px] w-[50px] rounded-full object-cover"
                    src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${hall0fFamer.image}/view?project=${import.meta.env.VITE_PROJECT_ID}`}
                    alt=""
                  />
                </td>
                <td className="tableItem">{hall0fFamer.name}</td>
                <td className="tableItem">
                  {textReducer(hall0fFamer.bio, 10)}
                </td>
                <td className="tableItem">
                  <i
                    onClick={setupHallOfFamerUpdate}
                    data-id={hall0fFamer.$id}
                    className="bi bi-pen cursor-pointer text-softBlue"
                  ></i>
                </td>
                <td className="tableItem">
                  <i
                    onClick={(e) => deleteHallOfFamer(e, hall0fFamer.$id)}
                    data-id={hall0fFamer.$id}
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
          !isUpdateHall0fFamers ? addHallOfFamer : (e) => updateHallOfFamer(e)
        }
        className={`mx-auto flex w-[50%] flex-col gap-8 rounded bg-white px-8 py-12 shadow-md ${!isHall0fFamersFormOpen ? "hidden" : ""} tab:w-[80%] mobile:w-[95%]`}
      >
        {errorMessage && (
          <ErrorContainer
            errorMessage={errorMessage}
            clearErrorMessage={setErrorMessage}
          />
        )}
        <div>
          <label className="eventsLabel" htmlFor="hallOfFamerName">
            Executive Name
          </label>
          <input
            onChange={handleInputChange}
            name="name"
            className="eventInput"
            id="hallOfFamerName"
            type="text"
            placeholder="Name oF Hall Of Famer"
            required
            value={hall0fFamerForm.name}
          />
        </div>
        <div>
          <label className="eventsLabel" htmlFor="hallOfFamerBio">
            Executive Position
          </label>
          <textarea
            className="eventTextarea"
            placeholder="Bio"
            value={hall0fFamerForm.bio}
            onChange={handleInputChange}
            name="bio"
            id="hallOfFamerBio"
            type="text"
            required
          ></textarea>
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
          {!isUpdateHall0fFamers ? (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Add Hall Of Famer"}
            </button>
          ) : (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Update Hall Of Famer"}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default HallOfFame;
