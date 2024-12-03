import * as React from "react"
// import { Link } from "gatsby"

// * components
import Header from "./layout/Header"
import Main from "./layout/Main"
import Footer from "./layout/Footer"

const Layout = ({ location, title, children }) => {
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
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

export default Layout
