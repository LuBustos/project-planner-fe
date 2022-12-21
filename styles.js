'use strict';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: 324,
    height: 50,
    // backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.05,
    elevation: 5,
    borderRadius: 20,
    margin: 10,
  },
  form: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    // backgroundColor: '#67a9ef',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    borderRadius: 25.1953,
    height: 53,
    width: 220,
    borderRadius: 25.1953125,
    marginBottom: 23,
  },
  textButton: {
    position: 'absolute',
    left: '15%',
    right: '15.45%',
    top: '30.19%',
    bottom: '30.19%',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15.1172,
    lineHeight: 23,
    textAlign: 'center',
    // color: "#FFFFFF"
  },
  container: {
    backgroundColor: '#fff3e3',
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    left: '10%',
    right: '7.44%',
    top: '16.59%',
    bottom: '70.01%',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 36,
    lineHeight: 54,
    // color: '#FFFFFF',
    letterSpacing: 4,
  },
  icon_text: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,

    // textAlign: "center",
    letterSpacing: 1,

    color: '#67A9EF',
  },
  second_title: {
    position: 'absolute',
    // left: '21.03%',
    top: '17.39%',
    // bottom: '10.21%',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 36,
    lineHeight: 54,
    // // color: '#FFFFFF',
    letterSpacing: 4,
    // justifyContent: 'center',
    // alignItems: 'center'
    alignSelf: 'center',
  },
  subtitle: {
    position: 'absolute',
    left: '10%',
    right: '60.77%',
    top: '13.86%',
    bottom: '82.94%',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
    // color: '#FFFFFF',
  },
});

module.exports = styles;
