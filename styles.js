'use strict';
import {StyleSheet} from 'react-native';
import {boxShadow, textStyle} from './mixin';

const styles = StyleSheet.create({
  input: {
    width: 324,
    height: 50,
    ...boxShadow(),
    borderRadius: 20,
    margin: 10,
  },
  form: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
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
  second_title: {
    top: '50%',
    ...textStyle('800', 36, 54),
    letterSpacing: 4,
    alignSelf: 'center',
  },
  header: {
    left: -55,
    top: -150,
  },
});

module.exports = styles;
