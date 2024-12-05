// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "./src/styles/global.css"

// gatsby-browser.jsx
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"

export const wrapRootElement = ({ element }) => (
  // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
  <ChakraProvider>{element}</ChakraProvider>
)
