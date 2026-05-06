const fs = require('fs');
const path = require('path');

const states = [

  {
    name: 'Alaska',
    slug: 'alaska',
    heroIntro: `Alaska's extreme cold, high energy costs, and remote construction conditions make Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Alaska and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Alaska's coldest climate zones, wider cores are frequently specified to maximize thermal performance and minimize heating costs. Nudura's 5 core width options give engineers the flexibility to meet Alaska's demanding energy requirements across the state's varied regions.`,
    whyIntro: `Alaska presents some of the most extreme building conditions on the continent: prolonged deep cold, high energy costs, and remote logistics. Nudura ICF is purpose-built for exactly these demands.`,
    reasons: [
      { title: 'Extreme Cold Climate Performance', text: `Alaska winters are among the most severe on the planet. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads as low as possible even in Alaska's most extreme conditions. ICF consistently outperforms wood framing in cold-climate heating performance.` },
      { title: 'Energy Savings Where They Matter Most', text: `Alaska homeowners face some of the highest energy costs in the country, combined with one of the longest heating seasons. Nudura's high R-value wall system significantly reduces heating demand, and in remote communities where fuel costs are exceptionally high, the payback on ICF's upfront premium can be faster than almost anywhere else.` },
      { title: 'Structural Durability in Harsh Conditions', text: `Alaska's freeze-thaw cycles, permafrost challenges, snowpack, and moisture exposure put real stress on building materials. ICF walls handle these conditions better than wood framing, resist moisture infiltration, and maintain structural integrity through Alaska's demanding seasonal extremes.` },
      { title: 'Alaska Distribution', text: `Nudura's distribution network reaches Alaska's major markets, including Anchorage, Fairbanks, and the Kenai Peninsula. Freight logistics and lead times vary significantly by location across Alaska, so your contractor should confirm availability and costs for your specific project area well in advance.` },
    ],
    costLocationNote: `Alaska has some of the highest construction costs in the country due to remote logistics, freight costs, and limited contractor availability. Anchorage has the most active construction market. Rural and bush Alaska projects require significant advance planning for materials and crew.`,
    faqs: [
      { q: `Is Nudura ICF available in Alaska?`, a: `Nudura's distribution network reaches Alaska's major markets including Anchorage and Fairbanks. Freight logistics and lead times vary significantly by location, so confirm specifics with your contractor well in advance of your project start date.` },
      { q: `How does Nudura ICF perform in Alaska's extreme cold?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are among the most effective wall systems available for Alaska's extreme climate. ICF significantly outperforms wood framing in cold-climate heating performance.` },
      { q: `What does Nudura ICF cost in Alaska?`, a: `Alaska has some of the highest construction costs in the country due to freight, logistics, and limited labor availability. ICF's energy savings are also among the highest in Alaska given the state's extreme heating demands and energy costs. Connect with a local Alaska contractor for realistic project-specific pricing.` },
      { q: `Is ICF worth it in Alaska?`, a: `For Alaska homeowners, ICF is one of the strongest investments available. The combination of extreme cold, high energy costs, and long heating seasons means the payback on ICF's energy savings happens faster in Alaska than almost anywhere else in the country.` },
    ],
  },

  {
    name: 'Connecticut',
    slug: 'connecticut',
    heroIntro: `Connecticut's cold winters, nor'easter exposure, and strict energy code make Nudura ICF one of the most effective building systems in the state. If you're building with insulated concrete forms in Connecticut and your contractor uses Nudura, here's what you need to know about cold-climate performance, code compliance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Connecticut, residential projects commonly use the 6" core. Commercial and multi-family projects frequently specify wider cores for additional structural performance, and coastal projects may require wider cores for wind zone compliance.`,
    whyIntro: `Connecticut brings cold winters, meaningful coastal storm exposure, and one of the stricter residential energy codes in the Northeast. Nudura ICF performs well across all of Connecticut's building demands.`,
    reasons: [
      { title: 'Cold Winter Performance', text: `Connecticut winters are cold, with heating season running from October through April. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads compared to wood frame construction. Many Connecticut ICF homeowners see meaningful savings on winter energy costs.` },
      { title: 'Nor\'easter and Coastal Storm Protection', text: `Connecticut's Long Island Sound coastline faces regular nor'easter and hurricane exposure. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events compared to wood framing. Coastal Connecticut contractors increasingly specify ICF for new construction in storm-exposed areas.` },
      { title: 'Connecticut Energy Code Compliance', text: `Connecticut follows a demanding residential energy code. Nudura's R-22 to R-28 wall assembly helps meet and often exceed Connecticut's thermal envelope requirements, and ICF's continuous insulation with no thermal bridging performs well under the state's compliance pathways.` },
      { title: 'Connecticut Distribution', text: `Nudura's distribution network covers Connecticut, with supply available to contractors in Hartford, New Haven, Stamford, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project.` },
    ],
    costLocationNote: `Connecticut has high construction labor costs, particularly in Fairfield County near New York City. Hartford and other inland markets are somewhat more moderate. Coastal projects with wind zone requirements may need additional engineering.`,
    faqs: [
      { q: `Is Nudura ICF available in Connecticut?`, a: `Yes. Nudura's distribution network covers Connecticut, with supply for contractors in Hartford, New Haven, Stamford, and surrounding markets.` },
      { q: `Does Nudura meet Connecticut's energy code?`, a: `Nudura's R-22 to R-28 wall assembly meets and often exceeds Connecticut's residential energy code requirements. Your designer and energy consultant will confirm compliance for your specific project and climate zone.` },
      { q: `What does Nudura ICF cost in Connecticut?`, a: `Connecticut has high labor costs, particularly in Fairfield County. Core width, design complexity, and location within the state are the key variables. Connect with a local Connecticut contractor for an accurate project-specific estimate.` },
      { q: `Is ICF worth it in Connecticut?`, a: `For Connecticut homeowners, yes. Cold winters, coastal storm exposure, high energy costs, and strict code requirements all favor ICF. The combination of performance and long-term savings makes it a sound investment for new construction.` },
    ],
  },

  {
    name: 'Delaware',
    slug: 'delaware',
    heroIntro: `Delaware's coastal storm exposure, mixed mid-Atlantic climate, and active construction market make Nudura ICF a practical wall system choice across the state. If you're building with insulated concrete forms in Delaware and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Delaware's coastal regions, engineers frequently specify wider cores to meet high-wind zone load requirements. Inland residential projects typically use the standard 6" core.`,
    whyIntro: `Delaware's Atlantic coastline faces real nor'easter and hurricane exposure, while its mid-Atlantic climate brings cold winters and hot, humid summers. Nudura ICF handles both demands effectively.`,
    reasons: [
      { title: 'Coastal and Nor\'easter Protection', text: `Delaware's Atlantic coastline and Delaware Bay exposure bring real hurricane and nor'easter risk, particularly in the Rehoboth Beach and Cape Henlopen areas. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events compared to wood framing.` },
      { title: 'Mixed Climate Energy Performance', text: `Delaware has genuine heating costs in winter and real cooling demands in summer. Nudura's R-22 to R-28 wall assembly reduces both, and ICF's thermal mass smooths out seasonal temperature transitions. Many Delaware ICF homeowners see year-round savings on energy bills.` },
      { title: 'Moisture and Humidity Resistance', text: `Delaware's coastal humidity and proximity to Chesapeake Bay create ongoing moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration and don't support mold growth, a meaningful long-term durability advantage in Delaware's climate.` },
      { title: 'Delaware and Regional Distribution', text: `Nudura's distribution network covers Delaware through its regional Mid-Atlantic supply chain, with contractors in Wilmington, Dover, and the beach communities able to source product reliably. Your contractor should confirm current availability and lead times for your specific project.` },
    ],
    costLocationNote: `Delaware's coastal resort communities (Rehoboth, Bethany Beach) see higher construction costs and demand than inland areas. Wilmington and Dover markets are more moderate. Coastal projects with wind zone requirements may need wider cores and additional engineering.`,
    faqs: [
      { q: `Is Nudura ICF available in Delaware?`, a: `Yes. Nudura's regional distribution network covers Delaware, with supply available to contractors in Wilmington, Dover, and coastal communities. Your contractor should confirm current availability and lead times.` },
      { q: `Does Nudura ICF work for Delaware's coastal building requirements?`, a: `Nudura ICF meets Delaware building code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Delaware?`, a: `Coastal Delaware construction costs are higher than inland markets. Core width requirements, design complexity, and location within the state affect total cost. Connect with a local Delaware contractor for an accurate estimate.` },
      { q: `Is ICF worth it in Delaware?`, a: `For most Delaware homeowners, yes. Coastal storm resilience, year-round energy savings, and long-term moisture resistance make ICF a strong investment, particularly for coastal and beach community builds.` },
    ],
  },

  {
    name: 'Hawaii',
    slug: 'hawaii',
    heroIntro: `Hawaii's hurricane exposure, high energy costs, tropical heat and humidity, and unique island building environment make Nudura ICF one of the most practical wall systems in the state. If you're building with insulated concrete forms in Hawaii and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". Hawaii's high-wind zone requirements, particularly on exposed coastlines and windward sides of the islands, often drive engineers toward wider cores with heavier reinforcement. Your structural engineer and local building department will specify the appropriate system for your location.`,
    whyIntro: `Hawaii's island building environment is unique: real hurricane exposure, extreme humidity, high energy costs, and a construction market shaped by limited space and high demand. Nudura ICF addresses Hawaii's specific demands in several key ways.`,
    reasons: [
      { title: 'Hurricane and High-Wind Protection', text: `Hawaii faces direct hurricane and tropical storm risk, and the islands' exposed coastlines and windward sides see persistent high-wind conditions. ICF walls, including Nudura, provide meaningful structural protection compared to wood framing in high-wind events. Many Hawaii homeowners choose ICF specifically for storm resilience.` },
      { title: 'Energy Savings in a High-Cost Energy Market', text: `Hawaii has the highest residential electricity rates in the country. Nudura's R-22 to R-28 wall assembly reduces cooling loads significantly in Hawaii's tropical climate, and the energy savings compound year-round since cooling demands are constant. The payback on ICF's premium comes faster in Hawaii than in almost any other state.` },
      { title: 'Tropical Humidity and Moisture Resistance', text: `Hawaii's tropical humidity creates serious moisture management challenges for wood-frame construction. ICF walls resist moisture infiltration, don't rot, and don't support mold growth in the way wood framing can under sustained tropical humidity. This is a critical long-term durability advantage in Hawaii's climate.` },
      { title: 'Hawaii Distribution', text: `Nudura's distribution network reaches Hawaii through island freight logistics. Product availability and lead times vary by island, so your contractor should confirm specifics well in advance. Oahu has the most active construction market and best contractor availability.` },
    ],
    costLocationNote: `Hawaii has among the highest construction costs in the country due to island freight logistics, limited contractor availability, and high labor rates. Oahu has the most active market. Neighbor island projects see additional freight costs and more limited crew options.`,
    faqs: [
      { q: `Is Nudura ICF available in Hawaii?`, a: `Nudura's distribution network reaches Hawaii through island freight logistics. Product availability and lead times vary by island, so your contractor should confirm specifics and plan well in advance of your project start date.` },
      { q: `Is Nudura ICF good for Hawaii's hurricane and wind exposure?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in high-wind events. Hawaii's high-wind zone requirements will be addressed by your structural engineer, who will specify the appropriate core width and rebar schedule for your specific location.` },
      { q: `What does Nudura ICF cost in Hawaii?`, a: `Hawaii has among the highest construction costs in the country due to island freight, logistics, and labor rates. However, Hawaii's extremely high energy costs also mean ICF's energy savings add up faster than in any other state. Connect with a Hawaii contractor for a realistic project-specific estimate.` },
      { q: `Is ICF worth it in Hawaii?`, a: `For Hawaii homeowners, ICF is a particularly strong investment. The state's highest-in-the-nation electricity costs mean cooling energy savings are larger and faster to accumulate than anywhere else in the US, and hurricane resilience adds significant value in Hawaii's storm-exposed island environment.` },
    ],
  },

  {
    name: 'Maine',
    slug: 'maine',
    heroIntro: `Maine's extreme winters, coastal nor'easter exposure, and remote communities make Nudura ICF one of the most effective building systems in the state. If you're building with insulated concrete forms in Maine and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Maine's coldest climate zones, wider cores are frequently specified to maximize thermal performance. Nudura's 5 core width options give engineers flexibility to meet Maine's demanding energy requirements across the state's varied regions.`,
    whyIntro: `Maine combines some of the coldest winters in the continental US with significant coastal storm exposure and remote rural communities. Nudura ICF handles Maine's demanding conditions on every front.`,
    reasons: [
      { title: 'Extreme Cold Climate Performance', text: `Maine winters are long, cold, and harsh, particularly in the northern and interior parts of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads compared to wood frame construction. For Maine homeowners facing high heating oil or propane costs, ICF delivers meaningful savings.` },
      { title: 'Nor\'easter and Coastal Storm Protection', text: `Maine's coastline faces regular nor'easter and significant storm exposure. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events. Coastal Maine contractors increasingly specify ICF for new construction in exposed locations.` },
      { title: 'Moisture and Freeze-Thaw Durability', text: `Maine's freeze-thaw cycles and coastal moisture put real stress on building materials. ICF walls handle freeze-thaw cycles better than wood framing, resist moisture infiltration, and maintain structural integrity through Maine's demanding seasonal transitions.` },
      { title: 'Maine Distribution', text: `Nudura's distribution network covers Maine, with supply available to contractors in Portland, Bangor, Augusta, and surrounding markets. Remote and rural Maine projects should confirm freight logistics and lead times well in advance with their contractor.` },
    ],
    costLocationNote: `Portland and the southern Maine coast have the most active construction markets in the state and the best ICF contractor availability. Northern and rural Maine projects may see higher costs due to crew travel, remote logistics, and limited local contractor options.`,
    faqs: [
      { q: `Is Nudura ICF available in Maine?`, a: `Yes. Nudura's distribution network covers Maine, with supply for contractors in Portland, Bangor, and Augusta. Rural and remote Maine projects should confirm freight details and lead times with their contractor well in advance.` },
      { q: `How does Nudura ICF perform in Maine winters?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are well-suited to Maine's long, cold winters. For homeowners relying on heating oil or propane, the energy savings from ICF's performance over wood framing are particularly meaningful.` },
      { q: `What does Nudura ICF cost in Maine?`, a: `Portland and southern Maine tend to have more competitive ICF pricing. Northern and rural Maine projects may see higher costs due to logistics and crew availability. Connect with a local Maine contractor for an accurate project-specific estimate.` },
      { q: `Is ICF worth it in Maine?`, a: `For most Maine homeowners, yes. Cold winters, heating oil costs, coastal storm exposure, and Maine's challenging climate all favor ICF's performance over wood framing. The energy savings in a heating-dominant climate add up quickly.` },
    ],
  },

  {
    name: 'Nebraska',
    slug: 'nebraska',
    heroIntro: `Nebraska sits in Tornado Alley and deals with cold winters, hot summers, and sweeping plains winds, making Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in Nebraska and your contractor uses Nudura, here's what you need to know about storm performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Nebraska, residential projects most commonly use the standard 6" core. Wider cores are used for commercial applications and projects where engineers specify additional structural or thermal performance for Nebraska's demanding climate.`,
    whyIntro: `Nebraska's location in Tornado Alley, combined with cold winters, hot summers, and some of the strongest sustained winds in the country, makes a high-performance wall system essential. Nudura ICF delivers on every front.`,
    reasons: [
      { title: 'Tornado Alley Storm Protection', text: `Nebraska sees significant tornado activity each year as part of Tornado Alley. ICF walls, including Nudura, provide meaningful protection compared to wood frame construction in high-wind and tornado events. For Nebraska homeowners, the storm resilience of ICF is often the primary reason for choosing the system.` },
      { title: 'Plains Wind Performance', text: `Nebraska experiences some of the strongest sustained winds in the continental US, particularly across the Sandhills and western plains. ICF's monolithic reinforced concrete wall system handles sustained high-wind loading better than wood framing, providing both structural integrity and reduced air infiltration.` },
      { title: 'Year-Round Energy Savings', text: `Nebraska has cold winters and hot summers, meaning HVAC runs hard in both seasons. Nudura's R-22 to R-28 wall assembly reduces both heating and cooling loads, and ICF's thermal mass smooths out seasonal temperature transitions. Many Nebraska ICF homeowners see meaningful savings year-round.` },
      { title: 'Nebraska Distribution', text: `Nudura's distribution network covers Nebraska, with supply available to contractors in Omaha, Lincoln, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project location.` },
    ],
    costLocationNote: `Omaha and Lincoln have the most experienced ICF contractor markets in Nebraska. Western Nebraska and rural projects may see higher costs due to crew travel, freight distances, and fewer locally available experienced ICF builders.`,
    faqs: [
      { q: `Is Nudura ICF available in Nebraska?`, a: `Yes. Nudura's distribution network covers Nebraska, with supply for contractors in Omaha, Lincoln, and surrounding markets.` },
      { q: `Is Nudura ICF good for tornado protection in Nebraska?`, a: `Yes. ICF's reinforced concrete wall system provides meaningful protection compared to wood framing in tornado and high-wind conditions. Nebraska's position in Tornado Alley makes ICF one of the most logical building investments for homeowners concerned about storm safety.` },
      { q: `What does Nudura ICF cost in Nebraska?`, a: `Cost depends on your design, core width, location, and local labor. Omaha and Lincoln markets tend to have more competitive ICF pricing. Connect with a local Nebraska contractor for an accurate project-specific quote.` },
      { q: `Is ICF worth it in Nebraska?`, a: `For most Nebraska homeowners, yes. Tornado protection, year-round energy savings in a climate with both cold winters and hot summers, and resilience against Nebraska's strong plains winds make ICF a strong long-term investment.` },
    ],
  },

  {
    name: 'New Hampshire',
    slug: 'new-hampshire',
    heroIntro: `New Hampshire's cold winters, coastal storm exposure, and strong energy code make Nudura ICF one of the most effective building systems in the state. If you're building with insulated concrete forms in New Hampshire and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In New Hampshire, residential projects commonly use the 6" core. Mountain and northern climate zone projects frequently specify wider cores to maximize thermal performance, and coastal projects may require wider cores for wind zone compliance.`,
    whyIntro: `New Hampshire brings cold winters, White Mountain conditions, and coastal nor'easter exposure in a compact state. Nudura ICF performs well across all of New Hampshire's climate demands.`,
    reasons: [
      { title: 'Cold Climate and Mountain Performance', text: `New Hampshire winters are cold across the entire state, with the White Mountains seeing some of the most extreme conditions in the Northeast. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads even in New Hampshire's harshest conditions.` },
      { title: 'Nor\'easter and Coastal Storm Resilience', text: `New Hampshire's short seacoast faces regular nor'easter exposure, and storm systems affect the entire state. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events compared to wood framing.` },
      { title: 'New Hampshire Energy Code Compliance', text: `New Hampshire has an active energy code environment. Nudura's R-22 to R-28 wall assembly helps meet and often exceed New Hampshire's thermal performance requirements, making compliance more straightforward for your design team.` },
      { title: 'New Hampshire Distribution', text: `Nudura's distribution network covers New Hampshire, with supply available to contractors in Manchester, Concord, Nashua, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Southern New Hampshire near the Massachusetts border has the most competitive construction market in the state. Northern and mountain communities may see higher costs due to logistics and fewer locally available experienced ICF crews.`,
    faqs: [
      { q: `Is Nudura ICF available in New Hampshire?`, a: `Yes. Nudura's distribution network covers New Hampshire, with supply for contractors in Manchester, Concord, Nashua, and surrounding markets.` },
      { q: `How does Nudura ICF perform in New Hampshire winters?`, a: `Very well. Nudura's R-22 to R-28 wall assembly and continuous insulation are well-suited to New Hampshire's cold winters, including mountain and White Mountain region conditions. ICF consistently outperforms wood framing in cold-climate heating performance.` },
      { q: `What does Nudura ICF cost in New Hampshire?`, a: `Southern New Hampshire tends to have more competitive ICF pricing due to greater contractor availability. Northern and mountain projects may see higher costs. Connect with a local New Hampshire contractor for a project-specific estimate.` },
      { q: `Is ICF worth it in New Hampshire?`, a: `For most New Hampshire homeowners, yes. Cold winters, heating costs, coastal storm exposure, and the state's demanding energy environment all favor ICF's performance over wood framing.` },
    ],
  },

  {
    name: 'New Mexico',
    slug: 'new-mexico',
    heroIntro: `New Mexico's extreme heat in the south, cold winters at elevation, dramatic temperature swings, and seismic activity make Nudura ICF one of the most versatile and effective building systems in the state. If you're building with insulated concrete forms in New Mexico and your contractor uses Nudura, here's what you need to know.`,
    aboutNote: `Core widths range from 4" through 12". New Mexico's varied climate zones, from the hot Chihuahuan Desert to the cold Sangre de Cristo Mountains, mean core width selection varies significantly by project location and elevation. Your structural engineer will specify the appropriate system for your conditions.`,
    whyIntro: `New Mexico spans dramatic climate extremes: desert heat in the south, cold mountain winters in the north, and dramatic temperature swings almost everywhere. Nudura ICF's thermal mass and insulation performance make it exceptionally well-suited to the state.`,
    reasons: [
      { title: 'Thermal Mass for Desert Temperature Swings', text: `New Mexico experiences some of the most dramatic day-to-night temperature swings in the country, particularly in the high desert regions around Albuquerque and Santa Fe. ICF's thermal mass absorbs daytime heat and releases it slowly overnight, stabilizing interior temperatures in ways that wood frame or even adobe walls cannot match at scale.` },
      { title: 'Extreme Heat Energy Performance', text: `Southern New Mexico and the Rio Grande Valley see intense summer heat. Nudura's R-22 to R-28 wall assembly significantly reduces cooling loads, and in an arid climate where the thermal mass effect is maximized, ICF delivers particularly strong energy performance compared to wood frame construction.` },
      { title: 'Cold Mountain Winter Performance', text: `Northern New Mexico's mountain communities, including Taos and the Sangre de Cristo range, face cold winters and significant snowfall. Nudura's continuous insulation and high R-value wall assembly reduce heating loads effectively across the state's colder climate zones.` },
      { title: 'New Mexico Distribution', text: `Nudura's distribution network covers New Mexico, with supply available to contractors in Albuquerque, Santa Fe, Las Cruces, and surrounding markets. Your contractor should confirm current distributor availability and lead times for your specific project.` },
    ],
    costLocationNote: `Albuquerque has the most active construction market and most experienced ICF contractor availability in New Mexico. Santa Fe and Taos are smaller but active markets. Rural and remote New Mexico projects may see higher costs due to logistics and crew travel.`,
    faqs: [
      { q: `Is Nudura ICF available in New Mexico?`, a: `Yes. Nudura's distribution network covers New Mexico, with supply for contractors in Albuquerque, Santa Fe, Las Cruces, and surrounding markets.` },
      { q: `How does Nudura ICF handle New Mexico's temperature swings?`, a: `Exceptionally well. ICF's thermal mass is specifically well-suited to climates with large day-to-night temperature differentials. The concrete core absorbs heat during warm periods and releases it slowly when temperatures drop, naturally stabilizing interior temperatures and reducing HVAC load.` },
      { q: `What does Nudura ICF cost in New Mexico?`, a: `Cost depends on your design, core width, location, and local labor. Albuquerque tends to have more competitive ICF pricing. Mountain and rural projects may see higher costs. Connect with a local New Mexico contractor for an accurate estimate.` },
      { q: `Is ICF a good investment in New Mexico?`, a: `Yes. New Mexico's extreme temperature swings, hot southern desert climate, and cold northern mountain winters all favor ICF's thermal mass and insulation performance. Energy savings in a climate with both significant heating and cooling demands compound year-round.` },
    ],
  },

  {
    name: 'North Dakota',
    slug: 'north-dakota',
    heroIntro: `North Dakota's extreme winters, strong plains winds, and heating-dominant climate make Nudura ICF one of the best-performing wall systems in the state. If you're building with insulated concrete forms in North Dakota and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In North Dakota's extreme cold climate zones, wider cores are frequently specified to maximize thermal performance. Nudura's 5 core width options give engineers the flexibility to hit specific energy targets for the state's demanding heating requirements.`,
    whyIntro: `North Dakota ranks among the coldest states in the continental US, with long winters, extreme wind chills, and one of the most heating-dominant climates in the country. Nudura ICF is built for exactly these conditions.`,
    reasons: [
      { title: 'Extreme Cold Weather Performance', text: `North Dakota winters are among the most severe in the continental US, with extended periods of extreme cold and wind chill. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, keeping heating loads as low as possible even in North Dakota's harshest conditions.` },
      { title: 'Wind and Air Infiltration Resistance', text: `North Dakota experiences fierce plains winds that drive significant air infiltration in standard wood-frame construction. ICF's monolithic concrete core essentially eliminates air leakage through the wall system, reducing heat loss from wind-driven infiltration that standard insulated wood walls cannot prevent.` },
      { title: 'Energy Savings Where They Matter Most', text: `North Dakota homeowners face some of the longest and most expensive heating seasons in the country. Nudura's high R-value wall system significantly reduces heating demand, and in a state where heating costs are a major annual expense, ICF's energy savings are among the most impactful in the nation.` },
      { title: 'North Dakota Distribution', text: `Nudura's distribution network covers North Dakota, with supply available to contractors in Fargo, Bismarck, Grand Forks, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Fargo and Bismarck have the most experienced ICF contractor markets in North Dakota. Rural and western North Dakota projects may see higher costs due to crew travel and fewer locally available experienced builders.`,
    faqs: [
      { q: `Is Nudura ICF available in North Dakota?`, a: `Yes. Nudura's distribution network covers North Dakota, with supply for contractors in Fargo, Bismarck, Grand Forks, and surrounding markets.` },
      { q: `How does Nudura ICF perform in North Dakota's extreme winters?`, a: `Exceptionally well. Nudura's R-22 to R-28 wall assembly and continuous insulation are specifically suited to North Dakota's extreme cold. ICF's monolithic wall also resists the air infiltration that fierce plains winds drive through standard construction, further improving thermal performance.` },
      { q: `What does Nudura ICF cost in North Dakota?`, a: `Cost depends on your design, core width, location, and local labor. Fargo and Bismarck markets tend to have more competitive pricing. Connect with a local North Dakota contractor for a project-specific estimate.` },
      { q: `Is ICF worth the investment in North Dakota?`, a: `Absolutely. North Dakota's extreme cold and long heating season mean ICF's energy savings add up faster here than in most other states. The combination of heating cost reduction and long-term structural durability in demanding conditions makes ICF a strong investment.` },
    ],
  },

  {
    name: 'Rhode Island',
    slug: 'rhode-island',
    heroIntro: `Rhode Island's coastal storm and hurricane exposure, cold winters, and active construction market make Nudura ICF a practical building system across the state. If you're building with insulated concrete forms in Rhode Island and your contractor uses Nudura, here's what you need to know about performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Rhode Island's coastal and Narragansett Bay regions, engineers frequently specify wider cores to meet high-wind zone load requirements. Inland residential projects typically use the standard 6" core.`,
    whyIntro: `Rhode Island's exposure to Narragansett Bay and the Atlantic brings real hurricane and nor'easter risk, while cold New England winters create significant heating demands. Nudura ICF handles both effectively.`,
    reasons: [
      { title: 'Coastal and Hurricane Storm Protection', text: `Rhode Island's coastline and Narragansett Bay communities face regular hurricane, tropical storm, and nor'easter exposure. ICF walls, including Nudura, provide meaningful structural protection in high-wind and storm events compared to wood framing. Coastal Rhode Island contractors increasingly specify ICF for new construction in storm-exposed areas.` },
      { title: 'Cold New England Winter Performance', text: `Rhode Island winters are cold, with heating season running from October through April. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Rhode Island Energy Code Compliance', text: `Rhode Island follows a demanding residential energy code aligned with the Northeast's strict standards. Nudura's R-22 to R-28 wall assembly helps meet and often exceed Rhode Island's thermal performance requirements, simplifying compliance for your design team.` },
      { title: 'Rhode Island and Regional Distribution', text: `Nudura's distribution network covers Rhode Island through its regional New England supply chain, with contractors in Providence, Warwick, Newport, and surrounding markets able to source product reliably. Your contractor should confirm current availability and lead times.` },
    ],
    costLocationNote: `Rhode Island has relatively high construction labor costs as part of the New England market. Newport and coastal communities see higher demand than inland areas. Coastal projects with wind zone requirements may need additional engineering for code compliance.`,
    faqs: [
      { q: `Is Nudura ICF available in Rhode Island?`, a: `Yes. Nudura's regional New England distribution network covers Rhode Island, with supply for contractors in Providence, Warwick, Newport, and surrounding markets.` },
      { q: `Does Nudura ICF meet Rhode Island's coastal building code?`, a: `Nudura ICF meets Rhode Island building code requirements including coastal wind zone standards. Your structural engineer will specify the appropriate core width and rebar schedule for your location and wind exposure category.` },
      { q: `What does Nudura ICF cost in Rhode Island?`, a: `Rhode Island has high New England labor costs. Coastal projects with wind zone requirements may also need additional engineering. Connect with a local Rhode Island contractor for an accurate project-specific estimate.` },
      { q: `Is ICF worth it in Rhode Island?`, a: `For most Rhode Island homeowners, yes. Coastal storm resilience, cold winter energy savings, and long-term durability make ICF a sound investment in Rhode Island's climate and coastal environment.` },
    ],
  },

  {
    name: 'South Dakota',
    slug: 'south-dakota',
    heroIntro: `South Dakota's cold winters, tornado risk, and sweeping plains winds make Nudura ICF one of the most practical building systems in the state. If you're building with insulated concrete forms in South Dakota and your contractor uses Nudura, here's what you need to know about storm performance, cold-climate specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In South Dakota, residential projects most commonly use the standard 6" core. Wider cores are specified by engineers for commercial applications and projects where additional structural or insulation performance is required for the state's demanding climate.`,
    whyIntro: `South Dakota brings cold winters, real tornado risk on the eastern plains, and some of the strongest sustained winds in the continental US. Nudura ICF handles all three demands effectively.`,
    reasons: [
      { title: 'Cold Winter Performance', text: `South Dakota winters are long and cold, particularly in the northern and western parts of the state. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, reducing heating loads significantly compared to wood frame construction.` },
      { title: 'Tornado and Severe Storm Protection', text: `Eastern South Dakota sees meaningful tornado activity as part of the northern plains severe weather belt. ICF walls, including Nudura, provide meaningful protection compared to wood framing in high-wind and tornado events. The reinforced concrete core resists the lateral forces that cause most storm damage.` },
      { title: 'Plains Wind and Air Infiltration Resistance', text: `South Dakota experiences some of the strongest sustained winds in the country, which drives significant air infiltration in standard wood-frame construction. ICF's monolithic concrete core resists wind-driven air leakage far better than wood stud walls, reducing heat loss during South Dakota's windy winter conditions.` },
      { title: 'South Dakota Distribution', text: `Nudura's distribution network covers South Dakota, with supply available to contractors in Sioux Falls, Rapid City, and surrounding markets. Your contractor should confirm current availability and lead times for your specific project area.` },
    ],
    costLocationNote: `Sioux Falls and Rapid City have the most experienced ICF contractor markets in South Dakota. Rural and remote projects may see higher costs due to crew travel and freight distances from distribution points.`,
    faqs: [
      { q: `Is Nudura ICF available in South Dakota?`, a: `Yes. Nudura's distribution network covers South Dakota, with supply for contractors in Sioux Falls, Rapid City, and surrounding markets.` },
      { q: `How does Nudura ICF perform in South Dakota winters?`, a: `Well. Nudura's R-22 to R-28 wall assembly and continuous insulation significantly reduce heating loads in South Dakota's cold winters. ICF's resistance to wind-driven air infiltration is particularly valuable in South Dakota's high-wind environment.` },
      { q: `What does Nudura ICF cost in South Dakota?`, a: `Cost depends on your design, core width, location, and local labor. Sioux Falls and Rapid City markets tend to have more competitive pricing. Rural and remote projects may see higher costs. Connect with a local South Dakota contractor for an accurate estimate.` },
      { q: `Is ICF worth it in South Dakota?`, a: `For most South Dakota homeowners, yes. Cold winters, tornado risk, and strong plains winds all favor ICF's structural and thermal performance over standard wood framing.` },
    ],
  },

  {
    name: 'Vermont',
    slug: 'vermont',
    heroIntro: `Vermont's extreme winters, mountain communities, and strict energy code make Nudura ICF one of the strongest performing wall systems in the state. If you're building with insulated concrete forms in Vermont and your contractor uses Nudura, here's what you need to know about cold-climate performance, code compliance, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Vermont's cold climate zones, wider cores are frequently specified to maximize thermal performance and meet the state's demanding energy code requirements. Nudura's 5 core width options give designers flexibility to achieve high-performance targets across Vermont's varied elevations.`,
    whyIntro: `Vermont has some of the coldest winters in the continental US, some of the strictest energy codes in the country, and a growing appetite for high-performance construction. Nudura ICF delivers on every front.`,
    reasons: [
      { title: 'Extreme Cold Climate Performance', text: `Vermont winters are long, cold, and harsh, particularly in the Northeast Kingdom and mountain communities. Nudura's R-22 to R-28 wall assembly provides continuous insulation with no thermal bridging, significantly reducing heating loads compared to wood frame construction. For Vermont homeowners relying on heating oil or propane, ICF delivers meaningful savings every season.` },
      { title: 'Vermont Energy Code Compliance', text: `Vermont has one of the more stringent residential energy codes in the country, reflecting the state's commitment to energy efficiency. Nudura's high R-value wall assembly meets and often exceeds Vermont's thermal performance requirements, and ICF's continuous insulation with no thermal bridging performs well under the state's compliance pathways.` },
      { title: 'Moisture and Freeze-Thaw Durability', text: `Vermont's freeze-thaw cycles, snowpack, and seasonal moisture put real stress on building materials. ICF walls handle freeze-thaw cycles better than wood framing, resist moisture infiltration, and maintain structural integrity through Vermont's demanding seasonal transitions over the long term.` },
      { title: 'Vermont Distribution', text: `Nudura's distribution network covers Vermont, with supply available to contractors in Burlington, Montpelier, and surrounding markets. Remote and rural Vermont projects should confirm freight logistics and lead times with their contractor in advance.` },
    ],
    costLocationNote: `Vermont's construction market is smaller than neighboring states, with Burlington having the most active ICF contractor availability. Remote and rural Vermont projects may see higher costs due to logistics and fewer locally available experienced builders.`,
    faqs: [
      { q: `Is Nudura ICF available in Vermont?`, a: `Yes. Nudura's distribution network covers Vermont, with supply for contractors in Burlington, Montpelier, and surrounding markets. Remote projects should confirm freight details and lead times in advance.` },
      { q: `Does Nudura meet Vermont's energy code?`, a: `Nudura's R-22 to R-28 wall assembly meets and often exceeds Vermont's demanding residential energy code requirements. Your designer and energy consultant will confirm compliance for your specific project and climate zone.` },
      { q: `What does Nudura ICF cost in Vermont?`, a: `Vermont's smaller construction market and rural logistics tend to push costs somewhat higher than in more densely populated states. Burlington tends to have the most competitive pricing. Connect with a local Vermont contractor for a realistic project-specific estimate.` },
      { q: `Is ICF worth it in Vermont?`, a: `For Vermont homeowners, absolutely. Extreme winters, high heating costs, strict energy code requirements, and Vermont's culture of high-performance construction all point toward ICF as the right long-term investment.` },
    ],
  },

  {
    name: 'Wyoming',
    slug: 'wyoming',
    heroIntro: `Wyoming's extreme cold, some of the strongest sustained winds in the continental US, and high-altitude conditions make Nudura ICF one of the strongest performing wall systems in the state. If you're building with insulated concrete forms in Wyoming and your contractor uses Nudura, here's what you need to know about cold-climate performance, specs, and finding a qualified contractor near you.`,
    aboutNote: `Core widths range from 4" through 12". In Wyoming's cold climate zones and high-wind environments, engineers frequently specify wider cores with heavier reinforcement to maximize thermal performance and structural integrity. Nudura's 5 core width options give designers flexibility for Wyoming's demanding conditions.`,
    whyIntro: `Wyoming is one of the most demanding building environments in the country: extreme cold, persistent high winds, high altitude, and vast rural geography. Nudura ICF handles each of these challenges better than standard wood framing.`,
    reasons: [
      { title: 'Extreme Cold and Wind Performance', text: `Wyoming experiences extreme cold in winter, compounded by some of the highest sustained wind speeds in the continental US. Nudura's R-22 to R-28 wall assembly provides continuous insulation, and ICF's monolithic concrete core resists wind-driven air infiltration that standard wood-frame walls cannot prevent. Together, these make a dramatic difference in Wyoming's conditions.` },
      { title: 'Energy Savings in a Heating-Dominant Climate', text: `Wyoming homeowners face long, expensive heating seasons. Nudura's high R-value wall system significantly reduces heating demand, and in a state where heating costs are a major annual expense, ICF's energy performance translates directly to meaningful annual savings.` },
      { title: 'Structural Durability in Mountain Conditions', text: `Wyoming's freeze-thaw cycles, snowpack, and high-altitude conditions put real stress on building materials. ICF walls handle freeze-thaw cycles better than wood framing, resist moisture infiltration, and maintain structural integrity through Wyoming's demanding seasonal and environmental conditions over the long term.` },
      { title: 'Wyoming Distribution', text: `Nudura's distribution network reaches Wyoming, with supply available to contractors in Cheyenne, Casper, Gillette, and Jackson markets. Wyoming's vast geography means freight logistics and lead times vary significantly by location. Your contractor should confirm specifics for your project area well in advance.` },
    ],
    costLocationNote: `Wyoming's construction market is limited by sparse population and vast geography. Cheyenne and Casper have the most active contractor markets. Jackson and resort communities have high labor costs. Remote and rural Wyoming projects require significant advance planning for materials, crew, and logistics.`,
    faqs: [
      { q: `Is Nudura ICF available in Wyoming?`, a: `Nudura's distribution network reaches Wyoming, with supply for contractors in Cheyenne, Casper, Gillette, and Jackson markets. Wyoming's vast geography means freight logistics vary significantly by location, so confirm specifics with your contractor well in advance.` },
      { q: `How does Nudura ICF handle Wyoming's extreme cold and wind?`, a: `Very well. Nudura's R-22 to R-28 wall assembly addresses the cold, and ICF's monolithic concrete core resists the wind-driven air infiltration that is a major heat-loss mechanism in Wyoming's high-wind conditions. Together, ICF delivers far better cold-weather performance than standard wood-frame construction.` },
      { q: `What does Nudura ICF cost in Wyoming?`, a: `Wyoming's sparse market and remote logistics tend to push construction costs higher than in more populated states. Jackson and resort area projects see premium labor costs. Connect with a local Wyoming contractor for a realistic project-specific estimate.` },
      { q: `Is ICF worth the investment in Wyoming?`, a: `For Wyoming homeowners, yes. Extreme cold, fierce winds, and long heating seasons mean ICF's energy and structural performance advantages are among the most impactful in the country. Building right the first time matters especially in Wyoming's demanding environment.` },
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
