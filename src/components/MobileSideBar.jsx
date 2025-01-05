import NavLinks from "./NavLinks";
const MobileSideBar = ({ navBarOpen, closeSideBar }) => {

  return (
    <aside
      className={`fixed right-0 z-50 hidden h-full overflow-hidden text-nowrap bg-white transition-all duration-500 mobile:block ${navBarOpen ? `w-[100%] p-4` : `w-[0%]`}`}
    >
      <div className="flex justify-end">
        <i
          onClick={closeSideBar}
          className="bi bi-x cursor-pointer text-6xl"
        ></i>
      </div>
      <div className="mt-8">
        <NavLinks closeSideBar={closeSideBar} isMobileNav />
      </div>
    </aside>
  );
};

export default MobileSideBar;
