import { useState } from "react";
import { useRef } from "react";
import ActionButton from "../../components/ActionButton";
import plus from "../../icon/plus.png";
import InputForm from "../../components/InputForm";
import Joi from "joi";
import useAuth from "../../hooks/use-auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/use-product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CreateProductPage() {
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      findProduct(productId).then((res) => {
        setInput(res.data.product);
      });
    }
  }, []);

  const [input, setInput] = useState({
    productName: "",
    tastingNote: "",
    origin: "",
    roastLevel: "",
    process: "",
    size: "",
    price: "",
  });
  const [error, setError] = useState({});
  const [file, setFile] = useState(null || input?.productImage);
  const fileItem = useRef(null);

  const { validateError } = useAuth();
  const { getProducts, findProduct, updateProduct } = useProduct();

  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const productSchema = Joi.object({
    productName: Joi.string().trim(),
    tastingNote: Joi.string().trim(),
    roastLevel: Joi.string().trim(),
    process: Joi.string().trim(),
    size: Joi.number(),
    price: Joi.string().trim(),
    origin: Joi.string().trim(),
  });

  const handleProduct = async () => {
    try {
      const formData = new FormData();
      const error = validateError(productSchema, input);
      if (error) {
        return setError(error);
      }
      setError({});
      if (file) {
        formData.append("productImage", file);
        formData.append("productName", input.productName);
        formData.append("tastingNote", input.tastingNote);
        formData.append("roastLevel", input.roastLevel);
        formData.append("process", input.process);
        formData.append("size", input.size);
        formData.append("price", input.price);
        formData.append("origin", input.origin);
      }
      await axios.post("/product/add", formData);
      toast.success("create SUCCESS");
      getProducts();
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const { error } = validateError(productSchema, input);
      if (error) {
        return setError(error);
      }
      const formData = new FormData();
      if (file) {
        formData.append("productImage", file);
        formData.append("productName", input.productName);
        formData.append("tastingNote", input.tastingNote);
        formData.append("roastLevel", input.roastLevel);
        formData.append("process", input.process);
        formData.append("size", input.size);
        formData.append("price", input.price);
        formData.append("origin", input.origin);
      }
      setError({});
      await updateProduct(productId, formData);
      toast.success("UPDATED");
      getProducts();
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-5 w-[600px] h-[450px] gap-1 border border-gray-300 rounded-3xl shadow-lg m-auto">
      <div
        className="flex items-center justify-center bg-slate-200 rounded-l-3xl col-span-3 "
        onClick={() => fileItem.current.click()}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="bean"
            className="h-full rounded-l-3xl text-slate-400"
          />
        ) : (
          <img
            src={input?.productImage || plus}
            alt="bean"
            className={`${
              input?.productImage ? "h-full" : "h-10"
            } rounded-l-3xl text-slate-400`}
          />
        )}
        <input
          type="file"
          className="hidden"
          ref={fileItem}
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className="w-full flex flex-col justify-center gap-2 items-center col-span-2 p-2">
        <InputForm
          placeholder={input?.productName || "productName"}
          name="productName"
          value={input.productName}
          onChange={handleInput}
          error={error}
          errorInput={error.productName}
          errorMessage={error.productName}
          gap="0"
        />
        <InputForm
          placeholder={input?.tastingNote || "tastingNote"}
          name="tastingNote"
          value={input.tastingNote}
          onChange={handleInput}
          error={error}
          errorInput={error.tastingNote}
          errorMessage={error.tastingNote}
          gap="0"
        />
        <InputForm
          placeholder={input?.origin || "origin"}
          name="origin"
          value={input.origin}
          onChange={handleInput}
          error={error}
          errorInput={error.origin}
          errorMessage={error.origin}
          gap="0"
        />
        <select
          className="w-full rounded-xl py-2 px-3 border"
          name="roastLevel"
          onChange={handleInput}
        >
          <option value={input?.roastLevel || ""}>{input?.roastLevel}</option>
          <option value="light">light</option>
          <option value="medium">medium</option>
          <option value="medium_dark">medium_dark</option>
          <option value="dark">dark</option>
        </select>

        <select
          className="w-full rounded-xl py-2 px-3 border"
          name="process"
          onChange={handleInput}
          placeholder="process"
        >
          <option value={input?.process || ""}>{input?.process}</option>
          <option value="natural">natural</option>
          <option value="wash">wash</option>
          <option value="honey">honey</option>
          <option value="dry">dry</option>
          <option value="wet">wet</option>
        </select>
        <InputForm
          placeholder={input?.size || "size"}
          name="size"
          value={input.size}
          onChange={handleInput}
          error={error}
          errorInput={error.size}
          errorMessage={error.size}
          gap="0"
        />
        <InputForm
          placeholder={input?.price || "price"}
          name="price"
          value={input.price}
          onChange={handleInput}
          error={error}
          errorInput={error.price}
          errorMessage={error.price}
          gap="0"
        />
        {input?.productImage ? (
          <ActionButton title="Update" onClick={handleUpdateProduct} />
        ) : (
          <ActionButton title="Create" onClick={handleProduct} />
        )}
      </div>
    </div>
  );
}
