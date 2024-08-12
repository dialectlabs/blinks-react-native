import { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  type ModalProps,
  type StyleProp,
} from 'react-native';

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {
  onBackdropPress: () => void;
  isVisible: boolean;
  contentStyle?: StyleProp<any>;
};
const returnAnimValue = () => {
  console.log('new');
  return new Animated.Value(0);
};

export const BottomSheetModal = ({
  onBackdropPress,
  isVisible,
  children,
}: Props & ModalProps) => {
  const animVal = returnAnimValue();

  const [vis, setVis] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVis(true);
      show();
    } else {
      hide();
    }
  }, [isVisible]);

  const show = useCallback(() => {
    Animated.timing(animVal, {
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 1,
    }).start();
  }, [animVal]);

  const hide = useCallback(() => {
    animVal.setValue(1);
    Animated.timing(animVal, {
      easing: Easing.inOut(Easing.quad),
      duration: MODAL_ANIM_DURATION,
      useNativeDriver: false,
      toValue: 0,
    }).start(() => {
      setVis(false);
    });
  }, [animVal]);

  const backdropAnimatedStyle = {
    opacity: animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, MODAL_BACKDROP_OPACITY],
    }),
  };
  const contentAnimatedStyle = {
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 1],
          outputRange: [DEVICE_HEIGHT, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Modal transparent animationType="none" visible={vis} onShow={show}>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <Animated.View
          style={[
            styles.backdrop,
            backdropAnimatedStyle,
            { width: DEVICE_WIDTH, height: DEVICE_HEIGHT },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.content, contentAnimatedStyle]}
        pointerEvents="box-none"
      >
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
    marginBottom: 34,
  },
});
