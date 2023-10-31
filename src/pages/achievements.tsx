import { useRouter } from "next/router";
import { useState } from "react";
import Expandable from "~/components/expandable";
import { GiPaperArrow } from "react-icons/gi"
import en from "~/locale/en/achievements";
import kn from "~/locale/kn/achievements";

const achievements= [
  {
    title: "SDM College Yakshothsava 2023 (March 11, 2023)",
    team: "First prize in the overall team category.",
    individual: ["Varun Acharya - First place, individual category", "Saritha Rao - Consolation prize, individual category"]
  },
  {
    title: "Yakshayaana at Govinda Dasa College (April 8, 2023)",
    team: undefined,
    individual: ["Pranav Moodithaya - First place, individual Hasya category", ]
  },
  {
    title: "AJ Institute of Management - Yakshakalothsava (April 20, 2023)",
    team: undefined,
    individual: ["Anwesh R Shetty - First place in the Raja Vesha category"]
  },
  {
    title: "Patla Sambhrama 2023 (May 27, 2023)",
    team: "First-place in the overall team category among 22 participating teams.",
    individual: ["Varun Acharya - Second place, Pundu Vesha", "Anwesh R Shetty - First place, Raja Vesha", "Pranav Moodithaya - First place, Hasya", "T M Shravan - First place, Poshaka Patra"]
  },
  {
    title: "Bhramari Yaksha Jhenkara 2023 (May 30, 2023)",
    team: "First place in the overall category.",
    individual: ["Pranav Moodithaya - First place in the individual Hasya category", "Anwesh R Shetty - Overall individual third place", "Varun Acharya - Overall individual first place"]
  },
  {
    title: "Yaksha Pranava (October 8, 2023)",
    team: "First runner-up position among the nine participating teams.",
    individual: ["Anwesh R Shetty - Best Kireeta Vesha (Role: Nibandhana)", "Varun Acharya - Best Pundu Vesha (Role: Satyavratha)", "Rajath Bola - Overall Second Samagra Vayaktika (Best Individual Artist, Role:Choodamani)"]
  },
]

const Achievements = () => {
  // const router = useRouter()
  // const t = router.locale === "en" ? en : kn

  const [contentId, setContentId] = useState(-1)

  return (
    <main className="snap-y snap-mandatory h-screen overflow-scroll no-scrollbar relative top-0">
      <div className="h-screen bg-black flex items-center justify-center snap-start">
        {/* video */}
        <div className="font-hindi font-bold text-4xl sm:text-6xl md:text-7xl">Achievements</div>
      </div>
      <section className="relative snap-start">
        <div className="flex flex-col items-center w-screen px-4 sm:px-8 lg:px-32 snap-y snap-mandatory h-screen overflow-scroll no-scrollbar">
          <div className="w-full ">
            {achievements.map((ach, idx) => {
              if(idx % 2 === 0) {
                const row = [{contentId: idx,img: `/Cloudinary/achievements/${idx+1}.png`}]

                const nextAchievement = achievements[idx + 1];
                nextAchievement && row.push({contentId: idx + 1, img: `/ach${idx+2}.png`})

                // const secNextAchievement = t.achievements[idx + 2]
                // secNextAchievement && row.push({...secNextAchievement, img: `/${idx+3}.jpg`})
                
                return (
                  <div key={idx} className="max-w-7xl w-full relative flex flex-col justify-end h-screen snap-start gap-10">
                    <Expandable key={idx} cards={row} setContentId={setContentId} direction={idx % 4 == 0? "" : "-"} />
                    <div className="h-48 md:h-48 flex flex-col justify-center items-center gap-4 md:gap-3 justify-self-end">
                      <div className="flex justify-center text-lg sm:text-xl md:text-2xl text-center text-secondary-100">{achievements[contentId]?.title}</div>
                      <div className="flex flex-col justify-center items-center gap-2 md:gap-1">
                        {achievements[contentId]?.team && <div className="text-xs sm:text-sm md:text-base xl:text-lg flex items-center gap-3">
                          <GiPaperArrow className="-rotate-45 text-secondary-100 select-none" />
                          <div className="">{achievements[contentId]?.team}</div>
                        </div>}
                        {achievements[contentId]?.individual.map((ind, i) => (
                          <div key={i} className="text-xs sm:text-sm md:text-base xl:text-lg flex items-center gap-3">
                            <GiPaperArrow className="-rotate-45 text-secondary-100 select-none" />
                            <div className="">{ind}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Achievements