import useProduct from "../../hooks/use-product";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useProduct();
  return (
    <div className="flex gap-10 my-5">
      {products.map((item) => (
        <ProductItem
          key={item.id}
          image={item.productImage}
          name={item.productName}
          roast={item.roastLevel}
          price={item.price}
          size={item.size}
        />
      ))}
    </div>
  );
}
