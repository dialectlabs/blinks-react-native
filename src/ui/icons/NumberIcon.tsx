import Svg, { Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M11.721 1a.75.75 0 00-.745.664l-.299 2.586h-4.5l.28-2.42a.745.745 0 00-1.48-.17l-.3 2.59H1.75a.75.75 0 000 1.5H4.5l-.515 4.5H1.75a.75.75 0 000 1.5h2.063l-.28 2.42a.745.745 0 101.48.17l.3-2.59h4.5l-.28 2.42a.745.745 0 001.48.17l.3-2.59h2.937a.75.75 0 000-1.5H11.5l.52-4.5h2.23a.75.75 0 000-1.5h-2.063l.279-2.414A.75.75 0 0011.721 1zm-1.736 9.25H5.5l.52-4.5h4.48l-.515 4.5z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SvgComponent;
