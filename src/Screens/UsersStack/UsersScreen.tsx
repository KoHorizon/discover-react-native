import {  useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet, StatusBar, TouchableOpacity, RefreshControl, Image, Pressable } from "react-native"


export interface User {
    name: Name;
    title: string;
    picture: Picture;
    email: string;
    gender: string;
    login: Login
}

interface Name {
    first: string;
    last: string;
}

interface Picture {
    large: string;
}

interface Login {
    uuid: string;
}


type UserListItemProps = {
    data: User
}


const UserListItem: React.FC<UserListItemProps> = ({ data }) => {
    let navigation = useNavigation();
    console.log(data.picture.large);
    
    return(
        <TouchableOpacity  onPress={() => navigation.navigate<{}>('UserDetail', data ) }>
            <View style={styles.item}>
                <Image
                    style={styles.logo}
                    source={{
                    uri: data.picture.large,
                    }}
                />
                <Text style={styles.title}>{data.name.first}</Text>
            </View>
        </TouchableOpacity>
    )
};



const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function UserScreen() {

    const [users, setUsers] = useState<User[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        loadUsers();
        setRefreshing(true);
        wait(200).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        fetch("https://randomuser.me/api/?results=5")
            .then(response => response.json())
            .then(data => setUsers(data.results))
    }, [])

    const AddUserBtn = () => {
        const fetchOneUser = () => {
        fetch("https://randomuser.me/api/?results=1")
            .then(response => response.json())
            .then(data => setUsers(prevState => [data.results[0], ...prevState]))
        }
        return(
            <Pressable style={styles.button} onPress={() => fetchOneUser()}>
                <Text style={styles.text}>Ajoutez un user</Text>
            </Pressable>
        )
    }

    const ClearUsersBtn = () => {
        const clearUser = () => setUsers([]);
        return(
            users &&
                <Pressable style={styles.button} onPress={() => clearUser()}>
                    <Text style={styles.text}>Clear les users</Text>
                </Pressable>
        )
    }

    const loadUsers = () => {
        fetch("https://randomuser.me/api/?results=5")
            .then(response => response.json())
            .then(data => setUsers(data.results))
    }
    
    return (
    <View style={{ flex: 1, alignItems: 'center'}}>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                renderItem={ ({ item }) => <UserListItem data={item} />}
                keyExtractor={item => item.login.uuid}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={() =><AddUserBtn/>}
                ListEmptyComponent={() =>  <Text style={styles.item}>Aucun utilisateur n'a été chargé.</Text> }
                ListFooterComponent={() => users.length > 0 ? <ClearUsersBtn/> : null}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#19BDFF',
    },
    item: {
        flexDirection: 'row',
        width: 200,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 17,
        margin: 10,
    },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
});
