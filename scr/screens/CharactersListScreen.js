import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Axios from "../../Axios.js";
import DetailsScreen from "./DetailsScreen.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CharactersListScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [Page, setPage] = useState(1);
    const GoDetails = (id) => { navigation.navigate("Details", { id: id }); }

    useEffect(() => {
        Axios.get(`/?page=${Page}`)
            .then((resposta) => setCharacters(resposta.data.results))
            .catch((errorr) => console.log(errorr));
    }, [Page]);

    if (characters.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <View style={[{ flex: 1, padding: 20 }]}>
            <FlatList
                data={characters}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => GoDetails(item.id)}>
                        <View style={[{ flexDirection: 'row', backgroundColor: '#89b8f5', marginBottom: windowHeight * 0.02, padding: 10, width: "100%" }]}>
                            <View style={{ marginRight: 10 }}>
                                <Image
                                    source={{ uri: item.image }} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1, resizeMode: 'contain' }}
                                />
                            </View>
                            <View style={{ flexDirection: "column", flex: 1 }}>
                                <Text style={{ fontSize: 18 }}>Name: {item.name}</Text>
                                <Text>Status: {item.status}</Text>
                                <Text>Species: {item.species}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
