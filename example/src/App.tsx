import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { BlinkInTheWalletIntegrationExample } from './Example';

const actionUrl = 'https://dial.to/donate';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <View style={styles.box}>
          <BlinkInTheWalletIntegrationExample url={actionUrl} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
