import _ from "lodash"

export const getPageInfo = () => {
  const pathname: string | string[] = _.split(window.location.pathname, "/")

  if (pathname.length > 1 && pathname[1] !== "posts") {
    return "showtagable"
  }

  if (pathname.length === 2) {
    return "home"
  }
}
