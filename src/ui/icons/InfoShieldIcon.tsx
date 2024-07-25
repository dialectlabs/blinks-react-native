import Svg, { ClipPath, Defs, G, Path, type SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
      <G clipPath="url(#clip0_16_1715)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.664 2.138L5.237.68a.582.582 0 00-.492 0L1.318 2.138c-.4.182-.71.565-.692 1.039 0 1.823.747 5.122 3.882 6.635.31.146.656.146.966 0C8.61 8.299 9.357 5 9.375 3.177c0-.474-.31-.857-.71-1.04zM4.708 6.73h-.364c-.255 0-.437.2-.437.438 0 .255.182.437.437.437H5.73a.432.432 0 00.438-.437c0-.237-.2-.438-.438-.438h-.146V5.127c0-.237-.2-.437-.437-.437h-.641c-.255 0-.438.2-.438.437 0 .255.183.438.438.438h.203V6.73zm-.291-3.208c0 .328.255.583.583.583.31 0 .583-.255.583-.583A.6.6 0 005 2.94a.587.587 0 00-.583.583z"
          fill="currentColor"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16_1715">
          <Path fill="#fff" d="M0 0H10V10H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgComponent;
