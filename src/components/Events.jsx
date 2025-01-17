import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { db } from "../appwrite/database";
import { Query } from "appwrite";
import { textReducer } from "./textReducer";

const Events = memo(() => {
  const [events, setEvents] = useState(null);

  const getLatestEvents = async () => {
    const eventResponse = await db.events.list([
      Query.limit(3),
      Query.orderDesc("$createdAt"),
    ]);
    setEvents(eventResponse.documents);
  };

  useEffect(() => {
    getLatestEvents();
  }, []);

  return (
    <article id="events" className="pagePadding my-20 tab:px-7">
      <div>
        <h4 className="font-bold text-softBlue">EVENTS</h4>
        <h2 className="text-[3em] font-semibold text-customRed">Coming Up</h2>
      </div>
      <section className="mt-8 flex flex-row justify-between gap-8 tab:flex-col">
        {events?.map((event) => (
          <div key={event.$id} className="">
            <div className="mb-2">
              <img
                className="h-[250px] object-cover"
                src={event.image}
                alt={`Image for ${event.title}`}
                width="500"
                height="250"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <i className="bi bi-calendar-check text-softBlue"></i>
                <p className="text-gray-500">{event.date.split("T")[0]}</p>
              </div>
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="font-medium text-gray-500">
                {textReducer(event.description, 11)}
              </p>
            </div>
          </div>
        ))}
      </section>
      <button className="mt-10 rounded-md bg-softBlue px-6 py-2 text-white">
        <Link to="/events">See More</Link>
      </button>
    </article>
  );
});

export default Events;
