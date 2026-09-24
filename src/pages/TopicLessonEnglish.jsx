import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { ENGLISH_TEACHING_SCRIPTS } from '../data/EnglishContent';
import '../css/TopicLesson.css';

// ================================================================
// TOPIC → CONCEPT MAPPING — 12 topics (6 P1 + 6 P2)
// ================================================================
const TOPIC_CONCEPTS = {
  // -------- PAPER 1 --------
  'comprehension-and-vocabulary': ['comprehension-skills', 'vocabulary-and-context'],
  'visual-literacy': ['visual-literacy'],
  'summary-writing': ['summary-writing'],
  'advertisement-analysis': ['advertisement-analysis'],
  'cartoon-analysis': ['cartoon-analysis'],
  'grammar-and-punctuation': ['grammar-and-punctuation'],
  // -------- PAPER 2 --------
  'cry-beloved-country': ['cry-plot', 'cry-characters', 'cry-themes', 'cry-setting', 'cry-context', 'cry-essay'],
  'jekyll-hyde': ['jekyll-plot', 'jekyll-characters', 'jekyll-themes', 'jekyll-duality', 'jekyll-context', 'jekyll-essay'],
  'macbeth': ['macbeth-plot', 'macbeth-characters', 'macbeth-themes', 'macbeth-ambition', 'macbeth-context', 'macbeth-essay'],
  'my-children-my-africa': ['mcma-plot', 'mcma-characters', 'mcma-themes', 'mcma-apartheid', 'mcma-context', 'mcma-essay'],
  'short-stories': ['short-stories-technique', 'short-stories-themes', 'short-stories-characters'],
  'poetry': ['poetry-technique', 'poetry-themes', 'poetry-imagery'],
};

const TOPIC_NAMES = {
  // -------- PAPER 1 --------
  'comprehension-and-vocabulary': 'Comprehension & Vocabulary',
  'visual-literacy': 'Visual Literacy',
  'summary-writing': 'Summary Writing',
  'advertisement-analysis': 'Advertisement Analysis',
  'cartoon-analysis': 'Cartoon Analysis',
  'grammar-and-punctuation': 'Grammar & Punctuation',
  // -------- PAPER 2 --------
  'cry-beloved-country': 'Cry, the Beloved Country',
  'jekyll-hyde': 'Dr Jekyll and Mr Hyde',
  'macbeth': 'Macbeth',
  'my-children-my-africa': 'My Children! My Africa!',
  'short-stories': 'Short Stories',
  'poetry': 'Poetry',
};

// Which topics belong to which paper (drives colour)
const PAPER_1_TOPICS = new Set([
  'comprehension-and-vocabulary', 'visual-literacy', 'summary-writing',
  'advertisement-analysis', 'cartoon-analysis', 'grammar-and-punctuation',
]);

// ================================================================
// QUESTION BANK — 12 topics across P1 and P2
// Real NSC questions from Nov 2023 / 2024 / 2025
// ================================================================
const QuestionBank = {
  // ================================================================
  // LEVEL 1 — Recall
  // ================================================================
  level1: [
    // ============ PAPER 1: COMPREHENSION & VOCABULARY ============
    {
      id: 'L1Q1',
      source: '2023 NSC P1, Q1.1.1',
      topicText: 'Exciting and Different',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 1',
        paragraphs: [
          'Fast fashion refers to the quick and inexpensive production of clothing by mass-market retailers in response to the latest fashion trends. The fashion industry is vibrant and varied.',
        ],
      },
      parts: [{
        part: '1.1.1',
        prompt: 'Quote THREE consecutive words that suggest that fast fashion is exciting and different.',
        clue: '💡 Look at the second sentence. Three words in a row describe the fashion industry.',
        answer: 'vibrant and varied',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'vibrant and varied / trendy and affordable',
        memoCorrection: {
          whatToCheck: 'Must quote the exact three consecutive words.',
          commonMistake: 'Learners paraphrase instead of quoting.',
          examinerHint: 'Look at paragraph 1, sentence 2.',
          alternativeAccept: ['vibrant and varied', 'trendy and affordable'],
          memoryTrick: '🧠 "Quote = copy exactly, word for word"',
          mergedCorrection: `🧠 Memory Trick: "Quote = copy exactly, word for word"\n\n📋 NSC Memo Answer:\nvibrant and varied / trendy and affordable`,
        },
      }],
    },
    {
      id: 'L1Q2',
      source: '2023 NSC P1, Q1.1.2',
      topicText: 'Formal Word for Trendy',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'TEXT A — FAST FASHION',
        paragraphs: [
          'The goal is to get new styles from the runway to the store as fast and cheaply as possible, so that people can buy trendy and affordable clothing.',
        ],
      },
      parts: [{
        part: '1.1.2',
        prompt: 'Choose the correct answer: A more formal word for "trendy" is ... A cool. B outdated. C remarkable. D fashionable.',
        clue: '💡 "Trendy" means following the latest fashion. Which option sounds formal?',
        answer: 'D — fashionable',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'D / fashionable',
        memoCorrection: {
          whatToCheck: 'Must choose D or fashionable.',
          commonMistake: 'Learners choose A (cool) — that is informal.',
          examinerHint: 'Trendy = fashionable.',
          alternativeAccept: ['D', 'fashionable'],
          memoryTrick: '🧠 "Trendy = fashionable"',
          mergedCorrection: `🧠 Memory Trick: "Trendy = fashionable"\n\n📋 NSC Memo Answer:\nD / fashionable`,
        },
      }],
    },
    {
      id: 'L1Q3',
      source: '2024 NSC P1, Q1.8.1',
      topicText: 'One Word for Not Perfect',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'TEXT A — EMBRACING AI, PARAGRAPH 8',
        paragraphs: [
          'Despite its limitations, AI is here to stay and it can help us keep up with the changes in technology.',
        ],
      },
      parts: [{
        part: '1.8.1',
        prompt: 'Quote ONE word which indicates that AI is not perfect.',
        clue: '💡 Look for a word that means "things it cannot do well".',
        answer: 'limitations',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'limitations',
        memoCorrection: {
          whatToCheck: 'Must quote the exact word from the text.',
          commonMistake: 'Learners write "not perfect" — must quote.',
          examinerHint: 'One word only.',
          alternativeAccept: ['limitations'],
          memoryTrick: '🧠 "limitations = things AI cannot do"',
          mergedCorrection: `🧠 Memory Trick: "limitations = things AI cannot do"\n\n📋 NSC Memo Answer:\nlimitations`,
        },
      }],
    },
    {
      id: 'L1Q4',
      source: '2025 NSC P1, Q1.1.2',
      topicText: 'One Word — Varied',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'TEXT A — SA MUSIC, PARAGRAPH 1',
        paragraphs: [
          'The industry is diverse and growing, with many different genres and artists emerging.',
        ],
      },
      parts: [{
        part: '1.1.2',
        prompt: 'Quote ONE word from paragraph 1 that shows the music industry has many different types.',
        clue: '💡 Which word means "many different kinds"?',
        answer: 'diverse',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'diverse',
        memoCorrection: {
          whatToCheck: 'Must quote "diverse".',
          commonMistake: 'Learners write "growing" — that is not the same thing.',
          examinerHint: 'One word, from paragraph 1.',
          alternativeAccept: ['diverse'],
          memoryTrick: '🧠 "diverse = many different kinds"',
          mergedCorrection: `🧠 Memory Trick: "diverse = many different kinds"\n\n📋 NSC Memo Answer:\ndiverse`,
        },
      }],
    },
    {
      id: 'L1Q5',
      source: '2023 NSC P1, Q1.3.2',
      topicText: 'Word Showing Big Increase',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 3',
        paragraphs: [
          'Globally, fashion companies have drastically changed their release of new clothing collections.',
        ],
      },
      parts: [{
        part: '1.3.2',
        prompt: 'Identify ONE word which shows that throughout the world, fashion companies have significantly increased their new clothing releases.',
        clue: '💡 Look for the adverb that means "to a very large degree".',
        answer: 'drastically',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'drastically',
        memoCorrection: {
          whatToCheck: 'Must quote "drastically".',
          commonMistake: 'Learners write "significantly" (that is the question\'s wording).',
          examinerHint: 'One word only.',
          alternativeAccept: ['drastically'],
          memoryTrick: '🧠 "drastically = hugely"',
          mergedCorrection: `🧠 Memory Trick: "drastically = hugely"\n\n📋 NSC Memo Answer:\ndrastically`,
        },
      }],
    },
    {
      id: 'L1Q6',
      source: '2023 NSC P1, Q3.3',
      topicText: 'Root of "Reporting"',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'SUBHEADING',
        paragraphs: ['District emergency numbers for reporting veld fires'],
      },
      parts: [{
        part: '3.3',
        prompt: 'Identify the root of the underlined word "reporting".',
        clue: '💡 The root is the base form of the word — strip the ending.',
        answer: 'report',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'report',
        memoCorrection: {
          whatToCheck: 'Must give "report" as the root.',
          commonMistake: 'Learners write "reporting" — that is not the root.',
          examinerHint: 'Root = base form.',
          alternativeAccept: ['report'],
          memoryTrick: '🧠 "Root = base form. Strip the ending."',
          mergedCorrection: `🧠 Memory Trick: "Root = base form. Strip the ending."\n\n📋 NSC Memo Answer:\nreport`,
        },
      }],
    },

    // ============ PAPER 1: VISUAL LITERACY ============
    {
      id: 'L1Q7',
      source: '2023 NSC P1, Q1.12',
      topicText: 'Purpose of the Legend',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — PIE CHARTS (WATER USE)',
        paragraphs: [
          'Small coloured boxes appear at the bottom of the pie charts, each labelled with a category (Industrial use, Agricultural use, Domestic use).',
        ],
      },
      parts: [{
        part: '1.12',
        prompt: 'Why are the small boxes included at the bottom of the text?',
        clue: '💡 They tell you what each colour or shading means.',
        answer: 'To show what the different shadings represent in the graph.',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'They show what the different shadings represent in this graph.',
        memoCorrection: {
          whatToCheck: 'Must explain the boxes are a legend/key.',
          commonMistake: 'Learners describe the boxes without explaining their function.',
          examinerHint: 'Legend = explains what each colour or shading means.',
          alternativeAccept: ['They show what the shadings represent', 'Legend / key'],
          memoryTrick: '🧠 "Legend = key. It explains the shading."',
          mergedCorrection: `🧠 Memory Trick: "Legend = key. It explains the shading."\n\n📋 NSC Memo Answer:\nThey show what the different shadings represent in this graph.`,
        },
      }],
    },
    {
      id: 'L1Q8',
      source: '2024 NSC P1, Q1.7',
      topicText: 'Bold Glamour Filter',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — AI, PARAGRAPH 7',
        paragraphs: [
          'Unlike past social media filters, bold glamour does not malfunction when the face moves in a video.',
        ],
      },
      parts: [{
        part: '1.7',
        prompt: 'How does the bold glamour filter differ from previous filters?',
        clue: '💡 What does it do that old filters could not?',
        answer: 'It continues working well even when a face moves in a video.',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'It continues working well even when a face moves in a video.',
        memoCorrection: {
          whatToCheck: 'Must state it does not malfunction when the face moves.',
          commonMistake: 'Learners describe the filter, not how it differs.',
          examinerHint: 'Focus on "when the face moves".',
          alternativeAccept: ['It works when the face moves'],
          memoryTrick: '🧠 "Bold glamour keeps working when the face moves."',
          mergedCorrection: `🧠 Memory Trick: "Bold glamour keeps working when the face moves."\n\n📋 NSC Memo Answer:\nIt continues working well even when a face moves in a video.`,
        },
      }],
    },

    // ============ PAPER 1: ADVERTISEMENT ============
    {
      id: 'L1Q9',
      source: '2024 NSC P1, Q3.1',
      topicText: 'Registered Trademark',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT HEADLINE',
        paragraphs: ['Sinutab® — Free yourself from a blocked nose.'],
      },
      parts: [{
        part: '3.1',
        prompt: 'The ® next to the word Sinutab indicates that this is a ... trademark. A recorded B renewing C registered D recovering',
        clue: '💡 The ® symbol stands for one specific word.',
        answer: 'C — registered',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'C / registered',
        memoCorrection: {
          whatToCheck: 'Must choose C or registered.',
          commonMistake: 'Learners confuse ® with ™.',
          examinerHint: '® = registered trademark.',
          alternativeAccept: ['C', 'registered'],
          memoryTrick: '🧠 "® = registered. ™ = trademark."',
          mergedCorrection: `🧠 Memory Trick: "® = registered. ™ = trademark."\n\n📋 NSC Memo Answer:\nC / registered`,
        },
      }],
    },
    {
      id: 'L1Q10',
      source: '2023 NSC P1, Q3.2',
      topicText: 'Function of the Apostrophe',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT SUBHEADING',
        paragraphs: ['Fire is EVERYONE\'S fight.'],
      },
      parts: [{
        part: '3.2',
        prompt: 'The function of the apostrophe in "Fire is everyone\'s fight" is to indicate ... A omission. B contraction. C possession. D abbreviation.',
        clue: '💡 Who owns the fight? The apostrophe shows belonging.',
        answer: 'C — possession',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'C / possession',
        memoCorrection: {
          whatToCheck: 'Must choose C.',
          commonMistake: 'Learners pick "contraction".',
          examinerHint: 'Apostrophe + s = possession.',
          alternativeAccept: ['C', 'possession'],
          memoryTrick: '🧠 "\'s = possession. \' = contraction."',
          mergedCorrection: `🧠 Memory Trick: "\'s = possession. \' = contraction."\n\n📋 NSC Memo Answer:\nC / possession`,
        },
      }],
    },
    {
      id: 'L1Q11',
      source: '2024 NSC P1, Q3.4',
      topicText: 'Not Oral Treatment',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT TEXT',
        paragraphs: ['Sinutab Nasal Spray — Blocked Nose.'],
      },
      parts: [{
        part: '3.4',
        prompt: 'Quote TWO consecutive words from the text that indicate that this is not an oral treatment.',
        clue: '💡 What two-word phrase tells you how it is used?',
        answer: 'Nasal spray',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Nasal spray',
        memoCorrection: {
          whatToCheck: 'Must quote exactly two consecutive words.',
          commonMistake: 'Learners quote the whole sentence.',
          examinerHint: 'Two consecutive words only.',
          alternativeAccept: ['Nasal spray'],
          memoryTrick: '🧠 "Nasal = nose. Not swallowed."',
          mergedCorrection: `🧠 Memory Trick: "Nasal = nose. Not swallowed."\n\n📋 NSC Memo Answer:\nNasal spray`,
        },
      }],
    },

    // ============ PAPER 1: CARTOON ============
    {
      id: 'L1Q12',
      source: '2024 NSC P1, Q4.1.2',
      topicText: 'Punctuation in Cartoons',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 2',
        paragraphs: ['Mr Wilson stares at his new cell phone and says: "Wow!"'],
      },
      parts: [{
        part: '4.1.2',
        prompt: 'Identify the punctuation mark used in the following: Wow!',
        clue: '💡 Look at the very end of the word "Wow".',
        answer: 'Exclamation mark',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Exclamation mark',
        memoCorrection: {
          whatToCheck: 'Must identify the exclamation mark.',
          commonMistake: 'Learners say "exclamation point" (American).',
          examinerHint: 'The mark after "Wow" is "!".',
          alternativeAccept: ['Exclamation mark', '!'],
          memoryTrick: '🧠 "! = exclamation mark"',
          mergedCorrection: `🧠 Memory Trick: "! = exclamation mark"\n\n📋 NSC Memo Answer:\nExclamation mark`,
        },
      }],
    },
    {
      id: 'L1Q13',
      source: '2024 NSC P1, Q4.1.1',
      topicText: 'Mr Wilson — Finally Gave In',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 2',
        paragraphs: ['The caption reads: "Mr Wilson finally gave in and got a cellphone."'],
      },
      parts: [{
        part: '4.1.1',
        prompt: 'The words "finally gave in" suggest that Mr Wilson is usually ... A obliging. B stubborn. C agreeable. D unfriendly.',
        clue: '💡 If it took him long to give in, he must be...',
        answer: 'B — stubborn',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'B / stubborn',
        memoCorrection: {
          whatToCheck: 'Must choose B.',
          commonMistake: 'Learners choose D.',
          examinerHint: '"Gave in" = he resisted first.',
          alternativeAccept: ['B', 'stubborn'],
          memoryTrick: '🧠 "Finally gave in = stubborn before"',
          mergedCorrection: `🧠 Memory Trick: "Finally gave in = stubborn before"\n\n📋 NSC Memo Answer:\nB / stubborn`,
        },
      }],
    },
    {
      id: 'L1Q14',
      source: '2023 NSC P1, Q4.3',
      topicText: 'Contraction in Full',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'CARTOON — FRAME 5',
        paragraphs: ['Jon says: "Oh, okay, we\'ll play."'],
      },
      parts: [{
        part: '4.3',
        prompt: 'Rewrite the underlined contraction in full: "Oh, okay, we\'ll play."',
        clue: '💡 "We\'ll" = two words shortened into one.',
        answer: 'we will / we shall',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'we will / we shall',
        memoCorrection: {
          whatToCheck: 'Must write the full form.',
          commonMistake: 'Learners write "we will" only.',
          examinerHint: 'Contraction = shortened form.',
          alternativeAccept: ['we will', 'we shall'],
          memoryTrick: '🧠 "\'ll = will / shall"',
          mergedCorrection: `🧠 Memory Trick: "\'ll = will / shall"\n\n📋 NSC Memo Answer:\nwe will / we shall`,
        },
      }],
    },

    // ============ PAPER 1: GRAMMAR ============
    {
      id: 'L1Q15',
      source: '2023 NSC P1, Q5.1.2',
      topicText: 'Tag Question',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT F — BEEKEEPING',
        paragraphs: ['Beekeepers ensure that their bees are safe, ...?'],
      },
      parts: [{
        part: '5.1.2',
        prompt: 'Complete the tag question: Beekeepers ensure that their bees are safe, ...?',
        clue: '💡 Positive sentence → negative tag. Match the verb.',
        answer: "don't they / do they not",
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: "don't they / do they not",
        memoCorrection: {
          whatToCheck: 'Must use "don\'t they".',
          commonMistake: 'Learners use "isn\'t it".',
          examinerHint: 'Positive sentence → negative tag.',
          alternativeAccept: ["don't they", 'do they not'],
          memoryTrick: '🧠 "Positive = negative tag"',
          mergedCorrection: `🧠 Memory Trick: "Positive = negative tag"\n\n📋 NSC Memo Answer:\ndon't they / do they not`,
        },
      }],
    },
    {
      id: 'L1Q16',
      source: '2024 NSC P1, Q5.1.2',
      topicText: 'Tag Question — Sinutab',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT F — SIMBA CHIPS',
        paragraphs: ['It is a perfect filler before a braai, ...?'],
      },
      parts: [{
        part: '5.1.2',
        prompt: 'Complete the following tag question: It is a perfect filler before a braai, ...?',
        clue: '💡 Match the verb "is".',
        answer: "isn't it / is it not",
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: "isn't it / is it not",
        memoCorrection: {
          whatToCheck: 'Must use "isn\'t it".',
          commonMistake: 'Learners use "doesn\'t it".',
          examinerHint: 'Match the verb of the sentence.',
          alternativeAccept: ["isn't it", 'is it not'],
          memoryTrick: '🧠 "Match the verb in the tag"',
          mergedCorrection: `🧠 Memory Trick: "Match the verb in the tag"\n\n📋 NSC Memo Answer:\nisn't it / is it not`,
        },
      }],
    },
    {
      id: 'L1Q17',
      source: '2023 NSC P1, Q5.1.5',
      topicText: 'Synonym for Rescue',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'TEXT F — BEEKEEPING',
        paragraphs: ['Boucher rescues swarms that need to be removed.'],
      },
      parts: [{
        part: '5.1.5',
        prompt: 'Provide a synonym for the underlined word: Boucher RESCUES swarms.',
        clue: '💡 Synonym = same meaning. Think: save, help, free.',
        answer: 'saves / helps / frees',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'saves / helps / frees',
        memoCorrection: {
          whatToCheck: 'Must give a synonym.',
          commonMistake: 'Learners give the antonym.',
          examinerHint: 'Synonym = same meaning.',
          alternativeAccept: ['saves', 'helps', 'frees', 'liberates'],
          memoryTrick: '🧠 "Synonym = same. Antonym = opposite."',
          mergedCorrection: `🧠 Memory Trick: "Synonym = same. Antonym = opposite."\n\n📋 NSC Memo Answer:\nsaves / helps / frees`,
        },
      }],
    },
    {
      id: 'L1Q18',
      source: '2024 NSC P1, Q5.2.2',
      topicText: 'Form of "Create"',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT G — GOOGLE',
        paragraphs: ['Google is the (create) of two university students.'],
      },
      parts: [{
        part: '5.2.2',
        prompt: 'Give the correct form of the word in brackets: Google is the (create) of two university students.',
        clue: '💡 A thing that is created = a noun.',
        answer: 'creation',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'creation',
        memoCorrection: {
          whatToCheck: 'Must give "creation".',
          commonMistake: 'Learners write "creator".',
          examinerHint: 'Google is a thing, not a person → "creation".',
          alternativeAccept: ['creation'],
          memoryTrick: '🧠 "Thing = creation. Person = creator."',
          mergedCorrection: `🧠 Memory Trick: "Thing = creation. Person = creator."\n\n📋 NSC Memo Answer:\ncreation`,
        },
      }],
    },

    // ============ PAPER 2: CRY, THE BELOVED COUNTRY ============
    {
      id: 'L1Q19',
      source: '2023 NSC P2, Q1.1.1',
      topicText: 'Match the Character — Arthur',
      teachTopic: 'cry-characters',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A',
        paragraphs: ['[Stephen goes to see John.]', 'He growled, and his voice grew deep, it was like thunder that was rolling.'],
      },
      parts: [{
        part: '1.1.1',
        prompt: 'Match Arthur with the correct description. Column B: A convicted murderer, B brilliant orator, C bereaved father, D known activist, E compassionate priest.',
        clue: '💡 Who is Arthur in the novel? What was he known for?',
        answer: 'D — a known activist',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'D/a known activist',
        memoCorrection: {
          whatToCheck: 'Must be D.',
          commonMistake: 'Learners confuse Arthur with Absalom.',
          examinerHint: 'Arthur Jarvis = activist for racial justice.',
          alternativeAccept: ['D', 'a known activist'],
          memoryTrick: '🧠 "Arthur = activist. Absalom = accused."',
          mergedCorrection: `🧠 Memory Trick: "Arthur = activist. Absalom = accused."\n\n📋 NSC Memo Answer:\nD/a known activist`,
        },
      }],
    },
    {
      id: 'L1Q20',
      source: '2024 NSC P2, Q1.1.3',
      topicText: 'Mrs Kumalo\'s Tone',
      teachTopic: 'cry-characters',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A (2024)',
        paragraphs: ['- How should I know, Stephen?', '- No, that I do not know. Look at it.'],
      },
      parts: [{
        part: '1.1.3',
        prompt: 'What tone would Mrs Kumalo use in the line "How should I know, Stephen?"',
        clue: '💡 She does not know who wrote the letter.',
        answer: 'Confused / questioning / nervous',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Confused/questioning/nervous',
        memoCorrection: {
          whatToCheck: 'Must describe her uncertainty.',
          commonMistake: 'Learners say "angry".',
          examinerHint: 'She does not know who the letter is from.',
          alternativeAccept: ['confused', 'questioning', 'nervous'],
          memoryTrick: '🧠 "Unsure of letter = confused"',
          mergedCorrection: `🧠 Memory Trick: "Unsure of letter = confused"\n\n📋 NSC Memo Answer:\nConfused/questioning/nervous`,
        },
      }],
    },
    {
      id: 'L1Q21',
      source: '2025 NSC P2, Q1.1.4',
      topicText: 'Kumalo\'s Shock',
      teachTopic: 'cry-characters',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A (2025)',
        paragraphs: ['Kumalo discovers that his brother John is politically active.'],
      },
      parts: [{
        part: '1.1.4',
        prompt: 'What tone would Kumalo use when he discovers John is into politics?',
        clue: '💡 He did not expect this.',
        answer: 'Surprise / shock / astonishment',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Surprise/shock/astonishment',
        memoCorrection: {
          whatToCheck: 'Must describe unexpected discovery.',
          commonMistake: 'Learners say "anger".',
          examinerHint: 'Total disbelief.',
          alternativeAccept: ['surprise', 'shock', 'astonishment'],
          memoryTrick: '🧠 "Unexpected news = shock"',
          mergedCorrection: `🧠 Memory Trick: "Unexpected news = shock"\n\n📋 NSC Memo Answer:\nSurprise/shock/astonishment`,
        },
      }],
    },

    // ============ PAPER 2: DR JEKYLL AND MR HYDE ============
    {
      id: 'L1Q22',
      source: '2023 NSC P2, Q2.1.1',
      topicText: 'Match: Carew',
      teachTopic: 'jekyll-characters',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C',
        paragraphs: ['[Mr Utterson receives a visitor.]', 'Guest\'s eyes brightened, and he sat down at once and studied it with passion.'],
      },
      parts: [{
        part: '2.1.1',
        prompt: 'Match Carew with the correct description. Column B: A Jekyll\'s walking companion, B Jekyll\'s professional rival, C innocent victim of murder, D Jekyll\'s loyal servant, E a violent, unremorseful person.',
        clue: '💡 What happens to Sir Danvers Carew?',
        answer: 'C — innocent victim of murder',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'C/innocent victim of murder',
        memoCorrection: {
          whatToCheck: 'Must be C.',
          commonMistake: 'Learners confuse Carew with Lanyon.',
          examinerHint: 'Carew is murdered by Hyde.',
          alternativeAccept: ['C', 'innocent victim'],
          memoryTrick: '🧠 "Carew = killed by Hyde"',
          mergedCorrection: `🧠 Memory Trick: "Carew = killed by Hyde"\n\n📋 NSC Memo Answer:\nC/innocent victim of murder`,
        },
      }],
    },
    {
      id: 'L1Q23',
      source: '2023 NSC P2, Q2.2.5',
      topicText: 'Jekyll\'s Servant',
      teachTopic: 'jekyll-characters',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT D',
        paragraphs: ['I took and furnished that house in Soho...'],
      },
      parts: [{
        part: '2.2.5',
        prompt: 'One of Dr Jekyll\'s servants is ... A Guest. B Poole. C Newcomen. D Enfield.',
        clue: '💡 Who looks after Jekyll\'s house?',
        answer: 'B — Poole',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'B/Poole',
        memoCorrection: {
          whatToCheck: 'Must be B.',
          commonMistake: 'Learners pick Guest — he is a clerk.',
          examinerHint: 'Poole = Jekyll\'s butler.',
          alternativeAccept: ['B', 'Poole'],
          memoryTrick: '🧠 "Poole = the butler"',
          mergedCorrection: `🧠 Memory Trick: "Poole = the butler"\n\n📋 NSC Memo Answer:\nB/Poole`,
        },
      }],
    },
    {
      id: 'L1Q24',
      source: '2025 NSC P2, Q2.1.4',
      topicText: 'Figure of Speech — Screw',
      teachTopic: 'jekyll-context',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C (2025)',
        paragraphs: ['Mr Hyde has to pay compensation for the trauma he caused by trampling on the girl.'],
      },
      parts: [{
        part: '2.1.4',
        prompt: 'Identify the figure of speech used when describing pressure being applied like tightening a screw.',
        clue: '💡 Something is compared without using "like" or "as".',
        answer: 'Metaphor',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Metaphor',
        memoCorrection: {
          whatToCheck: 'Must be metaphor.',
          commonMistake: 'Learners write "simile".',
          examinerHint: 'No "like" or "as" = metaphor.',
          alternativeAccept: ['Metaphor'],
          memoryTrick: '🧠 "Simile says LIKE. Metaphor says IS."',
          mergedCorrection: `🧠 Memory Trick: "Simile says LIKE. Metaphor says IS."\n\n📋 NSC Memo Answer:\nMetaphor`,
        },
      }],
    },

    // ============ PAPER 2: MACBETH ============
    {
      id: 'L1Q25',
      source: '2023 NSC P2, Q3.1.1',
      topicText: 'Match: Duncan',
      teachTopic: 'macbeth-characters',
      passageConfig: {
        label: 'MACBETH — EXTRACT E',
        paragraphs: ['[Duncan, his sons and noblemen are travelling.]', 'BANQUO: This guest of summer, the temple-haunting martlet...'],
      },
      parts: [{
        part: '3.1.1',
        prompt: 'Match Duncan with the correct description. Column B: A nobleman of Scotland, B attendant to Macbeth, C son of Duncan, D an army general, E king of Scotland.',
        clue: '💡 What is Duncan\'s role in the play?',
        answer: 'E — king of Scotland',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'E/king of Scotland',
        memoCorrection: {
          whatToCheck: 'Must be E.',
          commonMistake: 'Learners confuse Duncan with Malcolm.',
          examinerHint: 'Duncan is king; Malcolm is his son.',
          alternativeAccept: ['E', 'king of Scotland'],
          memoryTrick: '🧠 "Duncan = king. Malcolm = heir."',
          mergedCorrection: `🧠 Memory Trick: "Duncan = king. Malcolm = heir."\n\n📋 NSC Memo Answer:\nE/king of Scotland`,
        },
      }],
    },
    {
      id: 'L1Q26',
      source: '2024 NSC P2, Q3.2.1',
      topicText: 'Macbeth\'s Guilt Metaphor',
      teachTopic: 'macbeth-themes',
      passageConfig: {
        label: 'MACBETH — EXTRACT F (2024)',
        paragraphs: ['MACBETH: But get thee back; my soul is too much charged with blood of thine already.'],
      },
      parts: [{
        part: '3.2.1',
        prompt: 'Identify the figure of speech used in "my soul is too much charged with blood of thine already".',
        clue: '💡 Blood represents guilt — not literal.',
        answer: 'Metaphor',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Metaphor',
        memoCorrection: {
          whatToCheck: 'Must be metaphor.',
          commonMistake: 'Learners write "simile".',
          examinerHint: 'No "like"/"as" = metaphor.',
          alternativeAccept: ['Metaphor'],
          memoryTrick: '🧠 "Blood = guilt (metaphor)"',
          mergedCorrection: `🧠 Memory Trick: "Blood = guilt (metaphor)"\n\n📋 NSC Memo Answer:\nMetaphor`,
        },
      }],
    },
    {
      id: 'L1Q27',
      source: '2025 NSC P2, Q3.1.5',
      topicText: 'The Guards',
      teachTopic: 'macbeth-plot',
      passageConfig: {
        label: 'MACBETH — EXTRACT E (2025)',
        paragraphs: ['The guards have been intoxicated with alcohol and the scene is set for Duncan\'s murder.'],
      },
      parts: [{
        part: '3.1.5',
        prompt: 'Who are the guards in this extract? A guests, B witches, C guards, D Banquo\'s ghost.',
        clue: '💡 Who has been drinking and is asleep outside Duncan\'s room?',
        answer: 'C — the guards',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'C/guards',
        memoCorrection: {
          whatToCheck: 'Must be C.',
          commonMistake: 'Learners overthink it.',
          examinerHint: 'The guards are drugged and asleep.',
          alternativeAccept: ['C', 'guards'],
          memoryTrick: '🧠 "Drunk guards = Macbeth\'s excuse"',
          mergedCorrection: `🧠 Memory Trick: "Drunk guards = Macbeth's excuse"\n\n📋 NSC Memo Answer:\nC/guards`,
        },
      }],
    },

    // ============ PAPER 2: MY CHILDREN! MY AFRICA! ============
    {
      id: 'L1Q28',
      source: '2023 NSC P2, Q4.1.1',
      topicText: 'Match: Isabel',
      teachTopic: 'mcma-characters',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G',
        paragraphs: ['[Isabel invites Mr M and Thami to meet her parents.]'],
      },
      parts: [{
        part: '4.1.1',
        prompt: 'Match Isabel with the correct description. Column B: A Zolile High Grade 12 learner, B principal of Zolile High, C inspector of Bantu schools, D learner at Camdeboo High, E Zolile High Grade 8 learner.',
        clue: '💡 Which school does Isabel attend?',
        answer: 'D — a learner at Camdeboo High',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'D/a learner at Camdeboo High',
        memoCorrection: {
          whatToCheck: 'Must be D.',
          commonMistake: 'Learners confuse Camdeboo and Zolile.',
          examinerHint: 'Isabel is from Camdeboo Girls\' High.',
          alternativeAccept: ['D', 'learner at Camdeboo High'],
          memoryTrick: '🧠 "Isabel = Camdeboo. Thami = Zolile."',
          mergedCorrection: `🧠 Memory Trick: "Isabel = Camdeboo. Thami = Zolile."\n\n📋 NSC Memo Answer:\nD/a learner at Camdeboo High`,
        },
      }],
    },
    {
      id: 'L1Q29',
      source: '2024 NSC P2, Q4.1.3',
      topicText: 'Thami\'s Favourite Sport',
      teachTopic: 'mcma-characters',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G (2024)',
        paragraphs: ['THAMI: Amos and Lilian Mbikawa. They\'re in Cape Town.'],
      },
      parts: [{
        part: '4.1.3',
        prompt: 'What is Thami\'s favourite sport?',
        clue: '💡 He mentions it when talking about himself.',
        answer: 'Soccer',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Soccer',
        memoCorrection: {
          whatToCheck: 'Must be soccer.',
          commonMistake: 'Learners say "rugby".',
          examinerHint: 'Thami loves soccer.',
          alternativeAccept: ['Soccer'],
          memoryTrick: '🧠 "Thami = soccer"',
          mergedCorrection: `🧠 Memory Trick: "Thami = soccer"\n\n📋 NSC Memo Answer:\nSoccer`,
        },
      }],
    },
    {
      id: 'L1Q30',
      source: '2024 NSC P2, Q4.1.4',
      topicText: 'Where Auntie Lives',
      teachTopic: 'mcma-characters',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G (2024)',
        paragraphs: ['ISABEL: Auntie, our maid, put down in front of me a plate of steaming, delicious Jungle Oats.'],
      },
      parts: [{
        part: '4.1.4',
        prompt: 'Auntie lives in ... A Cradock. B Brakwater. C Camdeboo. D Cookhouse.',
        clue: '💡 Where is the township in the play?',
        answer: 'B — Brakwater',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'B/Brakwater',
        memoCorrection: {
          whatToCheck: 'Must be B.',
          commonMistake: 'Learners mix up Camdeboo (school) with Brakwater (township).',
          examinerHint: 'Brakwater = the township.',
          alternativeAccept: ['B', 'Brakwater'],
          memoryTrick: '🧠 "Brakwater = township. Camdeboo = school."',
          mergedCorrection: `🧠 Memory Trick: "Brakwater = township. Camdeboo = school."\n\n📋 NSC Memo Answer:\nB/Brakwater`,
        },
      }],
    },

    // ============ PAPER 2: SHORT STORIES ============
    {
      id: 'L1Q31',
      source: '2023 NSC P2, Q5.2.3',
      topicText: 'Eveline\'s Love',
      teachTopic: 'short-stories-characters',
      passageConfig: {
        label: 'EVELINE — EXTRACT J',
        paragraphs: ['[Eveline reflects on her decision.]', 'Then she would be married — she, Eveline.'],
      },
      parts: [{
        part: '5.2.3',
        prompt: 'Eveline falls in love with a ... A soldier. B lawyer. C teacher. D sailor.',
        clue: '💡 What does Frank do?',
        answer: 'D — sailor',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'D/sailor',
        memoCorrection: {
          whatToCheck: 'Must be D.',
          commonMistake: 'Learners pick "soldier".',
          examinerHint: 'Frank is a sailor.',
          alternativeAccept: ['D', 'sailor'],
          memoryTrick: '🧠 "Frank = sailor"',
          mergedCorrection: `🧠 Memory Trick: "Frank = sailor"\n\n📋 NSC Memo Answer:\nD/sailor`,
        },
      }],
    },
    {
      id: 'L1Q32',
      source: '2024 NSC P2, Q5.2.3',
      topicText: 'Friedman\'s Phase',
      teachTopic: 'short-stories-characters',
      passageConfig: {
        label: 'THE WIND AND A BOY — EXTRACT J (2024)',
        paragraphs: ['Almost overnight he turned into a tall spindly-legged, graceful gazelle with large, grave eyes.'],
      },
      parts: [{
        part: '5.2.3',
        prompt: 'Friedman turned from a ... in his second phase into a "graceful gazelle" in his third phase. A toddler, B teenager, C new-born, D grown-up.',
        clue: '💡 What comes just before becoming a graceful gazelle?',
        answer: 'A — toddler',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'A/toddler',
        memoCorrection: {
          whatToCheck: 'Must be A.',
          commonMistake: 'Learners pick teenager.',
          examinerHint: 'Second phase = toddler.',
          alternativeAccept: ['A', 'toddler'],
          memoryTrick: '🧠 "Phase 2 = toddler"',
          mergedCorrection: `🧠 Memory Trick: "Phase 2 = toddler"\n\n📋 NSC Memo Answer:\nA/toddler`,
        },
      }],
    },
    {
      id: 'L1Q33',
      source: '2025 NSC P2, Q5.2.1',
      topicText: 'Eveline\'s Suffering',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'EVELINE — EXTRACT (2025)',
        paragraphs: ['Eveline lives with her father in Dublin.'],
      },
      parts: [{
        part: '5.2.1',
        prompt: 'What causes Eveline\'s suffering at home? A father\'s verbal abuse.',
        clue: '💡 Where does the pain come from?',
        answer: 'A — father\'s verbal abuse',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'A/father\'s verbal abuse',
        memoCorrection: {
          whatToCheck: 'Must be A.',
          commonMistake: 'Learners pick "poverty".',
          examinerHint: 'Her father threatens her.',
          alternativeAccept: ['A', 'father\'s verbal abuse'],
          memoryTrick: '🧠 "Eveline suffers from her father"',
          mergedCorrection: `🧠 Memory Trick: "Eveline suffers from her father"\n\n📋 NSC Memo Answer:\nA/father's verbal abuse`,
        },
      }],
    },

    // ============ PAPER 2: POETRY ============
    {
      id: 'L1Q34',
      source: '2023 NSC P2, Q6.1.1',
      topicText: 'Sonnet 73 — Form',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
          'Bare ruined choirs where late the sweet birds sang.',
          'In me thou seest the twilight of such day',
          'As after sunset fadeth in the west,',
          'Which by and by black night doth take away,',
          'Death\'s second self, that seals up all in rest.',
          'In me thou seest the glowing of such fire',
          'That on the ashes of his youth doth lie,',
          'As the deathbed whereon it must expire,',
          'Consumed with that which it was nourished by.',
          'This thou perceiv\'st, which makes thy love more strong,',
          'To love that well which thou must leave ere long.',
        ],
      },
      parts: [{
        part: '6.1.1',
        prompt: 'This is a typical ... sonnet, consisting of three ... and a rhyming ... with a rhyme scheme of ...',
        clue: '💡 Which type of sonnet has 3 quatrains + 1 couplet?',
        answer: 'Elizabethan / quatrains / couplet / abab cdcd efef gg',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Elizabethan / quatrains / couplet / abab cdcd efef gg',
        memoCorrection: {
          whatToCheck: 'Must identify Elizabethan sonnet form.',
          commonMistake: 'Learners write "Petrarchan" — that has an octave + sestet.',
          examinerHint: '3 quatrains + 1 couplet = Elizabethan/Shakespearean.',
          alternativeAccept: ['Elizabethan', 'quatrains', 'couplet', 'abab cdcd efef gg'],
          memoryTrick: '🧠 "Elizabethan = 3 quatrains + couplet"',
          mergedCorrection: `🧠 Memory Trick: "Elizabethan = 3 quatrains + couplet"\n\n📋 NSC Memo Answer:\nElizabethan / quatrains / couplet / abab cdcd efef gg`,
        },
      }],
    },
    {
      id: 'L1Q35',
      source: '2023 NSC P2, Q6.2.5',
      topicText: 'Sound Device — Innisfree',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, and go to Innisfree,',
          'And a small cabin build there, of clay and wattles made:',
          'Nine bean-rows will I have there, a hive for the honey-bee,',
          'And live alone in the bee-loud glade.',
          'And I shall have some peace there, for peace comes dropping slow,',
          'Dropping from the veils of the morning to where the cricket sings;',
          'There midnight\'s all a glimmer, and noon a purple glow,',
          'And evening full of the linnet\'s wings.',
          'I will arise and go now, for always night and day',
          'I hear lake water lapping with low sounds by the shore;',
          'While I stand on the roadway, or on the pavements grey,',
          'I hear it in the deep heart\'s core.',
        ],
      },
      parts: [{
        part: '6.2.5',
        prompt: '"I hear lake water lapping with low sounds by the shore" is an example of ... A synecdoche. B onomatopoeia. C repetition. D metonymy.',
        clue: '💡 "Lapping" sounds like water.',
        answer: 'B — onomatopoeia',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'B/onomatopoeia',
        memoCorrection: {
          whatToCheck: 'Must choose B.',
          commonMistake: 'Learners pick "repetition" — words repeat but the sound device is different.',
          examinerHint: 'Onomatopoeia = sound words.',
          alternativeAccept: ['B', 'onomatopoeia'],
          memoryTrick: '🧠 "Onomatopoeia = sounds like the thing"',
          mergedCorrection: `🧠 Memory Trick: "Onomatopoeia = sounds like the thing"\n\n📋 NSC Memo Answer:\nB/onomatopoeia`,
        },
      }],
    },
    {
      id: 'L1Q36',
      source: '2024 NSC P2, Q6.2.6',
      topicText: 'Sound Device — Hard to Find',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'Hard to Find',
        poet: 'Sinesipo Jojo',
        lines: [
          'Words are everywhere',
          'daily',
          'we read them, and they fly out',
          'like nobody\'s business when we are provoked ...',
          'but there\'s always something hard to understand ...',
          'they are hard to find',
          'when they are needed by the heart;',
        ],
      },
      parts: [{
        part: '6.2.6',
        prompt: '"as the raindrops slowly slide down" is an example of ... A assonance. B alliteration. C repetition. D onomatopoeia.',
        clue: '💡 Listen to the "s" and "d" sounds.',
        answer: 'B — alliteration',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'B/alliteration',
        memoCorrection: {
          whatToCheck: 'Must choose B.',
          commonMistake: 'Learners pick assonance — that is vowel sounds, not consonants.',
          examinerHint: 'Alliteration = repeated consonant sounds.',
          alternativeAccept: ['B', 'alliteration'],
          memoryTrick: '🧠 "Alliteration = same consonant. Assonance = same vowel."',
          mergedCorrection: `🧠 Memory Trick: "Alliteration = same consonant. Assonance = same vowel."\n\n📋 NSC Memo Answer:\nB/alliteration`,
        },
      }],
    },
    {
      id: 'L1Q37',
      source: '2024 NSC P2, Q6.1.4',
      topicText: 'Slave Dealer — Metaphor',
      teachTopic: 'poetry-imagery',
      poemConfig: {
        title: 'The Slave Dealer',
        poet: 'Thomas Pringle',
        lines: [
          'From ocean\'s wave a Wanderer came,',
          'With visage tanned and dun:',
          'His Mother, when he told his name,',
          'Scarce knew her long-lost son;',
          'So altered was his face and frame',
          'By the ill course he had run.',
          'There was hot fever in his blood,',
          'And dark thoughts in his brain;',
        ],
      },
      parts: [{
        part: '6.1.4',
        prompt: 'Identify the figure of speech used in line 7: "There was hot fever in his blood".',
        clue: '💡 Is it literal fever, or a metaphor for guilt?',
        answer: 'Metaphor',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Metaphor',
        memoCorrection: {
          whatToCheck: 'Must be metaphor.',
          commonMistake: 'Learners write "simile".',
          examinerHint: 'No "like"/"as" = metaphor.',
          alternativeAccept: ['Metaphor'],
          memoryTrick: '🧠 "Fever in blood = guilt (metaphor)"',
          mergedCorrection: `🧠 Memory Trick: "Fever in blood = guilt (metaphor)"\n\n📋 NSC Memo Answer:\nMetaphor`,
        },
      }],
    },
    {
      id: 'L1Q38',
      source: '2025 NSC P2, Q6.1.4',
      topicText: 'Sound Device — Inversnaid',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'Inversnaid',
        poet: 'Gerard Manley Hopkins',
        lines: [
          'This darksome burn, horseback brown,',
          'His rollrock highroad roaring down,',
          'In coop and in comb the fleece of his foam',
          'Flutes and low to the lake falls home.',
          'A windpuff-bonnet of fawn-froth',
          'Turns and twindles over the broth',
          'Of a pool so pitchblack, fell-frowning,',
          'It rounds and rounds Despair to drowning.',
        ],
      },
      parts: [{
        part: '6.1.4',
        prompt: 'Identify the sound device used in "rollrock highroad roaring down".',
        clue: '💡 Repeated consonant sounds at the start of words.',
        answer: 'Alliteration / Assonance',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'Alliteration/Assonance',
        memoCorrection: {
          whatToCheck: 'Must identify the repetition of sounds.',
          commonMistake: 'Learners write "onomatopoeia".',
          examinerHint: 'Repeated "r" sound = alliteration.',
          alternativeAccept: ['Alliteration', 'Assonance'],
          memoryTrick: '🧠 "Repeated sounds = alliteration"',
          mergedCorrection: `🧠 Memory Trick: "Repeated sounds = alliteration"\n\n📋 NSC Memo Answer:\nAlliteration/Assonance`,
        },
      }],
    },
    {
      id: 'L1Q39',
      source: '2025 NSC P2, Q6.1.2',
      topicText: 'Inversnaid — Water Colour',
      teachTopic: 'poetry-imagery',
      poemConfig: {
        title: 'Inversnaid',
        poet: 'Gerard Manley Hopkins',
        lines: [
          'This darksome burn, horseback brown,',
          'His rollrock highroad roaring down,',
        ],
      },
      parts: [{
        part: '6.1.2',
        prompt: 'What does the description of the water as "horseback brown" suggest about the water?',
        clue: '💡 What colour is it? Is it clean or dirty?',
        answer: 'The water is a dark brown colour / possibly contains dirt or mud.',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'The water is a (dark) brown colour/possibly contains dirt/mud.',
        memoCorrection: {
          whatToCheck: 'Must describe the colour.',
          commonMistake: 'Learners say "it is dirty" without linking to colour.',
          examinerHint: 'Brown = the colour of the water.',
          alternativeAccept: ['Dark brown', 'Muddy brown'],
          memoryTrick: '🧠 "Horseback brown = muddy water"',
          mergedCorrection: `🧠 Memory Trick: "Horseback brown = muddy water"\n\n📋 NSC Memo Answer:\nThe water is a (dark) brown colour/possibly contains dirt/mud.`,
        },
      }],
    },
    {
      id: 'L1Q40',
      source: '2025 NSC P2, Q6.2.1',
      topicText: 'Sonnet 73 — Season',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
          'Bare ruined choirs where late the sweet birds sang.',
        ],
      },
      parts: [{
        part: '6.2.1',
        prompt: 'The line "When yellow leaves, or none, or few, do hang" refers to which season? A spring, B summer, C autumn, D winter.',
        clue: '💡 Yellow leaves hanging = which season?',
        answer: 'D — winter',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: 'D/winter',
        memoCorrection: {
          whatToCheck: 'Must choose D.',
          commonMistake: 'Learners pick autumn — leaves yellow in autumn but the "shake against the cold" indicates winter.',
          examinerHint: 'Yellow leaves + cold = late autumn/winter.',
          alternativeAccept: ['D', 'winter'],
          memoryTrick: '🧠 "Yellow leaves + cold = winter"',
          mergedCorrection: `🧠 Memory Trick: "Yellow leaves + cold = winter"\n\n📋 NSC Memo Answer:\nD/winter`,
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 2 — Short answer (2 marks)
  // ================================================================
  level2: [
    {
      id: 'L2Q1',
      source: '2023 NSC P1, Q1.2.1',
      topicText: 'Why Mention Dr Christie',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 2',
        paragraphs: ['"Clothing overconsumption is on the rise in Africa," says Dr Lorna Christie, researcher at CAES.'],
      },
      parts: [{
        part: '1.2.1',
        prompt: 'Why does the writer mention Dr Lorna Christie? State TWO points.',
        clue: '💡 What makes an article credible? Who is she?',
        answer: 'She conducts research and her findings give credibility.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'She conducts research (on fashion).\nHer findings provide credibility to the article.',
        memoCorrection: {
          whatToCheck: 'Must give TWO separate points.',
          commonMistake: 'Learners give only one point.',
          examinerHint: 'She is a researcher — she gives the article authority.',
          alternativeAccept: ['She is a researcher', 'She gives credibility'],
          memoryTrick: '🧠 "Expert = credibility"',
          mergedCorrection: `🧠 Memory Trick: "Expert = credibility"\n\n📋 NSC Memo Answer:\nShe conducts research on fashion.\nHer findings provide credibility to the article.`,
        },
      }],
    },
    {
      id: 'L2Q2',
      source: '2023 NSC P1, Q1.4.2',
      topicText: 'Shopping Habits Changed',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 4',
        paragraphs: ['People are buying more garments than in the past, and they only keep the clothes for half as long.'],
      },
      parts: [{
        part: '1.4.2',
        prompt: 'Using your OWN words, describe how the shopping habits of consumers have changed over time.',
        clue: '💡 What are people doing MORE of? What are they doing FASTER?',
        answer: 'People buy more clothing and throw it away faster.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'People are buying more clothing and discarding them faster.',
        memoCorrection: {
          whatToCheck: 'Must describe BOTH buying more AND discarding faster.',
          commonMistake: 'Learners only describe one side of the change.',
          examinerHint: 'Two changes: buying MORE, keeping LESS.',
          alternativeAccept: ['Buy more, throw away faster'],
          memoryTrick: '🧠 "More in, less kept"',
          mergedCorrection: `🧠 Memory Trick: "More in, less kept"\n\n📋 NSC Memo Answer:\nPeople are buying more clothing and discarding them faster.`,
        },
      }],
    },
    {
      id: 'L2Q3',
      source: '2025 NSC P1, Q1.2.2',
      topicText: 'IFPI Credibility',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — SA MUSIC',
        paragraphs: ['IFPI, the international music body, confirms this trend.'],
      },
      parts: [{
        part: '1.2.2',
        prompt: 'Why does the writer mention IFPI? State TWO points.',
        clue: '💡 What does an international body do for a claim?',
        answer: 'IFPI is a reputable international body and its mention lends credibility to the data.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'IFPI is a reputable international body.\nIts mention lends credibility to the data.',
        memoCorrection: {
          whatToCheck: 'Must give TWO points.',
          commonMistake: 'Learners give one point only.',
          examinerHint: 'Expert body = credibility.',
          alternativeAccept: ['Reputable body', 'Lends credibility'],
          memoryTrick: '🧠 "Expert body = credibility"',
          mergedCorrection: `🧠 Memory Trick: "Expert body = credibility"\n\n📋 NSC Memo Answer:\nIFPI is a reputable international body and its mention lends credibility to the data.`,
        },
      }],
    },
    {
      id: 'L2Q4',
      source: '2025 NSC P1, Q1.5.2',
      topicText: 'Fusion of Music',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — SA MUSIC',
        paragraphs: ['South African music is a fusion of different types of music and cultures, creating a unique sound.'],
      },
      parts: [{
        part: '1.5.2',
        prompt: 'What does "fusion" mean in the context of South African music? State TWO points.',
        clue: '💡 Fusion = mixing things together.',
        answer: 'A mixture of different types of music and a mixture of cultures.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'A mixture of different types of music.\nA mixture of cultures.',
        memoCorrection: {
          whatToCheck: 'Must mention mixing of BOTH music and cultures.',
          commonMistake: 'Learners give one point only.',
          examinerHint: 'Fusion = mixing. Music + cultures.',
          alternativeAccept: ['Mixture of music', 'Mixture of cultures'],
          memoryTrick: '🧠 "Fusion = mix music + cultures"',
          mergedCorrection: `🧠 Memory Trick: "Fusion = mix music + cultures"\n\n📋 NSC Memo Answer:\nA mixture of different types of music.\nA mixture of cultures.`,
        },
      }],
    },
    {
      id: 'L2Q5',
      source: '2023 NSC P1, Q1.10',
      topicText: 'Least Water for Agriculture',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — PIE CHARTS (WATER USE)',
        paragraphs: ['Five pie charts show water use for different purposes across five continents. Europe shows 32% agricultural use — the lowest.'],
      },
      parts: [{
        part: '1.10',
        prompt: 'Identify the continent which uses the least amount of water for agricultural purposes. Give a reason.',
        clue: '💡 Compare the shaded slices. Which is smallest?',
        answer: 'Europe — the agricultural slice (32%) is the smallest.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Europe. The section of the pie graph which represents Agricultural use is the smallest (32%).',
        memoCorrection: {
          whatToCheck: 'Must name the continent AND give a reason.',
          commonMistake: 'Learners name the continent but do not justify.',
          examinerHint: 'Name + figure.',
          alternativeAccept: ['Europe — 32% lowest'],
          memoryTrick: '🧠 "Smallest slice = least use"',
          mergedCorrection: `🧠 Memory Trick: "Smallest slice = least use"\n\n📋 NSC Memo Answer:\nEurope. The section for Agricultural use is the smallest (32%).`,
        },
      }],
    },
    {
      id: 'L2Q6',
      source: '2023 NSC P1, Q1.11',
      topicText: 'What 48% Suggests',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — PIE CHARTS (WATER USE)',
        paragraphs: ['North America\'s pie chart shows 48% industrial use.'],
      },
      parts: [{
        part: '1.11',
        prompt: 'What does 48% suggest about North America\'s water usage?',
        clue: '💡 Which category is 48%?',
        answer: 'North America uses the largest amount of water (48%) for industrial purposes.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'It suggests that North America uses the largest amount of water (48%) for industrial purposes.',
        memoCorrection: {
          whatToCheck: 'Must link the figure to industrial use.',
          commonMistake: 'Learners just say "48%".',
          examinerHint: '48% = industrial use.',
          alternativeAccept: ['Largest amount for industrial purposes'],
          memoryTrick: '🧠 "48% = industrial use in NA"',
          mergedCorrection: `🧠 Memory Trick: "48% = industrial use in NA"\n\n📋 NSC Memo Answer:\nNorth America uses the largest amount of water (48%) for industrial purposes.`,
        },
      }],
    },
    {
      id: 'L2Q7',
      source: '2024 NSC P1, Q1.10',
      topicText: 'Benefit of Reading — Visual 1',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — BENEFITS OF READING (VISUAL 1)',
        paragraphs: ['Visual 1 shows a brain character lifting weights and sweating.'],
      },
      parts: [{
        part: '1.10',
        prompt: 'Identify the suggested benefit of reading shown in visual 1. Give a reason.',
        clue: '💡 What is the brain doing?',
        answer: 'Reading is good exercise for your brain.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Reading is good exercise for your brain.\nThe visual of a brain lifting weights alludes to the importance of training your brain.',
        memoCorrection: {
          whatToCheck: 'Must state the benefit AND link it to the visual.',
          commonMistake: 'Learners describe the picture without naming the benefit.',
          examinerHint: 'Brain + weights = mental exercise.',
          alternativeAccept: ['Exercise for the brain'],
          memoryTrick: '🧠 "Brain + gym = mental workout"',
          mergedCorrection: `🧠 Memory Trick: "Brain + gym = mental workout"\n\n📋 NSC Memo Answer:\nReading is good exercise for your brain.`,
        },
      }],
    },
    {
      id: 'L2Q8',
      source: '2024 NSC P1, Q1.11',
      topicText: 'Light Bulb Meaning',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — BENEFITS OF READING (VISUAL 4)',
        paragraphs: ['Visual 4 shows a smiling emoticon with a raised finger and a lit light bulb above its head.'],
      },
      parts: [{
        part: '1.11',
        prompt: 'What does the light bulb above the emoticon suggest about reading? Give a reason.',
        clue: '💡 What does a light bulb usually represent?',
        answer: 'Reading gives people new ideas.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Reading gives people new ideas.\nThe light bulb represents creativity/bright ideas/solutions.',
        memoCorrection: {
          whatToCheck: 'Must link the light bulb to ideas.',
          commonMistake: 'Learners describe the light bulb without interpretation.',
          examinerHint: 'Light bulb = ideas, creativity.',
          alternativeAccept: ['New ideas', 'Creativity'],
          memoryTrick: '🧠 "Light bulb = ideas"',
          mergedCorrection: `🧠 Memory Trick: "Light bulb = ideas"\n\n📋 NSC Memo Answer:\nReading gives people new ideas.`,
        },
      }],
    },
    {
      id: 'L2Q9',
      source: '2023 NSC P1, Q3.1',
      topicText: 'Advertiser Techniques',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — HEADLINE',
        paragraphs: ['The headline reads: "CAUTION — FIRE DANGER." The letters appear cracked and the G in "DANGER" appears to be falling.'],
      },
      parts: [{
        part: '3.1',
        prompt: 'Refer to the headline. How does the advertiser attract the reader\'s attention? Give TWO points.',
        clue: '💡 Look at the font.',
        answer: 'Capital letters, bigger font, bold font, making letters appear "damaged".',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Using capital letters.\nUsing bigger font.\nUsing bold font.\nMaking the letters appear "damaged".',
        memoCorrection: {
          whatToCheck: 'Must give TWO techniques.',
          commonMistake: 'Learners say "big" without specifying.',
          examinerHint: 'Look at font, size, and letter style.',
          alternativeAccept: ['Capital letters', 'Bigger font', 'Bold font', 'Damaged letters'],
          memoryTrick: '🧠 "Capitals · Big · Bold · Damaged"',
          mergedCorrection: `🧠 Memory Trick: "Capitals · Big · Bold · Damaged"\n\n📋 NSC Memo Answer:\nUsing capital letters. Using bigger font. Using bold font. Making the letters appear "damaged".`,
        },
      }],
    },
    {
      id: 'L2Q10',
      source: '2023 NSC P1, Q3.4',
      topicText: 'Why Telephone Numbers',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — DISTRICT EMERGENCY NUMBERS',
        paragraphs: ['The ad lists multiple emergency phone numbers.'],
      },
      parts: [{
        part: '3.4',
        prompt: 'How does the inclusion of various telephone numbers support the message? State TWO points.',
        clue: '💡 What do the numbers let the reader DO?',
        answer: 'The reader can call the nearest emergency service from any location.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'The reader can call the nearest emergency service.\nThe reader can call from any location to report veld fires.',
        memoCorrection: {
          whatToCheck: 'Must give TWO points about access.',
          commonMistake: 'Learners list numbers without explaining.',
          examinerHint: 'Access + reporting.',
          alternativeAccept: ['Call nearest service', 'From any location'],
          memoryTrick: '🧠 "Numbers = easy access"',
          mergedCorrection: `🧠 Memory Trick: "Numbers = easy access"\n\n📋 NSC Memo Answer:\nThe reader can call the nearest emergency service from any location to report veld fires.`,
        },
      }],
    },
    {
      id: 'L2Q11',
      source: '2024 NSC P1, Q3.3',
      topicText: 'Why Bottle and Box Visual',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — VISUAL ELEMENTS',
        paragraphs: ['The Sinutab ad shows a photo of the nasal spray bottle next to its box.'],
      },
      parts: [{
        part: '3.3',
        prompt: 'Why has the advertiser included the visual of the bottle and the box? Give TWO points.',
        clue: '💡 What does showing the product help the buyer recognise?',
        answer: 'To show how the product looks and to show that it is a nasal spray.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'To show how the product looks.\nTo show that it is a nasal spray.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons.',
          commonMistake: 'Learners say "to sell it" — too vague.',
          examinerHint: 'Shows what it is + what it looks like.',
          alternativeAccept: ['Show what it looks like', 'Show it is nasal spray'],
          memoryTrick: '🧠 "Show product = recognition"',
          mergedCorrection: `🧠 Memory Trick: "Show product = recognition"\n\n📋 NSC Memo Answer:\nTo show how the product looks. To show that it is a nasal spray.`,
        },
      }],
    },
    {
      id: 'L2Q12',
      source: '2023 NSC P1, Q3.5',
      topicText: 'Why the Logos',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — LOGOS AT BOTTOM',
        paragraphs: ['Logos: Western Cape Government, Disaster Management, Fire Rescue Services, CapeNature.'],
      },
      parts: [{
        part: '3.5',
        prompt: 'Why has the advertiser included the different logos at the bottom?',
        clue: '💡 What do official logos do for a message?',
        answer: 'To show that these organisations support the call to prevent unplanned veld fires.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'To show that these organisations support the call to prevent unplanned veld fires.',
        memoCorrection: {
          whatToCheck: 'Must explain the logos show official support.',
          commonMistake: 'Learners list the names without explaining.',
          examinerHint: 'Logos = credibility + support.',
          alternativeAccept: ['Show support', 'Official endorsement'],
          memoryTrick: '🧠 "Logos = official support"',
          mergedCorrection: `🧠 Memory Trick: "Logos = official support"\n\n📋 NSC Memo Answer:\nTo show that these organisations support the call to prevent unplanned veld fires.`,
        },
      }],
    },
    {
      id: 'L2Q13',
      source: '2024 NSC P1, Q3.2.2',
      topicText: 'Why "Yourself"',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT HEADLINE',
        paragraphs: ['Sinutab — "Free yourself from a blocked nose."'],
      },
      parts: [{
        part: '3.2.2',
        prompt: 'Explain the advertiser\'s intention in using the word "yourself".',
        clue: '💡 Who is being spoken to?',
        answer: 'To appeal directly to the target audience / to personalise the message.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'To appeal directly to the target audience.\nTo personalise the message.',
        memoCorrection: {
          whatToCheck: 'Must explain direct address.',
          commonMistake: 'Learners say "it means you" — too literal.',
          examinerHint: 'Direct address = personal = targeted.',
          alternativeAccept: ['Appeal directly', 'Personalise the message'],
          memoryTrick: '🧠 "You = speak directly to reader"',
          mergedCorrection: `🧠 Memory Trick: "You = speak directly to reader"\n\n📋 NSC Memo Answer:\nTo appeal directly to the target audience. To personalise the message.`,
        },
      }],
    },
    {
      id: 'L2Q14',
      source: '2024 NSC P1, Q4.2',
      topicText: 'Silhouette Outline',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 4',
        paragraphs: ['In Frame 4, the characters are shown as outlines (silhouettes). Facial expressions are missing.'],
      },
      parts: [{
        part: '4.2',
        prompt: 'Explain why the visual is different in this frame. State TWO points.',
        clue: '💡 What is missing? What does that draw attention to?',
        answer: 'The outline focuses on the message and shows expressions are not important when texting.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'To focus on Dennis\' message.\nTo show that facial expressions are not important when texting.',
        memoCorrection: {
          whatToCheck: 'Must give TWO points about what the outline does.',
          commonMistake: 'Learners say "it is different" without explaining.',
          examinerHint: 'Silhouette draws attention to what matters.',
          alternativeAccept: ['Focus on message', 'Show detachment'],
          memoryTrick: '🧠 "Silhouette = focus on the point"',
          mergedCorrection: `🧠 Memory Trick: "Silhouette = focus on the point"\n\n📋 NSC Memo Answer:\nTo focus on Dennis' message. To show that facial expressions are not important when texting.`,
        },
      }],
    },
    {
      id: 'L2Q15',
      source: '2023 NSC P1, Q4.1',
      topicText: 'Jon vs Garfield Body Language',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 2',
        paragraphs: ['Jon is sitting calmly with half-closed eyes. Garfield is jumping up and down with wide-open eyes.'],
      },
      parts: [{
        part: '4.1',
        prompt: 'How is Jon\'s body language different to that of Garfield? State TWO points.',
        clue: '💡 Look at the eyes AND what each one is doing with their body.',
        answer: 'Jon\'s eyes are half-closed while Garfield\'s are wide open. Jon is sitting while Garfield is jumping.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Jon\'s eyes are half-closed and Garfield\'s eyes are wide open.\nJon is sitting while Garfield is jumping up and down.',
        memoCorrection: {
          whatToCheck: 'Must give TWO contrasting points.',
          commonMistake: 'Learners describe only one character.',
          examinerHint: 'Contrast means comparing BOTH.',
          alternativeAccept: ['Eyes: half-closed vs wide', 'Body: sitting vs jumping'],
          memoryTrick: '🧠 "Contrast = both sides"',
          mergedCorrection: `🧠 Memory Trick: "Contrast = both sides"\n\n📋 NSC Memo Answer:\nJon's eyes are half-closed; Garfield's are wide open. Jon is sitting; Garfield is jumping.`,
        },
      }],
    },
    {
      id: 'L2Q16',
      source: '2023 NSC P1, Q4.2',
      topicText: 'Garfield Bothering Jon',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 3',
        paragraphs: ['Garfield hits Jon with his paw. The word "SMACK" appears in bold. Liquid from Jon\'s cup is spilling.'],
      },
      parts: [{
        part: '4.2',
        prompt: 'Explain how the cartoonist conveys that Garfield is bothering Jon in Frame 3. State TWO visual clues.',
        clue: '💡 Movement lines, impact words, spilling cup.',
        answer: 'Movement lines show Garfield hitting Jon. The word "SMACK" in bold emphasises it. Liquid is spilling.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'The movement lines show Garfield hitting Jon with his paw.\nThe word "SMACK" (in bold) emphasises that Garfield has startled Jon.',
        memoCorrection: {
          whatToCheck: 'Must give TWO visual clues.',
          commonMistake: 'Learners give one verbal and one visual.',
          examinerHint: 'Visual = what you SEE.',
          alternativeAccept: ['Movement lines', 'SMACK in bold', 'Spilling cup'],
          memoryTrick: '🧠 "Visual = what you see"',
          mergedCorrection: `🧠 Memory Trick: "Visual = what you see"\n\n📋 NSC Memo Answer:\nMovement lines show Garfield hitting Jon. The word "SMACK" in bold emphasises this.`,
        },
      }],
    },
    {
      id: 'L2Q17',
      source: '2025 NSC P1, Q4.3',
      topicText: 'Speech vs Thought Bubble',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 3',
        paragraphs: ['Jon\'s speech bubble shows him speaking. Garfield\'s thought bubble shows him thinking.'],
      },
      parts: [{
        part: '4.3',
        prompt: 'Explain the difference between the two types of bubbles shown in this frame.',
        clue: '💡 One has a solid outline, one has little circles.',
        answer: 'The speech bubble shows Jon is talking, while the thought bubble shows Garfield is thinking.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The speech bubble is used to indicate that Jon is talking, while the thought bubble shows that Garfield is thinking.',
        memoCorrection: {
          whatToCheck: 'Must explain BOTH types.',
          commonMistake: 'Learners describe only the speech bubble.',
          examinerHint: 'Speech bubble = speaking. Thought bubble = thinking.',
          alternativeAccept: ['Speech = talk, thought = think'],
          memoryTrick: '🧠 "Speech = out loud. Thought = in head."',
          mergedCorrection: `🧠 Memory Trick: "Speech = out loud. Thought = in head."\n\n📋 NSC Memo Answer:\nThe speech bubble shows Jon is talking; the thought bubble shows Garfield is thinking.`,
        },
      }],
    },
    {
      id: 'L2Q18',
      source: '2024 NSC P1, Q5.2.1',
      topicText: 'Combining Sentences',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT G — GOOGLE',
        paragraphs: ['Google is the most visited website. Google is also the most popular search engine.'],
      },
      parts: [{
        part: '5.2.1',
        prompt: 'Combine the following sentences using "as well as": Google is the most visited website. Google is the most popular search engine.',
        clue: '💡 Use "as well as" to join the two ideas into one sentence.',
        answer: 'Google is the most visited website as well as the most popular search engine.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Google is the most visited website as well as the most popular search engine.',
        memoCorrection: {
          whatToCheck: 'Must be a single sentence with "as well as".',
          commonMistake: 'Learners keep two separate sentences.',
          examinerHint: 'Both ideas in ONE sentence.',
          alternativeAccept: ['Google is the most visited website as well as the most popular search engine'],
          memoryTrick: '🧠 "as well as = combine two ideas"',
          mergedCorrection: `🧠 Memory Trick: "as well as = combine two ideas"\n\n📋 NSC Memo Answer:\nGoogle is the most visited website as well as the most popular search engine.`,
        },
      }],
    },
    {
      id: 'L2Q19',
      source: '2023 NSC P1, Q5.2.2',
      topicText: 'Not Only... But Also',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT G — SPINACH',
        paragraphs: ['Spinach tastes good. Spinach improves digestion.'],
      },
      parts: [{
        part: '5.2.2',
        prompt: 'Combine the following sentences into a single sentence beginning with "Not only ..."',
        clue: '💡 "Not only ... but also ..." inverts the verb after "not only".',
        answer: 'Not only does spinach taste good, (but) it also improves digestion.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Not only does spinach taste good, (but) it also improves digestion.',
        memoCorrection: {
          whatToCheck: 'Must use inverted word order.',
          commonMistake: 'Learners forget the inversion.',
          examinerHint: 'Not only + helping verb + subject.',
          alternativeAccept: ['Not only does spinach taste good, but it also improves digestion'],
          memoryTrick: '🧠 "Not only = flip the verb"',
          mergedCorrection: `🧠 Memory Trick: "Not only = flip the verb"\n\n📋 NSC Memo Answer:\nNot only does spinach taste good, but it also improves digestion.`,
        },
      }],
    },
    {
      id: 'L2Q20',
      source: '2025 NSC P1, Q5.1.5',
      topicText: 'Synonym for Encourage',
      teachTopic: 'vocabulary-and-context',
      passageConfig: {
        label: 'TEXT F — NATIONAL PARKS',
        paragraphs: ['The campaign encourages South Africans to visit national parks.'],
      },
      parts: [{
        part: '5.1.5',
        prompt: 'Provide a synonym for the underlined word: The campaign ENCOURAGES South Africans to visit national parks.',
        clue: '💡 Synonym = same meaning.',
        answer: 'motivate / inspire / urge',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'motivate / inspire / urge',
        memoCorrection: {
          whatToCheck: 'Must give a synonym for "encourages".',
          commonMistake: 'Learners give a wrong word.',
          examinerHint: 'Synonym = same meaning.',
          alternativeAccept: ['motivate', 'inspire', 'urge'],
          memoryTrick: '🧠 "Encourage = motivate"',
          mergedCorrection: `🧠 Memory Trick: "Encourage = motivate"\n\n📋 NSC Memo Answer:\nmotivate / inspire / urge`,
        },
      }],
    },
    {
      id: 'L2Q21',
      source: '2023 NSC P1, Q5.1.8',
      topicText: 'Parts of Speech — Information',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT F — BEEKEEPING',
        paragraphs: ['More information about keeping bees or the safe removal of swarms is available on the internet.'],
      },
      parts: [{
        part: '5.1.8',
        prompt: 'State the part of speech of EACH of the underlined words: "information" and "or".',
        clue: '💡 "Information" is a thing. "Or" joins two ideas.',
        answer: 'information = noun; or = conjunction',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'information — noun\nor — conjunction',
        memoCorrection: {
          whatToCheck: 'Must identify BOTH correctly.',
          commonMistake: 'Learners confuse conjunction with preposition.',
          examinerHint: 'Noun = thing. Conjunction = joining word.',
          alternativeAccept: ['information = noun, or = conjunction'],
          memoryTrick: '🧠 "Noun = thing. Conjunction = joiner."',
          mergedCorrection: `🧠 Memory Trick: "Noun = thing. Conjunction = joiner."\n\n📋 NSC Memo Answer:\ninformation — noun\nor — conjunction`,
        },
      }],
    },
    {
      id: 'L2Q22',
      source: '2024 NSC P1, Q5.1.7',
      topicText: 'Parts of Speech — The, Flavour',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT F — SIMBA CHIPS',
        paragraphs: ['She added that the brand presents a flavour that bridges the gap.'],
      },
      parts: [{
        part: '5.1.7',
        prompt: 'State the part of speech of EACH of the underlined words: "the" and "flavour".',
        clue: '💡 "The" points to a specific thing. "Flavour" is a thing.',
        answer: 'the = article/determiner; flavour = noun',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'the — article/determiner (definite)\nflavour — noun',
        memoCorrection: {
          whatToCheck: 'Must identify BOTH correctly.',
          commonMistake: 'Learners call "the" an adjective.',
          examinerHint: 'The = article. Flavour = noun.',
          alternativeAccept: ['the = article', 'flavour = noun'],
          memoryTrick: '🧠 "The = article. Flavour = noun."',
          mergedCorrection: `🧠 Memory Trick: "The = article. Flavour = noun."\n\n📋 NSC Memo Answer:\nthe — article/determiner\nflavour — noun`,
        },
      }],
    },

    // ============ PAPER 2: CRY, THE BELOVED COUNTRY ============
    {
      id: 'L2Q23',
      source: '2023 NSC P2, Q1.1.2',
      topicText: 'Why Stephen Visits John',
      teachTopic: 'cry-plot',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A',
        paragraphs: ['[Stephen goes to see John.]'],
      },
      parts: [{
        part: '1.1.2',
        prompt: 'Why does Stephen visit his brother?',
        clue: '💡 What is Stephen looking for?',
        answer: 'He wants to find out if his brother knows where his son (Absalom) is.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'He wants to find out if his brother knows where his son (Absalom) is.',
        memoCorrection: {
          whatToCheck: 'Must explain Stephen is searching for Absalom.',
          commonMistake: 'Learners say "to visit family" — too vague.',
          examinerHint: 'Stephen is looking for his son.',
          alternativeAccept: ['To find Absalom', 'To ask about his son'],
          memoryTrick: '🧠 "Stephen searches for Absalom"',
          mergedCorrection: `🧠 Memory Trick: "Stephen searches for Absalom"\n\n📋 NSC Memo Answer:\nHe wants to find out if his brother knows where his son (Absalom) is.`,
        },
      }],
    },
    {
      id: 'L2Q24',
      source: '2023 NSC P2, Q1.1.5',
      topicText: 'Why John Stopped Church',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A',
        paragraphs: ['That is my experience, he said. That is why I no longer go to the Church.'],
      },
      parts: [{
        part: '1.1.5',
        prompt: 'Give TWO reasons why John Kumalo has stopped going to church.',
        clue: '💡 What does John say about the church?',
        answer: 'He has lost all belief in the Church. The rules of the church are too restrictive.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'He has lost all belief in the Church.\nThe rules of the church are too restrictive.',
        memoCorrection: {
          whatToCheck: 'Must give TWO reasons.',
          commonMistake: 'Learners give only one.',
          examinerHint: 'Belief + rules.',
          alternativeAccept: ['Lost belief', 'Rules too strict'],
          memoryTrick: '🧠 "John = no belief + rules too strict"',
          mergedCorrection: `🧠 Memory Trick: "John = no belief + rules too strict"\n\n📋 NSC Memo Answer:\nHe has lost all belief in the Church.\nThe rules of the church are too restrictive.`,
        },
      }],
    },
    {
      id: 'L2Q25',
      source: '2024 NSC P2, Q1.2.1',
      topicText: 'Jarvis\'s Study',
      teachTopic: 'cry-setting',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B (2024)',
        paragraphs: ['[James Jarvis is in mourning.]', 'He looked at the hundreds of books, and slid aside the glass panel.'],
      },
      parts: [{
        part: '1.2.1',
        prompt: 'Describe the time and place where this extract is set.',
        clue: '💡 Where is James Jarvis standing?',
        answer: 'This takes place when James Jarvis discovers the huge number of books in Arthur\'s study.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'This takes place when James Jarvis discovers the huge number of books/invitations/manuscripts in Arthur\'s study.',
        memoCorrection: {
          whatToCheck: 'Must describe Arthur\'s study.',
          commonMistake: 'Learners give one part only (time OR place).',
          examinerHint: 'Arthur\'s study + discovering his son\'s world.',
          alternativeAccept: ['Arthur\'s study', 'Discovering books'],
          memoryTrick: '🧠 "Jarvis in Arthur\'s study"',
          mergedCorrection: `🧠 Memory Trick: "Jarvis in Arthur's study"\n\n📋 NSC Memo Answer:\nThis takes place when James Jarvis discovers the huge number of books in Arthur's study.`,
        },
      }],
    },
    {
      id: 'L2Q26',
      source: '2023 NSC P2, Q1.2.3',
      topicText: 'The Inkosikazi',
      teachTopic: 'cry-characters',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B',
        paragraphs: ['And does not my heart grieve for him, now that the inksokazi is dead?'],
      },
      parts: [{
        part: '1.2.3',
        prompt: 'The "inksokazi" who has died is ... A Gertrude Kumalo. B Margaret Jarvis. C Mrs Kumalo. D Mrs Lithebe.',
        clue: '💡 Who is James Jarvis\'s wife?',
        answer: 'B — Margaret Jarvis',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'B/Margaret Jarvis',
        memoCorrection: {
          whatToCheck: 'Must choose B.',
          commonMistake: 'Learners pick Gertrude — she is Stephen\'s sister.',
          examinerHint: 'Inkosikazi = "Mrs" — Margaret Jarvis.',
          alternativeAccept: ['B', 'Margaret Jarvis'],
          memoryTrick: '🧠 "Inkosikazi = Mrs Jarvis"',
          mergedCorrection: `🧠 Memory Trick: "Inkosikazi = Mrs Jarvis"\n\n📋 NSC Memo Answer:\nB/Margaret Jarvis`,
        },
      }],
    },
    {
      id: 'L2Q27',
      source: '2025 NSC P2, Q1.1.3',
      topicText: 'Msimangu Modest',
      teachTopic: 'cry-characters',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A (2025)',
        paragraphs: ['Msimangu is described as a humble priest who helps Stephen.'],
      },
      parts: [{
        part: '1.1.3',
        prompt: 'What does Msimangu\'s humility reveal about his character?',
        clue: '💡 What kind of person is Msimangu?',
        answer: 'Msimangu is modest/honest/humble when he admits he is human with imperfections.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Msimangu is modest/honest/frank/self-aware/humble when he admits that he is human with imperfections.',
        memoCorrection: {
          whatToCheck: 'Must describe his character.',
          commonMistake: 'Learners say "he is nice" — too vague.',
          examinerHint: 'Humble + honest.',
          alternativeAccept: ['Modest', 'Humble', 'Honest'],
          memoryTrick: '🧠 "Msimangu = humble priest"',
          mergedCorrection: `🧠 Memory Trick: "Msimangu = humble priest"\n\n📋 NSC Memo Answer:\nMsimangu is modest/honest/humble when he admits he is human with imperfections.`,
        },
      }],
    },

    // ============ PAPER 2: DR JEKYLL AND MR HYDE ============
    {
      id: 'L2Q28',
      source: '2023 NSC P2, Q2.1.2',
      topicText: 'Utterson\'s Home',
      teachTopic: 'jekyll-plot',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C',
        paragraphs: ['[Mr Utterson receives a visitor.]'],
      },
      parts: [{
        part: '2.1.2',
        prompt: 'Describe the time and place where this extract is set.',
        clue: '💡 Where is Utterson? Who is visiting?',
        answer: 'It is set at Mr Utterson\'s home after he confronts Dr Jekyll about concealing Mr Hyde.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The setting is Mr Utterson\'s home/in front of the fireplace in Mr Utterson\'s home after he confronts Dr Jekyll about concealing Mr Hyde.',
        memoCorrection: {
          whatToCheck: 'Must describe Utterson\'s home.',
          commonMistake: 'Learners give one part only.',
          examinerHint: 'Utterson\'s home + the confrontation.',
          alternativeAccept: ['Utterson\'s home', 'Fireplace'],
          memoryTrick: '🧠 "Scene = Utterson\'s home"',
          mergedCorrection: `🧠 Memory Trick: "Scene = Utterson's home"\n\n📋 NSC Memo Answer:\nMr Utterson's home after he confronts Dr Jekyll about concealing Mr Hyde.`,
        },
      }],
    },
    {
      id: 'L2Q29',
      source: '2023 NSC P2, Q2.1.4',
      topicText: 'Why Mr Guest',
      teachTopic: 'jekyll-plot',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C',
        paragraphs: ['Mr Utterson asks Mr Guest to look at the handwriting of the note.'],
      },
      parts: [{
        part: '2.1.4',
        prompt: 'Why does Mr Utterson willingly hand over personal correspondence to Mr Guest? State TWO points.',
        clue: '💡 What is Guest an expert at?',
        answer: 'Mr Guest is an expert at analysing handwriting. Mr Utterson hopes he will provide evidence.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mr Guest is an expert at analysing handwriting.\nMr Utterson hopes that Mr Guest will be able to provide some form of evidence.',
        memoCorrection: {
          whatToCheck: 'Must give TWO points.',
          commonMistake: 'Learners give one point only.',
          examinerHint: 'Guest is a handwriting expert.',
          alternativeAccept: ['Guest is an expert', 'Hopes for evidence'],
          memoryTrick: '🧠 "Guest = handwriting expert"',
          mergedCorrection: `🧠 Memory Trick: "Guest = handwriting expert"\n\n📋 NSC Memo Answer:\nMr Guest is an expert at analysing handwriting.\nMr Utterson hopes that Mr Guest will provide evidence.`,
        },
      }],
    },
    {
      id: 'L2Q30',
      source: '2024 NSC P2, Q2.2.3',
      topicText: 'Jekyll\'s Pleading Tone',
      teachTopic: 'jekyll-characters',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT D (2024)',
        paragraphs: ['Serve me, my dear Lanyon, and save...'],
      },
      parts: [{
        part: '2.2.3',
        prompt: 'What tone would Dr Jekyll use when saying "Serve me, my dear Lanyon, and save"?',
        clue: '💡 He urgently needs help.',
        answer: 'Pleading / desperate',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Pleading/desperate',
        memoCorrection: {
          whatToCheck: 'Must describe the urgency.',
          commonMistake: 'Learners say "polite" — too mild.',
          examinerHint: 'He desperately needs to be rescued.',
          alternativeAccept: ['Pleading', 'Desperate'],
          memoryTrick: '🧠 "Jekyll pleads with Lanyon"',
          mergedCorrection: `🧠 Memory Trick: "Jekyll pleads with Lanyon"\n\n📋 NSC Memo Answer:\nPleading/desperate`,
        },
      }],
    },

    // ============ PAPER 2: MACBETH ============
    {
      id: 'L2Q31',
      source: '2023 NSC P2, Q3.1.2',
      topicText: 'Macbeth Castle',
      teachTopic: 'macbeth-setting',
      passageConfig: {
        label: 'MACBETH — EXTRACT E',
        paragraphs: ['[Duncan, his sons and noblemen are travelling.]'],
      },
      parts: [{
        part: '3.1.2',
        prompt: 'Describe the time and place where this extract is set.',
        clue: '💡 Where is Duncan arriving?',
        answer: 'Macbeth\'s Castle/Inverness when King Duncan arrives for a visit.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Macbeth\'s Castle/Inverness when King Duncan arrives for a visit.',
        memoCorrection: {
          whatToCheck: 'Must identify Inverness + Duncan\'s visit.',
          commonMistake: 'Learners give one part only.',
          examinerHint: 'Inverness + Duncan arrives.',
          alternativeAccept: ['Inverness', 'Duncan visits'],
          memoryTrick: '🧠 "Inverness = Macbeth\'s castle"',
          mergedCorrection: `🧠 Memory Trick: "Inverness = Macbeth's castle"\n\n📋 NSC Memo Answer:\nMacbeth's Castle/Inverness when King Duncan arrives for a visit.`,
        },
      }],
    },
    {
      id: 'L2Q32',
      source: '2024 NSC P2, Q3.1.3',
      topicText: 'Macbeth\'s Actions',
      teachTopic: 'macbeth-context',
      passageConfig: {
        label: 'MACBETH — EXTRACT E (2024)',
        paragraphs: ['MACBETH: Approach thou like the rugged Russian bear...'],
      },
      parts: [{
        part: '3.1.3',
        prompt: 'If you were the director, what would you tell Macbeth to do when saying "Approach thou like the rugged Russian bear"? State TWO actions.',
        clue: '💡 How would someone confronting a ghost act?',
        answer: 'Macbeth should beat his chest. He should approach the ghost.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'Macbeth should beat his chest.\nHe should approach the ghost.\nHe should pace up and down.\nHe should throw his hands in the air.',
        memoCorrection: {
          whatToCheck: 'Must give TWO actions.',
          commonMistake: 'Learners give one action.',
          examinerHint: 'Physical actions of a man confronting fear.',
          alternativeAccept: ['Beat chest', 'Approach ghost', 'Pace', 'Throw hands'],
          memoryTrick: '🧠 "Ghost = big physical reaction"',
          mergedCorrection: `🧠 Memory Trick: "Ghost = big physical reaction"\n\n📋 NSC Memo Answer:\nMacbeth should beat his chest. He should approach the ghost. He should pace up and down.`,
        },
      }],
    },
    {
      id: 'L2Q33',
      source: '2023 NSC P2, Q3.1.3',
      topicText: 'Banquo\'s Tone',
      teachTopic: 'macbeth-characters',
      passageConfig: {
        label: 'MACBETH — EXTRACT E',
        paragraphs: ['BANQUO: Where they most breed and haunt, I have observed the air is delicate.'],
      },
      parts: [{
        part: '3.1.3',
        prompt: 'What tone would Banquo use in these lines? And why?',
        clue: '💡 He is describing something pleasant.',
        answer: 'Appreciation/awe/gentleness — he describes the beauty of the castle and nature.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Appreciation/awe/gentleness.\nBanquo uses this tone to describe the beauty and pleasantness of the castle and surrounding nature.',
        memoCorrection: {
          whatToCheck: 'Must give tone + reason.',
          commonMistake: 'Learners give tone only.',
          examinerHint: 'He appreciates the beauty.',
          alternativeAccept: ['Appreciation', 'Awe', 'Gentleness'],
          memoryTrick: '🧠 "Banquo appreciates the beauty"',
          mergedCorrection: `🧠 Memory Trick: "Banquo appreciates the beauty"\n\n📋 NSC Memo Answer:\nAppreciation/awe/gentleness. Banquo uses this tone to describe the beauty of the castle and nature.`,
        },
      }],
    },
    {
      id: 'L2Q34',
      source: '2025 NSC P2, Q3.1.2',
      topicText: 'Macbeth Anxious',
      teachTopic: 'macbeth-characters',
      passageConfig: {
        label: 'MACBETH — EXTRACT E (2025)',
        paragraphs: ['Macbeth is alone, considering whether to kill Duncan.'],
      },
      parts: [{
        part: '3.1.2',
        prompt: 'What does this extract reveal about Macbeth\'s state of mind?',
        clue: '💡 What is he worried about?',
        answer: 'Macbeth is anxious/nervous as he agonises about his footsteps being heard.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Macbeth is anxious/nervous as he agonises about his footsteps being heard.',
        memoCorrection: {
          whatToCheck: 'Must describe anxiety.',
          commonMistake: 'Learners say "he is angry".',
          examinerHint: 'Anxious + nervous.',
          alternativeAccept: ['Anxious', 'Nervous'],
          memoryTrick: '🧠 "Macbeth = anxious before murder"',
          mergedCorrection: `🧠 Memory Trick: "Macbeth = anxious before murder"\n\n📋 NSC Memo Answer:\nMacbeth is anxious/nervous as he agonises about his footsteps being heard.`,
        },
      }],
    },

    // ============ PAPER 2: MY CHILDREN! MY AFRICA! ============
    {
      id: 'L2Q35',
      source: '2023 NSC P2, Q4.1.2',
      topicText: 'Why Hardy and Austen',
      teachTopic: 'mcma-plot',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G',
        paragraphs: ['ISABEL: Thomas Hardy ... Jane Austen ... who else, Thami? Put your heads together and make a list.'],
      },
      parts: [{
        part: '4.1.2',
        prompt: 'Explain why Isabel refers to Thomas Hardy and Jane Austen.',
        clue: '💡 What are they preparing for?',
        answer: 'Mr M has entered them for the literary quiz at Grahamstown and these are examples of novelists they need to familiarise themselves with.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mr M has entered them for the literary quiz at Grahamstown and these are examples of the novelists they need to familiarise themselves with.',
        memoCorrection: {
          whatToCheck: 'Must connect to the literary quiz.',
          commonMistake: 'Learners just say "they are writers".',
          examinerHint: 'Literary quiz + novelists.',
          alternativeAccept: ['For the literary quiz', 'Novelists to study'],
          memoryTrick: '🧠 "Hardy + Austen = quiz prep"',
          mergedCorrection: `🧠 Memory Trick: "Hardy + Austen = quiz prep"\n\n📋 NSC Memo Answer:\nThey are novelists they need to familiarise themselves with for the literary quiz at Grahamstown.`,
        },
      }],
    },
    {
      id: 'L2Q36',
      source: '2023 NSC P2, Q4.1.6',
      topicText: 'Isabel\'s Character',
      teachTopic: 'mcma-characters',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G',
        paragraphs: ['ISABEL: Just before you go, Mr M, I\'ve got an invitation for you and Thami from my Mom and Dad.'],
      },
      parts: [{
        part: '4.1.6',
        prompt: 'What does this extract reveal about Isabel\'s character? Substantiate.',
        clue: '💡 What does inviting them to tea show about her?',
        answer: 'Isabel is gracious/polite/hospitable/thoughtful as she is excited at the prospect of her new friends meeting her parents.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Isabel is gracious/polite/hospitable/thoughtful as she is excited at the prospect of her new friends coming to her house.',
        memoCorrection: {
          whatToCheck: 'Must give trait + evidence.',
          commonMistake: 'Learners give trait only.',
          examinerHint: 'Gracious + hospitable.',
          alternativeAccept: ['Gracious', 'Polite', 'Hospitable'],
          memoryTrick: '🧠 "Isabel = gracious host"',
          mergedCorrection: `🧠 Memory Trick: "Isabel = gracious host"\n\n📋 NSC Memo Answer:\nIsabel is gracious/polite/hospitable as she is excited at the prospect of her new friends coming to her house.`,
        },
      }],
    },
    {
      id: 'L2Q37',
      source: '2024 NSC P2, Q4.1.7',
      topicText: 'Thami\'s Irony',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G (2024)',
        paragraphs: ['THAMI: I was sent to school here in the peaceful platteland because it is so much safer, you see, than the big city with all its temptations and troubles.'],
      },
      parts: [{
        part: '4.1.7',
        prompt: 'Explain the irony in Thami\'s words.',
        clue: '💡 He says it is peaceful, but what happens?',
        answer: 'Thami\'s parents send him to Brakwater to keep him safe, yet this is where he experiences unrests/boycotts.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Thami\'s parents send him to Brakwater to keep him safe, yet this is where he experiences unrests/boycotts.',
        memoCorrection: {
          whatToCheck: 'Must explain both parts.',
          commonMistake: 'Learners describe the situation without noting the irony.',
          examinerHint: 'Sent for safety → found unrest.',
          alternativeAccept: ['Sent to safety, found unrest'],
          memoryTrick: '🧠 "Irony = safer place is less safe"',
          mergedCorrection: `🧠 Memory Trick: "Irony = safer place is less safe"\n\n📋 NSC Memo Answer:\nThami's parents send him to Brakwater to keep him safe, yet this is where he experiences unrests/boycotts.`,
        },
      }],
    },

    // ============ PAPER 2: SHORT STORIES ============
    {
      id: 'L2Q38',
      source: '2023 NSC P2, Q5.1.2',
      topicText: 'Rejection — Setting',
      teachTopic: 'short-stories-technique',
      passageConfig: {
        label: 'REJECTION — EXTRACT I',
        paragraphs: ['[The narrator is confused.]'],
      },
      parts: [{
        part: '5.1.2',
        prompt: 'Describe the time and place where this extract is set.',
        clue: '💡 Where is the narrator?',
        answer: 'The setting is the narrator\'s home after the marriage of Modou to Binetou.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The setting is the narrator\'s home after the marriage of Modou to Binetou.',
        memoCorrection: {
          whatToCheck: 'Must describe home + the timing.',
          commonMistake: 'Learners give one part only.',
          examinerHint: 'Home + after the marriage.',
          alternativeAccept: ['Narrator\'s home', 'After Modou\'s remarriage'],
          memoryTrick: '🧠 "Home + after the wedding"',
          mergedCorrection: `🧠 Memory Trick: "Home + after the wedding"\n\n📋 NSC Memo Answer:\nThe narrator's home after the marriage of Modou to Binetou.`,
        },
      }],
    },
    {
      id: 'L2Q39',
      source: '2023 NSC P2, Q5.2.6',
      topicText: 'Eveline\'s Heart',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'EVELINE — EXTRACT J',
        paragraphs: ['She knew it was that that had given her the palpitations.'],
      },
      parts: [{
        part: '5.2.6',
        prompt: 'Explain what Eveline means when she says "She knew it was that that had given her the palpitations."',
        clue: '💡 What "was that"?',
        answer: 'Eveline realises that it was her father\'s violent nature that made her heart beat faster.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Eveline realises that it was her father\'s violent nature/actions which made her nervous/her heart beat faster.',
        memoCorrection: {
          whatToCheck: 'Must connect to her father\'s violence.',
          commonMistake: 'Learners say "she is nervous" without explaining why.',
          examinerHint: 'Father\'s violence → palpitations.',
          alternativeAccept: ['Father\'s violence', 'Nervous'],
          memoryTrick: '🧠 "Palpitations = father\'s violence"',
          mergedCorrection: `🧠 Memory Trick: "Palpitations = father's violence"\n\n📋 NSC Memo Answer:\nEveline realises that it was her father's violent nature that made her heart beat faster.`,
        },
      }],
    },
    {
      id: 'L2Q40',
      source: '2024 NSC P2, Q5.2.1',
      topicText: 'Sejosenye Content',
      teachTopic: 'short-stories-characters',
      passageConfig: {
        label: 'THE WIND AND A BOY — EXTRACT J (2024)',
        paragraphs: ['"Oh, he\'s no trouble," Sejosenye would reply.'],
      },
      parts: [{
        part: '5.2.1',
        prompt: 'What does this line tell us about Sejosenye\'s state of mind? Substantiate.',
        clue: '💡 Is Friedman a burden to her?',
        answer: 'Sejosenye is content as she does not see Friedman as burdensome as the other villagers do.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Sejosenye is content as she does not see Friedman as burdensome as the other villagers do.',
        memoCorrection: {
          whatToCheck: 'Must give state of mind + evidence.',
          commonMistake: 'Learners say "she loves him" without the "content" nuance.',
          examinerHint: 'She is content.',
          alternativeAccept: ['Content', 'Not burdened'],
          memoryTrick: '🧠 "Sejosenye = content"',
          mergedCorrection: `🧠 Memory Trick: "Sejosenye = content"\n\n📋 NSC Memo Answer:\nSejosenye is content as she does not see Friedman as burdensome.`,
        },
      }],
    },

    // ============ PAPER 2: POETRY ============
    {
      id: 'L2Q41',
      source: '2023 NSC P2, Q6.1.2',
      topicText: 'Sonnet 73 — Literal Season',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
        ],
      },
      parts: [{
        part: '6.1.2',
        prompt: 'Give the literal meaning of "That time of year".',
        clue: '💡 What season is being described?',
        answer: 'The season of autumn/fall/the beginning of winter.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The season of autumn (fall)/the beginning of winter.',
        memoCorrection: {
          whatToCheck: 'Must identify the literal season.',
          commonMistake: 'Learners give the figurative meaning instead.',
          examinerHint: 'Yellow leaves = autumn.',
          alternativeAccept: ['Autumn', 'Fall', 'Winter'],
          memoryTrick: '🧠 "Yellow leaves = autumn"',
          mergedCorrection: `🧠 Memory Trick: "Yellow leaves = autumn"\n\n📋 NSC Memo Answer:\nThe season of autumn (fall)/the beginning of winter.`,
        },
      }],
    },
    {
      id: 'L2Q42',
      source: '2023 NSC P2, Q6.2.2',
      topicText: 'Innisfree — Speaker\'s Mind',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, and go to Innisfree,',
          'And a small cabin build there, of clay and wattles made:',
        ],
      },
      parts: [{
        part: '6.2.2',
        prompt: 'What does line 1 tell us about the speaker\'s state of mind? Substantiate.',
        clue: '💡 "Go NOW" — is he hesitant or determined?',
        answer: 'He is determined/resolute when he states the sense of urgency to leave the city.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'He is determined/resolute when he states the sense of urgency to leave the city.',
        memoCorrection: {
          whatToCheck: 'Must describe determination.',
          commonMistake: 'Learners say "he wants to go" without the urgency.',
          examinerHint: '"Go now" = determined.',
          alternativeAccept: ['Determined', 'Resolute'],
          memoryTrick: '🧠 "Go now = determined"',
          mergedCorrection: `🧠 Memory Trick: "Go now = determined"\n\n📋 NSC Memo Answer:\nHe is determined/resolute when he states the sense of urgency to leave the city.`,
        },
      }],
    },
    {
      id: 'L2Q43',
      source: '2024 NSC P2, Q6.1.5',
      topicText: 'Slave Dealer — Can\'t Pray',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Slave Dealer',
        poet: 'Thomas Pringle',
        lines: [
          'Her cry is ever in my ear,',
          'And it will not let me pray;',
          'Her look I see — her voice I hear —',
          'As when in death she lay,',
        ],
      },
      parts: [{
        part: '6.1.5',
        prompt: 'Explain why the speaker is unable to pray.',
        clue: '💡 What is haunting him?',
        answer: 'The woman\'s cries still haunt him. He remembers the look on her face.',
        marks: 2,
        acceptAnyTwo: true,
        memoFullAnswer: 'The woman\'s cries still haunt him.\nHe remembers the look on her face.',
        memoCorrection: {
          whatToCheck: 'Must explain the haunting memory.',
          commonMistake: 'Learners say "he is guilty" without explaining why.',
          examinerHint: 'The dying woman\'s cries haunt him.',
          alternativeAccept: ['Woman\'s cries', 'Remembers her face'],
          memoryTrick: '🧠 "Cries haunt him = no prayers"',
          mergedCorrection: `🧠 Memory Trick: "Cries haunt him = no prayers"\n\n📋 NSC Memo Answer:\nThe woman's cries still haunt him. He remembers the look on her face.`,
        },
      }],
    },
    {
      id: 'L2Q44',
      source: '2024 NSC P2, Q6.2.3',
      topicText: 'Hard to Find — Frustrated',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Hard to Find',
        poet: 'Sinesipo Jojo',
        lines: [
          'they are hard to find',
          'when they are needed by the heart;',
          'when the heart feels,',
          'words hide like they are not part of life.',
        ],
      },
      parts: [{
        part: '6.2.3',
        prompt: 'What tone would the speaker use in lines 6-7?',
        clue: '💡 How does she feel about not finding the right words?',
        answer: 'Frustrated / dependent',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'Frustrated/dependent.',
        memoCorrection: {
          whatToCheck: 'Must describe the frustration.',
          commonMistake: 'Learners say "sad" — not quite the right nuance.',
          examinerHint: 'She cannot find words = frustrated.',
          alternativeAccept: ['Frustrated', 'Dependent'],
          memoryTrick: '🧠 "Missing words = frustration"',
          mergedCorrection: `🧠 Memory Trick: "Missing words = frustration"\n\n📋 NSC Memo Answer:\nFrustrated/dependent.`,
        },
      }],
    },
    {
      id: 'L2Q45',
      source: '2023 NSC P2, Q6.2.6',
      topicText: 'Innisfree — Speaker\'s Character',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, for always night and day',
          'I hear lake water lapping with low sounds by the shore;',
        ],
      },
      parts: [{
        part: '6.2.6',
        prompt: 'What do these lines reveal about the speaker\'s character? Substantiate.',
        clue: '💡 What does he long for?',
        answer: 'The speaker is appreciative/sensitive/hopeful as he wants to experience the beauty of nature.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: 'The speaker is appreciative/sensitive/hopeful/adamant as he wants to experience the beauty of nature.',
        memoCorrection: {
          whatToCheck: 'Must give trait + evidence.',
          commonMistake: 'Learners give trait only.',
          examinerHint: 'Appreciative of nature.',
          alternativeAccept: ['Appreciative', 'Sensitive', 'Hopeful'],
          memoryTrick: '🧠 "Speaker = appreciative of nature"',
          mergedCorrection: `🧠 Memory Trick: "Speaker = appreciative of nature"\n\n📋 NSC Memo Answer:\nThe speaker is appreciative/sensitive/hopeful as he wants to experience the beauty of nature.`,
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 3 — Analysis (3 marks)
  // ================================================================
  level3: [
    {
      id: 'L3Q1',
      source: '2023 NSC P1, Q1.8',
      topicText: 'Environmental Impact — Open-ended',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION',
        paragraphs: ['Discarded clothing contributes massively to pollution. More than 10,000 litres of water is used to make a single pair of jeans.'],
      },
      parts: [{
        part: '1.8',
        prompt: 'Do you think the environmental impact of the fashion industry is a serious concern that requires immediate action? Substantiate.',
        clue: '💡 The mark is NOT for Yes or No. Give the REASON first.',
        answer: 'Yes — water pollution and resource exhaustion make it urgent.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The manufacturing process results in water pollution and the amount of water used leads to the exhaustion of valuable resources.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON, not just Yes or No.',
          commonMistake: 'Learners write "Yes" and stop.',
          examinerHint: 'Open-ended: the reason earns the marks.',
          alternativeAccept: ['Yes — water pollution'],
          memoryTrick: '🧠 "Open-ended = reason, not answer"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason, not answer"\n\n📋 NSC Memo Answer:\nYes. Water pollution and resource exhaustion make it urgent.`,
        },
      }],
    },
    {
      id: 'L3Q2',
      source: '2023 NSC P1, Q1.9',
      topicText: 'Title Suitability — Footprint',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — "FAST FASHION\'S FOOTPRINT"',
        paragraphs: ['The passage discusses how fast fashion affects the environment — pollution, water waste, and clothing thrown away.'],
      },
      parts: [{
        part: '1.9',
        prompt: 'Discuss the suitability of the title, "FAST FASHION\'S FOOTPRINT".',
        clue: '💡 Does "footprint" match the message about environmental damage?',
        answer: 'Suitable — footprint = what one leaves behind, and the passage is about fashion\'s environmental mark.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The title is suitable because it is linked to the passage that discusses the negative effects of fast fashion on the environment.',
        memoCorrection: {
          whatToCheck: 'Must explain WHY the title fits.',
          commonMistake: 'Learners say "it is suitable" without linking.',
          examinerHint: 'Suitable = title matches passage idea.',
          alternativeAccept: ['Suitable because footprint = impact'],
          memoryTrick: '🧠 "Footprint = what we leave behind"',
          mergedCorrection: `🧠 Memory Trick: "Footprint = what we leave behind"\n\n📋 NSC Memo Answer:\nThe title is suitable because it links to the passage about fashion's impact on the environment.`,
        },
      }],
    },
    {
      id: 'L3Q3',
      source: '2024 NSC P1, Q1.9',
      topicText: 'Title Suitability — AI',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — "EMBRACING ARTIFICIAL INTELLIGENCE"',
        paragraphs: ['The passage discusses AI\'s importance, impact, applications in business, social media and everyday life.'],
      },
      parts: [{
        part: '1.9',
        prompt: 'Discuss the suitability of the title, "EMBRACING ARTIFICIAL INTELLIGENCE".',
        clue: '💡 Does the passage show people ACCEPTING AI?',
        answer: 'Suitable — reflects the passage\'s discussion of AI\'s importance and impact, and the growing use shows acceptance.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The title is suitable because it reflects the passage\'s discussion of AI\'s importance and impact, and the growing use shows acceptance.',
        memoCorrection: {
          whatToCheck: 'Must explain WHY the title fits.',
          commonMistake: 'Learners say "yes" without linking.',
          examinerHint: 'Suitable = title matches main idea.',
          alternativeAccept: ['Suitable — reflects AI\'s impact'],
          memoryTrick: '🧠 "Suitable = title matches passage"',
          mergedCorrection: `🧠 Memory Trick: "Suitable = title matches passage"\n\n📋 NSC Memo Answer:\nThe title is suitable because it reflects the passage's discussion of AI's importance and impact.`,
        },
      }],
    },
    {
      id: 'L3Q4',
      source: '2023 NSC P1, Q1.6.1',
      topicText: 'Natural Fibres Challenge',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 6',
        paragraphs: ['Natural fibres are not any better, because the cultivation of cotton requires water, fertilisers, pesticides, and energy.'],
      },
      parts: [{
        part: '1.6.1',
        prompt: 'How does the information challenge the usual perception that buying natural products is better for the environment?',
        clue: '💡 What do natural fibres still need?',
        answer: 'Natural fibres also use water, fertilisers, pesticides, and energy — so they are not automatically better.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'To cultivate natural fibres, a lot of water is required/fertiliser/pesticides are used/energy is required to process the fibres.',
        memoCorrection: {
          whatToCheck: 'Must show natural fibres ALSO use resources.',
          commonMistake: 'Learners repeat that natural is better.',
          examinerHint: 'Natural still uses water, chemicals, energy.',
          alternativeAccept: ['Water + chemicals + energy'],
          memoryTrick: '🧠 "Natural still uses water + chemicals"',
          mergedCorrection: `🧠 Memory Trick: "Natural still uses water + chemicals"\n\n📋 NSC Memo Answer:\nNatural fibres also use water, fertilisers, pesticides, and energy — so they are not automatically better.`,
        },
      }],
    },
    {
      id: 'L3Q5',
      source: '2024 NSC P1, Q1.2.1',
      topicText: 'What is AI?',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — EMBRACING AI, PARAGRAPH 2',
        paragraphs: ['AI is a field of computer science that allows machines to imitate human thought processes and decision-making.'],
      },
      parts: [{
        part: '1.2.1',
        prompt: 'Using your OWN words, explain what artificial intelligence is. State TWO points.',
        clue: '💡 What field is it? What does it let machines do?',
        answer: 'It is a branch of computer science where machines copy human thinking and decision-making.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Artificial intelligence is a discipline in computer science in which machines copy the way humans think and make decisions.',
        memoCorrection: {
          whatToCheck: 'Must explain BOTH the field and what it does.',
          commonMistake: 'Learners copy verbatim instead of using own words.',
          examinerHint: 'Two points: computer science + imitates humans.',
          alternativeAccept: ['Branch of computer science', 'Machines copy humans'],
          memoryTrick: '🧠 "AI = computers copy humans"',
          mergedCorrection: `🧠 Memory Trick: "AI = computers copy humans"\n\n📋 NSC Memo Answer:\nAI is a discipline in computer science in which machines copy the way humans think and make decisions.`,
        },
      }],
    },
    {
      id: 'L3Q6',
      source: '2023 NSC P1, Q1.5',
      topicText: 'Why Decomposes Slowly',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 5',
        paragraphs: ['The chemicals used in the manufacturing process are released, and clothes either decompose slowly or do not decompose at all.'],
      },
      parts: [{
        part: '1.5',
        prompt: 'Explain in your OWN words why discarded clothing decomposes slowly. State TWO points.',
        clue: '💡 What slows down breakdown?',
        answer: 'Chemicals slow down decomposition and artificial fibres do not break down easily.',
        marks: 3,
        acceptAnyTwo: true,
        memoFullAnswer: 'The chemical content used to manufacture the clothes reduces the rate of decomposition.\nArtificial fibres do not decompose easily.',
        memoCorrection: {
          whatToCheck: 'Must give TWO distinct points.',
          commonMistake: 'Learners copy the passage verbatim.',
          examinerHint: 'Chemicals + synthetic fibres.',
          alternativeAccept: ['Chemicals slow breakdown', 'Synthetic fibres do not break down'],
          memoryTrick: '🧠 "Chemicals + synthetics = slow decay"',
          mergedCorrection: `🧠 Memory Trick: "Chemicals + synthetics = slow decay"\n\n📋 NSC Memo Answer:\nChemicals reduce decomposition rate. Artificial fibres do not decompose easily.`,
        },
      }],
    },
    {
      id: 'L3Q7',
      source: '2023 NSC P1, Q1.13',
      topicText: 'Pie Graphs — Do They Convey?',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — PIE CHARTS (WATER USE)',
        paragraphs: ['Five pie charts showing water use across continents.'],
      },
      parts: [{
        part: '1.13',
        prompt: 'In your view, do the pie graphs succeed in conveying relevant information? Substantiate.',
        clue: '💡 The mark is for your REASON.',
        answer: 'Yes — they clearly show which continents use water for which purposes.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The pie graphs clearly show that some continents use more water for industrial purposes while others use more water for farming or domestic purposes.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON.',
          commonMistake: 'Learners write "Yes" only.',
          examinerHint: 'Open-ended: the reason earns the marks.',
          alternativeAccept: ['Yes — clear comparison'],
          memoryTrick: '🧠 "Open-ended = reason wins"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason wins"\n\n📋 NSC Memo Answer:\nYes. They clearly show water use across continents.`,
        },
      }],
    },
    {
      id: 'L3Q8',
      source: '2024 NSC P1, Q1.12',
      topicText: 'Visuals vs Written Text',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — BENEFITS OF READING',
        paragraphs: ['TEXT B combines visuals with short captions.'],
      },
      parts: [{
        part: '1.12',
        prompt: 'In your opinion, is it easier to understand the visuals or the written text? Substantiate.',
        clue: '💡 Give a reason for your choice.',
        answer: 'Visuals — they depict the benefits quickly without needing to read.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The visuals clearly depict the benefits of reading. You do not have to work out the meaning of words.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON for the choice.',
          commonMistake: 'Learners answer without reasoning.',
          examinerHint: 'Choose + substantiate.',
          alternativeAccept: ['Visuals — quick to grasp'],
          memoryTrick: '🧠 "Choice + reason"',
          mergedCorrection: `🧠 Memory Trick: "Choice + reason"\n\n📋 NSC Memo Answer:\nThe visuals clearly depict the benefits of reading.`,
        },
      }],
    },
    {
      id: 'L3Q9',
      source: '2025 NSC P1, Q1.12',
      topicText: 'Gap Year Visual Relevance',
      teachTopic: 'visual-literacy',
      passageConfig: {
        label: 'TEXT B — GAP YEAR PIE CHART',
        paragraphs: ['The visual shows a cell phone and a book next to a pie chart about gap year plans.'],
      },
      parts: [{
        part: '1.12',
        prompt: 'In your view, is the visual relevant to the text? Substantiate.',
        clue: '💡 Do the items match the idea of a gap year?',
        answer: 'Yes — the phone and book show activities during a gap year.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. It is relevant because it shows a possible future plan of Grade 12 learners. The visual of the cell phone and the book depicts activities a person could engage in while taking a gap year.',
        memoCorrection: {
          whatToCheck: 'Must explain relevance of the visual.',
          commonMistake: 'Learners answer without linking visual to gap year.',
          examinerHint: 'Relevant = matches topic.',
          alternativeAccept: ['Yes — shows activities'],
          memoryTrick: '🧠 "Relevant = matches topic"',
          mergedCorrection: `🧠 Memory Trick: "Relevant = matches topic"\n\n📋 NSC Memo Answer:\nYes. The phone and book show activities during a gap year.`,
        },
      }],
    },
    {
      id: 'L3Q10',
      source: '2023 NSC P1, Q3.6',
      topicText: 'Visual of Animal',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — ANIMAL VISUAL',
        paragraphs: ['The ad shows a cartoon animal (a buck) encircled by flames.'],
      },
      parts: [{
        part: '3.6',
        prompt: 'Discuss whether the visual of the animal effectively conveys the message of the advertisement.',
        clue: '💡 Does the animal make you feel something?',
        answer: 'Yes — the trapped animal creates sympathy and encourages caution with fires.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The visual of the animal encircled by flames creates sympathy and could encourage people to be cautious about starting veld fires.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON for yes or no.',
          commonMistake: 'Learners describe the animal without evaluating.',
          examinerHint: 'Effective = makes you feel + links to message.',
          alternativeAccept: ['Yes — sympathy', 'No — no clear link'],
          memoryTrick: '🧠 "Effective = emotion + link"',
          mergedCorrection: `🧠 Memory Trick: "Effective = emotion + link"\n\n📋 NSC Memo Answer:\nYes. The trapped animal creates sympathy and encourages caution.`,
        },
      }],
    },
    {
      id: 'L3Q11',
      source: '2024 NSC P1, Q3.6',
      topicText: 'Curved Arrow Visual',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — CURVED ARROW',
        paragraphs: ['A curved arrow wraps around the numbers "2" and "10 hours".'],
      },
      parts: [{
        part: '3.6',
        prompt: 'Does the visual of the curved arrow support the message? Substantiate.',
        clue: '💡 What does a curved arrow suggest about time?',
        answer: 'Yes — the arrow curves like a clock and reinforces the speed and duration.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The visual supports the message as the arrow is curved to signify the speed at which Sinutab works.',
        memoCorrection: {
          whatToCheck: 'Must explain whether the arrow supports the message.',
          commonMistake: 'Learners describe the arrow without linking.',
          examinerHint: 'Arrow = time = message about speed.',
          alternativeAccept: ['Yes — reinforces speed'],
          memoryTrick: '🧠 "Arrow = time = speed message"',
          mergedCorrection: `🧠 Memory Trick: "Arrow = time = speed message"\n\n📋 NSC Memo Answer:\nYes. The arrow curves like a clock, reinforcing the speed and duration of the product.`,
        },
      }],
    },
    {
      id: 'L3Q12',
      source: '2025 NSC P1, Q3.5',
      topicText: 'Blank Shield Meaning',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT — BLANK SHIELD',
        paragraphs: ['A shield icon on the soap packaging is completely blank.'],
      },
      parts: [{
        part: '3.5',
        prompt: 'Explain the meaning of the blank shield on the soap packaging.',
        clue: '💡 What is missing?',
        answer: 'The blank shield shows no germs survive — it provides 100% protection.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The blank shield indicates the absence of germs signifying that the soap provides 100% protection.',
        memoCorrection: {
          whatToCheck: 'Must explain shield = protection, blank = no germs.',
          commonMistake: 'Learners describe the shield without "blank".',
          examinerHint: 'Shield = protection. Blank = no germs.',
          alternativeAccept: ['No germs survive', 'Provides protection'],
          memoryTrick: '🧠 "Blank shield = no germs"',
          mergedCorrection: `🧠 Memory Trick: "Blank shield = no germs"\n\n📋 NSC Memo Answer:\nThe blank shield indicates the absence of germs, signifying 100% protection.`,
        },
      }],
    },
    {
      id: 'L3Q13',
      source: '2024 NSC P1, Q3.2.1',
      topicText: 'Need Advertiser Appeals To',
      teachTopic: 'advertisement-analysis',
      passageConfig: {
        label: 'ADVERTISEMENT HEADLINE — SINUTAB',
        paragraphs: ['Sinutab — "Free yourself from a blocked nose."'],
      },
      parts: [{
        part: '3.2.1',
        prompt: 'To which need does the advertiser appeal?',
        clue: '💡 What discomfort is the reader trying to escape?',
        answer: 'The need to be free from nasal discomfort / congestion.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The need to be free from nasal discomfort/congestion.',
        memoCorrection: {
          whatToCheck: 'Must name the specific discomfort.',
          commonMistake: 'Learners answer "health" — too general.',
          examinerHint: 'Blocked nose = congestion.',
          alternativeAccept: ['Free from blocked nose'],
          memoryTrick: '🧠 "Blocked nose = the need"',
          mergedCorrection: `🧠 Memory Trick: "Blocked nose = the need"\n\n📋 NSC Memo Answer:\nThe need to be free from nasal discomfort / congestion.`,
        },
      }],
    },
    {
      id: 'L3Q14',
      source: '2024 NSC P1, Q4.3',
      topicText: 'Mr Wilson Unhappy',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 5',
        paragraphs: ['Mr Wilson stares at his phone without smiling. He says, "That seems like a lot of work."'],
      },
      parts: [{
        part: '4.3',
        prompt: 'Explain how the cartoonist conveys that Mr Wilson is unhappy. Refer to ONE verbal and ONE visual clue.',
        clue: '💡 Verbal = what he SAYS. Visual = what he DOES or how he LOOKS.',
        answer: 'Verbal — he says it is a lot of work. Visual — his mouth is turned down.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Verbal: He says, "That seems like a lot of work."\nVisual: His mouth is turned down.',
        memoCorrection: {
          whatToCheck: 'Must give ONE verbal AND ONE visual clue.',
          commonMistake: 'Learners give two verbal or two visual clues.',
          examinerHint: 'One of each.',
          alternativeAccept: ['Verbal: says it is work. Visual: mouth down'],
          memoryTrick: '🧠 "One verbal + one visual"',
          mergedCorrection: `🧠 Memory Trick: "One verbal + one visual"\n\n📋 NSC Memo Answer:\nVerbal: "That seems like a lot of work."\nVisual: His mouth is turned down.`,
        },
      }],
    },
    {
      id: 'L3Q15',
      source: '2023 NSC P1, Q4.4',
      topicText: 'Jon in Pain',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 7',
        paragraphs: ['Jon shouts "OUCH!" with his mouth wide open.'],
      },
      parts: [{
        part: '4.4',
        prompt: 'Explain how Jon\'s actions convey that he is in pain. Refer to ONE verbal and ONE visual clue.',
        clue: '💡 Verbal = what he says. Visual = how he looks.',
        answer: 'Verbal — he shouts "OUCH!". Visual — his mouth is wide open.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Verbal: He shouts "OUCH!".\nVisual: His mouth is wide open.',
        memoCorrection: {
          whatToCheck: 'Must give ONE verbal AND ONE visual clue.',
          commonMistake: 'Learners give two verbal or two visual clues.',
          examinerHint: 'One of each.',
          alternativeAccept: ['Verbal: shouts OUCH. Visual: mouth open'],
          memoryTrick: '🧠 "One verbal + one visual"',
          mergedCorrection: `🧠 Memory Trick: "One verbal + one visual"\n\n📋 NSC Memo Answer:\nVerbal: He shouts "OUCH!".\nVisual: His mouth is wide open.`,
        },
      }],
    },
    {
      id: 'L3Q16',
      source: '2024 NSC P1, Q4.4',
      topicText: 'Stereotyping Mr & Mrs Wilson',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 6',
        paragraphs: ['Mr Wilson is bald with wrinkles. Mrs Wilson has an old-fashioned hairstyle and wears round glasses.'],
      },
      parts: [{
        part: '4.4',
        prompt: 'How does the cartoonist stereotype Mr and Mrs Wilson as elderly? Reference BOTH.',
        clue: '💡 Look at physical features: hair, wrinkles, glasses, posture.',
        answer: 'Mr — bald, wrinkles, holds phone with two hands. Mrs — old hair, glasses.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mr Wilson is bald/has almost no hair. He has wrinkles/bags under his eyes.\nMrs Wilson has an old-fashioned hairstyle. She is wearing glasses.',
        memoCorrection: {
          whatToCheck: 'Must reference BOTH Mr AND Mrs Wilson.',
          commonMistake: 'Learners describe only one character.',
          examinerHint: 'Physical features: hair, wrinkles, glasses, posture.',
          alternativeAccept: ['Mr: bald, wrinkles. Mrs: hair, glasses'],
          memoryTrick: '🧠 "Two people, two features each"',
          mergedCorrection: `🧠 Memory Trick: "Two people, two features each"\n\n📋 NSC Memo Answer:\nMr Wilson is bald and has wrinkles. Mrs Wilson has an old-fashioned hairstyle and glasses.`,
        },
      }],
    },
    {
      id: 'L3Q17',
      source: '2025 NSC P1, Q4.4',
      topicText: 'Garfield Eyes Contrast',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAMES 4 & 5',
        paragraphs: ['In Frame 4, Garfield\'s eyes are half-closed. In Frame 5, his eyes are wide open.'],
      },
      parts: [{
        part: '4.4',
        prompt: 'Describe the contrast between Garfield in Frame 4 and Frame 5. State TWO points.',
        clue: '💡 Compare eyes AND paws.',
        answer: 'Eyes: half-closed in 4, wide open in 5. Paws: resting in 4, raised in 5.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'In FRAME 4, Garfield\'s eyes are half-closed; in FRAME 5 his eyes are wide open.',
        memoCorrection: {
          whatToCheck: 'Must describe BOTH frames.',
          commonMistake: 'Learners describe one frame only.',
          examinerHint: 'Contrast = both sides.',
          alternativeAccept: ['Eyes differ', 'Paws differ'],
          memoryTrick: '🧠 "Contrast = both sides"',
          mergedCorrection: `🧠 Memory Trick: "Contrast = both sides"\n\n📋 NSC Memo Answer:\nFrame 4: eyes half-closed. Frame 5: eyes wide open.`,
        },
      }],
    },
    {
      id: 'L3Q18',
      source: '2023 NSC P1, Q4.6',
      topicText: 'Sympathise with Jon?',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FULL STRIP',
        paragraphs: ['Jon enjoys his drink, Garfield pesters him for play, then bites him to end the game.'],
      },
      parts: [{
        part: '4.6',
        prompt: 'Do you sympathise with Jon in this cartoon? Discuss your view.',
        clue: '💡 The mark is for the REASON, not Yes/No.',
        answer: 'Yes — Jon did not deserve to be bitten. Or No — Jon should have been more careful with a cat.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Jon does not deserve to be bitten. OR No. Jon should have been more careful when playing with an animal.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON for the choice.',
          commonMistake: 'Learners answer Yes/No without reasoning.',
          examinerHint: 'Open-ended: reason wins.',
          alternativeAccept: ['Yes — Jon didn\'t deserve it'],
          memoryTrick: '🧠 "Open-ended = reason"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason"\n\n📋 NSC Memo Answer:\nYes. Jon does not deserve to be bitten.`,
        },
      }],
    },
    {
      id: 'L3Q19',
      source: '2024 NSC P1, Q4.5',
      topicText: 'Humour in Mrs Wilson\'s Comment',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — FRAME 7',
        paragraphs: ['Mrs Wilson says: "Don\'t worry dear, they have a grumpy emoji, too."'],
      },
      parts: [{
        part: '4.5',
        prompt: 'Do you think Mrs Wilson\'s comment is humorous? Substantiate.',
        clue: '💡 The mark is for the REASON.',
        answer: 'Yes — she comments on his personality in a loving/teasing way.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. It is humorous that Mrs Wilson comments on her husband\'s unfriendly personality by doing it in a loving/teasing manner.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON.',
          commonMistake: 'Learners answer Yes/No without reasoning.',
          examinerHint: 'Open-ended: reason wins.',
          alternativeAccept: ['Yes — teasing'],
          memoryTrick: '🧠 "Open-ended = reason"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason"\n\n📋 NSC Memo Answer:\nYes. She comments on his personality in a loving, teasing way.`,
        },
      }],
    },
    {
      id: 'L3Q20',
      source: '2025 NSC P1, Q4.7',
      topicText: 'Fame Humour',
      teachTopic: 'cartoon-analysis',
      passageConfig: {
        label: 'CARTOON — GARFIELD FAME STRIP',
        paragraphs: ['Jon wears sunglasses, believing they make him look famous. He cannot see the open manhole and falls in.'],
      },
      parts: [{
        part: '4.7',
        prompt: 'Do you find the cartoon humorous? Substantiate.',
        clue: '💡 The mark is for the REASON.',
        answer: 'Yes — the irony of him trying to be noticed but falling into a manhole.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. It is humorous that Jon believes sunglasses will make people think he is famous. However, the sunglasses cause him to fall into the open manhole.',
        memoCorrection: {
          whatToCheck: 'Must give a REASON for the choice.',
          commonMistake: 'Learners answer Yes/No only.',
          examinerHint: 'Open-ended: reason wins.',
          alternativeAccept: ['Yes — ironic'],
          memoryTrick: '🧠 "Open-ended = reason"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason"\n\n📋 NSC Memo Answer:\nYes. It is ironic — he tries to be noticed and falls into a manhole.`,
        },
      }],
    },

    // ============ PAPER 2: CRY, THE BELOVED COUNTRY ============
    {
      id: 'L3Q21',
      source: '2023 NSC P2, Q1.1.8',
      topicText: 'John — Products of Circumstance?',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A',
        paragraphs: ['[Stephen goes to see John.]', 'John Kumalo is a successful businessman who has left the church.'],
      },
      parts: [{
        part: '1.1.8',
        prompt: 'John Kumalo\'s actions are influenced by his circumstances. Discuss your view.',
        clue: '💡 Was he forced to leave Ndotsheni, or did he choose his life?',
        answer: 'Yes — he had to leave for work. Or No — his immoral choices are his own.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. John Kumalo is forced to go to Johannesburg because there is no work in Ndotsheni. He has to work hard to become a successful businessman. OR No. John Kumalo chooses to live a life of immorality. It is his choice not to attend church.',
        memoCorrection: {
          whatToCheck: 'Must give a grounded reason.',
          commonMistake: 'Learners say "yes" or "no" without novel evidence.',
          examinerHint: 'Open-ended: reason must be grounded.',
          alternativeAccept: ['Yes — forced by poverty', 'No — his own choice'],
          memoryTrick: '🧠 "Open-ended = reason, grounded"',
          mergedCorrection: `🧠 Memory Trick: "Open-ended = reason, grounded"\n\n📋 NSC Memo Answer:\nYes. He was forced by poverty. OR No. He chose immorality.`,
        },
      }],
    },
    {
      id: 'L3Q22',
      source: '2023 NSC P2, Q1.2.6',
      topicText: 'Theme of Hope',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B',
        paragraphs: ['[The Bishop is talking.]', 'And does not my heart grieve for him, now that the inksokazi is dead?'],
      },
      parts: [{
        part: '1.2.6',
        prompt: 'One of the themes in Cry, the Beloved Country is hope. Discuss this theme.',
        clue: '💡 Who brings hope in the novel?',
        answer: 'Stephen Kumalo brings hope to Absalom\'s wife and Gertrude\'s son. Arthur Jarvis writes about peace. James Jarvis rebuilds Ndotsheni.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Stephen Kumalo brings hope to Absalom\'s pregnant wife and Gertrude\'s son when he takes them to Ndotsheni. Arthur Jarvis gives hope for a future of peace and equality. James Jarvis brings hope to Ndotsheni with his projects.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "hope" generically without evidence.',
          examinerHint: 'Ground the theme in the novel.',
          alternativeAccept: ['Kumalo brings hope', 'Jarvis rebuilds Ndotsheni'],
          memoryTrick: '🧠 "Hope = Kumalo + Jarvis"',
          mergedCorrection: `🧠 Memory Trick: "Hope = Kumalo + Jarvis"\n\n📋 NSC Memo Answer:\nStephen Kumalo brings hope to Absalom's wife and Gertrude's son. James Jarvis brings hope to Ndotsheni.`,
        },
      }],
    },
    {
      id: 'L3Q23',
      source: '2023 NSC P2, Q1.2.7',
      topicText: 'Title Suitability — Cry',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B',
        paragraphs: ['The title of the novel is Cry, the Beloved Country.'],
      },
      parts: [{
        part: '1.2.7',
        prompt: 'The title, Cry, the Beloved Country is suitable for this novel. Discuss your view.',
        clue: '💡 What does "cry" mean here? Who is the beloved country?',
        answer: 'Yes — "Cry" shows the suffering of Black South Africans; "Beloved" shows the good people who fight for justice.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. "Cry" refers to the suffering of Black South Africans under Apartheid, the destruction of family units, and unemployment. "Beloved" refers to Arthur Jarvis and others who fight for justice.',
        memoCorrection: {
          whatToCheck: 'Must link "Cry" and "Beloved" to the novel.',
          commonMistake: 'Learners only discuss one word of the title.',
          examinerHint: 'Two parts: cry + beloved.',
          alternativeAccept: ['Yes — cry + beloved'],
          memoryTrick: '🧠 "Cry = suffering. Beloved = hope."',
          mergedCorrection: `🧠 Memory Trick: "Cry = suffering. Beloved = hope."\n\n📋 NSC Memo Answer:\n"Cry" shows suffering. "Beloved" shows those who fight for justice.`,
        },
      }],
    },
    {
      id: 'L3Q24',
      source: '2024 NSC P2, Q1.2.6',
      topicText: 'Theme of Regret',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B (2024)',
        paragraphs: ['[James Jarvis is in mourning.]'],
      },
      parts: [{
        part: '1.2.6',
        prompt: 'One of the themes in Cry, the Beloved Country is regret. Discuss this theme.',
        clue: '💡 Who regrets what in the novel?',
        answer: 'James Jarvis regrets not knowing his son better. Gertrude regrets her fall into disrepute. Absalom regrets his bad associations.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'James Jarvis regrets not making more effort to know his adult son better. Gertrude regrets falling into disrepute. Absalom regrets associating with his cousin and his friend.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "regret" generically.',
          examinerHint: 'Ground in specific characters.',
          alternativeAccept: ['Jarvis regrets', 'Gertrude regrets', 'Absalom regrets'],
          memoryTrick: '🧠 "Regret = Jarvis + Gertrude + Absalom"',
          mergedCorrection: `🧠 Memory Trick: "Regret = Jarvis + Gertrude + Absalom"\n\n📋 NSC Memo Answer:\nJames Jarvis regrets not knowing his son better. Gertrude regrets her fall. Absalom regrets his associations.`,
        },
      }],
    },
    {
      id: 'L3Q25',
      source: '2025 NSC P2, Q1.1.7',
      topicText: 'Mrs Kumalo\'s Support',
      teachTopic: 'cry-themes',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A (2025)',
        paragraphs: ['Mrs Kumalo is described as supporting her husband quietly.'],
      },
      parts: [{
        part: '1.1.7',
        prompt: 'Mrs Kumalo is a supportive wife. Discuss your view.',
        clue: '💡 How does she support Stephen? What does she NOT do?',
        answer: 'Yes — she supports Stephen quietly and cares for Absalom\'s wife. Or No — she stays behind when Absalom is on death row.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Mrs Kumalo supports her husband in a quiet, patient manner. She cares for Absalom\'s wife (the young girl) during her pregnancy. OR No. Mrs Kumalo does not accompany her husband when he travels to Johannesburg. She does not visit Absalom on death row.',
        memoCorrection: {
          whatToCheck: 'Must give grounded reasons.',
          commonMistake: 'Learners just describe her as "loving".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — quiet support', 'No — does not visit Absalom'],
          memoryTrick: '🧠 "Mrs Kumalo = quiet support"',
          mergedCorrection: `🧠 Memory Trick: "Mrs Kumalo = quiet support"\n\n📋 NSC Memo Answer:\nYes. She supports Stephen quietly and cares for Absalom's wife.`,
        },
      }],
    },

    // ============ PAPER 2: DR JEKYLL AND MR HYDE ============
    {
      id: 'L3Q26',
      source: '2023 NSC P2, Q2.1.7',
      topicText: 'Utterson\'s Loyalty',
      teachTopic: 'jekyll-themes',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C',
        paragraphs: ['[Mr Utterson receives a visitor.]'],
      },
      parts: [{
        part: '2.1.7',
        prompt: 'Mr Utterson is a loyal man. Discuss your view.',
        clue: '💡 Does he break Jekyll\'s trust?',
        answer: 'Yes — he respects the will and does not read Lanyon\'s letter. Or No — he investigates Hyde against Jekyll\'s wishes.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Mr Utterson does not question Dr Jekyll\'s will. His loyalty is highlighted by the fact that Poole turns to him for assistance. He does not yield to the temptation to read the letter. OR No. Mr Utterson disregards Dr Jekyll\'s request and continues to try and discover Mr Hyde\'s identity.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give a general "yes he is" without reasoning.',
          examinerHint: 'Open-ended: grounded reason wins.',
          alternativeAccept: ['Yes — respects the will', 'No — investigates Hyde'],
          memoryTrick: '🧠 "Loyal = respects Jekyll\'s wishes"',
          mergedCorrection: `🧠 Memory Trick: "Loyal = respects Jekyll's wishes"\n\n📋 NSC Memo Answer:\nYes. He respects the will and does not read Lanyon's letter.`,
        },
      }],
    },
    {
      id: 'L3Q27',
      source: '2023 NSC P2, Q2.2.7',
      topicText: 'Theme of Friendship',
      teachTopic: 'jekyll-themes',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT D',
        paragraphs: ['[Dr Jekyll writes his statement about Mr Hyde.]'],
      },
      parts: [{
        part: '2.2.7',
        prompt: 'One of the themes is friendship. Discuss this theme.',
        clue: '💡 Which friendships are shown in the novel?',
        answer: 'Utterson and Enfield\'s friendship is built on mutual respect. Utterson is loyal to Jekyll. Lanyon and Jekyll\'s friendship is severed by science.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mr Utterson and Mr Enfield\'s friendship is built on unspoken, mutual respect. Mr Utterson is concerned about Dr Jekyll\'s well-being as a loyal friend. Dr Lanyon and Dr Jekyll\'s friendship is severed because of their scientific differences.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "friendship" generically.',
          examinerHint: 'Utterson + Jekyll + Lanyon.',
          alternativeAccept: ['Utterson + Enfield', 'Utterson + Jekyll', 'Lanyon + Jekyll'],
          memoryTrick: '🧠 "Friendship = Utterson + Jekyll + Lanyon"',
          mergedCorrection: `🧠 Memory Trick: "Friendship = Utterson + Jekyll + Lanyon"\n\n📋 NSC Memo Answer:\nUtterson and Enfield's friendship is mutual. Utterson is loyal to Jekyll. Lanyon and Jekyll's friendship is severed by science.`,
        },
      }],
    },
    {
      id: 'L3Q28',
      source: '2024 NSC P2, Q2.2.7',
      topicText: 'Theme of Conflict',
      teachTopic: 'jekyll-themes',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT D (2024)',
        paragraphs: ['[Dr Jekyll reaches out to Dr Lanyon.]'],
      },
      parts: [{
        part: '2.2.7',
        prompt: 'One of the themes is conflict. Discuss this theme.',
        clue: '💡 What conflicts exist in the novel?',
        answer: 'Lanyon and Jekyll conflict over science. Jekyll conflicts with Hyde (his alter-ego). Utterson conflicts with Hyde.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Dr Lanyon and Dr Jekyll are in conflict due to their different scientific beliefs. Dr Jekyll is in conflict with Mr Hyde when he can no longer control him. Mr Utterson and Mr Hyde experience conflict when Mr Utterson confronts Mr Hyde.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "conflict" generically.',
          examinerHint: 'Lanyon + Jekyll + Hyde.',
          alternativeAccept: ['Lanyon vs Jekyll', 'Jekyll vs Hyde'],
          memoryTrick: '🧠 "Conflict = Lanyon + Hyde + Jekyll"',
          mergedCorrection: `🧠 Memory Trick: "Conflict = Lanyon + Hyde + Jekyll"\n\n📋 NSC Memo Answer:\nLanyon and Jekyll conflict over science. Jekyll conflicts with Hyde. Utterson conflicts with Hyde.`,
        },
      }],
    },
    {
      id: 'L3Q29',
      source: '2025 NSC P2, Q2.2.6',
      topicText: 'Theme of Trust',
      teachTopic: 'jekyll-themes',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT D (2025)',
        paragraphs: ['[Dr Jekyll entrusts Poole with secret tasks.]'],
      },
      parts: [{
        part: '2.2.6',
        prompt: 'One of the themes is trust. Discuss this theme.',
        clue: '💡 Who trusts whom in the novel?',
        answer: 'Jekyll trusts Utterson with his will. Jekyll entrusts Poole with secret tasks. Poole trusts Utterson to help with the "stranger".',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Dr Jekyll is comfortable to share confidential information regarding his will with Mr Utterson. Dr Jekyll entrusts Poole to get the powders when he needs to transform. Poole has confidence in Mr Utterson.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "trust" generically.',
          examinerHint: 'Jekyll + Utterson + Poole.',
          alternativeAccept: ['Jekyll trusts Utterson', 'Poole trusts Utterson'],
          memoryTrick: '🧠 "Trust = Jekyll + Utterson + Poole"',
          mergedCorrection: `🧠 Memory Trick: "Trust = Jekyll + Utterson + Poole"\n\n📋 NSC Memo Answer:\nJekyll trusts Utterson with his will. Jekyll entrusts Poole with secret tasks. Poole trusts Utterson.`,
        },
      }],
    },

    // ============ PAPER 2: MACBETH ============
    {
      id: 'L3Q30',
      source: '2023 NSC P2, Q3.1.7',
      topicText: 'Banquo is Brave',
      teachTopic: 'macbeth-themes',
      passageConfig: {
        label: 'MACBETH — EXTRACT E',
        paragraphs: ['BANQUO: This guest of summer, the temple-haunting martlet...'],
      },
      parts: [{
        part: '3.1.7',
        prompt: 'Banquo is brave. Discuss your view.',
        clue: '💡 What does Banquo do or not do?',
        answer: 'Yes — he fights bravely and warns Macbeth about the witches. Or No — he becomes suspicious of Macbeth but does not act on it.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Banquo fights bravely alongside Macbeth as one of King Duncan\'s generals. He warns Macbeth not to trust the witches. OR No. Banquo becomes suspicious of Macbeth but does not act on his suspicions.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give a generic "yes he is brave".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — fights bravely', 'No — doesn\'t act on suspicions'],
          memoryTrick: '🧠 "Banquo: brave + moral"',
          mergedCorrection: `🧠 Memory Trick: "Banquo: brave + moral"\n\n📋 NSC Memo Answer:\nYes. Banquo fights bravely and warns Macbeth about the witches.`,
        },
      }],
    },
    {
      id: 'L3Q31',
      source: '2023 NSC P2, Q3.2.7',
      topicText: 'Theme of Betrayal',
      teachTopic: 'macbeth-themes',
      passageConfig: {
        label: 'MACBETH — EXTRACT F',
        paragraphs: ['[Macbeth is at Dunsinane castle.]'],
      },
      parts: [{
        part: '3.2.7',
        prompt: 'One of the themes is betrayal. Discuss this theme.',
        clue: '💡 Who betrays whom?',
        answer: 'Macbeth betrays Duncan. The Thane of Cawdor betrays Duncan. The witches betray Macbeth with half-truths.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Macbeth betrays Duncan by killing him. The Thane of Cawdor betrays Duncan when he joins the rebel army. The witches betray Macbeth when they prophesy half-truths.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "betrayal" generically.',
          examinerHint: 'Macbeth + Cawdor + witches.',
          alternativeAccept: ['Macbeth betrays Duncan', 'Witches betray Macbeth'],
          memoryTrick: '🧠 "Betrayal = Macbeth + Cawdor + witches"',
          mergedCorrection: `🧠 Memory Trick: "Betrayal = Macbeth + Cawdor + witches"\n\n📋 NSC Memo Answer:\nMacbeth betrays Duncan. Cawdor betrays Duncan. The witches betray Macbeth.`,
        },
      }],
    },
    {
      id: 'L3Q32',
      source: '2024 NSC P2, Q3.2.6',
      topicText: 'Theme of Manhood',
      teachTopic: 'macbeth-themes',
      passageConfig: {
        label: 'MACBETH — EXTRACT F (2024)',
        paragraphs: ['[Macbeth\'s last fight.]'],
      },
      parts: [{
        part: '3.2.6',
        prompt: 'One of the themes is manhood. Discuss this theme.',
        clue: '💡 How is manhood tested in the play?',
        answer: 'Lady Macbeth challenges Macbeth\'s manhood. Lady Macduff questions Macduff\'s priorities. Banquo remains principled.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Lady Macbeth challenges Macbeth\'s manhood when he decides not to kill Duncan. Lady Macduff questions Macduff\'s priorities. Banquo remains principled and does not resort to evil like Macbeth does.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "manhood" generically.',
          examinerHint: 'Lady Macbeth + Lady Macduff + Banquo.',
          alternativeAccept: ['Lady Macbeth challenges', 'Lady Macduff questions'],
          memoryTrick: '🧠 "Manhood = Lady M + Lady Macduff"',
          mergedCorrection: `🧠 Memory Trick: "Manhood = Lady M + Lady Macduff"\n\n📋 NSC Memo Answer:\nLady Macbeth challenges Macbeth's manhood. Lady Macduff questions Macduff's priorities.`,
        },
      }],
    },
    {
      id: 'L3Q33',
      source: '2025 NSC P2, Q3.2.7',
      topicText: 'Theme of Honour',
      teachTopic: 'macbeth-themes',
      passageConfig: {
        label: 'MACBETH — EXTRACT F (2025)',
        paragraphs: ['[Malcolm instructs each soldier to cut a branch.]'],
      },
      parts: [{
        part: '3.2.7',
        prompt: 'One of the themes is honour. Discuss this theme.',
        clue: '💡 Who is honourable and who is not?',
        answer: 'Macbeth and Banquo are praised for valour. Macbeth fights heroically. His honour becomes corrupted by ambition.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Macbeth and Banquo are both praised for their valour in battle. Macbeth fights heroically for King Duncan. Macbeth\'s honour becomes corrupted as his ambition grows.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "honour" generically.',
          examinerHint: 'Macbeth + Banquo.',
          alternativeAccept: ['Macbeth praised', 'Honour corrupted by ambition'],
          memoryTrick: '🧠 "Honour = praised + corrupted"',
          mergedCorrection: `🧠 Memory Trick: "Honour = praised + corrupted"\n\n📋 NSC Memo Answer:\nMacbeth and Banquo are praised for valour. Macbeth's honour becomes corrupted by ambition.`,
        },
      }],
    },

    // ============ PAPER 2: MY CHILDREN! MY AFRICA! ============
    {
      id: 'L3Q34',
      source: '2023 NSC P2, Q4.1.7',
      topicText: 'Do You Admire Mr M?',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G',
        paragraphs: ['[Isabel invites Mr M and Thami to meet her parents.]'],
      },
      parts: [{
        part: '4.1.7',
        prompt: 'Do you admire Mr M? Discuss your view.',
        clue: '💡 What does he do that is admirable? What does he do that is questionable?',
        answer: 'Yes — he brings Black and White learners together. Or No — he betrays his learners by giving names to the Department.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Mr M gives the names of the learners to the Education Department in the hope they will return to school. He is fearless even in the face of death. He brings Black and White learners together. OR No. He betrays his learners when he gives their names to the Education Department.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic praise without evidence.',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — brings learners together', 'No — betrays learners'],
          memoryTrick: '🧠 "Mr M = admirable + flawed"',
          mergedCorrection: `🧠 Memory Trick: "Mr M = admirable + flawed"\n\n📋 NSC Memo Answer:\nYes. He brings learners together and is fearless.`,
        },
      }],
    },
    {
      id: 'L3Q35',
      source: '2023 NSC P2, Q4.2.6',
      topicText: 'Theme of Racial Injustice',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT H',
        paragraphs: ['[The climax of the play.]'],
      },
      parts: [{
        part: '4.2.6',
        prompt: 'One of the themes is racial injustice. Discuss this theme.',
        clue: '💡 What evidence of injustice is in the play?',
        answer: 'Bantu Education is inferior. Black people suffer under unjust laws. Isabel is denied access to the township.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Bantu Education is inferior as the authorities use it to oppress Black people. Black people suffer social injustice as a result of unjust laws (Group Areas Act). Isabel is denied access to the township.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "injustice" generically.',
          examinerHint: 'Bantu Education + Group Areas + township access.',
          alternativeAccept: ['Bantu Education', 'Group Areas Act'],
          memoryTrick: '🧠 "Injustice = Bantu Ed + Group Areas"',
          mergedCorrection: `🧠 Memory Trick: "Injustice = Bantu Ed + Group Areas"\n\n📋 NSC Memo Answer:\nBantu Education is inferior. Black people suffer under unjust laws. Isabel is denied access to the township.`,
        },
      }],
    },
    {
      id: 'L3Q36',
      source: '2023 NSC P2, Q4.2.7',
      topicText: 'Title Suitability — My Children',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT H',
        paragraphs: ['[The climax of the play.]'],
      },
      parts: [{
        part: '4.2.7',
        prompt: 'The title, My Children! My Africa! is suitable for this drama. Discuss your view.',
        clue: '💡 Does Mr M see his learners as his children?',
        answer: 'Yes — the drama is about Mr M\'s love for his learners and Africa. Or No — the learners kill him in the end.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The drama is about school children in Africa. Mr M is like a father to his learners. The exclamation marks indicate Mr M\'s passion for his learners. OR No. The drama focuses on a small group of children. Mr M does not have children of his own.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic "yes" or "no".',
          examinerHint: 'Mr M as father figure.',
          alternativeAccept: ['Yes — Mr M loves learners', 'No — small group'],
          memoryTrick: '🧠 "My = father figure"',
          mergedCorrection: `🧠 Memory Trick: "My = father figure"\n\n📋 NSC Memo Answer:\nYes. Mr M is like a father to his learners.`,
        },
      }],
    },
    {
      id: 'L3Q37',
      source: '2024 NSC P2, Q4.2.7',
      topicText: 'Theme of Teamwork',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT H (2024)',
        paragraphs: ['[Mr M goes to an empty classroom.]'],
      },
      parts: [{
        part: '4.2.7',
        prompt: 'One of the themes is teamwork. Discuss this theme.',
        clue: '💡 Who works together in the play?',
        answer: 'Isabel and Thami work together for the literature quiz. Mr M and Miss Brockway foster relations between schools. Isabel and her teammates ensure victory.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Isabel and Thami devote their time and work with the aim of winning the literature quiz. Mr M and Miss Brockway work together to foster relations. Isabel and her teammates work together to ensure victory.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "teamwork" generically.',
          examinerHint: 'Isabel + Thami + Miss Brockway.',
          alternativeAccept: ['Isabel + Thami', 'Mr M + Miss Brockway'],
          memoryTrick: '🧠 "Teamwork = Isabel + Thami"',
          mergedCorrection: `🧠 Memory Trick: "Teamwork = Isabel + Thami"\n\n📋 NSC Memo Answer:\nIsabel and Thami work together for the quiz. Mr M and Miss Brockway foster relations between schools.`,
        },
      }],
    },
    {
      id: 'L3Q38',
      source: '2024 NSC P2, Q4.2.8',
      topicText: 'Was the Debating Contest a Good Idea?',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT H (2024)',
        paragraphs: ['[Mr M goes to an empty classroom.]'],
      },
      parts: [{
        part: '4.2.8',
        prompt: 'The debating contest is a good idea. Discuss your view.',
        clue: '💡 What did the contest achieve?',
        answer: 'Yes — it gave learners a chance to compete and learn. Or No — it was unsafe and put learners at risk.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The debating contest provides an opportunity for Thami and Isabel to compete against learners from other districts. Students from Zolile High realise they can confidently compete against White learners. OR No. It is potentially unsafe for Camdeboo learners to travel to the township.',
        memoCorrection: {
          whatToCheck: 'Must give grounded reasons.',
          commonMistake: 'Learners answer "yes" or "no" without reasoning.',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — opportunity', 'No — unsafe'],
          memoryTrick: '🧠 "Contest = opportunity + risk"',
          mergedCorrection: `🧠 Memory Trick: "Contest = opportunity + risk"\n\n📋 NSC Memo Answer:\nYes. The contest provides opportunities for learners to compete and learn.`,
        },
      }],
    },
    {
      id: 'L3Q39',
      source: '2025 NSC P2, Q4.1.6',
      topicText: 'Mr M — Victim or Cause?',
      teachTopic: 'mcma-themes',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G (2025)',
        paragraphs: ['[Mr M goes to ask Isabel to form a team with Thami.]'],
      },
      parts: [{
        part: '4.1.6',
        prompt: 'Mr M is responsible for his own fate. Discuss your view.',
        clue: '💡 Did he choose to confront the mob?',
        answer: 'Yes — he chose not to join the comrades and kept ringing the bell. Or No — the apartheid system created the conditions for his death.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Mr M chooses not to join the comrades. He is aware of the consequences of providing the names to the police. He refuses to stop ringing the bell. OR No. The apartheid system implements an inferior Bantu Education system which leads to revolt.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic answer.',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — his choice', 'No — apartheid caused it'],
          memoryTrick: '🧠 "Mr M = choice + system"',
          mergedCorrection: `🧠 Memory Trick: "Mr M = choice + system"\n\n📋 NSC Memo Answer:\nYes. He chose not to join the comrades. He refused to stop ringing the bell.`,
        },
      }],
    },

    // ============ PAPER 2: SHORT STORIES ============
    {
      id: 'L3Q40',
      source: '2023 NSC P2, Q5.1.6',
      topicText: 'Rejection — Theme of Betrayal',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'REJECTION — EXTRACT I',
        paragraphs: ['[The narrator is confused.]'],
      },
      parts: [{
        part: '5.1.6',
        prompt: 'One of the themes in "Rejection" is betrayal. Discuss this theme.',
        clue: '💡 Who betrays whom in this story?',
        answer: 'Modou betrays his wife and daughter by taking a second wife. Binetou betrays Daba. The narrator feels betrayed by Binetou.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Modou betrays his wife and daughter by taking a second wife. Binetou betrays Daba when she marries Modou. The narrator feels betrayed by Binetou as the narrator had been motherly and caring.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "betrayal" generically.',
          examinerHint: 'Modou + Binetou.',
          alternativeAccept: ['Modou betrays', 'Binetou betrays'],
          memoryTrick: '🧠 "Betrayal = Modou + Binetou"',
          mergedCorrection: `🧠 Memory Trick: "Betrayal = Modou + Binetou"\n\n📋 NSC Memo Answer:\nModou betrays his wife by taking a second wife. Binetou betrays Daba.`,
        },
      }],
    },
    {
      id: 'L3Q41',
      source: '2023 NSC P2, Q5.1.7',
      topicText: 'Narrator\'s Strength',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'REJECTION — EXTRACT I',
        paragraphs: ['[The narrator is confused.]'],
      },
      parts: [{
        part: '5.1.7',
        prompt: 'The narrator can be admired for her strength of character. Discuss your view.',
        clue: '💡 How does she react to the news?',
        answer: 'Yes — she accepts the news with dignity and rejects Tamsir\'s proposal. Or No — she is too passive and should fight for her marriage.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The narrator, though shocked, accepts the news of Modou\'s second marriage with dignity. She refuses to be influenced by Daba to divorce Modou. She rejects Tamsir\'s marriage proposal. OR No. The narrator should fight for her marriage. She should have seen the warning signs.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic "yes".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — accepts with dignity', 'No — too passive'],
          memoryTrick: '🧠 "Narrator = dignified"',
          mergedCorrection: `🧠 Memory Trick: "Narrator = dignified"\n\n📋 NSC Memo Answer:\nYes. She accepts the news with dignity and rejects Tamsir's proposal.`,
        },
      }],
    },
    {
      id: 'L3Q42',
      source: '2023 NSC P2, Q5.2.9',
      topicText: 'Eveline — Do You Pity Her?',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'EVELINE — EXTRACT J',
        paragraphs: ['[Eveline reflects on her decision.]'],
      },
      parts: [{
        part: '5.2.9',
        prompt: 'Do you feel sorry for Eveline? Discuss your view.',
        clue: '💡 What is her situation? Does she have choices?',
        answer: 'Yes — she is trapped by her mother\'s wish and her father\'s violence. Or No — she has the opportunity to leave but refuses it.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Eveline\'s chance at happiness is compromised in her effort to remain true to her mother\'s wish. She feels trapped by her situation at home. OR No. Eveline has the opportunity to live a better life but refuses to pursue it.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic "yes".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — trapped', 'No — she refuses to leave'],
          memoryTrick: '🧠 "Eveline = trapped"',
          mergedCorrection: `🧠 Memory Trick: "Eveline = trapped"\n\n📋 NSC Memo Answer:\nYes. She is trapped by her mother's wish and her father's violence.`,
        },
      }],
    },
    {
      id: 'L3Q43',
      source: '2024 NSC P2, Q5.1.6',
      topicText: 'Triumph — Theme of Kindness',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'TRIUMPH IN THE FACE OF ADVERSITY — EXTRACT (2024)',
        paragraphs: ['[Thulisile stands up for herself.]'],
      },
      parts: [{
        part: '5.1.6',
        prompt: 'One of the themes is kindness. Discuss this theme.',
        clue: '💡 Who shows kindness to Thulisile?',
        answer: 'Mme Sadike gives Thulisile hope. Thulisile\'s grandmother lends her money. Mr Rathebe gives her a job.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Mme Sadike gives Thulisile hope by comforting her and giving her bread. Thulisile\'s grandmother lends her money without expecting repayment. Mr Rathebe gives Thulisile a job and allows her to take the leftovers home.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "kindness" generically.',
          examinerHint: 'Mme Sadike + grandmother + Mr Rathebe.',
          alternativeAccept: ['Mme Sadike', 'Grandmother', 'Mr Rathebe'],
          memoryTrick: '🧠 "Kindness = 3 characters"',
          mergedCorrection: `🧠 Memory Trick: "Kindness = 3 characters"\n\n📋 NSC Memo Answer:\nMme Sadike gives hope. The grandmother lends money. Mr Rathebe gives a job.`,
        },
      }],
    },
    {
      id: 'L3Q44',
      source: '2024 NSC P2, Q5.2.9',
      topicText: 'Friedman — Wonderful Childhood?',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'THE WIND AND A BOY — EXTRACT J (2024)',
        paragraphs: ['[Friedman\'s third phase.]'],
      },
      parts: [{
        part: '5.2.9',
        prompt: 'Friedman has a wonderful childhood. Discuss your view.',
        clue: '💡 What is positive about his life? What is difficult?',
        answer: 'Yes — he has freedom to explore and plays. Or No — he does not know his mother\'s love and dies tragically young.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Friedman is allowed to engage in playful activities. He has the freedom to explore his surroundings. He owns a bicycle. OR No. Friedman does not experience his biological mother\'s love. He dies tragically at a young age.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic "yes".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — freedom', 'No — no mother\'s love'],
          memoryTrick: '🧠 "Friedman = free + tragic"',
          mergedCorrection: `🧠 Memory Trick: "Friedman = free + tragic"\n\n📋 NSC Memo Answer:\nYes. He has freedom to explore. OR No. He does not know his mother's love and dies tragically young.`,
        },
      }],
    },
    {
      id: 'L3Q45',
      source: '2025 NSC P2, Q5.1.7',
      topicText: 'Thembekile — Good Role Model?',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'TRIUMPH IN THE FACE OF ADVERSITY (2025)',
        paragraphs: ['Thembekile is Thulisile\'s sister who stays in an abusive marriage.'],
      },
      parts: [{
        part: '5.1.7',
        prompt: 'Thembekile is a good role model. Discuss your view.',
        clue: '💡 How does she handle her marriage?',
        answer: 'Yes — she honours her vows and remains respectful. Or No — she tolerates abuse and declines to move in with Thulisile.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Thembekile honours her marital vows and stays with her husband despite his abusive nature. She remains respectful towards her mother-in-law. OR No. Thembekile gives up on her dream to please her husband. She tolerates the abuse.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic "yes".',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — honours vows', 'No — tolerates abuse'],
          memoryTrick: '🧠 "Thembekile = loyal but trapped"',
          mergedCorrection: `🧠 Memory Trick: "Thembekile = loyal but trapped"\n\n📋 NSC Memo Answer:\nYes. She honours her marital vows. OR No. She tolerates abuse.`,
        },
      }],
    },

    // ============ PAPER 2: POETRY ============
    {
      id: 'L3Q46',
      source: '2023 NSC P2, Q6.1.6',
      topicText: 'Sonnet 73 — Theme of Aging',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
          'Bare ruined choirs where late the sweet birds sang.',
          'In me thou seest the twilight of such day',
          'As after sunset fadeth in the west,',
        ],
      },
      parts: [{
        part: '6.1.6',
        prompt: 'One of the themes in Sonnet 73 is aging. Discuss this theme.',
        clue: '💡 What metaphors for aging does the poem use?',
        answer: 'Autumn represents middle age. The fading day represents the end of life. The dying fire represents youth being consumed.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The speaker\'s reference to aging is evident when he refers to autumn (the metaphorical middle age of man). He is no longer youthful just like the trees that are losing their leaves in autumn. His reference to the end of the day reinforces the realisation that he is ageing.',
        memoCorrection: {
          whatToCheck: 'Must give specific metaphors.',
          commonMistake: 'Learners describe "aging" generically.',
          examinerHint: 'Autumn + twilight + dying fire.',
          alternativeAccept: ['Autumn = middle age', 'Twilight = end of life'],
          memoryTrick: '🧠 "Aging = autumn + twilight + fire"',
          mergedCorrection: `🧠 Memory Trick: "Aging = autumn + twilight + fire"\n\n📋 NSC Memo Answer:\nAutumn represents middle age. The fading day represents the end of life. The dying fire represents youth being consumed.`,
        },
      }],
    },
    {
      id: 'L3Q47',
      source: '2023 NSC P2, Q6.1.7',
      topicText: 'Sonnet 73 — Love Poem?',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'In me thou seest the glowing of such fire',
          'That on the ashes of his youth doth lie,',
          'As the deathbed whereon it must expire,',
          'Consumed with that which it was nourished by.',
          'This thou perceiv\'st, which makes thy love more strong,',
          'To love that well which thou must leave ere long.',
        ],
      },
      parts: [{
        part: '6.1.7',
        prompt: 'Sonnet 73 is a love poem. Discuss your view.',
        clue: '💡 Does the poem focus on love, or only on aging?',
        answer: 'Yes — the couplet speaks of strengthening love before death. Or No — the first quatrains focus on ageing without reference to love.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The speaker and his lover choose to accept the finality of death but they are also committed to loving fully before they die. He pleads in the couplet for their love to remain. OR No. In lines 1-8 the speaker focuses on the process of ageing without any reference to love.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners only describe the poem.',
          examinerHint: 'Couplet mentions love.',
          alternativeAccept: ['Yes — couplet on love', 'No — no love reference'],
          memoryTrick: '🧠 "Couplet = love"',
          mergedCorrection: `🧠 Memory Trick: "Couplet = love"\n\n📋 NSC Memo Answer:\nYes. The couplet speaks of strengthening love before death.`,
        },
      }],
    },
    {
      id: 'L3Q48',
      source: '2023 NSC P2, Q6.2.7',
      topicText: 'Innisfree — Realistic Speaker?',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, and go to Innisfree,',
          'And a small cabin build there, of clay and wattles made:',
          'Nine bean-rows will I have there, a hive for the honey-bee,',
          'And live alone in the bee-loud glade.',
          'I hear it in the deep heart\'s core.',
        ],
      },
      parts: [{
        part: '6.2.7',
        prompt: 'The speaker is realistic. Discuss your view.',
        clue: '💡 Does he actually go to Innisfree?',
        answer: 'No — the speaker imagines everything; the poem ends with "I hear it in the deep heart\'s core" — a dream. Or Yes — he is emphatic with repetition of "go".',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'No. The speaker is not realistic as everything he mentions is what he imagines. He concludes the poem by saying that he hears the sound of the water which is only a dream. OR Yes. The speaker emphatically states that he will go to Innisfree. He is determined to enjoy the solitude and peace.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners answer without reasoning.',
          examinerHint: '"Deep heart\'s core" = dream.',
          alternativeAccept: ['No — it\'s a dream', 'Yes — emphatic repetition'],
          memoryTrick: '🧠 "Heart\'s core = dream"',
          mergedCorrection: `🧠 Memory Trick: "Heart's core = dream"\n\n📋 NSC Memo Answer:\nNo. The speaker imagines Innisfree; the poem ends with a dream.`,
        },
      }],
    },
    {
      id: 'L3Q49',
      source: '2024 NSC P2, Q6.1.7',
      topicText: 'Slave Dealer — Theme of Guilt',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Slave Dealer',
        poet: 'Thomas Pringle',
        lines: [
          'There\'s blood upon my hands! he said,',
          'Which water cannot wash;',
          'It was not shed where warriors bled —',
          'It dropped from the gory lash,',
        ],
      },
      parts: [{
        part: '6.1.7',
        prompt: 'One of the themes in "The slave dealer" is guilt. Discuss this theme.',
        clue: '💡 What is the slave dealer guilty of? How does he show it?',
        answer: 'He is plagued by the memory of his cruelty. He admits no water can wash the blood from his hands. The dying woman\'s cry haunts him.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The slave dealer is plagued by what he made other people endure (torture, pain, exploitation). He admits that no amount of water can wash away the blood on his hands. The cry of the dying woman is like a refrain in his ears.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "guilt" generically.',
          examinerHint: 'Blood + water + woman\'s cry.',
          alternativeAccept: ['No water washes blood', 'Woman\'s cry haunts'],
          memoryTrick: '🧠 "Guilt = blood + cry"',
          mergedCorrection: `🧠 Memory Trick: "Guilt = blood + cry"\n\n📋 NSC Memo Answer:\nThe slave dealer is plagued by what he has done. He admits no water can wash the blood. The woman's cry haunts him.`,
        },
      }],
    },
    {
      id: 'L3Q50',
      source: '2024 NSC P2, Q6.1.8',
      topicText: 'Slave Dealer\'s Mother',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Slave Dealer',
        poet: 'Thomas Pringle',
        lines: [
          'Now, Christ from frenzy keep my son!',
          'The woeful Widow cried;',
          'Such murder foul thou ne\'er hast done —',
          'Some fiend thy soul belied!',
        ],
      },
      parts: [{
        part: '6.1.8',
        prompt: 'The slave dealer\'s mother can be pitied. Discuss your view.',
        clue: '💡 What does she go through?',
        answer: 'Yes — she is a widow and her only son causes her heartache. Or No — she tries to excuse his atrocities.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The slave dealer\'s mother is a widow and he is her only child; he goes astray which causes her heartache. She has been separated from her son for so many years that she does not recognise him. OR No. She tries to convince him that he is not guilty of his treatment of the slaves.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners give generic answer.',
          examinerHint: 'Widow + only child.',
          alternativeAccept: ['Yes — widow', 'No — excuses him'],
          memoryTrick: '🧠 "Mother = widow + pain"',
          mergedCorrection: `🧠 Memory Trick: "Mother = widow + pain"\n\n📋 NSC Memo Answer:\nYes. She is a widow and her only child causes her heartache.`,
        },
      }],
    },
    {
      id: 'L3Q51',
      source: '2024 NSC P2, Q6.2.8',
      topicText: 'Hard to Find — Title Suitability',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Hard to Find',
        poet: 'Sinesipo Jojo',
        lines: [
          'they are hard to find',
          'when they are needed by the heart;',
          'when the heart feels,',
          'words hide like they are not part of life.',
        ],
      },
      parts: [{
        part: '6.2.8',
        prompt: 'The title, "Hard to find", is suitable for this poem. Discuss your view.',
        clue: '💡 What is hard to find?',
        answer: 'Yes — the poem is about how hard it is to find the right words. Or No — words are readily available in every situation.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The speaker struggles to find words, especially when she needs to express her innermost feelings. She admits that there are some things that she does not understand. OR No. The poem indicates that words are readily available to use in every situation.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners answer without reasoning.',
          examinerHint: 'Words hide when needed.',
          alternativeAccept: ['Yes — words hard to find', 'No — words always available'],
          memoryTrick: '🧠 "Title = words hide"',
          mergedCorrection: `🧠 Memory Trick: "Title = words hide"\n\n📋 NSC Memo Answer:\nYes. The poem is about how hard it is to find the right words when the heart feels.`,
        },
      }],
    },
    {
      id: 'L3Q52',
      source: '2025 NSC P2, Q6.1.7',
      topicText: 'Inversnaid — Wildness of Nature',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Inversnaid',
        poet: 'Gerard Manley Hopkins',
        lines: [
          'This darksome burn, horseback brown,',
          'His rollrock highroad roaring down,',
          'In coop and in comb the fleece of his foam',
          'Flutes and low to the lake falls home.',
        ],
      },
      parts: [{
        part: '6.1.7',
        prompt: 'One of the themes is the wildness of nature. Discuss this theme.',
        clue: '💡 What images show wildness?',
        answer: 'The word "rollrock" suggests untamed movement. "Fell-frowning" describes fierce hills. "Wiry" implies strength and danger.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'The word "rollrock" gives the image of an untamed horse galloping over the rocks. "Fell-frowning" describes the fierce hills. "Wiry" implies strength but also danger.',
        memoCorrection: {
          whatToCheck: 'Must give specific examples.',
          commonMistake: 'Learners describe "nature" generically.',
          examinerHint: 'Rollrock + fell-frowning + wiry.',
          alternativeAccept: ['Rollrock = untamed', 'Fell-frowning = fierce'],
          memoryTrick: '🧠 "Wild = rollrock + fell"',
          mergedCorrection: `🧠 Memory Trick: "Wild = rollrock + fell"\n\n📋 NSC Memo Answer:\n"Rollrock" suggests untamed movement. "Fell-frowning" describes fierce hills. "Wiry" implies strength and danger.`,
        },
      }],
    },
    {
      id: 'L3Q53',
      source: '2025 NSC P2, Q6.1.8',
      topicText: 'Inversnaid — Peaceful or Ominous?',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Inversnaid',
        poet: 'Gerard Manley Hopkins',
        lines: [
          'Of a pool so pitchblack, fell-frowning,',
          'It rounds and rounds Despair to drowning.',
          'Degged with dew, dappled with dew',
          'Are the groins of the braes that the brook treads through,',
        ],
      },
      parts: [{
        part: '6.1.8',
        prompt: 'The poem creates a peaceful atmosphere. Discuss your view.',
        clue: '💡 Is the scene calm or threatening?',
        answer: 'Yes — dew on the slopes creates serenity. Or No — "windles" suggests violent movement; "pitchblack" is ominous.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. In line 9 the slopes are described as "Degged with dew" which creates an atmosphere of serenity. "Treads" shows the slow and careful movement of the river. OR No. "Windles" alludes to a whirlpool which indicates violent movement.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners answer without reasoning.',
          examinerHint: 'Choose + ground in the poem.',
          alternativeAccept: ['Yes — dew + serenity', 'No — windles + pitchblack'],
          memoryTrick: '🧠 "Peaceful vs ominous"',
          mergedCorrection: `🧠 Memory Trick: "Peaceful vs ominous"\n\n📋 NSC Memo Answer:\nYes. Dew creates serenity. OR No. "Windles" suggests violent movement.`,
        },
      }],
    },
    {
      id: 'L3Q54',
      source: '2025 NSC P2, Q6.2.8',
      topicText: 'Sonnet 73 — Pity the Speaker?',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'This thou perceiv\'st, which makes thy love more strong,',
          'To love that well which thou must leave ere long.',
        ],
      },
      parts: [{
        part: '6.2.8',
        prompt: 'The speaker can be pitied. Discuss your view.',
        clue: '💡 What is his situation? Does he accept it?',
        answer: 'Yes — his aging evokes pity and he is helpless against death. Or No — he accepts aging as natural and sees it as a reason for deeper connection.',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The speaker\'s aging, reflected by withering leaves, evokes pity. His time is running out as his life is compared to a fading sunset. OR No. He encourages a deeper understanding of life\'s transience. He sees aging and death as a reason for deeper connection.',
        memoCorrection: {
          whatToCheck: 'Must give grounded evidence.',
          commonMistake: 'Learners answer without reasoning.',
          examinerHint: 'Grounded evidence.',
          alternativeAccept: ['Yes — pitiable', 'No — accepts as natural'],
          memoryTrick: '🧠 "Pity or acceptance"',
          mergedCorrection: `🧠 Memory Trick: "Pity or acceptance"\n\n📋 NSC Memo Answer:\nYes. His aging evokes pity. OR No. He accepts aging as natural and sees it as a reason for deeper connection.`,
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 4 — Extended (5–8 marks)
  // ================================================================
  level4: [
    {
      id: 'L4Q1',
      source: '2023 NSC P1, Q2 (Summary)',
      topicText: 'Vaseline Summary',
      teachTopic: 'summary-writing',
      passageConfig: {
        label: 'TEXT C — THE RESTORATIVE POWER OF VASELINE',
        paragraphs: [
          'The hydrating power of Vaseline is a good remedy for dry skin. Applying it to the body after a shower keeps the skin moisturised.',
          'For minor wounds such as cuts, scrapes, scratches and burns, use Vaseline to keep the wound moist — this will aid the healing process.',
          'Vaseline is hypoallergenic; therefore it is suitable for sensitive skin, making it a good skincare option for babies to prevent nappy rash.',
          'Put some Vaseline on itchy spots for instant relief from mosquito bites and bee stings.',
          'Rubbing a little Vaseline into the hair gives it instant shine and reduces the look of split ends.',
          'Coat chewing gum stuck in your hair with Vaseline and pull gently to remove it.',
          'For teeth whitening, mix two tablespoons of baking soda with Vaseline and apply to dry teeth using a toothbrush.',
          'Apply a combination of Vaseline and salt on the edges of flower pots to keep snails and ants away.',
        ],
      },
      parts: [{
        part: 'Q2',
        prompt: 'Read TEXT C and list SEVEN benefits of using Vaseline petroleum jelly. Use no more than 70 words. Number 1 to 7. Use your OWN words.',
        clue: '💡 One sentence per point. Own words. Count the words.',
        answer: '7 numbered points in own words, under 70 words.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: '1. Vaseline is used to treat dry skin.\n2. It keeps less serious wounds moist.\n3. It can be used on sensitive skin.\n4. It can be used to prevent nappy rash.\n5. Vaseline promptly relieves itchiness.\n6. Applying Vaseline to the hair makes it shiny.\n7. It hides split ends.',
        memoCorrection: {
          whatToCheck: 'Must have 7 numbered points in own words, under 70 words.',
          commonMistake: 'Learners copy verbatim — loses all language marks.',
          examinerHint: '7 points = 7 marks. Language = 3 marks.',
          alternativeAccept: ['7 points, own words, under 70 words'],
          memoryTrick: '🧠 "7 points, own words, under 70"',
          mergedCorrection: `🧠 Memory Trick: "7 points, own words, under 70"\n\n📋 NSC Memo Answer:\n1. Vaseline treats dry skin.\n2. It heals minor wounds.\n3. It suits sensitive skin.\n4. It prevents nappy rash.\n5. It relieves itchiness.\n6. It makes hair shiny.\n7. It removes chewing gum from hair.`,
        },
      }],
    },
    {
      id: 'L4Q2',
      source: '2024 NSC P1, Q2 (Summary)',
      topicText: 'How to Get Active — Summary',
      teachTopic: 'summary-writing',
      passageConfig: {
        label: 'TEXT C — HOW TO GET ACTIVE',
        paragraphs: [
          'Regular walking can make a big difference to your overall health. A twenty-minute walk with your dog will not only make your pet happy, but it will also get your heart pumping.',
          'Take every opportunity to move your feet and you will be surprised at how much more active you will be.',
          'When you cycle to work or school, it is not only good for your health, but also for the environment.',
          'Make it a rule to always take the stairs instead of the escalator or lift.',
          'Jogging is another effective way of keeping physically active.',
          'Housework is good exercise as well.',
          'Remember to get up and stretch and take a few steps every half an hour.',
          'Dancing is a fantastic workout as it gets you moving.',
        ],
      },
      parts: [{
        part: 'Q2',
        prompt: 'Read TEXT C and list SEVEN points on how to be more active while doing everyday activities. No more than 70 words. Number 1 to 7. Own words.',
        clue: '💡 One sentence per point. Own words. Count the words.',
        answer: '7 numbered points in own words, under 70 words.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: '1. Walk regularly to improve your health.\n2. Move around at every opportunity.\n3. Cycle to your destination.\n4. Climb the stairs regularly.\n5. Jog in order to remain physically active.\n6. Do housework to exercise your body.\n7. Stretch and walk every half an hour.',
        memoCorrection: {
          whatToCheck: 'Must have 7 numbered points in own words, under 70 words.',
          commonMistake: 'Learners copy verbatim.',
          examinerHint: '7 points + language.',
          alternativeAccept: ['7 points, own words, under 70 words'],
          memoryTrick: '🧠 "7 points, own words, under 70"',
          mergedCorrection: `🧠 Memory Trick: "7 points, own words, under 70"\n\n📋 NSC Memo Answer:\n1. Walk regularly.\n2. Move at every opportunity.\n3. Cycle.\n4. Take the stairs.\n5. Jog.\n6. Do housework.\n7. Stretch and walk every half hour.`,
        },
      }],
    },
    {
      id: 'L4Q3',
      source: '2025 NSC P1, Q2 (Summary)',
      topicText: 'Preparing for Tertiary Studies',
      teachTopic: 'summary-writing',
      passageConfig: {
        label: 'TEXT C — PREPARING FOR TERTIARY STUDIES',
        paragraphs: [
          'Once you have chosen your course, familiarise yourself with its requirements.',
          'Decide whether you will need financial aid.',
          'If you will be paying for your studies, settle the registration fees to confirm your admission.',
          'Should you require accommodation away from home, arrange for suitable student housing.',
          'Organise documents such as your admission letter, matric statement, and any other forms required for enrolment.',
          'Make sure you have the necessary items, such as stationery and a laptop.',
          'Find out about the services offered to students such as libraries, student organisations and social clubs.',
          'Define clear academic goals for your upcoming tertiary experience.',
          'Work on your time management skills because tertiary education involves a heavier workload.',
        ],
      },
      parts: [{
        part: 'Q2',
        prompt: 'Read TEXT C and list SEVEN points on how to prepare for tertiary studies. No more than 70 words. Number 1 to 7. Own words.',
        clue: '💡 One sentence per point. Own words. Count the words.',
        answer: '7 numbered points in own words, under 70 words.',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: '1. Explore your course requirements.\n2. Consider how you will fund your studies.\n3. Pay the registration fees.\n4. Look for appropriate accommodation.\n5. Have the required documents ready.\n6. Obtain the necessary items for your studies.\n7. Explore the available student services.',
        memoCorrection: {
          whatToCheck: 'Must have 7 numbered points in own words, under 70 words.',
          commonMistake: 'Learners copy verbatim.',
          examinerHint: '7 points + language.',
          alternativeAccept: ['7 points, own words, under 70 words'],
          memoryTrick: '🧠 "7 points, own words, under 70"',
          mergedCorrection: `🧠 Memory Trick: "7 points, own words, under 70"\n\n📋 NSC Memo Answer:\n1. Check course requirements.\n2. Consider funding.\n3. Pay registration fees.\n4. Arrange accommodation.\n5. Prepare documents.\n6. Get study items.\n7. Explore student services.`,
        },
      }],
    },
    {
      id: 'L4Q4',
      source: '2023 NSC P1, Q1.7',
      topicText: 'Jeans Impact on Environment',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION, PARAGRAPH 7',
        paragraphs: [
          'Washing clothes releases 500,000 tons of microfibres into the ocean each year.',
          'More than 10,000 litres of water is used when manufacturing a single pair of jeans.',
          'There is a further impact on the environment when garments are shipped and delivered to the point of sale.',
        ],
      },
      parts: [{
        part: '1.7',
        prompt: 'How can the purchase of a single pair of jeans negatively impact the environment? State TWO points.',
        clue: '💡 Think: microfibres, water, shipping fuel.',
        answer: 'Washing jeans releases microfibres into the ocean. 10,000 litres of water go into making a single pair. Fuel used in shipping pollutes.',
        marks: 5,
        acceptAnyTwo: true,
        memoFullAnswer: 'Washing the jeans releases microfibres into the ocean thus polluting it.\n10,000 litres of water go into the manufacturing of a single pair of jeans thereby reducing water resources.\nThe fuel used in the shipping and delivery of the jeans contributes to pollution.',
        memoCorrection: {
          whatToCheck: 'Must give TWO distinct environmental impacts.',
          commonMistake: 'Learners give one impact.',
          examinerHint: 'Three impacts: microfibres, water use, shipping fuel.',
          alternativeAccept: ['Microfibres pollute ocean', '10,000 litres of water', 'Fuel from shipping'],
          memoryTrick: '🧠 "Microfibres · Water · Fuel"',
          mergedCorrection: `🧠 Memory Trick: "Microfibres · Water · Fuel"\n\n📋 NSC Memo Answer:\nWashing the jeans releases microfibres into the ocean.\n10,000 litres of water go into manufacturing a single pair of jeans.\nFuel used in shipping pollutes.`,
        },
      }],
    },
    {
      id: 'L4Q5',
      source: '2024 NSC P1, Q5.1.4',
      topicText: 'Reported Speech',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'DIRECT SPEECH',
        paragraphs: ['Chef Benny said: "They roped me in as a chef who is synonymous with braai."'],
      },
      parts: [{
        part: '5.1.4',
        prompt: 'Rewrite in reported speech: Chef Benny said, "They roped me in as a chef who is synonymous with braai."',
        clue: '💡 Change pronoun (me → him), change tense (roped → had roped), remove quotes, add "that".',
        answer: 'Chef Benny said that they had roped him in as a chef who is synonymous with braai.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'Chef Benny said (that) they had roped him in as a chef who is synonymous with braai.',
        memoCorrection: {
          whatToCheck: 'Must change pronoun, tense, and punctuation correctly.',
          commonMistake: 'Learners forget to change the tense.',
          examinerHint: 'Present → past. Roped → had roped.',
          alternativeAccept: ['Chef Benny said that they had roped him in as a chef who is synonymous with braai'],
          memoryTrick: '🧠 "Pronoun + Tense + That"',
          mergedCorrection: `🧠 Memory Trick: "Pronoun + Tense + That"\n\n📋 NSC Memo Answer:\nChef Benny said that they had roped him in as a chef who is synonymous with braai.`,
        },
      }],
    },
    {
      id: 'L4Q6',
      source: '2023 NSC P1, Q5.1.4',
      topicText: 'Reported Speech — Bees',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'DIRECT SPEECH',
        paragraphs: ['He said, "I turned the passion for bees into a business."'],
      },
      parts: [{
        part: '5.1.4',
        prompt: 'Rewrite in reported speech: He said, "I turned the passion for bees into a business."',
        clue: '💡 I → he; turned → had turned; remove quotes; add "that".',
        answer: 'He said that he had turned the passion for bees into a business.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'He said (that) he had turned the passion for bees into a business.',
        memoCorrection: {
          whatToCheck: 'Must change pronoun + tense + punctuation.',
          commonMistake: 'Learners forget to change the tense.',
          examinerHint: 'Present → past. Turned → had turned.',
          alternativeAccept: ['He said that he had turned the passion for bees into a business'],
          memoryTrick: '🧠 "Pronoun + Tense + That"',
          mergedCorrection: `🧠 Memory Trick: "Pronoun + Tense + That"\n\n📋 NSC Memo Answer:\nHe said that he had turned the passion for bees into a business.`,
        },
      }],
    },
    {
      id: 'L4Q7',
      source: '2024 NSC P1, Q5.1.6',
      topicText: 'Passive Voice',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'ACTIVE VOICE',
        paragraphs: ['Simba has created a delicious braai companion.'],
      },
      parts: [{
        part: '5.1.6',
        prompt: 'Rewrite in the passive voice: Simba has created a delicious braai companion.',
        clue: '💡 Object becomes subject. Verb becomes "has been + past participle".',
        answer: 'A delicious braai companion has been created by Simba.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'A delicious braai companion has been created by Simba.',
        memoCorrection: {
          whatToCheck: 'Must be passive with "has been created".',
          commonMistake: 'Learners forget "has been".',
          examinerHint: 'Object → subject. Verb → has been + past participle.',
          alternativeAccept: ['A delicious braai companion has been created by Simba'],
          memoryTrick: '🧠 "Passive: object first, has/have been + verb"',
          mergedCorrection: `🧠 Memory Trick: "Passive: object first, has/have been + verb"\n\n📋 NSC Memo Answer:\nA delicious braai companion has been created by Simba.`,
        },
      }],
    },
    {
      id: 'L4Q8',
      source: '2023 NSC P1, Q5.1.7',
      topicText: 'Active Voice',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'PASSIVE VOICE',
        paragraphs: ['A beekeeping permit is required by anyone who wishes to become a beekeeper.'],
      },
      parts: [{
        part: '5.1.7',
        prompt: 'Rewrite the following sentence in the active voice: A beekeeping permit is required by anyone who wishes to become a beekeeper.',
        clue: '💡 Move the doer to the front.',
        answer: 'Anyone who wishes to become a beekeeper requires a beekeeping permit.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'Anyone who wishes to become a beekeeper requires a beekeeping permit.',
        memoCorrection: {
          whatToCheck: 'Must put the doer first.',
          commonMistake: 'Learners keep "by".',
          examinerHint: 'Active = doer first.',
          alternativeAccept: ['Anyone who wishes to become a beekeeper requires a beekeeping permit'],
          memoryTrick: '🧠 "Active: doer first"',
          mergedCorrection: `🧠 Memory Trick: "Active: doer first"\n\n📋 NSC Memo Answer:\nAnyone who wishes to become a beekeeper requires a beekeeping permit.`,
        },
      }],
    },
    {
      id: 'L4Q9',
      source: '2025 NSC P1, Q5.1.8',
      topicText: 'Reported Speech — Minister',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'DIRECT SPEECH',
        paragraphs: ['Minister Barbara Creecy said, "I am pleased to note the success of National Parks Week."'],
      },
      parts: [{
        part: '5.1.8',
        prompt: 'Rewrite in reported speech: Minister Barbara Creecy said, "I am pleased to note the success of National Parks Week."',
        clue: '💡 I → she; am → was; remove quotes; add "that".',
        answer: 'Minister Barbara Creecy said that she was pleased to note the success of National Parks Week.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'Minister Barbara Creecy said (that) she was pleased to note the success of National Parks Week.',
        memoCorrection: {
          whatToCheck: 'Must change pronoun + tense.',
          commonMistake: 'Learners forget to change "am" to "was".',
          examinerHint: 'I → she; am → was.',
          alternativeAccept: ['Minister Barbara Creecy said that she was pleased to note the success of National Parks Week'],
          memoryTrick: '🧠 "Pronoun + Tense + That"',
          mergedCorrection: `🧠 Memory Trick: "Pronoun + Tense + That"\n\n📋 NSC Memo Answer:\nMinister Barbara Creecy said that she was pleased to note the success of National Parks Week.`,
        },
      }],
    },
    {
      id: 'L4Q10',
      source: '2023 NSC P1, Q5.2.1',
      topicText: 'Negative Form',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'AFFIRMATIVE',
        paragraphs: ['My siblings enjoy eating raw vegetables.'],
      },
      parts: [{
        part: '5.2.1',
        prompt: 'Rewrite the following sentence in the negative form: My siblings enjoy eating raw vegetables.',
        clue: '💡 Add "don\'t" before the verb.',
        answer: "My siblings don't enjoy eating raw vegetables.",
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: "My siblings don't / do not enjoy eating raw vegetables.",
        memoCorrection: {
          whatToCheck: 'Must use "don\'t".',
          commonMistake: 'Learners use "doesn\'t".',
          examinerHint: 'Plural subject → don\'t.',
          alternativeAccept: ["My siblings don't enjoy eating raw vegetables"],
          memoryTrick: '🧠 "Plural = don\'t"',
          mergedCorrection: `🧠 Memory Trick: "Plural = don't"\n\n📋 NSC Memo Answer:\nMy siblings don't enjoy eating raw vegetables.`,
        },
      }],
    },
    {
      id: 'L4Q11',
      source: '2024 NSC P1, Q5.1.8',
      topicText: 'Negative Form — Steakhouse Beef',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'AFFIRMATIVE',
        paragraphs: ['The new Steakhouse Beef stands out as distinct.'],
      },
      parts: [{
        part: '5.1.8',
        prompt: 'Rewrite the following sentence in the negative form: The new Steakhouse Beef stands out as distinct.',
        clue: '💡 Add "doesn\'t" before "stand".',
        answer: "The new Steakhouse Beef doesn't stand out as distinct.",
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: "The new Steakhouse Beef doesn't / does not stand out as distinct.",
        memoCorrection: {
          whatToCheck: 'Must use "doesn\'t".',
          commonMistake: 'Learners use "don\'t".',
          examinerHint: 'Singular subject → doesn\'t.',
          alternativeAccept: ["The new Steakhouse Beef doesn't stand out as distinct"],
          memoryTrick: '🧠 "Singular = doesn\'t"',
          mergedCorrection: `🧠 Memory Trick: "Singular = doesn't"\n\n📋 NSC Memo Answer:\nThe new Steakhouse Beef doesn't stand out as distinct.`,
        },
      }],
    },
    {
      id: 'L4Q12',
      source: '2023 NSC P1, Q5.2.2',
      topicText: 'Not Only... But Also (Extended)',
      teachTopic: 'grammar-and-punctuation',
      passageConfig: {
        label: 'TEXT G — SPINACH',
        paragraphs: ['Spinach tastes good. Spinach improves digestion.'],
      },
      parts: [{
        part: '5.2.2',
        prompt: 'Combine into one sentence beginning with "Not only ..."',
        clue: '💡 Not only + helping verb + subject.',
        answer: 'Not only does spinach taste good, but it also improves digestion.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: 'Not only does spinach taste good, (but) it also improves digestion.',
        memoCorrection: {
          whatToCheck: 'Must use inversion after "Not only".',
          commonMistake: 'Learners forget the inversion.',
          examinerHint: 'Not only + helping verb + subject.',
          alternativeAccept: ['Not only does spinach taste good, but it also improves digestion'],
          memoryTrick: '🧠 "Not only = flip the verb"',
          mergedCorrection: `🧠 Memory Trick: "Not only = flip the verb"\n\n📋 NSC Memo Answer:\nNot only does spinach taste good, but it also improves digestion.`,
        },
      }],
    },

    // ============ PAPER 2: NOVEL EXTENDED ============
    {
      id: 'L4Q13',
      source: '2023 NSC P2, Q1.1 (Extended Extract)',
      topicText: 'Cry — Extract A Analysis',
      teachTopic: 'cry-context',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT A (Full Analysis)',
        paragraphs: [
          '[Stephen goes to see John.]',
          'He growled, and his voice grew deep, it was like thunder that was rolling. "But it is not built on the mines," he said, "it is built on our backs, on our sweat, on our labour."',
        ],
      },
      parts: [{
        part: '1.1 (Full)',
        prompt: 'Analyse Extract A in full: identify the figure of speech in line 1, explain the irony in John\'s argument, and explain Msimangu\'s tone in line 20.',
        clue: '💡 Three separate tasks: figure of speech, irony, tone.',
        answer: 'Simile. The irony is John lives comfortably yet claims to speak for the workers. Msimangu is sarcastic/mocking.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Simile — the voice is compared to rolling thunder.\nIrony — John claims Black people do the hard labour yet John himself lives a comfortable life.\nMsimangu is sarcastic/mocking/derisive — he thinks John uses customs as an excuse for immorality.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Figure of speech + irony + tone.',
          alternativeAccept: ['Simile + irony + sarcastic tone'],
          memoryTrick: '🧠 "3 tasks: figure, irony, tone"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: figure, irony, tone"\n\n📋 NSC Memo Answer:\nSimile. Irony — John lives comfortably. Msimangu is sarcastic.`,
        },
      }],
    },
    {
      id: 'L4Q14',
      source: '2023 NSC P2, Q1.2 (Extended Extract)',
      topicText: 'Cry — Extract B Analysis',
      teachTopic: 'cry-context',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — EXTRACT B (Full Analysis)',
        paragraphs: [
          '[The Bishop is talking.]',
          'Did he not send the milk for the children, and did he not get this young demonstrator to teach the people farming?',
        ],
      },
      parts: [{
        part: '1.2 (Full)',
        prompt: 'Analyse Extract B in full: describe the setting, explain what Jarvis\'s words reveal, and discuss Stephen\'s state of mind.',
        clue: '💡 Three parts: setting, character, state of mind.',
        answer: 'Setting — Stephen\'s house, when the Bishop tells him he must move. Jarvis reveals he is caring. Stephen is anguished.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Setting: Stephen Kumalo\'s house in Ndotsheni when the Bishop tells him he must move.\nJarvis is caring/compassionate as he contributes to restoration.\nStephen is anguished/distressed as he does not want to leave Ndotsheni.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Setting + character + state of mind.',
          alternativeAccept: ['Stephen\'s house + caring Jarvis + anguished Stephen'],
          memoryTrick: '🧠 "3 tasks: setting, character, mood"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: setting, character, mood"\n\n📋 NSC Memo Answer:\nSetting: Stephen's house in Ndotsheni. Jarvis is caring. Stephen is anguished.`,
        },
      }],
    },

    // ============ PAPER 2: JEKYLL EXTENDED ============
    {
      id: 'L4Q15',
      source: '2023 NSC P2, Q2.1 (Extended Extract)',
      topicText: 'Jekyll — Extract C Analysis',
      teachTopic: 'jekyll-context',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — EXTRACT C (Full Analysis)',
        paragraphs: [
          '[Mr Utterson receives a visitor.]',
          'Guest\'s eyes brightened, and he sat down at once and studied it with passion.',
        ],
      },
      parts: [{
        part: '2.1 (Full)',
        prompt: 'Analyse Extract C in full: describe the setting, explain Mr Guest\'s tone, and explain the irony in Mr Utterson\'s final words.',
        clue: '💡 Three parts: setting, tone, irony.',
        answer: 'Setting — Mr Utterson\'s home. Guest is curious/suspicious. Irony — Utterson believes Jekyll is falsely implicated but Jekyll IS the murderer.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Setting: Mr Utterson\'s home after he confronts Dr Jekyll.\nMr Guest is curious/suspicious — he notices the handwriting similarity.\nIrony: Mr Utterson believes Dr Jekyll is falsely implicated but Dr Jekyll is, in fact, the murderer (Mr Hyde).',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Setting + tone + irony.',
          alternativeAccept: ['Utterson\'s home + suspicious Guest + irony'],
          memoryTrick: '🧠 "3 tasks: setting, tone, irony"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: setting, tone, irony"\n\n📋 NSC Memo Answer:\nSetting: Utterson's home. Guest is suspicious. Irony: Jekyll IS the murderer.`,
        },
      }],
    },

    // ============ PAPER 2: MACBETH EXTENDED ============
    {
      id: 'L4Q16',
      source: '2023 NSC P2, Q3.1 (Extended Extract)',
      topicText: 'Macbeth — Extract E Analysis',
      teachTopic: 'macbeth-context',
      passageConfig: {
        label: 'MACBETH — EXTRACT E (Full Analysis)',
        paragraphs: [
          '[Duncan, his sons and noblemen are travelling.]',
          'BANQUO: This guest of summer, the temple-haunting martlet...',
        ],
      },
      parts: [{
        part: '3.1 (Full)',
        prompt: 'Analyse Extract E in full: identify the figure of speech, explain Lady Macbeth\'s irony, and explain what this reveals about Duncan\'s character.',
        clue: '💡 Three parts: figure of speech, irony, character.',
        answer: 'Simile. Irony — Lady Macbeth pretends gratitude while planning murder. Duncan is gracious.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Simile — Duncan\'s love is compared to a spurred horse.\nIrony — Lady Macbeth acknowledges gratitude yet knows her repayment will be Duncan\'s murder.\nDuncan is gracious/polite/courteous as he appreciates Lady Macbeth\'s hospitality.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Figure of speech + irony + character.',
          alternativeAccept: ['Simile + irony + gracious Duncan'],
          memoryTrick: '🧠 "3 tasks: figure, irony, character"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: figure, irony, character"\n\n📋 NSC Memo Answer:\nSimile. Irony — Lady Macbeth plans murder. Duncan is gracious.`,
        },
      }],
    },
    {
      id: 'L4Q17',
      source: '2023 NSC P2, Q3.2 (Extended Extract)',
      topicText: 'Macbeth — Extract F Analysis',
      teachTopic: 'macbeth-context',
      passageConfig: {
        label: 'MACBETH — EXTRACT F (Full Analysis)',
        paragraphs: [
          '[Macbeth is at Dunsinane castle.]',
          'MACBETH: I have almost forgot the taste of fears...',
        ],
      },
      parts: [{
        part: '3.2 (Full)',
        prompt: 'Analyse Extract F in full: explain the "slaughterous thoughts", analyse Macbeth\'s state of mind, and explain what "a poor player" means.',
        clue: '💡 Three parts: reference, state of mind, metaphor.',
        answer: '"Slaughterous thoughts" = killings of Banquo and Macduff\'s family. Macbeth is indifferent/cruel. "Poor player" = life is an insignificant actor.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: '"Slaughterous thoughts" — the brutal killings of Banquo and Macduff\'s family.\nMacbeth is indifferent/irritated/insensitive as he must focus on the battle.\n"Poor player" means life is like an insignificant actor who appears briefly and is quickly forgotten.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Reference + state of mind + metaphor.',
          alternativeAccept: ['Killings + indifferent + poor player'],
          memoryTrick: '🧠 "3 tasks: reference, mood, metaphor"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: reference, mood, metaphor"\n\n📋 NSC Memo Answer:\nKillings of Banquo and Macduff's family. Macbeth is indifferent. Life is an insignificant actor.`,
        },
      }],
    },

    // ============ PAPER 2: MCMA EXTENDED ============
    {
      id: 'L4Q18',
      source: '2023 NSC P2, Q4.1 (Extended Extract)',
      topicText: 'MCMA — Extract G Analysis',
      teachTopic: 'mcma-context',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT G (Full Analysis)',
        paragraphs: [
          '[Isabel invites Mr M and Thami to meet her parents.]',
          'MR M: Of course we accept, Isabel. It will be a pleasure and a privilege for us to meet Mr and Mrs Dyson.',
        ],
      },
      parts: [{
        part: '4.1 (Full)',
        prompt: 'Analyse Extract G in full: explain why Isabel refers to Hardy and Austen, analyse Mr M\'s tone, and explain why Thami\'s mood changes.',
        clue: '💡 Three parts: reference, tone, mood change.',
        answer: 'Hardy and Austen are novelists for the literary quiz. Mr M is pleased/eager. Thami\'s mood changes because Mr M decides without consulting him.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Isabel refers to Hardy and Austen because they are novelists for the literary quiz.\nMr M is pleased/eager/polite — he is humbled by the invitation.\nThami\'s mood changes because Mr M makes a decision without consulting him.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Reference + tone + mood change.',
          alternativeAccept: ['Novelists + pleased + no consultation'],
          memoryTrick: '🧠 "3 tasks: reference, tone, change"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: reference, tone, change"\n\n📋 NSC Memo Answer:\nNovelists for the quiz. Mr M is pleased. Thami is annoyed — no consultation.`,
        },
      }],
    },
    {
      id: 'L4Q19',
      source: '2023 NSC P2, Q4.2 (Extended Extract)',
      topicText: 'MCMA — Extract H Analysis',
      teachTopic: 'mcma-context',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — EXTRACT H (Full Analysis)',
        paragraphs: [
          '[The climax of the play.]',
          'MR M: What is wrong with this world that it wants to waste you all like that ... my children ... my Africa!',
        ],
      },
      parts: [{
        part: '4.2 (Full)',
        prompt: 'Analyse Extract H in full: identify the figure of speech, explain the irony in "My beautiful and proud young Africa", and explain Thami\'s state of mind.',
        clue: '💡 Three parts: figure of speech, irony, state of mind.',
        answer: 'Rhetorical question/synecdoche. Irony — beautiful youth act violently. Thami is terrified/fearful.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Synecdoche/personification/rhetorical question — the destruction of children represents evil.\nIrony — Mr M describes youth as beautiful yet they act violently by breaking windows.\nThami is terrified/fearful as he is unable to convince Mr M not to confront the mob.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Figure + irony + mood.',
          alternativeAccept: ['Rhetorical + irony + terrified Thami'],
          memoryTrick: '🧠 "3 tasks: figure, irony, mood"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: figure, irony, mood"\n\n📋 NSC Memo Answer:\nRhetorical question. Irony — beautiful youth act violently. Thami is terrified.`,
        },
      }],
    },

    // ============ PAPER 2: SHORT STORIES EXTENDED ============
    {
      id: 'L4Q20',
      source: '2023 NSC P2, Q5.1 (Extended Extract)',
      topicText: 'Rejection — Extract I Analysis',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'REJECTION — EXTRACT I (Full Analysis)',
        paragraphs: [
          '[The narrator is confused.]',
          'I asked with the cry of a hunted beast: "Modou"?',
        ],
      },
      parts: [{
        part: '5.1 (Full)',
        prompt: 'Analyse Extract I in full: describe the setting, explain the Imam\'s state of mind, and identify the figure of speech.',
        clue: '💡 Three parts: setting, mood, figure of speech.',
        answer: 'Setting — narrator\'s home after Modou\'s second marriage. Imam is uncomfortable. Metaphor/simile — the hunted beast.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Setting: the narrator\'s home after the marriage of Modou to Binetou.\nThe Imam feels uncomfortable/uncertain as he has to break the news.\nThe figure of speech is a metaphor — the hunted beast.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Setting + mood + figure.',
          alternativeAccept: ['Home + uncomfortable + metaphor'],
          memoryTrick: '🧠 "3 tasks: setting, mood, figure"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: setting, mood, figure"\n\n📋 NSC Memo Answer:\nSetting: narrator's home. Imam is uncomfortable. Metaphor — hunted beast.`,
        },
      }],
    },
    {
      id: 'L4Q21',
      source: '2023 NSC P2, Q5.2 (Extended Extract)',
      topicText: 'Eveline — Extract J Analysis',
      teachTopic: 'short-stories-themes',
      passageConfig: {
        label: 'EVELINE — EXTRACT J (Full Analysis)',
        paragraphs: [
          '[Eveline reflects on her decision.]',
          'She knew it was that that had given her the palpitations.',
        ],
      },
      parts: [{
        part: '5.2 (Full)',
        prompt: 'Analyse Extract J in full: analyse Eveline\'s character, explain the irony in her words, and explain the causes of her palpitations.',
        clue: '💡 Three parts: character, irony, causes.',
        answer: 'Eveline is indecisive/practical. Irony — she worries what others will say but they do not really care. Palpitations from her father\'s violence.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Eveline is indecisive/practical as she weighs advantages and disadvantages.\nIrony — Eveline worries about what her fellow workers would say yet they do not really care about her.\nHer palpitations come from her father\'s violent nature.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Character + irony + causes.',
          alternativeAccept: ['Indecisive + irony + father\'s violence'],
          memoryTrick: '🧠 "3 tasks: character, irony, causes"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: character, irony, causes"\n\n📋 NSC Memo Answer:\nEveline is indecisive. Irony — they do not care. Palpitations from her father's violence.`,
        },
      }],
    },

    // ============ PAPER 2: POETRY EXTENDED ============
    {
      id: 'L4Q22',
      source: '2023 NSC P2, Q6.1 (Extended — Sonnet 73)',
      topicText: 'Sonnet 73 — Full Analysis',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
          'Bare ruined choirs where late the sweet birds sang.',
          'In me thou seest the twilight of such day',
          'As after sunset fadeth in the west,',
          'Which by and by black night doth take away,',
          'Death\'s second self, that seals up all in rest.',
        ],
      },
      parts: [{
        part: '6.1 (Full)',
        prompt: 'Analyse Sonnet 73 in full: identify the sonnet form, explain the season metaphor, and explain the "black night" figure of speech.',
        clue: '💡 Three parts: form, season, figure of speech.',
        answer: 'Elizabethan sonnet (3 quatrains + couplet). Autumn = middle age. "Black night" = death.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'The poem is an Elizabethan sonnet (3 quatrains + rhyming couplet).\n"That time of year" refers to autumn — the metaphorical middle age of man.\n"Black night" refers to the speaker\'s death, and the figure is a metaphor/personification.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Form + season + figure.',
          alternativeAccept: ['Elizabethan + autumn + metaphor'],
          memoryTrick: '🧠 "3 tasks: form, season, figure"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: form, season, figure"\n\n📋 NSC Memo Answer:\nElizabethan sonnet. Autumn = middle age. Black night = death.`,
        },
      }],
    },
    {
      id: 'L4Q23',
      source: '2023 NSC P2, Q6.2 (Extended — Innisfree)',
      topicText: 'Innisfree — Full Analysis',
      teachTopic: 'poetry-technique',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, and go to Innisfree,',
          'And a small cabin build there, of clay and wattles made:',
          'Nine bean-rows will I have there, a hive for the honey-bee,',
          'And live alone in the bee-loud glade.',
          'And I shall have some peace there, for peace comes dropping slow,',
          'Dropping from the veils of the morning to where the cricket sings;',
        ],
      },
      parts: [{
        part: '6.2 (Full)',
        prompt: 'Analyse Innisfree in full: describe the setting, identify the sound device in line 3, and explain the figure of speech in line 5.',
        clue: '💡 Three parts: setting, sound, figure of speech.',
        answer: 'Setting — the city, when speaker decides to go to Innisfree. Alliteration in line 3. Metaphor/personification of peace.',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: 'Setting: the city, when the speaker decides he will go to Innisfree.\nAlliteration — the repetition of consonant sounds in line 3.\nThe figure in line 5 is metaphor/personification — peace comes dropping slow.',
        memoCorrection: {
          whatToCheck: 'Must answer all three parts.',
          commonMistake: 'Learners answer one part only.',
          examinerHint: 'Setting + sound + figure.',
          alternativeAccept: ['City + alliteration + metaphor'],
          memoryTrick: '🧠 "3 tasks: setting, sound, figure"',
          mergedCorrection: `🧠 Memory Trick: "3 tasks: setting, sound, figure"\n\n📋 NSC Memo Answer:\nSetting: the city. Alliteration. Metaphor — peace comes dropping slow.`,
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 5 — Essay (10–15 marks)
  // ================================================================
  level5: [
    {
      id: 'L5Q1',
      source: '2023 NSC P1, Q1 (Full Comprehension)',
      topicText: 'Fast Fashion — Full Response',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — FAST FASHION (SUMMARY)',
        paragraphs: [
          'Fast fashion means making cheap clothes very quickly to follow the newest trends.',
          'Clothing overconsumption is rising. People buy more clothes and throw them away faster.',
          'Discarded clothing contributes massively to pollution.',
          'Washing clothes releases 500,000 tons of microfibres into the ocean each year.',
          'Fashion designers must use eco-friendly materials. Consumers must buy from sustainable brands.',
        ],
      },
      parts: [{
        part: 'Q1 Full',
        prompt: 'Read TEXT A on fast fashion and answer questions 1.1 to 1.13. Quote where asked. Paraphrase where asked. Give reasons for open-ended questions.',
        clue: '💡 Skim the text. Read the questions. Underline key words. Answer what they ask.',
        answer: 'Answer each question per the instructions.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Follow each question\'s instruction: quote exactly where asked, paraphrase where asked, describe visuals, and give reasons for open-ended questions.',
        memoCorrection: {
          whatToCheck: 'Each question has a specific instruction.',
          commonMistake: 'Learners answer the question they wish was asked.',
          examinerHint: 'Read the question twice.',
          alternativeAccept: ['Follow the instructions'],
          memoryTrick: '🧠 "Answer what they ASK"',
          mergedCorrection: `🧠 Memory Trick: "Answer what they ASK"\n\n📋 NSC Memo Answer:\nFollow each instruction: quote where asked, paraphrase where asked, give reasons for open-ended questions.`,
        },
      }],
    },
    {
      id: 'L5Q2',
      source: '2024 NSC P1, Q1 (Full Comprehension)',
      topicText: 'Artificial Intelligence — Full Response',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — EMBRACING AI (SUMMARY)',
        paragraphs: [
          'AI is one of the most important technologies in the world today.',
          'AI allows machines to imitate human thought processes and decision-making.',
          'AI is used in Africa including healthcare, financial services, and education.',
          'In the past four years, the use of AI across businesses has grown by 270 per cent.',
        ],
      },
      parts: [{
        part: 'Q1 Full',
        prompt: 'Read TEXT A on AI and answer questions 1.1 to 1.12. Quote where asked. Paraphrase where asked.',
        clue: '💡 For visual questions, describe what you see AND what it means.',
        answer: 'Answer each question per the instructions.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Follow all instructions: quote exactly where asked, paraphrase in own words where asked, describe visuals, and give reasons for open-ended questions.',
        memoCorrection: {
          whatToCheck: 'Follow each question\'s specific instruction.',
          commonMistake: 'Learners confuse quote questions with paraphrase questions.',
          examinerHint: 'Quote = exact words. Own words = paraphrase.',
          alternativeAccept: ['Follow the instructions'],
          memoryTrick: '🧠 "Quote vs Own Words"',
          mergedCorrection: `🧠 Memory Trick: "Quote vs Own Words"\n\n📋 NSC Memo Answer:\nFollow all instructions: quote where asked, paraphrase where asked.`,
        },
      }],
    },
    {
      id: 'L5Q3',
      source: '2025 NSC P1, Q1 (Full Comprehension)',
      topicText: 'South African Music — Full Response',
      teachTopic: 'comprehension-skills',
      passageConfig: {
        label: 'TEXT A — SA MUSIC (SUMMARY)',
        paragraphs: [
          'The music industry achieved its best income in 2023.',
          'Most people in sub-Saharan Africa who buy and listen to music come from South Africa — 77% of sales.',
          'There has been a growth and surge in interest in South African music internationally.',
          'Tyla won a Grammy at a young age.',
        ],
      },
      parts: [{
        part: 'Q1 Full',
        prompt: 'Read TEXT A on SA music and answer questions 1.1 to 1.12. Quote where asked. Paraphrase where asked.',
        clue: '💡 Skim the text. Read the questions. Underline key words.',
        answer: 'Answer each question per the instructions.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Follow all instructions: quote where asked, paraphrase where asked, describe visuals, give reasons for open-ended questions.',
        memoCorrection: {
          whatToCheck: 'Follow each question\'s specific instruction.',
          commonMistake: 'Learners confuse quote questions with paraphrase questions.',
          examinerHint: 'Quote = exact words. Own words = paraphrase.',
          alternativeAccept: ['Follow the instructions'],
          memoryTrick: '🧠 "Quote vs Own Words"',
          mergedCorrection: `🧠 Memory Trick: "Quote vs Own Words"\n\n📋 NSC Memo Answer:\nFollow all instructions.`,
        },
      }],
    },

    // ============ PAPER 2: ESSAY QUESTIONS ============
    {
      id: 'L5Q4',
      source: '2023 NSC P2, Q1.2 (Cry — Essay)',
      topicText: 'Cry — Topic Suitability Essay',
      teachTopic: 'cry-essay',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — ESSAY',
        paragraphs: ['Write a full essay response on the novel.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Write an essay discussing the theme of hope OR the suitability of the title "Cry, the Beloved Country". Use evidence from the novel.',
        clue: '💡 Structure: intro (hook + LOA) → 3 body points with evidence → conclusion.',
        answer: 'Yes/no stance + three body points + conclusion.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'For full marks, the essay must have a clear stance, well-substantiated body points (three), and a conclusion that reinforces the stance.',
        memoCorrection: {
          whatToCheck: 'Must be a structured essay with stance + evidence + conclusion.',
          commonMistake: 'Learners list events without a stance.',
          examinerHint: 'Essay = stance + evidence + link.',
          alternativeAccept: ['Structured essay'],
          memoryTrick: '🧠 "Essay = stance + evidence + conclusion"',
          mergedCorrection: `🧠 Memory Trick: "Essay = stance + evidence + conclusion"\n\n📋 NSC Memo Answer:\nClear stance, three body points with evidence, and a conclusion that reinforces the stance.`,
        },
      }],
    },
    {
      id: 'L5Q5',
      source: '2024 NSC P2, Q1.2.7 (Cry — Absalom)',
      topicText: 'Cry — Absalom\'s Responsibility',
      teachTopic: 'cry-essay',
      passageConfig: {
        label: 'CRY, THE BELOVED COUNTRY — ABSALOM',
        paragraphs: ['Absalom Kumalo is responsible for the poor choices he makes.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Absalom is responsible for the poor choices he makes. Discuss your view. Use evidence from the novel.',
        clue: '💡 Yes — he chose the crowd. No — he was manipulated.',
        answer: 'Clear stance with evidence from the novel.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Absalom has a stable job but decides to abandon this job. He chooses to join the bad crowd who steal and rob. He agrees to carry the gun that kills Arthur Jarvis. OR No. Absalom is timid and manipulated. His rural background has not prepared him for the city.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners describe Absalom without a stance.',
          examinerHint: 'Stance + evidence + conclusion.',
          alternativeAccept: ['Yes — his choice', 'No — manipulated'],
          memoryTrick: '🧠 "Stance + evidence + conclusion"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence + conclusion"\n\n📋 NSC Memo Answer:\nYes. He chose to join the crowd. OR No. He was manipulated.`,
        },
      }],
    },
    {
      id: 'L5Q6',
      source: '2023 NSC P2, Q2.2.8 (Jekyll — Morally Responsible)',
      topicText: 'Jekyll — Morally Responsible?',
      teachTopic: 'jekyll-essay',
      passageConfig: {
        label: 'DR JEKYLL AND MR HYDE — MORALITY',
        paragraphs: ['Dr Jekyll is morally responsible for Mr Hyde\'s actions.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Dr Jekyll is morally responsible for Mr Hyde\'s actions. Discuss your view. Use evidence from the novel.',
        clue: '💡 Yes — he created Hyde. No — Hyde acted on his own.',
        answer: 'Clear stance with evidence from the novel.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Dr Jekyll is the creator of Mr Hyde by mixing and drinking the potion. Mr Hyde tramples on a little girl and beats Sir Carew to death. OR No. Dr Jekyll could not have predicted the outcome. Mr Hyde is responsible for his own decisions.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners describe Hyde without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — Jekyll created Hyde', 'No — Hyde acted alone'],
          memoryTrick: '🧠 "Stance + evidence + conclusion"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence + conclusion"\n\n📋 NSC Memo Answer:\nYes. Dr Jekyll is the creator of Mr Hyde.`,
        },
      }],
    },
    {
      id: 'L5Q7',
      source: '2023 NSC P2, Q3.2.8 (Macbeth — Ambition)',
      topicText: 'Macbeth — Victim of Ambition',
      teachTopic: 'macbeth-essay',
      passageConfig: {
        label: 'MACBETH — AMBITION',
        paragraphs: ['Macbeth is a victim of his own ambition.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Macbeth is a victim of his own ambition. Discuss your view. Use evidence from the play.',
        clue: '💡 Yes — he allowed ambition to drive him. No — others influenced him.',
        answer: 'Clear stance with evidence from the play.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The witches\' prophecies awaken his evil ambition. He allows Lady Macbeth to persuade him to kill Duncan. His insecurity leads him to embark on a killing spree. OR No. Duncan\'s announcement that Malcolm will succeed him becomes a stumbling block. He is fully aware of the implications of his actions.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners retell the plot without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — victim of ambition', 'No — Duncan\'s announcement'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nYes. He allowed ambition to drive him. OR No. He was fully aware of his actions.`,
        },
      }],
    },
    {
      id: 'L5Q8',
      source: '2024 NSC P2, Q3.1.9 (Macbeth — Unnatural Events)',
      topicText: 'Macbeth — Unnatural Events',
      teachTopic: 'macbeth-essay',
      passageConfig: {
        label: 'MACBETH — UNNATURAL EVENTS',
        paragraphs: ['Unnatural events play an important role in the drama.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Unnatural events play an important role in the drama. Discuss your view. Use evidence from the play.',
        clue: '💡 Yes — witches, ghost, unnatural murders. No — human ambition drives the plot.',
        answer: 'Clear stance with evidence from the play.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The witches\' prediction drives the plot. Banquo\'s ghost unnerves Macbeth. Duncan\'s murder is unnatural. OR No. Macbeth\'s evil ambition fuels his actions. Lady Macbeth\'s guilt leads to her insanity.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners describe events without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — witches + ghost', 'No — ambition drives plot'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nYes. The witches' prediction drives the plot. OR No. Macbeth's ambition fuels his actions.`,
        },
      }],
    },
    {
      id: 'L5Q9',
      source: '2023 NSC P2, Q4.2.7 (MCMA — Title)',
      topicText: 'MCMA — Title Suitability',
      teachTopic: 'mcma-essay',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — TITLE',
        paragraphs: ['The title "My Children! My Africa!" is suitable for this drama.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'The title "My Children! My Africa!" is suitable for this drama. Discuss your view. Use evidence from the play.',
        clue: '💡 Yes — Mr M sees learners as children. No — the learners kill him.',
        answer: 'Clear stance with evidence from the play.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The drama is about school children in Africa. Mr M is like a father to his learners. The exclamation marks indicate Mr M\'s passion for his learners and education. OR No. The drama focuses on a small group of children. Mr M does not have any children of his own. In the end the children he claims as his own kill him.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners answer without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — father figure', 'No — they kill him'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nYes. Mr M is like a father to his learners.`,
        },
      }],
    },
    {
      id: 'L5Q10',
      source: '2025 NSC P2, Q4.2.7 (MCMA — Thami Future Leader)',
      topicText: 'MCMA — Thami as Future Leader',
      teachTopic: 'mcma-essay',
      passageConfig: {
        label: 'MY CHILDREN! MY AFRICA! — THAMI',
        paragraphs: ['Thami represents hope for the future.'],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Thami represents hope for the future. Discuss your view. Use evidence from the play.',
        clue: '💡 Yes — he joins the struggle. No — he abandons education.',
        answer: 'Clear stance with evidence from the play.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. Thami excels academically and is passionate about social issues. He joins the boycott showing his commitment to fighting for a better future. OR No. Thami abandons his education and rejects Mr M\'s guidance. He supports the boycott causing destruction.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners describe Thami without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — future leader', 'No — abandoned education'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nYes. Thami excels academically and joins the struggle. OR No. He abandons education.`,
        },
      }],
    },
    {
      id: 'L5Q11',
      source: '2023 NSC P2, Q6.1.7 (Sonnet 73 — Love Poem)',
      topicText: 'Sonnet 73 — Love Poem Essay',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'Sonnet 73',
        poet: 'William Shakespeare',
        lines: [
          'That time of year thou mayst in me behold',
          'When yellow leaves, or none, or few, do hang',
          'Upon those boughs which shake against the cold,',
          'Bare ruined choirs where late the sweet birds sang.',
          'This thou perceiv\'st, which makes thy love more strong,',
          'To love that well which thou must leave ere long.',
        ],
      },
      parts: [{
        part: 'Essay',
        prompt: 'Sonnet 73 is a love poem. Discuss your view with close reference to the poem.',
        clue: '💡 Yes — the couplet is about love. No — the first 12 lines focus on aging.',
        answer: 'Clear stance with evidence from the poem.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'Yes. The speaker and his lover choose to accept the finality of death but they are also committed to loving fully before they die. He pleads in the couplet for their love to remain. OR No. In lines 1-8 the speaker focuses on the process of ageing without any reference to love.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners describe the poem without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — couplet on love', 'No — focus on aging'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nYes. The couplet speaks of strengthening love before death.`,
        },
      }],
    },
    {
      id: 'L5Q12',
      source: '2023 NSC P2, Q6.2.7 (Innisfree — Realistic?)',
      topicText: 'Innisfree — Realistic Essay',
      teachTopic: 'poetry-themes',
      poemConfig: {
        title: 'The Lake Isle of Innisfree',
        poet: 'William Butler Yeats',
        lines: [
          'I will arise and go now, and go to Innisfree,',
          'And a small cabin build there, of clay and wattles made:',
          'Nine bean-rows will I have there, a hive for the honey-bee,',
          'And live alone in the bee-loud glade.',
          'I hear lake water lapping with low sounds by the shore;',
          'While I stand on the roadway, or on the pavements grey,',
          'I hear it in the deep heart\'s core.',
        ],
      },
      parts: [{
        part: 'Essay',
        prompt: 'The speaker is realistic. Discuss your view with close reference to the poem.',
        clue: '💡 Yes — he emphasises "go". No — the poem ends in a dream.',
        answer: 'Clear stance with evidence from the poem.',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: 'No. The speaker is not realistic as everything he mentions is what he imagines. He concludes the poem by saying that he hears the sound of the water which is only a dream. OR Yes. The speaker emphatically states that he will go to Innisfree. He is determined to enjoy the solitude and peace.',
        memoCorrection: {
          whatToCheck: 'Must take a clear stance with evidence.',
          commonMistake: 'Learners answer without a stance.',
          examinerHint: 'Stance + evidence.',
          alternativeAccept: ['Yes — determined', 'No — dream'],
          memoryTrick: '🧠 "Stance + evidence"',
          mergedCorrection: `🧠 Memory Trick: "Stance + evidence"\n\n📋 NSC Memo Answer:\nNo. The poem ends with a dream. OR Yes. He is emphatic about going.`,
        },
      }],
    },
  ],
};

// ================================================================
// MAIN COMPONENT
// ================================================================
const TopicLessonEnglish = () => {
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

  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';

  // ================================================================
  // TOPIC FILTERING
  // ================================================================
  const isPaper1 = PAPER_1_TOPICS.has(topicId);
  const isPaper2 = !isPaper1 && TOPIC_NAMES[topicId] !== undefined;

  const activeConcepts = TOPIC_CONCEPTS[topicId] || Object.values(TOPIC_CONCEPTS).flat();
  const topicName = TOPIC_NAMES[topicId] || 'English FAL';

  // Accent colour: Paper 1 = navy, Paper 2 = deep indigo (differentiates visually)
  const accent = isPaper1 ? '#1A237E' : '#311B92';

  const filteredBank = Object.fromEntries(
    Object.entries(QuestionBank).map(([key, list]) => [
      key,
      list.filter((q) => activeConcepts.includes(q.teachTopic)),
    ])
  );

  const levelKey = `level${currentLevel}`;
  const levelQuestions = (() => {
    if (filteredBank[levelKey] && filteredBank[levelKey].length > 0) {
      return filteredBank[levelKey];
    }
    for (const lvl of [1, 2, 3, 4, 5]) {
      const key = `level${lvl}`;
      if (filteredBank[key] && filteredBank[key].length > 0) {
        return filteredBank[key];
      }
    }
    return QuestionBank.level1;
  })();

  const activeQuestionSet = levelQuestions[currentQuestionIndex % levelQuestions.length];
  const allParts = activeQuestionSet?.parts || [];
  const currentQuestion = allParts[currentPartIndex % allParts.length] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ================================================================
  // SPEAK — shared factory (no voice overlap)
  // ================================================================
  const speakText = createSpeakText({ audioRef, setSpeaking: setIsSpeaking }, API_URL);

  // ================================================================
  // WELCOME + UNMOUNT CLEANUP
  // ================================================================
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Let's learn ${topicName}.`;
    setNeoMessage(welcomeMsg);

    const timer = setTimeout(() => {
      setWelcomeDone(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================================================================
  // TEACH TRIGGER
  // ================================================================
  useEffect(() => {
    if (autoMode) return;
    if (!activeQuestionSet) return;
    if (!welcomeDone) return;

    const topic = activeQuestionSet.teachTopic;
    if (!topic) return;
    if (taughtConcepts.has(topic)) return;

    setTaughtConcepts((prev) => {
      const next = new Set(prev);
      next.add(topic);
      return next;
    });
    setActiveTeaching(topic);
  }, [currentQuestionIndex, currentLevel, activeQuestionSet, taughtConcepts, autoMode, welcomeDone]);

  // ================================================================
  // PREFETCH
  // ================================================================
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (!activeQuestionSet?.teachTopic) return;

    const topic = activeQuestionSet.teachTopic;
    const script = ENGLISH_TEACHING_SCRIPTS[topic];
    if (!script?.sections) return;

    const texts = [];
    script.sections.forEach((section) => {
      if (section.text) texts.push(section.text);
      if (section.caption) texts.push(section.caption);
      if (section.stepTexts) {
        section.stepTexts.forEach((t) => t && texts.push(t));
      }
      if (section.type === 'bullets' && section.items) {
        section.items.forEach((t) => t && texts.push(t));
      }
      if (section.type === 'example') {
        if (section.scenario) texts.push(section.scenario);
        if (section.steps) section.steps.forEach((s) => s && texts.push(s));
        if (section.answer) texts.push(`So the answer is: ${section.answer}`);
      }
    });

    prefetchSpeech(texts, API_URL);
  }, [activeQuestionSet, welcomeDone, autoMode]);

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

          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO or more correct points.' : ''}

          ACCEPT SYNONYMS:
          - "fashionable" = "trendy" = "stylish"
          - "saves" = "rescues" = "helps"
          - "registered" = "®"
          - "quotation" = "quote"
          - "own words" = "paraphrase"

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
          subject: 'english',
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

  // ================================================================
  // ANOTHER APPROACH
  // ================================================================
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

          Keep it SIMPLE. Use a story or analogy. No complicated terms.`,
          subject: 'english',
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

  // ================================================================
  // PROCEED
  // ================================================================
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

    if (currentPartIndex < allParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);

      const msgs = [
        `${firstName}, let's go!`,
        `Keep going ${firstName}!`,
        `You're doing great!`,
        `Let's continue!`,
        `You've got this!`,
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
          setNeoMessage(`🎉 ${firstName}, you've completed this topic!`);
          speakText(`🎉 Well done!`);
          setTimeout(() => navigate(`/subjects/${subject}`), 3000);
        } else {
          setCurrentLevel(nextLevel);
          setCurrentQuestionIndex(0);
          setCurrentPartIndex(0);

          let levelMsg = `${firstName}, let's continue!`;
          if (nextLevel === 3) levelMsg = `🔥 ${firstName}, things are going to step up a bit!`;
          else if (nextLevel === 4) levelMsg = `💪 ${firstName}, let's keep pushing!`;
          else if (nextLevel === 5) levelMsg = `🏆 ${firstName}, this is the final level!`;

          setNeoMessage(levelMsg);
          speakText(levelMsg);
        }
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  // ================================================================
  // PHASE 0: AUTO MODE
  // ================================================================
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="english"
      />
    );
  }

  // ================================================================
  // PHASE 1: CONCEPT TEACHING
  // ================================================================
  if (activeTeaching) {
    return (
      <ConceptTeaching
        topic={activeTeaching}
        onSpeak={speakText}
        onComplete={() => setActiveTeaching(null)}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="english"
      />
    );
  }

  // ================================================================
  // RENDER HELPERS
  // ================================================================
  const renderPassage = () => {
    const passageConfig = activeQuestionSet.passageConfig;
    if (!passageConfig) return null;

    return (
      <div
        className="tl-passage-container"
        style={{
          marginBottom: '20px',
          background: '#FAFAFA',
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          padding: '16px',
          maxHeight: '260px',
          overflowY: 'auto',
        }}
      >
        {passageConfig.label && (
          <div
            style={{
              fontWeight: '700',
              fontSize: '12px',
              color: accent,
              letterSpacing: '0.5px',
              marginBottom: '10px',
              textTransform: 'uppercase',
            }}
          >
            {passageConfig.label}
          </div>
        )}
        {passageConfig.paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: '#333',
              margin: '0 0 12px 0',
            }}
          >
            <span
              style={{
                fontWeight: '700',
                color: accent,
                marginRight: '6px',
              }}
            >
              {i + 1}.
            </span>
            {para}
          </p>
        ))}
      </div>
    );
  };

  const renderPoem = () => {
    const poemConfig = activeQuestionSet.poemConfig;
    if (!poemConfig) return null;

    return (
      <div
        className="tl-poem-container"
        style={{
          marginBottom: '20px',
          background: '#F5F3FA',
          border: `1px solid ${accent}33`,
          borderRadius: '12px',
          padding: '18px 20px',
          maxHeight: '340px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontWeight: '700',
            fontSize: '13px',
            color: accent,
            letterSpacing: '0.5px',
            marginBottom: '4px',
            textTransform: 'uppercase',
          }}
        >
          {poemConfig.title}
        </div>
        {poemConfig.poet && (
          <div
            style={{
              fontSize: '12px',
              color: '#666',
              fontStyle: 'italic',
              marginBottom: '14px',
            }}
          >
            by {poemConfig.poet}
          </div>
        )}
        <div style={{ fontSize: '14px', lineHeight: '1.9', color: '#1a1a1a' }}>
          {poemConfig.lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px' }}>
              <span
                style={{
                  color: '#999',
                  fontSize: '12px',
                  minWidth: '20px',
                  textAlign: 'right',
                  flexShrink: 0,
                  paddingTop: '3px',
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: 'Georgia, serif' }}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText
      .split('\n')
      .filter(
        (line) =>
          line.trim() &&
          !line.includes('(Any') &&
          !line.includes('(Accept') &&
          !line.includes('(Max')
      )
      .map((line) => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

  // ================================================================
  // PHASE 2: PRACTICE
  // ================================================================
  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div
              className="tl-progress-fill-mini"
              style={{ width: `${progress}%`, background: accent }}
            ></div>
          </div>
          <span className="tl-progress-text-mini">
            {currentQuestionIndex + 1}/{levelQuestions.length}
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
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span
            className="tl-equation-label"
            style={{ background: accent }}
          >
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark
            {currentQuestion.marks > 1 ? 's' : ''}
          </span>

          {renderPassage()}
          {renderPoem()}

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
                <ul style={{ marginTop: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: '4px', fontSize: '14px' }}>
                      {line}
                    </li>
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
                    style={{ background: accent }}
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

export default TopicLessonEnglish;