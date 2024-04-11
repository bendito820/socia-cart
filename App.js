import StackNavigator from "./navigation/StackNavigator";

import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import { UserConstext } from "./UserContext";
import store from "./store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserConstext>
          <StackNavigator />
          <ModalPortal />
        </UserConstext>
      </Provider>
    </>
  );
}
