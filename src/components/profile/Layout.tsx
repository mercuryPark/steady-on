import React, { useState, useEffect, useRef } from "react"
import ProfileContents from "./Contents"
import ProfileHeader from "./Header"
import Career from "./Career"
import Cureer from "./Cureer"
import Highlight from "./Highlight"
import Performance from "./Performance"

type TabType =
  | "main-project"
  | "side-project"
  | "troubleshooting"
  | "performance"

const TABS: { id: TabType; label: string; color: string }[] = [
  { id: "main-project", label: "직무 경험", color: "sky" },
  { id: "side-project", label: "서비스 경험", color: "indigo" },
  { id: "troubleshooting", label: "트러블슈팅", color: "rose" },
  { id: "performance", label: "성과 및 경험", color: "emerald" },
]

const ProfileLayout = ({ profileData }: any) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("main-project")
  const [visitedTabs, setVisitedTabs] = useState<Set<TabType>>(
    new Set(["main-project"])
  )
  const tabMenuRef = useRef<HTMLDivElement>(null)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const getUnderlineColor = (color: string) => {
    const colors: Record<string, string> = {
      rose: "bg-rose-500",
      emerald: "bg-emerald-500",
      sky: "bg-sky-500",
      indigo: "bg-indigo-500",
    }
    return colors[color]
  }

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId)
    setVisitedTabs(prev => new Set([...prev, tabId]))
  }

  const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab)
  const nextTab =
    currentTabIndex < TABS.length - 1 ? TABS[currentTabIndex + 1] : null
  const visitedCount = visitedTabs.size
  const allVisited = visitedCount === TABS.length

  const goToNextTab = () => {
    if (nextTab) {
      handleTabClick(nextTab.id)
      tabMenuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "main-project":
        return <Cureer type="main" />
      case "side-project":
        return <Cureer type="side" />
      case "troubleshooting":
        return <Highlight />
      case "performance":
        return <Performance />
      default:
        return <Cureer type="main" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-start font-sans">
      {/* Hero Section - Compact & Clean */}
      <header className="mb-12 border-b border-slate-100 pb-10">
      <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold tracking-tight">
            PORTFOLIO
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 text-[13px] font-medium">
            4년차 프론트엔드 개발자
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug tracking-tight">
          사용자 경험을 깊이 고민하며  <br/>
           <span className="text-indigo-600"> 실질적인 해결책</span>을 제시하는
          박호연입니다.
        </h1>
      </header>

      <section className="mb-16">
        <ProfileHeader />
      </section>

      <section className="mb-16">
        <ProfileContents />
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full mb-16" />

      <section className="mb-16">
        <Career />
      </section>

      {/* 탭 섹션 스크롤 앵커 */}
      <div ref={tabMenuRef} className="-mt-4 pt-4" />

      {/* Sticky Tab Menu Container - Clean & Simple */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl">
          <nav className="flex -mb-px items-center">
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab.id
              const isVisited = visitedTabs.has(tab.id)

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-6 py-4 text-sm font-bold transition-colors ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <span className="relative">
                  {tab.label}
                    {/* 미방문 탭 - 우측 상단 레드닷 */}
                    {!isVisited && !isActive && (
                      <span className="absolute -top-1 -right-2 size-1.5 rounded-full bg-rose-500" />
                    )}
                  </span>

                  {/* Active underline */}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] ${getUnderlineColor(
                        tab.color
                      )}`}
                    />
                  )}
                </button>
              )
            })}

            {/* 진행 카운터 - 우측 끝 */}
            <span className="ml-auto px-3 py-1 text-xs font-bold">
              {allVisited ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  완료
                </span>
              ) : (
                <span className="text-slate-400">
                  {visitedCount}/{TABS.length}
                </span>
              )}
            </span>
          </nav>
        </div>
      </div>

      {/* Tab Content Section - No Animation */}
      <main className="py-10 min-h-[600px]">
        <div key={activeTab}>{renderTabContent()}</div>

        {/* 다음 섹션으로 이동 버튼 */}
        {nextTab && (
          <div className="mt-16 pt-8 border-t border-slate-100">
            <button
              onClick={goToNextTab}
              className="group w-full flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-all"
            >
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-500 transition-colors">
                  Next Section
                </span>
                <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
                  {nextTab.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">
                  {currentTabIndex + 2}/{TABS.length}
                </span>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* 마지막 탭일 때 간단한 완료 메시지 */}
        {!nextTab && allVisited && (
          <div className="mt-16 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              포트폴리오를 끝까지 봐주셔서 감사합니다.
            </p>
          </div>
        )}
      </main>

      {/* Scroll to Top Button - Simplified */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-900 transition-colors z-50"
          aria-label="맨 위로 이동"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ProfileLayout
