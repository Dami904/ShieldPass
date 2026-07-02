import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'ShieldPass Docs',
    template: '%s – ShieldPass Docs'
  },
  description: 'Documentation for ShieldPass V2'
}

const banner = (
  <Banner storageKey="shieldpass-banner"><span className="banner-typing">ShieldPass V2 is here!</span></Banner>
)

const navbar = <Navbar logo={<span className="nav-logo">ShieldPass</span>} />

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
          banner={banner}
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
