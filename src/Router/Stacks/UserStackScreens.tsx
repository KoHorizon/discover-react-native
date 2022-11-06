import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../../Screens/UsersStack/UsersScreen';
import UserDetailScreen from '../../Screens/UsersStack/UsersScreenDetail';

const UserStack = createNativeStackNavigator();

export default function UserStackScreens() {
    return (
        <UserStack.Navigator >
            <UserStack.Screen name="Users" component={UserScreen} />
            <UserStack.Screen name="UserDetail" component={UserDetailScreen} />
        </UserStack.Navigator>
    );
}