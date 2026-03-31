/**
 * ICF Insider — State Page Generator
 * node generate-states.js
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

const WHY_SUB = {
  HURRICANE:`No other wall system addresses this state's storm and humidity challenges this completely. One build. Decades of performance.`,
  TORNADO:  `No other residential wall system handles tornado country like Insulated Concrete Form. One build. Real protection.`,
  COLD:     `No other wall system addresses this state's cold-climate challenges this completely. Insulate once, save every month.`,
  HOT_DRY:  `No other wall system handles desert heat this efficiently. Thermal mass plus continuous insulation — the combination wood can't match.`,
  PACIFIC:  `No other wall system addresses this state's seismic, fire, and efficiency challenges this completely. One build. Lasting resilience.`,
  MIXED:    `No other wall system addresses this state's full range of climate challenges this completely. One build. Every season covered.`,
};

// Each state: [name, slug, climate, tagline, [[stat,label],...], [[q,a],...]]
const STATES = [
['Alabama','alabama','HURRICANE',
 `Alabama's Gulf Coast exposure, extreme heat, and severe storm season make Insulated Concrete Form construction the most resilient choice for homeowners across the state.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Alabama?','Yes. ICF systems meet or exceed Alabama Residential Code requirements, including high-wind zone standards along the Gulf Coast. Always verify your ICF brand has Alabama product approvals.'],
  ['How does ICF perform during Alabama tornadoes and hurricanes?','Insulated Concrete Form walls are rated for extreme wind events. Multiple ICF homes in Alabama have survived direct tornado and hurricane impacts that destroyed neighboring wood-frame structures.'],
  ['What does an ICF home cost in Alabama?','Expect a 5-10% premium over wood frame — roughly $150-$210 per square foot above grade. Lower energy costs and potential insurance discounts typically deliver payback within 8-12 years.'],
  ['Are ICF contractors common in Alabama?','ICF adoption is growing in Alabama, particularly in the Mobile Bay area and north Alabama. ICF Insider connects you with experienced contractors who build in your region.']]],

['Alaska','alaska','COLD',
 `Alaska's brutal winters and extreme temperature swings demand a wall system that goes far beyond standard insulation. Insulated Concrete Form construction delivers year-round thermal performance no wood-frame wall can match.`,
 [['R-22+','Effective Wall Insulation'],['50-60%','Heating Savings'],['4-hr','Fire Rating']],
 [['Does Insulated Concrete Form construction work in extreme cold like Alaska?','Absolutely. ICF is one of the best wall systems for sub-arctic climates. The foam-encased concrete core maintains interior warmth even at -40°F by eliminating thermal bridging entirely.'],
  ['How does ICF handle Alaska\'s freeze-thaw cycles?','Concrete is highly resistant to freeze-thaw damage, and the foam insulation protects the concrete from direct temperature cycling. ICF homes in cold climates have decades of proven performance.'],
  ['What are the energy savings for an ICF home in Alaska?','Alaska homeowners have reported 40-60% reductions in heating costs after switching to Insulated Concrete Form construction. In areas with high energy prices, payback can come in as few as 5-7 years.'],
  ['Are ICF builders available in Alaska?','ICF contractors are active in Anchorage and other populated areas. Availability varies by region — ICF Insider can connect you with builders who have cold-climate experience.']]],

['Arizona','arizona','HOT_DRY',
 `Arizona's intense desert heat and wildfire risk make Insulated Concrete Form construction the smart long-term investment. Massive thermal mass plus continuous insulation — the combination traditional framing can't beat.`,
 [['50-70%','Cooling Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['How does Insulated Concrete Form construction handle Arizona\'s summer heat?','ICF is exceptionally well-suited to Arizona. The concrete thermal mass absorbs daytime heat and releases it slowly at night, dramatically reducing HVAC load — ICF walls outperform any wood-frame system in Arizona\'s climate.'],
  ['Is ICF good for wildfire-prone areas of Arizona?','Yes. Concrete walls don\'t ignite, making ICF homes significantly more fire-resistant than wood-frame construction. This is increasingly important near Flagstaff, Prescott, and other Arizona communities in fire-risk zones.'],
  ['What does an ICF home cost in Arizona?','ICF homes in Arizona typically run 6-12% more than comparable wood frame — around $160-$230 per square foot. In Phoenix\'s climate, energy savings can deliver payback in as little as 7-10 years.'],
  ['Does ICF qualify for energy rebates in Arizona?','Some Arizona utilities offer efficiency rebates for high-performance construction. Ask your ICF contractor about APS and SRP incentive programs that may partially offset your upfront investment.']]],

['Arkansas','arkansas','TORNADO',
 `Arkansas sits squarely in tornado country — and Insulated Concrete Form construction is the only residential wall system designed to take a direct hit and still protect your family.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Can an Insulated Concrete Form home survive an Arkansas tornado?','ICF walls have withstood direct EF3 and EF4 tornado impacts that leveled surrounding wood-frame homes. While no structure is fully tornado-proof, ICF offers dramatically greater survivability than standard framing.'],
  ['Is ICF common in Arkansas?','ICF adoption is growing in Arkansas, particularly in areas with high tornado frequency. Awareness is increasing after multiple storm events where ICF homes sustained minimal damage.'],
  ['What does ICF cost in Arkansas?','Expect roughly 5-10% more than wood frame upfront — around $140-$195 per square foot. Energy savings and potential insurance discounts typically deliver payback within 8-12 years.'],
  ['Does ICF meet Arkansas building codes?','Yes. Insulated Concrete Form systems are accepted under Arkansas residential and commercial building codes. Verify your specific ICF brand has local approvals and that your contractor knows your county\'s requirements.']]],

['California','california','PACIFIC',
 `Between wildfires, earthquakes, and strict energy efficiency mandates, California demands more from its buildings. Insulated Concrete Form construction delivers on every front.`,
 [['4-hr','Fire Rating'],['40-60%','Energy Savings'],['Seismic-Ready','Structural Design']],
 [['Is Insulated Concrete Form construction approved under the California Building Code?','Yes. ICF systems are accepted under the CBC and can be engineered to meet California\'s strict seismic requirements. Many ICF brands have California-specific code compliance documentation.'],
  ['Does ICF meet California\'s Title 24 energy standards?','ICF easily meets and frequently exceeds California Title 24 energy code requirements. The combination of continuous insulation and thermal mass makes ICF one of the highest-performing wall systems for California\'s climate zones.'],
  ['Is ICF a good choice for wildfire zones in California?','Yes — concrete walls don\'t burn. ICF homes in California\'s wildland-urban interface zones offer significantly better fire protection than wood-frame construction. Check with your insurer about coverage and premium impacts for concrete construction.'],
  ['What does an ICF home cost in California?','ICF homes in California typically run 8-15% more than wood frame upfront — roughly $200-$300+ per square foot depending on region. California\'s high energy costs and strong resale market often justify the premium quickly.']]],

['Colorado','colorado','COLD',
 `Colorado's cold winters, high altitude, and growing wildfire risk make Insulated Concrete Form construction an ideal choice for energy-efficient, resilient homes across the Front Range and beyond.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['How does Insulated Concrete Form construction perform at high altitude in Colorado?','ICF performs excellently at altitude. Continuous foam insulation and thermal mass handle Colorado\'s temperature swings — hot summer days, cold nights, and harsh winters — better than any wood-frame wall system.'],
  ['Is ICF a good choice for Colorado\'s wildfire risk?','Absolutely. Concrete walls don\'t ignite, giving ICF homes significant fire protection in Colorado\'s increasingly fire-prone foothills and mountain communities. Several ICF homes have survived wildfires that destroyed neighboring structures.'],
  ['What does an ICF home cost in Colorado?','Expect a 6-12% premium over wood frame — roughly $175-$245 per square foot in Colorado markets. Energy savings and fire resilience often justify the investment, especially in high-risk or high-altitude areas.'],
  ['Are ICF contractors active in Colorado?','Yes — Colorado has a growing ICF contractor base, particularly along the Front Range. ICF Insider connects you with experienced builders in Denver, Colorado Springs, Fort Collins, and surrounding areas.']]],

['Connecticut','connecticut','COLD',
 `Connecticut's harsh winters, nor'easters, and high energy costs make Insulated Concrete Form construction one of the smartest long-term investments a homeowner can make.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Does Insulated Concrete Form construction meet Connecticut building codes?','Yes. ICF systems are accepted under the Connecticut State Building Code and meet CT energy code requirements. Many ICF homes in Connecticut exceed code minimums for insulation and air sealing.'],
  ['How much can I save on energy with an ICF home in Connecticut?','Connecticut homeowners with ICF homes typically see 40-60% reductions in heating and cooling costs. Given Connecticut\'s high utility rates, payback on an ICF home\'s premium can come in 8-12 years.'],
  ['Are there incentives for energy-efficient homes in Connecticut?','Yes — Connecticut has multiple energy efficiency programs through Energize Connecticut and Eversource/UI utilities. Ask your ICF contractor which incentives apply to your project.'],
  ['Are ICF builders available in Connecticut?','ICF is gaining popularity in Connecticut among custom home builders. ICF Insider can connect you with experienced contractors in the Hartford, New Haven, and Fairfield County areas.']]],

['Delaware','delaware','MIXED',
 `Delaware's coastal exposure, hot summers, cold winters, and proximity to severe nor'easters make Insulated Concrete Form construction a resilient, energy-efficient choice for every season.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Delaware?','Yes. ICF systems are accepted under the Delaware Building Code, which follows the International Residential Code — under which ICF is a recognized and widely used wall system.'],
  ['How does ICF handle Delaware\'s coastal storms and nor\'easters?','ICF walls are significantly more wind and water resistant than wood frame. Concrete walls don\'t warp, rot, or fail under storm-driven rain — a meaningful advantage in Delaware\'s coastal and near-coastal areas.'],
  ['What does an ICF home cost in Delaware?','ICF homes in Delaware typically run 6-11% more than wood frame upfront — roughly $160-$225 per square foot. Energy savings typically deliver payback within 8-12 years.'],
  ['Are ICF contractors available in Delaware?','Delaware has an active custom home building market and several ICF contractors work throughout the state. ICF Insider connects you with experienced builders in New Castle, Kent, and Sussex counties.']]],

['Georgia','georgia','HURRICANE',
 `Georgia's hurricane exposure along the coast, intense summer heat, and high humidity make Insulated Concrete Form construction the most resilient and energy-efficient wall system available.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved under the Georgia Building Code?','Yes. ICF systems are accepted under the Georgia State Minimum Standard Building Code. Coastal properties should verify compliance with local wind zone requirements.'],
  ['How does ICF help with Georgia\'s heat and humidity?','ICF\'s continuous foam insulation and concrete thermal mass keep interiors cooler and drier than wood-frame construction. Moisture can\'t penetrate concrete walls the way it does wood, significantly reducing mold risk.'],
  ['What does an ICF home cost in Georgia?','Expect 5-12% over wood frame — roughly $155-$220 per square foot above grade. Energy savings typically deliver payback in 8-12 years, and coastal homeowners may see insurance savings as well.'],
  ['Where is ICF most popular in Georgia?','ICF is used statewide, but adoption is highest along the coast — Savannah, Brunswick, Jekyll Island — and in the Atlanta metro where custom builders are familiar with the system.']]],

['Hawaii','hawaii','HURRICANE',
 `Hawaii's hurricane risk, tropical humidity, salt air, and extreme energy costs make Insulated Concrete Form construction the most logical choice for long-lasting, energy-efficient homes on the islands.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Hawaii?','Yes. ICF systems are accepted under the Hawaii State Building Code. Given Hawaii\'s hurricane exposure, concrete construction is especially well-regarded by local building officials and insurers.'],
  ['How does ICF handle Hawaii\'s tropical humidity and salt air?','Concrete is inherently resistant to moisture and salt corrosion — a major advantage over wood or metal framing in Hawaii\'s coastal environment. ICF homes require far less maintenance than wood-frame construction over time.'],
  ['What does an ICF home cost in Hawaii?','Hawaii\'s construction costs are among the highest in the nation. ICF typically runs 8-15% more than comparable wood frame on the islands. Hawaii\'s very high electricity rates mean energy savings deliver faster payback — often 6-9 years.'],
  ['Can ICF help with Hawaii\'s volcanic air quality issues?','ICF\'s airtight construction and excellent insulation can help maintain indoor air quality in areas affected by volcanic smog. Tight building envelopes reduce infiltration of outdoor particulates significantly.']]],

['Idaho','idaho','COLD',
 `Idaho's cold winters, wildfire risk, and wide temperature swings make Insulated Concrete Form construction a smart investment for homeowners who want performance and resilience across every season.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction meet Idaho building codes?','Yes. Idaho follows the International Residential Code under which ICF is a fully accepted wall system. Local amendments vary by jurisdiction — your ICF contractor will know the specific requirements for your county.'],
  ['Is ICF a good choice for wildfire-prone areas of Idaho?','Yes. Concrete walls don\'t ignite, offering substantially better fire protection than wood-frame construction. This is increasingly important in Idaho\'s fire-prone foothills, canyons, and rural areas.'],
  ['How does ICF perform in Idaho\'s cold winters?','ICF is one of the best wall systems for cold climates. Continuous foam insulation eliminates thermal bridging — the primary cause of heat loss in wood-frame walls — delivering consistent warmth through Idaho\'s harshest winters.'],
  ['What does an ICF home cost in Idaho?','ICF homes in Idaho typically run 6-11% more than comparable wood frame — roughly $155-$215 per square foot. Energy savings in Idaho\'s cold climate typically deliver payback in 8-12 years.']]],

['Illinois','illinois','TORNADO',
 `Illinois endures tornadoes, bitter winters, and hot summers. Insulated Concrete Form construction is built to handle every extreme — delivering safety, comfort, and lower energy bills year after year.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Can an Insulated Concrete Form home withstand Illinois tornadoes?','ICF walls have withstood direct tornado impacts that destroyed neighboring structures. The reinforced concrete core provides a level of wind resistance no wood-frame wall system can match.'],
  ['How does ICF perform in Illinois winters?','Excellently. Continuous foam insulation and thermal mass handle Chicago-area winters far better than standard framing. Homeowners report 40-60% reductions in heating costs after switching to ICF.'],
  ['Is ICF used in the Chicago area?','Yes — there is a growing community of ICF builders in the Chicago metro and throughout Illinois. ICF Insider can connect you with experienced contractors in your area.'],
  ['What does an ICF home cost in Illinois?','Expect 6-12% more than wood frame — roughly $160-$230 per square foot above grade in Illinois markets. Energy savings and potential insurance benefits typically pay back the premium in 8-12 years.']]],

['Indiana','indiana','TORNADO',
 `Indiana is one of America's most tornado-active states. Insulated Concrete Form construction gives Indiana homeowners concrete walls that can take a direct hit.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Indiana?','Yes. ICF is accepted under Indiana\'s residential and commercial building codes. Your contractor should verify local amendments for your county, particularly in high-wind zones.'],
  ['How does ICF compare to a storm shelter for Indiana tornadoes?','An entire ICF home offers far greater protection than a small storm shelter. ICF walls have survived EF3 and EF4 direct impacts. Your entire home becomes a safe room.'],
  ['What does ICF cost in Indiana?','Indiana ICF homes typically run 5-10% over wood frame — roughly $145-$200 per square foot. Energy savings in Indiana\'s variable climate typically deliver payback in 8-11 years.'],
  ['Are ICF contractors common in Indiana?','ICF usage is growing in Indiana. Contractors are most active in Indianapolis, Fort Wayne, and the northern Indiana/South Bend areas. ICF Insider connects you with builders in your region.']]],

['Iowa','iowa','TORNADO',
 `Iowa sees some of the most intense tornado activity in the country. Insulated Concrete Form construction is the residential wall system purpose-built to survive the storms that define life on the Great Plains.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction common in Iowa?','ICF adoption is growing in Iowa, particularly after storm events that demonstrated ICF\'s survivability versus wood-frame homes. Awareness is increasing among builders and homeowners statewide.'],
  ['How does ICF handle Iowa\'s extreme weather — tornadoes, ice storms, and heat?','ICF handles all of Iowa\'s extremes. Tornado-resistant walls, continuous insulation for brutal winters, and thermal mass for hot Iowa summers. One wall system for all four seasons.'],
  ['What does an ICF home cost in Iowa?','Expect roughly 5-10% more than wood frame — about $140-$195 per square foot. Iowa\'s extreme temperature swings mean meaningful year-round energy savings that typically deliver payback in 8-11 years.'],
  ['Does Iowa offer incentives for energy-efficient homes?','Iowa utilities offer some energy efficiency incentives for high-performance homes. Ask your ICF contractor about MidAmerican Energy and Alliant Energy programs that may apply to your project.']]],

['Kansas','kansas','TORNADO',
 `Kansas is the heart of tornado alley. Insulated Concrete Form construction transforms the entire home into a safe room — the only wall system that turns your house itself into your best shelter.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction a smart choice in Kansas tornado country?','It\'s arguably the best choice. Kansas ICF homeowners living through tornado events routinely report their homes standing with minimal damage while wood-frame neighbors suffered total losses.'],
  ['Does an ICF home qualify for lower insurance rates in Kansas?','Many Kansas insurers offer discounts for concrete construction given its proven storm performance. Ask your agent specifically about credits for ICF or concrete wall construction.'],
  ['What does an ICF home cost in Kansas?','ICF homes in Kansas typically run 5-10% more than wood frame — roughly $140-$195 per square foot. Energy savings across Kansas\'s extreme seasonal range typically pay back the premium in 8-11 years.'],
  ['Is ICF accepted under Kansas building codes?','Yes. Kansas follows the International Residential Code under which ICF is fully accepted. Your contractor will be familiar with local amendments for your county or municipality.']]],

['Kentucky','kentucky','MIXED',
 `Kentucky's tornado risk, hot summers, cold winters, and flash flood exposure call for a wall system that handles everything. Insulated Concrete Form construction delivers year-round performance, season after season.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Kentucky?','Yes. Kentucky follows the International Residential Code under which ICF is fully accepted. Your ICF contractor will handle local permit requirements for your county.'],
  ['How does ICF handle Kentucky\'s severe weather — tornadoes, ice storms, heat?','ICF handles Kentucky\'s full range of weather extremes. Reinforced concrete walls provide tornado-level wind resistance; continuous insulation handles both winter cold and summer heat efficiently.'],
  ['What does an ICF home cost in Kentucky?','Expect 5-10% more than wood frame — roughly $140-$195 per square foot. Kentucky\'s four-season climate means year-round energy savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors available in Kentucky?','ICF builders are active in the Louisville, Lexington, and Bowling Green markets. ICF Insider connects you with experienced contractors across the state.']]],

['Louisiana','louisiana','HURRICANE',
 `Louisiana's hurricane risk, extreme humidity, and long hot seasons make Insulated Concrete Form construction the strongest, most energy-efficient choice for homes built to last in the Gulf South.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved under Louisiana building codes?','Yes. ICF is accepted under Louisiana\'s State Uniform Construction Code. Coastal areas have additional wind-zone requirements that ICF systems readily meet.'],
  ['How does ICF handle Louisiana\'s humidity and mold risk?','Concrete doesn\'t absorb moisture or support mold growth. In Louisiana\'s extreme humidity, this is one of ICF\'s biggest advantages over wood-frame construction, which is chronically vulnerable to moisture intrusion and mold.'],
  ['What does an ICF home cost in Louisiana?','ICF homes in Louisiana typically run 6-12% more than wood frame — roughly $155-$220 per square foot. Energy savings in Louisiana\'s brutal heat, plus potential insurance discounts in coastal areas, typically deliver payback in 8-12 years.'],
  ['Does ICF qualify for Louisiana\'s hurricane mitigation insurance discounts?','Concrete construction is recognized by many Louisiana insurers as significantly more hurricane-resistant. Savings vary by insurer and location — ask specifically about concrete construction discounts when shopping policies.']]],

['Maine','maine','COLD',
 `Maine's long, brutal winters and high energy costs make Insulated Concrete Form construction one of the most financially sensible investments a homeowner can make — lower bills every month, for decades.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction meet Maine building codes?','Yes. Maine follows the International Residential Code under which ICF is fully accepted. Maine has some of the strictest energy codes in the country — ICF easily meets or exceeds them.'],
  ['How much can I save on heating with an ICF home in Maine?','Maine homeowners with ICF homes typically report 40-60% reductions in heating costs. Given Maine\'s long winters and high heating oil prices, the payback on the ICF premium can come faster than in milder climates.'],
  ['Are there energy incentives for ICF homes in Maine?','Yes — Efficiency Maine offers rebates and financing for high-efficiency homes. Ask your ICF contractor about applicable programs. Federal energy tax credits may also be available.'],
  ['Is ICF a good match for Maine\'s rural building conditions?','ICF is well-suited to Maine\'s rural construction environment. Walls go up quickly, reduce labor on-site, and deliver a tight thermal envelope that\'s especially valuable in areas far from the utility grid.']]],

['Maryland','maryland','MIXED',
 `Maryland's coastal exposure, humid summers, cold winters, and proximity to severe nor'easters make Insulated Concrete Form construction a resilient, all-season investment for homeowners across the state.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Maryland?','Yes. Maryland follows the International Residential Code and adopts ICC energy standards — both of which fully accept ICF construction. Local jurisdictions may have additional requirements; your contractor will navigate these.'],
  ['How does ICF perform on Maryland\'s Eastern Shore and coastal areas?','ICF is an excellent choice for Maryland\'s coastal zones. Concrete walls resist wind, moisture, and salt air far better than wood framing, while offering better storm performance for properties on the Bay or Atlantic coast.'],
  ['What does an ICF home cost in Maryland?','ICF homes in Maryland typically run 6-12% more than wood frame — roughly $175-$250 per square foot in the Baltimore/DC metro. Energy savings and strong resale values make the investment compelling.'],
  ['Are ICF contractors active in Maryland?','Yes — Maryland has an active custom home building market with multiple ICF contractors. ICF Insider connects you with experienced builders in the Baltimore, Annapolis, and Frederick areas.']]],

['Massachusetts','massachusetts','COLD',
 `Massachusetts homeowners face brutal nor'easters, long cold winters, and some of the highest energy costs in the country. Insulated Concrete Form construction cuts those bills dramatically while building a home that lasts generations.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Does Insulated Concrete Form construction meet Massachusetts building codes?','Yes. ICF is accepted under the Massachusetts State Building Code. Massachusetts has aggressive energy codes — ICF meets and typically exceeds them.'],
  ['Are there state incentives for energy-efficient ICF homes in Massachusetts?','Yes. Mass Save offers substantial rebates and financing for high-performance homes. Ask your ICF contractor about applicable programs — the incentives in Massachusetts are among the strongest in the country.'],
  ['How much can I save on energy with an ICF home in Massachusetts?','Massachusetts homeowners with ICF homes typically see 40-60% reductions in heating and cooling costs. Given Massachusetts\'s high utility rates, payback on an ICF home\'s premium often comes in 7-10 years.'],
  ['Is ICF common in Massachusetts?','ICF is gaining traction in Massachusetts, particularly among custom builders and homeowners focused on energy performance. ICF Insider can connect you with experienced contractors in the Boston metro and western Massachusetts.']]],

['Michigan','michigan','COLD',
 `Michigan's frigid winters, heavy snowfall, and high heating costs make Insulated Concrete Form construction one of the best long-term investments a homeowner can make — delivering warmth, quiet, and lower bills year after year.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Michigan?','Yes. Michigan follows the Michigan Residential Code based on the IRC, under which ICF is fully accepted. ICF has a long track record in cold-climate states like Michigan.'],
  ['How does ICF handle Michigan\'s lake-effect snow and harsh winters?','ICF is one of the best wall systems for Michigan\'s climate. Continuous foam insulation eliminates the thermal bridging that makes wood-frame walls lose heat rapidly in extreme wind chills. Homeowners report 40-60% heating savings.'],
  ['What does an ICF home cost in Michigan?','Expect a 5-10% premium over wood frame — roughly $150-$210 per square foot. Michigan\'s long heating season means meaningful energy savings that typically deliver payback in 8-12 years.'],
  ['Are ICF builders active in Michigan?','Yes — Michigan has a strong ICF contractor community, particularly in the Detroit metro, Grand Rapids, and the Traverse City area. ICF Insider connects you with experienced builders across the state.']]],

['Minnesota','minnesota','COLD',
 `Minnesota's extreme winters are among the harshest in the lower 48. Insulated Concrete Form construction is the wall system built for it — eliminating heat loss, slashing energy bills, and lasting for generations.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction work in Minnesota\'s extreme cold?','ICF is one of the top wall systems for Minnesota\'s brutal winters. Continuous foam insulation on both sides of the concrete core eliminates thermal bridging entirely, maintaining warmth even at -30°F.'],
  ['How much can I save on heating with an ICF home in Minnesota?','Minnesota homeowners with ICF homes typically report 40-60% reductions in heating costs. Given Minnesota\'s long, intense winters and high energy prices, payback on the ICF premium can come in 7-10 years.'],
  ['Are there energy incentives for ICF homes in Minnesota?','Yes. Xcel Energy and CenterPoint Energy offer efficiency programs for high-performance homes. Federal energy tax credits may also apply. Ask your ICF contractor about applicable incentives.'],
  ['Are ICF builders active in Minnesota?','Yes — Minnesota has an established ICF contractor community, particularly in the Twin Cities metro and Duluth area. ICF Insider connects you with experienced cold-climate builders across the state.']]],

['Mississippi','mississippi','HURRICANE',
 `Mississippi's Gulf Coast is one of the most hurricane-exposed regions in the country. Insulated Concrete Form construction gives Mississippi homeowners concrete walls built to withstand whatever the Gulf delivers.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved under Mississippi building codes?','Yes. Mississippi follows the International Residential Code under which ICF is fully accepted. Coastal counties have additional wind zone requirements that ICF systems are well-designed to meet.'],
  ['How does ICF perform against Mississippi\'s hurricane and tornado risk?','ICF walls are rated for Category 4+ wind speeds and have proven resilience in direct tornado impacts. Mississippi homeowners in Katrina-affected areas that used ICF reported dramatically less damage than wood-frame neighbors.'],
  ['What does an ICF home cost in Mississippi?','ICF homes in Mississippi typically run 5-10% more than wood frame — roughly $145-$200 per square foot. Lower energy bills and potential insurance discounts in coastal areas typically deliver payback in 8-12 years.'],
  ['Are ICF contractors available on the Mississippi Gulf Coast?','Yes — ICF adoption grew significantly on the Gulf Coast after Hurricane Katrina. ICF Insider connects you with experienced contractors in the Gulfport/Biloxi area and throughout the state.']]],

['Missouri','missouri','TORNADO',
 `Missouri sits at the crossroads of tornado alley and sees brutal weather year-round. Insulated Concrete Form construction is the wall system that handles Missouri's worst — and delivers lower bills when skies are clear.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Missouri?','Yes. Missouri follows the International Residential Code under which ICF is fully accepted. Your contractor will handle local permit requirements for your city or county.'],
  ['How does ICF compare to a storm shelter in Missouri?','ICF transforms your entire home into a storm shelter. ICF walls have withstood direct EF4 tornado impacts that leveled surrounding wood-frame structures. No wood-frame room addition offers comparable protection.'],
  ['What does an ICF home cost in Missouri?','Expect 5-10% more than wood frame — roughly $145-$200 per square foot. Missouri\'s four-season extremes mean year-round energy savings that typically deliver payback in 8-11 years.'],
  ['Are ICF builders active in Missouri?','Yes — ICF is used throughout Missouri by custom builders. ICF Insider connects you with experienced contractors in Kansas City, St. Louis, and the Springfield area.']]],

['Montana','montana','COLD',
 `Montana's extreme winters, wildfire risk, and remote building conditions make Insulated Concrete Form construction the ideal wall system — energy-efficient, fire-resistant, and built for a lifetime.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction meet Montana building codes?','Yes. Montana follows the International Residential Code under which ICF is fully accepted. Montana\'s extreme climate zones benefit greatly from ICF\'s continuous insulation performance.'],
  ['Is ICF good for Montana\'s wildfire-prone areas?','Yes — concrete walls don\'t ignite. ICF homes in Montana\'s forested areas and fire-prone valleys offer significantly better fire protection than wood or log construction. Several ICF homes have survived wildfires that destroyed neighboring structures.'],
  ['What does an ICF home cost in Montana?','Expect a 6-12% premium over wood frame — roughly $160-$230 per square foot depending on location. Montana\'s long, cold winters mean substantial heating savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors available in Montana?','ICF is used in Montana, particularly in the Missoula, Bozeman, and Billings areas. ICF Insider connects you with experienced builders active in your part of the state.']]],

['Nebraska','nebraska','TORNADO',
 `Nebraska sits in the heart of tornado alley. Insulated Concrete Form construction gives Nebraska homeowners the only residential wall system proven to withstand the worst Great Plains weather can deliver.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction common in Nebraska?','ICF is growing in Nebraska, with particular adoption in rural areas and communities with high tornado frequency. Multiple Nebraska ICF homes have survived tornado events with minimal damage.'],
  ['How does ICF handle Nebraska\'s full range of weather — tornadoes, blizzards, and heat?','ICF handles all of Nebraska\'s extremes. Wind-resistant concrete walls, continuous insulation for brutal winters, and thermal mass for summer heat — one system for every season.'],
  ['What does an ICF home cost in Nebraska?','Expect roughly 5-10% more than wood frame — about $140-$195 per square foot. Nebraska\'s wide temperature swings mean year-round energy savings that typically deliver payback in 8-11 years.'],
  ['Is ICF approved in Nebraska?','Yes. Nebraska follows the International Residential Code under which ICF is fully accepted. Your contractor handles local permit requirements for your municipality.']]],

['Nevada','nevada','HOT_DRY',
 `Nevada's extreme desert heat, high cooling costs, and growing wildfire risk make Insulated Concrete Form construction the smartest investment for homeowners who want comfort, resilience, and lower bills year-round.`,
 [['50-70%','Cooling Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['How does Insulated Concrete Form construction handle Las Vegas summers?','ICF is outstanding in desert heat. The concrete thermal mass absorbs heat during the day and releases it slowly overnight, dramatically reducing HVAC load. Combined with continuous foam insulation, ICF walls outperform any wood-frame system in Nevada\'s climate.'],
  ['Is ICF approved in Nevada?','Yes. Nevada follows the International Residential Code and IBC under which ICF is fully accepted. Southern Nevada and Reno-Sparks building departments are familiar with ICF construction.'],
  ['What does an ICF home cost in Nevada?','Expect 6-12% more than wood frame — roughly $160-$230 per square foot in Nevada markets. Nevada\'s extreme cooling costs mean energy savings can deliver payback in 7-10 years in the Las Vegas area.'],
  ['Are ICF contractors active in Nevada?','Yes — ICF builders are active in the Las Vegas metro and Reno area. ICF Insider connects you with experienced contractors in your part of the state.']]],

['New Hampshire','new-hampshire','COLD',
 `New Hampshire's long winters, frequent nor'easters, and high heating costs make Insulated Concrete Form construction one of the most financially and physically resilient choices a homeowner can make.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction meet New Hampshire building codes?','Yes. New Hampshire follows the International Residential Code under which ICF is fully accepted. NH has strict energy codes — ICF meets and typically exceeds them.'],
  ['How much can I save on energy with an ICF home in New Hampshire?','New Hampshire homeowners with ICF homes typically see 40-60% reductions in heating costs. Given NH\'s long winters and high energy prices, payback on an ICF premium can come in 8-11 years.'],
  ['Are there energy incentives for ICF homes in New Hampshire?','Yes. New Hampshire Electric Co-op and Eversource NH offer energy efficiency programs. Federal energy tax credits may also apply. Ask your ICF contractor about applicable incentives.'],
  ['Are ICF builders available in New Hampshire?','ICF is used by custom builders throughout New Hampshire. ICF Insider connects you with experienced contractors in the Manchester, Nashua, and Lakes Region areas.']]],

['New Jersey','new-jersey','MIXED',
 `New Jersey's coastal storm exposure, harsh winters, hot summers, and some of the highest energy costs in the Northeast make Insulated Concrete Form construction a compelling choice for homes built to perform in every season.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in New Jersey?','Yes. New Jersey follows the Uniform Construction Code based on the IBC and IRC, under which ICF is fully accepted. NJ\'s energy sub-code is strict — ICF typically exceeds requirements.'],
  ['How does ICF perform in New Jersey\'s nor\'easters and coastal storms?','ICF walls resist high winds and storm-driven rain far better than wood framing. Post-Sandy, ICF construction gained significant attention in NJ\'s coastal communities for its storm resilience.'],
  ['What does an ICF home cost in New Jersey?','Expect 7-13% more than wood frame — roughly $190-$270 per square foot in NJ markets. Given NJ\'s high energy costs and strong real estate values, ICF\'s premium is often recouped within 8-12 years.'],
  ['Are ICF contractors available in New Jersey?','Yes — New Jersey has active ICF builders, particularly in the shore communities and suburban markets. ICF Insider connects you with experienced contractors in your area.']]],

['New Mexico','new-mexico','HOT_DRY',
 `New Mexico's desert heat, wide temperature swings, wildfire risk, and adobe building tradition make Insulated Concrete Form construction a natural fit — superior thermal mass meets modern building science.`,
 [['50-70%','Cooling Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['How does Insulated Concrete Form construction compare to traditional adobe in New Mexico?','ICF delivers the thermal mass benefits of adobe with far superior insulation, structural performance, and moisture resistance. ICF is a modern evolution of the thermal mass principles that have made adobe buildings comfortable in New Mexico for centuries.'],
  ['Is ICF approved under New Mexico building codes?','Yes. New Mexico follows the International Residential Code under which ICF is fully accepted. Albuquerque and Santa Fe building departments are familiar with ICF construction.'],
  ['What does an ICF home cost in New Mexico?','Expect 6-12% more than wood frame — roughly $155-$220 per square foot. New Mexico\'s extreme temperature swings mean year-round energy savings that typically deliver payback in 8-12 years.'],
  ['Is ICF good for New Mexico\'s wildfire risk?','Yes — concrete walls don\'t ignite. ICF homes in New Mexico\'s fire-prone areas offer substantially better fire protection than wood construction. This is increasingly relevant across much of the state.']]],

['New York','new-york','COLD',
 `New York's harsh winters, brutal nor'easters, and high energy costs make Insulated Concrete Form construction one of the most impactful investments a homeowner can make — comfort and savings for decades.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in New York?','Yes. New York follows the New York State Building Code based on the IBC, under which ICF is fully accepted. NYC has additional requirements — your contractor will be familiar with local amendments.'],
  ['How does ICF handle Buffalo\'s lake-effect snow and extreme cold?','ICF is one of the best wall systems for western New York\'s brutal winters. Continuous foam insulation eliminates thermal bridging and thermal mass moderates temperature swings — delivering consistent warmth even in deep freezes.'],
  ['Are there energy incentives for ICF homes in New York?','Yes. NYSERDA offers substantial incentives for high-performance homes, and Con Ed/National Grid have efficiency programs. Federal energy tax credits may also apply. New York has some of the most robust energy incentive programs in the country.'],
  ['Are ICF builders available in New York?','ICF is well-established in New York, with active contractors in the NYC suburbs, Hudson Valley, Capital Region, and western New York. ICF Insider connects you with experienced builders in your area.']]],

['North Carolina','north-carolina','HURRICANE',
 `North Carolina's Atlantic coastline is directly in the path of major hurricanes. Insulated Concrete Form construction gives homeowners from the Outer Banks to the Piedmont walls built to outlast the storm season.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved under the North Carolina Building Code?','Yes. NC uses the North Carolina Residential Code based on the IRC, under which ICF is fully accepted. Coastal counties have wind zone requirements that ICF systems exceed.'],
  ['How does ICF perform in North Carolina hurricanes?','ICF walls rated for Category 4+ winds provide dramatically better storm protection than wood framing. ICF homes along the NC coast and in the Piedmont have sustained minimal damage through multiple hurricane events.'],
  ['What does an ICF home cost in North Carolina?','Expect 5-12% more than wood frame — roughly $155-$220 per square foot. Energy savings in NC\'s climate, plus potential insurance savings in coastal counties, typically deliver payback in 8-12 years.'],
  ['Are ICF contractors active in North Carolina?','Yes — ICF adoption is growing in NC, particularly in the coastal market from Wilmington to the Outer Banks and in the Charlotte metro. ICF Insider connects you with experienced builders in your area.']]],

['North Dakota','north-dakota','COLD',
 `North Dakota has some of the most extreme winters in the United States. Insulated Concrete Form construction is the wall system designed to maintain warmth and comfort when temperatures plunge to -40°F.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction perform in North Dakota\'s extreme cold?','Yes — ICF is one of the top wall systems for sub-zero climates. Continuous foam insulation eliminates thermal bridging entirely, maintaining interior warmth even at -40°F. ICF has decades of proven performance in northern Great Plains winters.'],
  ['What are the energy savings for an ICF home in North Dakota?','North Dakota homeowners with ICF homes typically report 40-60% reductions in heating costs. Given ND\'s brutal winters and high heating demands, payback on the ICF premium can come in as little as 7-10 years.'],
  ['Is ICF approved in North Dakota?','Yes. North Dakota follows the International Residential Code under which ICF is fully accepted. Your contractor will be familiar with local requirements in your county.'],
  ['Are ICF builders active in North Dakota?','ICF is used in North Dakota\'s main population centers. ICF Insider can connect you with builders experienced in cold-climate ICF construction across the state.']]],

['Ohio','ohio','TORNADO',
 `Ohio faces an active tornado risk alongside bitter winters and hot, humid summers. Insulated Concrete Form construction handles Ohio's full range of weather in a single, resilient wall system.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Ohio?','Yes. Ohio follows the Ohio Residential Code based on the IRC, under which ICF is fully accepted. ICF has a strong track record in Ohio\'s tornado-active regions.'],
  ['How does ICF handle Ohio\'s tornadoes and severe storms?','ICF walls have withstood direct tornado impacts in Ohio that destroyed surrounding wood-frame homes. The reinforced concrete core provides a level of wind protection no wood wall system can match.'],
  ['What does an ICF home cost in Ohio?','Expect 5-10% more than wood frame — roughly $150-$210 per square foot in Ohio markets. Ohio\'s four-season extremes mean year-round energy savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors active in Ohio?','Yes — Ohio has a strong ICF contractor community, particularly in Columbus, Cleveland, Cincinnati, and Dayton. ICF Insider connects you with experienced builders across the state.']]],

['Oklahoma','oklahoma','TORNADO',
 `Oklahoma is ground zero for tornadoes. Insulated Concrete Form construction is the only residential wall system proven to take a direct hit from an EF4 or EF5 — turning your entire home into a safe room.`,
 [['EF5-Rated','Wind Resistance'],['40-60%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Can an ICF home survive an Oklahoma EF5 tornado?','ICF homes have survived direct EF4 and EF5 tornado impacts in Oklahoma and surrounding states. The reinforced concrete core provides structural strength no wood-frame wall can approach. While no structure is fully EF5-proof, ICF dramatically improves survivability.'],
  ['Does ICF qualify for lower insurance rates in Oklahoma?','Many Oklahoma insurers offer discounts for concrete construction given its proven tornado performance. Contact your insurer directly to ask about credits for ICF or concrete wall construction — savings can be significant.'],
  ['What does an ICF home cost in Oklahoma?','ICF homes in Oklahoma typically run 5-10% more than wood frame — roughly $140-$195 per square foot. Oklahoma\'s extreme weather and insurance savings typically deliver payback in 7-10 years.'],
  ['Are ICF contractors active in Oklahoma?','Yes — Oklahoma has one of the most active ICF contractor communities in the country given the state\'s tornado exposure. ICF Insider connects you with experienced builders in OKC, Tulsa, and across the state.']]],

['Oregon','oregon','PACIFIC',
 `Oregon's earthquake risk, wildfire exposure, and wet coastal climate make Insulated Concrete Form construction a resilient, energy-efficient choice for homeowners across the Pacific Northwest.`,
 [['Seismic-Ready','Structural Design'],['4-hr','Fire Rating'],['40-60%','Energy Savings']],
 [['Is Insulated Concrete Form construction approved under the Oregon Residential Specialty Code?','Yes. Oregon follows codes based on the IRC under which ICF is fully accepted. Oregon\'s energy code is among the strictest in the nation — ICF meets and typically exceeds it.'],
  ['How does ICF handle Oregon\'s seismic risk?','ICF can be engineered and reinforced to exceed Oregon\'s seismic code requirements. The Cascadia Subduction Zone poses a significant long-term risk — ICF offers far better seismic resistance than wood framing for the same building footprint.'],
  ['Is ICF good for Oregon\'s wildfire-prone areas?','Yes. Concrete walls don\'t burn. ICF homes in Oregon\'s wildland-urban interface zones — including areas near Medford, Grants Pass, and the Cascades foothills — offer substantially better fire protection than wood construction.'],
  ['What does an ICF home cost in Oregon?','Expect 7-13% more than wood frame — roughly $175-$250 per square foot in Oregon markets. Portland\'s high construction costs mean the absolute premium is significant, but resale values and energy savings justify the investment for many buyers.']]],

['Pennsylvania','pennsylvania','MIXED',
 `Pennsylvania's cold winters, hot summers, heavy nor'easters, and high energy costs make Insulated Concrete Form construction a compelling all-season investment for homeowners across the Keystone State.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Pennsylvania?','Yes. Pennsylvania follows the Uniform Construction Code based on the IBC and IRC, under which ICF is fully accepted. Local building departments throughout the state are familiar with ICF permits.'],
  ['How does ICF handle Pennsylvania\'s harsh winters and nor\'easters?','ICF\'s continuous foam insulation and thermal mass handle Pennsylvania winters far better than wood framing. Homeowners in Philadelphia, Pittsburgh, and the Pocono areas report 40-60% reductions in heating costs.'],
  ['What does an ICF home cost in Pennsylvania?','Expect 6-12% more than wood frame — roughly $165-$235 per square foot in Pennsylvania markets. Energy savings across PA\'s four-season climate typically deliver payback in 8-12 years.'],
  ['Are ICF builders active in Pennsylvania?','Yes — Pennsylvania has a strong custom home building market with active ICF contractors in the Philadelphia suburbs, Pittsburgh area, and central PA. ICF Insider connects you with experienced builders in your region.']]],

['Rhode Island','rhode-island','COLD',
 `Rhode Island's coastal exposure, brutal nor'easters, and high energy costs make Insulated Concrete Form construction one of the most resilient and cost-effective choices for homes built to last.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Rhode Island?','Yes. Rhode Island follows the State Building Code based on the IBC and IRC, under which ICF is fully accepted. RI has aggressive energy codes — ICF meets and exceeds them.'],
  ['How does ICF handle Rhode Island\'s coastal storms and nor\'easters?','ICF walls resist storm-driven winds and rain far better than wood framing. Post-Sandy, ICF\'s coastal storm resilience gained significant attention in southern New England. Concrete walls don\'t warp, rot, or fail under storm pressure.'],
  ['Are there energy incentives for ICF homes in Rhode Island?','Yes. National Grid RI and the Rhode Island Energy Efficiency Fund offer programs for high-performance homes. Federal energy tax credits may also apply.'],
  ['Are ICF builders available in Rhode Island?','ICF builders are active in Rhode Island, particularly in the coastal communities and Providence metro area. ICF Insider connects you with experienced contractors across the state.']]],

['South Carolina','south-carolina','HURRICANE',
 `South Carolina's Atlantic coast, extreme heat, and direct exposure to major hurricanes make Insulated Concrete Form construction the most resilient wall system for homeowners across the Palmetto State.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved under South Carolina building codes?','Yes. South Carolina follows the International Residential Code under which ICF is fully accepted. Coastal counties have wind zone requirements that ICF systems readily meet and typically exceed.'],
  ['How does ICF perform in South Carolina hurricanes?','ICF walls rated for Category 4+ wind speeds provide significantly better storm protection than wood framing. ICF homes along the SC coast have sustained minimal structural damage through multiple hurricane events.'],
  ['What does an ICF home cost in South Carolina?','Expect 5-12% more than wood frame — roughly $155-$215 per square foot. Energy savings in SC\'s hot climate, plus potential insurance savings in coastal areas, typically deliver payback in 8-12 years.'],
  ['Are ICF contractors active in South Carolina?','ICF adoption is growing in South Carolina, particularly along the Grand Strand, Lowcountry, and Charleston areas. ICF Insider connects you with experienced contractors across the state.']]],

['South Dakota','south-dakota','COLD',
 `South Dakota's extreme winters, powerful spring storms, and wide temperature swings demand a wall system that performs year-round. Insulated Concrete Form construction delivers on every front.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction work in South Dakota\'s extreme cold?','ICF is one of the best wall systems for South Dakota\'s brutal winters. Continuous foam insulation and thermal mass eliminate the heat loss that makes wood-frame homes expensive to heat in -30°F conditions.'],
  ['How does ICF handle South Dakota\'s spring tornadoes and severe storms?','ICF walls provide tornado-level wind resistance that wood-frame construction can\'t match. South Dakota\'s active severe weather season makes ICF\'s structural strength a meaningful safety advantage.'],
  ['What does an ICF home cost in South Dakota?','Expect 5-10% more than wood frame — roughly $140-$195 per square foot. South Dakota\'s extreme winters mean substantial heating savings that typically deliver payback in 8-12 years.'],
  ['Is ICF approved in South Dakota?','Yes. South Dakota follows the International Residential Code under which ICF is fully accepted. Your contractor will handle local permit requirements for your municipality.']]],

['Tennessee','tennessee','MIXED',
 `Tennessee faces tornadoes, hot summers, and cold winters — and Insulated Concrete Form construction handles all three. One resilient wall system for every season Tennessee delivers.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in Tennessee?','Yes. Tennessee follows the International Residential Code under which ICF is fully accepted. Your ICF contractor will handle local permit requirements for your county or municipality.'],
  ['How does ICF perform in Tennessee tornadoes?','ICF walls have proven tornado resistance far beyond what wood framing can deliver. Multiple Tennessee ICF homes have survived direct storm impacts with minimal structural damage while wood-frame homes around them were destroyed.'],
  ['What does an ICF home cost in Tennessee?','Expect 5-10% more than wood frame — roughly $145-$200 per square foot. Tennessee\'s climate means meaningful year-round energy savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors active in Tennessee?','Yes — ICF is used by custom builders throughout Tennessee. ICF Insider connects you with experienced contractors in the Nashville, Memphis, and Knoxville areas.']]],

['Texas','texas','TORNADO',
 `Texas faces tornadoes, hurricanes, extreme heat, and brutal ice storms. Insulated Concrete Form construction is the wall system built to handle every Texas extreme — and deliver lower energy bills year-round.`,
 [['Cat 4+','Wind Resistance'],['50-70%','Lower Energy Bills'],['4-hr','Fire Rating']],
 [['Is Insulated Concrete Form construction approved in Texas?','Yes. Texas follows the International Residential Code under which ICF is fully accepted statewide. Local amendments may apply depending on county — your ICF contractor will handle permit requirements.'],
  ['How does ICF hold up against Texas tornadoes and hurricanes?','ICF walls are rated for Category 4+ hurricane winds and have proven resilience against direct tornado impacts. Texas homeowners from the Gulf Coast to the Panhandle use ICF for its unmatched storm protection.'],
  ['What does an ICF home cost in Texas?','Expect 5-12% more than wood frame — roughly $150-$215 per square foot. Texas\'s extreme heat and high AC costs mean energy savings frequently deliver payback in 7-10 years, especially in major metro areas.'],
  ['Are ICF contractors active in Texas?','Yes — Texas has one of the largest and most active ICF contractor communities in the country. ICF Insider connects you with experienced builders in Houston, Dallas, San Antonio, Austin, and across the state.']]],

['Utah','utah','HOT_DRY',
 `Utah's desert heat, dramatic temperature swings, and growing wildfire risk make Insulated Concrete Form construction an ideal choice — thermal mass meets modern insulation for all-season comfort.`,
 [['50-70%','Cooling Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['How does Insulated Concrete Form construction handle Utah\'s extreme temperature swings?','ICF is exceptionally well-suited to Utah\'s climate — hot summer days, cool nights, and cold winters. Thermal mass absorbs heat during the day and releases it at night while continuous insulation handles the extremes at both ends.'],
  ['Is ICF approved under Utah building codes?','Yes. Utah follows the International Residential Code under which ICF is fully accepted. Salt Lake City and Provo building departments are familiar with ICF construction permits.'],
  ['What does an ICF home cost in Utah?','Expect 6-12% more than wood frame — roughly $160-$230 per square foot in Utah markets. Energy savings across Utah\'s wide temperature range typically deliver payback in 8-12 years.'],
  ['Is ICF a good choice for Utah\'s wildfire risk?','Yes. Concrete walls don\'t ignite — a meaningful advantage in Utah\'s increasingly fire-prone foothills and canyon communities. Several Utah ICF homes have survived wildfire events that destroyed neighboring structures.']]],

['Vermont','vermont','COLD',
 `Vermont's long, brutal winters, heavy snow loads, and high heating costs make Insulated Concrete Form construction one of the most impactful investments a Vermont homeowner can make.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction meet Vermont building codes?','Yes. Vermont follows the Vermont Residential Building Energy Standards, which are among the strictest in the country. ICF meets and typically exceeds Vermont\'s energy requirements.'],
  ['How much can I save on heating with an ICF home in Vermont?','Vermont ICF homeowners typically report 40-60% reductions in heating costs. Given Vermont\'s long winters, high heating oil prices, and aggressive utility rates, payback on the ICF premium can come in 7-10 years.'],
  ['Are there energy incentives for ICF homes in Vermont?','Yes. Efficiency Vermont — the nation\'s first statewide energy efficiency utility — offers rebates and financing for high-performance homes. Ask your ICF contractor about applicable programs and federal tax credits.'],
  ['Are ICF builders available in Vermont?','ICF is used by custom builders throughout Vermont. ICF Insider connects you with experienced contractors in the Burlington area and across the state.']]],

['Virginia','virginia','MIXED',
 `Virginia faces hurricanes along its coast, severe nor'easters, hot summers, and cold mountain winters. Insulated Concrete Form construction is the all-season wall system built for Virginia's climate demands.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['Cat 3+','Wind Resistance']],
 [['Is Insulated Concrete Form construction approved in Virginia?','Yes. Virginia follows the Virginia Residential Code based on the IRC, under which ICF is fully accepted. Coastal localities have additional wind zone requirements that ICF readily meets.'],
  ['How does ICF handle Virginia\'s coastal hurricanes and nor\'easters?','ICF walls provide significantly better wind and rain resistance than wood framing. Virginia Beach, Norfolk, and Hampton Roads ICF homeowners have reported minimal damage through storm events that caused widespread wood-frame failures.'],
  ['What does an ICF home cost in Virginia?','Expect 6-12% more than wood frame — roughly $165-$235 per square foot in Virginia markets. Northern Virginia\'s high real estate values and energy costs make ICF particularly compelling in the DMV area.'],
  ['Are ICF contractors active in Virginia?','Yes — ICF is used throughout Virginia. Contractors are most active in the Hampton Roads area, Richmond, and Northern Virginia. ICF Insider connects you with experienced builders in your region.']]],

['Washington','washington','PACIFIC',
 `Washington State's earthquake risk, wildfire exposure east of the Cascades, and energy efficiency mandates make Insulated Concrete Form construction a smart, resilient investment for homeowners across the Pacific Northwest.`,
 [['Seismic-Ready','Structural Design'],['4-hr','Fire Rating'],['40-60%','Energy Savings']],
 [['Is Insulated Concrete Form construction approved under the Washington State Building Code?','Yes. Washington follows the WSBC based on the IBC and IRC, under which ICF is fully accepted. Washington\'s energy code is strict — ICF typically exceeds requirements with ease.'],
  ['How does ICF handle Washington\'s earthquake risk?','ICF can be engineered to exceed Washington\'s seismic requirements. The Pacific Northwest Subduction Zone poses a significant long-term earthquake risk — ICF offers dramatically better seismic resilience than wood-frame construction for equivalent buildings.'],
  ['Is ICF good for eastern Washington\'s wildfire risk?','Absolutely. Concrete walls don\'t ignite. ICF homes in eastern Washington\'s Spokane area, Yakima Valley, and other fire-prone regions offer substantially better fire protection than wood or manufactured construction.'],
  ['What does an ICF home cost in Washington?','Expect 7-13% more than wood frame — roughly $185-$260 per square foot in Western Washington markets. Seattle\'s high construction costs mean the absolute premium is notable, but energy savings and resale values often justify it quickly.']]],

['West Virginia','west-virginia','MIXED',
 `West Virginia's harsh mountain winters, flood risk, and extreme weather make Insulated Concrete Form construction a resilient, energy-efficient choice for homeowners across the Mountain State.`,
 [['40-60%','Energy Savings'],['4-hr','Fire Rating'],['STC 50+','Sound Reduction']],
 [['Is Insulated Concrete Form construction approved in West Virginia?','Yes. West Virginia follows the International Residential Code under which ICF is fully accepted. Your contractor will handle local permit requirements for your county.'],
  ['How does ICF handle West Virginia\'s mountain winters?','ICF is excellent for mountain climates. Continuous foam insulation eliminates the thermal bridging that makes wood-frame homes expensive to heat in cold, high-elevation winters. Homeowners report 40-60% reductions in heating costs.'],
  ['What does an ICF home cost in West Virginia?','Expect 5-10% more than wood frame — roughly $140-$195 per square foot. West Virginia\'s cold winters mean meaningful heating savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors available in West Virginia?','ICF builders are active in the Charleston, Huntington, and Morgantown areas. ICF Insider connects you with experienced contractors across the Mountain State.']]],

['Wisconsin','wisconsin','COLD',
 `Wisconsin's brutal winters, lake-effect snow, and high heating costs make Insulated Concrete Form construction one of the most financially compelling investments a Wisconsin homeowner can make.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Is Insulated Concrete Form construction approved in Wisconsin?','Yes. Wisconsin follows the Wisconsin Uniform Dwelling Code based on the IRC, under which ICF is fully accepted. Wisconsin has strict energy codes — ICF meets and typically exceeds them.'],
  ['How does ICF handle Wisconsin\'s extreme winters?','ICF is one of the best wall systems for Wisconsin. Continuous foam insulation eliminates thermal bridging — the primary cause of heat loss in wood-frame walls — delivering consistent warmth through Wisconsin\'s harshest conditions.'],
  ['How much can I save with an ICF home in Wisconsin?','Wisconsin homeowners with ICF homes typically report 40-60% reductions in heating costs. Given Wisconsin\'s long winters, payback on the ICF premium often comes in 8-11 years.'],
  ['Are ICF builders active in Wisconsin?','Yes — Wisconsin has an active ICF contractor community, particularly in the Milwaukee and Madison markets. ICF Insider connects you with experienced builders across the state.']]],

['Wyoming','wyoming','COLD',
 `Wyoming's fierce winters, high winds, and remote building conditions make Insulated Concrete Form construction the most resilient, energy-efficient choice for homes built to last on the high plains and in the mountains.`,
 [['40-60%','Heating Savings'],['4-hr','Fire Rating'],['R-22+','Wall Insulation']],
 [['Does Insulated Concrete Form construction work in Wyoming\'s extreme cold and wind?','ICF is ideal for Wyoming\'s climate. Continuous foam insulation handles extreme cold while the concrete core\'s mass and tight construction resist the powerful Wyoming winds that drive heat loss in conventional framing.'],
  ['Is ICF approved under Wyoming building codes?','Yes. Wyoming follows the International Residential Code under which ICF is fully accepted. Local requirements vary by jurisdiction — your contractor will navigate permits for your county or municipality.'],
  ['What does an ICF home cost in Wyoming?','Expect 6-12% more than wood frame — roughly $155-$220 per square foot. Wyoming\'s long, cold winters mean substantial heating savings that typically deliver payback in 8-12 years.'],
  ['Are ICF contractors available in Wyoming?','ICF is used throughout Wyoming by custom builders. ICF Insider connects you with experienced contractors in the Cheyenne, Casper, and Jackson Hole areas.']]],
];

function page(name, slug, climate, tagline, stats, faq) {
  const id = slug.replace(/-/g,'');
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ICF Contractors in ${name} | Insulated Concrete Form Builders | ICF Insider</title>
  <meta name="description" content="Find Insulated Concrete Form contractors in ${name}. Climate-specific performance, lower energy bills, and lasting durability. Get connected with qualified ICF builders near you.">
  <link rel="canonical" href="https://icfinsider.com/states/${slug}/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:title" content="ICF Contractors in ${name} | ICF Insider">
  <meta property="og:description" content="${tagline.substring(0,120)}">
  <meta property="og:url" content="https://icfinsider.com/states/${slug}/">
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
  {"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://icfinsider.com/"},{"@type":"ListItem","position":2,"name":"Find a Pro","item":"https://icfinsider.com/find-a-pro.html"},{"@type":"ListItem","position":3,"name":"ICF Contractors in ${name}","item":"https://icfinsider.com/states/${slug}/"}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
  </script>
</head>
<body>
  <nav class="nav" id="main-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/" class="nav-logo" aria-label="ICF Insider home"><div class="nav-logo-mark" aria-hidden="true">I</div><span class="nav-logo-text">ICF <span>Insider</span></span></a>
      <ul class="nav-links" role="list">
        <li><a href="/icf-101.html" class="nav-link">ICF 101</a></li>
        <li><a href="/cost-guide.html" class="nav-link">Cost Guide</a></li>
        <li><a href="/brands.html" class="nav-link">Brand Comparison</a></li>
        <li><a href="/find-a-pro.html" class="nav-link active">Find a Pro</a></li>
      </ul>
      <div class="nav-cta"><a href="/early-access.html" class="btn btn-primary">Get Connected</a></div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/icf-101.html" class="nav-link">ICF 101</a>
    <a href="/cost-guide.html" class="nav-link">Cost Guide</a>
    <a href="/brands.html" class="nav-link">Brand Comparison</a>
    <a href="/find-a-pro.html" class="nav-link active">Find a Pro</a>
    <a href="/early-access.html" class="btn btn-primary">Get Connected</a>
  </div>
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <div class="page-hero-meta">
        <span class="page-hero-tag"><a href="/find-a-pro.html" style="color:inherit;text-decoration:none;">Find a Pro</a></span>
        <span class="page-hero-readtime">${name}</span>
      </div>
      <h1 id="page-title">Insulated Concrete Form Contractors in ${name}</h1>
      <p class="page-hero-intro" style="max-width:580px;">${tagline}</p>
      <div class="state-stats">${statsHtml}</div>
    </div>
  </section>
  <div class="container" style="padding-top:var(--space-10);padding-bottom:var(--space-20);">
    <div class="content-layout">
      <article class="article" id="article">
        <section id="why-${slug}">
          <span class="eyebrow">Why ${name}</span>
          <h2 style="margin-top:var(--space-2);">The Case for Insulated Concrete Form in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:540px;">${WHY_SUB[climate]}</p>
          <div class="why-grid">${cardsHtml}</div>
        </section>
        <section id="${id}-directory" style="margin-top:var(--space-16);">
          <span class="eyebrow">Get Connected</span>
          <h2 style="margin-top:var(--space-2);">Find an ICF Contractor in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:540px;">Tell us about your project. We'll connect you with qualified Insulated Concrete Form contractors in ${name} — fast. No spam, no runaround.</p>
          <div class="connect-form-wrap">
            <form id="connect-form" novalidate>
              <input type="hidden" name="lead_type" value="homeowner">
              <input type="hidden" name="state" value="${name}">
              <div class="form-row">
                <div class="form-field"><label for="cf-name">Full Name *</label><input type="text" id="cf-name" name="name" placeholder="John Smith" required></div>
                <div class="form-field"><label for="cf-email">Email *</label><input type="email" id="cf-email" name="email" placeholder="you@email.com" required></div>
              </div>
              <div class="form-row">
                <div class="form-field"><label for="cf-phone">Cell Phone *</label><input type="tel" id="cf-phone" name="phone" placeholder="(555) 000-0000" required></div>
                <div class="form-field"><label for="cf-type">Project Type</label>
                  <select id="cf-type" name="project_type"><option value="">Select...</option><option>New home build</option><option>Addition</option><option>Renovation</option><option>Commercial</option><option>Other</option></select>
                </div>
              </div>
              <div class="form-field"><label for="cf-message">Tell us about your project</label><textarea id="cf-message" name="message" rows="4" placeholder="Square footage, timeline, location within ${name}, any specific requirements..."></textarea></div>
              <div class="form-row">
                <div class="form-field"><label for="cf-file">Upload project plans <span class="field-note">(optional — PDF, DWG, images, ZIP, max 100MB)</span></label><input type="file" id="cf-file" name="project_file" accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip"></div>
                <div class="form-field"><label for="cf-link">Or share a file link <span class="field-note">(Google Drive, Dropbox, WeTransfer)</span></label><input type="url" id="cf-link" name="file_link" placeholder="https://drive.google.com/..."></div>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;margin-top:var(--space-2);">Get Connected &rarr;</button>
              <p class="form-disclaimer">We review every request and connect you with qualified local contractors. Your info is shared only with relevant ICF contractors — never sold to marketers.</p>
            </form>
            <div id="connect-success" class="connect-success" style="display:none;">
              <div class="connect-success-icon">&#10003;</div>
              <h3>You're connected.</h3>
              <p>We received your project details and will be in touch soon to connect you with qualified ICF contractors in ${name}.</p>
            </div>
          </div>
          <div class="contractor-banner">
            <div class="contractor-banner-text">
              <span class="eyebrow" style="font-size:0.7rem;">ICF Contractors &amp; Builders</span>
              <p>Are you an ICF contractor in ${name}? Get early access to the directory and start receiving leads.</p>
            </div>
            <a href="/early-access.html?tab=contractor&state=${name}" class="btn btn-primary">Reserve My Spot &rarr;</a>
          </div>
        </section>
        <section id="${id}-faq" style="margin-top:var(--space-16);">
          <span class="eyebrow">FAQ</span>
          <h2 style="margin-top:var(--space-2);">Common Questions About Insulated Concrete Form Construction in ${name}</h2>
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
            <li><a href="#why-${slug}" class="toc-link">Why ${name} Chooses ICF</a></li>
            <li><a href="#${id}-directory" class="toc-link">${name} Contractor Directory</a></li>
            <li><a href="#${id}-faq" class="toc-link">Common Questions</a></li>
          </ul>
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
            <p style="font-size:0.8rem;color:var(--color-text-muted);margin:0 0 var(--space-3);">Browse by state</p>
            <a href="/find-a-pro.html" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;">All States &rarr;</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="nav-logo" aria-label="ICF Insider home"><div class="nav-logo-mark" aria-hidden="true">I</div><span class="nav-logo-text">ICF <span>Insider</span></span></a>
          <p>The independent authority on Insulated Concrete Form construction.</p>
        </div>
        <div class="footer-col"><h4>Learn</h4><ul class="footer-links" role="list"><li><a href="/icf-101.html" class="footer-link">ICF 101</a></li><li><a href="/cost-guide.html" class="footer-link">Cost Guide</a></li><li><a href="/brands.html" class="footer-link">Brand Comparison</a></li></ul></div>
        <div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro.html" class="footer-link">Find a Pro</a></li><li><a href="/early-access.html" class="footer-link">List Your Business</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>&copy; 2026 ICF Insider. Independent and unaffiliated with any ICF brand or manufacturer.</p></div>
    </div>
  </footer>
  <script src="/js/main.js"></script>
</body>
</html>`;
}

const SKIP = new Set(['florida']);
let n = 0;
for (const [name,slug,climate,tagline,stats,faq] of STATES) {
  if (SKIP.has(slug)) { console.log(`skip  ${slug}`); continue; }
  const dir = path.join(__dirname,'states',slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'), page(name,slug,climate,tagline,stats,faq), 'utf8');
  console.log(`ok    ${slug}`);
  n++;
}
console.log(`\nDone: ${n} pages written.`);
