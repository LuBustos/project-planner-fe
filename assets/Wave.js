import {Path, Svg, TSpan} from 'react-native-svg';

export default function Wave(props) {
  return (
    <Svg
      width="480"
      height="451"
      viewBox="0 0 461 451"
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
  );
}