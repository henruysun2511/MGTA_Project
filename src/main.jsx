import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import App from "./App";
import AllReducers from "./redux/store";

const store = createStore(AllReducers);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
