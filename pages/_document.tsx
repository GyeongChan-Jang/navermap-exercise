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
        {/* <Script
          strategy="beforeInteractive"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
          onLoad={() => console.log('jquery loaded')}
        ></Script> */}
        {/* <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={'/src/MarkerOverlappingRecognizer.js'}
          onLoad={() => console.log('MarkerOverlappingRecognizer.js loaded')}
        ></Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
