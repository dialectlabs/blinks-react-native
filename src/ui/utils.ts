import { Alert } from 'react-native';

export const confirmLinkTransition = (
  url: string,
  { onOk, onCancel }: { onOk: () => void; onCancel: () => void },
) => {
  Alert.alert(
    'External Link',
    `This action redirects to the website: ${url}, the link will open in your browser`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'OK',
        isPreferred: true,
        onPress: onOk,
      },
    ],
  );
};
