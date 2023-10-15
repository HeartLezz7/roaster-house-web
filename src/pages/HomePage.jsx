import LoginForm from "../features/auth/LoginForm";
import ProductContent from "../features/products/ProductContent";
import AboutUs from "../layout/AboutUs";

export default function HomePage() {
  return (
    <>
      <AboutUs />
      <ProductContent />
      <LoginForm />
    </>
  );
}
