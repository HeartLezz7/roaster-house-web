import AuthContextProvider from "./contexts/authContext";
import Router from "./router/Router";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
