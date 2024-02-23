import StackNavigator from "./src/navigators/StackNavigator";
import { store } from "./src/store/store";
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
    <StackNavigator/>
    </Provider>
  );
};

export default App;
