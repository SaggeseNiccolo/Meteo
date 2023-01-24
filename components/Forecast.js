import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ temp, icon, hour }) {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.3} style={container}>
                <Text style={fontSize}> {hour.slice(10, 16)} </Text>
                <Text style={fontSize}> {temp}°C </Text>
                <Text style={height}> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};

const page = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
    },
    padding: {
        
    },
    fontSize: {
        fontSize: 16,
    },
    height: {
        height: 40,
    },
});

const container = StyleSheet.compose(page.container);
const padding = StyleSheet.compose(page.padding);
const fontSize = StyleSheet.compose(page.fontSize);
const height = StyleSheet.compose(page.height);
