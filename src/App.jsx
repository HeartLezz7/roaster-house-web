import AuthContextProvider from "./contexts/authContext";
import ProductContextProvider from "./contexts/productContext";
import Route from "./router/Route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ProductContextProvider>
      <AuthContextProvider>
        <Route />
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
