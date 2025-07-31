import DaysSinceExtinction from '@/components/DaysSinceExtinction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const timelineEvents = [
  {
    date: 'July 21, 2022',
    description: 'The International Union for Conservation of Nature (IUCN) declared the Chinese Paddlefish (Psephurus gladius) extinct.',
  },
  {
    date: '2020',
    description: 'The Yangtze River Fisheries Research Institute, part of the Chinese Academy of Fishery Sciences, officially declared the Chinese Paddlefish extinct.',
  },
  {
    date: '2017-2018',
    description: 'The Yangtze River Fisheries Research Institute conducted extensive surveys in the Yangtze River but found no Chinese Paddlefish. A 2019 paper suggested the species might be extinct, estimating extinction occurred between 2005 and 2010, and functional extinction possibly by 1993.',
  },
  {
    date: 'January 24, 2003',
    description: 'The last confirmed sighting of a Chinese Paddlefish. Fishermen in Nanxi County, Yibin City, accidentally caught one. It was released but never seen again.',
  },
  {
    date: '1995',
    description: 'Juvenile Chinese Paddlefish were last seen.',
  },
  {
    date: '1980s',
    description: 'Sightings became scarce; for example, only 32 Chinese Paddlefish were caught in 1985.',
  },
  {
    date: '1970s',
    description: 'The estimated annual catch of Chinese Paddlefish was around 25 tons, indicating a once-thriving population.',
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">Psephurus: A Requiem</h1>
        <p className="text-lg text-foreground/80">In memory of the Chinese Paddlefish, lost to the river of time.</p>
        <DaysSinceExtinction />
      </header>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">A Silent River: The Path to Extinction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4">
                    <h3 className="font-headline text-xl font-semibold text-accent">{event.date}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/90 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && <Separator className="mt-8" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
