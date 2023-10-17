import LoginForm from "../features/auth/LoginForm";
import Categories from "../features/products/Categories";
import ProductContent from "../features/products/ProductContent";
import ShoppingCart from "../features/products/ShoppingCart";

export default function ProductPage() {
  return (
    <>
      <div className="flex gap-8 mx-10">
        <Categories />
        <ProductContent />
      </div>
      <LoginForm />
      <ShoppingCart />
    </>
  );
}
