// ================================================================
// ENGLISH FIRST ADDITIONAL LANGUAGE
// Teaching scripts (guided learning) + Auto scripts (exam prep)
// Extracted from NSC English FAL P1 + P2 papers: 2023, 2024, 2025
// ================================================================

export const ENGLISH_TEACHING_SCRIPTS = {
  // ================================================================
  // PAPER 1 — LANGUAGE IN CONTEXT
  // ================================================================

  // ----------------------------------------------------------------
  // 1. COMPREHENSION SKILLS
  // ----------------------------------------------------------------
  'comprehension-skills': {
    sections: [
      { type: 'heading', text: "Let's start with comprehension." },
      {
        type: 'scene',
        sceneId: 'comprehension-skills',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Comprehension Skills' },
        caption: 'Read the text. Read the question. Answer what they ask.',
        stepTexts: [
          null,
          'Step 1: Skim the text first. Get the big picture before you read the questions.',
          'Step 2: Read the questions carefully. Underline the key words — they tell you what to look for.',
          'Step 3: Go back to the text. Find the answer. Quote or paraphrase.',
          'Step 4: Check your answer. Did you answer the question that was asked?',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Answer the question. Not the question you wish they asked. Not the question you think they meant. The question on the paper.',
      },
      {
        type: 'concept',
        label: 'Marks = points',
        text: '2 marks = 2 points. 3 marks = 3 points. If the question says "state TWO points", you need TWO separate points. Not one long paragraph.',
      },
      {
        type: 'concept',
        label: 'Quote vs paraphrase',
        text: 'If the question says "Quote", copy the exact words from the text. If it says "in your own words", rewrite the idea. Never mix them up.',
      },
      {
        type: 'concept',
        label: 'Open-ended questions',
        text: 'When they ask "Do you agree?" or "Discuss your view", the mark is NOT for Yes or No. The mark is for your REASON. Give the reason first, then agree or disagree.',
      },
      {
        type: 'example',
        scenario: 'Imagine the question asks: "Why does the writer mention Dr Lorna Christie? State TWO points."',
        steps: [
          'The question wants TWO points about WHY she is mentioned.',
          'Point 1: She is a researcher — her title gives authority to the article.',
          'Point 2: Her findings provide credibility to the argument.',
          'Both points must be separate. One point per mark.',
        ],
        answer: 'Two separate points, each worth one mark.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 2. VISUAL LITERACY
  // ----------------------------------------------------------------
  'visual-literacy': {
    sections: [
      { type: 'heading', text: 'Pie charts, infographics, and cartoons — reading pictures.' },
      {
        type: 'scene',
        sceneId: 'visual-literacy',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Visual Literacy' },
        caption: 'Numbers, colours, legends — every visual tells a story.',
        stepTexts: [
          null,
          'Pie charts: each slice is a percentage of the whole. The biggest slice is the biggest number.',
          'Infographics: read the title first, then the labels, then the legend (the little key box).',
          'Bar charts: taller bars mean bigger values. Compare the bars.',
          'Legends tell you what the colours or patterns mean. Always read the legend.',
        ],
      },
      {
        type: 'concept',
        label: 'The legend',
        text: 'A legend is the small box that shows what each colour or pattern represents. Without reading the legend, you cannot understand the chart.',
      },
      {
        type: 'concept',
        label: 'The title',
        text: 'The title tells you what the chart is about. Read it first. If you skip it, you will misread the chart.',
      },
      {
        type: 'concept',
        label: 'Highest and lowest',
        text: 'Most chart questions ask: Which is the highest? Which is the lowest? Find the biggest and smallest slice or bar, then quote the number AND the label.',
      },
      {
        type: 'example',
        scenario: 'Imagine a pie chart shows Africa uses 84% of its water for agriculture. The question asks: What does this suggest?',
        steps: [
          'Find the slice labelled "Agricultural use" in the Africa pie.',
          'Read the percentage: 84%.',
          'Read the other slices: Industrial (9%) and Domestic (7%).',
          'Compare: 84% is the biggest slice — Africa uses most of its water for farming.',
        ],
        answer: 'Africa uses most of its water for agriculture (84%), compared to industry and domestic use.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 3. SUMMARY WRITING
  // ----------------------------------------------------------------
  'summary-writing': {
    sections: [
      { type: 'heading', text: 'The summary — 7 points, 70 words.' },
      {
        type: 'scene',
        sceneId: 'summary-writing',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Summary Writing' },
        caption: 'Strip the passage. Keep the facts. Cut the fluff.',
        stepTexts: [
          null,
          'Read the passage once. What is it ABOUT? What is the main topic?',
          'Find 7 points. Each point must be a separate fact. Not a long sentence.',
          'Write each point as a full sentence. Use your OWN words. Do not copy.',
          'Count your words. 70 words maximum. If you go over, cut.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'One sentence = one point. If you write one long sentence with two points inside, you only get 1 mark.',
      },
      {
        type: 'concept',
        label: 'Your own words',
        text: 'Do not copy the passage. If you copy 6-7 sentences verbatim, you lose ALL language marks. Rewrite in your own words.',
      },
      {
        type: 'concept',
        label: 'Word count',
        text: 'Count carefully. 70 words is the limit. Do not include your word count in the 70 — write it after in brackets.',
      },
      {
        type: 'concept',
        label: 'Number your points',
        text: 'Write 1. 2. 3. ... 7. Do not write paragraphs. Do not use bullet points. Number them.',
      },
      {
        type: 'example',
        scenario: 'Imagine a passage says: "The hydrating power of Vaseline is a good remedy for dry skin. Applying it to the body after a shower keeps the skin moisturised."',
        steps: [
          'Point to extract: Vaseline helps dry skin.',
          'Own words: "Vaseline treats dry skin." (3 words)',
          'Or: "It keeps skin moisturised." (4 words)',
          'Do NOT copy: "Applying it to the body after a shower keeps the skin moisturised."',
        ],
        answer: 'Short. Own words. One point.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 4. ADVERTISEMENT ANALYSIS
  // ----------------------------------------------------------------
  'advertisement-analysis': {
    sections: [
      { type: 'heading', text: "Every ad is trying to sell you something." },
      {
        type: 'scene',
        sceneId: 'advertisement-analysis',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Advertisement Analysis' },
        caption: 'Headline. Visual. Slogan. Call to action. Every piece has a job.',
        stepTexts: [
          null,
          'The HEADLINE grabs your attention. Often uses capitals, big font, or damaged letters.',
          'The VISUAL creates emotion. A cute animal. A sad face. A burning bus.',
          'The SLOGAN sticks in your mind. "Fire is EVERYONE\'S fight."',
          'The CALL TO ACTION tells you what to do next. "Call 112."',
        ],
      },
      {
        type: 'concept',
        label: 'Why capitals?',
        text: 'Capital letters make words LOOK important. "CAUTION" and "FIRE DANGER" shout at the reader. Bold and big fonts do the same.',
      },
      {
        type: 'concept',
        label: 'Damage techniques',
        text: 'Sometimes letters are "broken" or "falling" to suggest danger. A cracked letter can suggest destruction.',
      },
      {
        type: 'concept',
        label: 'Logos',
        text: 'The little brand logos at the bottom show who SUPPORTS the message. Western Cape Government + CapeNature + Fire Rescue = the message comes from official bodies.',
      },
      {
        type: 'concept',
        label: 'The apostrophe',
        text: '"Everyone\'s fight" — the apostrophe shows possession. "We\'ll play" — the apostrophe shows contraction. Read the question: which one is being tested?',
      },
      {
        type: 'example',
        scenario: 'Imagine the ad says: "CAUTION — FIRE DANGER. Fire is EVERYONE\'S fight."',
        steps: [
          'Headline = "CAUTION — FIRE DANGER" (capitals, bold, big font).',
          'Subheading = "Fire is EVERYONE\'S fight" (the apostrophe shows possession).',
          'Call to action = "Call 112 from a cellphone or 10177 from a landline."',
          'Logos at bottom = Western Cape Government, Fire Rescue Services, CapeNature.',
        ],
        answer: 'The ad wants to prevent unplanned veld fires and protect people and animals.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 5. CARTOON ANALYSIS
  // ----------------------------------------------------------------
  'cartoon-analysis': {
    sections: [
      { type: 'heading', text: 'Cartoons — verbal clues + visual clues.' },
      {
        type: 'scene',
        sceneId: 'cartoon-analysis',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Cartoon Analysis' },
        caption: 'Speech bubbles. Thought bubbles. Movement lines. They all mean something.',
        stepTexts: [
          null,
          'Speech bubble = the character is SPEAKING. Thought bubble = the character is THINKING.',
          'Movement lines = the character is MOVING or HITTING something. Lines behind a head = shock.',
          'Body language = closed eyes, wide-open mouth, fallen shoulders. Each tells you how the character feels.',
          'Exclamation mark = shouting or sudden emotion. Question mark = confusion.',
        ],
      },
      {
        type: 'concept',
        label: 'Contrast',
        text: 'If the question asks about contrast, look at what is DIFFERENT between two characters or frames. Jon half-closed eyes, Garfield wide open. Jon sitting, Garfield jumping.',
      },
      {
        type: 'concept',
        label: 'Verbal vs visual',
        text: 'Verbal clues = what they SAY. Visual clues = what they DO. A pain question needs ONE of each.',
      },
      {
        type: 'concept',
        label: 'The joke',
        text: 'Every cartoon has a punchline. Find the last frame — that is usually where the joke lands.',
      },
      {
        type: 'example',
        scenario: 'Imagine Frame 7 shows Jon shouting "OUCH!" with his mouth wide open. The question asks: How do we know Jon is in pain?',
        steps: [
          'Verbal clue: He shouts "OUCH!".',
          'Visual clue: His mouth is wide open.',
          'Visual clue 2: Movement lines behind his head show sudden movement.',
        ],
        answer: 'One verbal + one visual clue.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 6. GRAMMAR AND PUNCTUATION
  // ----------------------------------------------------------------
  'grammar-and-punctuation': {
    sections: [
      { type: 'heading', text: 'Grammar — the tools of language.' },
      {
        type: 'scene',
        sceneId: 'grammar-and-punctuation',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Grammar and Punctuation' },
        caption: 'Tenses. Voice. Speech. Homophones. Every question tests ONE tool.',
        stepTexts: [
          null,
          'Tense: past, present, future. "I walked" / "I walk" / "I will walk".',
          'Voice: active vs passive. "Simba created it" → "It was created by Simba".',
          'Direct vs indirect speech: "He said, \'I am happy\'" → "He said that he was happy".',
          'Homophones: same sound, different meaning. "new" / "knew" / "grew".',
        ],
      },
      {
        type: 'concept',
        label: 'Direct → indirect speech',
        text: 'Step 1: change the pronoun (I → he/she). Step 2: change the tense (present → past). Step 3: remove the quotation marks. Step 4: add "that".',
      },
      {
        type: 'concept',
        label: 'Active → passive',
        text: 'Step 1: the object becomes the subject. Step 2: the verb becomes "was/were + past participle". Step 3: the subject becomes "by [subject]".',
      },
      {
        type: 'concept',
        label: 'Negative form',
        text: 'Add "not" or "do not/does not". "She enjoys eating" → "She does not enjoy eating".',
      },
      {
        type: 'concept',
        label: 'Tag questions',
        text: 'If the sentence is positive, the tag is negative. If negative, the tag is positive. "It is a perfect filler, isn\'t it?"',
      },
      {
        type: 'concept',
        label: 'Homophones',
        text: 'Same SOUND, different meaning and spelling: their/there/they\'re, allowed/aloud, through/threw, new/knew, write/right.',
      },
      {
        type: 'concept',
        label: 'Parts of speech',
        text: 'Noun = person, place, thing. Verb = action. Adjective = describes a noun. Adverb = describes a verb. Preposition = position/relation. Article = a, an, the. Conjunction = joining word.',
      },
      {
        type: 'example',
        scenario: 'Rewrite in reported speech: He said, "I turned the passion for bees into a business."',
        steps: [
          'Change pronoun: I → he.',
          'Change tense: turned → had turned.',
          'Remove quotation marks and add "that".',
          'Result: He said that he had turned the passion for bees into a business.',
        ],
        answer: 'He said that he had turned the passion for bees into a business.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 7. VOCABULARY AND CONTEXT
  // ----------------------------------------------------------------
  'vocabulary-and-context': {
    sections: [
      { type: 'heading', text: 'Vocabulary — a word has many meanings.' },
      {
        type: 'scene',
        sceneId: 'vocabulary-and-context',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Vocabulary and Context' },
        caption: 'One word. Different sentences. Different meanings.',
        stepTexts: [
          null,
          'The same word can mean different things in different sentences.',
          'Context 1: "She conducts research" — conducts means "carries out".',
          'Context 2: "She conducts the orchestra" — conducts means "directs".',
          'Context decides the meaning.',
        ],
      },
      {
        type: 'concept',
        label: 'Context decides',
        text: 'The same word can mean different things in different sentences. "Block" can be a noun (a block of flats) or a verb (to block the road). The context tells you which one.',
      },
      {
        type: 'concept',
        label: 'Formal vs informal',
        text: '"Trendy" (informal) → "fashionable" (formal). "Cool" (informal) → "remarkable" (formal). Match the register.',
      },
      {
        type: 'concept',
        label: 'Synonyms and antonyms',
        text: 'Synonym = same meaning (happy/joyful). Antonym = opposite meaning (happy/sad). Read the question to see which one they want.',
      },
      {
        type: 'concept',
        label: 'Root words',
        text: 'A root word is the base form. "Reporting" → "report". "Beautiful" → "beauty". "Returning" → "return".',
      },
      {
        type: 'example',
        scenario: 'In the sentence "She conducts research on fashion", the word "conducts" could mean "directs" or "carries out".',
        steps: [
          'Look at the whole sentence.',
          'She is doing research — so "conducts" means "carries out".',
          'If the sentence said "She conducts the orchestra", it would mean "directs".',
          'Context changes everything.',
        ],
        answer: 'Context decides the meaning.',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — LITERATURE
  // ================================================================

  // ----------------------------------------------------------------
  // CRY, THE BELOVED COUNTRY
  // ----------------------------------------------------------------
  'cry-plot': {
    sections: [
      { type: 'heading', text: "Let's look at the story of Cry, the Beloved Country." },
      {
        type: 'scene',
        sceneId: 'cry-plot',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Plot — The Journey' },
        caption: 'A father leaves home to find his son.',
        stepTexts: [
          null,
          'Stephen Kumalo lives in Ndotsheni. He receives a letter telling him his sister Gertrude is sick.',
          'He travels to Johannesburg. He finds Gertrude has become a prostitute and his son Absalom has gone missing.',
          'He finds Absalom in prison. Absalom has killed Arthur Jarvis, the son of a rich white farmer.',
          'Stephen returns home with Gertrude\'s son and Absalom\'s pregnant wife. Jarvis rebuilds Ndotsheni.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'The story is a journey — from Ndotsheni to Johannesburg and back. Everything changes on the way.',
      },
      {
        type: 'concept',
        label: 'The structure',
        text: 'Three books. Book 1: Stephen searches. Book 2: the murder and trial. Book 3: restoration and hope.',
      },
      {
        type: 'example',
        scenario: 'Why does Stephen go to Johannesburg?',
        steps: [
          'A letter arrives from Johannesburg.',
          'It says Gertrude is sick.',
          'Stephen travels to find her — and his son.',
          'His search brings him face to face with the crime his son committed.',
        ],
        answer: 'Stephen goes to find his sister and his son.',
      },
    ],
  },

  'cry-characters': {
    sections: [
      { type: 'heading', text: 'The people of Cry, the Beloved Country.' },
      {
        type: 'scene',
        sceneId: 'cry-characters',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Characters' },
        caption: 'A family broken, and a family grieving.',
        stepTexts: [
          null,
          'Stephen Kumalo — a priest. Humble, faithful, searching for his family.',
          'John Kumalo — Stephen\'s brother. A powerful speaker but selfish and immoral.',
          'Absalom — Stephen\'s son. Kills Arthur Jarvis. Accepts his fate.',
          'James Jarvis — Arthur\'s father. Grieves, then rebuilds Ndotsheni as an act of reconciliation.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Every character carries a piece of the story\'s message. Stephen = hope. John = corruption. Jarvis = reconciliation.',
      },
      {
        type: 'example',
        scenario: 'Why does Msimangu call Stephen his friend?',
        steps: [
          'Msimangu is a priest in Johannesburg.',
          'He helps Stephen find his sister and his son.',
          'He is humble — he admits his own faults.',
          'He is the voice of kindness in a broken city.',
        ],
        answer: 'Msimangu helps Stephen and shows him kindness and honesty.',
      },
    ],
  },

  'cry-themes': {
    sections: [
      { type: 'heading', text: 'Themes in Cry, the Beloved Country.' },
      {
        type: 'concept',
        label: 'Hope',
        text: 'Stephen brings hope to Absalom\'s wife and Gertrude\'s son. Jarvis brings hope to Ndotsheni.',
      },
      {
        type: 'concept',
        label: 'Regret',
        text: 'Jarvis regrets not knowing his son. Gertrude regrets her fall. Absalom regrets his bad choices.',
      },
      {
        type: 'concept',
        label: 'Suffering',
        text: 'Black South Africans suffer under Apartheid. Families break apart. The land dies.',
      },
      {
        type: 'concept',
        label: 'Reconciliation',
        text: 'Jarvis reaches out to Stephen. He rebuilds Ndotsheni — milk for children, a dam, a church.',
      },
      {
        type: 'example',
        scenario: 'How does Jarvis show reconciliation?',
        steps: [
          'His son was murdered by Stephen\'s son.',
          'He could have hated Stephen.',
          'Instead, he sends milk for the children.',
          'He pays to rebuild the church and teaches farming.',
        ],
        answer: 'Jarvis responds to grief with generosity, not revenge.',
      },
    ],
  },

  'cry-setting': {
    sections: [
      { type: 'heading', text: 'Where does Cry, the Beloved Country take place?' },
      {
        type: 'scene',
        sceneId: 'cry-setting',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Setting' },
        caption: 'Two worlds. One country.',
        stepTexts: [
          null,
          'Ndotsheni — a rural village. Dry. Poor. The land no longer feeds the people.',
          'Johannesburg — a big city. Full of work, but also full of crime, sin and broken families.',
          'High Place — James Jarvis\'s farm. Rich, green, above the valley. A world apart from Ndotsheni.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'The rural village and the city are two halves of the same story. What the city gives, it also takes away.',
      },
      {
        type: 'example',
        scenario: 'Why does Stephen\'s journey matter so much?',
        steps: [
          'Ndotsheni cannot feed its people.',
          'Young people move to Johannesburg to find work.',
          'Some — like Absalom — never come back.',
          'Stephen\'s journey is the journey of every family torn apart by the city.',
        ],
        answer: 'The journey shows the cost of the migrant labour system.',
      },
    ],
  },

  'cry-context': {
    sections: [
      { type: 'heading', text: 'How to answer contextual questions on Cry, the Beloved Country.' },
      {
        type: 'concept',
        label: 'Read the extract twice',
        text: 'First for understanding. Then for evidence. Underline the words the question asks about.',
      },
      {
        type: 'concept',
        label: 'Quote when asked',
        text: 'If the question says "quote", copy the exact words. If it says "in your own words", paraphrase.',
      },
      {
        type: 'concept',
        label: 'Ground every answer in the novel',
        text: 'Never answer with general knowledge. Every answer must come from the extract or the novel as a whole.',
      },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile = "like" or "as". Metaphor = direct comparison. Personification = human traits on objects. Irony = opposite of what is said.',
      },
      {
        type: 'example',
        scenario: 'A question asks: "The voice grew deep, it was like thunder that was rolling. Identify the figure of speech and explain its effect."',
        steps: [
          '"Like" tells you this is a simile.',
          'The voice is compared to rolling thunder.',
          'Thunder is loud, powerful, commanding.',
          'The simile shows the power of John\'s voice.',
        ],
        answer: 'Simile — John\'s voice is powerful like thunder.',
      },
    ],
  },

  'cry-essay': {
    sections: [
      { type: 'heading', text: 'How to write an essay on Cry, the Beloved Country.' },
      {
        type: 'scene',
        sceneId: 'cry-essay',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Essay Structure' },
        caption: 'Intro. Body. Conclusion. Every time.',
        stepTexts: [
          null,
          'Introduction — a hook about the theme. Then your Line of Argument (LOA).',
          'Body — three points. Each point has evidence from the novel. Use PEEL.',
          'PEEL = Point, Explain, Example, Link back to your stance.',
          'Conclusion — restate your stance. No new points.',
        ],
      },
      {
        type: 'concept',
        label: 'The stance',
        text: 'Agree or disagree. The examiner does not care which — they care about whether you can support it.',
      },
      {
        type: 'concept',
        label: 'The evidence',
        text: 'Every body point needs a specific example. Not "Kumalo helps people" — but "Kumalo takes Absalom\'s wife to Ndotsheni".',
      },
      {
        type: 'example',
        scenario: 'Essay: "The theme of hope is central to the novel. Discuss."',
        steps: [
          'Stance: Yes — hope runs through the whole novel.',
          'Point 1: Kumalo brings hope to Absalom\'s wife and Gertrude\'s son.',
          'Point 2: Arthur Jarvis\'s writings show hope for racial equality.',
          'Point 3: James Jarvis rebuilds Ndotsheni, giving hope for the future.',
          'Conclusion: Hope is born out of suffering.',
        ],
        answer: 'Stance + three points with evidence + conclusion.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // DR JEKYLL AND MR HYDE
  // ----------------------------------------------------------------
  'jekyll-plot': {
    sections: [
      { type: 'heading', text: 'Let\'s look at the story of Dr Jekyll and Mr Hyde.' },
      {
        type: 'scene',
        sceneId: 'jekyll-plot',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Plot — Dual Life' },
        caption: 'One man. Two identities. Two destinies.',
        stepTexts: [
          null,
          'Mr Utterson, a lawyer, learns of a strange man named Mr Hyde who trampled a girl.',
          'Utterson discovers Mr Hyde is the sole beneficiary of Dr Jekyll\'s will.',
          'Mr Hyde murders Sir Danvers Carew. Then he disappears.',
          'Utterson breaks into Jekyll\'s laboratory and finds both Hyde and Jekyll dead. Their statements reveal the truth.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Jekyll created Hyde with a potion. Hyde is Jekyll. When the potion can no longer be controlled, Jekyll kills himself.',
      },
      {
        type: 'example',
        scenario: 'Why does Utterson investigate Hyde?',
        steps: [
          'Utterson is Jekyll\'s lawyer and friend.',
          'He sees Hyde in the will as sole beneficiary.',
          'He worries Hyde might harm Jekyll.',
          'His investigation uncovers the truth.',
        ],
        answer: 'Utterson investigates because he fears for Jekyll\'s safety.',
      },
    ],
  },

  'jekyll-characters': {
    sections: [
      { type: 'heading', text: 'The characters of Dr Jekyll and Mr Hyde.' },
      {
        type: 'scene',
        sceneId: 'jekyll-characters',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Characters' },
        caption: 'Good men, bad men — and one man who is both.',
        stepTexts: [
          null,
          'Mr Utterson — a lawyer. Loyal, discreet, curious. He investigates the mystery.',
          'Dr Jekyll — a respected scientist. He creates the potion that turns him into Hyde.',
          'Mr Hyde — Jekyll\'s evil alter ego. Violent, cruel, without remorse.',
          'Dr Lanyon — a fellow scientist. He breaks with Jekyll over their scientific differences.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Every character represents a different response to evil. Utterson investigates. Lanyon recoils. Jekyll indulges.',
      },
      {
        type: 'example',
        scenario: 'Why does Lanyon break with Jekyll?',
        steps: [
          'Lanyon and Jekyll are old friends.',
          'But Lanyon calls Jekyll\'s work "unscientific balderdash".',
          'Their scientific beliefs clash.',
          'They stop speaking — until Jekyll asks for Lanyon\'s help.',
        ],
        answer: 'Lanyon breaks with Jekyll over their scientific disagreements.',
      },
    ],
  },

  'jekyll-themes': {
    sections: [
      { type: 'heading', text: 'Themes in Dr Jekyll and Mr Hyde.' },
      {
        type: 'concept',
        label: 'Duality of human nature',
        text: 'Good and evil exist in every person. Jekyll is both. Hyde is not a separate person — he is part of Jekyll.',
      },
      {
        type: 'concept',
        label: 'Reputation',
        text: 'Victorian society cared deeply about reputation. Jekyll\'s secret double life shows the cost of hiding who you are.',
      },
      {
        type: 'concept',
        label: 'Friendship',
        text: 'Utterson is loyal to Jekyll. Lanyon breaks with Jekyll. Friendship is tested by secrets.',
      },
      {
        type: 'concept',
        label: 'Conflict',
        text: 'Lanyon vs Jekyll. Jekyll vs Hyde. Utterson vs Hyde. Every relationship in the novel is a conflict.',
      },
      {
        type: 'example',
        scenario: 'Why does Jekyll enjoy being Hyde?',
        steps: [
          'As Jekyll, he must be respectable.',
          'As Hyde, he can do whatever he wants.',
          'Hyde is smaller, younger, freer.',
          'Jekyll says he "smiled at the notion".',
        ],
        answer: 'Jekyll enjoys being Hyde because Hyde is free from society\'s rules.',
      },
    ],
  },

  'jekyll-duality': {
    sections: [
      { type: 'heading', text: 'The theme of duality — one body, two selves.' },
      {
        type: 'concept',
        label: 'The potion',
        text: 'The potion does not create a new person. It frees what is already inside Jekyll. Hyde was always part of him.',
      },
      {
        type: 'concept',
        label: 'The two houses',
        text: 'Jekyll\'s respectable house faces the square. Hyde\'s laboratory opens onto a dark alley. One man, two addresses.',
      },
      {
        type: 'concept',
        label: 'The two names',
        text: '"Jekyll" and "Hyde" are the same man. Jekyll = "I kill". Hyde = "hide". The names tell the story.',
      },
      {
        type: 'example',
        scenario: 'Why does Jekyll eventually kill himself?',
        steps: [
          'The transformations start happening without the potion.',
          'Hyde takes over. Jekyll cannot stop him.',
          'He realises he will be trapped as Hyde forever.',
          'He chooses death over being permanently Hyde.',
        ],
        answer: 'Jekyll kills himself to escape becoming Hyde forever.',
      },
    ],
  },

  'jekyll-context': {
    sections: [
      { type: 'heading', text: 'How to answer contextual questions on Dr Jekyll and Mr Hyde.' },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile = "like" or "as". Metaphor = direct comparison. Personification = human traits on objects.',
      },
      {
        type: 'concept',
        label: 'Tone questions',
        text: 'Ask: what is the character feeling? Name the emotion. Then explain why using the extract.',
      },
      {
        type: 'concept',
        label: 'Irony',
        text: 'Irony = the opposite of what is expected. Utterson believes Jekyll is innocent — but Jekyll is the murderer.',
      },
      {
        type: 'example',
        scenario: 'Extract: "His soul is too much charged with blood of thine already."',
        steps: [
          'The soul is not literally carrying blood.',
          '"Blood" represents guilt.',
          'No "like" or "as" = metaphor.',
          'It shows Macbeth\'s guilt over the murders.',
        ],
        answer: 'Metaphor — blood represents guilt.',
      },
    ],
  },

  'jekyll-essay': {
    sections: [
      { type: 'heading', text: 'How to write an essay on Dr Jekyll and Mr Hyde.' },
      {
        type: 'scene',
        sceneId: 'jekyll-essay',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Essay Structure' },
        caption: 'Intro. Body. Conclusion. Every time.',
        stepTexts: [
          null,
          'Introduction — hook about duality or reputation. Then your Line of Argument (LOA).',
          'Body — three points. Each point has evidence from the novel. Use PEEL.',
          'PEEL = Point, Explain, Example, Link back to your stance.',
          'Conclusion — restate your stance. No new points.',
        ],
      },
      {
        type: 'concept',
        label: 'The stance',
        text: 'Agree or disagree. The examiner wants evidence, not opinion.',
      },
      {
        type: 'concept',
        label: 'The evidence',
        text: 'Not "Jekyll is bad" — but "Jekyll tramples a girl as Hyde". Use specific scenes.',
      },
      {
        type: 'example',
        scenario: 'Essay: "Dr Jekyll is morally responsible for Mr Hyde\'s actions. Discuss."',
        steps: [
          'Stance: Yes — Jekyll created Hyde and chose to keep drinking the potion.',
          'Point 1: Jekyll made the potion knowing it freed his dark side.',
          'Point 2: He kept transforming even after Hyde trampled a girl.',
          'Point 3: He only stopped when the transformations became involuntary.',
          'Conclusion: Jekyll\'s choices created Hyde.',
        ],
        answer: 'Stance + three points with evidence + conclusion.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // MACBETH
  // ----------------------------------------------------------------
  'macbeth-plot': {
    sections: [
      { type: 'heading', text: 'Let\'s look at the story of Macbeth.' },
      {
        type: 'scene',
        sceneId: 'macbeth-plot',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Plot — Rise and Fall' },
        caption: 'A hero becomes a tyrant.',
        stepTexts: [
          null,
          'Macbeth is a brave general. He wins a battle for King Duncan.',
          'Three witches tell him he will be king. Lady Macbeth urges him to kill Duncan.',
          'Macbeth becomes king — but is consumed by guilt. He kills Banquo and Macduff\'s family.',
          'Malcolm and Macduff attack. Macbeth is killed. Malcolm becomes king.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Macbeth is a tragedy. A brave man destroys himself through ambition.',
      },
      {
        type: 'example',
        scenario: 'Why does Macbeth kill Duncan?',
        steps: [
          'The witches prophesy he will be king.',
          'Lady Macbeth taunts him about his manhood.',
          'Macbeth gives in.',
          'He murders Duncan in his sleep — and cannot undo it.',
        ],
        answer: 'Macbeth kills Duncan because of ambition and Lady Macbeth\'s persuasion.',
      },
    ],
  },

  'macbeth-characters': {
    sections: [
      { type: 'heading', text: 'The characters of Macbeth.' },
      {
        type: 'scene',
        sceneId: 'macbeth-characters',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Characters' },
        caption: 'A brave man. A ruthless wife. A loyal friend.',
        stepTexts: [
          null,
          'Macbeth — brave general who becomes a tyrant. Kills Duncan, Banquo, Macduff\'s family.',
          'Lady Macbeth — ambitious, manipulative. She drives Macbeth to kill. Later goes mad.',
          'Banquo — loyal to Duncan. Brave and moral. Killed by Macbeth\'s orders.',
          'Macduff — a nobleman. Kills Macbeth. His family is murdered by Macbeth.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Every character tests Macbeth. Banquo shows loyalty. Macduff shows honour. Lady Macbeth shows raw ambition.',
      },
      {
        type: 'example',
        scenario: 'Why does Lady Macbeth go mad?',
        steps: [
          'She plotted Duncan\'s murder.',
          'She washes invisible blood from her hands.',
          'She sleepwalks and mutters about the murders.',
          'She cannot escape the guilt.',
        ],
        answer: 'Guilt drives Lady Macbeth insane.',
      },
    ],
  },

  'macbeth-themes': {
    sections: [
      { type: 'heading', text: 'Themes in Macbeth.' },
      {
        type: 'concept',
        label: 'Ambition',
        text: 'Ambition is the driving force. Macbeth\'s ambition destroys him.',
      },
      {
        type: 'concept',
        label: 'Guilt',
        text: 'Guilt haunts Macbeth and Lady Macbeth. Blood is a symbol of guilt.',
      },
      {
        type: 'concept',
        label: 'Betrayal',
        text: 'Macbeth betrays Duncan. The Thane of Cawdor betrays Duncan. The witches betray Macbeth with half-truths.',
      },
      {
        type: 'concept',
        label: 'Manhood',
        text: 'Lady Macbeth challenges Macbeth\'s manhood. True manhood is shown by Banquo and Macduff — restraint, not violence.',
      },
      {
        type: 'concept',
        label: 'Fate vs free will',
        text: 'The witches show Macbeth his fate. But he chooses to act on it. The play asks: is Macbeth doomed, or does he doom himself?',
      },
      {
        type: 'example',
        scenario: 'How does ambition destroy Macbeth?',
        steps: [
          'Ambition makes him kill Duncan.',
          'He becomes paranoid and kills more people.',
          'He is eventually abandoned and killed.',
          'His ambition is his downfall.',
        ],
        answer: 'Ambition drives Macbeth to his death.',
      },
    ],
  },

  'macbeth-ambition': {
    sections: [
      { type: 'heading', text: 'The theme of ambition.' },
      {
        type: 'concept',
        label: 'Vaulting ambition',
        text: 'Macbeth says his ambition "o\'erleaps itself". He knows he is going too far — but cannot stop.',
      },
      {
        type: 'concept',
        label: 'The witches',
        text: 'The witches plant the seed. They never tell Macbeth to kill. But they know he will.',
      },
      {
        type: 'concept',
        label: 'Lady Macbeth',
        text: 'She pushes hardest. She taunts his manhood. But her own ambition eats her alive.',
      },
      {
        type: 'example',
        scenario: 'Is Macbeth a victim of ambition or a victim of fate?',
        steps: [
          'Yes — the witches told him his fate.',
          'But he chose to act on it.',
          'He could have waited. He chose murder.',
          'So he is a victim of his own choice.',
        ],
        answer: 'Macbeth is a victim of his own ambition.',
      },
    ],
  },

  'macbeth-context': {
    sections: [
      { type: 'heading', text: 'How to answer contextual questions on Macbeth.' },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile = "like" or "as". Metaphor = direct comparison. Personification = human traits on objects.',
      },
      {
        type: 'concept',
        label: 'Tone',
        text: 'Name the emotion, then explain why. "Fear — Macbeth is afraid of the ghost."',
      },
      {
        type: 'concept',
        label: 'Director\'s questions',
        text: 'If asked "what would you tell the actor to do?", describe TWO physical actions. Not feelings.',
      },
      {
        type: 'concept',
        label: 'Dramatic irony',
        text: 'The audience knows what the character does not. Duncan trusts Macbeth — we know he will kill him.',
      },
      {
        type: 'example',
        scenario: 'Extract: "my soul is too much charged with blood of thine already."',
        steps: [
          'The soul is not literally carrying blood.',
          '"Blood" represents guilt.',
          'No "like" or "as" = metaphor.',
          'It shows Macbeth\'s guilt over the murders.',
        ],
        answer: 'Metaphor — blood = guilt.',
      },
    ],
  },

  'macbeth-essay': {
    sections: [
      { type: 'heading', text: 'How to write an essay on Macbeth.' },
      {
        type: 'scene',
        sceneId: 'macbeth-essay',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Essay Structure' },
        caption: 'Intro. Body. Conclusion. Every time.',
        stepTexts: [
          null,
          'Introduction — hook about ambition, betrayal or guilt. Then your LOA.',
          'Body — three points. Each point has evidence from the play. Use PEEL.',
          'PEEL = Point, Explain, Example, Link back to your stance.',
          'Conclusion — restate your stance. No new points.',
        ],
      },
      {
        type: 'concept',
        label: 'The stance',
        text: 'Agree or disagree. Take a clear side, then defend it.',
      },
      {
        type: 'concept',
        label: 'The evidence',
        text: 'Not "Macbeth is evil" — but "Macbeth orders the murder of Macduff\'s family in Act 4".',
      },
      {
        type: 'example',
        scenario: 'Essay: "Macbeth is a victim of his own ambition. Discuss."',
        steps: [
          'Stance: Yes — Macbeth destroys himself through ambition.',
          'Point 1: The witches\' prophecy awakens his ambition.',
          'Point 2: He allows Lady Macbeth to manipulate him.',
          'Point 3: His paranoia drives him to kill Banquo and Macduff\'s family.',
          'Conclusion: His ambition is his destruction.',
        ],
        answer: 'Stance + three points with evidence + conclusion.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // MY CHILDREN! MY AFRICA!
  // ----------------------------------------------------------------
  'mcma-plot': {
    sections: [
      { type: 'heading', text: 'Let\'s look at the story of My Children! My Africa!' },
      {
        type: 'scene',
        sceneId: 'mcma-plot',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Plot — A Township Story' },
        caption: 'A teacher, a learner, and the struggle that tears them apart.',
        stepTexts: [
          null,
          'Mr M is a teacher at Zolile High. He believes education will free his learners.',
          'He pairs Thami, his brightest learner, with Isabel, a white girl from Camdeboo.',
          'They compete in a literary quiz — and win.',
          'But the boycotts grow. Thami joins the struggle. Mr M is killed by the mob.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'The play is about apartheid South Africa. It asks: can education and protest work together?',
      },
      {
        type: 'example',
        scenario: 'Why does Mr M team up with Isabel?',
        steps: [
          'He wants his learners to compete.',
          'He believes in cross-racial friendship.',
          'He knows Thami is brilliant.',
          'He sees the partnership as a way forward.',
        ],
        answer: 'Mr M wants to bridge the racial divide through education.',
      },
    ],
  },

  'mcma-characters': {
    sections: [
      { type: 'heading', text: 'The characters of My Children! My Africa!' },
      {
        type: 'scene',
        sceneId: 'mcma-characters',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Characters' },
        caption: 'A teacher, a rebel, and a bridge.',
        stepTexts: [
          null,
          'Mr M — a devoted teacher. Believes education is freedom. Dies at the hands of his own learners.',
          'Thami — Mr M\'s brightest pupil. Torn between school and the struggle. Joins the boycott.',
          'Isabel — a white girl from Camdeboo. Learns about apartheid through Thami.',
          'Miss Brockway — Isabel\'s teacher. Helps set up the literary quiz.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Each character stands for a different response to apartheid. Education. Protest. Bridge-building.',
      },
      {
        type: 'example',
        scenario: 'Why does Thami stop attending school?',
        steps: [
          'The boycotts against Bantu Education begin.',
          'Thami is pressured by the Comrades.',
          'He believes the struggle matters more than class.',
          'He joins the boycott.',
        ],
        answer: 'Thami joins the boycott to fight apartheid.',
      },
    ],
  },

  'mcma-themes': {
    sections: [
      { type: 'heading', text: 'Themes in My Children! My Africa!' },
      {
        type: 'concept',
        label: 'Racial injustice',
        text: 'Bantu Education is designed to keep Black South Africans inferior. The Group Areas Act separates communities.',
      },
      {
        type: 'concept',
        label: 'Education',
        text: 'Mr M believes education will free his learners. But the learners believe the struggle comes first.',
      },
      {
        type: 'concept',
        label: 'Teamwork',
        text: 'Isabel and Thami work together. Mr M and Miss Brockway work together. Teamwork bridges differences.',
      },
      {
        type: 'concept',
        label: 'Communication',
        text: 'The play is built on conversations — between teacher and learner, Black and White, old and young.',
      },
      {
        type: 'concept',
        label: 'Hope',
        text: 'Isabel represents hope. She listens. She learns. She refuses to give up on Thami.',
      },
      {
        type: 'example',
        scenario: 'Why is the debating contest important?',
        steps: [
          'It brings Black and White learners together.',
          'They compete as equals.',
          'Isabel learns about Zolile High.',
          'Thami realises he can match any learner.',
        ],
        answer: 'The contest bridges the racial divide through education.',
      },
    ],
  },

  'mcma-apartheid': {
    sections: [
      { type: 'heading', text: 'The historical context — apartheid South Africa.' },
      {
        type: 'concept',
        label: 'Bantu Education',
        text: 'A separate, inferior education system for Black South Africans. Designed to prepare them for manual labour.',
      },
      {
        type: 'concept',
        label: 'The boycotts',
        text: 'From 1976 onwards, learners boycotted schools. They demanded free, equal education.',
      },
      {
        type: 'concept',
        label: 'The Comrades',
        text: 'A youth-led movement within the struggle. Sometimes violent. Sometimes targeting collaborators.',
      },
      {
        type: 'example',
        scenario: 'Why is Mr M seen as a collaborator?',
        steps: [
          'He reports learner names to the Department of Education.',
          'He refuses to join the boycott.',
          'The Comrades see this as a betrayal.',
          'They kill him.',
        ],
        answer: 'Mr M is seen as a collaborator because he works with the authorities.',
      },
    ],
  },

  'mcma-context': {
    sections: [
      { type: 'heading', text: 'How to answer contextual questions on My Children! My Africa!' },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile, metaphor, personification, rhetorical question. Identify and explain the effect.',
      },
      {
        type: 'concept',
        label: 'Tone',
        text: 'Name the emotion. Then explain why, using the extract.',
      },
      {
        type: 'concept',
        label: 'Director\'s questions',
        text: 'Describe TWO physical actions. Not emotions. Not thoughts. Actions.',
      },
      {
        type: 'example',
        scenario: 'Extract: "What is wrong with this world that it wants to waste you all like that?"',
        steps: [
          'The question is not asking for an answer.',
          'It is a rhetorical question.',
          'It expresses Mr M\'s despair.',
          'It shows his love for his learners.',
        ],
        answer: 'Rhetorical question — expresses Mr M\'s despair.',
      },
    ],
  },

  'mcma-essay': {
    sections: [
      { type: 'heading', text: 'How to write an essay on My Children! My Africa!' },
      {
        type: 'scene',
        sceneId: 'mcma-essay',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Essay Structure' },
        caption: 'Intro. Body. Conclusion. Every time.',
        stepTexts: [
          null,
          'Introduction — hook about education, apartheid or hope. Then your LOA.',
          'Body — three points. Each with evidence from the play. Use PEEL.',
          'PEEL = Point, Explain, Example, Link back to your stance.',
          'Conclusion — restate your stance. No new points.',
        ],
      },
      {
        type: 'concept',
        label: 'The stance',
        text: 'Agree or disagree. Take a clear position.',
      },
      {
        type: 'concept',
        label: 'The evidence',
        text: 'Not "Mr M is good" — but "Mr M refuses to leave his classroom when the mob arrives".',
      },
      {
        type: 'example',
        scenario: 'Essay: "The title My Children! My Africa! is suitable for this drama. Discuss."',
        steps: [
          'Stance: Yes — the title captures Mr M\'s love for his learners and country.',
          'Point 1: Mr M sees his learners as his children.',
          'Point 2: He loves Africa deeply — he wants it to be free.',
          'Point 3: The exclamation marks show his passion.',
          'Conclusion: The title is both personal and political.',
        ],
        answer: 'Stance + three points + conclusion.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // SHORT STORIES
  // ----------------------------------------------------------------
  'short-stories-technique': {
    sections: [
      { type: 'heading', text: 'How to read a short story for the exam.' },
      {
        type: 'concept',
        label: 'Setting',
        text: 'Time and place. When and where does the story happen? Look at the first lines.',
      },
      {
        type: 'concept',
        label: 'Characters',
        text: 'Who is in the story? What do they want? What stops them?',
      },
      {
        type: 'concept',
        label: 'Plot',
        text: 'What happens? Beginning, middle, end. Look for the turning point.',
      },
      {
        type: 'concept',
        label: 'Conflict',
        text: 'Every story has a conflict — person vs person, person vs society, person vs self.',
      },
      {
        type: 'concept',
        label: 'Theme',
        text: 'What is the story ABOUT? Betrayal? Kindness? Freedom? Love?',
      },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile, metaphor, personification, symbolism. Every story uses them.',
      },
      {
        type: 'example',
        scenario: 'A question asks: "Describe the time and place where this extract is set."',
        steps: [
          'Read the opening lines.',
          'Look for clues about WHEN (time of day, season, historical period).',
          'Look for clues about WHERE (country, city, house, room).',
          'Write both — one sentence for time, one for place.',
        ],
        answer: 'Time + place, each grounded in the extract.',
      },
    ],
  },

  'short-stories-themes': {
    sections: [
      { type: 'heading', text: 'Common themes in the prescribed short stories.' },
      {
        type: 'concept',
        label: 'Betrayal',
        text: 'In "Rejection", Modou betrays his wife by taking a second wife. Binetou betrays Daba.',
      },
      {
        type: 'concept',
        label: 'Freedom',
        text: 'In "Eveline", the protagonist has a chance at freedom — but chooses to stay.',
      },
      {
        type: 'concept',
        label: 'Kindness',
        text: 'In "Triumph in the Face of Adversity", several characters show kindness to Thulisile.',
      },
      {
        type: 'concept',
        label: 'Guilt',
        text: 'In "The Slave Dealer", the protagonist cannot escape his guilt. He cannot pray.',
      },
      {
        type: 'concept',
        label: 'Childhood',
        text: 'In "The Wind and a Boy", Friedman\'s childhood is both free and tragic.',
      },
      {
        type: 'example',
        scenario: 'How does betrayal show in "Rejection"?',
        steps: [
          'Modou takes a second wife without telling his first wife.',
          'He is supposed to be at work but is with Binetou.',
          'Binetou was Daba\'s friend.',
          'The narrator feels betrayed by both.',
        ],
        answer: 'Betrayal is shown through Modou\'s secret second marriage.',
      },
    ],
  },

  'short-stories-characters': {
    sections: [
      { type: 'heading', text: 'Key characters across the short stories.' },
      {
        type: 'concept',
        label: 'Eveline (Eveline)',
        text: 'A young woman in Dublin. Trapped by her father, her job and her promise to her dying mother.',
      },
      {
        type: 'concept',
        label: 'Frank (Eveline)',
        text: 'A sailor. Wants to marry Eveline and take her to Buenos Aires.',
      },
      {
        type: 'concept',
        label: 'Narrator (Rejection)',
        text: 'A wife betrayed by her husband Modou\'s second marriage. She reacts with dignity.',
      },
      {
        type: 'concept',
        label: 'Thulisile (Triumph)',
        text: 'A poor girl who rises above her circumstances. Becomes a success.',
      },
      {
        type: 'concept',
        label: 'Friedman (The Wind and a Boy)',
        text: 'A boy raised by his grandmother. Free and loved, but dies tragically young.',
      },
      {
        type: 'concept',
        label: 'The Slave Dealer (poem)',
        text: 'A man haunted by the cruelty he committed. Cannot pray or rest.',
      },
      {
        type: 'example',
        scenario: 'Why does Eveline stay in Dublin?',
        steps: [
          'She promised her dying mother to keep the family together.',
          'She is afraid of the unknown.',
          'Her father depends on her.',
          'She chooses duty over freedom.',
        ],
        answer: 'Eveline stays because of duty and fear.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // POETRY
  // ----------------------------------------------------------------
  'poetry-technique': {
    sections: [
      { type: 'heading', text: 'How to read a poem for the exam.' },
      {
        type: 'concept',
        label: 'Read it out loud',
        text: 'Poetry is sound. Read the poem slowly. Listen to the rhythm and the rhyme.',
      },
      {
        type: 'concept',
        label: 'Form',
        text: 'Sonnet? Free verse? Quatrains? The form shapes the meaning.',
      },
      {
        type: 'concept',
        label: 'Figures of speech',
        text: 'Simile = "like" or "as". Metaphor = direct comparison. Personification = human traits on objects.',
      },
      {
        type: 'concept',
        label: 'Sound devices',
        text: 'Alliteration = repeated consonants. Assonance = repeated vowels. Onomatopoeia = sound words. Rhyme = matching end sounds.',
      },
      {
        type: 'concept',
        label: 'Tone',
        text: 'What is the poet\'s attitude? Sad? Hopeful? Angry? Resigned?',
      },
      {
        type: 'concept',
        label: 'Theme',
        text: 'What is the poem about? Aging? Freedom? Guilt? Love?',
      },
      {
        type: 'example',
        scenario: 'A question asks: "Identify the figure of speech in \'There was hot fever in his blood\'."',
        steps: [
          'Is the fever literal? No — it represents guilt.',
          'No "like" or "as" — so it is not a simile.',
          'It is a direct comparison — a metaphor.',
          'Explain the effect: the fever represents the slave dealer\'s guilt.',
        ],
        answer: 'Metaphor — fever = guilt.',
      },
    ],
  },

  'poetry-themes': {
    sections: [
      { type: 'heading', text: 'Common themes in the prescribed poems.' },
      {
        type: 'concept',
        label: 'Aging (Sonnet 73)',
        text: 'The speaker compares himself to autumn, twilight and a dying fire. He is nearing the end of his life.',
      },
      {
        type: 'concept',
        label: 'Escape (Innisfree)',
        text: 'The speaker longs to escape the city and live simply on the island of Innisfree.',
      },
      {
        type: 'concept',
        label: 'Guilt (The Slave Dealer)',
        text: 'The speaker is haunted by the cruelty he committed. He cannot wash the blood from his hands.',
      },
      {
        type: 'concept',
        label: 'Wildness of nature (Inversnaid)',
        text: 'Nature is untamed, powerful and dangerous. It is both beautiful and threatening.',
      },
      {
        type: 'concept',
        label: 'Language (Hard to Find)',
        text: 'The speaker cannot find the right words when she needs them most.',
      },
      {
        type: 'example',
        scenario: 'How is aging shown in Sonnet 73?',
        steps: [
          'The poem compares the speaker to autumn — the middle age of life.',
          'Then to twilight — the end of the day.',
          'Then to a dying fire — the end of life.',
          'Every metaphor points to the same thing: he is aging.',
        ],
        answer: 'Autumn, twilight, dying fire — all metaphors for aging.',
      },
    ],
  },

  'poetry-imagery': {
    sections: [
      { type: 'heading', text: 'Imagery — how poets paint pictures with words.' },
      {
        type: 'concept',
        label: 'What is imagery?',
        text: 'Language that appeals to the five senses. What can you see, hear, feel, taste or smell?',
      },
      {
        type: 'concept',
        label: 'Visual imagery',
        text: '"Yellow leaves", "black night", "pitchblack pool" — pictures made of words.',
      },
      {
        type: 'concept',
        label: 'Sound imagery',
        text: '"Lapping", "roaring", "cricket sings" — sound words that put you in the scene.',
      },
      {
        type: 'concept',
        label: 'Metaphor and simile',
        text: 'Both compare two things. Simile uses "like" or "as". Metaphor does not.',
      },
      {
        type: 'concept',
        label: 'Symbolism',
        text: 'An object that stands for something bigger. In Sonnet 73, autumn = aging. In Slave Dealer, blood = guilt.',
      },
      {
        type: 'example',
        scenario: '"There was hot fever in his blood." What does this image suggest?',
        steps: [
          'Fever is not literal — he is not sick.',
          'Hot fever suggests restlessness and torment.',
          'It represents his guilt and regret.',
          'So the image shows the mind, not the body.',
        ],
        answer: 'The image of hot fever represents guilt and torment.',
      },
    ],
  },
};

// ================================================================
// AUTO SCRIPTS
// ================================================================
export const ENGLISH_AUTO_SCRIPTS = {
  // ================================================================
  // PAPER 1
  // ================================================================
  'comprehension-skills': {
    title: 'Comprehension Skills',
    sentences: [
      'Skim the text first. Get the big picture.',
      'Read the questions carefully. Underline key words.',
      'Go back to the text to find the answer.',
      '2 marks = 2 points. 3 marks = 3 points.',
      'If the question says "state TWO points", give TWO separate points.',
      'If it says "quote", copy the exact words from the text.',
      'If it says "in your own words", rewrite the idea.',
      'Open-ended questions: the mark is for the reason, not Yes or No.',
      'Check your answer. Did you answer the question that was asked?',
      'Do not copy long sentences verbatim. Paraphrase.',
    ],
  },

  'visual-literacy': {
    title: 'Visual Literacy',
    sentences: [
      'Pie charts show percentages of a whole.',
      'Read the title first — it tells you what the chart is about.',
      'Read the legend — it tells you what the colours mean.',
      'Bar charts: taller bars mean bigger values.',
      'Most chart questions ask: which is the highest? Which is the lowest?',
      'Compare slices or bars. Quote the number AND the label.',
      'Infographics combine pictures and words to give information.',
      'A legend without a title is useless — always read both.',
      'Look for the biggest and smallest numbers first.',
      'Answer with figures from the chart, not guesses.',
    ],
  },

  'summary-writing': {
    title: 'Summary Writing',
    sentences: [
      '7 points. 70 words. That is the limit.',
      'One sentence = one point.',
      'Do not copy the passage verbatim.',
      'Use your OWN words.',
      'Number your points 1 to 7.',
      'Do not write paragraphs. Do not use bullet points.',
      'If you quote 6-7 sentences, you lose ALL language marks.',
      'Count your words carefully.',
      'Do not include the word count in the 70.',
      'Trim the fat. Every word must earn its place.',
    ],
  },

  'advertisement-analysis': {
    title: 'Advertisement Analysis',
    sentences: [
      'The headline grabs attention. Capitals, big font, damaged letters.',
      'The visual creates emotion. A cute animal. A sad face. A burning bus.',
      'The slogan sticks in your mind.',
      'The call to action tells you what to do next.',
      'Logos at the bottom show who supports the message.',
      'The apostrophe shows possession OR contraction — check the question.',
      'Bold font = emphasis. Damaged letters = danger or destruction.',
      'Adverts persuade. Find the persuasion technique.',
      'The layout guides your eye — top to bottom, biggest to smallest.',
      'Tone words: urgent, friendly, serious, sarcastic.',
    ],
  },

  'cartoon-analysis': {
    title: 'Cartoon Analysis',
    sentences: [
      'Speech bubble = speaking. Thought bubble = thinking.',
      'Movement lines = moving or hitting something.',
      'Body language tells you how the character feels.',
      'Exclamation mark = shouting or sudden emotion.',
      'Question mark = confusion or doubt.',
      'Contrast: what is different between characters or frames?',
      'Verbal clue = what they say. Visual clue = what they do.',
      'Pain question needs ONE verbal and ONE visual clue.',
      'The joke usually lands in the last frame.',
      'Stereotypes: look for how the cartoonist exaggerates features.',
    ],
  },

  'grammar-and-punctuation': {
    title: 'Grammar and Punctuation',
    sentences: [
      'Tense: past, present, future.',
      'Voice: active (doer first) vs passive (action first).',
      'Direct speech: "He said, I am happy."',
      'Indirect speech: He said that he was happy.',
      'Change pronoun, change tense, remove quotation marks, add "that".',
      'Active to passive: object becomes subject, verb becomes was/were + past participle.',
      'Tag question: positive sentence gets negative tag.',
      'Negative form: add not or do not/does not.',
      'Homophones: same sound, different spelling and meaning.',
      'Their/there/they\'re. Allowed/aloud. Through/threw. New/knew.',
      'Parts of speech: noun, verb, adjective, adverb, preposition, article, conjunction.',
    ],
  },

  'vocabulary-and-context': {
    title: 'Vocabulary and Context',
    sentences: [
      'The same word can mean different things in different contexts.',
      'Read the whole sentence to figure out the meaning.',
      'Formal words: fashionable, remarkable, purchase.',
      'Informal words: trendy, cool, buy.',
      'Synonym = same meaning. Antonym = opposite meaning.',
      'Root word = base form. "Reporting" → "report".',
      'Apostrophe + s = possession (John\'s book).',
      'Apostrophe between letters = contraction (don\'t, we\'ll).',
      'Match the register: formal to formal, informal to informal.',
      'Guess intelligently using surrounding words.',
    ],
  },

  // ================================================================
  // PAPER 2
  // ================================================================
  'cry-plot': {
    title: 'Cry, the Beloved Country — Plot',
    sentences: [
      'Stephen Kumalo receives a letter about his sister Gertrude.',
      'He travels from Ndotsheni to Johannesburg to find her.',
      'Gertrude has become a prostitute.',
      'His son Absalom is missing.',
      'Stephen finds Absalom in prison for murder.',
      'Absalom killed Arthur Jarvis, the son of a rich white farmer.',
      'Stephen returns home with Gertrude\'s son and Absalom\'s pregnant wife.',
      'James Jarvis rebuilds Ndotsheni as an act of reconciliation.',
    ],
  },

  'cry-characters': {
    title: 'Cry, the Beloved Country — Characters',
    sentences: [
      'Stephen Kumalo is a priest searching for his family.',
      'John Kumalo is Stephen\'s brother — a powerful speaker but selfish.',
      'Absalom is Stephen\'s son — he kills Arthur Jarvis.',
      'James Jarvis is Arthur\'s father — he grieves, then rebuilds Ndotsheni.',
      'Msimangu is a priest in Johannesburg who helps Stephen.',
      'Gertrude is Stephen\'s sister — she has become a prostitute.',
      'Arthur Jarvis was a fighter for racial justice.',
      'Each character represents a different response to suffering.',
    ],
  },

  'cry-themes': {
    title: 'Cry, the Beloved Country — Themes',
    sentences: [
      'Hope is central — Kumalo brings hope to the broken.',
      'Regret shapes Jarvis, Gertrude and Absalom.',
      'Suffering is shown through Apartheid and family breakdown.',
      'Reconciliation is shown when Jarvis helps Ndotsheni.',
      'The land itself suffers — dry and unable to feed the people.',
      'Forgiveness is possible across the deepest divides.',
    ],
  },

  'cry-setting': {
    title: 'Cry, the Beloved Country — Setting',
    sentences: [
      'Ndotsheni is a rural village — dry and poor.',
      'Johannesburg is a big city — work, crime and sin.',
      'High Place is Jarvis\'s farm — rich and green.',
      'The contrast between the village and the city shapes the story.',
      'The journey from Ndotsheni to Johannesburg changes everything.',
      'The setting mirrors the brokenness of the country.',
    ],
  },

  'cry-context': {
    title: 'Cry, the Beloved Country — Contextual Questions',
    sentences: [
      'Read the extract twice — once for understanding, once for evidence.',
      'Quote exactly when the question says "quote".',
      'Paraphrase when the question says "in your own words".',
      'Ground every answer in the novel.',
      'Identify figures of speech: simile, metaphor, personification, irony.',
      'Name the tone, then explain why the character uses it.',
    ],
  },

  'cry-essay': {
    title: 'Cry, the Beloved Country — Essay',
    sentences: [
      'Introduction: hook + Line of Argument.',
      'Body: three points, each with evidence.',
      'Use PEEL: Point, Explain, Example, Link.',
      'Every point needs a specific example from the novel.',
      'Conclusion: restate your stance.',
      'No new points in the conclusion.',
    ],
  },

  'jekyll-plot': {
    title: 'Dr Jekyll and Mr Hyde — Plot',
    sentences: [
      'Mr Utterson, a lawyer, hears of a man named Mr Hyde.',
      'Hyde trampled a young girl in the street.',
      'Utterson discovers Hyde is the sole beneficiary of Jekyll\'s will.',
      'Hyde murders Sir Danvers Carew.',
      'Hyde disappears.',
      'Utterson breaks into Jekyll\'s laboratory.',
      'Both Hyde and Jekyll are found dead.',
      'Their statements reveal the truth: Jekyll created Hyde.',
    ],
  },

  'jekyll-characters': {
    title: 'Dr Jekyll and Mr Hyde — Characters',
    sentences: [
      'Mr Utterson is a lawyer — loyal, discreet, curious.',
      'Dr Jekyll is a respected scientist — he creates the potion.',
      'Mr Hyde is Jekyll\'s evil alter ego.',
      'Dr Lanyon is a fellow scientist who breaks with Jekyll.',
      'Mr Enfield is Utterson\'s friend who witnesses Hyde\'s cruelty.',
      'Mr Guest is Utterson\'s clerk — a handwriting expert.',
      'Poole is Jekyll\'s loyal butler.',
      'Each character represents a response to evil.',
    ],
  },

  'jekyll-themes': {
    title: 'Dr Jekyll and Mr Hyde — Themes',
    sentences: [
      'The duality of human nature — good and evil in every person.',
      'Reputation — Victorian society cared deeply about appearance.',
      'Friendship — Utterson is loyal; Lanyon breaks away.',
      'Conflict — Lanyon vs Jekyll; Jekyll vs Hyde.',
      'Secrecy — Jekyll hides his double life.',
      'The cost of repression — hiding who you are destroys you.',
    ],
  },

  'jekyll-duality': {
    title: 'Dr Jekyll and Mr Hyde — Duality',
    sentences: [
      'The potion does not create a new person — it frees what is inside.',
      'Hyde was always part of Jekyll.',
      'Jekyll\'s house faces the square — respectable.',
      'Hyde\'s laboratory opens onto a dark alley.',
      'The names tell the story: Jekyll = "I kill"; Hyde = "hide".',
      'Jekyll kills himself to escape becoming Hyde forever.',
    ],
  },

  'jekyll-context': {
    title: 'Dr Jekyll and Mr Hyde — Contextual Questions',
    sentences: [
      'Read the extract twice — once for understanding, once for evidence.',
      'Identify figures of speech: simile, metaphor, personification, irony.',
      'Tone questions: name the emotion, then explain why.',
      'Irony: Utterson believes Jekyll is innocent — but Jekyll is the murderer.',
      'Every answer must come from the extract or the novel.',
      'Quote exactly when the question says "quote".',
    ],
  },

  'jekyll-essay': {
    title: 'Dr Jekyll and Mr Hyde — Essay',
    sentences: [
      'Introduction: hook about duality or reputation + LOA.',
      'Body: three points, each with evidence.',
      'PEEL: Point, Explain, Example, Link.',
      'Use specific scenes — the trampling, the murder of Carew.',
      'Conclusion: restate your stance.',
      'No new points in the conclusion.',
    ],
  },

  'macbeth-plot': {
    title: 'Macbeth — Plot',
    sentences: [
      'Macbeth is a brave general who wins a battle for Duncan.',
      'Three witches prophesy he will become king.',
      'Lady Macbeth urges him to kill Duncan.',
      'Macbeth murders Duncan and becomes king.',
      'He orders the killing of Banquo and Macduff\'s family.',
      'Malcolm and Macduff attack Dunsinane.',
      'Macbeth is killed by Macduff.',
      'Malcolm becomes king.',
    ],
  },

  'macbeth-characters': {
    title: 'Macbeth — Characters',
    sentences: [
      'Macbeth — brave general, becomes a tyrant.',
      'Lady Macbeth — ambitious and manipulative.',
      'Banquo — loyal to Duncan, killed by Macbeth.',
      'Macduff — nobleman, kills Macbeth.',
      'Duncan — King of Scotland, murdered by Macbeth.',
      'Malcolm — Duncan\'s son, becomes king at the end.',
      'The witches — plant the seeds of ambition.',
      'Each character tests Macbeth in a different way.',
    ],
  },

  'macbeth-themes': {
    title: 'Macbeth — Themes',
    sentences: [
      'Ambition drives the play.',
      'Guilt haunts both Macbeth and Lady Macbeth.',
      'Betrayal — Macbeth betrays Duncan.',
      'Manhood — Lady Macbeth challenges Macbeth\'s manhood.',
      'Fate vs free will — did the witches cause it, or did Macbeth choose?',
      'Kingship — what makes a good king?',
    ],
  },

  'macbeth-ambition': {
    title: 'Macbeth — Ambition',
    sentences: [
      'Macbeth says ambition "o\'erleaps itself".',
      'The witches plant the seed — but never tell him to kill.',
      'Lady Macbeth pushes hardest.',
      'Macbeth could have waited — he chose murder.',
      'His ambition destroys him.',
      'Ambition is the engine of the tragedy.',
    ],
  },

  'macbeth-context': {
    title: 'Macbeth — Contextual Questions',
    sentences: [
      'Read the extract twice.',
      'Identify figures of speech: simile, metaphor, personification.',
      'Tone questions: name the emotion, then explain why.',
      'Director\'s questions: describe TWO physical actions.',
      'Dramatic irony: the audience knows what the character does not.',
      'Ground every answer in the play.',
    ],
  },

  'macbeth-essay': {
    title: 'Macbeth — Essay',
    sentences: [
      'Introduction: hook about ambition, guilt or betrayal + LOA.',
      'Body: three points with evidence.',
      'PEEL: Point, Explain, Example, Link.',
      'Specific scenes: the murder of Duncan, Banquo\'s ghost.',
      'Conclusion: restate your stance.',
      'No new points in the conclusion.',
    ],
  },

  'mcma-plot': {
    title: 'My Children! My Africa! — Plot',
    sentences: [
      'Mr M is a devoted teacher at Zolile High.',
      'He pairs Thami with Isabel, a white girl from Camdeboo.',
      'They compete in a literary quiz — and win.',
      'The boycotts grow. Thami joins the struggle.',
      'Mr M is seen as a collaborator.',
      'The mob kills Mr M.',
      'Isabel refuses to give up on Thami.',
    ],
  },

  'mcma-characters': {
    title: 'My Children! My Africa! — Characters',
    sentences: [
      'Mr M — devoted teacher who dies at the hands of his learners.',
      'Thami — brilliant pupil torn between school and the struggle.',
      'Isabel — white girl who learns about apartheid through Thami.',
      'Miss Brockway — Isabel\'s teacher who helps set up the quiz.',
      'The Comrades — youth-led movement within the struggle.',
      'Each character responds to apartheid differently.',
    ],
  },

  'mcma-themes': {
    title: 'My Children! My Africa! — Themes',
    sentences: [
      'Racial injustice — Bantu Education, Group Areas Act.',
      'Education — can it free the oppressed?',
      'Teamwork — Isabel and Thami work together.',
      'Communication — the play is built on conversations.',
      'Hope — Isabel represents hope for the future.',
      'Violence — the cost of the struggle.',
    ],
  },

  'mcma-apartheid': {
    title: 'My Children! My Africa! — Apartheid Context',
    sentences: [
      'Bantu Education — inferior schooling for Black South Africans.',
      'The boycotts — learners protest against inferior education.',
      'The Comrades — youth-led movement within the struggle.',
      'Mr M is seen as a collaborator because he reports names.',
      'The play is set in the 1980s, at the height of the struggle.',
      'Understanding apartheid helps you understand the play.',
    ],
  },

  'mcma-context': {
    title: 'My Children! My Africa! — Contextual Questions',
    sentences: [
      'Read the extract twice.',
      'Identify figures of speech: simile, metaphor, rhetorical question.',
      'Tone questions: name the emotion, then explain why.',
      'Director\'s questions: describe TWO physical actions.',
      'Ground every answer in the play.',
      'Quote exactly when the question says "quote".',
    ],
  },

  'mcma-essay': {
    title: 'My Children! My Africa! — Essay',
    sentences: [
      'Introduction: hook about education, apartheid or hope + LOA.',
      'Body: three points with evidence.',
      'PEEL: Point, Explain, Example, Link.',
      'Specific scenes: the literary quiz, Mr M\'s death.',
      'Conclusion: restate your stance.',
      'No new points in the conclusion.',
    ],
  },

  'short-stories-technique': {
    title: 'Short Stories — Technique',
    sentences: [
      'Every story has setting, characters, plot and conflict.',
      'Setting = time and place.',
      'Conflict = person vs person, person vs society, person vs self.',
      'Theme = what the story is about.',
      'Figures of speech: simile, metaphor, personification.',
      'For contextual questions: read twice, quote when asked.',
    ],
  },

  'short-stories-themes': {
    title: 'Short Stories — Themes',
    sentences: [
      'Betrayal in "Rejection" — Modou takes a second wife.',
      'Freedom in "Eveline" — she chooses to stay.',
      'Kindness in "Triumph in the Face of Adversity".',
      'Guilt in "The Slave Dealer" — he cannot pray.',
      'Childhood in "The Wind and a Boy" — free but tragic.',
      'Every story has a central theme.',
    ],
  },

  'short-stories-characters': {
    title: 'Short Stories — Characters',
    sentences: [
      'Eveline — a young woman trapped in Dublin.',
      'Frank — a sailor who wants to marry Eveline.',
      'Narrator in "Rejection" — betrayed by Modou.',
      'Thulisile in "Triumph" — rises above her circumstances.',
      'Friedman in "The Wind and a Boy" — loved but dies young.',
      'The Slave Dealer — haunted by his cruelty.',
    ],
  },

  'poetry-technique': {
    title: 'Poetry — Technique',
    sentences: [
      'Poetry is sound — read it out loud.',
      'Form matters: sonnet, free verse, quatrains.',
      'Figures of speech: simile, metaphor, personification.',
      'Sound devices: alliteration, assonance, onomatopoeia, rhyme.',
      'Tone = the poet\'s attitude.',
      'Theme = what the poem is about.',
    ],
  },

  'poetry-themes': {
    title: 'Poetry — Themes',
    sentences: [
      'Aging in Sonnet 73 — autumn, twilight, dying fire.',
      'Escape in Innisfree — longing for a simpler life.',
      'Guilt in The Slave Dealer — blood on his hands.',
      'Wildness of nature in Inversnaid.',
      'Language in Hard to Find — words fail the heart.',
      'Each poem carries a central theme.',
    ],
  },

  'poetry-imagery': {
    title: 'Poetry — Imagery',
    sentences: [
      'Imagery appeals to the five senses.',
      'Visual imagery paints pictures — "yellow leaves", "black night".',
      'Sound imagery puts you in the scene — "lapping", "cricket sings".',
      'Metaphor and simile both compare two things.',
      'Simile uses "like" or "as"; metaphor does not.',
      'Symbolism: autumn = aging; blood = guilt.',
    ],
  },
};

export const ENGLISH_AUTO_ORDER = [
  // Paper 1
  'comprehension-skills',
  'visual-literacy',
  'summary-writing',
  'advertisement-analysis',
  'cartoon-analysis',
  'grammar-and-punctuation',
  'vocabulary-and-context',
  // Paper 2
  'cry-plot',
  'cry-characters',
  'cry-themes',
  'cry-setting',
  'cry-context',
  'cry-essay',
  'jekyll-plot',
  'jekyll-characters',
  'jekyll-themes',
  'jekyll-duality',
  'jekyll-context',
  'jekyll-essay',
  'macbeth-plot',
  'macbeth-characters',
  'macbeth-themes',
  'macbeth-ambition',
  'macbeth-context',
  'macbeth-essay',
  'mcma-plot',
  'mcma-characters',
  'mcma-themes',
  'mcma-apartheid',
  'mcma-context',
  'mcma-essay',
  'short-stories-technique',
  'short-stories-themes',
  'short-stories-characters',
  'poetry-technique',
  'poetry-themes',
  'poetry-imagery',
];