import MyHero from "@/components/ui/MyHeroSection";
import MyNavBar from "@/components/ui/MyNavBar";
import ProjectPreviewCard from "@/components/ui/Project-preview-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex flex-col min-h-screen">
        <MyNavBar />
        <MyHero />
        <ProjectPreviewCard count={3} />
      </main>
    </div>
  );
}
