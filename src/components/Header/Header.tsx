import React from "react";
import PinCode from "../PinCode/PinCode";
import SearchBar from "../SearchBar/SearchBar";
import Localization from "../Localization/Localization";
import NavProfile from "../NavProfile/NavProfile";
import NavCart from "../NavCart/NavCart";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import { RiExchange2Line } from "react-icons/ri";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-300 bg-white">
        <div className="flex justify-between p-1 m-1 content-center items-center">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-2">
              <RiExchange2Line />
              <span>e-Comm</span>
            </div>
          </Link>
          <PinCode />

          <SearchBar />

          <Localization />
          <NavProfile />
          <NavCart />
        </div>
      </header>

      <div className="text-center">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
