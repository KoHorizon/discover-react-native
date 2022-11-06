import HomeStackScreens from "./Stacks/HomeStackScreens";
import AccountStackScreens from "./Stacks/AccountStackScreens";
import UserStackScreens from "./Stacks/UserStackScreens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function TabBarNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeStack" component={HomeStackScreens} />
            <Tab.Screen name="AccountStack" component={AccountStackScreens} />
            <Tab.Screen name="UserStack" component={UserStackScreens} />
        </Tab.Navigator>
    );
}