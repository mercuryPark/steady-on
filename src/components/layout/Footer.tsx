import React from "react"

const Footer = () => {
  return (
    <footer>
      <div className="text-sm text-gray-500 text-center">
        © {new Date().getFullYear()}, Built with
        <a href="https://www.gatsbyjs.com"> hoyeon and gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
