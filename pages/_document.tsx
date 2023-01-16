import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  console.log(process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID)
  return (
    <Html lang="ko">
      <Head>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        ></Script>
        <Script type="text/javascript" src="../marker-tools/MarkerOverlappingRecognizer.js"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
