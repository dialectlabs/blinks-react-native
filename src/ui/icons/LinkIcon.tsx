import Svg, { ClipPath, Defs, G, Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <G clipPath="url(#clip0_16_1708)" fill="currentColor">
        <Path d="M6.483 8.552l2.07-2.07a.732.732 0 10-1.036-1.034l-2.07 2.07a.732.732 0 101.036 1.034z" />
        <Path d="M9.415.44a4.12 4.12 0 00-2.932 1.213l-1.381 1.38a.732.732 0 101.035 1.035l1.38-1.38a2.683 2.683 0 013.795 3.795l-1.38 1.38a.732.732 0 001.034 1.035l1.381-1.38A4.145 4.145 0 009.415.44zM4.585 13.56a4.118 4.118 0 002.932-1.212l1.381-1.381a.732.732 0 00-1.035-1.035l-1.38 1.38a2.683 2.683 0 11-3.795-3.794l1.38-1.381a.732.732 0 10-1.034-1.035l-1.381 1.38a4.145 4.145 0 002.932 7.078z" />
      </G>
      <Defs>
        <ClipPath id="clip0_16_1708">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgComponent;
