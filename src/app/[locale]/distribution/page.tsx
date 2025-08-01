import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function DistributionPage() {
  return (
    <div className="max-w-4xl mx-auto">
       <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Distribution</h1>
        <p className="text-lg text-foreground/80">The Lost Kingdom of a River King</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Historical Habitat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            The Chinese Paddlefish was endemic to the Yangtze River basin in China, the longest river in Asia. Its historical range extended throughout the main stem of the river and into some of its larger tributaries and connected lakes, such as Dongting Lake and Poyang Lake. The fish undertook long-distance migrations, with distinct spawning grounds in the upper reaches of the river and feeding areas in the lower and middle sections.
          </p>
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/800x500.png"
              alt="Map of the Yangtze River showing the historical distribution of the Chinese Paddlefish"
              width={800}
              height={500}
              data-ai-hint="Yangtze river map"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-foreground/90 leading-relaxed">
            The construction of dams, most notably the Gezhouba Dam and the Three Gorges Dam, fragmented this vast habitat. These structures blocked the paddlefish's migratory routes, separating the adult fish in the lower river from their critical spawning grounds upstream. This fragmentation is considered the primary driver of the species' decline and eventual extinction, effectively shrinking its world until it vanished completely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
