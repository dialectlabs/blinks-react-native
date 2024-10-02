import Svg, { Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8" fill="none" {...props}>
      <Path
        d="M1.5 0h1.793v1H1.5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V4.707h1V6.5A1.5 1.5 0 016.5 8h-5A1.5 1.5 0 010 6.5v-5A1.5 1.5 0 011.5 0z"
        fill="currentColor"
      />
      <Path
        d="M8 3H7V1.708l-3 3L3.293 4l3-3H5V0h2.5a.5.5 0 01.5.5V3z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SvgComponent;
