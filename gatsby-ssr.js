// gatsby-ssr.jsx

import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"

export const wrapRootElement = ({ element }) => (
  // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
  <ChakraProvider>{element}</ChakraProvider>
)
