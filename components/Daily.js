import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Forecast({ chi, temp, icon, day }) {

    day = new Date(day * 1000).getDay();

    switch (day) {
        case 0:
            day = "Dom";
            break;
        case 1:
            day = "Lun";
            break;
        case 2:
            day = "Mar";
            break;
        case 3:
            day = "Mer";
            break;
        case 4:
            day = "Gio";
            break;
        case 5:
            day = "Ven";
            break;
        case 6:
            day = "Sab";
            break;
    }

    if (chi == 0) {
        day = "Oggi";
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.4} style={styles.container}>
                <Text style={[{ fontSize: 17, fontWeight: "300", color: "white" }, styles.shadow]}> {day} </Text>
                {/* <Text style={[{ fontSize: 19, color: "white", left: 3 }, styles.shadow]}> {temp}° </Text> */}
                <Text style={{ height: 60, marginTop: -10 }}> {icon} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        marginHorizontal: -2,
        alignItems: "center",
    },
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
});
