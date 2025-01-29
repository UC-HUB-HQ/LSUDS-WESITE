import { useState, useEffect, useRef } from "react";
import { db } from "../../appwrite/database";
import { textReducer } from "../textReducer";
import { Query } from "appwrite";
import { addImage } from "../reusable";
import { deleteImageFile } from "../reusable";
import Loader from "../Loader";
import ErrorContainer from "../ErrorContainer";


const EventSection = () => {
  // EVENT COMPONENT STATES
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUpdateEvent, setIsUpdateEvent] = useState(false)
  const [eventForm, setEventForm] = useState({
    eventTitle: "",
    eventDate: "",
    eventDescription: "",
    eventId: "",
  })

  const timeoutIdRef = useRef(null)
  const idOfEventToUpdate = useRef(null);

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm({ ...eventForm, [name]: value })
  }


  // GET THE NAME  OF THE IMAGE ADMIN WANTS TO UPLOAD
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };


  // GET ALL EVENTS FROM THE DATABASE AND SET THE ORDER ACCORIDING TO THE TIME THEY WERE UPDATED
  const init = async () => {
    const eventResponse = await db.events.list([Query.orderDesc("$updatedAt")]);
    setEvents(eventResponse.documents);
  };

  const resetFormInfo = () => {
    setEventForm({
      eventTitle: "",
      eventDate: "",
      eventDescription: "",
      // eventId: "",
    });
    setFileName(null);
  }

  const clearErrorMsg = () => {
    // Clear the previous timeout if any, before setting a new one
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout to clear the error message after 3 seconds
    timeoutIdRef.current = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }


  const updateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let newImageResult;

      if (e.target.image.files[0]) {
        // ADD NEW FILE
        newImageResult = await addImage(e.target.image.files[0]);
        // DELETE PREV IMAGE
        await deleteImageFile(
          events.find((event) => event.$id === idOfEventToUpdate.current).image
        );
      }

      const body = {
        title: eventForm.eventTitle,
        description: eventForm.eventDescription,
        date: eventForm.eventDate,
        // UPDATE THE IMAGE ID
        ...(newImageResult && { image: newImageResult.$id }),
      };
      const updatedEventResponse = await db.events.update(
        idOfEventToUpdate.current,
        body,
      );
      const currentEventToUpdateId = idOfEventToUpdate.current;
      setEvents((prevEvents) => {
        const updatedPrevEvents = prevEvents.filter(
          (event) => event.$id !== currentEventToUpdateId,
        );
        return [updatedEventResponse, ...updatedPrevEvents];
      });
      setIsEventFormOpen(false);
      // RESET FORM DATA
      resetFormInfo();
      idOfEventToUpdate.current = null;
    }
    catch (err) {
      if (err.message === "File size not allowed") {
        setErrorMessage("File size should not exceed 2MB");
        setFileName("");
      } else {
        setErrorMessage(err.message);
      }
      clearErrorMsg();
    }
    finally {
      setLoading(false);
    }
  }


  // SETUP UPDATE EVENT BY DISPLAYING EVENT FORM,  POPULATING INPUT FIELDS WITH THE RIGHT DATA.
  const setupEventUpdate = (e) => {
    setIsUpdateEvent(true);
    const event = events.find((event) => event.$id === e.target.dataset.id);
    idOfEventToUpdate.current = e.target.dataset.id;
    setIsEventFormOpen(true);
    setEventForm({
      eventTitle: event.title,
      eventDate: event.date.split("T")[0],
      eventDescription: event.description,
    });
  };


  // DELETE EVENTS FROM DATABSE
  const deleteEvent = async (e) => {
    const deletedEventImageId = events.find(event => event.$id === e.target.dataset.id).image
    await db.events.delete(e.target.dataset.id);
    deleteImageFile(deletedEventImageId)
    setEvents((prevEvents) => {
      return prevEvents.filter((item) => item.$id !== e.target.dataset.id);
    });
  };


  // ADD NEW EVENTS
  const addEvent = async (e) => {
    e.preventDefault();

    if (!e.target.image.files[0]) {
      setErrorMessage("Upload Event Image");
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      // save the image inside of bucket first
      const eventImage = await addImage(e.target.image.files[0]);
      // 
      const body = {
        title: eventForm.eventTitle,
        description: eventForm.eventDescription,
        date: eventForm.eventDate,
        image: eventImage.$id,
      };

      const eventResponse = await db.events.create(body);
      setEvents((prevEvents) => [eventResponse, ...prevEvents]);
      setIsEventFormOpen(false);
      // RESET FORM DATA
      resetFormInfo();


    } catch (err) {
      if (err.message === "File size not allowed") {
        setErrorMessage("File size should not exceed 2MB");
        setFileName("");
      } else {
        setErrorMessage(err.message);
      }
      clearErrorMsg()
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };



  useEffect(() => {
    // INIT FUNCTION TO GET ALL THE EVENTS FROM THE DB IMMEDIATELY THE COMPONENT MOUNTS
    init();
  }, []);


  return (
    <>
      <div className="mb-4 flex justify-end">
        {!isEventFormOpen ? (
          <button
            onClick={() => setIsEventFormOpen(true)}
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          >
            Add new Event
            <i className="bi bi-plus font-bold"></i>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEventFormOpen(false);
              setIsUpdateEvent(false);
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
        className={`overflow-x-auto p-4 ${isEventFormOpen ? "hidden" : ""}`}
      >
        {events?.length === 0 ? (
          <div>
            <h2 className="text-center text-2xl">NO EVENT</h2>
          </div>
        ) : (
          <table className="min-w-full border border-gray-200 bg-white tab:text-sm mobile:text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="tableItem">Event Id</th>
                <th className="tableItem">Event Title</th>
                <th className="tableItem">Event Description</th>
                <th className="tableItem">Update</th>
                <th className="tableItem">Delete</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, index) => (
                <tr
                  key={event.$id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="tableItem">{index + 1}</td>
                  <td className="tableItem">{event.title}</td>
                  <td className="tableItem text-nowrap">
                    {textReducer(event.description, 10)}
                  </td>
                  <td className="tableItem text-center">
                    <i
                      onClick={setupEventUpdate}
                      data-id={event.$id}
                      className="bi bi-pen cursor-pointer text-softBlue"
                    ></i>
                  </td>
                  <td className="tableItem text-center">
                    <i
                      onClick={deleteEvent}
                      data-id={event.$id}
                      className="bi bi-trash cursor-pointer text-red-500"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* EVENT FORM SECTION*/}
      <form
        onSubmit={!isUpdateEvent ? addEvent : updateEvent}
        className={`mx-auto flex w-[50%] flex-col gap-8 rounded bg-white px-8 py-12 shadow-md ${!isEventFormOpen ? "hidden" : ""} tab:w-[80%] mobile:w-[95%]`}
      >
        {errorMessage && (
          <ErrorContainer errorMessage={errorMessage} clearErrorMessage={setErrorMessage} />
        )}
        <div>
          <label className="eventsLabel" htmlFor="eventTitle">
            Event Title
          </label>
          <input
            onChange={handleEventFormChange}
            name="eventTitle"
            className="eventInput"
            id="eventTitle"
            type="text"
            placeholder="Event Title"
            required
            value={eventForm.eventTitle}
          />
        </div>
        <div>
          <label className="eventsLabel" htmlFor="eventDate">
            Event Date
          </label>
          <input
            value={eventForm.eventDate}
            onChange={handleEventFormChange}
            name="eventDate"
            className="eventInput"
            id="eventDate"
            type="date"
            required
          />
        </div>
        <div>
          <label className="eventsLabel" htmlFor="eventDescription">
            Event Description
          </label>
          <textarea
            value={eventForm.eventDescription}
            onChange={handleEventFormChange}
            name="eventDescription"
            className="eventTextarea"
            id="eventDescription"
            placeholder="Event Description"
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
          {!isUpdateEvent ? (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Add Event"}
            </button>
          ) : (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? <Loader /> : "Update Event"}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EventSection;
