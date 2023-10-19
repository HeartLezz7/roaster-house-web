import { useState } from "react";
import InputForm from "../../components/InputForm";
import ActionButton from "../../components/ActionButton";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import axios from "../../configs/axios";

export default function AddressForm() {
  const [addressInput, setAddressInput] = useState({
    address: "",
    sub_district: "",
    district: "",
    province: "",
    postcode: "",
  });
  const [editAddress, setEditAddress] = useState(false);
  const [error, setError] = useState({});

  const { validateError } = useAuth();

  const addressValidateSchema = Joi.object({
    address: Joi.string().required(),
    sub_district: Joi.string().required(),
    district: Joi.string().required(),
    province: Joi.string().required(),
    postcode: Joi.string()
      .pattern(/^[0-9]{0,5}$/)
      .required(),
  });

  const handleInput = (e) => {
    setAddressInput({ ...addressInput, [e.target.name]: e.target.value });
  };

  const handleSubmitAddress = async (e) => {
    try {
      e.preventDefault();
      const error = validateError(addressValidateSchema, addressInput);
      if (error) {
        return setError(error);
      }
      setError({});
      await axios.post("/address/create", addressInput);
      setEditAddress(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-row-2 gap-3">
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
        <form onSubmit={handleSubmitAddress} className="w-96">
          <InputForm
            placeholder="address"
            name="address"
            value={addressInput.address}
            onChange={handleInput}
            errorInput={error.address}
            errorMessage={error.address}
          />
          <InputForm
            placeholder="sub_district"
            name="sub_district"
            value={addressInput.sub_district}
            onChange={handleInput}
            errorInput={error.sub_district}
            errorMessage={error.sub_district}
          />
          <InputForm
            placeholder="district"
            name="district"
            value={addressInput.district}
            onChange={handleInput}
            errorInput={error.district}
            errorMessage={error.district}
          />
          <InputForm
            placeholder="province"
            name="province"
            value={addressInput.province}
            onChange={handleInput}
            errorInput={error.province}
            errorMessage={error.province}
          />
          <InputForm
            placeholder="postcode"
            name="postcode"
            value={addressInput.postcode}
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
              {addressInput.address || "Address"}
            </div>
            <div className="col-span-1 border rounded-xl py-2 px-3">
              {addressInput.sub_district || "Sub district"}
            </div>
            <div className="col-span-1 border rounded-xl py-2 px-3">
              {addressInput.district || "District"}
            </div>
            <div className="col-span-2 border rounded-xl py-2 px-3">
              {addressInput.province || "Province"}
            </div>
            <div className="col-span-2 border rounded-xl py-2 px-3">
              {addressInput.postcode || "Postcode"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
