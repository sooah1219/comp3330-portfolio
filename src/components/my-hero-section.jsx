import { defaultHeroContent, getHero, HERO_PLACEHOLDER_AVATAR } from "@/lib/db";

export const revalidate = 0;
export default async function MyHeroSection() {
  const hero = await getHero();
  const avatar = hero?.avatar || HERO_PLACEHOLDER_AVATAR;
  const fullName = hero?.fullName || defaultHeroContent.fullName;
  const shortDescription = hero?.shortDescription || defaultHeroContent.shortDescription;
  const longDescription = hero?.longDescription || defaultHeroContent.longDescription;

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-start gap-6">
        <img
          src={avatar}
          alt={fullName}
          className="w-28 h-28 rounded-full border object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <p className="text-gray-600 mt-1">{shortDescription}</p>
          <p className="mt-4 leading-7">{longDescription}</p>
        </div>
      </div>
    </section>
  );
}
