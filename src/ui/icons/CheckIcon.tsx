import Svg, { type SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M15.349 3.509a.984.984 0 010 1.437l-8.173 8.172a.984.984 0 01-1.437 0L1.653 9.032a.984.984 0 010-1.437.984.984 0 011.437 0l3.384 3.353 7.438-7.439a.985.985 0 011.437 0z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SvgComponent;
