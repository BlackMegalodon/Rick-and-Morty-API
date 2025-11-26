import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";

export default function CharactersListScreen({ navigation }) {
    const [characters, setcharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getcharacters() {
            try {
                const resposta = await axios.get(
                    "https://rickandmortyapi.com/api/character"
                );
                setcharacters(resposta.data.results);
            } catch (erro) {
                console.log("Error:", erro);
            } finally {
                setLoading(false);
            }
        }

        carregarPersonagens();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{ marginTop: 10 }}>Carregando a Lista</Text>
            </View>
        );
    }

    function renderCard({ item }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate("CharacterDetails", { id: item.id })
                }
            >
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.info}>
                        {item.status} - {item.species}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

// ====================== ESTILO ======================
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: "center",
        elevation: 2,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },

    info: {
        fontSize: 14,
        color: "gray",
    },
});