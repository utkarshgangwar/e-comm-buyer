"use client";
import { Navbar_Dummy_Data } from "@/src/DummyData/Navbar";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

type Props = {};

const Navbar = (props: Props) => {
  const t = useTranslations("navbar");

  return (
    <nav className="flex justify-between px-2 mx-2">
      {Navbar_Dummy_Data.map((item, index) => {
        const lowerCaseItem = item.toLowerCase(); // Standardize to lowercase

        return (
          <Link
            className="cursor-pointer px-1 mx-1"
            key={item + index}
            href={"/shop/" + lowerCaseItem}
          >
            {/* Call .toLowerCase() here so it perfectly matches your JSON keys */}
            {t("categories." + lowerCaseItem)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
