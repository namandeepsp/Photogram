import { FunctionComponent, ReactNode } from "react";
import Sidebar from "../sidebar";
import UserList from "../userList";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-between bg-white">
      <aside className="flex gap-x-4 bg-gray-800 w-60 h-screen">
        <Sidebar />
      </aside>
      <div className="mx-auto w-160 max-h-screen overflow-auto border-2 p-8 flex-1">
        {children}
      </div>
      <aside className="hidden lg:block bg-gray-800 w-max h-screen">
        <UserList />
      </aside>
    </div>
  );
};

export default Layout;
