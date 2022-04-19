import ThemeProvider from './ThemeProvider';

type Props = {
  children: JSX.Element;
};

export default function Providers({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
