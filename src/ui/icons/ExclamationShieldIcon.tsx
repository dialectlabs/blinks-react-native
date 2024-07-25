import Svg, { ClipPath, Defs, G, Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
      <G clipPath="url(#clip0_2130_9987)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.237.68l3.427 1.458c.401.182.711.565.711 1.039-.018 1.823-.766 5.122-3.9 6.635-.31.146-.657.146-.967 0C1.373 8.299.626 5 .626 3.177c-.018-.474.291-.857.692-1.04L4.745.68a.582.582 0 01.492 0zm-.82 6.43c0 .328.255.584.583.584.31 0 .583-.256.583-.584A.6.6 0 005 6.527a.587.587 0 00-.583.583zM5 2.568a.563.563 0 00-.563.563v2.253a.563.563 0 001.125 0V3.131A.563.563 0 005 2.568z"
          fill="currentColor"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2130_9987">
          <Path fill="#fff" d="M0 0H10V10H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgComponent;
