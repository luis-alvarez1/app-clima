import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Clima = ({result}) => {
  const {name, main} = result;

  if (!name) {
    return null;
  }
  const kelvin = 273.15;
  console.log(result);
  return (
    <>
      <View style={styles.weather}>
        <Text style={[styles.txtWeather, styles.current]}>
          {parseInt(main.temp - kelvin)}
          <Text style={styles.temperature}>&#x2103;</Text>
          <Image
            style={{width: 66, height: 58}}
            source={{
              uri: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
            }}
          />
        </Text>

        <View style={styles.maxMinTemp}>
          <Text style={styles.txtWeather}>
            Min:{' '}
            <Text style={styles.temperature}>
              {parseInt(main.temp_min - kelvin)}&#x2103;
            </Text>
          </Text>
          <Text style={styles.txtWeather}>
            Max:{' '}
            <Text style={styles.temperature}>
              {parseInt(main.temp_max - kelvin)}&#x2103;
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weather: {
    marginBottom: 20,
  },
  txtWeather: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  maxMinTemp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Clima;
