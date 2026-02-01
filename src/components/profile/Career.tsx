import React from "react"

const CareerItem = ({
  company,
  period,
  description,
  tasks,
  logo,
  accentColor,
}: {
  company: string
  period: string
  description: string
  tasks: string[]
  logo?: string
  accentColor?: string
}) => {
  return (
    <div className="group py-12 first:pt-0 border-b border-slate-100 last:border-0">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <div className="flex items-center gap-5">
            {logo && (
              <img
                src={logo}
                alt={`${company} logo`}
                className="shrink-0 size-20 object-contain rounded-2xl group-hover:opacity-80 transition-opacity"
              />
            )}
            <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">
              {company}
            </h4>
          </div>
          <span className="text-[12px] font-bold text-slate-400 tracking-wider sm:ml-auto">
            {period}
          </span>
        </div>

        {/* Description */}
        <div className="relative pl-5 py-4 bg-slate-50/60 rounded-lg border border-slate-100/50">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
            style={{
              background: accentColor
                ? `linear-gradient(to bottom, ${accentColor}, ${accentColor}CC)`
                : 'linear-gradient(to bottom, #6366f1, #a5b4fc)'
            }}
          />
          <p className="text-[15px] text-slate-700 font-semibold leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tasks */}
        <ul className="space-y-5">
          {tasks.map((task, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 text-slate-600 leading-relaxed text-[15px] font-medium"
            >
              <div className="mt-2.5 size-1 rounded-full bg-slate-300 shrink-0" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Career = () => {
  const careerData = [
    {
      company: "지란지교소프트",
      period: "2022.11 - PRESENT",
      logo: "/images/logos/jiranjigyosoft.png",
      accentColor: "#fe7e04",
      description: "B2B SaaS 협업툴을 개발하는 회사로, 메신저를 중심으로 어드민 및 운영 플랫폼 개발을 담당하고 있습니다.",
      tasks: [
        "메신저 서비스 E2E 개발 및 운영 (초기 환경 구성부터 기능 개발, 트러블슈팅, 고객 이슈 대응까지 전반적인 운영)",
        "Next.js 기반 어드민 및 개발운영 플랫폼 구축 (Nuxt.js 레거시 환경에서 마이그레이션)",
        "Electron을 활용한 데스크톱 웹 앱 클라이언트 개발 및 멀티 윈도우 환경 데이터 동기화 구현",
        "캘린더, 계약 정보 등 협업툴 내 서드파티 서비스 개발 및 통합",
      ],
    },
    {
      company: "아웃도어스쿨",
      period: "2021.11 - 2022.05",
      logo: "/images/logos/outdoor-school.png",
      accentColor: "#09d0b9",
      description: "아웃도어 상품 이커머스 회사로, 자사 쇼핑몰의 초기 구성부터 개발 및 운영을 담당했습니다.",
      tasks: [
        "자사 쇼핑몰 웹사이트 초기 환경 구성부터 개발 및 운영",
        "Google Search Console과 Google Ads를 활용한 SEO/SEA 최적화 작업 수행",
        "검색 최적화를 통한 상품 노출도 향상 및 사이트 유입률 개선",
      ],
    },
  ]

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-10">
        <h3 className="text-xl font-bold tracking-tight italic uppercase text-slate-600">
          💼 Career
        </h3>
      </div>

      <div className="flex flex-col">
        {careerData.map((career, idx) => (
          <CareerItem key={idx} {...career} />
        ))}
      </div>
    </div>
  )
}

export default Career
