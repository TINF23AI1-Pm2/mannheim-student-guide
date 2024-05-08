import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Startpage from "./src/views/Startpage";
import EventsInMannheim from "./src/components/EventsInMannheim";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Startpage} />
        <Drawer.Screen name="Events in Mannheim" component={EventsInMannheim} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
