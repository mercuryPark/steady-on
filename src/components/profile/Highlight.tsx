import React from "react"

const IssueCard = ({
  title,
  problem,
  cause,
  solution,
}: {
  title: string
  problem: string
  cause: string | string[]
  solution: string | string[]
}) => {
  return (
    <div className="py-16 first:pt-0 border-b border-slate-100 last:border-0 text-start">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
            {title}
          </h3>
        </div>

        <div className="grid gap-12 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

          {/* Problem */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
            <div className="hidden md:flex shrink-0 size-8 rounded-full bg-rose-500 text-white items-center justify-center text-[12px] font-black z-10 shadow-sm shadow-rose-200">
              Q
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] mb-3">
                Identified Problem
              </h4>
              <p className="text-[16px] text-slate-600 leading-relaxed font-semibold">
                {problem}
              </p>
            </div>
          </div>

          {/* Cause */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
            <div className="hidden md:flex shrink-0 size-8 rounded-full bg-slate-800 text-white items-center justify-center text-[12px] font-black z-10 shadow-sm shadow-slate-200">
              C
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Root Cause Analysis
              </h4>
              <div className="text-[15px] text-slate-500 leading-relaxed space-y-3 font-medium">
                {Array.isArray(cause) ? (
                  cause.map((line, idx) => (
                    <p key={idx} className="pl-4 border-l-2 border-slate-100">
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="pl-4 border-l-2 border-slate-100">{cause}</p>
                )}
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
            <div className="hidden md:flex shrink-0 size-8 rounded-full bg-emerald-500 text-white items-center justify-center text-[12px] font-black z-10 shadow-sm shadow-emerald-200">
              A
            </div>
            <div className="flex-1 p-6 md:p-8 bg-emerald-50/40 rounded-3xl border border-emerald-100/50">
              <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">
                해결 방법
              </h4>
              <div className="text-[15px] text-slate-800 leading-relaxed font-bold space-y-3">
                {Array.isArray(solution) ? (
                  solution.map((line, idx) => <p key={idx}>{line}</p>)
                ) : (
                  <p>{solution}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Highlight = () => {
  const troubleshooting = [
    {
      title:
        "Chrome Background Throttling에 의한 메시지 수신 지연 및 중복 알림 장애 개선",
      problem:
        "PC 환경의 웹 앱 사용자가 시스템 절전 모드 해제 시, 백그라운드에서 누적된 메시지가 한꺼번에 처리되며 대량의 중복 알림이 발생하고 최신 메시지 수신이 지연되는 크리티컬 이슈 발생",
      cause: [
        "Windows / macOS의 강도 높은 전력 관리 정책으로 인해 Chrome Background Throttling이 활성화되어 `setInterval` 주기가 비정상적으로 지연됨",
        "절전 모드 동안 WebSocket 큐에 적체된 과거 이벤트들이 복구 시점에 순차적으로 폭발하듯 처리되는 현상 확인",
        "시나리오 기반 재현 테스트를 통해 네트워크 단절 및 시스템 슬립 상태에서의 `processQueue` 정지 현상 기술적 검증",
      ],
      solution: [
        "각 페이지별 WebSocket Queue에 일정량 이상의 이벤트가 적체되고, 시스템이 절전 모드 상태로 판단될 경우 해당 Queue를 상황에 따라 초기화(Clear)하는 방어 로직 적용",
        "Timestamp 비교를 통해 과거 이벤트를 필터링하여 중복 알림이 사용자에게 노출되지 않도록 처리",
      ],
    },
    {
      title:
        "2-in-1 하이브리드 디바이스 환경에서의 인터랙션 감지 불가 현상 해결",
      problem:
        "Surface, Galaxy Book 등 2-in-1 PC 사용자가 태블릿 모드로 전환 시, 기존 마우스 기반의 Hover 및 Active 이벤트가 소멸되어 UI 반응성이 상실되는 현상",
      cause: [
        "Tailwind CSS v4 업데이트 후 특정 미디어 쿼리가 디바이스의 동적 상태 변화(키보드 탈착)를 실시간으로 추적하지 못함",
        "포인터 장치의 유무에 따라 스타일 시스템이 고정되어 터치 환경에서의 인터랙션이 무시되는 아키텍처적 결함 파악",
      ],
      solution:
        "사용자 인터랙션을 기기별로 제한하는 Tailwind CSS v4의 해당 기능을 버전 롤백하고, 동일 이슈가 발생하는 특정 사용자 기기 환경에서 직접 테스트를 수행하여 정상 동작 확인",
    },
    {
      title:
        "대규모 세션 전환 시 발생하는 비동기 경쟁 상태(Race Condition) 제어",
      problem:
        "참가자가 많은 대형 채팅방(300인 이상)과 소형 채팅방을 빠르게 전환할 때, 응답 속도 차이로 인해 이전 방의 정보가 현재 화면을 덮어쓰는 데이터 무결성 오류",
      cause: [
        "채팅방 초기화(initRoom) 시 실행되는 다수의 비동기 API 응답 순서가 네트워크 상태 및 데이터 크기에 따라 역전됨",
        "기존 요청에 대한 명시적인 취소 로직 부재로 인해 불필요한 사이드 이펙트가 렌더링 스레드에 잔류함",
      ],
      solution:
        "AbortController를 활용한 Request-Cancel 패턴을 도입하여, 신규 요청 시 이전 세션의 모든 유효하지 않은 요청을 즉시 폐기하도록 개선",
    },
    {
      title: "멀티 에이전트 환경의 실시간 데이터 동기화 및 일관성 확보",
      problem:
        "데스크톱, 웹, 모바일 등 멀티 에이전트 동시 사용 시 채팅방 상단 고정(Pin) 상태가 에이전트별로 파편화되어 사용자 혼란 가중",
      cause: [
        "특정 에이전트에 로드되지 않은 채팅방 정보가 타 에이전트의 핀 설정 이벤트를 수신할 때 로컬 데이터 업데이트가 누락됨",
        "정렬 알고리즘이 서버 데이터 수신 시점이 아닌 로컬 로딩 시점에 의존하여 정렬 순서 불일치 발생",
      ],
      solution:
        "WebSocket 수신 시 데이터 부재 방에 대한 재귀적 페칭 로직을 추가하고, 모든 에이전트가 동일한 정렬 시드(Seed)를 공유하도록 공통 상태 관리 엔진 고도화",
    },
  ]

  return (
    <div className="flex flex-col gap-10 text-start">
      <div className="flex flex-col gap-4 mb-8">
        <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">
          Technical Problem Solving
        </h2>
        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-2xl">
          복잡한 시스템 환경에서 발생하는 예측 불가능한 기술적 이슈를 분석하고 해결한 사례들입니다.
        </p>
      </div>

      <div className="flex flex-col">
        {troubleshooting.map((item, idx) => (
          <IssueCard key={idx} {...item} />
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 border border-slate-800 shadow-2xl">
        <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-[14px] font-black text-white tracking-tight">
            더 깊은 고민의 흔적들은 기술 블로그에서 확인하실 수 있습니다.
          </p>
          <p className="text-[12px] text-slate-500 font-medium">
            Project Post-mortems, Refactoring Logs, and Architectural Insights
          </p>
        </div>
      </div>
    </div>
  )
}

export default Highlight
