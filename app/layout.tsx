import "./globals.css"
import { DM_Sans } from "next/font/google"
import ReduxProvider from "./redux/ReduxProvider"

const dm_sans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
})

export const metadata = {
  title: "Tymr.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${dm_sans.className}  h-screen w-screen bg-black px-28 py-4 text-white`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
