import Svg, { ClipPath, Defs, G, Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_129_1239)" fill="currentColor">
        <Path d="M8 0C3.588 0 0 3.588 0 8s3.588 8 8 8 8-3.588 8-8-3.588-8-8-8zm0 14.407A6.416 6.416 0 011.593 8 6.416 6.416 0 018 1.593 6.416 6.416 0 0114.407 8 6.416 6.416 0 018 14.407z" />
        <Path d="M8.29 4.364a.796.796 0 10-1.592 0v4.28c0 .253.1.496.28.675l2.33 2.334a.797.797 0 101.127-1.126L8.291 8.382V4.364z" />
      </G>
      <Defs>
        <ClipPath id="clip0_129_1239">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgComponent;
