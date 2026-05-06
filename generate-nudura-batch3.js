const fs = require('fs');
const path = require('path');

const states = [

  {
    name: 'Wisconsin',
    slug: 'wisconsin',
    heroIntro: `Wisconsin's brutal winters, lake effect snow from Lake Michigan and Lake Superior, and year-round moisture make Nudura ICF one of the strongest performing wall systems in the state. If you're building with insulated concrete forms in Wisconsin and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Wisconsin's cold climate zones, wider cores are frequently specified to maximize thermal performance. Nudura's 5 core width options give engineers the flexibility to meet Wisconsin's energy code requirements across the state's varied climate zones.`,
    whyIntro: `Wisconsin's winters are long, cold, and wet, with lake effect snow amplifying conditions along the Lake Michigan and Lake Superior shores. Nudura ICF handles these demands better than wood framing in every respect.`,
    reasons: [
      { title: 'Extreme Cold Weather Performance', text: `Wisconsin winters are among the harshest in the Midwest, with lake effect snow adding intensity along the lakeshore regions. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads compared to wood frame construction.` },
      { title: 'Lake Effect Moisture Resistance', text: `Wisconsin's Great Lakes exposure brings sustained moisture year-round, not just in winter. ICF walls resist moisture infiltration and don't rot or degrade under prolonged wet conditions. Nudura's system handles Wisconsin's moisture-heavy climate well over the long term.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `Wisconsin homeowners face significant heating bills for much of the year. Nudura's high R-value wall system reduces that burden substantially, and ICF's continuous insulation outperforms standard insulated stud walls in cold-climate heating performance. Many Wisconsin ICF homeowners see meaningful savings year over year.` },
      { title: 'Wisconsin Distribution', text: `Nudura's distribution network covers Wisconsin, with supply available to contractors in Milwaukee, Madison, Green Bay, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Milwaukee and Madison have the most experienced ICF contractor markets in the state. Northern Wisconsin and rural areas may see higher costs due to crew travel and fewer locally available experienced ICF builders.`,
    faqs: [
      { q: `Is Nudura ICF available in Wisconsin?`, a: `Yes. Nudura's distribution network covers Wisconsin, with supply for contractors in Milwaukee, Madison, Green Bay, and surrounding markets.` },
      { q: `How does Nudura ICF perform in Wisconsin winters?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are specifically suited to Wisconsin's long, cold winters and lake effect conditions. ICF consistently outperforms wood framing in cold-climate heating performance.` },
      { q: `What does Nudura ICF cost in Wisconsin?`, a: `Cost depends on your design, core width, location, and local labor. Milwaukee and Madison markets tend to have more competitive pricing. Connect with a local Wisconsin contractor for a project-specific estimate.` },
      { q: `Is ICF worth it in Wisconsin?`, a: `For Wisconsin homeowners, yes. The state's heating-dominant climate means energy savings from Nudura's high R-value wall system add up faster than in milder states, and the system's moisture resistance is a meaningful long-term advantage.` },
    ],
  },

  {
    name: 'Oregon',
    slug: 'oregon',
    heroIntro: `Oregon's seismic risk, Pacific Northwest rainfall, and strong energy code requirements make Nudura ICF a well-suited building system across the state. If you're building with insulated concrete forms in Oregon and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". Oregon's seismic zone requirements often drive engineers toward wider cores with heavier reinforcement, particularly in the Portland metro and coastal regions near active fault zones.`,
    whyIntro: `Oregon's building environment is shaped by seismic risk, year-round Pacific moisture, and one of the more stringent energy codes in the country. Nudura ICF addresses all three effectively.`,
    reasons: [
      { title: 'Seismic Performance', text: `Oregon sits on the Cascadia Subduction Zone, one of the most seismically active fault systems on the continent. ICF's reinforced concrete wall system handles seismic lateral loads better than wood framing. Nudura's range of core widths (4" through 12") gives engineers flexibility to meet Oregon's seismic design requirements for your specific location.` },
      { title: 'Pacific Northwest Moisture and Rain Resistance', text: `Western Oregon receives significant annual rainfall and sustained moisture exposure. ICF walls resist moisture infiltration and don't rot or support mold growth the way wood framing can under prolonged wet conditions. This is a meaningful durability advantage in Oregon's climate over the long term.` },
      { title: 'Oregon Energy Code Compliance', text: `Oregon has a demanding residential energy code. Nudura's R-22 to R-28 wall assembly helps meet and exceed Oregon's thermal envelope requirements, and ICF's continuous insulation with no thermal bridging performs well under the state's energy compliance pathways.` },
      { title: 'Oregon Distribution', text: `Nudura's distribution network covers Oregon, with supply available to contractors in Portland, Eugene, Salem, and Bend markets. Your contractor should confirm current distributor availability and lead times for your specific project location.` },
    ],
    costLocationNote: `Portland has a strong construction market with competitive ICF labor. Eugene, Salem, and Bend are smaller but growing markets. Coastal Oregon projects may see additional engineering requirements for wind and seismic exposure, affecting total cost.`,
    faqs: [
      { q: `Is Nudura ICF available in Oregon?`, a: `Yes. Nudura's distribution network covers Oregon, with supply for contractors in Portland, Eugene, Salem, and Bend markets.` },
      { q: `Is Nudura ICF good for Oregon's earthquake risk?`, a: `Yes. ICF's reinforced concrete wall system performs well under seismic loads. Nudura's range of core widths gives structural engineers the flexibility to meet Oregon's seismic design requirements for your specific location and risk category.` },
      { q: `Does Nudura meet Oregon's energy code?`, a: `Nudura's R-22 to R-28 wall assembly helps meet and often exceed Oregon's residential energy code requirements. Your designer and energy consultant will confirm compliance for your specific project and climate zone.` },
      { q: `What does Nudura ICF cost in Oregon?`, a: `Portland tends to have competitive ICF labor costs. Coastal and rural Oregon projects may see higher costs due to fewer local crews and logistical factors. Connect with a local Oregon contractor for an accurate estimate.` },
    ],
  },

  {
    name: 'Arkansas',
    slug: 'arkansas',
    heroIntro: `Arkansas sits in a tornado-active zone and deals with hot, humid summers statewide, making Nudura ICF one of the most practical wall systems in the state. If you're building with insulated concrete forms in Arkansas and your contractor uses Nudura, here's what you need to know about storm performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Arkansas, residential projects most commonly use the standard 6" core. Wider cores are specified by engineers for commercial applications and projects with higher structural requirements.`,
    whyIntro: `Arkansas faces significant tornado risk, long hot summers, and humidity that challenges wood-frame construction year-round. Nudura ICF addresses all of these demands effectively.`,
    reasons: [
      { title: 'Tornado Protection', text: `Arkansas sees substantial tornado activity, particularly in the central and eastern parts of the state. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction in high-wind and tornado conditions. The reinforced concrete core resists the lateral forces and debris impact that cause most storm damage.` },
      { title: 'Hot-Humid Climate Performance', text: `Arkansas summers are long, hot, and humid. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass stabilizes interior temperatures during peak heat. Many Arkansas ICF homeowners report lower monthly energy bills compared to wood-frame construction.` },
      { title: 'Moisture and Humidity Resistance', text: `Arkansas's sustained humidity creates ongoing moisture management challenges for wood-frame homes. ICF walls resist moisture infiltration and don't support mold growth. This durability advantage is meaningful in Arkansas's climate over the long term.` },
      { title: 'Arkansas Distribution', text: `Nudura's distribution network covers Arkansas, with supply available to contractors in Little Rock, Fayetteville, Fort Smith, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Little Rock and the Fayetteville-Springdale area have the most experienced ICF contractor markets in Arkansas. Rural and eastern Arkansas may see higher costs due to fewer locally available crews.`,
    faqs: [
      { q: `Is Nudura ICF available in Arkansas?`, a: `Yes. Nudura's distribution network covers Arkansas, with supply for contractors in Little Rock, Fayetteville, Fort Smith, and surrounding markets.` },
      { q: `Is Nudura ICF good for tornado protection in Arkansas?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. ICF has a strong track record in high-wind events across the region.` },
      { q: `What does Nudura ICF cost in Arkansas?`, a: `Cost depends on your design, core width, location, and local labor. Little Rock and northwest Arkansas markets tend to have more competitive ICF pricing. Connect with a local Arkansas contractor for an accurate quote.` },
      { q: `Is ICF worth it in Arkansas?`, a: `For most Arkansas homeowners, yes. Tornado resilience, energy savings in a hot-humid climate, and long-term moisture resistance make ICF a strong value compared to standard wood frame construction.` },
    ],
  },

  {
    name: 'Kansas',
    slug: 'kansas',
    heroIntro: `Kansas sits at the center of Tornado Alley and experiences some of the most severe storm activity in the country, making Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Kansas and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In Kansas's high-wind and tornado zones, engineers may specify wider cores with heavier rebar for additional structural performance. The standard 6" core is most common for residential builds across most of the state.`,
    whyIntro: `Kansas is ground zero for tornado activity in the US, and also faces extreme heat in summer and cold in winter. Nudura ICF is built to handle exactly these conditions.`,
    reasons: [
      { title: 'Tornado Alley Storm Protection', text: `Kansas is one of the most tornado-active states in the country, sitting at the center of Tornado Alley. ICF walls, including Nudura, provide meaningful protection compared to wood framing in tornado conditions. The reinforced concrete core resists the extreme lateral forces and projectile debris that cause catastrophic damage in tornado events. For many Kansas homeowners, ICF is simply the right choice.` },
      { title: 'Extreme Heat Energy Performance', text: `Kansas summers are hot and intense, with temperatures regularly exceeding 100 degrees across the state. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass keeps interior temperatures more stable during peak heat periods.` },
      { title: 'Cold Winter Performance', text: `Kansas winters are cold, particularly in the western and northern parts of the state. Nudura's continuous insulation and high R-value wall assembly reduce heating loads effectively, giving Kansas homeowners year-round energy savings on both cooling and heating.` },
      { title: 'Kansas Distribution', text: `Nudura's distribution network covers Kansas, with supply available to contractors in Wichita, Kansas City, Topeka, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Wichita and the Kansas City metro area have the most experienced ICF contractor markets in the state. Rural and western Kansas projects may see higher costs due to fewer locally available crews and freight distances.`,
    faqs: [
      { q: `Is Nudura ICF available in Kansas?`, a: `Yes. Nudura's distribution network covers Kansas, with supply for contractors in Wichita, Kansas City, Topeka, and surrounding markets.` },
      { q: `Is Nudura ICF good for tornado protection in Kansas?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. Kansas sits at the center of Tornado Alley, and ICF has a strong documented track record in severe storm events across the region.` },
      { q: `What does Nudura ICF cost in Kansas?`, a: `Cost depends on your design, core width, location, and local labor. Wichita and Kansas City metro projects tend to have more competitive pricing. Connect with a local Kansas contractor for an accurate project-specific quote.` },
      { q: `Is ICF worth it in Kansas?`, a: `For Kansas homeowners, absolutely. The state's position at the center of Tornado Alley combined with extreme summer heat and cold winters makes ICF one of the most logical building investments available.` },
    ],
  },

  {
    name: 'Mississippi',
    slug: 'mississippi',
    heroIntro: `Mississippi's Gulf Coast hurricane exposure, extreme heat, and year-round humidity make Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Mississippi and your contractor uses Nudura, here's what you need to know about storm performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Mississippi's coastal and hurricane-exposed regions, engineers frequently specify wider cores with heavier rebar to meet high-wind load requirements. Inland projects typically use the standard 6" core.`,
    whyIntro: `Mississippi faces direct hurricane exposure along the Gulf Coast, extreme summer heat statewide, and humidity that challenges building materials year-round. Nudura ICF handles all three.`,
    reasons: [
      { title: 'Hurricane and Gulf Coast Storm Protection', text: `Mississippi's Gulf Coast is directly exposed to hurricane activity. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind events. Many Mississippi Gulf Coast homeowners choose ICF after experiencing hurricane damage, recognizing the performance difference firsthand.` },
      { title: 'Extreme Heat and Humidity Performance', text: `Mississippi summers are among the hottest and most humid in the country. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass stabilizes interior temperatures even during extended high-heat periods. Energy savings in Mississippi's climate are among the most significant in the nation.` },
      { title: 'Moisture and Mold Resistance', text: `Mississippi's extreme humidity creates serious moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth the way wood framing can. This is a critical long-term durability advantage in Mississippi's climate.` },
      { title: 'Mississippi Distribution', text: `Nudura's distribution network covers Mississippi, with supply available to contractors in Jackson, Biloxi, Gulfport, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Jackson and the Gulf Coast markets have the most active ICF construction sectors in Mississippi. Coastal projects with hurricane zone engineering requirements may see additional costs for wider core specifications and structural design.`,
    faqs: [
      { q: `Is Nudura ICF available in Mississippi?`, a: `Yes. Nudura's distribution network covers Mississippi, with supply for contractors in Jackson, Biloxi, Gulfport, and surrounding markets.` },
      { q: `Does Nudura meet Mississippi's coastal building code?`, a: `Nudura ICF meets Mississippi building code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Mississippi?`, a: `Cost depends on design, core width, and location. Coastal projects with hurricane zone requirements may need wider cores and additional engineering. Connect with a local Mississippi contractor for an accurate quote.` },
      { q: `Is ICF worth it in Mississippi?`, a: `For most Mississippi homeowners, yes. Hurricane resilience on the coast, major energy savings in extreme heat and humidity, and long-term moisture resistance make ICF a strong investment across the state.` },
    ],
  },

  {
    name: 'Utah',
    slug: 'utah',
    heroIntro: `Utah's cold mountain winters, seismic activity, dramatic temperature swings, and fast-growing construction market make Nudura ICF a strong building system choice across the state. If you're building with insulated concrete forms in Utah and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Utah, seismic zone requirements and cold mountain climate zones often drive engineers toward wider cores with heavier reinforcement. Nudura's 5 core width options give designers flexibility to meet Utah's varied structural and energy demands.`,
    whyIntro: `Utah's Wasatch Front sits on active fault lines, its mountain communities face harsh winters, and the state is one of the fastest-growing in the country. Nudura ICF is well-suited to Utah's building demands across every front.`,
    reasons: [
      { title: 'Seismic Performance', text: `Utah's Wasatch Front is one of the most seismically active areas in the Interior West. ICF's reinforced concrete wall system handles seismic lateral loads better than wood framing. Nudura's range of core widths (4" through 12") gives structural engineers flexibility to meet Utah's seismic design requirements for your specific location and risk category.` },
      { title: 'Cold Mountain Climate Performance', text: `Utah's mountain communities and higher elevation areas of the Salt Lake Valley face cold winters and significant snowfall. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads low even in Utah's coldest conditions.` },
      { title: 'Thermal Mass for Desert Temperature Swings', text: `Utah's climate brings dramatic day-to-night temperature swings, especially in the desert valleys and high-altitude communities. ICF's thermal mass absorbs heat during warm periods and releases it slowly when temperatures drop, stabilizing interior temperatures and reducing HVAC load year-round.` },
      { title: 'Fast-Growing Utah Market', text: `Utah is one of the fastest-growing states in the country, with the Salt Lake City metro, Utah County, and St. George experiencing significant construction demand. Nudura's distribution network keeps pace with this growth, and experienced ICF contractors operate throughout the state.` },
    ],
    costLocationNote: `The Salt Lake City metro and Utah County have the most experienced ICF contractor markets in the state. St. George and southern Utah are growing rapidly. Mountain and rural projects may see higher costs due to logistics and crew availability.`,
    faqs: [
      { q: `Is Nudura ICF available in Utah?`, a: `Yes. Nudura's distribution network covers Utah, with supply for contractors in Salt Lake City, Provo, St. George, and surrounding markets.` },
      { q: `Is Nudura ICF good for Utah's earthquake risk?`, a: `Yes. ICF's reinforced concrete wall system performs well under seismic loads. Nudura's range of core widths gives structural engineers the flexibility to meet Utah's seismic design requirements along the Wasatch Front and other active fault zones.` },
      { q: `What does Nudura ICF cost in Utah?`, a: `Cost depends on your design, core width, location, and local labor. Salt Lake City and Utah County markets tend to have more competitive ICF pricing. Mountain and rural projects may see higher costs. Connect with a local Utah contractor for an accurate estimate.` },
      { q: `Is ICF a good investment in Utah?`, a: `Yes. Utah's seismic risk, cold mountain winters, and dramatic temperature swings make ICF a strong long-term investment. The state's fast growth also means new construction is the norm, making it an ideal time to build right the first time.` },
    ],
  },

  {
    name: 'Iowa',
    slug: 'iowa',
    heroIntro: `Iowa sits in the heart of Tornado Alley and deals with cold winters and hot summers, making Nudura ICF a practical and high-performing wall system for the state. If you're building with insulated concrete forms in Iowa and your contractor uses Nudura, here's what you need to know about storm performance, specs, and finding a qualified contractor.`,
    aboutNote: `Core widths range from 4" through 12". In Iowa, residential projects most commonly use the standard 6" core. Wider cores are used for commercial applications and projects where engineers specify additional structural or thermal performance.`,
    whyIntro: `Iowa's climate demands a wall system that handles cold winters, tornado risk, and hot summers equally well. Nudura ICF delivers on all three.`,
    reasons: [
      { title: 'Tornado Alley Protection', text: `Iowa sees significant tornado activity each year as part of Tornado Alley. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction in high-wind and tornado events. The reinforced concrete core resists the lateral forces that cause most catastrophic storm damage to residential structures.` },
      { title: 'Cold Winter Performance', text: `Iowa winters are cold and can be extended, with temperatures dropping well below zero in January and February. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads low even in Iowa's harshest winter conditions.` },
      { title: 'Year-Round Energy Savings', text: `Iowa has genuine heating costs in winter and real cooling costs in summer. Nudura's high R-value wall system reduces both, and ICF's thermal mass smooths out seasonal temperature transitions. Many Iowa ICF homeowners see savings reflected in both summer and winter utility bills.` },
      { title: 'Iowa Distribution', text: `Nudura's distribution network covers Iowa, with supply available to contractors in Des Moines, Cedar Rapids, Davenport, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Des Moines and Cedar Rapids have the most experienced ICF contractor markets in Iowa. Rural Iowa projects may see higher costs due to fewer locally available crews and freight distances from distribution centers.`,
    faqs: [
      { q: `Is Nudura ICF available in Iowa?`, a: `Yes. Nudura's distribution network covers Iowa, with supply for contractors in Des Moines, Cedar Rapids, Davenport, and surrounding markets.` },
      { q: `Is Nudura ICF good for tornado protection in Iowa?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. Iowa's position in Tornado Alley makes ICF one of the most logical building investments for homeowners concerned about storm safety.` },
      { q: `What does Nudura ICF cost in Iowa?`, a: `Cost depends on your design, core width, location, and local labor. Des Moines and Cedar Rapids markets tend to have more competitive ICF pricing. Connect with a local Iowa contractor for a project-specific estimate.` },
      { q: `Is ICF worth it in Iowa?`, a: `For most Iowa homeowners, yes. Tornado protection, cold winter energy savings, and long-term durability make ICF a strong investment, particularly for new construction where the cost premium is easiest to absorb upfront.` },
    ],
  },

  {
    name: 'Maryland',
    slug: 'maryland',
    heroIntro: `Maryland's coastal storm and hurricane exposure, mixed climate, and strong construction market make Nudura ICF a practical building system across the state. If you're building with insulated concrete forms in Maryland and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Maryland's coastal and Chesapeake Bay regions, engineers frequently specify wider cores to meet high-wind zone load requirements. Inland and western Maryland projects typically use the standard 6" core.`,
    whyIntro: `Maryland's climate spans from the Chesapeake Bay's coastal storm exposure to the cold mountains of the western panhandle. Nudura ICF performs well across this range for several reasons.`,
    reasons: [
      { title: 'Coastal Storm and Hurricane Protection', text: `Maryland's Eastern Shore, Ocean City area, and Chesapeake Bay communities face regular nor'easter and hurricane exposure. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind and storm surge events. Coastal Maryland contractors increasingly specify ICF for new construction in exposed areas.` },
      { title: 'Mixed Climate Energy Performance', text: `Maryland spans multiple climate zones, from the humid coastal plain to the cooler western mountains. Nudura's R-22 to R-28 wall assembly reduces both cooling loads in hot, humid summers and heating loads in cold winters. ICF's thermal mass is particularly effective in Maryland's climate with meaningful seasonal temperature variation.` },
      { title: 'Chesapeake Bay Moisture Resistance', text: `Maryland's high humidity, particularly in the coastal plain and tidal areas, creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth, a meaningful durability advantage in Maryland's climate.` },
      { title: 'Baltimore and DC Market Strength', text: `Maryland benefits from proximity to the Baltimore and Washington DC metro areas, two of the most active construction markets on the East Coast. Nudura's distribution network covers the state well, and experienced ICF contractors are active throughout the region.` },
    ],
    costLocationNote: `The Baltimore and DC metro areas have high construction labor costs relative to the national average. Western Maryland and rural areas are more moderate. Coastal projects with wind zone requirements may need wider cores and additional engineering.`,
    faqs: [
      { q: `Is Nudura ICF available in Maryland?`, a: `Yes. Nudura's distribution network covers Maryland, with supply for contractors in Baltimore, Annapolis, Frederick, and the DC metro region.` },
      { q: `Does Nudura meet Maryland's coastal building code?`, a: `Nudura ICF meets Maryland building code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Maryland?`, a: `The Baltimore and DC metro areas have higher labor costs than rural Maryland. Core width, design complexity, and coastal engineering requirements affect total cost. Connect with a local Maryland contractor for a project-specific estimate.` },
      { q: `Is ICF worth it in Maryland?`, a: `For most Maryland homeowners, yes. Coastal storm resilience, year-round energy savings in a mixed climate, and moisture resistance make ICF a strong long-term investment across the state.` },
    ],
  },

  {
    name: 'Massachusetts',
    slug: 'massachusetts',
    heroIntro: `Massachusetts's cold winters, nor'easter exposure, and strict energy code make Nudura ICF one of the most effective building systems in the state. If you're building with insulated concrete forms in Massachusetts and your contractor uses Nudura, here's what you need to know about cold-climate performance, code compliance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Massachusetts, residential projects commonly use the 6" core, while commercial and multi-family projects frequently specify wider cores for additional structural performance and insulation value.`,
    whyIntro: `Massachusetts brings cold winters, significant coastal storm exposure, and one of the stricter residential energy codes in the country. Nudura ICF addresses all three in a single high-performance wall system.`,
    reasons: [
      { title: 'Cold Climate Insulation', text: `Massachusetts winters are cold and often wet, with heating season running from October through April in most of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads compared to wood frame construction. Many Massachusetts ICF homeowners see meaningful savings on winter energy bills.` },
      { title: 'Nor\'easter and Coastal Storm Resilience', text: `Massachusetts coastline faces regular nor'easter and hurricane exposure, particularly on Cape Cod, the South Shore, and the North Shore. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events compared to wood framing.` },
      { title: 'Massachusetts Energy Code Compliance', text: `Massachusetts has one of the more demanding residential energy codes in the country. Nudura's R-22 to R-28 wall assembly helps meet and often exceed Massachusetts's thermal envelope requirements, and ICF's continuous insulation performs well under the state's energy code compliance pathways.` },
      { title: 'Massachusetts Distribution', text: `Nudura's distribution network covers Massachusetts, with supply available to contractors in the Boston metro, Worcester, Springfield, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project.` },
    ],
    costLocationNote: `The Boston metro has high construction labor costs relative to the national average. Central and western Massachusetts are more moderate. Coastal projects with wind zone requirements may need additional engineering, affecting total cost.`,
    faqs: [
      { q: `Is Nudura ICF available in Massachusetts?`, a: `Yes. Nudura's distribution network covers Massachusetts, with supply for contractors in the Boston metro, Worcester, Springfield, and surrounding markets.` },
      { q: `Does Nudura ICF meet Massachusetts energy code?`, a: `Nudura's R-22 to R-28 wall assembly meets and often exceeds Massachusetts residential energy code requirements. Your designer and energy consultant will confirm compliance for your specific project and climate zone.` },
      { q: `What does Nudura ICF cost in Massachusetts?`, a: `Boston metro labor costs are among the higher markets in the country. Core width, design complexity, and location within the state are the key variables. Connect with a local Massachusetts contractor for an accurate project-specific estimate.` },
      { q: `Is ICF worth it in Massachusetts?`, a: `For Massachusetts homeowners, yes. Cold winters, coastal storm exposure, high energy costs, and strict code requirements all favor ICF. The combination of performance and long-term energy savings makes it a sound investment for new construction in the state.` },
    ],
  },

  {
    name: 'Montana',
    slug: 'montana',
    heroIntro: `Montana's extreme winters, mountain communities, and vast rural geography make Nudura ICF one of the best-performing wall systems in the state. If you're building with insulated concrete forms in Montana and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Montana's coldest climate zones, wider cores are frequently specified to maximize thermal performance and minimize heating costs. Nudura's 5 core width options give engineers the flexibility to meet Montana's energy demands across varying elevations and climate zones.`,
    whyIntro: `Montana's winters are long, cold, and intense, with mountain communities facing some of the most demanding conditions in the continental US. Nudura ICF is purpose-built for exactly this kind of climate.`,
    reasons: [
      { title: 'Extreme Cold Weather Performance', text: `Montana winters are among the most severe in the continental US, with temperatures regularly dropping well below zero across much of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads as low as possible even in Montana's harshest conditions.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `Montana homeowners face some of the longest and most expensive heating seasons in the country. Nudura's high R-value wall system significantly reduces that burden, and ICF's continuous insulation outperforms standard insulated stud walls in cold-climate heating performance. The payback on ICF's premium comes faster in heating-dominant climates like Montana's.` },
      { title: 'Durability in Mountain Conditions', text: `Montana's freeze-thaw cycles, snowpack, and mountain moisture put real stress on building materials. ICF walls handle freeze-thaw cycles better than wood framing, resist moisture infiltration, and maintain structural integrity through Montana's demanding seasonal transitions.` },
      { title: 'Montana Distribution', text: `Nudura's distribution network reaches Montana, with supply available to contractors in Billings, Missoula, Great Falls, and Bozeman markets. Your contractor should confirm current distributor availability and lead times, as freight logistics in Montana vary by location.` },
    ],
    costLocationNote: `Montana's construction market is more limited than in densely populated states. ICF-experienced contractors are concentrated in Billings, Missoula, and Bozeman. Rural and remote projects may see higher costs due to crew travel, freight distances, and limited local contractor availability.`,
    faqs: [
      { q: `Is Nudura ICF available in Montana?`, a: `Yes. Nudura's distribution network reaches Montana, with supply for contractors in Billings, Missoula, Great Falls, and Bozeman. Freight logistics and lead times may vary by location, so your contractor should confirm specifics.` },
      { q: `How does Nudura ICF perform in Montana winters?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are specifically suited to Montana's extreme cold. ICF consistently outperforms wood framing in cold-climate heating performance, and the energy savings in Montana's long heating season are among the most significant in the country.` },
      { q: `What does Nudura ICF cost in Montana?`, a: `Montana's limited contractor market and rural logistics tend to push project costs higher than in more densely populated states. Wider cores for cold climate performance also add to material costs. Connect with a local Montana contractor for a realistic project-specific estimate.` },
      { q: `Is ICF worth it in Montana?`, a: `For Montana homeowners, yes. The state's extreme cold means heating savings from ICF's high R-value wall system add up faster than almost anywhere else in the country. Long-term durability in Montana's demanding conditions also makes ICF a sound long-term investment.` },
    ],
  },

  {
    name: 'Idaho',
    slug: 'idaho',
    heroIntro: `Idaho's cold winters, mountain communities, seismic activity, and fast-growing Treasure Valley market make Nudura ICF a strong building system choice across the state. If you're building with insulated concrete forms in Idaho and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Idaho, seismic zone requirements and cold mountain climates often drive engineers toward wider cores with heavier reinforcement. Nudura's 5 core width options give designers flexibility to meet Idaho's structural and energy demands.`,
    whyIntro: `Idaho's building environment combines seismic risk, cold mountain winters, dramatic temperature swings, and one of the fastest-growing housing markets in the country. Nudura ICF handles Idaho's conditions well on every front.`,
    reasons: [
      { title: 'Seismic Performance', text: `Idaho sits on active fault systems that present real seismic risk, particularly in the Treasure Valley and eastern Idaho near Yellowstone. ICF's reinforced concrete wall system handles seismic lateral loads better than wood framing. Nudura's range of core widths gives engineers flexibility to meet Idaho's seismic design requirements.` },
      { title: 'Cold Mountain Climate Performance', text: `Idaho's mountain communities and higher elevation areas face cold winters and significant snowfall. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads low even in Idaho's coldest conditions.` },
      { title: 'High Desert Temperature Swings', text: `Southern Idaho's high desert climate brings dramatic day-to-night temperature swings. ICF's thermal mass absorbs daytime heat and releases it slowly overnight, stabilizing interior temperatures in ways that wood frame walls simply cannot match. This reduces both heating and cooling demands in Idaho's variable climate.` },
      { title: 'Treasure Valley Market Growth', text: `Idaho's Treasure Valley (Boise, Nampa, Meridian) is one of the fastest-growing markets in the country. Nudura's distribution network covers the state, and experienced ICF contractors are increasingly active in the region. Your contractor should confirm current availability and lead times.` },
    ],
    costLocationNote: `The Treasure Valley (Boise metro) has the most experienced ICF contractor market in Idaho and competitive pricing due to high construction activity. Northern Idaho and mountain communities may see higher costs due to crew travel and logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Idaho?`, a: `Yes. Nudura's distribution network covers Idaho, with supply for contractors in Boise, Nampa, Idaho Falls, and surrounding markets.` },
      { q: `Is Nudura ICF good for Idaho's earthquake risk?`, a: `Yes. ICF's reinforced concrete wall system performs well under seismic loads. Nudura's range of core widths gives structural engineers the flexibility to meet Idaho's seismic design requirements for your specific location and risk category.` },
      { q: `What does Nudura ICF cost in Idaho?`, a: `The Boise metro tends to have competitive ICF pricing due to high construction activity. Mountain and rural projects may see higher costs due to fewer local crews and logistics. Connect with a local Idaho contractor for an accurate estimate.` },
      { q: `Is ICF a good investment in Idaho?`, a: `Yes. Idaho's seismic risk, cold mountain winters, and fast-growing housing market make ICF a sound investment. Building right the first time matters more in a market where home values are rising and long-term ownership is common.` },
    ],
  },

  {
    name: 'West Virginia',
    slug: 'west-virginia',
    heroIntro: `West Virginia's cold mountain winters, rugged terrain, and growing residential market make Nudura ICF a strong building system choice across the state. If you're building with insulated concrete forms in West Virginia and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In West Virginia's colder mountain climate zones, wider cores are sometimes specified to maximize thermal performance. Nudura's 5 core width options give engineers flexibility to meet the state's energy demands across varying elevations.`,
    whyIntro: `West Virginia's mountain climate brings cold winters, significant precipitation, and terrain that challenges standard construction logistics. Nudura ICF delivers strong performance in exactly these conditions.`,
    reasons: [
      { title: 'Cold Mountain Climate Performance', text: `West Virginia's mountain communities face cold winters and heavy precipitation, with some of the higher elevations seeing significant snowfall. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Moisture and Precipitation Resistance', text: `West Virginia receives significant annual precipitation across much of the state. ICF walls resist moisture infiltration and don't rot or support mold growth the way wood framing can under sustained wet conditions. This is a meaningful long-term durability advantage in West Virginia's climate.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `West Virginia homeowners face meaningful heating costs through a long winter season. Nudura's high R-value wall system reduces those costs significantly, and ICF's continuous insulation outperforms standard insulated stud walls in cold-climate performance. Many West Virginia ICF homeowners see the payback on the ICF premium faster than expected.` },
      { title: 'West Virginia Distribution', text: `Nudura's distribution network covers West Virginia, with supply available to contractors in Charleston, Huntington, Morgantown, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project location.` },
    ],
    costLocationNote: `Charleston and the Morgantown area have the most active construction markets in West Virginia. Mountain and rural projects may see higher costs due to terrain, crew travel, and logistics challenges that are specific to West Virginia's geography.`,
    faqs: [
      { q: `Is Nudura ICF available in West Virginia?`, a: `Yes. Nudura's distribution network covers West Virginia, with supply for contractors in Charleston, Huntington, Morgantown, and surrounding markets.` },
      { q: `How does Nudura ICF perform in West Virginia winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads in West Virginia's cold mountain climate. Higher elevation communities particularly benefit from ICF's cold-climate performance and moisture resistance.` },
      { q: `What does Nudura ICF cost in West Virginia?`, a: `Cost depends on your design, core width, location, and local labor. Terrain and logistics in West Virginia's mountain communities can add to project costs. Connect with a local contractor for a realistic project-specific estimate.` },
      { q: `Is ICF worth it in West Virginia?`, a: `For most West Virginia homeowners, yes. Cold winters, significant precipitation, and the long-term durability advantages of ICF over wood framing in a mountain climate make it a sound investment for new construction.` },
    ],
  },

];

// ─── HTML GENERATOR ───────────────────────────────────────────────────────────
function generatePage(s) {
  const stateParam = encodeURIComponent(s.name);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nudura ICF in ${s.name}: Build Guide &amp; Contractors | ICF Insider</title>
  <meta name="description" content="Everything you need to know about building with Nudura ICF in ${s.name}. Specs, cost expectations, why it works in ${s.name}'s climate, and how to find a certified Nudura contractor near you.">
  <link rel="canonical" href="https://icfinsider.com/brands/nudura/states/${s.slug}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Nudura ICF in ${s.name}: Build Guide &amp; Contractors | ICF Insider">
  <meta property="og:description" content="Everything you need to know about building with Nudura ICF in ${s.name}. Specs, cost expectations, and how to find a certified contractor near you.">
  <meta property="og:url" content="https://icfinsider.com/brands/nudura/states/${s.slug}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/components.css">
  <style>
    .brand-header{display:flex;align-items:center;gap:var(--space-5);margin-bottom:var(--space-6);padding:var(--space-5) var(--space-6);background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;}
    .brand-header-logo{height:48px;width:auto;object-fit:contain;flex-shrink:0;}
    .brand-header-meta{display:flex;flex-direction:column;gap:4px;}
    .brand-header-name{font-size:1.1rem;font-weight:700;color:var(--color-text-dark);margin:0;}
    .brand-header-parent{font-size:0.8rem;color:var(--color-text-muted);margin:0;}
    .brand-photo{width:100%;border-radius:12px;border:1px solid var(--color-border);margin:var(--space-8) 0;overflow:hidden;}
    .brand-photo img{width:100%;height:auto;display:block;}
    .brand-photo figcaption{padding:var(--space-3) var(--space-4);font-size:0.78rem;color:var(--color-text-muted);background:var(--color-surface);border-top:1px solid var(--color-border);}
    .spec-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);margin:var(--space-8) 0;}
    .spec-bar-item{text-align:center;}
    .spec-bar-value{display:block;font-size:1.5rem;font-weight:700;color:var(--color-text-dark);line-height:1.1;}
    .spec-bar-label{display:block;font-size:0.75rem;color:var(--color-text-muted);margin-top:4px;}
    .reason-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-top:var(--space-8);}
    .reason-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6);}
    .reason-card h3{margin:0 0 var(--space-2);font-size:1rem;}
    .reason-card p{margin:0;font-size:0.9rem;color:var(--color-text-mid);line-height:1.65;}
    .faq-list{display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-8);}
    .faq-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:var(--space-6) var(--space-7);}
    .faq-card h3{margin:0 0 var(--space-2);font-size:1rem;}
    .faq-card p{margin:0;color:var(--color-text-mid);line-height:1.7;}
    .cta-panel{margin-top:var(--space-16);background:var(--color-dark-900);border-radius:14px;padding:var(--space-8);border:1px solid rgba(255,255,255,0.08);}
    .cta-panel h2{margin:0 0 var(--space-3);color:var(--color-text-light);}
    .cta-panel p{margin:0 0 var(--space-6);color:var(--color-text-muted);max-width:600px;}
    @media(max-width:767px){.spec-bar{grid-template-columns:repeat(2,1fr);}.reason-grid{grid-template-columns:1fr;}.brand-header{flex-direction:column;align-items:flex-start;}}
  </style>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[
    {"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://icfinsider.com/"},
      {"@type":"ListItem","position":2,"name":"Brand Comparison","item":"https://icfinsider.com/brands"},
      {"@type":"ListItem","position":3,"name":"Nudura ICF in ${s.name}","item":"https://icfinsider.com/brands/nudura/states/${s.slug}"}
    ]},
    {"@type":"FAQPage","mainEntity":[
      ${s.faqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',\n      ')}
    ]}
  ]}
  </script>
</head>
<body>

  <nav class="nav" id="main-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
      <ul class="nav-links" role="list">
        <li><a href="/icf-101.html" class="nav-link">ICF 101</a></li>
        <li><a href="/cost-guide.html" class="nav-link">Cost Guide</a></li>
        <li><a href="/brands.html" class="nav-link active">Brand Comparison</a></li>
        <li><a href="/find-a-pro.html" class="nav-link">Find a Pro</a></li>
      </ul>
      <div class="nav-cta"><a href="/find-a-pro.html?state=${stateParam}" class="btn btn-primary">Find a Pro</a></div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/icf-101.html" class="nav-link">ICF 101</a>
    <a href="/cost-guide.html" class="nav-link">Cost Guide</a>
    <a href="/brands.html" class="nav-link active">Brand Comparison</a>
    <a href="/find-a-pro.html" class="nav-link">Find a Pro</a>
    <a href="/find-a-pro.html?state=${stateParam}" class="btn btn-primary">Find a Pro</a>
  </div>

  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <div class="page-hero-meta">
        <span class="page-hero-tag"><a href="/brands.html#nudura" style="color:inherit;text-decoration:none;">Nudura</a></span>
        <span class="page-hero-readtime">${s.name}</span>
      </div>
      <span class="eyebrow">Insulated Concrete Form Brand Guide</span>
      <h1 id="page-title">Nudura ICF in ${s.name}: Build Guide &amp; Contractors</h1>
      <p class="page-hero-intro" style="max-width:640px;">${s.heroIntro}</p>
      <div style="margin-top:var(--space-6);">
        <a href="/find-a-pro.html?state=${stateParam}" class="btn btn-primary btn-lg">Find a Nudura Contractor in ${s.name}</a>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="content-layout">
      <article class="article" id="article">

        <section id="about-nudura">
          <span class="eyebrow">About the Brand</span>
          <h2>What Is Nudura ICF?</h2>
          <div class="brand-header">
            <img src="/images/brand-logos/nudura-logo.png" alt="Nudura ICF logo" class="brand-header-logo">
            <div class="brand-header-meta">
              <p class="brand-header-name">Nudura</p>
              <p class="brand-header-parent">Parent company: Tremco (RPM International) &nbsp;|&nbsp; Canadian origin &nbsp;|&nbsp; Flat block system</p>
            </div>
          </div>
          <p>Nudura is a Canadian-origin ICF brand now owned by Tremco, a division of RPM International, one of the largest building products companies in the world. That corporate backing gives Nudura a distribution network that few ICF brands can match, making it one of the most available products across North America, including ${s.name}.</p>
          <p>Nudura uses a flat block design with an integrated plastic web tie system. The block itself is larger than most competitors: 18 inches tall by 8 feet long, meaning more square footage per block and faster installation. Nudura's patented <strong>DuraFold</strong> hinge system allows web ties to fold flat during shipping, which reduces freight costs and cuts the number of deliveries needed on the job site.</p>
          <div class="spec-bar" role="list" aria-label="Nudura specifications">
            <div class="spec-bar-item" role="listitem"><span class="spec-bar-value">R-22 to R-28</span><span class="spec-bar-label">Wall assembly R-value</span></div>
            <div class="spec-bar-item" role="listitem"><span class="spec-bar-value">6"</span><span class="spec-bar-label">Most common core size</span></div>
            <div class="spec-bar-item" role="listitem"><span class="spec-bar-value">18" x 96"</span><span class="spec-bar-label">Standard block size</span></div>
            <div class="spec-bar-item" role="listitem"><span class="spec-bar-value">5</span><span class="spec-bar-label">Core width options</span></div>
          </div>
          <p>${s.aboutNote}</p>
          <figure class="brand-photo">
            <img src="/images/Nudura%20Pics/Nudura%20Forms%20Family%20Shot.png" alt="Nudura ICF forms product family showing all available block options" loading="lazy">
            <figcaption>The Nudura insulated concrete form product family. Core widths range from 4" to 12", covering everything from standard residential builds to large commercial projects.</figcaption>
          </figure>
        </section>

        <section id="why-${s.slug}" style="margin-top:var(--space-16);">
          <span class="eyebrow">Why It Makes Sense</span>
          <h2>Why ${s.name} Builders Choose Nudura</h2>
          <p>${s.whyIntro}</p>
          <figure class="brand-photo">
            <img src="/images/Nudura%20Pics/ICF%20build%20commercial.jpeg" alt="Large commercial ICF building under construction using Nudura forms" loading="lazy">
            <figcaption>Nudura insulated concrete forms used on a large commercial build. The system scales from single-family homes to large commercial and multi-family projects.</figcaption>
          </figure>
          <div class="reason-grid">
            ${s.reasons.map(r => `<div class="reason-card"><h3>${r.title}</h3><p>${r.text}</p></div>`).join('\n            ')}
          </div>
        </section>

        <section id="cost" style="margin-top:var(--space-16);">
          <span class="eyebrow">Cost Expectations</span>
          <h2>What Does Nudura ICF Cost in ${s.name}?</h2>
          <p>Nudura carries a slight price premium compared to some ICF competitors, but it's generally competitive with other major brands. In ${s.name}, total ICF project costs depend on several factors beyond the block itself:</p>
          <ul style="color:var(--color-text-mid);line-height:2;padding-left:var(--space-6);">
            <li><strong style="color:var(--color-text-dark);">Design complexity</strong>: Simple rectangular footprints are fastest; complex multi-story or irregular designs add labor time</li>
            <li><strong style="color:var(--color-text-dark);">Core width</strong>: Wider cores (8", 10", 12") increase both block and concrete costs and are required in some structural and wind zone applications</li>
            <li><strong style="color:var(--color-text-dark);">Location in ${s.name}</strong>: ${s.costLocationNote}</li>
            <li><strong style="color:var(--color-text-dark);">Concrete pricing</strong>: Concrete is a major cost driver in ICF construction and fluctuates with local market conditions</li>
            <li><strong style="color:var(--color-text-dark);">Engineering requirements</strong>: Local wind zones, seismic categories, and code requirements may call for additional structural engineering</li>
          </ul>
          <p style="margin-top:var(--space-6);">The best way to understand what Nudura ICF will cost for your specific project is to connect with a ${s.name} contractor who has direct experience with the system.</p>
        </section>

        <section id="faq" style="margin-top:var(--space-16);">
          <span class="eyebrow">FAQ</span>
          <h2>Common Questions About Nudura ICF in ${s.name}</h2>
          <div class="faq-list">
            ${s.faqs.map(f => `<div class="faq-card"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('\n            ')}
          </div>
        </section>

        <div class="cta-panel">
          <h2>Find a Nudura Contractor in ${s.name}</h2>
          <p>Browse ICF professionals in ${s.name} who work with Nudura and other top brands. Get connected with a local contractor who can give you an accurate project quote.</p>
          <a href="/find-a-pro.html?state=${stateParam}" class="btn btn-primary btn-lg">Find a Pro in ${s.name}</a>
        </div>

      </article>

      <aside class="toc-sidebar" aria-label="Page navigation">
        <div class="toc-inner">
          <p class="toc-label">On this page</p>
          <ul class="toc-list">
            <li><a href="#about-nudura" class="toc-link">About Nudura</a></li>
            <li><a href="#why-${s.slug}" class="toc-link">Why ${s.name} Builders Choose Nudura</a></li>
            <li><a href="#cost" class="toc-link">Cost in ${s.name}</a></li>
            <li><a href="#faq" class="toc-link">Common Questions</a></li>
          </ul>
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
            <p style="font-size:0.8rem;color:var(--color-text-muted);margin:0 0 var(--space-3);">Related pages</p>
            <a href="/brands.html#nudura" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;margin-bottom:var(--space-2);">Full Nudura Review &rarr;</a>
            <a href="/states/${s.slug}/" class="btn btn-secondary" style="width:100%;text-align:center;font-size:0.85rem;">${s.name} ICF Page &rarr;</a>
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
        <div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro.html" class="footer-link">Find a Contractor</a></li><li><a href="/get-connected.html?tab=contractor" class="footer-link">List Your Business</a></li></ul></div>
        <div class="footer-col"><h4>Company</h4><ul class="footer-links" role="list"><li><a href="/about.html" class="footer-link">About</a></li><li><a href="/privacy-policy.html" class="footer-link">Privacy Policy</a></li><li><a href="/terms-of-use.html" class="footer-link">Terms of Use</a></li></ul></div>
        <div class="footer-col"><h4>Contact</h4><ul class="footer-links" role="list"><li><a href="mailto:tyler@icfinsider.com" class="footer-link" style="color:var(--color-accent);">tyler@icfinsider.com</a></li></ul></div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ICF Insider. All rights reserved.</p>
        <nav class="footer-bottom-links" aria-label="Legal"><a href="/privacy-policy.html">Privacy Policy</a><a href="/terms-of-use.html">Terms of Use</a></nav>
      </div>
    </div>
  </footer>

  <script src="/js/main.js"></script>
</body>
</html>`;
}

// ─── RUN ─────────────────────────────────────────────────────────────────────
let generated = 0;
states.forEach(s => {
  const dir = path.join(__dirname, 'brands', 'nudura', 'states', s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generatePage(s));
  console.log(`✓ ${s.name} -> brands/nudura/states/${s.slug}/index.html`);
  generated++;
});
console.log(`\nDone. ${generated} pages generated.`);
