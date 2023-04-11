import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "components/App";
import { store } from "redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // Provider дозволяє передавати стор у всі компоненти додатку
    <Provider store={store}>
        <App />
    </Provider>
);
