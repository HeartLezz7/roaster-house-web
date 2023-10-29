import useProduct from "../../hooks/use-product";
import { useNavigate } from "react-router-dom";

const Button = ({ title, onClick, color, hovor }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 ${color} ${hovor} border rounded-lg text-white`}
    >
      {title}
    </button>
  );
};

export default function AdminProductList() {
  const { deleteProduct, products } = useProduct();
  const navigate = useNavigate();

  return (
    <div className="m-auto flex flex-col gap-3">
      <div className="text-3xl">products list</div>
      <div>
        {products.map((item) => (
          <>
            <div className="flex w-[600px] justify-between">
              <div>
                {item.id} - {item.productName}
              </div>

              <div className="flex gap-3">
                <Button
                  title="edit"
                  color="bg-blue-600"
                  hovor="bg-blue-500"
                  onClick={() => navigate(`/products/${item.id}`)}
                />
                <Button
                  title="delete"
                  onClick={() => {
                    deleteProduct(item.id);
                  }}
                  color="bg-red-600"
                  hovor="bg-red-500"
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
