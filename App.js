import { useState, useEffect, useRef } from "react";
import {
  Text,
  StatusBar,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
  ImageBackground,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import Info from "./components/Info";
import { getCountry } from "./components/Country";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [city, setCity] = useState(null);
  const [name, setName] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);

  const scrollY = new Animated.Value(0);

  const inputY = useRef(new Animated.Value(0)).current;

  const cityRef = useRef(null);

  const API_KEY = "c77ad253e30870ec7de6ea19d30ffc5c";

  const screenHeight = useWindowDimensions().height + 50;
  const screenWidth = useWindowDimensions().width;

  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }).then((location) => {
        setCityName(location.coords.latitude, location.coords.longitude);
        fetchWeatherData(location.coords.latitude, location.coords.longitude);
      });
    })();
  }, []);

  useEffect(() => {
    if (inputVisible) {
      cityRef.current.focus();
    }
  }, [inputVisible]);

  const setCityName = async (lat, lon) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );

      await response.json().then((data) => {
        if (data[0].local_names) {
          setName(data[0].local_names.it);
        } else {
          setName(data[0].name);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocation = async (city) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      await response.json().then((coords) => {
        if (coords[0]) {
          fetchWeatherData(coords[0].lat, coords[0].lon);
          setName(city);
        } else {
          alert("Città non trovata");
          setCity("");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=${API_KEY}&units=metric`
      );
      await response.json().then((data) => {
        setWeatherData(data);
      });
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=23&lang=it`
      );
      await response.json().then((data) => {
        setHourlyData(data);
      });
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=7&lang=it`
      );
      await response.json().then((data) => {
        setDailyData(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 20], // Intervallo di valori di input
    outputRange: [1, 0], // Intervallo di valori di output
    extrapolate: "clamp", // Evitare valori al di fuori dell'intervallo
  });

  const animateInput = (toValue) => {
    Animated.timing(inputY, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const getIcon = (icon, size) => {
    switch (icon) {
      case "01d":
        return (
          <Image
            source={require("./assets/icons/01d.png")}
            style={{ width: size, height: size }}
          />
        );
      case "01n":
        return (
          <Image
            source={require("./assets/icons/01n.png")}
            style={{ width: size, height: size }}
          />
        );
      case "02d":
        return (
          <Image
            source={require("./assets/icons/02d.png")}
            style={{ width: size, height: size }}
          />
        );
      case "02n":
        return (
          <Image
            source={require("./assets/icons/02n.png")}
            style={{ width: size, height: size }}
          />
        );
      case "03d":
        return (
          <Image
            source={require("./assets/icons/03.png")}
            style={{ width: size, height: size }}
          />
        );
      case "03n":
        return (
          <Image
            source={require("./assets/icons/03.png")}
            style={{ width: size, height: size }}
          />
        );
      case "04d":
        return (
          <Image
            source={require("./assets/icons/04.png")}
            style={{ width: size, height: size }}
          />
        );
      case "04n":
        return (
          <Image
            source={require("./assets/icons/04.png")}
            style={{ width: size, height: size }}
          />
        );
      case "09d":
        return (
          <Image
            source={require("./assets/icons/09.png")}
            style={{ width: size, height: size }}
          />
        );
      case "09n":
        return (
          <Image
            source={require("./assets/icons/09.png")}
            style={{ width: size, height: size }}
          />
        );
      case "10d":
        return (
          <Image
            source={require("./assets/icons/10d.png")}
            style={{ width: size, height: size }}
          />
        );
      case "10n":
        return (
          <Image
            source={require("./assets/icons/10n.png")}
            style={{ width: size, height: size }}
          />
        );
      case "11d":
        return (
          <Image
            source={require("./assets/icons/11.png")}
            style={{ width: size, height: size }}
          />
        );
      case "11n":
        return (
          <Image
            source={require("./assets/icons/11.png")}
            style={{ width: size, height: size }}
          />
        );
      case "13d":
        return (
          <Image
            source={require("./assets/icons/13.png")}
            style={{ width: size, height: size }}
          />
        );
      case "13n":
        return (
          <Image
            source={require("./assets/icons/13.png")}
            style={{ width: size, height: size }}
          />
        );
      case "50d":
        return (
          <Image
            source={require("./assets/icons/50.png")}
            style={{ width: size, height: size }}
          />
        );
      case "50n":
        return (
          <Image
            source={require("./assets/icons/50.png")}
            style={{ width: size, height: size }}
          />
        );
    }
  };

  const getBackgroundImage = (icon) => {
    switch (icon) {
      case "01d":
      case "02d":
        return require("./assets/backgrounds/sunny1.jpg");

      case "01n":
      case "02n":
        return require("./assets/backgrounds/night1.jpg");

      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return require("./assets/backgrounds/cloudy1.jpg");

      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return require("./assets/backgrounds/rainy.jpg");

      case "11d":
      case "11n":
        return require("./assets/backgrounds/thunder1.jpg");

      case "13d":
      case "13n":
        return require("./assets/backgrounds/snowy.jpg");

      case "50d":
        return require("./assets/backgrounds/fog.jpg");

      case "50n":
        return require("./assets/backgrounds/cloudyfog.jpg");
    }
  };

  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    animateInput(0);

    setInputVisible(false);

    if (city === "" || city === null) {
      alert("Inserisci una città");
      return;
    } else {
      if (!/^[a-zA-Z\sà]*$/.test(city)) {
        setCity("");
        cityRef.current.clear();
        Keyboard.dismiss();
        alert("Inserisci una città valida");
        return;
      }

      handleLocation(city).then(() => {
        setCity("");
      });

      cityRef.current.clear();
      Keyboard.dismiss();
    }
  };

  if (weatherData === null || hourlyData === null || dailyData === null) {
    return <SafeAreaView className="flex-1 items-center justify-center" />;
  }

  return (
    <ImageBackground
      source={getBackgroundImage(weatherData.weather[0].icon)}
      blurRadius={0}
      style={{
        flex: 1,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      <View
        className="flex-1 items-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <StatusBar translucent backgroundColor={"transparent"} />

        {inputVisible ? (
          <Animated.View
            className="absolute flex-row w-11/12 rounded-full top-11"
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              transform: [{ translateY: inputY }],
              opacity: inputY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          >
            <TouchableOpacity
              className="w-6 justify-center ml-3"
              onPress={() => {
                setInputVisible(false);
                animateInput(0);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
            <TextInput
              className="flex-1 my-2 px-5 text-lg text-white"
              placeholder="Cerca città"
              placeholderTextColor="white"
              onChangeText={(newCity) => setCity(newCity)}
              ref={cityRef}
              onSubmitEditing={handleSearch}
              autoFocus={true}
              maxLength={19}
            />
            <TouchableOpacity
              className="w-6 justify-center mr-3"
              onPress={handleSearch}
            >
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            className="absolute flex-row top-10 items-center w-11/12"
            style={{
              transform: [{ translateY: inputY }],
              opacity: inputY.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <Text
              className="flex-1 my-2 text-center left-3 font-medium text-4xl text-white first-letter:capitalize"
              style={styles.shadow}
            >
              {name}
            </Text>
            <TouchableOpacity
              className="w-6"
              onPress={() => {
                setInputVisible(true);
                animateInput(1);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Icon
                name="search"
                size={24}
                color="white"
                style={styles.shadow}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          decelerationRate={"fast"}
          style={{
            zIndex: -1,
          }}
          className=""
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16} // Frequenza degli eventi di scorrimento in millisecondi
        >
          {inputVisible ? (
            <View className="flex-row items-center mt-24">
              <View className="mt-7" />
            </View>
          ) : (
            <Animated.View
              className="flex-row items-center mt-24"
              style={{
                transform: [{ translateY: inputY }],
                opacity: inputY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}
            >
              <Animated.Text
                className="text-white text-lg"
                style={[styles.shadow, styles.text, { opacity: textOpacity }]}
              >
                {getCountry(weatherData.sys.country)}
              </Animated.Text>
            </Animated.View>
          )}

          {/* Body */}

          <View className="items-center mt-48">
            {/* {getIcon(weatherData.weather[0].icon, 140)} */}
            <View className="flex-row left-1">
              <Text className="text-9xl text-white" style={styles.shadow}>
                {Math.round(weatherData.main.temp)}
              </Text>
              <Text
                className="font-bold text-lg text-white"
                style={styles.shadow}
              >
                °C
              </Text>
            </View>
            <Text
              className="text-xl first-letter:capitalize text-white bottom-3"
              style={styles.shadow}
            >
              {weatherData.weather[0].description}
            </Text>
          </View>

          <View className="space-y-4 mt-36">
            {/* Hourly */}

            <ScrollView
              className="flex-none flex-row rounded-2xl mx-3"
              snapToInterval={93}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={"fast"}
              snapToAlignment="start"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <Hourly
                temp={Math.round(weatherData.main.temp)}
                icon={getIcon(weatherData.weather[0].icon, 40)}
                hour="Ora"
              />
              {hourlyData.list.map((hour, index) => {
                return (
                  <Hourly
                    key={index}
                    temp={Math.round(hour.main.temp)}
                    icon={getIcon(hour.weather[0].icon, 40)}
                    hour={hour.dt_txt}
                    timezone={hourlyData.city.timezone}
                  />
                );
              })}
            </ScrollView>

            {/* Daily */}

            <ScrollView
              className="flex-none flex-row mx-3 rounded-2xl"
              snapToInterval={70}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={"fast"}
              snapToAlignment="start"
              blurRadius={5}
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              {dailyData.list.map((day, index) => {
                return (
                  <Daily
                    key={index}
                    k={index}
                    temp={Math.round(day.temp.day)}
                    icon={getIcon(day.weather[0].icon, 40)}
                    day={day.dt}
                  />
                );
              })}
            </ScrollView>
          </View>

          <Info
            pressure={weatherData.main.pressure}
            humidity={weatherData.main.humidity}
            wind={weatherData.wind.speed}
            feelsLike={Math.round(weatherData.main.feels_like)}
            min={Math.round(dailyData.list[0].temp.min)}
            max={Math.round(dailyData.list[0].temp.max)}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  shadow: {
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
