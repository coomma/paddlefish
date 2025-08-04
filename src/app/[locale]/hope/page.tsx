import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function HopePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">A Glimmer of Hope</h1>
        <p className="text-lg text-foreground/80">Can technology turn back the clock on extinction?</p>
      </header>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">De-extinction: Science Fiction to Science Fact?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/800x400.png"
              alt="Artistic representation of DNA sequencing and genetic engineering"
              width={800}
              height={400}
              data-ai-hint="dna sequencing"
              className="w-full h-auto object-cover"
            />
          </div>
           <p>
            The concept of "de-extinction" — bringing an extinct species back to life — has long been the stuff of science fiction. However, recent advancements in genetic engineering, spearheaded by companies like Colossal Biosciences, are turning this dream into a potential reality.
          </p>
           <p>
            Colossal, a US-based biotechnology company, has famously embarked on ambitious projects to resurrect species like the Woolly Mammoth and the Tasmanian Tiger (Thylacine). More recently, they announced progress in their project to bring back the dire wolf, a formidable predator of the Pleistocene epoch. Their work involves using cutting-edge CRISPR gene-editing technology to modify the DNA of a living relative (in the dire wolf's case, the gray wolf) to match the genetic blueprint of the extinct species, obtained from preserved specimens.
          </p>
           <p>
            While the result is technically a proxy—a new creature that is genetically and physically almost identical to the original—it represents a monumental leap in conservation and genetics. It opens a tantalizing question: if we can do it for the dire wolf, could we do it for the Chinese Paddlefish?
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">The Dream of a Revived River King</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
           <p>
            The path to reviving the Chinese Paddlefish is fraught with challenges. The primary obstacle is the lack of well-preserved DNA. Unlike mammoths frozen in permafrost, aquatic creatures decompose rapidly, making the recovery of a complete genome incredibly difficult. Scientists would need to find viable cell nuclei from a preserved specimen.
          </p>
          <p>
            If a viable genome could be sequenced, the next step would be to find a suitable living surrogate. The closest living relative is the American Paddlefish. Its eggs could potentially be edited with the Chinese Paddlefish's genetic code and brought to term. 
          </p>
          <p>
            Even if successful, the ultimate challenge remains: its habitat. The Yangtze River has been irrevocably changed by dams and pollution. A revived paddlefish would need a safe, restored, and connected river system to thrive. Therefore, the dream of de-extinction is not just a scientific one; it is an ecological one. It forces us to confront the reasons the species vanished in the first place.
          </p>
          <p className="font-semibold text-primary">
            Perhaps the true hope lies not just in resurrecting the paddlefish itself, but in the possibility that the effort could inspire the large-scale restoration of the Yangtze ecosystem, ensuring that no more river kings are lost to the pages of history.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
