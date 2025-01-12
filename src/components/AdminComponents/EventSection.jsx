import { useState, useEffect } from "react";
import { db } from "../../appwrite/database";

const EventSection = () => {
    const [events, setEvents] = useState(null);
    
    const init = async () => {
        const eventResponse = await db.events.list();
        setEvents(eventResponse.documents);
    }

    useEffect(() => {
        init()
    }, [])

  return (
    <>
      <div>EVENTS SECTION</div>
      <section>
        {events?.map((event) => (
          <div key={event.$id}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <img src={event.image} alt="" loading="lazy" />
          </div>
        ))}
      </section>
    </>
  );
};

export default EventSection;
