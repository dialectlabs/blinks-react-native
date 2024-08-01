import Svg, { Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={10} height={7} viewBox="0 0 10 7" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6.398A.85.85 0 019.599 1.6L4.815 6.373a.85.85 0 01-1.193.008L.934 3.77a.85.85 0 011.184-1.22l2.088 2.027L8.398.396A.85.85 0 019.6.398z"
        fill="#fff"
      />
    </Svg>
  );
};

export default SvgComponent;
