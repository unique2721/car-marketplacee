import Sidebar from "../../pages/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
