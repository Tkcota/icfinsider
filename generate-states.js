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

const COST_DATA = {
  'alabama':       {wall:'$8–$15',  build:'$150–$210', savings:'$1.5K–$3K+'},
  'alaska':        {wall:'$12–$20', build:'$200–$280', savings:'$2K–$4K+'},
  'arizona':       {wall:'$9–$17',  build:'$160–$230', savings:'$2K–$4K+'},
  'arkansas':      {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'california':    {wall:'$12–$22', build:'$200–$300+',savings:'$2K–$4K+'},
  'colorado':      {wall:'$10–$18', build:'$175–$245', savings:'$2K–$4K+'},
  'connecticut':   {wall:'$12–$20', build:'$185–$260', savings:'$2K–$4K+'},
  'delaware':      {wall:'$10–$18', build:'$160–$225', savings:'$1.5K–$3K+'},
  'florida':       {wall:'$9–$16',  build:'$160–$220+',savings:'$2K–$5K+'},
  'georgia':       {wall:'$9–$16',  build:'$155–$220', savings:'$2K–$4K+'},
  'hawaii':        {wall:'$14–$24', build:'$250–$350+',savings:'$3K–$6K+'},
  'idaho':         {wall:'$10–$18', build:'$155–$215', savings:'$2K–$3K+'},
  'illinois':      {wall:'$9–$16',  build:'$160–$230', savings:'$1.5K–$3K+'},
  'indiana':       {wall:'$8–$15',  build:'$145–$200', savings:'$1.5K–$3K+'},
  'iowa':          {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'kansas':        {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'kentucky':      {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'louisiana':     {wall:'$9–$16',  build:'$155–$220', savings:'$2K–$5K+'},
  'maine':         {wall:'$12–$20', build:'$175–$245', savings:'$2K–$4K+'},
  'maryland':      {wall:'$10–$18', build:'$175–$250', savings:'$1.5K–$3K+'},
  'massachusetts': {wall:'$12–$20', build:'$190–$270', savings:'$2K–$4K+'},
  'michigan':      {wall:'$8–$15',  build:'$150–$210', savings:'$2K–$3K+'},
  'minnesota':     {wall:'$8–$15',  build:'$155–$215', savings:'$2K–$4K+'},
  'mississippi':   {wall:'$8–$15',  build:'$145–$200', savings:'$1.5K–$3K+'},
  'missouri':      {wall:'$8–$15',  build:'$145–$200', savings:'$1.5K–$3K+'},
  'montana':       {wall:'$10–$18', build:'$160–$230', savings:'$2K–$3K+'},
  'nebraska':      {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'nevada':        {wall:'$9–$17',  build:'$160–$230', savings:'$2K–$4K+'},
  'new-hampshire': {wall:'$12–$20', build:'$180–$250', savings:'$2K–$4K+'},
  'new-jersey':    {wall:'$12–$20', build:'$190–$270', savings:'$2K–$4K+'},
  'new-mexico':    {wall:'$9–$17',  build:'$155–$220', savings:'$1.5K–$3K+'},
  'new-york':      {wall:'$12–$20', build:'$185–$265', savings:'$2K–$4K+'},
  'north-carolina':{wall:'$9–$16',  build:'$155–$220', savings:'$2K–$4K+'},
  'north-dakota':  {wall:'$8–$15',  build:'$150–$210', savings:'$2K–$4K+'},
  'ohio':          {wall:'$8–$15',  build:'$150–$210', savings:'$1.5K–$3K+'},
  'oklahoma':      {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'oregon':        {wall:'$11–$19', build:'$175–$250', savings:'$1.5K–$3K+'},
  'pennsylvania':  {wall:'$10–$18', build:'$165–$235', savings:'$1.5K–$3K+'},
  'rhode-island':  {wall:'$12–$20', build:'$185–$260', savings:'$2K–$4K+'},
  'south-carolina':{wall:'$9–$16',  build:'$155–$215', savings:'$2K–$4K+'},
  'south-dakota':  {wall:'$8–$15',  build:'$140–$195', savings:'$2K–$3K+'},
  'tennessee':     {wall:'$8–$15',  build:'$145–$200', savings:'$1.5K–$3K+'},
  'texas':         {wall:'$9–$16',  build:'$150–$215', savings:'$2K–$4K+'},
  'utah':          {wall:'$10–$18', build:'$160–$230', savings:'$2K–$4K+'},
  'vermont':       {wall:'$12–$20', build:'$180–$250', savings:'$2K–$4K+'},
  'virginia':      {wall:'$10–$18', build:'$165–$235', savings:'$1.5K–$3K+'},
  'washington':    {wall:'$11–$19', build:'$185–$260', savings:'$1.5K–$3K+'},
  'west-virginia': {wall:'$8–$15',  build:'$140–$195', savings:'$1.5K–$3K+'},
  'wisconsin':     {wall:'$8–$15',  build:'$150–$210', savings:'$2K–$3K+'},
  'wyoming':       {wall:'$10–$18', build:'$155–$220', savings:'$2K–$3K+'},
};

const STATE_CONTEXT = {
'alabama':
  `<p>Alabama's Gulf Coast from Mobile Bay to Orange Beach takes direct hurricane hits regularly, and the state's interior sees frequent tornado activity from Huntsville down through Birmingham. Insurance rates along the coast have climbed sharply in recent years, and ICF construction directly addresses the root cause: concrete walls rated for Category 4-5 winds that insurers reward with lower premiums.</p>
   <p>Summer heat in Alabama is relentless. From May through October, air conditioning runs nearly nonstop across the state. ICF's continuous insulation and thermal mass keep interior temperatures stable with dramatically less AC load, which is why Alabama ICF homeowners consistently report 50-70% lower energy bills compared to wood-frame homes of similar size.</p>
   <p>Alabama's ICF contractor base is growing, particularly in the Mobile area and the Birmingham metro. As more builders gain ICF experience, pricing becomes more competitive and build quality improves. Whether you're building on the Gulf or in the Tennessee Valley, qualified ICF crews are increasingly available.</p>`,

'alaska':
  `<p>Alaska's winters are in a category of their own. Temperatures routinely drop to -30 or -40 degrees Fahrenheit in interior regions, and even Anchorage sees months of sub-zero conditions. When your heating system runs 8+ months a year, the quality of your wall system determines a massive portion of your annual housing cost. ICF eliminates thermal bridging entirely, the primary source of heat loss in wood-frame walls.</p>
   <p>Energy costs in Alaska are among the highest in the nation, particularly in remote communities where fuel must be shipped or flown in. ICF homeowners in Anchorage and Fairbanks consistently report 40-60% reductions in heating costs. In rural areas where heating oil can cost $6-8 per gallon, those savings are life-changing.</p>
   <p>Beyond energy, ICF's concrete core provides a 4-hour fire rating, which is critical in Alaska where emergency response times in rural areas can be extremely long. The walls also resist moisture damage, pest intrusion, and the constant freeze-thaw cycling that degrades wood-frame structures over Alaska's long winters.</p>`,

'arizona':
  `<p>Phoenix regularly hits 115+ degrees in summer, and even Tucson and Prescott deal with intense heat from May through September. Traditional wood-frame walls with batt insulation simply cannot keep up with Arizona's thermal load. ICF's concrete thermal mass absorbs daytime heat and releases it slowly overnight, naturally leveling indoor temperatures and dramatically reducing AC demand.</p>
   <p>Wildfire risk is growing across Arizona, particularly near Flagstaff, Prescott, Payson, and the communities surrounding the Mogollon Rim. Concrete walls don't ignite, giving ICF homes a significant survival advantage in fire-prone areas. Several Arizona homes built with ICF have survived wildfire events that destroyed wood-frame neighbors completely.</p>
   <p>Arizona's energy costs are dominated by cooling. In Phoenix, summer electric bills for wood-frame homes can exceed $400-500 per month. ICF construction cuts those cooling costs by 50-70%, translating to thousands of dollars in savings annually. The Tucson and Scottsdale custom home markets are seeing increasing ICF adoption as buyers recognize the long-term value.</p>`,

'arkansas':
  `<p>Arkansas sits in the southern end of tornado alley, with the state averaging over 30 tornadoes per year. Central Arkansas from Little Rock to Jonesboro sees the highest concentration, but no part of the state is immune. ICF walls have survived direct EF3 and EF4 impacts that leveled surrounding wood-frame homes, turning the entire structure into a safe room.</p>
   <p>Arkansas also deals with extreme humidity, hot summers, and ice storms in winter. This combination of weather extremes makes energy costs a year-round concern. ICF's continuous insulation handles both the summer cooling load and winter heating demand efficiently, delivering 40-60% lower energy bills compared to standard framing.</p>
   <p>The ICF market in Arkansas is growing as awareness increases, particularly after major tornado events that demonstrate the dramatic difference between ICF and wood-frame survivability. Contractors are becoming more available in Little Rock, Fayetteville, and the Fort Smith area. Arkansas ICF Supply & Install is among the distributors helping expand access across the state.</p>`,

'california':
  `<p>California faces a unique combination of seismic risk, wildfire exposure, and the strictest building energy codes in the nation. The San Andreas Fault system, the Cascadia Subduction Zone in the north, and numerous smaller faults create serious earthquake risk statewide. ICF walls can be engineered and reinforced to exceed California's strict seismic requirements, providing far greater earthquake protection than standard wood framing.</p>
   <p>Wildfire has become California's defining building challenge. From Paradise to Malibu to the Sierra foothills, entire communities have burned. Concrete walls don't ignite, making ICF homes dramatically safer in the wildland-urban interface zones that cover much of the state. CAL FIRE and local fire agencies increasingly recognize concrete construction as a meaningful fire mitigation measure.</p>
   <p>California's Title 24 energy code pushes builders toward high-performance wall systems, and ICF meets and exceeds those requirements. In the Central Valley where summer temperatures reach 110+ degrees, and in the mountains where winters are harsh, ICF's combination of thermal mass and continuous insulation delivers 40-60% energy savings. The Bay Area and Los Angeles custom home markets are seeing growing ICF adoption.</p>`,

'colorado':
  `<p>Colorado's Front Range cities from Fort Collins to Colorado Springs experience wide temperature swings, with summer highs above 90 and winter lows well below zero. At altitude, these swings are even more extreme. ICF's thermal mass and continuous insulation handle Colorado's temperature volatility better than any wood-frame wall system, maintaining consistent interior comfort across all four seasons.</p>
   <p>Wildfire risk in Colorado has intensified dramatically. The Marshall Fire in 2021 destroyed over 1,000 homes in the Boulder area, and communities near Estes Park, Durango, and the I-70 corridor face ongoing fire threat. Concrete walls don't burn, giving ICF homes a critical survival advantage that Colorado homeowners are increasingly prioritizing.</p>
   <p>Energy costs along the Front Range are rising, and ICF construction cuts heating and cooling bills by 40-60%. Denver, Boulder, and Colorado Springs have active custom home markets where ICF is gaining traction. Mountain communities in particular are adopting ICF for its combination of fire resistance, energy performance, and structural durability at altitude.</p>`,

'connecticut':
  `<p>Connecticut's location on Long Island Sound exposes the state to powerful nor'easters and occasional hurricane remnants, while its winters bring heavy snow, ice, and sustained cold. The combination puts enormous stress on residential construction. ICF walls handle all of it: wind resistance for coastal storms, continuous insulation for harsh winters, and moisture resistance for the humid summers.</p>
   <p>Connecticut has some of the highest electricity and heating costs in the nation. Eversource rates are among the steepest in the lower 48, making energy efficiency not just an environmental choice but a financial necessity. ICF homeowners in Connecticut consistently see 40-60% reductions in heating and cooling costs, savings that compound every year as rates continue to climb.</p>
   <p>The state also offers strong energy incentive programs through Energize Connecticut and utility partners. Combined with ICF's natural energy performance, these programs can help offset the upfront investment. ICF builders are active in the Hartford and New Haven metros, Fairfield County, and the shoreline communities where storm resilience is a top priority.</p>`,

'delaware':
  `<p>Delaware's 28 miles of Atlantic coastline and low-lying geography make the state vulnerable to hurricanes, nor'easters, and coastal flooding. Superstorm Sandy in 2012 caused significant damage along the Delaware coast, and the state's building community has increasingly looked to resilient construction methods since. ICF walls resist both wind and water intrusion far better than wood-frame construction.</p>
   <p>Delaware's climate is a true four-season mix: hot, humid summers that drive AC costs and cold winters that demand reliable heating. ICF's continuous insulation handles both directions efficiently, cutting energy bills by 40-60% compared to standard framing. In a small state where commutes are short but energy costs are high, those monthly savings add up quickly.</p>
   <p>The Delaware custom home market, particularly in Sussex County's beach communities and New Castle County's suburban areas, is well-suited to ICF. Builders in the Rehoboth Beach, Lewes, and Wilmington areas have ICF experience, and the state's proximity to the active Philadelphia and Baltimore ICF markets means contractor availability is strong.</p>`,

'georgia':
  `<p>Georgia's coast from Savannah to Brunswick faces direct hurricane exposure, while the interior from Atlanta to Augusta deals with severe thunderstorms, occasional tornadoes, and extreme summer heat. Hurricane Matthew in 2016 and Hurricane Irma in 2017 reminded coastal Georgia homeowners how vulnerable wood-frame construction can be. ICF walls rated for Category 4+ winds provide a fundamentally different level of storm protection.</p>
   <p>Georgia's heat and humidity run from April through October across most of the state. Atlanta's urban heat island effect pushes summer temperatures even higher in the metro area. ICF's continuous insulation and thermal mass keep interiors significantly cooler with less AC load, delivering 50-70% lower energy bills compared to wood-frame homes in the same neighborhoods.</p>
   <p>Georgia has an active and growing ICF contractor community. The Savannah coastal market leads in adoption due to hurricane risk, while the Atlanta metro's custom home market is increasingly using ICF for its energy performance and comfort benefits. Augusta, Macon, and the north Georgia mountains also have builders with ICF experience.</p>`,

'hawaii':
  `<p>Hawaii faces a unique set of building challenges that no other state shares. Hurricane risk is real, as demonstrated by Hurricane Iniki's devastation of Kauai in 1992. Salt air corrodes metal and degrades wood continuously. Tropical humidity drives moisture intrusion and mold in wood-frame structures. ICF's concrete core resists all three: wind, salt, and moisture, requiring far less maintenance than any wood or metal framing system.</p>
   <p>Hawaii has the highest electricity rates in the nation, often three to four times the national average. On islands where every kilowatt matters, ICF's 50-70% reduction in cooling costs translates to enormous savings. Some Hawaii ICF homeowners report cutting their monthly electric bills by $300-500 or more compared to comparable wood-frame homes.</p>
   <p>Construction costs in Hawaii are already among the highest in the country due to material shipping costs and limited labor supply. The ICF price difference over wood frame is proportionally smaller here than on the mainland, while the performance benefits are proportionally larger. Builders on Oahu, Maui, and the Big Island have ICF experience, though the market is still developing.</p>`,

'idaho':
  `<p>Idaho's climate ranges from the cold, snowy winters of the Panhandle and Sun Valley to the hot, dry summers of the Treasure Valley around Boise. This range of extremes demands a wall system that performs in every condition. ICF's thermal mass and continuous insulation handle Idaho's temperature swings efficiently, keeping homes warm in January and cool in August without excessive energy use.</p>
   <p>Wildfire risk in Idaho is serious and growing. The Boise Foothills, McCall area, Ketchum/Sun Valley corridor, and much of central Idaho face significant fire exposure. Concrete walls don't ignite, giving ICF homes meaningful fire protection in these increasingly threatened communities. The 2020 fire season alone burned over 400,000 acres across the state.</p>
   <p>Idaho's building boom, particularly in the Boise metro and Coeur d'Alene area, has brought new ICF contractors into the market. Energy costs in Idaho are moderate by national standards, but the long heating season means cumulative savings from ICF's 40-60% efficiency improvement are substantial over the life of the home.</p>`,

'illinois':
  `<p>Illinois gets hit from both directions: tornadoes during spring and summer, and brutal cold during winter. The state averages over 50 tornadoes per year, with central and southern Illinois seeing the highest activity. ICF walls provide tornado-level wind resistance that wood framing simply cannot match, while also delivering the insulation performance needed to survive Chicago winters.</p>
   <p>Chicago-area winters are notoriously harsh, with wind chills regularly dropping below -20 degrees. Heating costs for wood-frame homes in northern Illinois can easily exceed $300 per month during peak winter. ICF's continuous insulation eliminates the thermal bridging that drives those costs up, and Illinois ICF homeowners consistently report 40-60% reductions in their heating bills.</p>
   <p>Illinois has a strong ICF contractor community, particularly in the Chicago suburbs, Rockford area, and the Springfield/Champaign corridor. The state's mix of tornado risk and extreme winter cold makes a compelling case for ICF that resonates with homeowners who have experienced both. Insurance companies in tornado-prone counties are increasingly recognizing concrete construction with premium reductions.</p>`,

'indiana':
  `<p>Indiana ranks among the top 10 most tornado-active states in the country. The 2012 Henryville tornado and numerous storms since have demonstrated the devastating power of severe weather in the Hoosier State. ICF walls provide the kind of structural protection that turns an entire home into a safe room, far beyond what any wood-frame construction can deliver.</p>
   <p>Indiana's climate also brings cold winters and hot, humid summers, creating energy costs in both directions. Indianapolis homeowners deal with heating bills from November through March and cooling costs from June through September. ICF's continuous insulation handles both extremes efficiently, cutting total energy costs by 40-60% compared to standard wood-frame construction.</p>
   <p>The ICF contractor market in Indiana is growing, with builders active in Indianapolis, Fort Wayne, South Bend, and Evansville. Indiana's relatively affordable construction costs mean the ICF investment over wood frame is smaller here than in high-cost states, while the tornado protection and energy savings benefits are just as strong.</p>`,

'iowa':
  `<p>Iowa sees some of the most intense severe weather in the country. The 2020 derecho that devastated Cedar Rapids with 140 mph winds reminded Iowans that extreme wind events aren't limited to tornadoes. ICF walls handle both tornadic and straight-line winds far better than wood framing, providing a level of structural protection that can mean the difference between total loss and minimal damage.</p>
   <p>Iowa's temperature range is extreme: summer highs above 95 and winter lows well below zero are normal. That swing drives substantial energy costs in both directions. ICF's continuous insulation and thermal mass smooth out these extremes, keeping homes comfortable year-round while cutting heating and cooling costs by 40-60%.</p>
   <p>Iowa's ICF market is developing, with contractors active in Des Moines, Cedar Rapids, Iowa City, and the Quad Cities area. MidAmerican Energy and Alliant Energy both offer energy efficiency programs that can help offset the upfront ICF investment. As more Iowa homes survive storm events that destroy wood-frame neighbors, adoption continues to grow.</p>`,

'kansas':
  `<p>Kansas is the heart of tornado alley. The state averages over 80 tornadoes per year, with some of the most violent tornado events in recorded history occurring here. The 2007 Greensburg EF5 tornado leveled 95% of the town, and the rebuilt Greensburg prominently features ICF and concrete construction. Kansas homeowners understand tornado risk in a way few other states do.</p>
   <p>Beyond tornadoes, Kansas deals with extreme temperature swings from summer highs above 100 to winter lows well below zero, plus frequent ice storms and severe hail. ICF's continuous insulation handles the temperature extremes while the concrete core resists hail impact damage that can destroy vinyl siding and puncture wood-frame walls.</p>
   <p>Kansas has one of the more established ICF contractor communities in tornado alley, with builders active in Wichita, Kansas City (KS side), Topeka, and throughout the central and western parts of the state. Insurance companies in Kansas increasingly recognize concrete construction, and some offer meaningful discounts for ICF homes in high-risk tornado zones.</p>`,

'kentucky':
  `<p>Kentucky faces a combination of threats that make resilient construction especially valuable. The state sees regular tornado activity, with western Kentucky particularly vulnerable, as the devastating December 2021 tornado outbreak demonstrated. ICF walls provide structural protection against extreme wind events that wood framing cannot match.</p>
   <p>Kentucky's climate is a true four-season challenge: hot, humid summers drive cooling costs while cold winters push heating bills up. The Ohio River Valley's humidity adds moisture stress to buildings year-round. ICF's concrete core resists moisture intrusion and mold growth while its continuous insulation cuts energy costs by 40-60% in both heating and cooling seasons.</p>
   <p>ICF contractors are active in Louisville, Lexington, Bowling Green, and the northern Kentucky/Cincinnati metro area. Kentucky's moderate construction costs mean the ICF investment is relatively affordable compared to coastal or urban markets, while the storm protection and energy savings deliver strong returns. The state's building community has paid increasing attention to ICF since the 2021 tornado devastation.</p>`,

'louisiana':
  `<p>Louisiana has been ground zero for some of the most devastating hurricanes in American history. Katrina, Rita, Laura, Ida - the list keeps growing. ICF homes in Louisiana have repeatedly demonstrated their superiority during these events, standing with minimal damage while wood-frame neighbors were destroyed. In a state where "hurricane season" isn't theoretical, ICF provides real, proven protection.</p>
   <p>Louisiana's heat and humidity are among the most extreme in the country. New Orleans, Baton Rouge, and Lake Charles all experience months of 90+ degree temperatures with oppressive humidity. Air conditioning is not optional here, and it runs from April through November. ICF's continuous insulation and thermal mass cut cooling costs by 50-70%, delivering thousands of dollars in annual savings.</p>
   <p>Louisiana's insurance market has been in crisis since Hurricane Katrina, with premiums climbing sharply and some insurers leaving the state entirely. Concrete construction is one of the most effective ways to access lower rates, as insurers recognize ICF's dramatically lower claim rates during hurricane events. ICF contractors are active throughout southern Louisiana, particularly in the New Orleans metro, Baton Rouge, and Lake Charles areas.</p>`,

'maine':
  `<p>Maine's winters are long and harsh, stretching from November through April in most of the state and even longer in the northern counties. Heating is the dominant household expense, and many Maine homes still rely on heating oil, which has seen dramatic price volatility. ICF eliminates the thermal bridging that makes wood-frame walls the weakest link in a home's thermal envelope, keeping heated air inside where it belongs.</p>
   <p>Maine also faces increasing nor'easter intensity along its coast from Portland to Acadia. Storm-driven winds, heavy snow loads, and coastal moisture all stress residential construction. ICF's concrete core handles all three: wind resistance, structural strength under snow load, and zero moisture absorption. Coastal Maine homes built with ICF require dramatically less storm repair and maintenance over time.</p>
   <p>Efficiency Maine offers some of the strongest energy incentive programs in New England, which can help offset the upfront ICF investment. Builders are active in the Portland metro, Augusta area, and the Bangor region. Maine's commitment to energy efficiency aligns perfectly with ICF's performance characteristics, making the state an increasingly active ICF market.</p>`,

'maryland':
  `<p>Maryland's geography creates diverse building challenges. The Eastern Shore and Chesapeake Bay coast face hurricane and nor'easter exposure. The Baltimore metro deals with hot, humid summers and cold winters. Western Maryland's mountains see heavy snow and extreme cold. ICF handles every one of these conditions in a single wall system, making it an ideal choice anywhere in the state.</p>
   <p>Maryland's proximity to the DC metro means high real estate values and high energy costs. BGE and Pepco rates are among the highest in the mid-Atlantic. ICF's 40-60% reduction in energy costs translates to meaningful savings every month, and the comfort improvement over wood-frame construction is immediately noticeable to homeowners who make the switch.</p>
   <p>The Maryland custom home market is active and sophisticated, particularly in Howard County, Montgomery County, Anne Arundel County, and the Eastern Shore beach communities. ICF builders are well-established in the Baltimore and Annapolis areas, with additional contractors serving the DC suburbs and western Maryland. The state's strong resale market means ICF's durability and performance command a premium at sale.</p>`,

'massachusetts':
  `<p>Massachusetts faces brutal nor'easters that batter the coast from Cape Cod to the North Shore, combined with some of the coldest winters in the lower 48. The Blizzard of 2015, which dropped over 100 inches on Boston in a single season, demonstrated how extreme Massachusetts weather can be. ICF walls provide structural resilience against storm winds and continuous insulation against the cold.</p>
   <p>Massachusetts has the highest electricity rates in the continental United States. Eversource and National Grid rates make energy efficiency a financial priority, not just an environmental one. ICF's 40-60% reduction in heating and cooling costs saves Massachusetts homeowners thousands of dollars per year, and those savings grow as rates continue to climb.</p>
   <p>Mass Save, the state's energy efficiency program, offers substantial rebates and financing for high-performance homes that can help offset ICF's upfront investment. ICF builders are active across the state, from the western Massachusetts custom home market to the South Shore and Cape Cod communities where storm resilience matters most. Boston's suburban markets are seeing growing ICF adoption among discerning buyers.</p>`,

'michigan':
  `<p>Michigan's winters are defined by lake-effect snow, sustained cold, and fierce wind chills. Detroit, Grand Rapids, and Traverse City all experience months of sub-zero wind chills, and the Upper Peninsula sees some of the harshest conditions in the lower 48. ICF's continuous insulation eliminates the thermal bridging that makes wood-frame walls hemorrhage heat during Michigan's long winters.</p>
   <p>Michigan homeowners typically spend $2,000-4,000 per year on heating alone. ICF construction cuts that by 40-60%, delivering savings of $800-2,400 per year that start immediately and compound as energy prices rise. DTE Energy and Consumers Energy rates have climbed steadily, making energy efficiency increasingly important for Michigan households.</p>
   <p>Michigan has one of the strongest ICF contractor communities in the Midwest. Builders are active throughout the Detroit metro, Grand Rapids, Kalamazoo, Lansing, and the northern Michigan resort areas around Traverse City and Petoskey. The state's established concrete construction tradition and cold climate make ICF a natural fit that resonates with Michigan builders and homeowners alike.</p>`,

'minnesota':
  `<p>Minnesota's winters are among the most extreme in the lower 48. Minneapolis routinely sees temperatures of -20 to -30 degrees, and the northern part of the state is even colder. When your furnace runs nearly nonstop for five months, the efficiency of your wall system isn't a luxury, it's the biggest variable in your annual housing cost. ICF eliminates thermal bridging entirely, the primary reason wood-frame walls fail in extreme cold.</p>
   <p>Xcel Energy and CenterPoint Energy customers in the Twin Cities metro know that heating bills can exceed $400 per month in peak winter. ICF homeowners in Minnesota consistently report 40-60% reductions in those costs. Over a 20-year mortgage, that savings can total $40,000-60,000, far exceeding the upfront ICF investment.</p>
   <p>Minnesota has an established and experienced ICF contractor community, one of the strongest in the Midwest. Builders are active throughout the Twin Cities, Duluth, Rochester, and St. Cloud areas. The state's long history with cold-climate construction and strong energy codes make Minnesota one of the most mature ICF markets in the country.</p>`,

'mississippi':
  `<p>Mississippi's Gulf Coast took the full force of Hurricane Katrina in 2005, an event that permanently changed how the region thinks about building. Gulfport, Biloxi, and Pass Christian were devastated, but ICF homes in the area that existed before the storm stood while wood-frame neighbors were wiped away. That real-world evidence drives continued ICF adoption along the coast.</p>
   <p>Mississippi's heat and humidity are intense from April through October, driving high cooling costs across the state. Electricity rates in Mississippi are moderate, but the volume of AC needed in the Delta and Gulf regions pushes annual cooling bills high. ICF's continuous insulation and thermal mass cut those costs by 50-70%, delivering meaningful monthly savings.</p>
   <p>ICF contractor availability has grown significantly in Mississippi since Katrina, particularly in the Gulfport/Biloxi coastal market and the Jackson metro area. The state's affordable construction costs mean ICF's percentage increase over wood frame translates to a smaller absolute dollar amount than in high-cost markets, making the investment accessible to more homeowners.</p>`,

'missouri':
  `<p>Missouri sits at the crossroads of tornado alley and sees severe weather from multiple directions. The Joplin EF5 tornado in 2011, which killed 158 people and destroyed thousands of homes, remains one of the deadliest tornado events in modern history. ICF homes in tornado-affected Missouri communities have repeatedly survived events that leveled surrounding wood-frame construction.</p>
   <p>Missouri's climate swings between hot, humid summers in St. Louis and Kansas City and genuinely cold winters statewide. The state's central location means it gets the worst of both extremes, driving energy costs year-round. ICF's continuous insulation handles both directions efficiently, delivering 40-60% lower heating and cooling bills compared to standard framing.</p>
   <p>Missouri has an active ICF contractor base, with builders established in Kansas City, St. Louis, Springfield, and Columbia. The state's history of devastating tornado events has created genuine demand for resilient construction, and insurance companies in tornado-prone areas are increasingly offering incentives for concrete homes. Missouri's affordable construction market makes ICF accessible to a wide range of homeowners.</p>`,

'montana':
  `<p>Montana's winters are harsh and long, with temperatures in cities like Billings, Great Falls, and Missoula regularly dropping well below zero. The mountain communities around Whitefish, Big Sky, and Helena see even more extreme conditions. ICF's continuous insulation and thermal mass provide consistent warmth through Montana's coldest months without the heat loss that plagues wood-frame walls.</p>
   <p>Wildfire is an increasingly serious threat across Montana. The 2017 fire season burned over 1.3 million acres, and communities in the Bitterroot Valley, Flathead area, and eastern Montana foothills face ongoing fire risk. Concrete walls don't ignite, giving ICF homes a meaningful survival advantage in fire-prone areas where wood and log construction is dangerously vulnerable.</p>
   <p>Montana's remote building conditions make ICF particularly practical. Walls go up quickly with fewer trades on-site, and the finished structure requires minimal exterior maintenance, a real advantage when the nearest contractor may be hours away. ICF builders are active in Missoula, Bozeman, Billings, and the Flathead Valley, with the market growing as fire risk and energy costs drive demand.</p>`,

'nebraska':
  `<p>Nebraska sits in the heart of tornado alley, averaging over 50 tornadoes per year. The state's flat, open terrain allows severe storms to develop and intensify rapidly, giving homeowners less warning time than in many other states. ICF walls provide the structural protection to survive these events, turning the entire home into a reinforced shelter.</p>
   <p>Nebraska's climate extremes run from summer highs above 100 in the western panhandle to winter lows well below zero statewide. This temperature range drives significant energy costs in both directions. ICF's continuous insulation and thermal mass handle both extremes efficiently, delivering 40-60% lower energy bills year-round compared to wood-frame construction.</p>
   <p>ICF adoption in Nebraska is growing, particularly in the Omaha and Lincoln metros and in rural communities where storm protection is a top priority. The state's affordable construction costs keep ICF's price difference over wood frame manageable, while the tornado protection and energy savings deliver strong returns. Contractors are becoming more available as demand increases across the state.</p>`,

'nevada':
  `<p>Las Vegas regularly exceeds 115 degrees in summer, and even Reno sees 100+ degree days with intense sun. Nevada's desert climate creates an enormous cooling load that dominates household energy budgets. ICF's concrete thermal mass absorbs daytime heat and releases it slowly at night, while continuous foam insulation blocks radiant heat transfer. The result is 50-70% lower cooling costs compared to wood-frame homes.</p>
   <p>Nevada's wildfire risk is growing, particularly in the communities surrounding Reno, Carson City, and the Sierra Nevada foothills. The state's dry conditions and desert vegetation create fire-prone landscapes. Concrete walls don't ignite, making ICF a meaningful safety investment in fire-risk areas where wood-frame homes are increasingly vulnerable.</p>
   <p>The Las Vegas custom home market is active and growing, with ICF gaining traction among buyers who understand the energy savings case. Reno's market is also adopting ICF, driven by both fire resilience and energy performance. NV Energy customers face rising rates, making ICF's substantial cooling savings increasingly valuable. Contractors are available in both the Las Vegas and Reno-Sparks metros.</p>`,

'new-hampshire':
  `<p>New Hampshire's White Mountains and northern regions see some of the most extreme winter weather in New England, while the Seacoast area faces nor'easter exposure. Mount Washington holds the record for the highest wind speed ever recorded in the Northern Hemisphere, and while most of the state isn't that extreme, New Hampshire winters are consistently harsh. ICF's continuous insulation delivers consistent warmth when it matters most.</p>
   <p>Heating costs dominate New Hampshire household budgets from October through April. Many homes in the state still use heating oil or propane, both of which have seen dramatic price increases. ICF's 40-60% reduction in heating costs translates to savings of $1,500-3,000 per year for many New Hampshire homeowners, money that starts coming back from day one.</p>
   <p>New Hampshire Electric Co-op and Eversource NH both offer energy efficiency programs that can help with high-performance construction. ICF builders are active in the Manchester/Nashua metro, the Lakes Region, and the Upper Valley. New Hampshire's strong tradition of quality home building and its increasingly strict energy codes align well with ICF's performance characteristics.</p>`,

'new-jersey':
  `<p>Superstorm Sandy in 2012 permanently changed how New Jersey thinks about coastal construction. The Jersey Shore communities from Sandy Hook to Cape May suffered devastating damage, and the rebuilding effort has increasingly incorporated resilient construction methods. ICF walls resist the combination of high winds, storm surge, and driving rain that destroyed thousands of wood-frame homes during Sandy.</p>
   <p>New Jersey has among the highest energy costs in the nation. PSEG and JCP&L rates, combined with the state's four-season climate, create substantial heating and cooling bills. ICF's 40-60% reduction in energy costs saves New Jersey homeowners thousands of dollars annually, a difference that becomes more significant as rates continue their upward trajectory.</p>
   <p>New Jersey's dense population and high property values make ICF particularly compelling from a resale perspective. Concrete construction commands a premium in the state's competitive real estate market. ICF builders are established throughout the shore communities, northern New Jersey suburbs, and the Princeton/Central Jersey area. Post-Sandy awareness has made storm resilience a genuine selling point for New Jersey homes.</p>`,

'new-mexico':
  `<p>New Mexico has a centuries-long tradition of thermal mass construction through its iconic adobe buildings. ICF is the modern evolution of that same principle: heavy mass walls that absorb daytime heat and release it slowly overnight, keeping interiors comfortable without excessive energy use. The difference is that ICF adds continuous foam insulation on both sides, delivering far better thermal performance than traditional adobe.</p>
   <p>Wildfire risk is serious across much of New Mexico. The Hermits Peak/Calf Canyon fire in 2022 burned over 340,000 acres and destroyed hundreds of homes. Communities near Santa Fe, Los Alamos, Ruidoso, and the Jemez Mountains face ongoing fire threat. Concrete walls don't burn, making ICF a meaningful safety upgrade over wood-frame construction in these fire-prone areas.</p>
   <p>New Mexico's temperature swings are extreme: summer highs above 100 in the southern deserts and winter lows well below zero in the northern mountains. ICF handles both efficiently, cutting energy costs by 50-70% in cooling-dominated areas and 40-60% in heating-dominated regions. Builders in Albuquerque, Santa Fe, and Las Cruces have ICF experience, and the market is growing.</p>`,

'new-york':
  `<p>New York State encompasses enormous climate diversity: Buffalo's brutal lake-effect snow, the Hudson Valley's nor'easter exposure, Long Island's hurricane risk, and the Adirondacks' extreme mountain winters. ICF construction performs across all of these conditions, providing continuous insulation for the cold, wind resistance for storms, and moisture protection for the state's varied precipitation patterns.</p>
   <p>New York has among the highest energy costs in the nation. Con Edison rates in the downstate area and National Grid rates upstate make energy efficiency a major financial consideration. ICF's 40-60% reduction in heating and cooling costs saves New York homeowners substantial money every year, savings that compound as the state's already-high rates continue to climb.</p>
   <p>NYSERDA offers some of the most generous energy efficiency incentives in the country, which can help offset ICF's upfront investment. ICF builders are active throughout the state, from the Long Island and Westchester custom home markets to the Hudson Valley, Capital Region, and western New York. Buffalo's extreme winter climate in particular makes ICF a compelling choice for homeowners tired of massive heating bills.</p>`,

'north-carolina':
  `<p>North Carolina's Outer Banks and coastal plain are directly in the path of Atlantic hurricanes. Florence in 2018 and Dorian in 2019 caused billions in damage along the NC coast. Inland, the Piedmont and western mountains face severe thunderstorms and occasional tornadoes. ICF walls rated for Category 4+ winds provide protection that wood-frame construction simply cannot match in these conditions.</p>
   <p>North Carolina's climate runs hot and humid from the coast through the Piedmont, driving substantial cooling costs from May through October. Charlotte, Raleigh, and Wilmington all see months of 90+ degree heat with high humidity. ICF's continuous insulation and thermal mass cut those cooling costs dramatically while also handling the colder mountain winters in Asheville and Boone.</p>
   <p>North Carolina has a growing ICF contractor community, particularly in the Wilmington/Outer Banks coastal market, the Charlotte metro, and the Raleigh-Durham Triangle. The state's strong population growth and active custom home market create steady demand for ICF. Coastal insurance savings provide additional financial incentive for North Carolina homeowners building near the shore.</p>`,

'north-dakota':
  `<p>North Dakota endures some of the most extreme winter conditions in the lower 48. Bismarck and Fargo routinely see temperatures of -20 to -30 degrees, with wind chills pushing well below -40. In these conditions, the quality of a home's thermal envelope is the single biggest factor in heating costs. ICF eliminates thermal bridging entirely, maintaining interior warmth even during the worst Arctic blasts.</p>
   <p>North Dakota's heating season stretches from September through May in many parts of the state, meaning furnaces run for 8-9 months per year. Energy costs at that volume are substantial. ICF homeowners in North Dakota consistently report 40-60% reductions in heating bills, savings that add up to tens of thousands of dollars over the life of the home as energy prices continue to rise.</p>
   <p>North Dakota's severe weather includes not just extreme cold but also active tornado seasons and powerful thunderstorms during summer months. ICF's reinforced concrete walls handle both extremes: insulation performance for winter and structural strength for summer storms. Contractors are active in Bismarck, Fargo, Grand Forks, and Minot, with the market growing as energy costs drive demand.</p>`,

'ohio':
  `<p>Ohio's tornado risk is real and growing. The 2019 Memorial Day tornado outbreak hit the Dayton area with multiple tornadoes including an EF4, causing over $1 billion in damage. Northern Ohio also faces lake-effect snow and extreme winter cold, while the entire state deals with hot, humid summers. ICF walls provide tornado-grade structural protection plus year-round energy efficiency.</p>
   <p>Ohio's energy costs are driven by both heating and cooling demand. AEP Ohio and Duke Energy rates, combined with the state's four-season climate, create significant annual energy bills. ICF's continuous insulation handles both summer and winter efficiently, cutting total energy costs by 40-60% compared to wood-frame construction of the same size.</p>
   <p>Ohio has a strong ICF contractor community, one of the largest in the Midwest. Builders are active in Columbus, Cleveland, Cincinnati, Dayton, Toledo, and Akron. Ohio's mix of tornado risk, winter severity, and strong housing market creates steady demand for ICF. The state's affordable construction costs keep ICF accessible to a wide range of homeowners.</p>`,

'oklahoma':
  `<p>Oklahoma is ground zero for tornadoes. The state's central location in tornado alley produces some of the most violent twisters on earth, including the 2013 Moore EF5 that destroyed thousands of homes with 210 mph winds. ICF homes in the Oklahoma City metro have survived direct tornado impacts that leveled entire neighborhoods of wood-frame houses. No other wall system offers this level of residential protection.</p>
   <p>Oklahoma also battles extreme summer heat, with temperatures regularly exceeding 100 degrees across the state from June through September. Combined with cold winters and frequent ice storms, energy costs are a year-round burden. ICF cuts heating and cooling costs by 40-60%, and in Oklahoma's extreme heat, that translates to substantial AC savings during the months when utility bills peak.</p>
   <p>Oklahoma has one of the most active ICF contractor communities in the country, driven by the state's intense tornado exposure. Builders are established throughout the OKC metro, Tulsa, Norman, and Stillwater. Insurance companies in Oklahoma increasingly recognize concrete construction with meaningful premium reductions, adding to the financial case for ICF in a state where storm damage claims are a constant reality.</p>`,

'oregon':
  `<p>Oregon faces the Cascadia Subduction Zone, a megathrust fault capable of producing a magnitude 9.0+ earthquake. Scientists estimate a 37% chance of a major Cascadia event in the next 50 years. ICF walls can be engineered to exceed Oregon's seismic requirements, providing far greater earthquake resilience than standard wood framing. For Oregon homeowners, this isn't theoretical risk, it's a matter of when, not if.</p>
   <p>Wildfire has become Oregon's other defining building challenge. The 2020 Labor Day fires burned over a million acres and destroyed thousands of homes, including entire communities in the Santiam Canyon and southern Oregon. ICF's concrete walls don't burn, providing real fire protection in the wildland-urban interface zones that surround most Oregon communities east of I-5.</p>
   <p>Oregon's energy code is among the strictest in the nation, and ICF meets and exceeds it with ease. The Portland metro, Bend, Medford, and Eugene all have active custom home markets where ICF is gaining adoption. Oregon's combination of seismic risk, fire exposure, and progressive building standards makes it one of the most compelling states for ICF construction.</p>`,

'pennsylvania':
  `<p>Pennsylvania's climate delivers the full spectrum: harsh winters across the state, heavy nor'easters in the east, hot humid summers in Philadelphia, and lake-effect snow in Erie. The Pocono Mountains see some of the heaviest snowfall east of the Rockies. ICF walls handle all of Pennsylvania's conditions in a single resilient system, eliminating the seasonal compromises that come with wood-frame construction.</p>
   <p>Energy costs in Pennsylvania are significant, driven by both heating and cooling demand. PPL, PECO, and Duquesne Light rates have climbed steadily, and Pennsylvania homeowners spend an average of $2,000-4,000 per year on energy. ICF's 40-60% reduction in those costs delivers meaningful savings from day one, and the gap widens every time rates increase.</p>
   <p>Pennsylvania has a strong custom home building market with active ICF contractors. The Philadelphia suburbs, Pittsburgh area, Lehigh Valley, and Poconos all have builders with ICF experience. The state's Keystone HELP program and local utility incentives can help offset the upfront investment, making ICF accessible in both the urban and rural markets across the state.</p>`,

'rhode-island':
  `<p>Rhode Island's entire coastline is exposed to hurricanes, nor'easters, and storm surge. As the smallest state, there's essentially no part of Rhode Island that's truly inland. Hurricane Bob in 1991, the 2010 floods, and Superstorm Sandy all reminded Rhode Islanders how vulnerable coastal and near-coastal properties can be. ICF walls provide structural resilience against wind and water that wood framing cannot match.</p>
   <p>Rhode Island has among the highest electricity rates in the country, with National Grid rates consistently ranking in the top five nationally. In a state where heating and cooling costs are already painful, ICF's 40-60% energy savings translate to substantial annual relief. For many Rhode Island homeowners, the energy savings alone make a compelling case for ICF construction.</p>
   <p>The Rhode Island Energy Efficiency Fund and National Grid RI offer programs for high-performance homes. ICF builders serve the Providence metro, Newport/South County coastal communities, and the northern suburbs. Rhode Island's high property values and compact geography mean ICF's premium builds and durability add direct resale value in a competitive market.</p>`,

'south-carolina':
  `<p>South Carolina's Lowcountry and Grand Strand coastline face direct Atlantic hurricane exposure. Hurricane Hugo's devastating hit on Charleston in 1989 and Hurricane Matthew's impact on the coast in 2016 demonstrated the vulnerability of wood-frame construction in this market. ICF walls rated for Category 4+ winds provide a fundamentally different level of storm protection for South Carolina's coastal homeowners.</p>
   <p>South Carolina's heat and humidity rival any state in the Southeast. Charleston, Myrtle Beach, and Columbia all see months of 90+ degree temperatures with oppressive humidity. Mold and moisture damage are chronic problems in wood-frame construction here. ICF's concrete core doesn't absorb moisture or support mold growth, while its continuous insulation cuts cooling costs by 50-70%.</p>
   <p>South Carolina's booming housing market, particularly along the coast and in the Charlotte-adjacent Upstate region, has attracted ICF contractors from across the Southeast. Builders are active in Charleston, Myrtle Beach, Hilton Head, and the Greenville/Spartanburg area. Coastal insurance incentives for concrete construction add further financial motivation for South Carolina homeowners choosing ICF.</p>`,

'south-dakota':
  `<p>South Dakota's climate is harsh in every direction. Winters bring sustained sub-zero temperatures and blizzards, summers bring tornadoes and severe thunderstorms, and the state's wide-open landscape offers little natural protection from either extreme. ICF walls provide both the insulation performance needed for winter survival and the structural strength needed for summer storm protection.</p>
   <p>Heating costs in South Dakota are substantial, with furnaces running from October through April across most of the state. Black Hills Energy and Northwestern Energy customers face significant winter bills. ICF's continuous insulation eliminates the thermal bridging that makes wood-frame walls lose heat rapidly in extreme wind chills, cutting heating costs by 40-60%.</p>
   <p>South Dakota's building market is active in Sioux Falls, Rapid City, and Aberdeen. The state's affordable construction costs keep ICF's price difference over wood frame manageable, while the energy savings and storm protection deliver strong returns over the life of the home. As extreme weather events become more frequent, South Dakota homeowners are increasingly looking at ICF as a practical investment.</p>`,

'tennessee':
  `<p>Tennessee's tornado risk is serious, as the March 2020 Nashville tornado outbreak brutally demonstrated. That EF3 tornado cut a 60-mile path through downtown Nashville and surrounding communities, killing 25 people and destroying thousands of structures. Tennessee averages over 30 tornadoes per year, and the state's overnight tornado events are particularly dangerous. ICF walls provide structural protection that can survive what wood framing cannot.</p>
   <p>Tennessee's climate also brings hot, humid summers and genuinely cold winters, particularly in the eastern mountains around Knoxville and Gatlinburg. Memphis and Nashville both see extended periods above 95 degrees in summer and below freezing in winter. ICF's continuous insulation handles both directions efficiently, cutting year-round energy costs by 40-60%.</p>
   <p>ICF contractors are active throughout Tennessee, with builders in Nashville, Memphis, Knoxville, and Chattanooga. The state's strong population growth and active construction market create steady demand. Tennessee's relatively affordable construction costs make ICF accessible, while the tornado protection alone justifies the investment for many homeowners who lived through the 2020 outbreak.</p>`,

'texas':
  `<p>Texas faces nearly every natural hazard: hurricanes along the Gulf Coast from Houston to Corpus Christi, tornadoes across North Texas and the Panhandle, extreme heat statewide, and devastating ice storms like Winter Storm Uri in 2021 that brought the entire state's power grid to its knees. ICF walls handle all of these: Category 4+ wind resistance, tornado-grade structural protection, superior insulation for both extreme heat and extreme cold.</p>
   <p>Texas energy costs are enormous, driven by summer cooling demand that runs from April through October across most of the state. Houston, Dallas, San Antonio, and Austin all see months of 100+ degree heat. ICF's thermal mass and continuous insulation cut cooling costs by 50-70%, saving Texas homeowners thousands per year. During Winter Storm Uri, ICF homes maintained interior warmth far longer than wood-frame homes after power was lost.</p>
   <p>Texas has one of the largest and most experienced ICF contractor communities in the country. Builders are active in every major metro: Houston, Dallas-Fort Worth, San Antonio, Austin, and El Paso. The state's massive housing market, diverse climate challenges, and growing awareness of ICF's storm performance make Texas one of the strongest ICF markets in the nation.</p>`,

'utah':
  `<p>Utah's climate creates a unique challenge: intense summer heat in the Salt Lake Valley and St. George area, combined with cold, snowy winters along the Wasatch Front and in Park City. The temperature swing between July highs and January lows can exceed 100 degrees. ICF's thermal mass absorbs and releases heat slowly, naturally moderating these swings and reducing the strain on heating and cooling systems.</p>
   <p>Wildfire risk is growing across Utah's foothills and mountain communities. Homes in the Wasatch Front canyons, Park City area, and southern Utah face increasing fire exposure. Concrete walls don't ignite, providing meaningful protection in these fire-prone zones. The 2020 and 2021 fire seasons reminded Utah homeowners in the wildland-urban interface how real this threat has become.</p>
   <p>Utah's construction market is active, particularly along the Wasatch Front from Ogden to Provo and in the St. George/Southern Utah growth corridor. Rocky Mountain Power rates are rising, making ICF's 40-60% energy savings increasingly valuable. ICF contractors are available in Salt Lake City, Provo, Park City, and St. George, with the market growing as buyers prioritize energy performance and fire resilience.</p>`,

'vermont':
  `<p>Vermont's winters are famously harsh, with the Green Mountains creating conditions that test any building. Burlington averages over 80 inches of snow per year, and northern Vermont sees sustained sub-zero temperatures from December through February. Heating is the dominant household expense, and many Vermont homes still rely on expensive heating oil or propane. ICF's continuous insulation eliminates the thermal bridging that makes wood-frame walls the weakest point in a home's envelope.</p>
   <p>Vermont has some of the strictest residential energy standards in the country through the Vermont Residential Building Energy Standards (RBES). ICF meets and exceeds these requirements easily. Efficiency Vermont, the nation's first statewide energy efficiency utility, offers substantial rebates and financing for high-performance homes that can help offset the ICF investment.</p>
   <p>Vermont's building culture values durability, quality, and environmental responsibility, all of which align with ICF construction. Builders are active throughout the state, from the Burlington metro to the Mad River Valley, Stowe area, and southern Vermont. The state's commitment to energy efficiency and its harsh winter climate make Vermont one of New England's most compelling markets for ICF.</p>`,

'virginia':
  `<p>Virginia's geography creates distinct building challenges across the state. Hampton Roads and Virginia Beach face direct hurricane exposure, as demonstrated by Hurricane Isabel in 2003. Northern Virginia deals with nor'easters and the DC metro's extreme heat island effect. The Shenandoah Valley and southwestern Virginia see harsh mountain winters. ICF construction performs across all of these conditions without compromise.</p>
   <p>Virginia's energy costs vary by region but are significant statewide. Dominion Energy rates in the eastern part of the state and Appalachian Power rates in the west both create meaningful heating and cooling expenses. ICF's 40-60% reduction in energy costs translates to annual savings of $1,500-3,000 for most Virginia homeowners, starting from the first month of occupancy.</p>
   <p>Virginia has an active ICF contractor community. The Hampton Roads coastal market leads in adoption due to hurricane risk, while Northern Virginia's high-end custom home market values ICF's performance and durability. Richmond, Charlottesville, and the Roanoke/Salem area also have experienced ICF builders. Virginia's strong real estate values mean ICF's premium construction commands a corresponding premium at resale.</p>`,

'washington':
  `<p>Washington State sits on the Cascadia Subduction Zone, the same megathrust fault that threatens Oregon. Seismologists project a significant probability of a magnitude 9.0+ earthquake within the next several decades. Seattle, Tacoma, and Olympia all face serious seismic risk. ICF walls can be engineered to exceed Washington's seismic code requirements, providing substantially better earthquake protection than standard wood framing.</p>
   <p>Eastern Washington faces a completely different set of challenges: wildfire risk near Spokane, Wenatchee, and the Yakima Valley, combined with extreme temperature swings from hot summers to cold winters. The 2020 fire season burned hundreds of thousands of acres across eastern Washington. Concrete walls don't burn, making ICF a practical choice in these fire-prone communities.</p>
   <p>Washington's energy code is among the strictest in the nation, and ICF exceeds it easily. The Seattle metro's active custom home market, Spokane's growing residential construction, and the Tri-Cities area all have ICF contractors available. Puget Sound Energy and Avista rates continue to rise, making ICF's 40-60% energy savings increasingly relevant for Washington homeowners.</p>`,

'west-virginia':
  `<p>West Virginia's mountain terrain creates building conditions that are both challenging and rewarding for ICF. Harsh winters in the Allegheny highlands, frequent flooding in the river valleys, and extreme temperature swings across the state all stress residential construction. ICF's concrete core handles all three: continuous insulation for the cold, water resistance for flood-prone areas, and thermal mass for temperature stability.</p>
   <p>West Virginia's economy means affordable construction costs, which makes ICF's percentage premium over wood frame translate to a smaller absolute dollar amount. At the same time, the state's high heating costs and reliance on propane and heating oil in rural areas mean ICF's 40-60% energy savings deliver substantial annual relief. For many West Virginia homeowners, the monthly energy savings approach or exceed the additional mortgage payment for ICF.</p>
   <p>ICF builders are active in Charleston, Huntington, Morgantown, and the Eastern Panhandle near Martinsburg. West Virginia's rural building conditions also suit ICF well: walls go up quickly, require fewer specialized trades on-site, and deliver a finished home that requires minimal exterior maintenance, a real advantage when contractors may be hours away.</p>`,

'wisconsin':
  `<p>Wisconsin's winters are defined by lake-effect snow off Lake Michigan, sustained sub-zero temperatures, and fierce wind chills. Milwaukee, Green Bay, and Madison all experience months of dangerous cold, and the northern part of the state near Wausau and Superior is even more extreme. ICF's continuous insulation eliminates the thermal bridging that causes wood-frame walls to hemorrhage heat during Wisconsin's long winters.</p>
   <p>Wisconsin homeowners face substantial heating costs from October through April. We Energies, Alliant Energy, and Wisconsin Public Service rates, combined with 6-7 months of heating demand, push annual energy bills into the thousands. ICF's 40-60% reduction in heating costs delivers savings that start from the first cold month and compound over the decades-long life of the home.</p>
   <p>Wisconsin has an established ICF contractor community, with builders active in the Milwaukee metro, Madison, Green Bay, and the Fox Valley. The state's strict energy codes under the Wisconsin Uniform Dwelling Code align well with ICF's performance, and Focus on Energy offers efficiency programs for new construction. Wisconsin's combination of extreme cold and strong building standards makes it a natural market for ICF.</p>`,

'wyoming':
  `<p>Wyoming's combination of extreme cold, powerful winds, and remote building conditions makes ICF an especially practical choice. Cheyenne, Casper, and Sheridan all experience harsh winters with temperatures well below zero, and Wyoming's legendary wind exacerbates heat loss from poorly insulated walls. ICF's continuous insulation and airtight construction resist wind-driven heat loss far better than wood framing.</p>
   <p>Wildfire risk in Wyoming's forested areas, particularly near Jackson Hole, the Bighorn Mountains, and the Medicine Bow region, adds another dimension to the ICF case. Concrete walls don't ignite, providing real protection in fire-prone mountain communities where many homes are built with vulnerable wood or log construction.</p>
   <p>Wyoming's remote building environment suits ICF well. The system requires fewer specialized trades on-site, walls go up quickly, and the finished structure needs minimal exterior maintenance over its lifetime. This matters in a state where the nearest contractor might be a two-hour drive. Builders are active in Cheyenne, Casper, Jackson, and Sheridan, with the market growing as energy costs and fire concerns drive demand.</p>`,
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

function cleanDash(text) {
  return text.replace(/ — /g, ', ').replace(/ —/g, ' -').replace(/— /g, '- ').replace(/—/g, ' - ');
}

function fixPayback(text) {
  return text
    .replace(/(\d+-\d+%)\s+(?:more than|premium over|over)\s+wood\s*frame/gi, '$1 higher upfront investment over comparable wood frame')
    .replace(/Expect a (\d+-\d+%) premium/gi, 'ICF requires a $1 higher upfront investment')
    .replace(/Expect roughly (\d+-\d+%) more than wood frame/gi, 'ICF requires roughly a $1 higher upfront investment over wood frame')
    .replace(/Expect (\d+-\d+%) (?:more than|over) wood frame/gi, 'ICF requires a $1 higher upfront investment over wood frame')
    .replace(/(?:typically|frequently|often|usually)\s+deliver(?:s)?\s+payback\s+(?:in|within)\s+\d+-\d+\s+years/gi, 'and the savings start from day one')
    .replace(/deliver payback (?:in|within) \d+-\d+ years/gi, 'and the savings start from day one')
    .replace(/typically pay back the premium in \d+-\d+ years/gi, 'and the savings start from day one')
    .replace(/deliver faster payback[^.]+/gi, 'and the savings start from day one')
    .replace(/payback on (?:the |an )ICF (?:home's |)premium (?:can come|often comes) (?:in |faster )[^.]+/gi, 'the annual savings are substantial')
    .replace(/payback (?:can come |often comes )in (?:as (?:few|little) as )?\d+-\d+ years/gi, 'the annual savings are substantial')
    .replace(/energy savings (?:can |frequently |often )?deliver payback in (?:as little as )?\d+-\d+ years/gi, 'energy savings are substantial from day one')
    .replace(/savings (?:frequently |often |typically )?deliver payback[^.]+/gi, 'savings start from day one')
    .replace(/often justify the premium quickly/gi, 'often justify the investment quickly')
    .replace(/recouped within \d+-\d+ years/gi, 'and the savings start from day one')
    .replace(/payback in (?:under )?\d+-?\d* years/gi, 'savings that start from day one')
    .replace(/the payback on ICF's upfront premium can be faster/gi, 'ICF delivers even stronger annual savings')
    .replace(/the payback on ICF's energy savings happens faster/gi, 'the energy savings are even more dramatic')
    .replace(/reach payback in under \d+ years/gi, 'see substantial savings from day one')
    .replace(/higher upfront investment over comparable wood frame/gi, 'higher upfront investment over wood frame');
}

function page(name, slug, climate, tagline, stats, faq) {
  const id = slug.replace(/-/g,'');
  const proHref = `/find-a-pro?state=${encodeURIComponent(name)}`;
  const cost = COST_DATA[slug] || {wall:'$8–$18', build:'$150–$230', savings:'$1.5K–$3K+'};
  const contextHtml = cleanDash(STATE_CONTEXT[slug] || CONTEXT[climate](name));
  const tl = cleanDash(tagline);
  const tlShort = tl.split('. ')[0].replace(/[.\s]+$/, '') + '.';
  const cardsHtml = CARDS[climate].map(c =>
    `<div class="why-card"><div class="why-icon">${ICONS[c.i]}</div><div><h3>${c.t}</h3><p>${cleanDash(fixPayback(c.b))}</p></div></div>`
  ).join('');
  const statsHtml = stats.map(([v,l]) =>
    `<div class="state-stat"><span class="state-stat-number">${v}</span><span class="state-stat-label">${l}</span></div>`
  ).join('');
  const faqHtml = faq.map(([q,a]) =>
    `<div class="faq-card"><h3>${q}</h3><p>${cleanDash(fixPayback(a))}</p></div>`
  ).join('');
  const faqSchema = faq.map(([q,a]) =>
    `{"@type":"Question","name":${JSON.stringify(cleanDash(q))},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(cleanDash(fixPayback(a)))}}}`
  ).join(',');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RF8D8L7VCV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RF8D8L7VCV');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ICF Builders & Pros in ${name} | Find Local ICF Contractors | ICF Insider</title>
  <meta name="description" content="Find vetted ICF builders, contractors, and distributors in ${name}. Browse local ICF pros, see real cost data, and connect with experienced Insulated Concrete Form crews near you.">
  <link rel="canonical" href="https://icfinsider.com/states/${slug}/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:title" content="ICF Builders & Pros in ${name} | ICF Insider">
  <meta property="og:description" content="${tl.substring(0,120)}">
  <meta property="og:image" content="https://icfinsider.com/images/og-image.png">
  <meta property="og:url" content="https://icfinsider.com/states/${slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/components.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://icfinsider.com/"},{"@type":"ListItem","position":2,"name":"Find a Pro","item":"https://icfinsider.com/find-a-pro"},{"@type":"ListItem","position":3,"name":"ICF Contractors in ${name}","item":"https://icfinsider.com/states/${slug}/"}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
  </script>
</head>
<body>
  <nav class="nav" id="main-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
      <ul class="nav-links" role="list">
        <li><a href="/icf-101" class="nav-link">ICF 101</a></li>
        <li><a href="/cost-guide" class="nav-link">Cost Guide</a></li>
        <li><a href="/brands" class="nav-link">Brand Comparison</a></li>
        <li><a href="/find-a-pro" class="nav-link active">Find a Pro</a></li>
      </ul>
      <div class="nav-cta"><a href="${proHref}" class="btn btn-primary">Find a Pro</a></div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/icf-101" class="nav-link">ICF 101</a>
    <a href="/cost-guide" class="nav-link">Cost Guide</a>
    <a href="/brands" class="nav-link">Brand Comparison</a>
    <a href="/find-a-pro" class="nav-link active">Find a Pro</a>
    <a href="${proHref}" class="btn btn-primary">Find a Pro</a>
  </div>
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <div class="page-hero-meta">
        <span class="page-hero-tag"><a href="/find-a-pro" style="color:inherit;text-decoration:none;">Find a Pro</a></span>
        <span class="page-hero-readtime">${name}</span>
      </div>
      <h1 id="page-title">ICF Builders &amp; Pros in ${name}</h1>
      <p class="page-hero-intro" style="max-width:580px;">Connect with experienced ICF builders, contractors, and distributors near you. ${tlShort}</p>
      <div style="margin-top:var(--space-6);">
        <a href="${proHref}" class="btn btn-primary btn-lg">Find a Pro in ${name} &rarr;</a>
      </div>
      <div class="state-stats">${statsHtml}</div>
    </div>
  </section>
  <div class="container" style="padding-top:var(--space-10);padding-bottom:var(--space-20);">
    <div class="content-layout">
      <article class="article" id="article">
        <section id="why-${slug}">
          <span class="eyebrow">Why ${name}</span>
          <h2 style="margin-top:var(--space-2);">The Case for ICF in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:540px;">${WHY_SUB[climate]}</p>
          <div class="why-grid">${cardsHtml}</div>
        </section>
        <section id="${id}-costs" style="margin-top:var(--space-16);">
          <span class="eyebrow">Cost Snapshot</span>
          <h2 style="margin-top:var(--space-2);">What Does ICF Cost in ${name}?</h2>
          <p>${name}'s ICF market reflects local labor rates, material availability, and demand. Here's a quick look at what to expect.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-4);margin-top:var(--space-6);">
            <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);text-align:center;">
              <span style="display:block;font-family:var(--font-display);font-size:1.6rem;font-weight:800;color:var(--color-accent);">${cost.wall}</span>
              <span style="font-size:0.8rem;color:var(--color-text-muted);">Installed wall cost / sq ft</span>
            </div>
            <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);text-align:center;">
              <span style="display:block;font-family:var(--font-display);font-size:1.6rem;font-weight:800;color:var(--color-accent);">${cost.build}</span>
              <span style="font-size:0.8rem;color:var(--color-text-muted);">Total build cost / sq ft</span>
            </div>
            <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);text-align:center;">
              <span style="display:block;font-family:var(--font-display);font-size:1.6rem;font-weight:800;color:var(--color-accent);">${cost.savings}</span>
              <span style="font-size:0.8rem;color:var(--color-text-muted);">Annual savings (energy + insurance)</span>
            </div>
          </div>
          <p style="margin-top:var(--space-4);">For a full breakdown including basement costs, commercial pricing, and a 20-year savings comparison, see the <a href="/states/${slug}/cost">complete ${name} ICF cost guide</a>.</p>
        </section>
        <section id="${id}-context" style="margin-top:var(--space-16);">
          <span class="eyebrow">Climate &amp; Building</span>
          <h2 style="margin-top:var(--space-2);">Why ICF Makes Sense in ${name}</h2>
          ${contextHtml}
        </section>
        <section id="${id}-directory" style="margin-top:var(--space-16);">
          <span class="eyebrow">Find a Pro</span>
          <h2 style="margin-top:var(--space-2);">Find an ICF Pro in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:540px;">Browse verified ICF contractors, builders, and distributors in ${name}. Free for homeowners.</p>
          <div style="margin-top:var(--space-6);">
            <a href="${proHref}" class="btn btn-primary btn-lg">Find a Pro in ${name} &rarr;</a>
          </div>
          <div class="contractor-banner">
            <div class="contractor-banner-text">
              <span class="eyebrow" style="font-size:0.7rem;">ICF Contractors &amp; Builders</span>
              <p>Are you an ICF contractor in ${name}? List your business for free and connect with homeowners.</p>
            </div>
            <a href="/list-your-business" class="btn btn-primary">List Your Business &rarr;</a>
          </div>
        </section>
        <section id="${id}-faq" style="margin-top:var(--space-16);">
          <span class="eyebrow">FAQ</span>
          <h2 style="margin-top:var(--space-2);">Common Questions About ICF in ${name}</h2>
          <div class="faq-list">${faqHtml}</div>
        </section>
        <div class="learn-strip">
          <div><h3>New to ICF?</h3><p>Read the full guide before you search for a contractor. Know what to look for.</p></div>
          <div class="learn-strip-links">
            <a href="/icf-101" class="btn btn-primary">ICF 101 Guide</a>
            <a href="/cost-guide" class="btn btn-secondary" style="color:var(--color-text-light);border-color:rgba(255,255,255,0.2);">Cost Guide</a>
          </div>
        </div>
      </article>
      <aside class="toc-sidebar" aria-label="Page navigation">
        <div class="toc-inner">
          <p class="toc-label">On this page</p>
          <ul class="toc-list">
            <li><a href="#why-${slug}" class="toc-link">Why ${name} Chooses ICF</a></li>
            <li><a href="#${id}-costs" class="toc-link">Cost Snapshot</a></li>
            <li><a href="#${id}-context" class="toc-link">Climate &amp; Building</a></li>
            <li><a href="#${id}-directory" class="toc-link">Find a Pro</a></li>
            <li><a href="#${id}-faq" class="toc-link">Common Questions</a></li>
          </ul>
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
            <p style="font-size:0.8rem;color:var(--color-text-muted);margin:0 0 var(--space-3);">Browse by state</p>
            <a href="/find-a-pro" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;">All States &rarr;</a>
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
        <div class="footer-col"><h4>Learn</h4><ul class="footer-links" role="list"><li><a href="/icf-101" class="footer-link">ICF 101</a></li><li><a href="/cost-guide" class="footer-link">Cost Guide</a></li><li><a href="/brands" class="footer-link">Brand Comparison</a></li></ul></div>
        <div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro" class="footer-link">Find a Pro</a></li><li><a href="/list-your-business" class="footer-link">List Your Business</a></li><li><a href="/manage-subscription" class="footer-link">Manage Subscription</a></li></ul></div>
        <div class="footer-col"><h4>Company</h4><ul class="footer-links" role="list"><li><a href="/about" class="footer-link">About</a></li><li><a href="/privacy-policy" class="footer-link">Privacy Policy</a></li><li><a href="/terms-of-use" class="footer-link">Terms of Use</a></li></ul></div>
        <div class="footer-col"><h4>Contact</h4><ul class="footer-links" role="list"><li><a href="mailto:tyler@icfinsider.com" class="footer-link" style="color:var(--color-accent);">tyler@icfinsider.com</a></li><li><a href="mailto:tyler@icfinsider.com?subject=Partnership%20Inquiry" class="footer-link">Partner With Us &rarr;</a></li></ul></div>
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
