import React, { useEffect, useRef, useState } from "react"
import _ from "lodash"
import Slider from "react-slick"
import PostCard from "../posts/list/Card"
import {
  PauseCircleIcon,
  PlayCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline"

const SliderFrame = ({
  sliderRef,
  setting,
  children,
  active,
}: {
  sliderRef: any
  setting: any
  children: any
  active: boolean
}) => {
  if (active) {
    return (
      <Slider ref={sliderRef} {...setting}>
        {children}
      </Slider>
    )
  }

  return children
}

const SignBoard = ({ posts }: any) => {
  const sliderRef = useRef<any>(null)
  const [isAutoplaying, setIsAutoplaying] = useState(true)
  const [signboardPosts, setSignboardPosts] = useState<any>([])

  const toggleAutoplay = () => {
    if (isAutoplaying) {
      sliderRef.current.slickPause() // 슬라이더 정지
    } else {
      sliderRef.current.slickPlay() // 슬라이더 재생
    }
    setIsAutoplaying(!isAutoplaying)
  }

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div className="bg-blue-500 size-20">
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  }

  useEffect(() => {
    setSignboardPosts(() => {
      return _.filter(posts, post => post?.node.frontmatter?.signboard)
    })
  }, [posts])

  return (
    <div className="signboard md:w-2/3 max-md:w-full h-full text-start relative m-auto">
      <div className="flex justify-between mx-4">
        <h1 id="title" className="text-xl">
          SignBoard
        </h1>
        <ul className="flex  justify-end ">
          <li className="mb-0 ">
            <button
              className="py-1 "
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.slickPrev()
                }
              }}
            >
              <ArrowLeftCircleIcon className="size-6" />
            </button>
          </li>
          <li className="mb-0 ">
            <button
              onClick={() => {
                toggleAutoplay()
              }}
              className="py-1 px-1"
            >
              {isAutoplaying ? (
                <PauseCircleIcon className="size-6" />
              ) : (
                <PlayCircleIcon className="size-6" />
              )}
            </button>
          </li>
          <li className="mb-0 ">
            <button
              className="py-1 "
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.slickNext()
                }
              }}
            >
              <ArrowRightCircleIcon className="size-6" />
            </button>
          </li>
        </ul>
      </div>

      <div className="w-full">
        <SliderFrame
          sliderRef={sliderRef}
          setting={settings}
          active={signboardPosts.length > 1}
        >
          {_.map(signboardPosts, (post: any) => {
            if (!post.node.frontmatter.shorts) {
              return (
                <PostCard
                  post={post}
                  className="px-4 py-2"
                  imageClassName="h-80"
                />
              )
            }
          })}
        </SliderFrame>
      </div>
    </div>
  )
}

export default SignBoard
