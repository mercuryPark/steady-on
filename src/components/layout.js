import * as React from "react"

// * components
import Header from "./layout/Header"
import Main from "./layout/Main"
import Footer from "./layout/Footer"
import { ChakraProvider } from "@chakra-ui/react"

const Layout = ({ location, title, children, posts }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath

  return (
    <ChakraProvider>
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
        <Main posts={posts}>{children}</Main>
        <Footer />
      </div>
    </ChakraProvider>
  )
}

export default Layout
