import { useState, useEffect, useRef } from 'react';
import { Text, StatusBar, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard, ScrollView, Image, ImageBackground, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Forecast from './components/Forecast';
import * as Location from 'expo-location';

export default function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [hourlyData, setHourlyData] = useState(null);
	const [city, setCity] = useState(null);
	const [name, setName] = useState(null);
	const inputRef = useRef();

	const screenHeight = useWindowDimensions().height + 50;
	const screenWidth = useWindowDimensions().width;

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
	}, []);

	const setCityName = async (lat, lon) => {
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=e57546012b1cb7c284f9861fdc3bc5bf`);

		console.log("setCityName");

		await response.json().then((data) => {
			setName(data[0].local_names.it);
		});
	};

	const handleLocation = async (city) => {
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e57546012b1cb7c284f9861fdc3bc5bf`);

		await response.json().then((coords) => {
			fetchWeatherData(coords[0].lat, coords[0].lon);
		});
	};

	const fetchWeatherData = async (lat, lon) => {
		console.log("fetchWeatherData");
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric`);
			await response.json().then((data) => {
				setWeatherData(data);
			});
		}
		catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric&cnt=9`);
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
		console.log(icon);
		let rand;
		
		switch (icon) {
			case '01d':
			case '02d':
				// rand = Math.floor(Math.random() * 9);
				// console.log(rand);
				// if (rand == 0)
				return require("./assets/backgrounds/sunny1.jpg");
				// else if (rand == 1) return require("./assets/backgrounds/sunny2.jpg");
				// else if (rand == 2) return require("./assets/backgrounds/sunny3.jpg");
				// else if (rand == 3) return require("./assets/backgrounds/sunny4.jpg");
				// else if (rand == 4) return require("./assets/backgrounds/sunny5.jpg");
				// else if (rand == 5) return require("./assets/backgrounds/sunny6.jpg");
				// else if (rand == 6) return require("./assets/backgrounds/sunny7.jpg");
				// else if (rand == 7) return require("./assets/backgrounds/sunny8.jpg");
				// else if (rand == 8) return require("./assets/backgrounds/sunny9.jpg");

			case '01n':
			case '02n':
				// rand = Math.floor(Math.random() * 2);
				// if (rand == 0) return
				require("./assets/backgrounds/night1.jpg");
				// else if (rand == 1) return require("./assets/backgrounds/cloudynight.jpg");

			case '03d':
			case '03n':
			case '04d':
			case '04n':
				// rand = Math.floor(Math.random() * 4);
				// if (rand == 0) return
				require("./assets/backgrounds/cloudy1.jpg");
				// else if (rand == 1) return require("./assets/backgrounds/cloudy2.jpg");
				// else if (rand == 2) return require("./assets/backgrounds/cloudy3.jpg");
				// else if (rand == 3) return require("./assets/backgrounds/cloudyfog.jpg");

			case '09d':
			case '09n':
			case '10d':
			case '10n':
				return require("./assets/backgrounds/rainy.jpg");

			case '11d':
			case '11n':
				// rand = Math.floor(Math.random() * 2);
				// if (rand == 0)
					return require("./assets/backgrounds/thunder1.jpg")
				// else if (rand == 1) return require("./assets/backgrounds/thunder2.jpg");

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
			setName(city);
			setCity(city);
			handleLocation(city);

			inputRef.current.clear();
			Keyboard.dismiss();
		}
	};


	if (weatherData === null) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center" />
		);
	}

	if (weatherData.cod != '200') {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-xl mb-5">Città non trovata</Text>
				<View className="absolute flex-row bottom-4 w-11/12 bg-gray-400 rounded-full">
					<TextInput className="flex-1 my-2 px-5 text-lg text-white" placeholder="Cerca città" onChangeText={(newCity) => setCity(newCity)} ref={inputRef} />
					<TouchableOpacity className="w-6 justify-center mr-3" onPress={handleSearch}>
						<Icon name="search" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	if (hourlyData === null || hourlyData.cod != '200') {
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
			{/* // <StatusBar backgroundColor={"transparent"} /> */}
			<SafeAreaView SafeAreaView className="flex-1 items-center justify-center" style={{
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
					<Forecast temp={Math.round(hourlyData.list[0].main.temp)} icon={getIcon(hourlyData.list[0].weather[0].icon, 40)} hour={hourlyData.list[0].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[1].main.temp)} icon={getIcon(hourlyData.list[1].weather[0].icon, 40)} hour={hourlyData.list[1].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[2].main.temp)} icon={getIcon(hourlyData.list[2].weather[0].icon, 40)} hour={hourlyData.list[2].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[3].main.temp)} icon={getIcon(hourlyData.list[3].weather[0].icon, 40)} hour={hourlyData.list[3].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[4].main.temp)} icon={getIcon(hourlyData.list[4].weather[0].icon, 40)} hour={hourlyData.list[4].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[5].main.temp)} icon={getIcon(hourlyData.list[5].weather[0].icon, 40)} hour={hourlyData.list[5].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[6].main.temp)} icon={getIcon(hourlyData.list[6].weather[0].icon, 40)} hour={hourlyData.list[6].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[7].main.temp)} icon={getIcon(hourlyData.list[7].weather[0].icon, 40)} hour={hourlyData.list[7].dt_txt} />
					<Forecast temp={Math.round(hourlyData.list[8].main.temp)} icon={getIcon(hourlyData.list[8].weather[0].icon, 40)} hour={hourlyData.list[8].dt_txt} />
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
			</SafeAreaView >
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
