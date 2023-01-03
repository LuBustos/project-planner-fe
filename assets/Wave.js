import {Dimensions, Platform, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export default function Wave(props) {
  const isPad = Platform.isPad;

  const originalWidth = 461;
  const originalHeight = isPad ? 311 : 451;

  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View>
      <View
        style={{width: windowWidth + 75, aspectRatio}}>
        <Svg
          width="100%"
          height="100%"
          viewBox={`${isPad ? 0 : -10} ${
            isPad ? 150 : 0
          } ${originalWidth} ${originalHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <Path
            d="M460.5 364.41V38H72.5L0 394.61C0 394.61 55 324.5 126 348C197 371.5 254 443 342.5 450.5C431 458 460.5 364.41 460.5 364.41Z"
            fill="#67A9EF"
          />
          <Path
            d="M460.5 326.41V0H72.5L0 356.61C0 356.61 55 286.5 126 310C197 333.5 254 405 342.5 412.5C431 420 460.5 326.41 460.5 326.41Z"
            fill="#81B8F3"
          />
        </Svg>
      </View>
      {props.children}
    </View>
  );
}
