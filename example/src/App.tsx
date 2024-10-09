import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { BlinkExample } from './Example';

const actionUrl = 'https://dial.to/donate';

export default function App() {
  return (
    <SafeAreaView style={[styles.full, styles.safeArea]}>
      <KeyboardAvoidingView
        style={styles.full}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.box}>
            <BlinkExample url={actionUrl} />
            {/*<MiniblinkExample url={actionUrl} />*/}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
  safeArea:
    Platform.OS === 'android'
      ? {
          paddingTop: StatusBar.currentHeight,
        }
      : {},
  container: {
    padding: 12,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 400,
  },
});
