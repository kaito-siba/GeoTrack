import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "../pages/Map";

const Stack = createNativeStackNavigator();

const BaseRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};
export default BaseRouter;
