import AuthContextProvider from "./contexts/authContext";
import OrderContextProvider from "./contexts/orderContext";
import ProductContextProvider from "./contexts/productContext";
import Route from "./router/Route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <OrderContextProvider>
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
    </OrderContextProvider>
  );
}

export default App;
