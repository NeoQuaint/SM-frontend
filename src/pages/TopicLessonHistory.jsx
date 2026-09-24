import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { HISTORY_TEACHING_SCRIPTS } from '../data/HistoryContent';
import '../css/TopicLesson.css';

// ================================================================
// HISTORY — PAPERS 1 & 2 MERGED
// ================================================================

// ----------------------------------------------------------------
// PAPER 1 / PAPER 2 TOPIC DETECTION
// ----------------------------------------------------------------
const HISTORY_PAPER_1_TOPICS = new Set([
  'cold-war-origins',
  'berlin-wall',
  'cold-war-vietnam',
  'independent-africa-angola',
  'independent-africa-congo',
  'civil-rights-freedom-rides',
  'black-power-movement',
]);

const DEFAULT_TOPIC = 'cold-war-origins';

const TOPIC_NAMES = {
  // P1
  'cold-war-origins': 'Origins of the Cold War',
  'berlin-wall': 'The Berlin Wall',
  'cold-war-vietnam': 'The Vietnam War',
  'independent-africa-angola': 'Angola — Civil War',
  'independent-africa-congo': 'Congo under Mobutu',
  'civil-rights-freedom-rides': 'Civil Rights Movement',
  'black-power-movement': 'Black Power Movement',
  // P2
  'p2-black-consciousness': 'Black Consciousness & Biko',
  'p2-crisis-apartheid': 'Crisis of Apartheid — 1980s',
  'p2-negotiated-settlement': 'Negotiated Settlement & GNU',
  'p2-trc': 'Truth & Reconciliation Commission',
  'p2-end-cold-war': 'End of the Cold War',
  'p2-new-world-order': 'A New World Order',
};

const TOPIC_CONCEPTS = {
  // P1
  'cold-war-origins': ['cold-war-origins', 'cold-war-containment', 'cold-war-berlin-1948'],
  'berlin-wall': ['berlin-wall'],
  'cold-war-vietnam': ['cold-war-vietnam'],
  'independent-africa-angola': ['independent-africa-angola', 'cuito-cuanavale'],
  'independent-africa-congo': ['independent-africa-congo'],
  'civil-rights-freedom-rides': [
    'civil-rights-sit-ins',
    'civil-rights-freedom-rides',
    'civil-rights-selma',
    'march-on-washington',
    'mlk-non-violence',
  ],
  'black-power-movement': ['black-power-movement'],
  // P2
  'p2-black-consciousness': ['p2-bc-nature-aims', 'p2-bcm-organisations', 'p2-soweto-1976'],
  'p2-crisis-apartheid': [
    'p2-black-local-authorities',
    'p2-trade-union-movement',
    'p2-internal-resistance-1980s',
    'p2-rent-boycotts',
  ],
  'p2-negotiated-settlement': [
    'p2-negotiations-1989-1991',
    'p2-codesa',
    'p2-violence-derail',
    'p2-road-to-1994',
  ],
  'p2-trc': ['p2-trc-establishment', 'p2-trc-justice', 'p2-trc-amnesty', 'p2-trc-case-studies'],
  'p2-end-cold-war': ['p2-gorbachev-reforms', 'p2-eastern-europe', 'p2-ussr-disintegration'],
  'p2-new-world-order': [
    'p2-globalisation',
    'p2-balance-of-power-africa',
    'p2-brics',
    'p2-responses-globalisation',
  ],
};

// ================================================================
// QUESTION BANK
// ================================================================
const QuestionBank = {
  level1: [
    // ---------------- P1 (unchanged) ----------------
    {
      id: 'L1Q1',
      source: '2023 NSC P1, Q1.1.1',
      topicText: 'Cold War Superpowers',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.1.1',
        prompt: 'Identify the THREE countries that made up the European Advisory Commission.',
        clue: '💡 Think about which superpowers and major European power were involved in dividing Germany after WWII.',
        answer: 'United States, Britain, Soviet Union',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'United States / US\nBritain\nSoviet Union',
        memoCorrection: {
          whatToCheck: 'Must name all THREE countries.',
          commonMistake: 'Learners name France — France was given a zone later, but was not on the original commission.',
          examinerHint: 'The Big Three who defeated Germany: USA, Britain, USSR.',
          memoryTrick: '🧠 "Big Three: USA + Britain + USSR"',
          mergedCorrection: `🧠 Memory Trick: "Big Three: USA + Britain + USSR"\n\n📋 NSC Memo Answer:\nUnited States / US\nBritain\nSoviet Union`
        }
      }]
    },
    {
      id: 'L1Q2',
      source: '2023 NSC P1, Q1.2.1',
      topicText: 'Berlin Blockade',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.2.1',
        prompt: 'Define the term blockade in your own words.',
        clue: '💡 Think about sealing off a place so nothing can enter or leave.',
        answer: 'Sealing off a place to prevent goods or people from entering or leaving.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Sealing/closing off a place to prevent goods or people from entering or leaving.',
        memoCorrection: {
          whatToCheck: 'Must state that it is closing off a place to prevent movement.',
          commonMistake: 'Learners describe a war instead of a blockade.',
          examinerHint: 'Blockade = cut off access.',
          memoryTrick: '🧠 "Blockade = block access"',
          mergedCorrection: `🧠 Memory Trick: "Blockade = block access"\n\n📋 NSC Memo Answer:\nSealing/closing off a place to prevent goods or people from entering or leaving.`
        }
      }]
    },
    {
      id: 'L1Q3',
      source: '2024 NSC P1, Q1.1.3',
      topicText: 'Communism Defined',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.1.3',
        prompt: 'Define the concept communism in your own words.',
        clue: '💡 Think about government ownership and equality.',
        answer: 'A political and economic system where the government owns the means of production and wealth is shared equally.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A political and economic policy/ideology of government where the means of production are in the hands of the government / a classless society in which everyone is equal.',
        memoCorrection: {
          whatToCheck: 'Must mention government ownership OR equality.',
          commonMistake: 'Learners confuse communism with capitalism.',
          examinerHint: 'Communism = state ownership + equality.',
          memoryTrick: '🧠 "Communism = state owns, everyone equal"',
          mergedCorrection: `🧠 Memory Trick: "Communism = state owns, everyone equal"\n\n📋 NSC Memo Answer:\nA political and economic policy/ideology of government where the means of production are in the hands of the government.`
        }
      }]
    },
    {
      id: 'L1Q4',
      source: '2025 NSC P1, Q1.1.3',
      topicText: 'Iron Curtain',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.1.3',
        prompt: 'Define the term Iron Curtain in your own words.',
        clue: '💡 Think about a symbolic barrier that divided Europe after WWII.',
        answer: 'A symbolic barrier dividing communist Eastern Europe from capitalist Western Europe.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A symbolic barrier that divided Europe after WWII / an imaginary line of political and ideological separation between the communist Eastern bloc and capitalist Western democracies.',
        memoCorrection: {
          whatToCheck: 'Must mention the divide between East and West Europe.',
          commonMistake: 'Learners think it was an actual wall.',
          examinerHint: 'Iron Curtain = symbolic, not real.',
          memoryTrick: '🧠 "Iron Curtain = symbolic divide"',
          mergedCorrection: `🧠 Memory Trick: "Iron Curtain = symbolic divide"\n\n📋 NSC Memo Answer:\nA symbolic barrier that divided Europe after WWII.`
        }
      }]
    },
    {
      id: 'L1Q5',
      source: '2021 NSC P1, Q1.1.3',
      topicText: 'Satellite States',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.1.3',
        prompt: 'Define the term satellite states in your own words.',
        clue: '💡 Think about countries controlled by a bigger power.',
        answer: 'Countries controlled by a stronger country/superpower — Eastern European countries whose governments were taken over by the Soviet Union.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A country controlled by a stronger country/superpower.\nEast European countries whose governments were taken over and controlled by Soviet Union as its colonies.',
        memoCorrection: {
          whatToCheck: 'Must show that a satellite state is controlled by a bigger power.',
          commonMistake: 'Learners describe them as independent allies.',
          examinerHint: 'Satellite = controlled, not independent.',
          memoryTrick: '🧠 "Satellite = orbits Moscow"',
          mergedCorrection: `🧠 Memory Trick: "Satellite = orbits Moscow"\n\n📋 NSC Memo Answer:\nA country controlled by a stronger country/superpower.`
        }
      }]
    },
    {
      id: 'L1Q6',
      source: '2022 NSC P1, Q1.1.2',
      topicText: 'Containment Defined',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.1.2',
        prompt: 'Define the concept containment in your own words.',
        clue: '💡 Think about stopping something from spreading.',
        answer: 'A US foreign policy adopted after WWII to contain/restrict the further spread of communism.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A US foreign policy adopted after the Second World War to contain/restrict the further spread/expansion of communism.\nA policy of preventing the expansion/spread of a hostile ideology/ideas.',
        memoCorrection: {
          whatToCheck: 'Must show that it is about stopping the SPREAD of communism.',
          commonMistake: 'Learners say "fight communism" instead of "stop it spreading".',
          examinerHint: 'Contain = hold the line, not attack.',
          memoryTrick: '🧠 "Contain = stop it spreading"',
          mergedCorrection: `🧠 Memory Trick: "Contain = stop it spreading"\n\n📋 NSC Memo Answer:\nA US foreign policy adopted after WWII to contain/restrict the further spread of communism.`
        }
      }]
    },
    {
      id: 'L1Q7',
      source: '2022 NSC P1, Q1.1.1',
      topicText: 'Truman Hard Line',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.1.1',
        prompt: 'Give TWO reasons in the source why Truman was determined to take a hard line with the Soviets.',
        clue: '💡 Think about threats to democracy and world stability.',
        answer: 'The Soviet Union was quickly becoming a real threat to democracy around the world. The spread of communism was seen as the most dangerous threat to world stability.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: '"the Soviet Union was quickly becoming a real threat to democracy around the world"\n"The spread of communism was seen as the most dangerous threat to world stability"',
        memoCorrection: {
          whatToCheck: 'Must quote TWO reasons from the source.',
          commonMistake: 'Learners paraphrase instead of extracting.',
          examinerHint: 'Look for "threat to democracy" and "threat to world stability".',
          memoryTrick: '🧠 "Democracy + stability"',
          mergedCorrection: `🧠 Memory Trick: "Democracy + stability"\n\n📋 NSC Memo Answer:\n"The Soviet Union was quickly becoming a real threat to democracy around the world."\n"The spread of communism was seen as the most dangerous threat to world stability."`
        }
      }]
    },
    {
      id: 'L1Q8',
      source: '2023 NSC P1, Q1.1.4',
      topicText: 'Berlin in Soviet Zone',
      teachTopic: 'cold-war-berlin-1948',
      parts: [{
        part: '1.1.4',
        prompt: 'Comment on the implications of having the city of Berlin in the Soviet zone in the context of Cold War tensions between the USSR and the USA in 1948.',
        clue: '💡 Think about the danger of the city being surrounded by Soviet territory.',
        answer: 'The city of Berlin would become an isolated pawn that the Soviet Union could use to settle differences with the Western Powers. It was surrounded by the Soviet zone, so the West was vulnerable.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The city of Berlin will become a "pawn" that the Soviet Union would use to settle their differences with the Western Powers.\nThe city of Berlin will become isolated from the Western powers as it was surrounded by a Soviet zone.',
        memoCorrection: {
          whatToCheck: 'Must explain why Berlin\u2019s location made it vulnerable.',
          commonMistake: 'Learners only say "Berlin was in East Germany" without explaining the danger.',
          examinerHint: 'Deep inside Soviet territory = a hostage city.',
          memoryTrick: '🧠 "Berlin = island in the Soviet sea"',
          mergedCorrection: `🧠 Memory Trick: "Berlin = island in the Soviet sea"\n\n📋 NSC Memo Answer:\nBerlin would become a pawn the Soviet Union could use to settle their differences with the West.`
        }
      }]
    },
    {
      id: 'L1Q9',
      source: '2024 NSC P1, Q1.1.1',
      topicText: 'When the Wall Went Up',
      teachTopic: 'berlin-wall',
      parts: [{
        part: '1.1.1',
        prompt: 'When, according to the source, did the construction of the Berlin Wall begin?',
        clue: '💡 Look for the specific date in the source.',
        answer: '13 August 1961',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '... morning of Sunday ... 13 August 1961',
        memoCorrection: {
          whatToCheck: 'Must state 13 August 1961.',
          commonMistake: 'Learners confuse with 1948 or 1989.',
          examinerHint: 'Wall built = 13 Aug 1961. Wall fell = 9 Nov 1989.',
          memoryTrick: '🧠 "13 Aug 1961 — Wall up"',
          mergedCorrection: `🧠 Memory Trick: "13 Aug 1961 — Wall up"\n\n📋 NSC Memo Answer:\n13 August 1961`
        }
      }]
    },
    {
      id: 'L1Q10',
      source: '2024 NSC P1, Q2.1.2',
      topicText: 'Angola Movements',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.1.2',
        prompt: 'Identify the THREE nationalist movements that contested control of Angola after independence.',
        clue: '💡 Their names all end in "LA".',
        answer: 'MPLA, FNLA, UNITA',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'MPLA\nFNLA\nUNITA',
        memoCorrection: {
          whatToCheck: 'Must name all THREE movements.',
          commonMistake: 'Learners confuse the abbreviations.',
          examinerHint: 'MPLA (socialist) · FNLA (capitalist) · UNITA (capitalist).',
          memoryTrick: '🧠 "MPLA, FNLA, UNITA — three LAs"',
          mergedCorrection: `🧠 Memory Trick: "MPLA, FNLA, UNITA — three LAs"\n\n📋 NSC Memo Answer:\nMPLA / FNLA / UNITA`
        }
      }]
    },
    {
      id: 'L1Q11',
      source: '2021 NSC P1, Q2.1.2',
      topicText: 'Decolonisation',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.1.2',
        prompt: 'Define the concept decolonisation in your own words.',
        clue: '💡 Think about countries gaining independence from colonial powers.',
        answer: 'The process through which colonised countries began achieving independence from colonial powers.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The process through which the colonised countries began achieving independence from the control of their colonial powers.',
        memoCorrection: {
          whatToCheck: 'Must show the process of gaining independence from a coloniser.',
          commonMistake: 'Learners describe independence without the colonial context.',
          examinerHint: 'Decolonisation = ending colonial rule.',
          memoryTrick: '🧠 "De-colon-isation = undo the colony"',
          mergedCorrection: `🧠 Memory Trick: "De-colon-isation = undo the colony"\n\n📋 NSC Memo Answer:\nThe process through which colonised countries achieved independence from colonial powers.`
        }
      }]
    },
    {
      id: 'L1Q12',
      source: '2022 NSC P1, Q2.2.1',
      topicText: 'Cuito Cuanavale — Tank Losses',
      teachTopic: 'cuito-cuanavale',
      parts: [{
        part: '2.2.1',
        prompt: 'Identify in the source the number of tanks destroyed on the side of Cuba/FAPLA.',
        clue: '💡 Look for the exact number in the source statistics.',
        answer: '94',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '94',
        memoCorrection: {
          whatToCheck: 'Must state 94.',
          commonMistake: 'Learners confuse with SADF losses (3).',
          examinerHint: 'Cuba/FAPLA lost 94 tanks. SADF lost 3.',
          memoryTrick: '🧠 "94 vs 3 — numbers at Cuito"',
          mergedCorrection: `🧠 Memory Trick: "94 vs 3 — numbers at Cuito"\n\n📋 NSC Memo Answer:\n94`
        }
      }]
    },
    {
      id: 'L1Q13',
      source: '2023 NSC P1, Q2.1.1',
      topicText: 'Congo Independence Date',
      teachTopic: 'independent-africa-congo',
      parts: [{
        part: '2.1.1',
        prompt: 'On which date did the Congo gain independence from Belgium?',
        clue: '💡 This was in 1960.',
        answer: '30 June 1960',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '30 June 1960',
        memoCorrection: {
          whatToCheck: 'Must state 30 June 1960.',
          commonMistake: 'Learners say 1965 (Mobutu\u2019s coup) or 1967.',
          examinerHint: 'Independence = 1960. Mobutu seized power = 1965.',
          memoryTrick: '🧠 "1960 independence, 1965 Mobutu"',
          mergedCorrection: `🧠 Memory Trick: "1960 independence, 1965 Mobutu"\n\n📋 NSC Memo Answer:\n30 June 1960`
        }
      }]
    },
    {
      id: 'L1Q14',
      source: '2021 NSC P1, Q3.1.1',
      topicText: 'Sit-In Protest Action',
      teachTopic: 'civil-rights-sit-ins',
      parts: [{
        part: '3.1.1',
        prompt: 'Quote the non-violent protest action from the source that the four college students from North Carolina were involved in.',
        clue: '💡 The name of the protest is one word.',
        answer: 'Sit-in',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Sit-in',
        memoCorrection: {
          whatToCheck: 'Must quote "sit-in".',
          commonMistake: 'Learners say "boycott" or "march".',
          examinerHint: 'The Greensboro four did a sit-in.',
          memoryTrick: '🧠 "Greensboro = sit-in"',
          mergedCorrection: `🧠 Memory Trick: "Greensboro = sit-in"\n\n📋 NSC Memo Answer:\nSit-in`
        }
      }]
    },
    {
      id: 'L1Q15',
      source: '2022 NSC P1, Q3.1.1',
      topicText: 'Selma Voting Rights Orgs',
      teachTopic: 'civil-rights-selma',
      parts: [{
        part: '3.1.1',
        prompt: 'List THREE organisations in the source that participated in the voting rights campaign in Selma on 2 January 1965.',
        clue: '💡 Look for the acronyms in the source.',
        answer: 'SCLC, SNCC, Dallas County Voters League',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'Southern Christian Leadership Conference (SCLC)\nStudent Non-Violent Coordinating Committee (SNCC)\nDallas County Voters League',
        memoCorrection: {
          whatToCheck: 'Must name THREE organisations.',
          commonMistake: 'Learners only name SCLC and SNCC.',
          examinerHint: 'SCLC + SNCC + Dallas County Voters League.',
          memoryTrick: '🧠 "SCLC + SNCC + Dallas"',
          mergedCorrection: `🧠 Memory Trick: "SCLC + SNCC + Dallas"\n\n📋 NSC Memo Answer:\nSCLC / SNCC / Dallas County Voters League`
        }
      }]
    },
    {
      id: 'L1Q16',
      source: '2021 NSC P1, Q3.1.2',
      topicText: 'Boycott Defined',
      teachTopic: 'civil-rights-freedom-rides',
      parts: [{
        part: '3.1.2',
        prompt: 'Define the term boycott in your own words.',
        clue: '💡 Think about refusing to use a service as a form of protest.',
        answer: 'Protest action by withholding support against policies, laws or decisions that negatively affect the protestors.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Protest action against policies, laws or decisions by an entity or company that negatively affects the protestors.\nAct of showing discontent or disapproval by withholding support.',
        memoCorrection: {
          whatToCheck: 'Must show it is a form of protest by withdrawal of support.',
          commonMistake: 'Learners describe a march or a sit-in.',
          examinerHint: 'Boycott = refuse to buy / use / participate.',
          memoryTrick: '🧠 "Boycott = refuse to participate"',
          mergedCorrection: `🧠 Memory Trick: "Boycott = refuse to participate"\n\n📋 NSC Memo Answer:\nProtest action by withholding support against policies that negatively affect the protestors.`
        }
      }]
    },
    {
      id: 'L1Q17',
      source: '2024 NSC P1, Q3.2.1',
      topicText: 'Civil Rights Defined',
      teachTopic: 'march-on-washington',
      parts: [{
        part: '3.2.1',
        prompt: 'Define the term civil rights in your own words.',
        clue: '💡 Think about the basic rights every person is entitled to.',
        answer: 'Basic rights that everyone is entitled to enjoy.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'It refers to basic rights that everyone is entitled to enjoy.',
        memoCorrection: {
          whatToCheck: 'Must show that civil rights are basic rights for all.',
          commonMistake: 'Learners confuse with human rights in general.',
          examinerHint: 'Civil rights = basic rights for every citizen.',
          memoryTrick: '🧠 "Civil rights = basic rights for all"',
          mergedCorrection: `🧠 Memory Trick: "Civil rights = basic rights for all"\n\n📋 NSC Memo Answer:\nBasic rights that everyone is entitled to enjoy.`
        }
      }]
    },
    {
      id: 'L1Q18',
      source: '2025 NSC P1, Q3.1.1',
      topicText: 'Gandhi Influence',
      teachTopic: 'mlk-non-violence',
      parts: [{
        part: '3.1.1',
        prompt: 'Who, according to the source, indirectly influenced King Jr to apply the non-violent approach to the specific problems of African Americans?',
        clue: '💡 This was an Indian leader.',
        answer: 'Mahatma Gandhi',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mahatma Gandhi',
        memoCorrection: {
          whatToCheck: 'Must state Mahatma Gandhi.',
          commonMistake: 'Learners say Nelson Mandela or Malcolm X.',
          examinerHint: 'Gandhi → King → non-violence.',
          memoryTrick: '🧠 "Gandhi → King"',
          mergedCorrection: `🧠 Memory Trick: "Gandhi → King"\n\n📋 NSC Memo Answer:\nMahatma Gandhi`
        }
      }]
    },
    {
      id: 'L1Q19',
      source: '2021 NSC P1, Q6',
      topicText: 'Black Panther Party Founders',
      teachTopic: 'black-power-movement',
      parts: [{
        part: 'Q6',
        prompt: 'Name the TWO men who formed the Black Panther Party in 1966.',
        clue: '💡 Their first names are Bobby and Huey.',
        answer: 'Bobby Seale and Huey Newton',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Bobby Seale and Huey Newton',
        memoCorrection: {
          whatToCheck: 'Must name both founders.',
          commonMistake: 'Learners name Malcolm X or Carmichael instead.',
          examinerHint: 'BPP founded 1966 by Seale and Newton.',
          memoryTrick: '🧠 "Seale + Newton = Black Panthers"',
          mergedCorrection: `🧠 Memory Trick: "Seale + Newton = Black Panthers"\n\n📋 NSC Memo Answer:\nBobby Seale and Huey Newton`
        }
      }]
    },

    // ---------------- P2 (NEW) ----------------
    {
      id: 'L1P2Q1',
      source: '2024 NSC P2, Q1.1.1',
      topicText: 'Black Local Government Bill',
      teachTopic: 'p2-black-local-authorities',
      parts: [{
        part: '1.1.1',
        prompt: 'Name the Bill, in the source, that was introduced by the apartheid government in 1980 to create local government structures.',
        clue: '💡 Look for the exact name in the source.',
        answer: 'Black Local Government Bill',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Black Local Government Bill',
        memoCorrection: {
          whatToCheck: 'Must quote "Black Local Government Bill".',
          commonMistake: 'Learners write "Black Local Authorities Act" (which came later, in 1982).',
          examinerHint: 'Bill 1980 → Act 1982.',
          memoryTrick: '🧠 "Bill first, Act after"',
          mergedCorrection: `🧠 Memory Trick: "Bill first, Act after"\n\n📋 NSC Memo Answer:\nBlack Local Government Bill`
        }
      }]
    },
    {
      id: 'L1P2Q2',
      source: '2024 NSC P2, Q1.1.3',
      topicText: 'Township Problems',
      teachTopic: 'p2-black-local-authorities',
      parts: [{
        part: '1.1.3',
        prompt: 'List any THREE problems, according to the source, that newly formed civic organisations were meant to tackle in their local communities.',
        clue: '💡 Look for what residents were angry about.',
        answer: 'High rentals, poor electrification, bad housing, the bucket-toilet system, crime.',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'High rentals\nPoor electrification\nBad housing\nThe bucket-toilet system\nCrime',
        memoCorrection: {
          whatToCheck: 'Must list THREE problems from the source.',
          commonMistake: 'Learners give two and stop.',
          examinerHint: 'Housing, toilets, electricity, crime, rent.',
          memoryTrick: '🧠 "Rent · Power · Housing · Toilets · Crime"',
          mergedCorrection: `🧠 Memory Trick: "Rent · Power · Housing · Toilets · Crime"\n\n📋 NSC Memo Answer:\nHigh rentals. Poor electrification. Bad housing. Bucket-toilet system. Crime.`
        }
      }]
    },
    {
      id: 'L1P2Q3',
      source: '2024 NSC P2, Q1.3.4',
      topicText: 'Rent Boycott Defined',
      teachTopic: 'p2-rent-boycotts',
      parts: [{
        part: '1.3.4',
        prompt: 'Define the term rent boycott in your own words.',
        clue: '💡 Think about what residents stopped doing.',
        answer: 'Action taken by residents to stop paying rent.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Action taken by residents to stop paying rent.\nMeasures taken to encourage people to purposely disregard rental fee.\nDisobedience to the payment of rent.',
        memoCorrection: {
          whatToCheck: 'Must show it is a deliberate refusal to pay rent.',
          commonMistake: 'Learners describe a strike without mentioning rent.',
          examinerHint: 'Boycott = refuse to participate/pay.',
          memoryTrick: '🧠 "Rent boycott = no payment"',
          mergedCorrection: `🧠 Memory Trick: "Rent boycott = no payment"\n\n📋 NSC Memo Answer:\nAction taken by residents to stop paying rent.`
        }
      }]
    },
    {
      id: 'L1P2Q4',
      source: '2024 NSC P2, Q1.3.3',
      topicText: 'General Law Amendment Act',
      teachTopic: 'p2-rent-boycotts',
      parts: [{
        part: '1.3.3',
        prompt: 'According to the source, give any THREE stipulations of the General Law Amendment Act with regard to the treatment of the detainees.',
        clue: '💡 Think about how long they could be held and what was denied.',
        answer: '14 days\u2019 detention while police worked out a charge; solitary confinement; no access to lawyers; no access to a doctor; detention could be extended indefinitely.',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'Allowed for fourteen days\u2019 detention while the police worked out a charge\nThe detainee could be held in solitary confinement (isolation)\nWas not allowed access to lawyers\nWas not allowed to access a doctor during that time\nThe fourteen days could be extended indefinitely',
        memoCorrection: {
          whatToCheck: 'Must list THREE from the source.',
          commonMistake: 'Learners confuse with the 90-day or 180-day detention laws.',
          examinerHint: '14 days · solitary · no lawyer · no doctor · extendable.',
          memoryTrick: '🧠 "14 days · no lawyer · no doctor"',
          mergedCorrection: `🧠 Memory Trick: "14 days · no lawyer · no doctor"\n\n📋 NSC Memo Answer:\n14 days detention. Solitary. No lawyer. No doctor. Extendable indefinitely.`
        }
      }]
    },
    {
      id: 'L1P2Q5',
      source: '2023 NSC P2, Q1.1.1',
      topicText: 'COSATU Threat',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.1.1',
        prompt: 'Why, according to the source, did the newly launched COSATU threaten to call a national strike?',
        clue: '💡 Look at what the government threatened to do.',
        answer: 'Because the government threatened to repatriate migrant workers.',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '... if the government carries out its threat to repatriate migrant workers\nAnd have pledged to organise workers in the homelands in defiance of any restrictions on unions in these regions',
        memoCorrection: {
          whatToCheck: 'Must state the government\u2019s threat to repatriate migrant workers.',
          commonMistake: 'Learners say "because they were angry" without specifics.',
          examinerHint: 'Look for "repatriate migrant workers".',
          memoryTrick: '🧠 "Threat to workers = strike threat"',
          mergedCorrection: `🧠 Memory Trick: "Threat to workers = strike threat"\n\n📋 NSC Memo Answer:\nGovernment threatened to repatriate migrant workers.`
        }
      }]
    },
    {
      id: 'L1P2Q6',
      source: '2023 NSC P2, Q1.1.3',
      topicText: 'Nationalisation Defined',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.1.3',
        prompt: 'Define the term nationalisation in your own words.',
        clue: '💡 Think about who takes control of the economy.',
        answer: 'Economic policy placing means of production under state control.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Economic policy placing means of production under state control.\nEconomic policy limiting private ownership and promoting ownership by the state in all means of production.',
        memoCorrection: {
          whatToCheck: 'Must mention state ownership of production.',
          commonMistake: 'Learners confuse with privatisation (the opposite).',
          examinerHint: 'Nationalisation = state takes control.',
          memoryTrick: '🧠 "National = state owned"',
          mergedCorrection: `🧠 Memory Trick: "National = state owned"\n\n📋 NSC Memo Answer:\nEconomic policy placing means of production under state control.`
        }
      }]
    },
    {
      id: 'L1P2Q7',
      source: '2025 NSC P2, Q1.1.2',
      topicText: 'Non-Parliamentary Opposition',
      teachTopic: 'p2-internal-resistance-1980s',
      parts: [{
        part: '1.1.2',
        prompt: 'Define the term non-parliamentary opposition group in your own words.',
        clue: '💡 Think about where they organised, if not in parliament.',
        answer: 'Organisations or political parties that are not members of parliament.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Organisations/political parties that are not members of parliament.\nGroups fighting against apartheid/groups dedicated to overthrowing the white government by force.',
        memoCorrection: {
          whatToCheck: 'Must state they operated outside parliament.',
          commonMistake: 'Learners describe a banned party without the parliament context.',
          examinerHint: 'Non-parliamentary = operating outside parliament.',
          memoryTrick: '🧠 "Non-parliamentary = outside the house"',
          mergedCorrection: `🧠 Memory Trick: "Non-parliamentary = outside the house"\n\n📋 NSC Memo Answer:\nOrganisations or political parties that are not members of parliament.`
        }
      }]
    },
    {
      id: 'L1P2Q8',
      source: '2025 NSC P2, Q1.2.3',
      topicText: 'Clenched Fists',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.2.3',
        prompt: 'Explain the symbolism of the "clenched fists" in the banner and some of the workers in the photograph.',
        clue: '💡 Think about what a raised fist stands for.',
        answer: 'It was a symbol of the liberation/workers\u2019 struggle.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'It was a symbol of the liberation/workers\u2019 struggle.\nIt shows the unity and determination of workers in their struggle against the apartheid government\u2019s labour laws.\nIt symbolises the power that the workers had against the apartheid government.',
        memoCorrection: {
          whatToCheck: 'Must mention power, unity, or struggle.',
          commonMistake: 'Learners just say "it shows they were angry".',
          examinerHint: 'Fist = power + unity + struggle.',
          memoryTrick: '🧠 "Fist = power"',
          mergedCorrection: `🧠 Memory Trick: "Fist = power"\n\n📋 NSC Memo Answer:\nSymbol of the liberation/workers\u2019 struggle. Shows unity and determination.`
        }
      }]
    },
    {
      id: 'L1P2Q9',
      source: '2025 NSC P2, Q2.1.1',
      topicText: 'BC Organisations',
      teachTopic: 'p2-bcm-organisations',
      parts: [{
        part: '2.1.1',
        prompt: 'Name, from the source, TWO organisations within the Black Consciousness Movement in which Farisani served as a founding member.',
        clue: '💡 Both have "Black" in the name.',
        answer: 'Black People\u2019s Convention (BPC), Black Evangelical Youth Organisation (BEYO)',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Black People\u2019s Convention/BPC\nBlack Evangelical Youth Organisation/BEYO',
        memoCorrection: {
          whatToCheck: 'Must name both.',
          commonMistake: 'Learners name SASO or SASM instead.',
          examinerHint: 'BPC + BEYO.',
          memoryTrick: '🧠 "BPC + BEYO"',
          mergedCorrection: `🧠 Memory Trick: "BPC + BEYO"\n\n📋 NSC Memo Answer:\nBlack People\u2019s Convention (BPC)\nBlack Evangelical Youth Organisation (BEYO)`
        }
      }]
    },
    {
      id: 'L1P2Q10',
      source: '2025 NSC P2, Q2.1.4',
      topicText: 'Persecution Defined',
      teachTopic: 'p2-bc-nature-aims',
      parts: [{
        part: '2.1.4',
        prompt: 'Define the term persecution in your own words.',
        clue: '💡 Think about unfair treatment because of beliefs.',
        answer: 'Cruel or unfair treatment of people because of their beliefs.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Cruel or unfair treatment of people because of their beliefs.\nHarassment of people who hold dissenting views.\nUnfair treatment of a person on the basis of gender/sexual orientation/political beliefs.',
        memoCorrection: {
          whatToCheck: 'Must show cruel/unfair treatment based on who they are.',
          commonMistake: 'Learners describe general violence without the identity component.',
          examinerHint: 'Persecution = targeted unfair treatment.',
          memoryTrick: '🧠 "Persecution = targeted cruelty"',
          mergedCorrection: `🧠 Memory Trick: "Persecution = targeted cruelty"\n\n📋 NSC Memo Answer:\nCruel or unfair treatment of people because of their beliefs.`
        }
      }]
    },
    {
      id: 'L1P2Q11',
      source: '2023 NSC P2, Q3.1.1',
      topicText: 'Globalised Economies Defined',
      teachTopic: 'p2-globalisation',
      parts: [{
        part: '3.1.1',
        prompt: 'Define the term globalised economies in your own words.',
        clue: '💡 Think about economies that cross borders.',
        answer: 'Economies that have access to resources from all countries across the world.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Economies that have access to resources from all countries across the world.\nEconomies that reap benefits from political and economic resources that are accessible across the world.\nIncreasing interdependence as a result of cross border trade.',
        memoCorrection: {
          whatToCheck: 'Must show the economy crosses borders.',
          commonMistake: 'Learners just say "world economy".',
          examinerHint: 'Globalised = across borders.',
          memoryTrick: '🧠 "Global = beyond borders"',
          mergedCorrection: `🧠 Memory Trick: "Global = beyond borders"\n\n📋 NSC Memo Answer:\nEconomies that have access to resources from all countries across the world.`
        }
      }]
    },
    {
      id: 'L1P2Q12',
      source: '2023 NSC P2, Q3.1.2',
      topicText: 'Criticisms of Globalisation',
      teachTopic: 'p2-globalisation',
      parts: [{
        part: '3.1.2',
        prompt: 'Give FOUR points of criticism of globalisation as stated in the source.',
        clue: '💡 Look for what globalisation has destroyed.',
        answer: 'Presents Africa and black people as marginal; devastation of the environment; climate change; depletion of natural and mineral resources; labour exploitation.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'presents Africa and black people as marginal\nthe devastation of the environment\nclimate change\ndepletion of natural and mineral resources\nlabour exploitation',
        memoCorrection: {
          whatToCheck: 'Must list FOUR criticisms.',
          commonMistake: 'Learners give opinions instead of source content.',
          examinerHint: 'Environment, climate, resources, labour, marginalisation.',
          memoryTrick: '🧠 "Environment · Labour · Marginalisation"',
          mergedCorrection: `🧠 Memory Trick: "Environment · Labour · Marginalisation"\n\n📋 NSC Memo Answer:\nMarginalises Africa · Devastates environment · Climate change · Depletes resources · Labour exploitation`
        }
      }]
    },
    {
      id: 'L1P2Q13',
      source: '2025 NSC P2, Q3.1.1',
      topicText: 'First BRIC Meeting',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.1.1',
        prompt: 'When, according to the source, did the first meeting in the BRIC format take place?',
        clue: '💡 Look for the specific date.',
        answer: '20 September 2006',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '20 September 2006',
        memoCorrection: {
          whatToCheck: 'Must state 20 September 2006.',
          commonMistake: 'Learners say 2010 (SA joins) or 2024 (expansion).',
          examinerHint: 'BRIC began 2006 · BRICS 2010 · BRICS+ 2024.',
          memoryTrick: '🧠 "2006 · 2010 · 2024"',
          mergedCorrection: `🧠 Memory Trick: "2006 · 2010 · 2024"\n\n📋 NSC Memo Answer:\n20 September 2006`
        }
      }]
    },
    {
      id: 'L1P2Q14',
      source: '2025 NSC P2, Q3.1.2',
      topicText: 'BRIC Founding Countries',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.1.2',
        prompt: 'Name the FOUR countries in the source who agreed to develop multifaceted cooperation among themselves in the formation of BRIC.',
        clue: '💡 The first four letters of BRIC.',
        answer: 'Brazil, Russia, India, China',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Russia\nBrazil\nChina\nIndia',
        memoCorrection: {
          whatToCheck: 'Must name all FOUR.',
          commonMistake: 'Learners include South Africa (which only joined in 2010).',
          examinerHint: 'B-R-I-C — 2006.',
          memoryTrick: '🧠 "BRIC founding four"',
          mergedCorrection: `🧠 Memory Trick: "BRIC founding four"\n\n📋 NSC Memo Answer:\nBrazil · Russia · India · China`
        }
      }]
    },
    {
      id: 'L1P2Q15',
      source: '2023 NSC P2, Q2.1.2',
      topicText: 'Amnesty Defined',
      teachTopic: 'p2-trc-amnesty',
      parts: [{
        part: '2.1.2',
        prompt: 'Define the term amnesty in your own words.',
        clue: '💡 Think about official forgiveness for political crimes.',
        answer: 'Process of exempting someone who committed a politically motivated crime from prosecution.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Process of exempting someone who committed a politically motivated crime from prosecution.\nGranting of official pardon or forgiveness to a perpetrator that would give full disclosure to political atrocities committed in the past.',
        memoCorrection: {
          whatToCheck: 'Must mention politically motivated crimes and prosecution.',
          commonMistake: 'Learners say "forgiveness" without the legal/prosecution angle.',
          examinerHint: 'Amnesty = no prosecution (with conditions).',
          memoryTrick: '🧠 "Amnesty = no prosecution"',
          mergedCorrection: `🧠 Memory Trick: "Amnesty = no prosecution"\n\n📋 NSC Memo Answer:\nProcess of exempting someone who committed a politically motivated crime from prosecution.`
        }
      }]
    },
    {
      id: 'L1P2Q16',
      source: '2024 NSC P2, Q2.2.2',
      topicText: 'Testimony Defined',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.2.2',
        prompt: 'Explain the term testimony in the context of application for amnesty.',
        clue: '💡 Think about what applicants give at a hearing.',
        answer: 'Spoken or written evidence by perpetrators who have applied for amnesty from the TRC.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'It\u2019s spoken or written evidence by perpetrators who have applied for amnesty from the TRC.',
        memoCorrection: {
          whatToCheck: 'Must show it is evidence given under oath/in a hearing.',
          commonMistake: 'Learners just say "evidence" without the amnesty context.',
          examinerHint: 'Testimony = spoken or written evidence.',
          memoryTrick: '🧠 "Testimony = evidence given"',
          mergedCorrection: `🧠 Memory Trick: "Testimony = evidence given"\n\n📋 NSC Memo Answer:\nSpoken or written evidence by perpetrators who applied for amnesty from the TRC.`
        }
      }]
    },
    {
      id: 'L1P2Q17',
      source: '2025 NSC P2, Q2.3.2',
      topicText: 'Amnesty Applicants — Farisani',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.3.2',
        prompt: 'Name THREE applicants, according to the source, who applied for amnesty for the assault and torture of Reverend Farisani.',
        clue: '💡 Look for the three names in the source.',
        answer: 'T Nesamari, P Manag, M Ramaligela',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'T Nesamari\nP Manag\nM Ramaligela',
        memoCorrection: {
          whatToCheck: 'Must name all THREE applicants.',
          commonMistake: 'Learners name only one or two.',
          examinerHint: 'Nesamari · Manag · Ramaligela.',
          memoryTrick: '🧠 "Nesamari · Manag · Ramaligela"',
          mergedCorrection: `🧠 Memory Trick: "Nesamari · Manag · Ramaligela"\n\n📋 NSC Memo Answer:\nT Nesamari · P Manag · M Ramaligela`
        }
      }]
    },
    {
      id: 'L1P2Q18',
      source: '2025 NSC P2, Q2.3.3',
      topicText: 'Oral Testimonies Defined',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.3.3',
        prompt: 'Explain the term oral testimonies in the context of the TRC\u2019s hearings by the Amnesty Committee.',
        clue: '💡 Think about spoken evidence at a hearing.',
        answer: 'Spoken/verbal accounts given by the policemen/perpetrators who tortured Farisani in order to plead for amnesty.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Spoken/verbal accounts given by the policemen/perpetrators who tortured Farisani/any victim in order to plead for amnesty.\nFirst-hand memories/accounts given by the amnesty applicants relating to the human rights abuses committed against Farisani/any victim in their quest for amnesty.',
        memoCorrection: {
          whatToCheck: 'Must show it is spoken testimony at a hearing.',
          commonMistake: 'Learners say "a story" without the legal context.',
          examinerHint: 'Oral = spoken. Testimony = evidence.',
          memoryTrick: '🧠 "Oral = spoken aloud"',
          mergedCorrection: `🧠 Memory Trick: "Oral = spoken aloud"\n\n📋 NSC Memo Answer:\nSpoken/verbal accounts given by perpetrators in order to plead for amnesty.`
        }
      }]
    },
    {
      id: 'L1P2Q19',
      source: '2024 NSC P2, Q3.1.1',
      topicText: 'Globalisation Defined',
      teachTopic: 'p2-globalisation',
      parts: [{
        part: '3.1.1',
        prompt: 'Define the term globalisation in your own words.',
        clue: '💡 Think about the world becoming more connected.',
        answer: 'Process whereby the world has become more integrated and connected beyond borders due to technology.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Process whereby the world has become more integrated and connected beyond borders due to technology.\nInterconnectedness of transport, technology and communication.\nThe way in which people, goods, money and ideas are moved around the world faster and cheaper than ever before due to transport, communication and technology.',
        memoCorrection: {
          whatToCheck: 'Must show the world becoming more connected.',
          commonMistake: 'Learners just say "trade" without the connection angle.',
          examinerHint: 'Globalisation = world connected through trade, tech, transport.',
          memoryTrick: '🧠 "Globalisation = world connected"',
          mergedCorrection: `🧠 Memory Trick: "Globalisation = world connected"\n\n📋 NSC Memo Answer:\nProcess whereby the world has become more integrated and connected beyond borders due to technology.`
        }
      }]
    },
    {
      id: 'L1P2Q20',
      source: '2024 NSC P2, Q3.5.4',
      topicText: 'Protectionist Defined',
      teachTopic: 'p2-responses-globalisation',
      parts: [{
        part: '3.5.4',
        prompt: 'Explain the concept protectionist in the context of international trade relations.',
        clue: '💡 Think about protecting local businesses from foreign competition.',
        answer: 'Government policies that restrict international trade to help protect domestic industries.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Refers to government policies that restrict international trade to help protect domestic industries.\nPolicies implemented to promote domestic production of goods.\nImposing tariffs limiting foreign goods in the market.',
        memoCorrection: {
          whatToCheck: 'Must mention protecting domestic industry.',
          commonMistake: 'Learners confuse with free trade (the opposite).',
          examinerHint: 'Protectionist = protect local, restrict foreign.',
          memoryTrick: '🧠 "Protection = protect local"',
          mergedCorrection: `🧠 Memory Trick: "Protection = protect local"\n\n📋 NSC Memo Answer:\nGovernment policies that restrict international trade to help protect domestic industries.`
        }
      }]
    },
  ],

  level2: [
    // ---------------- P1 (unchanged) ----------------
    {
      id: 'L2Q1',
      source: '2023 NSC P1, Q1.1.3',
      topicText: 'Why Germany Was Split',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.1.3',
        prompt: 'Explain why you think the occupying countries had to ensure that the Germans were not able to build up a military force again.',
        clue: '💡 Think about what Germany did in both World Wars.',
        answer: 'To prevent Germany from attacking its neighbours in the future. Germany was blamed for causing WWII and had to be weakened.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'To prevent Germany from attacking its neighbours in the future.\nTo prevent expansion in eastern Europe.\nGermany was blamed for having caused the Second World War.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons explaining why Germany had to be disarmed.',
          commonMistake: 'Learners give only one reason.',
          examinerHint: 'Think about what Germany did twice: WWI and WWII.',
          memoryTrick: '🧠 "Disarm Germany so it cannot attack again"',
          mergedCorrection: `🧠 Memory Trick: "Disarm Germany so it cannot attack again"\n\n📋 NSC Memo Answer:\nTo prevent Germany from attacking its neighbours in the future.\nGermany was blamed for having caused the Second World War.`
        }
      }]
    },
    {
      id: 'L2Q2',
      source: '2023 NSC P1, Q1.2.2',
      topicText: 'USA Response to Blockade',
      teachTopic: 'cold-war-origins',
      parts: [{
        part: '1.2.2',
        prompt: 'Explain why you think the USA regarded the Berlin Blockade as a clear violation of existing agreements concerning the administration of Berlin.',
        clue: '💡 Think about what was agreed at Yalta and Potsdam.',
        answer: 'The USA saw the blockade as a deliberate act of bringing poverty to Berliners. It was a decision the USSR took without discussing with the other countries.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The USA saw the Berlin Blockade by the Soviet Union as a deliberate act of bringing poverty to Berliners.\nThe USA saw the blockade as a decision that the Soviet Union took without discussing with the other countries.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons why the USA saw it as a violation.',
          commonMistake: 'Learners describe the blockade without explaining why it was a violation.',
          examinerHint: 'The agreements said all four powers would share Berlin equally.',
          memoryTrick: '🧠 "Unilateral move = breach of agreement"',
          mergedCorrection: `🧠 Memory Trick: "Unilateral move = breach of agreement"\n\n📋 NSC Memo Answer:\nThe USA saw the blockade as a deliberate act of bringing poverty to Berliners.\nThe USA saw it as a decision the USSR took without discussing with the other countries.`
        }
      }]
    },
    {
      id: 'L2Q3',
      source: '2021 NSC P1, Q1.1.4',
      topicText: 'Why USSR Rejected Marshall Plan',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.1.4',
        prompt: 'Using the information in the source and your own knowledge, explain why the Soviet Union and its satellite states refused to join the Marshall Plan.',
        clue: '💡 Think about ideology, control, and suspicion.',
        answer: 'They did not want to be influenced by capitalism. They wanted to protect communism. The USSR saw the Marshall Plan as dollar imperialism.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'They did not want to be involved with the USA.\nThey did not want to be influenced by capitalism.\nThey wanted to protect and maintain communism.\nThe Soviet Union viewed the Marshall Plan as dollar imperialism.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons why the USSR rejected it.',
          commonMistake: 'Learners say "they didn\u2019t need the money" — wrong. It was ideology.',
          examinerHint: 'USSR = protect communism + suspicion of US motives.',
          memoryTrick: '🧠 "USSR: protect communism, reject dollars"',
          mergedCorrection: `🧠 Memory Trick: "USSR: protect communism, reject dollars"\n\n📋 NSC Memo Answer:\nThey did not want to be influenced by capitalism. They wanted to protect communism. The USSR viewed the Marshall Plan as dollar imperialism.`
        }
      }]
    },
    {
      id: 'L2Q4',
      source: '2021 NSC P1, Q1.2.2',
      topicText: 'Marshall Plan & Communism',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.2.2',
        prompt: 'Explain how the Marshall Plan intended to prevent the spread of communism in Western Europe.',
        clue: '💡 Think about how economic recovery stops radical politics.',
        answer: 'By assisting in the economic recovery of Western Europe through reconstruction of industries. Prosperous economies mean people do not turn to communism.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'By assisting in the economic recovery of Western Europe through the reconstruction of industries.\nMarshall Aid was made available to countries needing assistance.',
        memoCorrection: {
          whatToCheck: 'Must link economic recovery to preventing communism.',
          commonMistake: 'Learners say the USA gave money without explaining WHY.',
          examinerHint: 'Poverty → communism. Prosperity → capitalism.',
          memoryTrick: '🧠 "Full stomachs vote capitalist"',
          mergedCorrection: `🧠 Memory Trick: "Full stomachs vote capitalist"\n\n📋 NSC Memo Answer:\nBy assisting in the economic recovery of Western Europe through the reconstruction of industries.`
        }
      }]
    },
    {
      id: 'L2Q5',
      source: '2022 NSC P1, Q1.2.3',
      topicText: 'Truman on Misery',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.2.3',
        prompt: 'What do you think Truman meant by the statement, "The seeds of totalitarian regimes are nurtured by misery and want", regarding the spread of communism to Europe?',
        clue: '💡 Think about poverty and how it feeds extremism.',
        answer: 'Totalitarian communist regimes would thrive where there is poverty and lack of resources. Weak economies make people turn to communism.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Totalitarian regimes which are communists would thrive where there is lack of basic resources.\nCommunist regimes would most likely gain popularity in the European countries with weak economies.',
        memoCorrection: {
          whatToCheck: 'Must explain the link between poverty and communism.',
          commonMistake: 'Learners only say "people were poor" without linking to communism.',
          examinerHint: 'Misery + want = fertile ground for communism.',
          memoryTrick: '🧠 "Poverty = fuel for communism"',
          mergedCorrection: `🧠 Memory Trick: "Poverty = fuel for communism"\n\n📋 NSC Memo Answer:\nCommunist regimes thrive where there is poverty. Weak economies turn to communism.`
        }
      }]
    },
    {
      id: 'L2Q6',
      source: '2023 NSC P1, Q1.2.4',
      topicText: 'USA Obligation in Berlin',
      teachTopic: 'cold-war-berlin-1948',
      parts: [{
        part: '1.2.4',
        prompt: 'State ONE specific obligation, according to the source, which the USA insisted on concerning the physical well-being of the population of its sector in Berlin.',
        clue: '💡 Think about movement of goods and people.',
        answer: 'Arrangements for the movement of freight and passenger traffic between the western zones and Berlin would be restored.',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'In accordance with existing agreements the arrangements for the movement of freight and passenger traffic between the western zones and Berlin be fully restored.',
        memoCorrection: {
          whatToCheck: 'Must quote the specific obligation.',
          commonMistake: 'Learners give a general statement.',
          examinerHint: 'Look for "movement of freight and passenger traffic".',
          memoryTrick: '🧠 "Freight + passengers restored"',
          mergedCorrection: `🧠 Memory Trick: "Freight + passengers restored"\n\n📋 NSC Memo Answer:\nArrangements for the movement of freight and passenger traffic between the western zones and Berlin be fully restored.`
        }
      }]
    },
    {
      id: 'L2Q7',
      source: '2023 NSC P1, Q1.2.5',
      topicText: 'Why USA Preferred Negotiations',
      teachTopic: 'cold-war-berlin-1948',
      parts: [{
        part: '1.2.5',
        prompt: 'Comment on why the USA emphasised its willingness to settle any disagreements with the USSR by negotiations.',
        clue: '💡 Think about nuclear weapons and world opinion.',
        answer: 'The USA was not prepared to engage in a military conflict with the USSR. They were a founding member of the UN and supported settling disputes through negotiation. They wanted to let the USSR appear as the aggressor.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The USA was not prepared to engage in any military conflict with the USSR.\nThe USA was a founding member of the United Nations Organisation.\nThe USA wanted to let the USSR appear as the aggressor.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons for preferring negotiation.',
          commonMistake: 'Learners say "they were scared" without context.',
          examinerHint: 'Avoid war + gain moral high ground.',
          memoryTrick: '🧠 "Negotiate = avoid war + look good"',
          mergedCorrection: `🧠 Memory Trick: "Negotiate = avoid war + look good"\n\n📋 NSC Memo Answer:\nThe USA was not prepared to engage in a military conflict with the USSR. They supported the UN\u2019s approach of settling disputes by negotiation.`
        }
      }]
    },
    {
      id: 'L2Q8',
      source: '2024 NSC P1, Q1.1.5',
      topicText: 'Berlin Wall Overnight',
      teachTopic: 'berlin-wall',
      parts: [{
        part: '1.1.5',
        prompt: 'Quote TWO pieces of evidence from the source which indicate that within a day the West of Berlin was completely sealed off from the East.',
        clue: '💡 Look for physical changes in the streets and transport.',
        answer: 'The streets of Berlin were torn up. Barricades of paving stones were erected. Tanks were gathered at crucial places. Subways and railway services were interrupted.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The streets of Berlin were torn up.\nBarricades of paving stones were erected.\nTanks were gathered at crucial places.\nSubways and local railway services were interrupted.',
        memoCorrection: {
          whatToCheck: 'Must quote TWO pieces of evidence from the source.',
          commonMistake: 'Learners paraphrase instead of quoting.',
          examinerHint: 'Look for physical changes: streets, barricades, tanks, transport.',
          memoryTrick: '🧠 "Streets · Barricades · Tanks · Subways"',
          mergedCorrection: `🧠 Memory Trick: "Streets · Barricades · Tanks · Subways"\n\n📋 NSC Memo Answer:\nStreets torn up. Barricades erected. Tanks gathered. Subways interrupted.`
        }
      }]
    },
    {
      id: 'L2Q9',
      source: '2024 NSC P1, Q2.1.5',
      topicText: 'Cuito Cuanavale Limitation',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.1.5',
        prompt: 'Explain the limitations of the source to a historian researching the outcome of the Battle of Cuito Cuanavale.',
        clue: '💡 Think about who wrote it and what viewpoint it reflects.',
        answer: 'The source is biased — written by an anti-apartheid activist. It only highlights the MPLA\u2019s victory.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'It was written by D Goldberg, an anti-apartheid activist, thus biased/one-sided.\nIt only highlights the MPLA\u2019s victory.\nThe language used is biased against South Africa and the United States.',
        memoCorrection: {
          whatToCheck: 'Must explain WHY the source is limited — bias or one-sided view.',
          commonMistake: 'Learners say "it\u2019s biased" without saying whose bias.',
          examinerHint: 'Who wrote it? What side were they on?',
          memoryTrick: '🧠 "Ask: who wrote it and what side?"',
          mergedCorrection: `🧠 Memory Trick: "Ask: who wrote it and what side?"\n\n📋 NSC Memo Answer:\nIt was written by an anti-apartheid activist, thus biased. It only highlights the MPLA victory.`
        }
      }]
    },
    {
      id: 'L2Q10',
      source: '2022 NSC P1, Q2.3.3',
      topicText: 'Accord Defined',
      teachTopic: 'cuito-cuanavale',
      parts: [{
        part: '2.3.3',
        prompt: 'Explain the term accord in the context of ending the Battle of Cuito Cuanavale.',
        clue: '💡 Think about a formal agreement between warring parties.',
        answer: 'A ceasefire reached between warring factions leading to the withdrawal of Cuba and South Africa from Angola.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A ceasefire reached between warring factions (Cuba and South Africa) leading to the withdrawal of Cuba and South Africa from Angola.',
        memoCorrection: {
          whatToCheck: 'Must show it is a formal agreement / ceasefire.',
          commonMistake: 'Learners describe the battle instead.',
          examinerHint: 'Accord = formal peace agreement.',
          memoryTrick: '🧠 "Accord = formal peace deal"',
          mergedCorrection: `🧠 Memory Trick: "Accord = formal peace deal"\n\n📋 NSC Memo Answer:\nA ceasefire reached between warring factions leading to withdrawal.`
        }
      }]
    },
    {
      id: 'L2Q11',
      source: '2022 NSC P1, Q5',
      topicText: 'Mobutu\u2019s Coup',
      teachTopic: 'independent-africa-congo',
      parts: [{
        part: 'Q5',
        prompt: 'In which year did Mobutu Sese Seko seize power in the Congo through a coup d\u2019etat?',
        clue: '💡 This was five years after independence.',
        answer: '1965',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: '1965',
        memoCorrection: {
          whatToCheck: 'Must state 1965.',
          commonMistake: 'Learners say 1960 (independence) or 1967.',
          examinerHint: 'Independence 1960. Mobutu coup 1965.',
          memoryTrick: '🧠 "1960 → 1965 = Mobutu takes over"',
          mergedCorrection: `🧠 Memory Trick: "1960 → 1965 = Mobutu takes over"\n\n📋 NSC Memo Answer:\n1965`
        }
      }]
    },
    {
      id: 'L2Q12',
      source: '2021 NSC P1, Q3.2.2',
      topicText: 'Tougaloo Nine',
      teachTopic: 'civil-rights-sit-ins',
      parts: [{
        part: '3.2.2',
        prompt: 'In the context of segregation in the USA, comment on what is conveyed by the words, "There\u2019s a Coloured library on Mill Street".',
        clue: '💡 Think about the segregation laws the CRM was against.',
        answer: 'African Americans should use the library designated for coloureds only — highlighting the segregation and Jim Crow laws. The librarian was not prepared to desegregate.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'That African Americans should use the library that was designated for coloureds — the segregation/Jim Crow laws that the CRM was against.\nThat African Americans will not be allowed to use the "white only" library.',
        memoCorrection: {
          whatToCheck: 'Must explain the segregation context.',
          commonMistake: 'Learners miss the Jim Crow reference.',
          examinerHint: 'Segregated facilities were the target of the sit-ins.',
          memoryTrick: '🧠 "Separate libraries = Jim Crow"',
          mergedCorrection: `🧠 Memory Trick: "Separate libraries = Jim Crow"\n\n📋 NSC Memo Answer:\nAfrican Americans should use the library designated for coloureds — the segregation/Jim Crow laws the CRM was against.`
        }
      }]
    },
    {
      id: 'L2Q13',
      source: '2022 NSC P1, Q3.2.2',
      topicText: 'Major Cloud\u2019s Refusal',
      teachTopic: 'civil-rights-selma',
      parts: [{
        part: '3.2.2',
        prompt: 'Explain the implication of the statement, "There will be no word", in the context of Major Cloud\u2019s attitude towards the activists.',
        clue: '💡 Think about what the Major was refusing to do.',
        answer: 'Major Cloud\u2019s intention was to ensure the march was blocked. He was not ready to listen to the protestors.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Major Cloud\u2019s intention was to ensure that the march was blocked.\nHe was not ready to listen and discuss the pleas of the protestors.\nHe was only carrying out orders given to him to block and disperse the marchers.',
        memoCorrection: {
          whatToCheck: 'Must show Cloud was refusing to negotiate.',
          commonMistake: 'Learners just restate the quote.',
          examinerHint: 'No word = no negotiation, no discussion.',
          memoryTrick: '🧠 "No word = no negotiation"',
          mergedCorrection: `🧠 Memory Trick: "No word = no negotiation"\n\n📋 NSC Memo Answer:\nMajor Cloud was not ready to listen to the protestors. He only carried out orders to disperse them.`
        }
      }]
    },
    {
      id: 'L2Q14',
      source: '2023 NSC P1, Q3.3.1',
      topicText: 'Freedom Riders Motivation',
      teachTopic: 'civil-rights-freedom-rides',
      parts: [{
        part: '3.3.1',
        prompt: 'What, according to the source, motivated Zwerg and his colleagues to get involved in the Freedom Rides?',
        clue: '💡 Think about who they knew was involved.',
        answer: 'They knew that John Lewis, a member of their organisation, was going to be involved. They heard about a bus burning in Aniston.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'They knew that John Lewis, a member of their organisation, was going to be involved in it.',
        memoCorrection: {
          whatToCheck: 'Must give at least one motivation from the source.',
          commonMistake: 'Learners give general civil rights motivations, not from the source.',
          examinerHint: 'Look for names and events.',
          memoryTrick: '🧠 "John Lewis + burning bus"',
          mergedCorrection: `🧠 Memory Trick: "John Lewis + burning bus"\n\n📋 NSC Memo Answer:\nThey knew John Lewis was involved.`
        }
      }]
    },
    {
      id: 'L2Q15',
      source: '2024 NSC P1, Q3.1.2',
      topicText: 'March Discipline',
      teachTopic: 'march-on-washington',
      parts: [{
        part: '3.1.2',
        prompt: 'State any TWO ways in the source in which the organisers wanted the March to be a disciplined and purposeful demonstration.',
        clue: '💡 Look for orderly, non-violent, unified.',
        answer: 'Orderly, non-violent, unified in purpose and behaviour, outspoken but not raucous, and resisting provocations to disorder.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Orderly. Non-violent. Unified in purposes and behaviour. Outspoken, but not raucous. To resist provocations to disorder and to violence.',
        memoCorrection: {
          whatToCheck: 'Must list TWO disciplined qualities.',
          commonMistake: 'Learners just say "peaceful".',
          examinerHint: 'Orderly + unified + non-violent.',
          memoryTrick: '🧠 "Orderly · Unified · Non-violent"',
          mergedCorrection: `🧠 Memory Trick: "Orderly · Unified · Non-violent"\n\n📋 NSC Memo Answer:\nOrderly. Non-violent. Unified. Resisting provocations.`
        }
      }]
    },
    {
      id: 'L2Q16',
      source: '2025 NSC P1, Q3.1.4',
      topicText: 'King on Non-Violence',
      teachTopic: 'mlk-non-violence',
      parts: [{
        part: '3.1.4',
        prompt: 'Explain what King Jr implied by the statement, "It (non-violence) meant putting oneself in the face of violence ...", in the context of the civil society protests.',
        clue: '💡 Think about confronting violence without fighting back.',
        answer: 'Protestors had to face violence head-on without fighting back. By not retaliating, they would challenge white power.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'King Jr believed that protestors had to face violence head-on — without fighting back.\nBy not retaliating with violence, protestors would be challenging white power.\nThe civil society protestors had to be brave in facing violence as a commitment to insist on their rights.',
        memoCorrection: {
          whatToCheck: 'Must show non-violence = facing violence without retaliation.',
          commonMistake: 'Learners say "peaceful protest" without the confrontation aspect.',
          examinerHint: 'Put yourself IN the face of violence — don\u2019t run, don\u2019t fight.',
          memoryTrick: '🧠 "Face it — don\u2019t fight it"',
          mergedCorrection: `🧠 Memory Trick: "Face it — don't fight it"\n\n📋 NSC Memo Answer:\nProtestors had to face violence head-on without fighting back. This would challenge white power.`
        }
      }]
    },
    {
      id: 'L2Q17',
      source: '2025 NSC P1, Q3.5.1',
      topicText: 'Malcolm X Criticisms',
      teachTopic: 'black-power-movement',
      parts: [{
        part: '3.5.1',
        prompt: 'Quote TWO criticisms from the source that were levelled against King Jr\u2019s non-violent approach by Malcolm X.',
        clue: '💡 Think about what Malcolm X called King\u2019s philosophy.',
        answer: 'It makes them believe that Negroes are meek, supine creatures. It is encouraged by whites because it makes them comfortable. It is deliberately your philosophy of love of the oppressor.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'It makes them believe that Negroes are meek (submissive), supine (passive) creatures.\nThis philosophy is encouraged by whites because it makes them comfortable.\nThis is deliberately your philosophy of love of the oppressor.',
        memoCorrection: {
          whatToCheck: 'Must quote TWO criticisms from the source.',
          commonMistake: 'Learners paraphrase or give their own opinion.',
          examinerHint: 'Look for the exact words Malcolm X used.',
          memoryTrick: '🧠 "Meek · Comfortable · Love of oppressor"',
          mergedCorrection: `🧠 Memory Trick: "Meek · Comfortable · Love of oppressor"\n\n📋 NSC Memo Answer:\nMeek supine creatures. Encouraged by whites. Love of the oppressor.`
        }
      }]
    },

    // ---------------- P2 (NEW) ----------------
    {
      id: 'L2P2Q1',
      source: '2024 NSC P2, Q1.1.4',
      topicText: 'Civics Becoming Political',
      teachTopic: 'p2-rent-boycotts',
      parts: [{
        part: '1.1.4',
        prompt: 'Comment on what is implied by the statement, "... addressing these (bread-and-butter) issues automatically drove them (civic organisations) to political issues", in their townships.',
        clue: '💡 Think about how local issues become national issues.',
        answer: 'Civic organisations no longer focused only on local concerns — they became politicised. They started asking critical questions about why streets were dirty and why they had to pay rent. The challenges stemmed from apartheid itself.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Civic organisations no longer focused only on local concerns of residents.\nThey were politicised to start challenging local government structures.\nThey started asking critical questions, e.g. why streets were dirty and why they had to pay rent.\nThe challenges they confronted stemmed from the apartheid system which compelled them to actively join the liberation struggle.',
        memoCorrection: {
          whatToCheck: 'Must link local issues to national politics.',
          commonMistake: 'Learners just say "they got political".',
          examinerHint: 'Bread-and-butter → politics → apartheid.',
          memoryTrick: '🧠 "Local issues = apartheid issues"',
          mergedCorrection: `🧠 Memory Trick: "Local issues = apartheid issues"\n\n📋 NSC Memo Answer:\nCivic organisations became politicised — the local issues were rooted in apartheid itself.`
        }
      }]
    },
    {
      id: 'L2P2Q2',
      source: '2024 NSC P2, Q1.4.2',
      topicText: 'Why Councillors Resigned',
      teachTopic: 'p2-black-local-authorities',
      parts: [{
        part: '1.4.2',
        prompt: 'Using the information in the source and your own knowledge, comment on why there were many township councillors who resigned in 1984.',
        clue: '💡 Think about the backlash against councillors.',
        answer: 'They were scared of residents attacking them for their role in implementing rent increases. They were seen as puppets of the apartheid government.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'They were scared that residents would attack them for their role in implementing rent increases in townships.\nThey were used as pawns by black local authorities — which made them unpopular to residents.\nThey wanted to escape the stigma of being seen as an extension of the apartheid government.\nLack of protection from government.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons for resignations.',
          commonMistake: 'Learners only mention "pressure" without detail.',
          examinerHint: 'Fear + stigma + no protection.',
          memoryTrick: '🧠 "Fear · Stigma · No protection"',
          mergedCorrection: `🧠 Memory Trick: "Fear · Stigma · No protection"\n\n📋 NSC Memo Answer:\nScared of residents. Seen as puppets. No protection.`
        }
      }]
    },
    {
      id: 'L2P2Q3',
      source: '2023 NSC P2, Q1.1.4',
      topicText: 'COSATU and One-Person-One-Vote',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.1.4',
        prompt: 'What is implied by the statement, "that it [COSATU] was committed to one-person one-vote in a unitary South Africa", in the context of its role as a labour movement?',
        clue: '💡 Think about COSATU\u2019s wider political role.',
        answer: 'COSATU was not only involved with labour issues but also with political matters. It supported the objectives of the liberation struggle — fighting for the right to vote for all South Africans.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'COSATU was not only involved with labour issues but also with political matters.\nCOSATU supported the objectives of the liberation struggle — fighting for the right to vote for all South Africans/democratic rights.\nAll South Africans should exercise their right to vote within a united South Africa.',
        memoCorrection: {
          whatToCheck: 'Must show COSATU had a wider political role.',
          commonMistake: 'Learners describe only labour concerns.',
          examinerHint: 'COSATU was political AND labour.',
          memoryTrick: '🧠 "Union = labour + politics"',
          mergedCorrection: `🧠 Memory Trick: "Union = labour + politics"\n\n📋 NSC Memo Answer:\nCOSATU was political as well as labour. It supported one-person one-vote in a unitary South Africa.`
        }
      }]
    },
    {
      id: 'L2P2Q4',
      source: '2023 NSC P2, Q1.3.4',
      topicText: 'Sanctions',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.3.4',
        prompt: 'Explain the concept sanctions in the context of COSATU\u2019s position in resisting the apartheid government.',
        clue: '💡 Think about economic punishment.',
        answer: 'Campaigns organised by COSATU and aligned organisations for economic punitive measures (trade boycotts) to be implemented to isolate South Africa from the world, forcing it to change its apartheid policy.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Campaigns organised by COSATU and aligned organisations for economic punitive measures (trade boycotts) to be implemented to isolate South Africa from the world, forcing it to change its apartheid policy.\nFormal/official blocking of economic, cultural, political relations between foreign countries and the apartheid government of SA to force it to end apartheid.',
        memoCorrection: {
          whatToCheck: 'Must show sanctions = economic pressure to force change.',
          commonMistake: 'Learners just say "punishments" without the economic angle.',
          examinerHint: 'Sanctions = economic pressure for political change.',
          memoryTrick: '🧠 "Sanctions = economic squeeze"',
          mergedCorrection: `🧠 Memory Trick: "Sanctions = economic squeeze"\n\n📋 NSC Memo Answer:\nCampaigns for economic punitive measures (trade boycotts) to isolate South Africa and force it to change apartheid.`
        }
      }]
    },
    {
      id: 'L2P2Q5',
      source: '2025 NSC P2, Q1.4.2',
      topicText: 'Grievances',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.4.2',
        prompt: 'Explain the term grievances in the context of COSATU\u2019s activities against the apartheid government.',
        clue: '💡 Think about what workers were unhappy about.',
        answer: 'Complaints/demands/issues that COSATU members had against the apartheid labour laws and for better wages.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Complaints/Demands/issues that COSATU members had against the apartheid labour laws and/for better wages.\nDemands showing resentment and rejection of the apartheid government by labour unions affiliated to COSATU.',
        memoCorrection: {
          whatToCheck: 'Must show grievances = complaints/demands.',
          commonMistake: 'Learners just say "problems".',
          examinerHint: 'Grievances = demands against the system.',
          memoryTrick: '🧠 "Grievance = complaint + demand"',
          mergedCorrection: `🧠 Memory Trick: "Grievance = complaint + demand"\n\n📋 NSC Memo Answer:\nComplaints/demands that COSATU members had against the apartheid labour laws and for better wages.`
        }
      }]
    },
    {
      id: 'L2P2Q6',
      source: '2025 NSC P2, Q2.1.3',
      topicText: 'Prisoner of Conscience',
      teachTopic: 'p2-bc-nature-aims',
      parts: [{
        part: '2.1.3',
        prompt: 'Explain why Amnesty International declared Farisani "a prisoner of conscience".',
        clue: '💡 Think about why he was imprisoned.',
        answer: 'The injustices against Farisani were wrong — he was imprisoned for peaceful expression of his political beliefs, not for any crime.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The injustices meted out against Farisani due to his political beliefs were wrong.\nThe apartheid government imprisoned him because he held political views that were not tolerated by the state in which he lived.\nHe was imprisoned for peaceful expression of his political beliefs.\nPledging solidarity with the cause of prisoners like Farisani.',
        memoCorrection: {
          whatToCheck: 'Must show he was imprisoned for beliefs, not crime.',
          commonMistake: 'Learners describe his abuse but not why he was labelled thus.',
          examinerHint: 'Prisoner of conscience = held for beliefs, not crime.',
          memoryTrick: '🧠 "Conscience = beliefs, not crimes"',
          mergedCorrection: `🧠 Memory Trick: "Conscience = beliefs, not crimes"\n\n📋 NSC Memo Answer:\nFarisani was imprisoned for his political beliefs, not for any crime — hence a prisoner of conscience.`
        }
      }]
    },
    {
      id: 'L2P2Q7',
      source: '2024 NSC P2, Q2.1.3',
      topicText: 'Why Demand Explanations',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.1.3',
        prompt: 'Why do you think black South Africans demanded explanations from perpetrators, and not only disclosure by the National Party?',
        clue: '💡 Think about what closure actually requires.',
        answer: 'Most injustices committed in the past by the apartheid government were against blacks who demanded explanations to find closure.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Most injustices committed in the past by the apartheid government were against blacks who demanded explanations to find closure.\nThe amnesty process led to those who tortured and killed black activists to be scot free.\nFamilies of victims did not always get the whole truth of what happened to their loved ones.\nThey wanted to hear from perpetrators themselves.',
        memoCorrection: {
          whatToCheck: 'Must show victims wanted direct answers from perpetrators.',
          commonMistake: 'Learners only say "to know the truth" without depth.',
          examinerHint: 'Closure required hearing from the perpetrators themselves.',
          memoryTrick: '🧠 "Closure needs the perpetrators\u2019 own words"',
          mergedCorrection: `🧠 Memory Trick: "Closure needs the perpetrators\u2019 own words"\n\n📋 NSC Memo Answer:\nThey wanted explanations from perpetrators to find closure — not just political disclosure.`
        }
      }]
    },
    {
      id: 'L2P2Q8',
      source: '2023 NSC P2, Q2.4.2',
      topicText: 'Erasmus Felt Old Fury',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.4.2',
        prompt: 'Why, according to the source, did P Erasmus mention, "... I felt that old fury (anger) burning bright as ever inside me", regarding the meetings between ex-ministers, generals and the State Security Council on how to deal with the TRC?',
        clue: '💡 Think about what the leadership was planning.',
        answer: 'He had already met on three occasions and was planning the fourth to prepare for the coming TRC onslaught.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Had already met on three occasions.\nWere planning the fourth meeting to prepare themselves for what must felt like the coming onslaught of the TRC.\nEach individual goes before the commission and tells their story alone.',
        memoCorrection: {
          whatToCheck: 'Must reference the meetings against the TRC.',
          commonMistake: 'Learners just say "he was angry".',
          examinerHint: 'Fury = anger at the TRC process.',
          memoryTrick: '🧠 "Fury at the TRC"',
          mergedCorrection: `🧠 Memory Trick: "Fury at the TRC"\n\n📋 NSC Memo Answer:\nHe was furious about the TRC\u2019s onslaught and the meetings held to prepare for it.`
        }
      }]
    },
    {
      id: 'L2P2Q9',
      source: '2025 NSC P2, Q2.3.4',
      topicText: 'No Full Disclosure',
      teachTopic: 'p2-trc-amnesty',
      parts: [{
        part: '2.3.4',
        prompt: 'What conclusion can be drawn from the statement, "The (TRC\u2019s Amnesty) Committee is not satisfied that the above three applicants have made a full disclosure", as required by the Act?',
        clue: '💡 Think about what the TRC required for amnesty.',
        answer: 'The applicants did not tell the whole truth as expected by the TRC Act — so amnesty was refused.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The applicants did not tell the whole truth as was expected by the TRC Act, (Act 34 of 1995).\nThe testimonies given by the applicants were not sufficient to make them qualify for amnesty.',
        memoCorrection: {
          whatToCheck: 'Must state that amnesty was refused due to incomplete disclosure.',
          commonMistake: 'Learners say "they lied" without the amnesty refusal.',
          examinerHint: 'No full truth = no amnesty.',
          memoryTrick: '🧠 "No full truth = no amnesty"',
          mergedCorrection: `🧠 Memory Trick: "No full truth = no amnesty"\n\n📋 NSC Memo Answer:\nThe applicants did not make full disclosure, so amnesty was refused.`
        }
      }]
    },
    {
      id: 'L2P2Q10',
      source: '2023 NSC P2, Q2.1.4',
      topicText: 'Dullah Omar on TRC',
      teachTopic: 'p2-trc-establishment',
      parts: [{
        part: '2.1.4',
        prompt: 'Explain the implication of the statement of the Minister of Justice, Dullah Omar, about the TRC: "... to enable South Africans to come to terms with their past ... to advance the cause of reconciliation".',
        clue: '💡 Think about why the past had to be faced.',
        answer: 'The TRC had to reveal the truth about atrocities committed in the past to forge reconciliation amongst South Africans. It created a platform where victims and perpetrators could tell their stories to help those affected get closure.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'That the TRC had to reveal the truth about atrocities committed in the past to forge reconciliation amongst South Africans.\nThe TRC should create a platform where victims and perpetrators could tell their stories to help those affected get closure and be willing to reconcile.\nAll South Africans should face the past to achieve healing and reconciliation.',
        memoCorrection: {
          whatToCheck: 'Must link truth-telling to reconciliation.',
          commonMistake: 'Learners just say "to forgive".',
          examinerHint: 'Truth first → then reconciliation.',
          memoryTrick: '🧠 "Truth before reconciliation"',
          mergedCorrection: `🧠 Memory Trick: "Truth before reconciliation"\n\n📋 NSC Memo Answer:\nThe TRC had to reveal the truth about atrocities to forge reconciliation. It created a platform for victims and perpetrators to tell their stories.`
        }
      }]
    },
    {
      id: 'L2P2Q11',
      source: '2025 NSC P2, Q3.2.2',
      topicText: 'De-Dollarisation',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.2.2',
        prompt: 'Explain the concept de-dollarisation in the context of the BRICS challenge to Western countries.',
        clue: '💡 Think about what currency they want to stop using.',
        answer: 'The reduction of dependence on the US dollar in global trade by BRICS member states.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The reduction of dependence on the US dollar in global trade by BRICS member states.\nThe increased use of local BRICS currencies as a substitute for the dollar in international trade transactions.\nThe establishment of an international payment system not reliant on dollar payments.',
        memoCorrection: {
          whatToCheck: 'Must show reduction of US dollar dependence.',
          commonMistake: 'Learners just say "use their own money".',
          examinerHint: 'De-dollar = reduce dollar dependence.',
          memoryTrick: '🧠 "De-dollar = less US dollar"',
          mergedCorrection: `🧠 Memory Trick: "De-dollar = less US dollar"\n\n📋 NSC Memo Answer:\nReduction of dependence on the US dollar in global trade by BRICS member states.`
        }
      }]
    },
    {
      id: 'L2P2Q12',
      source: '2023 NSC P2, Q3.2.4',
      topicText: 'Structural Adjustments',
      teachTopic: 'p2-balance-of-power-africa',
      parts: [{
        part: '3.2.4',
        prompt: 'Explain the term structural adjustments in the context of the policies of international financial institutions regarding African countries.',
        clue: '💡 Think about what conditions were attached to loans.',
        answer: 'Policy through which the IMF and World Bank provided conditional loans to countries in economic crisis.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Policy through which the IMF and World Bank provided conditional loans to countries in economic crisis.\nPolicy that was used by the IMF and the World Bank to assist countries in Africa to stabilise and recover their economies as a result of globalisation.\nPolicy that lessens the role of government on the economy by promoting market economy.',
        memoCorrection: {
          whatToCheck: 'Must show conditional loans / economic restructuring.',
          commonMistake: 'Learners just say "loans".',
          examinerHint: 'SAPs = loans with conditions attached.',
          memoryTrick: '🧠 "SAP = loans with strings"',
          mergedCorrection: `🧠 Memory Trick: "SAP = loans with strings"\n\n📋 NSC Memo Answer:\nPolicy through which the IMF and World Bank provided conditional loans to countries in economic crisis.`
        }
      }]
    },
    {
      id: 'L2P2Q13',
      source: '2025 NSC P2, Q3.1.4',
      topicText: 'Significance of BRICS Expansion',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.1.4',
        prompt: 'Using information in the source and your own knowledge, explain the significance of six new countries joining BRICS on 1 January 2024.',
        clue: '💡 Think about what the expansion means for global power.',
        answer: 'Strengthened BRICS countries to challenge the Global North/balance of power. Neutralised the domination by the Global North. Provided more BRICS members to collaborate at the United Nations.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Strengthen BRICS countries to challenge the Global North/balance of power.\nNeutralised the domination by the Global North.\nIt provided more BRICS members to collaborate at the United Nations.\nSupport and development (political, economic and social) to members of the Third World countries (Global South).\nDirectly threatened the Global North to recognise the Global South as an equal trading partner.',
        memoCorrection: {
          whatToCheck: 'Must give TWO implications of the expansion.',
          commonMistake: 'Learners just list the new members.',
          examinerHint: 'Expansion = stronger challenge to Global North.',
          memoryTrick: '🧠 "More members = more power"',
          mergedCorrection: `🧠 Memory Trick: "More members = more power"\n\n📋 NSC Memo Answer:\nStrengthened BRICS to challenge the Global North. More collaboration at UN. Threatened the Global North to recognise the Global South.`
        }
      }]
    },
    {
      id: 'L2P2Q14',
      source: '2025 NSC P2, Q3.2.4',
      topicText: 'Diminished US Influence',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.2.4',
        prompt: 'Comment on how the "diminished (reduced) US influence" would change the existing international order.',
        clue: '💡 Think about what would replace US dominance.',
        answer: 'US would lose its position as leader of the Global North. Global North would surrender its dominant position. Opened doors for leadership in the Global South. Free trade would narrow the economic gap. Global South would play a meaningful role.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'US would lose its position as a leader of the Global North/de-dollarisation.\nGlobal North would surrender its dominant position in the world.\nOpened doors for leadership in the Global North.\nFree trade would narrow the economic gap between the undeveloped/underdeveloped and developed countries.\nIt would give the Global South to play a meaningful role in sharing political and economic spheres in the world.',
        memoCorrection: {
          whatToCheck: 'Must explain the shift in global power.',
          commonMistake: 'Learners just say "US is weaker now".',
          examinerHint: 'US loses dominance → Global South rises.',
          memoryTrick: '🧠 "US down → South up"',
          mergedCorrection: `🧠 Memory Trick: "US down → South up"\n\n📋 NSC Memo Answer:\nUS loses leadership of Global North. Global South rises. Economic gap narrows. Multi-polar order emerges.`
        }
      }]
    },
    {
      id: 'L2P2Q15',
      source: '2024 NSC P2, Q3.5.3',
      topicText: 'Walmart and Local Suppliers',
      teachTopic: 'p2-responses-globalisation',
      parts: [{
        part: '3.5.3',
        prompt: 'Comment on why you think it was necessary for Walmart to have reliable local suppliers especially for perishable products.',
        clue: '💡 Think about how fresh food needs to move.',
        answer: 'To improve on the freshness of food products. To ensure that the food is safe for consumption. To maximise profit and reduce unnecessary costs.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'To improve on the freshness of food products.\nTo ensure that the food is safe for consumption.\nTo maximise profit and reduce unnecessary costs.\nTo put more locally produced foods in stores.\nTo avoid importing perishable products from outside countries.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons for local suppliers.',
          commonMistake: 'Learners give only one reason.',
          examinerHint: 'Perishables = freshness + cost + safety.',
          memoryTrick: '🧠 "Fresh · Safe · Cheap"',
          mergedCorrection: `🧠 Memory Trick: "Fresh · Safe · Cheap"\n\n📋 NSC Memo Answer:\nFreshness. Safety. Lower costs. More local produce in stores.`
        }
      }]
    },
    {
      id: 'L2P2Q16',
      source: '2023 NSC P2, Q3.3.1',
      topicText: 'Dependence Theory Cartoon',
      teachTopic: 'p2-balance-of-power-africa',
      parts: [{
        part: '3.3.1',
        prompt: 'Explain whether you consider the caption "Dependence Theory" as appropriate for this cartoon.',
        clue: '💡 Think about who depends on whom.',
        answer: 'APPROPRIATE: Rich nations (developed countries) depend on resources from poor nations (underdeveloped countries). Poor nations are exploited.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'APPROPRIATE:\nRich nations (developed countries) depend on resources from poor nations (underdeveloped countries).\nPoor nations are exploited.\nNOT APPROPRIATE:\nRich nations (developed countries) should help poor nations (developing countries).\nPoor nations are known for depending on hand-outs (loans) from developed countries/international powerful institutions.',
        memoCorrection: {
          whatToCheck: 'Must take a stance (appropriate or not) with justification.',
          commonMistake: 'Learners do not take a stance.',
          examinerHint: 'Rich nations depend on poor resources. Poor nations are exploited.',
          memoryTrick: '🧠 "Rich depends on poor"',
          mergedCorrection: `🧠 Memory Trick: "Rich depends on poor"\n\n📋 NSC Memo Answer:\nAPPROPRIATE: Rich nations depend on resources from poor nations. Poor nations are exploited.`
        }
      }]
    },
  ],

  level3: [
    // ---------------- P1 (unchanged) ----------------
    {
      id: 'L3Q1',
      source: '2024 NSC P1, Q3.2.4',
      topicText: 'I Have a Dream',
      teachTopic: 'march-on-washington',
      parts: [{
        part: '3.2.4',
        prompt: 'Comment on why the "I Have a Dream" speech may be regarded as historically significant.',
        clue: '💡 Think about what the speech achieved and who heard it.',
        answer: 'It gave hope to African Americans. It made Martin Luther King Jr famous. It reminded all Americans that they were equal. It was televised worldwide and brought international support. It led to the Civil Rights Act of 1964.',
        marks: 8,
        acceptAnyTwo: true,
        memoFullAnswer: 'It gave hope to African Americans.\nIt made Martin Luther King Jr famous and contributed to his Nobel Peace Prize.\nThe speech was televised across the world and brought more support to the Civil Rights Movement.\nIt led to the signing of the Civil Rights Act of 1964.',
        memoCorrection: {
          whatToCheck: 'Must give TWO or more impacts of the speech.',
          commonMistake: 'Learners just describe the speech without saying why it mattered.',
          examinerHint: 'Think: what changed because of this speech?',
          memoryTrick: '🧠 "Hope · World · Law"',
          mergedCorrection: `🧠 Memory Trick: "Hope · World · Law"\n\n📋 NSC Memo Answer:\nGave hope. Televised worldwide. Led to the Civil Rights Act of 1964.`
        }
      }]
    },
    {
      id: 'L3Q2',
      source: '2023 NSC P1, Q3.4.2',
      topicText: 'Governor Patterson',
      teachTopic: 'civil-rights-freedom-rides',
      parts: [{
        part: '3.4.2',
        prompt: 'Comment on what is implied by Governor Patterson\u2019s statement, "Any rioters in this state will not receive police protection".',
        clue: '💡 Think about who Patterson considered rioters and why he would not protect them.',
        answer: 'Patterson did not support the Freedom Riders because they were against integration. He would not assign police to protect the protestors from racist attackers. He wanted to sustain laws enforcing segregation.',
        marks: 6,
        acceptAnyTwo: true,
        memoFullAnswer: 'The Governor did not support the Freedom Riders because they were against integration.\nHe would not assign the police to protect the protestors from racist attackers.\nHe wanted to sustain the use of State laws which enforced segregation.',
        memoCorrection: {
          whatToCheck: 'Must give TWO or more implications of the statement.',
          commonMistake: 'Learners just restate the quote.',
          examinerHint: 'Why would a governor refuse protection to peaceful protestors?',
          memoryTrick: '🧠 "No protection = pro-segregation"',
          mergedCorrection: `🧠 Memory Trick: "No protection = pro-segregation"\n\n📋 NSC Memo Answer:\nThe Governor did not support the Freedom Riders because they were against integration. He refused to protect them. He wanted to sustain segregation laws.`
        }
      }]
    },
    {
      id: 'L3Q3',
      source: '2025 NSC P1, Q3.2.2',
      topicText: 'King on Rioting',
      teachTopic: 'mlk-non-violence',
      parts: [{
        part: '3.2.2',
        prompt: 'What did King Jr imply by the words, "But I am convinced that if rioting continues, it will strengthen the right wing of the country"?',
        clue: '💡 Think about how riots could help the opponents of civil rights.',
        answer: 'If protestors turned to riots, it would give conservative state troops justification to be more aggressive. It would encourage far-right groups like the Ku Klux Klan to be more violent.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'If the protestors turned to riots, it would give the more conservative state troops justification for being more aggressive.\nIf the protestors turned to violence, that would encourage the far-right movement (such as the Ku Klux Klan) to be more violent.',
        memoCorrection: {
          whatToCheck: 'Must explain how riots would HELP the right wing, not just that they are bad.',
          commonMistake: 'Learners just say riots are bad.',
          examinerHint: 'Riots = ammunition for the segregationists.',
          memoryTrick: '🧠 "Riots feed the right wing"',
          mergedCorrection: `🧠 Memory Trick: "Riots feed the right wing"\n\n📋 NSC Memo Answer:\nRiots would give conservative state troops justification to be more aggressive. It would encourage the far-right (KKK).`
        }
      }]
    },
    {
      id: 'L3Q4',
      source: '2025 NSC P1, Q2.3.3',
      topicText: 'US Fear of MPLA Victory',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.3.3',
        prompt: 'Comment on what was implied by the statement, "Kissinger feared that an MPLA victory would have destabilising effects throughout southern Africa".',
        clue: '💡 Think about the Domino Theory and the Cold War.',
        answer: 'The USA was afraid of the spread of communism in southern Africa — the Domino Theory. The USA wanted the whole of southern Africa to remain under capitalism.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The USA was afraid of the spread of Communism in southern Africa — fear of Domino Theory.\nThe USA wanted the whole of southern Africa to remain under Capitalism.',
        memoCorrection: {
          whatToCheck: 'Must link to the Domino Theory or capitalist vs communist fear.',
          commonMistake: 'Learners describe the MPLA without linking to US fears.',
          examinerHint: 'This is about the Cold War spreading to Africa.',
          memoryTrick: '🧠 "MPLA win = domino falls"',
          mergedCorrection: `🧠 Memory Trick: "MPLA win = domino falls"\n\n📋 NSC Memo Answer:\nThe USA feared the spread of Communism — Domino Theory. They wanted southern Africa to remain capitalist.`
        }
      }]
    },
    {
      id: 'L3Q5',
      source: '2022 NSC P1, Q2.5.2',
      topicText: 'Cuito Cuanavale Stalemate',
      teachTopic: 'cuito-cuanavale',
      parts: [{
        part: '2.5.2',
        prompt: 'Explain why objective observers believed that the Battle of Cuito Cuanavale ended as a tactical military stalemate.',
        clue: '💡 Think about why both sides claimed victory.',
        answer: 'Each party claimed victory and neither admitted defeat. Both sides signed a peace agreement to end the war. Both Cuba and South African forces had to withdraw from Angola.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Each of the parties claimed victory/neither side admitted defeat.\nBecause they signed a peace agreement to end the war.\nBecause both Cuba and South African forces had to withdraw from Angola.',
        memoCorrection: {
          whatToCheck: 'Must explain why it was seen as a stalemate.',
          commonMistake: 'Learners say "no one won" without evidence.',
          examinerHint: 'Both sides claimed victory. Both withdrew. Namibia got independence.',
          memoryTrick: '🧠 "Both claimed, both withdrew"',
          mergedCorrection: `🧠 Memory Trick: "Both claimed, both withdrew"\n\n📋 NSC Memo Answer:\nBoth sides claimed victory. Both signed a peace agreement. Both Cuba and South Africa withdrew from Angola.`
        }
      }]
    },
    {
      id: 'L3Q6',
      source: '2025 NSC P1, Q2.1.4',
      topicText: 'CIA Covert Support',
      teachTopic: 'cuito-cuanavale',
      parts: [{
        part: '2.1.4',
        prompt: 'Explain the limitations of this source to a researcher studying the role of the MPLA in Angola.',
        clue: '💡 Think about who wrote it and what side they represent.',
        answer: 'The book is anti-communist (anti-MPLA) and pro-capitalist. It is biased — it only shows the USA\u2019s perspective of its involvement.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The book on Kissinger is anti-communism (anti-MPLA) and pro-capitalism.\nIt is biased as it only depicts the USA\u2019s perspective of its involvement in creating stability in Angola against the destabilising role of the MPLA.\nIt promotes the ideology of capitalism by supporting capitalist FNLA and UNITA.',
        memoCorrection: {
          whatToCheck: 'Must show the source is biased toward the USA.',
          commonMistake: 'Learners just say "it\u2019s biased".',
          examinerHint: 'Written about Kissinger — pro-US perspective.',
          memoryTrick: '🧠 "Ask: whose story does it tell?"',
          mergedCorrection: `🧠 Memory Trick: "Ask: whose story does it tell?"\n\n📋 NSC Memo Answer:\nThe book is anti-communist (anti-MPLA) and pro-capitalist. It is biased — it only shows the USA perspective.`
        }
      }]
    },
    {
      id: 'L3Q7',
      source: '2024 NSC P1, Q3.5.1',
      topicText: 'Kennedy and the March',
      teachTopic: 'march-on-washington',
      parts: [{
        part: '3.5.1',
        prompt: 'Give TWO reasons in the source which suggest that President Kennedy supported the March on Washington.',
        clue: '💡 Look for what Kennedy said about the marchers.',
        answer: 'He said the marchers were exercising their right to assemble peaceably. He said they had directed the widest possible attention to a great national issue. He called for the Civil Rights Bill.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Exercising their rights to assemble peaceably.\nDirect the widest possible attention to a great national issue.\nIntensified and widespread public awareness of the need to move forward in achieving these objectives.',
        memoCorrection: {
          whatToCheck: 'Must quote TWO pieces of evidence of Kennedy\u2019s support.',
          commonMistake: 'Learners give their own opinion instead of source evidence.',
          examinerHint: 'Look for Kennedy praising the marchers.',
          memoryTrick: '🧠 "Kennedy: peaceful, purposeful"',
          mergedCorrection: `🧠 Memory Trick: "Kennedy: peaceful, purposeful"\n\n📋 NSC Memo Answer:\nKennedy said the marchers were exercising their rights to assemble peaceably. They directed attention to a great national issue.`
        }
      }]
    },

    // ---------------- P2 (NEW) ----------------
    {
      id: 'L3P2Q1',
      source: '2025 NSC P2, Q1.5.2',
      topicText: 'COSATU House Raid',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.5.2',
        prompt: 'Using the information in the source and your own knowledge, explain why the demolition of COSATU House by the Security Branch was described as "unprecedented and unparalleled".',
        clue: '💡 Think about the scale of destruction.',
        answer: 'Such brutal force by the Riot Unit had never been seen in South Africa. Everything that was in and out of the building was destroyed. The police wanted to shut down the federation and its activities.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Such brutal force by the Riot Unit had never been seen in South Africa.\nEverything that was in and out of the building was destroyed.\nThe police wanted to shut down/eliminate the federation and its activities/destroy COSATU.\nThe behaviour of the police was reckless, immoral, criminal, unethical and unjustified.',
        memoCorrection: {
          whatToCheck: 'Must explain why it was unprecedented — scale + target.',
          commonMistake: 'Learners just say "it was bad".',
          examinerHint: 'Scale + targeting a union HQ = unprecedented.',
          memoryTrick: '🧠 "Never seen before = unprecedented"',
          mergedCorrection: `🧠 Memory Trick: "Never seen before = unprecedented"\n\n📋 NSC Memo Answer:\nThe brutal force was unprecedented in SA. Everything was destroyed. Police aimed to shut down COSATU.`
        }
      }]
    },
    {
      id: 'L3P2Q2',
      source: '2024 NSC P2, Q2.3.3',
      topicText: 'Spiritual Repatriation',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.3.3',
        prompt: 'Comment on whether you think the spiritual repatriation of Sizwe Kondile could have brought closure to his family for the lack of his burial.',
        clue: '💡 Think about what closure means when there is no body.',
        answer: 'YES — the spiritual repatriation created an opportunity for family and friends to bury his spiritual remains. They came to terms with their loss. NO — there were no remains to bury. It was only symbolic, occurring 31 years later.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'YES:\nThe spiritual repatriation created an opportunity for family and friends for the burial of his spiritual remains.\nThey came to terms with their loss and were able to find closure 31 years later.\nThe spiritual repatriation created an opportunity to heal and find peace.\n\nNO:\nThere were no remains to bury.\nIt was only ceremonial and occurred 31 years later.\nIt was only symbolic and not a proper burial.\nIt opened old wounds.',
        memoCorrection: {
          whatToCheck: 'Must take a stance (YES or NO) with justification.',
          commonMistake: 'Learners do not take a stance.',
          examinerHint: 'YES = symbolic closure. NO = no body, no real burial.',
          memoryTrick: '🧠 "Symbolic = closure or wound"',
          mergedCorrection: `🧠 Memory Trick: "Symbolic = closure or wound"\n\n📋 NSC Memo Answer:\nYES: family found symbolic closure. NO: no body was buried — only ceremony, 31 years later.`
        }
      }]
    },
    {
      id: 'L3P2Q3',
      source: '2024 NSC P2, Q1.2.1',
      topicText: 'Civic Poster Purpose',
      teachTopic: 'p2-rent-boycotts',
      parts: [{
        part: '1.2.1',
        prompt: 'Why do you think this poster was created?',
        clue: '💡 Think about what the poster was advertising.',
        answer: 'To invite/mobilise the residents of Kagiso and Munsieville to a community meeting to protest against apartheid government structures. To highlight the important speakers/leaders and the topics they would be addressing.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'To invite/mobilise the residents of Kagiso and Munsieville to a community meeting to protest against apartheid government structures/to conscientise/inform the residents.\nTo communicate the purpose of the meeting — the lack of basic services.\nTo highlight the important speakers/leaders and the topics they would be addressing.',
        memoCorrection: {
          whatToCheck: 'Must explain the poster\u2019s purpose — mobilising residents.',
          commonMistake: 'Learners describe the poster without purpose.',
          examinerHint: 'Purpose = mobilise + inform.',
          memoryTrick: '🧠 "Poster = mobilise + inform"',
          mergedCorrection: `🧠 Memory Trick: "Poster = mobilise + inform"\n\n📋 NSC Memo Answer:\nTo invite/mobilise residents to a community meeting against apartheid government structures. To highlight speakers and topics.`
        }
      }]
    },
    {
      id: 'L3P2Q4',
      source: '2023 NSC P2, Q1.2.3',
      topicText: 'COSATU Poster Limitations',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.2.3',
        prompt: 'Comment on the limitations of this source to a researcher studying COSATU\u2019s response to the Labour Relations Amendment Act.',
        clue: '💡 Think about who designed the poster and why.',
        answer: 'The source is limited because it was designed by a COSATU media worker who was fiercely opposed to the government. It caters only to COSATU\u2019s perspective. It used emotive language.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'It was designed by a COSATU media worker (Patrick Cockayne) who was fiercely opposed to the government and its legislations.\nIt caters only for the perspective of COSATU/one-sided perspective.\nIt is against the government\u2019s introduction of the Labour Relations Amendment Act to restrict trade unions.\nIt used emotive language, NO! NO! to influence mobilisation against the legislation.',
        memoCorrection: {
          whatToCheck: 'Must show bias or one-sidedness.',
          commonMistake: 'Learners say "it\u2019s old" instead of showing bias.',
          examinerHint: 'Who designed it? What side were they on?',
          memoryTrick: '🧠 "Ask: who made it and why?"',
          mergedCorrection: `🧠 Memory Trick: "Ask: who made it and why?"\n\n📋 NSC Memo Answer:\nDesigned by a COSATU worker opposed to the government — one-sided. Emotive language used.`
        }
      }]
    },
    {
      id: 'L3P2Q5',
      source: '2025 NSC P2, Q1.4.4',
      topicText: 'COSATU Clash Limitation',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.4.4',
        prompt: 'Comment on the limitations of this source to a historian researching the clash between COSATU and the East Rand Riot Squad in March 1987.',
        clue: '💡 Think about whose perspective it gives.',
        answer: 'It is only a perspective of a member of the East Rand Riot Unit. It is one-sided/biased against the strikers. The language used is exaggerated.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'It is only a perspective of a member of the East Rand Riot Unit.\nIt is one-sided/biased/propaganda against the strikers.\nIt is a version from a young inexperienced recruit.\nThe language used is exaggerated e.g. the thunder of political jingles, the mob in hand-to-hand fighting, there was blood all over me.\nThe source is a memoir and some of the information might have been forgotten/distorted/selected before publication.',
        memoCorrection: {
          whatToCheck: 'Must show one-sidedness or bias.',
          commonMistake: 'Learners say "it\u2019s not reliable" without saying why.',
          examinerHint: 'Whose perspective? What language?',
          memoryTrick: '🧠 "One side + exaggeration = limited"',
          mergedCorrection: `🧠 Memory Trick: "One side + exaggeration = limited"\n\n📋 NSC Memo Answer:\nOnly the perspective of an East Rand Riot Unit member. One-sided. Exaggerated language. Memoir — selected memory.`
        }
      }]
    },
    {
      id: 'L3P2Q6',
      source: '2025 NSC P2, Q2.2.5',
      topicText: 'Farisani Testimony Reliability',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.2.5',
        prompt: 'Why would a historian find the source reliable when researching how the TRC\u2019s Human Rights Violation Committee dealt with the violations against Reverend Farisani?',
        clue: '💡 Think about who gave the testimony and where.',
        answer: 'The testimony contains first-hand information from Farisani regarding how he was tortured during detention and interrogation. It was published in the TRC Final Report.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The testimony contains first-hand information from Farisani regarding how he was tortured during his detention and interrogation.\nIt is from a testimony that Reverend Farisani presented to the TRC Human Rights Violation Committee hearings held on 4 October 1996 in Venda.\nThe testimony is published in the TRC Final Report.\nHis testimony regarding torture can be corroborated with other sources, e.g. Sources 2A and 2C.',
        memoCorrection: {
          whatToCheck: 'Must show first-hand + official source.',
          commonMistake: 'Learners just say "it\u2019s true".',
          examinerHint: 'First-hand + published in TRC report + corroborated.',
          memoryTrick: '🧠 "First-hand + official + corroborated"',
          mergedCorrection: `🧠 Memory Trick: "First-hand + official + corroborated"\n\n📋 NSC Memo Answer:\nFirst-hand testimony by Farisani. Published in the TRC Final Report. Can be corroborated by other sources.`
        }
      }]
    },
    {
      id: 'L3P2Q7',
      source: '2024 NSC P2, Q2.4.4',
      topicText: 'Erasmus Source Reliability',
      teachTopic: 'p2-trc-case-studies',
      parts: [{
        part: '2.4.4',
        prompt: 'Why would a historian regard this source as reliable when researching the accountability of the National Party leadership to the TRC processes?',
        clue: '💡 Think about who Erasmus was and what he knew.',
        answer: 'He was an eyewitness who served in the Security Branch of the South African Police. He had inside information about the National Party\u2019s activities. His account can be corroborated with Sources 2B and 2C.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The author, Paul Erasmus was an eyewitness who served in the Security Branch of the South African Police.\nIt is taken from Paul Erasmus\u2019s confessions as contained in his biography.\nPaul Erasmus had inside information of the activities of the National Party.\nHe gave an account of how foot soldiers felt about being left on their own by the National Party leadership.\nThe source can be corroborated by Source 2B and Source 2C.',
        memoCorrection: {
          whatToCheck: 'Must show eyewitness + insider + corroborated.',
          commonMistake: 'Learners just say "it\u2019s a biography".',
          examinerHint: 'Eyewitness + insider + corroboration.',
          memoryTrick: '🧠 "Eyewitness + insider"',
          mergedCorrection: `🧠 Memory Trick: "Eyewitness + insider"\n\n📋 NSC Memo Answer:\nErasmus was an eyewitness in the Security Branch. Insider information. Corroborated by other sources.`
        }
      }]
    },
    {
      id: 'L3P2Q8',
      source: '2023 NSC P2, Q3.2.3',
      topicText: 'IMF and Colonialism Comparison',
      teachTopic: 'p2-balance-of-power-africa',
      parts: [{
        part: '3.2.3',
        prompt: 'What do you think is implied by the statement, "... not since the days of colonialism have external forces been so powerfully focused to shape Africa\u2019s economic structure", regarding the influence of the IMF and the World Bank?',
        clue: '💡 Think about what colonialism did to Africa.',
        answer: 'The IMF and World Bank are like colonial powers — exploiting Africa through economic policies just as colonial powers did.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'IMF and World Bank are like colonial powers.\nThe IMF and World Bank are exploiting Africa through economic policies just like colonial powers did.\nThe IMF and World Bank are using structural adjustment policies to benefit from African economies.',
        memoCorrection: {
          whatToCheck: 'Must link IMF/WB to colonialism.',
          commonMistake: 'Learners just say "they have influence".',
          examinerHint: 'IMF/WB = new colonial powers.',
          memoryTrick: '🧠 "IMF = new empire"',
          mergedCorrection: `🧠 Memory Trick: "IMF = new empire"\n\n📋 NSC Memo Answer:\nThe IMF and World Bank act like colonial powers — shaping Africa\u2019s economy for their benefit.`
        }
      }]
    },
    {
      id: 'L3P2Q9',
      source: '2025 NSC P2, Q3.4.4',
      topicText: 'Trump on BRICS — Source Usefulness',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.4.4',
        prompt: 'Comment on the usefulness of this source to a researcher studying how Trump felt threatened by the expansion of BRICS+ countries.',
        clue: '💡 Think about who said it and when.',
        answer: 'USEFUL because it is a speech by Trump at a campaign rally when he felt threatened. It gives Trump\u2019s perspective. It was delivered soon after six new members joined BRICS.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'It is part of a speech delivered by Trump in a campaign rally when he felt threatened by BRICS expansion — gave insight into Trump\u2019s perspective.\nTrump gave a speech as the president-elect of the USA and the leading figure of the Global North, who was worried about the growth of the Global South.\nTrump addressed the rally soon after six new members joined BRICS.\nIt highlights how Trump was concerned about de-dollarisation by BRICS+.',
        memoCorrection: {
          whatToCheck: 'Must show why the source is useful for this angle.',
          commonMistake: 'Learners just say "he was worried".',
          examinerHint: 'Who, when, what context.',
          memoryTrick: '🧠 "Who · When · Context"',
          mergedCorrection: `🧠 Memory Trick: "Who · When · Context"\n\n📋 NSC Memo Answer:\nUSEFUL — Trump\u2019s own speech. President-elect. Delivered after BRICS expansion. Shows his fear of de-dollarisation.`
        }
      }]
    },
    {
      id: 'L3P2Q10',
      source: '2024 NSC P2, Q3.2.2',
      topicText: 'Walmart Economic Coloniser',
      teachTopic: 'p2-responses-globalisation',
      parts: [{
        part: '3.2.2',
        prompt: 'Comment on the meaning of the words, "WALMART - THE ECONOMIC COLONISER!"',
        clue: '💡 Think about how Walmart was seen by unions.',
        answer: 'The merger between Walmart (USA) and Massmart (local) is regarded as a form of neo-colonialism. Walmart is seen as an outside company entering South Africa to exploit workers.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The merger between Walmart (USA) with Massmart (local) is regarded as a form of neo-colonialism by Walmart.\nWalmart is regarded as an outside company which enters South Africa to exploit workers.\nWalmart\u2019s expansion to South Africa will lead to deindustrialisation/job losses.\nWalmart\u2019s entry into South Africa as an outside company will negatively affect the local retail as well as manufacturing industries.',
        memoCorrection: {
          whatToCheck: 'Must link to colonialism/exploitation.',
          commonMistake: 'Learners just say "Walmart is big".',
          examinerHint: 'Coloniser = exploit + dominate.',
          memoryTrick: '🧠 "Coloniser = new colonial power"',
          mergedCorrection: `🧠 Memory Trick: "Coloniser = new colonial power"\n\n📋 NSC Memo Answer:\nWalmart is seen as an "economic coloniser" — an outside company exploiting South Africa, leading to deindustrialisation and job losses.`
        }
      }]
    },
    {
      id: 'L3P2Q11',
      source: '2025 NSC P2, Q3.3.2',
      topicText: 'China GDP Growth Implication',
      teachTopic: 'p2-brics',
      parts: [{
        part: '3.3.2',
        prompt: 'Using the information in the source and your own knowledge, explain the implication of the growth in China\u2019s GDP from 1995 to 2023.',
        clue: '💡 Think about what China\u2019s rise means globally.',
        answer: 'Gradual/steady rise of the GDP. Positions China as a leader in BRICS countries. Implies that China is an emerging power challenging the dominance of the USA.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Gradual/Steady rise of the GDP.\nPositions China as a leader in BRICS countries.\nImplies that China is an emerging power.\nChallenging the dominance of the USA.',
        memoCorrection: {
          whatToCheck: 'Must show China\u2019s rise as a challenge to US dominance.',
          commonMistake: 'Learners just say "China is growing".',
          examinerHint: 'China\u2019s growth = challenge to US dominance.',
          memoryTrick: '🧠 "China up = US down"',
          mergedCorrection: `🧠 Memory Trick: "China up = US down"\n\n📋 NSC Memo Answer:\nSteady rise. China becomes BRICS leader. Challenges US dominance.`
        }
      }]
    },
    {
      id: 'L3P2Q12',
      source: '2025 NSC P2, Q2.5.2',
      topicText: 'TRC Cartoon Frames',
      teachTopic: 'p2-trc-justice',
      parts: [{
        part: '2.5.2',
        prompt: 'Comment on why the information in FRAME A differs from FRAME B regarding evidence presented at the TRC hearings.',
        clue: '💡 Think about what each frame hides or reveals.',
        answer: 'Frame A refers to the security policemen\u2019s version of hiding the truth. Frame B reveals the hidden human rights violations committed by the security policemen.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'Frame A refers to the security policemen\u2019s version of hiding the truth.\nFrame B reveals the hidden human rights violations committed by the security policemen.',
        memoCorrection: {
          whatToCheck: 'Must contrast what each frame shows.',
          commonMistake: 'Learners describe only one frame.',
          examinerHint: 'Frame A = hidden truth. Frame B = revealed truth.',
          memoryTrick: '🧠 "A = hide, B = reveal"',
          mergedCorrection: `🧠 Memory Trick: "A = hide, B = reveal"\n\n📋 NSC Memo Answer:\nFrame A hides the truth. Frame B reveals hidden human rights violations.`
        }
      }]
    },
    {
      id: 'L3P2Q13',
      source: '2025 NSC P2, Q3.3.1',
      topicText: 'G7 vs BRICS GDP Shift',
      teachTopic: 'p2-new-world-order' === undefined ? 'p2-brics' : 'p2-brics',
      parts: [{
        part: '3.3.1',
        prompt: 'What message is conveyed by the graph regarding the change in (a) the G7\u2019s share of global GDP between 1995 and 2023, and (b) BRICS\u2019 share of global GDP between 1995 and 2023?',
        clue: '💡 Think about which one is rising and which is falling.',
        answer: '(a) G7 GDP noted a steady decline/shrinking influence. (b) BRICS GDP noted a steady increase between 1995 and 2023/growing influence.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: '(a) G7 GDP noted a steady decline/shrinking influence. The gap between the G7 and the developing countries was narrowing.\n(b) BRICS GDP noted a steady increase between 1995 and 2023/growing influence. BRICS economic power was improving. China and India contributed more in the economic development in the BRICS countries.',
        memoCorrection: {
          whatToCheck: 'Must show G7 falling, BRICS rising.',
          commonMistake: 'Learners describe only one line.',
          examinerHint: 'G7 down · BRICS up.',
          memoryTrick: '🧠 "G7 down, BRICS up"',
          mergedCorrection: `🧠 Memory Trick: "G7 down, BRICS up"\n\n📋 NSC Memo Answer:\nG7 shrinking. BRICS growing. China + India driving BRICS growth.`
        }
      }]
    },
    {
      id: 'L3P2Q14',
      source: '2025 NSC P2, Q3.4.3',
      topicText: 'Why BRICS Threatens US',
      teachTopic: 'p2-new-world-order' === undefined ? 'p2-brics' : 'p2-brics',
      parts: [{
        part: '3.4.3',
        prompt: 'Using the information in the source and your own knowledge, explain why "... the fact that the BRICS+ countries form 35% of the World\u2019s GDP and 45% of the world\u2019s population ..." is a concern for the USA (Trump) as the leader of the Global North.',
        clue: '💡 Think about what economic size means in geopolitics.',
        answer: 'The GDP of BRICS+ represents an emerging economic power and a threat to the economic dominance of the Global North. The large population of BRICS+ represents a large workforce that can fuel economic growth.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The GDP of BRICS+ represents an emerging economic power and a threat to the economic dominance of the Global North.\nThe powerful GDP of BRICS+ (and possible de-dollarisation) represents a possible threat to the dominance of the US dollar in international trade.\nThe substantial population of BRICS+ is a threat because the population of the Global North is generally aging and in decline in many countries.\nThe large population of BRICS+ represents a large workforce that can fuel economic growth.',
        memoCorrection: {
          whatToCheck: 'Must link size to threat.',
          commonMistake: 'Learners just restate the numbers.',
          examinerHint: 'Size = power. Power = threat.',
          memoryTrick: '🧠 "Bigger = bigger threat"',
          mergedCorrection: `🧠 Memory Trick: "Bigger = bigger threat"\n\n📋 NSC Memo Answer:\nBRICS+ GDP threatens Global North economic dominance. Large population = workforce + market that can fuel growth.`
        }
      }]
    },
    {
      id: 'L3P2Q15',
      source: '2023 NSC P2, Q3.3.2',
      topicText: 'Rich Nations Oversized',
      teachTopic: 'p2-balance-of-power-africa',
      parts: [{
        part: '3.3.2',
        prompt: 'Why do you think the cartoonist portrays "rich nations" as oversized?',
        clue: '💡 Think about what being oversized symbolises.',
        answer: 'To suggest that they are greedy, monopolise resources of poor countries, and enrich themselves with resources from poor countries.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'To suggest that:\nThey are greedy.\nMonopolise resources of poor countries.\nThey enrich themselves with resources from poor countries.\nThey have policies in place that will drain the economies of the poor to enrich themselves.',
        memoCorrection: {
          whatToCheck: 'Must show greed or exploitation.',
          commonMistake: 'Learners just say "they are big".',
          examinerHint: 'Oversized = greedy + powerful + exploiting.',
          memoryTrick: '🧠 "Big = greedy"',
          mergedCorrection: `🧠 Memory Trick: "Big = greedy"\n\n📋 NSC Memo Answer:\nRich nations are portrayed as greedy, monopolising resources of poor countries, and enriching themselves.`
        }
      }]
    },
    {
      id: 'L3P2Q16',
      source: '2023 NSC P2, Q3.4.5',
      topicText: 'Stiglitz Source Usefulness',
      teachTopic: 'p2-responses-globalisation',
      parts: [{
        part: '3.4.5',
        prompt: 'Explain the usefulness of the source to a historian studying globalisation.',
        clue: '💡 Think about who Stiglitz is and what he experienced.',
        answer: 'The author Joseph Stiglitz had experience of serving in international financial institutions of globalisation. It is first-hand information. It gives a balanced assessment of the advantages/benefits of globalisation.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'The source is USEFUL because:\nThe author Joseph Stiglitz had experience of serving in international financial institutions of globalisation.\nIt is first-hand information/direct source/testimony from experiences of Stiglitz.\nIt gives a balance assessment of the advantages/benefit of globalisation.',
        memoCorrection: {
          whatToCheck: 'Must show insider perspective or first-hand info.',
          commonMistake: 'Learners just say "it\u2019s from a person".',
          examinerHint: 'Who wrote it? What access did they have?',
          memoryTrick: '🧠 "Insider = useful"',
          mergedCorrection: `🧠 Memory Trick: "Insider = useful"\n\n📋 NSC Memo Answer:\nStiglitz served in international financial institutions — insider perspective. First-hand testimony. Balanced assessment.`
        }
      }]
    },
    {
      id: 'L3P2Q17',
      source: '2024 NSC P2, Q3.2.3',
      topicText: 'SACCAWU Poster Limitations',
      teachTopic: 'p2-responses-globalisation',
      parts: [{
        part: '3.2.3',
        prompt: 'Explain the limitations of this source for a researcher studying the impact of globalisation on South Africa.',
        clue: '💡 Think about whose view the source gives.',
        answer: 'It only highlights SACCAWU\u2019s viewpoint in rejecting Walmart\u2019s takeover of Massmart. It portrays a one-sided view. Emotive language — "ECONOMIC COLONISER" — is used.',
        marks: 4,
        acceptAnyTwo: true,
        memoFullAnswer: 'It only highlights SACCAWU\u2019s viewpoint in rejecting Walmart\u2019s takeover of Massmart.\nIt portrays a one-sided view on the impact of the merger on South African workers.\nEmotive language — ECONOMIC COLONISER — is used to paint Walmart as an aggressor.',
        memoCorrection: {
          whatToCheck: 'Must show one-sided view or emotive language.',
          commonMistake: 'Learners say "it\u2019s limited because it\u2019s a poster".',
          examinerHint: 'Whose view? What language?',
          memoryTrick: '🧠 "One side + emotion = limited"',
          mergedCorrection: `🧠 Memory Trick: "One side + emotion = limited"\n\n📋 NSC Memo Answer:\nOnly SACCAWU\u2019s view. One-sided. Emotive language — ECONOMIC COLONISER.`
        }
      }]
    },
    {
      id: 'L3P2Q18',
      source: '2023 NSC P2, Q3.2.2',
      topicText: 'Reluctant IMF Acceptance',
      teachTopic: 'p2-balance-of-power-africa',
      parts: [{
        part: '3.2.2',
        prompt: 'Using the information in the source and your own knowledge, explain why assistance from the IMF and the World Bank was reluctantly accepted by some African countries.',
        clue: '💡 Think about what strings came with the loans.',
        answer: 'They had to sign economic policies with these institutions as conditions. The policies would bind African countries until debt was paid. African countries would not have a say in the terms and conditions of the Structural Adjustment Programme.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'They had to sign economic policies with these institutions as conditions.\nThe economic policies signed with the International institutions would bind the African countries to these organisations until their debt was paid.\nThe African countries would not have a say in the terms and conditions of the Structural Adjustment Programme.\nIt would make African countries always dependent on foreign help/neo-colonialism.',
        memoCorrection: {
          whatToCheck: 'Must show the strings/conditions attached.',
          commonMistake: 'Learners say "they didn\u2019t want help" — wrong.',
          examinerHint: 'Reluctant because of conditions.',
          memoryTrick: '🧠 "Strings = reluctance"',
          mergedCorrection: `🧠 Memory Trick: "Strings = reluctance"\n\n📋 NSC Memo Answer:\nLoans came with conditions — SAPs, no say in terms, perpetual debt. Hence reluctant acceptance.`
        }
      }]
    },
  ],

  level4: [
    // ---------------- P1 (unchanged) ----------------
    {
      id: 'L4Q1',
      source: '2023 NSC P1, Q1.6',
      topicText: 'Berlin as Cold War Focal Point',
      teachTopic: 'cold-war-berlin-1948',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how Berlin became a focal point of Cold War tension between the USSR and the USA in 1948.',
        clue: '💡 Cover: why Berlin was divided, the blockade, the Western response.',
        answer: 'Berlin was deep in the Soviet zone but divided into four parts. In 1948, Stalin blockaded Western access to Berlin. The USA saw this as a violation of agreements. The West responded with the Berlin Airlift.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'Berlin was divided into four zones after WWII, but it lay deep inside the Soviet zone. In 1948, Stalin blockaded all land routes into West Berlin to force the Western powers out. The USA saw this as a clear violation of existing agreements and refused to leave. The West responded with the Berlin Airlift. Berlin became the focal point of Cold War tension.',
        memoCorrection: {
          whatToCheck: 'Must cover: division of Berlin, blockade, US response, significance.',
          commonMistake: 'Learners list facts without connecting them into a coherent paragraph.',
          examinerHint: 'Structure: Berlin divided → Stalin blockades → USA responds → Berlin symbol.',
          memoryTrick: '🧠 "Divided · Blockaded · Airlift · Symbol"',
          mergedCorrection: `🧠 Memory Trick: "Divided · Blockaded · Airlift · Symbol"\n\n📋 NSC Memo Answer:\nBerlin was divided, deep in the Soviet zone. Stalin blockaded in 1948. The West responded with the Berlin Airlift. Berlin became the focal point of Cold War tension.`
        }
      }]
    },
    {
      id: 'L4Q2',
      source: '2024 NSC P1, Q1.6',
      topicText: 'Berliners after the Wall',
      teachTopic: 'berlin-wall',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how the lives of Berliners were affected by the construction of the Berlin Wall in 1961.',
        clue: '💡 Cover: families, jobs, escape attempts.',
        answer: 'The Berlin Wall divided families overnight. Workers could no longer reach their jobs in the West. East Berliners were trapped. Some dug tunnels to smuggle family members out.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The construction of the Berlin Wall in 1961 divided families overnight. Workers lost access to their jobs in West Berlin. East Berliners were trapped behind barbed wire. Some dug tunnels to smuggle their families out. Some were killed or jailed trying to cross.',
        memoCorrection: {
          whatToCheck: 'Must cover family separation, job loss, and escape attempts.',
          commonMistake: 'Learners describe the wall without saying how it affected people.',
          examinerHint: 'Focus on people: families, workers, escapees.',
          memoryTrick: '🧠 "Families · Jobs · Tunnels · Deaths"',
          mergedCorrection: `🧠 Memory Trick: "Families · Jobs · Tunnels · Deaths"\n\n📋 NSC Memo Answer:\nBerlin Wall divided families overnight. Workers lost access to their jobs. East Berliners were trapped. Some dug tunnels. Some were killed trying to cross.`
        }
      }]
    },
    {
      id: 'L4Q3',
      source: '2023 NSC P1, Q3.6',
      topicText: 'Freedom Rides Challenges',
      teachTopic: 'civil-rights-freedom-rides',
      parts: [{
        part: '3.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining the challenges that were encountered by the civil rights protestors who participated in the Freedom Rides in the USA in the 1960s.',
        clue: '💡 Cover: violence, arrests, hospital refusal, police inaction.',
        answer: 'The Freedom Riders were attacked by mobs and their buses were firebombed. Hospitals refused to treat them. Police arrested them instead of protecting them.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The Freedom Riders were violently attacked by white mobs. Their buses were firebombed. Hospitals refused to treat the injured riders. Police arrested them instead of protecting them. Governors like Patterson refused to provide police protection.',
        memoCorrection: {
          whatToCheck: 'Must cover at least THREE distinct challenges.',
          commonMistake: 'Learners list only one challenge.',
          examinerHint: 'Think: mobs, firebombs, hospitals, police, governors.',
          memoryTrick: '🧠 "Mobs · Bombs · Hospitals · Police · Governors"',
          mergedCorrection: `🧠 Memory Trick: "Mobs · Bombs · Hospitals · Police · Governors"\n\n📋 NSC Memo Answer:\nFreedom Riders were attacked by mobs. Buses firebombed. Hospitals refused treatment. Police arrested them. Governors refused protection.`
        }
      }]
    },
    {
      id: 'L4Q4',
      source: '2023 NSC P1, Q2.6',
      topicText: 'Angolan Civil War Factors',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining the factors that led to the three nationalist movements becoming involved in the Angolan Civil War in 1975.',
        clue: '💡 Cover: Portuguese withdrawal, three rival movements, ethnic divisions, superpower involvement.',
        answer: 'Portugal withdrew without setting up a stable transition. Three nationalist movements — MPLA, FNLA, UNITA — all wanted to rule. Each represented different ethnic groups. The Cold War superpowers poured in weapons, turning a local struggle into a proxy war.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'After the overthrow of the Portuguese leader Caetano, the new leadership was prepared to end colonialism. The Portuguese failed to oversee the transition of power to the Angolans — creating a power struggle. Three nationalist movements contested the leadership race. Each represented different ethnic groups and regions. The superpowers became involved to maintain the global balance of power. Civil war broke out in 1975.',
        memoCorrection: {
          whatToCheck: 'Must cover: Portuguese withdrawal, three rival movements, ethnic divisions, superpower involvement.',
          commonMistake: 'Learners name the movements without explaining why they fought.',
          examinerHint: 'Portugal left → three movements → ethnic divisions → superpowers.',
          memoryTrick: '🧠 "Portugal left · 3 movements · ethnic · superpowers"',
          mergedCorrection: `🧠 Memory Trick: "Portugal left · 3 movements · ethnic · superpowers"\n\n📋 NSC Memo Answer:\nPortugal failed to oversee transition. Three movements contested leadership. Ethnic divisions. Superpowers poured in weapons. Civil war 1975.`
        }
      }]
    },
    {
      id: 'L4Q5',
      source: '2024 NSC P1, Q2.6',
      topicText: 'Cuito Cuanavale Impact',
      teachTopic: 'cuito-cuanavale',
      parts: [{
        part: '2.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how the defeat of the SADF at the Battle of Cuito Cuanavale in Angola led to peaceful negotiations in southern Africa in the late 1980s.',
        clue: '💡 Think about the Tripartite Accord and Namibian independence.',
        answer: 'The defeat of the SADF by Cuban troops at Cuito Cuanavale was a turning point. It forced South Africa to negotiate. The Tripartite Accord of 1988 led to Namibian independence and withdrawal of foreign troops from Angola.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The defeat of South African Defence Force (SADF) by the Cuban troops at Cuito Cuanavale was a turning point. The Tripartite Accord signed in 1988 led to Namibian and Angolan independence. The apartheid government lost control and could no longer destabilise its neighbours.',
        memoCorrection: {
          whatToCheck: 'Must cover: defeat, Tripartite Accord, Namibian independence, UN.',
          commonMistake: 'Learners only describe the battle, not its consequences.',
          examinerHint: 'Cuito Cuanavale → Tripartite Accord → Namibian independence.',
          memoryTrick: '🧠 "Defeat · Accord · Namibia free"',
          mergedCorrection: `🧠 Memory Trick: "Defeat · Accord · Namibia free"\n\n📋 NSC Memo Answer:\nDefeat of SADF at Cuito Cuanavale was a turning point. The Tripartite Accord led to Namibian independence. The apartheid government could no longer destabilise its neighbours.`
        }
      }]
    },
    {
      id: 'L4Q6',
      source: '2022 NSC P1, Q3.6',
      topicText: 'Selma March Challenges',
      teachTopic: 'civil-rights-selma',
      parts: [{
        part: '3.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining the challenges that were encountered by civil rights protestors who participated in the Selma to Montgomery marches in March 1965.',
        clue: '💡 Cover: police brutality, Bloody Sunday, bans, insults.',
        answer: 'Marchers faced police brutality — tear gas, clubs, mounted police. On Bloody Sunday, 600 peaceful marchers were attacked. The courts issued orders banning the march. Despite everything, a third march reached Montgomery.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'Marchers faced police brutality during the protest. Marchers were attacked with clubs, tear gas, beaten and chased by mounted police — Bloody Sunday incident. The police used derogatory language at the non-violent protestors. The courts issued orders banning the peaceful protest. Despite the challenges, the third march reached Montgomery.',
        memoCorrection: {
          whatToCheck: 'Must cover at least THREE distinct challenges.',
          commonMistake: 'Learners only describe Bloody Sunday.',
          examinerHint: 'Think: police, courts, insults, second march compromise.',
          memoryTrick: '🧠 "Clubs · Gas · Courts · Insults"',
          mergedCorrection: `🧠 Memory Trick: "Clubs · Gas · Courts · Insults"\n\n📋 NSC Memo Answer:\nMarchers faced police brutality. Bloody Sunday — tear gas, clubs, mounted police. Courts banned the march. Derogatory language used. Despite everything, the third march reached Montgomery.`
        }
      }]
    },
    {
      id: 'L4Q7',
      source: '2025 NSC P1, Q1.6',
      topicText: 'Containment & Cold War Tensions',
      teachTopic: 'cold-war-containment',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how the policy of containment contributed to Cold War tensions between the USA and the USSR in 1947.',
        clue: '💡 Cover: Marshall Plan, Truman Doctrine, Molotov Plan, COMECON.',
        answer: 'The USA adopted containment to stop the spread of communism. The Truman Doctrine gave military aid to Greece and Turkey. The Marshall Plan gave economic aid to Western Europe. The USSR created the Molotov Plan and COMECON. Europe split into two camps.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The USA adopted containment to stop the spread of communism. The Truman Doctrine gave military aid to countries threatened by communism. The Marshall Plan gave economic aid to rebuild Western Europe. The USSR saw the Marshall Plan as a threat and created the Molotov Plan and COMECON. Europe split into two economic and ideological camps. Cold War tensions intensified.',
        memoCorrection: {
          whatToCheck: 'Must cover: containment, Truman, Marshall, Soviet response.',
          commonMistake: 'Learners describe only the US side.',
          examinerHint: 'Marshall → Molotov. Action → reaction.',
          memoryTrick: '🧠 "Truman + Marshall → Molotov + COMECON"',
          mergedCorrection: `🧠 Memory Trick: "Truman + Marshall → Molotov + COMECON"\n\n📋 NSC Memo Answer:\nUSA adopted containment. Truman Doctrine gave military aid. Marshall Plan gave economic aid. USSR created Molotov Plan and COMECON. Europe split into two camps.`
        }
      }]
    },
    {
      id: 'L4Q8',
      source: '2021 NSC P1, Q2.6',
      topicText: 'Foreign Powers in Angola',
      teachTopic: 'independent-africa-angola',
      parts: [{
        part: '2.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining why foreign powers became involved in the Angolan Civil War between 1974 and 1976.',
        clue: '💡 Cover: USSR/Cuba on MPLA side, USA/SA on FNLA/UNITA side, Cold War rivalry.',
        answer: 'The USSR and Cuba backed the MPLA — socialist. The USA and South Africa backed FNLA and UNITA — capitalist. The USA feared the Domino Theory. South Africa feared communist expansion near its borders.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The USSR and Cuba backed the MPLA (socialist) to spread communism. The USA and South Africa backed the FNLA and UNITA (capitalist) to contain communism. The USA feared the Domino Theory. South Africa wanted to prevent communist expansion near its borders. The Cold War turned Angola into a proxy battlefield.',
        memoCorrection: {
          whatToCheck: 'Must cover: USSR/Cuba side, USA/SA side, Cold War context.',
          commonMistake: 'Learners only describe one side.',
          examinerHint: 'USSR+Cuba vs USA+SA. Capitalism vs communism.',
          memoryTrick: '🧠 "USSR+Cuba vs USA+SA"',
          mergedCorrection: `🧠 Memory Trick: "USSR+Cuba vs USA+SA"\n\n📋 NSC Memo Answer:\nUSSR and Cuba backed MPLA. USA and South Africa backed FNLA and UNITA. USA feared Domino Theory. South Africa feared communist expansion. Angola became a Cold War proxy battlefield.`
        }
      }]
    },

    // ---------------- P2 (NEW) ----------------
    {
      id: 'L4P2Q1',
      source: '2025 NSC P2, Q1.6',
      topicText: 'COSATU Mass Mobilisation',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining what the different responses were to the attempts of COSATU to mobilise South African workers in the 1980s.',
        clue: '💡 Cover: workers joining, government repression, union resistance.',
        answer: 'COSATU grew fast — over 33 unions, 500,000 members. The government tried to restrict it with the Labour Relations Amendment Act. COSATU organised mass action, strikes, and special congresses. Police raided COSATU House and demolished it.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'More than 33 workers\u2019 unions decided to affiliate to COSATU and increased the membership of the federation. The ANC and UDF supporters aligned themselves with COSATU. Unfair new labour laws motivated domestic and farm workers to join COSATU. COSATU\u2019s "living wage" campaign was clamped down by the East Rand Riot Unit. The police raided COSATU House. The Special Branch demolished COSATU House and destroyed office equipment and records. The Special Branch set COSATU House on fire.',
        memoCorrection: {
          whatToCheck: 'Must cover: workers joining, government repression, union resistance.',
          commonMistake: 'Learners only describe one side.',
          examinerHint: 'Two sides: workers+COSATU vs government.',
          memoryTrick: '🧠 "Workers join · Police raid · COSATU fights"',
          mergedCorrection: `🧠 Memory Trick: "Workers join · Police raid · COSATU fights"\n\n📋 NSC Memo Answer:\n33+ unions joined COSATU. Government restricted via LRA Act. Police raided COSATU House. COSATU organised mass action and strikes.`
        }
      }]
    },
    {
      id: 'L4P2Q2',
      source: '2023 NSC P2, Q1.6',
      topicText: 'COSATU Response to Labour Reforms',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how COSATU responded to the apartheid government\u2019s labour reforms in the 1980s.',
        clue: '💡 Cover: launching, campaigns, resistance, mass action.',
        answer: 'COSATU launched in 1985 as a labour movement to challenge apartheid labour reforms. It called for a national minimum wage. It organised mass action and posters. It called on the international community to impose sanctions.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'COSATU launched on 5 December 1985 as a labour movement to challenge apartheid labour reforms. COSATU President Elijah Barayi committed it to fill the political gap created by the banning of the ANC. COSATU would use its huge membership from NUM and FOSATU to build a formidable force of trade unionism against the apartheid government. COSATU called for a national minimum wage. COSATU used posters to communicate and conscientise its members. Called on the international community to impose sanctions and disinvestment. COSATU organised a Special Congress to react to the threat posed by the government\u2019s restrictions.',
        memoCorrection: {
          whatToCheck: 'Must cover at least FOUR distinct COSATU responses.',
          commonMistake: 'Learners only describe COSATU\u2019s founding.',
          examinerHint: 'Filling ANC\u2019s gap + workers\u2019 demands + sanctions + Special Congress.',
          memoryTrick: '🧠 "Fill gap · Wages · Sanctions · Congress"',
          mergedCorrection: `🧠 Memory Trick: "Fill gap · Wages · Sanctions · Congress"\n\n📋 NSC Memo Answer:\nCOSATU launched 1985. Filled ANC\u2019s political gap. Called for minimum wage. Organised mass action. Called for sanctions. Held Special Congress.`
        }
      }]
    },
    {
      id: 'L4P2Q3',
      source: '2024 NSC P2, Q1.6',
      topicText: 'Civic Organisations in the 1980s',
      teachTopic: 'p2-rent-boycotts',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how civic organisations mobilised local communities to resist the apartheid government\u2019s structures in South Africa in the 1980s.',
        clue: '💡 Cover: local issues, rent boycotts, police response, national unity.',
        answer: 'Civic organisations promoted the interests of people at local level. They addressed bread-and-butter issues — housing, toilets, crime. They organised rent boycotts. They worked in unison across townships and eventually united under SANCO in 1992.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'Civic organisations promoted the interests of people at local level. They took responsibility for local communities and addressed issues of self-organisation like blocks, yards and street committees. They intensified protests for various basic needs such as housing, the bucket-toilet system. They worked in unison to run massive national campaigns. They organised the Thembisa rent boycott. They received support from other political organisations like AZAPO. In reaction to police brutality, protestors adopted various forms of demonstrations. The civic organisations ultimately united under the banner of South African National Civic Organisation (SANCO) in 1992.',
        memoCorrection: {
          whatToCheck: 'Must cover: local issues + rent boycotts + national unity.',
          commonMistake: 'Learners only describe one civic.',
          examinerHint: 'Local → national → SANCO.',
          memoryTrick: '🧠 "Local issues → SANCO"',
          mergedCorrection: `🧠 Memory Trick: "Local issues → SANCO"\n\n📋 NSC Memo Answer:\nCivics addressed local issues — housing, toilets, crime. Organised rent boycotts. Worked in unison across townships. United as SANCO in 1992.`
        }
      }]
    },
    {
      id: 'L4P2Q4',
      source: '2023 NSC P2, Q2.6',
      topicText: 'TRC Exposed Leaders',
      teachTopic: 'p2-trc-establishment',
      parts: [{
        part: '2.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how the Truth and Reconciliation Commission (TRC) exposed leaders of the apartheid government for gross violations of human rights committed between 1960 and 1994.',
        clue: '💡 Cover: TRC Act, exposure, amnesty, some got away.',
        answer: 'The TRC Act of 1995 laid the basis for the TRC. It exposed the NP government\u2019s policy of killing opponents — torture, abduction, arson, sabotage. FW de Klerk was held accountable for third force activities. Adriaan Vlok was the only "big fish" caught.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'The Promotion of National Unity and Reconciliation Act of 1995 laid the basis for the TRC. The TRC provided the NP an opportunity to disclose human rights violations. The TRC provided a platform for victims and perpetrators to tell their stories. TRC verdict declared that Botha\u2019s government adopted a policy of killing opponents. FW de Klerk was held accountable for criminal misconduct/third force by the TRC. Van der Merwe, Commissioner of Police, was held accountable for the bombing of Khotso House. Adriaan Vlok, Minister of Police, was the only big fish caught. The apartheid government foot soldiers admitted their role in the atrocities.',
        memoCorrection: {
          whatToCheck: 'Must cover: TRC Act + specific exposures.',
          commonMistake: 'Learners only describe the TRC\u2019s purpose.',
          examinerHint: 'Act 1995 → hearings → exposure of leaders.',
          memoryTrick: '🧠 "Act · Exposure · Amnesty"',
          mergedCorrection: `🧠 Memory Trick: "Act · Exposure · Amnesty"\n\n📋 NSC Memo Answer:\nTRC Act 1995. Exposed NP policy of killing opponents. FW de Klerk held accountable. Van der Merwe for Khotso House. Adriaan Vlok caught.`
        }
      }]
    },
    {
      id: 'L4P2Q5',
      source: '2025 NSC P2, Q2.6',
      topicText: 'TRC Rejected Amnesty for Farisani Torture',
      teachTopic: 'p2-trc-amnesty',
      parts: [{
        part: '2.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining why the TRC rejected the amnesty applications of the perpetrators who tortured Reverend Tshenuwani Farisani.',
        clue: '💡 Cover: Farisani\u2019s testimony, no full disclosure, inconsistency.',
        answer: 'Farisani testified at the TRC about his torture. The policemen used vicious methods to compel false confessions. The Amnesty Committee was not satisfied the three applicants made full disclosure. So amnesty was refused.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'Reverend Farisani presented his testimony at the TRC regarding his torture. Farisani\u2019s testimony explained how the policemen\u2019s brutal interrogation was unrelated to any political motive. The policemen used vicious interrogation methods to compel Farisani into a false confession. The Committee was not satisfied that the three applicants had made a full disclosure. The three applicants played down their role and involvement in the assault and torture. Testimonies of victims were consistent and showed brutal torture methods used. The TRC did not grant amnesty to the perpetrators.',
        memoCorrection: {
          whatToCheck: 'Must cover: testimony + no full disclosure + refusal.',
          commonMistake: 'Learners only say "they lied".',
          examinerHint: 'Full disclosure was required — they did not make it.',
          memoryTrick: '🧠 "No full truth = no amnesty"',
          mergedCorrection: `🧠 Memory Trick: "No full truth = no amnesty"\n\n📋 NSC Memo Answer:\nFarisani testified. Policemen used vicious methods. Committee found no full disclosure. Amnesty refused.`
        }
      }]
    },
    {
      id: 'L4P2Q6',
      source: '2025 NSC P2, Q1.6',
      topicText: 'COSATU Mobilised Workers',
      teachTopic: 'p2-trade-union-movement',
      parts: [{
        part: '1.6',
        prompt: 'Write a paragraph of about EIGHT lines (80 words) explaining how COSATU mobilised South African workers in the 1980s.',
        clue: '💡 Cover: uniting unions, living wage, national strikes, government response.',
        answer: 'COSATU united 33 unions and 500,000 workers. It launched the "living wage" campaign in 1987. It used May Day rallies, posters, and strikes. The government and police responded with violence — the East Rand Riot Squad, the raid on COSATU House.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: 'COSATU was the largest federation of black worker unions in South Africa in November 1985. It allied itself to the ANC. It held a rally on 1 May 1986 — International Workers\u2019 Day. It conducted the "living wage" campaign in March 1987 through strikes. It used clenched fists and banners as symbols. The East Rand Riot Unit confronted strikers. The police raided COSATU House on 23 April 1987. The Special Branch demolished COSATU House.',
        memoCorrection: {
          whatToCheck: 'Must cover at least FOUR mobilisation methods.',
          commonMistake: 'Learners only describe one event.',
          examinerHint: 'Unions + May Day + living wage + strikes + police response.',
          memoryTrick: '🧠 "Unite · Rally · Strike · Repression"',
          mergedCorrection: `🧠 Memory Trick: "Unite · Rally · Strike · Repression"\n\n📋 NSC Memo Answer:\nCOSATU united 33 unions, 500,000 workers. May Day rally 1986. Living wage campaign 1987. Strikers clashed with East Rand Riot Unit. COSATU House raided and demolished.`
        }
      }]
    },
  ],

  level5: [
    // ---------------- P1 (unchanged) ----------------
    {
      id: 'L5Q1',
      source: '2023 NSC P1, Q4',
      topicText: 'Vietnam — Why the USA Lost',
      teachTopic: 'cold-war-vietnam',
      essayBlueprint: {
        stancePrompt: 'Do you agree that the Vietcong tactics made USA strategies ineffective in Vietnam?',
        stanceOptions: ['AGREE', 'DISAGREE'],
        defaultStance: 'AGREE',
        introBlueprint: {
          hook: 'The USA had the most powerful army in the world. Vietnam had farmers with sandals.',
          context: 'Vietnam was split — communist North vs capitalist South. The USA entered to contain communism.',
          loa: 'The Vietcong guerrilla tactics made USA conventional strategies ineffective and forced American withdrawal in 1973.',
        },
        bodyPoints: [
          { title: 'Guerrilla tactics vs conventional army', evidence: ['Vietcong used hit-and-run, booby traps, sabotage', 'USA fought a conventional war like WWII', 'The USA could not tell fighters from villagers'] },
          { title: 'Tunnels and jungle', evidence: ['Vietcong hid in tunnels too small for US soldiers', 'Jungle neutralised US airpower and tanks', 'Search and Destroy missions failed'] },
          { title: 'Tet Offensive (1968)', evidence: ['Vietcong attacked 100 US-controlled cities at once', 'Shocked the US public', 'Public opinion turned against the war'] },
          { title: 'My Lai Massacre', evidence: ['US soldiers killed civilians at My Lai (March 1968)', 'World opinion turned against the USA', 'Increased support for Vietcong'] },
          { title: 'US withdrawal (1969–1975)', evidence: ['Nixon introduced Vietnamisation', 'Paris Peace Accords signed 27 January 1973', 'North Vietnam took Saigon 1975'] },
        ],
        modelConclusion: 'The Vietcong\u2019s guerrilla tactics — tunnels, hit-and-run, jungle cover — made US conventional strategies ineffective. Tet and My Lai broke American public support and forced withdrawal in 1973. Vietnam was united under communism in 1975.',
      },
      parts: [{
        part: 'Q4',
        prompt: 'The tactics used by the Vietcong were successful in making USA strategies ineffective during the Vietnam War between 1963 and 1975. Critically discuss this statement.',
        clue: '💡 Cover: guerrilla tactics, tunnels, Tet Offensive, My Lai, public opinion.',
        answer: 'Agree — guerrilla warfare beat US technology. Tunnels, hit-and-run, Tet Offensive, My Lai, public backlash, withdrawal 1973.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'The Vietcong used guerrilla tactics that the American army was not designed to fight. They hid in tunnels too small for American soldiers. They used hit-and-run attacks, booby traps, and sabotage. The Tet Offensive (1968) saw surprise attacks on 100 US-controlled cities. The My Lai Massacre turned public opinion against the war. The USA was forced to withdraw in 1973.',
        memoCorrection: {
          whatToCheck: 'Must show HOW Vietcong tactics made US strategies fail.',
          commonMistake: 'Learners list US strategies without saying why they failed.',
          examinerHint: 'Guerrilla warfare beats conventional warfare. Line of argument matters.',
          memoryTrick: '🧠 "Guerrilla beats technology"',
          mergedCorrection: `🧠 Memory Trick: "Guerrilla beats technology"\n\n📋 NSC Memo Answer:\nVietcong guerrilla tactics — tunnels, hit-and-run, Tet Offensive, My Lai — made US conventional strategies ineffective. USA withdrew in 1973.`
        }
      }]
    },
    {
      id: 'L5Q2',
      source: '2024 NSC P1, Q6',
      topicText: 'Black Power Militancy',
      teachTopic: 'black-power-movement',
      essayBlueprint: {
        stancePrompt: 'Critically discuss whether the Black Power Movement depended on violent, radical and militant strategies.',
        stanceOptions: ['MOSTLY MILITANT', 'MILITANT AND SELF-EMPOWERING'],
        defaultStance: 'MILITANT AND SELF-EMPOWERING',
        introBlueprint: {
          hook: 'By 1965, many African Americans were tired of waiting.',
          context: 'Black Power emerged from frustration with slow progress, police brutality, and inequality.',
          loa: 'The Black Power Movement was both militant (self-defence) and self-empowering (community programmes, Black pride).',
        },
        bodyPoints: [
          { title: 'Malcolm X — armed self-defence', evidence: ['Preached "By any means necessary"', 'Argued bloodshed was necessary for revolution', 'Promoted Black nationalism'] },
          { title: 'Stokely Carmichael — rejection of non-violence', evidence: ['Said non-violence had failed', 'Advocated separate Black institutions', 'Called for Black control of Black communities'] },
          { title: 'Black Panther Party', evidence: ['Founded 1966 by Seale and Newton', 'Patrolled streets to monitor police', 'Ten Point Plan demanded rights'] },
          { title: 'Black Panther community programmes', evidence: ['Feeding schemes for Black children', 'Literacy programmes', 'Childcare and medical programmes'] },
          { title: 'Black pride and identity', evidence: ['"Black is beautiful"', 'Afro hairstyles, African names, African clothing', 'A generation of self-respect'] },
        ],
        modelConclusion: 'The Black Power Movement was both militant and self-empowering. The Panthers patrolled the streets AND fed the children. Malcolm X preached self-defence AND self-discipline. Black Power changed what it meant to be Black in America.',
      },
      parts: [{
        part: 'Q6',
        prompt: 'The Black Power Movement adopted a militant approach to challenge discrimination against African Americans in the USA in the 1960s. Critically discuss this statement in the context of the Black Power philosophy.',
        clue: '💡 Cover: Malcolm X, Carmichael, Black Panthers, community programmes.',
        answer: 'The Black Power Movement was both militant (self-defence, BPP patrols) and self-empowering (feeding schemes, literacy, Black pride).',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'The Black Power Movement did adopt militant strategies. Malcolm X preached armed self-defence. Carmichael rejected non-violence. The Black Panthers patrolled the streets. But the movement was also community-based — running feeding schemes, literacy programmes, and childcare. Black Power was both militant and self-empowering.',
        memoCorrection: {
          whatToCheck: 'Must cover militant AND community-building aspects.',
          commonMistake: 'Learners only describe the militancy.',
          examinerHint: 'Black Power = self-defence PLUS self-empowerment.',
          memoryTrick: '🧠 "Fist up + food out"',
          mergedCorrection: `🧠 Memory Trick: "Fist up + food out"\n\n📋 NSC Memo Answer:\nBlack Power was both militant (Malcolm X, BPP patrols) and self-empowering (feeding schemes, literacy, pride).`
        }
      }]
    },
    {
      id: 'L5Q3',
      source: '2025 NSC P1, Q5',
      topicText: 'Mobutu\u2019s Congo — Dismal Failure?',
      teachTopic: 'independent-africa-congo',
      essayBlueprint: {
        stancePrompt: 'Critically discuss whether Mobutu\u2019s political, economic, social, and cultural policies were a dismal failure.',
        stanceOptions: ['AGREE', 'MOSTLY FAILURE, SOME CULTURAL SUCCESS'],
        defaultStance: 'MOSTLY FAILURE, SOME CULTURAL SUCCESS',
        introBlueprint: {
          hook: 'Congo was one of the richest countries in Africa. By the 1990s, its people were among the poorest.',
          context: 'Mobutu seized power in 1965. He promised stability. He delivered 30 years of dictatorship.',
          loa: 'Mobutu\u2019s political and economic policies were a disastrous failure. His cultural policies (Authenticité) had some success, but overall his rule destroyed the country.',
        },
        bodyPoints: [
          { title: 'Political failure — one-party state', evidence: ['Banned opposition parties', 'Made himself "president for life"', 'Created a personality cult — Mobutuism'] },
          { title: 'Economic failure — Zaireanisation', evidence: ['Gave foreign businesses to untrained allies', 'Businesses collapsed — economy crashed', 'Nepotism and kleptocracy'] },
          { title: 'Economic failure — poverty and collapse', evidence: ['Infrastructure declined', 'High inflation destroyed savings', 'Congo became dependent on World Bank aid'] },
          { title: 'Cultural success — Authenticité', evidence: ['Renamed the country Zaire', 'Promoted African dress, music, art', 'Encouraged African hairstyles and names'] },
          { title: 'Social failure — education and poverty', evidence: ['Education favoured the urban elite', 'Enrolment rose then declined', 'Ordinary Congolese stayed poor'] },
        ],
        modelConclusion: 'Mobutu\u2019s political and economic policies were a disaster. He stole the country\u2019s wealth and ruled as a dictator for decades. His cultural policies had some success — but that cannot outweigh the poverty and suffering he created.',
      },
      parts: [{
        part: 'Q5',
        prompt: 'The political, economic, social and cultural policies introduced by Mobutu Sese Seko after gaining independence in the 1960s were a dismal failure. Critically discuss this statement.',
        clue: '💡 Cover: one-party state, Zaireanisation, kleptocracy, Authenticité.',
        answer: 'Mostly agree — political and economic policies were failures. Cultural policies (Authenticité) had some success.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mobutu\u2019s political policies were failures — one-party state, president for life, personality cult. His economic policies destroyed the country — Zaireanisation gave foreign businesses to untrained allies, the economy collapsed, poverty increased. His cultural policies had some success — African music, art, and dress were promoted. But overall, his rule was a disaster for ordinary Congolese.',
        memoCorrection: {
          whatToCheck: 'Must cover political, economic, and cultural policies — and evaluate.',
          commonMistake: 'Learners list policies without saying whether they succeeded or failed.',
          examinerHint: 'Mostly failure, but Authenticité had some cultural success.',
          memoryTrick: '🧠 "Stole the money, kept the culture"',
          mergedCorrection: `🧠 Memory Trick: "Stole the money, kept the culture"\n\n📋 NSC Memo Answer:\nPolitical and economic policies were failures. Cultural policies had some success. Overall rule was a disaster for ordinary Congolese.`
        }
      }]
    },
    {
      id: 'L5Q4',
      source: '2025 NSC P1, Q6',
      topicText: 'MLK Non-Violence in the 1960s',
      teachTopic: 'mlk-non-violence',
      essayBlueprint: {
        stancePrompt: 'Explain how King\u2019s non-violent approach characterised civil society protests in the USA during the 1960s.',
        stanceOptions: ['EXPLAIN'],
        defaultStance: 'EXPLAIN',
        introBlueprint: {
          hook: 'King did not invent non-violence. He took it from Gandhi — and made it American.',
          context: 'The 1950s and 1960s saw mass civil rights protests across the USA. King\u2019s philosophy shaped how they were conducted.',
          loa: 'King\u2019s non-violent philosophy characterised the civil rights protests through sit-ins, Freedom Rides, marches, and disciplined non-retaliation.',
        },
        bodyPoints: [
          { title: 'Gandhi\u2019s influence', evidence: ['King studied Gandhi\u2019s non-violent resistance', 'Applied it to the problems of African Americans'] },
          { title: 'The method', evidence: ['Protestors trained to absorb violence', 'Facing violence head-on without fighting back'] },
          { title: 'Sit-ins', evidence: ['Greensboro sit-ins (1960)', 'Peaceful, disciplined, non-violent', 'Spread to libraries, churches, beaches, pools'] },
          { title: 'Freedom Rides (1961)', evidence: ['Black and white activists rode together', 'Attacked by mobs — did not retaliate', 'Televised worldwide'] },
          { title: 'March on Washington (1963)', evidence: ['250,000 marchers — peaceful', 'King delivered "I Have a Dream"', 'Pressure led to Civil Rights Act (1964)'] },
        ],
        modelConclusion: 'Non-violence was King\u2019s strategy — not his weakness. It turned every attack into evidence against the segregationists. It forced the USA to pass the Civil Rights Act (1964) and Voting Rights Act (1965).',
      },
      parts: [{
        part: 'Q6',
        prompt: 'Explain how the non-violent approach adopted by Martin Luther King Jr characterised the civil society protests in the United States of America (USA) during the 1960s.',
        clue: '💡 Cover: Gandhi influence, sit-ins, Freedom Rides, March on Washington.',
        answer: 'King\u2019s non-violence — inspired by Gandhi — shaped sit-ins, Freedom Rides, and the March on Washington. Protestors trained to absorb violence. Result: Civil Rights Act 1964, Voting Rights Act 1965.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'Martin Luther King Jr was influenced by Mahatma Gandhi\u2019s non-violent approach. He applied it to the civil rights struggle in the USA. Sit-ins, Freedom Rides, and the March on Washington were all non-violent. Protestors trained to not retaliate — no matter how badly they were attacked. King believed non-violence would expose the brutality of the segregationists.',
        memoCorrection: {
          whatToCheck: 'Must cover the philosophy AND its application.',
          commonMistake: 'Learners only describe events without linking them to non-violence.',
          examinerHint: 'Gandhi → King → sit-ins → Freedom Rides → March on Washington.',
          memoryTrick: '🧠 "Gandhi → King → non-violent protests"',
          mergedCorrection: `🧠 Memory Trick: "Gandhi → King → non-violent protests"\n\n📋 NSC Memo Answer:\nKing was influenced by Gandhi. He applied it to sit-ins, Freedom Rides, and the March on Washington. Protestors did not retaliate. Non-violence exposed the brutality of the segregationists.`
        }
      }]
    },
    {
      id: 'L5Q5',
      source: '2025 NSC P1, Q2.6',
      topicText: 'USA and Angolan Civil War',
      teachTopic: 'independent-africa-angola',
      essayBlueprint: {
        stancePrompt: 'Explain why the USA became involved in the Angolan Civil War from 1975.',
        stanceOptions: ['EXPLAIN'],
        defaultStance: 'EXPLAIN',
        introBlueprint: {
          hook: 'The USA had just lost Vietnam. It was not about to lose Angola too.',
          context: 'Angola gained independence from Portugal in 1975. Three movements competed for power.',
          loa: 'The USA became involved in Angola to contain Soviet and Cuban influence, protect its regional prestige, and secure access to Angola\u2019s resources.',
        },
        bodyPoints: [
          { title: 'Anti-communism and the Domino Theory', evidence: ['MPLA was socialist — backed by Cuba and USSR', 'USA feared the Domino Theory', 'USA wanted to keep southern Africa capitalist'] },
          { title: 'Recovering prestige after Vietnam', evidence: ['USA had just lost Vietnam (1975)', 'Wanted to reassert itself as a global superpower'] },
          { title: 'CIA covert action', evidence: ['CIA secretly funded FNLA and UNITA', 'Operation IA Feature', 'Prevent an easy MPLA victory'] },
          { title: 'Resources and regional influence', evidence: ['Angola had oil and mineral wealth', 'Prevent USSR military base', 'Protect US oil interests'] },
          { title: 'Supporting South Africa as an ally', evidence: ['South Africa backed FNLA and UNITA too', 'USA sent aid to South Africa\u2019s efforts'] },
        ],
        modelConclusion: 'The USA became involved in Angola to stop the MPLA, contain Soviet and Cuban influence, recover prestige after Vietnam, and secure resources. It was a Cold War proxy war.',
      },
      parts: [{
        part: '2.6',
        prompt: 'Explain why the United States of America (USA) became involved in the Angolan Civil War from 1975.',
        clue: '💡 Cover: anti-communism, Domino Theory, resources, Vietnam backlash, CIA covert action.',
        answer: 'The USA became involved to stop the MPLA, contain communism, recover prestige after Vietnam, and secure resources. The CIA secretly funded FNLA and UNITA.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'The USA became involved to stop the MPLA from gaining control of Angola. The MPLA was socialist and backed by Cuba and the USSR. The USA feared the Domino Theory. The USA wanted to recover its prestige after the Vietnam War. The CIA secretly funded FNLA and UNITA. The USA wanted access to Angola\u2019s natural resources.',
        memoCorrection: {
          whatToCheck: 'Must cover at least THREE reasons for US involvement.',
          commonMistake: 'Learners give one reason and stop.',
          examinerHint: 'Communism, Domino Theory, Vietnam, resources.',
          memoryTrick: '🧠 "Communism · Domino · Vietnam · Resources"',
          mergedCorrection: `🧠 Memory Trick: "Communism · Domino · Vietnam · Resources"\n\n📋 NSC Memo Answer:\nUSA wanted to stop MPLA. Feared Domino Theory. Wanted to recover prestige after Vietnam. CIA funded FNLA and UNITA. Wanted access to Angola\u2019s resources.`
        }
      }]
    },

    // ---------------- P2 (NEW) ----------------
    {
      id: 'L5P2Q1',
      source: '2024 NSC P2, Q4',
      topicText: 'Biko and Black Consciousness — Empowerment',
      teachTopic: 'p2-bc-nature-aims',
      essayBlueprint: {
        stancePrompt: 'Explain to what extent Steve Biko and the Black Consciousness philosophy inspired black South Africans to empower themselves against apartheid.',
        stanceOptions: ['TO A GREAT EXTENT', 'TO A LIMITED EXTENT'],
        defaultStance: 'TO A GREAT EXTENT',
        introBlueprint: {
          hook: 'After Sharpeville, the ANC and PAC were banned. Black opposition went silent — until a new idea emerged.',
          context: 'Black Consciousness emerged in the late 1960s. Biko founded SASO in 1968. It was a philosophy of mental liberation.',
          loa: 'Black Consciousness, led by Steve Biko, inspired black South Africans to empower themselves to a great extent — through SASO, the BPC, community programmes, and the Soweto uprising.',
        },
        bodyPoints: [
          { title: 'The philosophy of mental liberation', evidence: ['Rejected inferiority complex', 'Promoted Black pride, self-reliance, self-respect', 'Reclaimed African identity — hair, names, dress'] },
          { title: 'SASO and student organisations', evidence: ['SASO formed 1968 by Biko', 'SASM for high school learners', 'BPC (1972) united students, churches, communities, workers'] },
          { title: 'Community programmes for self-reliance', evidence: ['Zanempilo Health Clinic', 'Ginsburg Educational Trust', 'Zimele Trust Fund · Solempilo · Ithuseng'] },
          { title: 'The Soweto uprising (1976)', evidence: ['BC primed students for resistance', '16 June 1976 — learners marched against Afrikaans', 'Hector Pieterson killed. A whole generation radicalised'] },
          { title: 'Workers and media', evidence: ['BAWU — Black Allied Workers Union', '1973 Durban strikes', 'The World and Thrust newspapers'] },
        ],
        modelConclusion: 'Black Consciousness empowered black South Africans psychologically, politically, and economically. It filled the vacuum left by the ANC and PAC. It built the movement that led to the Soweto uprising. Its legacy shaped the next generation of leaders.',
      },
      parts: [{
        part: 'Q4',
        prompt: 'Explain to what extent Steve Biko and the Black Consciousness philosophy inspired black South Africans to empower themselves against apartheid in the 1960s and 1970s.',
        clue: '💡 Cover: philosophy, organisations, community programmes, Soweto 1976.',
        answer: 'To a great extent — BC empowered blacks psychologically (self-reliance, pride), politically (SASO, BPC, BAWU), and through community programmes (Zanempilo, Ginsburg). Led directly to Soweto 1976.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'BC empowered black South Africans to reject the inferiority complex and reclaim their identity. SASO (1968), SASM, and the BPC (1972) organised students, workers, and communities. BAWU organised workers — the 1973 Durban strikes followed. Community programmes — Zanempilo, Ginsburg, Zimele, Solempilo, Ithuseng — proved black self-reliance. The Soweto uprising (1976) was directly inspired by BC.',
        memoCorrection: {
          whatToCheck: 'Must cover philosophy + organisations + community programmes + Soweto.',
          commonMistake: 'Learners only describe Biko\u2019s ideas without the organisations.',
          examinerHint: 'Philosophy → organisations → programmes → Soweto.',
          memoryTrick: '🧠 "Mind · SASO · Clinics · Soweto"',
          mergedCorrection: `🧠 Memory Trick: "Mind · SASO · Clinics · Soweto"\n\n📋 NSC Memo Answer:\nBC empowered blacks psychologically (self-reliance), politically (SASO, BPC, BAWU), through community programmes (Zanempilo, Ginsburg). Led to Soweto 1976.`
        }
      }]
    },
    {
      id: 'L5P2Q2',
      source: '2023 NSC P2, Q4',
      topicText: 'BCM — Self-Liberation',
      teachTopic: 'p2-bc-nature-aims',
      essayBlueprint: {
        stancePrompt: 'Do you agree that the Black Consciousness Movement believed black people should liberate themselves psychologically and be self-reliant?',
        stanceOptions: ['AGREE', 'DISAGREE'],
        defaultStance: 'AGREE',
        introBlueprint: {
          hook: 'The ANC and PAC were banned. Who would lead the struggle now?',
          context: 'Black Consciousness emerged in the political vacuum after Sharpeville and the banning of the ANC and PAC.',
          loa: 'The BCM believed blacks had to liberate themselves psychologically and be self-reliant — through SASO, BPC, community programmes, and the Soweto uprising.',
        },
        bodyPoints: [
          { title: 'Psychological liberation', evidence: ['Rejected self-pity, inferiority complex, self-alienation', 'Infused blacks with pride and identity', 'Stopped using skin lighteners, kept afro hair'] },
          { title: 'SASO and student organisation', evidence: ['SASO formed 1968 by Biko', 'SASM for schools', 'Broke away from NUSAS'] },
          { title: 'Community programmes', evidence: ['Zanempilo Health Clinic', 'Ginsburg Educational Trust', 'Zimele Trust Fund'] },
          { title: 'Workers and unions', evidence: ['BAWU — Black Allied Workers Union', '1973 Durban strikes', 'Organised workers under BC'] },
          { title: 'Soweto uprising (1976)', evidence: ['Learners exposed to BC through SASO/SASM', '16 June 1976 — protest against Afrikaans', 'Hector Pieterson killed'] },
        ],
        modelConclusion: 'The BCM did believe in psychological and self-reliant liberation. It filled the political vacuum left by the ANC and PAC. It created a generation of self-confident activists who carried the struggle into the 1980s.',
      },
      parts: [{
        part: 'Q4',
        prompt: 'The Black Consciousness Movement believed that black people should liberate themselves psychologically and be self-reliant in their struggle to challenge the apartheid government of the 1970s. Do you agree with the statement?',
        clue: '💡 Cover: psychological liberation, organisations, community programmes, Soweto.',
        answer: 'Agree. BCM taught blacks to reject inferiority, embrace pride, and build their own institutions. SASO, BPC, community programmes, and Soweto 1976 followed.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'The BCM believed psychological liberation was the first step. It rejected the inferiority complex created by apartheid. SASO (1968) and SASM organised students. The BPC (1972) united students, churches, communities, workers. Community programmes — Zanempilo, Ginsburg, Zimele — proved self-reliance. The Soweto uprising (1976) showed BC\u2019s influence on students.',
        memoCorrection: {
          whatToCheck: 'Must cover psychological + self-reliance + organisations + Soweto.',
          commonMistake: 'Learners only focus on Biko as a person.',
          examinerHint: 'Mind first → then organisations → then Soweto.',
          memoryTrick: '🧠 "Mind → organisations → Soweto"',
          mergedCorrection: `🧠 Memory Trick: "Mind → organisations → Soweto"\n\n📋 NSC Memo Answer:\nBCM believed in psychological liberation and self-reliance. SASO, BPC, community programmes, and Soweto 1976 followed.`
        }
      }]
    },
    {
      id: 'L5P2Q3',
      source: '2024 NSC P2, Q6',
      topicText: 'Gorbachev — Downfall of the USSR',
      teachTopic: 'p2-ussr-disintegration',
      essayBlueprint: {
        stancePrompt: 'Critically discuss whether Gorbachev\u2019s reforms led to the disintegration and downfall of the Soviet Union.',
        stanceOptions: ['AGREE', 'PARTLY AGREE'],
        defaultStance: 'AGREE',
        introBlueprint: {
          hook: 'Gorbachev tried to save the Soviet Union. He ended up destroying it.',
          context: 'Gorbachev became leader in 1985. The economy was broken — arms race, Afghanistan, Chernobyl.',
          loa: 'Gorbachev\u2019s reforms — Perestroika and Glasnost — led to the disintegration of the Soviet Union and the end of the Cold War in 1991.',
        },
        bodyPoints: [
          { title: 'Background — a weakened USSR', evidence: ['Arms race drained treasury', 'Afghanistan war drained resources', 'Chernobyl disaster exposed failures'] },
          { title: 'Perestroika (economic reconstruction)', evidence: ['Allowed small-scale private ownership', 'Removed government control over production', 'Poorly implemented — economy got worse'] },
          { title: 'Glasnost (openness)', evidence: ['Reduced censorship', 'Allowed criticism of government — and of communism itself', 'Released political prisoners'] },
          { title: 'Consequences of both policies', evidence: ['Hardliners opposed reforms', 'Liberals wanted faster change', 'Nationalist movements in the 15 republics emerged'] },
          { title: 'The final collapse', evidence: ['August 1991 coup failed', 'Boris Yeltsin rose in Russia', '25 December 1991 — USSR dissolved'] },
        ],
        modelConclusion: 'Gorbachev\u2019s reforms destroyed the system he tried to save. Perestroika broke the economy. Glasnost broke the ideology. The USSR dissolved on 25 December 1991. The Cold War ended. The USA became the sole superpower.',
      },
      parts: [{
        part: 'Q6',
        prompt: 'Gorbachev\u2019s political and economic reforms of the mid-1980s led to the disintegration and downfall of the Soviet Union, and ultimately the end of the Cold War in 1991. Critically discuss this statement.',
        clue: '💡 Cover: Perestroika, Glasnost, nationalist movements, August coup, dissolution.',
        answer: 'Agree — Perestroika broke the economy. Glasnost broke the ideology. Nationalist movements emerged. The USSR dissolved in 1991.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'Gorbachev introduced Perestroika (economic reconstruction) and Glasnost (openness). Perestroika allowed small-scale private ownership and removed government control over production. Glasnost reduced censorship and allowed criticism of government. Both went further than intended. The 15 republics demanded independence. The August 1991 coup failed. Boris Yeltsin rose. On 25 December 1991, the USSR was dissolved.',
        memoCorrection: {
          whatToCheck: 'Must cover Perestroika + Glasnost + consequences + dissolution.',
          commonMistake: 'Learners list reforms without consequences.',
          examinerHint: 'Reforms → unintended consequences → collapse.',
          memoryTrick: '🧠 "Reforms → collapse"',
          mergedCorrection: `🧠 Memory Trick: "Reforms → collapse"\n\n📋 NSC Memo Answer:\nPerestroika broke economy. Glasnost broke ideology. Nationalisms emerged. August 1991 coup failed. USSR dissolved 25 December 1991.`
        }
      }]
    },
    {
      id: 'L5P2Q4',
      source: '2023 NSC P2, Q6',
      topicText: 'Gorbachev and De Klerk',
      teachTopic: 'p2-gorbachev-reforms',
      essayBlueprint: {
        stancePrompt: 'Explain to what extent Gorbachev\u2019s reforms influenced FW de Klerk to introduce political reforms that led to negotiations for a democratic South Africa.',
        stanceOptions: ['TO A GREAT EXTENT', 'TO A LIMITED EXTENT'],
        defaultStance: 'TO A GREAT EXTENT',
        introBlueprint: {
          hook: 'In 1989, the Berlin Wall fell. Three months later, FW de Klerk opened South Africa\u2019s door to democracy.',
          context: 'The end of the Cold War changed the global order. Apartheid lost its anti-communist justification.',
          loa: 'Gorbachev\u2019s reforms influenced De Klerk to a great extent — by removing the communist threat, ending Soviet support for the ANC, and shifting Western pressure onto apartheid.',
        },
        bodyPoints: [
          { title: 'Gorbachev\u2019s reforms in the USSR', evidence: ['Perestroika and Glasnost introduced', 'Communism no longer seen as global threat', 'USSR could no longer support the ANC'] },
          { title: 'Eastern Europe and the fall of the Wall', evidence: ['Berlin Wall fell 1989', 'Eastern Europe broke free', 'Communism collapsed across the bloc'] },
          { title: 'Impact on South Africa', evidence: ['Aptheid lost its anti-communist excuse', 'West put pressure on NP to negotiate', 'NP realised it could not maintain white rule indefinitely'] },
          { title: 'De Klerk\u2019s reforms', evidence: ['2 February 1990 — unbanning of ANC, PAC, SACP', '11 February 1990 — Mandela released', 'Road to CODESA and 1994 elections'] },
          { title: 'The ANC\u2019s position', evidence: ['Lost Soviet military and financial support', 'Also needed to negotiate', 'Both sides pushed to the table'] },
        ],
        modelConclusion: 'Gorbachev\u2019s reforms removed the ideological foundation of apartheid. De Klerk could no longer use the communist threat as an excuse. The ANC could no longer rely on Soviet backing. Both sides had reasons to negotiate. 1991 in Moscow led to 1994 in South Africa.',
      },
      parts: [{
        part: 'Q6',
        prompt: 'Explain to what extent Gorbachev\u2019s reforms in the Soviet Union in the mid-1980s influenced FW de Klerk to introduce political reforms that paved the way for negotiations for a democratic South Africa.',
        clue: '💡 Cover: Gorbachev reforms, fall of Wall, loss of communist excuse, ANC loses Soviet support.',
        answer: 'To a great extent — Gorbachev ended the Cold War. The communist threat excuse for apartheid was gone. The ANC lost Soviet support. Both sides negotiated.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'Gorbachev\u2019s Perestroika and Glasnost ended the Cold War. The Berlin Wall fell in 1989. Communist regimes collapsed across Eastern Europe. South Africa\u2019s apartheid government lost its anti-communist excuse. The USSR could no longer support the ANC financially or militarily. Both sides were pushed to the negotiating table. De Klerk unbanned the ANC on 2 February 1990 and released Mandela on 11 February 1990. The road to 1994 opened.',
        memoCorrection: {
          whatToCheck: 'Must link Gorbachev\u2019s reforms to De Klerk\u2019s decisions.',
          commonMistake: 'Learners describe only one side.',
          examinerHint: 'Gorbachev → Wall fell → no communist excuse → both negotiate.',
          memoryTrick: '🧠 "Moscow 1991 → Pretoria 1990"',
          mergedCorrection: `🧠 Memory Trick: "Moscow 1991 → Pretoria 1990"\n\n📋 NSC Memo Answer:\nGorbachev ended the Cold War. Wall fell 1989. Apartheid lost its anti-communist excuse. ANC lost Soviet support. De Klerk unbanned ANC and released Mandela. Road to 1994.`
        }
      }]
    },
    {
      id: 'L5P2Q5',
      source: '2025 NSC P2, Q4',
      topicText: 'BCM Revival — Crisis of Apartheid',
      teachTopic: 'p2-bc-nature-aims',
      essayBlueprint: {
        stancePrompt: 'Do you agree that Biko and the Black Consciousness philosophy revived resistance to apartheid in South Africa?',
        stanceOptions: ['AGREE', 'DISAGREE'],
        defaultStance: 'AGREE',
        introBlueprint: {
          hook: 'By 1968, the ANC and PAC were banned, exiled, or imprisoned. Resistance was dead.',
          context: 'In the vacuum, Steve Biko and Black Consciousness emerged — not just to resist, but to rebuild.',
          loa: 'Biko and Black Consciousness revived resistance to apartheid to a great extent — psychologically, organisationally, and through the Soweto uprising.',
        },
        bodyPoints: [
          { title: 'Filling the political vacuum', evidence: ['ANC and PAC banned after Sharpeville (1960)', 'BC emerged as new opposition', 'SASO formed 1968'] },
          { title: 'Psychological revival', evidence: ['Rejected inferiority complex', 'Self-reliance, black pride, "Black is beautiful"', 'Reclaimed African identity'] },
          { title: 'Organisational revival', evidence: ['SASO (1968), SASM (1972)', 'BPC (1972), BAWU', 'Community programmes: Zanempilo, Ginsburg, Zimele'] },
          { title: 'The Soweto uprising (1976)', evidence: ['Students exposed to BC through SASO/SASM', '16 June 1976 — protest against Afrikaans', 'Hector Pieterson killed. Thousands fled into exile'] },
          { title: 'The legacy', evidence: ['A generation of new leaders emerged', 'BC influenced later MDM, UDF tactics', 'Biko became a global symbol of resistance'] },
        ],
        modelConclusion: 'Black Consciousness revived resistance to apartheid. It filled the vacuum left by the ANC and PAC. It rebuilt pride, built new organisations, and lit the fire that became Soweto 1976. Biko\u2019s philosophy outlived his death.',
      },
      parts: [{
        part: 'Q4',
        prompt: 'The philosophy of Biko and the Black Consciousness Movement revived resistance to apartheid in South Africa from the 1960s to the 1970s. Do you agree with this statement?',
        clue: '💡 Cover: filling the vacuum, philosophy, organisations, Soweto 1976, legacy.',
        answer: 'Agree. BC filled the vacuum left by the ANC and PAC. It rebuilt pride, built new organisations (SASO, BPC, BAWU), and inspired Soweto 1976.',
        marks: 50,
        acceptAnyTwo: false,
        memoFullAnswer: 'After Sharpeville (1960), the ANC and PAC were banned. Resistance was silenced. In the vacuum, Black Consciousness emerged — led by Steve Biko. SASO (1968) organised university students. SASM (1972) organised high school learners. The BPC (1972) united students, churches, communities, workers. BAWU organised workers. Community programmes — Zanempilo, Ginsburg, Zimele — proved self-reliance. The Soweto uprising (1976) was directly inspired by BC. A generation of new leaders emerged.',
        memoCorrection: {
          whatToCheck: 'Must cover vacuum + philosophy + organisations + Soweto + legacy.',
          commonMistake: 'Learners only list BC organisations without context.',
          examinerHint: 'Vacuum → BC ideas → organisations → Soweto → legacy.',
          memoryTrick: '🧠 "Vacuum → BC → Soweto"',
          mergedCorrection: `🧠 Memory Trick: "Vacuum → BC → Soweto"\n\n📋 NSC Memo Answer:\nBC filled the vacuum after the banning of the ANC and PAC. SASO, SASM, BPC, BAWU, community programmes. Soweto 1976 inspired by BC. A generation of new leaders emerged.`
        }
      }]
    },
  ]
};

// ================================================================
// COMPONENT
// ================================================================
const LEVELS = [1, 2, 3, 4, 5];

const TopicLessonHistory = () => {
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

  const [blueprintStance, setBlueprintStance] = useState(null);
  const [blueprintOpenPoints, setBlueprintOpenPoints] = useState({});

  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';
  const prefetchedRef = useRef(false);

  const activeConcepts = TOPIC_CONCEPTS[topicId] || Object.values(TOPIC_CONCEPTS).flat();
  const topicName = TOPIC_NAMES[topicId] || 'History';
  const isPaper1 = HISTORY_PAPER_1_TOPICS.has(topicId);
  const accent = isPaper1 ? '#8B0000' : '#5D4037';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';

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
      const key = `level${lvl}`;
      if (filteredBank[key]?.length > 0) return filteredBank[key];
    }
    return [];
  })();

  const activeQuestionSet = levelQuestions[currentQuestionIndex % Math.max(levelQuestions.length, 1)];
  const allParts = activeQuestionSet?.parts || [];
  const currentQuestion = allParts[currentPartIndex % Math.max(allParts.length, 1)] || null;
  const memo = currentQuestion?.memoCorrection || null;
  const essayBlueprint = activeQuestionSet?.essayBlueprint || null;

  const speakText = createSpeakText({ audioRef, setSpeaking: setIsSpeaking }, API_URL);

  // ================================================================
  // WELCOME
  // ================================================================
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Let's learn ${topicName}.`;
    setNeoMessage(welcomeMsg);
    const timer = setTimeout(() => { setWelcomeDone(true); }, 100);
    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================================================================
  // TEACHING QUEUE INIT
  // ================================================================
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ================================================================
  // TEACHING QUEUE DRAIN
  // ================================================================
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ================================================================
  // PREFETCH
  // ================================================================
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;
    const timer = setTimeout(async () => {
      try {
        const scripts = HISTORY_TEACHING_SCRIPTS || {};
        const texts = [];
        activeConcepts.forEach((conceptId) => {
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
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch] skipped:', err?.message);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [activeConcepts]);

  // ================================================================
  // UNMOUNT CLEANUP
  // ================================================================
  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  // ================================================================
  // ANSWER CHECKING
  // ================================================================
  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    setShowMemoAfterAnswer(true);
    let answerDescription = currentQuestion.answer;
    if (currentQuestion.acceptAnyTwo) {
      answerDescription = `ANY TWO or more of: ${currentQuestion.answer}`;
    }
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the NSC memorandum.

          Student's answer: "${typedAnswer.trim()}"
          Correct answer: ${answerDescription}

          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO or more correct points. Accept any 2 or more.' : ''}

          ACCEPT SYNONYMS:
          - "USA" = "United States" = "America"
          - "USSR" = "Soviet Union" = "Russia"
          - "GDR" = "East Germany"
          - "Iron Curtain" = "symbolic divide"
          - "containment" = "stop spread of communism"
          - "guerrilla" = "hit and run"
          - "segregation" = "racial separation"
          - "communism" = "state ownership"
          - "capitalism" = "private ownership"
          - "BCM" = "Black Consciousness Movement"
          - "BPC" = "Black Peoples Convention"
          - "SASO" = "South African Students Organisation"
          - "TRC" = "Truth and Reconciliation Commission"
          - "GNU" = "Government of National Unity"
          - "COSATU" = "Congress of South African Trade Unions"
          - "SADF" = "South African Defence Force"
          - "UDF" = "United Democratic Front"
          - "sanctions" = "economic pressure"
          - "amnesty" = "no prosecution"
          - "BRICS" = "Brazil Russia India China South Africa"

          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}

          CRITICAL: If the answer is WRONG, use a gentle but honest message.

          If CORRECT:
          "CORRECT: [3 words max]"

          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake from memo]
          TEACHING: [Not quite, but don't worry — we'll get there together. Here's how to do it:]"`,
          subject: 'history',
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
        const teachingMatch = reply.match(/TEACHING:\s*([\s\S]+)/) || reply.match(/FIX:\s*([^\n]+)/);
        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');
        let teachingMsg = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        if (!teachingMsg) {
          teachingMsg = `Not quite, but don't worry — we'll get there together. ${memo?.examinerHint || 'Try looking at the clue for help.'}`;
        }
        setAiTeaching(teachingMsg);
        if (teachingMsg) {
          setNeoMessage(teachingMsg);
          speakText(teachingMsg);
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

          Question: ${currentQuestion?.prompt}

          Keep it SIMPLE. Use a story or analogy. No complicated historical terms.`,
          subject: 'history',
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
    setBlueprintStance(null);
    setBlueprintOpenPoints({});

    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';

    if (currentPartIndex < allParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
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
      if (currentQuestionIndex < levelQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentPartIndex(0);
        const msg = `Great job! Let's continue!`;
        setNeoMessage(msg);
        speakText(msg);
      } else {
        const nextLevel = currentLevel + 1;
        if (nextLevel > 5) {
          const levelMsg = `🎉 ${firstName}, you've completed this topic!`;
          setNeoMessage(levelMsg);
          speakText(levelMsg);
          setTimeout(() => navigate(`/subjects/${subject}`), 3000);
        } else {
          setCurrentLevel(nextLevel);
          setCurrentQuestionIndex(0);
          setCurrentPartIndex(0);
          let levelMsg = '';
          if (nextLevel === 3) levelMsg = `🔥 ${firstName}, things are going to step up a bit!`;
          else if (nextLevel === 4) levelMsg = `💪 ${firstName}, let's keep pushing!`;
          else if (nextLevel === 5) levelMsg = `🏆 ${firstName}, this is the final level!`;
          else levelMsg = `${firstName}, let's continue!`;
          setNeoMessage(levelMsg);
          speakText(levelMsg);
        }
      }
    }
  };

  const handleJumpLevel = (level) => {
    setCurrentLevel(level);
    setCurrentQuestionIndex(0);
    setCurrentPartIndex(0);
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
    setBlueprintStance(null);
    setBlueprintOpenPoints({});
    setNeoMessage(`Jumping to Level ${level}...`);
  };

  // ================================================================
  // GATE — MUST BE BEFORE PRACTICE RENDER
  // ================================================================
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="history"
      />
    );
  }

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
        scriptsModule="history"
        accent={accent}
      />
    );
  }

  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  if (!currentQuestion) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText
      .split('\n')
      .filter(line => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map(line => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;
  const isEssayLevel = currentLevel === 5 && essayBlueprint;

  const toggleBodyPoint = (idx) => {
    setBlueprintOpenPoints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

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
          <span className="tl-progress-text-mini">
            {currentQuestionIndex + 1}/{levelQuestions.length}
          </span>
        </div>
        <NeoVoiceIndicator autoMode={autoMode} onToggleAuto={() => setAutoMode((v) => !v)} />
      </header>

      <div className="tl-level-jump">
        {LEVELS.map((level) => (
          <button
            key={level}
            className={`tl-level-btn ${currentLevel === level ? 'active' : ''}`}
            onClick={() => handleJumpLevel(level)}
          >
            {level === 5 ? 'Essay' : `L${level}`}
          </button>
        ))}
      </div>

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
            {isEssayLevel ? 'ESSAY' : `Level ${currentLevel}`} • {paperLabel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {isEssayLevel && isCorrect === null && (
            <div className="tl-essay-blueprint">
              <div className="tl-blueprint-step">
                <span className="tl-blueprint-step-label">Step 1 · Take a stance</span>
                <p className="tl-blueprint-step-prompt">{essayBlueprint.stancePrompt}</p>
                <div className="tl-blueprint-stance-row">
                  {essayBlueprint.stanceOptions.map((option) => (
                    <button
                      key={option}
                      className={`tl-blueprint-stance-btn ${blueprintStance === option ? 'active' : ''}`}
                      onClick={() => setBlueprintStance(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {blueprintStance && (
                <>
                  <div className="tl-blueprint-step">
                    <span className="tl-blueprint-step-label">Step 2 · Build your skeleton</span>
                    <div className="tl-blueprint-skeleton">
                      <div className="tl-blueprint-skeleton-block">
                        <strong>Introduction</strong>
                        <p>{essayBlueprint.introBlueprint.hook}</p>
                        <p>{essayBlueprint.introBlueprint.context}</p>
                        <p className="tl-blueprint-loa"><em>LOA: {essayBlueprint.introBlueprint.loa}</em></p>
                      </div>

                      <div className="tl-blueprint-skeleton-block">
                        <strong>Body — {essayBlueprint.bodyPoints.length} main points</strong>
                        {essayBlueprint.bodyPoints.map((point, idx) => (
                          <div key={idx} className="tl-blueprint-body-point">
                            <button
                              className="tl-blueprint-body-header"
                              onClick={() => toggleBodyPoint(idx)}
                            >
                              <span>{idx + 1}. {point.title}</span>
                              <span className="tl-blueprint-toggle">{blueprintOpenPoints[idx] ? '−' : '+'}</span>
                            </button>
                            {blueprintOpenPoints[idx] && (
                              <ul className="tl-blueprint-evidence">
                                {point.evidence.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="tl-blueprint-skeleton-block">
                        <strong>Conclusion</strong>
                        <p>{essayBlueprint.modelConclusion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="tl-blueprint-step">
                    <span className="tl-blueprint-step-label">Step 3 · Remember PEEL</span>
                    <div className="tl-blueprint-peel">
                      <div className="tl-peel-item"><strong>P</strong>oint — what is this paragraph saying?</div>
                      <div className="tl-peel-item"><strong>E</strong>xplain — what does it mean?</div>
                      <div className="tl-peel-item"><strong>E</strong>xample — what evidence proves it?</div>
                      <div className="tl-peel-item"><strong>L</strong>ink — how does it answer the question?</div>
                    </div>
                  </div>

                  <div className="tl-blueprint-step">
                    <span className="tl-blueprint-step-label">Step 4 · Now write it in your own words</span>
                    <div className="tl-input-wrapper">
                      <textarea
                        className="tl-typed-input"
                        placeholder="Draft your essay here — start with your introduction and your line of argument..."
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        rows={8}
                      />
                      {currentQuestion.clue && (
                        <button className="tl-clue-btn" onClick={() => setShowClue(!showClue)} aria-label="Show clue" title="Show clue">
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
                    >
                      {isLoading ? 'Checking...' : 'Submit for Feedback'} <FaArrowRight />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {!isEssayLevel && isCorrect === null && (
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
                  <button className="tl-clue-btn" onClick={() => setShowClue(!showClue)} aria-label="Show clue" title="Show clue">
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
              >
                {isLoading ? 'Checking...' : 'Submit Answer'} <FaArrowRight />
              </button>
            </div>
          )}

          {isCorrect === true && showMemoAfterAnswer && (
            <div className="tl-correct-clean">
              <div className="tl-correct-msg">
                <span className="tl-correct-icon">✅</span>
                <p>Correct!</p>
              </div>
              <div className="tl-memo-answer-clean">
                <strong>All possible answers:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: '4px', fontSize: '14px' }}>{line}</li>
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
                {aiMistake && (
                  <div className="tl-mistake-type">
                    <strong>Common Mistake:</strong>
                    <p>{aiMistake}</p>
                  </div>
                )}
                {aiTeaching && (
                  <div className="tl-teaching-correct">
                    <strong>💡 Here's the way:</strong>
                    <p>{aiTeaching}</p>
                  </div>
                )}
                {memo?.mergedCorrection && !aiTeaching && (
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

export default TopicLessonHistory;