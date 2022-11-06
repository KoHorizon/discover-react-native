import { View, Text, Image, StyleSheet  } from "react-native"
import { useRoute } from '@react-navigation/native';
import { User } from './UsersScreen'

export default function UserDetailScreen() {
    const { params: user } = useRoute() as {params: User}

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                uri: user.picture.large,
                }}
            />
            <Text>Nom : {user.name.last}</Text>
            <Text>Prénom : {user.name.first}</Text>
            <Text>email : {user.email}</Text>
            <Text>Sexe : {user.gender} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        margin: 54,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        margin: 10,
        width: 166,
        height: 158,
        borderRadius: 500
    },
    text: {
    }
});