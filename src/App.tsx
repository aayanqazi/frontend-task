import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Login from "./components/login/login"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouteProps,
} from "react-router-dom";
import Header from "./components/header/header";
import { Products } from "./components/products/products";
import { Orders } from "./components/orders/orders";


export const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute>
          <Products />
        </ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute>
          <Orders />
        </ProtectedRoute>} />
      </Routes>
    </ChakraProvider>
  </Router>
)

const ProtectedRoute = ({ children }: RouteProps): JSX.Element => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  return <Header>{children}</Header>  as JSX.Element;
};