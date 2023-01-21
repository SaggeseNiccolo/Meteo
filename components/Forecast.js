import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ temp, icon, hour }) {
    const page = StyleSheet.create({
        container: {
            backgroundColor: "white",
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 1,
            margin: 10,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
    });

    const container = StyleSheet.compose(page.container);

    return (
        <View  >
            <TouchableOpacity activeOpacity={0.3} style={container}>
                <Text> {hour.slice(10, 16)} </Text>
                <Text> {temp}°C </Text>
                <Text> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};
