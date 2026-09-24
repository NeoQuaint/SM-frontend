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
// LIFE SCIENCES — P1 + P2 MERGED
// 12 topics, 28 concepts, real NSC questions 2023–2025
// ================================================================

const DEFAULT_TOPIC = 'human-eye';

const PAPER_1_TOPICS = new Set([
  'human-eye', 'human-ear', 'nervous-system',
  'endocrine-thermo', 'human-reproduction', 'plant-repro-strategies',
]);

const TOPIC_NAMES = {
  'human-eye': 'The Human Eye',
  'human-ear': 'The Human Ear',
  'nervous-system': 'The Nervous System',
  'endocrine-thermo': 'Endocrine & Thermoregulation',
  'human-reproduction': 'Human Reproduction',
  'plant-repro-strategies': 'Plant Responses & Reproductive Strategies',
  'dna-rna': 'DNA & RNA',
  'meiosis': 'Meiosis',
  'genetics': 'Genetics',
  'evolution': 'Evolution',
  'evolution-evidence': 'Evolution Evidence',
  'human-evolution': 'Human Evolution',
};

const TOPIC_CONCEPTS = {
  'human-eye': ['eye-pupillary', 'eye-accommodation-defects'],
  'human-ear': ['ear-hearing-balance'],
  'nervous-system': ['ns-neurons', 'ns-reflex-arc', 'ns-brain'],
  'endocrine-thermo': ['endo-salt-water', 'endo-glucose-thyroxin', 'thermo-skin'],
  'human-reproduction': ['repro-male', 'repro-female', 'repro-embryonic'],
  'plant-repro-strategies': ['repro-plant', 'repro-strategies'],
  'dna-rna': ['dna-structure-replication', 'protein-synthesis', 'mutation'],
  'meiosis': ['meiosis-phases-crossing-over', 'meiosis-non-disjunction'],
  'genetics': ['gen-monohybrid-dihybrid', 'gen-blood-groups', 'gen-sex-linked', 'gen-pedigrees-incomplete'],
  'evolution': ['evo-natural-selection-speciation', 'evo-artificial-selection'],
  'evolution-evidence': ['evo-fossils-biogeography', 'evo-genetic-out-of-africa'],
  'human-evolution': ['hominid-bipedalism-brain-tools'],
};

const QuestionBank = {
  level1: [
    {
      id: 'L1Q1', source: '2023 NSC P1, Q1.1.1', topicText: 'Pupillary Mechanism', teachTopic: 'eye-pupillary',
      parts: [{ part: '1.1.1', prompt: 'Which ONE of the following parts controls the amount of light entering the eye by influencing the size of the pupil?', clue: '💡 Think about the coloured ring around the pupil.', answer: 'Iris', marks: 2, acceptAnyTwo: false, memoFullAnswer: 'Iris', formulas: [], memoCorrection: { whatToCheck: 'Must identify the iris.', commonMistake: 'Learners confuse iris with cornea or retina.', examinerHint: 'The iris contains circular and radial muscles.', alternativeAccept: ['Iris', 'D'], memoryTrick: '🧠 "Iris = controls light entry"', mergedCorrection: `🧠 Memory Trick: "Iris = controls light entry"\n\n📋 NSC Memo Answer:\nIris` } }]
    },
    {
      id: 'L1Q2', source: '2023 NSC P1, Q1.2.1', topicText: 'Reproductive Strategies', teachTopic: 'repro-strategies',
      parts: [{ part: '1.2.1', prompt: 'Give the correct biological term: A reproductive strategy where the young receives nutrients through the placenta.', clue: '💡 This term is used for mammals that give birth to live young.', answer: 'Vivipary', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Vivipary', formulas: [], memoCorrection: { whatToCheck: 'Must give the correct term for placental development.', commonMistake: 'Learners write "placental" or "mammalian".', examinerHint: 'Vivipary = live birth after placental nutrition.', alternativeAccept: ['Vivipary', 'Viviparous'], memoryTrick: '🧠 "Vivi = live birth"', mergedCorrection: `🧠 Memory Trick: "Vivi = live birth"\n\n📋 NSC Memo Answer:\nVivipary` } }]
    },
    {
      id: 'L1Q3', source: '2023 NSC P1, Q1.2.2', topicText: 'Male Reproductive Anatomy', teachTopic: 'repro-male',
      parts: [{ part: '1.2.2', prompt: 'Give the correct biological term: The duct that transports semen and urine to the outside of the body.', clue: '💡 It is a shared tube — one job for urine, one for semen.', answer: 'Urethra', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Urethra', formulas: [], memoCorrection: { whatToCheck: 'Must identify the urethra as the shared duct.', commonMistake: 'Learners confuse with the vas deferens or ureter.', examinerHint: 'Urethra = common exit for urine and semen.', alternativeAccept: ['Urethra'], memoryTrick: '🧠 "Urethra = shared exit tube"', mergedCorrection: `🧠 Memory Trick: "Urethra = shared exit tube"\n\n📋 NSC Memo Answer:\nUrethra` } }]
    },
    {
      id: 'L1Q4', source: '2024 NSC P1, Q1.1.1', topicText: 'Salt Regulation', teachTopic: 'endo-salt-water',
      parts: [{ part: '1.1.1', prompt: 'The hormone responsible for the regulation of salt content in the human body is ...', clue: '💡 Secreted by the adrenal glands, acts on kidney tubules.', answer: 'Aldosterone', marks: 2, acceptAnyTwo: false, memoFullAnswer: 'Aldosterone', formulas: [], memoCorrection: { whatToCheck: 'Must identify aldosterone as the salt-regulating hormone.', commonMistake: 'Learners confuse aldosterone with adrenalin or glucagon.', examinerHint: 'Aldosterone acts on the renal tubules.', alternativeAccept: ['Aldosterone', 'B'], memoryTrick: '🧠 "Aldosterone = salt balance"', mergedCorrection: `🧠 Memory Trick: "Aldosterone = salt balance"\n\n📋 NSC Memo Answer:\nAldosterone` } }]
    },
    {
      id: 'L1Q5', source: '2024 NSC P1, Q1.2.1', topicText: 'Embryonic Development', teachTopic: 'repro-embryonic',
      parts: [{ part: '1.2.1', prompt: 'Give the correct biological term: The structure that connects the foetus to the placenta.', clue: '💡 It contains blood vessels that carry nutrients and waste.', answer: 'Umbilical cord', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Umbilical cord', formulas: [], memoCorrection: { whatToCheck: 'Must identify the umbilical cord.', commonMistake: 'Learners confuse it with the umbilical vein or artery.', examinerHint: 'Umbilical cord = connects foetus to placenta.', alternativeAccept: ['Umbilical cord'], memoryTrick: '🧠 "Umbilical cord = foetus-placenta link"', mergedCorrection: `🧠 Memory Trick: "Umbilical cord = foetus-placenta link"\n\n📋 NSC Memo Answer:\nUmbilical cord` } }]
    },
    {
      id: 'L1Q6', source: '2024 NSC P1, Q1.2.3', topicText: 'Nervous System Divisions', teachTopic: 'ns-neurons',
      parts: [{ part: '1.2.3', prompt: 'Give the correct biological term: The part of the nervous system that consists of sympathetic and parasympathetic sections.', clue: '💡 It is not the CNS.', answer: 'Autonomic nervous system', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Autonomic nervous system', formulas: [], memoCorrection: { whatToCheck: 'Must identify the autonomic nervous system.', commonMistake: 'Learners write "peripheral nervous system".', examinerHint: 'Autonomic = involuntary (sympathetic + parasympathetic).', alternativeAccept: ['Autonomic nervous system'], memoryTrick: '🧠 "Autonomic = automatic"', mergedCorrection: `🧠 Memory Trick: "Autonomic = automatic"\n\n📋 NSC Memo Answer:\nAutonomic nervous system` } }]
    },
    {
      id: 'L1Q7', source: '2025 NSC P1, Q1.2.1', topicText: 'Menstrual Cycle Hormones', teachTopic: 'repro-female',
      parts: [{ part: '1.2.1', prompt: 'Give the correct biological term: The ovarian hormone that is secreted by the corpus luteum.', clue: '💡 This hormone maintains the endometrium.', answer: 'Progesterone', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Progesterone', formulas: [], memoCorrection: { whatToCheck: 'Must identify progesterone.', commonMistake: 'Learners confuse progesterone with oestrogen.', examinerHint: 'Progesterone maintains the endometrium.', alternativeAccept: ['Progesterone'], memoryTrick: '🧠 "Progesterone = prepares uterus"', mergedCorrection: `🧠 Memory Trick: "Progesterone = prepares uterus"\n\n📋 NSC Memo Answer:\nProgesterone` } }]
    },
    {
      id: 'L1Q8', source: '2025 NSC P1, Q1.2.2', topicText: 'Eye Defects', teachTopic: 'eye-accommodation-defects',
      parts: [{ part: '1.2.2', prompt: 'Give the correct biological term: The eye defect that is characterised by a cloudy lens.', clue: '💡 Protein clumps in the lens, blurring vision.', answer: 'Cataracts', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Cataracts', formulas: [], memoCorrection: { whatToCheck: 'Must identify cataracts.', commonMistake: 'Learners confuse cataracts with astigmatism or myopia.', examinerHint: 'Cataracts = cloudy lens, fixed by surgery.', alternativeAccept: ['Cataracts', 'Cataract'], memoryTrick: '🧠 "Cataract = cloudy lens"', mergedCorrection: `🧠 Memory Trick: "Cataract = cloudy lens"\n\n📋 NSC Memo Answer:\nCataracts` } }]
    },
    {
      id: 'L1Q9', source: '2025 NSC P1, Q1.2.3', topicText: 'Oogenesis', teachTopic: 'repro-female',
      parts: [{ part: '1.2.3', prompt: 'Give the correct biological term: The production of ova by meiosis.', clue: '💡 It happens in the ovary.', answer: 'Oogenesis', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Oogenesis', formulas: [], memoCorrection: { whatToCheck: 'Must identify oogenesis.', commonMistake: 'Learners write "ovulation" or "oogeny".', examinerHint: 'Oogenesis = the making of ova.', alternativeAccept: ['Oogenesis'], memoryTrick: '🧠 "Oogenesis = ova made"', mergedCorrection: `🧠 Memory Trick: "Oogenesis = ova made"\n\n📋 NSC Memo Answer:\nOogenesis` } }]
    },
    {
      id: 'L1Q10', source: '2025 NSC P1, Q1.2.4', topicText: 'Retina Blind Spot', teachTopic: 'eye-pupillary',
      parts: [{ part: '1.2.4', prompt: 'Give the correct biological term: The part of the retina that contains no rods and cones.', clue: '💡 The optic nerve leaves the eye at this point.', answer: 'Blind spot', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Blind spot', formulas: [], memoCorrection: { whatToCheck: 'Must identify the blind spot.', commonMistake: 'Learners confuse with fovea or macula.', examinerHint: 'Blind spot = where the optic nerve exits.', alternativeAccept: ['Blind spot'], memoryTrick: '🧠 "Blind spot = no receptors"', mergedCorrection: `🧠 Memory Trick: "Blind spot = no receptors"\n\n📋 NSC Memo Answer:\nBlind spot` } }]
    },
    {
      id: 'L1Q11', source: '2023 NSC P2, Q1.2.3', topicText: 'DNA Structure', teachTopic: 'dna-structure-replication',
      parts: [{ part: '1.2.3', prompt: 'Give the correct biological term: The natural shape of a DNA molecule.', clue: '💡 Two strands twisted around each other.', answer: 'Double helix', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Double helix', formulas: [], memoCorrection: { whatToCheck: 'Must identify the double helix.', commonMistake: 'Learners write "twisted ladder".', examinerHint: 'The natural shape of DNA is the double helix.', alternativeAccept: ['Double helix'], memoryTrick: '🧠 "DNA = double helix"', mergedCorrection: `🧠 Memory Trick: "DNA = double helix"\n\n📋 NSC Memo Answer:\nDouble helix` } }]
    },
    {
      id: 'L1Q12', source: '2024 NSC P2, Q1.2.3', topicText: 'Chromosome Structure', teachTopic: 'meiosis-phases-crossing-over',
      parts: [{ part: '1.2.3', prompt: 'Give the correct biological term: The structure that holds the two chromatids of a chromosome together.', clue: '💡 The point where the two chromatids join.', answer: 'Centromere', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Centromere', formulas: [], memoCorrection: { whatToCheck: 'Must identify the centromere.', commonMistake: 'Learners confuse with centriole.', examinerHint: 'Centromere holds sister chromatids together.', alternativeAccept: ['Centromere'], memoryTrick: '🧠 "Centromere = centre joint"', mergedCorrection: `🧠 Memory Trick: "Centromere = centre joint"\n\n📋 NSC Memo Answer:\nCentromere` } }]
    },
    {
      id: 'L1Q13', source: '2024 NSC P2, Q1.2.4', topicText: 'tRNA', teachTopic: 'protein-synthesis',
      parts: [{ part: '1.2.4', prompt: 'Give the correct biological term: The type of RNA that carries specific amino acids to the site of protein synthesis.', clue: '💡 It reads the codon and brings the matching amino acid.', answer: 'Transfer RNA', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Transfer RNA / tRNA', formulas: [], memoCorrection: { whatToCheck: 'Must identify tRNA.', commonMistake: 'Learners write mRNA instead of tRNA.', examinerHint: 'tRNA = transfer RNA, brings amino acids.', alternativeAccept: ['Transfer RNA', 'tRNA'], memoryTrick: '🧠 "tRNA = transfer, brings amino acids"', mergedCorrection: `🧠 Memory Trick: "tRNA = transfer, brings amino acids"\n\n📋 NSC Memo Answer:\ntRNA / Transfer RNA` } }]
    },
    {
      id: 'L1Q14', source: '2024 NSC P2, Q1.2.9', topicText: 'Biotechnology', teachTopic: 'evo-genetic-out-of-africa',
      parts: [{ part: '1.2.9', prompt: 'Give the correct biological term: The biotechnological process that produces genetically identical organisms.', clue: '💡 Dolly the sheep was made this way.', answer: 'Cloning', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Cloning', formulas: [], memoCorrection: { whatToCheck: 'Must identify cloning.', commonMistake: 'Learners write "genetic engineering".', examinerHint: 'Cloning = identical offspring from one parent.', alternativeAccept: ['Cloning'], memoryTrick: '🧠 "Clone = identical copy"', mergedCorrection: `🧠 Memory Trick: "Clone = identical copy"\n\n📋 NSC Memo Answer:\nCloning` } }]
    },
    {
      id: 'L1Q15', source: '2025 NSC P2, Q1.2.2', topicText: 'Mitochondrial DNA', teachTopic: 'evo-genetic-out-of-africa',
      parts: [{ part: '1.2.2', prompt: 'Give the correct biological term: An organelle that contains DNA which is used in tracing female ancestry.', clue: '💡 It is inherited only from the mother.', answer: 'Mitochondrion', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Mitochondrion', formulas: [], memoCorrection: { whatToCheck: 'Must identify the mitochondrion.', commonMistake: 'Learners write "nucleus" or "ribosome".', examinerHint: 'Mitochondrial DNA = mtDNA, inherited from mother.', alternativeAccept: ['Mitochondrion', 'Mitochondria'], memoryTrick: '🧠 "Mitochondria = mum\'s DNA"', mergedCorrection: `🧠 Memory Trick: "Mitochondria = mum's DNA"\n\n📋 NSC Memo Answer:\nMitochondrion` } }]
    },
  ],
  level2: [
    {
      id: 'L2Q1', source: '2023 NSC P1, Q2.2.2', topicText: 'Prostate Gland Function', teachTopic: 'repro-male',
      parts: [{ part: '2.2.2', prompt: 'Explain ONE function of the fluid secreted by the prostate gland during reproduction.', clue: '💡 It is alkaline.', answer: 'It is alkaline to neutralise the acidic conditions of the vagina.', marks: 2, acceptAnyTwo: true, memoFullAnswer: `It is alkaline to neutralise the acidic conditions of the vagina.\nIt contains mucus to provide a medium for sperm movement.\nIt contains nutrients to supply the sperm with energy.`, formulas: [], memoCorrection: { whatToCheck: 'Any ONE of the three functions is acceptable.', commonMistake: 'Learners state it only provides nutrients.', examinerHint: 'The main function is neutralising vaginal acid.', alternativeAccept: ['Neutralises vaginal acid', 'Provides nutrients', 'Provides mucus medium'], memoryTrick: '🧠 "Prostate = alkaline → protects sperm"', mergedCorrection: `🧠 Memory Trick: "Prostate = alkaline → protects sperm"\n\n📋 NSC Memo Answer:\nAlkaline — neutralises vaginal acid.\nContains mucus — medium for sperm.\nContains nutrients — supply sperm with energy.` } }]
    },
    {
      id: 'L2Q2', source: '2023 NSC P1, Q3.1.2', topicText: 'Hippocampus Functions', teachTopic: 'ns-brain',
      parts: [{ part: '3.1.2', prompt: 'From the extract, state TWO functions of the hippocampus.', clue: '💡 The hippocampus is deep inside the cerebrum.', answer: 'Learning ability and orientation', marks: 2, acceptAnyTwo: true, memoFullAnswer: `Learning ability\nOrientation`, formulas: [], memoCorrection: { whatToCheck: 'Must state both functions.', commonMistake: 'Learners give functions of other brain parts.', examinerHint: 'The hippocampus = learning ability and orientation.', alternativeAccept: ['Learning and orientation', 'Learning ability', 'Orientation'], memoryTrick: '🧠 "Hippocampus = learning + orientation"', mergedCorrection: `🧠 Memory Trick: "Hippocampus = learning + orientation"\n\n📋 NSC Memo Answer:\nLearning ability\nOrientation` } }]
    },
    {
      id: 'L2Q3', source: '2023 NSC P1, Q3.3.1', topicText: 'Thermoregulation', teachTopic: 'thermo-skin',
      parts: [{ part: '3.3.1', prompt: 'Name the homeostatic mechanism that brings about the change in skin temperature.', clue: '💡 It controls body temperature.', answer: 'Thermoregulation', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Thermoregulation', formulas: [], memoCorrection: { whatToCheck: 'Must identify thermoregulation.', commonMistake: 'Learners write "homeostasis".', examinerHint: 'Homeostasis is general. Thermoregulation is specific to temperature.', alternativeAccept: ['Thermoregulation'], memoryTrick: '🧠 "Thermo = temperature control"', mergedCorrection: `🧠 Memory Trick: "Thermo = temperature control"\n\n📋 NSC Memo Answer:\nThermoregulation` } }]
    },
    {
      id: 'L2Q4', source: '2024 NSC P1, Q3.1.2', topicText: 'Advantages of Internal Fertilisation', teachTopic: 'repro-strategies',
      parts: [{ part: '3.1.2', prompt: 'Fertilisation in vultures takes place internally. State TWO advantages of internal fertilisation.', clue: '💡 Think about protection and water.', answer: 'It increases the chances of fertilisation and gametes are protected.', marks: 2, acceptAnyTwo: true, memoFullAnswer: `It increases the chances of fertilisation.\nGametes are protected from predation/desiccation.\nWater is not needed.\nFewer gametes are needed.`, formulas: [], memoCorrection: { whatToCheck: 'Any TWO of the four advantages are acceptable.', commonMistake: 'Learners give benefits of external fertilisation.', examinerHint: 'Internal fertilisation protects gametes and increases success rate.', alternativeAccept: ['Increased chance of fertilisation', 'Gametes protected', 'Water not needed', 'Fewer gametes needed'], memoryTrick: '🧠 "Internal = protected + high chance"', mergedCorrection: `🧠 Memory Trick: "Internal = protected + high chance"\n\n📋 NSC Memo Answer:\nIncreases chances of fertilisation.\nGametes protected.\nWater not needed.\nFewer gametes needed.` } }]
    },
    {
      id: 'L2Q5', source: '2024 NSC P1, Q3.1.3', topicText: 'Altricial Development', teachTopic: 'repro-strategies',
      parts: [{ part: '3.1.3', prompt: 'State TWO characteristics of chicks that display altricial development.', clue: '💡 Think about how helpless they are when they hatch.', answer: 'Eyes closed when they hatch and bodies do not have down feathers.', marks: 2, acceptAnyTwo: true, memoFullAnswer: `Eyes are closed when they hatch.\nBodies do not have down feathers.\nUnable to move directly after hatching.\nDependent on parents for food/protection.`, formulas: [], memoCorrection: { whatToCheck: 'Any TWO of the four characteristics are acceptable.', commonMistake: 'Learners describe precocial characteristics.', examinerHint: 'Altricial = helpless. Precocial = ready to move.', alternativeAccept: ['Eyes closed', 'No down feathers', 'Unable to move', 'Dependent on parents'], memoryTrick: '🧠 "Altricial = helpless"', mergedCorrection: `🧠 Memory Trick: "Altricial = helpless"\n\n📋 NSC Memo Answer:\nEyes closed.\nNo down feathers.\nUnable to move.\nDependent on parents.` } }]
    },
    {
      id: 'L2Q6', source: '2024 NSC P1, Q2.1.2', topicText: 'Endometrium Characteristics', teachTopic: 'repro-female',
      parts: [{ part: '2.1.2', prompt: 'Give TWO characteristics of the endometrium that make it suitable for implantation.', clue: '💡 Think about blood supply and glands.', answer: 'It has a rich blood supply and is glandular.', marks: 2, acceptAnyTwo: true, memoFullAnswer: `It has a rich blood supply/is vascular.\nIt is glandular.\nIt is thick.`, formulas: [], memoCorrection: { whatToCheck: 'Any TWO of the three characteristics are acceptable.', commonMistake: 'Learners give functions instead of characteristics.', examinerHint: 'Rich blood supply, glandular, thick.', alternativeAccept: ['Rich blood supply', 'Glandular', 'Thick'], memoryTrick: '🧠 "Endometrium = rich, glandular, thick"', mergedCorrection: `🧠 Memory Trick: "Endometrium = rich, glandular, thick"\n\n📋 NSC Memo Answer:\nRich blood supply.\nGlandular.\nThick.` } }]
    },
    {
      id: 'L2Q7', source: '2024 NSC P1, Q2.5.3', topicText: 'Motor Neuron Function', teachTopic: 'ns-neurons',
      parts: [{ part: '2.5.3', prompt: 'Describe the function of a motor neuron.', clue: '💡 Direction: CNS → effector.', answer: 'It transmits impulses from the central nervous system/interneuron to the effector.', marks: 3, acceptAnyTwo: false, memoFullAnswer: `It transmits impulses from the central nervous system/interneuron to the effector.`, formulas: [], memoCorrection: { whatToCheck: 'Must identify direction: CNS to effector.', commonMistake: 'Learners say motor neurons carry impulses TO the CNS.', examinerHint: 'Motor = CNS → effector.', alternativeAccept: ['Transmits impulses from CNS to effector'], memoryTrick: '🧠 "Motor = CNS → effector"', mergedCorrection: `🧠 Memory Trick: "Motor = CNS → effector"\n\n📋 NSC Memo Answer:\nIt transmits impulses from the CNS/interneuron to the effector.` } }]
    },
    {
      id: 'L2Q8', source: '2025 NSC P1, Q2.2.2', topicText: 'Scrotum & Sperm Production', teachTopic: 'repro-male',
      parts: [{ part: '2.2.2', prompt: 'Explain the role of the scrotum in sperm production.', clue: '💡 Think about temperature and quality of sperm.', answer: 'It maintains the temperature of the testes lower than body temperature to ensure the production of good quality/quantity of sperm.', marks: 2, acceptAnyTwo: false, memoFullAnswer: `It maintains the temperature of the testes lower than body temperature to ensure the production of good quality/quantity of sperm.`, formulas: [], memoCorrection: { whatToCheck: 'Must mention temperature control for quality sperm.', commonMistake: 'Learners state "protects the testes" without mentioning temperature.', examinerHint: 'Scrotum = temperature control, 2-3°C below body temp.', alternativeAccept: ['Maintains lower temperature for sperm', 'Temperature regulation for sperm'], memoryTrick: '🧠 "Scrotum = cooler for good sperm"', mergedCorrection: `🧠 Memory Trick: "Scrotum = cooler for good sperm"\n\n📋 NSC Memo Answer:\nMaintains testes temperature lower than body temperature for good quality/quantity of sperm.` } }]
    },
    {
      id: 'L2Q9', source: '2024 NSC P2, Q1.2.1', topicText: 'Deoxyribonucleic Acid', teachTopic: 'dna-structure-replication',
      parts: [{ part: '1.2.1', prompt: 'Give the correct biological term: A nucleic acid that carries hereditary information.', clue: '💡 The "molecule of life".', answer: 'Deoxyribonucleic acid', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Deoxyribonucleic acid / DNA', formulas: [], memoCorrection: { whatToCheck: 'Must identify DNA.', commonMistake: 'Learners write "RNA".', examinerHint: 'DNA carries hereditary information.', alternativeAccept: ['DNA', 'Deoxyribonucleic acid'], memoryTrick: '🧠 "DNA = hereditary info"', mergedCorrection: `🧠 Memory Trick: "DNA = hereditary info"\n\n📋 NSC Memo Answer:\nDNA / Deoxyribonucleic acid` } }]
    },
    {
      id: 'L2Q10', source: '2024 NSC P2, Q2.1.5', topicText: 'Amino Acids in Translation', teachTopic: 'protein-synthesis',
      parts: [{ part: '2.1.5', prompt: 'Identify the first and last amino acids coded for by the section of mRNA shown (AGA UAC ...).', clue: '💡 AGA → Arginine, UAC → Tyrosine.', answer: 'Arginine and Tyrosine', marks: 2, acceptAnyTwo: false, memoFullAnswer: `Arginine\nTyrosine`, formulas: [], memoCorrection: { whatToCheck: 'Must use the codon table to identify both amino acids.', commonMistake: 'Learners mix up codons with anticodons.', examinerHint: 'The codon table maps 3-base codons to amino acids.', alternativeAccept: ['Arginine and Tyrosine'], memoryTrick: '🧠 "AGA = Arg, UAC = Tyr"', mergedCorrection: `🧠 Memory Trick: "AGA = Arg, UAC = Tyr"\n\n📋 NSC Memo Answer:\nArginine\nTyrosine` } }]
    },
    {
      id: 'L2Q11', source: '2025 NSC P1, Q2.4.1', topicText: 'Thermoregulation Control Centre', teachTopic: 'thermo-skin',
      parts: [{ part: '2.4.1', prompt: 'Name the part of the brain that controls thermoregulation.', clue: '💡 It also controls osmoregulation.', answer: 'Hypothalamus', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Hypothalamus', formulas: [], memoCorrection: { whatToCheck: 'Must identify the hypothalamus.', commonMistake: 'Learners write "cerebrum".', examinerHint: 'Hypothalamus = thermoregulation + osmoregulation.', alternativeAccept: ['Hypothalamus'], memoryTrick: '🧠 "Hypothalamus = thermostat"', mergedCorrection: `🧠 Memory Trick: "Hypothalamus = thermostat"\n\n📋 NSC Memo Answer:\nHypothalamus` } }]
    },
    {
      id: 'L2Q12', source: '2025 NSC P2, Q1.2.8', topicText: 'Dominant Allele', teachTopic: 'gen-monohybrid-dihybrid',
      parts: [{ part: '1.2.8', prompt: 'Give the correct biological term: An allele that is expressed in a phenotype in the heterozygous condition.', clue: '💡 It masks the effect of the other allele.', answer: 'Dominant allele', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Dominant allele', formulas: [], memoCorrection: { whatToCheck: 'Must identify the dominant allele.', commonMistake: 'Learners write "recessive allele".', examinerHint: 'Dominant = expressed even with one copy.', alternativeAccept: ['Dominant allele', 'Dominant'], memoryTrick: '🧠 "Dominant = shows up first"', mergedCorrection: `🧠 Memory Trick: "Dominant = shows up first"\n\n📋 NSC Memo Answer:\nDominant allele` } }]
    },
    {
      id: 'L2Q13', source: '2023 NSC P2, Q1.2.9', topicText: 'Cytokinesis', teachTopic: 'meiosis-phases-crossing-over',
      parts: [{ part: '1.2.9', prompt: 'Give the correct biological term: The division of the cytoplasm after a nuclear division.', clue: '💡 It happens after mitosis or meiosis.', answer: 'Cytokinesis', marks: 1, acceptAnyTwo: false, memoFullAnswer: 'Cytokinesis', formulas: [], memoCorrection: { whatToCheck: 'Must identify cytokinesis.', commonMistake: 'Learners write "karyokinesis".', examinerHint: 'Cytokinesis = cytoplasm splits.', alternativeAccept: ['Cytokinesis'], memoryTrick: '🧠 "Cyto = cell, kinesis = movement"', mergedCorrection: `🧠 Memory Trick: "Cyto = cell, kinesis = movement"\n\n📋 NSC Memo Answer:\nCytokinesis` } }]
    },
    {
      id: 'L2Q14', source: '2024 NSC P2, Q3.1.2', topicText: 'Advantages of GM Crops', teachTopic: 'evo-artificial-selection',
      parts: [{ part: '3.1.2', prompt: 'Explain TWO reasons why farmers might want to grow Bt maize.', clue: '💡 Think about yield and pesticides.', answer: 'Fewer crops are damaged by insects, and reduced need for pesticides.', marks: 4, acceptAnyTwo: true, memoFullAnswer: `Fewer crops damaged → increased yield/profit.\nReduced need for pesticides → saves money, less toxins.`, formulas: [], memoCorrection: { whatToCheck: 'Must give TWO valid reasons, each fully explained.', commonMistake: 'Learners only give one reason.', examinerHint: 'Think economics + environment.', alternativeAccept: ['Increased yield', 'Reduced pesticides', 'More profit', 'Healthier crops'], memoryTrick: '🧠 "Bt = more food, fewer chemicals"', mergedCorrection: `🧠 Memory Trick: "Bt = more food, fewer chemicals"\n\n📋 NSC Memo Answer:\nFewer crops damaged → increased yield.\nReduced need for pesticides → saves money and environment.` } }]
    },
  ],
  level3: [
    {
      id: 'L3Q1', source: '2024 NSC P1, Q2.1.3', topicText: 'Oogenesis', teachTopic: 'repro-female',
      parts: [{ part: '2.1.3', prompt: 'Identify and describe the type of gametogenesis that leads to the formation of the ovum.', clue: '💡 This process happens in the ovary. It produces only one mature ovum per cycle.', answer: 'Oogenesis: diploid cells in the ovary undergo mitosis to form follicles. At puberty, under FSH, one cell undergoes meiosis. Of four cells produced, only one survives as a mature haploid ovum.', marks: 6, acceptAnyTwo: false, memoFullAnswer: `Oogenesis:\nDuring oogenesis, diploid cells in the ovary undergo mitosis to form numerous follicles.\nAt the onset of puberty, under the influence of FSH, one cell inside a follicle enlarges and undergoes meiosis.\nOf the four cells that are produced, only one survives to form a mature haploid ovum.`, formulas: [], memoCorrection: { whatToCheck: 'Must mention oogenesis, mitosis → follicles, FSH, meiosis, and one mature ovum surviving.', commonMistake: 'Learners describe spermatogenesis instead of oogenesis.', examinerHint: 'Compulsory marks: oogenesis + meiosis + one ovum survives.', alternativeAccept: ['Oogenesis: mitosis → follicles → meiosis → 1 ovum'], memoryTrick: '🧠 "Oogenesis: mitosis → meiosis → 1 ovum"', mergedCorrection: `🧠 Memory Trick: "Oogenesis: mitosis → meiosis → 1 ovum"\n\n📋 NSC Memo Answer:\nDiploid cells in the ovary undergo mitosis to form follicles.\nAt puberty, under FSH, one cell undergoes meiosis.\nOf four cells produced, only one survives as a haploid ovum.` } }]
    },
    {
      id: 'L3Q2', source: '2023 NSC P1, Q3.2.3', topicText: 'Adrenal Gland & Salt Homeostasis', teachTopic: 'endo-salt-water',
      parts: [{ part: '3.2.3', prompt: 'Describe the interaction between the adrenal gland and the kidney in maintaining homeostasis when salt levels in the blood are low.', clue: '💡 Follow the pathway: receptor → gland → hormone → target organ → effect.', answer: 'Low salt is detected by receptor cells in the kidney. The adrenal glands secrete more aldosterone. Aldosterone stimulates the renal tubules to reabsorb more salt. Salt levels return to normal.', marks: 5, acceptAnyTwo: false, memoFullAnswer: `Low salt levels are detected by receptor cells in the kidney.\nThe adrenal glands are stimulated to secrete more aldosterone.\nAldosterone stimulates the renal tubules to be more permeable to salt.\nThis increases the reabsorption of salt.\nThe salt levels in the blood increase/return back to normal.`, formulas: [], memoCorrection: { whatToCheck: 'Must describe the full feedback: detection → aldosterone → reabsorption → normal level.', commonMistake: 'Learners skip the receptor detection step or confuse aldosterone with ADH.', examinerHint: 'Adrenal → aldosterone → kidney tubules → salt reabsorbed.', alternativeAccept: ['Kidney detects → adrenal secretes aldosterone → salt reabsorbed → normal'], memoryTrick: '🧠 "Low salt: adrenal → aldosterone → kidneys keep salt"', mergedCorrection: `🧠 Memory Trick: "Low salt: adrenal → aldosterone → kidneys keep salt"\n\n📋 NSC Memo Answer:\nLow salt is detected by receptor cells in the kidney.\nAdrenal glands secrete more aldosterone.\nAldosterone makes renal tubules more permeable to salt.\nMore salt is reabsorbed.\nSalt levels return to normal.` } }]
    },
    {
      id: 'L3Q3', source: '2024 NSC P1, Q2.5.3', topicText: 'Motor Neuron Function', teachTopic: 'ns-neurons',
      parts: [{ part: '2.5.3', prompt: 'Describe the function of a motor neuron.', clue: '💡 Think about direction: CNS → effector.', answer: 'It transmits impulses from the central nervous system/interneuron to the effector.', marks: 3, acceptAnyTwo: false, memoFullAnswer: `It transmits impulses from the central nervous system/interneuron to the effector.`, formulas: [], memoCorrection: { whatToCheck: 'Must identify direction: CNS to effector.', commonMistake: 'Learners state that motor neurons carry impulses TO the CNS.', examinerHint: 'Motor = CNS → effector (muscle/gland).', alternativeAccept: ['Transmits impulses from CNS to effector'], memoryTrick: '🧠 "Motor: CNS → effector"', mergedCorrection: `🧠 Memory Trick: "Motor: CNS → effector"\n\n📋 NSC Memo Answer:\nIt transmits impulses from the CNS/interneuron to the effector.` } }]
    },
    {
      id: 'L3Q4', source: '2024 NSC P1, Q3.2.4', topicText: 'Pupillary Significance', teachTopic: 'eye-pupillary',
      parts: [{ part: '3.2.4', prompt: 'Explain the significance of the change in the diameter of the pupil from diagram A (small) to diagram B (large).', clue: '💡 Think about why the pupil needs to get bigger in dim light.', answer: 'The pupil dilated/enlarged so that more light will enter the eye to improve vision in dim light.', marks: 4, acceptAnyTwo: false, memoFullAnswer: `The pupil dilated/enlarged so that more light will enter the eye.\nThis improves vision in dim light.`, formulas: [], memoCorrection: { whatToCheck: 'Must link pupil dilation to more light entering the eye in dim conditions.', commonMistake: 'Learners describe the muscles but not the purpose.', examinerHint: 'Bigger pupil = more light in = better vision in dim light.', alternativeAccept: ['Dilated pupil allows more light for better vision in dim light'], memoryTrick: '🧠 "Dim light: pupil dilates for more light"', mergedCorrection: `🧠 Memory Trick: "Dim light: pupil dilates for more light"\n\n📋 NSC Memo Answer:\nThe pupil dilated so more light enters the eye.\nThis improves vision in dim light.` } }]
    },
    {
      id: 'L3Q5', source: '2025 NSC P1, Q2.4.3', topicText: 'Vasodilation & Heat Loss', teachTopic: 'thermo-skin',
      parts: [{ part: '2.4.3', prompt: 'Explain the significance of the change in the diameter of the arteriole from normal conditions to the condition in diagram Z (dilated).', clue: '💡 When arterioles dilate, more blood flows to the skin surface.', answer: 'The arteriole dilated/vasodilation took place. More blood flows to the surface of the skin and more heat is lost to regulate the body temperature.', marks: 4, acceptAnyTwo: false, memoFullAnswer: `The arteriole dilated/vasodilation took place.\nMore blood flows to the surface of the skin.\nMore heat is lost/more radiation occurs to decrease/regulate the body temperature.`, formulas: [], memoCorrection: { whatToCheck: 'Must link vasodilation → more blood to skin → more heat loss.', commonMistake: 'Learners describe vasoconstriction instead.', examinerHint: 'Dilated = more blood flow = more heat lost.', alternativeAccept: ['Vasodilation → more blood to skin → heat lost'], memoryTrick: '🧠 "Dilate = heat lose"', mergedCorrection: `🧠 Memory Trick: "Dilate = heat lose"\n\n📋 NSC Memo Answer:\nThe arteriole dilated (vasodilation).\nMore blood flows to the skin surface.\nMore heat is lost to regulate body temperature.` } }]
    },
    {
      id: 'L3Q6', source: '2023 NSC P1, Q2.1.3', topicText: 'Amplexus in Frogs', teachTopic: 'repro-strategies',
      parts: [{ part: '2.1.3', prompt: 'Explain how amplexus increases the chances of fertilisation in frogs.', clue: '💡 The male and female bodies are in close contact during amplexus.', answer: 'The male and female bodies are in close contact so that sperm can be released directly onto the ova.', marks: 2, acceptAnyTwo: false, memoFullAnswer: `The male and female bodies are in close contact so that sperm can be released directly onto the ova.`, formulas: [], memoCorrection: { whatToCheck: 'Must link close contact to sperm being released onto ova.', commonMistake: 'Learners say "it helps the frogs" without explaining.', examinerHint: 'Amplexus = male grasps female, sperm released close to eggs.', alternativeAccept: ['Close contact → sperm directly onto ova'], memoryTrick: '🧠 "Amplexus = body contact, high fertilisation"', mergedCorrection: `🧠 Memory Trick: "Amplexus = body contact, high fertilisation"\n\n📋 NSC Memo Answer:\nMale and female bodies are in close contact so sperm can be released directly onto the ova.` } }]
    },
    {
      id: 'L3Q7', source: '2024 NSC P2, Q2.2.2', topicText: 'Anaphase I vs Anaphase II', teachTopic: 'meiosis-phases-crossing-over',
      parts: [{ part: '2.2.2', prompt: 'State ONE difference between the phase shown (Anaphase II) and the same phase in Meiosis I.', clue: '💡 Think about what separates: chromosomes or chromatids?', answer: 'In Anaphase I, chromosome pairs separate. In Anaphase II, chromatids (of a chromosome) separate.', marks: 1, acceptAnyTwo: false, memoFullAnswer: `In Anaphase I, chromosome pairs separate.\nIn Anaphase II, chromatids separate.`, formulas: [], memoCorrection: { whatToCheck: 'Must distinguish between chromosome pairs vs chromatids.', commonMistake: 'Learners say "they both separate" without specifying what.', examinerHint: 'Meiosis I: homologous pairs. Meiosis II: sister chromatids.', alternativeAccept: ['Chromosome pairs vs chromatids', 'Homologous pairs vs sister chromatids'], memoryTrick: '🧠 "I = pairs, II = chromatids"', mergedCorrection: `🧠 Memory Trick: "I = pairs, II = chromatids"\n\n📋 NSC Memo Answer:\nAnaphase I: chromosome pairs separate.\nAnaphase II: chromatids separate.` } }]
    },
    {
      id: 'L3Q8', source: '2024 NSC P2, Q2.3.3', topicText: 'Blood Group Inheritance', teachTopic: 'gen-blood-groups',
      parts: [{ part: '2.3.3', prompt: 'Explain how it is possible for a man with blood group A and a woman with blood group AB to have a child with blood group B.', clue: '💡 The man must be heterozygous (I^A i) for the child to inherit the i allele.', answer: 'The man is heterozygous (I^A i). The woman is I^A I^B. The child inherits I^B from the mother and i from the father, so the child is I^B i (blood group B).', marks: 5, acceptAnyTwo: false, memoFullAnswer: `The man is heterozygous/I^A i for blood group A.\nThe woman has an allele for blood group B/I^A I^B.\nThe child inherits the I^B allele from the mother.\nAnd the i allele from the father.\nTherefore the child will be heterozygous/I^B i for blood group B.`, formulas: [], memoCorrection: { whatToCheck: "Must show the parents' genotypes and the allele the child inherits from each.", commonMistake: 'Learners forget the father must be heterozygous.', examinerHint: 'I^A i × I^A I^B → I^B i.', alternativeAccept: ['Father I^A i, mother I^A I^B, child I^B i'], memoryTrick: '🧠 "A + AB can give B if dad is I^A i"', mergedCorrection: `🧠 Memory Trick: "A + AB can give B if dad is I^A i"\n\n📋 NSC Memo Answer:\nFather is I^A i.\nMother is I^A I^B.\nChild inherits I^B from mother and i from father.\nChild is I^B i — blood group B.` } }]
    },
    {
      id: 'L3Q9', source: '2025 NSC P2, Q2.3.4', topicText: 'Heterozygous Parents (Pedigree)', teachTopic: 'gen-pedigrees-incomplete',
      parts: [{ part: '2.3.4', prompt: 'Using evidence from the diagram, explain why individuals 1 and 2 are both heterozygous for CADASIL.', clue: '💡 Both parents have the disorder, but they have unaffected children.', answer: 'Both parents have CADASIL, indicating they have a dominant allele (Dd), but they have children who do not have CADASIL (dd), so each parent must carry a recessive allele.', marks: 4, acceptAnyTwo: false, memoFullAnswer: `Both individual 1 and 2 have CADASIL — indicating they have a dominant allele/the genotype Dd.\nBut they have children who do not have CADASIL/are homozygous recessive.\nIndicating that they inherited a recessive allele from each parent.`, formulas: [], memoCorrection: { whatToCheck: 'Must explain that the recessive child proves both parents carry the recessive allele.', commonMistake: 'Learners just say "they are carriers" without evidence.', examinerHint: 'Dominant trait + unaffected child = both parents heterozygous.', alternativeAccept: ['Affected parents + unaffected child = heterozygous'], memoryTrick: '🧠 "Affected parents + unaffected child = Dd × Dd"', mergedCorrection: `🧠 Memory Trick: "Affected parents + unaffected child = Dd × Dd"\n\n📋 NSC Memo Answer:\nBoth parents have CADASIL (dominant allele, Dd).\nThey have children without CADASIL (dd).\nSo both parents must carry the recessive allele.` } }]
    },
    {
      id: 'L3Q10', source: '2023 NSC P2, Q2.2', topicText: 'DNA Replication', teachTopic: 'dna-structure-replication',
      parts: [{ part: '2.2', prompt: 'Describe the process of DNA replication.', clue: '💡 Follow the steps: unwind, unzip, base pairing, two identical molecules.', answer: 'The DNA double helix unwinds and unzips (hydrogen bonds break). Both strands serve as templates. Complementary nucleotides pair with each template. Two identical DNA molecules are formed.', marks: 6, acceptAnyTwo: false, memoFullAnswer: `The DNA double helix unwinds and unzips/hydrogen bonds break to form two separate strands.\nBoth DNA strands serve as templates to build a complementary DNA strand.\nA pairs with T and C pairs with G using free DNA nucleotides from the nucleoplasm.\nThis results in two identical DNA molecules.`, formulas: [], memoCorrection: { whatToCheck: 'Must describe unwinding, unzipping, base pairing, and two identical molecules.', commonMistake: 'Learners forget to mention base pairing rules.', examinerHint: 'Unwind → unzip → template → base pair → two identical.', alternativeAccept: ['Unwind, unzip, base pair, two identical molecules'], memoryTrick: '🧠 "Unwind, unzip, pair, two identical"', mergedCorrection: `🧠 Memory Trick: "Unwind, unzip, pair, two identical"\n\n📋 NSC Memo Answer:\nThe double helix unwinds and unzips (H-bonds break).\nEach strand is a template for a new complementary strand.\nA pairs with T and C pairs with G.\nTwo identical DNA molecules are formed.` } }]
    },
  ],
  level4: [
    {
      id: 'L4Q1', source: '2024 NSC P1, Q3.3', topicText: 'Insulin & Blood Glucose', teachTopic: 'endo-glucose-thyroxin',
      tableConfig: {
        title: 'Blood glucose and insulin levels after glucose ingestion',
        headers: ['Time (min)', 'Group X glucose', 'Group X insulin', 'Group Y glucose', 'Group Y insulin'],
        rows: [['0', '6.8', '4', '4.5', '10'], ['60', '8.9', '22', '6.2', '42'], ['90', '8.7', '8', '4.5', '14']]
      },
      parts: [{ part: '3.3', prompt: 'Which group (X or Y) consists of healthy individuals? Use data in the table to explain your answer.', clue: '💡 Look for the group whose glucose returns to the normal range (3.9–5.6 mmol/l).', answer: 'Group Y. At 0 min their glucose was normal. At 90 min their glucose returned to normal while group X stayed high. Their insulin also rose appropriately.', marks: 6, acceptAnyTwo: false, memoFullAnswer: `Group Y.\nAt 0 min the blood glucose level for group Y was within the normal range/the blood glucose level for group X was high.\nAt 90 minutes the blood glucose level for group Y returned to normal while the blood glucose levels for group X remained high.\nAfter the ingestion of glucose, the insulin level for group Y increased while the insulin level for group X decreased.`, formulas: [], memoCorrection: { whatToCheck: 'Must identify Group Y and use at least two data points.', commonMistake: 'Learners identify the group but give vague reasons.', examinerHint: 'Group Y glucose returns to normal after 90 min — healthy response.', alternativeAccept: ['Group Y with data comparison'], memoryTrick: '🧠 "Healthy = glucose returns to normal"', mergedCorrection: `🧠 Memory Trick: "Healthy = glucose returns to normal"\n\n📋 NSC Memo Answer:\nGroup Y.\nAt 0 min glucose for Y was normal.\nAt 90 min glucose for Y returned to normal while X stayed high.` } }]
    },
    {
      id: 'L4Q2', source: '2024 NSC P1, Q3.5.4', topicText: 'Auxins & Phototropism', teachTopic: 'repro-plant',
      parts: [{ part: '3.5.4', prompt: 'After 72 hours, the stems of the plants in group B bent towards the right-hand side. Explain these results.', clue: '💡 Auxins diffuse to the left side of the stem and cause elongation there.', answer: 'The auxins diffused into the left side of the stem. The higher auxin concentration on the left caused more cell elongation on that side. So the stem bent to the right.', marks: 4, acceptAnyTwo: false, memoFullAnswer: `The auxins diffuse into the left side of the stem.\nThe higher concentration of auxins on the left side results in more cell elongation/growth of cells on the left side.\nThere is less growth on the right-hand side and the stem will bend to the right-hand side.`, formulas: [], memoCorrection: { whatToCheck: 'Must link auxin location → elongation → bending direction.', commonMistake: 'Learners say auxins move to the dark side but forget elongation.', examinerHint: 'More auxin = more elongation on that side = bend away from it.', alternativeAccept: ['Auxins on left cause elongation, stem bends right'], memoryTrick: '🧠 "Auxin side grows more → bends away"', mergedCorrection: `🧠 Memory Trick: "Auxin side grows more → bends away"\n\n📋 NSC Memo Answer:\nAuxins diffuse into the left side.\nHigher auxin → more cell elongation on the left.\nLess growth on the right → stem bends right.` } }]
    },
    {
      id: 'L4Q3', source: '2024 NSC P1, Q3.4.3', topicText: 'Thyroxin Feedback Loop', teachTopic: 'endo-glucose-thyroxin',
      parts: [{ part: '3.4.3', prompt: 'Describe the role of the pituitary gland in correcting the level of thyroxin at X (low thyroxin).', clue: '💡 Follow the pathway: low thyroxin → pituitary → TSH → thyroid → more thyroxin.', answer: 'The low thyroxin level stimulates the pituitary gland. More TSH is secreted, which stimulates the thyroid gland to secrete more thyroxin.', marks: 4, acceptAnyTwo: false, memoFullAnswer: `The thyroxin level is low.\nThe pituitary gland is stimulated.\nMore TSH is secreted which stimulates gland Y/the thyroid gland to secrete more thyroxin.`, formulas: [], memoCorrection: { whatToCheck: 'Must show the three-step pathway: low thyroxin → pituitary → TSH → thyroid → more thyroxin.', commonMistake: 'Learners reverse the direction or confuse TSH with thyroxin.', examinerHint: 'TSH = Thyroid Stimulating Hormone from the pituitary.', alternativeAccept: ['Low thyroxin → pituitary secretes TSH → thyroid secretes thyroxin'], memoryTrick: '🧠 "TSH tells thyroid to work"', mergedCorrection: `🧠 Memory Trick: "TSH tells thyroid to work"\n\n📋 NSC Memo Answer:\nThe thyroxin level is low.\nPituitary gland stimulated.\nMore TSH secreted → stimulates thyroid → more thyroxin.` } }]
    },
    {
      id: 'L4Q4', source: '2023 NSC P1, Q3.3.4', topicText: 'Sweat Gland & Blood Vessel Roles', teachTopic: 'thermo-skin',
      parts: [{ part: '3.3.4', prompt: 'Explain the roles of the sweat gland (P) and the blood capillary (Q) in the change in skin temperature from before exercise to directly after exercise.', clue: '💡 Two effectors: sweat glands and blood vessels.', answer: 'Skin temperature dropped because part Q dilated (vasodilation) allowing more blood to flow to the skin surface, and part P became more active producing more sweat. Sweat evaporation removed heat from the skin.', marks: 6, acceptAnyTwo: false, memoFullAnswer: `Skin temperature decreased from 37.4°C to 35.4°C.\nPart Q dilated/vasodilated.\nCausing more blood to flow to the surface of the skin.\nPart P became more active/produced more sweat.\nCausing more heat to be lost to the environment.\nThrough evaporation/radiation/convection.`, formulas: [], memoCorrection: { whatToCheck: 'Must describe vasodilation AND increased sweating with their effects on heat loss.', commonMistake: 'Learners describe vasoconstriction instead of vasodilation.', examinerHint: 'Two effectors: blood vessel dilates + sweat gland produces sweat.', alternativeAccept: ['Vasodilation + sweating → heat lost → skin cools'], memoryTrick: '🧠 "Hot: vessels open, sweat flows"', mergedCorrection: `🧠 Memory Trick: "Hot: vessels open, sweat flows"\n\n📋 NSC Memo Answer:\nSkin temp decreased 37.4 → 35.4°C.\nPart Q dilated (vasodilation).\nMore blood to skin surface.\nPart P produced more sweat.\nMore heat lost via evaporation.` } }]
    },
    {
      id: 'L4Q5', source: '2025 NSC P1, Q3.4.3', topicText: 'Balance & the Ear', teachTopic: 'ear-hearing-balance',
      parts: [{ part: '3.4.3', prompt: 'Describe how balance is restored when there is a change in the speed and direction of head movement.', clue: '💡 Follow the pathway: cristae → auditory nerve → cerebellum → skeletal muscles.', answer: 'Cristae are stimulated and convert the stimulus into an impulse. The impulse travels via the auditory nerve to the cerebellum. From there, impulses go to the skeletal muscles to restore balance.', marks: 5, acceptAnyTwo: false, memoFullAnswer: `Cristae are stimulated.\nConvert the stimulus to an impulse.\nThe impulse is sent via the auditory nerve.\nTo the cerebellum for interpretation.\nImpulses are then sent to the skeletal muscles to restore balance.`, formulas: [], memoCorrection: { whatToCheck: 'Must follow the correct pathway: cristae → auditory nerve → cerebellum → muscles.', commonMistake: 'Learners send the impulse to the cerebrum instead of the cerebellum.', examinerHint: 'Balance = cerebellum, hearing = cerebrum.', alternativeAccept: ['Cristae → auditory nerve → cerebellum → muscles'], memoryTrick: '🧠 "Balance goes to cerebellum"', mergedCorrection: `🧠 Memory Trick: "Balance goes to cerebellum"\n\n📋 NSC Memo Answer:\nCristae stimulated → impulse.\nVia auditory nerve.\nTo cerebellum.\nImpulses sent to skeletal muscles to restore balance.` } }]
    },
    {
      id: 'L4Q6', source: '2024 NSC P2, Q2.3.4', topicText: 'Bar Graph — Blood Donors', teachTopic: 'gen-blood-groups',
      tableConfig: {
        title: 'Percentage of blood donors by blood group (South Africa, 2018)',
        headers: ['Blood group', '% Donors'],
        rows: [['O', '48'], ['A', '38'], ['B', '10'], ['AB', '4']]
      },
      parts: [{ part: '2.3.4', prompt: 'Plot a bar graph to represent the data in the table. Include a caption.', clue: '💡 T (type), C (caption), L (labels+units), S (scale), P (plotting).', answer: 'Bar graph with X-axis blood groups (O, A, B, AB), Y-axis % donors (0–60), equal-width bars, values labelled, caption includes both variables.', marks: 6, acceptAnyTwo: false, memoFullAnswer: `Type: bar graph (T) — 1 mark.\nCaption includes both variables and 2018 (C) — 1 mark.\nCorrect labels for X- and Y-axis with unit (L) — 1 mark.\nEqual space and width of bars; correct scale (S) — 1 mark.\nPlotting: 1–3 correctly plotted = 1 mark; all 4 correctly plotted = 2 marks.`, formulas: [], memoCorrection: { whatToCheck: 'Bar graph, not histogram or line. Both axes labelled. Y-axis scale correct. Caption.', commonMistake: 'Drawing a histogram (bars touching) instead of a bar graph.', examinerHint: 'Bar graph = gaps between bars. Histogram = no gaps.', alternativeAccept: ['Bar graph with correct labels and plotting'], memoryTrick: '🧠 "Bar graph = gaps between bars"', mergedCorrection: `🧠 Memory Trick: "Bar graph = gaps between bars"\n\n📋 NSC Memo Answer:\nBar graph with X-axis blood groups (O, A, B, AB), Y-axis % donors, caption including SA + 2018, values plotted correctly.` } }]
    },
    {
      id: 'L4Q7', source: '2025 NSC P2, Q3.2.4', topicText: 'Brain Volume Percentage Increase', teachTopic: 'hominid-bipedalism-brain-tools',
      tableConfig: {
        title: 'Average brain volume of hominid species',
        headers: ['Species', 'Average brain volume (ml)'],
        rows: [['Ardipithecus ramidus', '350'], ['Australopithecus africanus', '461'], ['Homo habilis', '609'], ['Homo erectus', '959'], ['Homo sapiens', '1330']]
      },
      parts: [{ part: '3.2.4', prompt: 'Calculate the percentage increase in the average brain volume between Homo habilis and Homo sapiens. Show ALL working and round off the answer to TWO decimal places.', clue: '💡 Formula: (new − old) / old × 100.', answer: '(1330 − 609) / 609 × 100 = 118.39%', marks: 3, acceptAnyTwo: false, memoFullAnswer: `(1330 − 609) / 609 × 100 = 118.39%`, formulas: ['% increase = (new − old) / old × 100'], memoCorrection: { whatToCheck: 'Must show formula, substitution, and correct answer to two decimals.', commonMistake: 'Learners divide by the new value instead of the old one.', examinerHint: 'Percentage increase uses the ORIGINAL value as denominator.', alternativeAccept: ['118.39%'], memoryTrick: '🧠 "% increase = (new − old) / old × 100"', mergedCorrection: `🧠 Memory Trick: "% increase = (new − old) / old × 100"\n\n📋 NSC Memo Answer:\n(1330 − 609) / 609 × 100 = 118.39%` } }]
    },
    {
      id: 'L4Q8', source: '2023 NSC P2, Q3.4.2', topicText: 'Coexistence Period Calculation', teachTopic: 'hominid-bipedalism-brain-tools',
      parts: [{ part: '3.4.2', prompt: 'Calculate the period (in million years) during which A. afarensis and A. africanus coexisted. Show ALL working.', clue: '💡 Find when both species existed at the same time on the timeline.', answer: '3.2 − 2.7 = 0.5 million years', marks: 2, acceptAnyTwo: false, memoFullAnswer: `3.2 − 2.7 = 0.5 million years`, formulas: [], memoCorrection: { whatToCheck: 'Must subtract the correct start/end times from the diagram.', commonMistake: 'Learners add instead of subtract.', examinerHint: "Coexistence = overlap between the two species' time ranges.", alternativeAccept: ['0.5 my'], memoryTrick: '🧠 "Overlap = later start minus earlier end"', mergedCorrection: `🧠 Memory Trick: "Overlap = later start minus earlier end"\n\n📋 NSC Memo Answer:\n3.2 − 2.7 = 0.5 million years` } }]
    },
  ],
  level5: [
    {
      id: 'L5Q1', source: '2023 NSC P1, Q2 (full)', topicText: 'Male Reproductive System', teachTopic: 'repro-male',
      parts: [{ part: 'Q2', prompt: '(a) Name parts A and B.\n(b) Name the hormone secreted by B.\n(c) Explain ONE function of the fluid secreted by the prostate gland.\n(d) Which age group is most likely to develop prostate cancer (from the table)?', clue: '💡 Work through each sub-question.', answer: 'A = Seminal vesicle, B = Testis, Testosterone, alkaline fluid neutralises vaginal acid, 70–74.', marks: 8, acceptAnyTwo: false, memoFullAnswer: `(a) A = Seminal vesicle, B = Testis\n(b) Testosterone\n(c) It is alkaline to neutralise the acidic conditions of the vagina.\n(d) 70–74`, formulas: [], memoCorrection: { whatToCheck: 'All four parts must be answered correctly.', commonMistake: 'Learners confuse seminal vesicle and prostate gland.', examinerHint: 'A = seminal vesicle (above), B = testis (below).', alternativeAccept: ['Seminal vesicle, testis, testosterone, 70–74'], memoryTrick: '🧠 "Seminal vesicle = top, testis = bottom"', mergedCorrection: `🧠 Memory Trick: "Seminal vesicle = top, testis = bottom"\n\n📋 NSC Memo Answer:\n(a) A = Seminal vesicle, B = Testis\n(b) Testosterone\n(c) Alkaline — neutralises vaginal acid.\n(d) 70–74` } }]
    },
    {
      id: 'L5Q2', source: '2024 NSC P1, Q3.1 (full)', topicText: 'Reproductive Strategies of Vultures', teachTopic: 'repro-strategies',
      parts: [{ part: 'Q3.1', prompt: '(a) Give ONE reason from the passage why vultures are considered oviparous.\n(b) Give ONE reason why vultures have a high survival rate even though few eggs are laid.\n(c) State TWO advantages of internal fertilisation.\n(d) State TWO characteristics of chicks with altricial development.\n(e) Explain why birds with altricial development have short incubation periods.', clue: '💡 Work through each part carefully.', answer: 'They lay eggs; parents protect eggs/feed chicks; internal fertilisation protects gametes and increases chances; eyes closed + no down feathers; chicks not fully developed at hatching.', marks: 8, acceptAnyTwo: false, memoFullAnswer: `(a) They lay eggs.\n(b) The eggs are protected/incubated by the parents OR the young chicks are fed by the parents.\n(c) Increases chance of fertilisation OR gametes protected OR water not needed OR fewer gametes needed.\n(d) Eyes closed OR no down feathers OR unable to move OR dependent on parents.\n(e) Chicks are not fully developed when hatched because the eggs have less yolk/there is a high degree of parental care.`, formulas: [], memoCorrection: { whatToCheck: 'All 5 parts answered correctly.', commonMistake: 'Learners describe precocial characteristics instead of altricial.', examinerHint: 'Altricial = helpless, need care.', alternativeAccept: ['Lay eggs; parental care; protection; eyes closed; short incubation'], memoryTrick: '🧠 "Altricial = helpless"', mergedCorrection: `🧠 Memory Trick: "Altricial = helpless"\n\n📋 NSC Memo Answer:\n(a) Lay eggs.\n(b) Parents protect eggs/feed chicks.\n(c) Protection, higher fertilisation chance, no water needed.\n(d) Eyes closed, no down feathers.\n(e) Chicks not fully developed when hatched.` } }]
    },
    {
      id: 'L5Q3', source: '2023 NSC P1, Q3 (full)', topicText: "Nervous System & Alzheimer's", teachTopic: 'ns-brain',
      parts: [{ part: 'Q3', prompt: "(a) State ONE change in nerve tissue that can cause Alzheimer's.\n(b) State ONE symptom, ONE genetic risk factor, and TWO functions of the hippocampus.\n(c) Name TWO factors considered when selecting participants.\n(d) State TWO ways scientists improved reliability.\n(e) Explain why this investigation cannot conclude that exercise reduces Alzheimer's risk.", clue: '💡 Read the extract carefully — the answers are there.', answer: 'Degeneration of nerve tissue; worsening memory; family history; learning + orientation; gender + age; 37 participants + 3 months; no control group.', marks: 14, acceptAnyTwo: false, memoFullAnswer: `(a) Degeneration/wasting away of nerve tissue OR plaque/proteins formed.\n(b) Symptom: worsening memory. Genetic risk: family history. Hippocampus: learning and orientation.\n(c) Gender and age group.\n(d) Used 37 participants OR investigated 3×/week OR ran 3 months.\n(e) No control group OR no nervous tissue changes measured.`, formulas: [], memoCorrection: { whatToCheck: 'All parts answered with specific details from the extract.', commonMistake: 'Learners give generic answers not from the extract.', examinerHint: 'Read the extract — every answer is there.', alternativeAccept: ['Degeneration; memory loss; family history; learning+orientation; gender+age; no control'], memoryTrick: '🧠 "Answers in the extract"', mergedCorrection: `🧠 Memory Trick: "Answers in the extract"\n\n📋 NSC Memo Answer:\n(a) Nerve tissue degeneration.\n(b) Memory loss / family history / learning + orientation.\n(c) Gender + age group.\n(d) 37 participants + 3-month duration.\n(e) No control group.` } }]
    },
    {
      id: 'L5Q4', source: '2024 NSC P1, Q2 (full)', topicText: 'Female Reproduction — Full Question', teachTopic: 'repro-female',
      tableConfig: {
        title: 'Hormone levels during the menstrual cycle',
        headers: ['Day', 'Oestrogen (pg/ml)', 'Progesterone (ng/ml)'],
        rows: [['4', '55', '0.2'], ['8', '70', '0.03'], ['10', '280', '0.03'], ['12', '300', '0.03'], ['14', '140', '3.0'], ['16', '110', '12.5'], ['20', '80', '15.0'], ['24', '70', '5.0'], ['28', '65', '0.8']]
      },
      parts: [{ part: 'Q2', prompt: '(a) Identify parts A and B.\n(b) Give TWO characteristics of the endometrium suitable for implantation.\n(c) Identify and describe the gametogenesis that forms the ovum.\n(d) Explain why an ectopic pregnancy may kill the embryo.\n(e) On which day is progesterone highest?\n(f) Name the hormone that increases from day 24.\n(g) Calculate the percentage increase in oestrogen from day 8 to day 10.', clue: '💡 Work carefully. For (g): % increase = (new − old) / old × 100.', answer: 'A = Fallopian tube, B = Ovary; rich blood supply + glandular; oogenesis; no space/nutrients in fallopian tube; day 20; FSH; 300%.', marks: 15, acceptAnyTwo: false, memoFullAnswer: `(a) A = Fallopian tube, B = Ovary\n(b) Rich blood supply, glandular, thick\n(c) Oogenesis: diploid cells in the ovary undergo mitosis → follicles. Under FSH, one cell undergoes meiosis. Of four cells, one becomes a mature haploid ovum.\n(d) The fallopian tube cannot provide space, nutrients, or oxygen for the embryo to develop.\n(e) Day 20\n(f) FSH\n(g) (280 − 70) / 70 × 100 = 300%`, formulas: ['% increase = (new − old) / old × 100'], memoCorrection: { whatToCheck: 'All parts correct, including the calculation.', commonMistake: 'Learners use wrong formula for % increase.', examinerHint: 'Percentage increase uses the ORIGINAL value as denominator.', alternativeAccept: ['Fallopian tube, ovary, rich blood supply, oogenesis, no space, day 20, FSH, 300%'], memoryTrick: '🧠 "% increase = (new − old) / old × 100"', mergedCorrection: `🧠 Memory Trick: "% increase = (new − old) / old × 100"\n\n📋 NSC Memo Answer:\n(a) A = Fallopian tube, B = Ovary\n(b) Rich blood supply, glandular, thick\n(c) Oogenesis: mitosis → meiosis → 1 mature ovum\n(d) No space/nutrients in fallopian tube\n(e) Day 20\n(f) FSH\n(g) (280 − 70) / 70 × 100 = 300%` } }]
    },
    {
      id: 'L5Q5', source: '2025 NSC P2, Q3.4 (full)', topicText: 'Starvation Resistance in Fruit Flies', teachTopic: 'evo-natural-selection-speciation',
      parts: [{ part: 'Q3.4', prompt: 'An investigation tested starvation resistance in fruit flies over 60 generations.\n(a) State the independent variable.\n(b) Describe how the dependent variable was measured.\n(c) State ONE controlled variable.\n(d) Explain why the same food type was used throughout.\n(e) Describe the results obtained.\n(f) Using Darwin\'s theory, explain the increase in starvation resistance.', clue: '💡 Think about variation, selection, reproduction, and inheritance.', answer: 'Availability of food; time for 80% to die; age; to ensure food is only the variable; longer survival in Gen 60; variation → selection → reproduction → allele inheritance.', marks: 13, acceptAnyTwo: false, memoFullAnswer: `(a) Availability of food\n(b) The time it took for 80% of the flies to die from starvation\n(c) Age (or species, sex, container size)\n(d) To improve validity — ensuring food availability is the only independent variable\n(e) Hours until death in Gen 1 was shorter (8–40 hrs); in Gen 60 it was longer (140–180 hrs)\n(f) There was variation. Some were starvation resistant. When food was removed, non-resistant flies died. Resistant flies survived and reproduced. They passed on the allele. The next generation had more resistant flies.`, formulas: [], memoCorrection: { whatToCheck: 'Must cover variation, selection pressure, reproduction, inheritance.', commonMistake: 'Learners skip the variation step or say "they adapted".', examinerHint: "Darwin's steps: variation → selection → reproduction → inheritance.", alternativeAccept: ['Variation, selection, reproduction, inheritance'], memoryTrick: '🧠 "Vary → Select → Reproduce → Inherit"', mergedCorrection: `🧠 Memory Trick: "Vary → Select → Reproduce → Inherit"\n\n📋 NSC Memo Answer:\n(a) Availability of food\n(b) Time for 80% to die\n(c) Age\n(d) To ensure only food availability varies\n(e) Gen 60 survived longer\n(f) Variation → selection → reproduction → inheritance` } }]
    },
  ]
};

// ================================================================
// MAIN COMPONENT
// ================================================================
const TopicLessonLifeSciences = () => {
  const { subject, topicId: rawTopicId } = useParams();
  const navigate = useNavigate();
  const { setNeoMessage } = useNeo();
  const audioRef = useRef(null);

  const topicId = rawTopicId || DEFAULT_TOPIC;
  const isPaper1 = PAPER_1_TOPICS.has(topicId);
  const accent = isPaper1 ? '#4CAF50' : '#2E7D32';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';
  const topicName = TOPIC_NAMES[topicId] || 'Life Sciences';

  const activeConcepts = TOPIC_CONCEPTS[topicId] || [];

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
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const prefetchedRef = useRef(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';

  const speakText = createSpeakText({ audioRef, setSpeaking: setIsSpeaking }, API_URL);

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
  const allParts = activeQuestionSet?.parts || [];
  const currentQuestion = allParts[currentPartIndex % Math.max(allParts.length, 1)] || null;
  const memo = currentQuestion?.memoCorrection || null;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Let's explore ${topicName}.`;
    setNeoMessage(welcomeMsg);

    const timer = setTimeout(() => setWelcomeDone(true), 100);
    return () => {
      clearTimeout(timer);
      try { stopSpeaking(); } catch {}
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/LifeSciencesContent');
        const scripts = mod.LIFESCIENCES_TEACHING_SCRIPTS || {};
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

          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct answers.' : ''}

          ACCEPT SYNONYMS:
          - "iris" = "coloured part of the eye"
          - "vivipary" = "live birth"
          - "aldosterone" = "salt hormone"
          - "progesterone" = "corpus luteum hormone"
          - "umbilical cord" = "cord connecting foetus"
          - "thermoregulation" = "temperature control"
          - "oogenesis" = "ovum formation"
          - "spermatogenesis" = "sperm formation"
          - "hypothalamus" = "thermostat"
          - "cerebellum" = "balance centre"
          - "medulla oblongata" = "breathing control"
          - "double helix" = "twisted ladder"
          - "centromere" = "centre joint"
          - "tRNA" = "transfer RNA"
          - "cloning" = "identical copy"

          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}

          If CORRECT:
          "CORRECT: [3 words max]"

          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [common mistake from memo]
          TEACHING: [gentle, plain-English explanation]"`,
          subject: 'life-sciences',
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
        setNeoMessage('✅ Correct!');
        speakText('Correct!');
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/TEACHING:\s*([\s\S]+)/) || reply.match(/FIX:\s*([^\n]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');

        let teachingMsg = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        if (!teachingMsg) {
          teachingMsg = `Not quite, but don't worry — we'll get there together. ${memo?.examinerHint || ''}`;
        }
        setAiTeaching(teachingMsg);
        setNeoMessage(teachingMsg);
        speakText(teachingMsg);
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
          message: `The student doesn't understand. Explain like they're 12.
          Question: ${currentQuestion?.prompt}
          Keep it SIMPLE. Use everyday analogies.`,
          subject: 'life-sciences',
          userId: 'student',
        })
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

    if (currentPartIndex < allParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
      const msgs = [`${firstName}, keep going!`, `You're doing great!`, `Let's continue!`];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
    } else {
      if (currentQuestionIndex < levelQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentPartIndex(0);
        setNeoMessage('Great job! Next question.');
        speakText('Great job! Next question.');
      } else {
        const nextLevel = currentLevel + 1;
        if (nextLevel > 5) {
          setNeoMessage(`🎉 You've completed every question in ${topicName}!`);
          speakText('You have completed every question!');
          setTimeout(() => navigate(`/subjects/${subject}`), 2500);
          return;
        }
        setCurrentLevel(nextLevel);
        setCurrentQuestionIndex(0);
        setCurrentPartIndex(0);
        const levelMsgs = {
          2: `Level 2 coming up.`,
          3: `🔥 Level 3 — things get harder.`,
          4: `💪 Level 4 — analysis time.`,
          5: `🏆 Level 5 — the final level!`,
        };
        const msg = levelMsgs[nextLevel] || `${firstName}, let's continue.`;
        setNeoMessage(msg);
        speakText(msg);
      }
    }
  };

  if (!currentQuestion) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="lifesciences"
        moduleLabel="Life Sciences"
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
        scriptsModule="lifesciences"
        accent={accent}
      />
    );
  }

  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  const renderTable = () => {
    const tableConfig = activeQuestionSet.tableConfig;
    if (!tableConfig) return null;
    return (
      <div className="tl-table-container" style={{ marginBottom: '16px', overflowX: 'auto' }}>
        {tableConfig.title && (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', color: '#1a1a1a' }}>
            {tableConfig.title}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {tableConfig.headers.map((header, i) => (
                <th key={i} style={{ padding: '8px', textAlign: 'left', border: '1px solid #E0E0E0', fontWeight: '600', fontSize: '12px' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableConfig.rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '6px', border: '1px solid #E0E0E0', color: '#333', fontSize: '12px' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFormula = () => {
    const formulaConfig = activeQuestionSet.formulaConfig;
    if (!formulaConfig) return null;
    return (
      <div className="tl-formula-box" style={{ background: '#f0f4ff', border: `1px solid ${accent}`, borderRadius: '12px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: accent }}>{formulaConfig.display || formulaConfig.formula}</div>
        {formulaConfig.variables && (
          <div style={{ fontSize: '13px', color: '#4A148C', marginTop: '8px' }}>{formulaConfig.variables}</div>
        )}
      </div>
    );
  };

  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText.split('\n')
      .filter((line) => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map((line) => line.trim());
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
          <span className="tl-progress-text-mini">{currentQuestionIndex + 1}/{levelQuestions.length}</span>
        </div>
        <NeoVoiceIndicator autoMode={autoMode} onToggleAuto={() => setAutoMode((v) => !v)} />
      </header>

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label" style={{ color: accent }}>
            {paperLabel} • Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

          {renderFormula()}
          {renderTable()}

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
                  <button className="tl-clue-btn" onClick={() => setShowClue(!showClue)} aria-label="Show clue" title="Show clue">
                    <FaLightbulb />
                  </button>
                )}
              </div>

              {showClue && currentQuestion.clue && (
                <div className="tl-clue-popup">{currentQuestion.clue}</div>
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
              <button className="tl-proceed-btn" onClick={handleProceed} style={{ background: accent }}>
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonLifeSciences;