import { useState } from "react";
import InputForm from "../components/InputForm";
import ActionButton from "../components/ActionButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Loading from "../components/Loading";
import axios from "../configs/axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const [file, setFile] = useState(null);
  const { stateLoading, setStateLoading } = useAuth();
  const navigete = useNavigate();
  const { paymentId } = useParams();

  useEffect(() => {
    axios.get(`/order/get/${paymentId}`);
  }, []);

  const uploadSlip = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("slip", file);
      }
      setStateLoading(true);
      await axios.patch(`/order/paid/${paymentId}`, formData);
      toast.success(`order ${paymentId} SUCCESS payment`);
      navigete("/profile/order");
    } catch (err) {
      console.log(err);
    } finally {
      setStateLoading(false);
    }
  };

  return (
    <>
      {stateLoading && <Loading />}
      <div className="m-auto h-full w-80 flex flex-col gap-5">
        <img
          src="https://res.cloudinary.com/dadw5awfz/image/upload/v1697884592/roaster%20house/qrcode_x7thfw.jpg"
          alt="qrcode"
        />
        <div className="flex flex-col">
          <InputForm
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <ActionButton title="upload" onClick={uploadSlip} />
        </div>
      </div>
    </>
  );
}
