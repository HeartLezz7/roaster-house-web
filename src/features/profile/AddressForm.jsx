import { useState } from "react";
import InputForm from "../../components/InputForm";
import ActionButton from "../../components/ActionButton";

export default function AddressForm() {
  const [address, setAddress] = useState({
    address: "",
    sub_district: "",
    district: "",
    province: "",
    postcode: "",
  });

  const [editAddress, setEditAddress] = useState(false);
  const [error, setError] = useState({});

  const handleInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl">Address</div>
        {editAddress ? (
          ""
        ) : (
          <div className="cursor-pointer" onClick={() => setEditAddress(true)}>
            Edit
          </div>
        )}
      </div>
      {editAddress ? (
        <form>
          <InputForm
            placeholder="address"
            name="address"
            value={address.address}
            onChange={handleInput}
            errorInput={error.address}
            errorMessage={error.address}
          />
          <InputForm
            placeholder="sub_district"
            name="sub_district"
            value={address.sub_district}
            onChange={handleInput}
            errorInput={error.sub_district}
            errorMessage={error.sub_district}
          />
          <InputForm
            placeholder="district"
            name="district"
            value={address.district}
            onChange={handleInput}
            errorInput={error.district}
            errorMessage={error.district}
          />
          <InputForm
            placeholder="province"
            name="province"
            value={address.province}
            onChange={handleInput}
            errorInput={error.province}
            errorMessage={error.province}
          />
          <InputForm
            placeholder="postcode"
            name="postcode"
            value={address.postcode}
            onChange={handleInput}
            errorInput={error.postcode}
            errorMessage={error.postcode}
          />
          <ActionButton
            title="Add address"
            onClick={() => setEditAddress(false)}
          />
        </form>
      ) : (
        <div className="grid grid-row-3 gap-2">
          <div className="grid grid-rows-3 grid-cols-2 min-w-[600px] max-w-3xl gap-2">
            <div className="col-span-2 border rounded-xl py-2 px-3">
              {address.address}
            </div>
            <div className="col-span-1 border rounded-xl py-2 px-3">
              {address.sub_district}
            </div>
            <div className="col-span-1 border rounded-xl py-2 px-3">
              {address.district}
            </div>
            <div className="col-span-2 border rounded-xl py-2 px-3">
              {address.province}
            </div>
            <div className="col-span-2 border rounded-xl py-2 px-3">
              {address.postcode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
