import HeroSection from "@/components/hero-section";
import BoardOfDirectors from "@/components/board-of-directors";
import PsalionTeam from "@/components/psalion-team";
import AwardsSection from "@/components/awards-section";
import ClientTypesChart from "@/components/client-types-chart";
import ClientsByRegion from "@/components/clients-by-region";
import MentionsSection from "@/components/mentions-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BoardOfDirectors />
      <PsalionTeam />
      <AwardsSection />
      <ClientTypesChart />
      <ClientsByRegion />
      <MentionsSection />
    </>
  );
}
