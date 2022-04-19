import ThemeProvider from './ThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
