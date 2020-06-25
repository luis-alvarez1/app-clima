import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-ionicons';

const Formulario = () => {
  return (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.formulario}>
          <View>
            <Input
              placeholder="Ciudad"
              leftIcon={<Icon name="globe" color="black" />}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginTop: 100,
  },
});

export default Formulario;
