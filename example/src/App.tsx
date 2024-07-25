import { StyleSheet, View } from 'react-native';
import { Blink } from '@dialectlabs/blinks-react-native';
import { useEffect, useState } from 'react';
import { Action } from '@dialectlabs/blinks';
// import { useActionsRegistryInterval } from '@dialectlabs/blinks/dist/react';

const actionUrls = {
  actionUrl: 'https://dial.to/api/donate',
  websiteUrl: 'https://dial.to/donate',
  websiteText: 'dial.to',
};

export default function App() {
  const { isRegistryLoaded } = useActionsRegistryInterval();
  const [action, setAction] = useState<Action | null>(null);

  useEffect(() => {
    setAction(null);
    if (!isRegistryLoaded) {
      return;
    }
    Action.fetch(actionUrls.actionUrl)
      .then(setAction)
      .catch((e) => {
        console.error('Failed to fetch action', e);
        setAction(null);
      });
  }, [isRegistryLoaded]);
  if (!action) return;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Blink
          action={action}
          websiteUrl={actionUrls.websiteUrl}
          websiteText={actionUrls.websiteText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 400,
  },
});
