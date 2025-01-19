import * as React from "react"
import { useState } from "react"

// * components
import Header from "./layout/Header"
import Main from "./layout/Main"
import Footer from "./layout/Footer"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  // other theme customizations
  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === "dark" ? "#1d1e25" : "white", // 배경색
        color: props.colorMode === "dark" ? "#eeeeee" : "#202125", // 텍스트 색상
      },
    }),
  },
})

const Layout = ({ location, title, children, posts, tags }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath

  return (
    <ChakraProvider theme={theme}>
      <div
        className={[
          window.location.pathname !== "/"
            ? "max-w-[72rem] max-xl:max-w-[56rem]"
            : "max-w-[56rem]",
          "mx-auto max-lg:mx-12 ",
        ]
          .filter(Boolean)
          .join(" ")}
        // data-is-root-path={isRootPath}
      >
        <Header />
        <Main posts={posts} tags={tags}>
          {children}
        </Main>
        <Footer />
      </div>
    </ChakraProvider>
  )
}

export default Layout
