// gatsby-ssr.jsx

import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"

export const wrapRootElement = ({ element }) => (
  // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
  <ChakraProvider>{element}</ChakraProvider>
)

// 외부 폰트 CDN 에 대한 preconnect/dns-prefetch 를 삽입해 LCP 개선
export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ko" })
  setHeadComponents([
    <link
      key="preconnect-jsdelivr"
      rel="preconnect"
      href="https://fastly.jsdelivr.net"
      crossOrigin="anonymous"
    />,
    <link
      key="dns-prefetch-jsdelivr"
      rel="dns-prefetch"
      href="https://fastly.jsdelivr.net"
    />,
  ])
}
