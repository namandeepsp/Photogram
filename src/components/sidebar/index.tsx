import addIcon from "@/assets/icons/add.svg";
import directIcon from "@/assets/icons/direct.svg";
import homeIcon from "@/assets/icons/home.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import myphotoIcon from "@/assets/icons/myphotos.svg";
import notificationIcon from "@/assets/icons/notifications.svg";
import profileIcon from "@/assets/icons/profile.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import { useUserAuth } from "@/context/userAuthContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon,
  },
  {
    name: "My Photos",
    link: "/myphotos",
    icon: myphotoIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: profileIcon,
  },
  {
    name: "Notifications",
    link: "#",
    icon: notificationIcon,
  },
  {
    name: "Direct",
    link: "#",
    icon: directIcon,
  },
  {
    name: "Settings",
    link: "#",
    icon: settingsIcon,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();
  return (
    <nav className="flex flex-col space-x-2 relative h-screen max-w-sm w-full">
      <div className="flex justify-center m-5">
        <div className="text-white text-lg">PhotoGram</div>
      </div>
      {navItems.map(({ name, link, icon }) => {
        return (
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              pathname === link
                ? "bg-white text-white-800 hover:bg-white rounded-none"
                : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
              "justify-start"
            )}
            key={name}
          >
            <Link to={link} className="flex">
              <span>
                <img
                  src={icon}
                  className="w-5 h-5 mr-2"
                  alt={name}
                  style={{
                    filter: pathname === link ? "invert(0)" : "invert(1)",
                  }}
                />
              </span>
              <span>{name}</span>
            </Link>
          </div>
        );
      })}
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          pathname === "/login"
            ? "bg-white text-white-800 hover:bg-white rounded-none"
            : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
          "justify-start"
        )}
      >
        <Link to="#" className="flex" onClick={logOut}>
          <span>
            <img
              src={logoutIcon}
              className="w-5 h-5 mr-2"
              alt="logout icon"
              style={{
                filter: pathname === "/login" ? "invert(0)" : "invert(1)",
              }}
            />
          </span>
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
