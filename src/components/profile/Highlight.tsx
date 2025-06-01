import React from "react"

const Bubble = ({
  children,
  type,
}: {
  children: React.ReactNode
  type: "lime" | "orange" | "indigo" | "stone"
}) => {
  const getTextColor = (type: string) => {
    switch (type) {
      case "lime":
        return "text-lime-700"
      case "orange":
        return "text-orange-700"
      case "indigo":
        return "text-indigo-700"
      case "stone":
        return "text-stone-700"
      default:
        return "text-slate-700"
    }
  }

  return (
    <span
      className={`bg-gray-200 text-xs py-0.5 px-1 rounded font-semibold ${getTextColor(
        type
      )}`}
    >
      {children}
    </span>
  )
}

const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>
}

const IssueCard = ({
  title,
  problem,
  cause,
  solution,
}: {
  title: string
  problem: string
  cause: string | string[]
  solution: string
}) => {
  const renderCause = () => {
    if (Array.isArray(cause)) {
      return cause.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < cause.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    return cause
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 hover:bg-slate-50 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">
        {title}
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-red-500 text-sm">🚨</span>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">문제 상황</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{problem}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-blue-500 text-sm">🔍</span>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">원인 파악</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {renderCause()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <span className="text-green-500 text-sm">✨</span>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">개선 방법</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{solution}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Highlight = () => {
  const communication = {
    title: "커뮤니케이션",
    list: [
      <div>
        QC 담당자와의 <Bold>적극적인 소통</Bold>을 통해 이슈 사각지대를 사전에
        파악하고,
        <Bubble type="indigo">리팩토링 및 구조 개선</Bubble>을 통해 양질의
        결과물을 도출했어요.
      </div>,
      <div>
        기획자와의 <Bubble type="indigo">원활한 소통</Bubble>을 통해 회의 외에도
        기획의도와 개발환경을 공유하며, 효율적인 서비스 개발을 지향하고있어요.
      </div>,
      <div>
        팀원들과 같이 정보공유 채널방을 운영하며, 각 직무에 대한 정보를
        공유하고있어요.
      </div>,

      // <div>
      //   <Bubble type="indigo">팀원 및 사내 동료들과의 커뮤니케이션</Bubble>을
      //   중요시해 사내 동호회 회장을 맡고있어요.
      // </div>,
      <div>타 팀의 신입사원 멘토 추천으로 사내 멘토링을 진행하고 있어요.</div>,
    ],
  }

  const troubleshooting = {
    title: "Trouble Shooting 경험",
    list: [
      <IssueCard
        title="2-in-1 PC 사용자 동작 감지불가 개선"
        problem="특정 사용자의 PC에서 Hover, Active 이벤트가 동작하지 않는 문제 발생"
        cause={[
          "1. 사용자의 환경을 조사하고, github 포럼을 통해 2-in-1 PC 사용자에게 동일 이슈가 발견됨을 확인",
          "2. 사용자가 키보드를 탈착 또는 화면을 조정하는 특정상황에서 태블릿모드로 변경됨을 확인",
          "3. 이슈 발생 시점과 업데이트 시점을 대조해 tailwindcss 4.0 업데이트 이후 tailwindcss가 2-in-1 PC의 태블릿모드상태일때 hover,active와 같은 사용자 동작 감지를 지원하지 않음을 파악",
          "4. 정확한 파악을 위한 tailwindcss 버전별 사용자 동작 감지를 테스트 할 수 있는 페이지를 사용자에게 제공해 확인",
        ]}
        solution="사용자 동작 감지부분에 대한 CSS 속성을 커스텀해 이전버전과 동일하게 동작하도록 개선"
      />,
      <IssueCard
        title="채팅방 Pin 기능 멀티 에이전트 동기화 개선"
        problem="동일 계정의 여러 에이전트에서 채팅방 Pin 기능 사용 시 상태가 서로 다르게 표시되는 문제 발생"
        cause={[
          "1. 각기 다른 에이전트의 불러온 채팅방 갯수가 다른경우 이슈가 발견됨을 확인",
          "2. A 에이전트에는 없는 B 에이전트에서 최하단 채팅방 Pin 고정시 A 에이전트에서 동기화처리가 되지 않음을 확인",
          "3. A 에이전트에서 Pin 고정된 채팅방 해제시 올바른 위치가 아닌 현재 불러온 채팅방리스트 최하단으로 이동함을 확인",
        ]}
        solution="WebSocket 데이터를 기반으로 사용자에게 없는 채팅방이 상단고정되었을때 특정 채팅방 정보 조회 API 처리 및 기존 채팅방 ordering하는 로직 개선, 사용자에게 없는 채팅방 고정해제시 해당 채팅방 리스트 제외"
      />,
      <IssueCard
        title="OverlayPanel z-index 우선순위 이슈"
        problem="사용자에게 overlay로 버튼을 제공하는 overlayPanel이 다른 ui에 가려져 보이는 이슈 발생"
        cause={[
          "1. 해당 컴포넌트의 커밋이 없었음에도 이슈가 발생됨을 확인",
          "2. 문제가 발생되는 커밋지점을 찾아 동일 ui 프레임워크 컴포넌트 속성이 변경됨을 확인",
          "3. 같은 시점에 렌더링되는 ui 프레임워크의 유무에 따라 z-index를 자체적으로 계산해 우선순위 변경됨을 확인",
        ]}
        solution="overlayPanel에 대한 z-index 재정의 및 컴포넌트 렌더링 순서 조사"
      />,
      <IssueCard
        title="WebSocket 초기 연결 데이터 동기화 이슈"
        problem="웹페이지 새로고침 직후 전송받은 첫 번째 메시지가 리스트에 반영되지 않는 이슈 발생"
        cause={[
          "1. Websocket 연결 시점과 밀접한 로직 위주로 파악하며 이슈 확인",
          "2. Websocket으로 받은 데이터를 반영할 상태관리 state가 비워져있음을 확인",
          "3. Websocket을 처리하는 Handler의 상태관리 state를 참조하는 타이밍 문제 확인",
        ]}
        solution="setState의 함수형 업데이트를 활용해 Handler 생성시점에 상태관리 state 동기화 처리"
      />,
    ],
  }

  return (
    <div className="pt-12 text-start flex flex-col gap-20">
      {/* Communication Experience */}
      <div>
        <h1 className="inline-block text-xl font-semibold bg-indigo-100 text-indigo-700 px-0.5">
          <span className="mr-1">💬</span>
          {communication.title}
        </h1>
        <div className="mt-4">
          <ul className="list-disc pl-4 text-sm space-y-2">
            {communication.list.map((item, index) => (
              <li key={`comm-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Troubleshooting Experience */}
      <div>
        <h1 className="inline-block text-xl font-semibold bg-rose-100 text-rose-700 px-0.5">
          <span className="mr-1">🔧</span>
          {troubleshooting.title}
        </h1>
        <div className="mt-4 space-y-6">
          {troubleshooting.list.map((item, index) => (
            <div key={`trouble-${index}`}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Highlight
