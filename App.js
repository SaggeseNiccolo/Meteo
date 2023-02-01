import { useState, useEffect, useRef } from 'react';
import { Text, StatusBar, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard, ScrollView, Image, ImageBackground, useWindowDimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Forecast from './components/Forecast';
import * as Location from 'expo-location';

export default function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [hourlyData, setHourlyData] = useState(null);
	const [city, setCity] = useState(null);
	const [name, setName] = useState(null);
	const inputRef = useRef();

	const API_KEY = 'e57546012b1cb7c284f9861fdc3bc5bf';

	const screenHeight = useWindowDimensions().height + 50;
	const screenWidth = useWindowDimensions().width;

	const scandicci = {
		"lat": 43.75423,
		"lon": 11.18794
	}

	const firenze = {
		"lat": 43.77925,
		"lon": 11.24626
	}

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') { return }

			await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
				.then((location) => {
					setCityName(location.coords.latitude, location.coords.longitude);
					fetchWeatherData(location.coords.latitude, location.coords.longitude);
				});
		})();
		// setCityName(scandicci.lat, scandicci.lon);
		// fetchWeatherData(scandicci.lat, scandicci.lon);
	}, []);

	const setCityName = async (lat, lon) => {
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);

		await response.json().then((data) => {
			if (data[0].local_names) {
				setName(data[0].local_names.it);
			} else {
				setName(data[0].name);
			}
		}).catch((error) => {
			console.error(error);
		});
	};

	const handleLocation = async (city) => {
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

		await response.json().then((coords) => {
			if (coords[0]) {
				fetchWeatherData(coords[0].lat, coords[0].lon);
			} else {
				alert("Città non trovata");
			}
		}).catch((error) => {
			console.error(error);
		});
	};

	const fetchWeatherData = async (lat, lon) => {
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=${API_KEY}&units=metric`);
			await response.json().then((data) => {
				setWeatherData(data);
			});
		}
		catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=${API_KEY}&units=metric&cnt=9`);
			await response.json().then((data) => {
				setHourlyData(data);
			});
		}
		catch (error) {
			console.error(error);
		}
	};

	const getIcon = (icon, size) => {
		switch (icon) {
			case '01d':
				return <Image source={require("./assets/icons/01d.png")} style={{ width: size, height: size }} />;
			case '01n':
				return <Image source={require("./assets/icons/01n.png")} style={{ width: size, height: size }} />;
			case '02d':
				return <Image source={require("./assets/icons/02d.png")} style={{ width: size, height: size }} />;
			case '02n':
				return <Image source={require("./assets/icons/02n.png")} style={{ width: size, height: size }} />;
			case '03d':
				return <Image source={require("./assets/icons/03.png")} style={{ width: size, height: size }} />;
			case '03n':
				return <Image source={require("./assets/icons/03.png")} style={{ width: size, height: size }} />;
			case '04d':
				return <Image source={require("./assets/icons/04.png")} style={{ width: size, height: size }} />;
			case '04n':
				return <Image source={require("./assets/icons/04.png")} style={{ width: size, height: size }} />;
			case '09d':
				return <Image source={require("./assets/icons/09.png")} style={{ width: size, height: size }} />;
			case '09n':
				return <Image source={require("./assets/icons/09.png")} style={{ width: size, height: size }} />;
			case '10d':
				return <Image source={require("./assets/icons/10d.png")} style={{ width: size, height: size }} />;
			case '10n':
				return <Image source={require("./assets/icons/10n.png")} style={{ width: size, height: size }} />;
			case '11d':
				return <Image source={require("./assets/icons/11.png")} style={{ width: size, height: size }} />;
			case '11n':
				return <Image source={require("./assets/icons/11.png")} style={{ width: size, height: size }} />;
			case '13d':
				return <Image source={require("./assets/icons/13.png")} style={{ width: size, height: size }} />;
			case '13n':
				return <Image source={require("./assets/icons/13.png")} style={{ width: size, height: size }} />;
			case '50d':
				return <Image source={require("./assets/icons/50.png")} style={{ width: size, height: size }} />;
			case '50n':
				return <Image source={require("./assets/icons/50.png")} style={{ width: size, height: size }} />;
		}
	};

	const getBackgroundImage = (icon) => {
		switch (icon) {
			case '01d':
			case '02d':
				return require("./assets/backgrounds/sunny1.jpg");

			case '01n':
			case '02n':
				return require("./assets/backgrounds/night1.jpg");

			case '03d':
			case '03n':
			case '04d':
			case '04n':
				return require("./assets/backgrounds/cloudy1.jpg");

			case '09d':
			case '09n':
			case '10d':
			case '10n':
				return require("./assets/backgrounds/rainy.jpg");

			case '11d':
			case '11n':
				return require("./assets/backgrounds/thunder1.jpg")

			case '13d':
			case '13n':
				return require("./assets/backgrounds/snowy.jpg");

			case '50d':
				return require("./assets/backgrounds/fog.jpg");

			case '50n':
				return require("./assets/backgrounds/cloudyfog.jpg");
		}
	};

	const handleSearch = () => {
		console.log("handleSearch");
		if (inputRef.current.value === '') { }
		else {
			setCity(city);
			setName(city);
			handleLocation(city);

			inputRef.current.clear();
			Keyboard.dismiss();
		}
	};

	if (weatherData === null || hourlyData === null) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center" />
		);
	}

	return (
		<ImageBackground source={getBackgroundImage(weatherData.weather[0].icon)} blurRadius={0} style={{
			flex: 1,
			width: screenWidth,
			height: screenHeight,
		}}>
			<StatusBar translucent backgroundColor={"transparent"} />
			<ScrollView
				// className="flex-1 items-center justify-center"
				contentContainerStyle={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="always"
				style={{
					backgroundColor: 'rgba(0,0,0,0.3)',
				}}>
				<Text className="absolute top-10 font-medium text-4xl text-white" style={shadow}>{name}
					{/* , {weatherData.sys.country} */}
				</Text>
				{/* <TouchableOpacity className="absolute right-4 top-3 p-2 rounded-full" onPress={handleSearch}>
						<Icon name="navigate" size={26} />
					</TouchableOpacity> */}
				<Text className="h-52 mb-6 bottom-6">{getIcon(weatherData.weather[0].icon, 140)}</Text>
				<View className="items-center mb-40 bottom-2">
					<View className="flex-row">
						<Text className="text-8xl text-white" style={shadow}>{Math.round(weatherData.main.temp)}</Text>
						<Text className="font-bold text-lg text-white" style={shadow}>°C</Text>
					</View>
					<Text className="text-lg first-letter:capitalize bottom-4 text-white" style={shadow}>{weatherData.weather[0].description}</Text>
				</View>
				<ScrollView className="absolute flex-row bottom-20 rounded-3xl mx-3" snapToInterval={90} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToAlignment="start" style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
				}}>
					{
						hourlyData.list.map((hour, index) => {
							return <Forecast key={index} temp={Math.round(hour.main.temp)} icon={getIcon(hour.weather[0].icon, 40)} hour={hour.dt_txt} />
						})
					}
				</ScrollView>
				<View className="absolute flex-row bottom-4 w-11/12 rounded-full" style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
				}}>
					<TextInput className="flex-1 my-2 px-5 text-lg text-white" placeholder="Cerca città" placeholderTextColor="white"
						onChangeText={(newCity) => setCity(newCity)}
						onSubmitEditing={handleSearch} ref={inputRef} />
					<TouchableOpacity className="w-6 justify-center mr-3" onPress={handleSearch}>
						<Icon name="search" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</ScrollView >
		</ImageBackground >
	);
}

const styles = StyleSheet.create({
	shadow: {
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10
	}
});

const shadow = StyleSheet.compose(styles.shadow);
