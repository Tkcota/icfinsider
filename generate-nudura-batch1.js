const fs = require('fs');
const path = require('path');

// ─── STATE DATA ───────────────────────────────────────────────────────────────
const states = [

  {
    name: 'Alabama',
    slug: 'alabama',
    heroIntro: `Nudura is an established ICF choice in Alabama, where tornado risk and a hot-humid climate make wall performance a top priority. If you're planning an insulated concrete form build in Alabama and your contractor uses Nudura, here's what you need to know about the system, what to expect on cost, and how to find a qualified builder in your area.`,
    aboutNote: `Core widths in the Nudura system range from 4" through 12". In Alabama's wind zones, engineers typically specify wider cores with heavier rebar schedules for storm-critical applications.`,
    whyIntro: `Alabama averages over 25 tornadoes per year and sees long, hot, humid summers. That combination makes ICF one of the most practical wall systems in the state. Nudura is well-positioned for the Alabama market for several reasons.`,
    reasons: [
      { title: 'Tornado Protection', text: `Alabama averages over 25 tornadoes per year, more than almost any other state. ICF walls, including Nudura, provide meaningful protection compared to wood framing. The reinforced concrete core resists the lateral forces and debris impact that cause most storm damage.` },
      { title: 'Hot-Humid Climate Performance', text: `Alabama summers are long, hot, and humid. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and the thermal mass effect stabilizes interior temperatures even during peak heat. Many Alabama ICF homeowners report lower monthly energy bills from day one.` },
      { title: 'Moisture Resistance', text: `Alabama's humidity and frequent rain create moisture management challenges for wood-frame construction. ICF walls don't rot, warp, or absorb moisture like wood. Nudura's EPS foam and concrete core stay structurally sound in humid conditions over the long term.` },
      { title: 'Growing Alabama Market', text: `ICF adoption is growing across Alabama, particularly in the Birmingham, Huntsville, and Mobile metros. Nudura's wide distribution network means contractors in these areas can source product reliably, keeping your project timeline on track.` },
    ],
    costLocationNote: `Labor rates and contractor availability vary across Alabama, with more experienced ICF crews concentrated in the Birmingham, Huntsville, and Mobile markets. Rural builds may see higher costs due to crew travel.`,
    faqs: [
      { q: `Is Nudura ICF available in Alabama?`, a: `Yes. Nudura's distribution network covers Alabama, with supply available to contractors across the state. Your contractor will confirm local distributor availability and lead times for your specific area.` },
      { q: `Does Nudura meet Alabama building code?`, a: `Nudura ICF meets Alabama building code requirements. In tornado-risk areas, your structural engineer will specify the appropriate core width and rebar schedule for your wind zone and soil conditions.` },
      { q: `What does Nudura ICF cost in Alabama?`, a: `Total project cost depends on design complexity, core width, concrete pricing, and labor availability in your area. The best way to get an accurate number is to connect with a local Alabama contractor who has built with Nudura before.` },
      { q: `Is ICF worth it in Alabama?`, a: `For most Alabama homeowners, yes. The combination of tornado resilience, energy savings in a hot-humid climate, and long-term durability makes ICF a strong value proposition compared to standard wood framing.` },
    ],
  },

  {
    name: 'Arizona',
    slug: 'arizona',
    heroIntro: `Arizona's extreme heat makes Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Arizona and considering the Nudura system, here's what you need to know about specs, performance in desert conditions, and how to find a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Arizona's climate, the 6" core is most common for residential, but wider cores are used for commercial applications and projects with specific structural requirements.`,
    whyIntro: `Arizona's extreme heat, dramatic temperature swings, and dry desert climate create unique demands on wall systems. Nudura ICF is particularly well-suited to the Arizona market for several reasons.`,
    reasons: [
      { title: 'Extreme Heat Performance', text: `Phoenix regularly exceeds 110 degrees in summer. Nudura's R-22 to R-28 wall assembly and ICF's thermal mass work together to significantly reduce cooling loads. The concrete core absorbs heat during the day and releases it slowly at night, keeping interiors more comfortable with less AC.` },
      { title: 'Energy Savings in the Desert', text: `Arizona homeowners run air conditioning for much of the year. ICF walls reduce the energy required to cool a home compared to wood framing, and many Arizona ICF homeowners see meaningful reductions in monthly utility bills. The payback period on the ICF premium is shorter in extreme climates.` },
      { title: 'Durability in Desert Conditions', text: `Arizona's heat cycles, UV exposure, and dry climate are hard on building materials. ICF walls don't dry-rot, warp, or degrade under these conditions. The EPS foam and concrete core handle extreme temperature swings without structural compromise.` },
      { title: 'Arizona Distribution', text: `Nudura's national distribution network reaches Arizona, with supply available to contractors in the Phoenix, Tucson, and Flagstaff markets. Your contractor will confirm distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Labor rates vary across Arizona, with more ICF-experienced crews in the Phoenix and Tucson metro areas. Desert logistics and concrete pricing in your specific location will affect total project cost.`,
    faqs: [
      { q: `Is Nudura ICF available in Arizona?`, a: `Yes. Nudura's distribution network covers Arizona. Contractors in the Phoenix and Tucson markets can source product reliably, though your contractor should confirm current distributor availability and lead times.` },
      { q: `How does Nudura ICF hold up in Arizona heat?`, a: `Very well. ICF walls are inherently suited to extreme heat climates. The concrete core and EPS foam handle temperature cycles that would stress other building materials, and the thermal mass effect reduces cooling loads compared to wood frame construction.` },
      { q: `What does Nudura ICF cost in Arizona?`, a: `Cost depends on your design, core width, concrete pricing, and labor in your area. Phoenix-area projects tend to have more competitive pricing due to greater contractor availability. Connect with a local Arizona contractor for an accurate quote.` },
      { q: `Is ICF worth the premium in Arizona?`, a: `In Arizona's climate, the payback on ICF's upfront premium is faster than in moderate climates due to high cooling costs. Many Arizona ICF homeowners find the long-term energy savings and durability make the upfront investment worthwhile.` },
    ],
  },

  {
    name: 'California',
    slug: 'california',
    heroIntro: `California's combination of wildfire risk, seismic activity, and strict energy codes makes Nudura ICF one of the most well-suited building systems in the state. If you're planning an insulated concrete form build in California and your contractor works with Nudura, here's what you need to know about performance, code compliance, and finding a qualified builder near you.`,
    aboutNote: `Core widths in the Nudura system range from 4" through 12". California's seismic requirements often drive engineers toward wider cores with heavier reinforcement schedules, particularly in high seismic zones along the coast and near active fault lines.`,
    whyIntro: `California's building challenges are unique: wildfire risk in the foothills, seismic activity statewide, and some of the strictest energy codes in the country. Nudura ICF addresses all three in a single wall system.`,
    reasons: [
      { title: 'Wildfire Resistance', text: `ICF walls don't burn. In California's wildland-urban interface zones, where wood-frame homes are increasingly at risk, the concrete and EPS foam construction of Nudura ICF provides meaningful fire resistance. Many California homeowners in fire-prone areas choose ICF for this reason alone.` },
      { title: 'Seismic Performance', text: `California sits on some of the most active fault lines in North America. ICF's reinforced concrete wall system handles seismic lateral loads better than wood framing. Nudura's multiple core width options (up to 12") give engineers flexibility to meet California's seismic design requirements.` },
      { title: 'Title 24 Energy Code Compliance', text: `California's Title 24 energy code is one of the strictest in the country. Nudura's R-22 to R-28 wall assembly meets and often exceeds many Title 24 requirements, making compliance simpler for your design team. ICF's thermal mass also earns credit under California's performance compliance pathway.` },
      { title: 'Strong California Distribution', text: `Nudura's distribution network covers California's major construction markets, including Los Angeles, the Bay Area, San Diego, and the Central Valley. Your contractor can source product reliably without excessive lead times or freight costs.` },
    ],
    costLocationNote: `California has some of the highest construction labor costs in the country. ICF's faster installation (Nudura's larger 18" x 8' block covers more square footage per course) helps offset some labor cost compared to smaller-block systems. Location within California significantly affects total project cost.`,
    faqs: [
      { q: `Is Nudura ICF available in California?`, a: `Yes. Nudura has distribution coverage across California's major construction markets including Los Angeles, the Bay Area, San Diego, and the Central Valley.` },
      { q: `Does Nudura ICF meet California's Title 24 energy code?`, a: `Nudura's R-22 to R-28 wall assembly meets and often exceeds Title 24 requirements. ICF's thermal mass also earns credit under California's performance compliance pathway. Your designer and energy consultant will confirm compliance for your specific project.` },
      { q: `Is Nudura ICF good for earthquake zones in California?`, a: `Yes. ICF's reinforced concrete wall system performs well under seismic loads. Nudura's range of core widths (4" through 12") gives structural engineers the flexibility to meet California's seismic design requirements for your specific location and risk category.` },
      { q: `What does Nudura ICF cost in California?`, a: `California has high construction labor costs, which affects total ICF project pricing. However, Nudura's larger block size means faster installation and potentially lower labor hours than smaller-block systems. Connect with a California contractor for an accurate project-specific quote.` },
    ],
  },

  {
    name: 'Colorado',
    slug: 'colorado',
    heroIntro: `Colorado's cold winters, high altitude, and dramatic temperature swings make Nudura ICF one of the strongest performing wall systems in the state. If you're building with insulated concrete forms in Colorado and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Colorado's colder climate zones, engineers often specify wider cores to maximize thermal performance. Nudura's 5 core width options give designers flexibility to hit specific energy targets for your location and elevation.`,
    whyIntro: `Colorado's combination of cold winters, high altitude, and dramatic day-to-night temperature swings creates real demands on wall performance. Nudura ICF is well-suited to Colorado's climate for several reasons.`,
    reasons: [
      { title: 'Cold Climate Insulation', text: `Colorado winters are long and cold, particularly at elevation. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, outperforming wood frame walls in cold conditions. ICF keeps heat in and cold out more effectively than stick-built construction.` },
      { title: 'Thermal Mass for Temperature Swings', text: `Colorado is known for dramatic day-to-night temperature swings, especially in the mountains and high plains. ICF's concrete core absorbs heat during warm periods and releases it slowly when temperatures drop, stabilizing interior temperatures and reducing HVAC load.` },
      { title: 'Energy Efficiency at Altitude', text: `Heating costs in Colorado are a real concern, especially in mountain communities. Nudura's high R-value wall system reduces heating load significantly, and many Colorado ICF homeowners see meaningful energy savings over wood-frame alternatives.` },
      { title: 'Front Range Distribution', text: `Nudura has solid distribution coverage along Colorado's Front Range, with supply available to contractors in Denver, Colorado Springs, Fort Collins, and surrounding areas. Mountain project logistics vary, so your contractor should confirm lead times for your specific location.` },
    ],
    costLocationNote: `Construction costs in Colorado vary significantly by location. Front Range projects have access to more ICF-experienced labor. Mountain and rural projects may see higher costs due to crew travel, higher concrete prices, and more complex logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Colorado?`, a: `Yes. Nudura's distribution network covers Colorado, with reliable supply for contractors along the Front Range and in major markets. Mountain locations should confirm distributor availability and freight costs with their contractor.` },
      { q: `How does Nudura ICF perform in Colorado's cold winters?`, a: `Extremely well. ICF is inherently suited to cold climates. Nudura's R-22 to R-28 wall assembly and continuous insulation keep heating loads low even in Colorado's harshest winters, outperforming wood frame walls in cold-weather performance.` },
      { q: `What does Nudura ICF cost in Colorado?`, a: `Cost depends on your design, location, core width, and local labor availability. Front Range projects tend to be more competitively priced. Mountain and custom builds add complexity. Connect with a Colorado contractor for a project-specific estimate.` },
      { q: `Is ICF a good choice for Colorado mountain homes?`, a: `Yes. ICF handles Colorado's cold temperatures, temperature swings, and high-altitude conditions well. The thermal mass and continuous insulation are particularly well-suited to mountain climates where heating costs are high.` },
    ],
  },

  {
    name: 'Georgia',
    slug: 'georgia',
    heroIntro: `Georgia's combination of coastal hurricane risk, hot and humid summers, and a rapidly growing construction market makes Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Georgia and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In Georgia's coastal regions, engineers typically specify wider cores with heavier rebar to meet wind load requirements. Inland projects commonly use the standard 6" core.`,
    whyIntro: `Georgia's climate ranges from coastal hurricane exposure in the south to hot, humid summers statewide. Add a rapidly growing construction market and Nudura ICF becomes a strong fit for the state for several reasons.`,
    reasons: [
      { title: 'Hurricane and Storm Protection', text: `Georgia's coastline and southern regions face regular hurricane and tropical storm activity. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind events. Many Georgia coastal homeowners choose ICF specifically for storm resilience.` },
      { title: 'Energy Efficiency in a Hot-Humid Climate', text: `Georgia summers are long, hot, and humid. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass helps stabilize interior temperatures. Many Georgia ICF homeowners report meaningful reductions in monthly energy bills.` },
      { title: 'Moisture and Mold Resistance', text: `Georgia's humidity creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth the way wood framing can. This is a significant long-term durability advantage in Georgia's climate.` },
      { title: 'Atlanta Metro Growth', text: `Georgia's construction market is booming, particularly in the Atlanta metro. Nudura's distribution network keeps up with demand, and a growing number of experienced ICF contractors operate throughout the state.` },
    ],
    costLocationNote: `Labor rates and ICF contractor availability vary across Georgia. The Atlanta metro has the most experienced crews and competitive pricing. Coastal and rural areas may see higher costs due to crew travel and logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Georgia?`, a: `Yes. Nudura's distribution network covers Georgia, with reliable supply for contractors in Atlanta, Savannah, Augusta, and surrounding areas.` },
      { q: `Does Nudura meet Georgia's building code for hurricane zones?`, a: `Nudura ICF meets Georgia Building Code requirements including coastal wind zone requirements. Your structural engineer will specify the appropriate core width and rebar schedule for your specific location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Georgia?`, a: `Cost depends on design, core width, location, and labor availability. Atlanta-area projects tend to have more competitive pricing. Coastal projects may require wider cores and heavier engineering, which affects cost. Connect with a local contractor for an accurate quote.` },
      { q: `Is ICF worth it for a Georgia home?`, a: `For most Georgia homeowners, particularly those in coastal areas or with high energy bills, yes. The combination of storm resilience, energy savings in a hot-humid climate, and moisture resistance makes ICF a strong long-term value.` },
    ],
  },

  {
    name: 'Illinois',
    slug: 'illinois',
    heroIntro: `Illinois faces cold winters, hot summers, and real tornado risk, a combination that makes Nudura ICF a highly practical building system for the state. If you're building with insulated concrete forms in Illinois and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths in the Nudura system range from 4" through 12". In Illinois, residential projects most commonly use the 6" core, while commercial and multi-family projects often specify wider cores for additional structural performance and insulation.`,
    whyIntro: `Illinois has a demanding climate for buildings: cold winters, hot summers, and real tornado risk. Nudura ICF addresses all three in a single high-performance wall system.`,
    reasons: [
      { title: 'Cold Climate Performance', text: `Illinois winters are harsh, particularly in the northern part of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads low even during extended cold snaps. ICF consistently outperforms wood framing in cold-climate energy performance.` },
      { title: 'Tornado Protection', text: `Illinois sits on the eastern edge of Tornado Alley and sees significant tornado activity each year. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction in high-wind and storm events.` },
      { title: 'Year-Round Energy Savings', text: `Illinois has both cold winters and hot summers, meaning HVAC runs hard year-round. Nudura's high R-value wall system reduces both heating and cooling loads, and ICF's thermal mass smooths out temperature swings between seasons. Many Illinois ICF homeowners see savings in both summer and winter utility bills.` },
      { title: 'Chicago Metro Distribution', text: `Nudura has strong distribution coverage across Illinois, including the Chicago metropolitan area, one of the largest construction markets in the country. Product availability for contractors is reliable across most of the state.` },
    ],
    costLocationNote: `Illinois construction costs vary significantly between the Chicago metro and downstate markets. Chicago-area labor rates are higher, but ICF contractor availability is also greater. Downstate projects may have fewer experienced ICF crews available locally.`,
    faqs: [
      { q: `Is Nudura ICF available in Illinois?`, a: `Yes. Nudura's distribution network covers Illinois, including the Chicago metro and downstate markets. Your contractor can confirm current availability and lead times for your specific location.` },
      { q: `How does Nudura ICF perform in Illinois winters?`, a: `Very well. Nudura's R-22 to R-28 wall assembly and continuous insulation are well-suited to Illinois's cold winters. ICF consistently outperforms wood framing in cold-climate heating performance, and many Illinois ICF homeowners see meaningful energy savings.` },
      { q: `What does Nudura ICF cost in Illinois?`, a: `Chicago-area projects typically see higher labor costs than downstate builds. Core width, design complexity, and concrete pricing also affect total cost. Connect with a local Illinois contractor for a project-specific estimate.` },
      { q: `Is ICF a good investment in Illinois?`, a: `Yes. Illinois's cold winters and hot summers mean HVAC runs hard year-round. The energy savings from Nudura's high R-value wall system, combined with tornado resilience, make ICF a strong long-term investment for Illinois homeowners.` },
    ],
  },

  {
    name: 'Michigan',
    slug: 'michigan',
    heroIntro: `Michigan's harsh winters, lake effect snow, and Great Lakes climate make Nudura ICF one of the best-performing wall systems in the state. If you're building with insulated concrete forms in Michigan and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Michigan's cold climate zones, wider cores are often specified to maximize thermal performance. Nudura's 5 core width options give structural engineers and designers flexibility to meet Michigan's energy code requirements.`,
    whyIntro: `Michigan's winters are among the harshest in the contiguous US, with lake effect snow adding moisture and cold exposure across much of the state. Nudura ICF handles Michigan's climate demands well for several reasons.`,
    reasons: [
      { title: 'Extreme Cold Weather Performance', text: `Michigan winters are long and cold, with lake effect snow amplifying the challenge in the western and northern parts of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation that significantly reduces heating loads compared to wood frame construction.` },
      { title: 'Lake Effect Snow and Moisture Resistance', text: `Western Michigan in particular sees extreme lake effect snow and year-round moisture exposure. ICF walls resist moisture infiltration and don't rot or degrade the way wood framing can under sustained wet conditions. Nudura's system handles Great Lakes climate demands well over the long term.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `Michigan homeowners spend significantly on heating. Nudura's high R-value wall system reduces that burden, and ICF's continuous insulation with no thermal bridging outperforms insulated wood stud walls in cold conditions. The payback on ICF's premium comes faster in heating-dominant climates.` },
      { title: 'Michigan Market Distribution', text: `Nudura's distribution network covers Michigan, with supply available to contractors in the Detroit, Grand Rapids, Lansing, and Traverse City markets. Your contractor should confirm distributor availability and lead times for your specific area.` },
    ],
    costLocationNote: `Michigan construction costs vary by region, with the Detroit and Grand Rapids metros having more experienced ICF labor available. Northern Michigan and rural areas may see higher project costs due to crew travel and logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Michigan?`, a: `Yes. Nudura's distribution network covers Michigan, with supply for contractors in major markets including Detroit, Grand Rapids, and Lansing. Your contractor should confirm availability for your specific area.` },
      { q: `How does Nudura ICF handle Michigan winters and lake effect snow?`, a: `Very well. ICF is specifically well-suited to cold, wet climates. Nudura's R-22 to R-28 wall assembly handles Michigan's cold winters, and the concrete core resists moisture infiltration from lake effect precipitation better than wood framing.` },
      { q: `What does Nudura ICF cost in Michigan?`, a: `Cost depends on your design, location, core width, and local labor availability. The Detroit and Grand Rapids markets have more competitive pricing due to greater contractor availability. Connect with a Michigan contractor for an accurate estimate.` },
      { q: `Is ICF worth the investment in Michigan?`, a: `For Michigan homeowners, yes. The state's heating-dominant climate means the energy savings from Nudura's high R-value wall system add up faster than in milder states, shortening the payback period on the ICF premium.` },
    ],
  },

  {
    name: 'North Carolina',
    slug: 'north-carolina',
    heroIntro: `North Carolina's hurricane coast, hot and humid summers, and rapidly growing population make Nudura ICF one of the most practical building systems in the state. If you're planning an insulated concrete form build in North Carolina and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In North Carolina's coastal regions, engineers often specify wider cores with heavier reinforcement to meet the state's high-wind zone and hurricane load requirements. Piedmont and mountain projects commonly use the standard 6" core.`,
    whyIntro: `North Carolina spans a wide range of climate exposures, from hurricane-prone coastline to hot, humid piedmont to cooler mountain elevations. Nudura ICF is well-positioned across the state for several reasons.`,
    reasons: [
      { title: 'Hurricane and Coastal Storm Protection', text: `North Carolina's Outer Banks and coastal communities face regular hurricane and tropical storm impacts. ICF walls provide meaningful protection compared to wood framing in high-wind events. Nudura is widely used by contractors in North Carolina's coastal market for this reason.` },
      { title: 'Hot-Humid Summer Performance', text: `North Carolina summers are hot and humid across most of the state. Nudura's R-22 to R-28 wall assembly reduces cooling loads significantly, and ICF's thermal mass stabilizes interior temperatures even during peak summer heat.` },
      { title: 'Moisture and Humidity Resistance', text: `Sustained heat and humidity create ongoing moisture challenges for wood-frame homes in North Carolina. ICF walls resist moisture infiltration and don't support mold growth the way wood can. This is a meaningful durability advantage over the life of the home.` },
      { title: 'Charlotte and Raleigh Market Growth', text: `North Carolina is one of the fastest-growing states in the country. The Charlotte and Raleigh-Durham metros are among the top construction markets in the Southeast. Nudura's distribution network keeps pace with this growth, and an increasing number of experienced ICF contractors operate throughout the state.` },
    ],
    costLocationNote: `Labor rates and ICF contractor availability vary across North Carolina. The Charlotte and Raleigh-Durham metros have the most experienced crews. Coastal projects may require wider cores and additional engineering for wind zone compliance, which affects cost.`,
    faqs: [
      { q: `Is Nudura ICF available in North Carolina?`, a: `Yes. Nudura's distribution network covers North Carolina, with supply for contractors in Charlotte, Raleigh, Wilmington, and surrounding areas.` },
      { q: `Does Nudura meet North Carolina's coastal building code?`, a: `Nudura ICF meets North Carolina Building Code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in North Carolina?`, a: `Cost depends on design, location, core width, and labor availability. Coastal projects with hurricane zone requirements may need wider cores and more engineering, which affects pricing. Connect with a local North Carolina contractor for an accurate quote.` },
      { q: `Is ICF worth it in North Carolina?`, a: `For most North Carolina homeowners, particularly those in coastal areas or with high cooling bills, yes. Storm resilience, energy savings in a hot-humid climate, and moisture resistance make ICF a strong long-term investment.` },
    ],
  },

  {
    name: 'Ohio',
    slug: 'ohio',
    heroIntro: `Ohio's cold winters, tornado risk, and large residential construction market make Nudura ICF a strong building system choice across the state. If you're building with insulated concrete forms in Ohio and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Ohio, residential projects most commonly use the 6" core. Wider cores are used for commercial applications and projects where additional structural performance is specified by the engineer.`,
    whyIntro: `Ohio's climate brings cold winters, real tornado risk, and hot summers, creating year-round demands on wall performance. Nudura ICF addresses each season's challenges effectively.`,
    reasons: [
      { title: 'Cold Climate Performance', text: `Ohio winters are cold and can be extended, particularly in the northern part of the state near Lake Erie. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Tornado Protection', text: `Ohio sees meaningful tornado activity each year, particularly in the western and central parts of the state. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind events and tornado conditions.` },
      { title: 'Year-Round Energy Savings', text: `Ohio has real heating costs in winter and real cooling costs in summer. Nudura's high R-value wall system reduces both, and ICF's thermal mass smooths out seasonal temperature swings. Many Ohio ICF homeowners see savings on both winter heating and summer cooling bills.` },
      { title: 'Ohio Market Distribution', text: `Nudura's distribution network covers Ohio, with supply available to contractors in Cleveland, Columbus, Cincinnati, and surrounding markets. Your contractor can confirm current distributor availability and lead times for your area.` },
    ],
    costLocationNote: `Ohio construction costs vary by region, with Cleveland, Columbus, and Cincinnati having the most competitive ICF labor markets. Rural Ohio projects may see higher costs due to fewer locally available experienced ICF crews.`,
    faqs: [
      { q: `Is Nudura ICF available in Ohio?`, a: `Yes. Nudura's distribution network covers Ohio, with supply for contractors in Cleveland, Columbus, Cincinnati, and surrounding markets.` },
      { q: `How does Nudura ICF perform in Ohio winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads compared to wood framing. Northern Ohio projects near Lake Erie, which see heavier lake effect snow, particularly benefit from ICF's cold-climate and moisture-resistance performance.` },
      { q: `What does Nudura ICF cost in Ohio?`, a: `Cost depends on your design, core width, location, and local labor. Columbus, Cleveland, and Cincinnati markets tend to have more competitive pricing. Connect with a local Ohio contractor for a project-specific estimate.` },
      { q: `Is ICF worth the investment in Ohio?`, a: `For most Ohio homeowners, yes. The combination of cold winter heating savings, tornado resilience, and long-term durability makes ICF a strong investment, particularly for new construction where the cost premium is easiest to absorb.` },
    ],
  },

  {
    name: 'Tennessee',
    slug: 'tennessee',
    heroIntro: `Tennessee's tornado risk, hot summers, and rapidly growing construction market make Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Tennessee and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor.`,
    aboutNote: `Core widths range from 4" through 12". In Tennessee, residential projects most commonly use the standard 6" core. Wider cores are specified by engineers for projects with higher structural demands or commercial applications.`,
    whyIntro: `Tennessee sits in a high tornado-risk zone and sees hot, humid summers statewide. Add a booming Nashville construction market and Nudura ICF becomes a strong fit for the state.`,
    reasons: [
      { title: 'Tornado Protection', text: `Tennessee sits in a high tornado-risk zone, with significant storm activity across the middle and western parts of the state. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction. Many Tennessee homeowners choose ICF specifically for storm resilience.` },
      { title: 'Hot-Humid Summer Performance', text: `Tennessee summers are long and humid. Nudura's R-22 to R-28 wall assembly reduces cooling loads significantly, and ICF's thermal mass helps stabilize interior temperatures during peak heat. Many Tennessee ICF homeowners report lower monthly energy bills compared to wood-frame homes.` },
      { title: 'Moisture and Humidity Resistance', text: `Tennessee's humidity creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't rot or support mold growth. This long-term durability advantage is meaningful in Tennessee's climate.` },
      { title: 'Nashville and Memphis Market Growth', text: `Tennessee is one of the faster-growing states in the South, with Nashville in particular experiencing a major construction boom. Nudura's distribution network keeps pace with state growth, and experienced ICF contractors operate throughout Tennessee.` },
    ],
    costLocationNote: `Labor rates and ICF contractor availability are strongest in the Nashville and Memphis metros. More rural areas of Tennessee may see higher project costs due to crew travel and fewer locally available experienced ICF builders.`,
    faqs: [
      { q: `Is Nudura ICF available in Tennessee?`, a: `Yes. Nudura's distribution network covers Tennessee, with supply for contractors in Nashville, Memphis, Knoxville, and Chattanooga markets.` },
      { q: `Is Nudura ICF good for tornado protection in Tennessee?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. While no wall system is tornado-proof, ICF has a strong track record in high-wind and storm events.` },
      { q: `What does Nudura ICF cost in Tennessee?`, a: `Cost depends on design, core width, location, and local labor. Nashville-area projects tend to have more competitive pricing due to greater contractor availability. Connect with a local Tennessee contractor for a project-specific quote.` },
      { q: `Is ICF worth it in Tennessee?`, a: `For most Tennessee homeowners, yes. The combination of tornado resilience, energy savings in a hot-humid climate, and moisture resistance makes ICF a strong long-term value compared to standard wood framing.` },
    ],
  },

  {
    name: 'Texas',
    slug: 'texas',
    heroIntro: `Texas has some of the strongest ICF demand in the country, driven by extreme heat, dual tornado and hurricane risk, and a massive construction market. If you're building with insulated concrete forms in Texas and your contractor uses Nudura, here's what you need to know about the system, performance in Texas conditions, and how to find a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Texas's Gulf Coast hurricane zones, engineers typically specify wider cores with heavier reinforcement. In tornado-prone areas of the Panhandle and central plains, your engineer will size the system for your specific location and wind exposure category.`,
    whyIntro: `Texas is one of the most demanding building environments in the country: extreme heat, dual storm risk from both tornadoes and hurricanes, and a massive, diverse construction market. Nudura ICF is built for it.`,
    reasons: [
      { title: 'Dual Storm Protection', text: `Texas faces tornado risk across the Panhandle and central plains, and hurricane risk along the Gulf Coast. ICF walls, including Nudura, provide meaningful protection against both storm types. Many Texas homeowners in high-risk areas choose ICF specifically for storm resilience.` },
      { title: 'Extreme Heat Energy Performance', text: `Texas summers are intense, with temperatures exceeding 100 degrees across much of the state for extended periods. Nudura's R-22 to R-28 wall assembly and ICF's thermal mass significantly reduce cooling loads. In Texas, where AC bills are a major household expense, ICF's energy savings add up quickly.` },
      { title: 'Texas Building Code Compliance', text: `Nudura meets Texas building code requirements across the state's multiple wind zones, including the Gulf Coast's high-velocity hurricane zone. Your structural engineer will specify the core width and rebar schedule appropriate for your specific location.` },
      { title: 'Wide Texas Distribution', text: `Nudura's national distribution network has strong coverage across Texas, including the Dallas-Fort Worth, Houston, San Antonio, and Austin metros. Nudura's DuraFold shipping system, which fits up to 40% more product per truck, helps keep freight costs competitive across Texas's large geography.` },
    ],
    costLocationNote: `Texas is a large and diverse market. Labor rates and contractor availability vary significantly between DFW, Houston, San Antonio, and rural areas. Gulf Coast projects with hurricane zone requirements may need wider cores and additional engineering, affecting total cost.`,
    faqs: [
      { q: `Is Nudura ICF available in Texas?`, a: `Yes. Nudura has strong distribution coverage across Texas, including the major metros of Dallas-Fort Worth, Houston, San Antonio, and Austin.` },
      { q: `Does Nudura ICF work for both tornado and hurricane protection in Texas?`, a: `Yes. Nudura's reinforced concrete wall system addresses both high-wind threats. In tornado-prone areas, the monolithic wall construction resists lateral forces. In hurricane zones, wider cores with heavier rebar provide the structural capacity engineers require for coastal builds.` },
      { q: `What does Nudura ICF cost in Texas?`, a: `Texas has one of the most diverse construction cost markets in the country. DFW and Austin tend to have competitive ICF labor. Gulf Coast projects vary. Design complexity, core width, and concrete pricing in your area are the main drivers. Connect with a local Texas contractor for an accurate quote.` },
      { q: `Is ICF worth it in Texas?`, a: `For most Texas homeowners, yes. The combination of storm resilience (tornado and hurricane), major energy savings in extreme heat, and long-term durability makes ICF a strong investment. In a state with both high storm risk and high energy costs, the premium pays back faster than in moderate climates.` },
    ],
  },

  {
    name: 'Virginia',
    slug: 'virginia',
    heroIntro: `Virginia's coastal hurricane and storm risk, mixed climate, and strong construction market make Nudura ICF a practical building system across the state. If you're building with insulated concrete forms in Virginia and your contractor uses Nudura, here's what you need to know about specs, performance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Virginia's coastal regions, wider cores with heavier reinforcement are often required to meet wind zone and storm load specifications. Inland and mountain projects commonly use the standard 6" core.`,
    whyIntro: `Virginia spans multiple climate zones, from the humid Tidewater region facing real hurricane exposure to the cooler mountains of the western part of the state. Nudura ICF is well-suited across this range for several reasons.`,
    reasons: [
      { title: 'Coastal Storm and Hurricane Protection', text: `Virginia's Hampton Roads area and Eastern Shore face real hurricane and nor'easter risk. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind and storm events. Coastal Virginia homeowners and engineers frequently specify ICF for storm-critical builds.` },
      { title: 'Energy Efficiency Across Climate Zones', text: `Virginia spans multiple climate zones, from the humid Tidewater to the cooler Shenandoah Valley. Nudura's R-22 to R-28 wall assembly performs well across this range, reducing both cooling loads in summer and heating loads in winter. ICF's thermal mass is particularly effective in climates with meaningful seasonal temperature variation.` },
      { title: 'Commercial and Military Market Strength', text: `Virginia has a large commercial and government construction market, particularly in Northern Virginia and the Hampton Roads area. Nudura's proven track record on large commercial and multi-family projects makes it a strong candidate for Virginia's diverse construction sector.` },
      { title: 'Virginia Distribution', text: `Nudura's distribution network covers Virginia, with supply available to contractors in Northern Virginia, Richmond, Hampton Roads, and the Shenandoah Valley. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Northern Virginia and the Hampton Roads area have high construction labor costs relative to the national average. Inland and rural Virginia markets tend to be more moderate. Coastal projects with wind zone requirements may need wider cores and additional engineering, which affects total cost.`,
    faqs: [
      { q: `Is Nudura ICF available in Virginia?`, a: `Yes. Nudura's distribution network covers Virginia, with supply for contractors in Northern Virginia, Richmond, Hampton Roads, and surrounding areas.` },
      { q: `Does Nudura meet Virginia's coastal building code?`, a: `Nudura ICF meets Virginia Building Code requirements including coastal high-wind zone standards. Your structural engineer will specify the core width and rebar schedule appropriate for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Virginia?`, a: `Northern Virginia and Hampton Roads have higher labor costs than inland markets. Core width, design complexity, and coastal engineering requirements all affect total cost. Connect with a local Virginia contractor for a project-specific estimate.` },
      { q: `Is ICF a good choice for Virginia homeowners?`, a: `Yes. Virginia's combination of coastal storm risk, energy costs across multiple climate zones, and strong long-term real estate market makes ICF a sound investment for most new construction projects.` },
    ],
  },

];

// ─── HTML GENERATOR ──────────────────────────────────────────────────────────
function generatePage(s) {
  // URL-encode state name for find-a-pro links
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
            <div class="spec-bar-item" role="listitem">
              <span class="spec-bar-value">R-22 to R-28</span>
              <span class="spec-bar-label">Wall assembly R-value</span>
            </div>
            <div class="spec-bar-item" role="listitem">
              <span class="spec-bar-value">6"</span>
              <span class="spec-bar-label">Most common core size</span>
            </div>
            <div class="spec-bar-item" role="listitem">
              <span class="spec-bar-value">18" x 96"</span>
              <span class="spec-bar-label">Standard block size</span>
            </div>
            <div class="spec-bar-item" role="listitem">
              <span class="spec-bar-value">5</span>
              <span class="spec-bar-label">Core width options</span>
            </div>
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
            ${s.reasons.map(r => `<div class="reason-card">
              <h3>${r.title}</h3>
              <p>${r.text}</p>
            </div>`).join('\n            ')}
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
            ${s.faqs.map(f => `<div class="faq-card">
              <h3>${f.q}</h3>
              <p>${f.a}</p>
            </div>`).join('\n            ')}
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
