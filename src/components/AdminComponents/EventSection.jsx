import { useState, useEffect } from "react";
import { db } from "../../appwrite/database";
import { textReducer } from "../textReducer";

const EventSection = () => {
  const imgUrl =
    "https://plus.unsplash.com/premium_photo-1679547202606-4d905471107f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwZWFraW5nJTIwdG8lMjBhbiUyMGF1ZGllbmNlfGVufDB8fDB8fHww";
  const [events, setEvents] = useState([
    {
      $id: 1,
      title: "Event One",
      description:
        "Join us for Event One, where we will explore the latest trends in technology and innovation. Don't miss this opportunity to network and learn.",
      image: imgUrl,
    },
    {
      $id: 2,
      title: "Event Two",
      description:
        "Event Two is all about creativity and inspiration. Come and be a part of an amazing experience filled with insightful talks and interactive sessions.",
      image: imgUrl,
    },
    {
      $id: 3,
      title: "Event Three",
      description:
        "At Event Three, we focus on personal growth and development. Engage with experts and gain valuable insights to help you achieve your goals.",
      image: imgUrl,
    },
    {
      $id: 4,
      title: "Event Four",
      description:
        "Event Four brings together industry leaders to discuss the future of business and technology. A must-attend for anyone looking to stay ahead.",
      image: imgUrl,
    },
    {
      $id: 5,
      title: "Event Five",
      description:
        "Discover the latest advancements in science and research at Event Five. Join us for a day of learning and networking with top professionals.",
      image: imgUrl,
    },
    {
      $id: 6,
      title: "Event Six",
      description:
        "Event Six is dedicated to health and wellness. Learn from experts about the best practices for maintaining a healthy lifestyle and well-being.",
      image: imgUrl,
    },
    {
      $id: 7,
      title: "Event Four",
      description:
        "Event Four brings together industry leaders to discuss the future of business and technology. A must-attend for anyone looking to stay ahead.",
      image: imgUrl,
    },
    {
      $id: 8,
      title: "Event Five",
      description:
        "Discover the latest advancements in science and research at Event Five. Join us for a day of learning and networking with top professionals.",
      image: imgUrl,
    },
    {
      $id: 9,
      title: "Event Six",
      description:
        "Event Six is dedicated to health and wellness. Learn from experts about the best practices for maintaining a healthy lifestyle and well-being.",
      image: imgUrl,
    },
  ]);
    
    const init = async () => {
        const eventResponse = await db.events.list();
        setEvents(eventResponse.documents);
    }

    useEffect(() => {
        // init()
    }, [])

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="tableItem p-2 border-b">Event Id</th>
            <th className="tableItem p-2 border-b">Event Title</th>
            <th className="tableItem p-2 border-b">Event Description</th>
            <th className="tableItem p-2 border-b">Update</th>
            <th className="tableItem p-2 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event, index) => (
            <tr key={event.$id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="tableItem p-2 border-b">{event.$id}</td>
              <td className="tableItem p-2 border-b">{event.title}</td>
              <td className="tableItem p-2 border-b">
                {textReducer(event.description, 10)}
              </td>
              <td className="tableItem p-2 border-b text-center">
                <i className="bi bi-pen text-softBlue cursor-pointer"></i>
              </td>
              <td className="tableItem p-2 border-b text-center">
                <i className="bi bi-trash text-red-500 cursor-pointer"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventSection;
