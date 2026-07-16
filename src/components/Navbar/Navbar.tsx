import { Navbar_Dummy_Data } from "@/src/DummyData/Navbar";
import { Link } from "../../i18n/routing";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between px-2 mx-2">
      {Navbar_Dummy_Data.map((item, index) => {
        return (
          <Link
            className="cursor-pointer px-1 mx-1"
            key={item + index}
            href={"/shop/" + item.toLowerCase()}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
