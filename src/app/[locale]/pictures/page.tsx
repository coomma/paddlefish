import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";

const images = [
  { src: "https://placehold.co/600x400.png", alt: "Chinese Paddlefish illustration", hint: "paddlefish illustration" },
  { src: "https://placehold.co/600x400.png", alt: "Yangtze River", hint: "Yangtze river" },
  { src: "https://placehold.co/600x400.png", alt: "Preserved specimen of a Chinese Paddlefish", hint: "fish museum" },
  { src: "https://placehold.co/600x400.png", alt: "A historical photo of a fisherman with a Paddlefish", hint: "vintage fishing" },
  { src: "https://placehold.co/600x400.png", alt: "Artistic rendering of a swimming Paddlefish", hint: "fish underwater" },
  { src: "https://placehold.co/600x400.png", alt: "The misty mountains along the Yangtze", hint: "river china" },
];

export default function PicturesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Pictures</h1>
        <p className="text-lg text-foreground/80">Fading Images of a Lost Giant</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  data-ai-hint={image.hint}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
