import React from "react"

const Bubble = ({ children, type }: any) => {
  return (
    <span
      className={`bg-gray-200 text-xs py-0.5 px-1 rounded font-semibold ${
        type === "lime" ? "text-lime-700" : "text-orange-700"
      }`}
    >
      {children}
    </span>
  )
}

const Bold = ({ children }: any) => {
  return <span className="font-semibold">{children}</span>
}

const ProfileContents = () => {
  const myJob = {
    title: "기업용 헙업툴을 만드는 프론트엔드 개발자로 일하고 있어요.",
    list: [
      <div className="flex items-center gap-1">
        기업용 메신저의 <Bubble type="lime">Browser와 WebApp</Bubble>
        프론트엔드를 담당하고 있어요.
      </div>,

      <div>
        <Bold>확장성이 좋고 직관적인 오픈소스 라이브러리</Bold>를 조사하고
        적용해보는 것을 좋아해요.
      </div>,

      <div>
        WebApp의 <Bubble type="lime">새 창 프로세스</Bubble>를 도입해 사용자
        경험을 개선해봤어요.
      </div>,
      <div>
        사내 개발지식 공유 문서채널을 운영하며 적극적으로 커뮤니케이션하고
        있어요.
      </div>,
      <div>
        서비스의 개선제안 채널을 통해 사용자의 <Bold>피드백을 즉각 대응</Bold>
        하고있어요.
      </div>,
      <div>
        Github 오픈포럼을 활용해 프로젝트
        <Bubble type="lime">Trouble Shooting을 경험</Bubble>
        해봤어요.
      </div>,
    ],
  }
  const character = {
    title: "저는 이런 사람이에요.",
    list: [
      <div>
        누가 읽어도 <Bold>이해하기 쉬운 코드</Bold> 작성을 지향해요.
      </div>,
      <div>
        코드리뷰와 <Bubble type="orange">적극적인 피드백 문화</Bubble>를
        좋아해요.
      </div>,
      <div>
        서비스의 <Bold>사용자경험(UX)</Bold>을 중요시해 습관적으로 비교하고
        테스트해요.
      </div>,

      <div>
        <Bold>Trouble Shooting</Bold>후에는 기록 및 회고를 적극적으로
        하고있어요.
      </div>,
    ],
  }
  //   const communication = {
  //     title: "Communication",
  //     list: [
  //       <div>
  //         팀원들과 같이 정보공유 채널방을 운영하며, 각 직무에 대한 정보를
  //         공유하고있어요.
  //       </div>,
  //     ],
  //   }
  //   const troubleShooting = {
  //     title: "Trouble Shooting",
  //     list: [<div></div>],
  //   }
  return (
    <div className="pt-12 text-start flex flex-col gap-8">
      {/* 내 직무 소개 */}
      <div className="">
        <h1 className="inline-block text-xl font-semibold bg-lime-100 text-lime-700 px-0.5">
          <span className=" mr-1">🧑🏽‍💻</span>
          {myJob.title}
        </h1>

        <div className="mt-4">
          <ul className="list-disc pl-4 text-sm">
            {myJob.list.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 내 성향 소개 */}
      <div>
        <h1 className="inline-block text-xl font-semibold bg-orange-100 text-orange-700 px-0.5">
          <span className=" mr-2">👋</span>
          {character.title}
        </h1>
        <div className="mt-4">
          <ul className="list-disc pl-4 text-sm">
            {character.list.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileContents
