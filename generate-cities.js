/**
 * ICF Insider — City Page Generator
 * node generate-cities.js
 *
 * Generates /locations/[city-slug]/index.html for top US metros.
 * Follows the same pattern as generate-states.js.
 */
const fs = require('fs'), path = require('path');

const ICONS = {
  shield:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  bolt:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  dollar:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  drop:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  snow:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>`,
  sun:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`,
  fire:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>`,
  wind:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>`,
  quake: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  sound: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>`,
  home:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8780A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
};

const CARDS = {
  HURRICANE:[
    {i:'shield',t:'Hurricane Resistance',     b:`Insulated Concrete Form walls are rated for Category 4-5 wind speeds. ICF homes survive storms that destroy wood-frame neighbors.`},
    {i:'bolt',  t:'50-70% Lower Energy Bills', b:`Continuous foam insulation blocks heat and humidity far better than wood-framed walls — slashing cooling costs year-round.`},
    {i:'dollar',t:'Insurance Discounts',       b:`Insurers recognize concrete construction as significantly more storm-resistant. Coastal homeowners routinely see meaningful premium reductions.`},
    {i:'drop',  t:'Mold & Moisture Resistant', b:`Concrete doesn't rot or harbor mold — a chronic problem in humid coastal climates where wood walls absorb moisture season after season.`},
  ],
  TORNADO:[
    {i:'wind',  t:'Tornado-Grade Strength',    b:`Insulated Concrete Form walls are engineered to withstand extreme wind events. ICF is one of the few residential wall systems that can survive a direct tornado hit.`},
    {i:'bolt',  t:'40-60% Lower Energy Bills', b:`Tight continuous insulation dramatically outperforms standard framed walls — cutting heating and cooling costs across wide seasonal temperature swings.`},
    {i:'sound', t:'Superior Sound Insulation', b:`Thick concrete walls block outside noise — traffic, storms, neighbors — delivering noticeably quieter interiors compared to wood-frame construction.`},
    {i:'fire',  t:'4-Hour Fire Rating',         b:`ICF walls carry a 4-hour fire resistance rating — giving your family critical evacuation time and dramatically reducing total loss risk.`},
  ],
  COLD:[
    {i:'snow',  t:'Extreme Cold Performance',  b:`Insulated Concrete Form walls hold heat in during brutal winters far better than wood frame. Thermal mass smooths temperature swings and reduces peak heating loads.`},
    {i:'bolt',  t:'40-60% Heating Savings',    b:`Continuous foam insulation on both sides of the concrete core eliminates thermal bridging — the primary source of heat loss in traditional framing.`},
    {i:'fire',  t:'4-Hour Fire Rating',         b:`ICF walls carry a 4-hour fire resistance rating — critical protection, especially in rural areas where emergency response times are longer.`},
    {i:'sound', t:'Quiet & Comfortable',        b:`Dense concrete walls block outside noise and stabilize indoor temperatures — delivering a noticeably more comfortable home through long winters.`},
  ],
  HOT_DRY:[
    {i:'sun',   t:'Desert Heat Barrier',       b:`The thermal mass of Insulated Concrete Form walls absorbs daytime heat and releases it slowly overnight — naturally leveling indoor temperatures without overworking your AC.`},
    {i:'bolt',  t:'50-70% Cooling Savings',    b:`Continuous foam insulation and massive thermal mass dramatically outperform wood-frame walls in extreme heat. Lower utility bills every month.`},
    {i:'fire',  t:'Wildfire Resistant',         b:`Concrete doesn't ignite. ICF homes offer significantly better protection against wildfires increasingly common across arid regions.`},
    {i:'dollar',t:'Lower Long-Term Cost',       b:`Higher upfront cost is offset by dramatically lower energy bills and reduced maintenance. ICF homes in hot-dry climates often reach payback in under 10 years.`},
  ],
  PACIFIC:[
    {i:'quake', t:'Seismic Resilience',         b:`Insulated Concrete Form construction can be designed and reinforced to exceed seismic code requirements — far greater earthquake protection than standard wood framing.`},
    {i:'fire',  t:'Wildfire Resistant',         b:`Concrete doesn't burn. ICF homes are increasingly chosen in wildland-urban interface zones where wood-frame homes face total-loss risk from wildfires.`},
    {i:'bolt',  t:'40-60% Energy Savings',      b:`Continuous insulation and thermal mass keep interiors comfortable year-round with minimal heating or cooling.`},
    {i:'drop',  t:'Moisture & Mold Resistant',  b:`Concrete walls don't absorb moisture or support mold growth — a key advantage in wet coastal areas and high-humidity regions.`},
  ],
  MIXED:[
    {i:'shield',t:'All-Season Durability',      b:`Insulated Concrete Form walls handle every season — summer heat, winter cold, and severe storms — in one resilient wall system.`},
    {i:'bolt',  t:'40-60% Lower Energy Bills',  b:`Continuous foam insulation eliminates the thermal bridging that makes wood-frame homes inefficient in both heating and cooling seasons.`},
    {i:'fire',  t:'4-Hour Fire Rating',          b:`ICF walls carry a 4-hour fire resistance rating, giving families critical time during emergencies and reducing homeowner insurance risk.`},
    {i:'home',  t:'Lasting Resale Value',        b:`Concrete construction commands a premium on resale. ICF homes sell faster and at higher prices than comparable wood-frame homes in most markets.`},
  ],
};

// city, slug, state, stateSlug, stateAbbr, climate, tagline, stats, faq
const CITIES = [

// ── FLORIDA ──────────────────────────────────────────────────────────────
['Tampa','tampa-fl','Florida','florida','FL','HURRICANE',
 `Tampa Bay's hurricane exposure, intense humidity, and year-round heat make ICF construction one of the smartest investments a homeowner can make — storm-rated walls, lower energy bills, and insurance savings in one build.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors active in the Tampa Bay area?','Yes. Tampa, St. Petersburg, Clearwater, and the surrounding Hillsborough and Pinellas counties have active ICF builders. ICF Insider connects you with experienced contractors in the Tampa metro.'],
  ['How does ICF hold up against Tampa Bay hurricanes?','ICF walls are rated for Category 4+ winds — significantly stronger than wood frame construction. Tampa Bay\'s documented hurricane history makes concrete construction a smart long-term decision for homeowners in flood and wind zones.'],
  ['Will ICF save me money on homeowners insurance in Tampa?','Many Tampa Bay insurers offer meaningful premium reductions for concrete construction. Given Florida\'s high insurance market, the discount can significantly offset the ICF cost premium over time.'],
  ['What does an ICF home cost in Tampa?','Expect 5-10% more than wood frame — roughly $160-$220 per square foot in the Tampa market. Florida\'s energy costs and insurance premiums mean the payback period is often 6-9 years.']]],

['Orlando','orlando-fl','Florida','florida','FL','HURRICANE',
 `Orlando's intense heat, frequent thunderstorms, and hurricane season exposure make ICF construction the most resilient and energy-efficient choice for Central Florida homeowners.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF builders available in the Orlando area?','Yes. Orange, Seminole, Osceola, and Lake counties all have active ICF contractors. Orlando\'s rapid residential growth has increased ICF adoption significantly over the past five years.'],
  ['How does ICF perform in Central Florida\'s heat and humidity?','ICF\'s continuous foam insulation and thermal mass significantly outperform wood-frame walls in Florida\'s climate — blocking radiant heat, reducing AC loads, and eliminating the moisture absorption that causes mold in wood walls.'],
  ['Is ICF hurricane-rated for Orlando\'s wind zone?','Yes. Central Florida\'s wind zone requirements are met and exceeded by ICF construction. Homes in the Orlando metro built with ICF carry Category 4+ wind ratings standard.'],
  ['What does an ICF home cost in Orlando?','Expect 5-10% more than wood frame — roughly $155-$215 per square foot in the Orlando market. Energy and insurance savings typically deliver payback in 7-10 years.']]],

['Miami','miami-fl','Florida','florida','FL','HURRICANE',
 `Miami's direct hurricane exposure, extreme heat, and coastal humidity demand a wall system that can handle it all. ICF construction delivers Category 5-rated protection, 50-70% lower energy bills, and concrete durability built for South Florida.`,
 [['Cat 5','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Miami-Dade?','Yes. Miami-Dade, Broward, and Palm Beach counties all have experienced ICF builders. South Florida\'s strict Miami-Dade building code — one of the toughest in the US — is fully compatible with ICF construction.'],
  ['Does ICF meet Miami-Dade\'s high-velocity hurricane zone requirements?','Yes. ICF systems approved under Miami-Dade\'s product approval process meet the High Velocity Hurricane Zone requirements. Your ICF contractor will ensure proper product approval documentation is in place.'],
  ['How much can I save on insurance with an ICF home in Miami?','South Florida homeowners insurance is among the highest in the nation. Concrete construction typically qualifies for meaningful discounts — in some cases hundreds of dollars per year — that compound significantly over a 30-year mortgage.'],
  ['What does ICF construction cost in Miami?','Expect 8-13% more than wood frame — roughly $200-$280 per square foot in Miami markets. Given South Florida\'s energy costs and insurance market, payback is often achieved in 6-8 years.']]],

['Jacksonville','jacksonville-fl','Florida','florida','FL','HURRICANE',
 `Jacksonville's location on Florida's northeast coast puts it in the path of Atlantic hurricanes, tropical storms, and intense heat. ICF construction delivers the storm resistance and energy efficiency North Florida homeowners need.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Jacksonville?','Yes. Duval, Clay, St. Johns, and Nassau counties have active ICF builders. Jacksonville\'s large residential construction market supports a solid ICF contractor base.'],
  ['How does ICF handle Jacksonville\'s hurricane and wind risk?','Jacksonville sits in Florida\'s wind zone with exposure to both Gulf and Atlantic systems. ICF walls rated for Category 4+ winds provide significantly better storm protection than wood frame construction.'],
  ['Is ICF a good investment in Jacksonville?','Yes. Jacksonville\'s combination of hurricane exposure, high humidity, and hot summers makes ICF financially compelling — lower energy bills and insurance savings typically deliver payback in 7-10 years.'],
  ['What does ICF cost in Jacksonville?','Expect 5-10% more than wood frame — roughly $150-$210 per square foot in the Jacksonville market.']]],

['Sarasota','sarasota-fl','Florida','florida','FL','HURRICANE',
 `Sarasota's Gulf Coast location, high-value real estate market, and direct hurricane exposure make ICF construction the right choice for homeowners who want lasting protection and lower energy costs on Florida's west coast.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF builders in Sarasota?','Yes. Sarasota and Manatee counties have experienced ICF contractors serving the area\'s strong custom home market. ICF Insider connects you directly with local builders.'],
  ['How does ICF handle Gulf Coast hurricanes in Sarasota?','Sarasota sits on Florida\'s Gulf Coast, directly exposed to Gulf of Mexico hurricane tracks. ICF walls rated for Category 4+ winds are a natural fit for homeowners in Sarasota\'s wind and surge zones.'],
  ['Is ICF common in Sarasota\'s luxury home market?','Yes. ICF construction is increasingly chosen for Sarasota\'s high-end custom homes — the combination of storm protection, energy efficiency, and concrete durability commands a strong resale premium in this market.'],
  ['What does ICF cost in Sarasota?','Expect 6-11% more than wood frame — roughly $175-$245 per square foot in the Sarasota market. High local real estate values mean ICF\'s resale premium often justifies the upfront investment beyond just energy and insurance savings.']]],

// ── TEXAS ────────────────────────────────────────────────────────────────
['Houston','houston-tx','Texas','texas','TX','HURRICANE',
 `Houston's hurricane history, oppressive heat and humidity, and flood-prone terrain make ICF construction one of the most practical choices for homeowners in the Greater Houston area.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors active in Houston?','Yes. Harris, Fort Bend, Montgomery, and surrounding counties have active ICF builders. Houston\'s large custom home market and hurricane history have driven strong ICF adoption.'],
  ['How does ICF hold up against Houston hurricanes like Harvey and Ike?','ICF walls are rated for Category 4+ wind speeds. Multiple ICF homes in the Houston area sustained minimal damage through Hurricane Harvey while neighboring wood-frame structures were heavily damaged or destroyed.'],
  ['Does ICF help with Houston\'s flooding and humidity?','Concrete doesn\'t absorb water or support mold growth the way wood does. While ICF doesn\'t make a home flood-proof, it dramatically outperforms wood frame in post-flood recovery — concrete walls dry out; wood walls often require full replacement.'],
  ['What does ICF cost in Houston?','Expect 5-10% more than wood frame — roughly $155-$215 per square foot. Houston\'s energy costs and hurricane risk mean payback is often achieved in 7-9 years.']]],

['Dallas','dallas-tx','Texas','texas','TX','TORNADO',
 `Dallas sits in the heart of Tornado Alley with extreme heat, ice storms, and wide seasonal temperature swings. ICF construction delivers the wind protection, energy efficiency, and all-season durability DFW homeowners need.`,
 [['Tornado-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF builders active in the Dallas-Fort Worth area?','Yes. DFW has one of the most active ICF contractor communities in Texas. Dallas, Fort Worth, Plano, Frisco, McKinney, and surrounding suburbs all have experienced ICF builders.'],
  ['How does ICF perform against Dallas tornadoes?','ICF walls are one of the few residential wall systems engineered to withstand tornado-force winds. The Dallas-Fort Worth metro is one of the most tornado-active metro areas in the US — ICF construction is a practical response to that risk.'],
  ['Does ICF help with Dallas energy bills?','Yes significantly. DFW\'s extreme summers and cold winters mean HVAC runs hard all year. ICF\'s continuous insulation eliminates thermal bridging and reduces peak heating and cooling loads — homeowners typically report 40-60% reductions in energy costs.'],
  ['What does ICF cost in Dallas?','Expect 5-10% more than wood frame — roughly $155-$220 per square foot in DFW markets. Strong resale values in North Texas neighborhoods make ICF a solid financial decision.']]],

['Austin','austin-tx','Texas','texas','TX','TORNADO',
 `Austin's explosive growth, extreme heat, and severe weather exposure make ICF construction an increasingly popular choice for homeowners who want a home that performs in the Texas climate and holds its value.`,
 [['Tornado-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Austin?','Yes. Travis, Williamson, Hays, and Bastrop counties have active ICF builders. Austin\'s booming custom home market has driven strong demand for higher-performance construction.'],
  ['How does ICF hold up in Austin\'s heat and extreme weather?','Austin regularly sees 100°F+ summers and occasional winter ice storms like Winter Storm Uri. ICF\'s thermal mass and continuous insulation handle both extremes far better than wood frame — keeping homes cooler in summer and warmer during rare hard freezes.'],
  ['Is ICF a good investment in Austin\'s real estate market?','Austin\'s high property values make the ICF premium easier to justify. Energy savings, lower maintenance, and storm resilience all contribute to a strong long-term return in Austin\'s competitive market.'],
  ['What does ICF cost in Austin?','Expect 6-11% more than wood frame — roughly $170-$240 per square foot in Austin\'s market. Central Texas energy costs mean payback on the premium often comes in 8-11 years.']]],

['San Antonio','san-antonio-tx','Texas','texas','TX','TORNADO',
 `San Antonio's intense summer heat, tornado exposure, and rapid suburban growth make ICF construction a smart, durable choice for homeowners building in the Alamo City and surrounding Hill Country.`,
 [['Tornado-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF builders available in San Antonio?','Yes. Bexar County and the surrounding Hill Country counties have active ICF contractors. San Antonio\'s strong custom home market supports experienced ICF builders.'],
  ['How does ICF perform in San Antonio\'s heat?','San Antonio sees intense summer heat with temperatures regularly exceeding 100°F. ICF\'s thermal mass absorbs daytime heat and releases it slowly — reducing AC loads and delivering meaningful energy savings compared to wood frame.'],
  ['Is ICF suitable for San Antonio\'s limestone terrain?','ICF construction works well on San Antonio\'s varied terrain. Your contractor will handle foundation design appropriate for local soil and rock conditions — ICF adapts to both slab and basement foundations.'],
  ['What does ICF cost in San Antonio?','Expect 5-10% more than wood frame — roughly $145-$205 per square foot in the San Antonio market.']]],

// ── ARIZONA ──────────────────────────────────────────────────────────────
['Phoenix','phoenix-az','Arizona','arizona','AZ','HOT_DRY',
 `Phoenix summers regularly hit 115°F. No wall system handles extreme desert heat better than ICF — thermal mass absorbs daytime heat, continuous insulation stops it from entering, and energy bills drop 50-70%.`,
 [['50-70%','Cooling Savings'],['R-22+','Wall Insulation'],['4-hr','Fire Rating']],
 [['Are ICF contractors active in the Phoenix metro?','Yes. Maricopa County has an active ICF contractor community. Phoenix, Scottsdale, Mesa, Chandler, Gilbert, Tempe, and surrounding suburbs all have experienced ICF builders.'],
  ['Why is ICF particularly well-suited for Phoenix\'s desert climate?','Phoenix\'s extreme heat is exactly what ICF is designed for. The thermal mass of the concrete core absorbs heat during the day and releases it slowly at night — naturally leveling indoor temperatures without overworking the AC. Combined with continuous foam insulation, ICF outperforms wood frame dramatically in Phoenix\'s climate.'],
  ['How much can I save on energy with an ICF home in Phoenix?','Phoenix homeowners with ICF homes typically report 50-70% reductions in cooling costs — significant savings given Phoenix\'s long, intense cooling season. Payback on the ICF premium often comes in 6-9 years.'],
  ['What does ICF cost in Phoenix?','Expect 6-11% more than wood frame — roughly $160-$230 per square foot in the Phoenix market.']]],

['Tucson','tucson-az','Arizona','arizona','AZ','HOT_DRY',
 `Tucson's desert heat, dramatic day-night temperature swings, and wildfire risk in surrounding desert terrain make ICF construction the most resilient and energy-efficient wall system for Southern Arizona homeowners.`,
 [['50-70%','Cooling Savings'],['R-22+','Wall Insulation'],['4-hr','Fire Rating']],
 [['Are ICF builders available in Tucson?','Yes. Pima County has experienced ICF contractors serving Tucson\'s custom home market. ICF Insider connects you with local builders.'],
  ['How does ICF handle Tucson\'s day-night temperature swings?','Tucson is known for large day-night temperature differentials — sometimes 30-40°F. ICF\'s thermal mass is ideal for this climate: it absorbs heat during the hot day and releases it as temperatures drop at night, naturally reducing HVAC demand.'],
  ['Is ICF good for wildfire-prone areas around Tucson?','Yes. Concrete doesn\'t burn. Homes in Tucson\'s wildland-urban interface — the Catalina Foothills, Rincon Valley, and surrounding desert communities — benefit significantly from ICF\'s fire resistance compared to wood frame.'],
  ['What does ICF cost in Tucson?','Expect 6-11% more than wood frame — roughly $150-$210 per square foot in the Tucson market.']]],

// ── GEORGIA ──────────────────────────────────────────────────────────────
['Atlanta','atlanta-ga','Georgia','georgia','GA','MIXED',
 `Atlanta's hot summers, occasional severe storms, and all-season climate make ICF construction an increasingly popular choice for homeowners who want lower energy bills and lasting durability in the Southeast's largest metro.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Are ICF contractors active in Atlanta?','Yes. Fulton, Gwinnett, Cherokee, Forsyth, and surrounding metro counties have active ICF builders. Atlanta\'s large custom home market has strong ICF representation.'],
  ['How does ICF perform in Atlanta\'s climate?','Atlanta\'s hot, humid summers and mild but occasionally harsh winters make ICF an excellent choice. Continuous insulation reduces cooling loads in summer and heating loads in winter — with homeowners typically reporting 40-60% energy savings.'],
  ['Is ICF popular in Atlanta\'s suburban home market?','ICF adoption is growing in Atlanta\'s northern suburbs — particularly in Cherokee, Forsyth, and Hall counties where custom home construction is active. Higher lot costs in these markets make the ICF premium easier to justify.'],
  ['What does ICF cost in Atlanta?','Expect 5-10% more than wood frame — roughly $155-$225 per square foot in the Atlanta metro. Strong suburban resale values make ICF a financially solid choice.']]],

// ── NORTH CAROLINA ────────────────────────────────────────────────────────
['Charlotte','charlotte-nc','North Carolina','north-carolina','NC','MIXED',
 `Charlotte's mix of hot summers, occasional severe weather, and mild winters make ICF construction a smart choice for homeowners in the Carolinas' largest city — lower energy bills, storm resilience, and lasting durability.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['Cat 3+','Wind Resistance']],
 [['Are ICF contractors available in Charlotte?','Yes. Mecklenburg, Union, Cabarrus, and surrounding counties have active ICF builders. Charlotte\'s rapid growth has increased ICF adoption across the metro.'],
  ['How does ICF perform in Charlotte\'s climate?','Charlotte\'s humid subtropical climate — hot summers, mild winters, occasional ice storms — benefits from ICF\'s continuous insulation and thermal mass. Homeowners report 40-60% energy savings year-round.'],
  ['Is ICF suitable for Charlotte\'s suburban and custom home market?','Yes. ICF is used throughout Charlotte\'s high-end custom home market in Ballantyne, Waxhaw, Davidson, and Lake Norman areas. Concrete construction commands a premium on resale.'],
  ['What does ICF cost in Charlotte?','Expect 5-10% more than wood frame — roughly $155-$220 per square foot in the Charlotte market.']]],

['Raleigh','raleigh-nc','North Carolina','north-carolina','NC','MIXED',
 `Raleigh's fast-growing residential market, hot summers, and coastal storm exposure make ICF construction a compelling choice for Triangle-area homeowners building for the long term.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['Cat 3+','Wind Resistance']],
 [['Are ICF builders active in the Raleigh-Durham area?','Yes. Wake, Durham, Johnston, and surrounding counties have experienced ICF contractors. The Research Triangle\'s strong custom home market supports active ICF builders.'],
  ['How does ICF handle North Carolina\'s hurricane remnants in Raleigh?','Raleigh is inland but regularly impacted by tropical systems — Hurricane Florence and Dorian brought significant wind and rain to the Triangle. ICF\'s wind resistance and moisture impermeability provide real protection against these events.'],
  ['Is ICF a good investment in Raleigh\'s growing market?','Raleigh\'s strong real estate market makes ICF\'s upfront premium easier to recoup on resale. Energy savings and durability add to the long-term financial case.'],
  ['What does ICF cost in Raleigh?','Expect 5-10% more than wood frame — roughly $155-$220 per square foot in the Raleigh-Durham market.']]],

// ── COLORADO ─────────────────────────────────────────────────────────────
['Denver','denver-co','Colorado','colorado','CO','MIXED',
 `Denver's dramatic temperature swings, hail storms, and wildfire risk along the Front Range make ICF construction the most durable and energy-efficient choice for Colorado homeowners.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['Wildfire Resistant','Concrete Walls']],
 [['Are ICF builders active in Denver?','Yes. Denver, Jefferson, Arapahoe, Douglas, and Boulder counties all have experienced ICF contractors. Colorado\'s strong custom home market has solid ICF adoption, especially in the foothills communities.'],
  ['How does ICF handle Denver\'s temperature swings?','Denver\'s wide temperature range — from -20°F winters to 100°F summers — is exactly what ICF is designed for. Continuous insulation eliminates thermal bridging while thermal mass smooths daily temperature swings, reducing both heating and cooling loads significantly.'],
  ['Is ICF a good choice for wildfire-prone areas near Denver?','Absolutely. Many Denver suburbs — Evergreen, Conifer, Morrison, and foothill communities — sit in high wildfire risk zones. Concrete walls don\'t burn. ICF offers dramatically better fire protection than wood or wood-siding homes in these areas.'],
  ['What does ICF cost in Denver?','Expect 6-12% more than wood frame — roughly $175-$250 per square foot in Denver metro markets. Colorado\'s energy costs and wildfire insurance premiums make the ICF payback case compelling.']]],

// ── NEVADA ────────────────────────────────────────────────────────────────
['Las Vegas','las-vegas-nv','Nevada','nevada','NV','HOT_DRY',
 `Las Vegas summers regularly exceed 115°F. ICF construction is one of the few wall systems that meaningfully handles Nevada\'s extreme desert heat — cutting cooling costs 50-70% and delivering comfort no wood-frame home can match.`,
 [['50-70%','Cooling Savings'],['R-22+','Wall Insulation'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Las Vegas?','Yes. Clark County has experienced ICF builders serving Las Vegas\'s custom and luxury home market. ICF Insider connects you with local contractors.'],
  ['Why is ICF so well-suited for Las Vegas heat?','Las Vegas\'s desert climate is ICF\'s ideal use case. The concrete core\'s thermal mass absorbs extreme daytime heat and releases it slowly at night — working with the natural desert temperature cycle to reduce AC demand. Combined with R-22+ insulation, the performance gap over wood frame is significant.'],
  ['How much can I save on energy in Las Vegas with ICF?','Las Vegas homeowners with ICF homes typically report 50-70% reductions in cooling costs — among the highest energy savings anywhere in the country given the extreme desert heat and long cooling season. Payback on the premium often comes in 5-8 years.'],
  ['What does ICF cost in Las Vegas?','Expect 6-11% more than wood frame — roughly $160-$230 per square foot in the Las Vegas market.']]],

// ── UTAH ─────────────────────────────────────────────────────────────────
['Salt Lake City','salt-lake-city-ut','Utah','utah','UT','HOT_DRY',
 `Salt Lake City's wide temperature swings — blazing summers, cold winters, and increasing wildfire risk in the Wasatch Front foothills — make ICF construction the most resilient all-season wall system for Utah homeowners.`,
 [['50-70%','Cooling Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Are ICF builders active in Salt Lake City?','Yes. Salt Lake, Utah, Davis, and Weber counties have active ICF contractors. The Wasatch Front\'s strong residential market and extreme climate drive solid ICF demand.'],
  ['How does ICF handle Salt Lake City\'s climate extremes?','SLC\'s climate is demanding in both directions — hot, dry summers and cold mountain winters. ICF handles both: thermal mass reduces cooling loads in summer while continuous insulation eliminates heat loss in winter. Homeowners report 40-60% energy savings year-round.'],
  ['Is ICF good for wildfire risk in the Salt Lake foothills?','Yes. Communities along the Wasatch Front — Draper, Sandy, Murray, and foothill neighborhoods — face growing wildfire exposure. Concrete walls don\'t ignite, giving ICF homes a meaningful advantage over wood-frame construction in fire-prone areas.'],
  ['What does ICF cost in Salt Lake City?','Expect 6-12% more than wood frame — roughly $165-$235 per square foot in the Wasatch Front market.']]],

// ── TENNESSEE ────────────────────────────────────────────────────────────
['Nashville','nashville-tn','Tennessee','tennessee','TN','TORNADO',
 `Nashville sits in a region with significant tornado risk, hot summers, and cold winters. ICF construction delivers the wind protection, all-season energy efficiency, and durability Middle Tennessee homeowners need.`,
 [['Tornado-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Nashville?','Yes. Davidson, Williamson, Rutherford, Wilson, and surrounding counties have active ICF builders. Nashville\'s booming residential market has driven strong ICF adoption.'],
  ['How does ICF protect against Nashville tornadoes?','Middle Tennessee is regularly impacted by tornadoes — the 2020 Nashville tornado outbreak was a stark reminder. ICF walls are engineered for extreme wind events and provide significantly better tornado protection than wood-frame construction.'],
  ['Is ICF a good investment in Nashville\'s real estate market?','Nashville\'s strong appreciation in Williamson County and surrounding suburbs makes the ICF premium easier to recoup. Energy savings and storm resilience add to the long-term financial case.'],
  ['What does ICF cost in Nashville?','Expect 5-10% more than wood frame — roughly $155-$225 per square foot in the Nashville metro market.']]],

// ── SOUTH CAROLINA ────────────────────────────────────────────────────────
['Charleston','charleston-sc','South Carolina','south-carolina','SC','HURRICANE',
 `Charleston's direct Atlantic hurricane exposure, coastal humidity, and high-value real estate make ICF construction the most resilient choice for Lowcountry homeowners building for the long term.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF builders available in Charleston?','Yes. Charleston, Berkeley, and Dorchester counties have experienced ICF contractors serving the Lowcountry\'s strong custom home market. ICF Insider connects you with local builders.'],
  ['How does ICF perform against Charleston hurricanes?','Charleston sits directly in the Atlantic hurricane track and has been hit by multiple major storms. ICF walls rated for Category 4+ winds provide real structural protection — the difference between minimal damage and total loss in major hurricane events.'],
  ['Is ICF a good investment in Charleston\'s coastal real estate market?','Charleston\'s high real estate values, combined with the area\'s hurricane risk and high insurance costs, make ICF particularly compelling financially. Insurance savings alone can offset a significant portion of the ICF premium over time.'],
  ['What does ICF cost in Charleston?','Expect 6-12% more than wood frame — roughly $175-$250 per square foot in the Charleston market. Coastal premiums are higher but insurance savings are proportionally larger.']]],

// ── VIRGINIA ─────────────────────────────────────────────────────────────
['Virginia Beach','virginia-beach-va','Virginia','virginia','VA','HURRICANE',
 `Virginia Beach sits directly on the Atlantic coast with full hurricane exposure. ICF construction delivers the storm protection, energy efficiency, and durability coastal Virginia homeowners need to build with confidence.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Are ICF contractors available in Virginia Beach?','Yes. Virginia Beach, Chesapeake, Norfolk, and the Hampton Roads region have experienced ICF builders. The area\'s coastal exposure has driven growing ICF adoption.'],
  ['How does ICF handle Virginia Beach\'s hurricane and nor\'easter risk?','Virginia Beach faces both Atlantic hurricane threats and powerful nor\'easters. ICF walls rated for Category 4+ winds provide significantly better protection than wood-frame construction — an important consideration in Hampton Roads\'s documented storm history.'],
  ['Does ICF help with Virginia Beach\'s coastal flooding and salt air?','Concrete doesn\'t corrode in salt air environments the way metal-framed or wood structures can. While ICF doesn\'t prevent flooding, it is far more resilient than wood frame in post-flood recovery — concrete walls dry out where wood walls often require full replacement.'],
  ['What does ICF cost in Virginia Beach?','Expect 6-12% more than wood frame — roughly $170-$240 per square foot in the Hampton Roads market.']]],

// ── NEW YORK ─────────────────────────────────────────────────────────────
['Albany','albany-ny','New York','new-york','NY','COLD',
 `Albany's harsh winters, heavy snow loads, and wide seasonal temperature swings make ICF construction one of the most financially compelling investments a Capital Region homeowner can make.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Are ICF builders available in the Albany area?','Yes. Albany, Saratoga, Schenectady, and Rensselaer counties have experienced ICF contractors. The Capital Region\'s custom home market has solid ICF representation.'],
  ['How much can I save on heating with an ICF home in Albany?','Albany\'s cold winters and high heating costs mean ICF\'s 40-60% energy savings are financially significant. Given New York\'s utility rates, payback on the ICF premium often comes in 8-11 years.'],
  ['Does ICF handle Albany\'s snow loads?','Yes. ICF structures are engineered to carry significant roof and snow loads. Concrete walls also eliminate the air infiltration that standard framing struggles with in extreme cold — a key advantage in Albany\'s winter climate.'],
  ['What does ICF cost in Albany?','Expect 5-10% more than wood frame — roughly $155-$215 per square foot in the Albany market.']]],

['Buffalo','buffalo-ny','New York','new-york','NY','COLD',
 `Buffalo's lake-effect snow, brutal winters, and high heating costs make ICF construction the most energy-efficient and resilient wall system for Western New York homeowners.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Are ICF contractors active in Buffalo?','Yes. Erie and Niagara counties have experienced ICF builders serving Buffalo\'s residential market. ICF Insider connects you with local contractors.'],
  ['How does ICF handle Buffalo\'s lake-effect snow and extreme cold?','Buffalo\'s lake-effect winters are among the harshest in the US. ICF\'s continuous insulation eliminates the thermal bridging that makes wood-frame homes expensive to heat — delivering consistent warmth even during Buffalo\'s most extreme cold snaps.'],
  ['How much can I save on heating in Buffalo with ICF?','Buffalo homeowners with ICF homes consistently report 40-60% reductions in heating costs — significant savings given Western New York\'s long winters and high natural gas costs.'],
  ['What does ICF cost in Buffalo?','Expect 5-10% more than wood frame — roughly $145-$205 per square foot in the Buffalo market.']]],

// ── CALIFORNIA ───────────────────────────────────────────────────────────
['Los Angeles','los-angeles-ca','California','california','CA','PACIFIC',
 `Los Angeles faces earthquake risk, wildfire exposure in surrounding hills, and strict energy codes. ICF construction delivers seismic resilience, fire resistance, and energy performance that exceeds California's demanding standards.`,
 [['Seismic-Ready','Structural Design'],['4-hr','Fire Rating'],['40-60%','Energy Savings']],
 [['Are ICF contractors available in Los Angeles?','Yes. Los Angeles, Orange, Ventura, and San Bernardino counties have experienced ICF builders. California\'s strict energy code and growing wildfire awareness have driven increased ICF adoption across the region.'],
  ['How does ICF handle Los Angeles earthquake risk?','ICF can be engineered to exceed California\'s seismic requirements — providing significantly better earthquake resistance than wood-frame construction. For homeowners in LA\'s hillside communities and high-seismic zones, ICF\'s structural integrity is a meaningful advantage.'],
  ['Is ICF good for wildfire protection in the LA hills?','Concrete doesn\'t burn. Homes in Malibu, Altadena, the Santa Monica Mountains, and other wildland-urban interface communities benefit significantly from ICF\'s fire resistance. Post-fire rebuilding in LA increasingly includes ICF as homeowners look for better protection.'],
  ['What does ICF cost in Los Angeles?','Expect 7-13% more than wood frame — roughly $240-$360 per square foot in LA markets. California\'s high construction costs mean the absolute premium is significant, but energy savings and resale values in LA\'s market typically justify the investment.']]],

['San Diego','san-diego-ca','California','california','CA','PACIFIC',
 `San Diego's combination of seismic risk, wildfire exposure in the backcountry, and California's strict energy standards make ICF construction a smart, resilient choice for homeowners throughout San Diego County.`,
 [['Seismic-Ready','Structural Design'],['4-hr','Fire Rating'],['40-60%','Energy Savings']],
 [['Are ICF builders active in San Diego?','Yes. San Diego County has experienced ICF contractors. ICF adoption in San Diego has grown as wildfire awareness and seismic preparedness have become stronger priorities for homeowners.'],
  ['How does ICF handle San Diego\'s earthquake and wildfire risk?','San Diego sits near multiple active fault systems and its eastern communities face serious wildfire exposure — the 2003 Cedar Fire and 2007 Witch Creek Fire destroyed thousands of homes. ICF addresses both risks: engineered seismic resistance and non-combustible concrete walls.'],
  ['Does ICF meet California\'s Title 24 energy code in San Diego?','Yes. ICF meets and typically exceeds California\'s Title 24 energy requirements with ease. The combination of R-22+ insulation and thermal mass often allows for simplified HVAC design.'],
  ['What does ICF cost in San Diego?','Expect 7-13% more than wood frame — roughly $235-$350 per square foot in San Diego markets.']]],

// ── OHIO ─────────────────────────────────────────────────────────────────
['Columbus','columbus-oh','Ohio','ohio','OH','MIXED',
 `Columbus experiences cold winters, hot humid summers, and occasional severe storms. ICF construction delivers all-season energy efficiency, tornado resilience, and lasting durability for Central Ohio homeowners.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['Tornado-Rated','Wind Resistance']],
 [['Are ICF contractors active in Columbus?','Yes. Franklin, Delaware, Licking, and surrounding counties have experienced ICF builders. Columbus\'s strong residential construction market has solid ICF representation.'],
  ['How does ICF handle Ohio\'s climate extremes?','Columbus sees hot, humid summers and cold winters — both benefit from ICF. Continuous insulation reduces cooling loads in summer and heating loads in winter. The concrete core\'s mass smooths temperature swings and stabilizes indoor comfort.'],
  ['Is Columbus in a tornado risk area?','Ohio is on the eastern edge of Tornado Alley. The Columbus area has experienced significant tornado activity historically. ICF\'s wind resistance provides meaningfully better tornado protection than wood-frame construction.'],
  ['What does ICF cost in Columbus?','Expect 5-10% more than wood frame — roughly $145-$205 per square foot in the Columbus market.']]],

// ── PENNSYLVANIA ─────────────────────────────────────────────────────────
['Philadelphia','philadelphia-pa','Pennsylvania','pennsylvania','PA','MIXED',
 `Philadelphia's four-season climate — hot humid summers, cold winters, and coastal storm exposure — makes ICF construction an excellent investment for homeowners in the Delaware Valley region.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Are ICF builders available in Philadelphia?','Yes. Philadelphia, Montgomery, Delaware, Bucks, and Chester counties have experienced ICF contractors. The Delaware Valley\'s strong custom home market supports active ICF builders.'],
  ['How does ICF handle Philadelphia\'s climate?','Philadelphia\'s humid continental climate — hot summers, cold winters, nor\'easters — benefits from ICF\'s continuous insulation and thermal mass. Homeowners report 40-60% energy savings across all seasons.'],
  ['Is ICF good for Philadelphia\'s rowhouse and urban rebuild market?','ICF is increasingly used in Philadelphia\'s urban infill market for its sound isolation, energy performance, and fire resistance — practical advantages in dense urban construction environments.'],
  ['What does ICF cost in Philadelphia?','Expect 5-10% more than wood frame — roughly $165-$235 per square foot in the Philadelphia market.']]],
];

// ─── PAGE TEMPLATE ────────────────────────────────────────────────────────
function page(city, slug, state, stateSlug, stateAbbr, climate, tagline, stats, faq) {
  const homeownerHref = `/get-connected.html?tab=homeowner&state=${encodeURIComponent(state)}`;
  const cardsHtml = CARDS[climate].map(c =>
    `<div class="why-card"><div class="why-icon">${ICONS[c.i]}</div><div><h3>${c.t}</h3><p>${c.b}</p></div></div>`
  ).join('');
  const statsHtml = stats.map(([v,l]) =>
    `<div class="state-stat"><span class="state-stat-number">${v}</span><span class="state-stat-label">${l}</span></div>`
  ).join('');
  const faqHtml = faq.map(([q,a]) =>
    `<div class="faq-card"><h3>${q}</h3><p>${a}</p></div>`
  ).join('');
  const faqSchema = faq.map(([q,a]) =>
    `{"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a)}}}`
  ).join(',');
  const id = slug.replace(/-/g,'');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ICF Contractors in ${city}, ${stateAbbr} | Insulated Concrete Form Homes | ICF Insider</title>
  <meta name="description" content="Find ICF contractors in ${city}, ${state}. Local ICF builders, cost data, and climate performance for Insulated Concrete Form construction in the ${city} area.">
  <link rel="canonical" href="https://icfinsider.com/locations/${slug}/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:title" content="ICF Contractors in ${city}, ${stateAbbr} | ICF Insider">
  <meta property="og:description" content="${tagline.substring(0,120)}">
  <meta property="og:image" content="https://icfinsider.com/images/og-image.png">
  <meta property="og:url" content="https://icfinsider.com/locations/${slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/components.css">
  <style>
    .state-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);margin-top:var(--space-10);padding-top:var(--space-10);border-top:1px solid rgba(255,255,255,0.12);}
    .state-stat{text-align:center;}
    .state-stat-number{display:block;font-family:var(--font-display);font-size:clamp(1.8rem,5vw,2.8rem);font-weight:800;color:var(--color-accent);line-height:1;}
    .state-stat-label{display:block;font-size:0.78rem;color:rgba(255,255,255,0.6);margin-top:var(--space-1);text-transform:uppercase;letter-spacing:0.06em;}
    .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-top:var(--space-8);}
    .why-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);display:flex;gap:var(--space-4);align-items:flex-start;}
    .why-icon{flex-shrink:0;width:40px;height:40px;background:rgba(232,120,10,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;}
    .why-card h3{margin:0 0 4px;font-size:0.95rem;font-weight:600;}
    .why-card p{margin:0;font-size:0.875rem;color:var(--color-text-muted);line-height:1.55;}
    .faq-list{display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-8);}
    .faq-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6) var(--space-7);}
    .faq-card h3{margin:0 0 var(--space-2);font-size:0.975rem;font-weight:600;}
    .faq-card p{margin:0;font-size:0.875rem;color:var(--color-text-muted);line-height:1.7;}
    .learn-strip{margin-top:var(--space-20);background:var(--color-dark-900);border-radius:14px;padding:var(--space-8) var(--space-10);display:flex;align-items:center;justify-content:space-between;gap:var(--space-8);flex-wrap:wrap;}
    .learn-strip h3{margin:0 0 var(--space-1);color:var(--color-text-light);font-size:1.15rem;}
    .learn-strip p{margin:0;color:var(--color-text-muted);font-size:0.875rem;}
    .learn-strip-links{display:flex;gap:var(--space-3);flex-shrink:0;flex-wrap:wrap;}
    @media(max-width:767px){.why-grid{grid-template-columns:1fr;}.learn-strip{flex-direction:column;align-items:flex-start;padding:var(--space-6);}}
  </style>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://icfinsider.com/"},{"@type":"ListItem","position":2,"name":"Find a Pro","item":"https://icfinsider.com/find-a-pro.html"},{"@type":"ListItem","position":3,"name":"ICF in ${state}","item":"https://icfinsider.com/states/${stateSlug}/"},{"@type":"ListItem","position":4,"name":"ICF Contractors in ${city}","item":"https://icfinsider.com/locations/${slug}/"}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
  </script>
</head>
<body>
  <nav class="nav" id="main-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
      <ul class="nav-links" role="list">
        <li><a href="/icf-101.html" class="nav-link">ICF 101</a></li>
        <li><a href="/cost-guide.html" class="nav-link">Cost Guide</a></li>
        <li><a href="/brands.html" class="nav-link">Brand Comparison</a></li>
        <li><a href="/find-a-pro.html" class="nav-link active">Find a Pro</a></li>
      </ul>
      <div class="nav-cta"><a href="${homeownerHref}" class="btn btn-primary">Get Connected</a></div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/icf-101.html" class="nav-link">ICF 101</a>
    <a href="/cost-guide.html" class="nav-link">Cost Guide</a>
    <a href="/brands.html" class="nav-link">Brand Comparison</a>
    <a href="/find-a-pro.html" class="nav-link active">Find a Pro</a>
    <a href="${homeownerHref}" class="btn btn-primary">Get Connected</a>
  </div>
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <div class="page-hero-meta">
        <span class="page-hero-tag"><a href="/states/${stateSlug}/" style="color:inherit;text-decoration:none;">ICF in ${state}</a></span>
        <span class="page-hero-readtime">${city}, ${stateAbbr}</span>
      </div>
      <h1 id="page-title">ICF Contractors in ${city}, ${stateAbbr}</h1>
      <p class="page-hero-intro" style="max-width:580px;">${tagline}</p>
      <div style="margin-top:var(--space-6);">
        <a href="${homeownerHref}" class="btn btn-primary btn-lg">Get Connected in ${city} &rarr;</a>
      </div>
      <div class="state-stats">${statsHtml}</div>
    </div>
  </section>
  <div class="container" style="padding-top:var(--space-10);padding-bottom:var(--space-20);">
    <div class="content-layout">
      <article class="article" id="article">
        <section id="why-${id}">
          <span class="eyebrow">Why ${city}</span>
          <h2 style="margin-top:var(--space-2);">The Case for ICF Construction in ${city}, ${stateAbbr}</h2>
          <div class="why-grid">${cardsHtml}</div>
        </section>
        <section id="${id}-directory" style="margin-top:var(--space-16);">
          <span class="eyebrow">Get Connected</span>
          <h2 style="margin-top:var(--space-2);">Find ICF Help in ${city}</h2>
          <p style="color:var(--color-text-muted);max-width:540px;">Tell us about your ${city} project and we'll connect you with local ICF professionals who can help with pricing and next steps.</p>
          <div style="margin-top:var(--space-6);">
            <a href="${homeownerHref}" class="btn btn-primary btn-lg">Get Connected &rarr;</a>
            <p class="form-disclaimer" style="margin-top:var(--space-3);">We only share your request with relevant local ICF professionals — never unrelated marketers.</p>
          </div>
          <div class="contractor-banner">
            <div class="contractor-banner-text">
              <span class="eyebrow" style="font-size:0.7rem;">ICF Contractors &amp; Builders</span>
              <p>Are you an ICF contractor in the ${city} area? Get listed free and start getting found by local homeowners.</p>
            </div>
            <a href="/get-connected.html?tab=contractor" class="btn btn-primary">List Your Business Free &rarr;</a>
          </div>
        </section>
        <section id="${id}-faq" style="margin-top:var(--space-16);">
          <span class="eyebrow">FAQ</span>
          <h2 style="margin-top:var(--space-2);">Common Questions About ICF Construction in ${city}</h2>
          <div class="faq-list">${faqHtml}</div>
        </section>
        <div class="learn-strip">
          <div><h3>New to ICF?</h3><p>Read the full guide before you search for a contractor. Know what to look for.</p></div>
          <div class="learn-strip-links">
            <a href="/icf-101.html" class="btn btn-primary">ICF 101 Guide</a>
            <a href="/cost-guide.html" class="btn btn-secondary" style="color:var(--color-text-light);border-color:rgba(255,255,255,0.2);">Cost Guide</a>
          </div>
        </div>
      </article>
      <aside class="toc-sidebar" aria-label="Page navigation">
        <div class="toc-inner">
          <p class="toc-label">On this page</p>
          <ul class="toc-list">
            <li><a href="#why-${id}" class="toc-link">Why ${city} Chooses ICF</a></li>
            <li><a href="#${id}-directory" class="toc-link">Find Local ICF Help</a></li>
            <li><a href="#${id}-faq" class="toc-link">Common Questions</a></li>
          </ul>
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
            <p style="font-size:0.8rem;color:var(--color-text-muted);margin:0 0 var(--space-3);">More in ${state}</p>
            <a href="/states/${stateSlug}/" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;">ICF in ${state} &rarr;</a>
          </div>
          <div style="margin-top:var(--space-4);">
            <a href="/find-a-pro.html" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;">Find an ICF Contractor &rarr;</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
          <p>The independent authority on Insulated Concrete Form construction.</p>
        </div>
        <div class="footer-col"><h4>Learn</h4><ul class="footer-links" role="list"><li><a href="/icf-101.html" class="footer-link">ICF 101</a></li><li><a href="/cost-guide.html" class="footer-link">Cost Guide</a></li><li><a href="/brands.html" class="footer-link">Brand Comparison</a></li></ul></div>
        <div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro.html" class="footer-link">Find a Pro</a></li><li><a href="/get-connected.html?tab=contractor" class="footer-link">List Your Business</a></li></ul></div>
        <div class="footer-col"><h4>Company</h4><ul class="footer-links" role="list"><li><a href="/about.html" class="footer-link">About</a></li><li><a href="/get-connected.html" class="footer-link">Contact</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>&copy; 2026 ICF Insider. Independent and unaffiliated with any ICF brand or manufacturer.</p></div>
    </div>
  </footer>
  <script src="/js/main.js"></script>
</body>
</html>`;
}

// ─── RUNNER ───────────────────────────────────────────────────────────────
let n = 0;
for (const [city, slug, state, stateSlug, stateAbbr, climate, tagline, stats, faq] of CITIES) {
  const dir = path.join(__dirname, 'locations', slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(city, slug, state, stateSlug, stateAbbr, climate, tagline, stats, faq), 'utf8');
  console.log(`ok    ${slug}`);
  n++;
}
console.log(`\nDone: ${n} city pages written.`);
