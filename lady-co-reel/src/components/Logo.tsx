import { DISPLAY, theme } from '../theme';

export const Logo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <div
      style={{
        fontFamily: DISPLAY,
        color: theme.color.cream,
        fontSize: 132,
        fontWeight: 500,
        letterSpacing: '0.14em',
        lineHeight: 1,
        ...style,
      }}
    >
      LADY CO
    </div>
  );
};
