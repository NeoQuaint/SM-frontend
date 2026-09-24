// ================================================================
// src/pages/TopicLessonGeography.jsx
// Geography P1 + P2 — 5 topics, queue-based teaching
// Locked SmartClass 4-layer architecture
// ================================================================
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ================================================================
// TOPIC CONFIG
// ================================================================
const DEFAULT_TOPIC = 'climate-and-weather';

const PAPER_1_TOPICS = new Set(['climate-and-weather', 'geomorphology']);

const TOPIC_NAMES = {
  'climate-and-weather': 'Climate and Weather',
  'geomorphology': 'Geomorphology',
  'settlement-geography': 'Settlement Geography',
  'economic-geography': 'Economic Geography',
  'mapwork-gis': 'Mapwork and GIS',
};

const TOPIC_CONCEPTS = {
  'climate-and-weather': [
    'synoptic-maps', 'mid-latitude-cyclones', 'tropical-cyclones',
    'subtropical-anticyclones', 'valley-climates', 'urban-climates',
    'inversion-layers', 'berg-winds',
  ],
  'geomorphology': [
    'drainage-basins', 'river-capture', 'fluvial-landforms',
    'river-rejuvenation', 'catchment-management',
  ],
  'settlement-geography': [
    'rural-settlements', 'urban-hierarchy', 'urban-profile',
    'rural-urban-migration', 'informal-settlements',
  ],
  'economic-geography': [
    'economic-sectors', 'agriculture', 'mining',
    'core-industrial-regions', 'informal-sector',
  ],
  'mapwork-gis': [
    'map-scale-distance', 'cross-sections-gradient', 'contours-landforms',
    'gis-layers', 'map-interpretation',
  ],
};

// ================================================================
// QUESTION BANK — real NSC questions
// ================================================================
const QuestionBank = {
  level1: [
    // ——— CLIMATE: SYNOPTIC MAPS ———
    {
      id: 'L1Q1',
      source: '2022 NSC Geo P1, Q1.1.1',
      topicText: 'Synoptic Weather Maps',
      teachTopic: 'synoptic-maps',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.1',
        prompt: 'Lines that join places of equal atmospheric pressure on a synoptic weather map are known as ...',
        answer: 'Isobars',
        marks: 1, acceptAnyTwo: false,
        clue: 'Iso = equal. Bar = pressure.',
        memoFullAnswer: `Isobars`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify isobars as lines of equal pressure.',
          commonMistake: 'Learners say isotherms (temperature) or isohyets (rainfall).',
          examinerHint: 'Isobar = equal pressure.',
          alternativeAccept: ['Isobars', 'Isobar'],
          memoryTrick: '🧠 "Isobar = Equal pressure"',
          mergedCorrection: `🧠 Memory Trick: "Isobar = Equal pressure"\n\n📋 NSC Memo Answer:\nIsobars`,
        },
      }],
    },
    {
      id: 'L1Q2',
      source: '2022 NSC Geo P1, Q1.1.4',
      topicText: 'Pressure Reading',
      teachTopic: 'synoptic-maps',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.4',
        prompt: 'The atmospheric pressure reading at A is ... hPa.',
        answer: '1008',
        marks: 1, acceptAnyTwo: false,
        clue: 'Read the isobar value nearest to the low pressure.',
        memoFullAnswer: `B - 1008`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be 1008 hPa.',
          commonMistake: 'Learners guess without reading the isobar.',
          examinerHint: 'Read the nearest isobar label.',
          alternativeAccept: ['1008', '1008 hPa'],
          memoryTrick: '🧠 1008 = the low pressure value',
          mergedCorrection: `🧠 Read the nearest isobar\n\n📋 NSC Memo Answer:\n1008 hPa`,
        },
      }],
    },
    {
      id: 'L1Q3',
      source: '2022 NSC Geo P1, Q1.1.5',
      topicText: 'Ridge vs Trough',
      teachTopic: 'synoptic-maps',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.5',
        prompt: 'Feature B is known as a ...',
        answer: 'Saddle',
        marks: 1, acceptAnyTwo: false,
        clue: 'The neutral point between two highs and two lows.',
        memoFullAnswer: `D - Saddle`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be saddle.',
          commonMistake: 'Learners say ridge or trough.',
          examinerHint: 'Saddle = between two highs and two lows.',
          alternativeAccept: ['Saddle'],
          memoryTrick: '🧠 Saddle = neutral between highs and lows',
          mergedCorrection: `🧠 Saddle = neutral between highs and lows\n\n📋 NSC Memo Answer:\nSaddle`,
        },
      }],
    },
    // ——— CLIMATE: MID-LATITUDE ———
    {
      id: 'L1Q4',
      source: '2022 NSC Geo P1, Q1.3.1',
      topicText: 'Mid-latitude Cyclone Wind Belt',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.1',
        prompt: 'Name the wind belt that causes the easterly movement of the mid-latitude cyclone.',
        answer: 'Westerlies',
        marks: 1, acceptAnyTwo: false,
        clue: 'Blows from west to east.',
        memoFullAnswer: `Westerlies`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be westerlies.',
          commonMistake: 'Learners say easterlies or trade winds.',
          examinerHint: 'Mid-latitude cyclones are driven by westerlies.',
          alternativeAccept: ['Westerlies', 'Westerly winds'],
          memoryTrick: '🧠 "Westerlies = Blow west to east"',
          mergedCorrection: `🧠 Westerlies blow west to east\n\n📋 NSC Memo Answer:\nWesterlies`,
        },
      }],
    },
    {
      id: 'L1Q5',
      source: '2024 NSC Geo P1, Q1.3.1',
      topicText: 'Mid-latitude Direction',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.1',
        prompt: 'In which general direction do mid-latitude cyclones move?',
        answer: 'West to east',
        marks: 1, acceptAnyTwo: false,
        clue: 'Driven by the westerlies.',
        memoFullAnswer: `West to east`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must state west to east.',
          commonMistake: 'Learners say east to west.',
          examinerHint: 'Driven by westerlies.',
          alternativeAccept: ['West to east', 'Eastwards', 'Easterly'],
          memoryTrick: '🧠 "MLC moves west → east"',
          mergedCorrection: `🧠 West → east\n\n📋 NSC Memo Answer:\nWest to east`,
        },
      }],
    },
    // ——— CLIMATE: TROPICAL ———
    {
      id: 'L1Q6',
      source: '2023 NSC Geo P1, Q1.4.1',
      topicText: 'Tropical Cyclone Development',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.1',
        prompt: 'State ONE condition required for the development of the tropical cyclone.',
        answer: 'Coriolis force / sea surface temperature above 26.5°C',
        marks: 1, acceptAnyTwo: false,
        clue: 'Think about warm water and the spin of the Earth.',
        memoFullAnswer: `Presence of Coriolis force / Ocean surface temperature of at least 26.5 °C`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be Coriolis force OR sea surface temperature above 26.5°C.',
          commonMistake: 'Learners give irrelevant conditions.',
          examinerHint: 'Warm ocean + Coriolis.',
          alternativeAccept: ['Coriolis force', 'Sea surface temperature above 26.5°C', 'Warm ocean'],
          memoryTrick: '🧠 "Warm water + Coriolis = TC"',
          mergedCorrection: `🧠 Warm water + Coriolis = TC\n\n📋 NSC Memo Answer:\nCoriolis force / Sea surface temperature ≥ 26.5°C`,
        },
      }],
    },
    {
      id: 'L1Q7',
      source: '2023 NSC Geo P1, Q1.4.2',
      topicText: 'Tropical Cyclone Hemisphere',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.2',
        prompt: 'In which hemisphere did this cyclone develop?',
        answer: 'Southern',
        marks: 1, acceptAnyTwo: false,
        clue: 'Clockwise circulation = Southern Hemisphere.',
        memoFullAnswer: `Southern`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be Southern.',
          commonMistake: 'Learners say Northern.',
          examinerHint: 'SH = clockwise circulation.',
          alternativeAccept: ['Southern', 'Southern Hemisphere'],
          memoryTrick: '🧠 SH = clockwise spin',
          mergedCorrection: `🧠 SH = clockwise\n\n📋 NSC Memo Answer:\nSouthern`,
        },
      }],
    },
    // ——— CLIMATE: ANTICYCLONES ———
    {
      id: 'L1Q8',
      source: '2025 NSC Geo P1, Q1.1.1',
      topicText: 'Winter Pressure Cell',
      teachTopic: 'subtropical-anticyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.1',
        prompt: 'The name of the air pressure cell that dominates the interior of South Africa in winter is the ...',
        answer: 'Kalahari high',
        marks: 1, acceptAnyTwo: false,
        clue: 'Think of the high-pressure system over the interior in winter.',
        memoFullAnswer: `Kalahari high`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be Kalahari high.',
          commonMistake: 'Learners say heat low.',
          examinerHint: 'Winter = high pressure over land.',
          alternativeAccept: ['Kalahari high', 'Kalahari High'],
          memoryTrick: '🧠 "Kalahari High = Winter high pressure"',
          mergedCorrection: `🧠 Kalahari High = Winter\n\n📋 NSC Memo Answer:\nKalahari high`,
        },
      }],
    },
    {
      id: 'L1Q9',
      source: '2024 NSC Geo P1, Q1.1.3',
      topicText: 'Ridging',
      teachTopic: 'subtropical-anticyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.3',
        prompt: '... is the concept used to describe the elongation of the isobars associated with the South Atlantic anticyclone.',
        answer: 'Ridging',
        marks: 1, acceptAnyTwo: false,
        clue: 'An extension of high pressure pushing into the country.',
        memoFullAnswer: `C - Ridging`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be ridging.',
          commonMistake: 'Learners say backing or divergence.',
          examinerHint: 'Ridging = high pressure extends inland.',
          alternativeAccept: ['Ridging', 'Ridge'],
          memoryTrick: '🧠 "Ridging = High pressure extends inland"',
          mergedCorrection: `🧠 Ridging = High pressure extends inland\n\n📋 NSC Memo Answer:\nRidging`,
        },
      }],
    },
    // ——— CLIMATE: VALLEY ———
    {
      id: 'L1Q10',
      source: '2024 NSC Geo P1, Q1.2.3',
      topicText: 'Anabatic Wind',
      teachTopic: 'valley-climates',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.3',
        prompt: 'Sketch ... occurs during the day due to insolation.',
        answer: 'Anabatic wind',
        marks: 1, acceptAnyTwo: false,
        clue: 'Which wind blows UP the slope during the day?',
        memoFullAnswer: `B - Anabatic wind`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be anabatic.',
          commonMistake: 'Learners say katabatic.',
          examinerHint: 'Anabatic = day, upslope.',
          alternativeAccept: ['Anabatic', 'Anabatic wind'],
          memoryTrick: '🧠 "Anabatic = up the slope (day)"',
          mergedCorrection: `🧠 Anabatic = up the slope (day)\n\n📋 NSC Memo Answer:\nAnabatic wind`,
        },
      }],
    },
    {
      id: 'L1Q11',
      source: '2025 NSC Geo P1, Q1.2.4',
      topicText: 'Katabatic Wind',
      teachTopic: 'valley-climates',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.4',
        prompt: 'The arrows at A indicate a/an ... wind.',
        answer: 'Katabatic',
        marks: 1, acceptAnyTwo: false,
        clue: 'Which wind blows DOWN the slope at night?',
        memoFullAnswer: `Katabatic`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be katabatic.',
          commonMistake: 'Learners say anabatic.',
          examinerHint: 'Katabatic = night, downslope.',
          alternativeAccept: ['Katabatic', 'Katabatic wind'],
          memoryTrick: '🧠 "Katabatic = down the slope (night)"',
          mergedCorrection: `🧠 Katabatic = down the slope (night)\n\n📋 NSC Memo Answer:\nKatabatic`,
        },
      }],
    },
    {
      id: 'L1Q12',
      source: '2024 NSC Geo P1, Q1.2.4',
      topicText: 'Frost Formation',
      teachTopic: 'valley-climates',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.4',
        prompt: 'Frost forms on the valley floor when the temperature drops below ... °C.',
        answer: '0°C',
        marks: 1, acceptAnyTwo: false,
        clue: 'What temperature does water freeze at?',
        memoFullAnswer: `0°C`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must state 0°C.',
          commonMistake: 'Learners say 10°C or -10°C.',
          examinerHint: 'Frost forms below freezing point.',
          alternativeAccept: ['0°C', '0 degrees'],
          memoryTrick: '🧠 Frost = below 0°C',
          mergedCorrection: `🧠 Frost = below 0°C\n\n📋 NSC Memo Answer:\n0°C`,
        },
      }],
    },
    // ——— CLIMATE: URBAN ———
    {
      id: 'L1Q13',
      source: '2024 NSC Geo P1, Q1.2.6',
      topicText: 'Pollution Dispersion',
      teachTopic: 'urban-climates',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.6',
        prompt: 'Sketch ... shows pollutants are dispersed.',
        answer: 'A - Day',
        marks: 1, acceptAnyTwo: false,
        clue: 'During the DAY, does warm air rise and carry pollutants away?',
        memoFullAnswer: `A - Day`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify the daytime pollution dome.',
          commonMistake: 'Learners say B (night).',
          examinerHint: 'Day = warm air rises = pollutants disperse.',
          alternativeAccept: ['A', 'Day', 'Daytime'],
          memoryTrick: '🧠 Day = dome rises, pollutants disperse',
          mergedCorrection: `🧠 Day = dome rises\n\n📋 NSC Memo Answer:\nA - Day`,
        },
      }],
    },
    // ——— CLIMATE: INVERSION ———
    {
      id: 'L1Q14',
      source: '2022 NSC Geo P1, Q1.5.1',
      topicText: 'Inversion Layer Season',
      teachTopic: 'inversion-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.1',
        prompt: 'Identify the season illustrated in sketch A. (inversion above escarpment)',
        answer: 'Summer',
        marks: 1, acceptAnyTwo: false,
        clue: 'When does the inversion sit ABOVE the escarpment?',
        memoFullAnswer: `Summer`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be summer.',
          commonMistake: 'Learners say winter.',
          examinerHint: 'Above escarpment = summer = rain.',
          alternativeAccept: ['Summer'],
          memoryTrick: '🧠 Above escarpment = summer',
          mergedCorrection: `🧠 Above escarpment = summer\n\n📋 NSC Memo Answer:\nSummer`,
        },
      }],
    },
    // ——— CLIMATE: BERG WINDS ———
    {
      id: 'L1Q15',
      source: '2023 NSC Geo P1, Q1.5.2',
      topicText: 'Berg Wind Sketch',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.2',
        prompt: 'Which sketch (A or B) represents the formation of berg winds?',
        answer: 'B',
        marks: 1, acceptAnyTwo: false,
        clue: 'Air descends from the interior to the coast.',
        memoFullAnswer: `B`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be B.',
          commonMistake: 'Learners pick A.',
          examinerHint: 'Descending air = berg wind.',
          alternativeAccept: ['B'],
          memoryTrick: '🧠 Berg wind = descending air',
          mergedCorrection: `🧠 Berg wind = descending air\n\n📋 NSC Memo Answer:\nB`,
        },
      }],
    },
    // ——— GEOMORPHOLOGY: DRAINAGE BASINS ———
    {
      id: 'L1Q16',
      source: '2024 NSC Geo P1, Q2.1.1',
      topicText: 'Drainage Basin Definition',
      teachTopic: 'drainage-basins',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.1.1',
        prompt: 'Area drained by a river and its tributaries.',
        answer: 'Drainage basin / catchment area',
        marks: 1, acceptAnyTwo: false,
        clue: 'Both terms are accepted.',
        memoFullAnswer: `Z - drainage basin`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be drainage basin or catchment.',
          commonMistake: 'Learners say watershed.',
          examinerHint: 'Drainage basin = area drained by river + tributaries.',
          alternativeAccept: ['Drainage basin', 'Catchment area', 'Catchment'],
          memoryTrick: '🧠 Basin = area drained',
          mergedCorrection: `🧠 Basin = area drained\n\n📋 NSC Memo Answer:\nDrainage basin / catchment area`,
        },
      }],
    },
    // ——— GEOMORPHOLOGY: RIVER CAPTURE ———
    {
      id: 'L1Q17',
      source: '2023 NSC Geo P1, Q2.4.1',
      topicText: 'River Capture Power',
      teachTopic: 'river-capture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.1',
        prompt: 'Which river (A or B) has more erosive power?',
        answer: 'A',
        marks: 1, acceptAnyTwo: false,
        clue: 'Look at the elevation. Lower = faster.',
        memoFullAnswer: `A`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be A.',
          commonMistake: 'Learners pick B.',
          examinerHint: 'Lower elevation = steeper gradient = more power.',
          alternativeAccept: ['A'],
          memoryTrick: '🧠 Lower elevation = more power',
          mergedCorrection: `🧠 Lower elevation = more power\n\n📋 NSC Memo Answer:\nA`,
        },
      }],
    },
    // ——— GEOMORPHOLOGY: FLUVIAL ———
    {
      id: 'L1Q18',
      source: '2023 NSC Geo P1, Q2.2.2',
      topicText: 'Meander',
      teachTopic: 'fluvial-landforms',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.2',
        prompt: 'The fluvial landform/feature shown in the sketch is a ...',
        answer: 'Meander',
        marks: 1, acceptAnyTwo: false,
        clue: 'A bend in the river.',
        memoFullAnswer: `C - meander`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be meander.',
          commonMistake: 'Learners say oxbow.',
          examinerHint: 'Meander = bend in river.',
          alternativeAccept: ['Meander'],
          memoryTrick: '🧠 Meander = bend',
          mergedCorrection: `🧠 Meander = bend\n\n📋 NSC Memo Answer:\nMeander`,
        },
      }],
    },
    // ——— GEOMORPHOLOGY: REJUVENATION ———
    {
      id: 'L1Q19',
      source: '2023 NSC Geo P1, Q2.2.5',
      topicText: 'River Rejuvenation Cause',
      teachTopic: 'river-rejuvenation',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.5',
        prompt: 'The cause for river rejuvenation as shown in the sketch is ...',
        answer: 'A drop in sea level',
        marks: 1, acceptAnyTwo: false,
        clue: 'What happens to base level?',
        memoFullAnswer: `C - a drop in the sea level`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be a drop in sea level.',
          commonMistake: 'Learners say rise in sea level.',
          examinerHint: 'Drop in base level = rejuvenation.',
          alternativeAccept: ['A drop in sea level', 'Fall in sea level', 'Drop in base level'],
          memoryTrick: '🧠 Drop in sea level = rejuvenation',
          mergedCorrection: `🧠 Drop in sea level = rejuvenation\n\n📋 NSC Memo Answer:\nA drop in the sea level`,
        },
      }],
    },
    // ——— GEOMORPHOLOGY: CATCHMENT ———
    {
      id: 'L1Q20',
      source: '2022 NSC Geo P1, Q2.5.1',
      topicText: 'Catchment Management',
      teachTopic: 'catchment-management',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.1',
        prompt: 'What does the abbreviation DWA in the extract stand for?',
        answer: 'Department of Water Affairs',
        marks: 1, acceptAnyTwo: false,
        clue: 'Government department for water.',
        memoFullAnswer: `Department of Water Affairs`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be Department of Water Affairs.',
          commonMistake: 'Learners invent names.',
          examinerHint: 'DWA = Department of Water Affairs.',
          alternativeAccept: ['Department of Water Affairs'],
          memoryTrick: '🧠 DWA = Department of Water Affairs',
          mergedCorrection: `🧠 DWA = Department of Water Affairs\n\n📋 NSC Memo Answer:\nDepartment of Water Affairs`,
        },
      }],
    },
    // ——— SETTLEMENT: RURAL ———
    {
      id: 'L1Q21',
      source: '2023 NSC Geo P2, Q1.1.2',
      topicText: 'Site vs Situation',
      teachTopic: 'rural-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.2',
        prompt: 'The site of a settlement is ...',
        answer: 'The exact land occupied by a settlement',
        marks: 1, acceptAnyTwo: false,
        clue: 'Site = local. Situation = regional.',
        memoFullAnswer: `Y - the exact land occupied by a settlement`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be exact land occupied.',
          commonMistake: 'Learners describe situation.',
          examinerHint: 'Site = local land. Situation = position relative to surroundings.',
          alternativeAccept: ['The exact land occupied by a settlement', 'exact land'],
          memoryTrick: '🧠 Site = local, Situation = regional',
          mergedCorrection: `🧠 Site = local land\n\n📋 NSC Memo Answer:\nThe exact land occupied by a settlement`,
        },
      }],
    },
    // ——— SETTLEMENT: HIERARCHY ———
    {
      id: 'L1Q22',
      source: '2023 NSC Geo P2, Q1.2.5',
      topicText: 'Threshold Population',
      teachTopic: 'urban-hierarchy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.5',
        prompt: '... refers to the minimum number of customers needed to make a business profitable.',
        answer: 'Threshold population',
        marks: 1, acceptAnyTwo: false,
        clue: 'Minimum = threshold.',
        memoFullAnswer: `B - Threshold population`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be threshold population.',
          commonMistake: 'Learners say range.',
          examinerHint: 'Threshold = minimum customers.',
          alternativeAccept: ['Threshold population'],
          memoryTrick: '🧠 Threshold = minimum',
          mergedCorrection: `🧠 Threshold = minimum\n\n📋 NSC Memo Answer:\nThreshold population`,
        },
      }],
    },
    // ——— SETTLEMENT: URBAN PROFILE ———
    {
      id: 'L1Q23',
      source: '2024 NSC Geo P2, Q1.4.2',
      topicText: 'Urban Profile Height',
      teachTopic: 'urban-profile',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.2',
        prompt: 'Comment on the height of buildings in the CBD in comparison to those in the rural-urban fringe.',
        answer: 'Buildings are taller in the CBD',
        marks: 1, acceptAnyTwo: false,
        clue: 'Higher land value = taller buildings.',
        memoFullAnswer: `Height of buildings decreases (from CBD to rural-urban fringe)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention height decreases away from CBD.',
          commonMistake: 'Learners say "bigger" without direction.',
          examinerHint: 'CBD = tallest. Rural-urban fringe = lowest.',
          alternativeAccept: ['Buildings are taller in the CBD', 'Height decreases from CBD outward'],
          memoryTrick: '🧠 Taller in CBD',
          mergedCorrection: `🧠 Taller in CBD\n\n📋 NSC Memo Answer:\nHeight of buildings decreases from CBD outward`,
        },
      }],
    },
    // ——— SETTLEMENT: MIGRATION ———
    {
      id: 'L1Q24',
      source: '2024 NSC Geo P2, Q1.3.2',
      topicText: 'Rural Poverty Trend',
      teachTopic: 'rural-urban-migration',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.2',
        prompt: 'According to the graph, the percentage level of poverty decreased by a smaller amount in (rural/urban) areas.',
        answer: 'rural',
        marks: 1, acceptAnyTwo: false,
        clue: 'Look at the flatter line on the graph.',
        memoFullAnswer: `rural`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be rural.',
          commonMistake: 'Learners say urban.',
          examinerHint: 'Rural line flattens — smaller decrease.',
          alternativeAccept: ['rural'],
          memoryTrick: '🧠 Rural = smaller decrease',
          mergedCorrection: `🧠 Rural = smaller decrease\n\n📋 NSC Memo Answer:\nrural`,
        },
      }],
    },
    // ——— SETTLEMENT: INFORMAL ———
    {
      id: 'L1Q25',
      source: '2024 NSC Geo P2, Q1.5.2',
      topicText: 'Informal Settlement Health',
      teachTopic: 'informal-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.2',
        prompt: 'State ONE factor in the extract that has a negative impact on the health of residents in informal settlements.',
        answer: 'Lack of basic services / pollution / poor waste management',
        marks: 1, acceptAnyTwo: false,
        clue: 'What does the extract say residents lack?',
        memoFullAnswer: `Lack of basic services / Pollution`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention a health-impacting factor.',
          commonMistake: 'Learners say "poverty" without specific factor.',
          examinerHint: 'Focus on health impact, not general poverty.',
          alternativeAccept: ['Lack of basic services', 'Pollution', 'Overcrowding', 'Poor waste management'],
          memoryTrick: '🧠 Lack of services = health risk',
          mergedCorrection: `🧠 Lack of services = health risk\n\n📋 NSC Memo Answer:\nLack of basic services / Pollution`,
        },
      }],
    },
    // ——— ECONOMIC: SECTORS ———
    {
      id: 'L1Q26',
      source: '2023 NSC Geo P2, Q2.2.1',
      topicText: 'Tertiary Sector',
      teachTopic: 'economic-sectors',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.1',
        prompt: 'The tertiary sector is also referred to as the ... sector.',
        answer: 'service',
        marks: 1, acceptAnyTwo: false,
        clue: 'Another word for tertiary.',
        memoFullAnswer: `B - service`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be service.',
          commonMistake: 'Learners say secondary.',
          examinerHint: 'Tertiary = services.',
          alternativeAccept: ['service', 'services'],
          memoryTrick: '🧠 Tertiary = services',
          mergedCorrection: `🧠 Tertiary = services\n\n📋 NSC Memo Answer:\nservice`,
        },
      }],
    },
    // ——— ECONOMIC: AGRICULTURE ———
    {
      id: 'L1Q27',
      source: '2023 NSC Geo P2, Q2.3.1',
      topicText: 'Main Maize Province',
      teachTopic: 'agriculture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.1',
        prompt: 'Name the main maize-producing province (A) in South Africa.',
        answer: 'Free State',
        marks: 1, acceptAnyTwo: false,
        clue: 'Central South Africa.',
        memoFullAnswer: `Free State`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be Free State.',
          commonMistake: 'Learners say North West or Mpumalanga.',
          examinerHint: 'Free State = maize capital.',
          alternativeAccept: ['Free State'],
          memoryTrick: '🧠 Free State = maize',
          mergedCorrection: `🧠 Free State = maize\n\n📋 NSC Memo Answer:\nFree State`,
        },
      }],
    },
    // ——— ECONOMIC: MINING ———
    {
      id: 'L1Q28',
      source: '2023 NSC Geo P2, Q2.1.1',
      topicText: 'Mining Sector',
      teachTopic: 'mining',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.1.1',
        prompt: 'Mining is an example of a (primary/secondary) economic activity.',
        answer: 'primary',
        marks: 1, acceptAnyTwo: false,
        clue: 'Direct from nature.',
        memoFullAnswer: `primary`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be primary.',
          commonMistake: 'Learners say secondary.',
          examinerHint: 'Mining extracts from nature — primary.',
          alternativeAccept: ['primary'],
          memoryTrick: '🧠 Mining = primary',
          mergedCorrection: `🧠 Mining = primary\n\n📋 NSC Memo Answer:\nprimary`,
        },
      }],
    },
    // ——— ECONOMIC: REGIONS ———
    {
      id: 'L1Q29',
      source: '2023 NSC Geo P2, Q2.4.1',
      topicText: 'PE-Uitenhage Transport',
      teachTopic: 'core-industrial-regions',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.1',
        prompt: 'Name the type of transport infrastructure indicated on the map, which favours the location of the Port Elizabeth-Uitenhage core industrial region.',
        answer: 'Harbour',
        marks: 1, acceptAnyTwo: false,
        clue: 'Coega has one of these.',
        memoFullAnswer: `Harbour`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be harbour.',
          commonMistake: 'Learners say airport or railway.',
          examinerHint: 'PE-Uitenhage benefits from a harbour.',
          alternativeAccept: ['Harbour', 'Port'],
          memoryTrick: '🧠 Harbour = industrial pull',
          mergedCorrection: `🧠 Harbour = industrial pull\n\n📋 NSC Memo Answer:\nHarbour`,
        },
      }],
    },
    // ——— ECONOMIC: INFORMAL ———
    {
      id: 'L1Q30',
      source: '2023 NSC Geo P2, Q2.5.1',
      topicText: 'Informal Sector %',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.1',
        prompt: 'According to the graph, what percentage of South Africa\'s population is classified as the informal sector?',
        answer: '20%',
        marks: 1, acceptAnyTwo: false,
        clue: 'Read the SA bar on the graph.',
        memoFullAnswer: `20%`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be 20%.',
          commonMistake: 'Learners guess.',
          examinerHint: 'SA bar on the graph shows 20%.',
          alternativeAccept: ['20', '20%'],
          memoryTrick: '🧠 SA = 20%',
          mergedCorrection: `🧠 SA = 20%\n\n📋 NSC Memo Answer:\n20%`,
        },
      }],
    },
    // ——— MAPWORK: SCALE ———
    {
      id: 'L1Q31',
      source: '2023 NSC Geo P2, Q3.1.1',
      topicText: 'Orthophoto Scale',
      teachTopic: 'map-scale-distance',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.1',
        prompt: 'The scale of the orthophoto map:',
        answer: '1 cm represents 100 m',
        marks: 1, acceptAnyTwo: false,
        clue: '1:10 000 means 1 cm = 100 m.',
        memoFullAnswer: `A - 1 cm represents 100 m`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be 1 cm = 100 m.',
          commonMistake: 'Learners confuse with topographic (500 m).',
          examinerHint: 'Orthophoto = 1:10 000 = 100 m per cm.',
          alternativeAccept: ['1 cm represents 100 m', '1 cm = 100 m'],
          memoryTrick: '🧠 Orthophoto = 100 m per cm',
          mergedCorrection: `🧠 Orthophoto = 100 m per cm\n\n📋 NSC Memo Answer:\n1 cm represents 100 m`,
        },
      }],
    },
    // ——— MAPWORK: GRADIENT ———
    {
      id: 'L1Q32',
      source: '2024 NSC Geo P2, Q3.1.6',
      topicText: 'Steep or Gentle',
      teachTopic: 'cross-sections-gradient',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.6',
        prompt: 'Is the gradient (answer to QUESTION 3.1.5) steep or gentle?',
        answer: 'Gentle',
        marks: 1, acceptAnyTwo: false,
        clue: 'Look at the ratio.',
        memoFullAnswer: `Gentle`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be gentle.',
          commonMistake: 'Learners say steep.',
          examinerHint: 'Large second number = gentle gradient.',
          alternativeAccept: ['Gentle'],
          memoryTrick: '🧠 1 : 40 = gentle',
          mergedCorrection: `🧠 1 : 40 = gentle\n\n📋 NSC Memo Answer:\nGentle`,
        },
      }],
    },
    // ——— MAPWORK: CONTOURS ———
    {
      id: 'L1Q33',
      source: '2023 NSC Geo P2, Q3.1.2',
      topicText: 'Contour Interval',
      teachTopic: 'contours-landforms',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.2',
        prompt: 'The contour interval on the orthophoto map is ... metres.',
        answer: '10',
        marks: 1, acceptAnyTwo: false,
        clue: 'Check the scale.',
        memoFullAnswer: `B - 10`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be 10 m.',
          commonMistake: 'Learners say 20 m (topographic).',
          examinerHint: 'Orthophoto contour interval = 10 m.',
          alternativeAccept: ['10', '10 m'],
          memoryTrick: '🧠 Orthophoto = 10 m contour interval',
          mergedCorrection: `🧠 Orthophoto = 10 m\n\n📋 NSC Memo Answer:\n10`,
        },
      }],
    },
    // ——— MAPWORK: GIS ———
    {
      id: 'L1Q34',
      source: '2023 NSC Geo P2, Q3.3.4',
      topicText: 'Raster Data',
      teachTopic: 'gis-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.3.4',
        prompt: 'A (topographical map/orthophoto map) is a representation of raster data.',
        answer: 'orthophoto map',
        marks: 1, acceptAnyTwo: false,
        clue: 'Pixel-based image.',
        memoFullAnswer: `Orthophoto map`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be orthophoto map.',
          commonMistake: 'Learners say topographical map.',
          examinerHint: 'Orthophoto = pixel-based = raster.',
          alternativeAccept: ['Orthophoto map', 'Orthophoto'],
          memoryTrick: '🧠 Orthophoto = raster',
          mergedCorrection: `🧠 Orthophoto = raster\n\n📋 NSC Memo Answer:\nOrthophoto map`,
        },
      }],
    },
    // ——— MAPWORK: INTERPRETATION ———
    {
      id: 'L1Q35',
      source: '2024 NSC Geo P2, Q3.2.1',
      topicText: 'Settlement Pattern',
      teachTopic: 'map-interpretation',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.2.1',
        prompt: 'The main settlement pattern at area 8 in blocks D1 and E1 on the orthophoto map is ...',
        answer: 'nucleated',
        marks: 1, acceptAnyTwo: false,
        clue: 'Clustered together.',
        memoFullAnswer: `B - nucleated`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be nucleated.',
          commonMistake: 'Learners say dispersed.',
          examinerHint: 'Clustered = nucleated.',
          alternativeAccept: ['nucleated'],
          memoryTrick: '🧠 Clustered = nucleated',
          mergedCorrection: `🧠 Clustered = nucleated\n\n📋 NSC Memo Answer:\nnucleated`,
        },
      }],
    },
  ],

  level2: [
    // CLIMATE — MID-LATITUDE
    {
      id: 'L2Q1',
      source: '2022 NSC Geo P1, Q1.3.4',
      topicText: 'Cold Front Speed',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'Give a reason why front A is moving faster than front B.',
        answer: 'Wind speed behind the cold front is faster (30 knots)',
        marks: 2, acceptAnyTwo: false,
        clue: 'Look at the wind speeds on the plan view.',
        memoFullAnswer: `The windspeed behind the cold front is faster (30 knots)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention wind speed or pressure gradient.',
          commonMistake: 'Learners say "cold front moves faster" without reason.',
          examinerHint: 'Check the wind speed values on the plan view.',
          alternativeAccept: ['Wind speed behind cold front is faster', '30 knots', 'Steeper pressure gradient'],
          memoryTrick: '🧠 "Cold front = Faster (30 knots)"',
          mergedCorrection: `🧠 Cold front = Faster (30 knots)\n\n📋 NSC Memo Answer:\nThe windspeed behind the cold front is faster (30 knots)`,
        },
      }],
    },
    {
      id: 'L2Q2',
      source: '2022 NSC Geo P1, Q1.3.5',
      topicText: 'Southern Hemisphere Evidence',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.5',
        prompt: 'Give evidence from the sketch that the mid-latitude cyclone is found in the Southern Hemisphere.',
        answer: 'Clockwise circulation of air',
        marks: 2, acceptAnyTwo: false,
        clue: 'Direction of circulation.',
        memoFullAnswer: `Clockwise circulation of air`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give evidence from the sketch.',
          commonMistake: 'Learners give general statements.',
          examinerHint: 'Southern Hemisphere = clockwise.',
          alternativeAccept: ['Clockwise circulation', 'Warm sector to the north', 'Cold front is to the north'],
          memoryTrick: '🧠 "Southern = Clockwise"',
          mergedCorrection: `🧠 Southern = Clockwise\n\n📋 NSC Memo Answer:\nClockwise circulation of air`,
        },
      }],
    },
    {
      id: 'L2Q3',
      source: '2024 NSC Geo P1, Q1.3.2',
      topicText: 'Wave Formation',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.2',
        prompt: 'Give a reason for your answer to QUESTION 1.3.1.',
        answer: 'Driven by the westerlies',
        marks: 2, acceptAnyTwo: false,
        clue: 'Which wind belt?',
        memoFullAnswer: `Driven by the westerlies`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention westerlies.',
          commonMistake: 'Learners say "wind" without specifying.',
          examinerHint: 'Westerlies blow west to east.',
          alternativeAccept: ['Driven by the westerlies', 'Occurs in the westerly wind belt'],
          memoryTrick: '🧠 MLC driven by Westerlies',
          mergedCorrection: `🧠 MLC driven by Westerlies\n\n📋 NSC Memo Answer:\nDriven by the westerlies`,
        },
      }],
    },
    // CLIMATE — TROPICAL
    {
      id: 'L2Q4',
      source: '2024 NSC Geo P1, Q1.4.2',
      topicText: 'TC Strengthening Evidence',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.2',
        prompt: 'Give evidence from the map and table of information that Tropical Cyclone Filipo had strengthened from 10 to 11 March.',
        answer: 'Wind speed increased from 63 km/h to 95 km/h',
        marks: 2, acceptAnyTwo: false,
        clue: 'Compare wind speeds between the two dates.',
        memoFullAnswer: `Wind speed increased from 63 km/h to 95 km/h / 116 km/h`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must reference increase in wind speed.',
          commonMistake: 'Learners say "it got stronger" without evidence.',
          examinerHint: 'Wind speed went from 63 to 95/116 km/h.',
          alternativeAccept: ['Wind speed increased', 'Exposed to more moisture', 'Pressure dropped'],
          memoryTrick: '🧠 TC strengthens = wind speed increases',
          mergedCorrection: `🧠 TC strengthens = wind speed increases\n\n📋 NSC Memo Answer:\nWind speed increased from 63 to 95/116 km/h`,
        },
      }],
    },
    {
      id: 'L2Q5',
      source: '2025 NSC Geo P1, Q1.4.2',
      topicText: 'TC Development Reasons',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.2',
        prompt: 'Give TWO reasons in the fact file to support your answer to QUESTION 1.4.1 (immature stage on 8 Jan).',
        answer: 'Pressure 996 hPa / wind speed 75 km/h',
        marks: 2, acceptAnyTwo: true,
        clue: 'Look at the pressure and wind speed.',
        memoFullAnswer: `The pressure in the centre is 996 hPa / Wind speed is 75 km/h`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must cite values from the fact file.',
          commonMistake: 'Learners give unrelated facts.',
          examinerHint: 'Pressure 996 hPa and wind speed 75 km/h.',
          alternativeAccept: ['996 hPa', '75 km/h'],
          memoryTrick: '🧠 996 hPa + 75 km/h = immature',
          mergedCorrection: `🧠 996 hPa + 75 km/h = immature\n\n📋 NSC Memo Answer:\n996 hPa and 75 km/h`,
        },
      }],
    },
    // CLIMATE — ANTICYCLONES
    {
      id: 'L2Q6',
      source: '2025 NSC Geo P1, Q1.1.2',
      topicText: 'Air Movement Highs',
      teachTopic: 'subtropical-anticyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.2',
        prompt: 'Air movement associated with high-pressure cells is ...',
        answer: 'divergence',
        marks: 2, acceptAnyTwo: false,
        clue: 'Does air move inward or outward in a high?',
        memoFullAnswer: `Z - divergence`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be divergence.',
          commonMistake: 'Learners say convergence.',
          examinerHint: 'High pressure = diverging air.',
          alternativeAccept: ['Divergence', 'Diverging'],
          memoryTrick: '🧠 High = divergent air',
          mergedCorrection: `🧠 High = divergent air\n\n📋 NSC Memo Answer:\nDivergence`,
        },
      }],
    },
    // CLIMATE — BERG WINDS
    {
      id: 'L2Q7',
      source: '2025 NSC Geo P1, Q1.5.2',
      topicText: 'Berg Wind Evidence',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.2',
        prompt: 'Give evidence from the synoptic weather map to support your answer to QUESTION 1.5.1.',
        answer: 'High temperature (34°C) / low humidity / clear skies',
        marks: 2, acceptAnyTwo: false,
        clue: 'Hot, dry, clear.',
        memoFullAnswer: `High air temperatures (34°C or 27°C) / low humidity / clear skies`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give weather evidence from map.',
          commonMistake: 'Learners name a city without evidence.',
          examinerHint: 'Berg winds = hot + dry + clear.',
          alternativeAccept: ['High temperatures', 'Low humidity', 'Clear skies', 'Kalahari HP + coastal LP'],
          memoryTrick: '🧠 Berg wind = hot + dry',
          mergedCorrection: `🧠 Berg wind = hot + dry\n\n📋 NSC Memo Answer:\nHigh temps / Low humidity / Clear skies`,
        },
      }],
    },
    // CLIMATE — INVERSION
    {
      id: 'L2Q8',
      source: '2022 NSC Geo P1, Q1.5.2',
      topicText: 'Inversion Summer Reason',
      teachTopic: 'inversion-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.2',
        prompt: 'Give a reason for your answer to QUESTION 1.5.1 (summer).',
        answer: 'Inversion layer is above the escarpment',
        marks: 2, acceptAnyTwo: false,
        clue: 'Position of the inversion.',
        memoFullAnswer: `The inversion layer is above the escarpment/plateau`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention inversion position.',
          commonMistake: 'Learners say "it is wet".',
          examinerHint: 'Above escarpment = summer.',
          alternativeAccept: ['Inversion above the escarpment', 'Inversion above the plateau', 'Weak descending air'],
          memoryTrick: '🧠 Inversion above = summer',
          mergedCorrection: `🧠 Inversion above = summer\n\n📋 NSC Memo Answer:\nInversion layer is above the escarpment`,
        },
      }],
    },
    // GEOMORPHOLOGY — DRAINAGE BASINS
    {
      id: 'L2Q9',
      source: '2024 NSC Geo P1, Q2.1.2',
      topicText: 'Rapid Water Table Rise',
      teachTopic: 'drainage-basins',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.1.2',
        prompt: 'Promotes a rapid rise in the water table.',
        answer: 'Gentle gradient',
        marks: 2, acceptAnyTwo: false,
        clue: 'Think about infiltration vs runoff.',
        memoFullAnswer: `Y - gentle gradient`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be gentle gradient.',
          commonMistake: 'Learners say steep.',
          examinerHint: 'Gentle = water soaks in = water table rises.',
          alternativeAccept: ['Gentle gradient', 'Gentle slope'],
          memoryTrick: '🧠 Gentle = infiltration = water table rises',
          mergedCorrection: `🧠 Gentle = water table rises\n\n📋 NSC Memo Answer:\nGentle gradient`,
        },
      }],
    },
    // GEOMORPHOLOGY — FLUVIAL
    {
      id: 'L2Q10',
      source: '2022 NSC Geo P1, Q2.4.3c',
      topicText: 'Erosion at Meander',
      teachTopic: 'fluvial-landforms',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.3c',
        prompt: 'Give a reason for your answer to QUESTION 2.4.3(b) (erosion at B).',
        answer: 'The river flows faster at the outer bank',
        marks: 2, acceptAnyTwo: false,
        clue: 'Where does the water move fastest?',
        memoFullAnswer: `The river flows faster (at the outer bank)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention faster flow at outer bank.',
          commonMistake: 'Learners say "the water is deeper".',
          examinerHint: 'Fast flow at outer bank → erosion.',
          alternativeAccept: ['The river flow is faster at the outer bank', 'The river has more energy'],
          memoryTrick: '🧠 Fast flow = outer bank erosion',
          mergedCorrection: `🧠 Fast flow at outer bank = erosion\n\n📋 NSC Memo Answer:\nThe river flows faster at the outer bank`,
        },
      }],
    },
    // GEOMORPHOLOGY — CATCHMENT
    {
      id: 'L2Q11',
      source: '2023 NSC Geo P1, Q2.5.4b',
      topicText: 'Water Table Impact',
      teachTopic: 'catchment-management',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.4b',
        prompt: 'Describe the positive impact of the removal of alien plants on the water table.',
        answer: 'The water table will be higher',
        marks: 2, acceptAnyTwo: false,
        clue: 'Alien plants drink groundwater.',
        memoFullAnswer: `The water table will be higher`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must state water table rises.',
          commonMistake: 'Learners say "water becomes clean".',
          examinerHint: 'Fewer plants drinking = more water in ground.',
          alternativeAccept: ['The water table will be higher', 'Water table rises'],
          memoryTrick: '🧠 Remove aliens → water table rises',
          mergedCorrection: `🧠 Remove aliens → water table rises\n\n📋 NSC Memo Answer:\nThe water table will be higher`,
        },
      }],
    },
    // SETTLEMENT — RURAL
    {
      id: 'L2Q12',
      source: '2023 NSC Geo P2, Q1.3.2',
      topicText: 'Missing Rural Services',
      teachTopic: 'rural-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.2',
        prompt: 'Name TWO social services in the extract that are lacking in the Alfred Nzo District.',
        answer: 'Water / healthcare / education',
        marks: 2, acceptAnyTwo: true,
        clue: 'Read the extract.',
        memoFullAnswer: `Water / Healthcare / Education`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must name two services from extract.',
          commonMistake: 'Learners invent services.',
          examinerHint: 'Extract mentions water, healthcare and education.',
          alternativeAccept: ['Water', 'Healthcare', 'Education'],
          memoryTrick: '🧠 Water + Healthcare + Education',
          mergedCorrection: `🧠 Water + Healthcare + Education\n\n📋 NSC Memo Answer:\nWater / Healthcare / Education`,
        },
      }],
    },
    // SETTLEMENT — HIERARCHY
    {
      id: 'L2Q13',
      source: '2023 NSC Geo P2, Q1.2.4',
      topicText: 'High Order Range',
      teachTopic: 'urban-hierarchy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.4',
        prompt: 'The range of a high-order good is ...',
        answer: 'large due to its high cost',
        marks: 2, acceptAnyTwo: false,
        clue: 'People travel further for expensive goods.',
        memoFullAnswer: `D - large due to its high cost`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be large due to high cost.',
          commonMistake: 'Learners say small.',
          examinerHint: 'High-order = expensive = people travel further.',
          alternativeAccept: ['Large due to its high cost', 'Large because it is expensive'],
          memoryTrick: '🧠 Expensive = large range',
          mergedCorrection: `🧠 Expensive = large range\n\n📋 NSC Memo Answer:\nLarge due to its high cost`,
        },
      }],
    },
    // SETTLEMENT — INFORMAL
    {
      id: 'L2Q14',
      source: '2024 NSC Geo P2, Q1.5.3',
      topicText: 'Informal Settlement Growth',
      teachTopic: 'informal-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.3',
        prompt: 'Explain TWO economic reasons for the increase in informal settlements.',
        answer: 'Unemployment / low wages / poverty / unaffordable formal housing',
        marks: 4, acceptAnyTwo: true,
        clue: 'Economic reasons — jobs, wages, cost of housing.',
        memoFullAnswer: `High levels of unemployment / Lower wages / High levels of poverty / Unaffordable formal housing`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two economic reasons. 2 marks each.',
          commonMistake: 'Learners only give one reason.',
          examinerHint: 'Think jobs, wages, cost of housing.',
          alternativeAccept: ['Unemployment', 'Low wages', 'Poverty', 'High interest rates', 'Cheaper rent'],
          memoryTrick: '🧠 Jobs + wages + housing cost',
          mergedCorrection: `🧠 Jobs + wages + housing cost\n\n📋 NSC Memo Answer:\nUnemployment / Low wages / Poverty / Unaffordable housing`,
        },
      }],
    },
    // ECONOMIC — SECTORS
    {
      id: 'L2Q15',
      source: '2023 NSC Geo P2, Q2.2.3',
      topicText: 'Tertiary Sector Features',
      teachTopic: 'economic-sectors',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.3',
        prompt: 'Countries that are dominated by the tertiary sector reflect a/an ...',
        answer: 'highly skilled labour force and efficient transport system',
        marks: 2, acceptAnyTwo: false,
        clue: 'Services need skills and good infrastructure.',
        memoFullAnswer: `C - (i) highly skilled labour force and (iii) efficient transport system`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be (i) and (iii).',
          commonMistake: 'Learners pick mining-related answers.',
          examinerHint: 'Tertiary = skills + transport.',
          alternativeAccept: ['Highly skilled labour force', 'Efficient transport system'],
          memoryTrick: '🧠 Tertiary = skills + transport',
          mergedCorrection: `🧠 Tertiary = skills + transport\n\n📋 NSC Memo Answer:\nHighly skilled labour force + efficient transport system`,
        },
      }],
    },
    // ECONOMIC — AGRICULTURE
    {
      id: 'L2Q16',
      source: '2023 NSC Geo P2, Q2.3.2',
      topicText: 'Maize Production vs Export',
      teachTopic: 'agriculture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.2',
        prompt: 'Refer to the graph. Compare the amount of maize produced to the amount that is exported.',
        answer: 'More is produced than is exported',
        marks: 2, acceptAnyTwo: false,
        clue: 'Compare production and export bars.',
        memoFullAnswer: `More is produced than is exported`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must note production exceeds exports.',
          commonMistake: 'Learners say "equal".',
          examinerHint: 'Production bars are much higher than export bars.',
          alternativeAccept: ['More is produced than is exported', 'Production exceeds exports'],
          memoryTrick: '🧠 Production > exports',
          mergedCorrection: `🧠 Production > exports\n\n📋 NSC Memo Answer:\nMore is produced than is exported`,
        },
      }],
    },
    // ECONOMIC — MINING
    {
      id: 'L2Q17',
      source: '2024 NSC Geo P2, Q2.3.4',
      topicText: 'Fewer Mining Employees',
      teachTopic: 'mining',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.4',
        prompt: 'Give ONE possible reason for the small number of employees (2021–2022).',
        answer: 'Depletion of coal / mechanisation / strikes',
        marks: 2, acceptAnyTwo: false,
        clue: 'Why would mines need fewer workers?',
        memoFullAnswer: `Depletion of coal / Impact of illness / Strikes / Increase in mechanisation`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give one valid reason.',
          commonMistake: 'Learners give reasons not linked to employment.',
          examinerHint: 'Depletion, mechanisation, or labour issues.',
          alternativeAccept: ['Depletion of coal', 'Mechanisation', 'Strikes', 'Illness'],
          memoryTrick: '🧠 Depletion or mechanisation = fewer jobs',
          mergedCorrection: `🧠 Depletion or mechanisation = fewer jobs\n\n📋 NSC Memo Answer:\nDepletion of coal / Mechanisation / Strikes`,
        },
      }],
    },
    // ECONOMIC — REGIONS
    {
      id: 'L2Q18',
      source: '2024 NSC Geo P2, Q2.4.2',
      topicText: 'Gauteng Labour Force',
      teachTopic: 'core-industrial-regions',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.2',
        prompt: 'Quote evidence from the extract that shows why 31% of South Africa\'s labour force is found in the Gauteng (PWV) core industrial region.',
        answer: 'Sector employing over half a million people',
        marks: 2, acceptAnyTwo: false,
        clue: 'Find the statistic about employment.',
        memoFullAnswer: `'sector employing over half a million people'`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must quote from extract.',
          commonMistake: 'Learners paraphrase.',
          examinerHint: 'Find the employment stat in the extract.',
          alternativeAccept: ['Employing over half a million people'],
          memoryTrick: '🧠 Half a million people',
          mergedCorrection: `🧠 Half a million people\n\n📋 NSC Memo Answer:\n'sector employing over half a million people'`,
        },
      }],
    },
    // MAPWORK — SCALE
    {
      id: 'L2Q19',
      source: '2022 NSC Geo P1, Q3.1.3',
      topicText: 'Distance Calculation',
      teachTopic: 'map-scale-distance',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.3',
        prompt: 'Calculate the straight-line distance in metres that the power line covers from 6 in block B3 to 7 in block C5.',
        answer: '900 m (range 890–910 m)',
        marks: 2, acceptAnyTwo: false,
        clue: 'Actual distance = Map distance × Map scale.',
        memoFullAnswer: `Distance = Map distance × Map scale = 9 cm × 100 = 900 m`,
        formulas: ['Actual Distance = Map distance × Map scale'],
        memoCorrection: {
          whatToCheck: 'Must apply formula correctly.',
          commonMistake: 'Learners forget to convert.',
          examinerHint: '1:10 000 orthophoto — 1 cm = 100 m.',
          alternativeAccept: ['900', '900 m', '890 m', '910 m'],
          memoryTrick: '🧠 Map × Scale = Actual',
          mergedCorrection: `🧠 Map × Scale = Actual\n• 9 cm × 100 m/cm = 900 m\n\n📋 NSC Memo Answer:\n900 m`,
        },
      }],
    },
    // MAPWORK — GRADIENT
    {
      id: 'L2Q20',
      source: '2023 NSC Geo P1, Q3.1.5',
      topicText: 'Average Gradient',
      teachTopic: 'cross-sections-gradient',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.5',
        prompt: 'Calculate the average gradient from 6 in block D4 to 7 in spot height 1567 in block D2. HE = 950 m.',
        answer: '1 : 6.46',
        marks: 3, acceptAnyTwo: false,
        clue: 'VI = height difference.',
        memoFullAnswer: `VI = 1 567 m − 1 420 m = 147 m
Average Gradient = 147 / 950 = 1 : 6.46`,
        formulas: ['Average Gradient = VI ÷ HE'],
        memoCorrection: {
          whatToCheck: 'Must show VI calculation and correct ratio.',
          commonMistake: 'Learners forget to convert units.',
          examinerHint: 'VI ÷ HE = 147 ÷ 950 = 1 : 6.46.',
          alternativeAccept: ['1:6.46', '1:6.5'],
          memoryTrick: '🧠 VI ÷ HE = Gradient',
          mergedCorrection: `🧠 VI ÷ HE\n• VI = 147 m\n• HE = 950 m\n• 147/950 = 1 : 6.46\n\n📋 NSC Memo Answer:\n1 : 6.46`,
        },
      }],
    },
    // MAPWORK — GIS
    {
      id: 'L2Q21',
      source: '2023 NSC Geo P2, Q3.3.3',
      topicText: 'Raster Data Definition',
      teachTopic: 'gis-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.3.3',
        prompt: 'Define the concept raster data.',
        answer: 'A representation of geographical features using pixels/grid cells',
        marks: 2, acceptAnyTwo: false,
        clue: 'Pixels.',
        memoFullAnswer: `A representation of geographical features using pixels / grid cells`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention pixels or grid cells.',
          commonMistake: 'Learners describe vector.',
          examinerHint: 'Raster = pixels.',
          alternativeAccept: ['Pixels', 'Grid cells', 'A representation using pixels'],
          memoryTrick: '🧠 Raster = pixels',
          mergedCorrection: `🧠 Raster = pixels\n\n📋 NSC Memo Answer:\nA representation using pixels / grid cells`,
        },
      }],
    },
    // MAPWORK — INTERPRETATION
    {
      id: 'L2Q22',
      source: '2024 NSC Geo P2, Q3.2.3a',
      topicText: 'Grid Iron Street Pattern',
      teachTopic: 'map-interpretation',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.2.3a',
        prompt: 'How did topography influence the development of the gridiron street pattern evident in this residential area?',
        answer: 'Land is flat / gently sloping, making it easy to lay out',
        marks: 2, acceptAnyTwo: false,
        clue: 'Think about why grid patterns need flat land.',
        memoFullAnswer: `Easier to lay out / Land is flat / gently sloping`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention flat or gently sloping land.',
          commonMistake: 'Learners say "cheaper land".',
          examinerHint: 'Grid patterns need flat land.',
          alternativeAccept: ['Easier to layout', 'Land is flat', 'Gently sloping'],
          memoryTrick: '🧠 Flat land = grid pattern',
          mergedCorrection: `🧠 Flat land = grid pattern\n\n📋 NSC Memo Answer:\nFlat or gently sloping land`,
        },
      }],
    },
  ],

  level3: [
    // CLIMATE — MID-LATITUDE
    {
      id: 'L3Q1',
      source: '2024 NSC Geo P1, Q1.3.3',
      topicText: 'Cumulonimbus Formation',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.3',
        prompt: 'How does front A give rise to the formation of cumulonimbus clouds?',
        answer: 'Cold front undercuts warm air → rapid uplift → cooling and condensation',
        marks: 4, acceptAnyTwo: false,
        clue: 'Cold meets warm. Warm rises fast.',
        memoFullAnswer: `Cold front will undercut the warm air ahead of it. Rapid uplift of warm air. Cooling and condensation.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the process of cloud formation.',
          commonMistake: 'Learners say "cold front causes rain" without explanation.',
          examinerHint: 'Cold air lifts warm air → condensation → clouds.',
          alternativeAccept: ['Undercuts warm air', 'Rapid uplift', 'Cooling and condensation'],
          memoryTrick: '🧠 Cold + Warm = Uplift + Cooling = Clouds',
          mergedCorrection: `🧠 Cold + Warm = Uplift + Cooling = Clouds\n\n📋 NSC Memo Answer:\nCold front undercuts warm air. Rapid uplift. Cooling and condensation.`,
        },
      }],
    },
    {
      id: 'L3Q2',
      source: '2025 NSC Geo P1, Q1.3.6',
      topicText: 'Occlusion Formation',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.6',
        prompt: 'Explain how the difference in temperature of the air masses behind the cold front and ahead of the warm front will result in the formation of a cold front occlusion.',
        answer: 'Air behind cold front is colder → cold air undercuts → warm air forced to rise → occlusion',
        marks: 4, acceptAnyTwo: false,
        clue: 'Cold front catches warm front.',
        memoFullAnswer: `Air behind the cold front is colder than the air ahead of the warm front. The cold air undercuts the warmer air. The warmer (less dense) air is uplifted over the colder (denser) air.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the process of occlusion.',
          commonMistake: 'Learners describe weather without explaining process.',
          examinerHint: 'Cold catches warm → undercuts → warm rises.',
          alternativeAccept: ['Cold air undercuts warm air', 'Warm air forced to rise', 'Warm sector narrows'],
          memoryTrick: '🧠 Cold catches warm → occlusion',
          mergedCorrection: `🧠 Cold catches warm → occlusion\n\n📋 NSC Memo Answer:\nCold air undercuts warm air. Warm air rises. Occlusion forms.`,
        },
      }],
    },
    // CLIMATE — TROPICAL
    {
      id: 'L3Q3',
      source: '2024 NSC Geo P1, Q1.4.3',
      topicText: 'TC Wind Speed Decrease',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.3',
        prompt: 'Give TWO reasons for the decrease in wind speed from 06:00 to 18:00 on 12 March.',
        answer: 'Moved over land / less moisture / more friction',
        marks: 4, acceptAnyTwo: true,
        clue: 'What happens when a TC moves over land?',
        memoFullAnswer: `Moved over the land / less moisture / more friction / less latent heat / starting to dissipate`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two valid reasons. 2 marks each.',
          commonMistake: 'Learners only give one reason.',
          examinerHint: 'Land = less moisture and more friction.',
          alternativeAccept: ['Moved over land', 'Less moisture', 'More friction', 'Less latent heat'],
          memoryTrick: '🧠 Land = less moisture + friction',
          mergedCorrection: `🧠 Land = less moisture + friction\n\n📋 NSC Memo Answer:\nMoved over land / Less moisture / More friction`,
        },
      }],
    },
    {
      id: 'L3Q4',
      source: '2025 NSC Geo P1, Q1.4.3',
      topicText: 'TC Development Zone',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.3',
        prompt: 'Explain why Tropical Cyclone Dikeleli developed between 5° and 20° south of the equator.',
        answer: 'Coriolis force present / warm oceans / latent heat released',
        marks: 4, acceptAnyTwo: true,
        clue: 'Coriolis + warm ocean.',
        memoFullAnswer: `Coriolis force is present within these latitudes resulting in deflection. High temperatures and warm oceans promote high evaporation rate. Latent heat released during condensation.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain why these latitudes are needed.',
          commonMistake: 'Learners say "warm water" without referencing Coriolis.',
          examinerHint: 'Coriolis + warm ocean.',
          alternativeAccept: ['Coriolis force present', 'Warm oceans', 'Latent heat'],
          memoryTrick: '🧠 Coriolis + warm ocean = TC',
          mergedCorrection: `🧠 Coriolis + warm ocean = TC\n\n📋 NSC Memo Answer:\nCoriolis force + warm oceans + latent heat`,
        },
      }],
    },
    // CLIMATE — BERG
    {
      id: 'L3Q5',
      source: '2025 NSC Geo P1, Q1.5.3',
      topicText: 'Berg Winds Warm and Dry',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.3',
        prompt: 'Explain the processes that lead to berg winds being warm and dry.',
        answer: 'Air descends → heats adiabatically (1°C/100m) → moisture evaporates',
        marks: 4, acceptAnyTwo: false,
        clue: 'Descending air heats and dries.',
        memoFullAnswer: `The air descends down the escarpment. The air is heated adiabatically (1°C/100m). Moisture is evaporated as air descends.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must cover BOTH temperature AND moisture.',
          commonMistake: 'Learners explain only temperature OR only moisture.',
          examinerHint: 'Descending air heats AND dries.',
          alternativeAccept: ['Air descends', 'Adiabatic heating', 'Moisture evaporated'],
          memoryTrick: '🧠 Descend + Heat + Dry out',
          mergedCorrection: `🧠 Descend + Heat + Dry out\n\n📋 NSC Memo Answer:\nDescending air heats adiabatically and dries out moisture`,
        },
      }],
    },
    // GEOMORPHOLOGY
    {
      id: 'L3Q6',
      source: '2022 NSC Geo P1, Q1.3.6',
      topicText: 'Heavy Rain Impact',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.6',
        prompt: 'How will the heavy rainfall negatively affect the physical (natural) environment in and around the Western Cape?',
        answer: 'Soil erosion / habitat destruction / mass movements / pollution',
        marks: 4, acceptAnyTwo: true,
        clue: 'Think about what heavy rain does.',
        memoFullAnswer: `Will result in soil erosion / habitat destruction / loss of wildlife / mass movements / water pollution`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe negative environmental impacts.',
          commonMistake: 'Learners focus on human impacts.',
          examinerHint: 'Think erosion, habitat, water quality.',
          alternativeAccept: ['Soil erosion', 'Habitat destruction', 'Mass movements', 'Water pollution'],
          memoryTrick: '🧠 Erosion + Habitat + Pollution',
          mergedCorrection: `🧠 Erosion + Habitat + Pollution\n\n📋 NSC Memo Answer:\nSoil erosion / habitat destruction / mass movements`,
        },
      }],
    },
    {
      id: 'L3Q7',
      source: '2023 NSC Geo P1, Q1.3.5',
      topicText: 'Cold Front Rain Formation',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.5',
        prompt: 'With reference to the cross-section, explain how a well-developed cold front results in heavy rainfall over the Western Cape.',
        answer: 'Cold air undercuts warm moist air → rapid uplift → cumulonimbus develops',
        marks: 4, acceptAnyTwo: false,
        clue: 'Steep uplift = heavy rain.',
        memoFullAnswer: `Cold front (cold air) undercuts warm moist air. Resulting in rapid uplift of warm moist air. Extensive cumulonimbus clouds develop.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the process.',
          commonMistake: 'Learners describe weather without explaining.',
          examinerHint: 'Undercut → uplift → clouds → rain.',
          alternativeAccept: ['Cold front undercuts warm moist air', 'Rapid uplift', 'Cumulonimbus develops'],
          memoryTrick: '🧠 Undercut → Uplift → Clouds',
          mergedCorrection: `🧠 Undercut → Uplift → Clouds\n\n📋 NSC Memo Answer:\nCold air undercuts warm moist air. Rapid uplift. Cumulonimbus clouds form.`,
        },
      }],
    },
    // GEOMORPHOLOGY — DRAINAGE
    {
      id: 'L3Q8',
      source: '2023 NSC Geo P1, Q2.3.7',
      topicText: 'Slope and Permeability',
      teachTopic: 'drainage-basins',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.7',
        prompt: 'Explain how the slope (gradient) and permeability of underlying rock influence the drainage density in B.',
        answer: 'Steep slope promotes runoff / low permeability = more runoff = higher density',
        marks: 4, acceptAnyTwo: true,
        clue: 'Steep + impermeable = high density.',
        memoFullAnswer: `The steeper slope (gradient) promotes run off (cuts more river channels). Rocks with low permeability (impermeable) promote more run-off (less infiltration).`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must cover BOTH slope AND permeability.',
          commonMistake: 'Learners discuss only one factor.',
          examinerHint: 'Steep + impermeable → high density.',
          alternativeAccept: ['Steep slope promotes runoff', 'Impermeable rock promotes runoff'],
          memoryTrick: '🧠 Steep + Impermeable = High density',
          mergedCorrection: `🧠 Steep + Impermeable = High density\n\n📋 NSC Memo Answer:\nSteep slope + impermeable rock → high drainage density`,
        },
      }],
    },
    // GEOMORPHOLOGY — RIVER CAPTURE
    {
      id: 'L3Q9',
      source: '2023 NSC Geo P1, Q2.4.4',
      topicText: 'Wind Gap Characteristic',
      teachTopic: 'river-capture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.4',
        prompt: 'Give ONE characteristic of feature D (wind gap).',
        answer: 'It is a dry area',
        marks: 2, acceptAnyTwo: false,
        clue: 'No water flows through it.',
        memoFullAnswer: `It is a dry area`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention dry area.',
          commonMistake: 'Learners describe elbow of capture.',
          examinerHint: 'Wind gap = dry abandoned valley.',
          alternativeAccept: ['It is a dry area', 'Dry valley', 'Abandoned valley'],
          memoryTrick: '🧠 Wind gap = dry',
          mergedCorrection: `🧠 Wind gap = dry\n\n📋 NSC Memo Answer:\nIt is a dry area`,
        },
      }],
    },
    // SETTLEMENT — RURAL
    {
      id: 'L3Q10',
      source: '2023 NSC Geo P2, Q1.3.3',
      topicText: 'Lack of Social Services',
      teachTopic: 'rural-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.3',
        prompt: 'Give TWO possible reasons for the lack of social services in the Alfred Nzo District.',
        answer: 'Low population density / insufficient budgets / poor infrastructure',
        marks: 4, acceptAnyTwo: true,
        clue: 'Why don\'t services reach rural areas?',
        memoFullAnswer: `Not viable because of low population density / Insufficient municipal budgets / Poor infrastructure / Lack of skilled personnel`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two valid reasons.',
          commonMistake: 'Learners give only one.',
          examinerHint: 'Think population density, money, infrastructure.',
          alternativeAccept: ['Low population density', 'Insufficient budgets', 'Poor infrastructure', 'Lack of skilled personnel'],
          memoryTrick: '🧠 Low density + money + infrastructure',
          mergedCorrection: `🧠 Low density + money + infrastructure\n\n📋 NSC Memo Answer:\nLow population density / Insufficient budgets / Poor infrastructure`,
        },
      }],
    },
    // SETTLEMENT — HIERARCHY
    {
      id: 'L3Q11',
      source: '2023 NSC Geo P2, Q1.2.8',
      topicText: 'City Sphere of Influence',
      teachTopic: 'urban-hierarchy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.2.8',
        prompt: 'The sphere of influence of a city is greater than a village because it has a ...',
        answer: 'larger population and larger radius',
        marks: 2, acceptAnyTwo: false,
        clue: 'More people = larger reach.',
        memoFullAnswer: `D - (iii) population of 100 000 and (iv) larger radius`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be (iii) and (iv).',
          commonMistake: 'Learners pick village numbers.',
          examinerHint: 'City = 100 000 people + larger radius.',
          alternativeAccept: ['Population of 100 000 and larger radius'],
          memoryTrick: '🧠 More people = larger reach',
          mergedCorrection: `🧠 More people = larger reach\n\n📋 NSC Memo Answer:\nPopulation of 100 000 + larger radius`,
        },
      }],
    },
    // SETTLEMENT — URBAN PROFILE
    {
      id: 'L3Q12',
      source: '2023 NSC Geo P2, Q1.4.3',
      topicText: 'High Rent and Crime',
      teachTopic: 'urban-profile',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.3',
        prompt: 'How do high rentals and crime (mentioned in the extract) lead to increasing commercial decentralisation?',
        answer: 'Businesses cannot afford CBD rent / customers feel unsafe / reduced profit',
        marks: 4, acceptAnyTwo: false,
        clue: 'Why would businesses leave the CBD?',
        memoFullAnswer: `High rent: cannot afford rentals / decrease profits. Crime: insurance is more expensive / customers feel unsafe / reduced customer base.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH high rent AND crime.',
          commonMistake: 'Learners discuss only one factor.',
          examinerHint: 'High rent → lower profit. Crime → fewer customers.',
          alternativeAccept: ['Cannot afford rent', 'Customers feel unsafe', 'Insurance costs', 'Reduced customer base'],
          memoryTrick: '🧠 Rent + Crime = decentralisation',
          mergedCorrection: `🧠 Rent + Crime = decentralisation\n\n📋 NSC Memo Answer:\nHigh rent reduces profit. Crime reduces customers and increases costs.`,
        },
      }],
    },
    // SETTLEMENT — MIGRATION
    {
      id: 'L3Q13',
      source: '2024 NSC Geo P2, Q1.3.4',
      topicText: 'Migration Social Impact',
      teachTopic: 'rural-urban-migration',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'How does the movement of young adults to urban areas have a negative social impact on the rural community?',
        answer: 'Birth rate declines / ageing population / family units disrupted / poverty',
        marks: 4, acceptAnyTwo: true,
        clue: 'What happens to a community when young people leave?',
        memoFullAnswer: `Birth rate declines / Ageing population / Disruption to family units / Increase in poverty / Brain drain`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two social impacts. 2 marks each.',
          commonMistake: 'Learners give only economic impacts.',
          examinerHint: 'Focus on social: family, birth rate, ageing.',
          alternativeAccept: ['Birth rate declines', 'Ageing population', 'Family disruption', 'Brain drain'],
          memoryTrick: '🧠 Young leave = social strain',
          mergedCorrection: `🧠 Young leave = social strain\n\n📋 NSC Memo Answer:\nBirth rate declines / Ageing population / Family disruption`,
        },
      }],
    },
    // SETTLEMENT — INFORMAL
    {
      id: 'L3Q14',
      source: '2024 NSC Geo P2, Q1.5.4',
      topicText: 'Informal Settlement Upgrading',
      teachTopic: 'informal-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain how the upgrading of informal settlements would have a positive social impact for people living in these settlements.',
        answer: 'Improved services / better infrastructure / preserved community networks / new skills / healthier environment',
        marks: 8, acceptAnyTwo: true,
        clue: 'What changes when informal settlements are upgraded?',
        memoFullAnswer: `Improved services / More facilities / Improved transport infrastructure / Upgraded infrastructure / Better access to recreational facilities / Community networks preserved / Healthier environment / New skills / Job opportunities for locals`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 positive social impacts.',
          commonMistake: 'Learners focus on economic only.',
          examinerHint: 'Social = services, networks, health, skills.',
          alternativeAccept: ['Improved services', 'Upgraded infrastructure', 'Community networks preserved', 'Healthier environment'],
          memoryTrick: '🧠 Services + Networks + Health + Skills',
          mergedCorrection: `🧠 Services + Networks + Health + Skills\n\n📋 NSC Memo Answer:\nImproved services / infrastructure / preserved networks / better health / new skills`,
        },
      }],
    },
    // ECONOMIC — SECTORS
    {
      id: 'L3Q15',
      source: '2023 NSC Geo P2, Q2.2.8',
      topicText: 'Balance of Trade',
      teachTopic: 'economic-sectors',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.8',
        prompt: 'An advantage of South Africa having a favourable balance of trade:',
        answer: 'Jobs are created and economic growth is stimulated',
        marks: 2, acceptAnyTwo: false,
        clue: 'What does more exports mean?',
        memoFullAnswer: `D - (ii) jobs are created and (iv) stimulates economic growth`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be (ii) and (iv).',
          commonMistake: 'Learners pick negative outcomes.',
          examinerHint: 'Favourable = more exports = jobs + growth.',
          alternativeAccept: ['Jobs are created', 'Stimulates economic growth'],
          memoryTrick: '🧠 Favourable = jobs + growth',
          mergedCorrection: `🧠 Favourable = jobs + growth\n\n📋 NSC Memo Answer:\nJobs created + economic growth stimulated`,
        },
      }],
    },
    // ECONOMIC — AGRICULTURE
    {
      id: 'L3Q16',
      source: '2023 NSC Geo P2, Q2.3.4',
      topicText: 'Climate Reduces Maize',
      teachTopic: 'agriculture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.4',
        prompt: 'How will climatic factors reduce maize production?',
        answer: 'Droughts dry out crops / floods destroy crops / stunted growth',
        marks: 4, acceptAnyTwo: true,
        clue: 'What weather hurts maize?',
        memoFullAnswer: `Growth of crops is stunted / crops washed away / crops destroyed / crops burnt / crops dry out/wilt`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two climatic impacts. 2 marks each.',
          commonMistake: 'Learners give only one.',
          examinerHint: 'Drought or flood damage.',
          alternativeAccept: ['Stunted growth', 'Washed away', 'Destroyed', 'Dry out', 'Burnt'],
          memoryTrick: '🧠 Drought + Flood = crop loss',
          mergedCorrection: `🧠 Drought + Flood = crop loss\n\n📋 NSC Memo Answer:\nStunted growth / washed away / destroyed / wilted`,
        },
      }],
    },
    // ECONOMIC — MINING
    {
      id: 'L3Q17',
      source: '2024 NSC Geo P2, Q2.3.5',
      topicText: 'Coal Reserve Depletion',
      teachTopic: 'mining',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.5',
        prompt: 'Explain the negative impact of decreasing high-quality coal reserves for the future supply of power in South Africa.',
        answer: 'More load shedding / higher electricity costs / need alternative energy',
        marks: 4, acceptAnyTwo: true,
        clue: 'What happens when coal runs out?',
        memoFullAnswer: `There would be more frequent load shedding / cost of electricity increases / need to invest in alternative energy sources / power station closures`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two negative impacts.',
          commonMistake: 'Learners say "no electricity".',
          examinerHint: 'Load shedding + cost + alternative energy.',
          alternativeAccept: ['More load shedding', 'Higher electricity costs', 'Invest in renewable energy', 'Power station closures'],
          memoryTrick: '🧠 Less coal = load shedding',
          mergedCorrection: `🧠 Less coal = load shedding\n\n📋 NSC Memo Answer:\nMore load shedding / higher electricity costs / invest in alternative energy`,
        },
      }],
    },
    // ECONOMIC — REGIONS
    {
      id: 'L3Q18',
      source: '2024 NSC Geo P2, Q2.4.4',
      topicText: 'Gauteng Challenges',
      teachTopic: 'core-industrial-regions',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.4',
        prompt: 'Explain TWO challenges faced by the Gauteng (PWV) core industrial region.',
        answer: 'Load shedding / traffic congestion / water shortages / labour strikes / crime',
        marks: 4, acceptAnyTwo: true,
        clue: 'What makes running a business in Gauteng hard?',
        memoFullAnswer: `Load shedding reduces production / traffic congestion / water shortages / high petrol prices / labour strikes / high crime rate / distance from harbours`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two challenges.',
          commonMistake: 'Learners give only one.',
          examinerHint: 'Load shedding, traffic, water, strikes, crime.',
          alternativeAccept: ['Load shedding', 'Traffic congestion', 'Water shortages', 'Labour strikes', 'Crime'],
          memoryTrick: '🧠 Load shedding + traffic + water',
          mergedCorrection: `🧠 Load shedding + traffic + water\n\n📋 NSC Memo Answer:\nLoad shedding / traffic congestion / water shortages / labour strikes`,
        },
      }],
    },
    // ECONOMIC — INFORMAL
    {
      id: 'L3Q19',
      source: '2023 NSC Geo P2, Q2.5.3',
      topicText: 'Informal Sector Importance',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.3',
        prompt: 'Explain the economic importance of the informal sector.',
        answer: 'Provides employment / reduces government grants / contributes to GDP',
        marks: 4, acceptAnyTwo: true,
        clue: 'What does the informal sector do for the economy?',
        memoFullAnswer: `It provides employment opportunities / reduces government responsibility for grants / increases production / contributes to GDP`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two economic reasons.',
          commonMistake: 'Learners only say "jobs".',
          examinerHint: 'Employment + GDP + reduces grants.',
          alternativeAccept: ['Provides employment', 'Reduces grants burden', 'Contributes to GDP', 'Increases production'],
          memoryTrick: '🧠 Jobs + GDP + less grants',
          mergedCorrection: `🧠 Jobs + GDP + less grants\n\n📋 NSC Memo Answer:\nEmployment + reduces grants + contributes to GDP`,
        },
      }],
    },
    // MAPWORK — SCALE
    {
      id: 'L3Q20',
      source: '2023 NSC Geo P2, Q3.1.5',
      topicText: 'Magnetic Declination',
      teachTopic: 'map-scale-distance',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.5',
        prompt: 'Calculate the magnetic declination for 2023. Difference in years: 2. Mean annual change: 12\' westwards.',
        answer: '29°24\' west of true north',
        marks: 4, acceptAnyTwo: false,
        clue: 'Total change = years × annual change.',
        memoFullAnswer: `Total annual change: 2 × 12' = 24' westwards
MD for 2023: 29°00' + 24' = 29°24' west of true north`,
        formulas: ['Total change = years × annual change', 'MD = Base + Total change'],
        memoCorrection: {
          whatToCheck: 'Must show calculation steps.',
          commonMistake: 'Learners forget to add the base MD.',
          examinerHint: '29°00\' + (2 × 12\') = 29°24\' W.',
          alternativeAccept: ['29°24\' west', '29°24\' W'],
          memoryTrick: '🧠 Base + (years × change)',
          mergedCorrection: `🧠 Base + (years × change)\n• 29°00' + 24' = 29°24' W\n\n📋 NSC Memo Answer:\n29°24' west of true north`,
        },
      }],
    },
    // MAPWORK — CONTOURS
    {
      id: 'L3Q21',
      source: '2023 NSC Geo P2, Q3.2.8',
      topicText: 'Upper Course Evidence',
      teachTopic: 'contours-landforms',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.2.8',
        prompt: 'Give evidence from the topographical map to support your answer that the river is in the upper course.',
        answer: 'Near source / contours closely spaced / steep gradient / V-shaped valley',
        marks: 2, acceptAnyTwo: false,
        clue: 'Upper course features.',
        memoFullAnswer: `Near the source / Contours closely spaced / Steep gradient / V-shaped valleys`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give valid upper course evidence.',
          commonMistake: 'Learners give middle course features.',
          examinerHint: 'Upper = steep + V-shaped.',
          alternativeAccept: ['Near source', 'Steep gradient', 'V-shaped valleys'],
          memoryTrick: '🧠 Upper = steep + V-shaped',
          mergedCorrection: `🧠 Upper = steep + V-shaped\n\n📋 NSC Memo Answer:\nNear source / steep gradient / V-shaped valleys`,
        },
      }],
    },
    // MAPWORK — GIS
    {
      id: 'L3Q22',
      source: '2023 NSC Geo P2, Q3.3.5',
      topicText: 'Raster vs Reality',
      teachTopic: 'gis-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.3.5',
        prompt: 'Why is the information on the orthophoto map more realistic when determining the availability of water in the dam at a specific time?',
        answer: 'It is an image showing the real dam and water it contains',
        marks: 2, acceptAnyTwo: false,
        clue: 'Orthophotos are actual images.',
        memoFullAnswer: `It is an image which shows the real dam and water it contains`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention real image.',
          commonMistake: 'Learners discuss scale.',
          examinerHint: 'Orthophoto = real image of the dam.',
          alternativeAccept: ['Shows the real dam and water', 'Real image'],
          memoryTrick: '🧠 Orthophoto = real image',
          mergedCorrection: `🧠 Orthophoto = real image\n\n📋 NSC Memo Answer:\nIt shows the real dam and water it contains`,
        },
      }],
    },
  ],

  level4: [
    {
      id: 'L4Q1',
      source: '2022 NSC Geo P1, Q1.4.5',
      topicText: 'Monitoring Tropical Cyclones',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.5',
        prompt: 'Explain the importance of monitoring tropical cyclones like Batsirai for Madagascar.',
        answer: 'Early warnings / evacuation planning / reduce impact / track path',
        marks: 4, acceptAnyTwo: true,
        clue: 'Why do we track cyclones?',
        memoFullAnswer: `The area is prone to tropical cyclones / early warnings / evacuation planning / reduce impact / track path`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain importance of monitoring.',
          commonMistake: 'Learners only say "to save lives".',
          examinerHint: 'Monitoring = prediction + preparation + protection.',
          alternativeAccept: ['Early warnings', 'Evacuation planning', 'Reduce impact', 'Track path'],
          memoryTrick: '🧠 Predict + Prepare + Protect',
          mergedCorrection: `🧠 Predict + Prepare + Protect\n\n📋 NSC Memo Answer:\nEarly warnings / evacuation planning / reduce impact`,
        },
      }],
    },
    {
      id: 'L4Q2',
      source: '2022 NSC Geo P1, Q1.4.4',
      topicText: 'Storm Surge Impact',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.4',
        prompt: 'How could storm surges negatively impact the physical environment on the east coast of Madagascar?',
        answer: 'Coastal flooding / reshaping coastline / biodiversity destruction / pollution',
        marks: 4, acceptAnyTwo: true,
        clue: 'Sea floods the coast.',
        memoFullAnswer: `Coastal areas would be flooded / Re-shaping of coastline / mass movement / destruction of biodiversity / pollution of water sources`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe negative environmental impacts.',
          commonMistake: 'Learners focus on human impacts.',
          examinerHint: 'Flooding, erosion, habitat destruction.',
          alternativeAccept: ['Coastal flooding', 'Habitat destruction', 'Biodiversity loss', 'Water pollution'],
          memoryTrick: '🧠 Flood + Erosion + Habitat loss',
          mergedCorrection: `🧠 Flood + Erosion + Habitat loss\n\n📋 NSC Memo Answer:\nCoastal flooding / biodiversity loss / habitat destruction`,
        },
      }],
    },
    {
      id: 'L4Q3',
      source: '2022 NSC Geo P1, Q1.3.7c',
      topicText: 'Occlusion Process',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.7c',
        prompt: 'Explain how the cold front occlusion developed.',
        answer: 'Cold front undercuts warm front / warm air rises / warm sector narrows',
        marks: 4, acceptAnyTwo: false,
        clue: 'Cold front catches up.',
        memoFullAnswer: `The cold front which is moving faster undercuts the warm front. The warm air is forced to rise, resulting in the narrowing of the warm sector. The cool air is completely uplifted.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain occlusion process.',
          commonMistake: 'Learners describe weather without process.',
          examinerHint: 'Undercut → warm rises → sector narrows.',
          alternativeAccept: ['Cold front undercuts warm front', 'Warm air forced to rise', 'Warm sector narrows'],
          memoryTrick: '🧠 Cold catches warm → occlusion',
          mergedCorrection: `🧠 Cold catches warm → occlusion\n\n📋 NSC Memo Answer:\nCold front undercuts warm front. Warm air rises. Warm sector narrows.`,
        },
      }],
    },
    {
      id: 'L4Q4',
      source: '2022 NSC Geo P1, Q1.5.4',
      topicText: 'Inversion Descending Air',
      teachTopic: 'inversion-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'Explain the role played by descending air in the development of the inversion layer.',
        answer: 'Air subsides, compresses and heats up (adiabatic heating)',
        marks: 2, acceptAnyTwo: false,
        clue: 'Think about what happens when air sinks.',
        memoFullAnswer: `As air subsides it compresses and heats up`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain adiabatic heating.',
          commonMistake: 'Learners say "air cools down".',
          examinerHint: 'Descending air compresses and heats.',
          alternativeAccept: ['Air compresses', 'Adiabatic heating', 'Air heats up as it descends'],
          memoryTrick: '🧠 Descending = Compress + Heat',
          mergedCorrection: `🧠 Descending = Compress + Heat\n\n📋 NSC Memo Answer:\nAs air subsides it compresses and heats up`,
        },
      }],
    },
    {
      id: 'L4Q5',
      source: '2025 NSC Geo P1, Q1.4.5',
      topicText: 'TC Intensification',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.5',
        prompt: 'Explain why Tropical Cyclone Dikeleli intensified from 8 January to 13 January 2025.',
        answer: 'Moved to warmer waters → more evaporation / less friction / pressure dropped',
        marks: 4, acceptAnyTwo: true,
        clue: 'Warmer water = more energy.',
        memoFullAnswer: `It moved from land to the warmer waters resulting in increased evaporation/latent heat. Less frictional drag over the ocean increases wind speed. Central pressure dropped.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain intensification process.',
          commonMistake: 'Learners say "it got stronger" without explanation.',
          examinerHint: 'Warmer water + less friction + pressure drop.',
          alternativeAccept: ['Warmer waters', 'Increased evaporation', 'Less friction', 'Pressure dropped'],
          memoryTrick: '🧠 Warm water + Less friction',
          mergedCorrection: `🧠 Warm water + Less friction\n\n📋 NSC Memo Answer:\nMoved to warmer waters / less friction / pressure dropped`,
        },
      }],
    },
    {
      id: 'L4Q6',
      source: '2025 NSC Geo P1, Q1.4.4',
      topicText: 'Dangerous Quadrant',
      teachTopic: 'tropical-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.4.4',
        prompt: 'Describe the weather conditions associated with the forward left-hand quadrant (dangerous semicircle).',
        answer: 'Hurricane-force winds / torrential rainfall / thunderstorms',
        marks: 4, acceptAnyTwo: false,
        clue: 'Strongest winds and heaviest rain.',
        memoFullAnswer: `Hurricane-force winds / very strong destructive winds. Torrential rainfall / heavy rainfall / thunderstorms.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe weather in dangerous semicircle.',
          commonMistake: 'Learners just say "bad weather".',
          examinerHint: 'Strongest winds + heaviest rain.',
          alternativeAccept: ['Hurricane-force winds', 'Torrential rainfall', 'Thunderstorms'],
          memoryTrick: '🧠 Dangerous quadrant = strongest winds + heaviest rain',
          mergedCorrection: `🧠 Strongest winds + heaviest rain\n\n📋 NSC Memo Answer:\nHurricane-force winds / torrential rainfall / thunderstorms`,
        },
      }],
    },
    {
      id: 'L4Q7',
      source: '2022 NSC Geo P1, Q1.3.7c (advanced)',
      topicText: 'Occlusion Advanced',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.7c',
        prompt: 'Explain how the cold front occlusion developed in detail.',
        answer: 'Cold front moves faster → undercuts → warm air rises → warm sector narrows',
        marks: 4, acceptAnyTwo: false,
        clue: 'Step by step.',
        memoFullAnswer: `Cold front moves faster and undercuts the warm front. Warm air is forced to rise. Warm sector narrows. Cool air completely uplifted.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain steps in order.',
          commonMistake: 'Learners skip steps.',
          examinerHint: 'Faster → undercut → rise → narrow.',
          alternativeAccept: ['Cold front undercuts warm front', 'Warm air forced to rise', 'Warm sector narrows'],
          memoryTrick: '🧠 Faster → Undercut → Rise → Narrow',
          mergedCorrection: `🧠 Faster → Undercut → Rise → Narrow\n\n📋 NSC Memo Answer:\nCold front undercuts warm front. Warm air rises. Warm sector narrows.`,
        },
      }],
    },
    {
      id: 'L4Q8',
      source: '2023 NSC Geo P1, Q1.3.6',
      topicText: 'Heavy Rain Management',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.6',
        prompt: 'How will the heavy rainfall negatively affect the physical (natural) environment in and around the Western Cape?',
        answer: 'Soil erosion / deforestation / habitat destruction / flooding / leaching',
        marks: 4, acceptAnyTwo: true,
        clue: 'Think of what heavy rain does to land.',
        memoFullAnswer: `Soil erosion / Destruction of natural habitat / Deforestation / Leaching of soil nutrients / Flooding`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe negative environmental impacts.',
          commonMistake: 'Learners focus on human impacts.',
          examinerHint: 'Erosion, habitat, flooding.',
          alternativeAccept: ['Soil erosion', 'Habitat destruction', 'Deforestation', 'Flooding'],
          memoryTrick: '🧠 Erosion + Habitat + Flood',
          mergedCorrection: `🧠 Erosion + Habitat + Flood\n\n📋 NSC Memo Answer:\nSoil erosion / habitat destruction / flooding / leaching`,
        },
      }],
    },
    {
      id: 'L4Q9',
      source: '2024 NSC Geo P1, Q1.3.4',
      topicText: 'Heavy Rain Strategies',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain strategies that can be put in place to manage the negative environmental impact of the heavy rainfall associated with mid-latitude cyclones.',
        answer: 'Maintain vegetation / afforestation / drainage / dams / levees / contour ploughing / education',
        marks: 8, acceptAnyTwo: true,
        clue: 'Think prevention, protection, education.',
        memoFullAnswer: `Maintain natural vegetation. Afforestation. Drainage systems. Retaining walls. Dams/weirs. Levees. Conserve wetlands. Contour ploughing. Terracing. Widening river channels. Education.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must suggest at least 4 strategies.',
          commonMistake: 'Learners only mention one strategy.',
          examinerHint: 'Prevention + Protection + Education.',
          alternativeAccept: ['Afforestation', 'Drainage systems', 'Retaining walls', 'Dams', 'Levees'],
          memoryTrick: '🧠 Vegetation + Infrastructure + Education',
          mergedCorrection: `🧠 Vegetation + Infrastructure + Education\n\n📋 NSC Memo Answer:\nMaintain vegetation / afforestation / drainage / dams / levees / education`,
        },
      }],
    },
    {
      id: 'L4Q10',
      source: '2024 NSC Geo P1, Q1.5.4',
      topicText: 'Line Thunderstorms Impact',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'Explain the negative physical (natural) impact of line thunderstorms.',
        answer: 'Habitat destruction / soil erosion / mass movements / water quality reduced',
        marks: 6, acceptAnyTwo: true,
        clue: 'Line thunderstorms bring strong winds and hail.',
        memoFullAnswer: `Natural habitats destroyed / Ecosystems destroyed / Biodiversity reduced / Top soil washed away / Mass movements / Wildlife displaced / Trees destroyed / Water quality reduced / Leaching of soil`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must list multiple negative impacts.',
          commonMistake: 'Learners focus on human impact only.',
          examinerHint: 'Habitats, soil, water, vegetation.',
          alternativeAccept: ['Habitat destruction', 'Ecosystem destruction', 'Biodiversity loss', 'Soil erosion', 'Mass movements'],
          memoryTrick: '🧠 Habitat + Soil + Water damage',
          mergedCorrection: `🧠 Habitat + Soil + Water damage\n\n📋 NSC Memo Answer:\nHabitat destruction / soil erosion / mass movements / water quality reduced`,
        },
      }],
    },
    {
      id: 'L4Q11',
      source: '2025 NSC Geo P1, Q1.5.4',
      topicText: 'Veld Fire Strategies',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, suggest sustainable strategies that can be put in place to reduce the negative impact of veld fires.',
        answer: 'Firebreaks / water storage / early warning / education / lookout towers',
        marks: 8, acceptAnyTwo: true,
        clue: 'Prevention, preparation, response.',
        memoFullAnswer: `Create firebreaks / Build water storage facilities / Access to fire-fighting equipment / Implement early warning systems / Create awareness / Create lookout towers / Install sprinklers / Evacuation routes / Remove alien vegetation`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must suggest at least 4 strategies.',
          commonMistake: 'Learners only mention one strategy.',
          examinerHint: 'Prevention + Preparation + Response.',
          alternativeAccept: ['Firebreaks', 'Water storage', 'Early warning', 'Education', 'Lookout towers'],
          memoryTrick: '🧠 Firebreaks + Water + Warnings + Education',
          mergedCorrection: `🧠 Firebreaks + Water + Warnings + Education\n\n📋 NSC Memo Answer:\nFirebreaks / water storage / early warning / education / lookout towers`,
        },
      }],
    },
    {
      id: 'L4Q12',
      source: '2023 NSC Geo P2, Q1.5.4',
      topicText: 'Transport Economic Injustice',
      teachTopic: 'rural-urban-migration',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain why the use of public transport such as minibus taxis and buses could be an economic injustice to commuters.',
        answer: 'Costly / unsafe / unreliable / time lost / multi-mode transfers',
        marks: 8, acceptAnyTwo: true,
        clue: 'Cost, safety, time.',
        memoFullAnswer: `Costly and negative influence on budgets / Petrol price increases affect commuters / Irresponsible drivers endanger lives / Unsafe vehicles cause accidents / Commuters late → job losses / Strikes cause lost income / Inflexible operating hours`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 reasons.',
          commonMistake: 'Learners only mention cost.',
          examinerHint: 'Cost + safety + reliability + time.',
          alternativeAccept: ['Costly', 'Unsafe vehicles', 'Commuters late', 'Strikes cause lost income', 'Inflexible hours'],
          memoryTrick: '🧠 Cost + Safety + Time',
          mergedCorrection: `🧠 Cost + Safety + Time\n\n📋 NSC Memo Answer:\nCostly / unsafe / unreliable / time lost / multi-mode transfers`,
        },
      }],
    },
    {
      id: 'L4Q13',
      source: '2024 NSC Geo P2, Q2.5.5',
      topicText: 'Informal Sector Support',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, explain measures that the municipality can put in place to assist traders in the informal sector to operate under more favourable conditions.',
        answer: 'Regulate fairly / designate areas / provide services / security / training / funding',
        marks: 8, acceptAnyTwo: true,
        clue: 'Support, not punish.',
        memoFullAnswer: `Regulate the informal sector / Allocate space near markets / Provide stalls / Access to storage facilities / Access to basic services / Access to financial assistance / Provide skills training / Create partnerships with formal sector / Effective policing / Public awareness`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 measures.',
          commonMistake: 'Learners only mention permits.',
          examinerHint: 'Space + services + finance + skills.',
          alternativeAccept: ['Designate space', 'Provide stalls', 'Financial assistance', 'Skills training', 'Effective policing'],
          memoryTrick: '🧠 Space + Services + Finance + Skills',
          mergedCorrection: `🧠 Space + Services + Finance + Skills\n\n📋 NSC Memo Answer:\nDesignate space / provide stalls / storage / finance / skills training / partnerships`,
        },
      }],
    },
    {
      id: 'L4Q14',
      source: '2025 NSC Geo P2, Q2.5.6',
      topicText: 'Permit Money Uses',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.6',
        prompt: 'What can the municipality of Richards Bay provide to the informal traders with the money collected from the issuing of permits?',
        answer: 'Designated areas / infrastructure / storage / security / training',
        marks: 4, acceptAnyTwo: true,
        clue: 'Use the money to support, not punish.',
        memoFullAnswer: `Designate areas for trade / Provide infrastructure / Provide storage facilities / Effective policing / Facilitate partnerships with formal sector / Upskilling entrepreneurial programmes / Access to funding / Basic services`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two valid uses.',
          commonMistake: 'Learners say "just keep the money".',
          examinerHint: 'Infrastructure, storage, security, training.',
          alternativeAccept: ['Designate areas', 'Infrastructure', 'Storage facilities', 'Policing', 'Training'],
          memoryTrick: '🧠 Infrastructure + Storage + Security',
          mergedCorrection: `🧠 Infrastructure + Storage + Security\n\n📋 NSC Memo Answer:\nDesignated areas / infrastructure / storage / security / training`,
        },
      }],
    },
    {
      id: 'L4Q15',
      source: '2023 NSC Geo P2, Q2.4.6',
      topicText: 'Coega IDZ Attraction',
      teachTopic: 'core-industrial-regions',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.6',
        prompt: 'Explain why the Coega Industrial Development Zone would be an attractive location for investment by overseas companies.',
        answer: 'Deep-water harbour / available land / infrastructure / incentives / cheap labour',
        marks: 6, acceptAnyTwo: true,
        clue: 'What does an IDZ offer investors?',
        memoFullAnswer: `Deep-water harbour can handle large ships / Large tracts of available land / Well-developed infrastructure / Zone provides incentives / Access to services / Cheap labour / Skilled labour force / Alternate energy sources`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give three valid reasons.',
          commonMistake: 'Learners only mention harbour.',
          examinerHint: 'Harbour + land + infrastructure + incentives.',
          alternativeAccept: ['Deep-water harbour', 'Available land', 'Well-developed infrastructure', 'Incentives', 'Cheap labour'],
          memoryTrick: '🧠 Harbour + Land + Infrastructure + Incentives',
          mergedCorrection: `🧠 Harbour + Land + Infrastructure + Incentives\n\n📋 NSC Memo Answer:\nDeep-water harbour / land / infrastructure / incentives / cheap labour`,
        },
      }],
    },
    {
      id: 'L4Q16',
      source: '2025 NSC Geo P2, Q2.4.5',
      topicText: 'Manufacturing Diversity Impact',
      teachTopic: 'core-industrial-regions',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.5',
        prompt: 'Explain how the variety of manufacturing industries in the Dube Trade Port (IDZ) would have a positive impact on the economy of the province.',
        answer: 'Upskilling / multiplier effect / variety attracts investors / improved infrastructure / higher buying power',
        marks: 6, acceptAnyTwo: true,
        clue: 'What does a diversified industrial base do for an economy?',
        memoFullAnswer: `Upskilling of local communities / Upskilling results in higher income / Multiplier effect / Different types of industries attract investors / Improved infrastructure attracts more businesses / More link industries / Export increases port tariffs / Foreign investment contributes to GGP`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give three valid impacts.',
          commonMistake: 'Learners only mention jobs.',
          examinerHint: 'Upskilling + multiplier + investment + infrastructure.',
          alternativeAccept: ['Upskilling', 'Multiplier effect', 'Attracts investors', 'Improved infrastructure', 'More link industries'],
          memoryTrick: '🧠 Skills + Multiplier + Investment',
          mergedCorrection: `🧠 Skills + Multiplier + Investment\n\n📋 NSC Memo Answer:\nUpskilling / multiplier effect / attracts investors / improved infrastructure`,
        },
      }],
    },
    {
      id: 'L4Q17',
      source: '2025 NSC Geo P2, Q2.3.5',
      topicText: 'Food Production Challenges',
      teachTopic: 'agriculture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.5',
        prompt: 'In a paragraph of approximately EIGHT lines, explain how the economic challenges identified (equipment, finance, arable land) can have a negative impact on food production.',
        answer: 'Lack of machinery reduces efficiency / no loans for seeds / less arable land reduces production',
        marks: 8, acceptAnyTwo: true,
        clue: 'Trace each challenge to lower output.',
        memoFullAnswer: `Lack of machinery reduces efficiency / Limited cultivation of land / Delays in planting / Lack of finance prevents buying seeds / Less arable land reduces food production / Overgrazing / Crop diversity reduced / Lack of transport and storage / Ineffective farming methods`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 impacts.',
          commonMistake: 'Learners only mention one challenge.',
          examinerHint: 'Three challenges: equipment, finance, land.',
          alternativeAccept: ['Lack of machinery', 'Limited cultivation', 'No finance', 'Less arable land', 'Overgrazing'],
          memoryTrick: '🧠 Equipment + Finance + Land',
          mergedCorrection: `🧠 Equipment + Finance + Land\n\n📋 NSC Memo Answer:\nLack of machinery / limited cultivation / no finance / less arable land → lower production`,
        },
      }],
    },
    {
      id: 'L4Q18',
      source: '2024 NSC Geo P2, Q2.5.4',
      topicText: 'Informal Sector Growth',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.4',
        prompt: 'Suggest TWO reasons for the rapid growth of the informal sector in the city of Johannesburg.',
        answer: 'High unemployment / low-paying jobs / illegal immigrants / lack of skills / recession',
        marks: 4, acceptAnyTwo: true,
        clue: 'Why do people start informal businesses?',
        memoFullAnswer: `High unemployment rate / Low paying jobs / High number of illegal immigrants / Increase in urban population / Lack of skills / Economic recession / Increase in poverty / Lower start-up costs / Fewer regulations`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two economic reasons.',
          commonMistake: 'Learners give only one.',
          examinerHint: 'Unemployment, low wages, low start-up costs.',
          alternativeAccept: ['High unemployment', 'Low paying jobs', 'Illegal immigrants', 'Lack of skills', 'Lower start-up costs'],
          memoryTrick: '🧠 Jobs + Poverty + Low start-up',
          mergedCorrection: `🧠 Jobs + Poverty + Low start-up\n\n📋 NSC Memo Answer:\nHigh unemployment / low pay / illegal immigrants / low start-up costs`,
        },
      }],
    },
    {
      id: 'L4Q19',
      source: '2022 NSC Geo P1, Q1.5.5',
      topicText: 'Inversion Rainfall Paragraph',
      teachTopic: 'inversion-layers',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, describe how the position of the inversion layer in sketches A and B influences the amount of rainfall in the interior of South Africa.',
        answer: 'Sketch A: above escarpment → more rain. Sketch B: below → less rain.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Above = wet. Below = dry.',
        memoFullAnswer: `Sketch A: Inversion layer above escarpment. Moist air flows into interior. Results in more rainfall. Sketch B: Inversion layer below escarpment. Moist air cannot reach interior. Results in less/no rainfall.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe BOTH sketches.',
          commonMistake: 'Learners only describe one.',
          examinerHint: 'Above = rain. Below = dry.',
          alternativeAccept: ['Above escarpment = more rain', 'Below escarpment = less rain'],
          memoryTrick: '🧠 Above = rain. Below = dry.',
          mergedCorrection: `🧠 Above = rain. Below = dry.\n\n📋 NSC Memo Answer:\nSketch A: above → rain. Sketch B: below → dry.`,
        },
      }],
    },
    {
      id: 'L4Q20',
      source: '2023 NSC Geo P1, Q1.5.5',
      topicText: 'Berg Winds Vegetation',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, explain how berg winds impact negatively on the natural vegetation and suggest strategies that can be put in place to limit this negative impact.',
        answer: 'Dry out vegetation / veld fires. Strategies: firebreaks, water, awareness, wind breaks.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Dry + fire. Then firebreaks + awareness.',
        memoFullAnswer: `Berg winds dry out the natural vegetation. Increases temperature and makes it vulnerable to veld fires. Strategies: Create firebreaks. Ensure water accessibility. Awareness. Build lookout towers. Community education. Wind breaks.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention both impacts AND strategies.',
          commonMistake: 'Learners focus only on impacts OR only strategies.',
          examinerHint: 'Dry + fire. Then firebreaks + awareness.',
          alternativeAccept: ['Veld fires', 'Firebreaks', 'Awareness', 'Wind breaks'],
          memoryTrick: '🧠 Dry + Fire. Fix: Firebreaks + Awareness',
          mergedCorrection: `🧠 Dry + Fire. Fix: Firebreaks + Awareness\n\n📋 NSC Memo Answer:\nBerg winds dry vegetation and cause veld fires. Solutions: firebreaks, water, awareness, wind breaks.`,
        },
      }],
    },
  ],

  level5: [
    {
      id: 'L5Q1',
      source: '2025 NSC Geo P1, Q1.5.4',
      topicText: 'Berg Winds Veld Fires',
      teachTopic: 'berg-winds',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, suggest sustainable strategies that can be put in place to reduce the negative impact of veld fires.',
        answer: 'Firebreaks / water storage / early warning / education / lookout towers / evacuation plans / remove alien vegetation',
        marks: 8, acceptAnyTwo: false,
        clue: 'Think prevention, preparation, response.',
        memoFullAnswer: `Create firebreaks/buffer zones. Build water storage facilities. Access to fire-fighting equipment. Implement early warning systems. Create emergency assembly points. Create awareness. Create lookout towers. Install sprinklers. Evacuation routes. Remove alien vegetation.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 strategies.',
          commonMistake: 'Learners only mention one strategy.',
          examinerHint: 'Prevention + Preparation + Response.',
          alternativeAccept: ['Firebreaks', 'Water storage', 'Early warning', 'Education', 'Lookout towers'],
          memoryTrick: '🧠 Firebreaks + Water + Warnings + Education',
          mergedCorrection: `🧠 Firebreaks + Water + Warnings + Education\n\n📋 NSC Memo Answer:\nFirebreaks / water storage / early warning / education / lookout towers / evacuation plans`,
        },
      }],
    },
    {
      id: 'L5Q2',
      source: '2025 NSC Geo P2, Q1.5.4',
      topicText: 'Informal Settlement Economy',
      teachTopic: 'informal-settlements',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain the positive impact of urban renewal on the economy of Wynberg.',
        answer: 'Attracts business / tourists / jobs / property value / infrastructure',
        marks: 8, acceptAnyTwo: false,
        clue: 'What does renewal bring?',
        memoFullAnswer: `Attracts businesses/investors. Attracts more customers. Attracts more tourists. Multiplier effect. Creates jobs. Upskills workers. Increases property value. Improves infrastructure.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 positive impacts.',
          commonMistake: 'Learners only mention one benefit.',
          examinerHint: 'Businesses + jobs + property + infrastructure.',
          alternativeAccept: ['Attracts businesses', 'Jobs created', 'Property value rises', 'Infrastructure improves'],
          memoryTrick: '🧠 Business + Jobs + Property + Infra',
          mergedCorrection: `🧠 Business + Jobs + Property + Infra\n\n📋 NSC Memo Answer:\nAttracts businesses / jobs / property value / infrastructure improvements`,
        },
      }],
    },
    {
      id: 'L5Q3',
      source: '2023 NSC Geo P2, Q2.5.4',
      topicText: 'Informal Sector Strategies',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, suggest strategies that could be implemented to improve the informal sector.',
        answer: 'Regulate fairly / designate areas / services / security / training / funding',
        marks: 8, acceptAnyTwo: false,
        clue: 'Support, don\'t punish.',
        memoFullAnswer: `Regulate the sector. Allocate designated areas for trading. Supply basic services. Provide infrastructure. Increase security. Create partnerships with private sector. Upskill entrepreneurs. Access to funding.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 strategies.',
          commonMistake: 'Learners only mention permits.',
          examinerHint: 'Regulate + services + security + training.',
          alternativeAccept: ['Regulate fairly', 'Designated areas', 'Basic services', 'Security', 'Training', 'Funding'],
          memoryTrick: '🧠 Regulate + Services + Security + Training',
          mergedCorrection: `🧠 Regulate + Services + Security + Training\n\n📋 NSC Memo Answer:\nRegulate fairly / designate areas / services / security / training / funding`,
        },
      }],
    },
    {
      id: 'L5Q4',
      source: '2024 NSC Geo P2, Q2.5.5',
      topicText: 'Informal Trader Conditions',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.5',
        prompt: 'In a paragraph of approximately EIGHT lines, explain measures that the municipality can put in place to assist traders in the informal sector to operate under more favourable conditions.',
        answer: 'Fair permits / designated areas / services / security / partnerships / funding',
        marks: 8, acceptAnyTwo: false,
        clue: 'What would help traders?',
        memoFullAnswer: `Regulate the informal sector fairly. Allocate space near markets. Provide stalls. Access to storage. Access to services. Access to financial assistance. Skills training. Partnerships with formal sector. Effective policing. Public awareness.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 measures.',
          commonMistake: 'Learners only mention one or two.',
          examinerHint: 'Space + services + finance + skills + security.',
          alternativeAccept: ['Designate space', 'Provide stalls', 'Financial assistance', 'Skills training', 'Policing'],
          memoryTrick: '🧠 Space + Services + Finance + Skills',
          mergedCorrection: `🧠 Space + Services + Finance + Skills\n\n📋 NSC Memo Answer:\nDesignate space / stalls / finance / training / policing`,
        },
      }],
    },
    {
      id: 'L5Q5',
      source: '2023 NSC Geo P2, Q1.5.4',
      topicText: 'Transport Injustice',
      teachTopic: 'rural-urban-migration',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain why the use of public transport such as minibus taxis and buses could be an economic injustice to commuters.',
        answer: 'Costly / unsafe / unreliable / lost income / multi-mode transfers',
        marks: 8, acceptAnyTwo: false,
        clue: 'Cost, safety, time lost, income lost.',
        memoFullAnswer: `Costly and negative influence on budgets. Commuters need multiple modes of transport. Petrol price increases affect budgets. Irresponsible drivers endanger lives. Unsafe vehicles cause accidents. Commuters late → job losses. Strikes cause loss of income. Inflexible operating hours.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 reasons.',
          commonMistake: 'Learners only mention cost.',
          examinerHint: 'Cost + safety + reliability + lost income.',
          alternativeAccept: ['Costly', 'Unsafe vehicles', 'Commuters late', 'Strikes cause lost income', 'Inflexible hours'],
          memoryTrick: '🧠 Cost + Safety + Time + Income',
          mergedCorrection: `🧠 Cost + Safety + Time + Income\n\n📋 NSC Memo Answer:\nCostly / unsafe / unreliable / lost income / multi-mode transfers`,
        },
      }],
    },
    {
      id: 'L5Q6',
      source: '2023 NSC Geo P1, Q2.4.5',
      topicText: 'River Capture Paragraph',
      teachTopic: 'river-capture',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.5',
        prompt: 'In a paragraph of approximately EIGHT lines, describe the changes that river E will experience after river capture has taken place.',
        answer: 'Volume decreases / velocity decreases / length shortens / stream order decreases / may become non-perennial',
        marks: 8, acceptAnyTwo: false,
        clue: 'What happens to the captured stream?',
        memoFullAnswer: `Volume of water decreases. River velocity decreases. Length of river shortened. Stream order decreases. River may become non-perennial. Width of river reduced. Drainage basin decreases.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 changes.',
          commonMistake: 'Learners only mention volume.',
          examinerHint: 'Volume + velocity + length + stream order.',
          alternativeAccept: ['Volume decreases', 'Velocity decreases', 'Length shortened', 'Stream order decreases', 'Non-perennial'],
          memoryTrick: '🧠 Volume + Velocity + Length + Order ↓',
          mergedCorrection: `🧠 Volume + Velocity + Length + Order ↓\n\n📋 NSC Memo Answer:\nVolume / velocity / length / stream order decrease`,
        },
      }],
    },
    {
      id: 'L5Q7',
      source: '2023 NSC Geo P1, Q2.5.5',
      topicText: 'Catchment Sustainability',
      teachTopic: 'catchment-management',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.5',
        prompt: 'Why will the removal of alien plants improve the biodiversity of the catchment area?',
        answer: 'More water available / habitats restored / food chains recover',
        marks: 4, acceptAnyTwo: true,
        clue: 'What do alien plants take away?',
        memoFullAnswer: `There will be more water for the plants / More water available for animal species / More water improves food supply / Biodiversity returns`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give two valid reasons.',
          commonMistake: 'Learners only say "removes alien plants".',
          examinerHint: 'More water → more life.',
          alternativeAccept: ['More water for plants', 'More water for animals', 'More water improves food supply'],
          memoryTrick: '🧠 More water = more life',
          mergedCorrection: `🧠 More water = more life\n\n📋 NSC Memo Answer:\nMore water / restored habitats / recovered food chains`,
        },
      }],
    },
    {
      id: 'L5Q8',
      source: '2023 NSC Geo P1, Q2.5.5b',
      topicText: 'Alien Plants Water Table',
      teachTopic: 'catchment-management',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.5b',
        prompt: 'Describe the positive impact of the removal of alien plants on the water table.',
        answer: 'Water table will be higher',
        marks: 4, acceptAnyTwo: false,
        clue: 'Alien plants drink groundwater.',
        memoFullAnswer: `The water table will be higher`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention water table rises.',
          commonMistake: 'Learners say "water becomes clean".',
          examinerHint: 'Remove aliens → less water used → water table rises.',
          alternativeAccept: ['Water table will be higher', 'Water table rises'],
          memoryTrick: '🧠 Remove aliens → water table rises',
          mergedCorrection: `🧠 Remove aliens → water table rises\n\n📋 NSC Memo Answer:\nThe water table will be higher`,
        },
      }],
    },
    {
      id: 'L5Q9',
      source: '2025 NSC Geo P2, Q1.5.4',
      topicText: 'Urban Renewal Impact',
      teachTopic: 'urban-profile',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.5.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain the positive impact of urban renewal on the economy of Wynberg.',
        answer: 'Businesses attracted / jobs created / property value rises / infrastructure improves',
        marks: 8, acceptAnyTwo: false,
        clue: 'What does renewal bring to a blighted area?',
        memoFullAnswer: `Attracts businesses/investors. Attracts more customers. Attracts more tourists. Multiplier effect. Creates jobs. Upskills workers. Increases property value. Improves infrastructure.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 impacts.',
          commonMistake: 'Learners only mention one.',
          examinerHint: 'Businesses + jobs + property + infrastructure.',
          alternativeAccept: ['Attracts businesses', 'Jobs created', 'Property value rises', 'Infrastructure improves'],
          memoryTrick: '🧠 Business + Jobs + Property + Infra',
          mergedCorrection: `🧠 Business + Jobs + Property + Infra\n\n📋 NSC Memo Answer:\nAttracts businesses / jobs / property value / infrastructure improvements`,
        },
      }],
    },
    {
      id: 'L5Q10',
      source: '2024 NSC Geo P1, Q1.3.4',
      topicText: 'MLC Rain Strategies',
      teachTopic: 'mid-latitude-cyclones',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.4',
        prompt: 'In a paragraph of approximately EIGHT lines, explain strategies that can be put in place to manage the negative environmental impact of the heavy rainfall associated with mid-latitude cyclones.',
        answer: 'Maintain vegetation / drainage / dams / levees / contour ploughing / education',
        marks: 8, acceptAnyTwo: false,
        clue: 'Prevention, protection, education.',
        memoFullAnswer: `Maintain natural vegetation. Afforestation. Drainage systems. Retaining walls. Dams. Levees. Conserve wetlands. Contour ploughing. Terracing. Education.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must give at least 4 strategies.',
          commonMistake: 'Learners only mention one.',
          examinerHint: 'Vegetation + infrastructure + education.',
          alternativeAccept: ['Afforestation', 'Drainage systems', 'Retaining walls', 'Dams', 'Levees'],
          memoryTrick: '🧠 Vegetation + Infrastructure + Education',
          mergedCorrection: `🧠 Vegetation + Infrastructure + Education\n\n📋 NSC Memo Answer:\nMaintain vegetation / drainage / dams / levees / education`,
        },
      }],
    },
    {
      id: 'L5Q11',
      source: '2022 NSC Geo P1, Q2.4.4',
      topicText: 'Oxbow Lake Formation',
      teachTopic: 'fluvial-landforms',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4.4',
        prompt: 'In a paragraph of approximately EIGHT lines, describe the processes that resulted in the change of fluvial landform A to an oxbow lake at D.',
        answer: 'Erosion at outer bank / deposition at inner / neck narrows / cut off / loop isolated',
        marks: 8, acceptAnyTwo: false,
        clue: 'Erosion, deposition, cut-off.',
        memoFullAnswer: `Continuous lateral erosion on outer bank. Deposition on inner bank. Meander neck narrows. River floods and cuts through meander neck. Loop separated from main stream. Deposition seals it → oxbow lake.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must describe processes in order.',
          commonMistake: 'Learners skip steps.',
          examinerHint: 'Erode outer + deposit inner + cut off.',
          alternativeAccept: ['Erosion at outer bank', 'Deposition at inner bank', 'Neck narrows', 'Cut off'],
          memoryTrick: '🧠 Erode + Deposit + Cut off',
          mergedCorrection: `🧠 Erode + Deposit + Cut off\n\n📋 NSC Memo Answer:\nErosion + deposition → neck narrows → cut off → oxbow`,
        },
      }],
    },
    {
      id: 'L5Q12',
      source: '2025 NSC Geo P2, Q2.5.4',
      topicText: 'Informal Support Measures',
      teachTopic: 'informal-sector',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5.4',
        prompt: 'Account for the large number of informal traders during the month of December.',
        answer: 'Holiday season → more shoppers / tourists / bonuses',
        marks: 2, acceptAnyTwo: false,
        clue: 'What is special about December?',
        memoFullAnswer: `Holiday season increases shoppers / More tourists → more potential customers / Buying power increases due to bonuses`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention increased demand.',
          commonMistake: 'Learners give irrelevant reasons.',
          examinerHint: 'Holiday + tourists + bonuses.',
          alternativeAccept: ['Holiday season increases shoppers', 'More tourists', 'Buying power increases', 'Festive season'],
          memoryTrick: '🧠 Festive season = more shoppers',
          mergedCorrection: `🧠 Festive season = more shoppers\n\n📋 NSC Memo Answer:\nHoliday season → more shoppers / tourists / bonuses`,
        },
      }],
    },
  ],
};

// ================================================================
// COMPONENT
// ================================================================
const TopicLessonGeography = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);

  // ─── Resolve topic ───
  const topic = TOPIC_CONCEPTS[topicId] ? topicId : DEFAULT_TOPIC;
  const isPaper1 = PAPER_1_TOPICS.has(topic);
  const accent = isPaper1 ? '#4CAF50' : '#1B5E20';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';
  const topicName = TOPIC_NAMES[topic] || 'Geography';

  const activeConcepts = TOPIC_CONCEPTS[topic] || [];

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

  // Teaching
  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';
  const prefetchedRef = useRef(false);

  // ─── createSpeakText ───
  const speakText = createSpeakText(
    { audioRef, setSpeaking: setIsSpeaking },
    API_URL
  );

  // ─── Welcome ───
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Welcome to ${topicName}. I'll teach you first, then we'll practice.`;
    setNeoMessage(welcomeMsg);

    try { Promise.resolve(speakText(welcomeMsg)).catch(() => {}); } catch (e) {}

    const t = setTimeout(() => setWelcomeDone(true), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Queue initialisation ───
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ─── Failsafe ───
  useEffect(() => {
    if (hasInitialisedTeaching) return;
    const t = setTimeout(() => {
      if (!hasInitialisedTeaching && activeConcepts.length > 0) {
        console.warn('[TopicLessonGeography] Failsafe — forcing teaching queue.');
        setTeachingQueue(activeConcepts.slice());
        setHasInitialisedTeaching(true);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [hasInitialisedTeaching, activeConcepts]);

  // ─── Queue drain ───
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ─── Prefetch ───
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    const conceptIdsToPrefetch = activeConcepts.slice(0, 8);
    prefetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/GeographyContent');
        const scripts = mod.GEO_TEACHING_SCRIPTS || {};
        const texts = [];
        conceptIdsToPrefetch.forEach((conceptId) => {
          const script = scripts[conceptId];
          if (!script?.sections) return;
          script.sections.forEach((section) => {
            if (section.text) texts.push(section.text);
            if (section.caption) texts.push(section.caption);
            if (section.items) texts.push(...section.items);
            if (section.stepTexts) section.stepTexts.forEach((t) => t && texts.push(t));
            if (section.scenario) texts.push(section.scenario);
            if (section.steps) section.steps.forEach((s) => s && texts.push(s));
            if (section.answer) texts.push(section.answer);
          });
        });
        console.log(`[prefetch geo] ${conceptIdsToPrefetch.length} concepts → ${texts.length} strings`);
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch geo] skipped:', err?.message);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [activeConcepts]);

  // ─── Cleanup ───
  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  // ─── Filtered bank ───
  const filteredBank = Object.fromEntries(
    Object.entries(QuestionBank).map(([key, list]) => [
      key,
      (list || []).filter((q) => activeConcepts.includes(q.teachTopic)),
    ])
  );

  const levelKey = `level${currentLevel}`;
  const levelQuestions = (() => {
    if (filteredBank[levelKey]?.length > 0) return filteredBank[levelKey];
    for (const lvl of [1, 2, 3, 4, 5]) {
      if (filteredBank[`level${lvl}`]?.length > 0) return filteredBank[`level${lvl}`];
    }
    return [];
  })();

  const activeQuestionSet = levelQuestions[currentQuestionIndex % Math.max(levelQuestions.length, 1)];
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ─── Answer check ───
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

          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct items. Accept any 2.' : ''}

          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}

          Be lenient with synonyms. Mark strictly per memo.

          If CORRECT:
          "CORRECT: [3 words max]"

          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake]
          AGAIN: [try again]"`,
          subject: 'geography',
          userId: 'student',
        }),
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        setAiCorrection('');
        setAiMistake('');
        setAiTeaching('');
        const praise = 'Correct!';
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/);
        const teachingMatch = reply.match(/AGAIN:\s*([^\n]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '');

        const speakMsg = mistakeMatch ? mistakeMatch[1].trim() : memo?.examinerHint || '';
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
          message: `The student doesn't understand. Explain this simply.

          Question: ${currentQuestion.prompt}
          Correct answer: ${currentQuestion.answer}
          Memory trick: ${memo?.memoryTrick || ''}

          Keep it SIMPLE. Use the memory trick. No jargon.`,
          subject: 'geography',
          userId: 'student',
        }),
      });
      const data = await response.json();
      const reply = data.reply || '';
      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount((prev) => prev + 1);
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
      if (nextLevel === 3) levelMsg = `🔥 ${firstName}, things step up now!`;
      else if (nextLevel === 4) levelMsg = `💪 ${firstName}, keep pushing!`;
      else if (nextLevel === 5) levelMsg = `🏆 ${firstName}, final level!`;
      else if (nextLevel > 5) {
        levelMsg = `🎉 ${firstName}, you've completed everything!`;
        setTimeout(() => navigate(`/subjects/${subject}`), 3000);
      } else levelMsg = `${firstName}, let's continue!`;

      setNeoMessage(levelMsg);
      speakText(levelMsg);
    }
  };

  // ─── PHASE 0: AUTO MODE ───
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="geo"
        moduleLabel="Geography P1 & P2"
      />
    );
  }

  // ─── PHASE 1: TEACHING ───
  if (activeTeaching) {
    return (
      <ConceptTeaching
        topic={activeTeaching}
        onSpeak={speakText}
        onComplete={() => {
          setTaughtConcepts((prev) => {
            const next = new Set(prev);
            next.add(activeTeaching);
            return next;
          });
          setActiveTeaching(null);
        }}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="geo"
        accent={accent}
      />
    );
  }

  // ─── GATE ───
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  if (!currentQuestion) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
        <p style={{ marginTop: 16, color: '#666', textAlign: 'center' }}>
          Loading questions…
        </p>
      </div>
    );
  }

  const cleanMemoLines = (memoText) => {
    if (!memoText || typeof memoText !== 'string') return [];
    const filtered = ['(Any', '(Accept', '(Max', 'marks'];
    return memoText
      .split('\n')
      .map((line) => String(line || '').trim())
      .filter((line) => {
        if (!line) return false;
        return !filtered.some((bad) => line.includes(bad));
      });
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
            <div className="tl-progress-fill-mini" style={{ width: `${progress}%`, background: accent }}></div>
          </div>
          <span className="tl-progress-text-mini">
            {paperLabel} • {currentQuestionIndex + 1}/{levelQuestions.length}
          </span>
        </div>
        <NeoVoiceIndicator
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((v) => !v)}
        />
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
              <div className="tl-memo-answer-clean">
                <strong>All possible answers:</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20, listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: 4, fontSize: 14 }}>{line}</li>
                  ))}
                </ul>
              </div>
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
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6, margin: 0, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0' }}>
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
                <div className="tl-clue-popup">💡 {currentQuestion.clue}</div>
              )}

              <button
                className="tl-submit-answer-btn"
                onClick={checkTypedAnswer}
                disabled={!typedAnswer.trim() || isLoading}
                style={{ background: accent }}
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
              <button
                className="tl-proceed-btn"
                onClick={handleProceed}
                style={{ background: accent }}
              >
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