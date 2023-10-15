import AuthContextProvider from "./contexts/authContext";
import ProductContextProvider from "./contexts/productContext";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ProductContextProvider>
      <AuthContextProvider>
        <Router />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="colored"
        />
      </AuthContextProvider>
    </ProductContextProvider>
  );
}

export default App;
