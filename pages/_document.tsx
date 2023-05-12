import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#10a37f" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="dpMF3-oHfMYFVkjgJpIJSGM_W_aL_gSFFnmWHM90NHU"
        />
        <meta
          name="naver-site-verification"
          content="9b9e67ae109e00ecd7953b8863fa25289fcd0ccd"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#10a37f" />
        {/* <script
          type="text/javascript"
          async
          defer
          src="https://cdn.feedbank.app/plugin.js"
          plugin-key="252ca53b-fee5-424f-988a-73aab4204f8a"
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
