import LoginForm from "../features/auth/LoginForm";
import Categories from "../features/products/Categories";
import ProductContent from "../features/products/ProductContent";

export default function ProjectPage() {
  return (
    <>
      <div className="flex  justify-around mx-5">
        <Categories />
        <ProductContent />
      </div>
      <LoginForm />
    </>
  );
}
