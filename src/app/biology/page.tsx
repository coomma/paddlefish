import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BiologyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Biology</h1>
        <p className="text-lg text-foreground/80">The Life of a Yangtze Native</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Lifecycle and Ecology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
           <p>
            The Chinese Paddlefish was a potamodromous species, meaning it migrated long distances entirely within freshwater. They would spawn in the upper reaches of the Yangtze, in areas with fast-flowing water and gravel riverbeds, primarily between March and April. After hatching, the juveniles would drift downstream to the middle and lower sections of the river, where they would feed and mature.
          </p>
          <p>
            As a piscivore, the paddlefish primarily fed on other fish, as well as some crustaceans. Its unique electrosensory rostrum was its primary tool for locating prey in the often-turbid waters of the Yangtze. This made it an apex predator, playing a crucial role in maintaining the health and balance of the river's fish populations.
          </p>
          <p>
            The species was slow-growing and late to mature, with females reaching sexual maturity around age seven or eight. This slow reproductive rate made the population highly vulnerable to overfishing and habitat disruption. The combination of these biological traits with intense human pressures on the Yangtze River ecosystem created a perfect storm that ultimately led to its demise.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
