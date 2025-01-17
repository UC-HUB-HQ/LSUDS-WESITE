import { useState, useEffect } from "react";
import { db } from "../../appwrite/database";
import { textReducer } from "../textReducer";
import { Query } from "appwrite";

const EventSection = () => {
  const [events, setEvents] = useState(null);

  const init = async () => {
    const eventResponse = await db.events.list([Query.orderDesc("$createdAt")]);
    setEvents(eventResponse.documents);
  };

  const deleteEvent = async (e) => {
    await db.events.delete(e.target.dataset.id);

    setEvents((prevEvents) => {
      return prevEvents.filter((item) => item.$id !== e.target.dataset.id);
    })
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
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
    </div>
  );
};

export default EventSection;
