// * basic
import React, { useEffect, useState } from "react"

// * install libraries
import _ from "lodash"

const Container = ({ path, children }: any) => {
  const [width, setWidth] = useState("max-w-[56rem]")

  useEffect(() => {
    // 특정 페이지 너비 지정
    if (_.includes(path, "posts")) {
      setWidth("max-w-[72rem]")
    }

    if (_.includes(path, "profile")) {
      setWidth("max-w-[70rem]")
    }
  }, [path])

  return (
    <div className={`mx-auto max-lg:mx-6  max-xl:max-w-[56rem] ${width}`}>
      {children}
    </div>
  )
}

export default Container
