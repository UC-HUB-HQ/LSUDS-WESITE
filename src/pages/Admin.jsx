import { useState } from "react";
import EventSection from "../components/AdminComponents/EventSection";
import ExecutivesSection from "../components/AdminComponents/ExecutivesSection";
import HallOfFame from "../components/AdminComponents/HallOfFame";
import { useUser } from "../context/User";

const Admin = () => {
  const { currentUser, logout } = useUser();

  const [hallOfFamers, setHallOfFamers] = useState(false);
  const [executives, setExecutives] = useState(false);
  const [events, setEvents] = useState(true);

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="flex items-center justify-between bg-gray-800 px-10 py-4 shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {currentUser.name.split(" ")[0]}
          </h1>
        </div>
        <div
          onClick={logout}
          className="flex cursor-pointer items-center gap-2 text-lg text-white hover:text-red-400"
        >
          <i className="bi bi-box-arrow-right"></i>
          <p>Log Out</p>
        </div>
      </header>
      <main className="mx-auto mt-6 px-10">
        <nav className="flex gap-10 border-b border-gray-300 pb-2">
          <div
            onClick={() => {
              setEvents(true);
              setExecutives(false);
              setHallOfFamers(false);
            }}
            className={`${events ? "activeAdminSection" : "inActiveAdminSecion"}`}
          >
            Events
          </div>
          <div
            onClick={() => {
              setEvents(false);
              setExecutives(true);
              setHallOfFamers(false);
            }}
            className={`${executives ? "activeAdminSection" : "inActiveAdminSecion"}`}
          >
            Executives
          </div>
          <div
            onClick={() => {
              setEvents(false);
              setExecutives(false);
              setHallOfFamers(true);
            }}
            className={`${hallOfFamers ? "activeAdminSection" : "inActiveAdminSecion"}`}
          >
            Hall Of Fame
          </div>
        </nav>
        <section className="mt-6 rounded-lg bg-white p-6 shadow-md">
          {events && <EventSection />}
          {executives && <ExecutivesSection />}
          {hallOfFamers && <HallOfFame />}
        </section>
      </main>
    </div>
  );
};

export default Admin;
