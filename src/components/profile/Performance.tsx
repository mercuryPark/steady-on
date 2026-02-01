import React from "react"

const PerformanceCard = ({
  title,
  metric,
  description,
  detail,
}: {
  title: string
  metric: string
  description: string
  detail: React.ReactNode
}) => {
  return (
    <div className="group py-16 first:pt-0 border-b border-slate-100 last:border-0 text-start">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="shrink-0 relative">
          <div className="size-20 rounded-[2rem] bg-indigo-600 border border-indigo-500 flex items-center justify-center shadow-xl shadow-indigo-100 group-hover:scale-105 transition-transform duration-500">
            <span className="text-xl font-black text-white tracking-tighter italic">{metric}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="space-y-1">
            <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.25em]">
              기술적 성과
            </h3>
            <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">
              {title}
            </h4>
          </div>
          
          <p className="text-[17px] text-slate-800 font-bold leading-snug">
            {description}
          </p>
          
          <div className="text-[15px] text-slate-500 leading-relaxed font-medium space-y-3 bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 group-hover:bg-white group-hover:shadow-md transition-all duration-500">
            {detail}
          </div>
        </div>
      </div>
    </div>
  )
}

const Performance = () => {
  const performanceData = [
    {
      title: "Data Structure Optimization",
      metric: "O(1)",
      description: "대규모 조직도 데이터 조회 및 캐싱 최적화",
      detail: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <span><strong>조직도 사용자 검색을 Hash Map 기반 구조로 재설계</strong>하여 1,000명 규모의 대용량 데이터에서도 <strong>O(1) 수준의 빠른 조회</strong>가 가능하도록 성능을 최적화했습니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">02.</span>
            <span>IndexedDB를 활용한 클라이언트 사이드 캐싱 전략을 병행하여 불필요한 네트워크 비용을 절감하고 데이터 무결성을 확보했습니다.</span>
          </li>
        </ul>
      ),
    },
    {
      title: "Event Handling Optimization",
      metric: "MEM",
      description: "이벤트 버블링을 활용한 메모리 및 리소스 관리",
      detail: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <span>대규모 리스트에서 개별 요소마다 리스너를 할당하는 방식 대신, <strong>부모 태그에 단일 이벤트를 등록하는 버블링 방식</strong>을 적용했습니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">02.</span>
            <span>이벤트 위임(Event Delegation)을 통해 불필요한 메모리 점유를 획기적으로 줄이고, 리스트 렌더링 속도와 반응성을 개선했습니다.</span>
          </li>
        </ul>
      ),
    },
    {
      title: "Scalable Architecture & Pattern",
      metric: "FSD",
      description: "엔터프라이즈 급 확장을 위한 고도화된 아키텍처 설계",
      detail: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <span><strong>FSD(Feature-Sliced Design) 아키텍처</strong>를 전면 도입하여 계층 간 결합도를 낮추고 도메인 중심의 높은 유지보수성 확보</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">02.</span>
            <span>복잡한 WebSocket 비동기 통신과 Client Action을 <strong>Command Pattern</strong>으로 캡슐화하여 선언적이고 예측 가능한 로직 처리 환경 구축</span>
          </li>
        </ul>
      ),
    },
    {
      title: "Native-like Web Ecosystem",
      metric: "IPC",
      description: "Electron 기반의 데스크톱 리소스 최적화 및 동기화 인프라",
      detail: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <span><strong>IPC(Inter-Process Communication) 통신 구조 최적화</strong>로 메인-렌더러 프로세스 간 오버헤드를 최소화하여 시스템 리소스 효율 극대화</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">02.</span>
            <span><strong>BroadcastChannel 프로세스</strong> 도입으로 멀티 윈도우 환경에서의 실시간 데이터 전파 시스템 구축 → <span className="text-emerald-600 font-black">API 통신 리소스 40% 절감</span></span>
          </li>
        </ul>
      ),
    },
    {
      title: "Resource Asset Engineering",
      metric: "50%↓",
      description: "정적 리소스 관리 체계 혁신 및 로딩 성능 개선",
      detail: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <span><strong>SVG Icon System</strong> 도입을 통한 컴포넌트화로 불필요한 HTTP 요청 및 중복 파일 제거 → <span className="text-emerald-600 font-black">리소스 50% 이상 절감</span></span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">02.</span>
            <span>정적 리소스 관리 구조 개선 및 <strong>Binary Utility 분리</strong>를 통해 초기 렌더링 속도(LCP) 및 상호작용성 향상</span>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-10 text-start">
      <div className="flex flex-col gap-4 mb-8">
        <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">
          기술적 성과
        </h2>
        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-2xl">
          성능 최적화와 확장 가능한 설계를 통해 서비스 품질을 개선합니다.
        </p>
      </div>

      <div className="flex flex-col">
        {performanceData.map((item, index) => (
          <PerformanceCard
            key={index}
            title={item.title}
            metric={item.metric}
            description={item.description}
            detail={item.detail}
          />
        ))}
      </div>
    </div>
  )
}

export default Performance
