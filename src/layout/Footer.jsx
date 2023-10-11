import { Link } from "react-router-dom";
import FooterContact from "./FooterContact";

export default function Footer() {
  return (
    <footer
      className="bg-neutral-200 flex flex-col gap-2 items-center p-5"
      // style={{ backgroundColor: "#ECECEC" }}
    >
      <div className="w-[110rem] flex justify-between text-sm">
        <div className="w-44 flex flex-col">
          <img src="src/icon/coffee_bean.svg" alt="coffee" className="w-24" />
          <span className="font-semibold">Address</span>
          <span>
            Wannasorn Tower 35 Phaya Thai Rd Ratchathewi Bangkok 10400 Thailand
          </span>
        </div>
        <div className="flex flex-col gap-1 ">
          <Link to="/products">
            <span>PRODUCTS</span>
          </Link>
          <Link to="/">
            <span>ABOUT US</span>
          </Link>
          <span>LOCATION MAP</span>
        </div>
        <div className="flex flex-col gap-3">
          <FooterContact title={"XXX-XXXXXX"} src={"src/icon/phone.png"} />
          <FooterContact title={"@RoasterHouse"} src={"src/icon/line.png"} />
          <FooterContact
            title={"Roaster House"}
            src={"src/icon/facebook.png"}
          />
          <FooterContact title={"RoasterHouse"} src={"src/icon/ig.png"} />
        </div>
      </div>
      <hr className="w-[110rem] border-gray-400 " />
      <span>© 2023 Roaster House. All Rights Reserved.</span>
    </footer>
  );
}