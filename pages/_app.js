import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/globals.css";
import "../styles/nprogress.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="modal"></div>
    </Provider>
  );
}

export default MyApp;
