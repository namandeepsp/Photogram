import { FunctionComponent, ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../sidebar";
import UserList from "../userList";
import { Button } from "../ui/button";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const [isNavListOpen, setIsNavListOpen] = useState(false);

  return (
    <div className="flex flex-row justify-between bg-white relative min-h-screen">
      {/* Burger Icon (For Mobile) */}
      <Button
        className="bg-gray-800 lg:hidden block absolute top-2 left-2 z-999999 p-2 text-white rounded"
        onClick={() => setIsNavListOpen((prev) => !prev)}
      >
        <Menu size={24} />
      </Button>
      {/* Left Sidebar */}
      <aside
        className={`flex gap-x-4 bg-gray-800 w-60 h-screen top-0 left-0 absolute z-99999 lg:static ${
          window.innerWidth < 1028 ? (isNavListOpen ? "block" : "hidden") : ""
        }`}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="mx-auto w-160 max-h-screen overflow-auto border-2 p-8 flex-1">
        {children}
      </div>

      {/* Right Sidebar (Hidden on Mobile, Toggle with Burger Icon) */}
      <aside className="hidden lg:block bg-gray-800 w-max h-screen">
        <UserList />
      </aside>
    </div>
  );
};

export default Layout;
