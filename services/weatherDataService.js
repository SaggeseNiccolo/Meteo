// import { useState, useEffect, useRef } from 'react';
// import * as Location from 'expo-location';

// const [weatherData, setWeatherData] = useState(null);
// const [hourlyData, setHourlyData] = useState(null);
// const [city, setCity] = useState(null);
// const [name, setName] = useState(null);
// const inputRef = useRef();

// const screenHeight = useWindowDimensions().height + 50;
// const screenWidth = useWindowDimensions().width;

// useEffect(() => {
//     (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') { return }

//         await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
//             .then((location) => {
//                 setCityName(location.coords.latitude, location.coords.longitude);
//                 fetchWeatherData(location.coords.latitude, location.coords.longitude);
//             });
//     })();
// }, []);

// const setCityName = async (lat, lon) => {
//     const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=e57546012b1cb7c284f9861fdc3bc5bf`);

//     console.log("setCityName");

//     await response.json().then((data) => {
//         if (data[0].local_names.it) {
//             setName(data[0].local_names.it);
//         } else {
//             setName(data[0].name);
//         }
//     });
// };

// const handleLocation = async (city) => {
//     const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e57546012b1cb7c284f9861fdc3bc5bf`);

//     await response.json().then((coords) => {
//         fetchWeatherData(coords[0].lat, coords[0].lon);
//     });
// };

// const fetchWeatherData = async (lat, lon) => {
//     console.log("fetchWeatherData");
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric`);
//         await response.json().then((data) => {
//             setWeatherData(data);
//         });
//     }
//     catch (error) {
//         console.error(error);
//     }
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=e57546012b1cb7c284f9861fdc3bc5bf&units=metric&cnt=9`);
//         await response.json().then((data) => {
//             setHourlyData(data);
//         });

//     }
//     catch (error) {
//         console.error(error);
//     }
// };

// const getIcon = (icon, size) => {
//     switch (icon) {
//         case '01d':
//             return <Image source={require("./assets/icons/01d.png")} style={{ width: size, height: size }} />;
//         case '01n':
//             return <Image source={require("./assets/icons/01n.png")} style={{ width: size, height: size }} />;
//         case '02d':
//             return <Image source={require("./assets/icons/02d.png")} style={{ width: size, height: size }} />;
//         case '02n':
//             return <Image source={require("./assets/icons/02n.png")} style={{ width: size, height: size }} />;
//         case '03d':
//             return <Image source={require("./assets/icons/03.png")} style={{ width: size, height: size }} />;
//         case '03n':
//             return <Image source={require("./assets/icons/03.png")} style={{ width: size, height: size }} />;
//         case '04d':
//             return <Image source={require("./assets/icons/04.png")} style={{ width: size, height: size }} />;
//         case '04n':
//             return <Image source={require("./assets/icons/04.png")} style={{ width: size, height: size }} />;
//         case '09d':
//             return <Image source={require("./assets/icons/09.png")} style={{ width: size, height: size }} />;
//         case '09n':
//             return <Image source={require("./assets/icons/09.png")} style={{ width: size, height: size }} />;
//         case '10d':
//             return <Image source={require("./assets/icons/10d.png")} style={{ width: size, height: size }} />;
//         case '10n':
//             return <Image source={require("./assets/icons/10n.png")} style={{ width: size, height: size }} />;
//         case '11d':
//             return <Image source={require("./assets/icons/11.png")} style={{ width: size, height: size }} />;
//         case '11n':
//             return <Image source={require("./assets/icons/11.png")} style={{ width: size, height: size }} />;
//         case '13d':
//             return <Image source={require("./assets/icons/13.png")} style={{ width: size, height: size }} />;
//         case '13n':
//             return <Image source={require("./assets/icons/13.png")} style={{ width: size, height: size }} />;
//         case '50d':
//             return <Image source={require("./assets/icons/50.png")} style={{ width: size, height: size }} />;
//         case '50n':
//             return <Image source={require("./assets/icons/50.png")} style={{ width: size, height: size }} />;
//     }
// };

// const getBackgroundImage = (icon) => {
//     console.log(icon);

//     switch (icon) {
//         case '01d':
//         case '02d':
//             return require("./assets/backgrounds/sunny1.jpg");

//         case '01n':
//         case '02n':
//             return require("./assets/backgrounds/night1.jpg");

//         case '03d':
//         case '03n':
//         case '04d':
//         case '04n':
//             return require("./assets/backgrounds/cloudy1.jpg");

//         case '09d':
//         case '09n':
//         case '10d':
//         case '10n':
//             return require("./assets/backgrounds/rainy.jpg");

//         case '11d':
//         case '11n':
//             return require("./assets/backgrounds/thunder1.jpg")

//         case '13d':
//         case '13n':
//             return require("./assets/backgrounds/snowy.jpg");

//         case '50d':
//             return require("./assets/backgrounds/fog.jpg");

//         case '50n':
//             return require("./assets/backgrounds/cloudyfog.jpg");
//     }
// };

// const handleSearch = () => {
//     console.log("handleSearch");
//     if (inputRef.current.value === '') { }
//     else {
//         setCity(city);
//         setName(city);
//         handleLocation(city);

//         inputRef.current.clear();
//         Keyboard.dismiss();
//     }
// };