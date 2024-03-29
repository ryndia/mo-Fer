// React Native Floating Action Button
// https://aboutreact.com/react-native-floating-action-button/

// import React in our code
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

const Action_Button = (props) => {
  const clickHandler = () => {
    //function to handle click on floating Action Button
    //alert('Floating Button Clicked'); 
  };

  return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.navigate} 
          style={styles.backBtn}>
            <FeatherIcon color="#FD6B69" name="plus" size={36} />
        </TouchableOpacity>
  );
};

export default Action_Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 16,
    marginLeft: 16,
  },
});