// ================================================================
// LIFE SCIENCES — TEACHING + AUTO SCRIPTS
// P1 + P2 merged, 28 concepts total
// Extracted from NSC Life Sciences P1 + P2 papers: 2023, 2024, 2025
// ================================================================

export const LIFESCIENCES_TEACHING_SCRIPTS = {
  // ================================================================
  // PAPER 1 — TOPIC 1: HUMAN EYE
  // ================================================================
  'eye-pupillary': {
    sections: [
      { type: 'heading', text: "Let's start with how your eye controls light." },
      {
        type: 'scene',
        sceneId: 'eye-pupillary',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Pupillary Mechanism' },
        caption: 'Your pupil is a doorway. The iris decides how wide it opens.',
        stepTexts: [
          null,
          'In bright light, your pupil shrinks to protect the retina from too much light.',
          'In dim light, your pupil widens to let in as much light as possible.',
          'The iris has two sets of muscles: circular muscles and radial muscles.',
          'Circular muscles contract in bright light. Radial muscles contract in dim light.',
        ],
      },
      {
        type: 'concept',
        label: 'Bright light',
        text: 'Circular muscles contract. Radial muscles relax. The pupil constricts (gets smaller). Less light enters.',
      },
      {
        type: 'concept',
        label: 'Dim light',
        text: 'Radial muscles contract. Circular muscles relax. The pupil dilates (gets bigger). More light enters.',
      },
      {
        type: 'concept',
        label: 'It is a reflex',
        text: 'You cannot control it. It happens automatically, rapidly, and involuntarily.',
      },
      {
        type: 'example',
        scenario: 'Imagine you walk from a sunny street into a dark cinema. What happens to your pupils?',
        steps: [
          'The light level drops suddenly.',
          'Receptors in the retina detect the change.',
          'The radial muscles in the iris contract.',
          'The pupil dilates (widens).',
        ],
        answer: 'The pupil dilates so more light can enter the eye.',
      },
    ],
  },

  'eye-accommodation-defects': {
    sections: [
      { type: 'heading', text: 'Now — how your eye focuses, and what happens when it goes wrong.' },
      {
        type: 'scene',
        sceneId: 'eye-accommodation-defects',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Accommodation & Defects' },
        caption: 'The lens changes shape to focus near and far. When it fails, we get defects.',
        stepTexts: [
          null,
          'Distant vision: ciliary muscles relax, suspensory ligaments become taut, lens becomes less convex.',
          'Near vision: ciliary muscles contract, suspensory ligaments slacken, lens becomes more convex.',
          'Myopia (short-sighted): eyeball too long, image forms in front of the retina.',
          'Hyperopia (long-sighted): eyeball too short, image forms behind the retina.',
        ],
      },
      {
        type: 'concept',
        label: 'Accommodation',
        text: 'The lens changes shape to focus on near and far objects. Ciliary muscles control the shape.',
      },
      {
        type: 'concept',
        label: 'Myopia',
        text: 'Short-sightedness. Distant objects are blurred. The eyeball is too long, or the lens is too convex. Fixed with concave lenses.',
      },
      {
        type: 'concept',
        label: 'Hyperopia',
        text: 'Long-sightedness. Near objects are blurred. The eyeball is too short, or the lens is too flat. Fixed with convex lenses.',
      },
      {
        type: 'concept',
        label: 'Cataracts and astigmatism',
        text: 'Cataracts: the lens becomes cloudy (protein clumps). Fixed by surgery. Astigmatism: the cornea is unevenly curved, so light refracts unevenly. Fixed with special lenses.',
      },
      {
        type: 'example',
        scenario: 'A girl looks at a car driving away from her. She focuses on the number plate. What happens inside her eyes?',
        steps: [
          'She is looking at a distant object.',
          'Ciliary muscles relax.',
          'Suspensory ligaments become taut.',
          'The lens becomes less convex, so light is refracted less.',
        ],
        answer: 'Ciliary muscles relax and the lens becomes less convex for distant vision.',
        sceneId: 'eye-accommodation-defects',
      },
    ],
  },

  // ================================================================
  // PAPER 1 — TOPIC 2: HUMAN EAR
  // ================================================================
  'ear-hearing-balance': {
    sections: [
      { type: 'heading', text: "The ear does two jobs: hearing and balance." },
      {
        type: 'scene',
        sceneId: 'ear-hearing-balance',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Human Ear' },
        caption: 'Sound travels in. Balance signals travel out.',
        stepTexts: [
          null,
          'The pinna catches sound waves and the auditory canal funnels them to the tympanic membrane.',
          'Three ossicles (hammer, anvil, stirrup) amplify the vibrations and pass them to the oval window.',
          'The cochlea converts vibrations into nerve impulses. The organ of Corti inside it has tiny hair cells.',
          'The semi-circular canals contain cristae that detect changes in speed and direction of head movement.',
        ],
      },
      {
        type: 'concept',
        label: 'Hearing pathway',
        text: 'Pinna → auditory canal → tympanic membrane → ossicles → oval window → cochlea → auditory nerve → cerebrum.',
      },
      {
        type: 'concept',
        label: 'Balance pathway',
        text: 'Cristae in the semi-circular canals detect head movement → auditory nerve → cerebellum → skeletal muscles restore balance.',
      },
      {
        type: 'concept',
        label: 'Pressure equalisation',
        text: 'The Eustachian tube connects the middle ear to the throat. It equalises air pressure on both sides of the eardrum.',
      },
      {
        type: 'concept',
        label: 'Noise-induced hearing loss',
        text: 'Loud noise damages the hair cells in the organ of Corti. These cells do NOT regenerate. Once damaged, hearing is permanently lost.',
      },
      {
        type: 'example',
        scenario: 'A worker stands next to a loud machine for 8 hours a day for years. Why does he slowly lose his hearing?',
        steps: [
          'Loud sound waves cause strong vibrations in the cochlea.',
          'The hair cells in the organ of Corti get damaged.',
          'These cells do not regenerate.',
          'Fewer impulses are sent to the cerebrum, so hearing is reduced.',
        ],
        answer: 'The hair cells in the organ of Corti are permanently damaged, so fewer impulses reach the brain.',
        sceneId: 'ear-hearing-balance',
      },
    ],
  },

  // ================================================================
  // PAPER 1 — TOPIC 3: NERVOUS SYSTEM
  // ================================================================
  'ns-neurons': {
    sections: [
      { type: 'heading', text: "Your nervous system is a messaging network." },
      {
        type: 'scene',
        sceneId: 'ns-neurons',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Three Types of Neurons' },
        caption: 'Sensory in. Interneuron processes. Motor out.',
        stepTexts: [
          null,
          'Sensory neurons carry impulses from receptors to the CNS.',
          'Interneurons connect sensory and motor neurons inside the CNS.',
          'Motor neurons carry impulses from the CNS to effectors (muscles or glands).',
        ],
      },
      {
        type: 'concept',
        label: 'Neuron structure',
        text: 'Dendrites receive impulses. The cell body contains the nucleus. The axon transmits impulses away. The myelin sheath insulates the axon.',
      },
      {
        type: 'concept',
        label: 'Myelin sheath',
        text: 'It insulates the axon and speeds up impulse transmission. Neurons with myelin carry impulses much faster.',
      },
      {
        type: 'concept',
        label: 'Multiple sclerosis',
        text: 'A disorder where the myelin sheath degenerates. Impulses slow down or stop. Causes loss of muscle control, vision problems, and fatigue.',
      },
      {
        type: 'example',
        scenario: 'A neuron has a very thick myelin sheath and a large axon diameter. Would it carry impulses fast or slow?',
        steps: [
          'Thick myelin insulates the axon.',
          'A large axon diameter reduces resistance.',
          'Both factors speed up transmission.',
        ],
        answer: 'Fast — thick myelin and large diameter both increase impulse speed.',
        sceneId: 'ns-neurons',
      },
    ],
  },

  'ns-reflex-arc': {
    sections: [
      { type: 'heading', text: "The reflex arc — your body's emergency response." },
      {
        type: 'scene',
        sceneId: 'ns-reflex-arc',
        steps: 5,
        stepDuration: 2400,
        config: { title: 'The Reflex Arc' },
        caption: 'Receptor → sensory → interneuron → motor → effector. All in a split second.',
        stepTexts: [
          null,
          'A receptor detects a stimulus (like a thorn pricking your foot).',
          'A sensory neuron carries the impulse to the spinal cord through the dorsal root.',
          'An interneuron in the spinal cord passes the impulse across a synapse.',
          'A motor neuron carries the impulse out through the ventral root.',
          'The effector (muscle) contracts and you pull your foot away.',
        ],
      },
      {
        type: 'concept',
        label: 'Reflex action',
        text: 'A rapid, involuntary response to a stimulus. It happens without conscious thought.',
      },
      {
        type: 'concept',
        label: 'The synapse',
        text: 'The tiny gap between two neurons. Neurotransmitters carry the impulse across. It ensures the impulse travels in ONE direction only.',
      },
      {
        type: 'example',
        scenario: 'A boy steps on a thorn. Trace the pathway of the impulse that makes him pull his foot away.',
        steps: [
          'Pain receptors in the foot are stimulated.',
          'Impulse travels along the sensory neuron.',
          'Through the dorsal root into the spinal cord.',
          'Synapse with interneuron, then motor neuron.',
          'Through the ventral root to the leg muscle, which contracts.',
        ],
        answer: 'Pain receptor → sensory neuron → interneuron → motor neuron → leg muscle.',
        sceneId: 'ns-reflex-arc',
      },
    ],
  },

  'ns-brain': {
    sections: [
      { type: 'heading', text: "The brain — command central." },
      {
        type: 'scene',
        sceneId: 'ns-brain',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Parts of the Brain' },
        caption: 'Each part has a job. Know which does what.',
        stepTexts: [
          null,
          'The cerebrum is the largest part. It controls voluntary actions, memory, intelligence, and interprets hearing and vision.',
          'The cerebellum sits at the back. It controls balance and coordination of voluntary movements.',
          'The medulla oblongata connects to the spinal cord. It controls involuntary actions: breathing, heart rate, blood pressure.',
          'The hypothalamus controls thermoregulation and osmoregulation (water balance).',
        ],
      },
      {
        type: 'concept',
        label: 'The corpus callosum',
        text: 'A thick band of nerve fibres that connects the left and right hemispheres of the cerebrum. It allows them to communicate.',
      },
      {
        type: 'concept',
        label: 'The hippocampus',
        text: 'Located deep inside the cerebrum. Plays a major role in learning ability and orientation. Damage here causes memory loss (like in Alzheimer\'s).',
      },
      {
        type: 'concept',
        label: 'Alzheimer\'s disease',
        text: 'Caused by degeneration of nerve tissue in the brain. Main symptom: worsening ability to remember new information. Regular exercise may reduce risk by maintaining hippocampus volume.',
      },
      {
        type: 'example',
        scenario: 'A learner suffers a brain injury during rugby. He can still breathe but loses balance and memory. Which parts were affected?',
        steps: [
          'He can breathe — so the medulla oblongata is fine.',
          'He lost balance — the cerebellum was affected.',
          'He lost memory — the cerebrum (specifically the hippocampus) was affected.',
        ],
        answer: 'The cerebellum (balance) and cerebrum/hippocampus (memory) were affected, but the medulla was not.',
        sceneId: 'ns-brain',
      },
    ],
  },

  // ================================================================
  // PAPER 1 — TOPIC 4: ENDOCRINE + THERMOREGULATION
  // ================================================================
  'endo-salt-water': {
    sections: [
      { type: 'heading', text: "Your body needs the right amount of salt and water." },
      {
        type: 'scene',
        sceneId: 'endo-salt-water',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Salt & Water Balance' },
        caption: 'Two glands. Two hormones. Two feedback loops.',
        stepTexts: [
          null,
          'Low salt: receptors in the kidney detect it. The adrenal glands secrete aldosterone. The kidney reabsorbs more salt.',
          'Low water: the hypothalamus detects it. The pituitary secretes ADH. The kidney reabsorbs more water.',
          'High water: less ADH is secreted. The kidney excretes more water as dilute urine.',
        ],
      },
      {
        type: 'concept',
        label: 'Aldosterone',
        text: 'Secreted by the adrenal glands. Target: the renal tubules in the kidney. Effect: increases salt reabsorption when salt levels are low.',
      },
      {
        type: 'concept',
        label: 'ADH (Antidiuretic hormone)',
        text: 'Secreted by the pituitary gland. Target: the renal tubules. Effect: increases water reabsorption when water levels are low.',
      },
      {
        type: 'concept',
        label: 'Negative feedback',
        text: 'When the correct level is reached, the gland stops secreting the hormone. This keeps levels stable.',
      },
      {
        type: 'example',
        scenario: 'A person is dehydrated after a long run. Explain how their body restores water balance.',
        steps: [
          'The hypothalamus detects low water levels.',
          'The pituitary gland secretes more ADH.',
          'ADH increases the permeability of the renal tubules.',
          'More water is reabsorbed from the filtrate.',
          'Water levels in the blood return to normal.',
        ],
        answer: 'The pituitary secretes more ADH, so the kidneys reabsorb more water.',
        sceneId: 'endo-salt-water',
      },
    ],
  },

  'endo-glucose-thyroxin': {
    sections: [
      { type: 'heading', text: "Two more feedback loops: blood glucose and metabolic rate." },
      {
        type: 'scene',
        sceneId: 'endo-glucose-thyroxin',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Glucose & Thyroxin' },
        caption: 'Pancreas controls sugar. Pituitary and thyroid control metabolism.',
        stepTexts: [
          null,
          'High blood glucose: the pancreas secretes insulin. The liver converts glucose to glycogen.',
          'Low blood glucose: the pancreas secretes glucagon. The liver converts glycogen back to glucose.',
          'Low thyroxin: the pituitary secretes more TSH, which stimulates the thyroid to produce more thyroxin.',
          'High thyroxin: the pituitary secretes less TSH. The thyroid slows down.',
        ],
      },
      {
        type: 'concept',
        label: 'Insulin vs glucagon',
        text: 'Insulin lowers blood glucose. Glucagon raises it. Both are secreted by the pancreas.',
      },
      {
        type: 'concept',
        label: 'Diabetes mellitus',
        text: 'The pancreas does not produce enough insulin, or cells do not respond to it. Blood glucose stays high. Treated with insulin injections.',
      },
      {
        type: 'concept',
        label: 'Thyroxin',
        text: 'Secreted by the thyroid gland. Controls the metabolic rate. Too little thyroxin → slow metabolism, weight gain. Goitre = enlarged thyroid due to iodine deficiency.',
      },
      {
        type: 'example',
        scenario: 'A person has low thyroxin. Trace the feedback loop that tries to fix it.',
        steps: [
          'The pituitary detects the low thyroxin level.',
          'It secretes more TSH (Thyroid Stimulating Hormone).',
          'TSH stimulates the thyroid gland.',
          'The thyroid secretes more thyroxin.',
          'Levels return to normal.',
        ],
        answer: 'Low thyroxin → pituitary secretes TSH → thyroid secretes more thyroxin.',
        sceneId: 'endo-glucose-thyroxin',
      },
    ],
  },

  'thermo-skin': {
    sections: [
      { type: 'heading', text: "Thermoregulation — keeping your body at 37°C." },
      {
        type: 'scene',
        sceneId: 'thermo-skin',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Thermoregulation' },
        caption: 'Too hot: sweat and vasodilation. Too cold: shiver and vasoconstriction.',
        stepTexts: [
          null,
          'Too hot: sweat glands produce sweat. Blood vessels dilate (vasodilation) so more heat is lost to the air.',
          'Too cold: shivering generates heat. Blood vessels constrict (vasoconstriction) so less heat is lost.',
          'The hypothalamus in the brain is the control centre for all of this.',
        ],
      },
      {
        type: 'concept',
        label: 'The skin',
        text: 'Sweat glands produce sweat for evaporative cooling. Blood capillaries dilate or constrict to control heat loss. Hair erector muscles raise hair for insulation.',
      },
      {
        type: 'concept',
        label: 'Vasodilation vs vasoconstriction',
        text: 'Vasodilation = blood vessels widen. More blood to the skin. More heat lost. Vasoconstriction = blood vessels narrow. Less blood to the skin. Heat conserved.',
      },
      {
        type: 'concept',
        label: 'Negative feedback',
        text: 'The hypothalamus detects the change, triggers the effectors, and stops when body temperature is back to normal.',
      },
      {
        type: 'example',
        scenario: 'A boy exercises hard for 45 minutes. His skin temperature drops from 37.4°C to 35.4°C. What happened?',
        steps: [
          'Blood vessels in the skin dilated (vasodilation).',
          'More blood flowed to the skin surface.',
          'Sweat glands produced more sweat.',
          'Sweat evaporated and removed heat from the skin.',
          'Skin temperature dropped.',
        ],
        answer: 'Vasodilation and increased sweating caused heat loss, lowering skin temperature.',
        sceneId: 'thermo-skin',
      },
    ],
  },

  // ================================================================
  // PAPER 1 — TOPIC 5: HUMAN REPRODUCTION
  // ================================================================
  'repro-male': {
    sections: [
      { type: 'heading', text: "Let's look at the male reproductive system." },
      {
        type: 'scene',
        sceneId: 'repro-male',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Male Reproduction' },
        caption: 'Sperm produced in testes. Stored in epididymis. Mixed with semen.',
        stepTexts: [
          null,
          'The testes produce sperm and testosterone. The scrotum keeps them cooler than body temperature.',
          'Sperm mature in the epididymis and are stored there until ejaculation.',
          'The seminal vesicles, prostate gland, and Cowper\'s gland add alkaline fluids to form semen.',
        ],
      },
      {
        type: 'concept',
        label: 'Spermatogenesis',
        text: 'Diploid cells in the seminiferous tubules of the testes undergo meiosis to form haploid sperm cells. Under the influence of testosterone.',
      },
      {
        type: 'concept',
        label: 'Sperm structure',
        text: 'Head with nucleus and acrosome (enzymes to penetrate the ovum). Middle piece with mitochondria (energy). Tail for swimming.',
      },
      {
        type: 'concept',
        label: 'Semen',
        text: 'Semen = sperm + fluids from the seminal vesicles, prostate gland, and Cowper\'s gland. The fluid is alkaline to neutralise vaginal acid.',
      },
      {
        type: 'example',
        scenario: 'A male has a blocked epididymis. Can he still reproduce?',
        steps: [
          'Sperm are produced in the testes.',
          'But they cannot mature or be stored.',
          'Without maturation, sperm cannot swim properly.',
          'So fertilisation would be unlikely.',
        ],
        answer: 'No — sperm would not mature, so they cannot fertilise an ovum.',
        sceneId: 'repro-male',
      },
    ],
  },

  'repro-female': {
    sections: [
      { type: 'heading', text: "Now the female reproductive system and the menstrual cycle." },
      {
        type: 'scene',
        sceneId: 'repro-female',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Female Reproduction' },
        caption: '28 days. Four hormones. One cycle.',
        stepTexts: [
          null,
          'Days 1-7: FSH stimulates a follicle to develop. Oestrogen rises.',
          'Days 8-14: Oestrogen peaks. LH surge triggers ovulation around day 14.',
          'Days 15-28: The corpus luteum forms and secretes progesterone. The endometrium thickens.',
          'No fertilisation: the corpus luteum degenerates, progesterone drops, the endometrium sheds — menstruation.',
        ],
      },
      {
        type: 'concept',
        label: 'Oogenesis',
        text: 'Diploid cells in the ovary undergo meiosis to form haploid ova. One mature ovum per cycle. FSH triggers it.',
      },
      {
        type: 'concept',
        label: 'The four hormones',
        text: 'FSH — follicle development. Oestrogen — endometrium thickening. LH — ovulation and corpus luteum. Progesterone — maintains the endometrium.',
      },
      {
        type: 'concept',
        label: 'If pregnancy occurs',
        text: 'The corpus luteum does not degenerate. Progesterone stays high. Later the placenta takes over progesterone production.',
      },
      {
        type: 'example',
        scenario: 'A female has a corpus luteum cyst that does not disappear. Why can she not fall pregnant?',
        steps: [
          'The corpus luteum keeps secreting progesterone.',
          'Progesterone inhibits the pituitary.',
          'FSH is not secreted, so no follicle develops.',
          'No ovulation takes place.',
        ],
        answer: 'No ovulation occurs, so no ovum is available for fertilisation.',
        sceneId: 'repro-female',
      },
    ],
  },

  'repro-embryonic': {
    sections: [
      { type: 'heading', text: "From fertilisation to implantation." },
      {
        type: 'scene',
        sceneId: 'repro-embryonic',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Embryonic Development' },
        caption: 'Fertilisation → cleavage → morula → blastocyst → implantation.',
        stepTexts: [
          null,
          'Fertilisation happens in the fallopian tube: sperm nucleus fuses with ovum nucleus = zygote.',
          'The zygote divides by mitosis to form a morula (solid ball of cells).',
          'The morula becomes a blastocyst (hollow ball with inner cell mass).',
          'The blastocyst implants in the endometrium of the uterus.',
        ],
      },
      {
        type: 'concept',
        label: 'Extra-embryonic membranes',
        text: 'Amnion — amniotic fluid for protection and temperature. Chorion — forms the placenta. Yolk sac — produces blood cells. Allantois — blood vessels.',
      },
      {
        type: 'concept',
        label: 'The placenta',
        text: 'A micro-filter between mother and foetus. Allows nutrients and oxygen in, waste out. Produces progesterone later in pregnancy.',
      },
      {
        type: 'concept',
        label: 'Umbilical cord',
        text: 'Connects the foetus to the placenta. Umbilical vein carries nutrients and oxygen TO the foetus. Umbilical arteries carry waste AWAY.',
      },
      {
        type: 'example',
        scenario: 'A sperm and ovum fuse in the fallopian tube. Describe what happens over the next week.',
        steps: [
          'Fertilisation forms a zygote.',
          'The zygote divides by mitosis into 2, 4, 8 cells.',
          'Forms a morula (solid ball).',
          'Becomes a blastocyst (hollow ball).',
          'Implants in the endometrium around day 6-7.',
        ],
        answer: 'Zygote → morula → blastocyst → implantation in the endometrium.',
        sceneId: 'repro-embryonic',
      },
    ],
  },

  // ================================================================
  // PAPER 1 — TOPIC 6: PLANT RESPONSES + REPRODUCTIVE STRATEGIES
  // ================================================================
  'repro-plant': {
    sections: [
      { type: 'heading', text: "Plants respond to light and gravity using hormones." },
      {
        type: 'scene',
        sceneId: 'repro-plant',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Plant Responses' },
        caption: 'Auxins move away from light. Stems bend towards it.',
        stepTexts: [
          null,
          'Phototropism: auxins move to the shaded side of the stem. Cells elongate there, so the stem bends towards light.',
          'Geotropism: auxins accumulate on the lower side of roots. Roots grow downwards.',
          'Apical dominance: the apical bud produces auxins that suppress the growth of lateral buds.',
        ],
      },
      {
        type: 'concept',
        label: 'The hormones',
        text: 'Auxins — cell elongation, phototropism, apical dominance. Gibberellins — stem elongation, seed germination. Abscisic acid — seed dormancy, closes stomata.',
      },
      {
        type: 'concept',
        label: 'The rules',
        text: 'Stems are negatively geotropic (grow away from gravity). Roots are positively geotropic (grow towards gravity). Stems are positively phototropic. Roots are negatively phototropic.',
      },
      {
        type: 'example',
        scenario: 'You remove the apical bud of a plant. What happens to the lateral branches?',
        steps: [
          'The apical bud normally produces auxins.',
          'These auxins suppress lateral bud growth.',
          'Without the apical bud, auxin levels drop.',
          'Lateral buds are no longer inhibited.',
          'They grow into lateral branches.',
        ],
        answer: 'Lateral branches grow because the auxin source (apical bud) is removed.',
        sceneId: 'repro-plant',
      },
    ],
  },

  'repro-strategies': {
    sections: [
      { type: 'heading', text: "How different animals bring their young into the world." },
      {
        type: 'scene',
        sceneId: 'repro-strategies',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Reproductive Strategies' },
        caption: 'Three strategies. Two kinds of young.',
        stepTexts: [
          null,
          'Ovipary: eggs are laid and develop outside the mother. Examples: birds, reptiles, frogs.',
          'Vivipary: young develop inside the mother and receive nutrients via the placenta. Examples: most mammals.',
          'Ovovivipary: eggs hatch inside the mother, then young are born live. Examples: some sharks, some snakes.',
        ],
      },
      {
        type: 'concept',
        label: 'Fertilisation',
        text: 'Internal fertilisation: gametes fuse inside the female body. External fertilisation: gametes fuse outside the body (frogs, fish).',
      },
      {
        type: 'concept',
        label: 'Precocial vs altricial',
        text: 'Precocial: young are well-developed at hatching (ducks, geese). Altricial: young are helpless and need parental care (eagles, vultures, pigeons).',
      },
      {
        type: 'concept',
        label: 'Yolk and development',
        text: 'A high yolk percentage means more energy for the embryo, so the young hatch well-developed (precocial). A low yolk percentage means the young hatch helpless (altricial).',
      },
      {
        type: 'example',
        scenario: 'A duck lays eggs with 35% yolk. Is it precocial or altricial?',
        steps: [
          'High yolk percentage = more energy for the embryo.',
          'More energy = more developed at hatching.',
          'Well-developed young = precocial.',
        ],
        answer: 'Precocial — high yolk gives the embryo more energy to develop fully.',
        sceneId: 'repro-strategies',
      },
    ],
  },

  
  // ================================================================
  // PAPER 2 — TOPIC 7: DNA & RNA
  // ================================================================
  'dna-structure-replication': {
    sections: [
      { type: 'heading', text: "Every cell in your body carries DNA. Let's look at its structure." },
      {
        type: 'scene',
        sceneId: 'dna-structure-replication',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'DNA Structure & Replication' },
        caption: 'A twisted ladder. Unzips to copy itself.',
        stepTexts: [
          null,
          'DNA is a double helix — two strands twisted like a spiral staircase.',
          'Each strand is made of nucleotides. Each nucleotide has a sugar (deoxyribose), a phosphate, and a nitrogenous base.',
          'The bases pair up: A with T, and C with G. They are held together by weak hydrogen bonds.',
          'During replication, the double helix unwinds and unzips. Each strand becomes a template for a new complementary strand.',
        ],
      },
      {
        type: 'concept',
        label: 'The bases',
        text: 'Adenine (A) always pairs with Thymine (T). Cytosine (C) always pairs with Guanine (G). This is called complementary base pairing.',
      },
      {
        type: 'concept',
        label: 'DNA replication',
        text: 'The double helix unwinds and unzips. Hydrogen bonds break. Free nucleotides in the nucleoplasm pair with each template strand. Two identical DNA molecules are formed. Happens during interphase.',
      },
      {
        type: 'concept',
        label: 'Why replication matters',
        text: 'Before a cell divides, it must copy its DNA so each daughter cell gets a complete set. Without replication, cells would lose genetic information.',
      },
      {
        type: 'example',
        scenario: 'A DNA strand has the sequence A-T-G-C-C-A. What is the complementary strand?',
        steps: [
          'A pairs with T.',
          'T pairs with A.',
          'G pairs with C.',
          'C pairs with G.',
          'C pairs with G.',
          'A pairs with T.',
        ],
        answer: 'T-A-C-G-G-T',
        sceneId: 'dna-structure-replication',
      },
    ],
  },

  'protein-synthesis': {
    sections: [
      { type: 'heading', text: "DNA tells the cell how to build proteins. Here's how." },
      {
        type: 'scene',
        sceneId: 'protein-synthesis',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Protein Synthesis' },
        caption: 'Transcription in the nucleus. Translation at the ribosome.',
        stepTexts: [
          null,
          'Transcription: DNA unwinds and unzips. One strand is used as a template to make mRNA. This happens in the nucleus.',
          'The mRNA leaves the nucleus and travels to a ribosome in the cytoplasm.',
          'Translation: the ribosome reads the mRNA codons. tRNA brings matching amino acids.',
          'The amino acids join together with peptide bonds to form a protein.',
        ],
      },
      {
        type: 'concept',
        label: 'Transcription',
        text: 'DNA → mRNA. Uses one DNA strand as a template. The mRNA is complementary to the DNA. A pairs with U (uracil) instead of T. Happens in the nucleus.',
      },
      {
        type: 'concept',
        label: 'Translation',
        text: 'mRNA → protein. The ribosome reads codons (groups of 3 bases). tRNA brings matching amino acids. The amino acids are joined by peptide bonds to form a protein.',
      },
      {
        type: 'concept',
        label: 'The triplet code',
        text: 'Every 3 bases on mRNA (a codon) codes for one amino acid. The genetic code is universal — the same codon codes for the same amino acid in almost all organisms.',
      },
      {
        type: 'example',
        scenario: 'mRNA has the sequence A-G-A-U-A-C. Using the codon table, what amino acids are coded for?',
        steps: [
          'AGA codes for Arginine.',
          'UAC codes for Tyrosine.',
          'So the amino acid sequence is Arginine → Tyrosine.',
        ],
        answer: 'Arginine and Tyrosine.',
        sceneId: 'protein-synthesis',
      },
    ],
  },

  'mutation': {
    sections: [
      { type: 'heading', text: "Sometimes the DNA message gets corrupted. That's a mutation." },
      {
        type: 'scene',
        sceneId: 'mutation',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Gene Mutations' },
        caption: 'One base changes. The protein changes. The trait changes.',
        stepTexts: [
          null,
          'A gene mutation is a change in the sequence of nitrogenous bases in DNA.',
          'If one base is swapped for another, the codon changes, so a different amino acid is inserted into the protein.',
          'A different protein means a different trait — sometimes harmless, sometimes harmful, sometimes beneficial.',
        ],
      },
      {
        type: 'concept',
        label: 'What causes mutations',
        text: 'Radiation (X-rays, UV), chemicals (mutagens), or random errors during replication. Mutations can be inherited if they occur in gametes.',
      },
      {
        type: 'concept',
        label: 'Example: VKORC1 mutation',
        text: 'A gene codes for a blood-clotting factor. One base change (CTG → CAG) swaps one amino acid. This causes resistance to Warfarin, a blood-thinning drug. Harmful for patients with thrombosis.',
      },
      {
        type: 'concept',
        label: 'Down syndrome',
        text: 'Caused by non-disjunction during meiosis — an extra copy of chromosome 21. This is a chromosomal mutation, not a gene mutation.',
      },
      {
        type: 'example',
        scenario: 'A codon changes from GAC (Leu) to GUC (Gln). Is this harmful?',
        steps: [
          'The amino acid sequence changes.',
          'The protein folds differently.',
          'The protein may not function properly.',
        ],
        answer: 'Likely harmful — the protein structure changes, which affects its function.',
        sceneId: 'mutation',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — TOPIC 8: MEIOSIS
  // ================================================================
  'meiosis-phases-crossing-over': {
    sections: [
      { type: 'heading', text: "Meiosis makes gametes — with half the chromosomes." },
      {
        type: 'scene',
        sceneId: 'meiosis-phases-crossing-over',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Meiosis & Crossing Over' },
        caption: 'Two divisions. Four haploid cells. Genetic variation.',
        stepTexts: [
          null,
          'Meiosis I: homologous chromosomes pair up. Crossing over happens in Prophase I.',
          'Metaphase I: pairs line up at the equator. Anaphase I: pairs separate.',
          'Meiosis II: the two cells divide again. Chromatids separate in Anaphase II.',
          'Result: four haploid daughter cells, each genetically different.',
        ],
      },
      {
        type: 'concept',
        label: 'Crossing over',
        text: 'Homologous chromosomes pair up and exchange segments at points called chiasmata. This creates new combinations of alleles. It happens in Prophase I.',
      },
      {
        type: 'concept',
        label: 'Meiosis vs mitosis',
        text: 'Mitosis: one division, two identical diploid cells. Meiosis: two divisions, four different haploid cells.',
      },
      {
        type: 'concept',
        label: 'The significance of meiosis',
        text: 'It halves the chromosome number (so fertilisation restores it). It creates genetic variation through crossing over and independent assortment.',
      },
      {
        type: 'example',
        scenario: 'Why does meiosis produce genetically different cells?',
        steps: [
          'Crossing over exchanges segments between homologous chromosomes.',
          'Independent assortment randomly arranges chromosomes at the equator.',
          'Random fertilisation adds another layer of variation.',
        ],
        answer: 'Crossing over and independent assortment produce new combinations of alleles in each gamete.',
        sceneId: 'meiosis-phases-crossing-over',
      },
    ],
  },

  'meiosis-non-disjunction': {
    sections: [
      { type: 'heading', text: "When chromosomes fail to separate, things go wrong." },
      {
        type: 'scene',
        sceneId: 'meiosis-non-disjunction',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Non-Disjunction' },
        caption: 'Chromosomes stuck together. Gametes with extra or missing chromosomes.',
        stepTexts: [
          null,
          'Non-disjunction happens when homologous chromosomes or sister chromatids fail to separate during meiosis.',
          'The result: gametes with an extra chromosome or a missing chromosome.',
          'If such a gamete is fertilised, the zygote will have an abnormal chromosome number.',
        ],
      },
      {
        type: 'concept',
        label: 'Down syndrome',
        text: 'Caused by non-disjunction of chromosome 21. The zygote has three copies of chromosome 21 (trisomy 21). Symptoms: intellectual disability, distinctive facial features, heart defects.',
      },
      {
        type: 'concept',
        label: 'Turner and Klinefelter syndromes',
        text: 'Non-disjunction of sex chromosomes can cause Turner syndrome (XO — one X) or Klinefelter syndrome (XXY — two X and one Y).',
      },
      {
        type: 'example',
        scenario: 'A gamete has 24 chromosomes instead of 23. What happened?',
        steps: [
          'Non-disjunction occurred during meiosis.',
          'Both chromosomes of a pair went into one gamete.',
          'The other gamete got zero from that pair.',
        ],
        answer: 'Non-disjunction — a pair failed to separate, so one gamete got an extra chromosome.',
        sceneId: 'meiosis-non-disjunction',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — TOPIC 9: GENETICS
  // ================================================================
  'gen-monohybrid-dihybrid': {
    sections: [
      { type: 'heading', text: "Genetics — how traits pass from parents to children." },
      {
        type: 'scene',
        sceneId: 'gen-monohybrid-dihybrid',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Monohybrid & Dihybrid Crosses' },
        caption: 'One gene or two genes? Punnett squares tell the story.',
        stepTexts: [
          null,
          'Monohybrid cross: one gene is tracked. Example: Rr × Rr produces a 3:1 phenotypic ratio.',
          'Dihybrid cross: two genes are tracked. Example: RrYy × RrYy produces a 9:3:3:1 ratio.',
          'The Punnett square shows all possible combinations of alleles in the offspring.',
        ],
      },
      {
        type: 'concept',
        label: 'Key terms',
        text: 'Allele — different forms of a gene. Dominant — expressed even if only one copy. Recessive — only expressed with two copies. Homozygous — two identical alleles. Heterozygous — two different alleles.',
      },
      {
        type: 'concept',
        label: 'Setting up a cross',
        text: 'Write the phenotypes, then genotypes of P1. Write the gametes. Draw the Punnett square. Give the F1 genotypes, then phenotypes. State the ratio.',
      },
      {
        type: 'example',
        scenario: 'Two heterozygous tall plants (Tt) are crossed. What is the expected ratio?',
        steps: [
          'P1: Tt × Tt.',
          'Gametes: T and t from each parent.',
          'Punnett square: TT, Tt, Tt, tt.',
          '3 tall : 1 short.',
        ],
        answer: '3 tall : 1 short (75% tall, 25% short).',
        sceneId: 'gen-monohybrid-dihybrid',
      },
    ],
  },

  'gen-blood-groups': {
    sections: [
      { type: 'heading', text: "Blood groups are a classic example of multiple alleles." },
      {
        type: 'scene',
        sceneId: 'gen-blood-groups',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Blood Groups' },
        caption: 'Three alleles. Four phenotypes.',
        stepTexts: [
          null,
          'There are three alleles: I^A, I^B, and i. Each person has only two of them.',
          'I^A and I^B are codominant — both are expressed if present. i is recessive.',
          'Genotypes: I^A I^A or I^A i = A. I^B I^B or I^B i = B. I^A I^B = AB. i i = O.',
        ],
      },
      {
        type: 'concept',
        label: 'Codominance',
        text: 'Both alleles are expressed equally in the phenotype. That is why AB blood has both A and B antigens.',
      },
      {
        type: 'concept',
        label: 'Multiple alleles',
        text: 'A gene with more than two possible alleles in the population. Each individual still only has two.',
      },
      {
        type: 'example',
        scenario: 'A man with blood group A and a woman with blood group AB have a child with blood group B. How?',
        steps: [
          'The man must be heterozygous: I^A i.',
          'The woman is I^A I^B.',
          'The child inherits I^B from the mother.',
          'And i from the father.',
          'So the child is I^B i = blood group B.',
        ],
        answer: 'The father is I^A i and the mother is I^A I^B, so the child can be I^B i.',
        sceneId: 'gen-blood-groups',
      },
    ],
  },

  'gen-sex-linked': {
    sections: [
      { type: 'heading', text: "Some traits are carried on the sex chromosomes." },
      {
        type: 'scene',
        sceneId: 'gen-sex-linked',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Sex-Linked Inheritance' },
        caption: 'X-linked disorders affect males more than females.',
        stepTexts: [
          null,
          'Females have XX. Males have XY. Some genes are carried only on the X chromosome.',
          'A male has only one X, so a single recessive allele on it will be expressed.',
          'A female has two X chromosomes, so she needs two recessive alleles to express the trait.',
        ],
      },
      {
        type: 'concept',
        label: 'Examples',
        text: 'Haemophilia — blood does not clot properly. Colour-blindness — cannot distinguish red and green. Muscular dystrophy — muscles weaken over time. All X-linked recessive.',
      },
      {
        type: 'concept',
        label: 'Why males are more affected',
        text: 'Males have only one X chromosome. If it carries the recessive allele, there is no second X to mask it. So males express the disorder with just one copy.',
      },
      {
        type: 'example',
        scenario: 'A carrier mother (X^D X^d) and a normal father (X^D Y) have children. What is the chance of a colour-blind son?',
        steps: [
          'Mother\'s gametes: X^D and X^d.',
          'Father\'s gametes: X^D and Y.',
          'Sons get Y from father. They get X from mother.',
          'Sons can be X^D Y (normal) or X^d Y (colour-blind).',
          'So 50% of sons are colour-blind.',
        ],
        answer: '50% of sons will be colour-blind.',
        sceneId: 'gen-sex-linked',
      },
    ],
  },

  'gen-pedigrees-incomplete': {
    sections: [
      { type: 'heading', text: "Pedigrees show how traits run through families. And some traits blend." },
      {
        type: 'scene',
        sceneId: 'gen-pedigrees-incomplete',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Pedigrees & Incomplete Dominance' },
        caption: 'Family trees show inheritance. Sometimes two traits blend.',
        stepTexts: [
          null,
          'A pedigree diagram uses symbols: squares for males, circles for females, shaded for affected.',
          'By tracing the pattern, you can work out genotypes of family members.',
          'Incomplete dominance: neither allele is fully dominant. The heterozygote shows a blend of both traits.',
        ],
      },
      {
        type: 'concept',
        label: 'Reading a pedigree',
        text: 'Unaffected parents with an affected child = both parents are carriers (heterozygous for a recessive disorder). Affected parents with unaffected children = the disorder is dominant.',
      },
      {
        type: 'concept',
        label: 'Incomplete dominance',
        text: 'A red flower crossed with a white flower produces pink flowers. Neither allele is dominant — the phenotype is intermediate. Example: palomino horses (cream × chestnut = golden).',
      },
      {
        type: 'example',
        scenario: 'Two pink flowers (RW × RW) are crossed. What ratio of colours appears?',
        steps: [
          'Gametes: R and W from each parent.',
          'Punnett: RR, RW, RW, WW.',
          'RR = red. RW = pink. WW = white.',
        ],
        answer: '1 red : 2 pink : 1 white.',
        sceneId: 'gen-pedigrees-incomplete',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — TOPIC 10: EVOLUTION
  // ================================================================
  'evo-natural-selection-speciation': {
    sections: [
      { type: 'heading', text: "Darwin's big idea: natural selection." },
      {
        type: 'scene',
        sceneId: 'evo-natural-selection-speciation',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Natural Selection & Speciation' },
        caption: 'Variation. Selection. Reproduction. New species.',
        stepTexts: [
          null,
          'There is variation in every population. Some individuals have favourable characteristics, others do not.',
          'When the environment changes, individuals with favourable characteristics survive. The others die.',
          'The survivors reproduce and pass on their alleles to their offspring.',
          'Over many generations, the population changes. Eventually it may become a new species.',
        ],
      },
      {
        type: 'concept',
        label: "Darwin's theory",
        text: 'Variation → competition → survival of the fittest → reproduction → inheritance of favourable alleles → change in population over time.',
      },
      {
        type: 'concept',
        label: 'Speciation',
        text: 'When a population is separated (by a river, mountain, or ocean), the two groups face different conditions. Natural selection acts differently on each. Eventually they can no longer interbreed — they are different species.',
      },
      {
        type: 'concept',
        label: 'Reproductive isolation',
        text: 'Species-specific courtship behaviour, breeding at different times, or infertile offspring prevent interbreeding.',
      },
      {
        type: 'example',
        scenario: 'Wolves in Chernobyl have a mutation that makes them immune to cancer. Explain how this spread.',
        steps: [
          'There was variation in the wolf population.',
          'Some had the immunity mutation, others did not.',
          'Radiation killed wolves without the mutation.',
          'Those with the mutation survived and reproduced.',
          'Their offspring inherited the immunity allele.',
          'The next generation had more immune wolves.',
        ],
        answer: 'Natural selection favoured wolves with the immunity mutation — they survived and passed it on.',
        sceneId: 'evo-natural-selection-speciation',
      },
    ],
  },

  'evo-artificial-selection': {
    sections: [
      { type: 'heading', text: "Humans do natural selection too — but faster." },
      {
        type: 'scene',
        sceneId: 'evo-artificial-selection',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Artificial Selection' },
        caption: 'Pick the best. Breed them. Repeat.',
        stepTexts: [
          null,
          'Farmers select organisms with desirable characteristics.',
          'They breed only those individuals.',
          'Over many generations, the desirable trait becomes more common.',
        ],
      },
      {
        type: 'concept',
        label: 'Artificial vs natural',
        text: 'Artificial selection: humans choose which organisms breed. Natural selection: the environment determines who survives and breeds.',
      },
      {
        type: 'concept',
        label: 'Examples',
        text: 'Mealie plants with high protein content. Dairy cows with high milk yield. Dogs bred for specific traits. Palomino horses.',
      },
      {
        type: 'example',
        scenario: 'A farmer wants mealie plants with higher protein. How would he do it?',
        steps: [
          'Select plants with the highest protein content.',
          'Breed only those plants together.',
          'Select the offspring with the highest protein.',
          'Repeat over many generations.',
        ],
        answer: 'He interbreeds only high-protein plants over many generations.',
        sceneId: 'evo-artificial-selection',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — TOPIC 11: EVOLUTION EVIDENCE
  // ================================================================
  'evo-fossils-biogeography': {
    sections: [
      { type: 'heading', text: "How do we know evolution happened? Fossils and geography." },
      {
        type: 'scene',
        sceneId: 'evo-fossils-biogeography',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Fossils & Biogeography' },
        caption: 'Old rocks. Old bones. Old maps.',
        stepTexts: [
          null,
          'Fossils: remains of organisms preserved in rock. The oldest fossils are simple. The youngest are complex.',
          'They show a sequence of change over millions of years.',
          'Biogeography: the distribution of species across the world. Species on separated continents are similar because they share a common ancestor.',
        ],
      },
      {
        type: 'concept',
        label: 'Fossil evidence',
        text: 'Fossils of hominids show a gradual change in brain size, jaw shape, and bipedalism. Fossils of horses, whales, and elephants show clear evolutionary sequences.',
      },
      {
        type: 'concept',
        label: 'Biogeography',
        text: 'Ratites (ostrich, rhea, emu) live on different continents but are similar because their ancestors lived on Gondwana before it split. Continental drift separated them, and they evolved independently.',
      },
      {
        type: 'example',
        scenario: 'How do ratites on different continents support evolution?',
        steps: [
          'They share a common ancestor.',
          'Gondwana split into continents.',
          'The populations were separated.',
          'They faced different conditions.',
          'Natural selection acted differently on each.',
          'They became different species.',
        ],
        answer: 'Continental drift separated a common ancestor population, and natural selection produced different species on each continent.',
        sceneId: 'evo-fossils-biogeography',
      },
    ],
  },

  'evo-genetic-out-of-africa': {
    sections: [
      { type: 'heading', text: "DNA tells us where we came from." },
      {
        type: 'scene',
        sceneId: 'evo-genetic-out-of-africa',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Genetic Evidence & Out-of-Africa' },
        caption: 'Mitochondrial DNA traces female ancestry back to Africa.',
        stepTexts: [
          null,
          'Mitochondrial DNA (mtDNA) is inherited only from the mother. It mutates slowly over time.',
          'By comparing mtDNA, scientists can trace all modern humans back to a common female ancestor in Africa.',
          'Genetic evidence supports the Out-of-Africa hypothesis.',
        ],
      },
      {
        type: 'concept',
        label: 'DNA profiling',
        text: 'Compares DNA samples to identify individuals or family relationships. Used in forensics and paternity testing.',
      },
      {
        type: 'concept',
        label: 'Out-of-Africa',
        text: 'Homo erectus and later Homo sapiens originated in Africa and migrated to other continents. The oldest fossils are found in Africa, and younger fossils are found outside.',
      },
      {
        type: 'example',
        scenario: 'How do fossils support the Out-of-Africa hypothesis?',
        steps: [
          'Oldest H. erectus fossils are in Africa.',
          'Younger H. erectus fossils are in Asia and Europe.',
          'This shows H. erectus migrated out of Africa.',
          'Same pattern for H. sapiens.',
        ],
        answer: 'Oldest fossils in Africa, younger ones outside — evidence of migration out of Africa.',
        sceneId: 'evo-genetic-out-of-africa',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — TOPIC 12: HUMAN EVOLUTION
  // ================================================================
  'hominid-bipedalism-brain-tools': {
    sections: [
      { type: 'heading', text: "What makes us human? Walking upright, big brains, and tools." },
      {
        type: 'scene',
        sceneId: 'hominid-bipedalism-brain-tools',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Human Evolution' },
        caption: 'Bipedalism. Bigger brains. Better tools.',
        stepTexts: [
          null,
          'Bipedalism: walking on two legs. The foramen magnum moves forward, the spine becomes S-shaped, and the pelvis becomes short and wide.',
          'Brain size increases: from 350 ml (Ardipithecus) to 1330 ml (Homo sapiens).',
          'Tools get more complex: from simple scrapers to arrows, fishing tools, and fire.',
          'Jaws get smaller, teeth get smaller, and the face becomes flatter (less prognathous).',
        ],
      },
      {
        type: 'concept',
        label: 'Bipedalism features',
        text: 'Foramen magnum forward (spine attaches below the skull). S-shaped spine (shock absorption). Short wide pelvis (supports weight). Longer legs, shorter arms.',
      },
      {
        type: 'concept',
        label: 'Hominid timeline',
        text: 'Ardipithecus ramidus → Australopithecus africanus (Mrs Ples, Taung Child) → Homo habilis (handyman, first tools) → Homo erectus (fire, migrated out of Africa) → Homo neanderthalensis → Homo sapiens.',
      },
      {
        type: 'concept',
        label: 'Brain and tools',
        text: 'As brain size increased, so did the complexity of tools. H. habilis used simple scrapers. H. erectus used hand axes. H. sapiens used complex arrows, fishing tools, and fire.',
      },
      {
        type: 'example',
        scenario: 'A fossil has an S-shaped spine, a short wide pelvis, and a forward foramen magnum. What does this tell you?',
        steps: [
          'S-shaped spine absorbs shock when walking.',
          'Short wide pelvis supports upper body weight.',
          'Forward foramen magnum means the head sits on top of the spine.',
          'All of these indicate bipedalism.',
        ],
        answer: 'The fossil belonged to a bipedal hominid.',
        sceneId: 'hominid-bipedalism-brain-tools',
      },
    ],
  },
};

// ================================================================
// AUTO SCRIPTS — fact-dense, for exam-prep Auto mode
// ================================================================
export const LIFESCIENCES_AUTO_SCRIPTS = {
  // -------- P1 --------
  'eye-pupillary': {
    title: 'The Pupillary Mechanism',
    sentences: [
      'The iris controls the size of the pupil.',
      'Bright light: circular muscles contract, radial muscles relax.',
      'The pupil constricts to protect the retina.',
      'Dim light: radial muscles contract, circular muscles relax.',
      'The pupil dilates to let in more light.',
      'This is a reflex action — rapid and involuntary.',
      'The retina detects the light intensity.',
      'Impulses travel via the optic nerve to the brain.',
      'The brain sends impulses back to the iris muscles.',
    ],
  },
  'eye-accommodation-defects': {
    title: 'Accommodation and Eye Defects',
    sentences: [
      'The lens changes shape to focus on near and far objects.',
      'Distant vision: ciliary muscles relax, ligaments taut, lens less convex.',
      'Near vision: ciliary muscles contract, ligaments slack, lens more convex.',
      'Myopia: eyeball too long, image in front of retina.',
      'Myopia is corrected with concave lenses.',
      'Hyperopia: eyeball too short, image behind retina.',
      'Hyperopia is corrected with convex lenses.',
      'Cataracts: cloudy lens, corrected by surgery.',
      'Astigmatism: uneven cornea, corrected with special lenses.',
    ],
  },
  'ear-hearing-balance': {
    title: 'The Human Ear',
    sentences: [
      'The pinna catches sound waves.',
      'The auditory canal directs sound to the tympanic membrane.',
      'The ossicles (hammer, anvil, stirrup) amplify vibrations.',
      'The oval window passes vibrations to the cochlea.',
      'The organ of Corti contains hair cells.',
      'Hair cells convert vibrations into nerve impulses.',
      'The auditory nerve carries impulses to the cerebrum.',
      'The semi-circular canals contain cristae for balance.',
      'Balance impulses go to the cerebellum.',
      'The Eustachian tube equalises pressure.',
      'Noise-induced hearing loss damages hair cells permanently.',
    ],
  },
  'ns-neurons': {
    title: 'Neurons',
    sentences: [
      'Sensory neurons carry impulses from receptors to the CNS.',
      'Motor neurons carry impulses from the CNS to effectors.',
      'Interneurons connect sensory and motor neurons.',
      'Dendrites receive impulses.',
      'The axon transmits impulses away.',
      'The myelin sheath insulates the axon.',
      'Myelin speeds up impulse transmission.',
      'Larger axon diameter also speeds up transmission.',
      'Multiple sclerosis is caused by myelin degeneration.',
    ],
  },
  'ns-reflex-arc': {
    title: 'The Reflex Arc',
    sentences: [
      'A reflex action is rapid and involuntary.',
      'The pathway is: receptor → sensory → interneuron → motor → effector.',
      'Sensory neurons enter the spinal cord via the dorsal root.',
      'Motor neurons exit via the ventral root.',
      'The synapse is the gap between two neurons.',
      'Neurotransmitters carry the impulse across the synapse.',
      'The synapse ensures one-way transmission.',
      'The knee-jerk reflex has only one synapse.',
    ],
  },
  'ns-brain': {
    title: 'The Brain',
    sentences: [
      'The cerebrum controls voluntary actions.',
      'The cerebrum is also responsible for memory, intelligence, and interpreting senses.',
      'The cerebellum controls balance and coordination.',
      'The medulla oblongata controls breathing, heart rate, and blood pressure.',
      'The hypothalamus controls thermoregulation and osmoregulation.',
      'The corpus callosum connects the two hemispheres.',
      'The hippocampus is in the cerebrum and controls learning and orientation.',
      "Alzheimer's is caused by degeneration of nerve tissue.",
      'Multiple sclerosis is caused by myelin degeneration.',
    ],
  },
  'endo-salt-water': {
    title: 'Salt and Water Balance',
    sentences: [
      'Aldosterone regulates salt balance.',
      'Aldosterone is secreted by the adrenal glands.',
      'It increases salt reabsorption in the kidney tubules.',
      'ADH regulates water balance.',
      'ADH is secreted by the pituitary gland.',
      'It increases water reabsorption in the kidney tubules.',
      'Low water: more ADH, less urine.',
      'High water: less ADH, more dilute urine.',
      'Both are examples of negative feedback.',
    ],
  },
  'endo-glucose-thyroxin': {
    title: 'Glucose and Thyroxin',
    sentences: [
      'Insulin lowers blood glucose.',
      'Insulin is secreted by the pancreas.',
      'It converts glucose to glycogen in the liver.',
      'Glucagon raises blood glucose.',
      'It converts glycogen back to glucose.',
      'Thyroxin controls the metabolic rate.',
      'Thyroxin is secreted by the thyroid gland.',
      'TSH from the pituitary stimulates the thyroid.',
      'Low thyroxin: more TSH is secreted.',
      'High thyroxin: less TSH is secreted.',
      'Goitre is caused by iodine deficiency.',
    ],
  },
  'thermo-skin': {
    title: 'Thermoregulation',
    sentences: [
      'Thermoregulation keeps body temperature at 37°C.',
      'The hypothalamus is the control centre.',
      'Too hot: sweat glands produce sweat.',
      'Sweat evaporates and removes heat.',
      'Too hot: blood vessels dilate (vasodilation).',
      'More blood flows to the skin, so more heat is lost.',
      'Too cold: blood vessels constrict (vasoconstriction).',
      'Less blood flows to the skin, conserving heat.',
      'Too cold: shivering generates heat.',
      'Hair erector muscles raise hair for insulation.',
    ],
  },
  'repro-male': {
    title: 'Male Reproduction',
    sentences: [
      'The testes produce sperm and testosterone.',
      'The scrotum keeps the testes cooler than body temperature.',
      'Sperm mature in the epididymis.',
      'The vas deferens carries sperm to the urethra.',
      'The seminal vesicles, prostate, and Cowper\'s gland add fluid.',
      'Semen = sperm + glandular fluid.',
      'Seminal fluid is alkaline to neutralise vaginal acid.',
      'Spermatogenesis = meiosis in the seminiferous tubules.',
      'The sperm head contains the nucleus and acrosome.',
      'The middle piece has mitochondria for energy.',
      'The tail enables swimming.',
    ],
  },
  'repro-female': {
    title: 'Female Reproduction',
    sentences: [
      'The ovaries produce ova, oestrogen, and progesterone.',
      'Fertilisation occurs in the fallopian tube.',
      'Implantation occurs in the uterus.',
      'FSH stimulates follicle development.',
      'Oestrogen thickens the endometrium.',
      'LH surge triggers ovulation around day 14.',
      'The corpus luteum forms after ovulation.',
      'Progesterone maintains the endometrium.',
      'No fertilisation: corpus luteum degenerates, menstruation occurs.',
      'Fertilisation: corpus luteum persists, progesterone stays high.',
      'Oogenesis = meiosis in the ovary, one mature ovum per cycle.',
    ],
  },
  'repro-embryonic': {
    title: 'Embryonic Development',
    sentences: [
      'Fertilisation occurs in the fallopian tube.',
      'Sperm nucleus + ovum nucleus = zygote.',
      'The zygote divides by mitosis.',
      'Zygote → morula → blastocyst.',
      'The morula is a solid ball of cells.',
      'The blastocyst is a hollow ball with inner cell mass.',
      'Implantation occurs in the endometrium.',
      'Amnion: amniotic fluid for protection.',
      'Chorion: forms the placenta.',
      'Yolk sac: produces blood cells.',
      'Allantois: blood vessels of the umbilical cord.',
      'Placenta: micro-filter for nutrients, oxygen, and waste.',
      'Umbilical vein carries nutrients to the foetus.',
      'Umbilical arteries carry waste away.',
    ],
  },
  'repro-plant': {
    title: 'Plant Responses',
    sentences: [
      'Auxins cause cell elongation.',
      'Phototropism: stems bend towards light.',
      'Auxins move to the shaded side of the stem.',
      'Cells on the shaded side elongate more.',
      'The stem bends towards the light.',
      'Geotropism: roots grow downwards.',
      'Auxins accumulate on the lower side of the root.',
      'Apical dominance: the apical bud suppresses lateral buds.',
      'Removing the apical bud releases lateral buds.',
      'Gibberellins promote stem elongation and seed germination.',
      'Abscisic acid causes seed dormancy and closes stomata.',
    ],
  },
  'repro-strategies': {
    title: 'Reproductive Strategies',
    sentences: [
      'Ovipary: eggs are laid and develop outside the mother.',
      'Examples: birds, reptiles, frogs.',
      'Vivipary: young develop inside the mother via the placenta.',
      'Examples: most mammals.',
      'Ovovivipary: eggs hatch inside the mother.',
      'Examples: some sharks and snakes.',
      'Precocial: young are well-developed at hatching.',
      'Altricial: young are helpless and need parental care.',
      'Internal fertilisation: gametes fuse inside the female body.',
      'External fertilisation: gametes fuse outside the body.',
      'High yolk percentage = more energy for the embryo.',
    ],
  },

  // -------- P2 --------
  'dna-structure-replication': {
    title: 'DNA Structure & Replication',
    sentences: [
      'DNA is a double helix.',
      'It is made of nucleotides.',
      'Each nucleotide has a sugar, a phosphate, and a nitrogenous base.',
      'The sugar is deoxyribose.',
      'Bases pair: A with T, C with G.',
      'Hydrogen bonds hold the bases together.',
      'Replication happens during interphase.',
      'The double helix unwinds and unzips.',
      'Each strand is a template for a new strand.',
      'Two identical DNA molecules are formed.',
    ],
  },
  'protein-synthesis': {
    title: 'Protein Synthesis',
    sentences: [
      'Transcription happens in the nucleus.',
      'DNA unwinds and unzips.',
      'One strand is a template for mRNA.',
      'mRNA is complementary to DNA. A pairs with U.',
      'mRNA leaves the nucleus and goes to a ribosome.',
      'Translation happens at the ribosome.',
      'The ribosome reads mRNA codons (3 bases each).',
      'tRNA brings matching amino acids.',
      'Amino acids join by peptide bonds.',
      'The result is a protein.',
    ],
  },
  'mutation': {
    title: 'Gene Mutations',
    sentences: [
      'A mutation is a change in the DNA base sequence.',
      'It can be caused by radiation, chemicals, or replication errors.',
      'A codon change may produce a different amino acid.',
      'This changes the protein structure and function.',
      'Mutations in gametes can be inherited.',
      'The VKORC1 mutation causes Warfarin resistance.',
      'Down syndrome is a chromosomal mutation (trisomy 21).',
      'Non-disjunction causes an extra chromosome.',
    ],
  },
  'meiosis-phases-crossing-over': {
    title: 'Meiosis & Crossing Over',
    sentences: [
      'Meiosis has two divisions.',
      'Meiosis I: homologous pairs separate.',
      'Prophase I: crossing over occurs at chiasmata.',
      'Metaphase I: pairs line up at the equator.',
      'Anaphase I: pairs separate.',
      'Meiosis II: chromatids separate.',
      'Result: four haploid cells.',
      'Each cell is genetically different.',
      'Crossing over increases genetic variation.',
      'Independent assortment also increases variation.',
    ],
  },
  'meiosis-non-disjunction': {
    title: 'Non-Disjunction',
    sentences: [
      'Non-disjunction = chromosomes fail to separate.',
      'Happens in Anaphase I or Anaphase II.',
      'Result: gametes with extra or missing chromosomes.',
      'Down syndrome = trisomy 21 (extra chromosome 21).',
      'Turner syndrome = XO.',
      'Klinefelter syndrome = XXY.',
      'Non-disjunction is more common in older mothers.',
    ],
  },
  'gen-monohybrid-dihybrid': {
    title: 'Monohybrid & Dihybrid Crosses',
    sentences: [
      'A monohybrid cross tracks one gene.',
      'A dihybrid cross tracks two genes.',
      'Dominant alleles are expressed with one copy.',
      'Recessive alleles need two copies.',
      'Homozygous = two identical alleles.',
      'Heterozygous = two different alleles.',
      'Monohybrid ratio (Tt × Tt) = 3:1.',
      'Dihybrid ratio (RrYy × RrYy) = 9:3:3:1.',
      'Always show P1, gametes, Punnett square, F1.',
    ],
  },
  'gen-blood-groups': {
    title: 'Blood Groups',
    sentences: [
      'Three alleles: I^A, I^B, and i.',
      'I^A and I^B are codominant.',
      'i is recessive.',
      'Genotype I^A I^A or I^A i = blood group A.',
      'Genotype I^B I^B or I^B i = blood group B.',
      'Genotype I^A I^B = blood group AB.',
      'Genotype i i = blood group O.',
      'Codominance means both alleles are expressed.',
      'Multiple alleles = more than two possible alleles.',
    ],
  },
  'gen-sex-linked': {
    title: 'Sex-Linked Inheritance',
    sentences: [
      'Females are XX, males are XY.',
      'X-linked genes are carried on the X chromosome.',
      'Males only have one X, so one recessive allele is expressed.',
      'Females need two recessive alleles to express the trait.',
      'Haemophilia is X-linked recessive.',
      'Colour-blindness is X-linked recessive.',
      'Muscular dystrophy is X-linked recessive.',
      'Carrier females (X^D X^d) can pass the allele to sons.',
    ],
  },
  'gen-pedigrees-incomplete': {
    title: 'Pedigrees & Incomplete Dominance',
    sentences: [
      'Pedigree diagrams show family inheritance.',
      'Squares = males, circles = females.',
      'Shaded = affected, unshaded = unaffected.',
      'Affected parents with unaffected children = dominant disorder.',
      'Unaffected parents with affected children = recessive disorder.',
      'Incomplete dominance = intermediate phenotype.',
      'Red × white = pink.',
      'Ratio for RW × RW = 1 red : 2 pink : 1 white.',
      'Palomino horses show incomplete dominance.',
    ],
  },
  'evo-natural-selection-speciation': {
    title: 'Natural Selection & Speciation',
    sentences: [
      'There is variation in every population.',
      'Some individuals have favourable characteristics.',
      'When the environment changes, the fittest survive.',
      'Survivors reproduce and pass on their alleles.',
      'The next generation has more favourable alleles.',
      'Over many generations, the population changes.',
      'Speciation happens when populations are separated.',
      'They face different conditions.',
      'Natural selection acts differently on each.',
      'Eventually they can no longer interbreed.',
    ],
  },
  'evo-artificial-selection': {
    title: 'Artificial Selection',
    sentences: [
      'Humans select organisms with desirable traits.',
      'They breed only those individuals.',
      'Over many generations, the desirable trait becomes more common.',
      'Artificial selection: humans choose.',
      'Natural selection: the environment chooses.',
      'Examples: high-protein mealies, dairy cows, dogs.',
      'Palomino horses are bred for their golden coat.',
    ],
  },
  'evo-fossils-biogeography': {
    title: 'Fossils & Biogeography',
    sentences: [
      'Fossils are preserved remains in rock.',
      'Oldest fossils are simple, youngest are complex.',
      'Fossils show evolutionary sequences.',
      'Hominid fossils show increasing brain size.',
      'Biogeography = distribution of species.',
      'Species on separated continents are similar.',
      'They share a common ancestor from Gondwana.',
      'Continental drift separated them.',
      'They evolved independently.',
      'Ratites (ostrich, rhea, emu) are an example.',
    ],
  },
  'evo-genetic-out-of-africa': {
    title: 'Genetic Evidence & Out-of-Africa',
    sentences: [
      'Mitochondrial DNA is inherited from the mother.',
      'mtDNA mutates slowly over time.',
      'It traces all modern humans back to Africa.',
      'DNA profiling compares DNA samples.',
      'It is used in forensics and paternity testing.',
      'Out-of-Africa: H. erectus originated in Africa.',
      'Oldest fossils are in Africa, younger ones outside.',
      'H. sapiens also originated in Africa.',
    ],
  },
  'hominid-bipedalism-brain-tools': {
    title: 'Human Evolution',
    sentences: [
      'Bipedalism = walking on two legs.',
      'Foramen magnum moves forward in bipeds.',
      'S-shaped spine absorbs shock.',
      'Short wide pelvis supports upper body weight.',
      'Brain size increased over time.',
      'Ardipithecus: 350 ml. H. sapiens: 1330 ml.',
      'Tools became more complex over time.',
      'H. habilis used simple scrapers.',
      'H. erectus used hand axes and fire.',
      'H. sapiens used arrows, fishing tools, and complex tools.',
      'Jaws and teeth became smaller.',
      'Prognathism decreased — the face became flatter.',
    ],
  },
};

export const LIFESCIENCES_AUTO_ORDER = [
  // P1
  'eye-pupillary',
  'eye-accommodation-defects',
  'ear-hearing-balance',
  'ns-neurons',
  'ns-reflex-arc',
  'ns-brain',
  'endo-salt-water',
  'endo-glucose-thyroxin',
  'thermo-skin',
  'repro-male',
  'repro-female',
  'repro-embryonic',
  'repro-plant',
  'repro-strategies',
  // P2
  'dna-structure-replication',
  'protein-synthesis',
  'mutation',
  'meiosis-phases-crossing-over',
  'meiosis-non-disjunction',
  'gen-monohybrid-dihybrid',
  'gen-blood-groups',
  'gen-sex-linked',
  'gen-pedigrees-incomplete',
  'evo-natural-selection-speciation',
  'evo-artificial-selection',
  'evo-fossils-biogeography',
  'evo-genetic-out-of-africa',
  'hominid-bipedalism-brain-tools',
];