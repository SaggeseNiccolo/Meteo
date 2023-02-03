import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ temp, icon, hour, timezone }) {

    if (hour != "Ora") {
        hour = hour.slice(11, 13);
        hour = parseInt(hour) + timezone / 3600;
        hour = hour % 24;

        if (hour < 0) {
            hour = hour + 24;
        }

        if (hour < 10) {
            hour = "0" + hour;
        }

        hour = hour + ":00";
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.4} style={styles.container}>
                <Text style={[{ fontSize: 17, fontWeight: "300", color: "white" }, styles.shadow]}> {hour} </Text>
                <Text style={[{ fontSize: 19, color: "white", left: 3 }, styles.shadow]}> {temp}° </Text>
                <Text style={{ height: 60, marginTop: -10 }}> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        marginHorizontal: 6,
        alignItems: "center",
    },
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
});
