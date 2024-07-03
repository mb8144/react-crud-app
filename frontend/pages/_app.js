import Header from "@/components/Header"
import Link from "next/link"
import "./_app.css"

export default function App({ Component, pageProps }) {
    return (
        <>
            <Header>
                <Link href="/">
                    blog
                </Link>
            </Header>

            <main className="page">
                <Component {...pageProps} />
            </main>
        </>
    )
}