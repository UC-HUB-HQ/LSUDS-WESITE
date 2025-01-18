import { useState, useEffect } from "react";
import { db } from "../../appwrite/database";
import { textReducer } from "../textReducer";
import { Query } from "appwrite";
import { storage } from "../../appwrite/config";
import { ID } from "appwrite";
import Loader from "../Loader";

const EventSection = () => {
  const [events, setEvents] = useState(null);

  const [loading, setLoading] = useState(false)

  const [isEventFormOpen, setIsEventFormOpen] = useState(false)

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setFileName(file.name); 
    }
  };

  const init = async () => {
    const eventResponse = await db.events.list([Query.orderDesc("$createdAt")]);
    setEvents(eventResponse.documents);
  };

  const deleteEvent = async (e) => {
    await db.events.delete(e.target.dataset.id);
    setEvents((prevEvents) => {
      return prevEvents.filter((item) => item.$id !== e.target.dataset.id);
    });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const eventImage = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        e.target.image.files[0],
      );

      const upoadedImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${eventImage.$id}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
      const body = {
        title: e.target.title.value,
        description: e.target.description.value,
        date: e.target.date.value,
        image: upoadedImageUrl,
      };

      const eventResponse = await db.events.create(body);
      setEvents((prevEvents) => [eventResponse, ...prevEvents]);
      setIsEventFormOpen(false);

      // clear input fields
      setFileName(null);
      e.target.reset();
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <section
        className={`overflow-x-auto p-4 ${isEventFormOpen ? "hidden" : ""}`}
      >
        <div className="mb-4">
          <button
            onClick={() => setIsEventFormOpen(true)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            <i className="bi bi-plus"></i>
            Add new Event
          </button>
        </div>
        <table className="min-w-full border border-gray-200 bg-white">
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
                <td className="tableItem">
                  {textReducer(event.description, 10)}
                </td>
                <td className="tableItem text-center">
                  <i
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
      </section>
      <form
        onSubmit={addEvent}
        className={`mx-auto flex w-[50%] flex-col gap-8 rounded bg-white px-8 py-12 shadow-md ${!isEventFormOpen ? "hidden" : ""}`}
      >
        <div>
          <label className="eventsLabel" htmlFor="eventTitle">
            Event Title
          </label>
          <input
            name="title"
            className="eventInput"
            id="eventTitle"
            type="text"
            placeholder="Event Title"
            required
          />
        </div>
        <div>
          <label className="eventsLabel" htmlFor="eventDate">
            Event Date
          </label>
          <input
            name="date"
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
            name="description"
            className="eventTextarea"
            id="eventDescription"
            placeholder="Event Description"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            onChange={handleFileChange}
            className=" opacity-0 h-0"
            name="image"
            id="eventPhoto"
            accept=".jpg, .jpeg, .png"
            type="file"
            required
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
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            {loading ? <Loader /> : "Add Event"}
          </button>

          <button
            onClick={ () => setIsEventFormOpen(false)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Go Back
          </button>
        </div>
      </form>
    </>
  );
};

export default EventSection;
