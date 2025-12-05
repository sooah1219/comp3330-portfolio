import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function MyHero() {
  return (
    <section className="w-full flex justify-center mt-8 px-4">
      <Card className="max-w-4xl w-full p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-35 h-35 relative rounded-full overflow-hidden border-2 shadow-md">
          <Image
            src="/images/sooah.png"
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <CardContent className="flex-1 space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold">
            Sooah Cho
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            I’m a full-stack web development student passionate about creating smooth, responsive, and user-focused experiences. Currently exploring Next.js, React, and cloud-based deployment with AWS.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}