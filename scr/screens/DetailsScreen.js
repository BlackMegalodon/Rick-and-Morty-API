import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import Axios from "../../Axios.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DetailsScreen({ route, navigation }) {
    const id = route.params;
    const [details, setdetails] = useState();

    useEffect(() => {
        Axios.get(`/${id.id}`)
            .then((resposta) => setdetails(resposta.data))
            .catch((errorr) => console.log(errorr))
        }, []);

    while(!details){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading</Text>
            </View>
        );
    }

    return(
        <View style={[{justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'column', flex: 1}]}>
            <Text style={[{fontSize: 20}]}>Character Details</Text>
            <View>
                <Image source={{ uri: details.image }} style={[{width: windowWidth*0.2, height: windowWidth*0.2, borderRadius: windowWidth*0.2, resizeMode: 'contain'}]} />
            </View>
            <View style={[{alignItems: 'center'}]}>
                <Text>Name: {details.name}</Text>
                <Text>Status: {details.status}</Text>
                <Text>Species: {details.species}</Text>
                <Text>Gender: {details.gender}</Text>
            </View>
            <View>
                <Text>Origin: {details.origin.name}</Text>
                <Text>Location: {details.location.name}</Text>
            </View>

        </View>
    )
}