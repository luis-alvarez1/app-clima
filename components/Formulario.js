import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Input, Overlay, Divider} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {Picker} from '@react-native-community/picker';
const Formulario = ({search, setSearch, setConsulted}) => {
  const {city, country} = search;
  const [btnAnimation] = useState(new Animated.Value(1));
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getWeather = () => {
    if (country.trim() === '' || city.trim() === '') {
      toggleOverlay();
      return;
    }

    setConsulted(true);
  };

  const animationIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const animationOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {transform: [{scale: btnAnimation}]};

  return (
    <>
      <View>
        <View>
          <Input
            value={city}
            onChangeText={(city) => setSearch({...search, city})}
            inputContainerStyle={{backgroundColor: '#eee'}}
            placeholder="City"
            leftIcon={<Icon name="globe" color="black" />}
          />
        </View>
        <View>
          <Picker
            style={styles.picker}
            selectedValue={country}
            onValueChange={(country) => {
              setSearch({...search, country});
            }}>
            <Picker.Item label="-- Select country --" value="" />
            <Picker.Item label="United States of America" value="US" />
            <Picker.Item label="United Kindom" value="UK" />
            <Picker.Item label="Brazil" value="BR" />
            <Picker.Item label="Germany" value="DE" />
            <Picker.Item label="Ireland" value="IR" />
            <Picker.Item label="Japan" value="JP" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Spain" value="ES" />
            <Picker.Item label="Venezuela" value="VE" />
            <Picker.Item label="France" value="FR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Italy" value="IT" />
            <Picker.Item label="Portugal" value="PT" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animationIn()}
          onPressOut={() => animationOut()}
          onPress={() => {
            getWeather();
          }}>
          <Animated.View style={[styles.btnWeather, animationStyle]}>
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                alignSelf: 'center',
              }}>
              Get Weather
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{width: '85%', alignSelf: 'center'}}>
          <View>
            <Text style={{color: '#ff0000', fontSize: 20}}>ERROR!!</Text>
            <Text style={{fontSize: 15, marginBottom: 2}}>
              You need a CITY and COUNTRY to get the weather
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
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 320,
  },
  btnWeather: {
    backgroundColor: '#000',
    borderRadius: 8,
    width: 300,
    padding: 5,
    alignSelf: 'center',
    marginVertical: 50,
  },
});

export default Formulario;
