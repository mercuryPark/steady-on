import React from "react"
import { Link } from "gatsby"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

type PaginationProps = {
  currentPage: number
  numPages: number
}

const pageHref = (page: number) => (page === 1 ? "/" : `/${page}`)

const Pagination = ({ currentPage, numPages }: PaginationProps) => {
  if (numPages <= 1) return null

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevHref = pageHref(currentPage - 1)
  const nextHref = pageHref(currentPage + 1)

  return (
    <nav
      aria-label="페이지네이션"
      className="flex items-center justify-center gap-2 mt-16 mb-8"
    >
      {!isFirst ? (
        <Link
          to={prevHref}
          rel="prev"
          className="flex items-center justify-center size-10 rounded-md ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="이전 페이지"
        >
          <ChevronLeftIcon className="size-5" />
        </Link>
      ) : (
        <span className="flex items-center justify-center size-10 rounded-md ring-1 ring-gray-100 text-gray-300">
          <ChevronLeftIcon className="size-5" />
        </span>
      )}

      <ul className="flex items-center gap-1">
        {Array.from({ length: numPages }, (_, i) => {
          const page = i + 1
          const isActive = page === currentPage
          return (
            <li key={`page-${page}`}>
              <Link
                to={pageHref(page)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center justify-center size-10 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200",
                ].join(" ")}
              >
                {page}
              </Link>
            </li>
          )
        })}
      </ul>

      {!isLast ? (
        <Link
          to={nextHref}
          rel="next"
          className="flex items-center justify-center size-10 rounded-md ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="다음 페이지"
        >
          <ChevronRightIcon className="size-5" />
        </Link>
      ) : (
        <span className="flex items-center justify-center size-10 rounded-md ring-1 ring-gray-100 text-gray-300">
          <ChevronRightIcon className="size-5" />
        </span>
      )}
    </nav>
  )
}

export default Pagination
