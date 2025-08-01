import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const references = [
  {
    title: "Chinese paddlefish - Wikipedia",
    url: "https://en.wikipedia.org/wiki/Chinese_paddlefish",
    description: "The comprehensive Wikipedia article on the species."
  },
  {
    title: "IUCN Red List - Psephurus gladius",
    url: "https://www.iucnredlist.org/species/18428/8267432",
    description: "The official extinction assessment by the International Union for Conservation of Nature."
  },
  {
    title: "How the Chinese paddlefish, one of the world's largest fish, went extinct - National Geographic",
    url: "https://www.nationalgeographic.com/animals/article/chinese-paddlefish-one-of-worlds-largest-fish-extinct",
    description: "In-depth article from National Geographic on the extinction."
  },
   {
    title: "Extinction of one of the world's largest freshwater fishes: Lessons for conserving the endangered Yangtze fauna",
    url: "https://www.sciencedirect.com/science/article/pii/S004896971934942X",
    description: "The 2019 scientific paper discussing the species' extinction."
  }
];

export default function ReferencesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">References</h1>
        <p className="text-lg text-foreground/80">Further Reading and Sources</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {references.map((ref, index) => (
              <li key={index} className="border-b pb-6 last:border-b-0">
                <a 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-start gap-3"
                >
                  <ExternalLink className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary group-hover:underline">{ref.title}</h3>
                    <p className="text-sm text-foreground/80">{ref.description}</p>
                    <p className="text-xs text-accent mt-1 break-all">{ref.url}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
