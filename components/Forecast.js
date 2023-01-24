import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ temp, icon, hour }) {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.3} style={container}>
                <Text style={{ fontSize: 18, fontWeight: "300" }}> {hour.slice(10, 16)} </Text>
                <Text style={{ fontSize: 20 }}> {temp}° </Text>
                <Text style={{ height: 60, marginTop: -10 }}> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};

const page = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
        alignItems: "center",
    }
});

const container = StyleSheet.compose(page.container);
