import * as React from "react"

// * components
import Header from "./layout/Header"
import Main from "./layout/Main"
import Footer from "./layout/Footer"
import { ChakraProvider } from "@chakra-ui/react"

const Layout = ({ location, title, children, posts }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <ChakraProvider>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Header />
        <Main posts={posts}>{children}</Main>
        <Footer />
      </div>
    </ChakraProvider>
  )
}

export default Layout
