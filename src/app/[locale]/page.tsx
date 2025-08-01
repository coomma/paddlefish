import DaysSinceExtinction from '@/components/DaysSinceExtinction';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('HomePage');

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">{t('title')}</h1>
        <p className="text-lg text-foreground/80">{t('subtitle')}</p>
        <DaysSinceExtinction />
      </header>
      
      <Card className="shadow-lg mb-12">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">{t('timelineTitle')}</CardTitle>
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

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Poems of Remembrance</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="text-left">
                  <h3 className="font-headline text-xl font-semibold text-primary">Elegy for the River King</h3>
                  <p className="text-sm text-muted-foreground">江上之王挽歌</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-foreground/90 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-headline text-lg font-semibold mb-4">Elegy for the River King</h4>
                    <p>
                      Beneath the veil of morning mist, so wide,
                      Where Yangtze’s silver serpents used to glide,
                      A ghost now stirs where once a monarch reigned—
                      The blade-nosed sovereign, lost, unnamed.

                      From cradle streams of jade and loam he came,
                      A silent titan, elder to our name.
                      For eons swam through silt and storm and sun,
                      Before the plow, before the gun.

                      But walls of stone rose firm against the tide,
                      And stilled the heart where freedom used to bide.
                      No path remained for him to seek the dawn,
                      His course was blocked, his purpose gone.

                      No bells were rung when last his shadow passed,
                      No flute-song marked the moment—faint, and fast.
                      He faded not in fury, nor in flame,
                      But in the hush of those who bear the blame.

                      O paddlefish, with ancient oar-like grace,
                      Who carved the dark with time upon your face—
                      The river’s breath grows heavy now with dust,
                      Its silence steeped in broken trust.

                      Did we not know the price of what we claimed?
                      The cost of progress, proudly named?
                      The dams we build, the nets we cast with pride,
                      Have stitched shut Nature’s wounded side.

                      Now mourn, O hills! And weep, O midnight rains!
                      Let lotus bloom where once he broke his chains.
                      For what we lose is more than fish or fin—
                      We bury worlds we cannot dream again.

                      So mark this verse with sorrow and with shame,
                      Not just his death, but our own flame.
                      Lest rivers run with elegy alone,
                      And silence be the seed we've sown.
                    </p>
                    <p className="mt-4 text-sm italic">—In memory of the last of a lineage older than empires</p>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-semibold mb-4">江上之王挽歌</h4>
                    <p>
                      云开雾散江水初，
                      曾有剑吻划苍图。
                      千年孤影潜波下，
                      王者沉浮竟无书。

                      出自泥沙生翠壤，
                      远古江流是故乡。
                      既见洪荒亦见人，
                      不争朝夕不惧霜。

                      石封长道断归程，
                      梦回溯源已无声。
                      曾经千里一念行，
                      今朝孤影失天命。

                      无钟鸣时终别去，
                      无笛哀时魂归墟。
                      非因烈火非刀兵，
                      只为冷眼与踟蹰。

                      桨吻如舟斩水深，
                      万川千浪不留痕。
                      江心今作沉沙静，
                      徒余哀唱与悲音。

                      岂不知彼何所值？
                      利欲轻抛山与石。
                      高坝横江网遍天，
                      无声处是生灵泣。

                      哀哉山！泣哉雨！
                      怜彼鲟逝无归路。
                      莲花代替自由身，
                      浮华终葬清江墓。

                      非一鱼之殁也哉，
                      人心火种亦将衰。
                      若无悔意存胸臆，
                      江河终作断肠碑。
                    </p>
                     <p className="mt-4 text-sm italic">—谨以此诗悼念那位远古王者，悄然消逝于人类文明的洪流之中。</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="text-left">
                  <h3 className="font-headline text-xl font-semibold text-primary">Elegy for the Paddlefish</h3>
                   <p className="text-sm text-muted-foreground">祭中华鲟之挽歌</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-foreground/90 leading-relaxed">
                 <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-headline text-lg font-semibold mb-4">Elegy for the Paddlefish</h4>
                      <p>
                        Beneath jade currents, long you dreamed,
                        A silver blade in river's seam.
                        When dynasties rose, you still would glide—
                        A ghost of ages sanctified.

                        Your snout, a compass for the tide,
                        Through murky deeps you silent plied;
                        No monarch ruled the Yangtze's breath
                        As wholly as your swimming death.

                        Then concrete came with noble aim,
                        To tame the flood and forge acclaim.
                        But you, whose lore was written deep,
                        Were sentenced by the dam’s still sleep.

                        The fishing nets were cast too wide,
                        And none heard how the legends died.
                        No toll was rung, no tear was spilled—
                        The silence louder than the guilt.

                        Extinct, they said, as though a word
                        Could bear the weight of what occurred.
                        Yet rivers run and winds still cry
                        Where ancient fins once cut the sky.

                        Shall progress always wear this face—
                        Of vanished grace and empty place?
                        Or dare we learn from bones and silt
                        To mend what time and greed have split?
                      </p>
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-semibold mb-4">祭中华鲟之挽歌</h4>
                       <p>
                        玉水之下长梦幽，
                        银刃破浪影悠悠。
                        王朝更迭君自若，
                        万古沉游未曾休。

                        长吻为舟探潮生，
                        静履江心不鸣声。
                        无帝能掌长江息，
                        唯汝领游生死情。

                        水泥筑坝图昌盛，
                        平洪造福人称圣。
                        唯汝命系河之魂，
                        一坝封喉永沉静。

                        渔网过广影踪稀，
                        无人问史终散离。
                        铃声不响泪未流，
                        寂静更显人心欺。

                        灭绝一词淡轻描，
                        岂承岁月深重凋。
                        江河尚流风犹悲，
                        翼影曾飞今难邀。

                        进步若常佩此容，
                        空余遗址与虚空。
                        骨骸泥沙俱是证，
                        贪欲何时不再重？
                      </p>
                    </div>
                 </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                 <div className="text-left">
                  <h3 className="font-headline text-xl font-semibold text-primary">A Silver Sovereign</h3>
                  <p className="text-sm text-muted-foreground">悼白鲟</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-foreground/90 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-headline text-lg font-semibold mb-4">A Silver Sovereign</h4>
                    <p>
                      Where Yangtze's currents, ochre, deep, and old,
                      A silver sovereign, a tale untold,
                      Once cleaved the waters with a tusk of jade,
                      A king of fishes, ancient and unswayed.
                      For ages past, you swam the river's length,
                      A silent dynasty of grace and strength.

                      But mortal pride, in walls of steel and stone,
                      Arose to claim the river for its own.
                      The Dragon's spine, the water's sacred heart,
                      By cold ambition was thus torn apart.
                      The path to birth, the journey of your kin,
                      Was sealed forever, never to begin.

                      You sought the spawning grounds, a futile quest,
                      Against the chains that put your blood to test.
                      While woven nets, a tapestry of greed,
                      Plucked out the last of your dwindling seed.
                      A lonely giant in the fading light,
                      Lost to the silence of eternal night.

                      The river flows, but with a hollow sound,
                      Upon the grave where you can not be found.
                      A ghost of silver in the water's gleam,
                      The final chapter of a shattered dream.
                      We tamed the flood, a victory to boast,
                      And in the triumph, mourn the life we lost.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-semibold mb-4">悼白鲟</h4>
                    <p>
                      万里长江，奔流亘古，
                      有兽名“鲟”，是为水主。
                      玉吻如剑，破浪穿雾，
                      鳞光银白，一族之祖。

                      凡人筑坝，骄矜自许，
                      天堑高悬，龙脉中阻。
                      归乡无路，产卵无处，
                      滔滔东流，从此殊途。

                      巨壁之下，徒劳往复，
                      血脉之痛，无处申诉。
                      更有贪网，竭泽而取，
                      孑然巨影，终归尘土。

                      江水悠悠，空闻呜咽，
                      君魂已逝，波光映月。
                      昔日霸主，今成传说，
                      后人兴叹，千古之绝。
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-headline text-xl font-semibold text-primary hover:no-underline">祭中华鲟之挽歌</AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-foreground/90 leading-relaxed text-center">
                <p>
                  长江不语，泪落无痕，
                  鲟影一逝，千载难寻。
                  黯黯江水，吞舟不响，
                  物换星移，鲟归何方？

                  君生古纪，溯流为王，
                  鳞甲如铠，尾击寒光。
                  千年濯濯，不惧风浪，
                  今日竟作，画中残章。

                  网兮何急？钩兮何殇？
                  江岸林立，无处为乡。
                  人声鼎沸，鲟声渺茫，
                  逝者如斯，哀莫能当。

                  一鱼之灭，非鱼之过，
                  世道翻覆，人心难托。
                  谁言兴利，竟忘其初，
                  祸起微澜，终成大祸。

                  云沉梦冷，钟未敲响，
                  断鳍残尾，空余悲怆。
                  吾辈立祭，不为虚妄，
                  但愿来者，不复覆往。
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
