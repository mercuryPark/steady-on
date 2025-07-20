// src/components/profile/Career.tsx
import React from "react"

// 재사용 가능한 컴포넌트들
const CodeBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gray-100 text-xs py-0.5 px-1.5 rounded font-semibold text-slate-700">
    {children}
  </span>
)

const SectionTitle = ({
  emoji,
  title,
  period,
  color = "slate",
  type = "subtitle",
}: {
  emoji: string
  title: string
  period: string
  color?: "slate" | "indigo" | "blue" | "emerald"
  type?: "title" | "subtitle"
}) => {
  const getGradient = (colorType: "slate" | "indigo" | "blue" | "emerald") => {
    const gradients = {
      indigo: "from-indigo-500 to-blue-500",
      blue: "from-blue-500 to-cyan-500",
      emerald: "from-emerald-500 to-green-500",
      slate: "from-slate-500 to-gray-500",
    } as const
    return gradients[colorType]
  }

  return (
    <div
      className={[
        "relative",
        type === "title" && "pb-2 mb-2",
        type === "subtitle" && "inline-block",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={type === "title" ? "relative" : ""}>
        <h2
          className={[
            "text-xl tracking-tight",
            type === "title" ? "text-2xl font-bold" : "font-semibold",
            type === "subtitle" && `text-${color}-700`,
            "py-1.5",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {emoji && (
            <span
              className={[
                "mr-2",
                type === "title" ? "text-2xl" : "",
                "transition-transform duration-300 inline-block hover:scale-110",
              ].join(" ")}
            >
              {emoji}
            </span>
          )}
          <span
            className={[
              type === "title" &&
                "bg-gradient-to-r bg-clip-text text-transparent",
              type === "title" && getGradient(color),
              "transition-colors duration-300",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {title}
          </span>
          <span
            className={[
              "ml-3 text-base font-normal transition-colors duration-300",
              type === "title"
                ? "text-gray-400 tracking-normal"
                : "text-gray-500",
            ].join(" ")}
          >
            ({period})
          </span>
        </h2>
        {type === "title" && (
          <>
            <div
              className={[
                "absolute -bottom-3 left-0 h-[2px]",
                "w-full rounded-full",
                "bg-gradient-to-r shadow-sm",
                getGradient(color),
              ].join(" ")}
            />
            <div
              className={[
                "absolute -bottom-3 left-0 h-[1px] w-full",
                "bg-gray-100",
              ].join(" ")}
            />
          </>
        )}
      </div>
    </div>
  )
}

const SubSection = ({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-sm font-semibold mr-2">
        {number}
      </span>
      {title}
    </h3>
    {children}
  </div>
)

const RelatedLinks = ({
  links,
}: {
  links: Array<{
    type: "blog" | "news" | "tech" | "github" | "default"
    title: string
    url: string
    date?: string
  }>
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "blog":
        return "📝"
      case "news":
        return "📰"
      case "tech":
        return "📚"
      case "github":
        return "💻"
      default:
        return "🔗"
    }
  }

  if (!links || links.length === 0) return null

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-500">관련 자료</h4>
      <div className="space-y-1.5">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-base">{getIcon(link.type)}</span>
            <span className="group-hover:underline flex-1">{link.title}</span>
            {link.date && (
              <span className="text-xs text-gray-400">{link.date}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

const Career = () => {
  return (
    <div className=" pt-12 text-start max-w-4xl">
      <h1 className="inline-block text-xl font-semibold bg-sky-100 text-sky-700 px-0.5">
        <span className=" mr-2">💼</span>
        업무 경험
      </h1>
      <div className="mt-8 ml-6 space-y-12">
        {/* Next.js 마이그레이션 프로젝트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji=""
            title="OfficeNEXT Messenger"
            period="2023.03 ~ 진행 중"
            color="indigo"
            type="title"
          />

          <RelatedLinks
            links={[
              {
                type: "blog",
                title: "새 창에게 데이터 전달하기",
                url: "https://staysteady.netlify.app/posts/forwarding-data-at-the-frontend/",
              },
              {
                type: "news",
                title: "OfficeNEXT Landing Page",
                url: "https://www.officenext.net/",
              },
              // {
              //   type: "github",
              //   title: "Protected Route 구현 코드",
              //   url: "https://github.com/example/protected-route",
              // },
            ]}
          />
          <div>
            <SectionTitle
              emoji="🚀"
              title="Messenger Next.js 마이그레이션"
              period="2023.03 ~ 2024.03"
            />

            <div className="space-y-8 pl-4 mt-4">
              {/* 사용자 인증 */}
              <SubSection number="01" title="사용자 인증">
                <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                  <li>
                    <span className="font-semibold">JWT 기반 인증</span>을
                    도입하여, 사용자 로그인 시{" "}
                    <CodeBadge>accessToken</CodeBadge>과{" "}
                    <CodeBadge>refreshToken</CodeBadge>을 발급하고, 이를{" "}
                    <CodeBadge>localStorage</CodeBadge>에 저장하여 세션을 관리
                  </li>
                  <li>
                    <span className="font-semibold">토큰 만료 처리</span>를
                    위해, <CodeBadge>accessToken</CodeBadge>의{" "}
                    <CodeBadge>exp</CodeBadge> 클레임을 디코딩하여 만료 여부를
                    확인하고, 만료 시 <CodeBadge>refreshToken</CodeBadge>을
                    사용하여 새로운 토큰을 자동으로 재발급받는 로직을 구현
                  </li>
                  <li>
                    <span className="font-semibold">API 요청 최적화</span>를
                    위해, 토큰 디코딩을 통해 사용자 정보의 유효성을 사전에
                    검증하고, 유효하지 않은 경우 API 요청을 차단하여{" "}
                    <span className="font-semibold text-indigo-700">
                      불필요한 트래픽을 감소
                    </span>
                  </li>
                </ul>
              </SubSection>

              {/* Protected Route */}
              <SubSection number="02" title="Protected Route (인증보호 라우트)">
                <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                  <li>
                    <CodeBadge>Protected.tsx</CodeBadge> 컴포넌트를 통해 인증
                    보호 라우트를 구현, 이 컴포넌트는 로그인 시점과 페이지
                    새로고침 시에 실행되어 사용자 인증 상태와 웹소켓 연결 상태를
                    지속적으로 확인
                  </li>
                  <li>
                    초기 로딩 시, 대용량 데이터(예: 조직도)를 Preload API를 통해
                    불러온 후, 브라우저의 <CodeBadge>IndexedDB</CodeBadge>에
                    캐싱하여 저장함, 이를 통해 이후 동일한 데이터에 대한 API
                    요청을 생략하고, 캐시된 데이터를 재활용하여 전체 요청중{" "}
                    <span className="font-semibold text-indigo-700">
                      80%가량의 트래픽 감소
                    </span>
                  </li>
                </ul>
              </SubSection>

              {/* Handler 프로세스 */}
              <SubSection
                number="03"
                title="커맨드 패턴을 사용한 Handler 프로세스"
              >
                <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                  <li>
                    <span className="font-semibold">Command 패턴</span>과{" "}
                    <span className="font-semibold">Context API</span>를 활용한
                    Handler 아키텍처를 설계 및 구현하여, 웹소켓 기반의 실시간
                    기능을 효율적으로 관리하고,{" "}
                    <span className="font-semibold text-indigo-700">
                      코드의 재사용성과 유지보수성을 향상
                    </span>
                  </li>
                </ul>
              </SubSection>

              {/* 웹소켓 백그라운드 처리 */}
              <SubSection
                number="04"
                title="웹소켓 백그라운드 처리 아키텍처 설계 및 구현"
              >
                <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                  <li>
                    사용자 페이지 비활성화 시에도 실시간 메시지 수신 및 처리가
                    가능하도록 <CodeBadge>Web Worker</CodeBadge>를 활용한 웹소켓
                    처리 아키텍처를 설계, 이를 통해{" "}
                    <span className="font-semibold text-indigo-700">
                      메인 스레드의 부하를 줄이고 UI의 반응성을 유지
                    </span>
                    하며, 사용자 경험을 향상시킴
                  </li>
                </ul>
              </SubSection>

              {/* HTTP 요청 미들웨어 */}
              <SubSection
                number="05"
                title="Axios Interceptor를 이용한 HTTP 요청 미들웨어 구현"
              >
                <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                  <li>
                    Axios의 인스턴스와 인터셉터를 활용하여 API 요청 및 응답에
                    대한 중앙 집중식 미들웨어를 구축
                  </li>
                  <li>
                    요청 인터셉터에서는 사용자 인증을 위해{" "}
                    <CodeBadge>Bearer</CodeBadge> 토큰을 자동으로 헤더에
                    첨부하여, 모든 API 요청에 일관된 인증 처리를 보장
                  </li>
                  <li>
                    응답 인터셉터에서는 서버로부터의 에러 응답을 감지하여, 특히{" "}
                    <CodeBadge>410 Gone</CodeBadge> 및{" "}
                    <CodeBadge>419 Authentication Timeout</CodeBadge> 상태
                    코드에 대해 사용자 세션 만료로 간주하고 자동 로그아웃 처리
                    및 리디렉션 처리
                  </li>
                </ul>
              </SubSection>
            </div>
          </div>
        </div>

        {/* UI/UX 및 기능 구현 프로젝트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="💻"
            title="메시지, 보관함, 설정 등 핵심 페이지 UI/UX 및 기능 구현"
            period="2023.06 ~ 2024.08"
          />

          <div className="space-y-8 pl-4">
            {/* 가상 스크롤링 */}
            <SubSection
              number="01"
              title="react-virtuoso로 메시지 리스트 가상 스크롤링"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <CodeBadge>react-virtuoso</CodeBadge>를 사용하여 모든 페이지
                  리스트 컴포넌트에 가상 스크롤링을 구현하여, 대규모 데이터셋의
                  렌더링 성능을 최적화하고{" "}
                  <span className="font-semibold text-indigo-700">
                    초기 로딩 시간과 메모리 사용량을 절감
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* AWS S3 파일 업로드 */}
            <SubSection
              number="02"
              title="presigned-url를 활용한 AWS S3 파일업로드"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">AWS S3 presigned URL</span>을
                  활용하여 클라이언트가 직접 파일을 업로드하도록 구현함,{" "}
                  <span className="font-semibold text-indigo-700">
                    서버의 부하를 감소시키고 데이터 전송 효율성을 향상
                  </span>
                  시킴, 또한, URL의 만료 시간과 권한을 설정하여 보안강화
                </li>
              </ul>
            </SubSection>

            {/* 다국어 지원 */}
            <SubSection
              number="03"
              title="i18n으로 다국어 적용, 메신저 설정 modal 개발"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <CodeBadge>i18n</CodeBadge>을 활용하여 다국어 지원을 구현,
                  메신저 설정 모달을 개발하여 메신저 관련 모든 설정을 한 곳에서
                  관리할 수 있는 UI와 기능제공
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* Electron 기반 웹앱 개발 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="⚡"
            title="Electron 기반 웹앱 개발"
            period="2024.06 ~ 2025.01"
          />

          <div className="space-y-8 pl-4">
            {/* 새 창 프로세스 */}
            <SubSection number="01" title="새 창 프로세스 도입">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  메인 창에서 <CodeBadge>window.open()</CodeBadge>을 통해 메시지
                  에디터 등의 기능을 별도의 창으로 분리,{" "}
                  <CodeBadge>BroadcastChannel</CodeBadge>을 활용하여 메인 창과
                  새 창 간의 실시간 데이터 동기화를 구현함으로써{" "}
                  <span className="font-semibold text-indigo-700">
                    중복 API 요청을 최소화하고 성능을 최적화
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* IPC 통신 */}
            <SubSection number="02" title="IPC (Inter-Process Communication)">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  Electron의 <CodeBadge>ipcMain</CodeBadge>과{" "}
                  <CodeBadge>ipcRenderer</CodeBadge> 모듈을 활용하여 메인
                  프로세스와 렌더러 프로세스 간의 효율적인 통신을 구현, 이를
                  통해 Desktop에서의 알림 수신 및 표시, 다운로드 진행률 업데이트
                  등 시스템 이벤트를 효과적으로 처리
                </li>
              </ul>
            </SubSection>

            {/* 파일 다운로드 */}
            <SubSection number="03" title="파일 다운로드 뷰 개발">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  IPC 통신을 활용하여 파일 다운로드 진행 상황을 실시간으로
                  표시하는 UI 컴포넌트 개발, 사용자는 다운로드 상태를 직관적으로
                  확인할 수 있으며,{" "}
                  <span className="font-semibold text-indigo-700">
                    사용자 경험을 향상
                  </span>
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 채팅방 Pin 및 나와의 채팅방 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="📌"
            title="채팅방 Pin(상단 고정) 및 나와의 채팅방"
            period="2025.01 ~ 2025.03"
          />

          <div className="space-y-8 pl-4">
            {/* 채팅방 상단고정 */}
            <SubSection number="01" title="채팅방 상단고정 기능개발">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  채팅방 및 채널 채팅방의 상단 고정 기능을 구현하고, 웹소켓 수신
                  및 사용자 인터랙션 등 다양한 시나리오를 고려하여 채팅방
                  리스트의 정렬을 담당하는 공유 함수를 개발하여{" "}
                  <span className="font-semibold text-indigo-700">
                    실시간 데이터 반영과 일관된 사용자 경험을 제공
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 나와의 채팅방 */}
            <SubSection number="02" title="나와의 채팅방">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  사용자가 자신과의 대화를 통해 메모를 남기거나 파일을 저장할 수
                  있는 '나와의 채팅방' 기능을 설계 및 구현하여,{" "}
                  <span className="font-semibold text-indigo-700">
                    개인화된 커뮤니케이션 환경을 제공
                  </span>
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 전역적 스타일 적용 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="🎨"
            title="메신저 글꼴, 글자 크기, 색상 테마 등 전역적 스타일 적용"
            period="2025.03 ~ 2025.05"
          />

          <div className="space-y-8 pl-4">
            {/* 전역 스타일 관리 */}
            <SubSection number="01" title="전역 스타일 관리(글꼴, 글자 크기)">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  Electron IPC를 활용하여 시스템 글꼴 목록을 가져오고, 사용자가
                  선택한 글꼴과 글자 크기를 로컬스토리지에 저장하여 전역{" "}
                  <CodeBadge>font-family</CodeBadge> 속성으로 적용. 시스템에
                  해당 글꼴이 없는 예외 상황까지 고려한 처리 로직을 추가해,{" "}
                  <span className="font-semibold text-indigo-700">
                    사용성의 안정성과 예외 대응력을 향상
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 동적 색상테마 */}
            <SubSection
              number="02"
              title="css custom property로 동적 색상테마 전환"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  Tailwind CSS 4.0의 유틸리티 계층 분리 기능(
                  <CodeBadge>@layer</CodeBadge>)과 테마 확장 기능(
                  <CodeBadge>theme.extend</CodeBadge>) 그리고 CSS Custom
                  Property를 결합하여{" "}
                  <span className="font-semibold text-indigo-700">
                    색상 테마의 유연한 전환 시스템을 구축
                  </span>
                  . 서버에서 전달받은 테마 정보를 기반으로 색상 변수를 실시간
                  반영하며, hover, focus 등의 상호작용 스타일도 테마에 맞게 자동
                  적용되도록 구성
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 전달하기 기능 개발 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="📤"
            title="메신저 전달하기 기능 개발"
            period="2025.06 ~ 2025.08"
          />

          <div className="space-y-8 pl-4">
            {/* 전달하기 아키텍처 */}
            <SubSection
              number="01"
              title="Custom Hook 기반 비즈니스 로직 분리 및 최적화"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <CodeBadge>useForward.ts</CodeBadge> Custom Hook을 개발하여
                  전달하기 기능의 모든 비즈니스 로직을 중앙 집중식으로 관리,
                  <span className="font-semibold text-indigo-700">
                    코드 재사용성과 유지보수성을 향상
                  </span>
                </li>

                <li>
                  <span className="font-semibold">훅 기반 아키텍처</span>로
                  비즈니스 로직을 분리하여 컴포넌트의 관심사를 명확히 하고,
                  테스트 가능성과 코드 가독성을 향상시킴
                </li>
              </ul>
            </SubSection>

            {/* 새 창 연계 시스템 */}
            <SubSection number="02" title="새 창 연계 시스템 및 리소스 최적화">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  이미지 미리보기와 에디터 새 창과의 연계 시스템을 구축,
                  <CodeBadge>BroadcastChannel</CodeBadge>을 활용하여 메인 창과
                  새 창 간의 실시간 데이터 동기화를 구현하여{" "}
                  <span className="font-semibold text-indigo-700">
                    중복 API 요청을 감소
                  </span>
                </li>

                <li>
                  웹앱과 브라우저 환경에서 각각 다른 동작(새창 vs 팝업)을
                  제공하여 사용자 환경에 최적화된 경험을 구현
                </li>
              </ul>
            </SubSection>

            {/* 다중 전달 대상 관리 */}
            <SubSection
              number="03"
              title="다중 전달 대상 선택 및 상태 관리 시스템"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">탭 기반 선택 관리</span>를
                  통해 각 탭 이동 시 선택한 대상들을 초기화하고, 하나의 탭에서만
                  대상 선택이 가능하도록 하여 사용자 경험의 일관성을 유지
                </li>
              </ul>
            </SubSection>

            {/* 전달 기능 통합 */}
            <SubSection
              number="04"
              title="채팅, 보관함, 이미지 미리보기 통합 전달 시스템"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">다양한 컨텍스트 통합</span>을
                  통해 채팅, 채널채팅, 보관함, 이미지 미리보기 등 모든 곳에서
                  전달하기 기능을 일관되게 제공, 각 컨텍스트에 맞는 더보기
                  메뉴에 전달 버튼을 추가하여{" "}
                  <span className="font-semibold text-indigo-700">
                    사용자 접근성을 향상
                  </span>
                </li>
                <li>
                  <span className="font-semibold">다중 선택 전달</span> 기능을
                  보관함에 구현하여 사용자가 여러 파일/이미지/폴더/링크를 동시에
                  선택하여 전달할 수 있도록 하여{" "}
                  <span className="font-semibold text-indigo-700">
                    작업 효율성을 증대
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 사용자 피드백 시스템 */}
            <SubSection
              number="05"
              title="Toast 알림 및 이동 기능을 통한 사용자 피드백"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  전달 완료 후 <span className="font-semibold">Toast 알림</span>
                  을 통해 전달한 대상(방이름, 받는사람)을 명확히 표시하고,
                  우측하단 이동하기 버튼을 통해 전달한 곳으로 즉시 이동할 수
                  있는 기능을 제공하여{" "}
                  <span className="font-semibold text-indigo-700">
                    사용자 만족도를 향상
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    컨텍스트별 차별화된 처리
                  </span>
                  를 통해 채팅/채널채팅은 sendChat API를 사용하고, 메시지는
                  조직도 사용자 선택 후 에디터에 컨텐츠를 자동 입력하는 방식으로
                  각각의 특성에 맞는 최적화된 전달 경험 제공
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 파일 설치현황 및 테마 관리 프로젝트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji=""
            title="OfficeNEXT Admin"
            period="2025.03 ~ 2025.07"
            color="blue"
            type="title"
          />

          <SectionTitle
            emoji="📊"
            title="파일 설치현황, 메신저 테마 변경, 웹훅 추가/갱신, 파일 저장 로그 페이지 개발"
            period="2025.03 ~ 2025.05"
          />

          <div className="space-y-8 pl-4">
            {/* 데이터테이블 UI */}
            <SubSection
              number="01"
              title="파일 설치현황, 웹훅 추가/갱신, 파일 저장 로그 데이터테이블/필터링 UI 및 기능개발"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  데이터테이블 컴포넌트를 개발하여 파일 설치현황, 웹훅 관리,
                  파일 저장 로그 등의 데이터를 효율적으로 표시하고 관리할 수
                  있는 인터페이스 구현
                </li>
                <li>
                  다양한 필터링 옵션을 제공하여 사용자가 원하는 데이터를 쉽게
                  찾을 수 있도록{" "}
                  <span className="font-semibold text-indigo-700">
                    UX를 개선
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 테마 미리보기 */}
            <SubSection
              number="02"
              title="테마 미리보기 Carousel UI 개발 및 색상 변경 switch 기능적용"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  테마 미리보기 캐러셀을 구현하고, 실시간으로 테마 색상을 변경할
                  수 있는 스위치 기능 개발
                </li>
                <li>
                  사용자가 테마를 직관적으로 미리 볼 수 있도록 하여{" "}
                  <span className="font-semibold text-indigo-700">
                    사용자 경험을 향상
                  </span>
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* Custom Hooks 및 아이콘 컴포넌트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji="🎯"
            title="페이지 별 Custom Hooks 도입 및 아이콘 컴포넌트 개발"
            period="2025.05 ~ 2025.07"
          />

          <div className="space-y-8 pl-4">
            {/* Custom Hooks */}
            <SubSection
              number="01"
              title="Custom Hooks 도입으로 코드 가독성 및 유지보수성 향상"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  각 페이지별로 <CodeBadge>Custom Hooks</CodeBadge>를 도입하여
                  비즈니스 로직을 분리하고,{" "}
                  <span className="font-semibold text-indigo-700">
                    코드의 재사용성과 가독성을 향상
                  </span>
                </li>
                <li>
                  <CodeBadge>Jest</CodeBadge>를 사용하여 Custom Hooks에 대한
                  단위 테스트를 작성하고, 코드의 안정성과 신뢰성을 확보
                </li>
              </ul>
            </SubSection>

            {/* SVG 아이콘 컴포넌트 */}
            <SubSection number="02" title="SVG 아이콘 컴포넌트 시스템 구축">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <CodeBadge>vite-plugin-svgr</CodeBadge>를 활용하여 SVG 파일을
                  React 컴포넌트로 변환해 JSX 형태로 효율적으로 관리
                </li>
                <li>
                  아이콘 컴포넌트를 개발하여 <CodeBadge>type</CodeBadge>과
                  스타일 관련 props를 받아 동적으로 SVG 아이콘을 렌더링하고,{" "}
                  <CodeBadge>stroke</CodeBadge>, <CodeBadge>fill</CodeBadge>{" "}
                  등의 속성을 props로 제어하여{" "}
                  <span className="font-semibold text-indigo-700">
                    다양한 디자인을 단일 컴포넌트로 관리
                  </span>
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 내부 운영 플랫폼 개발 프로젝트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji=""
            title="OfficeNEXT 운영 플랫폼"
            period="2023.03 ~ 2023.10"
            color="emerald"
            type="title"
          />

          <SectionTitle
            emoji="👨‍💻"
            title="사내 개발자 운영 플랫폼 개발"
            period="2023.03 ~ 2023.10"
          />

          <div className="space-y-8 pl-4">
            {/* 클라이언트 버전 관리 */}
            <SubSection
              number="01"
              title="OS별 클라이언트 버전 통합 관리 시스템"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">데이터 테이블 기반</span>의
                  버전 관리 인터페이스를 구현하여, Windows, macOS, iOS, Android
                  등 다양한 OS별 클라이언트 버전을 효율적으로 관리할 수 있는
                  시스템 개발
                </li>
                <li>
                  <span className="font-semibold">일괄 작업 기능</span>을
                  도입하여 다수의 클라이언트 정보를 한 번에 수정/삭제할 수
                  있도록 구현함으로써, 운영팀의 작업 효율성을{" "}
                  <span className="font-semibold text-indigo-700">
                    50% 이상 향상
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 웹소켓 현황 모니터링 */}
            <SubSection number="02" title="실시간 웹소켓 접속 현황 모니터링">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  회사별 사용자의 실시간 접속 상태를 시각화하여 보여주는
                  대시보드를 개발, <CodeBadge>WebSocket</CodeBadge> 연결 상태,
                  IP 주소, OS 정보 등을{" "}
                  <span className="font-semibold text-indigo-700">
                    직관적으로 모니터링할 수 있는 인터페이스를 구현
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 서비스 알림 시스템 */}
            <SubSection
              number="03"
              title="타겟팅 가능한 서비스 알림/공지 시스템"
            >
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  회사 또는 개별 사용자 단위로 알림과 공지를 전송할 수 있는 관리
                  페이지를 개발
                </li>
              </ul>
            </SubSection>
          </div>
        </div>

        {/* 동네정보 공유 플랫폼 프로젝트 */}
        <div className="space-y-8">
          <SectionTitle
            emoji=""
            title="토박이 - 동네정보 공유 플랫폼"
            period="2024.08 ~ 2024.11"
            color="blue"
            type="title"
          />

          <RelatedLinks
            links={[
              {
                type: "blog",
                title: "지인들과 웹 서비스 만들기(토박이 프로젝트)",
                url: "https://staysteady.netlify.app/posts/memoirs-of-tobagi-project/",
              },
              {
                type: "default",
                title: "토박이 - 동네정보 공유 플랫폼",
                url: "https://tobagi-dev.netlify.app/",
              },
            ]}
          />

          <SectionTitle
            emoji="🗺️"
            title="위치 기반 서비스 및 중간지점 찾기 기능 개발"
            period="2025.09 ~ 2025.12"
          />

          <div className="space-y-8 pl-4">
            {/* 중간지점 찾기 */}
            <SubSection number="01" title="다중 사용자 중간지점 찾기 시스템">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">
                    커스텀 훅 기반의 상태 관리
                  </span>
                  를 통해 4단계 프로세스를 구현,{" "}
                  <CodeBadge>useStepFlow</CodeBadge> 훅을 개발하여 복잡한 단계별
                  유효성 검사와 조건부 흐름 제어를 모듈화하고{" "}
                  <span className="font-semibold text-blue-700">
                    코드 재사용성 30% 향상
                  </span>
                </li>
                <li>
                  <span className="font-semibold">단계별 상태 지속성</span>을
                  위해 <CodeBadge>localStorage</CodeBadge>와 연동하여 페이지
                  새로고침 시에도 진행 상태가 유지되도록 구현,{" "}
                  <span className="font-semibold text-indigo-700">
                    사용자 경험을 개선
                  </span>
                </li>
              </ul>
            </SubSection>

            {/* 위치 기반 서비스 */}
            <SubSection number="02" title="하이브리드 지도 서비스 통합">
              <ul className="list-disc pl-4 space-y-3 text-gray-700 text-sm">
                <li>
                  <CodeBadge>Kakao Map API</CodeBadge>와{" "}
                  <CodeBadge>공공 지도 OpenAPI</CodeBadge>를 통합하여 사용자
                  맞춤형 지도 서비스를 구현, 위치 기반 검색과 현재 위치 조회
                  기능을 통해{" "}
                  <span className="font-semibold text-indigo-700">
                    서비스 접근성을 향상
                  </span>
                </li>
              </ul>
            </SubSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career
