import { NavigationContainer } from "@react-navigation/native";
import BaseRouter from "./src/components/router/BaseRouter";

export default function App() {
  return (
    <NavigationContainer>
      <BaseRouter />
    </NavigationContainer>
  );
}
