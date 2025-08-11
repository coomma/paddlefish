import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unstable_setRequestLocale } from "next-intl/server";

export default function DetailsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Details</h1>
        <p className="text-lg text-foreground/80">Anatomy of a River Giant</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Physical Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
          <p>
            The Chinese Paddlefish was a truly remarkable creature, one of the largest freshwater fish in the world. Its most distinctive feature was its long, sword-like rostrum, or snout, which could account for up to a third of its total body length. This rostrum was covered in electroreceptors, which it used to detect the weak electrical fields of its prey, primarily small fish and crustaceans, in the murky waters of the Yangtze River.
          </p>
          <p>
            Adults could reportedly reach up to 7 meters (23 feet) in length and weigh several hundred kilograms, although individuals of this size were rare in its final decades. The body was smooth and largely scaleless, with a grayish color that helped it blend into its environment. It possessed a large, toothless mouth and small, poorly developed eyes, suggesting it relied more on its rostrum than sight for hunting.
          </p>
           <p>
            Its scientific name, <em>Psephurus gladius</em>, reflects its appearance: 'Psephurus' refers to its pebbly-skinned tail, and 'gladius' is Latin for 'sword', a clear reference to its prominent snout. This unique combination of features made it a top predator in its ecosystem and an icon of the Yangtze River's rich biodiversity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
