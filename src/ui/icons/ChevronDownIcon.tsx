import Svg, { Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M7.517 11.747l-5.25-5.25a.843.843 0 010-1.23.843.843 0 011.23 0l4.649 4.62 4.62-4.62a.843.843 0 011.231 0 .843.843 0 010 1.23l-5.25 5.25a.843.843 0 01-1.23 0z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SvgComponent;
