import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { BlinkInTheWalletIntegrationExample } from './Example';

const actionUrl = 'https://dial.to/donate';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          <View style={styles.box}>
            <BlinkInTheWalletIntegrationExample url={actionUrl} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:
    Platform.OS === 'android'
      ? {
          paddingTop: StatusBar.currentHeight,
          paddingBottom: 12,
        }
      : {},
  scrollView: {
    height: '100%',
    paddingHorizontal: 12,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 400,
  },
});
