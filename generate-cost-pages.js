/**
 * ICF Insider — State Cost Page Generator
 *
 * Rebuilds state cost pages using the Florida template structure while
 * preserving each state's unique content (hero intro, labor/code cards,
 * "why" section, FAQs).
 *
 * Usage:
 *   node generate-cost-pages.js                  # all states except Florida
 *   node generate-cost-pages.js --batch 1        # batch 1 (states A-G)
 *   node generate-cost-pages.js --batch 2        # batch 2 (states H-M)
 *   node generate-cost-pages.js --batch 3        # batch 3 (states N-S)
 *   node generate-cost-pages.js --batch 4        # batch 4 (states T-W)
 *   node generate-cost-pages.js --state texas    # single state by slug
 *   node generate-cost-pages.js --dry-run        # preview without writing
 */
const fs = require('fs');
const path = require('path');

// ─── Climate categories (matches generate-states.js) ─────────────────────
const CLIMATE = {
  'alabama': 'HURRICANE', 'alaska': 'COLD', 'arizona': 'HOT_DRY', 'arkansas': 'TORNADO',
  'california': 'PACIFIC', 'colorado': 'COLD', 'connecticut': 'COLD', 'delaware': 'MIXED',
  'georgia': 'HURRICANE', 'hawaii': 'HURRICANE', 'idaho': 'COLD', 'illinois': 'TORNADO',
  'indiana': 'TORNADO', 'iowa': 'TORNADO', 'kansas': 'TORNADO', 'kentucky': 'MIXED',
  'louisiana': 'HURRICANE', 'maine': 'COLD', 'maryland': 'MIXED', 'massachusetts': 'COLD',
  'michigan': 'COLD', 'minnesota': 'COLD', 'mississippi': 'HURRICANE', 'missouri': 'TORNADO',
  'montana': 'COLD', 'nebraska': 'TORNADO', 'nevada': 'HOT_DRY', 'new-hampshire': 'COLD',
  'new-jersey': 'MIXED', 'new-mexico': 'HOT_DRY', 'new-york': 'COLD',
  'north-carolina': 'HURRICANE', 'north-dakota': 'COLD', 'ohio': 'TORNADO',
  'oklahoma': 'TORNADO', 'oregon': 'PACIFIC', 'pennsylvania': 'MIXED',
  'rhode-island': 'COLD', 'south-carolina': 'HURRICANE', 'south-dakota': 'COLD',
  'tennessee': 'MIXED', 'texas': 'TORNADO', 'utah': 'HOT_DRY', 'vermont': 'COLD',
  'virginia': 'MIXED', 'washington': 'PACIFIC', 'west-virginia': 'MIXED',
  'wisconsin': 'COLD', 'wyoming': 'COLD',
};

// ─── Hero intros (2 punchy sentences per state) ─────────────────────────
const HERO_INTRO = {
  'alabama': "Alabama's hurricane season, brutal summer heat, and Gulf Coast humidity make ICF one of the smartest building choices in the state. Lower energy bills, insurance discounts, and near-zero exterior maintenance mean Alabama ICF homeowners save thousands every year.",
  'alaska': "Alaska's extreme cold, high energy costs, and remote building conditions make ICF a standout choice for long-term comfort. Airtight walls and superior insulation mean lower heating bills from day one - exactly what you need when winter lasts eight months.",
  'arizona': "Arizona's triple-digit summers and year-round sun turn cooling costs into the biggest line item on your utility bill. ICF walls block that heat before it gets inside, cutting energy costs and keeping your home comfortable without running AC around the clock.",
  'arkansas': "Arkansas sits in Tornado Alley with hot, humid summers and unpredictable severe weather every spring. ICF gives you concrete-core walls that handle high winds and cut energy bills year-round.",
  'california': "California's earthquakes, wildfire risk, and some of the highest energy costs in the country make a strong case for ICF. Concrete-core walls deliver seismic resilience, fire resistance, and lower utility bills in one build.",
  'colorado': "Colorado's harsh winters, wildfire exposure, and wide temperature swings put your home's shell to the test every season. ICF walls lock in heat when it's 10 below and block it when it's 95 - cutting energy costs year-round.",
  'connecticut': "Connecticut's cold winters, coastal storms, and high energy prices make ICF a smart long-term investment. Airtight concrete walls slash heating bills and shrug off Nor'easters without the maintenance headaches of wood framing.",
  'delaware': "Delaware's coastal storms, humid summers, and rising insurance costs make ICF a practical choice for homeowners building to last. Concrete-core walls cut energy bills, resist moisture damage, and can lower your insurance premiums.",
  'georgia': "Georgia's hurricane risk, extreme summer heat, and high humidity make ICF one of the strongest building choices in the Southeast. Lower cooling bills, insurance discounts, and zero worry about rot or termites add up to real savings.",
  'hawaii': "Hawaii's hurricane exposure, volcanic activity, salt air corrosion, and the highest energy prices in the nation make ICF hard to beat. Concrete-core walls resist everything the islands throw at them while keeping cooling costs way down.",
  'idaho': "Idaho's freezing winters, dry summers, and growing wildfire risk make ICF a practical choice for year-round comfort. Superior insulation means lower heating bills, and concrete walls give you fire resistance that wood framing can't match.",
  'illinois': "Illinois deals with tornadoes, brutal winters, and scorching summers - your home's shell takes a beating in every season. ICF walls stand up to severe weather while cutting both heating and cooling costs significantly.",
  'indiana': "Indiana's tornado risk, cold winters, and hot humid summers demand a home that can handle all of it. ICF concrete walls deliver storm resilience and year-round energy savings that wood framing simply can't match.",
  'iowa': "Iowa's tornadoes, subzero winters, and hot summers put extreme demands on any home. ICF walls give you concrete-core storm protection and the insulation to keep energy bills low no matter what the season throws at you.",
  'kansas': "Kansas is ground zero for Tornado Alley, with high winds, hail, and temperature swings from subzero to 100+. ICF concrete walls handle it all while slashing your heating and cooling costs year-round.",
  'kentucky': "Kentucky's hot humid summers, cold winters, and severe storm exposure make ICF a smart choice for comfort and resilience. Concrete-core walls cut energy bills in every season and stand up to the weather that wood framing struggles with.",
  'louisiana': "Louisiana's hurricanes, extreme humidity, and punishing heat make ICF one of the best building decisions you can make. Concrete walls resist wind, moisture, and termites while insurance discounts and energy savings put money back in your pocket.",
  'maine': "Maine's brutal winters, heavy snow loads, and high heating costs make ICF an obvious fit. Airtight concrete walls keep heat in when it's 20 below and dramatically cut the energy bills that eat into every Maine homeowner's budget.",
  'maryland': "Maryland's coastal storms, humid summers, and cold winters create year-round demands on your home's envelope. ICF walls deliver energy savings in every season and the storm resilience coastal homeowners need.",
  'massachusetts': "Massachusetts' harsh winters, Nor'easters, and some of the highest energy costs in the country make ICF a strong long-term play. Airtight concrete walls cut heating bills dramatically and stand up to coastal storms without constant maintenance.",
  'michigan': "Michigan's long freezing winters, lake-effect snow, and high heating costs make ICF one of the smartest building choices in the Midwest. Superior insulation keeps heating bills low while concrete walls handle whatever Lake Michigan weather rolls in.",
  'minnesota': "Minnesota's subzero winters and high heating costs make your home's insulation the single biggest factor in your monthly budget. ICF walls deliver airtight concrete construction that keeps heat in and energy bills dramatically lower.",
  'mississippi': "Mississippi's hurricane risk, extreme heat, and year-round humidity make ICF a no-brainer for homeowners building to last. Concrete walls resist wind, moisture, and insects while cutting cooling costs and qualifying for insurance discounts.",
  'missouri': "Missouri's tornadoes, ice storms, and hot humid summers put serious demands on any home. ICF concrete walls give you storm resilience and year-round energy savings that pay off from the first month.",
  'montana': "Montana's extreme cold, high winds, and remote building conditions make ICF a strong choice for long-term comfort. Airtight concrete walls keep heating costs down when winter temperatures drop well below zero.",
  'nebraska': "Nebraska's Tornado Alley location, harsh winters, and scorching summers demand a home built for extremes. ICF concrete walls deliver storm protection and insulation that keep you safe and your energy bills low year-round.",
  'nevada': "Nevada's extreme desert heat, intense sun, and wide day-to-night temperature swings make cooling your home the biggest ongoing cost. ICF walls block that heat at the source, keeping interiors comfortable and energy bills significantly lower.",
  'new-hampshire': "New Hampshire's brutal winters, heavy snow, and high heating costs make insulation performance the top priority for any new build. ICF walls deliver airtight concrete construction that keeps heating bills low and maintenance even lower.",
  'new-jersey': "New Jersey's coastal storm exposure, humid summers, and cold winters make ICF a smart choice for resilience and savings. Concrete-core walls cut energy bills year-round and stand up to the weather that keeps hitting the Jersey Shore.",
  'new-mexico': "New Mexico's intense desert sun, extreme temperature swings, and wildfire exposure make ICF a practical building choice. Concrete walls block daytime heat, hold warmth overnight, and give you fire resistance that matters in a dry climate.",
  'new-york': "New York's harsh winters, coastal storms, and some of the highest energy costs in the nation make ICF a serious long-term investment. Airtight concrete walls slash heating bills and give you the resilience to handle anything from Nor'easters to lake-effect snow.",
  'north-carolina': "North Carolina's hurricanes, humid summers, and growing coastal insurance costs make ICF one of the best building choices in the state. Concrete walls resist high winds and moisture while energy savings and insurance discounts add up every year.",
  'north-dakota': "North Dakota's extreme cold, relentless wind, and long heating season make energy efficiency the most important feature of any new home. ICF walls deliver the airtight insulation you need to keep heating costs manageable when it's 30 below.",
  'ohio': "Ohio's tornadoes, lake-effect snow, and humid summers put your home through every weather extreme. ICF concrete walls deliver storm resilience and energy savings in both heating and cooling season.",
  'oklahoma': "Oklahoma's tornadoes, hail, and extreme heat make storm resilience a top priority for any new build. ICF concrete walls stand up to severe weather while insurance discounts and energy savings offset the investment fast.",
  'oregon': "Oregon's earthquake risk, heavy rain, and growing wildfire exposure make ICF a strong choice for resilient building. Concrete-core walls handle seismic activity, resist moisture damage, and cut energy costs in the Pacific Northwest's long heating season.",
  'pennsylvania': "Pennsylvania's cold winters, severe storms, and rising energy costs make ICF a smart long-term investment. Airtight concrete walls keep heating bills low and give you the durability to handle everything from ice storms to humid summers.",
  'rhode-island': "Rhode Island's Nor'easters, coastal exposure, and high energy costs make ICF a practical choice for the Ocean State. Concrete walls shrug off storm damage and cut heating bills - two things every Rhode Island homeowner needs.",
  'south-carolina': "South Carolina's hurricanes, extreme humidity, and coastal insurance costs make ICF one of the smartest building choices in the Lowcountry. Concrete walls resist wind and moisture while insurance discounts and energy savings pay off from year one.",
  'south-dakota': "South Dakota's extreme cold, high winds, and severe weather make ICF a standout choice for long-term comfort and durability. Concrete walls block the wind, hold in heat, and keep energy bills low through the long Plains winter.",
  'tennessee': "Tennessee's tornado risk, humid summers, and cold mountain winters demand a home that performs in every season. ICF concrete walls give you storm resilience and the insulation to keep energy bills low year-round.",
  'texas': "Texas' extreme heat, severe storms, and tornado exposure make ICF one of the strongest building choices in the state. Lower cooling bills, insurance discounts, and concrete-core durability mean Texas ICF homeowners save from day one.",
  'utah': "Utah's dry heat, cold winters, and wildfire risk in the mountain foothills make ICF a practical year-round choice. Concrete walls handle temperature extremes and fire exposure while keeping energy costs noticeably lower.",
  'vermont': "Vermont's long winters, heavy snow, and high heating costs make your home's insulation the most important decision in the build. ICF walls deliver airtight concrete construction that keeps heating bills dramatically lower and maintenance near zero.",
  'virginia': "Virginia's coastal storms, humid summers, and cold mountain winters create year-round weather challenges. ICF concrete walls deliver energy savings in every season and the resilience to handle hurricanes, severe storms, and everything in between.",
  'washington': "Washington's earthquake risk, heavy rainfall, and wildfire exposure make ICF a strong choice for the Pacific Northwest. Concrete-core walls handle seismic events, resist moisture, and keep energy bills low through the long rainy season.",
  'west-virginia': "West Virginia's cold winters, mountain weather, and rising energy costs make ICF a smart investment for long-term comfort. Airtight concrete walls keep heating bills low and stand up to the storms and moisture that challenge homes in the Appalachian climate.",
  'wisconsin': "Wisconsin's subzero winters, lake-effect snow, and high heating costs make ICF one of the best building choices in the upper Midwest. Concrete walls with continuous insulation keep heat in and energy bills dramatically lower.",
  'wyoming': "Wyoming's extreme cold, relentless wind, and wide-open exposure make energy efficiency critical for any new build. ICF walls block the wind, hold in warmth, and cut heating costs in one of the harshest climates in the lower 48.",
};

// ─── Per-state cost data ─────────────────────────────────────────────────
// wallCostLow/High: ICF wall $/sqft range
// woodWallLow/High: wood frame wall $/sqft range
// totalBuildIcf/Wood: total home cost for a ~2,500 sq ft home
// energySavings: annual energy savings range
// insuranceSavings: annual insurance savings (0 if not applicable)
// maintenanceSavings: annual maintenance savings
// annualSavingsLow/High: total annual savings
// lifetimeSavings: 30-year savings estimate
// energyPct: "50-70%" or "40-60%" energy bill reduction
// netCost15Icf/Wood: net cost after 15 years (build + operating)
const COST_DATA = {
  'alabama': {
    wallLow: 150, wallHigh: 210, woodLow: 115, woodHigh: 160,
    totalIcfLow: '375K', totalIcfHigh: '525K', totalWoodLow: '350K', totalWoodHigh: '475K',
    energyLow: 1400, energyHigh: 2400, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1500, annualLow: 3100, annualHigh: 6900,
    lifetime: '90K+', energyPct: '50-70%',
    netIcfLow: '400K', netIcfHigh: '545K', netWoodLow: '440K', netWoodHigh: '600K',
    exampleCity1: 'Birmingham', exampleCity2: 'Mobile',
  },
  'alaska': {
    wallLow: 175, wallHigh: 250, woodLow: 140, woodHigh: 200,
    totalIcfLow: '450K', totalIcfHigh: '625K', totalWoodLow: '425K', totalWoodHigh: '575K',
    energyLow: 2000, energyHigh: 3500, insuranceLow: 0, insuranceHigh: 0,
    maintLow: 600, maintHigh: 1400, annualLow: 2600, annualHigh: 4900,
    lifetime: '75K+', energyPct: '40-60%',
    netIcfLow: '475K', netIcfHigh: '650K', netWoodLow: '500K', netWoodHigh: '660K',
    exampleCity1: 'Anchorage', exampleCity2: 'Fairbanks',
  },
  'arizona': {
    wallLow: 160, wallHigh: 230, woodLow: 125, woodHigh: 175,
    totalIcfLow: '400K', totalIcfHigh: '575K', totalWoodLow: '375K', totalWoodHigh: '525K',
    energyLow: 1800, energyHigh: 3200, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5000,
    lifetime: '70K+', energyPct: '50-70%',
    netIcfLow: '425K', netIcfHigh: '600K', netWoodLow: '450K', netWoodHigh: '620K',
    exampleCity1: 'Phoenix', exampleCity2: 'Tucson',
  },
  'arkansas': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1200, energyHigh: 2200, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2300, annualHigh: 5000,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '395K', netWoodHigh: '540K',
    exampleCity1: 'Little Rock', exampleCity2: 'Fayetteville',
  },
  'california': {
    wallLow: 200, wallHigh: 300, woodLow: 165, woodHigh: 250,
    totalIcfLow: '525K', totalIcfHigh: '750K', totalWoodLow: '500K', totalWoodHigh: '700K',
    energyLow: 1500, energyHigh: 2800, insuranceLow: 500, insuranceHigh: 2000,
    maintLow: 700, maintHigh: 1500, annualLow: 2700, annualHigh: 6300,
    lifetime: '80K+', energyPct: '40-60%',
    netIcfLow: '555K', netIcfHigh: '780K', netWoodLow: '575K', netWoodHigh: '800K',
    exampleCity1: 'Los Angeles', exampleCity2: 'San Francisco',
  },
  'colorado': {
    wallLow: 175, wallHigh: 245, woodLow: 140, woodHigh: 195,
    totalIcfLow: '425K', totalIcfHigh: '610K', totalWoodLow: '400K', totalWoodHigh: '560K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '450K', netIcfHigh: '635K', netWoodLow: '465K', netWoodHigh: '640K',
    exampleCity1: 'Denver', exampleCity2: 'Colorado Springs',
  },
  'connecticut': {
    wallLow: 180, wallHigh: 255, woodLow: 145, woodHigh: 205,
    totalIcfLow: '450K', totalIcfHigh: '640K', totalWoodLow: '425K', totalWoodHigh: '590K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1400, annualLow: 2200, annualHigh: 4700,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '475K', netIcfHigh: '665K', netWoodLow: '490K', netWoodHigh: '670K',
    exampleCity1: 'Hartford', exampleCity2: 'New Haven',
  },
  'delaware': {
    wallLow: 165, wallHigh: 230, woodLow: 130, woodHigh: 180,
    totalIcfLow: '415K', totalIcfHigh: '575K', totalWoodLow: '390K', totalWoodHigh: '525K',
    energyLow: 1300, energyHigh: 2400, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5200,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '440K', netIcfHigh: '600K', netWoodLow: '455K', netWoodHigh: '610K',
    exampleCity1: 'Wilmington', exampleCity2: 'Dover',
  },
  'georgia': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 165,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '500K',
    energyLow: 1500, energyHigh: 2500, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1600, annualLow: 3200, annualHigh: 7100,
    lifetime: '95K+', energyPct: '50-70%',
    netIcfLow: '415K', netIcfHigh: '570K', netWoodLow: '455K', netWoodHigh: '620K',
    exampleCity1: 'Atlanta', exampleCity2: 'Savannah',
  },
  'hawaii': {
    wallLow: 210, wallHigh: 310, woodLow: 175, woodHigh: 260,
    totalIcfLow: '550K', totalIcfHigh: '775K', totalWoodLow: '525K', totalWoodHigh: '725K',
    energyLow: 2000, energyHigh: 3500, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 800, maintHigh: 1800, annualLow: 3800, annualHigh: 8300,
    lifetime: '115K+', energyPct: '50-70%',
    netIcfLow: '575K', netIcfHigh: '800K', netWoodLow: '610K', netWoodHigh: '840K',
    exampleCity1: 'Honolulu', exampleCity2: 'Maui',
  },
  'idaho': {
    wallLow: 155, wallHigh: 215, woodLow: 120, woodHigh: 170,
    totalIcfLow: '390K', totalIcfHigh: '540K', totalWoodLow: '365K', totalWoodHigh: '500K',
    energyLow: 1400, energyHigh: 2400, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2000, annualHigh: 4200,
    lifetime: '60K+', energyPct: '40-60%',
    netIcfLow: '415K', netIcfHigh: '565K', netWoodLow: '425K', netWoodHigh: '570K',
    exampleCity1: 'Boise', exampleCity2: 'Idaho Falls',
  },
  'illinois': {
    wallLow: 160, wallHigh: 230, woodLow: 125, woodHigh: 180,
    totalIcfLow: '400K', totalIcfHigh: '575K', totalWoodLow: '375K', totalWoodHigh: '525K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1400, annualLow: 2500, annualHigh: 5400,
    lifetime: '75K+', energyPct: '40-60%',
    netIcfLow: '425K', netIcfHigh: '600K', netWoodLow: '445K', netWoodHigh: '615K',
    exampleCity1: 'Chicago', exampleCity2: 'Springfield',
  },
  'indiana': {
    wallLow: 145, wallHigh: 200, woodLow: 110, woodHigh: 155,
    totalIcfLow: '365K', totalIcfHigh: '500K', totalWoodLow: '340K', totalWoodHigh: '460K',
    energyLow: 1200, energyHigh: 2200, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2300, annualHigh: 5000,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '385K', netIcfHigh: '520K', netWoodLow: '405K', netWoodHigh: '540K',
    exampleCity1: 'Indianapolis', exampleCity2: 'Fort Wayne',
  },
  'iowa': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5100,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '395K', netWoodHigh: '535K',
    exampleCity1: 'Des Moines', exampleCity2: 'Cedar Rapids',
  },
  'kansas': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 500, insuranceHigh: 2000,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5600,
    lifetime: '75K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '395K', netWoodHigh: '545K',
    exampleCity1: 'Wichita', exampleCity2: 'Kansas City',
  },
  'kentucky': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 155,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '455K',
    energyLow: 1200, energyHigh: 2200, insuranceLow: 0, insuranceHigh: 1000,
    maintLow: 600, maintHigh: 1300, annualLow: 1800, annualHigh: 4500,
    lifetime: '55K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '385K', netWoodHigh: '525K',
    exampleCity1: 'Louisville', exampleCity2: 'Lexington',
  },
  'louisiana': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 165,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '500K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 1200, insuranceHigh: 3500,
    maintLow: 700, maintHigh: 1600, annualLow: 3400, annualHigh: 7700,
    lifetime: '100K+', energyPct: '50-70%',
    netIcfLow: '415K', netIcfHigh: '570K', netWoodLow: '460K', netWoodHigh: '630K',
    exampleCity1: 'New Orleans', exampleCity2: 'Baton Rouge',
  },
  'maine': {
    wallLow: 170, wallHigh: 240, woodLow: 135, woodHigh: 190,
    totalIcfLow: '425K', totalIcfHigh: '600K', totalWoodLow: '400K', totalWoodHigh: '555K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2200, annualHigh: 4600,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '450K', netIcfHigh: '625K', netWoodLow: '465K', netWoodHigh: '635K',
    exampleCity1: 'Portland', exampleCity2: 'Bangor',
  },
  'maryland': {
    wallLow: 175, wallHigh: 250, woodLow: 140, woodHigh: 200,
    totalIcfLow: '440K', totalIcfHigh: '625K', totalWoodLow: '415K', totalWoodHigh: '575K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1400, annualLow: 2500, annualHigh: 5400,
    lifetime: '75K+', energyPct: '40-60%',
    netIcfLow: '465K', netIcfHigh: '650K', netWoodLow: '480K', netWoodHigh: '660K',
    exampleCity1: 'Baltimore', exampleCity2: 'Annapolis',
  },
  'massachusetts': {
    wallLow: 185, wallHigh: 265, woodLow: 150, woodHigh: 215,
    totalIcfLow: '465K', totalIcfHigh: '660K', totalWoodLow: '440K', totalWoodHigh: '610K',
    energyLow: 1700, energyHigh: 3000, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1400, annualLow: 2300, annualHigh: 4900,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '490K', netIcfHigh: '685K', netWoodLow: '505K', netWoodHigh: '695K',
    exampleCity1: 'Boston', exampleCity2: 'Worcester',
  },
  'michigan': {
    wallLow: 150, wallHigh: 210, woodLow: 115, woodHigh: 165,
    totalIcfLow: '375K', totalIcfHigh: '525K', totalWoodLow: '350K', totalWoodHigh: '480K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2000, annualHigh: 4300,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '400K', netIcfHigh: '550K', netWoodLow: '410K', netWoodHigh: '555K',
    exampleCity1: 'Detroit', exampleCity2: 'Grand Rapids',
  },
  'minnesota': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 175,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '505K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2200, annualHigh: 4600,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '415K', netIcfHigh: '575K', netWoodLow: '425K', netWoodHigh: '580K',
    exampleCity1: 'Minneapolis', exampleCity2: 'Duluth',
  },
  'mississippi': {
    wallLow: 145, wallHigh: 200, woodLow: 110, woodHigh: 155,
    totalIcfLow: '365K', totalIcfHigh: '500K', totalWoodLow: '340K', totalWoodHigh: '460K',
    energyLow: 1400, energyHigh: 2400, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1500, annualLow: 3100, annualHigh: 6900,
    lifetime: '90K+', energyPct: '50-70%',
    netIcfLow: '385K', netIcfHigh: '520K', netWoodLow: '425K', netWoodHigh: '575K',
    exampleCity1: 'Jackson', exampleCity2: 'Gulfport',
  },
  'missouri': {
    wallLow: 145, wallHigh: 200, woodLow: 110, woodHigh: 155,
    totalIcfLow: '365K', totalIcfHigh: '500K', totalWoodLow: '340K', totalWoodHigh: '460K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5100,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '385K', netIcfHigh: '520K', netWoodLow: '405K', netWoodHigh: '540K',
    exampleCity1: 'Kansas City', exampleCity2: 'St. Louis',
  },
  'montana': {
    wallLow: 160, wallHigh: 230, woodLow: 125, woodHigh: 180,
    totalIcfLow: '400K', totalIcfHigh: '575K', totalWoodLow: '375K', totalWoodHigh: '530K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '425K', netIcfHigh: '600K', netWoodLow: '440K', netWoodHigh: '610K',
    exampleCity1: 'Billings', exampleCity2: 'Missoula',
  },
  'nebraska': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5100,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '395K', netWoodHigh: '535K',
    exampleCity1: 'Omaha', exampleCity2: 'Lincoln',
  },
  'nevada': {
    wallLow: 160, wallHigh: 230, woodLow: 125, woodHigh: 175,
    totalIcfLow: '400K', totalIcfHigh: '575K', totalWoodLow: '375K', totalWoodHigh: '525K',
    energyLow: 1800, energyHigh: 3200, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5000,
    lifetime: '70K+', energyPct: '50-70%',
    netIcfLow: '425K', netIcfHigh: '600K', netWoodLow: '445K', netWoodHigh: '615K',
    exampleCity1: 'Las Vegas', exampleCity2: 'Reno',
  },
  'new-hampshire': {
    wallLow: 170, wallHigh: 240, woodLow: 135, woodHigh: 190,
    totalIcfLow: '425K', totalIcfHigh: '600K', totalWoodLow: '400K', totalWoodHigh: '555K',
    energyLow: 1500, energyHigh: 2700, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4500,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '450K', netIcfHigh: '625K', netWoodLow: '462K', netWoodHigh: '630K',
    exampleCity1: 'Manchester', exampleCity2: 'Nashua',
  },
  'new-jersey': {
    wallLow: 190, wallHigh: 270, woodLow: 155, woodHigh: 220,
    totalIcfLow: '475K', totalIcfHigh: '675K', totalWoodLow: '450K', totalWoodHigh: '625K',
    energyLow: 1500, energyHigh: 2700, insuranceLow: 500, insuranceHigh: 2000,
    maintLow: 700, maintHigh: 1500, annualLow: 2700, annualHigh: 6200,
    lifetime: '80K+', energyPct: '40-60%',
    netIcfLow: '500K', netIcfHigh: '700K', netWoodLow: '520K', netWoodHigh: '720K',
    exampleCity1: 'Newark', exampleCity2: 'Jersey City',
  },
  'new-mexico': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 170,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '505K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '50-70%',
    netIcfLow: '415K', netIcfHigh: '575K', netWoodLow: '425K', netWoodHigh: '580K',
    exampleCity1: 'Albuquerque', exampleCity2: 'Santa Fe',
  },
  'new-york': {
    wallLow: 185, wallHigh: 265, woodLow: 150, woodHigh: 215,
    totalIcfLow: '465K', totalIcfHigh: '660K', totalWoodLow: '440K', totalWoodHigh: '610K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1400, annualLow: 2700, annualHigh: 5700,
    lifetime: '80K+', energyPct: '40-60%',
    netIcfLow: '490K', netIcfHigh: '685K', netWoodLow: '510K', netWoodHigh: '700K',
    exampleCity1: 'New York City', exampleCity2: 'Buffalo',
  },
  'north-carolina': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 165,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '500K',
    energyLow: 1400, energyHigh: 2400, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1500, annualLow: 3100, annualHigh: 6900,
    lifetime: '90K+', energyPct: '50-70%',
    netIcfLow: '415K', netIcfHigh: '570K', netWoodLow: '455K', netWoodHigh: '620K',
    exampleCity1: 'Charlotte', exampleCity2: 'Raleigh',
  },
  'north-dakota': {
    wallLow: 155, wallHigh: 215, woodLow: 120, woodHigh: 170,
    totalIcfLow: '390K', totalIcfHigh: '540K', totalWoodLow: '365K', totalWoodHigh: '500K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2200, annualHigh: 4600,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '415K', netIcfHigh: '565K', netWoodLow: '425K', netWoodHigh: '570K',
    exampleCity1: 'Fargo', exampleCity2: 'Bismarck',
  },
  'ohio': {
    wallLow: 150, wallHigh: 210, woodLow: 115, woodHigh: 165,
    totalIcfLow: '375K', totalIcfHigh: '525K', totalWoodLow: '350K', totalWoodHigh: '480K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1300, annualLow: 2400, annualHigh: 5100,
    lifetime: '70K+', energyPct: '40-60%',
    netIcfLow: '400K', netIcfHigh: '550K', netWoodLow: '415K', netWoodHigh: '560K',
    exampleCity1: 'Columbus', exampleCity2: 'Cleveland',
  },
  'oklahoma': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 800, insuranceHigh: 2500,
    maintLow: 600, maintHigh: 1300, annualLow: 2700, annualHigh: 6100,
    lifetime: '80K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '400K', netWoodHigh: '550K',
    exampleCity1: 'Oklahoma City', exampleCity2: 'Tulsa',
  },
  'oregon': {
    wallLow: 175, wallHigh: 250, woodLow: 140, woodHigh: 200,
    totalIcfLow: '440K', totalIcfHigh: '625K', totalWoodLow: '415K', totalWoodHigh: '575K',
    energyLow: 1300, energyHigh: 2400, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 1900, annualHigh: 4200,
    lifetime: '60K+', energyPct: '40-60%',
    netIcfLow: '465K', netIcfHigh: '650K', netWoodLow: '475K', netWoodHigh: '650K',
    exampleCity1: 'Portland', exampleCity2: 'Eugene',
  },
  'pennsylvania': {
    wallLow: 165, wallHigh: 235, woodLow: 130, woodHigh: 185,
    totalIcfLow: '415K', totalIcfHigh: '590K', totalWoodLow: '390K', totalWoodHigh: '540K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1400, annualLow: 2000, annualHigh: 4400,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '440K', netIcfHigh: '615K', netWoodLow: '450K', netWoodHigh: '615K',
    exampleCity1: 'Philadelphia', exampleCity2: 'Pittsburgh',
  },
  'rhode-island': {
    wallLow: 180, wallHigh: 255, woodLow: 145, woodHigh: 205,
    totalIcfLow: '450K', totalIcfHigh: '640K', totalWoodLow: '425K', totalWoodHigh: '590K',
    energyLow: 1500, energyHigh: 2700, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1400, annualLow: 2600, annualHigh: 5600,
    lifetime: '80K+', energyPct: '40-60%',
    netIcfLow: '475K', netIcfHigh: '665K', netWoodLow: '490K', netWoodHigh: '675K',
    exampleCity1: 'Providence', exampleCity2: 'Newport',
  },
  'south-carolina': {
    wallLow: 155, wallHigh: 215, woodLow: 120, woodHigh: 165,
    totalIcfLow: '390K', totalIcfHigh: '540K', totalWoodLow: '365K', totalWoodHigh: '495K',
    energyLow: 1400, energyHigh: 2400, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1500, annualLow: 3100, annualHigh: 6900,
    lifetime: '90K+', energyPct: '50-70%',
    netIcfLow: '415K', netIcfHigh: '560K', netWoodLow: '450K', netWoodHigh: '610K',
    exampleCity1: 'Charleston', exampleCity2: 'Myrtle Beach',
  },
  'south-dakota': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2000, annualHigh: 4300,
    lifetime: '60K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '380K', netWoodHigh: '515K',
    exampleCity1: 'Sioux Falls', exampleCity2: 'Rapid City',
  },
  'tennessee': {
    wallLow: 145, wallHigh: 200, woodLow: 110, woodHigh: 155,
    totalIcfLow: '365K', totalIcfHigh: '500K', totalWoodLow: '340K', totalWoodHigh: '460K',
    energyLow: 1200, energyHigh: 2200, insuranceLow: 0, insuranceHigh: 1000,
    maintLow: 600, maintHigh: 1300, annualLow: 1800, annualHigh: 4500,
    lifetime: '55K+', energyPct: '40-60%',
    netIcfLow: '385K', netIcfHigh: '520K', netWoodLow: '400K', netWoodHigh: '535K',
    exampleCity1: 'Nashville', exampleCity2: 'Memphis',
  },
  'texas': {
    wallLow: 150, wallHigh: 215, woodLow: 115, woodHigh: 165,
    totalIcfLow: '375K', totalIcfHigh: '540K', totalWoodLow: '350K', totalWoodHigh: '490K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 1000, insuranceHigh: 3000,
    maintLow: 700, maintHigh: 1500, annualLow: 3300, annualHigh: 7300,
    lifetime: '100K+', energyPct: '50-70%',
    netIcfLow: '400K', netIcfHigh: '560K', netWoodLow: '445K', netWoodHigh: '615K',
    exampleCity1: 'Houston', exampleCity2: 'Dallas',
  },
  'utah': {
    wallLow: 160, wallHigh: 230, woodLow: 125, woodHigh: 175,
    totalIcfLow: '400K', totalIcfHigh: '575K', totalWoodLow: '375K', totalWoodHigh: '525K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '50-70%',
    netIcfLow: '425K', netIcfHigh: '600K', netWoodLow: '440K', netWoodHigh: '610K',
    exampleCity1: 'Salt Lake City', exampleCity2: 'Provo',
  },
  'vermont': {
    wallLow: 170, wallHigh: 240, woodLow: 135, woodHigh: 190,
    totalIcfLow: '425K', totalIcfHigh: '600K', totalWoodLow: '400K', totalWoodHigh: '555K',
    energyLow: 1600, energyHigh: 2800, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2200, annualHigh: 4600,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '450K', netIcfHigh: '625K', netWoodLow: '465K', netWoodHigh: '635K',
    exampleCity1: 'Burlington', exampleCity2: 'Montpelier',
  },
  'virginia': {
    wallLow: 165, wallHigh: 235, woodLow: 130, woodHigh: 185,
    totalIcfLow: '415K', totalIcfHigh: '590K', totalWoodLow: '390K', totalWoodHigh: '540K',
    energyLow: 1400, energyHigh: 2500, insuranceLow: 500, insuranceHigh: 1500,
    maintLow: 600, maintHigh: 1400, annualLow: 2500, annualHigh: 5400,
    lifetime: '75K+', energyPct: '40-60%',
    netIcfLow: '440K', netIcfHigh: '615K', netWoodLow: '455K', netWoodHigh: '625K',
    exampleCity1: 'Virginia Beach', exampleCity2: 'Richmond',
  },
  'washington': {
    wallLow: 185, wallHigh: 260, woodLow: 150, woodHigh: 210,
    totalIcfLow: '465K', totalIcfHigh: '650K', totalWoodLow: '440K', totalWoodHigh: '600K',
    energyLow: 1300, energyHigh: 2400, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 1900, annualHigh: 4200,
    lifetime: '60K+', energyPct: '40-60%',
    netIcfLow: '490K', netIcfHigh: '675K', netWoodLow: '500K', netWoodHigh: '680K',
    exampleCity1: 'Seattle', exampleCity2: 'Spokane',
  },
  'west-virginia': {
    wallLow: 140, wallHigh: 195, woodLow: 110, woodHigh: 150,
    totalIcfLow: '350K', totalIcfHigh: '490K', totalWoodLow: '325K', totalWoodHigh: '450K',
    energyLow: 1300, energyHigh: 2300, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 1900, annualHigh: 4100,
    lifetime: '60K+', energyPct: '40-60%',
    netIcfLow: '370K', netIcfHigh: '510K', netWoodLow: '380K', netWoodHigh: '515K',
    exampleCity1: 'Charleston', exampleCity2: 'Morgantown',
  },
  'wisconsin': {
    wallLow: 150, wallHigh: 210, woodLow: 115, woodHigh: 165,
    totalIcfLow: '375K', totalIcfHigh: '525K', totalWoodLow: '350K', totalWoodHigh: '480K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '400K', netIcfHigh: '550K', netWoodLow: '410K', netWoodHigh: '555K',
    exampleCity1: 'Milwaukee', exampleCity2: 'Madison',
  },
  'wyoming': {
    wallLow: 155, wallHigh: 220, woodLow: 120, woodHigh: 175,
    totalIcfLow: '390K', totalIcfHigh: '550K', totalWoodLow: '365K', totalWoodHigh: '505K',
    energyLow: 1500, energyHigh: 2600, insuranceLow: 0, insuranceHigh: 500,
    maintLow: 600, maintHigh: 1300, annualLow: 2100, annualHigh: 4400,
    lifetime: '65K+', energyPct: '40-60%',
    netIcfLow: '415K', netIcfHigh: '575K', netWoodLow: '425K', netWoodHigh: '580K',
    exampleCity1: 'Cheyenne', exampleCity2: 'Casper',
  },
};

// ─── Climate-specific comparison table rows ──────────────────────────────
// Hurricane/coastal states get hurricane resistance row; tornado states get tornado row; etc.
function getResilienceRow(climate, name) {
  switch (climate) {
    case 'HURRICANE':
      return `                <tr>
                  <td>Hurricane resistance</td>
                  <td class="col-icf win">200+ mph rated</td>
                  <td>Meets minimum code</td>
                  <td class="win">ICF</td>
                </tr>`;
    case 'TORNADO':
      return `                <tr>
                  <td>Severe storm resistance</td>
                  <td class="col-icf win">Tornado-rated concrete walls</td>
                  <td>Meets minimum code</td>
                  <td class="win">ICF</td>
                </tr>`;
    case 'COLD':
      return `                <tr>
                  <td>Extreme cold performance</td>
                  <td class="col-icf win">Continuous insulation, zero thermal bridging</td>
                  <td>Standard insulation with thermal bridging</td>
                  <td class="win">ICF</td>
                </tr>`;
    case 'HOT_DRY':
      return `                <tr>
                  <td>Heat and fire resistance</td>
                  <td class="col-icf win">Thermal mass + 4-hour fire rating</td>
                  <td>Combustible, minimal thermal mass</td>
                  <td class="win">ICF</td>
                </tr>`;
    case 'PACIFIC':
      return `                <tr>
                  <td>Seismic and fire resistance</td>
                  <td class="col-icf win">Reinforced concrete, non-combustible</td>
                  <td>Meets minimum seismic code</td>
                  <td class="win">ICF</td>
                </tr>`;
    case 'MIXED':
      return `                <tr>
                  <td>All-season durability</td>
                  <td class="col-icf win">Concrete walls handle every extreme</td>
                  <td>Meets minimum code</td>
                  <td class="win">ICF</td>
                </tr>`;
  }
}

// Savings label varies by climate
function getSavingsLabel(climate) {
  if (climate === 'HURRICANE' || climate === 'HOT_DRY') return 'lower cooling bills';
  if (climate === 'COLD') return 'lower heating bills';
  return 'lower energy bills';
}

function getMaintenanceLabel(climate) {
  if (climate === 'HURRICANE') return 'no rot, no termites, no mold';
  if (climate === 'COLD') return 'no rot, minimal exterior maintenance';
  if (climate === 'HOT_DRY') return 'no rot, no termites, minimal upkeep';
  return 'no rot, reduced maintenance';
}

// Convert "90K+" to "90,000+", "100K+" to "100,000+", "115K+" to "115,000+"
function formatLifetime(val) {
  const m = val.match(/^(\d+)K\+$/);
  if (!m) return val;
  return Number(m[1] * 1000).toLocaleString() + '+';
}

function getInsuranceLabel(climate) {
  if (climate === 'HURRICANE') return 'concrete construction discounts';
  if (climate === 'TORNADO') return 'storm-resistant construction discounts';
  return 'concrete/resilient construction credits';
}

// ─── Parse existing cost page ────────────────────────────────────────────
function parseExistingPage(html) {
  const result = {};

  // Hero intro paragraph
  const heroMatch = html.match(/<p class="page-hero-intro"[^>]*>([\s\S]*?)<\/p>/);
  result.heroIntro = heroMatch ? heroMatch[1].trim() : '';

  // Labor availability card
  const laborMatch = html.match(/<div class="factor-item">\s*<h3>Labor Availability<\/h3>\s*<p>([\s\S]*?)<\/p>/);
  result.laborCard = laborMatch ? laborMatch[1].trim() : '';

  // Local code card
  const codeMatch = html.match(/<div class="factor-item">\s*<h3>Local Code and Engineering<\/h3>\s*<p>([\s\S]*?)<\/p>/);
  result.codeCard = codeMatch ? codeMatch[1].trim() : '';

  // "Why It Makes Sense" section paragraphs
  const whyMatch = html.match(/<section id="worth-it"[\s\S]*?<h2>[^<]*<\/h2>\s*([\s\S]*?)<\/section>/);
  if (whyMatch) {
    const pMatches = whyMatch[1].match(/<p>([\s\S]*?)<\/p>/g);
    result.whyParagraphs = pMatches ? pMatches.map(p => p.replace(/<\/?p>/g, '').trim()) : [];
  } else {
    result.whyParagraphs = [];
  }

  // FAQ cards
  const faqSection = html.match(/<section id="faq"[\s\S]*?<div class="faq-list">([\s\S]*?)<\/div>\s*<\/section>/);
  result.faqs = [];
  if (faqSection) {
    const faqCards = faqSection[1].match(/<div class="faq-card">[\s\S]*?<\/div>/g);
    if (faqCards) {
      for (const card of faqCards) {
        const qMatch = card.match(/<h3>([\s\S]*?)<\/h3>/);
        const aMatch = card.match(/<p>([\s\S]*?)<\/p>/);
        if (qMatch && aMatch) {
          result.faqs.push({ q: qMatch[1].trim(), a: aMatch[1].trim() });
        }
      }
    }
  }

  return result;
}

// ─── Slug to display name ────────────────────────────────────────────────
function slugToName(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── Generate page ───────────────────────────────────────────────────────
function generateCostPage(slug) {
  const name = slugToName(slug);
  const climate = CLIMATE[slug];
  const d = COST_DATA[slug];
  if (!d) throw new Error(`No cost data for ${slug}`);

  const existingPath = path.join(__dirname, 'states', slug, 'cost.html');
  if (!fs.existsSync(existingPath)) throw new Error(`No existing cost page for ${slug}`);
  const existing = parseExistingPage(fs.readFileSync(existingPath, 'utf8'));

  const cleanEm = s => s
    .replace(/—/g, ' -')
    .replace(/payback/gi, 'savings')
    .replace(/recover the premium/gi, 'offset the investment')
    .replace(/pay back/gi, 'offset');

  const heroIntro = HERO_INTRO[slug] || cleanEm(existing.heroIntro);

  const laborText = cleanEm(existing.laborCard);
  const codeText = cleanEm(existing.codeCard);
  const whyParas = existing.whyParagraphs.map(cleanEm);
  const faqs = existing.faqs.map(f => ({ q: cleanEm(f.q), a: cleanEm(f.a) }));

  // Build 5 FAQs: keep existing 3, add 2 more
  const allFaqs = [...faqs];

  // Add insurance FAQ if the state has insurance savings
  if (d.insuranceLow > 0 && !faqs.some(f => f.q.toLowerCase().includes('insurance'))) {
    allFaqs.push({
      q: `Does an ICF home lower insurance costs in ${name}?`,
      a: `In many cases, yes. Insurers recognize concrete construction as more resilient and frequently offer premium discounts. ${name} homeowners have reported savings of $${d.insuranceLow.toLocaleString()}-$${d.insuranceHigh.toLocaleString()} per year compared to equivalent wood-frame homes. Ask your insurer specifically about concrete construction discounts.`
    });
  } else if (!faqs.some(f => f.q.toLowerCase().includes('energy') || f.q.toLowerCase().includes('save'))) {
    allFaqs.push({
      q: `How much can I save on energy with an ICF home in ${name}?`,
      a: `${name} ICF homeowners typically save ${d.energyPct} on heating and cooling costs compared to wood-frame homes. That translates to roughly $${d.energyLow.toLocaleString()}-$${d.energyHigh.toLocaleString()} per year in energy savings alone, starting the day you move in.`
    });
  }

  // Add contractor/location FAQ if not already covered
  if (!faqs.some(f => f.q.toLowerCase().includes('where') || f.q.toLowerCase().includes('popular') || f.q.toLowerCase().includes('common in'))) {
    allFaqs.push({
      q: `Where in ${name} is ICF most popular?`,
      a: `ICF is used throughout ${name}, with the most active markets around ${d.exampleCity1} and ${d.exampleCity2}. Your best path to accurate local pricing is connecting with an ICF contractor who works in your specific area.`
    });
  } else if (!faqs.some(f => f.q.toLowerCase().includes('long-term') || f.q.toLowerCase().includes('lifetime') || f.q.toLowerCase().includes('30 year'))) {
    allFaqs.push({
      q: `What are the long-term savings of an ICF home in ${name}?`,
      a: `Over 30 years, the total financial advantage of owning an ICF home in ${name} can exceed $${d.lifetime.replace('+', '')}. That includes energy savings of ${d.energyPct}${d.insuranceLow > 0 ? ', insurance discounts' : ''}, and dramatically lower maintenance costs compared to wood-frame construction.`
    });
  }

  // Ensure we have exactly 5
  while (allFaqs.length < 5) {
    if (!allFaqs.some(f => f.q.toLowerCase().includes('long-term') || f.q.toLowerCase().includes('lifetime'))) {
      allFaqs.push({
        q: `What are the long-term savings of an ICF home in ${name}?`,
        a: `Over 30 years, the total financial advantage of owning an ICF home in ${name} can exceed $${d.lifetime.replace('+', '')}. Combined annual savings of $${d.annualLow.toLocaleString()}-$${d.annualHigh.toLocaleString()} add up to real wealth over the life of the home.`
      });
    } else {
      allFaqs.push({
        q: `How do I find a qualified ICF contractor in ${name}?`,
        a: `ICF Insider connects you with experienced ICF contractors in ${name}. Look for contractors who have completed multiple ICF projects, can provide references, and are familiar with ${name}'s specific building code requirements.`
      });
    }
  }
  const finalFaqs = allFaqs.slice(0, 5);

  // Build FAQ schema
  const faqSchemaEntries = finalFaqs.map(f =>
    `          {
            "@type": "Question",
            "name": ${JSON.stringify(f.q)},
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} }
          }`
  ).join(',\n');

  // Build FAQ HTML
  const faqHtml = finalFaqs.map(f =>
    `            <div class="faq-card">
              <h3>${f.q}</h3>
              <p>${f.a}</p>
            </div>`
  ).join('\n');

  // Insurance row in comparison table
  const hasInsurance = d.insuranceLow > 0;
  const insuranceRow = hasInsurance ? `
                <tr>
                  <td>Annual homeowner insurance</td>
                  <td class="col-icf win">Concrete construction discounts</td>
                  <td>Standard wood-frame rates</td>
                  <td class="win">ICF</td>
                </tr>` : '';

  // Build insurance savings card (only if applicable)
  const insuranceSavingsCard = hasInsurance ? `
            <div class="savings-card">
              <span class="savings-number">$${d.insuranceLow.toLocaleString()} - $${d.insuranceHigh.toLocaleString()}</span>
              <span class="savings-label">Annual insurance savings<br>(${getInsuranceLabel(climate)})</span>
            </div>` : '';

  // "Why" section: use extracted paragraphs, expanded
  const whyHtml = whyParas.length > 0
    ? whyParas.map(p => `          <p>${p}</p>`).join('\n')
    : `          <p>${name} homeowners choose ICF for its combination of resilience, energy efficiency, and long-term savings. The upfront investment leads to lower operating costs every year.</p>`;

  // Comparison table disclaimer varies by climate
  const tableDisclaimer = climate === 'HURRICANE'
    ? `Estimates based on 2025-2026 ${name} market data. Energy savings assume typical ${name} cooling loads. Insurance figures reflect coastal and near-coastal ${name} counties where discounts for concrete construction are most significant. Your numbers will vary by location.`
    : climate === 'COLD'
    ? `Estimates based on 2025-2026 ${name} market data. Energy savings assume typical ${name} heating loads. Your numbers will vary by location, design, and utility rates.`
    : `Estimates based on 2025-2026 ${name} market data. Energy savings assume typical ${name} climate conditions. Your numbers will vary by location, design, and utility rates.`;

  // Breakdown card 4: engineering note varies
  const engineeringNote = climate === 'HURRICANE'
    ? `${name}'s wind code requirements may mean more steel reinforcement in coastal areas. Engineering and permitting costs vary by county and wind zone.`
    : climate === 'PACIFIC'
    ? `Seismic design requirements in ${name} add engineering complexity. Coastal and wildfire interface zones may require additional review. Budget varies by location and design.`
    : climate === 'COLD'
    ? `${name} requires stamped engineering plans. Snow load, frost depth, and energy code requirements all affect engineering scope. Budget more for complex designs or remote sites.`
    : `${name} requires stamped engineering plans. Local code requirements vary by jurisdiction. Budget more for complex designs or areas with specific wind or seismic requirements.`;

  // Cost factor section: location description
  const locationFactor = climate === 'HURRICANE'
    ? `Coastal areas in ${name} typically have higher labor and concrete costs. Metro areas like ${d.exampleCity1} and ${d.exampleCity2} tend to have more competitive crew markets. Rural areas may see higher costs due to travel and limited contractor availability.`
    : climate === 'COLD'
    ? `Metro areas like ${d.exampleCity1} and ${d.exampleCity2} have the most competitive contractor markets. Remote and rural areas may see higher costs due to crew travel and material freight distances.`
    : `${d.exampleCity1} and ${d.exampleCity2} have the most active contractor markets in ${name}. Rural areas may see higher costs due to crew travel and limited local options.`;

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
  <title>How Much Does ICF Cost in ${name}? 2026 Pricing, Savings &amp; Local Pros | ICF Insider</title>
  <meta name="description" content="${name} ICF construction runs $${d.wallLow}-$${d.wallHigh}/sq ft for walls. See the full cost breakdown, ICF vs wood frame comparison, long-term savings math, and connect with local ICF contractors.">
  <link rel="canonical" href="https://icfinsider.com/states/${slug}/cost">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="article">
  <meta property="og:title" content="How Much Does ICF Cost in ${name}? 2026 Pricing &amp; Local Pros">
  <meta property="og:description" content="${name} ICF walls run $${d.wallLow}-$${d.wallHigh}/sq ft. Full cost breakdown, ICF vs wood frame comparison, and savings math for ${name} homeowners.">
  <meta property="og:url" content="https://icfinsider.com/states/${slug}/cost">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/components.css">
  <style>
    /* ── Cost page styles ───────────────────────────────── */

    .cost-snapshot {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-8);
    }
    .cost-snapshot-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: var(--space-6);
      text-align: center;
    }
    .cost-snapshot-card .cost-number {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1.1;
    }
    .cost-snapshot-card .cost-label {
      display: block;
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-top: var(--space-2);
      line-height: 1.4;
    }

    .cost-table-wrap {
      margin-top: var(--space-8);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .breakdown-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      margin-top: var(--space-8);
    }
    .breakdown-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: var(--space-6);
    }
    .breakdown-card h3 { margin: 0 0 var(--space-1); font-size: 0.95rem; font-weight: 600; }
    .breakdown-pct {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1;
      margin-bottom: var(--space-2);
    }
    .breakdown-card p { margin: 0; font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; }

    .savings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr${hasInsurance ? ' 1fr' : ''};
      gap: var(--space-4);
      margin-top: var(--space-8);
    }
    .savings-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: var(--space-6);
      text-align: center;
    }
    .savings-card .savings-number {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(1.3rem, 3.5vw, 1.8rem);
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1.1;
    }
    .savings-card .savings-label {
      display: block;
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-top: var(--space-2);
      line-height: 1.4;
    }

    .factor-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      margin-top: var(--space-8);
    }
    .factor-item {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: var(--space-6);
    }
    .factor-item h3 { margin: 0 0 var(--space-2); font-size: 1rem; }
    .factor-item p { margin: 0; font-size: 0.9rem; color: var(--color-text-mid); line-height: 1.65; }

    .mid-cta {
      margin-top: var(--space-10);
      background: var(--color-dark-900);
      border-radius: 14px;
      padding: var(--space-8);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-6);
      flex-wrap: wrap;
    }
    .mid-cta h3 { margin: 0 0 var(--space-1); color: var(--color-text-light); font-size: 1.1rem; }
    .mid-cta p  { margin: 0; color: var(--color-text-muted); font-size: 0.875rem; }

    .cta-panel {
      margin-top: var(--space-16);
      background: var(--color-dark-900);
      border-radius: 14px;
      padding: var(--space-8);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .cta-panel h2 { margin: 0 0 var(--space-3); color: var(--color-text-light); }
    .cta-panel p  { margin: 0 0 var(--space-6); color: var(--color-text-muted); max-width: 600px; }

    .faq-list { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-8); }
    .faq-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: var(--space-6) var(--space-7);
    }
    .faq-card h3 { margin: 0 0 var(--space-2); font-size: 1rem; }
    .faq-card p  { margin: 0; color: var(--color-text-mid); line-height: 1.7; }

    .disclaimer-note {
      margin-top: var(--space-6);
      padding: var(--space-5) var(--space-6);
      background: rgba(232,120,10,0.06);
      border-left: 3px solid var(--color-accent);
      border-radius: 0 8px 8px 0;
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.6;
    }

    @media (max-width: 767px) {
      .cost-snapshot    { grid-template-columns: 1fr; }
      .breakdown-grid   { grid-template-columns: 1fr; }
      .savings-grid     { grid-template-columns: 1fr; }
      .factor-list      { grid-template-columns: 1fr; }
      .mid-cta          { flex-direction: column; align-items: flex-start; }
    }
  </style>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://icfinsider.com/" },
          { "@type": "ListItem", "position": 2, "name": "${name}", "item": "https://icfinsider.com/states/${slug}/" },
          { "@type": "ListItem", "position": 3, "name": "${name} ICF Cost", "item": "https://icfinsider.com/states/${slug}/cost" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
${faqSchemaEntries}
        ]
      }
    ]
  }
  </script>
</head>
<body>

  <!-- NAV -->
  <nav class="nav" id="main-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
      <ul class="nav-links" role="list">
        <li><a href="/icf-101" class="nav-link">ICF 101</a></li>
        <li><a href="/cost-guide" class="nav-link active">Cost Guide</a></li>
        <li><a href="/brands" class="nav-link">Brand Comparison</a></li>
        <li><a href="/find-a-pro" class="nav-link">Find a Pro</a></li>
      </ul>
      <div class="nav-cta"><a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary">Find a Pro</a></div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/icf-101" class="nav-link">ICF 101</a>
    <a href="/cost-guide" class="nav-link active">Cost Guide</a>
    <a href="/brands" class="nav-link">Brand Comparison</a>
    <a href="/find-a-pro" class="nav-link">Find a Pro</a>
    <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary">Find a Pro</a>
  </div>


  <!-- HERO -->
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <div class="page-hero-meta">
        <span class="page-hero-tag"><a href="/states/${slug}/" style="color:inherit;text-decoration:none;">${name}</a></span>
        <span class="page-hero-readtime">Cost Guide</span>
      </div>
      <span class="eyebrow">Insulated Concrete Form Cost Guide</span>
      <h1 id="page-title">How Much Does ICF Cost in ${name}?</h1>
      <p class="page-hero-intro" style="max-width:620px;">
        ${cleanEm(heroIntro)}
</p>
      <div style="margin-top:var(--space-6);">
        <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary btn-lg">Get a Quote From ${name === 'Alaska' || name === 'Hawaii' ? 'a' : 'a'} ${name} ICF Pro &rarr;</a>
      </div>
    </div>
  </section>


  <!-- CONTENT -->
  <div class="container">
    <div class="content-layout">
      <article class="article" id="article">


        <!-- COST SNAPSHOT -->
        <section id="cost-snapshot">
          <span class="eyebrow">Quick Numbers</span>
          <h2 style="margin-top:var(--space-2);">${name} ICF Cost at a Glance</h2>
          <p style="color:var(--color-text-muted);max-width:580px;">
            These ranges reflect typical ${name} ICF projects in 2025-2026. Your actual cost depends on location, design, and contractor. The best way to get a real number is to talk to a local ICF pro.
          </p>

          <div class="cost-snapshot">
            <div class="cost-snapshot-card">
              <span class="cost-number">$${d.wallLow} - $${d.wallHigh}</span>
              <span class="cost-label">Per sq ft, ICF walls only<br>(materials + labor)</span>
            </div>
            <div class="cost-snapshot-card">
              <span class="cost-number">$${d.annualLow.toLocaleString()} - $${d.annualHigh.toLocaleString()}</span>
              <span class="cost-label">Saved per year<br>(energy${hasInsurance ? ' + insurance' : ''} + maintenance)</span>
            </div>
            <div class="cost-snapshot-card">
              <span class="cost-number">$${d.lifetime}</span>
              <span class="cost-label">Total savings over<br>30-year ownership</span>
            </div>
          </div>

          <div class="disclaimer-note">
            <strong>Why ranges, not exact prices?</strong> ICF pricing varies significantly by county, design complexity, and which contractor you work with. A 2,000 sq ft ranch in ${d.exampleCity2} will cost very differently than a 4,000 sq ft custom home in ${d.exampleCity1}. These ranges give you a realistic starting point, but the only way to get a number you can build a budget around is a quote from a local ICF contractor who can evaluate your specific project.
          </div>
        </section>


        <!-- ICF vs WOOD FRAME COMPARISON -->
        <section id="icf-vs-wood" style="margin-top:var(--space-16);">
          <span class="eyebrow">Side by Side</span>
          <h2 style="margin-top:var(--space-2);">ICF vs Wood Frame in ${name}: Cost Comparison</h2>
          <p style="color:var(--color-text-muted);max-width:600px;">
            The upfront investment is only one part of the story. When you account for what you save every year in energy${hasInsurance ? ', insurance,' : ''} and maintenance, the full picture looks very different. Here is how ICF and wood frame compare for a typical 2,500 sq ft ${name} home.
          </p>

          <div class="cost-table-wrap">
            <table class="comparison-table" aria-label="ICF vs wood frame cost comparison for ${name}">
              <thead>
                <tr>
                  <th>Cost Category</th>
                  <th class="col-icf">ICF Construction</th>
                  <th>Wood Frame</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wall construction (per sq ft)</td>
                  <td class="col-icf">$${d.wallLow} - $${d.wallHigh}</td>
                  <td>$${d.woodLow} - $${d.woodHigh}</td>
                  <td>Wood Frame</td>
                </tr>
                <tr>
                  <td>Total build cost (2,500 sq ft home)</td>
                  <td class="col-icf">$${d.totalIcfLow} - $${d.totalIcfHigh}</td>
                  <td>$${d.totalWoodLow} - $${d.totalWoodHigh}</td>
                  <td>Wood Frame</td>
                </tr>
                <tr>
                  <td>Annual energy costs</td>
                  <td class="col-icf win">${d.energyPct} lower</td>
                  <td>Standard rates</td>
                  <td class="win">ICF</td>
                </tr>${insuranceRow}
                <tr>
                  <td>Maintenance (10-yr avg/yr)</td>
                  <td class="col-icf win">$500 - $1,200</td>
                  <td>$1,500 - $3,000</td>
                  <td class="win">ICF</td>
                </tr>
${getResilienceRow(climate, name)}
                <tr>
                  <td>Pest and mold resistance</td>
                  <td class="col-icf win">Concrete does not rot or feed pests</td>
                  <td>Requires treatment, ongoing risk</td>
                  <td class="win">ICF</td>
                </tr>
                <tr>
                  <td>Net cost after 15 years</td>
                  <td class="col-icf win">$${d.netIcfLow} - $${d.netIcfHigh}</td>
                  <td>$${d.netWoodLow} - $${d.netWoodHigh}</td>
                  <td class="win">ICF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style="margin-top:var(--space-6);font-size:0.85rem;color:var(--color-text-muted);">
            ${tableDisclaimer}
          </p>
        </section>


        <!-- MID-PAGE CTA -->
        <div class="mid-cta">
          <div>
            <h3>Want real numbers for your project?</h3>
            <p>These are ranges. A local ${name} ICF contractor can give you an actual quote based on your plans, your lot, and your area's requirements.</p>
          </div>
          <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary" style="flex-shrink:0;">Find a Pro in ${name} &rarr;</a>
        </div>


        <!-- COST BREAKDOWN -->
        <section id="cost-breakdown" style="margin-top:var(--space-16);">
          <span class="eyebrow">Where Your Money Goes</span>
          <h2 style="margin-top:var(--space-2);">ICF Cost Breakdown in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:580px;">
            Understanding what makes up the cost helps you have a smarter conversation with your contractor. Here is roughly where the money goes on a typical ${name} ICF wall project.
          </p>

          <div class="breakdown-grid">
            <div class="breakdown-card">
              <div class="breakdown-pct">40 - 50%</div>
              <h3>ICF Blocks and Concrete</h3>
              <p>The foam forms themselves plus the concrete poured inside them. Brand choice affects pricing. Concrete costs vary by region within ${name}.</p>
            </div>
            <div class="breakdown-card">
              <div class="breakdown-pct">30 - 40%</div>
              <h3>Labor</h3>
              <p>${laborText || `ICF installation is specialized work. ${d.exampleCity1} and ${d.exampleCity2} have the most competitive crew markets. Experienced crews are faster and waste less material.`}</p>
            </div>
            <div class="breakdown-card">
              <div class="breakdown-pct">8 - 12%</div>
              <h3>Rebar and Reinforcement</h3>
              <p>Steel reinforcement inside the concrete core is what gives ICF walls their structural strength. The amount of rebar depends on your design and local code requirements.</p>
            </div>
            <div class="breakdown-card">
              <div class="breakdown-pct">5 - 10%</div>
              <h3>Engineering and Permits</h3>
              <p>${engineeringNote}</p>
            </div>
          </div>
        </section>


        <!-- WHAT AFFECTS COST -->
        <section id="cost-factors" style="margin-top:var(--space-16);">
          <span class="eyebrow">What Affects Your Price</span>
          <h2 style="margin-top:var(--space-2);">What Drives ICF Cost Up or Down in ${name}</h2>
          <p style="color:var(--color-text-muted);max-width:640px;">
            Two ${name} ICF projects can vary significantly in price. Understanding these factors helps you get the best value and have a smarter conversation with your contractor.
          </p>
          <div class="factor-list">
            <div class="factor-item">
              <h3>Your Location in ${name}</h3>
              <p>${locationFactor}</p>
            </div>
            <div class="factor-item">
              <h3>Design Complexity</h3>
              <p>A simple rectangular floor plan is the most efficient to build with ICF. Every corner, curve, and height change adds labor time. Multi-story designs cost more per square foot than single-story. If budget is tight, simplify the geometry before cutting quality.</p>
            </div>
            <div class="factor-item">
              <h3>Contractor Experience</h3>
              <p>An experienced ICF crew builds faster and wastes less material. Experienced crews in ${d.exampleCity1} and ${d.exampleCity2} often deliver better value than less experienced crews who quote lower but take longer. Ask how many ICF homes they have completed.</p>
            </div>
            <div class="factor-item">
              <h3>Code and Engineering Requirements</h3>
              <p>${codeText || `Building code requirements in ${name} vary by jurisdiction. Your contractor will tailor the build to your specific location's requirements.`}</p>
            </div>
          </div>
        </section>


        <!-- LONG-TERM SAVINGS -->
        <section id="savings" style="margin-top:var(--space-16);">
          <span class="eyebrow">Annual Savings</span>
          <h2 style="margin-top:var(--space-2);">What ${name} ICF Homeowners Save Every Year</h2>
          <p style="color:var(--color-text-muted);max-width:600px;">
            On top of building a stronger, quieter, more comfortable home, ${name} ICF homeowners spend significantly less to own it. Here is where the savings show up.
          </p>

          <div class="savings-grid">
            <div class="savings-card">
              <span class="savings-number">$${d.energyLow.toLocaleString()} - $${d.energyHigh.toLocaleString()}</span>
              <span class="savings-label">Annual energy savings<br>(${d.energyPct} ${getSavingsLabel(climate)})</span>
            </div>${insuranceSavingsCard}
            <div class="savings-card">
              <span class="savings-number">$${d.maintLow.toLocaleString()} - $${d.maintHigh.toLocaleString()}</span>
              <span class="savings-label">Annual maintenance savings<br>(${getMaintenanceLabel(climate)})</span>
            </div>
          </div>

          <p style="margin-top:var(--space-6);">
            Combined, a typical ${name} ICF homeowner saves <strong>$${d.annualLow.toLocaleString()} - $${d.annualHigh.toLocaleString()} per year</strong> compared to an equivalent wood-frame home. That is real money back in your pocket every single year, starting the day you move in.
          </p>
          <p>
            Over 30 years, the total financial advantage of owning an ICF home in ${name} can exceed <strong>$${formatLifetime(d.lifetime)}</strong>.
          </p>
        </section>


        <!-- MID-PAGE CTA 2 -->
        <div class="mid-cta">
          <div>
            <h3>Ready to see what ICF would cost for your ${name} project?</h3>
            <p>Connect with a local ICF contractor who can walk your lot, review your plans, and give you a real quote.</p>
          </div>
          <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary" style="flex-shrink:0;">Find a Pro &rarr;</a>
        </div>


        <!-- WHY ICF IN STATE -->
        <section id="why-${slug}" style="margin-top:var(--space-16);">
          <span class="eyebrow">Why ${name}</span>
          <h2 style="margin-top:var(--space-2);">Why ICF Makes Financial Sense in ${name}</h2>
${whyHtml}
        </section>


        <!-- FAQ -->
        <section id="faq" style="margin-top:var(--space-16);">
          <span class="eyebrow">FAQ</span>
          <h2 style="margin-top:var(--space-2);">Common Questions About ICF Cost in ${name}</h2>

          <div class="faq-list">
${faqHtml}
          </div>
        </section>


        <!-- BOTTOM CTA -->
        <div class="cta-panel">
          <h2>Get a Real Quote for Your ${name} ICF Project</h2>
          <p>Every project is different. The only way to get a number you can build a budget around is to connect with a local ICF contractor who knows your market and your area's code requirements.</p>
          <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary btn-lg">Find a Pro in ${name} &rarr;</a>
          <p style="margin-top:var(--space-3);font-size:0.8rem;color:var(--color-text-muted);">We only share your request with relevant local ICF professionals, never unrelated marketers.</p>
        </div>

        <!-- CONTRACTOR BANNER -->
        <div class="contractor-banner" style="margin-top:var(--space-8);">
          <div class="contractor-banner-text">
            <span class="eyebrow" style="font-size:0.7rem;">ICF Contractors &amp; Builders</span>
            <p>Are you an ICF contractor in ${name}? Get listed in the directory and start receiving leads from homeowners in your area.</p>
          </div>
          <a href="/get-connected?tab=contractor" class="btn btn-primary">List Your Business &rarr;</a>
        </div>


      </article>


      <!-- SIDEBAR -->
      <aside class="toc-sidebar" aria-label="Page navigation">
        <div class="toc-inner">
          <p class="toc-label">On this page</p>
          <ul class="toc-list">
            <li><a href="#cost-snapshot" class="toc-link">Cost at a Glance</a></li>
            <li><a href="#icf-vs-wood" class="toc-link">ICF vs Wood Frame</a></li>
            <li><a href="#cost-breakdown" class="toc-link">Cost Breakdown</a></li>
            <li><a href="#cost-factors" class="toc-link">What Affects Price</a></li>
            <li><a href="#savings" class="toc-link">Long-Term Savings</a></li>
            <li><a href="#why-${slug}" class="toc-link">Why ${name}</a></li>
            <li><a href="#faq" class="toc-link">Common Questions</a></li>
          </ul>
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
            <a href="/find-a-pro?state=${encodeURIComponent(name)}" class="btn btn-primary" style="width:100%;text-align:center;font-size:0.85rem;">Find a Pro in ${name}</a>
          </div>
        </div>
      </aside>

    </div>
  </div>


  <!-- FOOTER -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>
          <p>The independent authority on Insulated Concrete Form construction.</p>
        </div>
        <div class="footer-col"><h4>Learn</h4><ul class="footer-links" role="list"><li><a href="/icf-101" class="footer-link">ICF 101</a></li><li><a href="/cost-guide" class="footer-link">Cost Guide</a></li><li><a href="/brands" class="footer-link">Brand Comparison</a></li></ul></div>
        <div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro" class="footer-link">Find a Pro</a></li><li><a href="/get-connected?tab=contractor" class="footer-link">List Your Business</a></li></ul></div>
        <div class="footer-col"><h4>Company</h4><ul class="footer-links" role="list"><li><a href="/about" class="footer-link">About</a></li><li><a href="/privacy-policy" class="footer-link">Privacy Policy</a></li><li><a href="/terms-of-use" class="footer-link">Terms of Use</a></li></ul></div>
        <div class="footer-col"><h4>Contact</h4><ul class="footer-links" role="list"><li><a href="mailto:tyler@icfinsider.com" class="footer-link" style="color:var(--color-accent);">tyler@icfinsider.com</a></li><li><a href="mailto:tyler@icfinsider.com?subject=Partnership%20Inquiry" class="footer-link">Partner With Us &rarr;</a></li></ul></div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ICF Insider. Independent and unaffiliated with any ICF brand or manufacturer.</p>
      </div>
    </div>
  </footer>

  <script src="/js/main.js"></script>
</body>
</html>
`;
}

// ─── Batch definitions ───────────────────────────────────────────────────
const ALL_SLUGS = Object.keys(CLIMATE).filter(s => s !== 'florida').sort();

const BATCHES = {
  1: ALL_SLUGS.filter(s => s[0] >= 'a' && s[0] <= 'g'),
  2: ALL_SLUGS.filter(s => s[0] >= 'h' && s[0] <= 'm'),
  3: ALL_SLUGS.filter(s => s[0] >= 'n' && s[0] <= 's'),
  4: ALL_SLUGS.filter(s => s[0] >= 't' && s[0] <= 'z'),
};

// ─── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
let slugs = ALL_SLUGS;

const batchIdx = args.indexOf('--batch');
if (batchIdx !== -1 && args[batchIdx + 1]) {
  const batch = parseInt(args[batchIdx + 1]);
  if (BATCHES[batch]) {
    slugs = BATCHES[batch];
    console.log(`Batch ${batch}: ${slugs.length} states (${slugs[0]} - ${slugs[slugs.length - 1]})`);
  } else {
    console.error(`Invalid batch: ${batch}. Use 1-4.`);
    process.exit(1);
  }
}

const stateIdx = args.indexOf('--state');
if (stateIdx !== -1 && args[stateIdx + 1]) {
  const slug = args[stateIdx + 1];
  if (CLIMATE[slug]) {
    slugs = [slug];
  } else {
    console.error(`Unknown state slug: ${slug}`);
    process.exit(1);
  }
}

let ok = 0, fail = 0;
for (const slug of slugs) {
  try {
    const html = generateCostPage(slug);
    if (dryRun) {
      console.log(`dry   ${slug} (${html.length} chars)`);
    } else {
      const outPath = path.join(__dirname, 'states', slug, 'cost.html');
      fs.writeFileSync(outPath, html, 'utf8');
      console.log(`ok    ${slug}`);
    }
    ok++;
  } catch (e) {
    console.error(`FAIL  ${slug}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed${dryRun ? ' (dry run)' : ''}.`);
