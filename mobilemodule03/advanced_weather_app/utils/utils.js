export const getWeatherDescription = (code) => {
    switch (code) {
      case 0:
        return "Clear";
      case 1:
      case 2:
      case 3:
        return "Overcast";
      case 45:
      case 48:
        return "Fog";
      case 51:
      case 53:
      case 55:
        return "Drizzle";
      case 56:
      case 57:
        return "Freezing Drizzle";
      case 61:
      case 63:
      case 65:
        return "Rain";
      case 66:
      case 67:
        return "Freezing Rain";
      case 71:
      case 73:
      case 75:
        return "Snow fall";
      case 77:
        return "Snow grains";
      case 80:
      case 81:
      case 82:
        return "Rain showers";
      case 85:
      case 86:
        return "Snow showers";
      case 95:
        return "Thunderstorm";
      case 96:
      case 99:
        return "Thunderstorm with slight and heavy hail";
      default:
        return "Unknown weather";
    }
  };


export const mapimagePath = {
  'Clear' : require('../assets/Clear.png'),
  'Overcast' : require('../assets/Overcast.png'),
  'Fog' : require('../assets/Fog.png'),
  'Drizzle' : require('../assets/Drizzle.png'),
  'Freezing Drizzle' : require('../assets/Freezing Drizzle.png'),
  'Rain' : require('../assets/Rain.png'),
  'Freezing Rain' : require('../assets/Freezing Rain.png'),
  'Snow fall' : require('../assets/Snow fall.png'),
  'Snow grains' : require('../assets/Snow grains.png'),
  'Rain showers' : require('../assets/Rain showers.png'),
  'Snow showers' : require('../assets/Snow showers.png'),
  'Thunderstorm' : require('../assets/Thunderstorm.png'),
  'Thunderstorm with slight and heavy hail' : require('../assets/Thunderstorm with slight and heavy hail.png'),
}