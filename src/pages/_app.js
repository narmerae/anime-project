import "@/styles/globals.css";
import RootLayout from "@/pages/components/RootLayout";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>);

  return getLayout(<Component {...pageProps} />);
}
