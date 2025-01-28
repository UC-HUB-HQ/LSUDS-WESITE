import EventSection from "../components/AdminComponents/EventSection";
import ExecutivesSection from "../components/AdminComponents/ExecutivesSection";
import { useUser } from "../context/User";

const Admin = () => {
  const { currentUser, logout } = useUser();

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
          <div className="cursor-pointer border-b-4 border-blue-500 py-2 font-semibold text-blue-500">
            Events
          </div>
          <div className="cursor-pointer py-2 text-gray-600 hover:text-gray-800">
            Executives
          </div>
          <div className="cursor-pointer py-2 text-gray-600 hover:text-gray-800">
            Hall Of Fame
          </div>
        </nav>
        <section className="mt-6 rounded-lg bg-white p-6 shadow-md">
          <EventSection />
        </section>
      </main>
    </div>
  );
};

export default Admin;
