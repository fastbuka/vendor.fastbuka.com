import { useState, useContext } from "react";
import Link from "next/link";
import ClickOutside from "../../components/ClickOutside";
import { User } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbSettingsCog } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black ">
            Rodinia Kitchen
          </span>
          {/* <span className="block text-xs">UX Designer</span> */}
        </span>

        <span className="h-auto w-auto rounded-full">
          <User className="border rounded-full" />
        </span>

        <BsChevronDown />
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5">
            <li>
              <Link
                href="/dashboard/vendor/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaRegUserCircle />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/vendor/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <TbSettingsCog/>
                Account Settings
              </Link>
            </li>
          </ul>
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <BiLogOutCircle />
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
