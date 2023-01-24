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

	const { width: windowWidth, heigth: windowHeight } = useWindowDimensions();

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
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric`);
			const data = await response.json().then((data) => {
				setWeatherData(data);
			}).catch((error) => {
				setWeatherData(null);
			});
		}
		catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric&cnt=9`);
			const data = await response.json().then((data) => {
				setHourlyData(data);
			});

		}
		catch (error) {
			console.error(error);
		}
	};

	const handleSearch = () => {
		if (inputRef.current.value === '') { }
		else {
			setCity(city);
			handleLocation(city);
			setName(city)

			inputRef.current.clear();
			Keyboard.dismiss();
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

	if (weatherData === null) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				{/* <Text className="text-xl mb-5">Caricamento in corso...</Text> */}
			</SafeAreaView>
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
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-xl mb-5">Caricamento in corso...</Text>
			</SafeAreaView>
		);
	}

	return (
		<>
			<StatusBar style="" />
			<View style={{
				width: windowWidth,
				height: windowHeight,
				backgroundColor: '#555',
			}}>
				{/* <ImageBackground source={require("./assets/backgrounds/cloudy.jpeg")} style={{ flex: 1 }} /> */}
			</View>
			<SafeAreaView className="flex-1 items-center justify-center" style={{
				// backgroundImage: `url("./assets/backgrounds/sunny.jpeg")`,
				backgroundColor: '#f5f5f5',
			}}>
				<Text className="absolute top-6 font-medium text-4xl">{name}</Text>
				{/* <TouchableOpacity className="absolute right-4 top-3 p-2 rounded-full" onPress={handleSearch}>
					<Icon name="navigate" size={26} />
				</TouchableOpacity> */}
				<Text className="h-52 mb-6 bottom-6">{getIcon(weatherData.weather[0].icon, 140)}</Text>
				<View className="items-center mb-40 bottom-2">
					<View className="flex-row">
						<Text className="text-8xl">{Math.round(weatherData.main.temp)}</Text>
						<Text className="font-bold text-lg">°C</Text>
					</View>
					<Text className="text-lg first-letter:capitalize bottom-4">{weatherData.weather[0].description}</Text>
				</View>
				<ScrollView className="absolute flex-row bottom-20" snapToInterval={100} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToAlignment="start">
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
				<View className="absolute flex-row bottom-4 w-11/12 bg-gray-400 rounded-full">
					<TextInput className="flex-1 my-2 px-5 text-lg text-white" placeholder="Cerca città" onChangeText={(newCity) => setCity(newCity)} onSubmitEditing={handleSearch} ref={inputRef} />
					<TouchableOpacity className="w-6 justify-center mr-3" onPress={handleSearch}>
						<Icon name="search" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
}
