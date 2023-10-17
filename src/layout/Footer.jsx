import { Link } from "react-router-dom";
import FooterContact from "./FooterContact";
import coffeeBean from "../icon/coffee_bean.svg";
import phone from "../icon/phone.png";
import line from "../icon/line.png";
import facebook from "../icon/facebook.png";
import ig from "../icon/ig.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-200 flex flex-col gap-2 items-center pt-5 pb-2  ">
      <div className="w-[70rem] flex flex-col gap-2 ">
        <div className=" flex justify-between text-sm">
          <div className="w-44 flex flex-col gap-1">
            <img src={coffeeBean} alt="coffee" className="w-24" />
            <span className="font-semibold">Address</span>
            <span>
              Wannasorn Tower 35 Phaya Thai Rd Ratchathewi Bangkok 10400
              Thailand
            </span>
          </div>
          <div className="flex flex-col gap-3 ">
            <Link to="/products">
              <span>PRODUCTS</span>
            </Link>
            <Link to="/">
              <span>ABOUT US</span>
            </Link>
            <span>LOCATION MAP</span>
          </div>
          <div className="flex flex-col gap-3">
            <FooterContact title={"XXX-XXXXXX"} src={phone} />
            <FooterContact title={"@RoasterHouse"} src={line} />
            <FooterContact title={"Roaster House"} src={facebook} />
            <FooterContact title={"RoasterHouse"} src={ig} />
          </div>
        </div>
        <hr className=" border-gray-400 " />
        <span className="m-auto">
          © 2023 Roaster House. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
