import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Overlay, Divider} from 'react-native-elements';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [search, setSearch] = useState({
    city: '',
    country: '',
  });
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState({});
  const {city, country} = search;
  const [consulted, setConsulted] = useState(false);
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');

  const bgColorApp = {backgroundColor: bgColor};

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const consultWeather = async () => {
      if (consulted) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=89919db9df3608f8a06ba8185d072b0d`;
        try {
          const response = await fetch(url);
          const apiResult = await response.json();
          setResult(apiResult);
          setConsulted(false);

          //BGColor according to temperature

          const kelvin = 273.15;

          const {main} = apiResult;
          const current = main.temp - kelvin;

          if (current < 10) {
            setBgColor('rgb(105,108,149)');
          } else if (current >= 10 && current < 25) {
            setBgColor('rgb(71,149,212)');
          } else {
            setBgColor('rgb(178,28,61)');
          }
        } catch (err) {
          console.log(err);
          toggleOverlay();
        }
      }
    };
    consultWeather();
  }, [consulted]);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.app, bgColorApp]}>
          <View>
            <View style={styles.content}>
              <Clima result={result} />

              <Formulario
                search={search}
                setSearch={setSearch}
                setConsulted={setConsulted}
              />
            </View>
          </View>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{width: '85%', alignSelf: 'center'}}>
            <View>
              <Text style={{color: '#ff0000', fontSize: 20}}>ERROR!!</Text>
              <Text style={{fontSize: 15, marginBottom: 2}}>
                Something went wrong, try with another city or country
              </Text>
              <Divider style={{backgroundColor: 'black'}} />
              <TouchableOpacity onPress={() => toggleOverlay()}>
                <Text
                  style={{
                    color: '#3dabff',
                    alignSelf: 'center',
                    fontSize: 15,
                    marginRight: 5,
                    marginTop: 2,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: '2.5%',
  },
  app: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
