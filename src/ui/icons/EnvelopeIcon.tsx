import Svg, { Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path fill="#fff" d="M0 0H16V16H0z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.361 2.685a.764.764 0 00-.157.227A2.986 2.986 0 00.75 4.5v7a3 3 0 003 3h8.5a3 3 0 003-3v-7c0-.583-.166-1.128-.454-1.588a.75.75 0 00-.157-.227A2.995 2.995 0 0012.25 1.5h-8.5c-.975 0-1.841.465-2.389 1.185zM3.75 3h8.5c.27 0 .522.071.74.195L8.815 6.817a1.25 1.25 0 01-1.638-.001l-4.167-3.62C3.227 3.07 3.48 3 3.75 3zm10 1.522V11.5a1.5 1.5 0 01-1.5 1.5h-8.5a1.5 1.5 0 01-1.5-1.5V4.524l3.942 3.424a2.75 2.75 0 003.605.002l3.953-3.428z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SvgComponent;
