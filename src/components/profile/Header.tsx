import React from "react"

const SKILLS = [
  "Next.js",
  "React",
  "Vite",
  "Tailwind CSS",
  "React Native",
  "Expo",
  "Web Socket",
  "Electron",
  "TypeScript",
  "Gatsby.js",
  "React Query",
  "Jotai",
  "shadcn ui",
]

const ProfileHeader = () => {
  return (
    <div className="flex flex-col gap-12 w-full text-start">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Profile Image - Clean & Simple */}
        <div className="relative shrink-0">
          <div className="size-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
            <img
              src="/images/profile-hoyeon.jpeg"
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
        </div>

        {/* Contact Information - Grid Style */}
        <div className="flex-1 w-full pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {[
              {
                icon: "✉️",
                label: "Email",
                value: "qkrghdus1113@naver.com",
                href: "mailto:qkrghdus1113@naver.com",
              },
              {
                icon: "📱",
                label: "Phone",
                value: "010-3537-6008",
                href: "tel:010-3537-6008",
              },
              {
                icon: "📄",
                label: "Resume",
                value: "이력서 다운로드",
                href: "/이력서_프론트엔드 박호연.pdf",
                download: true,
              },
              {
                icon: "📝",
                label: "Blog",
                value: "박호연의 기술블로그",
                href: "https://staysteady.netlify.app/",
                target: "_blank",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.target ? "noopener noreferrer" : ""}
                  download={
                    item.download ? "이력서_프론트엔드 박호연.pdf" : undefined
                  }
                  className="text-[14px] font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills UI - Added as requested */}
      <div className="pt-8 border-t border-slate-100">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Core Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200/60 rounded-full text-[13px] font-bold shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
