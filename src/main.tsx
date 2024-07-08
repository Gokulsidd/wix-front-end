import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from 'react-redux';
import store from '../src/Redux/Auth/store.ts';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <BrowserRouter>
    <Toaster position="top-right" richColors closeButton  />
    <App />
  </BrowserRouter>
  </Provider>
);
