import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ temp, icon, hour }) {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.3} style={container}>
                <Text style={[{ fontSize: 17, fontWeight: "300", color:"white" }, shadow]}> {hour.slice(10, 16)} </Text>
                <Text style={[{ fontSize: 20, color: "white", left: 3 }, shadow]}> {temp}° </Text>
                <Text style={{ height: 60, marginTop: -10 }}> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};

const page = StyleSheet.create({
    container: {
        padding: 14,
        marginRight: 10,
        alignItems: "center",
    },
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
});

const container = StyleSheet.compose(page.container);
const shadow = StyleSheet.compose(page.shadow);
