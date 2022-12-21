'use strict';
import {StyleSheet} from 'react-native';
import {boxShadow, textStyle} from './mixin';

const styles = StyleSheet.create({
  input: {
    width: 324,
    height: 50,
    // backgroundColor: '#ffffff',
    ...boxShadow(),
    borderRadius: 20,
    margin: 10,
  },
  cards: {
    backgroundColor: '#FFFFFF',
    ...boxShadow(4, 4),
    borderRadius: 10,
    width: 336,
    height: 70,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCards: {
    ...textStyle('500', 13, 20),
    letterSpacing: 1,
    padding: 10,
  },
  form: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    // backgroundColor: '#67a9ef',
    ...boxShadow(8, 4, 0.17),
    borderRadius: 25.1953,
    height: 53,
    width: 220,
    marginBottom: 23,
  },
  textButton: {
    position: 'absolute',
    left: '15%',
    right: '15.45%',
    top: '30.19%',
    bottom: '30.19%',
    ...textStyle('700', 15.1172, 23),
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
    ...textStyle('800', 36, 54),
    letterSpacing: 4,
  },
  icon_text: {
    ...textStyle('400', 14, 21),
    letterSpacing: 1,
    color: '#67A9EF', //check
  },
  placeholder_text: {
    fontStyle: 'normal',
    ...textStyle('300', 14, 21),
    letterSpacing: 1,
    color: '#BDBDBD',
  },
  second_title: {
    position: 'absolute',
    top: '17.39%',
    ...textStyle('800', 36, 54),
    letterSpacing: 4,
    alignSelf: 'center',
  },
  subtitle: {
    position: 'absolute',
    left: '10%',
    right: '60.77%',
    top: '13.86%',
    bottom: '82.94%',
    ...textStyle('600', 18, 27),
    // color: '#FFFFFF',
  },
});

module.exports = styles;
