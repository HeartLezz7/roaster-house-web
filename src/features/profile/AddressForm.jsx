import { useState } from "react";
import InputForm from "../../components/InputForm";
import ActionButton from "../../components/ActionButton";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import axios from "../../configs/axios";
import { useEffect } from "react";
import { getAccessToken } from "../../utils/local-storage";
import TextMessage from "../../components/TextMessage";
import useOrder from "../../hooks/use-Order";

export default function AddressForm() {
  const [addressInput, setAddressInput] = useState({
    addressInfo: "",
    subDistrict: "",
    district: "",
    province: "",
    postcode: "",
  });
  const [editAddress, setEditAddress] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/address/get")
        .then((res) => setAddressInput(res.data.address));
    }
  }, []);

  const { validateError } = useAuth();
  const { address } = useOrder();

  const addressValidateSchema = Joi.object({
    addressInfo: Joi.string().required(),
    subDistrict: Joi.string().required(),
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
      <div className="flex justify-between min-w-[600px] max-w-3xl">
        <div className="text-2xl">Address</div>
        {editAddress ? (
          <div className="cursor-pointer" onClick={() => setEditAddress(false)}>
            X
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => setEditAddress(true)}>
            Edit
          </div>
        )}
      </div>
      {editAddress ? (
        <form onSubmit={handleSubmitAddress} className="w-96">
          <InputForm
            placeholder={address?.addressInfo || "address"}
            name="addressInfo"
            value={addressInput?.addressInfo}
            onChange={handleInput}
            errorInput={error.addressInfo}
            errorMessage={error.addressInfo}
          />
          <InputForm
            placeholder={address?.subDistrict || "sub_district"}
            name="subDistrict"
            value={addressInput?.subDistrict}
            onChange={handleInput}
            errorInput={error.subDistrict}
            errorMessage={error.subDistrict}
          />
          <InputForm
            placeholder={address?.district}
            name="district"
            value={addressInput?.district || "district"}
            onChange={handleInput}
            errorInput={error.district}
            errorMessage={error.district}
          />
          <InputForm
            placeholder={address?.province || "province"}
            name="province"
            value={addressInput?.province}
            onChange={handleInput}
            errorInput={error.province}
            errorMessage={error.province}
          />
          <InputForm
            placeholder={address?.postcode || "postcode"}
            name="postcode"
            value={addressInput?.postcode}
            onChange={handleInput}
            errorInput={error.postcode}
            errorMessage={error.postcode}
          />
          <ActionButton title="edit address" onClick={handleSubmitAddress} />
        </form>
      ) : (
        <div className="grid grid-row-3 gap-2">
          <div className="grid grid-rows-3 grid-cols-2 min-w-[600px] max-w-3xl gap-2">
            <TextMessage
              grid="2"
              text={addressInput?.addressInfo || "Address"}
            />
            <TextMessage
              grid="1"
              text={addressInput?.subDistrict || "Sub district"}
            />
            <TextMessage grid="1" text={addressInput?.district || "District"} />
            <TextMessage grid="2" text={addressInput?.province || "Province"} />
            <TextMessage grid="2" text={addressInput?.postcode || "Postcode"} />
          </div>
        </div>
      )}
    </div>
  );
}
