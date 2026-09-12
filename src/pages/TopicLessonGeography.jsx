import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import AnimatedInversionPlateau from '../components/AnimatedInversionPlateau';
import AnimatedPressurePattern from '../components/AnimatedPressurePattern';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaSync, FaBook, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ==========================================
// GEOGRAPHY - CLIMATE AND WEATHER (MEGA-TOPIC #1)
// ALL QUESTIONS EXTRACTED FROM ACTUAL NSC PAPERS (2022-2025)
// NO FABRICATED QUESTIONS
// ==========================================
const QuestionBank = {
  // ============================================================
  // LEVEL 1: Basic Recall (1 mark each) - ONE word answers
  // ============================================================
  level1: [
    // Q1: Isobars (2022 NSC Geo P1, Q1.1.1) - 1 mark
    {
      id: 'L1Q1',
      source: '2022 NSC Geo P1, Q1.1.1',
      topicText: 'Synoptic Weather Maps',
      diagramConfig: null,
      parts: [{
        part: '1.1.1',
        prompt: 'Lines that join places of equal atmospheric pressure on a synoptic weather map are known as ...',
        clue: '💡 Think about "bar" meaning pressure.',
        answer: 'D - isobars',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `D - isobars`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify isobars as lines of equal pressure.',
          commonMistake: 'Learners say isotherms (temperature) or isohyets (rainfall).',
          examinerHint: 'Isobar = equal pressure.',
          alternativeAccept: ['Isobars', 'Isobar'],
          memoryTrick: '🧠 "Isobar = Equal pressure"',
          mergedCorrection: `🧠 Memory Trick: "Isobar = Equal pressure"\n\n📋 NSC Memo Answer:\nD - isobars`
        }
      }]
    },
    // Q2: Season (2022 NSC Geo P1, Q1.5.1) - 1 mark
    {
      id: 'L1Q2',
      source: '2022 NSC Geo P1, Q1.5.1',
      topicText: 'Inversion Layers',
      diagramConfig: {
        type: 'inversionPlateau',
        component: 'AnimatedInversionPlateau',
        description: 'Sketch A: inversion above escarpment.'
      },
      parts: [{
        part: '1.5.1',
        prompt: 'Identify the season illustrated in sketch A.',
        clue: '💡 Look at where the inversion layer is positioned in sketch A.',
        answer: 'Summer',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `Summer`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify summer as the season.',
          commonMistake: 'Learners say winter.',
          examinerHint: 'Inversion layer is above the escarpment in summer.',
          alternativeAccept: ['Summer'],
          memoryTrick: '🧠 "Summer = Inversion above escarpment"',
          mergedCorrection: `🧠 Memory Trick: "Summer = Inversion above escarpment"\n\n📋 NSC Memo Answer:\nSummer`
        }
      }]
    },
    // Q3: Slope Aspect (2023 NSC Geo P1, Q1.2.1) - 1 mark
    {
      id: 'L1Q3',
      source: '2023 NSC Geo P1, Q1.2.1',
      topicText: 'Slope Aspect',
      diagramConfig: null,
      parts: [{
        part: '1.2.1',
        prompt: 'The relationship between slopes and the sun\'s rays is referred to as ...',
        clue: '💡 Which direction a slope faces.',
        answer: 'B - aspect',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `B - aspect`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify aspect as the relationship between slopes and sun.',
          commonMistake: 'Learners say insolation or north-facing slope.',
          examinerHint: 'Aspect = the direction a slope faces.',
          alternativeAccept: ['Aspect'],
          memoryTrick: '🧠 "Aspect = Which way the slope faces"',
          mergedCorrection: `🧠 Memory Trick: "Aspect = Which way the slope faces"\n\n📋 NSC Memo Answer:\nB - aspect`
        }
      }]
    },
    // Q4: Winter Conditions (2024 NSC Geo P1, Q1.1.1) - 1 mark
    {
      id: 'L1Q4',
      source: '2024 NSC Geo P1, Q1.1.1',
      topicText: 'Anticyclones',
      diagramConfig: {
        type: 'pressurePattern',
        component: 'AnimatedPressurePattern',
        description: 'Sketch A shows anticyclones over the interior.'
      },
      parts: [{
        part: '1.1.1',
        prompt: 'Sketch A shows typical ... conditions.',
        clue: '💡 Look at the position of the anticyclones.',
        answer: 'C - winter',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `C - winter`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify winter conditions.',
          commonMistake: 'Learners say summer.',
          examinerHint: 'Anticyclones are over the interior in winter.',
          alternativeAccept: ['Winter'],
          memoryTrick: '🧠 "Winter = Anticyclones over interior"',
          mergedCorrection: `🧠 Memory Trick: "Winter = Anticyclones over interior"\n\n📋 NSC Memo Answer:\nC - winter`
        }
      }]
    },
    // Q5: Kalahari High (2025 NSC Geo P1, Q1.1.1) - 1 mark
    {
      id: 'L1Q5',
      source: '2025 NSC Geo P1, Q1.1.1',
      topicText: 'Air Pressure Cells',
      diagramConfig: null,
      parts: [{
        part: '1.1.1',
        prompt: 'The name of the air pressure cell that dominates the interior of South Africa in winter is the ...',
        clue: '💡 Think about the high pressure system over land in winter.',
        answer: 'Z - Kalahari high',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `Z - Kalahari high`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify Kalahari high as the winter pressure cell.',
          commonMistake: 'Learners say heat low.',
          examinerHint: 'Winter = high pressure over land.',
          alternativeAccept: ['Kalahari high', 'Kalahari High'],
          memoryTrick: '🧠 "Kalahari High = Winter high pressure"',
          mergedCorrection: `🧠 Memory Trick: "Kalahari High = Winter high pressure"\n\n📋 NSC Memo Answer:\nZ - Kalahari high`
        }
      }]
    }
  ],

  // ============================================================
  // LEVEL 2: Medium (1-2 marks each) - Short explanations, name TWO
  // ============================================================
  level2: [
    // Q1: Westerlies (2022 NSC Geo P1, Q1.3.1) - 2 marks
    {
      id: 'L2Q1',
      source: '2022 NSC Geo P1, Q1.3.1',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.1',
        prompt: 'Name the wind belt that causes the easterly movement of the mid-latitude cyclone.',
        clue: '💡 Winds that blow from west to east.',
        answer: 'Westerlies',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `Westerlies`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify westerlies as the wind belt.',
          commonMistake: 'Learners say easterlies or trade winds.',
          examinerHint: 'Mid-latitude cyclones are driven by westerlies.',
          alternativeAccept: ['Westerlies', 'Westerly winds'],
          memoryTrick: '🧠 "Westerlies = Blow from west to east"',
          mergedCorrection: `🧠 Memory Trick: "Westerlies = Blow from west to east"\n\n📋 NSC Memo Answer:\nWesterlies`
        }
      }]
    },
    // Q2: Tropical Cyclone Date (2022 NSC Geo P1, Q1.4.1) - 1 mark
    {
      id: 'L2Q2',
      source: '2022 NSC Geo P1, Q1.4.1',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.1',
        prompt: 'Give the date on which Tropical Cyclone Batsirai reached the mature stage.',
        clue: '💡 Check the infographic for the date.',
        answer: '20 February',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `20 February`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must state 20 February.',
          commonMistake: 'Learners say another date.',
          examinerHint: 'Check the infographic timeline.',
          alternativeAccept: ['20 February', '20 Feb'],
          memoryTrick: '🧠 "Batsirai matured on 20 February"',
          mergedCorrection: `🧠 Memory Trick: "Batsirai matured on 20 February"\n\n📋 NSC Memo Answer:\n20 February`
        }
      }]
    },
    // Q3: TC Development Condition (2023 NSC Geo P1, Q1.4.1) - 1 mark
    {
      id: 'L2Q3',
      source: '2023 NSC Geo P1, Q1.4.1',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.1',
        prompt: 'State ONE condition required for the development of the tropical cyclone.',
        clue: '💡 Think about what tropical cyclones need to form.',
        answer: 'Sea surface temperature of at least 26.5°C',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `Sea surface temperature of at least 26.5°C`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must state a valid condition.',
          commonMistake: 'Learners say "warm water" without temperature.',
          examinerHint: 'Need warm water and Coriolis force.',
          alternativeAccept: ['Sea surface temperature ≥26.5°C', 'Coriolis force', 'Warm ocean water'],
          memoryTrick: '🧠 "Tropical cyclones = Warm water (26.5°C) + Rotation"',
          mergedCorrection: `🧠 Memory Trick: "Tropical cyclones = Warm water (26.5°C) + Rotation"\n\n📋 NSC Memo Answer:\nSea surface temperature of at least 26.5°C`
        }
      }]
    },
    // Q4: TWO factors influencing climate (2022 NSC Geo P1, Q1.5.3) - 2 marks
    {
      id: 'L2Q4',
      source: '2022 NSC Geo P1, Q1.5.3',
      topicText: 'Climate Factors',
      diagramConfig: {
        type: 'inversionPlateau',
        component: 'AnimatedInversionPlateau',
        description: 'Sketch showing factors influencing South African climate.'
      },
      parts: [{
        part: '1.5.3',
        prompt: 'Identify TWO factors, visible in the sketch, which influence the climate of South Africa.',
        clue: '💡 Look at the sketch - what physical features can you see?',
        answer: 'Plateau / Height above sea level / Ocean currents / Inversion layer / Descending air',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: `Plateau\nHeight above sea level\nOcean currents\nInversion layer\nDescending air/Kalahari HP\nDistance from the ocean\n(Any TWO)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'ANY TWO correct factors visible in the sketch.',
          commonMistake: 'Learners list factors not visible in the sketch.',
          examinerHint: 'Look at the sketch for visible features.',
          alternativeAccept: ['Plateau', 'Height above sea level', 'Ocean currents', 'Inversion layer', 'Descending air'],
          memoryTrick: '🧠 "Factors = Plateau + Ocean + Inversion + Altitude"',
          mergedCorrection: `🧠 Memory Trick: "Factors = Plateau + Ocean + Inversion + Altitude"\n\n📋 NSC Memo Answer:\nPlateau\nHeight above sea level\nOcean currents\nInversion layer\nDescending air/Kalahari HP\nDistance from the ocean\n(Any TWO)`
        }
      }]
    },
    // Q5: Berg Wind City (2025 NSC Geo P1, Q1.5.1) - 1 mark
    {
      id: 'L2Q5',
      source: '2025 NSC Geo P1, Q1.5.1',
      topicText: 'Berg Winds',
      diagramConfig: null,
      parts: [{
        part: '1.5.1',
        prompt: 'Name ONE South African city indicated on the synoptic weather map that is experiencing berg wind conditions.',
        clue: '💡 Look at the map for cities with high temperatures and dry conditions.',
        answer: 'East London',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `East London`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must name a city experiencing berg winds.',
          commonMistake: 'Learners name a city without berg wind conditions.',
          examinerHint: 'Check the synoptic weather map.',
          alternativeAccept: ['East London', 'Durban', 'Port Elizabeth'],
          memoryTrick: '🧠 "Berg winds = Hot, dry conditions along the coast"',
          mergedCorrection: `🧠 Memory Trick: "Berg winds = Hot, dry conditions along the coast"\n\n📋 NSC Memo Answer:\nEast London`
        }
      }]
    }
  ],

  // ============================================================
  // LEVEL 3: Hard (2-4 marks) - Explanations, comparisons, application
  // ============================================================
  level3: [
    // Q1: Cold Front Speed Reason (2022 NSC Geo P1, Q1.3.4) - 2 marks
    {
      id: 'L3Q1',
      source: '2022 NSC Geo P1, Q1.3.4',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'Give a reason why front A is moving faster than front B.',
        clue: '💡 Look at the wind speeds on the plan view.',
        answer: 'The wind speed behind the cold front is faster (30 knots)',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `The wind speed behind the cold front is faster (30 knots)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention wind speed or pressure gradient.',
          commonMistake: 'Learners say "cold front moves faster" without reason.',
          examinerHint: 'Check the wind speed values on the plan view.',
          alternativeAccept: ['Wind speed behind cold front is faster', '30 knots', 'Steeper pressure gradient'],
          memoryTrick: '🧠 "Cold front = Faster (30 knots)"',
          mergedCorrection: `🧠 Memory Trick: "Cold front = Faster (30 knots)"\n\n📋 NSC Memo Answer:\nThe wind speed behind the cold front is faster (30 knots)`
        }
      }]
    },
    // Q2: Evidence of Southern Hemisphere (2022 NSC Geo P1, Q1.3.5) - 2 marks
    {
      id: 'L3Q2',
      source: '2022 NSC Geo P1, Q1.3.5',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.5',
        prompt: 'Give evidence from the sketch that the mid-latitude cyclone is found in the Southern Hemisphere.',
        clue: '💡 Look at the direction of air circulation around the low pressure.',
        answer: 'Clockwise circulation of air / Warm sector is to the north',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `Clockwise circulation of air`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give evidence from the sketch.',
          commonMistake: 'Learners give general statements without evidence.',
          examinerHint: 'Southern Hemisphere = clockwise circulation.',
          alternativeAccept: ['Clockwise circulation', 'Warm sector to the north', 'Cold front is to the north'],
          memoryTrick: '🧠 "Southern = Clockwise"',
          mergedCorrection: `🧠 Memory Trick: "Southern = Clockwise"\n\n📋 NSC Memo Answer:\nClockwise circulation of air`
        }
      }]
    },
    // Q3: TC Wind Speed Decrease (2022 NSC Geo P1, Q1.4.3) - 4 marks
    {
      id: 'L3Q3',
      source: '2022 NSC Geo P1, Q1.4.3',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.3',
        prompt: 'Suggest TWO reasons for the large decrease in wind speed between 20 and 25 February 2022.',
        clue: '💡 Think about what happens when a tropical cyclone moves over land.',
        answer: 'The tropical cyclone reached the land (Madagascar)',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `The tropical cyclone reached the land (Madagascar)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two valid reasons. 2 marks each.',
          commonMistake: 'Learners only give one reason.',
          examinerHint: 'Land = less moisture and friction.',
          alternativeAccept: ['Reached land', 'Decrease in moisture', 'Less latent heat', 'Entered higher latitudes'],
          memoryTrick: '🧠 "Cyclone weakens = Land + Less moisture"',
          mergedCorrection: `🧠 Memory Trick: "Cyclone weakens = Land + Less moisture"\n\n📋 NSC Memo Answer:\nThe tropical cyclone reached the land (Madagascar)`
        }
      }]
    },
    // Q4: Heavy Rainfall Impact (2023 NSC Geo P1, Q1.3.6) - 4 marks
    {
      id: 'L3Q4',
      source: '2023 NSC Geo P1, Q1.3.6',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.6',
        prompt: 'How will the heavy rainfall negatively affect the physical (natural) environment in and around the Western Cape?',
        clue: '💡 Think about what heavy rain does to the environment.',
        answer: 'Will result in soil erosion',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `Will result in soil erosion`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe negative environmental impacts.',
          commonMistake: 'Learners focus on human impacts only.',
          examinerHint: 'Consider erosion, habitat, and water quality.',
          alternativeAccept: ['Soil erosion', 'Habitat destruction', 'Loss of wildlife', 'Mass movements'],
          memoryTrick: '🧠 "Heavy rain = Erosion + Flooding + Habitat loss"',
          mergedCorrection: `🧠 Memory Trick: "Heavy rain = Erosion + Flooding + Habitat loss"\n\n📋 NSC Memo Answer:\nWill result in soil erosion`
        }
      }]
    },
    // Q5: Cumulonimbus Formation (2024 NSC Geo P1, Q1.3.3) - 4 marks
    {
      id: 'L3Q5',
      source: '2024 NSC Geo P1, Q1.3.3',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.3',
        prompt: 'How does front A give rise to the formation of cumulonimbus clouds?',
        clue: '💡 Think about what happens when cold air meets warm air.',
        answer: 'Cold front will undercut the warm air ahead of it',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `Cold front will undercut the warm air ahead of it`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the process of cloud formation.',
          commonMistake: 'Learners say "cold front causes rain" without explanation.',
          examinerHint: 'Cold air lifts warm air → condensation → clouds.',
          alternativeAccept: ['Undercuts warm air', 'Rapid uplift', 'Cooling and condensation'],
          memoryTrick: '🧠 "Cold front + Warm air = Uplift + Cooling = Clouds"',
          mergedCorrection: `🧠 Memory Trick: "Cold front + Warm air = Uplift + Cooling = Clouds"\n\n📋 NSC Memo Answer:\nCold front will undercut the warm air ahead of it`
        }
      }]
    }
  ],

  // ============================================================
  // LEVEL 4: Analysis (4 marks) - Explanation/analysis questions
  // ============================================================
  level4: [
    // Q1: TC Monitoring Importance (2022 NSC Geo P1, Q1.4.5) - 4 marks
    {
      id: 'L4Q1',
      source: '2022 NSC Geo P1, Q1.4.5',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.5',
        prompt: 'Explain the importance of monitoring tropical cyclones like Batsirai for Madagascar.',
        clue: '💡 Think about why we track cyclones.',
        answer: 'The area is prone to tropical cyclones',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `The area is prone to tropical cyclones`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the importance of monitoring.',
          commonMistake: 'Learners only say "to save lives" without explanation.',
          examinerHint: 'Monitoring = prediction + preparation + protection.',
          alternativeAccept: ['Early warnings', 'Evacuation planning', 'Reduce impact', 'Track path'],
          memoryTrick: '🧠 "Monitor cyclones = Predict + Prepare + Protect"',
          mergedCorrection: `🧠 Memory Trick: "Monitor cyclones = Predict + Prepare + Protect"\n\n📋 NSC Memo Answer:\nThe area is prone to tropical cyclones`
        }
      }]
    },
    // Q2: Storm Surge Impact (2022 NSC Geo P1, Q1.4.4) - 4 marks
    {
      id: 'L4Q2',
      source: '2022 NSC Geo P1, Q1.4.4',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.4',
        prompt: 'How could storm surges negatively impact the physical environment on the east coast of Madagascar?',
        clue: '💡 Think about what happens when the sea floods the coast.',
        answer: 'Coastal areas flooded. Reshaping of coastline. Mass movement. Destruction of biodiversity. Pollution of water sources.',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `Coastal areas would be flooded. Re-shaping of coastline. Possibility of mass movement. Destruction of biodiversity. Destruction of habitats. Pollution of water sources. Pollution of soil.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe negative environmental impacts.',
          commonMistake: 'Learners focus on human impacts only.',
          examinerHint: 'Consider flooding, erosion, and habitat destruction.',
          alternativeAccept: ['Coastal flooding', 'Habitat destruction', 'Biodiversity loss', 'Soil pollution', 'Water pollution'],
          memoryTrick: '🧠 "Storm surge = Flooding + Erosion + Habitat loss"',
          mergedCorrection: `🧠 Memory Trick: "Storm surge = Flooding + Erosion + Habitat loss"\n\n📋 NSC Memo Answer:\nCoastal areas would be flooded. Re-shaping of coastline. Possibility of mass movement. Destruction of biodiversity.`
        }
      }]
    },
    // Q3: Cold Front Occlusion Development (2022 NSC Geo P1, Q1.3.7c) - 4 marks
    {
      id: 'L4Q3',
      source: '2022 NSC Geo P1, Q1.3.7c',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.7c',
        prompt: 'Explain how the cold front occlusion developed.',
        clue: '💡 Think about what happens when the cold front catches up to the warm front.',
        answer: 'Cold front moves faster, undercuts warm front. Warm air forced to rise. Warm sector narrows.',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `The cold front which is moving faster undercuts the warm front. The warm air is forced to rise, resulting in the narrowing of the warm sector. The cool air (in front of the warm front) is completely uplifted.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the occlusion process.',
          commonMistake: 'Learners describe the weather without explaining the process.',
          examinerHint: 'Cold front catches up → undercuts warm front → warm air rises → cold front occlusion.',
          alternativeAccept: ['Cold front undercuts warm front', 'Warm air forced to rise', 'Warm sector narrows', 'Cool air uplifted'],
          memoryTrick: '🧠 "Cold front catches warm front → warm air rises → occlusion"',
          mergedCorrection: `🧠 Memory Trick: "Cold front catches warm front → warm air rises → occlusion"\n\n📋 NSC Memo Answer:\nThe cold front which is moving faster undercuts the warm front. The warm air is forced to rise, resulting in the narrowing of the warm sector. The cool air (in front of the warm front) is completely uplifted.`
        }
      }]
    },
    // Q4: Descending Air Role (2022 NSC Geo P1, Q1.5.4) - 2 marks
    {
      id: 'L4Q4',
      source: '2022 NSC Geo P1, Q1.5.4',
      topicText: 'Inversion Layers',
      diagramConfig: {
        type: 'inversionPlateau',
        component: 'AnimatedInversionPlateau',
        description: 'Sketch showing descending air developing inversion layer.'
      },
      parts: [{
        part: '1.5.4',
        prompt: 'Explain the role played by descending air in the development of the inversion layer.',
        clue: '💡 Think about what happens when air sinks.',
        answer: 'As air subsides it compresses and heats up.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `As air subsides it compresses and heats up.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain adiabatic heating from descending air.',
          commonMistake: 'Learners say "air cools down" instead of heats up.',
          examinerHint: 'Descending air compresses and heats up.',
          alternativeAccept: ['Air compresses', 'Adiabatic heating', 'Air heats up as it descends'],
          memoryTrick: '🧠 "Descending air = Compresses + Heats up"',
          mergedCorrection: `🧠 Memory Trick: "Descending air = Compresses + Heats up"\n\n📋 NSC Memo Answer:\nAs air subsides it compresses and heats up.`
        }
      }]
    },
    // Q5: TC Intensification (2025 NSC Geo P1, Q1.4.5) - 4 marks
    {
      id: 'L4Q5',
      source: '2025 NSC Geo P1, Q1.4.5',
      topicText: 'Tropical Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.4.5',
        prompt: 'Explain why Tropical Cyclone Dikeleli intensified from 8 January to 13 January 2025.',
        clue: '💡 Think about what makes a tropical cyclone stronger.',
        answer: 'Moved to warmer waters → increased evaporation',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `It moved from land to warmer waters resulting in increased evaporation`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the intensification process.',
          commonMistake: 'Learners say "it got stronger" without explaining why.',
          examinerHint: 'Warmer water = more energy. Less friction = stronger winds.',
          alternativeAccept: ['Warmer waters', 'Increased evaporation', 'Less friction', 'Pressure dropped'],
          memoryTrick: '🧠 "Intensification = Warm water + More evaporation + Less friction"',
          mergedCorrection: `🧠 Memory Trick: "Intensification = Warm water + More evaporation + Less friction"\n\n📋 NSC Memo Answer:\nIt moved from land to warmer waters resulting in increased evaporation`
        }
      }]
    }
  ],

  // ============================================================
  // LEVEL 5: Paragraph/Essay (8 marks) - Paragraph responses from papers
  // ============================================================
  level5: [
    // Q1: Inversion Layer Paragraph (2022 NSC Geo P1, Q1.5.5) - 8 marks
    {
      id: 'L5Q1',
      source: '2022 NSC Geo P1, Q1.5.5',
      topicText: 'Inversion Layers',
      diagramConfig: {
        type: 'inversionPlateau',
        component: 'AnimatedInversionPlateau',
        description: 'Sketch A: inversion above escarpment = more rain. Sketch B: inversion below escarpment = less rain.'
      },
      parts: [{
        part: '1.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, describe how the position of the inversion layer in sketches A and B influences the amount of rainfall in the interior of South Africa.',
        clue: '💡 Think about how the inversion layer blocks or allows moisture.',
        answer: 'Sketch A: Inversion above escarpment → more rainfall. Sketch B: Inversion below escarpment → less rainfall.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `Sketch A: Inversion layer above escarpment. Moist air flows into interior. Results in more rainfall. Sketch B: Inversion layer below escarpment. Moist air cannot reach interior. Results in less/no rainfall.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe both summer and winter conditions.',
          commonMistake: 'Learners only describe one season.',
          examinerHint: 'Summer = inversion above = more rain. Winter = inversion below = less rain.',
          alternativeAccept: ['Above escarpment = more rain', 'Below escarpment = less rain'],
          memoryTrick: '🧠 "Summer = Inversion above = Rain. Winter = Inversion below = Dry"',
          mergedCorrection: `🧠 Memory Trick: "Summer = Inversion above = Rain. Winter = Inversion below = Dry"\n\n📋 NSC Memo Answer:\nSketch A: Inversion layer above escarpment. Moist air flows into interior. Results in more rainfall. Sketch B: Inversion layer below escarpment. Moist air cannot reach interior. Results in less/no rainfall.`
        }
      }]
    },
    // Q2: Ox-bow Lake Formation (2022 NSC Geo P1, Q2.4.4) - 8 marks
    {
      id: 'L5Q2',
      source: '2022 NSC Geo P1, Q2.4.4',
      topicText: 'Fluvial Landforms',
      diagramConfig: null,
      parts: [{
        part: '2.4.4',
        prompt: 'In a paragraph of approximately EIGHT lines, describe the processes that resulted in the change of fluvial landform A to an ox-bow lake at D.',
        clue: '💡 Think about erosion on the outside bend and deposition on the inside bend.',
        answer: 'Outer bank gets eroded. Deposition on inner bank. Meander neck narrows. River cuts through. Loop separated.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `The outer bank of the river gets eroded. Deposition takes place on the inner bank. The meander neck narrows. The river floods and cuts through the meander neck. The meander loop is separated from the main stream resulting in an ox-bow lake.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe the process from meander to oxbow lake.',
          commonMistake: 'Learners skip the neck narrowing step.',
          examinerHint: 'Erosion + deposition = neck narrowing = cut-off.',
          alternativeAccept: ['Outer bank erosion', 'Inner bank deposition', 'Neck narrows', 'Cut-off', 'Oxbow lake'],
          memoryTrick: '🧠 "Meander → Erosion outside + Deposition inside → Neck narrows → Cut-off → Oxbow lake"',
          mergedCorrection: `🧠 Memory Trick: "Meander → Erosion outside + Deposition inside → Neck narrows → Cut-off → Oxbow lake"\n\n📋 NSC Memo Answer:\nThe outer bank of the river gets eroded. Deposition takes place on the inner bank. The meander neck narrows. The river floods and cuts through the meander neck. The meander loop is separated from the main stream resulting in an ox-bow lake.`
        }
      }]
    },
    // Q3: Berg Wind Paragraph (2023 NSC Geo P1, Q1.5.5) - 8 marks
    {
      id: 'L5Q3',
      source: '2023 NSC Geo P1, Q1.5.5',
      topicText: 'Berg Winds',
      diagramConfig: null,
      parts: [{
        part: '1.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, explain how berg winds impact negatively on the natural vegetation and suggest strategies that can be put in place to limit this negative impact.',
        clue: '💡 Think about what hot, dry winds do to vegetation.',
        answer: 'Berg winds dry out vegetation and cause veld fires.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `Berg winds dry out the natural vegetation. Increases temperature and makes it vulnerable to veld fires.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention both impacts and strategies.',
          commonMistake: 'Learners focus only on impacts or only on strategies.',
          examinerHint: 'Dry + hot = fire risk. Need prevention and protection.',
          alternativeAccept: ['Veld fires', 'Firebreaks', 'Awareness', 'Wind breaks'],
          memoryTrick: '🧠 "Berg winds = Dry + Fire. Solutions = Firebreaks + Awareness"',
          mergedCorrection: `🧠 Memory Trick: "Berg winds = Dry + Fire. Solutions = Firebreaks + Awareness"\n\n📋 NSC Memo Answer:\nBerg winds dry out the natural vegetation. Increases temperature and makes it vulnerable to veld fires.`
        }
      }]
    },
    // Q4: Heavy Rainfall Management (2024 NSC Geo P1, Q1.3.4) - 8 marks
    {
      id: 'L5Q4',
      source: '2024 NSC Geo P1, Q1.3.4',
      topicText: 'Mid-latitude Cyclones',
      diagramConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain strategies that can be put in place to manage the negative environmental impact of the heavy rainfall associated with mid-latitude cyclones.',
        clue: '💡 Think about how to prevent flooding and erosion.',
        answer: 'Maintain vegetation, afforestation, drainage systems.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `Maintain natural vegetation. Encourage afforestation. Create effective drainage systems.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must suggest multiple management strategies.',
          commonMistake: 'Learners only mention one or two strategies.',
          examinerHint: 'Prevention + Protection + Education.',
          alternativeAccept: ['Afforestation', 'Drainage systems', 'Retaining walls', 'Dams', 'Levees'],
          memoryTrick: '🧠 "Flood management = Vegetation + Infrastructure + Education"',
          mergedCorrection: `🧠 Memory Trick: "Flood management = Vegetation + Infrastructure + Education"\n\n📋 NSC Memo Answer:\nMaintain natural vegetation. Encourage afforestation. Create effective drainage systems.`
        }
      }]
    },
    // Q5: River Capture Changes (2023 NSC Geo P1, Q2.4.5) - 8 marks
    {
      id: 'L5Q5',
      source: '2023 NSC Geo P1, Q2.4.5',
      topicText: 'River Capture',
      diagramConfig: null,
      parts: [{
        part: '2.4.5',
        prompt: 'In a paragraph of approximately EIGHT lines, describe the changes that river E will experience after river capture has taken place.',
        clue: '💡 Think about what happens to a river that loses water.',
        answer: 'Volume decreases. Speed decreases. Length shortened. Stream order decreases. Becomes non-perennial.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `Volume of water decreases. River velocity/speed decreases. The length of the river is shortened. Stream order will decrease. River will become non-perennial (episodic/periodic). Width of the river is reduced. Size of the drainage basin decreases.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe changes to the captured river.',
          commonMistake: 'Learners describe the captor river changes instead.',
          examinerHint: 'Captured river = less water, shorter, slower.',
          alternativeAccept: ['Decreased volume', 'Reduced speed', 'Shortened length', 'Lower stream order', 'Non-perennial'],
          memoryTrick: '🧠 "Captured river = Less water + Shorter + Slower"',
          mergedCorrection: `🧠 Memory Trick: "Captured river = Less water + Shorter + Slower"\n\n📋 NSC Memo Answer:\nVolume of water decreases. River velocity/speed decreases. The length of the river is shortened. Stream order will decrease. River will become non-perennial (episodic/periodic). Width of the river is reduced. Size of the drainage basin decreases.`
        }
      }]
    }
  ]
};

const TopicLessonGeography = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [showMemoAfterAnswer, setShowMemoAfterAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const topicName = 'Climate and Weather';
  const API_URL = 'https://smartclass-wlgb.onrender.com';
  
  const levelKey = `level${currentLevel}`;
  const levelQuestions = QuestionBank[levelKey] || QuestionBank.level1;
  const activeQuestionSet = levelQuestions[currentQuestionIndex % levelQuestions.length];
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ==========================================
  // RENDER DIAGRAM IF PRESENT
  // ==========================================
  const renderDiagram = () => {
    const config = activeQuestionSet.diagramConfig;
    if (!config) return null;

    if (config.type === 'inversionPlateau' && config.component === 'AnimatedInversionPlateau') {
      return (
        <div style={{ marginBottom: '16px' }}>
          <AnimatedInversionPlateau config={config} />
        </div>
      );
    }

    if (config.type === 'pressurePattern' && config.component === 'AnimatedPressurePattern') {
      return (
        <div style={{ marginBottom: '16px' }}>
          <AnimatedPressurePattern config={config} />
        </div>
      );
    }

    return null;
  };

  const speakText = async (text) => {
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,!?()=+\-']/g, '');
      if (!cleanText.trim()) return;
      setIsSpeaking(true);
      const response = await fetch(`${API_URL}/api/neo/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });
      if (!response.ok) throw new Error('Speak failed');
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.volume = 1.0;
      audio.play().catch(() => {});
      audio.onended = () => { URL.revokeObjectURL(audioUrl); audioRef.current = null; setIsSpeaking(false); };
    } catch (error) {
      console.error('Voice error:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Welcome to Climate and Weather! Type your answer when ready!`;
    setNeoMessage(welcomeMsg);
    setTimeout(() => speakText(welcomeMsg), 800);
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    setShowMemoAfterAnswer(true);
    
    let answerDescription = currentQuestion.answer;
    if (currentQuestion.acceptAnyTwo) {
      answerDescription = `ANY TWO of: ${currentQuestion.answer}`;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the NSC memorandum.
          
          Student's answer: "${typedAnswer.trim()}"
          Correct answer: ${answerDescription}
          
          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct answers. Accept any 2.' : ''}
          
          ACCEPT SYNONYMS:
          - "isobar" = "lines of equal pressure"
          - "summer" = "warm season"
          - "winter" = "cold season"
          - "westerlies" = "westerly winds"
          - "cyclone" = "depression" = "low pressure"
          - "anticyclone" = "high pressure"
          
          MARK STRICTLY ACCORDING TO THE MEMORANDUM, BUT BE LENIENT WITH SYNONYMS.
          
          If CORRECT:
          "CORRECT: [3 words max]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake from memo]
          AGAIN: [Try again!]"`,
          subject: 'geography',
          userId: 'student',
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        setAiCorrection('');
        setAiMistake('');
        setAiTeaching('');
        const praise = "Correct!";
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/FIX:\s*([^\n]+)/) || reply.match(/TEACHING:\s*([\s\S]+)/);
        
        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '');
        
        const speakMsg = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        if (speakMsg) {
          setNeoMessage(speakMsg);
          speakText(speakMsg);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setNeoMessage('Failed to check. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The student doesn't understand. Explain it like they're 12 years old.
          
          Question: ${currentQuestion.prompt}
          
          Keep it SIMPLE. No complex terms. Just plain English.
          
          For Geography concepts:
          - Isobar = lines of equal pressure on a weather map
          - Inversion = cold air trapped below warm air
          - Westerlies = winds that blow from west to east
          - Cyclone = low pressure system with stormy weather
          - Anticyclone = high pressure system with clear weather
          
          Keep it SIMPLE. No formulas. Just plain English.`,
          subject: 'geography',
          userId: 'student',
        })
      });

      const data = await response.json();
      const reply = data.reply || '';
      
      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount(prev => prev + 1);
      setNeoMessage(reply);
      speakText(reply);
    } catch (error) {
      console.error('Alternative error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    setTypedAnswer('');
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setShowAnotherWay(false);
    setAlternativeExplanation('');
    setAlternativeCount(0);
    setIsCorrect(null);
    setShowMemoAfterAnswer(false);
    setShowClue(false);
    
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    
    if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPartIndex(0);
      
      const msgs = [
        `${firstName}, let's go!`,
        `Keep going ${firstName}!`,
        `You're doing great!`,
        `Let's continue!`,
        `You've got this!`
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
      
    } else {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setCurrentQuestionIndex(0);
      setCurrentPartIndex(0);
      
      let levelMsg = '';
      if (nextLevel === 3) {
        levelMsg = `🔥 ${firstName}, things are going to step up a bit!`;
      } else if (nextLevel === 4) {
        levelMsg = `💪 ${firstName}, let's keep pushing!`;
      } else if (nextLevel === 5) {
        levelMsg = `🏆 ${firstName}, this is the final level!`;
      } else if (nextLevel > 5) {
        levelMsg = `🎉 ${firstName}, you've completed ALL levels! You're ready for the exam!`;
        setTimeout(() => navigate(`/subjects/${subject}`), 3000);
      } else {
        levelMsg = `${firstName}, let's continue!`;
      }
      
      setNeoMessage(levelMsg);
      speakText(levelMsg);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  // Clean memo lines for display
  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText
      .split('\n')
      .filter(line => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map(line => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="tl-progress-text-mini">{currentQuestionIndex + 1}/{levelQuestions.length}</span>
        </div>
        <NeoVoiceIndicator neoMessage={neoMessage} isSpeaking={isSpeaking} />
      </header>

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>
          
          {renderDiagram()}
          
          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {isCorrect === true && showMemoAfterAnswer && (
            <div className="tl-correct-clean">
              <div className="tl-correct-msg">
                <span className="tl-correct-icon">✅</span>
                <p>Correct!</p>
              </div>
              {memoLines.length > 0 && (
                <div className="tl-memo-answer-clean">
                  <strong>All possible answers:</strong>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                    {memoLines.map((line, i) => (
                      <li key={i} style={{ marginBottom: '4px', fontSize: '14px' }}>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {isCorrect === false && showMemoAfterAnswer && (
            <div className="tl-correction-panel clean">
              <span className="tl-panel-label">Neo's Correction (Per NSC Memo)</span>
              <div className="tl-wrong-msg">
                {aiCorrection && (
                  <div className="tl-what-you-wrote">
                    <strong>Your answer:</strong>
                    <p>{aiCorrection}</p>
                  </div>
                )}
                
                {memo?.mergedCorrection && (
                  <div className="tl-memo-merged">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.6', margin: 0, background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                      {memo.mergedCorrection}
                    </pre>
                  </div>
                )}

                {showAnotherWay && alternativeExplanation && (
                  <div className="tl-alternative-approach">
                    <strong>🔄 Another way:</strong>
                    <p>{alternativeExplanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isCorrect === null && (
            <div className="tl-typed-answer-area clean">
              <div className="tl-input-wrapper">
                <textarea
                  className="tl-typed-input"
                  placeholder="Type your answer here..."
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  rows={3}
                />
                {currentQuestion.clue && (
                  <button 
                    className="tl-clue-btn"
                    onClick={() => setShowClue(!showClue)}
                    aria-label="Show clue"
                    title="Show clue"
                  >
                    <FaLightbulb />
                  </button>
                )}
              </div>
              
              {showClue && currentQuestion.clue && (
                <div className="tl-clue-popup">
                  💡 {currentQuestion.clue}
                </div>
              )}
              
              <button 
                className="tl-submit-answer-btn"
                onClick={checkTypedAnswer}
                disabled={!typedAnswer.trim() || isLoading}
              >
                {isLoading ? 'Checking...' : 'Submit Answer'} <FaArrowRight />
              </button>
            </div>
          )}

          {isCorrect !== null && (
            <div className="tl-action-buttons clean">
              {isCorrect === false && alternativeCount < 2 && (
                <button className="tl-another-way-btn" onClick={handleAnotherApproach}>
                  <FaSync /> Explain Another Way
                </button>
              )}
              <button className="tl-proceed-btn" onClick={handleProceed}>
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonGeography;