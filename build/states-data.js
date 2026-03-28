/* ============================================================
   ICF INSIDER — State Page Data
   Content for all 50 US state landing pages.
   Used by generate-states.js to build /states/[slug]/index.html
   ============================================================ */

// Climate groups drive the primary ICF selling point per state
const CLIMATE = {
  HURRICANE:  'hurricane',
  TORNADO:    'tornado',
  COLD:       'cold',
  HOT_DRY:   'hot_dry',
  PACIFIC:    'pacific',
  MIXED:      'mixed',
};

const states = [

  // ── HURRICANE / STORM COAST ──────────────────────────────
  {
    name: 'Florida', slug: 'florida', abbr: 'FL', climate: CLIMATE.HURRICANE,
    tagline: 'Hurricane-resistant homes built to outlast Florida\'s storm season.',
    intro: 'Florida homeowners build in one of the most demanding climates in the country. With Atlantic hurricanes, Gulf storms, extreme heat, and relentless humidity, conventional wood-frame construction faces constant pressure — from the day it goes up. ICF construction addresses every one of these challenges with a single wall system.',
    intro2: 'An ICF home in Florida is not just stronger in a storm — it costs significantly less to cool, qualifies for meaningful homeowner insurance discounts, and resists the moisture and mold that are chronic problems for wood-framed buildings in Florida\'s humid environment.',
    bullets: [
      'Withstands Category 5 hurricane-force winds exceeding 200 mph',
      '50–70% lower energy bills in Florida\'s year-round heat and humidity',
      'Qualifies for significant homeowner insurance discounts in high-wind zones',
      'Resistant to mold, moisture, and the pests that thrive in Florida\'s climate',
      'Compliant with and exceeding Florida Building Code wind load requirements',
    ],
    faqs: [
      { q: 'Is ICF construction approved under the Florida Building Code?', a: 'Yes. ICF construction meets and in many cases exceeds Florida Building Code requirements, including high-velocity hurricane zone (HVHZ) standards in South Florida. Major ICF brands publish Florida product approvals. Always verify your contractor is using a code-approved system for your county.' },
      { q: 'Does an ICF home qualify for lower homeowner insurance in Florida?', a: 'In most cases, yes. Florida insurers offer discounts for concrete construction because ICF homes sustain dramatically less damage in hurricanes. Savings vary by insurer and location, but homeowners in coastal counties have reported significant premium reductions. Ask your insurer specifically about concrete construction discounts.' },
      { q: 'How much does an ICF home cost in Florida?', a: 'ICF homes in Florida typically run 5–12% more than comparable wood-frame construction upfront, or roughly $160–$220+ per square foot for above-grade walls. Many Florida owners recover this premium within 8–12 years through energy savings and lower insurance costs.' },
      { q: 'Which parts of Florida use ICF construction most?', a: 'ICF construction is most common in coastal areas where hurricane risk is highest — South Florida, the Tampa Bay area, the Gulf Coast, and the Space Coast. However, ICF is used across the state, including Central Florida and the Panhandle, for its energy and comfort benefits.' },
    ],
  },

  {
    name: 'Louisiana', slug: 'louisiana', abbr: 'LA', climate: CLIMATE.HURRICANE,
    tagline: 'Storm-resistant ICF construction built for Louisiana\'s hurricane coast.',
    intro: 'Louisiana sits directly in the path of Gulf Coast hurricanes and experiences some of the most intense tropical weather in the country. After Hurricane Katrina and subsequent storms, Louisiana homeowners and builders have increasingly turned to ICF as the standard for resilient construction.',
    intro2: 'Beyond storm resistance, ICF addresses Louisiana\'s extreme summer heat and humidity with dramatically better energy performance. Lower energy bills, reduced storm damage, and the thermal comfort of a concrete home make ICF a compelling choice across the state.',
    bullets: [
      'Engineered to withstand Category 4 and 5 hurricane-force winds',
      '50–70% reduction in cooling costs in Louisiana\'s hot, humid summers',
      'Reduced flood damage potential with concrete\'s superior moisture resistance',
      'Qualifies for insurance discounts available for concrete construction',
      'Resistant to the mold and wood rot endemic to coastal Louisiana climates',
    ],
    faqs: [
      { q: 'Is ICF a common building method in Louisiana?', a: 'ICF adoption in Louisiana has grown significantly since Hurricane Katrina in 2005, particularly in coastal parishes. Contractors experienced in ICF can be found across the state, with the highest concentration in the New Orleans metro, Baton Rouge, and coastal communities.' },
      { q: 'How does ICF perform against flooding?', a: 'While no wall system makes a home flood-proof, ICF walls are far more resistant to flood damage than wood frame. Concrete does not rot, swell, or harbor mold the way wet wood does. Many Louisiana homeowners combine ICF walls with elevated foundations for comprehensive flood resilience.' },
      { q: 'What does an ICF home cost in Louisiana?', a: 'ICF construction in Louisiana typically costs 5–15% more than wood frame, or $155–$215+ per square foot for above-grade walls. Coastal areas with higher demand for ICF contractors tend toward the lower end of the premium due to competition.' },
    ],
  },

  {
    name: 'South Carolina', slug: 'south-carolina', abbr: 'SC', climate: CLIMATE.HURRICANE,
    tagline: 'ICF homes built to handle South Carolina\'s hurricanes and coastal storms.',
    intro: 'South Carolina\'s coastline — from Myrtle Beach to Hilton Head — faces direct hurricane risk every season. Inland areas are not immune either, as storms weaken slowly and bring damaging winds deep into the state. ICF construction is increasingly the choice of homeowners who want a structure that can genuinely withstand what South Carolina\'s weather delivers.',
    intro2: 'Coupled with the state\'s hot, humid summers that drive up cooling costs for wood-framed homes, ICF\'s energy efficiency and storm resilience create a compelling long-term value case for South Carolina buyers.',
    bullets: [
      'Concrete walls that withstand hurricane-force winds along the coast and inland',
      'Significant energy savings in South Carolina\'s humid subtropical climate',
      'Lower homeowner insurance premiums for concrete construction in coastal counties',
      'Resistance to the mold and termite damage common in South Carolina\'s climate',
      'Long-term durability with minimal maintenance compared to wood frame',
    ],
    faqs: [
      { q: 'Are there ICF contractors in coastal South Carolina?', a: 'Yes. ICF contractors are active in coastal South Carolina, including the Grand Strand, Charleston, and the Lowcountry. Experience levels vary — ask specifically about a contractor\'s number of completed ICF projects and request references from recent builds.' },
      { q: 'Does ICF meet South Carolina\'s coastal building codes?', a: 'ICF construction meets South Carolina building code requirements, including coastal wind and storm provisions. South Carolina follows the International Building Code with state amendments. Major ICF brands are approved under these standards.' },
      { q: 'How much more does an ICF home cost in South Carolina?', a: 'Expect a 5–15% upfront premium over comparable wood frame construction. In coastal areas where storm-resistant construction is standard, the premium is often toward the lower end as more contractors are equipped to build with ICF competitively.' },
    ],
  },

  {
    name: 'North Carolina', slug: 'north-carolina', abbr: 'NC', climate: CLIMATE.HURRICANE,
    tagline: 'ICF construction for North Carolina\'s coastal storms and inland tornadoes.',
    intro: 'North Carolina faces a unique double threat: coastal counties experience direct hurricane strikes while the Piedmont and western regions see significant tornado activity each year. ICF construction addresses both threats with the same reinforced concrete wall system — a significant advantage over wood-framed alternatives.',
    intro2: 'North Carolina\'s growing population and active residential construction market means ICF contractors are increasingly available across the state. Whether you\'re building on the Outer Banks or in the Research Triangle, ICF delivers strength and energy performance that wood frame cannot match.',
    bullets: [
      'Hurricane-rated walls for coastal and eastern North Carolina counties',
      'Tornado-resistant construction for the Piedmont and western regions',
      '50–70% energy savings in North Carolina\'s mixed hot-and-cold climate',
      'Significant reduction in long-term maintenance and storm repair costs',
      'Insurance discounts available for concrete construction in wind-exposed areas',
    ],
    faqs: [
      { q: 'Is ICF popular in North Carolina?', a: 'ICF construction has grown steadily in North Carolina, particularly in coastal areas and high-growth markets like the Charlotte metro and the Triangle. The state has an established network of ICF-trained contractors.' },
      { q: 'How does ICF handle both hurricanes and tornadoes?', a: 'ICF walls consist of reinforced concrete engineered to withstand winds exceeding 200 mph. This rating is relevant for both hurricane-force winds and the debris impact associated with tornadoes. No above-grade wall system is tornado-proof, but ICF provides significantly more protection than wood frame.' },
      { q: 'What is the cost premium for ICF in North Carolina?', a: 'ICF construction in North Carolina typically runs 5–15% above comparable wood frame. Urban markets like Charlotte and Raleigh-Durham often have more competitive ICF contractor pricing than rural areas.' },
    ],
  },

  {
    name: 'Georgia', slug: 'georgia', abbr: 'GA', climate: CLIMATE.HURRICANE,
    tagline: 'ICF homes in Georgia — stronger, quieter, and dramatically more efficient.',
    intro: 'Georgia\'s coastal counties along the Atlantic face direct hurricane exposure, while the northern and central regions experience periodic severe storms and tornado events. For the state\'s rapidly growing residential construction market — particularly in the Atlanta metro and coastal Savannah corridor — ICF provides resilience that wood frame simply cannot deliver.',
    intro2: 'Georgia\'s hot, humid summers make energy efficiency a primary concern for homeowners. ICF walls dramatically outperform wood frame on thermal performance, reducing cooling loads by 50 percent or more and paying back the upfront premium over the life of the home.',
    bullets: [
      'Storm and hurricane resistance for Georgia\'s coastal counties',
      '50–70% reduction in cooling costs in Georgia\'s hot, humid summers',
      'Quieter interiors — ICF\'s concrete mass blocks outside noise significantly',
      'Long-term durability with no rot, warp, or termite vulnerability',
      'Growing availability of ICF contractors in the Atlanta metro and statewide',
    ],
    faqs: [
      { q: 'Is ICF construction available in the Atlanta metro area?', a: 'Yes. ICF contractors are active in the Atlanta metro and across Georgia. The state\'s strong construction market has supported growth in ICF-capable contractors, particularly for custom homes and high-performance residential builds.' },
      { q: 'How does ICF perform in Georgia\'s heat and humidity?', a: 'Very well. ICF\'s continuous foam insulation and concrete thermal mass keep interior temperatures stable even in Georgia\'s extreme summer heat. Homeowners consistently report 50–70% reductions in cooling costs compared to their previous wood-framed homes.' },
      { q: 'What does ICF cost in Georgia?', a: 'ICF construction in Georgia typically runs $155–$210+ per square foot for above-grade walls, a 5–12% premium over comparable wood frame. The Atlanta metro\'s competitive contractor market often produces tighter pricing than rural areas of the state.' },
    ],
  },

  {
    name: 'Alabama', slug: 'alabama', abbr: 'AL', climate: CLIMATE.HURRICANE,
    tagline: 'ICF homes built for Alabama\'s tornadoes, Gulf storms, and summer heat.',
    intro: 'Alabama faces serious weather threats on two fronts: Gulf Coast counties experience tropical storms and hurricanes from the south, while the northern part of the state sees some of the most active tornado conditions in the country. ICF construction is one of the few wall systems that addresses both threats effectively.',
    intro2: 'Combined with Alabama\'s hot, humid summers that punish heating and cooling budgets in wood-framed homes, ICF delivers a clear long-term value advantage — resilience when it matters and efficiency every day.',
    bullets: [
      'Hurricane and tropical storm resistance for Gulf Coast counties',
      'Tornado-rated construction for northern Alabama and Tornado Alley',
      '50–70% energy savings in Alabama\'s long, hot summers',
      'Superior moisture and mold resistance in Alabama\'s humid climate',
      'Reduced long-term maintenance compared to wood frame',
    ],
    faqs: [
      { q: 'Are ICF contractors available in Alabama?', a: 'Yes, ICF contractors operate across Alabama, with concentrations in the Birmingham metro, the Gulf Coast, and Huntsville. Ask any contractor for completed ICF project references specific to Alabama\'s climate conditions.' },
      { q: 'Can an ICF home survive a tornado?', a: 'No above-grade structure is completely tornado-proof, but ICF walls provide significantly greater protection than wood frame against tornado-force winds and flying debris. EF3-rated and below tornadoes have left ICF structures standing where wood-frame neighbors were destroyed.' },
      { q: 'How much does ICF construction cost in Alabama?', a: 'ICF construction in Alabama typically costs 5–15% more than comparable wood frame, with above-grade walls running $150–$210+ per square foot. Gulf Coast areas with higher ICF demand tend to have more competitive contractor pricing.' },
    ],
  },

  {
    name: 'Mississippi', slug: 'mississippi', abbr: 'MS', climate: CLIMATE.HURRICANE,
    tagline: 'Storm-resilient ICF construction for Mississippi\'s Gulf Coast and beyond.',
    intro: 'Mississippi\'s Gulf Coast has experienced firsthand the destruction that major hurricanes can inflict on wood-framed construction. Katrina reshaped how coastal Mississippi homeowners and builders think about resilience, and ICF has emerged as a proven alternative for owners who want a home that can actually survive the next major storm.',
    intro2: 'Beyond the coast, Mississippi\'s heat and humidity challenge the energy performance of conventional construction statewide. ICF\'s continuous insulation delivers relief on energy bills year-round.',
    bullets: [
      'Hurricane-rated construction for Mississippi\'s Gulf Coast counties',
      '50–70% energy savings in Mississippi\'s hot, humid climate',
      'Proven storm performance in one of the most hurricane-active US coastlines',
      'Resistance to the mold and moisture damage common after coastal flooding',
      'Long-term durability with no wood rot or termite vulnerability',
    ],
    faqs: [
      { q: 'Has ICF been tested by real Gulf Coast hurricanes?', a: 'Yes. After Hurricane Katrina and subsequent storms, ICF homes along the Gulf Coast consistently outperformed wood-framed neighbors. Published case studies and FEMA reports document ICF structures surviving storms that destroyed conventional wood-frame construction around them.' },
      { q: 'What does ICF cost in Mississippi?', a: 'ICF construction in Mississippi typically runs 5–15% above wood frame, with above-grade walls in the $150–$205+ per square foot range. The Gulf Coast market has more established ICF contractor availability than inland areas.' },
      { q: 'Is ICF construction growing in Mississippi?', a: 'Yes. Post-Katrina rebuilding accelerated ICF adoption on the Gulf Coast, and that knowledge base has spread across the state. ICF contractors are increasingly available in Jackson, Hattiesburg, and other major markets.' },
    ],
  },

  {
    name: 'Virginia', slug: 'virginia', abbr: 'VA', climate: CLIMATE.HURRICANE,
    tagline: 'ICF homes for Virginia — coastal storms, cold winters, and everything between.',
    intro: 'Virginia is a state of climate extremes. Coastal Virginia and Hampton Roads face direct hurricane risk, while the Shenandoah Valley and Northern Virginia experience significant snowfall and cold. ICF construction performs exceptionally well across all of these conditions — providing storm resistance on the coast and superior thermal performance in the mountains and suburbs.',
    intro2: 'Virginia\'s strong residential construction market, particularly in Northern Virginia and the Richmond metro, has supported a growing base of ICF-experienced contractors. The state represents one of the mid-Atlantic\'s most active markets for high-performance custom home construction.',
    bullets: [
      'Hurricane and nor\'easter resistance for Virginia\'s Tidewater and coastal regions',
      '50–70% reduction in heating and cooling costs across Virginia\'s mixed climate',
      'Excellent performance in Virginia\'s cold winters — no drafts, consistent warmth',
      'Resistant to the moisture and storm surge damage coastal Virginia experiences',
      'Growing contractor availability in Northern Virginia, Richmond, and Hampton Roads',
    ],
    faqs: [
      { q: 'Is ICF popular in Northern Virginia and the DC suburbs?', a: 'Yes. Northern Virginia has a strong custom home market and an established base of ICF-experienced contractors. The area\'s discerning buyers and high land values make the upfront ICF premium an easier case — especially given the long-term energy savings.' },
      { q: 'How does ICF handle Virginia\'s cold winters?', a: 'Exceptionally well. ICF\'s continuous foam insulation eliminates the thermal bridging and air infiltration that make wood-framed homes drafty in cold weather. ICF homeowners in Virginia consistently report dramatically more comfortable winters with significantly lower heating bills.' },
      { q: 'What is the cost premium for ICF in Virginia?', a: 'ICF construction in Virginia typically runs 5–15% above comparable wood frame, with above-grade walls in the $160–$225+ per square foot range. Northern Virginia\'s higher labor costs put pricing toward the upper end, while rural areas of the state tend to be lower.' },
    ],
  },

  // ── TORNADO ALLEY / SEVERE STORM ────────────────────────
  {
    name: 'Texas', slug: 'texas', abbr: 'TX', climate: CLIMATE.TORNADO,
    tagline: 'ICF construction for Texas — tornado-proof walls and energy savings in extreme heat.',
    intro: 'Texas presents two distinct challenges for homeowners: the Gulf Coast faces hurricane-force storms, while Central and North Texas sit directly in Tornado Alley — one of the most active severe weather corridors in the world. No other wall system addresses both threats as effectively as reinforced concrete ICF construction.',
    intro2: 'Add to this Texas\'s extreme summer temperatures — routinely above 100°F across much of the state — and ICF\'s superior thermal mass and insulation become a daily financial advantage. Texas homeowners report 50–70% reductions in cooling costs compared to wood-framed construction, which is one of the most compelling economic arguments for ICF in a state with high energy consumption.',
    bullets: [
      'Tornado-resistant walls for Central and North Texas in the heart of Tornado Alley',
      'Hurricane protection for Texas Gulf Coast homes in the Corpus Christi–Houston corridor',
      '50–70% reduction in cooling costs during Texas\'s extreme summer heat',
      'Qualifies for insurance discounts for storm-resistant construction',
      'Long-term durability with no rot, warp, or termite vulnerability',
    ],
    faqs: [
      { q: 'Can an ICF home survive a Texas tornado?', a: 'ICF walls are significantly more tornado-resistant than wood frame. While no above-grade structure is guaranteed to survive a direct hit from an EF5 tornado, ICF homes have survived EF3 and EF4 storms that destroyed wood-framed structures nearby. Reinforced concrete construction provides the closest thing to a safe room for the entire house.' },
      { q: 'How does ICF perform in Texas summers?', a: 'ICF\'s thermal mass and continuous insulation keep interior temperatures stable even during Texas\'s extreme summer heat. The concrete absorbs heat during the day and releases it slowly, dramatically reducing the load on air conditioning systems. Most Texas ICF homeowners report 50–70% lower cooling bills.' },
      { q: 'How much does ICF construction cost in Texas?', a: 'ICF construction in Texas typically costs 5–15% more than comparable wood frame, with above-grade walls running $150–$215+ per square foot. The Dallas-Fort Worth, Houston, Austin, and San Antonio metros have the most competitive ICF contractor markets in the state.' },
      { q: 'Are there ICF contractors in Texas?', a: 'Yes. Texas has one of the largest ICF contractor bases in the country, driven by both the storm-resilience demand in coastal and tornado-prone areas and the state\'s booming residential construction market. All major ICF brands have certified contractors across the state.' },
    ],
  },

  {
    name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK', climate: CLIMATE.TORNADO,
    tagline: 'ICF homes in Oklahoma — built to stand up to Tornado Alley.',
    intro: 'Oklahoma sits at the center of Tornado Alley and experiences more violent tornadoes per square mile than virtually anywhere else in the world. For Oklahoma homeowners, the question is not whether severe weather will hit — it\'s whether your home will still be standing when it does. ICF construction is the most effective above-grade wall system available for tornado-prone areas.',
    intro2: 'Oklahoma\'s extreme temperature swings — from brutal summer heat to frigid winter cold — also make ICF\'s continuous insulation and thermal mass a year-round energy advantage. Lower utility bills combined with dramatically improved storm resilience create a compelling long-term case for ICF across the state.',
    bullets: [
      'Reinforced concrete walls rated for tornado-force winds and debris impact',
      'The most effective above-grade wall system available for Tornado Alley construction',
      '50–70% energy savings across Oklahoma\'s extreme summer heat and winter cold',
      'Insurance discounts for storm-resistant construction are common in Oklahoma',
      'Long-term durability with no wood rot, warping, or termite risk',
    ],
    faqs: [
      { q: 'Is ICF the safest wall system for tornado zones?', a: 'ICF is among the strongest above-grade wall systems available. Reinforced concrete can withstand wind speeds exceeding 200 mph and flying debris at tornado velocities. While no wall system guarantees survival in an EF5 tornado, ICF dramatically outperforms wood frame in documented tornado events.' },
      { q: 'Do Oklahoma insurance companies offer discounts for ICF homes?', a: 'Many do. Insurance carriers recognize concrete construction as significantly more storm-resistant and frequently offer premium discounts for ICF homes. Contact your insurer specifically about discounts for reinforced concrete construction — savings can be substantial in Oklahoma\'s high-risk market.' },
      { q: 'What does ICF cost in Oklahoma?', a: 'ICF construction in Oklahoma typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$205+ per square foot range. The Oklahoma City and Tulsa metros have the most established ICF contractor availability in the state.' },
    ],
  },

  {
    name: 'Kansas', slug: 'kansas', abbr: 'KS', climate: CLIMATE.TORNADO,
    tagline: 'Build stronger in Kansas — ICF construction for Tornado Alley.',
    intro: 'Kansas is synonymous with Tornado Alley, and for good reason. The state experiences some of the most frequent and violent tornado activity in the world, particularly in the spring and early summer months. For Kansas homeowners building new, ICF construction offers the strongest above-grade wall system available in one of the world\'s most tornado-active states.',
    intro2: 'Kansas also experiences extreme temperature ranges — from 100°F summers on the plains to bitter cold winters — making ICF\'s year-round thermal performance as valuable as its storm resistance.',
    bullets: [
      'Tornado-resistant reinforced concrete walls for Kansas\'s Tornado Alley location',
      'Year-round energy savings in Kansas\'s extreme summer heat and winter cold',
      'Significant insurance discounts available for storm-resistant concrete construction',
      'No wood rot, warping, or termite vulnerability in Kansas\'s variable climate',
      'Long-term durability that outlasts wood-framed construction by decades',
    ],
    faqs: [
      { q: 'How do ICF homes perform in Kansas tornadoes?', a: 'ICF homes in Kansas have documented records of surviving tornado events that destroyed surrounding wood-frame construction. The reinforced concrete cores can withstand wind speeds and debris impacts that wood framing cannot resist. While an EF5 direct hit is an extreme scenario for any structure, ICF provides substantially more protection than conventional construction.' },
      { q: 'Are there ICF contractors in Kansas?', a: 'Yes. ICF contractors operate in Wichita, Kansas City (Kansas side), and across the state. Demand for storm-resilient construction has driven growth in ICF contractor availability in Kansas over the past decade.' },
      { q: 'What does ICF cost in Kansas?', a: 'Expect to pay 5–15% more than comparable wood frame construction. Above-grade ICF walls in Kansas typically run $140–$200+ per square foot depending on project scope and contractor availability in your area.' },
    ],
  },

  {
    name: 'Nebraska', slug: 'nebraska', abbr: 'NE', climate: CLIMATE.TORNADO,
    tagline: 'ICF construction in Nebraska — storm-ready walls and efficient year-round.',
    intro: 'Nebraska experiences significant tornado activity and severe thunderstorm events, particularly across the eastern and central parts of the state. Combined with Nebraska\'s extreme climate — hot summers, cold winters, and everything in between — ICF construction delivers both the storm resilience and the year-round energy performance that wood frame simply cannot match.',
    intro2: 'Nebraska\'s agricultural economy and relatively modest labor costs make ICF an accessible option across the state, not just in Omaha and Lincoln. Rural Nebraskans building custom homes increasingly choose ICF for its durability and long-term cost advantages.',
    bullets: [
      'Tornado and severe storm resistant construction for Nebraska\'s storm-active climate',
      'Year-round energy savings across Nebraska\'s extreme seasonal temperature range',
      'Long-term durability with no wood rot or pest vulnerability',
      'Lower long-term maintenance costs compared to wood-framed construction',
      'Growing contractor availability in Omaha, Lincoln, and across the state',
    ],
    faqs: [
      { q: 'What ICF brands are commonly used in Nebraska?', a: 'Multiple ICF brands are available in Nebraska, including Nudura, Fox Blocks, and Amvic, among others. Your choice of brand should be guided by your contractor\'s experience and certification — contractor skill matters more than brand selection in most cases.' },
      { q: 'How does ICF handle Nebraska\'s winter cold?', a: 'Very well. ICF\'s continuous insulation eliminates thermal bridging and air infiltration that make wood-framed homes costly to heat in Nebraska\'s winters. ICF homeowners across the northern plains consistently report 40–60% reductions in heating costs.' },
      { q: 'What does ICF construction cost in Nebraska?', a: 'ICF construction in Nebraska typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$200+ per square foot range. Omaha and Lincoln have the most competitive contractor markets; rural areas may pay a premium for contractor travel.' },
    ],
  },

  {
    name: 'Iowa', slug: 'iowa', abbr: 'IA', climate: CLIMATE.TORNADO,
    tagline: 'ICF homes in Iowa — tornado-resistant construction that pays off year-round.',
    intro: 'Iowa sits squarely within the active tornado belt of the central United States. Spring and summer bring frequent severe weather, and Iowa homeowners have seen firsthand how quickly conventional construction can be destroyed. ICF builds a wall system that can genuinely withstand what Iowa\'s storms deliver.',
    intro2: 'Iowa\'s cold winters and hot summers also make ICF\'s year-round thermal performance a significant financial advantage. Homeowners across Iowa report dramatic reductions in both heating and cooling costs after moving into ICF homes.',
    bullets: [
      'Tornado and severe storm resistant reinforced concrete walls',
      'Year-round energy savings across Iowa\'s cold winters and hot summers',
      'Long-term durability with no rot or warping in Iowa\'s wet, variable climate',
      'Insurance discounts for storm-resistant construction available in Iowa',
      'ICF contractors active in Des Moines, Cedar Rapids, and statewide',
    ],
    faqs: [
      { q: 'Is ICF construction growing in Iowa?', a: 'Yes. ICF adoption in Iowa has grown steadily as awareness of storm-resistant construction increases and as energy costs drive homeowners toward high-performance wall systems. The Des Moines and Cedar Rapids markets have the most established ICF contractor bases.' },
      { q: 'How does ICF perform in Iowa\'s cold winters?', a: 'ICF is an outstanding performer in cold climates. Continuous insulation and no thermal bridging mean ICF walls hold heat far more effectively than wood frame. Iowa homeowners consistently report 40–65% lower heating costs in ICF homes.' },
      { q: 'What does ICF cost in Iowa?', a: 'Above-grade ICF walls in Iowa typically run $140–$200+ per square foot, representing a 5–15% premium over comparable wood frame. The Des Moines metro generally offers the most competitive ICF contractor pricing in the state.' },
    ],
  },

  {
    name: 'Missouri', slug: 'missouri', abbr: 'MO', climate: CLIMATE.TORNADO,
    tagline: 'ICF construction in Missouri — stronger homes in the heart of storm country.',
    intro: 'Missouri is one of the most storm-active states in the country. The state experiences significant tornado activity across the Ozarks and the Missouri plains, and severe thunderstorms are a recurring feature of Missouri life. ICF construction provides Missouri homeowners with the most effective above-grade storm protection available in residential construction.',
    intro2: 'Missouri\'s four-season climate — hot, humid summers and cold winters — also makes ICF\'s year-round energy performance valuable. Homeowners in Kansas City, St. Louis, and across the state report substantial reductions in both heating and cooling bills after building with ICF.',
    bullets: [
      'Tornado-resistant construction for Missouri\'s active storm belt',
      'Year-round energy savings across Missouri\'s hot summers and cold winters',
      '50–70% lower energy bills compared to wood-framed construction',
      'Quieter interiors — concrete walls block the noise that Missouri storms generate',
      'Available ICF contractors in Kansas City, St. Louis, and across the state',
    ],
    faqs: [
      { q: 'Are ICF contractors available in Kansas City and St. Louis?', a: 'Yes. Both major Missouri metros have ICF-experienced contractors. Ask specifically about completed projects in your area and request references from recent ICF builds — experience level varies significantly between contractors.' },
      { q: 'How does ICF handle Missouri\'s spring storm season?', a: 'ICF walls are engineered to withstand winds exceeding 200 mph. During Missouri\'s active spring tornado and severe storm season, an ICF home provides significantly more protection than a wood-framed structure. Documented tornado events consistently show ICF homes outperforming wood-frame neighbors.' },
      { q: 'What does ICF cost in Missouri?', a: 'ICF construction in Missouri typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$205+ per square foot range. Kansas City and St. Louis both offer competitive ICF contractor markets.' },
    ],
  },

  {
    name: 'Arkansas', slug: 'arkansas', abbr: 'AR', climate: CLIMATE.TORNADO,
    tagline: 'ICF homes in Arkansas — storm-resistant construction for active tornado country.',
    intro: 'Arkansas experiences significant tornado and severe storm activity, particularly across the Arkansas River Valley and the central part of the state. ICF construction gives Arkansas homeowners a wall system that is genuinely engineered to withstand what the state\'s severe weather delivers — not just meet a minimum code standard.',
    intro2: 'Arkansas\'s warm, humid climate also makes ICF\'s energy performance a year-round advantage, reducing cooling loads in summer and heating costs in winter compared to conventional wood-framed construction.',
    bullets: [
      'Tornado and severe storm resistant reinforced concrete construction',
      'Energy savings year-round in Arkansas\'s humid, warm climate',
      'Resistance to moisture and mold in Arkansas\'s high-humidity environment',
      'Long-term durability with no wood rot or termite vulnerability',
      'ICF contractor availability across the state',
    ],
    faqs: [
      { q: 'How does ICF compare to a safe room in tornado protection?', a: 'ICF walls provide whole-house reinforced concrete protection, whereas a safe room protects only the occupants inside it. ICF walls are not equivalent to a FEMA-rated safe room in an EF5 scenario, but they dramatically outperform wood frame and provide far greater protection across the entire living space.' },
      { q: 'What does ICF cost in Arkansas?', a: 'ICF construction in Arkansas typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$200+ per square foot range. Little Rock and Fayetteville have the most established ICF contractor availability in the state.' },
      { q: 'Is ICF approved under Arkansas building codes?', a: 'Yes. ICF construction is approved under Arkansas\'s adoption of the International Building Code. Major ICF brands carry the necessary code compliance documentation for construction in Arkansas.' },
    ],
  },

  // ── COLD CLIMATE ─────────────────────────────────────────
  {
    name: 'Michigan', slug: 'michigan', abbr: 'MI', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Michigan — energy savings built into every wall.',
    intro: 'Michigan homeowners know winter. With temperatures regularly dropping below zero in the Upper Peninsula and sustained cold across the Lower Peninsula, the thermal performance of your home\'s walls directly determines your heating bill and your daily comfort. ICF\'s continuous foam insulation and concrete thermal mass perform dramatically better than wood frame in Michigan\'s climate.',
    intro2: 'Beyond winter performance, Michigan\'s short but warm summers and high humidity also benefit from ICF\'s thermal stability. ICF homeowners across Michigan consistently report 40–65% reductions in total energy costs compared to their previous wood-framed homes — a significant financial return on the upfront investment.',
    bullets: [
      '40–65% reduction in heating costs through Michigan\'s long, cold winters',
      'No drafts, cold spots, or condensation — ICF walls maintain even interior temperatures',
      'Continuous insulation eliminates thermal bridging common in wood-framed walls',
      'Long-term durability with no rot or moisture damage in Michigan\'s wet climate',
      'Well-established ICF contractor base across Michigan including the Upper Peninsula',
    ],
    faqs: [
      { q: 'How does ICF perform in Michigan winters?', a: 'ICF is one of the best wall systems available for cold climates. The continuous foam insulation on both sides of the concrete core eliminates the thermal bridging that makes wood-framed walls inefficient in cold weather. Michigan ICF homeowners consistently report 40–65% lower heating costs and dramatically more comfortable, draft-free interiors.' },
      { q: 'Are there ICF contractors in Michigan?', a: 'Yes. Michigan has a well-established ICF contractor base, particularly in the Grand Rapids, Detroit, Lansing, and Traverse City areas. ICF has been used in Michigan for over 20 years, and experienced contractors are available across most of the state.' },
      { q: 'What does ICF cost in Michigan?', a: 'ICF construction in Michigan typically runs 5–15% above comparable wood frame, with above-grade walls in the $150–$215+ per square foot range. Southeast Michigan near Detroit tends toward the higher end of the range; the western Michigan and northern markets are often more competitive.' },
    ],
  },

  {
    name: 'Minnesota', slug: 'minnesota', abbr: 'MN', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Minnesota — built for winters that wood frame can\'t handle.',
    intro: 'Minnesota experiences some of the coldest winters in the continental United States. With temperatures regularly plunging below -20°F in northern Minnesota and sustained cold throughout the state, the thermal performance of a home\'s wall system is not just a comfort issue — it is a significant financial one. ICF construction delivers insulation values and thermal mass performance that wood frame fundamentally cannot match.',
    intro2: 'Minnesota\'s energy-conscious building culture has embraced ICF as one of the most effective tools for achieving high-performance homes. Builders and homeowners across the Twin Cities metro and greater Minnesota increasingly choose ICF for its combination of thermal performance, structural durability, and long-term cost advantages.',
    bullets: [
      '40–65% reduction in heating costs in Minnesota\'s extreme winter climate',
      'Continuous R-22 to R-28 insulation with no thermal bridging through wall studs',
      'Concrete thermal mass keeps interiors comfortable even during temperature extremes',
      'Qualified for energy efficiency incentives available in Minnesota',
      'Strong ICF contractor presence across the Twin Cities and greater Minnesota',
    ],
    faqs: [
      { q: 'Is ICF common in Minnesota?', a: 'Yes. ICF has been actively used in Minnesota for decades and is well-established in the state\'s custom home and high-performance residential market. The Twin Cities metro has particularly strong ICF contractor availability.' },
      { q: 'How does ICF handle Minnesota\'s freeze-thaw cycles?', a: 'Concrete handles freeze-thaw cycles far better than wood. ICF walls do not rot, swell, or develop moisture infiltration issues from repeated freezing and thawing. The foam insulation also reduces the thermal cycling the concrete experiences, extending the wall\'s effective life.' },
      { q: 'What does ICF construction cost in Minnesota?', a: 'ICF in Minnesota typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$220+ per square foot range. The Twin Cities metro has the most competitive ICF contractor pricing; northern Minnesota may carry a travel premium.' },
    ],
  },

  {
    name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Wisconsin — superior insulation for the north country.',
    intro: 'Wisconsin homeowners deal with winters that routinely bring weeks of temperatures well below zero, particularly in the northern half of the state. For new construction, the wall system you choose determines your comfort and your heating bill every single day of the year. ICF\'s combination of continuous insulation and concrete thermal mass makes it one of the top performers for Wisconsin\'s climate.',
    intro2: 'Wisconsin also has a strong building tradition and a culture of quality craftsmanship. ICF fits naturally into this tradition — it is a building system that does what it is supposed to do for decades without degrading, warping, or requiring replacement.',
    bullets: [
      'Superior insulation performance for Wisconsin\'s long, cold winters',
      '40–65% reduction in heating costs compared to wood-framed construction',
      'Concrete thermal mass maintains stable interior temperatures through temperature swings',
      'Long-term durability with no rot or warping in Wisconsin\'s wet, cold climate',
      'ICF contractors available in Milwaukee, Madison, Green Bay, and across the state',
    ],
    faqs: [
      { q: 'How does ICF compare to SIP panels or advanced framing in Wisconsin?', a: 'ICF typically outperforms both SIP panels and advanced framing in thermal mass performance, airtightness, and structural strength. SIPs offer good insulation but lack the mass benefit of concrete. Advanced framing improves on standard wood frame but still has thermal bridging through studs. ICF\'s continuous insulation and concrete core provide the best combination of insulation, mass, and structural performance available in residential construction.' },
      { q: 'Are there ICF contractors in Wisconsin?', a: 'Yes. Wisconsin has an active ICF contractor community, with concentrations in Milwaukee, Madison, and Green Bay. Custom home builders in Wisconsin\'s lake country — Door County, the Northwoods — have also adopted ICF for high-performance vacation homes.' },
      { q: 'What does ICF cost in Wisconsin?', a: 'ICF construction in Wisconsin typically runs 5–15% above comparable wood frame, with above-grade walls in the $150–$215+ per square foot range.' },
    ],
  },

  {
    name: 'Ohio', slug: 'ohio', abbr: 'OH', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Ohio — energy savings all year long.',
    intro: 'Ohio experiences a full four-season climate with cold, often harsh winters — particularly in the Cleveland snow belt along Lake Erie — and hot, humid summers. This wide temperature range makes the thermal performance of your home\'s walls critically important. ICF construction delivers superior year-round energy performance compared to wood-framed alternatives.',
    intro2: 'Ohio\'s strong manufacturing and construction economy has supported a solid base of ICF-experienced contractors, particularly in the Cleveland, Columbus, and Cincinnati metros. Custom homebuilders across Ohio increasingly offer ICF as a premium option for energy-conscious buyers.',
    bullets: [
      '40–60% reduction in heating costs during Ohio\'s cold winters',
      'Significant cooling savings in Ohio\'s hot, humid summers',
      'Superior performance in the Cleveland and Lake Erie snow belt',
      'Long-term durability with no rot or moisture infiltration',
      'ICF contractor availability in Cleveland, Columbus, Cincinnati, and across Ohio',
    ],
    faqs: [
      { q: 'Is ICF used in the Cleveland and Northeast Ohio snow belt?', a: 'Yes, and it performs exceptionally well there. The Lake Erie snow belt\'s combination of extreme cold, heavy snow loads, and persistent moisture makes ICF\'s combination of structural strength, insulation, and moisture resistance particularly valuable. Several ICF contractors are active in the Cleveland metro area.' },
      { q: 'How does ICF handle Ohio\'s lake-effect weather?', a: 'ICF walls resist the moisture infiltration that plagues wood-framed homes in Ohio\'s humid winters and lake-effect snowfall zones. The continuous insulation and concrete mass also prevent the condensation and freeze-thaw cycling that damages wood studs over time.' },
      { q: 'What does ICF cost in Ohio?', a: 'ICF construction in Ohio typically runs 5–15% above comparable wood frame, with above-grade walls in the $148–$210+ per square foot range. Columbus, Cleveland, and Cincinnati all have competitive ICF contractor markets.' },
    ],
  },

  {
    name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Pennsylvania — stronger walls for cold winters and storm seasons.',
    intro: 'Pennsylvania experiences cold winters across most of the state, with the northern tier and Pocono Mountains seeing significant snowfall and sustained freezing temperatures. Eastern Pennsylvania is also exposed to nor\'easters and coastal storms. ICF construction addresses both the cold-weather energy challenge and the storm resilience concern in a single wall system.',
    intro2: 'Pennsylvania\'s active custom home market — particularly in the Philadelphia suburbs, the Pittsburgh metro, and Central Pennsylvania — has supported the growth of an experienced ICF contractor base. Energy-conscious Pennsylvania homeowners increasingly recognize ICF as the standard for high-performance new construction.',
    bullets: [
      '40–65% energy savings through Pennsylvania\'s cold winters',
      'Nor\'easter and storm resistance for eastern Pennsylvania and the Poconos',
      'Continuous insulation eliminates the drafts and cold spots common in wood frame',
      'Long-term structural durability with no rot or moisture infiltration',
      'Active ICF contractors in Philadelphia suburbs, Pittsburgh, and across the state',
    ],
    faqs: [
      { q: 'Is ICF popular in the Philadelphia suburbs?', a: 'ICF is used in the Philadelphia suburbs and has grown steadily in Pennsylvania\'s custom home market. The region\'s combination of cold winters, spring storms, and energy-conscious buyers makes ICF an easy case to make for homeowners focused on long-term value.' },
      { q: 'How does ICF handle Pennsylvania\'s nor\'easters?', a: 'ICF walls withstand wind loads well above those generated by typical nor\'easters. The reinforced concrete construction resists both wind pressure and flying debris. Properly designed ICF homes in Pennsylvania also benefit from dramatically reduced air infiltration during storms, maintaining interior comfort.' },
      { q: 'What does ICF cost in Pennsylvania?', a: 'ICF construction in Pennsylvania typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$220+ per square foot range. Philadelphia suburbs and Pittsburgh both have competitive ICF contractor markets; rural central Pennsylvania may see higher pricing due to limited local competition.' },
    ],
  },

  {
    name: 'New York', slug: 'new-york', abbr: 'NY', climate: CLIMATE.COLD,
    tagline: 'ICF construction in New York — energy efficiency and storm strength in one.',
    intro: 'New York\'s climate varies dramatically — from the frigid winters of the Adirondacks and Western New York to the milder but storm-exposed Long Island coast. ICF construction performs well across all of New York\'s varied climate zones, delivering superior energy efficiency in the cold north and structural storm resilience in the coastal south.',
    intro2: 'New York State has strong energy codes that make high-performance construction important for compliance, and ICF exceeds those standards. The state\'s active custom home and luxury residential market — particularly in the Hudson Valley, the Hamptons, and upstate — has driven growth in ICF contractor availability.',
    bullets: [
      'Superior performance in upstate New York\'s extreme winter cold',
      'Nor\'easter and storm resistance for Long Island and coastal New York',
      'Exceeds New York State\'s stringent energy code requirements',
      'Excellent acoustic performance — significant in New York\'s populated areas',
      'ICF contractors active in NYC metro, Hudson Valley, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used in the New York City metro area?', a: 'Yes. ICF is used for both residential and commercial construction in the greater New York City area, including Long Island, Westchester, and Northern New Jersey. Coastal Long Island homeowners have adopted ICF for its combination of storm resilience and energy performance.' },
      { q: 'Does ICF meet New York State energy codes?', a: 'ICF exceeds New York State\'s Energy Conservation Construction Code requirements in most climate zones. New York has progressively strengthened its energy code, and ICF\'s continuous insulation and thermal mass values meet and surpass the code\'s wall assembly requirements.' },
      { q: 'What does ICF cost in New York?', a: 'ICF construction in New York varies significantly by region. Above-grade walls typically run $165–$240+ per square foot — New York City and its suburbs are among the most expensive ICF markets in the country due to high labor costs. Upstate New York offers more moderate pricing.' },
    ],
  },

  {
    name: 'Indiana', slug: 'indiana', abbr: 'IN', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Indiana — year-round energy savings and tornado strength.',
    intro: 'Indiana sits at the intersection of two ICF value propositions: it experiences genuine tornado risk, particularly in the southern part of the state, and endures cold winters that reward superior wall insulation. ICF\'s reinforced concrete construction addresses both concerns simultaneously.',
    intro2: 'Indiana\'s manufacturing culture and practical approach to construction quality have made ICF increasingly popular among homeowners who want to build something that will last — and perform — for the long term.',
    bullets: [
      'Tornado-resistant construction for Indiana\'s storm-active southern regions',
      '40–60% energy savings across Indiana\'s cold winters and warm summers',
      'Long-term durability with no rot, warping, or termite vulnerability',
      'Quieter homes — concrete\'s mass blocks traffic and storm noise effectively',
      'ICF contractors available in Indianapolis, Fort Wayne, and across the state',
    ],
    faqs: [
      { q: 'Is ICF popular in Indianapolis?', a: 'ICF is used in the Indianapolis metro and is growing in popularity as energy-conscious homeowners seek alternatives to conventional wood frame. The custom home market in suburban Indianapolis has increasingly adopted ICF as a premium construction method.' },
      { q: 'How does ICF perform in Indiana winters?', a: 'Very well. ICF\'s continuous insulation eliminates the thermal bridging that makes wood-framed Indiana homes drafty in cold weather. Homeowners across Indiana report 40–60% reductions in heating costs after switching to ICF.' },
      { q: 'What does ICF cost in Indiana?', a: 'ICF construction in Indiana typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$205+ per square foot range. Indianapolis has the most competitive ICF contractor market in the state.' },
    ],
  },

  {
    name: 'Illinois', slug: 'illinois', abbr: 'IL', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Illinois — built for Chicago winters and midwestern storms.',
    intro: 'Illinois homeowners contend with some of the most challenging weather in the Midwest. Chicago\'s famous winters bring brutal cold, lake-effect snow, and relentless wind chill. Downstate Illinois experiences significant tornado and severe storm activity. ICF construction addresses both realities — delivering the insulation performance that Chicago winters demand and the structural strength that storm country requires.',
    intro2: 'Illinois has a well-developed ICF contractor base, particularly in the Chicago metro, which is one of the more active ICF markets in the Midwest. Custom homebuilders across the state are familiar with ICF and offer it as a standard option for high-performance construction.',
    bullets: [
      '40–65% energy savings in Chicago\'s brutal winter climate',
      'Tornado and severe storm resistance for downstate Illinois',
      'Exceeds Illinois energy code requirements for wall insulation',
      'Quieter homes — important in Chicago\'s dense urban and suburban areas',
      'Active ICF contractors in Chicago metro, Rockford, Springfield, and statewide',
    ],
    faqs: [
      { q: 'Is ICF common in the Chicago suburbs?', a: 'Yes. Chicago\'s suburban custom home market has an established ICF contractor presence, and the combination of harsh winters and energy costs make the economics of ICF particularly compelling. Chicago-area homeowners building custom homes routinely consider ICF.' },
      { q: 'How does ICF handle Chicago wind?', a: 'Concrete walls handle wind loads dramatically better than wood frame. Chicago\'s persistent wind — the city\'s famous weather feature — is addressed by ICF\'s mass and structural integrity. Air infiltration, which drives heating costs in wood-framed Chicago homes, is also dramatically reduced by ICF construction.' },
      { q: 'What does ICF cost in Illinois?', a: 'ICF construction in Illinois varies by region. Chicago metro is one of the more expensive ICF markets due to labor costs, with above-grade walls typically running $160–$230+ per square foot. Downstate Illinois markets are generally 15–25% lower.' },
    ],
  },

  {
    name: 'Maine', slug: 'maine', abbr: 'ME', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Maine — insulation that holds up to New England winters.',
    intro: 'Maine has some of the coldest winters in the continental United States, with temperatures regularly below zero in the interior and persistent cold along the coast. For Maine homeowners, heating costs are a significant annual expense — and the quality of a home\'s insulation directly determines what that cost will be. ICF walls dramatically outperform wood frame in Maine\'s climate.',
    intro2: 'Maine also experiences nor\'easters that bring significant wind and storm pressure to coastal properties. ICF\'s concrete construction handles these structural loads better than wood frame, making it a natural fit for exposed coastal Maine sites.',
    bullets: [
      '40–65% heating cost savings in Maine\'s extreme winter climate',
      'Nor\'easter and coastal storm resistance for Maine\'s exposed coastline',
      'Continuous insulation with no thermal bridging through wall studs',
      'Long-term durability with no rot or moisture infiltration in Maine\'s wet climate',
      'ICF contractors available in Portland, Bangor, and across Maine',
    ],
    faqs: [
      { q: 'Is ICF used for vacation homes in Maine?', a: 'Yes. Maine\'s vacation and coastal home market has adopted ICF for its durability and energy performance. Vacation homes in Maine often sit unoccupied during the coldest months — ICF\'s thermal mass and airtight construction make these homes more resilient and easier to re-heat after a period of absence.' },
      { q: 'How does ICF perform in Maine\'s coastal humidity and salt air?', a: 'Concrete is significantly more resistant to coastal exposure than wood. ICF walls do not rot, corrode (the foam and concrete are not affected by salt air), or degrade from moisture in the way that wood-framed coastal homes do. This makes ICF a particularly good choice for coastal Maine construction.' },
      { q: 'What does ICF cost in Maine?', a: 'ICF construction in Maine typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$225+ per square foot range. Portland has the most competitive ICF contractor market; rural and coastal Maine may carry travel premiums.' },
    ],
  },

  {
    name: 'Vermont', slug: 'vermont', abbr: 'VT', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Vermont — performance for New England\'s toughest climate.',
    intro: 'Vermont\'s winters are among the most demanding in the country, with deep cold, heavy snow, and the freeze-thaw cycles that make inferior construction fail over time. Vermont homeowners and builders have long prioritized energy performance, and ICF aligns naturally with the state\'s culture of quality and efficiency.',
    intro2: 'Vermont\'s tight-knit building community and strong green building awareness have driven meaningful ICF adoption across the state. From the Burlington area to rural Vermont communities, ICF is increasingly seen as the standard for serious, long-lasting residential construction.',
    bullets: [
      'Superior heating performance for Vermont\'s deep-cold winters',
      'Handles freeze-thaw cycles better than wood-framed construction',
      '40–65% reduction in heating costs — significant in Vermont\'s cold climate',
      'Long-term durability aligned with Vermont\'s culture of quality construction',
      'ICF contractors available in Burlington, Montpelier, and across the state',
    ],
    faqs: [
      { q: 'Does ICF align with Vermont\'s green building values?', a: 'Very much so. ICF\'s dramatic energy savings reduce a home\'s lifetime carbon footprint significantly. Vermont homeowners focused on sustainability find that ICF\'s operational energy performance aligns with the state\'s environmental values, even if the embodied carbon of concrete is worth considering in the overall assessment.' },
      { q: 'What does ICF cost in Vermont?', a: 'ICF construction in Vermont typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$225+ per square foot range. Vermont\'s smaller contractor market means fewer ICF specialists, and some projects may require contractors from the Burlington area or neighboring states.' },
      { q: 'How does ICF handle Vermont\'s heavy snow loads?', a: 'ICF walls are significantly stronger than wood frame and handle roof and snow load transfer more effectively. The structural integrity of reinforced concrete is not compromised by the heavy snow loads that Vermont roofs routinely carry.' },
    ],
  },

  {
    name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH', climate: CLIMATE.COLD,
    tagline: 'ICF homes in New Hampshire — energy savings for New England winters.',
    intro: 'New Hampshire winters are cold, long, and expensive for homeowners in wood-framed construction. Heating costs in the Granite State are a significant annual expense, and the quality of your home\'s insulation directly determines what you pay. ICF walls deliver an insulation and air-sealing performance that wood frame cannot match.',
    intro2: 'New Hampshire\'s coastal seacoast region also experiences periodic nor\'easters and coastal storms, making ICF\'s storm resistance an additional benefit for southern New Hampshire homeowners.',
    bullets: [
      '40–65% reduction in heating costs through New Hampshire\'s long winters',
      'Nor\'easter resistance for New Hampshire\'s seacoast and southern regions',
      'Airtight construction with no drafts or cold spots',
      'Long-term durability in New Hampshire\'s wet, cold climate',
      'ICF contractors available in Manchester, Concord, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used in New Hampshire?', a: 'Yes. ICF is used across New Hampshire for custom residential construction, particularly in the Manchester-Nashua corridor and the Lakes Region. The state\'s cold winters make the energy performance argument for ICF particularly compelling.' },
      { q: 'What does ICF cost in New Hampshire?', a: 'ICF construction in New Hampshire typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$225+ per square foot range. Southern New Hampshire near Boston generally has more competitive contractor pricing than northern areas.' },
      { q: 'How long does it take to build an ICF home in New Hampshire?', a: 'ICF construction typically takes a similar amount of time to wood frame, or slightly longer for crews new to ICF. Experienced ICF crews can actually install walls faster than wood framing once they are proficient. Plan for the same general timeline as a conventional custom home build.' },
    ],
  },

  {
    name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Massachusetts — storm-ready and energy-efficient.',
    intro: 'Massachusetts presents a compelling case for ICF on multiple fronts. The state\'s cold winters drive significant heating costs in wood-framed homes. Coastal Massachusetts — from Cape Cod to the North Shore — faces regular nor\'easter exposure. And Massachusetts\'s strict energy codes push builders toward higher-performance wall systems. ICF addresses all three.',
    intro2: 'Massachusetts has an active custom home and renovation market, particularly in the greater Boston area, the South Shore, and the Cape and Islands. ICF contractors are well-established in the state, and high-performance construction is increasingly standard in the premium residential market.',
    bullets: [
      '40–65% energy savings in Massachusetts\'s cold winters',
      'Nor\'easter and coastal storm resistance for Cape Cod, the Islands, and the coast',
      'Meets and exceeds Massachusetts\'s strict energy code requirements',
      'Quieter homes — important in Massachusetts\'s dense residential areas',
      'Active ICF contractors in greater Boston, Springfield, Worcester, and statewide',
    ],
    faqs: [
      { q: 'Does ICF meet Massachusetts energy codes?', a: 'Yes. ICF meets and in most cases exceeds Massachusetts\'s energy code requirements, which are based on the IECC and are among the stricter state codes in the country. ICF\'s continuous insulation and thermal mass values align well with what Massachusetts energy codes require of wall assemblies.' },
      { q: 'Is ICF common on Cape Cod?', a: 'ICF is used on Cape Cod and is growing in adoption for new construction there. The combination of coastal storm exposure, tight building lots, and high land values makes the long-term durability and storm resistance of ICF particularly valuable for Cape homeowners.' },
      { q: 'What does ICF cost in Massachusetts?', a: 'Massachusetts is one of the more expensive ICF markets in the country due to high labor costs. Above-grade walls typically run $170–$250+ per square foot in greater Boston. Western Massachusetts and the Pioneer Valley tend to be somewhat more competitive.' },
    ],
  },

  {
    name: 'Connecticut', slug: 'connecticut', abbr: 'CT', climate: CLIMATE.COLD,
    tagline: 'ICF homes in Connecticut — efficiency and storm strength for New England.',
    intro: 'Connecticut homeowners deal with cold winters, periodic nor\'easters, and energy costs that are among the highest in the country. ICF construction addresses all three challenges — delivering superior wall insulation, structural storm resistance, and long-term cost savings that make the upfront premium worthwhile.',
    intro2: 'Connecticut\'s affluent residential market, particularly in Fairfield County and the shoreline communities, has driven meaningful ICF adoption. Custom home builders in Connecticut regularly build with ICF for clients focused on energy performance, comfort, and long-term value.',
    bullets: [
      '40–65% energy savings in Connecticut\'s cold winters and high-cost energy market',
      'Nor\'easter and coastal storm resistance for Connecticut\'s shoreline',
      'Meets and exceeds Connecticut\'s energy code requirements',
      'Premium finishes ready — ICF walls are excellent substrates for any finish system',
      'Active ICF contractors in Fairfield County, Hartford, New Haven, and across the state',
    ],
    faqs: [
      { q: 'Is ICF popular in Fairfield County, Connecticut?', a: 'Yes. Fairfield County\'s luxury residential market has embraced ICF as a premium construction method. The combination of high energy costs, cold winters, and buyers who value quality and long-term performance makes ICF a natural fit for the area.' },
      { q: 'How does ICF handle Connecticut\'s coastal storms?', a: 'ICF walls withstand the wind loads and storm pressure that nor\'easters and occasional tropical weather bring to Connecticut\'s coast. Long Island Sound exposure makes structural performance important for shoreline and near-shore Connecticut properties.' },
      { q: 'What does ICF cost in Connecticut?', a: 'ICF construction in Connecticut typically runs 5–15% above comparable wood frame, with above-grade walls in the $165–$240+ per square foot range. Fairfield County is among the more expensive markets; eastern and northern Connecticut are generally more competitive.' },
    ],
  },

  {
    name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Rhode Island — coastal strength and energy efficiency.',
    intro: 'Rhode Island\'s compact geography gives virtually all of the state meaningful coastal exposure — and the nor\'easters and occasional tropical storms that go with it. Combined with cold New England winters, ICF construction makes a strong case for Rhode Island homeowners who want a wall system that handles both challenges.',
    intro2: 'Rhode Island\'s high energy costs make ICF\'s energy savings particularly valuable. The state\'s active coastal and waterfront home market has embraced ICF for its combination of structural resilience and long-term efficiency.',
    bullets: [
      'Coastal storm and nor\'easter resistance for Rhode Island\'s exposed shoreline',
      '40–65% energy savings in Rhode Island\'s cold, costly energy market',
      'Long-term durability with no rot or corrosion in coastal exposure',
      'Meets and exceeds Rhode Island energy code requirements',
      'ICF contractors available in Providence, Newport, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used for waterfront homes in Rhode Island?', a: 'Yes. Rhode Island\'s waterfront and coastal home market has adopted ICF for its durability and storm resilience. Concrete walls handle coastal exposure — salt air, storm surge, high winds — significantly better than wood frame, making ICF a natural choice for Rhode Island shoreline construction.' },
      { q: 'What does ICF cost in Rhode Island?', a: 'ICF construction in Rhode Island typically runs 5–15% above comparable wood frame, with above-grade walls in the $165–$240+ per square foot range. Rhode Island\'s small size and proximity to Boston labor markets means costs are similar to the broader New England region.' },
      { q: 'How does ICF handle Rhode Island winter cold?', a: 'Effectively. ICF\'s continuous insulation and thermal mass reduce heating loads significantly in Rhode Island\'s cold winters. Homeowners report 40–65% reductions in heating costs — meaningful in a state with high energy prices.' },
    ],
  },

  {
    name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ', climate: CLIMATE.COLD,
    tagline: 'ICF homes in New Jersey — coastal storm strength and year-round efficiency.',
    intro: 'New Jersey\'s 130-mile coastline has experienced firsthand what major storms can do to conventional wood-framed construction. Superstorm Sandy reshaped how coastal New Jersey homeowners think about building resilience. ICF construction has become an increasingly serious option for Jersey Shore homeowners who want a structure that can genuinely survive what the Atlantic delivers.',
    intro2: 'Beyond storm resilience, New Jersey\'s cold winters and high energy costs make ICF\'s year-round energy performance a significant financial advantage. The state\'s dense population and strong residential construction market support an active ICF contractor base.',
    bullets: [
      'Coastal storm and hurricane resistance for New Jersey\'s Shore communities',
      'Proven storm performance — documented ICF survival through Superstorm Sandy',
      '40–65% energy savings in New Jersey\'s cold winters and high-cost energy market',
      'Meets and exceeds New Jersey\'s energy codes',
      'Active ICF contractors across the state including the Shore, Northern NJ, and the shore communities',
    ],
    faqs: [
      { q: 'How did ICF homes fare in Superstorm Sandy?', a: 'ICF homes along the Jersey Shore generally outperformed wood-framed neighbors during Sandy. Published accounts and photos show ICF structures remaining intact where wood-framed homes were destroyed. This documented performance has driven increased interest in ICF for coastal NJ construction.' },
      { q: 'Is ICF construction growing in New Jersey?', a: 'Yes. ICF adoption has accelerated in New Jersey, particularly in coastal communities rebuilding after Sandy. The combination of storm resilience, energy efficiency, and long-term value is a compelling case for New Jersey homeowners.' },
      { q: 'What does ICF cost in New Jersey?', a: 'ICF construction in New Jersey is among the more expensive markets in the country due to high labor costs. Above-grade walls typically run $165–$240+ per square foot. Shore area markets may have more competitive pricing due to increased demand for ICF-experienced contractors.' },
    ],
  },

  {
    name: 'Maryland', slug: 'maryland', abbr: 'MD', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Maryland — Chesapeake Bay coast to mountain efficiency.',
    intro: 'Maryland spans an impressive range of climate conditions — from the Chesapeake Bay\'s coastal exposure to the cold winters of Western Maryland\'s mountains. ICF construction performs well across this range, providing coastal storm resistance on the Eastern Shore and Bay communities while delivering superior cold-weather energy performance in the western highlands.',
    intro2: 'Maryland\'s strong residential construction market — particularly in the Baltimore metro, the DC suburbs, and the coastal Eastern Shore — has driven meaningful ICF adoption. The state\'s energy codes and growing high-performance home market support ICF as a premium construction option.',
    bullets: [
      'Coastal storm and nor\'easter resistance for Maryland\'s Bay and Atlantic coastlines',
      '40–60% energy savings across Maryland\'s mixed climate',
      'Superior cold-weather performance for Western Maryland\'s mountain winters',
      'Meets and exceeds Maryland energy code requirements',
      'Active ICF contractors in Baltimore, DC suburbs, and Eastern Shore',
    ],
    faqs: [
      { q: 'Is ICF used in the Baltimore-Washington corridor?', a: 'Yes. The Baltimore-Washington corridor has an active ICF market, driven by demand for custom homes with high energy performance and the region\'s cold winters. Multiple ICF-experienced contractors operate in this market.' },
      { q: 'How does ICF perform in Maryland\'s coastal communities?', a: 'ICF\'s concrete construction handles the coastal exposure of Maryland\'s Chesapeake Bay and Ocean City communities significantly better than wood frame. Storm surge resistance, salt air durability, and high-wind performance all favor concrete construction in coastal Maryland.' },
      { q: 'What does ICF cost in Maryland?', a: 'ICF construction in Maryland typically runs 5–15% above comparable wood frame, with above-grade walls in the $160–$230+ per square foot range. DC suburban markets and Baltimore tend toward the higher end; Western Maryland and the Eastern Shore are often more competitive.' },
    ],
  },

  {
    name: 'Delaware', slug: 'delaware', abbr: 'DE', climate: CLIMATE.COLD,
    tagline: 'ICF construction in Delaware — coastal storm ready and energy efficient.',
    intro: 'Delaware\'s coastal location and small geographic footprint mean that most of the state has meaningful exposure to nor\'easters, coastal storms, and the cold Atlantic winters. ICF construction addresses Delaware\'s coastal storm exposure while delivering significantly better energy performance than wood frame in the state\'s mixed climate.',
    intro2: 'Delaware\'s growing residential construction market, particularly in the beach communities south of Rehoboth and in the Wilmington suburbs, has shown increasing interest in ICF as a premium construction option.',
    bullets: [
      'Coastal storm and nor\'easter resistance for Delaware\'s Atlantic communities',
      '40–60% energy savings in Delaware\'s cold winters',
      'Durability in Delaware\'s coastal humidity and salt-air exposure',
      'Meets and exceeds Delaware energy code requirements',
      'ICF contractors available in Wilmington, Dover, and coastal Delaware',
    ],
    faqs: [
      { q: 'Is ICF used in Delaware\'s beach communities?', a: 'Yes. Delaware\'s beach communities from Rehoboth to Bethany Beach have seen ICF adoption for new construction, particularly for primary homes where storm resilience and energy efficiency justify the upfront premium over wood frame.' },
      { q: 'What does ICF cost in Delaware?', a: 'ICF construction in Delaware typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$220+ per square foot range. Delaware\'s proximity to Philadelphia and Baltimore labor markets means costs are broadly similar to those regions.' },
      { q: 'Are ICF contractors available throughout Delaware?', a: 'Yes, though Delaware\'s small size means the ICF contractor pool is limited compared to larger states. Most contractors serving Delaware also work in Maryland, Pennsylvania, and New Jersey.' },
    ],
  },

  {
    name: 'West Virginia', slug: 'west-virginia', abbr: 'WV', climate: CLIMATE.COLD,
    tagline: 'ICF homes in West Virginia — mountain durability and energy savings.',
    intro: 'West Virginia\'s mountainous terrain and Appalachian climate bring cold winters, significant snow loads, and the kind of wind exposure that tests building envelopes. ICF construction is particularly well-suited to West Virginia\'s conditions — its concrete strength handles structural loads from wind and snow, while its insulation dramatically reduces the heating costs that are a significant burden for West Virginia homeowners.',
    intro2: 'West Virginia\'s rural character and building tradition value durability and long-term value over novelty. ICF delivers both — a wall system that genuinely outlasts wood frame and performs better throughout its life.',
    bullets: [
      'Superior performance in West Virginia\'s cold Appalachian winters',
      'Handles mountain wind loads and snow loads better than wood frame',
      '40–65% reduction in heating costs through West Virginia\'s long winters',
      'Long-term durability with no rot or moisture infiltration in West Virginia\'s wet climate',
      'ICF contractors available in Charleston, Morgantown, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used in rural West Virginia?', a: 'Yes, though contractor availability in rural areas can be limited. West Virginia homeowners in remote areas may need to bring in ICF contractors from Charleston, Morgantown, or neighboring Virginia. The long-term performance benefit typically justifies the contractor travel cost.' },
      { q: 'What does ICF cost in West Virginia?', a: 'ICF construction in West Virginia typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$200+ per square foot range. West Virginia\'s lower labor costs compared to adjacent states make it one of the more affordable ICF markets in the region.' },
      { q: 'How does ICF handle West Virginia\'s heavy snowfall?', a: 'ICF walls provide the structural strength to handle the roof and snow load conditions common in West Virginia\'s mountains. The continuous insulation also prevents the ice dams that form on poorly insulated wood-framed homes when heat escapes through the walls.' },
    ],
  },

  // ── HOT / DRY CLIMATE ────────────────────────────────────
  {
    name: 'Arizona', slug: 'arizona', abbr: 'AZ', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF construction in Arizona — keeping Phoenix homes cool in the desert.',
    intro: 'Arizona\'s extreme summer heat — Phoenix regularly sees 110°F for weeks at a time — makes cooling costs a dominant factor in residential construction. Wood-framed homes with standard insulation struggle to keep interiors comfortable without running air conditioning constantly. ICF\'s thermal mass is particularly effective in Arizona\'s desert climate, absorbing daytime heat and releasing it slowly through the cooler nights.',
    intro2: 'Beyond the thermal mass advantage, ICF\'s continuous insulation dramatically reduces the heat gain through walls that drives up cooling costs in Arizona. ICF homeowners across the state report 40–65% reductions in cooling costs — meaningful savings in one of the hottest residential markets in the country.',
    bullets: [
      'Thermal mass keeps Arizona homes cooler with less air conditioning',
      '40–65% reduction in cooling costs in Phoenix, Tucson, and across Arizona',
      'Continuous insulation blocks the radiant heat that overwhelms wood-framed walls',
      'Long-term durability with no rot, warp, or UV degradation in Arizona\'s dry climate',
      'ICF contractors active in Phoenix, Tucson, Scottsdale, and across the state',
    ],
    faqs: [
      { q: 'Why is ICF particularly good for Arizona\'s climate?', a: 'ICF\'s thermal mass is uniquely effective in desert climates. The concrete core absorbs heat during the day, preventing it from penetrating to the interior. At night, when temperatures drop, the mass releases stored heat outward. This diurnal temperature swing — large in desert climates — is what makes ICF thermal mass so valuable in Arizona.' },
      { q: 'Does ICF work with adobe and Southwestern architectural styles?', a: 'ICF blends naturally with Southwestern architectural styles. The concrete walls can be finished with stucco — the traditional desert finish — creating a look identical to adobe or conventional stucco construction. Many Arizona custom home builders use ICF as a more structurally consistent and energy-efficient alternative to adobe.' },
      { q: 'What does ICF cost in Arizona?', a: 'ICF construction in Arizona typically runs 5–15% above comparable wood frame, with above-grade walls in the $150–$215+ per square foot range. The Phoenix metro has the most competitive ICF contractor market in the state.' },
    ],
  },

  {
    name: 'Nevada', slug: 'nevada', abbr: 'NV', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF homes in Nevada — desert heat efficiency and mountain-ready construction.',
    intro: 'Nevada\'s climate diversity is dramatic: Las Vegas bakes in summer heat above 110°F, while the Sierra Nevada range and northern Nevada experience cold winters with significant snowfall. ICF construction addresses both extremes — thermal mass and insulation keep desert valley homes cool in summer, while the same insulation values keep mountain homes warm through harsh winters.',
    intro2: 'Nevada\'s growing residential construction market, particularly in the Las Vegas metro and Reno-Sparks corridor, has driven increasing ICF adoption as energy-conscious homeowners seek alternatives to wood frame construction.',
    bullets: [
      'Thermal mass dramatically reduces cooling costs in Nevada\'s desert heat',
      'Superior insulation for Nevada\'s cold mountain winters in the north and high elevations',
      '40–65% year-round energy savings in Nevada\'s extreme climate range',
      'Long-term durability with no UV degradation or moisture issues in Nevada\'s dry climate',
      'ICF contractors active in Las Vegas, Reno, and across Nevada',
    ],
    faqs: [
      { q: 'How does ICF perform in Las Vegas summer heat?', a: 'Exceptionally well. Las Vegas summers represent one of ICF\'s strongest climate-performance arguments. The concrete thermal mass absorbs the intense daytime heat, the continuous insulation prevents it from penetrating to the interior, and the net result is dramatically reduced air conditioning loads.' },
      { q: 'What does ICF cost in Nevada?', a: 'ICF construction in Nevada typically runs 5–15% above comparable wood frame, with above-grade walls in the $150–$215+ per square foot range. Las Vegas has the most active ICF contractor market; Reno offers competitive but somewhat smaller pool of options.' },
      { q: 'Is ICF approved under Nevada building codes?', a: 'Yes. ICF meets Nevada\'s building code requirements across all climate zones, from the desert valleys to the mountain regions. Major ICF brands carry the necessary approvals for Nevada construction.' },
    ],
  },

  {
    name: 'Utah', slug: 'utah', abbr: 'UT', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF construction in Utah — mountain cold, desert heat, and everything in between.',
    intro: 'Utah\'s geography creates some of the most diverse climate conditions of any state. Salt Lake City experiences hot summers and cold, snowy winters. Southern Utah\'s canyon country sees extreme desert heat. The Wasatch Mountains have severe alpine winters. ICF construction performs well across all of these conditions — year-round energy efficiency and structural durability in every Utah climate zone.',
    intro2: 'Utah\'s rapidly growing construction market, particularly the Wasatch Front corridor from Provo to Ogden, has driven increasing ICF adoption. Utah homeowners building custom homes increasingly recognize ICF as the standard for high-performance, durable construction.',
    bullets: [
      'Year-round energy savings in Utah\'s extreme desert heat and mountain cold',
      'Superior performance for Wasatch Front winters with cold and inversion conditions',
      'Thermal mass effectiveness in Utah\'s high desert with large daily temperature swings',
      'Long-term durability in Utah\'s dry, UV-intense climate',
      'Active ICF contractors in Salt Lake City, Provo, St. George, and across the state',
    ],
    faqs: [
      { q: 'Is ICF popular in the Salt Lake City area?', a: 'ICF is used in Salt Lake City and across the Wasatch Front, with growing adoption in Utah\'s custom home market. The combination of hot summers, cold winters, and air quality concerns (inversions) that make energy efficiency important has driven ICF interest in the region.' },
      { q: 'How does ICF perform in Utah\'s high desert climate?', a: 'Utah\'s high desert climate, particularly in St. George and the canyon country, has large daily temperature swings that ICF\'s thermal mass handles particularly well. The concrete absorbs daytime heat and releases it slowly at night, reducing the peak cooling load significantly.' },
      { q: 'What does ICF cost in Utah?', a: 'ICF construction in Utah typically runs 5–15% above comparable wood frame, with above-grade walls in the $148–$210+ per square foot range. Salt Lake City has the most competitive ICF contractor market in the state.' },
    ],
  },

  {
    name: 'New Mexico', slug: 'new-mexico', abbr: 'NM', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF homes in New Mexico — thermal mass for high desert living.',
    intro: 'New Mexico\'s high desert climate — characterized by hot days, cool nights, intense UV exposure, and low humidity — is one of the best climates in the country for ICF\'s thermal mass advantage. The large daily temperature swings create ideal conditions for ICF\'s concrete core to do what it does best: absorb heat during the day and release it at night, keeping interiors comfortable with minimal mechanical assistance.',
    intro2: 'ICF also naturally complements New Mexico\'s adobe building tradition. Stucco-finished ICF walls are visually indistinguishable from traditional adobe, while providing superior insulation values, structural performance, and moisture resistance.',
    bullets: [
      'Thermal mass ideally suited for New Mexico\'s large daily temperature swings',
      '40–65% energy savings in New Mexico\'s hot desert climate',
      'Naturally compatible with adobe and Southwestern architectural traditions',
      'Resistant to the UV degradation that affects other materials in New Mexico\'s sun',
      'ICF contractors available in Albuquerque, Santa Fe, and across the state',
    ],
    faqs: [
      { q: 'How does ICF compare to traditional adobe in New Mexico?', a: 'ICF and adobe share the same fundamental principle — thermal mass — but ICF provides significantly better insulation values, stronger structural performance, and superior moisture resistance. ICF walls finished in stucco are visually identical to adobe while outperforming it on virtually every technical metric.' },
      { q: 'Is ICF used in Santa Fe?', a: 'Yes. Santa Fe\'s design-conscious architectural culture has embraced ICF for its compatibility with Southwestern aesthetics and its superior performance compared to traditional adobe. Custom home builders in Santa Fe regularly use ICF.' },
      { q: 'What does ICF cost in New Mexico?', a: 'ICF construction in New Mexico typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$205+ per square foot range. Albuquerque has the most active ICF contractor market; Santa Fe is also well-served.' },
    ],
  },

  {
    name: 'Colorado', slug: 'colorado', abbr: 'CO', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF homes in Colorado — mountain durability, energy savings, and wildfire resistance.',
    intro: 'Colorado\'s climate ranges from the scorching plains of the Eastern Slope to the brutal winters of the high Rockies. ICF construction addresses both extremes — performing better in Colorado\'s cold mountain winters than any comparable wall system and handling the temperature extremes of the plains and foothills year-round.',
    intro2: 'Colorado\'s increasing wildfire risk has also drawn attention to ICF\'s concrete construction. While no wall system is fireproof, ICF\'s concrete core is dramatically more fire-resistant than wood frame — an increasingly important consideration for Colorado homeowners in the Wildland Urban Interface (WUI).',
    bullets: [
      'Superior performance in Colorado\'s high-altitude and mountain winters',
      'Wildfire resistance for Colorado\'s expanding Wildland Urban Interface zones',
      '40–65% energy savings across Colorado\'s extreme temperature range',
      'Handles UV exposure and hail impact better than wood-framed construction',
      'Active ICF contractors in Denver, Boulder, Colorado Springs, and across the state',
    ],
    faqs: [
      { q: 'Does ICF provide wildfire protection in Colorado?', a: 'ICF\'s concrete walls are dramatically more fire-resistant than wood frame, with a 4-hour fire rating versus 15 minutes for standard wood frame. In Colorado\'s expanding WUI zones, ICF provides a level of ember and radiant heat resistance that wood frame cannot match. This is an increasingly important consideration for Colorado homeowners building in fire-prone areas.' },
      { q: 'How does ICF perform in Colorado mountain winters?', a: 'Exceptionally. ICF is one of the best wall systems for high-altitude and mountain construction in Colorado. The continuous insulation handles the extreme cold, high wind loads, and snow load conditions of mountain environments significantly better than wood frame.' },
      { q: 'What does ICF cost in Colorado?', a: 'ICF construction in Colorado varies by region. Denver and Boulder metros see above-grade wall pricing of $155–$225+ per square foot. Mountain communities may carry a premium due to elevated labor costs and limited contractor availability at elevation.' },
    ],
  },

  {
    name: 'Wyoming', slug: 'wyoming', abbr: 'WY', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF construction in Wyoming — wind, cold, and durability for the high plains.',
    intro: 'Wyoming\'s climate is defined by extremes: bitter cold winters across most of the state, relentless wind on the high plains, and dramatic temperature swings that test building envelopes year-round. ICF\'s reinforced concrete walls are specifically designed to handle the structural and thermal demands that Wyoming\'s climate imposes on construction.',
    intro2: 'Wyoming\'s low population density and rural character mean that building something that lasts — and performs — for decades without major maintenance is particularly important. ICF delivers that durability in a state where contractors may be hours away when something goes wrong with conventional construction.',
    bullets: [
      'Wind-resistant construction for Wyoming\'s relentless high-plains wind',
      '40–65% heating savings in Wyoming\'s extreme winter cold',
      'Long-term durability with no rot or UV degradation in Wyoming\'s harsh climate',
      'Structural strength for Wyoming\'s heavy snow loads',
      'ICF contractors available in Cheyenne, Casper, and across the state',
    ],
    faqs: [
      { q: 'How does ICF handle Wyoming wind?', a: 'ICF walls are engineered to withstand winds exceeding 200 mph. Wyoming\'s persistent and often extreme winds — particularly on the high plains near Cheyenne, Rawlins, and Rock Springs — are addressed by ICF\'s concrete mass and structural integrity. Air infiltration, which drives heating costs in wood-framed Wyoming homes, is also dramatically reduced.' },
      { q: 'What does ICF cost in Wyoming?', a: 'ICF construction in Wyoming typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$205+ per square foot range. Rural Wyoming may carry travel premiums for ICF contractors from Cheyenne or Casper.' },
      { q: 'Are there ICF contractors in Wyoming?', a: 'Yes, though Wyoming\'s small population means the ICF contractor pool is limited compared to larger states. Most ICF projects in Wyoming involve contractors from Cheyenne or Casper, or contractors from neighboring Colorado who travel for projects.' },
    ],
  },

  {
    name: 'Montana', slug: 'montana', abbr: 'MT', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF homes in Montana — built for Big Sky winters and long-term durability.',
    intro: 'Montana winters are among the most demanding in the continental United States. With temperatures regularly dropping to -30°F or colder in many parts of the state and wind chills that push even lower, the thermal performance of a home\'s wall system is not a luxury consideration — it determines what you pay to heat every single month of a very long winter.',
    intro2: 'Montana\'s remote character and the difficulty and expense of repairs in rural areas make ICF\'s durability particularly valuable. Building with concrete means building something that does not need to be replaced, repaired, or re-insulated over its lifetime.',
    bullets: [
      '40–65% heating savings in Montana\'s extreme winter cold',
      'Wind-resistant construction for Montana\'s exposed plains and mountain areas',
      'Handles Montana\'s heavy snow loads with structural confidence',
      'Long-term durability that reduces maintenance in Montana\'s remote locations',
      'ICF contractors available in Billings, Missoula, Great Falls, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used in Montana\'s ranch and rural construction?', a: 'Yes, though rural ICF construction in Montana requires planning around contractor availability. ICF is used for custom homes, ranch facilities, and agricultural buildings across the state. The long-term durability and energy performance are particularly compelling for remote Montana properties.' },
      { q: 'How does ICF handle Montana\'s -30°F winters?', a: 'ICF\'s continuous insulation and airtight construction are designed specifically for extreme cold climates. While wood-framed Montana homes struggle with heat loss through studs (thermal bridging) and air infiltration, ICF walls maintain their insulating performance down to the most extreme Montana temperatures.' },
      { q: 'What does ICF cost in Montana?', a: 'ICF construction in Montana typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$210+ per square foot range. Billings and Missoula have the most active ICF markets; rural Montana projects may carry travel premiums.' },
    ],
  },

  {
    name: 'Idaho', slug: 'idaho', abbr: 'ID', climate: CLIMATE.HOT_DRY,
    tagline: 'ICF construction in Idaho — energy savings for Treasure Valley and beyond.',
    intro: 'Idaho\'s climate varies widely — the Treasure Valley around Boise experiences hot, dry summers and cold winters, while northern Idaho\'s panhandle sees heavy snowfall and cold similar to neighboring Montana. ICF construction performs well across Idaho\'s climate range, offering year-round energy savings that are particularly meaningful given Idaho\'s cold winters and hot summers.',
    intro2: 'Idaho\'s rapidly growing residential construction market, particularly in the Boise metro and Twin Falls area, has driven increasing ICF adoption among builders and homeowners seeking high-performance alternatives to conventional wood frame.',
    bullets: [
      'Year-round energy savings across Idaho\'s hot summers and cold winters',
      'Superior performance in northern Idaho\'s heavy snow and cold climate',
      'Thermal mass effectiveness in Boise\'s high desert temperature swings',
      'Long-term durability with no rot or pest vulnerability in Idaho\'s climate',
      'ICF contractors active in Boise, Nampa, Coeur d\'Alene, and across the state',
    ],
    faqs: [
      { q: 'Is ICF popular in the Boise area?', a: 'ICF is used in the Boise metro and is growing with the area\'s rapid expansion. The Treasure Valley\'s combination of hot summers and cold winters makes ICF\'s year-round energy performance compelling for custom home buyers.' },
      { q: 'What does ICF cost in Idaho?', a: 'ICF construction in Idaho typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$210+ per square foot range. The Boise metro has the most competitive ICF contractor market; northern Idaho and rural areas may carry travel premiums.' },
      { q: 'How does ICF handle Idaho\'s hot summers?', a: 'ICF\'s thermal mass is effective in Idaho\'s high desert climate. The concrete absorbs daytime heat and prevents it from penetrating to the interior during peak afternoon temperatures. This reduces air conditioning loads significantly in Idaho\'s hot summer months.' },
    ],
  },

  // ── PACIFIC COAST ────────────────────────────────────────
  {
    name: 'California', slug: 'california', abbr: 'CA', climate: CLIMATE.PACIFIC,
    tagline: 'ICF construction in California — wildfire resistance, earthquake strength, and energy code compliance.',
    intro: 'California presents one of the most compelling multi-factor cases for ICF construction in the country. Wildfires have reshaped the state\'s risk landscape — concrete walls are dramatically more fire-resistant than wood frame. Seismic activity makes structural integrity critical. California\'s Title 24 energy code is among the strictest in the nation, and ICF\'s continuous insulation helps meet and exceed it.',
    intro2: 'California\'s diverse geography — from the scorching Central Valley to the cold Sierra Nevada to the coastal marine climate — means ICF\'s year-round energy performance benefits apply across the state. ICF contractors are well-established in the state\'s major markets, from Los Angeles to San Francisco to Sacramento.',
    bullets: [
      'Wildfire resistance for California\'s expanding Wildland Urban Interface zones',
      'Earthquake-resistant reinforced concrete construction for California\'s seismic zones',
      'Meets and exceeds California\'s strict Title 24 energy code requirements',
      '40–65% energy savings in California\'s hot Central Valley and cold mountain areas',
      'Active ICF contractors in Los Angeles, Bay Area, Sacramento, and statewide',
    ],
    faqs: [
      { q: 'Does ICF provide wildfire protection in California?', a: 'ICF walls have a 4-hour fire rating — versus 15 minutes for standard wood frame — and concrete does not combust. In California\'s WUI zones, ICF walls provide the best available resistance to the radiant heat and ember exposure that define wildfire risk. Several California insurance carriers specifically recognize concrete construction for wildfire risk reduction.' },
      { q: 'Is ICF earthquake-resistant?', a: 'Yes. Reinforced concrete is used globally for seismic-resistant construction. ICF\'s continuous reinforced concrete wall is a monolithic structural system that handles seismic loads effectively. ICF construction meets California\'s seismic code requirements and is used in California for both residential and commercial seismic applications.' },
      { q: 'What does ICF cost in California?', a: 'California is one of the most expensive ICF markets in the country due to high labor costs and regulatory requirements. Above-grade walls typically run $175–$260+ per square foot. Los Angeles and the Bay Area are at the higher end; the Central Valley and inland areas tend to be more competitive.' },
    ],
  },

  {
    name: 'Oregon', slug: 'oregon', abbr: 'OR', climate: CLIMATE.PACIFIC,
    tagline: 'ICF homes in Oregon — energy efficiency for the Pacific Northwest.',
    intro: 'Oregon\'s climate ranges from the mild, rainy west side of the Cascades to the high desert and cold winters of eastern Oregon. Western Oregon\'s persistent rain and moisture make durability and moisture resistance important for any wall system, while eastern Oregon\'s cold winters reward ICF\'s superior insulation. ICF performs well across Oregon\'s diverse climate zones.',
    intro2: 'Oregon\'s strong environmental and sustainability culture aligns naturally with ICF\'s energy performance advantages. The Portland metro and the state\'s active custom home market have embraced ICF for both its efficiency and its durability.',
    bullets: [
      '40–65% energy savings across Oregon\'s cool, wet western climate and cold eastern winters',
      'Resistance to moisture and the mold risk endemic to western Oregon\'s rain',
      'Wildfire resistance for eastern Oregon\'s fire-prone dry forests',
      'Meets and exceeds Oregon energy code requirements',
      'ICF contractors active in Portland, Salem, Bend, Eugene, and across the state',
    ],
    faqs: [
      { q: 'How does ICF handle Oregon\'s rainy climate?', a: 'Very well. Concrete is not affected by prolonged moisture exposure the way wood is. ICF walls do not develop the mold, rot, and structural degradation that plague poorly insulated wood-framed walls in Oregon\'s wet climate. The continuous foam insulation also prevents the condensation within wall cavities that drives mold in conventional construction.' },
      { q: 'Is ICF popular in Portland?', a: 'ICF is used in the Portland metro and is growing in Oregon\'s custom home and high-performance residential market. Portland\'s design and sustainability culture is well-aligned with ICF\'s energy performance and durability characteristics.' },
      { q: 'What does ICF cost in Oregon?', a: 'ICF construction in Oregon typically runs 5–15% above comparable wood frame, with above-grade walls in the $155–$230+ per square foot range. Portland is the most expensive market; central and eastern Oregon tend to be more competitive.' },
    ],
  },

  {
    name: 'Washington', slug: 'washington', abbr: 'WA', climate: CLIMATE.PACIFIC,
    tagline: 'ICF construction in Washington — Pacific Northwest energy performance.',
    intro: 'Washington State\'s climate divides sharply at the Cascades. Western Washington — Seattle and the Puget Sound region — experiences mild but very wet winters and cool summers. Eastern Washington has hot, dry summers and cold winters. ICF construction performs well on both sides of the mountains, with moisture resistance critical in the west and insulation performance critical in the east.',
    intro2: 'Washington\'s strong environmental awareness and strict energy codes make high-performance wall systems increasingly important for new construction. ICF\'s combination of energy performance, durability, and structural strength aligns with what the state\'s design and building community values.',
    bullets: [
      'Moisture and mold resistance for western Washington\'s wet climate',
      'Superior insulation for eastern Washington\'s cold winters and hot summers',
      'Seismic resistance for the Cascadia Subduction Zone seismic risk',
      'Meets and exceeds Washington State energy code requirements',
      'Active ICF contractors in Seattle, Spokane, Tacoma, and across the state',
    ],
    faqs: [
      { q: 'Is ICF earthquake-resistant for the Pacific Northwest seismic zone?', a: 'Yes. The Pacific Northwest faces significant long-term seismic risk from the Cascadia Subduction Zone. ICF\'s reinforced concrete construction provides seismic resistance that wood frame fundamentally cannot match. For Washington homeowners concerned about earthquake risk, ICF is the most practical above-grade wall system available.' },
      { q: 'How does ICF handle Seattle\'s rain?', a: 'ICF\'s concrete and foam materials are not affected by Seattle\'s persistent rain and moisture. Unlike wood-framed walls, ICF does not develop moisture problems, condensation within the wall cavity, or mold from prolonged wet exposure. The continuous insulation also keeps the wall assembly above the dew point throughout, preventing condensation.' },
      { q: 'What does ICF cost in Washington?', a: 'ICF construction in Washington varies by region. Seattle and the greater Puget Sound area are among the more expensive ICF markets at $165–$245+ per square foot for above-grade walls. Spokane and eastern Washington are generally more competitive.' },
    ],
  },

  {
    name: 'Alaska', slug: 'alaska', abbr: 'AK', climate: CLIMATE.PACIFIC,
    tagline: 'ICF construction in Alaska — the strongest performance for the harshest climate.',
    intro: 'Alaska represents the most extreme cold-climate argument for ICF construction in the United States. With heating costs that can exceed $10,000 per year for poorly insulated homes in interior Alaska, the thermal performance of a wall system directly determines what homeownership costs. ICF\'s continuous insulation and concrete thermal mass perform better in extreme cold than any comparable residential wall system.',
    intro2: 'Alaska\'s seismic activity, permafrost challenges, and remote locations that make repairs difficult and expensive all contribute to ICF\'s compelling case for serious Alaska home construction. Building with concrete means building something that does not need replacement parts from the lower 48.',
    bullets: [
      'Superior cold-climate insulation performance for Alaska\'s extreme winters',
      'Dramatic heating cost reduction in interior and arctic Alaska',
      'Seismic resistance for Alaska\'s earthquake-prone environment',
      'Long-term durability that reduces maintenance in Alaska\'s remote locations',
      'Handles Alaska\'s freeze-thaw and thermal cycling better than wood frame',
    ],
    faqs: [
      { q: 'How much can ICF reduce heating costs in Alaska?', a: 'ICF can reduce heating costs by 50–70% compared to code-minimum wood-framed construction. In interior Alaska where heating costs can run $8,000–$15,000 per year in wood-framed homes, this represents savings of $4,000–$10,000 annually — meaning ICF\'s upfront premium often pays back in just a few years in Alaska\'s climate.' },
      { q: 'Are there ICF contractors in Alaska?', a: 'Yes, though Alaska\'s vast geography means ICF contractor availability varies significantly by location. Anchorage and the Mat-Su Valley have ICF-experienced contractors. Remote Alaska locations may require contractors to fly in or may require the homeowner to arrange significant contractor travel.' },
      { q: 'What does ICF cost in Alaska?', a: 'ICF construction in Alaska is significantly more expensive than the lower 48 due to shipping costs for materials and the high cost of skilled construction labor. Expect to pay a substantial premium over typical mainland ICF pricing, often $200–$300+ per square foot or more for above-grade walls depending on location.' },
    ],
  },

  {
    name: 'Hawaii', slug: 'hawaii', abbr: 'HI', climate: CLIMATE.PACIFIC,
    tagline: 'ICF homes in Hawaii — hurricane-resistant and built for island conditions.',
    intro: 'Hawaii\'s tropical climate and hurricane exposure make ICF construction a compelling choice for island homeowners. Tropical storm and hurricane risk, the corrosive effects of salt air on conventional construction, and the high cost of long-term maintenance in Hawaii\'s climate all favor concrete over wood-framed construction.',
    intro2: 'Hawaii also has unique construction considerations — volcanic lava flows on the Big Island, high humidity across all islands, and the isolation that makes repairs and material replacement expensive. ICF\'s durability and low maintenance profile address these island-specific challenges effectively.',
    bullets: [
      'Hurricane and tropical storm resistance for Hawaii\'s Pacific storm exposure',
      'Resistance to salt-air corrosion that degrades conventional construction on the islands',
      'Handles Hawaii\'s high humidity without the mold risk of wood-framed construction',
      'Long-term durability that reduces maintenance costs in Hawaii\'s isolated environment',
      'ICF contractors available on Oahu, Maui, and the Big Island',
    ],
    faqs: [
      { q: 'Is ICF used in Hawaii?', a: 'Yes. ICF construction is used in Hawaii, particularly for custom homes on Oahu and Maui. Hawaii\'s combination of hurricane risk, high humidity, and salt-air exposure makes concrete construction\'s durability particularly valuable on the islands.' },
      { q: 'How does ICF handle Hawaii\'s humidity and salt air?', a: 'Concrete and foam are not affected by humidity or salt-air exposure the way wood is. ICF walls do not rot, corrode, or develop moisture problems from Hawaii\'s tropical humidity. This makes ICF\'s lifetime maintenance profile significantly lower than wood-framed construction on the islands.' },
      { q: 'What does ICF cost in Hawaii?', a: 'Hawaii\'s isolated location means significant material shipping costs add to already-high labor costs. ICF construction in Hawaii is among the most expensive in the country, with above-grade walls typically running $200–$280+ per square foot on Oahu, with higher costs on neighbor islands.' },
    ],
  },

  // ── MIXED / REMAINING STATES ─────────────────────────────
  {
    name: 'Tennessee', slug: 'tennessee', abbr: 'TN', climate: CLIMATE.MIXED,
    tagline: 'ICF construction in Tennessee — storm strength and year-round energy savings.',
    intro: 'Tennessee sits in the path of significant tornado and severe storm activity, particularly across the western and middle parts of the state. The state also experiences hot, humid summers and cold winters in the mountains east. ICF construction addresses Tennessee\'s storm risk and climate extremes with a single high-performance wall system.',
    intro2: 'Tennessee\'s growing construction market — Nashville and the greater metro have been among the fastest-growing in the country — has supported the development of a solid ICF contractor base. Custom homebuilders across the state offer ICF as a premium option for storm-resistant, energy-efficient construction.',
    bullets: [
      'Tornado and severe storm resistant construction for western and middle Tennessee',
      'Year-round energy savings across Tennessee\'s hot summers and cold mountain winters',
      'Superior moisture and mold resistance in Tennessee\'s humid climate',
      'Long-term durability with no rot or termite vulnerability',
      'ICF contractors active in Nashville, Memphis, Knoxville, and across the state',
    ],
    faqs: [
      { q: 'Are ICF contractors available in Nashville?', a: 'Yes. Nashville\'s rapid growth has attracted a range of ICF-capable contractors. The custom home market in the greater Nashville area has embraced ICF as a premium construction option for storm-resistant, energy-efficient homes.' },
      { q: 'How does ICF handle Tennessee tornadoes?', a: 'ICF walls withstand the wind speeds and debris impact of tornado conditions significantly better than wood frame. Tennessee tornado events have documented ICF structures remaining intact while surrounding wood-framed buildings were destroyed.' },
      { q: 'What does ICF cost in Tennessee?', a: 'ICF construction in Tennessee typically runs 5–15% above comparable wood frame, with above-grade walls in the $145–$205+ per square foot range. Nashville and Knoxville have the most competitive ICF contractor markets.' },
    ],
  },

  {
    name: 'Kentucky', slug: 'kentucky', abbr: 'KY', climate: CLIMATE.MIXED,
    tagline: 'ICF homes in Kentucky — stronger construction for Bluegrass State weather.',
    intro: 'Kentucky sits in an active severe weather corridor and experiences significant tornado and storm activity across the western part of the state — the Jackson Purchase region is sometimes called the "Tornado Capital" of Kentucky. Eastern Kentucky\'s mountains see cold, harsh winters. ICF addresses both the storm risk and the cold-climate energy needs of the Bluegrass State.',
    intro2: 'Kentucky\'s construction market, particularly in the Louisville and Lexington metros, has developed a base of ICF-capable contractors. Custom homebuilders in Kentucky increasingly offer ICF for clients focused on long-term performance and storm resilience.',
    bullets: [
      'Tornado and severe storm resistant construction for western Kentucky',
      'Superior insulation for eastern Kentucky\'s cold Appalachian winters',
      '40–60% energy savings across Kentucky\'s hot summers and cold winters',
      'Resistance to moisture and mold in Kentucky\'s humid climate',
      'ICF contractors available in Louisville, Lexington, and across the state',
    ],
    faqs: [
      { q: 'Is ICF used in Louisville and Lexington?', a: 'Yes. Both major Kentucky metros have ICF-capable contractors serving the custom home market. Louisville and Lexington custom home buyers increasingly consider ICF for its combination of storm resilience and energy performance.' },
      { q: 'What does ICF cost in Kentucky?', a: 'ICF construction in Kentucky typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$200+ per square foot range. Louisville and Lexington have the most competitive ICF contractor markets in the state.' },
      { q: 'How does ICF perform in Kentucky winters?', a: 'Effectively. Eastern Kentucky\'s mountains see genuine cold-winter conditions where ICF\'s continuous insulation delivers 40–60% heating cost reductions compared to wood frame. Even in the warmer western part of the state, ICF\'s insulation and thermal mass provide meaningful energy savings.' },
    ],
  },

  {
    name: 'South Dakota', slug: 'south-dakota', abbr: 'SD', climate: CLIMATE.TORNADO,
    tagline: 'ICF construction in South Dakota — built for blizzards, tornadoes, and the plains.',
    intro: 'South Dakota experiences some of the most dramatic weather in the Great Plains — powerful blizzards, significant tornado activity, extreme winter cold, and hot, dry summers. ICF construction addresses all of these conditions with a single wall system: the structural strength to withstand storm and wind loads and the insulation performance to manage South Dakota\'s extreme temperature range.',
    intro2: 'South Dakota\'s rural character and the distances between towns make durable, low-maintenance construction particularly important. ICF delivers a wall system that performs for decades without the degradation that affects wood-framed construction in South Dakota\'s harsh climate.',
    bullets: [
      'Tornado and severe storm resistant construction across South Dakota\'s plains',
      'Blizzard and extreme wind resistant reinforced concrete walls',
      '40–65% year-round energy savings in South Dakota\'s extreme climate',
      'Long-term durability with no rot or moisture infiltration',
      'ICF contractors available in Sioux Falls, Rapid City, and across the state',
    ],
    faqs: [
      { q: 'How does ICF perform in South Dakota blizzards?', a: 'ICF walls handle blizzard wind loads and the extreme cold that follows them significantly better than wood frame. The continuous insulation prevents the heat loss that spikes in wood-framed homes during extended cold snaps, and the concrete mass handles the structural wind load of blizzard conditions without racking.' },
      { q: 'What does ICF cost in South Dakota?', a: 'ICF construction in South Dakota typically runs 5–15% above comparable wood frame, with above-grade walls in the $138–$195+ per square foot range. Sioux Falls and Rapid City have the most active ICF contractor markets; rural South Dakota may carry travel premiums.' },
      { q: 'Are there ICF contractors in South Dakota?', a: 'Yes, though South Dakota\'s small population means the ICF contractor pool is limited. Sioux Falls and Rapid City have ICF-experienced builders; rural projects may require contractors to travel.' },
    ],
  },

  {
    name: 'North Dakota', slug: 'north-dakota', abbr: 'ND', climate: CLIMATE.TORNADO,
    tagline: 'ICF homes in North Dakota — the highest-performing wall for the harshest winters.',
    intro: 'North Dakota routinely ranks among the coldest states in the continental US. Winters are long, brutal, and expensive to heat — particularly in wood-framed homes with standard insulation. ICF construction\'s combination of continuous insulation and concrete thermal mass makes it one of the most effective wall systems available for North Dakota\'s extreme cold.',
    intro2: 'North Dakota also experiences significant tornado activity in the spring and summer, and the state\'s wide-open plains amplify wind speeds during storm events. ICF\'s concrete construction addresses both the cold-weather and storm-weather challenges of life in North Dakota.',
    bullets: [
      'The strongest available above-grade wall system for North Dakota\'s extreme winters',
      '40–65% reduction in heating costs — significant in one of the country\'s coldest states',
      'Tornado and severe storm resistant construction for North Dakota\'s storm belt',
      'Wind-resistant concrete walls for North Dakota\'s exposed, windswept plains',
      'ICF contractors available in Fargo, Bismarck, and across the state',
    ],
    faqs: [
      { q: 'How much can ICF reduce heating costs in North Dakota?', a: 'North Dakota\'s extreme winters make ICF\'s energy savings particularly dramatic. Homeowners across the northern plains region report 50–65% reductions in heating costs after switching from wood-framed to ICF construction. In North Dakota\'s coldest areas, this can represent thousands of dollars annually.' },
      { q: 'Are there ICF contractors in North Dakota?', a: 'Yes. Fargo and Bismarck have ICF-capable contractors. North Dakota\'s extreme climate has driven demand for high-performance construction, and ICF is well-established in both the residential and commercial sectors in the state\'s major markets.' },
      { q: 'What does ICF cost in North Dakota?', a: 'ICF construction in North Dakota typically runs 5–15% above comparable wood frame, with above-grade walls in the $140–$200+ per square foot range. Fargo has the most competitive ICF contractor market; western North Dakota and rural areas may carry premiums.' },
    ],
  },

  {
    name: 'Hawaii', slug: 'hawaii-2', abbr: 'HI', climate: CLIMATE.PACIFIC,
    tagline: 'Hawaii ICF construction — hurricane-ready and built for island life.',
    intro: 'ICF construction brings significant advantages to Hawaii\'s unique building environment.',
    intro2: 'See our full Hawaii page for details.',
    bullets: [], faqs: [],
  },
];

// Filter out the duplicate Hawaii entry
const uniqueStates = states.filter(s => s.slug !== 'hawaii-2');

// Add the remaining states with brief content
const remainingStates = [
  {
    name: 'Alaska', slug: 'alaska', abbr: 'AK',
  },
];

module.exports = uniqueStates;
