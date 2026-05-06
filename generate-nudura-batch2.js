const fs = require('fs');
const path = require('path');

const states = [

  {
    name: 'Louisiana',
    slug: 'louisiana',
    heroIntro: `Louisiana's hurricane exposure, extreme humidity, and relentless summer heat make Nudura ICF one of the most practical wall systems in the state. If you're building with insulated concrete forms in Louisiana and your contractor uses Nudura, here's what you need to know about specs, performance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Louisiana's coastal and hurricane-exposed regions, engineers frequently specify wider cores with heavier rebar schedules to meet high-wind load requirements. Inland projects commonly use the standard 6" core.`,
    whyIntro: `Louisiana faces some of the most demanding building conditions in the country: direct hurricane exposure, extreme humidity, and summer heat that stretches most of the year. Nudura ICF is well-suited to handle all of it.`,
    reasons: [
      { title: 'Hurricane Zone Performance', text: `Louisiana sits squarely in the Gulf Coast hurricane zone. ICF walls, including Nudura, have a strong track record in high-wind events. The reinforced concrete core resists the lateral forces and debris impact that cause most storm damage, and many Louisiana homeowners rebuild in ICF after experiencing hurricane damage firsthand.` },
      { title: 'Extreme Humidity and Moisture Resistance', text: `Louisiana's climate is among the most humid in the country. Wood-frame homes face constant moisture pressure, rot risk, and mold exposure. ICF walls don't absorb moisture, don't rot, and don't support mold growth. Nudura's concrete and EPS foam system holds up in Louisiana's climate over the long term.` },
      { title: 'Energy Performance in Extreme Heat', text: `Louisiana summers are long, hot, and oppressive. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass stabilizes interior temperatures. Many Louisiana ICF homeowners see meaningful reductions in monthly AC costs compared to wood-frame construction.` },
      { title: 'Louisiana Distribution', text: `Nudura's national distribution network covers Louisiana, with supply available to contractors in the New Orleans, Baton Rouge, Shreveport, and Lafayette markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Labor rates and ICF contractor availability are strongest in the Baton Rouge and New Orleans metros. Coastal and rural Louisiana projects may see higher costs due to crew travel, logistics, and the additional engineering required for high-wind zones.`,
    faqs: [
      { q: `Is Nudura ICF available in Louisiana?`, a: `Yes. Nudura's distribution network covers Louisiana, with supply for contractors in New Orleans, Baton Rouge, Shreveport, and Lafayette. Your contractor should confirm current availability and lead times.` },
      { q: `Does Nudura ICF meet Louisiana's coastal building code?`, a: `Nudura ICF meets Louisiana building code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Louisiana?`, a: `Cost depends on design, core width, location, and labor availability. Coastal projects with hurricane zone requirements may need wider cores and more engineering, which affects total cost. Connect with a local Louisiana contractor for an accurate quote.` },
      { q: `Is ICF worth it in Louisiana?`, a: `For most Louisiana homeowners, yes. Between hurricane resilience, resistance to the state's extreme humidity, and meaningful energy savings on year-round cooling, ICF's upfront premium pays back faster in Louisiana than in moderate climates.` },
    ],
  },

  {
    name: 'South Carolina',
    slug: 'south-carolina',
    heroIntro: `South Carolina's hurricane coastline, hot and humid summers, and growing construction market make Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in South Carolina and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In South Carolina's coastal and low-country regions, engineers often specify wider cores to meet high-wind zone load requirements. Upstate and inland projects typically use the standard 6" core.`,
    whyIntro: `South Carolina's Lowcountry and Grand Strand coastline face direct hurricane exposure, while the entire state deals with hot, humid summers. Nudura ICF addresses both challenges in a single wall system.`,
    reasons: [
      { title: 'Hurricane and Coastal Storm Protection', text: `South Carolina's coastline, from Myrtle Beach to Hilton Head, sees regular hurricane and tropical storm activity. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind events. Coastal South Carolina contractors increasingly specify ICF for new construction in storm-exposed areas.` },
      { title: 'Hot-Humid Climate Performance', text: `South Carolina summers are long, hot, and humid across the entire state. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass helps maintain comfortable interior temperatures even during peak summer heat.` },
      { title: 'Moisture and Mold Resistance', text: `South Carolina's humidity creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration, don't rot, and don't support mold growth. This is a meaningful durability advantage in South Carolina's climate over the long term.` },
      { title: 'Growing South Carolina Market', text: `South Carolina is one of the faster-growing states in the Southeast, with strong construction activity in the Charleston, Greenville, Columbia, and Myrtle Beach markets. Nudura's distribution network keeps pace with this growth and experienced ICF contractors are active across the state.` },
    ],
    costLocationNote: `Labor rates and ICF contractor availability are strongest in the Charleston and Greenville markets. Coastal projects with hurricane zone engineering requirements may see higher costs due to wider core specifications and additional structural design work.`,
    faqs: [
      { q: `Is Nudura ICF available in South Carolina?`, a: `Yes. Nudura's distribution network covers South Carolina, with supply for contractors in Charleston, Columbia, Greenville, and the Grand Strand area.` },
      { q: `Does Nudura meet South Carolina's coastal building code?`, a: `Nudura ICF meets South Carolina building code requirements including coastal wind zone standards. Your structural engineer will specify the core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in South Carolina?`, a: `Cost depends on design, core width, and location. Coastal projects with hurricane zone requirements may need wider cores and additional engineering. Connect with a local South Carolina contractor for an accurate quote.` },
      { q: `Is ICF worth it in South Carolina?`, a: `For most South Carolina homeowners, particularly those near the coast or with high cooling bills, yes. Storm resilience, energy savings in a hot-humid climate, and moisture resistance make ICF a strong long-term investment.` },
    ],
  },

  {
    name: 'New York',
    slug: 'new-york',
    heroIntro: `New York's cold winters, coastal storm exposure, and large commercial construction market make Nudura ICF a strong building system across the state. If you're building with insulated concrete forms in New York and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In New York, residential projects most commonly use the 6" core. Commercial and multi-family projects frequently specify wider cores for structural performance and additional insulation value, particularly in the state's colder northern climate zones.`,
    whyIntro: `New York's climate demands vary widely: coastal storm exposure on Long Island, extreme cold in the north, and one of the country's largest commercial construction markets in the city. Nudura ICF performs well across all of it.`,
    reasons: [
      { title: 'Cold Climate Insulation', text: `New York winters are cold across most of the state, with northern regions seeing some of the harshest conditions in the Northeast. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Coastal and Storm Resilience', text: `Long Island, New York City, and coastal communities face hurricane, nor'easter, and major storm exposure. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm surge events. Post-Sandy ICF rebuilds in the New York area demonstrated the system's resilience firsthand.` },
      { title: 'Commercial and Multi-Family Applications', text: `New York has one of the most active commercial and multi-family construction markets in the country. Nudura's proven performance on large commercial and multi-family projects, combined with its wide distribution network, makes it a practical choice for New York's diverse construction sector.` },
      { title: 'New York Distribution', text: `Nudura's distribution network covers New York State, with supply available to contractors in New York City, Long Island, the Hudson Valley, Albany, Buffalo, and Syracuse markets. Your contractor should confirm availability and lead times for your specific area.` },
    ],
    costLocationNote: `New York City and Long Island have some of the highest construction labor costs in the country. Upstate New York markets are significantly more moderate. Core width, design complexity, and local labor rates are the primary cost drivers across the state.`,
    faqs: [
      { q: `Is Nudura ICF available in New York?`, a: `Yes. Nudura's distribution network covers New York, with supply for contractors in New York City, Long Island, Albany, Buffalo, and surrounding areas.` },
      { q: `How does Nudura ICF perform in New York winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads in New York's cold climate. Northern New York projects, which see some of the harshest winter conditions in the Northeast, particularly benefit from ICF's cold-climate performance.` },
      { q: `What does Nudura ICF cost in New York?`, a: `New York City and Long Island labor costs are among the highest in the country. Upstate New York is considerably more affordable. Core width, design complexity, and location within the state are the key cost variables. Connect with a local contractor for a project-specific estimate.` },
      { q: `Is Nudura ICF used for commercial projects in New York?`, a: `Yes. Nudura has a strong track record on commercial and multi-family projects, and is used in New York's active commercial construction market. Its multiple core width options (up to 12") give engineers flexibility for large-scale structural applications.` },
    ],
  },

  {
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    heroIntro: `Pennsylvania's cold winters, large residential and commercial construction market, and varied climate make Nudura ICF a strong building system across the state. If you're building with insulated concrete forms in Pennsylvania and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Pennsylvania, residential projects most commonly use the 6" core. Commercial projects and builds in colder northern parts of the state often specify wider cores for additional insulation and structural performance.`,
    whyIntro: `Pennsylvania spans a range of climate exposures, from the cold northern tier to the milder southeast. The state's large construction market and real heating demands make Nudura ICF a practical choice for many builders.`,
    reasons: [
      { title: 'Cold Climate Performance', text: `Pennsylvania winters are cold, particularly in the northern and western parts of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction. Many Pennsylvania ICF homeowners see meaningful savings on winter heating bills.` },
      { title: 'Year-Round Energy Efficiency', text: `Pennsylvania has both cold winters and hot, humid summers, which means HVAC runs hard in both seasons. Nudura's high R-value wall assembly reduces both heating and cooling loads, and ICF's thermal mass smooths out seasonal temperature transitions. Energy savings compound year-round.` },
      { title: 'Strong Commercial Market', text: `Pennsylvania has a large and active commercial construction market, particularly in Philadelphia and Pittsburgh. Nudura's proven performance on commercial and multi-family projects, combined with its wide core width range, makes it a practical choice for Pennsylvania's diverse construction sector.` },
      { title: 'Pennsylvania Distribution', text: `Nudura's distribution network covers Pennsylvania, with supply available to contractors in Philadelphia, Pittsburgh, Harrisburg, Allentown, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific location.` },
    ],
    costLocationNote: `Philadelphia and Pittsburgh have higher labor costs than more rural parts of the state. Core width, design complexity, and local concrete pricing are the main project-level cost drivers across Pennsylvania.`,
    faqs: [
      { q: `Is Nudura ICF available in Pennsylvania?`, a: `Yes. Nudura's distribution network covers Pennsylvania, with supply for contractors in Philadelphia, Pittsburgh, Harrisburg, Allentown, and surrounding markets.` },
      { q: `How does Nudura ICF perform in Pennsylvania winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads in Pennsylvania's cold winters. Northern Pennsylvania, which sees more severe winter conditions, particularly benefits from ICF's cold-climate performance.` },
      { q: `What does Nudura ICF cost in Pennsylvania?`, a: `Cost depends on your design, core width, location, and local labor. Philadelphia and Pittsburgh markets have higher labor rates than rural areas. Connect with a local Pennsylvania contractor for a project-specific estimate.` },
      { q: `Is ICF a good investment for Pennsylvania homeowners?`, a: `Yes. Pennsylvania's cold winters and warm summers mean HVAC runs hard year-round. The energy savings from Nudura's high R-value wall system, combined with long-term durability, make ICF a sound investment for most new construction projects.` },
    ],
  },

  {
    name: 'Washington',
    slug: 'washington',
    heroIntro: `Washington state's seismic activity, wet Pacific Northwest climate, and strong energy code requirements make Nudura ICF a well-suited building system for the state. If you're building with insulated concrete forms in Washington and your contractor uses Nudura, here's what you need to know about specs, performance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". Washington's seismic zone requirements often drive engineers toward wider cores with heavier reinforcement, particularly in the Puget Sound region and areas near active fault lines.`,
    whyIntro: `Washington faces a unique combination of seismic risk, year-round moisture from Pacific weather systems, and strict energy codes. Nudura ICF is well-equipped for Washington's specific building demands.`,
    reasons: [
      { title: 'Seismic Performance', text: `Washington sits on the Cascadia Subduction Zone, one of the most seismically active fault systems in North America. ICF's reinforced concrete wall system handles seismic lateral loads better than wood framing. Nudura's range of core widths (4" through 12") gives structural engineers flexibility to meet Washington's seismic design requirements.` },
      { title: 'Pacific Northwest Moisture Resistance', text: `Western Washington sees significant rainfall and sustained moisture exposure year-round. ICF walls resist moisture infiltration and don't rot or support mold growth the way wood framing can under sustained wet conditions. This is a meaningful long-term durability advantage in the Pacific Northwest.` },
      { title: 'Washington Energy Code Compliance', text: `Washington State has one of the more demanding residential energy codes in the country. Nudura's R-22 to R-28 wall assembly helps meet and exceed Washington's thermal envelope requirements, and ICF's continuous insulation with no thermal bridging performs well under energy code compliance pathways.` },
      { title: 'Pacific Northwest Distribution', text: `Nudura's distribution network covers Washington, with supply available to contractors in the Seattle, Tacoma, Spokane, and Bellevue markets. Your contractor should confirm current distributor availability and lead times for your specific project location.` },
    ],
    costLocationNote: `Seattle and the greater Puget Sound area have high construction labor costs relative to most of the country. Eastern Washington markets are more moderate. Seismic engineering requirements can add to total project cost depending on your location and risk category.`,
    faqs: [
      { q: `Is Nudura ICF available in Washington state?`, a: `Yes. Nudura's distribution network covers Washington, with supply for contractors in Seattle, Tacoma, Spokane, and surrounding markets.` },
      { q: `Is Nudura ICF good for Washington's earthquake risk?`, a: `Yes. ICF's reinforced concrete wall system performs well under seismic loads. Nudura's range of core widths (4" through 12") gives structural engineers flexibility to meet Washington's seismic design requirements for your specific location and risk category.` },
      { q: `Does Nudura meet Washington State's energy code?`, a: `Nudura's R-22 to R-28 wall assembly helps meet and often exceed Washington's residential energy code requirements. Your designer and energy consultant will confirm compliance for your specific project and climate zone.` },
      { q: `What does Nudura ICF cost in Washington?`, a: `Seattle and Puget Sound labor costs are among the higher markets in the country. Eastern Washington tends to be more moderate. Seismic engineering requirements may also affect total cost depending on your location. Connect with a local Washington contractor for an accurate estimate.` },
    ],
  },

  {
    name: 'Minnesota',
    slug: 'minnesota',
    heroIntro: `Minnesota's extreme winters, lake country moisture, and high heating costs make Nudura ICF one of the strongest performing wall systems in the state. If you're building with insulated concrete forms in Minnesota and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Minnesota's cold climate zones, wider cores are frequently specified to maximize thermal performance and meet the state's energy code requirements. Nudura's 5 core width options give engineers flexibility to hit specific energy targets.`,
    whyIntro: `Minnesota has some of the coldest winters in the continental US, with extended heating seasons and significant moisture from the Great Lakes region. Nudura ICF is exceptionally well-suited to Minnesota's climate demands.`,
    reasons: [
      { title: 'Extreme Cold Weather Performance', text: `Minnesota winters are long and among the coldest in the continental US, with temperatures regularly dropping well below zero. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads low even in Minnesota's most severe winter conditions.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `Minnesota homeowners face some of the highest heating costs in the country. Nudura's high R-value wall system significantly reduces heating load compared to wood frame construction. In a heating-dominant climate like Minnesota's, the payback on ICF's upfront premium comes faster than in milder states.` },
      { title: 'Moisture and Freeze-Thaw Durability', text: `Minnesota's freeze-thaw cycles are hard on building materials. ICF walls resist moisture infiltration and handle freeze-thaw cycles better than wood framing. Nudura's concrete core and EPS foam system maintain structural integrity through Minnesota's demanding seasonal transitions.` },
      { title: 'Minnesota Distribution', text: `Nudura's distribution network covers Minnesota, with supply available to contractors in the Minneapolis-Saint Paul metro, Duluth, Rochester, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project.` },
    ],
    costLocationNote: `The Minneapolis-Saint Paul metro has the most experienced ICF labor market in the state. Greater Minnesota and rural areas may see higher costs due to crew travel. Wider cores are often specified in Minnesota's coldest climate zones, which affects both block and concrete costs.`,
    faqs: [
      { q: `Is Nudura ICF available in Minnesota?`, a: `Yes. Nudura's distribution network covers Minnesota, with supply for contractors in the Twin Cities, Duluth, Rochester, and surrounding markets.` },
      { q: `How does Nudura ICF perform in Minnesota winters?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are specifically suited to Minnesota's extreme cold. ICF consistently outperforms wood framing in cold-climate heating performance, and many Minnesota ICF homeowners see meaningful energy savings year over year.` },
      { q: `What does Nudura ICF cost in Minnesota?`, a: `Cost depends on your design, core width, location, and local labor. The Twin Cities market has the most competitive ICF pricing. Greater Minnesota projects may see higher costs due to fewer local crews. Connect with a Minnesota contractor for a project-specific estimate.` },
      { q: `Is ICF worth the investment in Minnesota?`, a: `Absolutely. Minnesota's extreme winters mean ICF's energy savings add up faster than almost anywhere else in the country. The combination of heating cost reduction, long-term durability in freeze-thaw conditions, and storm resilience makes ICF a strong investment for Minnesota homeowners.` },
    ],
  },

  {
    name: 'Missouri',
    slug: 'missouri',
    heroIntro: `Missouri sits at the intersection of Tornado Alley and a mixed climate that brings cold winters and hot summers, making Nudura ICF a practical wall system choice across the state. If you're building with insulated concrete forms in Missouri and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In Missouri, residential projects most commonly use the standard 6" core. Wider cores are used for commercial applications and projects where engineers specify additional structural or insulation performance.`,
    whyIntro: `Missouri's location brings real tornado risk, cold winters, and hot summers, demanding a wall system that performs year-round. Nudura ICF handles Missouri's mixed climate well.`,
    reasons: [
      { title: 'Tornado Protection', text: `Missouri sees significant tornado activity each year, particularly in the southern and western parts of the state. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind and tornado conditions. The reinforced concrete core resists the lateral forces that cause most storm damage.` },
      { title: 'Year-Round Energy Performance', text: `Missouri has both cold winters and hot, humid summers, meaning HVAC runs hard in both seasons. Nudura's R-22 to R-28 wall assembly reduces both heating and cooling loads, and ICF's thermal mass smooths out seasonal temperature swings. Many Missouri ICF homeowners see savings year-round.` },
      { title: 'Moisture Resistance in a Humid Climate', text: `Missouri's humidity, particularly in the summer months, creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth. This is a meaningful durability advantage over the life of a Missouri home.` },
      { title: 'Kansas City and St. Louis Distribution', text: `Nudura's distribution network covers Missouri, with supply available to contractors in Kansas City, St. Louis, Springfield, and surrounding markets. Your contractor can confirm current distributor availability and lead times for your specific area.` },
    ],
    costLocationNote: `Kansas City and St. Louis have the most experienced ICF contractor markets in the state and tend to have competitive pricing. Rural and southern Missouri projects may see higher costs due to fewer locally available ICF crews.`,
    faqs: [
      { q: `Is Nudura ICF available in Missouri?`, a: `Yes. Nudura's distribution network covers Missouri, with supply for contractors in Kansas City, St. Louis, Springfield, and surrounding markets.` },
      { q: `Is Nudura ICF a good choice for tornado protection in Missouri?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. While no wall system is tornado-proof, ICF has a strong track record in high-wind and storm events across Tornado Alley.` },
      { q: `What does Nudura ICF cost in Missouri?`, a: `Cost depends on your design, core width, location, and local labor. Kansas City and St. Louis markets tend to have more competitive ICF pricing than rural areas. Connect with a local Missouri contractor for an accurate estimate.` },
      { q: `Is ICF worth it in Missouri?`, a: `For most Missouri homeowners, yes. The combination of tornado resilience, year-round energy savings in a mixed climate, and long-term durability makes ICF a strong long-term investment compared to standard wood framing.` },
    ],
  },

  {
    name: 'Oklahoma',
    slug: 'oklahoma',
    heroIntro: `Oklahoma sits at the heart of Tornado Alley and sees extreme weather year-round, making Nudura ICF one of the most practical wall systems in the state. If you're building with insulated concrete forms in Oklahoma and your contractor uses Nudura, here's what you need to know about storm performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Oklahoma's high wind and tornado zones, engineers may specify wider cores with heavier rebar for additional structural performance. The standard 6" core is most common for residential builds.`,
    whyIntro: `Oklahoma is one of the most tornado-active states in the country, with extreme heat in summer and cold winters added to the mix. Nudura ICF is purpose-built for Oklahoma's demanding conditions.`,
    reasons: [
      { title: 'Tornado Alley Storm Protection', text: `Oklahoma consistently ranks among the most tornado-active states in the US. ICF walls, including Nudura, provide meaningful protection compared to wood framing in tornado conditions. The reinforced concrete core resists the extreme lateral forces and projectile debris that cause catastrophic damage in tornado events. Many Oklahoma homeowners choose ICF specifically after experiencing storm damage.` },
      { title: 'Extreme Heat Energy Performance', text: `Oklahoma summers are hot and extended, with temperatures regularly exceeding 100 degrees in the western and central parts of the state. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and ICF's thermal mass helps keep interior temperatures stable during peak heat.` },
      { title: 'Cold Winter Performance', text: `Oklahoma winters, while shorter than in northern states, can be sharp and cold. Nudura's continuous insulation and R-22 to R-28 wall assembly reduce heating loads effectively, giving Oklahoma homeowners year-round energy savings on both cooling and heating.` },
      { title: 'Oklahoma Distribution', text: `Nudura's distribution network covers Oklahoma, with supply available to contractors in Oklahoma City, Tulsa, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific area and project.` },
    ],
    costLocationNote: `Oklahoma City and Tulsa have the most experienced ICF contractor markets in the state. Rural Oklahoma projects may see higher costs due to fewer locally available experienced crews and travel costs.`,
    faqs: [
      { q: `Is Nudura ICF available in Oklahoma?`, a: `Yes. Nudura's distribution network covers Oklahoma, with supply for contractors in Oklahoma City, Tulsa, and surrounding markets.` },
      { q: `Is Nudura ICF good protection against Oklahoma tornadoes?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. While no structure is tornado-proof, ICF has a well-documented track record of outperforming wood-frame construction in severe storm events across Tornado Alley.` },
      { q: `What does Nudura ICF cost in Oklahoma?`, a: `Cost depends on your design, core width, location, and local labor. Oklahoma City and Tulsa markets have more competitive ICF pricing. Connect with a local Oklahoma contractor for an accurate project-specific quote.` },
      { q: `Is ICF worth the investment in Oklahoma?`, a: `For most Oklahoma homeowners, absolutely. The combination of tornado resilience, major energy savings in extreme summer heat, and year-round durability makes ICF a strong investment in one of the country's most weather-demanding states.` },
    ],
  },

  {
    name: 'New Jersey',
    slug: 'new-jersey',
    heroIntro: `New Jersey's coastal storm exposure, cold winters, and one of the country's most active construction markets make Nudura ICF a strong building system choice across the state. If you're building with insulated concrete forms in New Jersey and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". In New Jersey's coastal zones, engineers frequently specify wider cores to meet high-wind load requirements. Inland residential projects commonly use the standard 6" core, while commercial and multi-family projects often specify wider options.`,
    whyIntro: `New Jersey's combination of coastal storm risk, cold winters, hot summers, and dense construction market creates demand for high-performance wall systems. Nudura ICF delivers on every front.`,
    reasons: [
      { title: 'Coastal and Nor\'easter Protection', text: `New Jersey's coastline faces regular hurricane, tropical storm, and nor'easter exposure. Post-Sandy rebuilding efforts along the Jersey Shore brought ICF construction mainstream for many homeowners and contractors. Nudura's reinforced concrete wall system provides meaningful protection in high-wind and storm surge events.` },
      { title: 'Cold Winter Performance', text: `New Jersey winters are cold, particularly in the northern and central parts of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Hot Summer Energy Savings', text: `New Jersey summers are hot and humid. Nudura's high R-value wall assembly reduces cooling loads, and ICF's thermal mass helps stabilize interior temperatures during peak summer heat. Many New Jersey ICF homeowners see savings on both heating and cooling bills year-round.` },
      { title: 'New Jersey Distribution', text: `Nudura's distribution network covers New Jersey, with supply available to contractors in the northern New Jersey, Shore area, and statewide markets. Your contractor should confirm current availability and lead times for your specific project.` },
    ],
    costLocationNote: `New Jersey has high construction labor costs relative to the national average, particularly in the northern part of the state near New York City. Shore area projects with coastal engineering requirements may see additional costs for wider cores and wind zone compliance.`,
    faqs: [
      { q: `Is Nudura ICF available in New Jersey?`, a: `Yes. Nudura's distribution network covers New Jersey, with supply for contractors across the state including the Shore area, northern New Jersey, and the Delaware Valley region.` },
      { q: `Is Nudura ICF used for coastal rebuilding in New Jersey?`, a: `Yes. Post-Sandy, ICF construction became much more common along the Jersey Shore as homeowners and contractors recognized the performance advantages in storm-exposed locations. Nudura is one of the most widely available ICF brands for Shore-area projects.` },
      { q: `What does Nudura ICF cost in New Jersey?`, a: `New Jersey has high labor costs, particularly near New York City. Coastal projects with wind zone requirements may also need wider cores and additional engineering. Connect with a local New Jersey contractor for a project-specific estimate.` },
      { q: `Is ICF worth it for a New Jersey home?`, a: `For most New Jersey homeowners, yes. Coastal storm resilience, year-round energy savings, and long-term durability make ICF a strong investment, particularly given the state's high energy costs and storm exposure.` },
    ],
  },

  {
    name: 'Nevada',
    slug: 'nevada',
    heroIntro: `Nevada's extreme desert heat, dramatic day-to-night temperature swings, and rapidly growing construction market make Nudura ICF one of the most effective wall systems in the state. If you're building with insulated concrete forms in Nevada and your contractor uses Nudura, here's what you need to know about desert performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Nevada's climate, the standard 6" core is most common for residential projects. Wider cores are used for commercial applications and builds where additional structural performance is required.`,
    whyIntro: `Nevada's desert climate creates unique and demanding conditions for buildings: extreme summer heat, sharp overnight temperature drops, and intense UV exposure. Nudura ICF handles all of it effectively.`,
    reasons: [
      { title: 'Extreme Heat and Desert Performance', text: `Las Vegas regularly exceeds 115 degrees in summer, and much of Nevada sees similarly intense heat. Nudura's R-22 to R-28 wall assembly and ICF's thermal mass work together to dramatically reduce cooling loads. The concrete core absorbs daytime heat and releases it slowly overnight, keeping interiors more stable with less AC.` },
      { title: 'Thermal Mass for Desert Temperature Swings', text: `Nevada's desert climate brings dramatic swings between daytime highs and overnight lows, sometimes 40 degrees or more in a single day. ICF's thermal mass is especially effective in these conditions, absorbing and buffering temperature changes in ways that wood frame walls simply cannot match.` },
      { title: 'Durability in Desert Conditions', text: `Nevada's UV intensity, heat cycles, and dry climate put stress on building materials. ICF walls don't dry-rot, warp, or degrade under desert conditions. Nudura's EPS foam and concrete core handle extreme conditions without the structural degradation that affects wood-frame construction over time.` },
      { title: 'Las Vegas and Reno Distribution', text: `Nudura's distribution network covers Nevada, with supply available to contractors in the Las Vegas metro and Reno-Tahoe area. Your contractor should confirm current distributor availability and lead times for your specific project location.` },
    ],
    costLocationNote: `Las Vegas has a large and active construction market with competitive ICF labor availability. Reno and northern Nevada markets are smaller but growing. Rural Nevada projects may see higher costs due to crew travel and freight logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Nevada?`, a: `Yes. Nudura's distribution network covers Nevada, with supply for contractors in the Las Vegas metro and Reno-Tahoe markets.` },
      { q: `How does Nudura ICF perform in Nevada's extreme heat?`, a: `Very well. Nudura's R-22 to R-28 wall assembly and ICF's thermal mass are specifically well-suited to desert climates. The system significantly reduces cooling loads and handles Nevada's intense heat cycles and UV exposure without degrading over time.` },
      { q: `What does Nudura ICF cost in Nevada?`, a: `Cost depends on your design, core width, location, and local labor. Las Vegas tends to have competitive ICF pricing due to the active construction market. Connect with a local Nevada contractor for an accurate project-specific quote.` },
      { q: `Is ICF worth it in Nevada?`, a: `For Nevada homeowners, yes. The energy savings in Nevada's extreme heat climate are among the most significant in the country, and the payback on ICF's upfront premium is faster in high-cooling-cost environments like Las Vegas than in moderate climates.` },
    ],
  },

  {
    name: 'Indiana',
    slug: 'indiana',
    heroIntro: `Indiana's cold winters, tornado risk, and large residential construction market make Nudura ICF a practical building system choice across the state. If you're building with insulated concrete forms in Indiana and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Indiana, residential projects most commonly use the 6" core. Wider cores are specified for commercial applications and projects where additional structural or insulation performance is required.`,
    whyIntro: `Indiana's climate brings cold winters, real tornado risk, and hot and humid summers, demanding a wall system that performs across all three. Nudura ICF delivers year-round.`,
    reasons: [
      { title: 'Cold Climate Performance', text: `Indiana winters are cold, particularly in the northern part of the state near Lake Michigan, where lake effect snow adds moisture and intensity. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Tornado Protection', text: `Indiana sees meaningful tornado activity each year, particularly in the southern and central parts of the state. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind and tornado conditions. The reinforced concrete core resists the lateral forces that cause most storm damage.` },
      { title: 'Year-Round Energy Savings', text: `Indiana's climate means heating in winter and cooling in summer, both significant expenses. Nudura's high R-value wall system reduces both loads, and ICF's thermal mass smooths out seasonal temperature transitions. Many Indiana ICF homeowners see savings on both summer and winter utility bills.` },
      { title: 'Indiana Distribution', text: `Nudura's distribution network covers Indiana, with supply available to contractors in Indianapolis, Fort Wayne, South Bend, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Indianapolis has the most experienced ICF contractor market in the state. Northern Indiana near the Chicago metro also benefits from strong contractor availability. Rural Indiana projects may see higher costs due to fewer locally available experienced ICF crews.`,
    faqs: [
      { q: `Is Nudura ICF available in Indiana?`, a: `Yes. Nudura's distribution network covers Indiana, with supply for contractors in Indianapolis, Fort Wayne, South Bend, and surrounding markets.` },
      { q: `How does Nudura ICF perform in Indiana winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads compared to wood framing. Northern Indiana, which sees lake effect snow and harsher winter conditions, particularly benefits from ICF's cold-climate performance.` },
      { q: `What does Nudura ICF cost in Indiana?`, a: `Cost depends on your design, core width, location, and local labor. Indianapolis and the Chicago-area corridor tend to have more competitive ICF pricing. Connect with a local Indiana contractor for a project-specific estimate.` },
      { q: `Is ICF a good investment in Indiana?`, a: `For most Indiana homeowners, yes. The combination of cold winter heating savings, tornado resilience, and long-term durability makes ICF a solid investment for new construction across the state.` },
    ],
  },

  {
    name: 'Kentucky',
    slug: 'kentucky',
    heroIntro: `Kentucky's tornado risk, hot and humid summers, and growing construction market make Nudura ICF a practical wall system choice across the state. If you're building with insulated concrete forms in Kentucky and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Kentucky, residential projects most commonly use the standard 6" core. Wider cores are specified for commercial applications and builds where additional structural performance is required by the engineer.`,
    whyIntro: `Kentucky sits in a tornado-active zone and deals with hot, humid summers statewide. Add a growing residential market and Nudura ICF becomes a strong fit for homeowners across the state.`,
    reasons: [
      { title: 'Tornado Protection', text: `Kentucky sees meaningful tornado activity each year, with western Kentucky in particular experiencing significant storm events. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction in high-wind and tornado conditions. Many Kentucky homeowners choose ICF after experiencing storm damage.` },
      { title: 'Hot-Humid Summer Performance', text: `Kentucky summers are hot and humid. Nudura's R-22 to R-28 wall assembly reduces cooling loads significantly, and ICF's thermal mass helps stabilize interior temperatures during peak heat. Many Kentucky ICF homeowners report meaningful reductions in monthly energy bills.` },
      { title: 'Moisture and Humidity Resistance', text: `Kentucky's humidity creates ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth the way wood framing can. This is a meaningful long-term durability advantage in Kentucky's climate.` },
      { title: 'Kentucky Distribution', text: `Nudura's distribution network covers Kentucky, with supply available to contractors in Louisville, Lexington, Bowling Green, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Louisville and Lexington have the most experienced ICF contractor markets in Kentucky. Western and rural Kentucky may see higher project costs due to fewer locally available ICF crews and crew travel requirements.`,
    faqs: [
      { q: `Is Nudura ICF available in Kentucky?`, a: `Yes. Nudura's distribution network covers Kentucky, with supply for contractors in Louisville, Lexington, Bowling Green, and surrounding markets.` },
      { q: `Is Nudura ICF good for tornado protection in Kentucky?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado conditions. While no wall system is tornado-proof, ICF has a strong track record in high-wind events across the region.` },
      { q: `What does Nudura ICF cost in Kentucky?`, a: `Cost depends on your design, core width, location, and local labor availability. Louisville and Lexington markets tend to have more competitive ICF pricing. Connect with a local Kentucky contractor for a project-specific quote.` },
      { q: `Is ICF worth it in Kentucky?`, a: `For most Kentucky homeowners, yes. Tornado resilience, energy savings in a hot-humid climate, and long-term moisture resistance make ICF a strong long-term value compared to standard wood frame construction.` },
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
