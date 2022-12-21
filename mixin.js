'use strict'

function boxShadow(height = 5, elevation = 5, shadowOpacity = 0.25) {
  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: height,
    },
    shadowOpacity: shadowOpacity,
    shadowRadius: 3.05,
    elevation: elevation,
  };
}

function textStyle(fontWeight, fontSize, lineHeight) {
  return {
    fontStyle: 'normal',
    fontWeight: fontWeight,
    fontSize: fontSize,
    lineHeight: lineHeight,
  };
}

module.exports = {
  textStyle,
  boxShadow,
};
