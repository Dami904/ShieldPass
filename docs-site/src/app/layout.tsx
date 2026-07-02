import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'ShieldPass Docs',
    template: '%s – ShieldPass Docs'
  },
  description: 'Documentation for ShieldPass — private crypto-to-fiat off-ramp and payments on Stellar.',
  icons: { icon: '/logo.jpeg' }
}

const logo = (
  <Image
    src="/logo.jpeg"
    alt="ShieldPass"
    width={120}
    height={28}
    className="brand-logo"
    style={{ objectFit: 'contain', borderRadius: 4 }}
  />
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/Xyrelix/ShieldPass"
  />
)

const footer = <Footer>MIT {new Date().getFullYear()} © ShieldPass.</Footer>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/style.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-mono/style.css" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Xyrelix/ShieldPass/tree/main/docs-site/content"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
