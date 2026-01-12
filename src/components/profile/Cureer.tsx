import React from "react"

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-slate-50 text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-slate-100 uppercase tracking-tight font-bold">
    {children}
  </span>
)

const ProjectHeader = ({
  title,
  period,
  techs = [],
}: {
  title: string
  period: string
  techs?: string[]
}) => (
  <div className="flex flex-col gap-3 mb-10 text-start">
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
      <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">
        {title}
      </h3>
      <span className="text-[12px] font-bold text-slate-400 tracking-wider">
        {period}
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {techs.map(tech => (
        <TechBadge key={tech}>{tech}</TechBadge>
      ))}
    </div>
  </div>
)

const TaskItem = ({ period, content }: { period: string; content: string }) => (
  <div className="group flex flex-col sm:flex-row gap-2 sm:gap-4 py-1 transition-all">
    <span className="text-[11px] font-black text-slate-300 tracking-widest shrink-0 sm:w-36 uppercase group-hover:text-indigo-400 transition-colors">
      {period}
    </span>
    <div className="flex flex-col gap-1">
      <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
        {content}
      </p>
    </div>
  </div>
)

const ProjectSection = ({
  title,
  emoji,
  items,
}: {
  title: string
  emoji: string
  items: { period: string; content: string }[]
}) => (
  <div className="mb-14 last:mb-0 text-start">
    <div className="flex items-center gap-3 mb-8">
      <span className="p-2 bg-slate-50 rounded-lg text-xl shadow-sm">
        {emoji}
      </span>
      <h4 className="text-lg font-black text-slate-800 tracking-tight">
        {title}
      </h4>
    </div>

    <div className="flex flex-col gap-6 pl-6 border-l-[3px] border-slate-100">
      {items.map((item, idx) => (
        <TaskItem key={idx} period={item.period} content={item.content} />
      ))}
    </div>
  </div>
)

const SideProjectSection = ({
  title,
  emoji,
  items,
}: {
  title: string
  emoji: string
  items: React.ReactNode[]
}) => (
  <div className="mb-14 last:mb-0 text-start">
    <div className="flex items-center gap-3 mb-8">
      <span className="p-2 bg-slate-50 rounded-lg text-xl shadow-sm">
        {emoji}
      </span>
      <h4 className="text-lg font-black text-slate-800 tracking-tight">
        {title}
      </h4>
    </div>

    <div className="flex flex-col gap-8 pl-6 border-l-[3px] border-slate-100">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="text-[15px] text-slate-600 leading-relaxed font-medium"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
)

const Cureer = ({ type }: { type: "main" | "side" }) => {
  return (
    <div className="flex flex-col gap-10 text-start">
      <div className="space-y-32">
        {type === "main" ? (
          <>
            {/* Project 1: OfficeNEXT Messenger */}
            <section className="py-4">
              <ProjectHeader
                title="OfficeNEXT Messenger"
                period="2023.03 - PRESENT"
                techs={[
                  "Next.js",
                  "TypeScript",
                  "WebSocket",
                  "Electron",
                  "Tailwind CSS v4",
                  "IndexedDB",
                  "WebWorker",
                ]}
              />

              <ProjectSection
                title="Messenger Development"
                emoji="💬"
                items={[
                  {
                    period: "2026.01",
                    content:
                      "웹 앱 전용 인증 서버 및 기능 검증을 위한 데모 모드 구축",
                  },
                  {
                    period: "2025.10 - 2025.12",
                    content:
                      "채팅방 및 채널 내 게시판(투표, 공지 사항) 시스템 고도화 및 링크 페이지 리뉴얼",
                  },
                  {
                    period: "2025.07 - 2025.09",
                    content:
                      "채팅방/채널 조용히 나가기 기능 및 메신저 내 전역 콘텐츠 전달 시스템 구현",
                  },
                  {
                    period: "2025.03 - 2025.07",
                    content:
                      "Tailwind CSS v4 마이그레이션 수행 및 메신저 플랫폼 정책 적용 프로세스 설계",
                  },
                  {
                    period: "2025.01 - 2025.04",
                    content:
                      "사용자 정의 글꼴, 글자 크기, 색상 테마 등 서비스 전역 스타일 시스템 구축",
                  },
                  {
                    period: "2025.01 - 2025.03",
                    content:
                      "채팅방 상단 고정(Pin) 기능 및 1인용 '나와의 채팅방' 기능 개발",
                  },
                  {
                    period: "2024.06 - 2025.01",
                    content:
                      "Electron 프레임워크 기반의 데스크톱 웹 앱 클라이언트 개발",
                  },
                  {
                    period: "2023.06 - 2024.08",
                    content:
                      "메시지 시스템, 보관함, 설정(알림, 다국어 대응) 등 메신저 핵심 페이지 UI/UX 및 로직 구현",
                  },
                  {
                    period: "2023.03 - 2024.03",
                    content:
                      "기존 메신저 인증 시스템 및 개발 환경의 Next.js 프레임워크 전환 마이그레이션 주도",
                  },
                ]}
              />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full" />

            {/* Project 2: OfficeNEXT Admin */}
            <section className="py-4">
              <ProjectHeader
                title="OfficeNEXT Admin"
                period="2024.12 - 2025.12"
                techs={["React", "Next.js", "Nuxt.js", "Tailwind CSS"]}
              />
              <ProjectSection
                title="Admin Development"
                emoji="⚙️"
                items={[
                  {
                    period: "2025.11 - 2025.12",
                    content:
                      "넥스트 링크 바로가기 관리, 카테고리 설정 및 제공 서비스 통합 관리 페이지 개발",
                  },
                  {
                    period: "2025.05 - 2025.07",
                    content:
                      "IP 접속 제한 정책 관리 페이지 및 서비스 전역 시스템 테마 설정 페이지 구현",
                  },
                  {
                    period: "2024.12 - 2025.03",
                    content:
                      "어드민 개발 환경의 Next.js 전환(Nuxt.js 기반 레거시 탈피) 및 주요 정책/로그/현황 페이지 마이그레이션",
                  },
                ]}
              />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full" />

            {/* Project 3: Internal Ops Platform */}
            <section className="py-4">
              <ProjectHeader
                title="Internal Ops Platform"
                period="2022.12 - 2023.05"
                techs={["React", "WebSocket", "Monitoring API"]}
              />
              <ProjectSection
                title="Operation Tool Development"
                emoji="🛡️"
                items={[
                  {
                    period: "2023.04 - 2023.05",
                    content:
                      "전사 서비스 알림 및 긴급 공지 메시지 일괄 전송 모듈 구현",
                  },
                  {
                    period: "2023.03 - 2023.04",
                    content:
                      "인프라 모니터링을 위한 서버별 사용자 웹소켓 연결 현황 조회 시스템 개발",
                  },
                  {
                    period: "2023.02 - 2023.03",
                    content:
                      "데이터 정합성 확인을 위한 DB 테이블별 레코드 수 실시간 조회 페이지 구축",
                  },
                  {
                    period: "2022.12 - 2023.02",
                    content:
                      "클라이언트 배포 버전 관리 및 히스토리 트래킹 페이지 개발",
                  },
                ]}
              />
            </section>
          </>
        ) : (
          /* Side Project Section */
          <div className="space-y-32">
            {/* Jamkan-Sallae */}
            <section>
              <ProjectHeader
                title="잠깐살래"
                period="2025.11 - PRESENT"
                techs={["React Native", "Expo", "Auth Flow", "CI/CD"]}
              />
              <SideProjectSection
                title="Mobile Application Development"
                emoji="📱"
                items={[
                  <p>React Native 기반 모바일 앱 개발 환경 및 인프라 구축</p>,
                  <p>사용자 인증 로직 및 회원가입/관리 워크플로우 구현</p>,
                  <p>
                    메인 서비스 페이지 개발 및 CI/CD 기반 배포 자동화 파이프라인
                    구축
                  </p>,
                ]}
              />
            </section>

            {/* Piko */}
            <section>
              <ProjectHeader
                title="Piko"
                period="2025.10 - 2025.11"
                techs={["TypeScript", "Proxy API", "Dependency Tracking"]}
              />
              <SideProjectSection
                title="State Management Library"
                emoji="📦"
                items={[
                  <p>
                    불필요한 리렌더링 최적화를 위한 경량 상태 관리 라이브러리
                    개발
                  </p>,
                  <p>
                    Jotai의 Atom 모델 분석을 바탕으로 의존성 기반 상태 업데이트
                    및 구독 최소화 로직 구현
                  </p>,
                ]}
              />
            </section>

            {/* MailTree */}
            <section>
              <ProjectHeader
                title="메일트리"
                period="2025.08 - 2025.10"
                techs={["React", "WebView", "Troubleshooting"]}
              />
              <SideProjectSection
                title="Service Maintenance"
                emoji="✉️"
                items={[
                  <p>
                    메일 전송 기반 상용 서비스의 품질 개선 및 트러블슈팅 대응
                  </p>,
                  <p>
                    모바일 앱 내 텍스트 렌더링 시 발생하는 줄간격 연산 오류 분석
                    및 해결
                  </p>,
                  <p>
                    모바일 환경 특화 요구사항(화면 확대 제어, 웹뷰 최적화 등)
                    반영 및 성능 모니터링
                  </p>,
                ]}
              />
            </section>

            {/* Blog */}
            <section>
              <ProjectHeader
                title="박호연의 개발블로그"
                period="2024.12 - PRESENT"
                techs={["Gatsby.js", "SSG", "Tailwind CSS"]}
              />
              <SideProjectSection
                title="Content Platform"
                emoji="✍️"
                items={[
                  <p>
                    Gatsby.js 프레임워크 기반의 SSG(정적 사이트 생성) 기술
                    블로그 구축
                  </p>,
                  <p>
                    기술적 회고, 지식 공유 및 포트폴리오 관리를 위한 콘텐츠
                    퍼블리싱
                  </p>,
                ]}
              />
            </section>

            {/* Tobagi */}
            <section>
              <ProjectHeader
                title="토박이 프로젝트"
                period="2024.08 - 2024.11"
                techs={["React", "Kakao Map API", "Public Map API"]}
              />
              <SideProjectSection
                title="Location Based Services"
                emoji="🗺️"
                items={[
                  <p>
                    사용자 간 지역 정보 공유 커뮤니티 및 지리적 중간 지점 산출
                    기반 인프라 추천 서비스 개발
                  </p>,
                  <p>
                    경기청년 갭이어 프로그램을 통한 서비스 기획 및 실제 창업
                    프로젝트 운영
                  </p>,
                  <p>
                    카카오맵 및 국가 공공지도 API 연동을 통한 실시간 지도 데이터
                    통합 인터페이스 구현
                  </p>,
                  <p>
                    다중 사용자 위치 기반의 중심점 산출 알고리즘 및 주변 인프라
                    자동 추천 기능 개발
                  </p>,
                ]}
              />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cureer
