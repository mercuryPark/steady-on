import React from "react"

const Bubble = ({ children, type }: any) => {
  const colorClass =
    type === "lime"
      ? "text-emerald-700 bg-emerald-50 border-emerald-100"
      : type === "orange"
      ? "text-orange-700 bg-orange-50 border-orange-100"
      : type === "rose"
      ? "text-rose-700 bg-rose-50 border-rose-100"
      : "text-indigo-700 bg-indigo-50 border-indigo-100"

  return (
    <span
      className={`px-1.5 py-0.5 rounded text-[11px] font-bold border ${colorClass}`}
    >
      {children}
    </span>
  )
}

const Bold = ({ children }: any) => {
  return <span className="font-bold text-slate-900">{children}</span>
}

const IntroSection = ({ title, emoji, list, color }: any) => {
  const colorStyles: Record<string, string> = {
    indigo: "text-indigo-600",
    orange: "text-orange-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
  }

  return (
    <div className="py-12 first:pt-0 border-b border-slate-100 last:border-0 text-start">
      <div className="flex items-center gap-3 mb-8">
        <h3
          className={`text-xl font-bold tracking-tight italic uppercase ${colorStyles[color]}`}
        >
          {emoji} {title}
        </h3>
      </div>

      <ul className="space-y-5">
        {list.map((item: any, idx: number) => (
          <li
            key={idx}
            className="flex items-start gap-4 text-slate-600 leading-relaxed text-[15px] font-medium"
          >
            <div className="mt-2.5 size-1 rounded-full bg-slate-300 shrink-0" />
            <div className="flex-1">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProfileContents = () => {
  const strength = {
    title: "Strength",
    emoji: "💪",
    list: [
      <div>
        <Bold>프로젝트 초기 환경 구성부터 운영까지</Bold> 전 주기를 경험하며,
        현재 안정적인 서비스 운영을 이끌고 있어요.
      </div>,
      <div>
        장애 발생 시 <Bubble type="rose">근본 원인(Root Cause)</Bubble>을
        분석하고, 해결 과정을 문서화하여 동일 이슈의 재발을 방지해요.
      </div>,
      <div>
        <Bold>개발자 테스트 시나리오</Bold>를 직접 정의하고 QA 및 협업자에게
        공유하여 검증 효율을 높이고 있어요.
      </div>,
      ,
    ],
  }

  const myJob = {
    title: "My Role",
    emoji: "🧑🏽‍💻",
    list: [
      <div className="flex flex-wrap items-center gap-1.5">
        기업용 협업툴을 만드는 <Bold>프론트엔드 개발자</Bold>로 일하고 있어요.
      </div>,
      <div className="flex flex-wrap items-center gap-1.5">
        기업용 메신저의 <Bubble type="indigo">Browser와 WebApp</Bubble>{" "}
        프론트엔드를 담당하고 있어요.
      </div>,
      ,
    ],
  }

  const character = {
    title: "About Me",
    emoji: "👋",
    list: [
      <div>
        누가 읽어도 <Bold>이해하기 쉬운 코드</Bold> 작성을 지향해요.
      </div>,
      <div>
        서비스의 <Bold>사용자경험(UX)</Bold>을 중요시해 습관적으로 비교하고
        테스트해요.
      </div>,
      <div>
       업무에 AI를 활용해 적용해보고, 개발 시간과 코드품질을 개선하는 것을 좋아해요.
      </div>,
    ],
  }

  const communication = {
    title: "Communication",
    emoji: "💬",
    list: [
      <div>
        스쿼드 내 <Bubble type="indigo">기술 논의와 협업</Bubble>을 주도하며
        팀의 상호 성장에 기여해요.
      </div>,
      <div>
        QC 담당자와의 <Bold>적극적인 소통</Bold>을 통해 이슈 사각지대를 사전에
        파악하고, <Bubble type="indigo">리팩토링 및 구조 개선</Bubble>을 통해
        양질의 결과물을 도출해요.
      </div>,
      <div>
        기획자와의 <Bubble type="indigo">원활한 소통</Bubble>을 통해 기획의도와
        개발환경을 공유하며, 효율적인 서비스 개발을 지향해요.
      </div>,
      <div>팀원들과 지식 공유 채널을 운영하며 상호 성장을 도모해요.</div>,
    ],
  }

  return (
    <div className="flex flex-col py-4">
      {/* <IntroSection
        title={strength.title}
        emoji={strength.emoji}
        list={strength.list}
        color="rose"
      />
      <IntroSection
        title={myJob.title}
        emoji={myJob.emoji}
        list={myJob.list}
        color="emerald"
      /> */}
      <IntroSection
        title={character.title}
        emoji={character.emoji}
        list={character.list}
        color="orange"
      />
      <IntroSection
        title={communication.title}
        emoji={communication.emoji}
        list={communication.list}
        color="indigo"
      />
    </div>
  )
}

export default ProfileContents
