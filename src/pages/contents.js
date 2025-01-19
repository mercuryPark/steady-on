import * as React from "react"
import { useState, useEffect } from "react"

const Contents = () => {
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    const imageElement = document.getElementById("image")

    const handleImageLoad = () => {
      const width = imageElement.offsetWidth
      const height = imageElement.offsetHeight

      const scale = Math.min(400 / width, 400 / height)

      setImageWidth(`w-[${width * scale}px]`)
      setImageHeight(`h-[${height * scale}px]`)
    }

    if (imageElement.complete) {
      handleImageLoad()
    } else {
      imageElement.onload = handleImageLoad
    }

    // Cleanup
    return () => {
      imageElement.onload = null
    }
  }, [])
  return (
    <div className="w-full h-full my-10">
      <div className="w-[400px] h-[400px]  ring-2 ring-black m-auto overflow-scroll">
        <img
          id="image"
          src="/images/mini.png"
          className={[
            "block max-w-none p-4 blur-sm",
            imageWidth !== 0 && imageHeight !== 0 && imageWidth,
            imageHeight,
          ]
            .filter(Boolean)
            .join(" ")}
          alt="Letter H"
        />
      </div>
      <div className="mt-4 text-[6px] size-full flex flex-col items-center">
        <p>원본 너비 : 600px</p>
        <p>원본 높이 : 640px</p>
        <p>계산 된 너비 : {imageWidth}</p>
        <p>계산 된 높이 : {imageHeight}</p>
      </div>
    </div>
  )
}

export default Contents
