import EventSection from "../components/AdminComponents/EventSection";
import { useUser } from "../context/User";
const Admin = () => {
  const { currentUser, logout } = useUser();

  return (
    <div className=" bg-gray-200">
      <header className="flex justify-between px-10 py-8 shadow-md bg-white">
        <div>
          <h1 className="text-xl font-semibold uppercase">
            welcome {currentUser.name.split(" ")[0]}
          </h1>
        </div>
        <div onClick={logout} className="flex cursor-pointer gap-2 text-xl">
          <i className="bi bi-box-arrow-right"></i>
          <p>LogOut</p>
        </div>
      </header>
      <main className="mx-auto mt-4 px-10 shadow-md">
        <section className="flex gap-14 border-b border-b-gray-400">
          <div className="cursor-pointer border-b-2 border-softBlue py-3">
            Events
          </div>
          <div className="cursor-pointer py-3">Executives</div>
          <div className="cursor-pointer py-3">Hall Of Fame</div>
        </section>
        <section className="bg-white mt-4 shadow-md">
          <EventSection />
        </section>
      </main>
    </div>
  );
};

export default Admin;
