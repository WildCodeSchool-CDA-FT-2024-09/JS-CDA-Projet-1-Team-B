import { Dispatch, SetStateAction } from "react";

export default function ProfileTabs({ activeTab, setActiveTab }: {
  activeTab: string,
  setActiveTab: Dispatch<SetStateAction<string>>
}) {
  return (
    <div role="tablist" className="tabs tabs-boxed bg-transparent rounded-lg font-montserrat p-0">
      <a role="tab" className={`tab rounded-lg !border-2 !border-bloodRed h-[4dvh] !text-white ${
        activeTab === "comments" ? "tab-active !bg-bloodRed" : ""
      }`}
         onClick={() => setActiveTab("comments")}>Mes
        commentaires</a>
      <a role="tab" className={`tab rounded-lg !border-2 !border-bloodRed h-[4dvh] !text-white ${
        activeTab === "ratings" ? "tab-active !bg-bloodRed" : ""
      }`}
         onClick={() => setActiveTab("ratings")}>Mes évaluations</a>
    </div>
  );
}