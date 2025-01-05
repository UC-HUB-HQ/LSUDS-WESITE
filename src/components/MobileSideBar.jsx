import NavLinks from "./NavLinks";
const MobileSideBar = () => {
  return (
    <aside className=" p-4 fixed right-0 z-50 hidden h-full w-[100%] overflow-hidden text-nowrap bg-white mobile:block">
      <div className="flex justify-end">
        <i className="bi bi-x text-6xl"></i>
      </div>
      <div className="mt-8">
        <NavLinks isMobileNav />
      </div>
    </aside>
  );
};

export default MobileSideBar;
