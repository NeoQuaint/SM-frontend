// ================================================================
// src/data/GeographyContent.js
// Geography P1 + P2 — Teaching scripts + Auto scripts
// Sources: NSC Geography P1 (2022–2025) + P2 (2023–2025)
// 5 topics, 28 concepts
// ================================================================

// ================================================================
// TEACHING SCRIPTS — guided learning, sectioned
// ================================================================
export const GEO_TEACHING_SCRIPTS = {

  // ==========================================================
  // TOPIC 1 — CLIMATE AND WEATHER
  // ==========================================================
  'synoptic-maps': {
    sections: [
      { type: 'heading', text: "Let's read a synoptic weather map." },
      {
        type: 'scene', sceneId: 'synoptic-map', steps: 5, stepDuration: 2200,
        config: { title: 'Synoptic Weather Map' },
        caption: 'A weather map shows what the atmosphere is doing right now.',
        stepTexts: [
          null,
          'Isobars. Lines joining places of equal pressure. Close together means strong wind.',
          'High pressure, marked H. Air sinks. Clear skies. Calm.',
          'Low pressure, marked L. Air rises. Clouds and rain.',
          'Fronts. Where two air masses meet. Cold front is a triangle. Warm front is a semicircle.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Read the map the way the wind blows. From high to low. The closer the isobars, the harder the wind.' },
      {
        type: 'bullets', label: 'What you look for first',
        items: [
          'Isobars: equal pressure lines. Spacing tells you wind strength.',
          'H: high pressure. Air diverges and sinks. Stable weather.',
          'L: low pressure. Air converges and rises. Unstable weather.',
          'Ridge: elongated high pressure pushing into the country.',
          'Trough: elongated low pressure. Often brings clouds.',
          'Station model: temperature, dew point, wind direction, wind speed, cloud cover, pressure.',
        ],
      },
      {
        type: 'example',
        scenario: 'A station model shows temperature 30°C, dew point 18°C, wind from NE, 20 knots.',
        steps: ['What is the air doing?', 'Dew point well below temperature — air is fairly dry.', 'NE wind at coast + high temp = moist onshore flow.'],
        answer: 'Warm, moderately moist air. Rainfall likely if a low-pressure system sits nearby.',
        sceneId: 'synoptic-map',
      },
    ],
  },

  'mid-latitude-cyclones': {
    sections: [
      { type: 'heading', text: 'Mid-latitude cyclones: the weather system that brings cold fronts.' },
      {
        type: 'scene', sceneId: 'mid-latitude-cyclone', steps: 4, stepDuration: 2400,
        config: { title: 'Mid-latitude Cyclone' },
        caption: 'Watch the cold front catch the warm front.',
        stepTexts: [
          null,
          'Cold front. Cold air undercuts warm air. Steep uplift. Cumulonimbus clouds. Heavy short rain.',
          'Warm front. Warm air rides over cold air. Gentle uplift. Nimbostratus. Light long rain.',
          'Warm sector. Between the two fronts. Warm, moist, and clear.',
          'Occlusion. Cold front catches warm front. Warm sector lifts off the ground. Rain everywhere.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Cold front moves faster than warm front. It always catches up. That is what kills the cyclone.' },
      {
        type: 'bullets', label: 'Key facts',
        items: [
          'Moves west to east — driven by the westerlies.',
          'Four stages: initial, development, mature, occlusion.',
          'Southern Hemisphere: clockwise circulation. Warm sector to the north.',
          'Cold front: cumulonimbus, heavy short rain, steep gradient.',
          'Warm front: nimbostratus, light long rain, gentler gradient.',
          'Occlusion forms when the cold front overtakes the warm front.',
        ],
      },
      {
        type: 'example',
        scenario: 'A cold front reaches Cape Town. Rainfall totals rise from 15 mm to 40 mm over 36 hours.',
        steps: ['Where is the heaviest rain?', 'Along the cold front and east of it.', 'Why?'],
        answer: 'Rapid uplift at the cold front + continuous uplift along the warm front. Heaviest where uplift is strongest.',
        sceneId: 'mid-latitude-cyclone',
      },
    ],
  },

  'tropical-cyclones': {
    sections: [
      { type: 'heading', text: 'Tropical cyclones: the storms born over warm oceans.' },
      {
        type: 'scene', sceneId: 'tropical-cyclone', steps: 4, stepDuration: 2400,
        config: { title: 'Tropical Cyclone' },
        caption: 'Four parts of the storm.',
        stepTexts: [
          null,
          'Eye. Centre. Sinking air. Clear skies. Calm. The safest part of the storm.',
          'Eye wall. Ring of thunderstorms around the eye. Strongest winds. Heaviest rain.',
          'Spiral bands. Rain bands that spiral inward. Bring rain far from the centre.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Warm water above 26.5°C is the fuel. Coriolis force spins it. Once it hits land, it dies.' },
      {
        type: 'bullets', label: 'Development and stages',
        items: [
          'Form between 5° and 20° N and S of the equator.',
          'Coriolis force zero at the equator — that is why they never form there.',
          'Sea surface temperature must be at least 26.5°C.',
          'Stages: initial, immature, mature, decaying.',
          'Mature: lowest pressure, strongest winds, most rain.',
          'Forward left-hand quadrant (SH) = dangerous semicircle.',
        ],
      },
      {
        type: 'example',
        scenario: 'A tropical cyclone forms off Madagascar, moves west, hits land, and weakens.',
        steps: ['Why did it weaken?', 'Less moisture over land.', 'Also: increased friction, no more warm water fuel.'],
        answer: 'Landfall cuts the fuel supply. Friction slows the winds. The system decays.',
        sceneId: 'tropical-cyclone',
      },
    ],
  },

  'subtropical-anticyclones': {
    sections: [
      { type: 'heading', text: 'Subtropical anticyclones: the high-pressure cells that steer our weather.' },
      {
        type: 'scene', sceneId: 'anticyclones', steps: 3, stepDuration: 2400,
        config: { title: 'Subtropical Anticyclones' },
        caption: 'Three high-pressure cells around South Africa.',
        stepTexts: [
          null,
          'South Atlantic High. West of the country. Cool, stable air from the ocean.',
          'South Indian High. East of the country. Warm, moist air. Brings rain to KZN.',
        ],
      },
      { type: 'concept', label: 'The seasons', text: 'In winter the Kalahari High sits over the interior. In summer it moves out to sea and lets moisture in.' },
      {
        type: 'bullets', label: 'What each cell does',
        items: [
          'South Atlantic High: west. Cool, stable. Blocks rain from the west.',
          'South Indian High: east. Warm, moist. Feeds rain to KZN coast.',
          'Kalahari High: interior. Winter dominant. Blocks moisture from reaching interior.',
          'Ridging: high extends isobars across the country.',
          'Blocking high: stops a mid-latitude cyclone from moving east.',
          'Seasonal shift: ITCZ moving controls which high dominates.',
        ],
      },
      {
        type: 'example',
        scenario: 'In winter, the interior is dry. In summer, the interior gets thunderstorms.',
        steps: ['Which cell causes the winter dryness?', 'Kalahari High — sits over the interior.', 'Where does it go in summer?'],
        answer: 'It shifts west/out to sea. Moist air from the Indian Ocean then reaches the interior.',
        sceneId: 'anticyclones',
      },
    ],
  },

  'valley-climates': {
    sections: [
      { type: 'heading', text: 'Valley climates: how a valley makes its own weather.' },
      {
        type: 'scene', sceneId: 'valley-climate', steps: 4, stepDuration: 2400,
        config: { title: 'Valley Climate' },
        caption: 'Day and night behave differently in a valley.',
        stepTexts: [
          null,
          'Day: Anabatic wind. Sun heats the slopes. Warm air rises up the valley sides.',
          'Night: Katabatic wind. Slopes cool fast. Cold air sinks to the valley floor.',
          'Frost pocket. Cold air pools at the bottom. Temperature drops below freezing. Frost forms.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Day = up the slope. Night = down the slope. Bottom of the valley is the coldest place at night.' },
      {
        type: 'bullets', label: 'Aspect and shadow zone',
        items: [
          'Aspect: direction a slope faces. NH south-facing = warmer. SH north-facing = warmer.',
          'Shadow zone: opposite slope. Cooler and moister. Dense vegetation.',
          'Frost pocket: cold air pools at the valley floor. Frost forms below 0°C.',
          'Anabatic: upslope, daytime. Katabatic: downslope, nighttime.',
          'Inversion in the valley: cold air at bottom, warm above.',
        ],
      },
      {
        type: 'example',
        scenario: 'A farmer wants to plant a crop that cannot survive frost.',
        steps: ['Where should they plant?', 'Not the valley floor.', 'Where then?'],
        answer: 'Mid-slope. Cold air drains down to the valley floor. Frost forms only at the bottom.',
        sceneId: 'valley-climate',
      },
    ],
  },

  'urban-climates': {
    sections: [
      { type: 'heading', text: 'Urban climates: why cities are hotter than the countryside.' },
      {
        type: 'scene', sceneId: 'urban-climate', steps: 3, stepDuration: 2400,
        config: { title: 'Urban Heat Island' },
        caption: 'The city runs a few degrees hotter than the rural area.',
        stepTexts: [
          null,
          'Urban heat island. Cities are 2–6°C warmer than surrounding rural areas.',
          'Pollution dome. Warm air rises over the city during the day. Pollutants escape. At night the dome traps them low.',
        ],
      },
      { type: 'concept', label: 'The causes', text: 'Concrete and tar absorb heat. Buildings block wind. Cars, factories and air conditioners add heat. Less vegetation means less cooling.' },
      {
        type: 'bullets', label: 'Key effects',
        items: [
          'Artificial surfaces absorb more heat than natural ground.',
          'Vertical dimension: tall buildings trap heat and reduce wind.',
          'More hygroscopic particles = more cloud cover and rain.',
          'Lower air pressure in cities (warm air rises).',
          'Slower wind speed due to friction from buildings.',
          'Less evaporation because less vegetation.',
        ],
      },
      {
        type: 'example',
        scenario: 'A city centre records 14°C at dawn while the rural outskirts record 8°C.',
        steps: ['What is this called?', 'Urban heat island effect.', 'Why does it happen?'],
        answer: 'Concrete and tar release stored heat overnight. Less vegetation means less evaporative cooling.',
        sceneId: 'urban-climate',
      },
    ],
  },

  'inversion-layers': {
    sections: [
      { type: 'heading', text: 'Inversion layers: when warm air sits on top of cold air.' },
      {
        type: 'scene', sceneId: 'inversion-layer', steps: 3, stepDuration: 2400,
        config: { title: 'Inversion Layers' },
        caption: 'Position of the inversion controls the rainfall.',
        stepTexts: [
          null,
          'Summer. Inversion sits above the escarpment. Moist air flows in. Rain over the interior.',
          'Winter. Inversion sits below the escarpment. Moist air is blocked. Dry interior.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Above the escarpment = rain. Below the escarpment = dry. That is the whole story.' },
      {
        type: 'bullets', label: 'Why it forms',
        items: [
          'Descending air from the Kalahari High compresses and heats up.',
          'Warm layer sits on top of cooler layer below.',
          'In summer: weak descending air — inversion sits high above the plateau.',
          'In winter: strong descending air — inversion sits low, below the escarpment.',
          'Position of inversion determines whether moist air reaches the interior.',
        ],
      },
      {
        type: 'example',
        scenario: 'In winter the interior of SA is dry. In summer, thunderstorms over the Highveld.',
        steps: ['Which season has inversion above the escarpment?', 'Summer.', 'What happens in winter?'],
        answer: 'Winter inversion sits below the escarpment and blocks moisture from reaching the interior.',
        sceneId: 'inversion-layer',
      },
    ],
  },

  'berg-winds': {
    sections: [
      { type: 'heading', text: 'Berg winds: hot, dry winds that blow down to the coast.' },
      {
        type: 'scene', sceneId: 'berg-wind', steps: 3, stepDuration: 2200,
        config: { title: 'Berg Winds' },
        caption: 'From the plateau to the sea.',
        stepTexts: [
          null,
          'Kalahari High pushes air down the escarpment.',
          'The air compresses and heats up. 1°C for every 100 m of descent.',
          'Warm, dry wind hits the coast. Vegetation dries. Veld fire risk spikes.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Descending air = compresses = heats up = dries out. The wind arrives hot and dry.' },
      {
        type: 'bullets', label: 'Development',
        items: [
          'Needs: Kalahari High + coastal low pressure.',
          'Air descends the escarpment from the interior plateau.',
          'Adiabatic heating: 1°C per 100 m of descent.',
          'Moisture evaporates as air warms and descends.',
          'Result: hot, dry wind at the coast.',
          'Consequences: dried vegetation, high veld fire risk, discomfort.',
        ],
      },
      {
        type: 'example',
        scenario: 'A coastal town records 34°C with clear skies, dry air, and 10% humidity in mid-winter.',
        steps: ['What kind of wind is this?', 'Berg wind.', 'What caused it?'],
        answer: 'Kalahari High pushed air down the escarpment. It heated adiabatically and dried out.',
        sceneId: 'berg-wind',
      },
    ],
  },

  // ==========================================================
  // TOPIC 2 — GEOMORPHOLOGY
  // ==========================================================
  'drainage-basins': {
    sections: [
      { type: 'heading', text: 'Drainage basins: the land area that feeds one river.' },
      {
        type: 'scene', sceneId: 'drainage-basins', steps: 4, stepDuration: 2400,
        config: { title: 'Drainage Basin' },
        caption: 'Every drop of rain in this area ends up in the same river.',
        stepTexts: [
          null,
          'Watershed. High ground separating one basin from the next.',
          'Source. Where the river starts. Usually in high mountains.',
          'Confluence. Where two rivers join. Stream order increases.',
          'Mouth. Where the river meets the sea or a lake.',
        ],
      },
      { type: 'concept', label: 'Key terms', text: 'Drainage basin — the area drained by a river and its tributaries. Catchment area — same thing. Interfluve — the high ground between two tributaries in the same basin.' },
      {
        type: 'bullets', label: 'Drainage density',
        items: [
          'High drainage density: many tributaries, impermeable rock, sparse vegetation, steep slopes.',
          'Low drainage density: few tributaries, permeable rock, dense vegetation, gentle slopes.',
          'Stream order: 1st order streams have no tributaries. When two streams of the same order join, the order increases.',
          'Infiltration: water seeping into the ground. High infiltration = low runoff.',
          'Water table: upper level of saturated ground.',
        ],
      },
      {
        type: 'example',
        scenario: 'Basin A has few tributaries. Basin B has many tributaries.',
        steps: ['Which has higher drainage density?', 'Basin B.', 'What rock type is likely in B?'],
        answer: 'Impermeable rock. Water runs off instead of infiltrating, so more channels form.',
        sceneId: 'drainage-basins',
      },
    ],
  },

  'river-capture': {
    sections: [
      { type: 'heading', text: 'River capture: when one river steals another\'s water.' },
      {
        type: 'scene', sceneId: 'river-capture', steps: 4, stepDuration: 2400,
        config: { title: 'River Capture' },
        caption: 'The stronger river always wins.',
        stepTexts: [
          null,
          'Two rivers flowing on opposite sides of a watershed.',
          'River A has a steeper gradient and soft rock below. It erodes headward faster.',
          'River A cuts through the watershed and captures River B\'s headwaters.',
          'River B becomes a misfit stream — smaller volume, smaller valley.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'The captor has more erosive power. Steeper gradient. Soft rock. More water. It always wins.' },
      {
        type: 'bullets', label: 'Key features',
        items: [
          'Captor stream: the river that does the capturing.',
          'Captured stream: the river that loses its headwaters.',
          'Misfit stream: the captured stream after capture. Small volume in a big valley.',
          'Elbow of capture: the sharp bend where the captured river turns into the captor.',
          'Wind gap: the dry valley left behind above the elbow.',
          'Headward erosion: erosion that lengthens a river upstream.',
        ],
      },
      {
        type: 'example',
        scenario: 'River A flows at 220 m above sea level. River B flows at 880 m above sea level.',
        steps: ['Which river has more erosive power?', 'River B — higher elevation means steeper gradient.', 'What happens over time?'],
        answer: 'River B erodes headward faster. It captures River A\'s headwaters.',
        sceneId: 'river-capture',
      },
    ],
  },

  'fluvial-landforms': {
    sections: [
      { type: 'heading', text: 'Fluvial landforms: what rivers build and destroy.' },
      {
        type: 'scene', sceneId: 'fluvial-landforms', steps: 4, stepDuration: 2400,
        config: { title: 'Fluvial Landforms' },
        caption: 'Water erodes and deposits. The river writes its own story.',
        stepTexts: [
          null,
          'Meanders. Bends in the river. Undercut slope on the outside, slip-off slope on the inside.',
          'Oxbow lake. A meander loop cut off from the main stream.',
          'Flood plain. Flat land next to the river. Made of deposited sediment.',
          'Natural levees. Raised banks. Formed when floods deposit coarse sediment.',
        ],
      },
      { type: 'concept', label: 'Erosion vs deposition', text: 'Outer bank = faster flow = erosion. Inner bank = slower flow = deposition. That is how meanders move downstream.' },
      {
        type: 'bullets', label: 'Landforms by course',
        items: [
          'Upper course: V-shaped valleys, waterfalls, rapids, gorges, interlocking spurs.',
          'Middle course: meanders, undercut slopes, slip-off slopes.',
          'Lower course: flood plains, natural levees, oxbow lakes, deltas.',
          'Waterfall retreats upstream over time.',
          'Plunge pool forms at the base of a waterfall.',
          'Deltas form at river mouths when: shallow sea bed, small tidal range, weak currents.',
        ],
      },
      {
        type: 'example',
        scenario: 'A meander loop narrows. The river floods and cuts through the neck.',
        steps: ['What happens to the old loop?', 'It gets cut off from the main stream.', 'What does it become?'],
        answer: 'An oxbow lake. Deposition seals it off from the new channel.',
        sceneId: 'fluvial-landforms',
      },
    ],
  },

  'river-rejuvenation': {
    sections: [
      { type: 'heading', text: 'River rejuvenation: when a river gets a second wind.' },
      {
        type: 'scene', sceneId: 'river-rejuvenation', steps: 4, stepDuration: 2400,
        config: { title: 'River Rejuvenation' },
        caption: 'A drop in base level gives the river new energy.',
        stepTexts: [
          null,
          'Base level drops — sea level falls, or land rises.',
          'River gains energy. Vertical erosion dominates again.',
          'Incised meanders form. Old meanders cut deeper into the landscape.',
          'River terraces form. Old flood plains sit above the new river level.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Rejuvenation = new energy = vertical erosion starts again. The river carves into its old landforms.' },
      {
        type: 'bullets', label: 'Key features',
        items: [
          'Knickpoint: sharp change in gradient. Often a waterfall.',
          'Incised meander: meander cut deep into rock.',
          'Valley-in-a-valley: new valley cut inside old one.',
          'Paired terraces: two old flood plains at the same height on both banks.',
          'Rejuvenation happens when: sea level drops, land rises, or river volume increases.',
          'Longitudinal profile shows the knickpoint as a break in the smooth curve.',
        ],
      },
      {
        type: 'example',
        scenario: 'A river was meandering. Then the land rose. Now the meanders are cutting down into the rock.',
        steps: ['What is this called?', 'Rejuvenation.', 'What feature forms?'],
        answer: 'Incised meanders. The old meander pattern is preserved but cut deeper into the land.',
        sceneId: 'river-rejuvenation',
      },
    ],
  },

  'catchment-management': {
    sections: [
      { type: 'heading', text: 'Catchment management: keeping rivers healthy.' },
      {
        type: 'scene', sceneId: 'catchment-management', steps: 4, stepDuration: 2400,
        config: { title: 'Catchment Management' },
        caption: 'Every activity in the catchment affects the river.',
        stepTexts: [
          null,
          'Pollution sources. Agriculture, industry, informal settlements, mining.',
          'Water sampling points. Monitor quality along the river.',
          'Strategies: reduce pesticides, treat wastewater, conserve wetlands, educate communities.',
        ],
      },
      { type: 'concept', label: 'Why it matters', text: 'Healthy catchments = clean water = healthy people = a functioning economy. Poor management = disease, ecosystem collapse, food insecurity.' },
      {
        type: 'bullets', label: 'Common problems',
        items: [
          'Agricultural chemicals: pesticides, herbicides, fertilisers entering rivers.',
          'Mining: acid drainage, heavy metals, sediment.',
          'Informal settlements: sewage, waste, no sanitation infrastructure.',
          'Alien plants: absorb groundwater, reduce stream flow.',
          'Deforestation: increases erosion and runoff.',
          'Urban development: stormwater, industrial effluent.',
        ],
      },
      {
        type: 'bullets', label: 'Sustainable strategies',
        items: [
          'Reduce pesticide and fertiliser use.',
          'Treat wastewater before release.',
          'Conserve wetlands — they filter water naturally.',
          'Remove alien vegetation.',
          'Educate communities about water quality.',
          'Regular testing at multiple sampling points.',
          'Legislate and enforce water quality standards.',
          'Create buffer zones along river banks.',
        ],
      },
      {
        type: 'example',
        scenario: 'The Mooi River catchment is polluted by agriculture and diamond diggings.',
        steps: ['What are the pollution sources?', 'Agriculture, mining, informal settlements.', 'What is the fix?'],
        answer: 'Catchment restoration: alien clearing, wetland conservation, sustainable farming, education.',
        sceneId: 'catchment-management',
      },
    ],
  },

  // ==========================================================
  // TOPIC 3 — SETTLEMENT GEOGRAPHY
  // ==========================================================
  'rural-settlements': {
    sections: [
      { type: 'heading', text: 'Rural settlements: where people live off the land.' },
      {
        type: 'scene', sceneId: 'rural-settlements', steps: 4, stepDuration: 2400,
        config: { title: 'Rural Settlements' },
        caption: 'Site and situation decide where settlements grow.',
        stepTexts: [
          null,
          'Site: the exact land the settlement sits on. Slope, drainage, soil, resources.',
          'Situation: the settlement\'s position in relation to surroundings. Rivers, roads, towns, markets.',
          'Dispersed: farmsteads spread out. Common where rainfall is reliable or where farming is extensive.',
          'Nucleated: houses clustered together. Common where water, defence, or resources are shared.',
        ],
      },
      { type: 'concept', label: 'Site vs situation', text: 'Site is local. Situation is regional. Both determine how a settlement grows.' },
      {
        type: 'bullets', label: 'Types of rural settlement',
        items: [
          'Hamlet: small group of farmsteads. Fewer than 10 households.',
          'Village: larger. Has some urban functions (school, church, shop).',
          'Farmstead: single farm with its buildings.',
          'Wet-point settlement: located at a water source.',
          'Dry-point settlement: located on high ground away from water — historically for defence.',
          'Linear shape: follows a river, road, or valley.',
          'Circular shape: around a central resource or for defence.',
        ],
      },
      {
        type: 'example',
        scenario: 'A village in Limpopo is built on a river bank with houses spread along the road.',
        steps: ['What shape is this settlement?', 'Linear — follows the river and road.', 'Why here?'],
        answer: 'Wet-point site. Water is the primary pull factor in a dry region.',
        sceneId: 'rural-settlements',
      },
    ],
  },

  'urban-hierarchy': {
    sections: [
      { type: 'heading', text: 'The urban hierarchy: from hamlet to megalopolis.' },
      {
        type: 'scene', sceneId: 'urban-hierarchy', steps: 4, stepDuration: 2400,
        config: { title: 'Urban Hierarchy' },
        caption: 'Bigger settlement, bigger influence.',
        stepTexts: [
          null,
          'Hamlet → village → town → city → metropolis → conurbation → megalopolis.',
          'Higher up = more people, more services, larger sphere of influence.',
          'High-order goods: expensive, bought rarely. Cars, jewellery, specialised services.',
          'Low-order goods: cheap, bought often. Bread, milk, basic groceries.',
        ],
      },
      { type: 'concept', label: 'Threshold and range', text: 'Threshold population — minimum customers needed to make a business profitable. Range — maximum distance people will travel to buy a product.' },
      {
        type: 'bullets', label: 'Key terms',
        items: [
          'Sphere of influence: the area from which a settlement draws its customers.',
          'Central place: a settlement that provides services to surrounding areas.',
          'High-order goods: bought infrequently, high cost, large range.',
          'Low-order goods: bought frequently, low cost, small range.',
          'Conurbation: a major city merged with towns into one continuous urban area.',
          'Megalopolis: multiple conurbations merged.',
        ],
      },
      {
        type: 'example',
        scenario: 'A village has 1 000 people. A city has 100 000. Both have shops.',
        steps: ['Which has a larger sphere of influence?', 'The city.', 'Why?'],
        answer: 'More people, more services, larger range for high-order goods. Draws customers from a wider area.',
        sceneId: 'urban-hierarchy',
      },
    ],
  },

  'urban-profile': {
    sections: [
      { type: 'heading', text: 'The urban profile: how a city is layered.' },
      {
        type: 'scene', sceneId: 'urban-profile', steps: 4, stepDuration: 2400,
        config: { title: 'Urban Profile' },
        caption: 'Different activities cluster in different zones.',
        stepTexts: [
          null,
          'CBD. Tall buildings. High density. High rents. Commercial heart.',
          'Transition zone. Mixed land use. Light industry, old residential, some commerce.',
          'Residential zones. Higher density closer to CBD. Lower density further out.',
          'Industrial and rural-urban fringe. Heavy industry, cheap land, room to expand.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Land value drops the further you get from the CBD. Different activities bid for different locations.' },
      {
        type: 'bullets', label: 'What defines each zone',
        items: [
          'CBD: highest land value, tallest buildings, most accessibility.',
          'Transition zone: mixed use, decay, renewal happening.',
          'Residential: density decreases outward. Income usually increases outward.',
          'Industrial: away from CBD, near transport, cheaper land.',
          'Rural-urban fringe: city edge. Cheaper land, more space, mixed uses.',
        ],
      },
      {
        type: 'example',
        scenario: 'A shopping centre developer wants to build a new mall.',
        steps: ['CBD or rural-urban fringe?', 'Depends on the target market.', 'If they want easy access to cars and space?'],
        answer: 'Rural-urban fringe. Cheaper land, more parking, closer to wealthy suburban customers.',
        sceneId: 'urban-profile',
      },
    ],
  },

  'rural-urban-migration': {
    sections: [
      { type: 'heading', text: 'Rural-urban migration: why people leave the countryside.' },
      {
        type: 'scene', sceneId: 'rural-urban-migration', steps: 4, stepDuration: 2400,
        config: { title: 'Rural-Urban Migration' },
        caption: 'Push and pull. Every migrant has a reason.',
        stepTexts: [
          null,
          'Push factors. What drives people away from rural areas.',
          'Pull factors. What attracts them to cities.',
          'Result: rural depopulation, urban growth, informal settlements.',
        ],
      },
      { type: 'concept', label: 'Push and pull', text: 'Push factors force people out. Pull factors attract them in. Most migration is economic.' },
      {
        type: 'bullets', label: 'Push factors',
        items: [
          'Unemployment and poverty.',
          'Lack of services: healthcare, education, water.',
          'Droughts and crop failure.',
          'Land degradation.',
          'Few economic opportunities.',
          'Crime in rural areas.',
        ],
      },
      {
        type: 'bullets', label: 'Pull factors',
        items: [
          'Job opportunities in cities.',
          'Better healthcare and education.',
          'Higher wages.',
          'Entertainment and lifestyle.',
          'Family already in cities.',
          'Access to services.',
        ],
      },
      {
        type: 'example',
        scenario: 'A young adult leaves the Eastern Cape to find work in Johannesburg.',
        steps: ['What was the push?', 'Unemployment and poverty in the rural area.', 'What is the pull?'],
        answer: 'City jobs, better wages, more services. Classic economic migration.',
        sceneId: 'rural-urban-migration',
      },
    ],
  },

  'informal-settlements': {
    sections: [
      { type: 'heading', text: 'Informal settlements: when cities can\'t keep up.' },
      {
        type: 'scene', sceneId: 'informal-settlements', steps: 4, stepDuration: 2400,
        config: { title: 'Informal Settlements' },
        caption: 'Unplanned. Overcrowded. Under-serviced.',
        stepTexts: [
          null,
          'Built on vacant land. No legal claim.',
          'No basic services: water, sanitation, electricity, waste removal.',
          'Overcrowded. Health risks. Fire risks.',
          'Upgrading is better than relocation. People keep their social and economic networks.',
        ],
      },
      { type: 'concept', label: 'The causes', text: 'Rapid urbanisation + housing shortage + poverty = informal settlements. They are a symptom, not the disease.' },
      {
        type: 'bullets', label: 'Characteristics',
        items: [
          'Built from temporary materials (zinc, wood, plastic).',
          'Located on marginal land: flood plains, steep slopes, near dumps.',
          'No legal tenure.',
          'Limited or no services.',
          'High population density.',
          'Vulnerable to fires, floods, disease.',
        ],
      },
      {
        type: 'bullets', label: 'Upgrading strategies',
        items: [
          'Provide basic services: water, electricity, sanitation.',
          'Build proper roads and drainage.',
          'Give residents secure tenure.',
          'Build better housing on site.',
          'Preserve community networks — avoid relocation where possible.',
          'Create income-generating opportunities through the upgrade process.',
        ],
      },
      {
        type: 'example',
        scenario: 'A municipality upgrades an informal settlement on site.',
        steps: ['Why upgrade instead of relocate?', 'Relocation disrupts social and economic networks.', 'What does upgrading include?'],
        answer: 'Services, roads, tenure, housing, and jobs for local residents. Better than moving people away.',
        sceneId: 'informal-settlements',
      },
    ],
  },

  // ==========================================================
  // TOPIC 4 — ECONOMIC GEOGRAPHY OF SOUTH AFRICA
  // ==========================================================
  'economic-sectors': {
    sections: [
      { type: 'heading', text: 'Four economic sectors: primary to quaternary.' },
      {
        type: 'scene', sceneId: 'economic-sectors', steps: 4, stepDuration: 2400,
        config: { title: 'Economic Sectors' },
        caption: 'Each sector feeds the next.',
        stepTexts: [
          null,
          'Primary. Direct from nature. Mining, farming, fishing, forestry.',
          'Secondary. Manufacturing and processing. Refining, assembly, construction.',
          'Tertiary. Services. Trade, transport, banking, tourism, education, health.',
          'Quaternary. Knowledge work. Research, IT, consulting, higher education.',
        ],
      },
      { type: 'concept', label: 'The development rule', text: 'Developing countries rely on primary. Developed countries dominate tertiary. SA has strong primary + growing tertiary.' },
      {
        type: 'bullets', label: 'What each sector does',
        items: [
          'Primary: extraction. Employs many. Low wages. Vulnerable to price swings.',
          'Secondary: processing. Higher wages. Creates value from raw materials.',
          'Tertiary: services. Requires skills. Largest sector in modern economies.',
          'Quaternary: knowledge. High wages. Research, IT, universities.',
          'SA GDP 2024: finance 31.7%, manufacturing 15%, trade 14.7%, transport 11%, government 10.6%, mining 8.4%, agriculture 2.9%, electricity 2.8%, construction 3%.',
        ],
      },
      {
        type: 'example',
        scenario: 'A country moves from mining-based to services-based economy.',
        steps: ['What sector is declining?', 'Primary.', 'What sector is growing?'],
        answer: 'Tertiary. Higher wages, higher skills, more stable economy.',
        sceneId: 'economic-sectors',
      },
    ],
  },

  'agriculture': {
    sections: [
      { type: 'heading', text: 'Agriculture: small-scale vs large-scale.' },
      {
        type: 'scene', sceneId: 'agriculture', steps: 4, stepDuration: 2400,
        config: { title: 'Agriculture' },
        caption: 'Two very different ways to farm.',
        stepTexts: [
          null,
          'Small-scale. Manual labour. Family-run. Local markets. Food security.',
          'Large-scale. Machinery. Commercial. Export markets. National food supply.',
          'Maize: SA\'s staple. 10 million tons/year. Free State, North West, Mpumalanga.',
          'Sugar cane: KZN. High rainfall + high temperatures.',
        ],
      },
      { type: 'concept', label: 'The gap', text: 'Small-scale farmers face access to: capital, equipment, arable land, markets. Large-scale dominate production.' },
      {
        type: 'bullets', label: 'Key facts',
        items: [
          'Maize: 10 million tons/year. Half is white maize for human consumption.',
          'Maize needs 450–600 mm rainfall per season.',
          'Sugar cane: KZN highest producer. High rainfall + high temperature.',
          'Small-scale farmers have access to 25% of arable land, 6.9% of finance, 19.2% of equipment.',
          'Large-scale farmers have access to 75% of arable land, 93.1% of finance, 80.8% of equipment.',
          'Food insecurity: 25.8% of SA households face moderate to severe food insecurity (2024).',
        ],
      },
      {
        type: 'example',
        scenario: 'A small-scale maize farmer in the Eastern Cape struggles to reach export markets.',
        steps: ['What is the main barrier?', 'Access to finance and equipment.', 'What does that lead to?'],
        answer: 'Low yields, local-market-only sales, limited income. Government support programmes aim to bridge this.',
        sceneId: 'agriculture',
      },
    ],
  },

  'mining': {
    sections: [
      { type: 'heading', text: 'Mining: SA\'s traditional powerhouse.' },
      {
        type: 'scene', sceneId: 'mining', steps: 4, stepDuration: 2400,
        config: { title: 'Mining' },
        caption: 'Three minerals. One economy built on rock.',
        stepTexts: [
          null,
          'Gold. Gauteng. Decreasing employment since 1995.',
          'Coal. Mpumalanga. Electricity generation and exports.',
          'Platinum. North West. Jewellery and industrial use.',
        ],
      },
      { type: 'concept', label: 'The pattern', text: 'Gold employment has been falling since 1995. Coal exports are rising. Platinum is a major earner but labour-sensitive.' },
      {
        type: 'bullets', label: 'Key facts',
        items: [
          'Gold: mostly Gauteng. Employment dropped from 400,000 (1995) to under 100,000 (2025).',
          'Coal: Mpumalanga. Powers Eskom. Exported to Europe and Asia. 2023 exports: R250 billion.',
          'Platinum: North West. Used in jewellery, catalytic converters. Labour unrest affects production.',
          'Physical factors: geothermal gradient, depth of deposit, quality of ore.',
          'Economic factors: commodity prices, foreign exchange rate, labour costs.',
          'Mining contributes ~8.4% of SA GDP.',
        ],
      },
      {
        type: 'example',
        scenario: 'Gold employment drops over 20 years. Why?',
        steps: ['What is the physical reason?', 'Depletion of accessible gold reserves.', 'What is the economic reason?'],
        answer: 'Rising costs of deep mining + fluctuations in the gold price. Mines mechanise or close.',
        sceneId: 'mining',
      },
    ],
  },

  'core-industrial-regions': {
    sections: [
      { type: 'heading', text: 'Core industrial regions: where SA makes things.' },
      {
        type: 'scene', sceneId: 'core-industrial-regions', steps: 4, stepDuration: 2400,
        config: { title: 'Core Industrial Regions' },
        caption: 'Five regions. Four share one thing: location.',
        stepTexts: [
          null,
          'Gauteng (PWV). Biggest contributor to SA GDP. 45% of manufacturing capacity.',
          'Durban-Pinetown. Harbour access. Diverse industry.',
          'South-Western Cape. Coastal. Wine, textiles, tourism.',
          'PE-Uitenhage and Saldanha Bay. Automotive + heavy industry + IDZs.',
        ],
      },
      { type: 'concept', label: 'The common factor', text: 'All four core regions have good transport infrastructure. Harbours, railways, or airports. Location is everything.' },
      {
        type: 'bullets', label: 'Region summaries',
        items: [
          'Gauteng (PWV): 38% of SA GDP, 45% of manufacturing, 31% of labour force.',
          'Durban-Pinetown: harbour, manufacturing, sugar, chemicals.',
          'South-Western Cape: Mediterranean climate, wine, textiles, tourism.',
          'PE-Uitenhage: automotive (VW, Isuzu, BAIC). Coega IDZ nearby.',
          'Saldanha Bay: steel, heavy industry, deep-water harbour.',
          'All four have transport, services, and access to labour.',
        ],
      },
      {
        type: 'bullets', label: 'IDZs and SDIs',
        items: [
          'IDZ — Industrial Development Zone. Export-oriented. Duty-free inputs. Near ports.',
          'Dube Trade Port IDZ — KZN. Near King Shaka airport + Durban harbour.',
          'Coega IDZ — Eastern Cape. Deep-water harbour. Automotive investment.',
          'SDI — Spatial Development Initiative. Links economic hubs. Grants + infrastructure.',
        ],
      },
      {
        type: 'example',
        scenario: 'A car manufacturer wants to build an assembly plant in SA.',
        steps: ['Where do they go?', 'Near a port or major transport network.', 'Why?'],
        answer: 'PE-Uitenhage or Coega IDZ. Harbour access for exporting finished vehicles. Duty-free imported parts.',
        sceneId: 'core-industrial-regions',
      },
    ],
  },

  'informal-sector': {
    sections: [
      { type: 'heading', text: 'The informal sector: SA\'s economic safety net.' },
      {
        type: 'scene', sceneId: 'informal-sector', steps: 4, stepDuration: 2400,
        config: { title: 'Informal Sector' },
        caption: 'Not registered. Not taxed. Still essential.',
        stepTexts: [
          null,
          'Street traders, spaza shops, taxi operators, waste collectors.',
          'Provides jobs when the formal sector can\'t.',
          'Challenges: no infrastructure, no security, no capital, permit issues.',
        ],
      },
      { type: 'concept', label: 'The numbers', text: 'SA informal sector = 20% of the workforce. Most earn below the tax threshold of R79,000/year. They pay VAT but cannot reclaim it.' },
      {
        type: 'bullets', label: 'Why it grows',
        items: [
          'High unemployment in the formal sector.',
          'Low start-up costs.',
          'Few entry requirements.',
          'Survival strategy for unskilled workers.',
          'Flexibility — can trade anywhere, any time.',
          'Absorbs retrenched workers.',
        ],
      },
      {
        type: 'bullets', label: 'Support strategies',
        items: [
          'Regulate the sector fairly — permits should enable, not restrict.',
          'Designate trading areas near markets.',
          'Provide basic services: water, toilets, storage.',
          'Increase security for traders and their goods.',
          'Partner with formal business for supply chains.',
          'Provide skills training and access to funding.',
        ],
      },
      {
        type: 'example',
        scenario: 'A street trader in Johannesburg is fined R300 for trading without a permit.',
        steps: ['What is the problem?', 'Permits are expensive and hard to obtain.', 'What is the fix?'],
        answer: 'Make permits affordable and accessible. Regulation should support traders, not punish poverty.',
        sceneId: 'informal-sector',
      },
    ],
  },

  // ==========================================================
  // TOPIC 5 — MAPWORK AND GIS
  // ==========================================================
  'map-scale-distance': {
    sections: [
      { type: 'heading', text: 'Map scale: turning centimetres into metres.' },
      {
        type: 'scene', sceneId: 'map-scale-distance', steps: 3, stepDuration: 2200,
        config: { title: 'Map Scale' },
        caption: 'Big scale, small detail. Small scale, big picture.',
        stepTexts: [
          null,
          '1:50 000 topographic map. 1 cm on the map = 500 m on the ground. Small scale.',
          '1:10 000 orthophoto map. 1 cm on the map = 100 m on the ground. Large scale.',
          'Scale calculation: Actual distance = Map distance × Map scale.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Smaller scale number = smaller scale map = larger area shown = less detail. Topographic = 1:50,000. Orthophoto = 1:10,000.' },
      {
        type: 'bullets', label: 'Key conversions',
        items: [
          '1:50,000 → 1 cm = 500 m → 1 cm = 0.5 km.',
          '1:10,000 → 1 cm = 100 m → 1 cm = 0.1 km.',
          'Distance = Map distance × Scale.',
          'Area = Length × Breadth. Convert to km² by dividing by 1,000,000.',
          'Orthophoto is 5× larger scale than topographic.',
        ],
      },
      {
        type: 'example',
        scenario: 'Power line measures 9 cm on a 1:50,000 map.',
        steps: ['Use the formula: Actual = Map × Scale.', '9 cm × 500 m/cm = 4,500 m.', 'Convert to km: 4.5 km.'],
        answer: 'Actual distance = 4,500 m (4.5 km).',
        sceneId: 'map-scale-distance',
      },
    ],
  },

  'cross-sections-gradient': {
    sections: [
      { type: 'heading', text: 'Cross-sections and gradient: reading the land.' },
      {
        type: 'scene', sceneId: 'cross-sections-gradient', steps: 3, stepDuration: 2200,
        config: { title: 'Cross-Sections and Gradient' },
        caption: 'Steep, gentle, convex, concave — every slope has a name.',
        stepTexts: [
          null,
          'Cross-section. Side view of the land between two points.',
          'Gradient. How steep the land is. Vertical Interval ÷ Horizontal Equivalent.',
          'Intervisibility. Can you see one point from another? Depends on the shape of the land.',
        ],
      },
      { type: 'concept', label: 'The formulas', text: 'Average gradient = VI ÷ HE. Expressed as 1 : x. Magnetic declination changes by the annual change each year.' },
      {
        type: 'bullets', label: 'Key definitions',
        items: [
          'Vertical Interval (VI): height difference between two points.',
          'Horizontal Equivalent (HE): actual distance on the ground between two points.',
          'Gradient: VI / HE. Express as 1 : ratio.',
          'Convex slope: steeper at the bottom, gentler at the top. Blocks intervisibility.',
          'Concave slope: gentler at the bottom, steeper at the top. Allows intervisibility.',
          'Magnetic declination: angle between true north and magnetic north.',
        ],
      },
      {
        type: 'example',
        scenario: 'VI = 147 m. HE = 950 m.',
        steps: ['Gradient = VI / HE.', '147 / 950 = 0.1547...', 'As ratio: 1 : 6.46.'],
        answer: 'Average gradient = 1 : 6.46 (approximately).',
        sceneId: 'cross-sections-gradient',
      },
    ],
  },

  'contours-landforms': {
    sections: [
      { type: 'heading', text: 'Contours: lines that reveal the land.' },
      {
        type: 'scene', sceneId: 'contours-landforms', steps: 4, stepDuration: 2200,
        config: { title: 'Contours and Landforms' },
        caption: 'Contours close together = steep. Far apart = gentle.',
        stepTexts: [
          null,
          'Contour interval: vertical distance between contours. Usually 20 m on topographic maps.',
          'V-shape pointing upstream = valley.',
          'V-shape pointing downhill = ridge or spur.',
          'Rivers flow in the V of the contour, pointing toward higher ground.',
        ],
      },
      { type: 'concept', label: 'Reading the shapes', text: 'Close contours = steep. Far contours = gentle. V into higher ground = valley. U into higher ground = spur.' },
      {
        type: 'bullets', label: 'Landforms by contour pattern',
        items: [
          'Valley: V-pointing upstream (toward higher ground).',
          'Spur: U or V pointing downhill (lower ground).',
          'Cliff: contours overlapping or very close.',
          'Plateau: large flat area with few contours.',
          'Saddle: dip between two peaks.',
          'Waterfall: contour lines close together with river crossing.',
          'Confluence: where two streams meet — shown by contour pattern.',
        ],
      },
      {
        type: 'example',
        scenario: 'Two points on a map. Contours between them are widely spaced and drop steadily.',
        steps: ['Is this steep or gentle?', 'Gentle — widely spaced contours.', 'What is the landform?'],
        answer: 'Gently sloping valley or plain. Good for agriculture or road building.',
        sceneId: 'contours-landforms',
      },
    ],
  },

  'gis-layers': {
    sections: [
      { type: 'heading', text: 'GIS: layers of information on one map.' },
      {
        type: 'scene', sceneId: 'gis-layers', steps: 4, stepDuration: 2200,
        config: { title: 'GIS Layers' },
        caption: 'Stack the layers. Read the whole story.',
        stepTexts: [
          null,
          'Raster data: pixel-based. Images, satellite photos, orthophotos.',
          'Vector data: point, line, polygon. Topographic maps with symbols.',
          'Data layering: combining multiple layers into one view.',
          'Buffering: creating a zone around a feature.',
        ],
      },
      { type: 'concept', label: 'Raster vs vector', text: 'Raster = pixels. Vector = shapes. Topographic maps use vector. Orthophotos use raster.' },
      {
        type: 'bullets', label: 'Key GIS concepts',
        items: [
          'Raster: grid of pixels. Each pixel has a value. More pixels = higher resolution.',
          'Vector: points, lines, polygons with coordinates.',
          'Data layering: overlay layers to see relationships.',
          'Buffering: create a protective zone around a feature.',
          'Data integration: combine different data sources.',
          'Remote sensing: collecting data from a distance (satellites, drones).',
        ],
      },
      {
        type: 'example',
        scenario: 'A GIS specialist overlays a vegetation layer with a water layer.',
        steps: ['What is this process?', 'Data integration or data layering.', 'What do they learn?'],
        answer: 'Where vegetation and water coincide. Useful for conservation planning or identifying wetlands.',
        sceneId: 'gis-layers',
      },
    ],
  },

  'map-interpretation': {
    sections: [
      { type: 'heading', text: 'Map interpretation: reading the whole picture.' },
      {
        type: 'scene', sceneId: 'map-interpretation', steps: 4, stepDuration: 2200,
        config: { title: 'Map Interpretation' },
        caption: 'Every symbol tells you something.',
        stepTexts: [
          null,
          'Topographic map. 1:50,000. Shows human and natural features with symbols.',
          'Orthophoto map. 1:10,000. Photo-based. Shows real features.',
          'Combine both to see pattern + reality.',
        ],
      },
      { type: 'concept', label: 'Reading the landscape', text: 'Land use, settlement patterns, drainage, transport, industry — all visible on a topographic map. Interpret, do not just read.' },
      {
        type: 'bullets', label: 'What to look for',
        items: [
          'Land use: cultivation, forestry, urban, mining.',
          'Settlement: nucleated, dispersed, linear, planned.',
          'Drainage: dendritic, trellis, radial, rectangular.',
          'Transport: roads, railways, airports.',
          'Industry: factories, mines, power lines.',
          'Services: schools, clinics, churches, police stations.',
        ],
      },
      {
        type: 'example',
        scenario: 'A topographic map shows a grid street pattern, residential plots, and a nearby railway.',
        steps: ['What kind of settlement is this?', 'Planned urban residential area.', 'What is the evidence?'],
        answer: 'Grid street pattern + uniform plot sizes + rail access = planned township or suburb.',
        sceneId: 'map-interpretation',
      },
    ],
  },

};

// ================================================================
// AUTO SCRIPTS — fact-dense, exam-prep mode
// ================================================================
export const GEO_AUTO_SCRIPTS = {
  'synoptic-maps': {
    title: 'Synoptic Weather Maps',
    sentences: [
      'A synoptic weather map shows the state of the atmosphere at one moment.',
      'Isobars are lines joining places of equal pressure.',
      'Closely spaced isobars mean a steep pressure gradient and strong winds.',
      'H stands for high pressure. Air diverges and sinks. Clear skies.',
      'L stands for low pressure. Air converges and rises. Cloud and rain.',
      'A ridge is an extension of high pressure. A trough is an extension of low pressure.',
      'A cold front is shown by triangles. A warm front by semicircles.',
      'A station model shows temperature, dew point, wind direction, wind speed, cloud cover and pressure.',
    ],
  },

  'mid-latitude-cyclones': {
    title: 'Mid-latitude Cyclones',
    sentences: [
      'Mid-latitude cyclones form between 30° and 60° north and south of the equator.',
      'In the Southern Hemisphere they move from west to east, driven by the westerlies.',
      'They have four stages: initial, development, mature, occlusion.',
      'A cold front is where cold air undercuts warm air.',
      'A warm front is where warm air rides over cold air.',
      'The warm sector sits between the two fronts.',
      'The cold front moves faster than the warm front and eventually catches up.',
      'When the cold front catches the warm front, an occlusion forms.',
      'Cold fronts bring heavy, short rain and cumulonimbus clouds.',
      'Warm fronts bring light, long rain and nimbostratus clouds.',
    ],
  },

  'tropical-cyclones': {
    title: 'Tropical Cyclones',
    sentences: [
      'Tropical cyclones form over warm oceans with a sea surface temperature above 26.5°C.',
      'They need the Coriolis force and low wind shear.',
      'They form between 5° and 20° north and south of the equator.',
      'They do not form at the equator because the Coriolis force is zero there.',
      'The eye is the centre. Air sinks. Clear skies. Calm.',
      'The eye wall surrounds the eye. Strongest winds and heaviest rain.',
      'Spiral rain bands extend outward from the eye wall.',
      'In the Southern Hemisphere the cyclone rotates clockwise.',
      'The forward left-hand quadrant is the dangerous semicircle.',
      'Tropical cyclones weaken when they move over land or over cooler water.',
    ],
  },

  'subtropical-anticyclones': {
    title: 'Subtropical Anticyclones',
    sentences: [
      'Three high-pressure cells surround South Africa.',
      'The South Atlantic High sits to the west over the Atlantic Ocean.',
      'The South Indian High sits to the east over the Indian Ocean.',
      'The Kalahari High sits over the interior of South Africa.',
      'In summer the Kalahari High moves out and the coastal lows bring moisture inland.',
      'In winter the Kalahari High dominates the interior.',
      'Ridging is when a high-pressure cell extends a ridge of isobars across the country.',
      'A blocking high stops a mid-latitude cyclone from moving east.',
      'Anticyclones bring stable, clear weather because air sinks and diverges.',
    ],
  },

  'valley-climates': {
    title: 'Valley Climates',
    sentences: [
      'A valley has its own climate because of how air moves on the slopes.',
      'During the day, the sun heats the slopes. Warm air rises up the sides. This is an anabatic wind.',
      'At night, the slopes cool fast. Cold air sinks to the valley floor. This is a katabatic wind.',
      'The coldest air pools at the bottom of the valley. This is a frost pocket.',
      'Frost forms when the temperature drops below 0°C.',
      'Aspect is the direction a slope faces. North-facing slopes in the Southern Hemisphere are warmer.',
      'The shadow zone is the south-facing slope. It stays cooler and moister.',
      'Dense vegetation grows in the shadow zone because moisture is higher there.',
    ],
  },

  'urban-climates': {
    title: 'Urban Climates',
    sentences: [
      'Cities are usually 2 to 6°C warmer than the surrounding rural areas.',
      'This is the urban heat island effect.',
      'Concrete and tar absorb heat during the day and release it at night.',
      'Tall buildings block wind and reduce cooling.',
      'Cars, factories and air conditioners add heat.',
      'Less vegetation means less shade and less evaporative cooling.',
      'A pollution dome forms above the city.',
      'During the day warm air rises and pollutants escape.',
      'At night the dome traps pollutants low over the city.',
      'Cities get more cloud cover and more rainfall than rural areas.',
    ],
  },

  'inversion-layers': {
    title: 'Inversion Layers',
    sentences: [
      'An inversion layer is warm air sitting on top of cold air.',
      'Descending air from the Kalahari High compresses and heats up.',
      'This warm layer traps moisture below it.',
      'In summer the inversion sits above the escarpment.',
      'Moist air flows into the interior. Rainfall is high.',
      'In winter the inversion sits below the escarpment.',
      'Moist air is blocked. The interior stays dry.',
      'An inversion layer also traps pollution over cities.',
      'A valley inversion forms at night when cold air pools at the bottom.',
    ],
  },

  'berg-winds': {
    title: 'Berg Winds',
    sentences: [
      'Berg winds are hot, dry winds that blow from the interior to the coast.',
      'They form when the Kalahari High pushes air toward a coastal low.',
      'The air descends the escarpment.',
      'Descending air compresses and heats up at 1°C per 100 metres.',
      'The air arrives at the coast warm and dry.',
      'Berg winds dry out natural vegetation.',
      'They increase the risk of veld fires.',
      'Strategies to reduce impact include firebreaks, water storage, early warning systems and community education.',
      'Berg winds are most common in winter and early spring.',
    ],
  },

  'drainage-basins': {
    title: 'Drainage Basins',
    sentences: [
      'A drainage basin is the area drained by a river and its tributaries.',
      'The watershed is the high ground that separates one basin from another.',
      'An interfluve is the high ground between two tributaries in the same basin.',
      'Stream order increases when two streams of the same order join.',
      'Drainage density is how many tributaries exist per unit area.',
      'High density occurs on impermeable rock, steep slopes, sparse vegetation.',
      'Low density occurs on permeable rock, gentle slopes, dense vegetation.',
      'Infiltration is water seeping into the ground.',
      'The water table is the upper level of saturated ground.',
    ],
  },

  'river-capture': {
    title: 'River Capture',
    sentences: [
      'River capture happens when one river steals the headwaters of another.',
      'The captor stream has more erosive power.',
      'More erosive power comes from a steeper gradient, softer rock, or more water.',
      'Headward erosion lengthens the captor upstream until it breaks through the watershed.',
      'The captured stream loses its headwaters.',
      'The captured stream becomes a misfit stream — small volume in a big valley.',
      'The elbow of capture is the sharp bend where the captured river turns into the captor.',
      'The wind gap is the dry valley left above the elbow.',
      'The drainage basin of the captor grows. The captured stream\'s basin shrinks.',
    ],
  },

  'fluvial-landforms': {
    title: 'Fluvial Landforms',
    sentences: [
      'Fluvial landforms are shaped by river erosion and deposition.',
      'A meander is a bend in the river.',
      'The outer bank (undercut slope) is where erosion happens.',
      'The inner bank (slip-off slope) is where deposition happens.',
      'An oxbow lake forms when a meander loop is cut off from the main stream.',
      'A flood plain is flat land next to the river, made of deposited sediment.',
      'Natural levees are raised banks formed when floods deposit coarse sediment.',
      'A delta forms at the river mouth when the sea bed is shallow and currents are weak.',
      'In the upper course: V-shaped valleys, waterfalls, rapids, gorges.',
      'In the middle course: meanders, undercut slopes, slip-off slopes.',
      'In the lower course: flood plains, levees, oxbow lakes, deltas.',
    ],
  },

  'river-rejuvenation': {
    title: 'River Rejuvenation',
    sentences: [
      'River rejuvenation happens when a river gains new energy.',
      'It is usually caused by a drop in base level — sea level falls, or the land rises.',
      'The river starts eroding vertically again.',
      'A knickpoint forms where the old and new profiles meet.',
      'Incised meanders form — old meander patterns cut deep into rock.',
      'A valley-in-a-valley forms when a new valley cuts into the old one.',
      'Paired terraces form from the old flood plain, now above the new river level.',
      'The longitudinal profile shows the knickpoint as a sharp break in the curve.',
    ],
  },

  'catchment-management': {
    title: 'Catchment Management',
    sentences: [
      'Catchment management is about keeping rivers healthy.',
      'Common pollution sources: agriculture, mining, informal settlements.',
      'Agricultural chemicals cause eutrophication and reduce oxygen in the water.',
      'Mining causes acid drainage, heavy metals and sediment.',
      'Informal settlements add sewage, waste and no sanitation infrastructure.',
      'Alien plants absorb groundwater and reduce stream flow.',
      'Sustainable strategies: reduce pesticide use, treat wastewater, conserve wetlands.',
      'Remove alien vegetation to restore natural stream flow.',
      'Educate communities about water quality.',
      'Regular testing at multiple sampling points monitors water health.',
    ],
  },

  'rural-settlements': {
    title: 'Rural Settlements',
    sentences: [
      'Rural settlements are where people live off the land.',
      'Site is the exact land the settlement sits on.',
      'Situation is the settlement\'s position relative to its surroundings.',
      'A hamlet is a small group of farmsteads, fewer than 10 households.',
      'A village is larger and has some urban functions like a school or shop.',
      'A dispersed pattern spreads farmsteads out across the land.',
      'A nucleated pattern clusters houses together.',
      'Wet-point settlements are located at a water source.',
      'Dry-point settlements sit on high ground, historically for defence.',
    ],
  },

  'urban-hierarchy': {
    title: 'Urban Hierarchy',
    sentences: [
      'Settlements are ranked by size and function.',
      'The order goes: hamlet → village → town → city → metropolis → conurbation → megalopolis.',
      'A conurbation is a major city merged with surrounding towns into one urban area.',
      'A megalopolis is multiple conurbations merged.',
      'Sphere of influence is the area from which a settlement draws its customers.',
      'Threshold population is the minimum number of customers needed to make a business profitable.',
      'Range is the maximum distance people will travel to buy a product.',
      'High-order goods are expensive and bought rarely. Cars, jewellery, specialised services.',
      'Low-order goods are cheap and bought often. Bread, milk, basic groceries.',
      'Higher up the hierarchy = more people, more services, larger sphere of influence.',
    ],
  },

  'urban-profile': {
    title: 'The Urban Profile',
    sentences: [
      'An urban profile is a cross-section of a city showing land-use zones.',
      'The CBD has the tallest buildings and highest land value.',
      'The transition zone has mixed land use and is a zone of change.',
      'Residential zones get less dense further from the CBD.',
      'Industrial zones sit away from the CBD, near transport, on cheaper land.',
      'The rural-urban fringe is the city edge. Cheaper land, more space.',
      'Land value drops the further you get from the CBD.',
      'Different activities bid for different locations.',
      'High-order commercial activities prefer the CBD.',
      'Low-order activities and heavy industry prefer cheaper land on the outskirts.',
    ],
  },

  'rural-urban-migration': {
    title: 'Rural-Urban Migration',
    sentences: [
      'Rural-urban migration is the movement of people from rural to urban areas.',
      'Push factors drive people away from rural areas.',
      'Push factors include unemployment, poverty, lack of services, droughts.',
      'Pull factors attract people to cities.',
      'Pull factors include jobs, higher wages, better healthcare, education.',
      'Most migration is economic — people move for work.',
      'Rural areas lose young adults. This causes rural depopulation.',
      'Cities grow rapidly. Informal settlements expand.',
      'The rural community loses skilled workers — brain drain.',
      'Strategies to reduce migration: rural job creation, better services, land reform.',
    ],
  },

  'informal-settlements': {
    title: 'Informal Settlements',
    sentences: [
      'Informal settlements are unplanned, unserviced housing on vacant land.',
      'Residents have no legal claim to the land.',
      'Structures are built from temporary materials — zinc, wood, plastic.',
      'Basic services are missing: water, sanitation, electricity, waste removal.',
      'Overcrowding increases health and fire risks.',
      'Causes include rapid urbanisation and housing shortage.',
      'Upgrading on site is better than relocation.',
      'Upgrading preserves social and economic networks.',
      'Upgrading provides services, roads, secure tenure and better housing.',
      'It also creates jobs for local residents during the upgrade process.',
    ],
  },

  'economic-sectors': {
    title: 'Economic Sectors',
    sentences: [
      'There are four economic sectors.',
      'Primary: extraction from nature. Mining, farming, fishing, forestry.',
      'Secondary: manufacturing and processing. Refining, assembly, construction.',
      'Tertiary: services. Trade, transport, banking, tourism, education, health.',
      'Quaternary: knowledge work. Research, IT, consulting, higher education.',
      'Developing countries rely on primary activities.',
      'Developed countries dominate the tertiary sector.',
      'South Africa has a strong primary sector and a growing tertiary sector.',
      '2024 SA GDP contributions: finance 31.7%, manufacturing 15%, trade 14.7%.',
      'The tertiary sector is the largest contributor to SA GDP.',
    ],
  },

  'agriculture': {
    title: 'Agriculture in South Africa',
    sentences: [
      'Agriculture is a primary economic activity.',
      'Small-scale farming uses manual labour and family labour.',
      'Large-scale farming uses machinery and hires labour.',
      'Maize is South Africa\'s staple crop. 10 million tons produced per year.',
      'Half of the maize is white maize for human consumption.',
      'Maize needs 450 to 600 mm of rainfall per season.',
      'Sugar cane is grown in KwaZulu-Natal — high rainfall and high temperatures.',
      'Small-scale farmers have limited access to capital, equipment and arable land.',
      'Large-scale farmers dominate commercial food production.',
      'About 25.8% of SA households face food insecurity.',
    ],
  },

  'mining': {
    title: 'Mining in South Africa',
    sentences: [
      'Mining is a primary economic activity.',
      'Gold is mined mainly in Gauteng.',
      'Gold employment dropped from 400,000 in 1995 to under 100,000 in 2025.',
      'Coal is mined in Mpumalanga.',
      'Coal powers Eskom and is exported to Europe and Asia.',
      'South Africa\'s coal exports reached R250 billion in 2023.',
      'Platinum is mined in North West.',
      'Platinum is used in jewellery and catalytic converters.',
      'Physical factors affecting mining: depth, geothermal gradient, quality of ore.',
      'Economic factors: commodity prices, exchange rate, labour costs.',
    ],
  },

  'core-industrial-regions': {
    title: 'Core Industrial Regions',
    sentences: [
      'South Africa has four core industrial regions.',
      'Gauteng (PWV) is the biggest — 38% of SA GDP, 45% of manufacturing capacity.',
      'Durban-Pinetown has a harbour and diverse manufacturing.',
      'The South-Western Cape has wine, textiles, and tourism.',
      'PE-Uitenhage has automotive manufacturing with VW, Isuzu, BAIC.',
      'All four regions have good transport infrastructure.',
      'IDZs — Industrial Development Zones — are export-oriented industrial parks near ports.',
      'Dube Trade Port IDZ is in KZN, near King Shaka airport and Durban harbour.',
      'Coega IDZ is in the Eastern Cape, with a deep-water harbour.',
      'SDIs — Spatial Development Initiatives — link economic hubs and grant infrastructure.',
    ],
  },

  'informal-sector': {
    title: 'The Informal Sector',
    sentences: [
      'The informal sector includes unregistered businesses.',
      'Street traders, spaza shops, taxi operators and waste collectors are part of it.',
      '20% of South Africa\'s workforce is in the informal sector.',
      'Most earn below the tax threshold of R79,000 per year.',
      'They pay VAT but cannot claim it back.',
      'The informal sector grows when formal employment is scarce.',
      'Low start-up costs and few entry requirements make it accessible.',
      'Support strategies: fair permits, designated trading areas, basic services.',
      'Increase security for traders and their goods.',
      'Provide skills training and access to funding.',
    ],
  },

  'map-scale-distance': {
    title: 'Map Scale and Distance',
    sentences: [
      'Topographic maps use a scale of 1:50,000.',
      'On a 1:50,000 map, 1 cm on the map = 500 m on the ground.',
      'Orthophoto maps use a scale of 1:10,000.',
      'On a 1:10,000 map, 1 cm on the map = 100 m on the ground.',
      'A smaller scale number means a smaller scale map showing a larger area.',
      'Actual distance = Map distance × Map scale.',
      'The orthophoto map has a 5× larger scale than the topographic map.',
      'Area = Length × Breadth. Convert to km² by dividing by 1,000,000.',
    ],
  },

  'cross-sections-gradient': {
    title: 'Cross-Sections and Gradient',
    sentences: [
      'A cross-section is a side view of the land between two points.',
      'Vertical Interval (VI) is the height difference between two points.',
      'Horizontal Equivalent (HE) is the actual distance on the ground between two points.',
      'Average gradient = VI ÷ HE.',
      'Gradient is expressed as 1 : x.',
      'Convex slopes are steeper at the bottom and gentler at the top.',
      'Concave slopes are gentler at the bottom and steeper at the top.',
      'Convex slopes block intervisibility. Concave slopes allow it.',
      'Magnetic declination is the angle between true north and magnetic north.',
      'Calculate the current magnetic declination using the annual change.',
    ],
  },

  'contours-landforms': {
    title: 'Contours and Landforms',
    sentences: [
      'Contours are lines of equal elevation.',
      'Contour interval is the vertical distance between contours — usually 20 m.',
      'Contours close together = steep slope. Far apart = gentle slope.',
      'A V-shape pointing upstream = valley.',
      'A V-shape pointing downhill = ridge or spur.',
      'Overlapping contours = cliff or overhang.',
      'Widely spaced contours = plateau or flat land.',
      'A saddle is a dip between two peaks.',
      'A waterfall is shown where contours are close together with a river crossing.',
      'Rivers flow in the V of the contour, pointing toward higher ground.',
    ],
  },

  'gis-layers': {
    title: 'GIS Layers',
    sentences: [
      'GIS stands for Geographic Information System.',
      'Raster data is pixel-based. Satellite images and orthophotos are raster.',
      'Vector data uses points, lines and polygons. Topographic maps use vector.',
      'Data layering combines multiple layers into one view.',
      'Buffering creates a protective zone around a feature.',
      'Data integration combines different data sources.',
      'Remote sensing collects data from a distance using satellites or drones.',
      'More pixels = higher resolution = more detail.',
      'GIS allows analysis of spatial relationships.',
      'Combining raster and vector gives the most complete picture.',
    ],
  },

  'map-interpretation': {
    title: 'Map Interpretation',
    sentences: [
      'Topographic maps use a scale of 1:50,000 and show features as symbols.',
      'Orthophoto maps use a scale of 1:10,000 and show real features.',
      'Land use can be read from the map: cultivation, forestry, urban, mining.',
      'Settlement patterns: nucleated, dispersed, linear, planned.',
      'Drainage patterns: dendritic, trellis, radial, rectangular.',
      'Transport infrastructure: roads, railways, airports.',
      'Industry appears as factories, mines, power lines.',
      'Services appear as schools, clinics, churches, police stations.',
      'Grid street patterns indicate planned urban areas.',
      'Combining topographic and orthophoto maps gives pattern plus reality.',
    ],
  },
};

export const GEO_AUTO_ORDER = [
  // P1 — Climate and Weather
  'synoptic-maps',
  'mid-latitude-cyclones',
  'tropical-cyclones',
  'subtropical-anticyclones',
  'valley-climates',
  'urban-climates',
  'inversion-layers',
  'berg-winds',
  // P1 — Geomorphology
  'drainage-basins',
  'river-capture',
  'fluvial-landforms',
  'river-rejuvenation',
  'catchment-management',
  // P2 — Settlement Geography
  'rural-settlements',
  'urban-hierarchy',
  'urban-profile',
  'rural-urban-migration',
  'informal-settlements',
  // P2 — Economic Geography
  'economic-sectors',
  'agriculture',
  'mining',
  'core-industrial-regions',
  'informal-sector',
  // P2 — Mapwork and GIS
  'map-scale-distance',
  'cross-sections-gradient',
  'contours-landforms',
  'gis-layers',
  'map-interpretation',
];