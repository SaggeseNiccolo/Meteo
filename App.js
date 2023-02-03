import { useState, useEffect, useRef } from 'react';
import { Text, StatusBar, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard, ScrollView, Image, ImageBackground, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hourly from './components/Hourly';
import Daily from './components/Daily';
import * as Location from 'expo-location';

export default function App() {
	const cityRef = useRef(null);
	const [weatherData, setWeatherData] = useState(null);
	const [hourlyData, setHourlyData] = useState(null);
	const [dailyData, setDailyData] = useState(null);
	const [city, setCity] = useState(null);
	const [name, setName] = useState(null);

	const API_KEY = 'c77ad253e30870ec7de6ea19d30ffc5c';

	const screenHeight = useWindowDimensions().height + 50;
	const screenWidth = useWindowDimensions().width;

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') { return }

			await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
				.then((location) => {
					console.log(location.coords.latitude, location.coords.longitude);
					setCityName(location.coords.latitude, location.coords.longitude);
					fetchWeatherData(location.coords.latitude, location.coords.longitude);
				});
		})();
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
		try {
			const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

			await response.json().then((coords) => {
				if (coords[0]) {
					fetchWeatherData(coords[0].lat, coords[0].lon);
				} else {
					alert("Città non trovata");
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	const fetchWeatherData = async (lat, lon) => {
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=${API_KEY}&units=metric`);
			await response.json().then((data) => {
				setWeatherData(data);
			});
		} catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=23&lang=it`);
			await response.json().then((data) => {
				setHourlyData(data);
			});
		} catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=7&lang=it`);
			await response.json().then((data) => {
				setDailyData(data);
			});
		} catch (error) {
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

		const prohibitedCharacters = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ":", ";", "'", '"', "<", ">", "?", "/", "\\", "`", "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

		for (let i in prohibitedCharacters) {
			if (city.includes(prohibitedCharacters[i])) {
				cityRef.current.clear();
				alert("Inserisci una città valida");
				return;
			}
		}

		if (city === '') { 
			return;
		}
		else {
			setCity(city);
			setName(city);
			handleLocation(city);

			cityRef.current.clear();
			Keyboard.dismiss();
		}
	};

	if (weatherData === null || hourlyData === null || dailyData === null) {
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

				{/* City name */}

				<Text className="absolute top-10 font-medium text-4xl text-white" style={styles.shadow}>{name}</Text>

				{/* Body */}

				<Text className="h-52 mb-6 bottom-6">{getIcon(weatherData.weather[0].icon, 140)}</Text>
				<View className="items-center mb-40 bottom-8">
					<View className="flex-row left-1">
						<Text className="text-8xl text-white" style={styles.shadow}>{Math.round(weatherData.main.temp)}</Text>
						<Text className="font-bold text-lg text-white" style={styles.shadow}>°C</Text>
					</View>
					<Text className="text-lg first-letter:capitalize bottom-4 text-white" style={styles.shadow}>{weatherData.weather[0].description}</Text>
				</View>

				{/* Hourly */}

				<ScrollView className="absolute flex-row bottom-20 rounded-2xl mx-3" snapToInterval={89} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToAlignment="start" style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
				}}>
					<Hourly temp={Math.round(weatherData.main.temp)} icon={getIcon(weatherData.weather[0].icon, 40)} hour="Ora" />
					{
						hourlyData.list.map((hour, index) => {
							return (
								<Hourly
									key={index}
									temp={Math.round(hour.main.temp)}
									icon={getIcon(hour.weather[0].icon, 40)}
									hour={hour.dt_txt}
									timezone={hourlyData.city.timezone}
								/>
							)
						})
					}
				</ScrollView>

				{/* Daily */}

				<ScrollView className="absolute flex-row bottom-56 rounded-2xl mx-3" snapToInterval={70} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToAlignment="start" style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
				}}>
					{
						dailyData.list.map((day, index) => {
							return (
								<Daily
									key={index}
									k={index}
									temp={Math.round(day.temp.day)}
									icon={getIcon(day.weather[0].icon, 40)}
									day={day.dt}
								/>
							)
						})
					}
				</ScrollView>

				{/* Input */}

				<View className="absolute flex-row bottom-4 w-11/12 rounded-full" style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
				}}>
					<TextInput
						className="flex-1 my-2 px-5 text-lg text-white"
						placeholder="Cerca città" placeholderTextColor="white"
						onChangeText={(newCity) => setCity(newCity)}
						ref={cityRef}
						onSubmitEditing={handleSearch}
					/>
					<TouchableOpacity
						className="w-6 justify-center mr-3"
						onPress={handleSearch}
					>
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
