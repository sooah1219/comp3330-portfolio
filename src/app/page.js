export const revalidate = 0;
import MyHero from "@/components/ui/MyHeroSection";
import ProjectPreviewCard from "@/components/ui/Project-preview-card";
import GitHubCalendar from "@/components/ui/github-calendar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex flex-col min-h-screen">
        <MyHero />
        <ProjectPreviewCard count={3} />
        <section className="mt-10 px-4">
          <GitHubCalendar />
        </section>
      </main>
    </div>
  );
}
