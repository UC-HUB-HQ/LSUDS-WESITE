import EventSection from "../components/AdminComponents/EventSection";
import { useUser } from "../context/User";
const Admin = () => {
  const { currentUser, logout } = useUser();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center px-10 py-6 shadow-lg bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {currentUser.name.split(" ")[0]}
          </h1>
        </div>
        <div onClick={logout} className="flex items-center cursor-pointer gap-2 text-lg text-red-600 hover:text-red-800">
          <i className="bi bi-box-arrow-right"></i>
          <p>Log Out</p>
        </div>
      </header>
      <main className="mx-auto mt-6 px-10">
        <section className="flex gap-10 border-b border-gray-300 pb-2">
          <div className="cursor-pointer border-b-4 border-blue-500 py-2 text-blue-500 font-semibold">
            Events
          </div>
          <div className="cursor-pointer py-2 text-gray-600 hover:text-gray-800">
            Executives
          </div>
          <div className="cursor-pointer py-2 text-gray-600 hover:text-gray-800">
            Hall Of Fame
          </div>
        </section>
        <section className="bg-white mt-6 shadow-lg p-6 rounded-lg">
          <EventSection />
        </section>
      </main>
    </div>
  );
};

export default Admin;
