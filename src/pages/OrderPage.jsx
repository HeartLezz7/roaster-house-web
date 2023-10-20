// import { useEffect } from "react";
import TextMessage from "../components/TextMessage";

export default function OrderPage() {
  //     const
  //   useEffect(() => {

  //   }, []);
  return (
    <div>
      <div className="m-auto border border-gray-300 grid grid-cols-3 w-[1000px]">
        <div className="col-span-2 grid-rows-2 gap-1">
          <div>Customer</div>
          <TextMessage text="firstname" />
          <TextMessage text="lastname" />
          <TextMessage text="email" />
          <TextMessage text="phone" />
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
