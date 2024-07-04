import Header from "@/components/Header";
import "./_app.css";
import { useAuthRedirect } from "@/lib/hooks/authredirect";
import { useSession } from "@/lib/hooks/session";

export default function App({ Component, pageProps }) {
  const { isLoaded, isSignedIn } = useSession();
  useAuthRedirect(pageProps);

  return (
    // isLoaded && (
      <>
        <Header></Header>

        <main className="page">
        <Component {...pageProps} />
          {/* {(!pageProps.secured || isSignedIn) && <Component {...pageProps} />} */}
        </main>
      </>
    )
  ;
}
