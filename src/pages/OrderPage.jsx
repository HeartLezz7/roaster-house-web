import TextMessage from "../components/TextMessage";
import useOrder from "../hooks/use-Order";

export default function OrderPage() {
  const { address } = useOrder();
  console.log(address);

  return (
    <div>
      <div className="m-auto border border-gray-300 grid grid-cols-3 max-w-screen-xl p-3">
        <div className="grid grid-rows-2 col-span-2">
          <div className="grid  col-span-2 ">
            <div className="gird grid-rows-2 ">
              <div className="">Customer</div>
              <div className="grid grid-rows-3 gap-2">
                <TextMessage text="firstname" />
                <TextMessage text="lastname" />
                <TextMessage text="email" grid="2" />
                <TextMessage text="phone" grid="2" />
              </div>
            </div>
          </div>
          <div className="grid col-span-2 ">
            <div className="gird grid-rows-2 gap-2">
              <div className="">Address</div>
              <div className="grid grid-rows-3 gap-2">
                <TextMessage text="firstname" />
                <TextMessage text="lastname" />
                <TextMessage text="email" grid="2" />
                <TextMessage text="phone" grid="2" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
