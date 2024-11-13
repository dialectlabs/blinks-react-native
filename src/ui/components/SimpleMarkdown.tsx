import type { PropsWithChildren } from 'react';
import { Linking, type StyleProp, type TextStyle } from 'react-native';
import Markdown, {
  MarkdownIt,
  type RenderRules,
} from 'react-native-markdown-display';
import { type ColorVars, useTheme } from '../theme';
import { confirmLinkTransition } from '../utils';
import { Text } from './Text';

interface Props {
  text: string;
  baseTextVariant?: 'caption' | 'text';
  baseColor?: keyof ColorVars;
}

const LinkWithConfirm = ({
  href,
  children,
  style,
}: PropsWithChildren<{ href: string; style?: StyleProp<TextStyle> }>) => {
  return (
    <Text
      style={style}
      onPress={async () => {
        const isOpenable = await Linking.canOpenURL(href);

        if (!isOpenable) {
          return;
        }

        confirmLinkTransition(href, {
          onOk: () => {
            Linking.openURL(href);
          },
          onCancel: () => {},
        });
      }}
    >
      {children}
    </Text>
  );
};

const rules: RenderRules = {
  image: () => null,
  link: (node, children, _, styles) => {
    const href = node.attributes.href;

    return (
      <LinkWithConfirm key={node.key} href={href} style={styles.link}>
        {children}
      </LinkWithConfirm>
    );
  },
};

export const SimpleMarkdown = ({
  text,
  baseTextVariant = 'text',
  baseColor = 'textPrimary',
}: Props) => {
  const theme = useTheme();
  const baseTextStyles = {
    ...theme.textVariants[baseTextVariant],
    color: theme.colors[baseColor],
  };

  const commonHeadingParagraphStyle = {
    ...baseTextStyles,
    marginTop: 0,
    marginBottom: theme.spacing['1'],
  };

  const commonCodeBlockStyle = {
    ...baseTextStyles,
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginLeft: 0,
    paddingLeft: 0,
    borderRadius: 0,
  };

  return (
    <Markdown
      rules={rules}
      markdownit={MarkdownIt({
        typographer: true,
        linkify: true,
      })}
      style={{
        text: baseTextStyles,
        heading1: commonHeadingParagraphStyle,
        heading2: commonHeadingParagraphStyle,
        heading3: commonHeadingParagraphStyle,
        heading4: commonHeadingParagraphStyle,
        heading5: commonHeadingParagraphStyle,
        heading6: commonHeadingParagraphStyle,
        paragraph: commonHeadingParagraphStyle,
        code_block: commonCodeBlockStyle,
        code_inline: commonCodeBlockStyle,
        fence: commonCodeBlockStyle,
        blockquote: {
          backgroundColor: 'transparent',
          borderLeftWidth: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginLeft: 0,
        },
        table: {
          borderWidth: 0,
          borderRadius: 0,
        },
        td: {
          padding: 0,
          paddingHorizontal: theme.spacing['0.5'],
          paddingVertical: theme.spacing['1'],
        },
        th: {
          padding: 0,
          paddingHorizontal: theme.spacing['0.5'],
          paddingVertical: theme.spacing['1'],
        },
        tr: {
          borderBottomWidth: 0,
        },
        ordered_list_icon: baseTextStyles,
        hr: {
          marginVertical: theme.spacing['1'],
        },
      }}
    >
      {text}
    </Markdown>
  );
};
