import { useState, useEffect, useRef } from 'react';
import { Text, StatusBar, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Forecast from './components/Forecast';
import * as Location from 'expo-location';

export default function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [hourlyData, setHourlyData] = useState(null);
	const [city, setCity] = useState(null);
	const [name, setName] = useState(null);
	const inputRef = useRef();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				return;
			}

			await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }).then((location) => {
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
			});
		}
		catch (error) {
			console.error(error);
		}
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric&cnt=9`);
			const data = await response.json();
			setHourlyData(data);
		}
		catch (error) {
			console.error(error);
		}
	};

	const handleSearch = () => {
		setCity(city);
		setName(city)
		handleLocation(city);

		inputRef.current.clear();
		Keyboard.dismiss();
	};

	const getWeatherIcon = (weather, size) => {
		switch (weather) {
			case 'Clouds':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Rain':
				return <Icon name="rainy" size={size} color="blue" />;
			case 'Snow':
				return <Icon name="snow" size={size} color="#d3d3d3" />;
			case 'Clear':
				return <Icon name="sunny" size={size} color="yellow" />;
			case 'Thunderstorm':
				return <Icon name="thunderstorm" size={size} color="gray" />;
			case 'Drizzle':
				return <Icon name="rainy" size={size} color="gray" />;
			case 'Mist':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Smoke':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Haze':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Dust':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Fog':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Sand':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Ash':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Squall':
				return <Icon name="cloudy" size={size} color="gray" />;
			case 'Tornado':
				return <Icon name="cloudy" size={size} color="gray" />;
			default:
		}
	};

	if (weatherData === null) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-xl mb-5">Caricamento in corso...</Text>
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
		<SafeAreaView className="flex-1 items-center justify-center">
			<Text className="absolute top-4 font-bold text-3xl mb-1">{name}, {weatherData.sys.country}</Text>
			<View className="absolute bottom-72 items-center">
				<Text className="">{getWeatherIcon(weatherData.weather[0].main, 84)}</Text>
				<View className="flex-row">
					<Text className="text-8xl">{Math.round(weatherData.main.temp)}</Text>
					<Text className="font-bold text-lg">°C</Text>
				</View>
				<Text className="text-lg first-letter:capitalize">{weatherData.weather[0].description}</Text>
			</View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate={0}
				snapToInterval={90} snapToAlignment="start" className="absolute flex-row bottom-24">
				<Forecast temp={Math.round(hourlyData.list[0].main.temp)} icon={getWeatherIcon(hourlyData.list[0].weather[0].main, 30)} hour={hourlyData.list[0].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[1].main.temp)} icon={getWeatherIcon(hourlyData.list[1].weather[0].main, 30)} hour={hourlyData.list[1].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[2].main.temp)} icon={getWeatherIcon(hourlyData.list[2].weather[0].main, 30)} hour={hourlyData.list[2].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[3].main.temp)} icon={getWeatherIcon(hourlyData.list[3].weather[0].main, 30)} hour={hourlyData.list[3].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[4].main.temp)} icon={getWeatherIcon(hourlyData.list[4].weather[0].main, 30)} hour={hourlyData.list[4].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[5].main.temp)} icon={getWeatherIcon(hourlyData.list[5].weather[0].main, 30)} hour={hourlyData.list[5].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[6].main.temp)} icon={getWeatherIcon(hourlyData.list[6].weather[0].main, 30)} hour={hourlyData.list[6].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[7].main.temp)} icon={getWeatherIcon(hourlyData.list[7].weather[0].main, 30)} hour={hourlyData.list[7].dt_txt} />
				<Forecast temp={Math.round(hourlyData.list[8].main.temp)} icon={getWeatherIcon(hourlyData.list[8].weather[0].main, 30)} hour={hourlyData.list[8].dt_txt} />
			</ScrollView>
			<View className="absolute flex-row bottom-4 w-11/12 bg-gray-400 rounded-full">
				<TextInput className="flex-1 my-2 px-5 text-lg text-white" placeholder="Cerca città" onChangeText={(newCity) => setCity(newCity)} onSubmitEditing={handleSearch} ref={inputRef} />
				<TouchableOpacity className="w-6 justify-center mr-3" onPress={handleSearch}>
					<Icon name="search" size={24} color="white" />
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
