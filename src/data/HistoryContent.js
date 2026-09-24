// ================================================================
// HISTORY — PAPERS 1 & 2 (MERGED)
// Teaching scripts (guided learning) + Auto scripts (exam prep)
// P1: NSC History P1 papers 2021, 2022, 2023, 2024, 2025 — 14 concepts
// P2: NSC History P2 papers 2023, 2024, 2025 — 22 concepts
// Total: 36 concepts — full CAPS P1 + P2 coverage
// ================================================================

export const HISTORY_TEACHING_SCRIPTS = {

  // ================================================================
  // PAPER 1 — 14 concepts (unchanged)
  // ================================================================

  // ----------------------------------------------------------------
  // 1. COLD WAR ORIGINS
  // ----------------------------------------------------------------
  'cold-war-origins': {
    sections: [
      { type: 'heading', text: "Let's start with the Cold War." },
      {
        type: 'scene',
        sceneId: 'cold-war-origins',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Origins of the Cold War' },
        caption: 'Two superpowers. One divided world. Zero trust.',
        stepTexts: [
          null,
          'After WWII, only two big powers were left standing: the USA and the USSR.',
          'The USA was capitalist. The USSR was communist. Two ideas that could not coexist.',
          'Europe was split into two spheres. The West followed the USA. The East followed the USSR.',
          'Churchill called it the Iron Curtain — a symbolic line dividing Europe.',
        ],
      },
      {
        type: 'concept',
        label: 'The big idea',
        text: 'The Cold War was not a real war. The USA and USSR never fought each other directly. They fought through other countries. Why? Because both had nuclear weapons — a direct war would destroy everyone.',
      },
      {
        type: 'concept',
        label: 'The policy of containment',
        text: 'The USA decided to contain communism — stop it spreading. Not fight it, just hold the line. Every country that went communist was seen as a domino falling toward the USA.',
      },
      {
        type: 'concept',
        label: 'The Marshall Plan',
        text: 'The USA gave billions in aid to Western Europe. Why? To rebuild their economies so they would not fall to communism. The USSR saw this as economic warfare and created the Molotov Plan in return.',
      },
      {
        type: 'example',
        scenario: 'Imagine the USA and USSR are two popular kids at school. They never fight each other directly — they turn other kids against each other.',
        steps: [
          'The USA supports one group of friends.',
          'The USSR supports the other group.',
          'Whichever side has more friends, wins.',
          'That is the Cold War in one picture.',
        ],
        answer: 'The Cold War was fought through allies, not directly.',
        sceneId: 'cold-war-origins',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 2. COLD WAR — CONTAINMENT
  // ----------------------------------------------------------------
  'cold-war-containment': {
    sections: [
      { type: 'heading', text: 'Containment — how the USA planned to stop communism.' },
      {
        type: 'scene',
        sceneId: 'containment-marshall',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Policy of Containment' },
        caption: 'Two plans. Two sides. One Europe split down the middle.',
        stepTexts: [
          null,
          'The USA poured money into Western Europe. This was the Marshall Plan.',
          'The USSR responded with the Molotov Plan — money for the East.',
          'Two economies, two ideologies, two camps. The Iron Curtain ran right between them.',
          'Every country that took US aid stayed capitalist. Every country that took Soviet aid went communist.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Containment means: do not fight communism, just stop it from spreading. If one country fell, the next would follow. This was the Domino Theory.',
      },
      {
        type: 'bullets',
        label: 'The tools of containment',
        items: [
          'Truman Doctrine — USA gives military aid to countries threatened by communism.',
          'Marshall Plan — USA gives economic aid to rebuild Western Europe.',
          'NATO — military alliance of the West against the USSR.',
          'Molotov Plan — USSR response: aid for Eastern Europe.',
          'COMECON — Soviet economic alliance to rival the Marshall Plan.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine a row of dominos. If one falls, the next falls, then the next. The USA was terrified of the first domino.',
        steps: [
          'Greece was threatened by communism — USA sent money.',
          'Turkey was threatened — USA sent money.',
          'Western Europe was weak — USA sent billions.',
          'Containment held the line. The dominos did not fall.',
        ],
        answer: 'Containment was the USA holding the line against communism, one country at a time.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 3. COLD WAR — BERLIN 1948
  // ----------------------------------------------------------------
  'cold-war-berlin-1948': {
    sections: [
      { type: 'heading', text: 'Berlin, 1948 — the first real flashpoint of the Cold War.' },
      {
        type: 'scene',
        sceneId: 'berlin-blockade-1948',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Berlin Blockade' },
        caption: 'A city deep inside Soviet territory — kept alive from the air.',
        stepTexts: [
          null,
          'After WWII, Germany was split into four zones. Berlin, deep inside the Soviet zone, was also split into four.',
          'In 1948, Stalin blocked all land routes into West Berlin. No food. No coal. No supplies.',
          'The USA refused to leave. Instead of fighting, they flew. The Berlin Airlift.',
          'For over a year, planes landed every few minutes, day and night. Stalin gave up. The blockade failed.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Berlin was the West\u2019s outpost deep inside Soviet territory. If the West gave it up, containment would fail. So the West did the only thing that avoided war — they flew the supplies in.',
      },
      {
        type: 'example',
        scenario: 'Imagine your house is surrounded. No roads in or out. But you have a helicopter.',
        steps: [
          'Stalin blocked the roads.',
          'The West flew in food, coal and medicine.',
          'Planes landed every 90 seconds.',
          'Stalin could not shoot them down without starting a war.',
        ],
        answer: 'The Berlin Airlift beat the blockade — without firing a single shot.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 4. BERLIN WALL
  // ----------------------------------------------------------------
  'berlin-wall': {
    sections: [
      { type: 'heading', text: 'The Berlin Wall — one night that changed everything.' },
      {
        type: 'scene',
        sceneId: 'berlin-wall',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Berlin Wall' },
        caption: 'August 13, 1961. Overnight. Families divided.',
        stepTexts: [
          null,
          'Berlin was deep inside the Soviet zone, but divided into four parts.',
          'West Berlin was capitalist. East Berlin was communist.',
          'Thousands of East Berliners fled west every day — for freedom, jobs, and a better life.',
          'On 13 August 1961, the East German government built the wall overnight. Barbed wire, tanks, soldiers.',
        ],
      },
      {
        type: 'concept',
        label: 'Why the wall was built',
        text: 'The German Democratic Republic (GDR) was losing its people and its credibility. The wall stopped the fleeing. But it also destroyed families, cut off workers from their jobs, and trapped East Berliners behind barbed wire.',
      },
      {
        type: 'concept',
        label: 'What life was like',
        text: 'Separated families could only wave at each other through the wire. Some dug tunnels — some died trying. Some athletes used sports trips to defect. Some drove cars into the wall.',
      },
      {
        type: 'concept',
        label: 'The symbolism',
        text: 'The wall became the symbol of the Cold War. A physical line between two ideologies. Capitalism on one side, communism on the other.',
      },
      {
        type: 'example',
        scenario: 'Imagine you live in East Berlin and work in West Berlin. On 13 August 1961, you cannot cross the border anymore.',
        steps: [
          'You lose your job.',
          'You cannot see your family on the other side.',
          'Your only contact is waving through barbed wire.',
          'Some people tried to escape. Many died.',
        ],
        answer: 'The wall destroyed lives overnight.',
        sceneId: 'berlin-wall',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 5. VIETNAM WAR
  // ----------------------------------------------------------------
  'cold-war-vietnam': {
    sections: [
      { type: 'heading', text: 'The Vietnam War — how farmers beat a superpower.' },
      {
        type: 'scene',
        sceneId: 'cold-war-vietnam',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Vietnam War' },
        caption: 'Technology vs tunnels. Bombs vs jungle.',
        stepTexts: [
          null,
          'Vietnam was split. North was communist. South was capitalist and backed by the USA.',
          'The USA sent troops, bombs, and chemicals. The Vietcong had tunnels, jungle, and patience.',
          'The Vietcong hit and ran. Booby traps. Sabotage. Underground tunnels that were too small for American soldiers.',
          'The USA lost. Not on the battlefield — at home. The American public turned against the war.',
        ],
      },
      {
        type: 'concept',
        label: 'Why the USA lost',
        text: 'The USA fought a conventional war. The Vietcong fought a guerrilla war. A superpower with tanks and planes cannot beat guerrillas who know the jungle, who live among the villages, and who never give up.',
      },
      {
        type: 'concept',
        label: 'The turning points',
        text: 'Tet Offensive (1968) — Vietcong attacked 100 cities at once. My Lai Massacre (1968) — American soldiers killed civilians, turning the world against the USA. The American public turned against the war.',
      },
      {
        type: 'concept',
        label: 'The ending',
        text: 'President Nixon signed the Paris Peace Accords in 1973 and withdrew all troops. By 1975, North Vietnam took Saigon. Vietnam was united under communism. The USA lost its first major war.',
      },
      {
        type: 'example',
        scenario: 'Imagine you are a Vietcong fighter. You have no tanks, no planes, no modern weapons. But you have something the Americans do not have: the jungle, and time.',
        steps: [
          'You hide in tunnels the Americans cannot fit into.',
          'You set booby traps in the jungle.',
          'You hit and run. Never stand and fight.',
          'You wait. The Americans will go home. You never will.',
        ],
        answer: 'Guerrilla warfare beat technology.',
        sceneId: 'cold-war-vietnam',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 6. ANGOLA
  // ----------------------------------------------------------------
  'independent-africa-angola': {
    sections: [
      { type: 'heading', text: 'Angola — three movements, one country.' },
      {
        type: 'scene',
        sceneId: 'independent-africa-angola',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Angola' },
        caption: 'Independence came. Peace did not.',
        stepTexts: [
          null,
          'Angola was a Portuguese colony. Portugal left in 1975, and independence came suddenly.',
          'Three nationalist movements wanted to rule: MPLA, FNLA, and UNITA.',
          'Each movement represented different ethnic groups and different regions.',
          'The Cold War moved into Angola. The USA, USSR, Cuba, and South Africa all picked sides.',
        ],
      },
      {
        type: 'concept',
        label: 'The three movements',
        text: 'MPLA — led by Agostinho Neto, socialist, backed by Cuba and the USSR. FNLA — led by Holden Roberto, backed by the USA and Mobutu. UNITA — led by Jonas Savimbi, backed by the USA and South Africa.',
      },
      {
        type: 'concept',
        label: 'Why the war happened',
        text: 'Portugal left without setting up a stable transition. All three movements wanted to rule. No one trusted the others. The Cold War superpowers poured in weapons. Civil war broke out in 1975.',
      },
      {
        type: 'concept',
        label: 'The consequences',
        text: 'The MPLA won the first round and captured Luanda, the capital. But the war dragged on for decades. Angola was destroyed. Ordinary people suffered the most.',
      },
      {
        type: 'example',
        scenario: 'Imagine three brothers fighting over a house. Then imagine every neighbor on the street picks a brother to support — with weapons.',
        steps: [
          'The brothers fight among themselves.',
          'Neighbors join in and make it bigger.',
          'The house burns down.',
          'Everyone loses — except the weapons dealers.',
        ],
        answer: 'Angola\u2019s civil war was a proxy war — a local fight turned into a Cold War battlefield.',
        sceneId: 'independent-africa-angola',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 7. CUITO CUANAVALE
  // ----------------------------------------------------------------
  'cuito-cuanavale': {
    sections: [
      { type: 'heading', text: 'Cuito Cuanavale — the battle that changed southern Africa.' },
      {
        type: 'scene',
        sceneId: 'cuito-cuanavale',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Battle of Cuito Cuanavale' },
        caption: '1987–1988. Angola. Cuba vs South Africa.',
        stepTexts: [
          null,
          'South African forces pushed into Angola to stop the MPLA and support UNITA.',
          'Cuba sent troops to defend the MPLA. Soviet weapons. Angolan air superiority.',
          'The SADF could not win. The siege failed. Cuba held the line.',
          'The defeat forced South Africa to the negotiating table. The Tripartite Accord. Namibian independence.',
        ],
      },
      {
        type: 'concept',
        label: 'Why it mattered',
        text: 'Cuito Cuanavale was the first time the apartheid army was stopped in a major battle. It broke the myth of white South African military invincibility. It forced negotiations that led to Namibian independence.',
      },
      {
        type: 'concept',
        label: 'The Tripartite Accord',
        text: 'Signed in 1988. Three parties: Angola, Cuba, South Africa. Result: Cuban troops withdrew from Angola, South African troops withdrew from Angola and Namibia, and Namibia got independence in 1990.',
      },
      {
        type: 'example',
        scenario: 'Imagine you are the South African Defence Force. You have modern weapons. But your enemy has air superiority, more troops, and the will to hold.',
        steps: [
          'You push into Angola.',
          'You get stuck at Cuito Cuanavale.',
          'You cannot take the airfield.',
          'You have to negotiate.',
        ],
        answer: 'Cuito Cuanavale was where apartheid\u2019s regional dominance ended.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 8. CONGO — MOBUTU
  // ----------------------------------------------------------------
  'independent-africa-congo': {
    sections: [
      { type: 'heading', text: 'Congo — the country that was robbed by its own leader.' },
      {
        type: 'scene',
        sceneId: 'independent-africa-congo',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Congo under Mobutu' },
        caption: 'Richest country in Africa. Poorest people.',
        stepTexts: [
          null,
          'Congo was one of the richest countries in Africa. Copper, cobalt, diamonds.',
          'But the wealth was owned by Belgium during colonial rule. At independence, Congo inherited a broken system.',
          'Mobutu Sese Seko seized power in a coup in 1965. He promised stability.',
          'He gave his people stability — but he also gave himself the country\u2019s wealth.',
        ],
      },
      {
        type: 'concept',
        label: 'What Mobutu did',
        text: 'Mobutu banned opposition parties. Made himself "president for life". Invented a personality cult called Mobutuism. Supported by the USA because he was anti-communist.',
      },
      {
        type: 'concept',
        label: 'Zaireanisation',
        text: 'Mobutu kicked out foreign owners and gave their businesses to his friends and family. But his friends were not trained. Businesses collapsed. Money was stolen. The economy crashed.',
      },
      {
        type: 'concept',
        label: 'The cultural show',
        text: 'Mobutu renamed the country Zaire. Renamed cities with African names. Banned Western suits. Encouraged African music, art, and hairstyles. He called it "Authenticité".',
      },
      {
        type: 'example',
        scenario: 'Imagine you are given a well-run company because you are the president\u2019s cousin. You fire the trained managers. You hire your friends.',
        steps: [
          'The company loses money.',
          'You blame foreign interference.',
          'You keep stealing the money.',
          'The company collapses — but you stay rich.',
        ],
        answer: 'That was Mobutu\u2019s Congo — kleptocracy, not development.',
        sceneId: 'independent-africa-congo',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 9. SIT-INS
  // ----------------------------------------------------------------
  'civil-rights-sit-ins': {
    sections: [
      { type: 'heading', text: 'Sit-ins — the protest that spread like wildfire.' },
      {
        type: 'scene',
        sceneId: 'civil-rights-sit-ins',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Sit-In Movement' },
        caption: '1 February 1960. Greensboro. Four students. One lunch counter.',
        stepTexts: [
          null,
          'Four Black students sat at a segregated Woolworth\u2019s lunch counter in Greensboro.',
          'They were refused service. They stayed anyway. Every day, more students joined them.',
          'Within a week, over 1,000 students were sitting in across the South.',
          'By April, 50,000 had joined. Lunch counters began to desegregate.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Sit-ins worked because they were peaceful, visible, and impossible to ignore. The protesters took up space where they were not welcome — and refused to leave until the law changed.',
      },
      {
        type: 'concept',
        label: 'The other sit-ins',
        text: 'Sit-ins became a whole family of protests. Kneel-ins at churches. Read-ins at libraries. Wade-ins at beaches. Swim-ins at pools. The Tougaloo Nine sat in at a whites-only library in Mississippi and were arrested.',
      },
      {
        type: 'example',
        scenario: 'Imagine sitting at a lunch counter. The staff ignore you. People shout at you. Police come. You do not move.',
        steps: [
          'You stay seated.',
          'The next day, more students join.',
          'The day after, more.',
          'The business loses money. The law changes.',
        ],
        answer: 'Sit-ins turned a lunch counter into a national crisis.',
        sceneId: 'civil-rights-sit-ins',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 10. SELMA TO MONTGOMERY
  // ----------------------------------------------------------------
  'civil-rights-selma': {
    sections: [
      { type: 'heading', text: 'Selma to Montgomery — the march that gave Black Americans the vote.' },
      {
        type: 'scene',
        sceneId: 'civil-rights-selma',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Selma to Montgomery, 1965' },
        caption: 'Three marches. One bridge. Bloody Sunday.',
        stepTexts: [
          null,
          'In 1965, only 2% of Black people in Selma were registered to vote. Segregationists blocked every attempt.',
          'On 7 March, 600 marchers crossed the Edmund Pettus Bridge — and were attacked by state troopers with clubs and tear gas. Bloody Sunday.',
          'The violence was televised. The world saw it. A second march followed. Then a third — protected by the National Guard.',
          'On 25 March, 25,000 marchers reached Montgomery. Five months later, the Voting Rights Act was signed.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Selma worked because the violence was public. When the world saw peaceful marchers being beaten on live TV, the moral case for voting rights became unanswerable.',
      },
      {
        type: 'concept',
        label: 'The outcome',
        text: 'The Voting Rights Act of 1965 banned literacy tests, banned poll taxes, and put federal oversight on states with a history of voter suppression. Black voter registration in the South skyrocketed.',
      },
      {
        type: 'example',
        scenario: 'Imagine trying to vote. You are told you must pass a test the registrar invents on the spot. You fail. You try again. You fail again.',
        steps: [
          'This happens to thousands of Black citizens.',
          'They march to demand the right to vote.',
          'They are beaten on national TV.',
          'The nation is forced to act.',
        ],
        answer: 'Selma was where the vote was won — by walking into violence.',
        sceneId: 'civil-rights-selma',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 11. FREEDOM RIDES
  // ----------------------------------------------------------------
  'civil-rights-freedom-rides': {
    sections: [
      { type: 'heading', text: 'The Freedom Rides — buses that changed America.' },
      {
        type: 'scene',
        sceneId: 'civil-rights-freedom-rides',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Freedom Rides' },
        caption: 'Buses on fire. Attackers with clubs. Riders who kept going.',
        stepTexts: [
          null,
          'In 1961, Black and white activists boarded buses together and travelled through the American South.',
          'They were testing whether the Supreme Court ruling desegregating buses was being followed.',
          'Southern states refused. Mobs attacked them. Buses were firebombed.',
          'But they kept going. Every attack was photographed, televised, and shown around the world.',
        ],
      },
      {
        type: 'concept',
        label: 'Why they did it',
        text: 'The Supreme Court said segregated buses were illegal. Southern states ignored the ruling. The Freedom Riders wanted to force the federal government to enforce the law.',
      },
      {
        type: 'concept',
        label: 'What happened to them',
        text: 'They were beaten by mobs. Buses were bombed. Hospitals refused to treat them. Police arrested them. They were told they were "rabble-rousers" and did not deserve protection.',
      },
      {
        type: 'concept',
        label: 'Why it worked',
        text: 'The violence was televised. The world saw it. President Kennedy was forced to act. Segregated buses were desegregated by the end of 1961. Ordinary people forced the government to follow the law.',
      },
      {
        type: 'example',
        scenario: 'Imagine a bus full of young people — Black and white — singing while a mob throws stones at them. They do not fight back.',
        steps: [
          'The attackers want a fight.',
          'The riders give them none.',
          'The cameras capture everything.',
          'The world turns against the attackers.',
        ],
        answer: 'Non-violence was the weapon. Cameras were the proof.',
        sceneId: 'civil-rights-freedom-rides',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 12. MARCH ON WASHINGTON
  // ----------------------------------------------------------------
  'march-on-washington': {
    sections: [
      { type: 'heading', text: 'The March on Washington — 28 August 1963.' },
      {
        type: 'scene',
        sceneId: 'march-on-washington',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The March on Washington' },
        caption: '250,000 people. One speech. One dream.',
        stepTexts: [
          null,
          '250,000 people gathered at the Lincoln Memorial. Black and white. From every state.',
          'They came for jobs and freedom. The placards said it plainly.',
          'Martin Luther King Jr stepped up to the microphone.',
          'He spoke for 17 minutes. "I have a dream." The world listened.',
        ],
      },
      {
        type: 'bullets',
        label: 'What the marchers demanded',
        items: [
          'An end to police brutality — now.',
          'Jobs for all — now.',
          'Integrated schools — now.',
          'Voting rights — now.',
          'A higher minimum wage for all workers — now.',
        ],
      },
      {
        type: 'concept',
        label: 'Why it mattered',
        text: 'It was the largest peaceful protest in US history. It was televised worldwide. It put pressure on Kennedy and Congress to pass the Civil Rights Act. That law was signed in 1964 — a year later.',
      },
      {
        type: 'example',
        scenario: 'Imagine a crowd so big it fills the space between the Lincoln Memorial and the Washington Monument. All of them, silent, when King speaks.',
        steps: [
          'The cameras roll.',
          'The world watches.',
          'Kennedy watches from the White House.',
          'Congress is forced to act.',
        ],
        answer: 'The March on Washington turned a protest into a national moment.',
        sceneId: 'march-on-washington',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 13. MLK NON-VIOLENCE
  // ----------------------------------------------------------------
  'mlk-non-violence': {
    sections: [
      { type: 'heading', text: 'Martin Luther King Jr — the power of not hitting back.' },
      {
        type: 'scene',
        sceneId: 'mlk-non-violence',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Non-Violent Approach' },
        caption: 'Gandhi → King → the sit-ins.',
        stepTexts: [
          null,
          'King learned non-violence from Gandhi. Gandhi had used it to free India from Britain.',
          'King brought it to the American South. Sit-ins. Marches. Boycotts. Never fight back.',
          'Protestors were trained. When hit, do not hit back. When spat on, do not respond.',
          'The cameras captured every attack. The world saw who the real aggressors were.',
        ],
      },
      {
        type: 'concept',
        label: 'The philosophy',
        text: 'Non-violence was not weakness. It was strategy. If your side never hits back, the only violence on camera is the other side\u2019s. That builds sympathy. That forces change.',
      },
      {
        type: 'concept',
        label: 'The method',
        text: 'Sit-ins at segregated lunch counters. Freedom Rides on segregated buses. Boycotts of segregated businesses. Every action was disciplined, peaceful, and photographed.',
      },
      {
        type: 'example',
        scenario: 'Imagine you are at a lunch counter. A mob surrounds you. They throw food. They spit. They hit you.',
        steps: [
          'You do not move.',
          'You do not respond.',
          'The cameras record everything.',
          'The next day, the whole country sees who the real thugs are.',
        ],
        answer: 'Non-violence turned every attack into evidence against the attackers.',
        sceneId: 'mlk-non-violence',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 14. BLACK POWER MOVEMENT
  // ----------------------------------------------------------------
  'black-power-movement': {
    sections: [
      { type: 'heading', text: 'The Black Power Movement — when patience ran out.' },
      {
        type: 'scene',
        sceneId: 'black-power-movement',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Black Power Movement' },
        caption: 'Black is beautiful. And we will defend ourselves.',
        stepTexts: [
          null,
          'By the late 1960s, many African Americans were tired of non-violence. They wanted faster change.',
          'Malcolm X preached self-defence. "By any means necessary."',
          'Stokely Carmichael said Black people should control their own communities and celebrate their own identity.',
          'The Black Panther Party patrolled the streets, ran schools, fed children, and demanded Black history be taught.',
        ],
      },
      {
        type: 'concept',
        label: 'The philosophy',
        text: 'Black Power meant: self-respect, self-reliance, and self-defence. "Black is beautiful." No more waiting for change. No more depending on white allies.',
      },
      {
        type: 'concept',
        label: 'The tactics',
        text: 'Malcolm X — armed self-defence. Carmichael — separate Black institutions. Black Panthers — "policing the police" and community programmes.',
      },
      {
        type: 'concept',
        label: 'The successes',
        text: 'A generation of Black pride. Afro hairstyles, African names, African clothing. The Black Panther feeding schemes fed thousands. Literacy programmes taught people to read. A whole new identity was built.',
      },
      {
        type: 'example',
        scenario: 'Imagine you have been peacefully protesting for years. Nothing changes. People still beat you in the street. Then someone says: "We should protect ourselves."',
        steps: [
          'The crowd changes.',
          'The message changes.',
          'Black pride is born.',
          'A movement is born.',
        ],
        answer: 'Black Power was born from frustration with slow change.',
        sceneId: 'black-power-movement',
      },
    ],
  },

  // ================================================================
  // PAPER 2 — 22 NEW CONCEPTS
  // ================================================================

  // ----------------------------------------------------------------
  // P2-1. BLACK CONSCIOUSNESS — NATURE & AIMS
  // ----------------------------------------------------------------
  'p2-bc-nature-aims': {
    sections: [
      { type: 'heading', text: 'Black Consciousness — a state of mind before a movement.' },
      {
        type: 'scene',
        sceneId: 'p2-bc-nature-aims',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Nature and Aims of Black Consciousness' },
        caption: 'Before you can free a country, you must free a mind.',
        stepTexts: [
          null,
          'After Sharpeville (1960), the ANC and PAC were banned. Black opposition went silent.',
          'In the vacuum, a new idea grew — not about politics first, but about the mind.',
          'Steve Biko and others said: Black South Africans must free themselves — psychologically — before politically.',
          'This was Black Consciousness. A philosophy of pride, self-reliance, and mental liberation.',
        ],
      },
      {
        type: 'concept',
        label: 'The core idea',
        text: 'BC said Black South Africans had been taught to see themselves as inferior. Real liberation had to start inside — rejecting the inferiority, reclaiming Black identity, and refusing to depend on white help.',
      },
      {
        type: 'bullets',
        label: 'The aims of Black Consciousness',
        items: [
          'Restore Black pride and self-respect.',
          'Reject the inferiority complex created by apartheid.',
          'Promote self-reliance — Black people solving Black problems.',
          'Unite Black students, workers, and communities.',
          'Challenge apartheid psychologically and politically.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine you have been told your whole life that your skin, your hair, your language are "less than". BC said: that is the first lie you must kill.',
        steps: [
          'You look in the mirror and see yourself as you are.',
          'You stop using skin lighteners.',
          'You let your hair grow natural.',
          'You start building your own institutions.',
        ],
        answer: 'Black Consciousness was mental freedom first — political freedom second.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-2. BLACK CONSCIOUSNESS — ORGANISATIONS
  // ----------------------------------------------------------------
  'p2-bcm-organisations': {
    sections: [
      { type: 'heading', text: 'The organisations of Black Consciousness.' },
      {
        type: 'scene',
        sceneId: 'p2-bcm-organisations',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Black Consciousness Movement' },
        caption: 'From students to workers to whole communities.',
        stepTexts: [
          null,
          'In 1968, Black students broke away from NUSAS and formed SASO — the South African Students Organisation.',
          'SASO was for university students. SASM (South African Students Movement) was for schools.',
          'In 1972, the Black Peoples Convention (BPC) was formed — students, churches, communities, and workers together.',
          'The Black Allied Workers Union (BAWU) brought workers into the movement.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key BC organisations',
        items: [
          'SASO (1968) — South African Students Organisation. Led by Steve Biko.',
          'SASM (1972) — South African Students Movement. High school learners.',
          'BPC (1972) — Black Peoples Convention. The umbrella body.',
          'BAWU — Black Allied Workers Union. Workers wing.',
          'Black Community Programmes — health, education, and self-help projects.',
        ],
      },
      {
        type: 'concept',
        label: 'The community programmes',
        text: 'When Biko was banned in 1973, BC turned to community projects. The Zanempilo Health Clinic. The Ginsburg Educational Trust. The Zimele Trust Fund. Solempilo and Ithuseng Health Centres. These weren\u2019t politics — they were proof that Black people could solve their own problems.',
      },
      {
        type: 'example',
        scenario: 'Imagine the government has banned every political party. Where do you organise? In the gaps — in student groups, clinics, literacy classes, and community trusts.',
        steps: [
          'The state watches the parties.',
          'It does not watch the clinics.',
          'The clinics feed people and teach them.',
          'The movement survives underground.',
        ],
        answer: 'Community programmes kept BC alive when politics was banned.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-3. SOWETO 1976
  // ----------------------------------------------------------------
  'p2-soweto-1976': {
    sections: [
      { type: 'heading', text: 'Soweto, 16 June 1976 — the day the youth rose.' },
      {
        type: 'scene',
        sceneId: 'p2-soweto-1976',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Soweto Uprising' },
        caption: 'Afrikaans as a language of instruction. And a generation that said no.',
        stepTexts: [
          null,
          'In 1974, the government forced Afrikaans as a medium of instruction in Black schools.',
          'Afrikaans was seen as the language of the oppressor. Students refused.',
          'On 16 June 1976, thousands of learners marched in Soweto to protest.',
          'Police opened fire. Hector Pieterson, aged 13, was one of the first killed.',
        ],
      },
      {
        type: 'concept',
        label: 'Why it happened',
        text: 'BC had already taught students to think for themselves. When the Afrikaans circular came in 1974, learners were primed to resist. The march on 16 June was peaceful — a protest against being taught in the language of the oppressor.',
      },
      {
        type: 'concept',
        label: 'What happened',
        text: 'Police opened fire on unarmed students. The news and photographs spread worldwide. Protests spread to townships across the country. Hundreds died. Thousands fled into exile.',
      },
      {
        type: 'concept',
        label: 'Why it mattered',
        text: 'The uprising broke the myth that Black South Africans were passive. It radicalised a whole generation — many of whom became leaders of the ANC in exile. It showed the world what apartheid really meant.',
      },
      {
        type: 'example',
        scenario: 'Imagine being 15 years old, and being told you must learn in a language you do not speak — a language used by the people who oppress you. What do you do?',
        steps: [
          'You march.',
          'You hold your hands up.',
          'They shoot anyway.',
          'The world sees. Everything changes.',
        ],
        answer: 'Soweto 1976 turned students into the shock troops of the liberation struggle.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-4. CRISIS OF APARTHEID — BLACK LOCAL AUTHORITIES
  // ----------------------------------------------------------------
  'p2-black-local-authorities': {
    sections: [
      { type: 'heading', text: 'The Black Local Authorities — a fake kind of power.' },
      {
        type: 'scene',
        sceneId: 'p2-black-local-authorities',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Attempts to Reform Apartheid' },
        caption: 'Give them a little power — so they stop asking for the real thing.',
        stepTexts: [
          null,
          'By the 1980s, apartheid was under pressure. The government needed to reform — without giving up real power.',
          'In 1982, the Black Local Authorities Act created elected councils in Black townships.',
          'The idea was to make Black people administer their own areas — and take the blame for the problems.',
          'But the councils had no real money and no real power. Residents called them puppets.',
        ],
      },
      {
        type: 'concept',
        label: 'The tri-cameral system',
        text: 'In 1983, the government created the tri-cameral parliament — separate houses for whites, Coloureds, and Indians. But NO house for Africans. Africans were to run their own affairs through the Black Local Authorities — separate and unequal.',
      },
      {
        type: 'concept',
        label: 'The townships\u2019 response',
        text: 'The councils were seen as puppets of apartheid. Councillors were attacked, their homes burned, and many resigned. Rent boycotts spread. Civic organisations were formed to lead the resistance. The reform failed — it only made people angrier.',
      },
      {
        type: 'example',
        scenario: 'Imagine being handed the keys to a township with no money, no police, no jobs, and no land. Then being told to fix it.',
        steps: [
          'You cannot fix it.',
          'The people turn on you.',
          'You resign.',
          'The government blames you anyway.',
        ],
        answer: 'The Black Local Authorities were designed to fail — and to shift blame.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-5. CRISIS OF APARTHEID — TRADE UNION MOVEMENT
  // ----------------------------------------------------------------
  'p2-trade-union-movement': {
    sections: [
      { type: 'heading', text: 'The trade union movement — the muscle of the 1980s.' },
      {
        type: 'scene',
        sceneId: 'p2-trade-union-movement',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Rise of the Unions' },
        caption: 'From the factory floor to the national stage.',
        stepTexts: [
          null,
          'In 1973, a wave of strikes in Durban woke up the labour movement. Workers demanded better wages and conditions.',
          'By the early 1980s, unions were growing fast — FOSATU, CCAWUSA, and others.',
          'On 1 December 1985, COSATU was launched — the Congress of South African Trade Unions.',
          'COSATU united 33 unions and 500,000 workers. It was the largest federation of Black unions in South African history.',
        ],
      },
      {
        type: 'concept',
        label: 'Why COSATU mattered',
        text: 'COSATU was not just about wages. It aligned with the banned ANC and the Freedom Charter. It was a non-parliamentary opposition group. It organised workers — and workers could strike, march, and shut down factories. That was real power.',
      },
      {
        type: 'concept',
        label: 'The government\u2019s response',
        text: 'The government tried to restrict unions with the Labour Relations Amendment Act (1988). It limited the right to strike and banned solidarity action. COSATU fought back — special congresses, mass action, and strikes. In 1987, they launched the "living wage" campaign — the East Rand Riot Squad was sent in, and strikers were attacked.',
      },
      {
        type: 'example',
        scenario: 'Imagine 500,000 workers all staying home on the same day. That is not a protest. That is an economy stopping.',
        steps: [
          'The factories go silent.',
          'The mines go silent.',
          'The government panics.',
          'It sends in the police — but the workers do not stop.',
        ],
        answer: 'The unions turned economic power into political power.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-6. CRISIS OF APARTHEID — INTERNAL RESISTANCE
  // ----------------------------------------------------------------
  'p2-internal-resistance-1980s': {
    sections: [
      { type: 'heading', text: 'New methods of resistance — the 1980s.' },
      {
        type: 'scene',
        sceneId: 'p2-internal-resistance-1980s',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'New Forms of Resistance' },
        caption: 'Rolling mass action. Civics. UDF. MDM. ECC. Black Sash.',
        stepTexts: [
          null,
          'By the mid-1980s, resistance had spread across every sector — students, workers, churches, communities.',
          'In 1983, the United Democratic Front (UDF) was formed — an umbrella of 600+ organisations.',
          'The Mass Democratic Movement (MDM) followed — uniting the UDF, COSATU, and others.',
          'The End Conscription Campaign (ECC) fought against white conscription. The Black Sash fought against pass laws.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key organisations of the 1980s',
        items: [
          'UDF (1983) — United Democratic Front. 600+ affiliates.',
          'MDM — Mass Democratic Movement. UDF + COSATU + more.',
          'COSATU (1985) — Congress of South African Trade Unions.',
          'ECC — End Conscription Campaign. Anti-conscription whites.',
          'Black Sash — women\u2019s movement against pass laws and injustice.',
        ],
      },
      {
        type: 'concept',
        label: 'Rolling mass action',
        text: 'New tactic: instead of one big protest, many small ones — strikes, stayaways, boycotts, consumer boycotts — rolling across the country. Townships became "ungovernable". In 1985 and 1986, states of emergency were declared. Tens of thousands were detained.',
      },
      {
        type: 'example',
        scenario: 'Imagine the government can stop one march. Can it stop a hundred different marches, in a hundred townships, on a hundred different days?',
        steps: [
          'It cannot predict where.',
          'It cannot be everywhere.',
          'It cannot arrest everyone.',
          'The townships become ungovernable.',
        ],
        answer: 'Rolling mass action made apartheid\u2019s townships ungovernable.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-7. CRISIS OF APARTHEID — RENT BOYCOTTS
  // ----------------------------------------------------------------
  'p2-rent-boycotts': {
    sections: [
      { type: 'heading', text: 'Rent boycotts — when townships refused to pay.' },
      {
        type: 'scene',
        sceneId: 'p2-rent-boycotts',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Rent Boycotts and Civic Resistance' },
        caption: 'No services. No rent. No more.',
        stepTexts: [
          null,
          'Black Local Authorities charged rent and service fees for townships — but provided almost no services.',
          'Housing was bad. Streets were dirty. Electrification was poor. The bucket-toilet system was humiliating.',
          'In the mid-1980s, residents organised rent boycotts — refusing to pay until conditions improved.',
          'Civic organisations led the boycotts. Some councillors resigned. Others were attacked or killed.',
        ],
      },
      {
        type: 'concept',
        label: 'Civic organisations',
        text: 'Civics were local community organisations. They addressed "bread-and-butter" issues — rent, water, electricity, services. But addressing these issues quickly pushed them into politics, because the root cause was apartheid itself.',
      },
      {
        type: 'concept',
        label: 'The state\u2019s response',
        text: 'Police were sent in. Protesters were shot. In Mamelodi (1985), 13 people were killed by police during rent protests. In Thembisa, leaders like Jaki Seroke were detained under the General Law Amendment Act — 14 days\u2019 detention, solitary confinement, no lawyers, no doctors.',
      },
      {
        type: 'example',
        scenario: 'Imagine paying rent for a house with no electricity, a bucket toilet, and streets filled with crime. What do you do when you have no other power?',
        steps: [
          'You stop paying.',
          'The council loses money.',
          'The council sends police.',
          'The state reveals itself — and more people join you.',
        ],
        answer: 'Rent boycotts turned local anger into national resistance.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-8. NEGOTIATIONS 1989-1991
  // ----------------------------------------------------------------
  'p2-negotiations-1989-1991': {
    sections: [
      { type: 'heading', text: 'The beginning of negotiations — 1989 to 1991.' },
      {
        type: 'scene',
        sceneId: 'p2-negotiations-1989-1991',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Start of Negotiations' },
        caption: 'FW de Klerk takes over. The door opens.',
        stepTexts: [
          null,
          'In 1989, PW Botha suffered a stroke. FW de Klerk took over as State President.',
          'On 2 February 1990, de Klerk announced the unbanning of the ANC, PAC, SACP, and other banned organisations.',
          'On 11 February 1990, Nelson Mandela walked free after 27 years in prison.',
          'In May 1990, at Groote Schuur, the ANC and the NP committed themselves to negotiate — and to end violence.',
        ],
      },
      {
        type: 'concept',
        label: 'Why de Klerk opened the door',
        text: 'The Cold War was ending. The Soviet Union was collapsing — so the "communist threat" excuse for apartheid was gone. Sanctions were hurting the economy. Township resistance was ungovernable. Negotiation was the only way to keep some control.',
      },
      {
        type: 'bullets',
        label: 'Key milestones 1989–1991',
        items: [
          '2 February 1990 — Unbanning of ANC, PAC, SACP, and others.',
          '11 February 1990 — Nelson Mandela released after 27 years.',
          '2 May 1990 — Groote Schuur Minute. Both sides commit to negotiate.',
          '6 August 1990 — Pretoria Minute. ANC suspends armed struggle. NP lifts State of Emergency.',
          '14 September 1991 — National Peace Accord signed by 27 political organisations.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine two enemies in a boxing ring. Suddenly one says: "Let us talk instead." That is what de Klerk did on 2 February 1990.',
        steps: [
          'The ANC was unbanned.',
          'Mandela walked free.',
          'Both sides agreed to negotiate.',
          'Everything from here on was decided at the table — and in the streets.',
        ],
        answer: '2 February 1990 was the moment apartheid started to end.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-9. CODESA
  // ----------------------------------------------------------------
  'p2-codesa': {
    sections: [
      { type: 'heading', text: 'CODESA — the convention that almost broke.' },
      {
        type: 'scene',
        sceneId: 'p2-codesa',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'CODESA — Convention for a Democratic South Africa' },
        caption: '19 parties. One table. Many disagreements.',
        stepTexts: [
          null,
          'On 20 December 1991, CODESA 1 opened — 19 political parties, excluding the CP and PAC.',
          'Parties signed a Declaration of Intent — agreeing to draw up a new constitution.',
          'But they could not agree on power-sharing or on the role of the Constituent Assembly.',
          'On 2 May 1992, CODESA 2 met — and deadlocked.',
        ],
      },
      {
        type: 'concept',
        label: 'The deadlock',
        text: 'The NP wanted strong minority vetoes and power-sharing guarantees. The ANC wanted a simple majority-based Constituent Assembly. Neither side would budge. Meanwhile, violence surged outside the talks — Boipatong, Bisho.',
      },
      {
        type: 'concept',
        label: 'The whites-only referendum (March 1992)',
        text: 'De Klerk called a whites-only referendum to test support. He had lost three by-elections to the Conservative Party. Result: 68.7% voted YES. De Klerk had a mandate to continue. But CODESA itself broke down.',
      },
      {
        type: 'example',
        scenario: 'Imagine 19 people trying to write a constitution together, each protecting their own interests. It is not a negotiation — it is a minefield.',
        steps: [
          'One wants power-sharing.',
          'One wants simple majority.',
          'One wants vetoes.',
          'The talks collapse. Back to the drawing board.',
        ],
        answer: 'CODESA failed — but it set the table for the real deal.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-10. VIOLENCE THAT TRIED TO DERAIL NEGOTIATIONS
  // ----------------------------------------------------------------
  'p2-violence-derail': {
    sections: [
      { type: 'heading', text: 'The violence that tried to derail negotiations.' },
      {
        type: 'scene',
        sceneId: 'p2-violence-derail',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Violence and the Third Force' },
        caption: 'Every step toward peace was followed by bloodshed.',
        stepTexts: [
          null,
          'Between 1990 and 1994, South Africa was in a low-level civil war. Thousands died.',
          'A "Third Force" — security operatives and hit squads — was suspected of fuelling the violence to undermine the ANC.',
          'Massacres shocked the country: Sebokeng, Boipatong, Bisho, St James, Heidelberg, Shell House.',
          'And on 10 April 1993, Chris Hani — the popular SACP leader — was assassinated by a white supremacist.',
        ],
      },
      {
        type: 'bullets',
        label: 'The massacres that shaped the negotiations',
        items: [
          'Sebokeng (March 1990) — 12 killed by police.',
          'Boipatong (17 June 1992) — 45+ killed. ANC walked out of CODESA.',
          'Bisho (7 September 1992) — 28 killed. ANC supporters shot by Ciskei troops.',
          'St James Church (25 July 1993) — 11 killed by APLA.',
          'Chris Hani assassination (10 April 1993) — nearly started a civil war.',
          'Shell House (28 March 1994) — 19 IFP marchers killed.',
        ],
      },
      {
        type: 'concept',
        label: 'Why it did not work',
        text: 'The violence was meant to frighten the ANC and the NP away from negotiation. Instead, it pushed both sides closer. Mandela went on TV after Hani\u2019s death and calmed the nation. The will for peace was stronger than the violence.',
      },
      {
        type: 'example',
        scenario: 'Imagine walking a tightrope while people throw stones at you. The stones are meant to make you fall. But you keep walking.',
        steps: [
          'Every massacre shocked the country.',
          'But the negotiations continued.',
          'Mandela calmed the nation.',
          'The election date was set.',
        ],
        answer: 'The violence failed to stop democracy.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-11. ROAD TO 1994
  // ----------------------------------------------------------------
  'p2-road-to-1994': {
    sections: [
      { type: 'heading', text: 'The final road to democracy — 1993 to 1994.' },
      {
        type: 'scene',
        sceneId: 'p2-road-to-1994',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Final Road to Democracy' },
        caption: '27 April 1994 — the ballot that ended apartheid.',
        stepTexts: [
          null,
          'After CODESA broke down, negotiations resumed through 1992 and 1993 — with Joe Slovo\u2019s "Sunset Clause" breaking the deadlock.',
          'On 2 April 1993, the Multi-Party Negotiating Forum agreed: a Government of National Unity for 5 years.',
          'The election date was set for 27 April 1994.',
          'Long queues, hours of waiting, and a nation voting for the first time.',
        ],
      },
      {
        type: 'concept',
        label: 'The Sunset Clause',
        text: 'Joe Slovo (SACP) proposed a compromise: parties that won over 5% of the vote would serve in a Government of National Unity (GNU) for 5 years. Whites could keep their positions. This broke the deadlock. Nobody got everything. Everybody got something.',
      },
      {
        type: 'concept',
        label: 'The result',
        text: 'The ANC won 62.6%. The NP won 20.4%. The IFP won 10.5%. Nelson Mandela became the first democratically elected President of South Africa. Thabo Mbeki and FW de Klerk became his deputies. The GNU was born.',
      },
      {
        type: 'example',
        scenario: 'Imagine standing in a queue that stretches for kilometres. You have waited your whole life for this. The line moves slowly. Nobody leaves.',
        steps: [
          'The ballot is cast.',
          'The result is announced.',
          'Mandela is sworn in on 10 May 1994.',
          'A new South Africa begins.',
        ],
        answer: '27 April 1994 was the day apartheid was buried at the ballot box.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-12. TRC ESTABLISHMENT
  // ----------------------------------------------------------------
  'p2-trc-establishment': {
    sections: [
      { type: 'heading', text: 'The TRC — truth before reconciliation.' },
      {
        type: 'scene',
        sceneId: 'p2-trc-establishment',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Truth and Reconciliation Commission' },
        caption: 'A nation telling the truth — out loud, in public.',
        stepTexts: [
          null,
          'In 1995, the Promotion of National Unity and Reconciliation Act established the TRC.',
          'The TRC had three committees: Human Rights Violations, Amnesty, and Reparations.',
          'Archbishop Desmond Tutu chaired the TRC. Justice Dullah Omar was the Minister who proposed it.',
          'For the first time, the apartheid state\u2019s crimes were investigated openly.',
        ],
      },
      {
        type: 'concept',
        label: 'Why the TRC was needed',
        text: 'South Africa had two choices after 1994: Nuremberg-style trials, or amnesty in exchange for the truth. The TRC chose truth. The idea: expose what happened, give victims a platform, and grant amnesty to perpetrators who told the full truth.',
      },
      {
        type: 'bullets',
        label: 'The three committees',
        items: [
          'Human Rights Violations Committee — heard victims\u2019 stories.',
          'Amnesty Committee — heard perpetrators apply for amnesty.',
          'Reparations and Rehabilitation Committee — recommended compensation for victims.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine two roads after apartheid. One is trials — years of courts, more pain, more division. The other is truth — public hearings, painful but honest.',
        steps: [
          'The country chose truth.',
          'Victims told their stories.',
          'Perpetrators confessed or applied for amnesty.',
          'The nation listened — for the first time, together.',
        ],
        answer: 'The TRC was South Africa\u2019s wager: truth in exchange for peace.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-13. TRC — JUSTICE
  // ----------------------------------------------------------------
  'p2-trc-justice': {
    sections: [
      { type: 'heading', text: 'Two kinds of justice — retributive and restorative.' },
      {
        type: 'scene',
        sceneId: 'p2-trc-justice',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Retributive vs Restorative Justice' },
        caption: 'Punishment, or healing?',
        stepTexts: [
          null,
          'Retributive justice: punish the wrongdoer. Criminal trials. Prison. Nuremberg-style.',
          'Restorative justice: heal the victim, repair the relationship, restore the community.',
          'The TRC chose restorative justice — not instead of punishment, but before it.',
          'Amnesty was not forgiveness. It was a legal exchange: full truth in return for immunity.',
        ],
      },
      {
        type: 'concept',
        label: 'Retributive justice',
        text: 'You did the crime, you do the time. Trials, evidence, verdicts, sentences. This is what most people mean by "justice". But in South Africa, it would have taken decades and deepened the racial divide.',
      },
      {
        type: 'concept',
        label: 'Restorative justice',
        text: 'The victim tells their story. The perpetrator admits what they did. The community hears. The wound is acknowledged. Amnesty is granted only if the perpetrator makes a FULL disclosure — the whole truth, not half of it.',
      },
      {
        type: 'example',
        scenario: 'Imagine your family was destroyed by apartheid. Do you want the killer in jail — or do you want to know what happened, where the body is, and why?',
        steps: [
          'For many families, the truth was more valuable than a trial.',
          'The TRC gave them a public platform.',
          'Some got answers. Some never did.',
          'The nation watched.',
        ],
        answer: 'The TRC chose truth over punishment — imperfectly, but deliberately.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-14. TRC — AMNESTY
  // ----------------------------------------------------------------
  'p2-trc-amnesty': {
    sections: [
      { type: 'heading', text: 'Amnesty — the deal at the heart of the TRC.' },
      {
        type: 'scene',
        sceneId: 'p2-trc-amnesty',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Amnesty and the TRC' },
        caption: 'Full truth, or no freedom.',
        stepTexts: [
          null,
          'Amnesty meant: no prosecution for a politically motivated crime.',
          'But amnesty was not automatic. Applicants had to prove their crime was political and they had to make a FULL disclosure.',
          'If the Amnesty Committee found they were lying or hiding something — no amnesty.',
          'This is why so many perpetrators were rejected — the truth is hard to tell fully.',
        ],
      },
      {
        type: 'bullets',
        label: 'Amnesty requirements',
        items: [
          'The act must have been politically motivated.',
          'The applicant must make FULL disclosure — the whole truth.',
          'The act must be proportionate to the political objective.',
          'The Amnesty Committee decided each case individually.',
        ],
      },
      {
        type: 'concept',
        label: 'The problems with amnesty',
        text: 'Many South Africans were furious. Killers walked free. Victims\u2019 families were not always told the truth. Reparations were slow and small. Some said the TRC put the pain of victims on display — without giving them closure.',
      },
      {
        type: 'example',
        scenario: 'Imagine a policeman who tortured and killed activists. He walks into the TRC, admits everything, and walks out free.',
        steps: [
          'The family gets the truth.',
          'But the killer gets no punishment.',
          'That was the deal.',
          'For many families, it felt like a second injustice.',
        ],
        answer: 'Amnesty gave truth, but not always justice.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-15. TRC — CASE STUDIES
  // ----------------------------------------------------------------
  'p2-trc-case-studies': {
    sections: [
      { type: 'heading', text: 'The TRC case studies — Sizwe Kondile and Rev. Farisani.' },
      {
        type: 'scene',
        sceneId: 'p2-trc-case-studies',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'TRC Case Studies' },
        caption: 'Two stories. Two kinds of closure.',
        stepTexts: [
          null,
          'Sizwe Kondile was an ANC activist. In 1981, he was abducted, tortured, shot, and burned by the security police.',
          'His killers applied for amnesty. His mother, Charity Kondile, refused to forgive. She wanted a trial — not amnesty.',
          'Rev. Tshenuwani Farisani was tortured in Venda between 1977 and 1987. He testified at the TRC — asking for truth, not revenge.',
          'The Amnesty Committee rejected the amnesty applications of three policemen who tortured him — because they did not make full disclosure.',
        ],
      },
      {
        type: 'concept',
        label: 'Sizwe Kondile — no closure',
        text: 'Dirk Coetzee and other security police admitted to killing Sizwe. But his body was never found. His mother was never told the full truth. In 2016, 35 years later, a symbolic "spiritual repatriation" was held at Freedom Park. No body. No trial. Only ceremony.',
      },
      {
        type: 'concept',
        label: 'Rev. Farisani — partial closure',
        text: 'Farisani testified about the electric shocks, beatings, and prolonged isolation. He said: "I do not hate them. They must tell the truth." When the three policemen refused to admit the full truth, the Amnesty Committee rejected their applications. Justice, in a small way, was done.',
      },
      {
        type: 'example',
        scenario: 'Imagine two families. Both lost someone to apartheid. Both went to the TRC. One got a body. The other got a ceremony.',
        steps: [
          'The truth was told.',
          'But the pain remained.',
          'The TRC could only do so much.',
          'Some wounds never fully heal.',
        ],
        answer: 'The TRC gave some families closure — and others only the truth.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-16. GORBACHEV REFORMS
  // ----------------------------------------------------------------
  'p2-gorbachev-reforms': {
    sections: [
      { type: 'heading', text: 'Gorbachev — the man who reformed himself out of a job.' },
      {
        type: 'scene',
        sceneId: 'p2-gorbachev-reforms',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Gorbachev\'s Reforms' },
        caption: 'Perestroika and Glasnost — two doors, one collapse.',
        stepTexts: [
          null,
          'In 1985, Mikhail Gorbachev became leader of the Soviet Union.',
          'The economy was broken. The arms race with the USA had drained the treasury.',
          'He introduced two big reforms: Perestroika (economic reconstruction) and Glasnost (openness).',
          'Both reforms went further than he intended — and tore the Soviet Union apart.',
        ],
      },
      {
        type: 'concept',
        label: 'Perestroika',
        text: 'Economic reconstruction. Allowed small-scale private ownership. Removed government control over production. Accepted some capitalist ideas inside communism. Shut down non-profitable industries. It confused everyone — the economy got worse before it got better (and it never got better).',
      },
      {
        type: 'concept',
        label: 'Glasnost',
        text: 'Openness. Reduced censorship. Allowed criticism of government. Released political prisoners. Normalised relations with the USA. But it also allowed people to criticise communism itself — and to demand independence.',
      },
      {
        type: 'example',
        scenario: 'Imagine you open the windows of a house that has been sealed shut for 70 years. The fresh air comes in. So does the storm.',
        steps: [
          'The people start speaking.',
          'They start organising.',
          'They start demanding freedom.',
          'The house comes down.',
        ],
        answer: 'Gorbachev\u2019s reforms destroyed the system he was trying to save.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-17. EASTERN EUROPE 1989
  // ----------------------------------------------------------------
  'p2-eastern-europe': {
    sections: [
      { type: 'heading', text: '1989 — the year Eastern Europe broke free.' },
      {
        type: 'scene',
        sceneId: 'p2-eastern-europe',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Eastern Europe, 1989' },
        caption: 'One by one, the satellite states left the orbit.',
        stepTexts: [
          null,
          'The Soviet Union had controlled Eastern Europe since WWII — Poland, Hungary, Czechoslovakia, East Germany, and others.',
          'In 1989, one by one, these countries broke away from communist rule.',
          'Poland held free elections in June. Hungary opened its borders to Austria in August.',
          'On 9 November 1989, the Berlin Wall fell. The Cold War was ending.',
        ],
      },
      {
        type: 'bullets',
        label: 'The chain reaction of 1989',
        items: [
          'Poland — Solidarity wins free elections (June 1989).',
          'Hungary — opens border to Austria (August 1989).',
          'East Germany — Berlin Wall falls (9 November 1989).',
          'Czechoslovakia — Velvet Revolution (November 1989).',
          'Romania — Ceausescu overthrown and executed (December 1989).',
        ],
      },
      {
        type: 'concept',
        label: 'Why it happened',
        text: 'Gorbachev refused to send Soviet troops to prop up the communist regimes — as the USSR had done in Hungary (1956) and Czechoslovakia (1968). Without Soviet tanks, the regimes fell to their own people. The Brezhnev Doctrine was dead.',
      },
      {
        type: 'example',
        scenario: 'Imagine a row of books standing upright. Pull one out — they all fall. That was 1989.',
        steps: [
          'Poland goes first.',
          'Hungary follows.',
          'East Germany opens the Wall.',
          'By December, the entire Eastern bloc has collapsed.',
        ],
        answer: '1989 was the year communism died in Eastern Europe.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-18. DISINTEGRATION OF THE USSR
  // ----------------------------------------------------------------
  'p2-ussr-disintegration': {
    sections: [
      { type: 'heading', text: '1991 — the Soviet Union falls apart.' },
      {
        type: 'scene',
        sceneId: 'p2-ussr-disintegration',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Disintegration of the USSR' },
        caption: 'Fifteen republics. One union. Gone in a year.',
        stepTexts: [
          null,
          'The USSR was made up of 15 republics. Old nationalisms had never died — they were just suppressed.',
          'Glasnost allowed them to speak. Perestroika gave them economic reasons to leave.',
          'In 1990, several republics — including Russia under Boris Yeltsin — declared independence.',
          'On 25 December 1991, Gorbachev resigned. The USSR was dissolved. The Cold War was over.',
        ],
      },
      {
        type: 'concept',
        label: 'The final years',
        text: 'Gorbachev tried to hold the Union together with a new "Federation of States". The hardliners tried a coup in August 1991 — it failed. Yeltsin emerged as the real power. One by one, the republics declared independence. The Commonwealth of Independent States (CIS) replaced the USSR.',
      },
      {
        type: 'concept',
        label: 'Why it mattered for South Africa',
        text: 'With the USSR gone, the apartheid government could no longer claim it was fighting a communist threat. The ANC could no longer rely on Soviet support. Both sides had reasons to negotiate. 1991 in Moscow led to 1994 in South Africa.',
      },
      {
        type: 'example',
        scenario: 'Imagine a giant building held up by one pillar. The pillar is Perestroika. The weight is 15 republics. The building collapses.',
        steps: [
          'Gorbachev tried to save it.',
          'Yeltsin took Russia out.',
          'The other republics followed.',
          'On 25 December 1991, the USSR was gone.',
        ],
        answer: 'The USSR collapsed under its own reforms.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-19. GLOBALISATION
  // ----------------------------------------------------------------
  'p2-globalisation': {
    sections: [
      { type: 'heading', text: 'Globalisation — one world, one market?' },
      {
        type: 'scene',
        sceneId: 'p2-globalisation',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Globalisation' },
        caption: 'Free trade, free movement, and free rein for capital.',
        stepTexts: [
          null,
          'Globalisation means the world has become more connected — through trade, technology, transport, and communication.',
          'Money, goods, and ideas move faster and cheaper than ever before.',
          'It has created huge opportunities — and huge inequality.',
          'The rich countries call it progress. The developing countries call it colonialism in a new suit.',
        ],
      },
      {
        type: 'concept',
        label: 'What globalisation is',
        text: 'Free trade agreements. Advances in technology. Better transportation. Multinational companies expanding globally. This is what people mean by "globalisation". It has connected the world economy — but not equally.',
      },
      {
        type: 'bullets',
        label: 'Two faces of globalisation',
        items: [
          'From above — driven by powerful nations and institutions (IMF, World Bank, WTO).',
          'From below — driven by grassroots movements resisting exploitation.',
          'Beneficiaries: multinationals, rich nations, urban elites.',
          'Losers: local industries, workers in developing countries, the environment.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine a huge supermarket opens next to a small local shop. The supermarket has cheaper prices. The local shop closes.',
        steps: [
          'The supermarket wins.',
          'The owner of the local shop loses.',
          'The workers lose.',
          'The community loses its local business.',
        ],
        answer: 'Globalisation creates winners and losers — and the losers are often the poorest.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-20. BALANCE OF POWER & AFRICA
  // ----------------------------------------------------------------
  'p2-balance-of-power-africa': {
    sections: [
      { type: 'heading', text: 'Africa in the new world order — new bosses, old patterns.' },
      {
        type: 'scene',
        sceneId: 'p2-balance-of-power-africa',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Balance of Power and Africa' },
        caption: 'The Cold War ended. The debt began.',
        stepTexts: [
          null,
          'When the Cold War ended, Africa lost its strategic value to the superpowers.',
          'The USA and USSR had propped up allies in Africa. Now they did not need to.',
          'In the 1980s, many African countries fell into debt crises.',
          'They turned to the IMF and the World Bank for loans — with conditions attached.',
        ],
      },
      {
        type: 'concept',
        label: 'Structural Adjustment Programmes',
        text: 'The IMF and World Bank offered loans — but required Structural Adjustment Programmes (SAPs): cut government spending, privatise state assets, remove subsidies, open markets. These policies hurt the poor most — and left countries dependent on foreign lenders.',
      },
      {
        type: 'concept',
        label: 'A new dependency',
        text: 'Some argued Africa had simply swapped one master for another. Instead of colonial powers, it now answered to international financial institutions. Debt, not empire, was the new form of control.',
      },
      {
        type: 'example',
        scenario: 'Imagine you are drowning. Someone throws you a rope — but the rope is attached to conditions you cannot meet.',
        steps: [
          'You take the rope anyway.',
          'The conditions cut your food budget.',
          'You still owe the debt.',
          'You depend on them forever.',
        ],
        answer: 'SAPs were aid with strings — and the strings often hurt the poor.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-21. BRICS
  // ----------------------------------------------------------------
  'p2-brics': {
    sections: [
      { type: 'heading', text: 'BRICS — the Global South organises.' },
      {
        type: 'scene',
        sceneId: 'p2-brics',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'BRICS and Emerging Economies' },
        caption: 'Brazil. Russia. India. China. South Africa. And now many more.',
        stepTexts: [
          null,
          'BRIC began in 2006 with Brazil, Russia, India, and China.',
          'South Africa joined in 2010 — making it BRICS.',
          'The aim: counter-balance the economic dominance of the G7 and the West.',
          'On 1 January 2024, six new countries joined: Argentina, Egypt, Ethiopia, Iran, Saudi Arabia, and the UAE.',
        ],
      },
      {
        type: 'concept',
        label: 'What BRICS wants',
        text: 'A multi-polar world — not one dominated by the USA and Europe. De-dollarisation — reduce reliance on the US dollar in global trade. An independent payment system. A new development bank (NDB) as an alternative to the IMF and World Bank.',
      },
      {
        type: 'bullets',
        label: 'Key BRICS initiatives',
        items: [
          'New Development Bank (NDB) — alternative to IMF/World Bank.',
          'Contingent Reserve Arrangement — alternative to IMF emergency loans.',
          'De-dollarisation — trade in local currencies.',
          'AI governance framework — rules for emerging tech.',
          'Independent grain trading system — reduce Western leverage.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine a card game where the G7 have stacked the deck for decades. BRICS says: we want a new deck.',
        steps: [
          'The G7 says no.',
          'BRICS builds its own deck.',
          'More countries want to join.',
          'The old game loses its players.',
        ],
        answer: 'BRICS is the Global South building a parallel world order.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // P2-22. RESPONSES TO GLOBALISATION
  // ----------------------------------------------------------------
  'p2-responses-globalisation': {
    sections: [
      { type: 'heading', text: 'Responses to globalisation — resistance and reform.' },
      {
        type: 'scene',
        sceneId: 'p2-responses-globalisation',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Responses to Globalisation' },
        caption: 'Global North vs Global South — the new fault line.',
        stepTexts: [
          null,
          'Globalisation has not delivered on all its promises. Inequality has grown. The environment has suffered. Local industries have collapsed.',
          'In the Global South, people have protested — trade unions, community groups, and social movements.',
          'One big example: in 2011, South African trade unions resisted Walmart\u2019s takeover of Massmart.',
          'They called Walmart an "economic coloniser" — and demanded protection for local jobs and industries.',
        ],
      },
      {
        type: 'concept',
        label: 'The Global North vs Global South',
        text: 'The Global North (USA, EU, Japan) dominates the global economy. The Global South (Africa, Asia, Latin America) argues that the rules are rigged. Trade tariffs. Debt conditions. Patent laws. All favour the North.',
      },
      {
        type: 'bullets',
        label: 'Forms of resistance',
        items: [
          'Trade unions — protect jobs and wages.',
          'Anti-Walmart campaigns (South Africa, 2011).',
          'De-dollarisation — reduce US dollar dependence.',
          'Calls for a New International Economic Order.',
          'Grassroots movements — food sovereignty, land rights, environment.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine Walmart arrives in your country and undercuts every local shop. Your union says: "Not without a fight."',
        steps: [
          'You protest.',
          'You march.',
          'You take the case to the Competition Commission.',
          'You win some protections — but not all.',
        ],
        answer: 'Resistance to globalisation is real — and growing.',
      },
    ],
  },

};

// ================================================================
// AUTO SCRIPTS — 36 concepts (14 P1 + 22 P2)
// ================================================================
export const HISTORY_AUTO_SCRIPTS = {

  // ---------------- P1 ----------------
  'cold-war-origins': {
    title: 'Cold War Origins',
    sentences: [
      'After WWII, only two superpowers remained: the USA and the USSR.',
      'The USA was capitalist. The USSR was communist.',
      'Both had nuclear weapons — a direct war would destroy everything.',
      'They never fought each other directly. They fought through other countries.',
      'Winston Churchill called the divide in Europe the Iron Curtain.',
      'The USA adopted a policy of containment — stop communism from spreading.',
      'The Domino Theory: if one country fell to communism, others would follow.',
      'The Marshall Plan gave billions to Western Europe to rebuild and resist communism.',
      'The USSR responded with the Molotov Plan for Eastern Europe.',
      'The Cold War became a battle of ideas — not bombs.',
    ],
  },

  'cold-war-containment': {
    title: 'The Policy of Containment',
    sentences: [
      'Containment meant stopping the spread of communism — without direct war.',
      'The Truman Doctrine gave military aid to countries threatened by communism.',
      'The Marshall Plan gave economic aid to rebuild Western Europe.',
      'The USA feared the Domino Theory — one country falling would topple the next.',
      'NATO was formed as a Western military alliance against the USSR.',
      'The USSR responded with the Molotov Plan for Eastern Europe.',
      'COMECON was the Soviet economic alliance — the rival to the Marshall Plan.',
      'Europe was divided into two economic camps — capitalism and communism.',
      'Germany was split. Berlin, deep in the Soviet zone, was split too.',
      'Containment shaped US foreign policy for the next 40 years.',
    ],
  },

  'cold-war-berlin-1948': {
    title: 'The Berlin Blockade, 1948',
    sentences: [
      'After WWII, Germany was divided into four zones: USA, Britain, France, USSR.',
      'Berlin, deep inside the Soviet zone, was also divided into four sectors.',
      'In 1948, Stalin blocked all land routes into West Berlin.',
      'No food, no coal, no medicine could reach West Berlin.',
      'The USA refused to leave and refused to start a war.',
      'Instead, the West launched the Berlin Airlift.',
      'Planes landed every 90 seconds, day and night, for over a year.',
      'Stalin could not shoot them down without starting a war.',
      'The blockade failed. The airlift succeeded.',
      'Berlin became the first major flashpoint of the Cold War.',
    ],
  },

  'berlin-wall': {
    title: 'The Berlin Wall',
    sentences: [
      'Berlin was deep inside the Soviet zone but divided into four zones.',
      'West Berlin was capitalist. East Berlin was communist.',
      'Thousands of East Berliners fled to the West for freedom and jobs.',
      'On 13 August 1961, the Berlin Wall was built overnight.',
      'Barbed wire, tanks, soldiers — the wall divided the city.',
      'Families were split. Workers lost access to their jobs.',
      'Some dug tunnels. Some died trying. Some drove cars into the wall.',
      'The wall became the symbol of the Cold War.',
      'East Germany lost credibility. West Berlin flourished.',
      'The wall stood for 28 years before it fell in 1989.',
    ],
  },

  'cold-war-vietnam': {
    title: 'The Vietnam War',
    sentences: [
      'Vietnam was split. North was communist. South was capitalist.',
      'The USA supported South Vietnam. The USSR supported North Vietnam.',
      'The Vietcong used guerrilla tactics — hit and run, booby traps, tunnels.',
      'American soldiers could not fit in the tunnels. The Vietcong could.',
      'The USA used chemicals like Agent Orange and Napalm.',
      'The Tet Offensive in 1968 saw Vietcong attack 100 cities at once.',
      'The My Lai Massacre in 1968 turned the world against the USA.',
      'American public opinion turned against the war.',
      'Nixon signed the Paris Peace Accords in 1973 and withdrew troops.',
      'In 1975, North Vietnam took Saigon. Vietnam became communist.',
    ],
  },

  'independent-africa-angola': {
    title: 'Angola',
    sentences: [
      'Angola was a Portuguese colony. Portugal left in 1975.',
      'Three movements wanted to rule: MPLA, FNLA, and UNITA.',
      'MPLA was socialist — backed by Cuba and the USSR.',
      'FNLA was capitalist — backed by the USA and Mobutu.',
      'UNITA was capitalist — backed by the USA and South Africa.',
      'Portugal left without setting up a stable transition.',
      'The Cold War moved into Angola — a proxy war.',
      'MPLA captured Luanda, the capital, and won the first round.',
      'The civil war dragged on for decades.',
      'Ordinary Angolans suffered the most.',
    ],
  },

  'cuito-cuanavale': {
    title: 'The Battle of Cuito Cuanavale',
    sentences: [
      'Cuito Cuanavale was fought in Angola between 1987 and 1988.',
      'South African forces pushed into Angola to support UNITA.',
      'Cuba sent troops to defend the MPLA government.',
      'Angola had air superiority. The SADF could not take the airfield.',
      'The siege failed. Cuba held the line.',
      'It was the first time apartheid\u2019s army was stopped in a major battle.',
      'The myth of white South African invincibility was broken.',
      'South Africa was forced to the negotiating table.',
      'The Tripartite Accord was signed in 1988.',
      'Namibia gained independence in 1990.',
    ],
  },

  'independent-africa-congo': {
    title: 'Congo under Mobutu',
    sentences: [
      'Congo was one of the richest countries in Africa.',
      'Copper, cobalt, diamonds — the wealth was owned by Belgium during colonial rule.',
      'Mobutu Sese Seko seized power in a coup in 1965.',
      'He banned opposition parties and made himself president for life.',
      'He was supported by the USA because he was anti-communist.',
      'Zaireanisation: he gave foreign-owned businesses to his friends and family.',
      'The businesses collapsed. The economy crashed. Money was stolen.',
      'He renamed the country Zaire and the cities with African names.',
      'He banned Western suits and encouraged African dress and music.',
      'He called it Authenticité — but it was kleptocracy.',
    ],
  },

  'civil-rights-sit-ins': {
    title: 'The Sit-In Movement',
    sentences: [
      'On 1 February 1960, four Black students sat at a Woolworth\u2019s lunch counter in Greensboro.',
      'They were refused service. They stayed anyway.',
      'By the end of the week, over 1,000 students had joined them across the South.',
      'By April, 50,000 people had joined the sit-ins.',
      'The sit-ins were peaceful, disciplined, and non-violent.',
      'Sit-ins spread to libraries, churches, beaches, and swimming pools.',
      'The Tougaloo Nine sat in at a whites-only library in Mississippi and were arrested.',
      'In 1962, a swim-in at Pullen Park integrated the pool in Raleigh.',
      'Six months after Greensboro, lunch counters began to desegregate.',
      'The sit-ins became a turning point in the Civil Rights Movement.',
    ],
  },

  'civil-rights-selma': {
    title: 'Selma to Montgomery',
    sentences: [
      'In 1965, only 2% of Black people in Selma, Alabama, were registered to vote.',
      'On 7 March 1965, 600 marchers crossed the Edmund Pettus Bridge.',
      'State troopers attacked them with clubs and tear gas — Bloody Sunday.',
      'The violence was televised nationwide.',
      'Martin Luther King Jr called for a second march two days later.',
      'A third march began on 21 March, protected by the National Guard.',
      'On 25 March, 25,000 marchers reached Montgomery.',
      'The marches put national pressure on Congress.',
      'The Voting Rights Act was signed in August 1965.',
      'It banned literacy tests and poll taxes in the South.',
    ],
  },

  'civil-rights-freedom-rides': {
    title: 'The Freedom Rides',
    sentences: [
      'In 1961, Black and white activists rode buses together through the American South.',
      'They were testing whether bus desegregation was being enforced.',
      'Southern states refused. Mobs attacked them. Buses were firebombed.',
      'Hospitals refused to treat them. Police arrested them.',
      'They did not fight back. They kept going.',
      'The violence was televised. The world saw everything.',
      'President Kennedy was forced to act.',
      'Segregated buses were desegregated by the end of 1961.',
      'Ordinary people forced the government to follow the law.',
      'Non-violence and cameras were the weapons.',
    ],
  },

  'march-on-washington': {
    title: 'The March on Washington',
    sentences: [
      'The March on Washington took place on 28 August 1963.',
      '250,000 people gathered at the Lincoln Memorial.',
      'It was the largest peaceful protest in US history at the time.',
      'The marchers demanded jobs, freedom, and civil rights.',
      'The placards called for an end to police brutality.',
      'They demanded integrated schools and voting rights.',
      'Martin Luther King Jr delivered his "I Have a Dream" speech.',
      'The speech was televised worldwide.',
      'It pressured Congress to pass the Civil Rights Act.',
      'The Civil Rights Act was signed into law in 1964.',
    ],
  },

  'mlk-non-violence': {
    title: 'The Non-Violent Approach',
    sentences: [
      'Martin Luther King Jr learned non-violence from Mahatma Gandhi.',
      'Gandhi used non-violence to free India from British rule.',
      'King brought the philosophy to the American South.',
      'The method: sit-ins, marches, boycotts, and never hitting back.',
      'Protestors were trained to absorb violence without responding.',
      'The strategy was to expose the brutality of the segregationists.',
      'Cameras captured every attack by mobs and police.',
      'The world saw who the real aggressors were.',
      'Non-violence built national and international sympathy.',
      'That sympathy forced the government to act.',
    ],
  },

  'black-power-movement': {
    title: 'The Black Power Movement',
    sentences: [
      'By the late 1960s, many African Americans were tired of non-violence.',
      'They wanted faster change.',
      'Malcolm X preached self-defence: "By any means necessary."',
      'Stokely Carmichael said Black people should control their own communities.',
      '"Black is beautiful" became a slogan of pride.',
      'The Black Panther Party patrolled the streets to monitor police.',
      'They ran feeding schemes, literacy programmes, and childcare.',
      'They demanded Black history be taught in schools.',
      'A generation of Black pride was born.',
      'Afro hairstyles, African names, and African clothing became symbols of identity.',
    ],
  },

  // ---------------- P2 ----------------
  'p2-bc-nature-aims': {
    title: 'Black Consciousness — Nature and Aims',
    sentences: [
      'After Sharpeville in 1960, the ANC and PAC were banned.',
      'Black opposition went silent. In the vacuum, a new idea grew.',
      'Steve Biko and others founded Black Consciousness.',
      'BC said Black South Africans must free themselves psychologically first.',
      'It rejected the inferiority complex created by apartheid.',
      'It promoted Black pride, self-respect, and self-reliance.',
      'It encouraged African names, natural hair, and African identity.',
      'It said Black people must solve Black problems themselves.',
      'It was not just politics — it was a state of mind.',
      'BC filled the political vacuum of the 1960s and 1970s.',
    ],
  },

  'p2-bcm-organisations': {
    title: 'Black Consciousness Organisations',
    sentences: [
      'In 1968, Black students broke away from NUSAS and formed SASO.',
      'SASO was the South African Students Organisation, led by Steve Biko.',
      'In 1972, SASM — the South African Students Movement — was formed for high school learners.',
      'Also in 1972, the Black Peoples Convention (BPC) was formed.',
      'BPC united students, churches, communities, and workers.',
      'The Black Allied Workers Union (BAWU) brought workers into the movement.',
      'After Biko was banned in 1973, BC focused on community programmes.',
      'The Zanempilo Health Clinic and Ginsburg Educational Trust were examples.',
      'The Zimele Trust Fund, Solempilo, and Ithuseng also served communities.',
      'These programmes proved Black people could solve their own problems.',
    ],
  },

  'p2-soweto-1976': {
    title: 'The Soweto Uprising, 1976',
    sentences: [
      'In 1974, the government forced Afrikaans as a medium of instruction in Black schools.',
      'Afrikaans was seen as the language of the oppressor.',
      'Black Consciousness had already taught students to think for themselves.',
      'On 16 June 1976, thousands of learners marched in Soweto.',
      'Police opened fire on unarmed students.',
      'Hector Pieterson, aged 13, was one of the first killed.',
      'The news and photographs spread worldwide.',
      'Protests spread to townships across the country.',
      'Hundreds died. Thousands fled into exile.',
      'A whole generation of young leaders was born.',
    ],
  },

  'p2-black-local-authorities': {
    title: 'The Black Local Authorities',
    sentences: [
      'By the 1980s, apartheid was under pressure.',
      'In 1982, the Black Local Authorities Act created elected councils in Black townships.',
      'The idea was to make Black people administer their own areas.',
      'But the councils had no real money and no real power.',
      'In 1983, the tri-cameral parliament was created — for whites, Coloureds, and Indians.',
      'No house was created for Africans.',
      'Africans were to run their own affairs through Black Local Authorities.',
      'Residents saw the councils as puppets of apartheid.',
      'Councillors were attacked, and their homes were burned.',
      'The reforms failed — they only made people angrier.',
    ],
  },

  'p2-trade-union-movement': {
    title: 'The Trade Union Movement',
    sentences: [
      'In 1973, a wave of strikes in Durban woke up the labour movement.',
      'Workers demanded better wages and working conditions.',
      'By the early 1980s, unions were growing fast.',
      'FOSATU, CCAWUSA, and others organised workers across industries.',
      'On 1 December 1985, COSATU was launched.',
      'COSATU united 33 unions and 500,000 workers.',
      'It aligned with the banned ANC and the Freedom Charter.',
      'It was a non-parliamentary opposition group.',
      'In 1987, COSATU launched the "living wage" campaign.',
      'The East Rand Riot Squad attacked strikers.',
    ],
  },

  'p2-internal-resistance-1980s': {
    title: 'Internal Resistance in the 1980s',
    sentences: [
      'By the mid-1980s, resistance had spread across every sector.',
      'In 1983, the United Democratic Front (UDF) was formed.',
      'It was an umbrella of over 600 organisations.',
      'The Mass Democratic Movement (MDM) followed.',
      'The End Conscription Campaign (ECC) opposed white conscription.',
      'The Black Sash was a women\u2019s movement against pass laws.',
      'New tactic: rolling mass action — strikes, stayaways, boycotts.',
      'Townships became "ungovernable".',
      'In 1985 and 1986, states of emergency were declared.',
      'Tens of thousands were detained.',
    ],
  },

  'p2-rent-boycotts': {
    title: 'Rent Boycotts',
    sentences: [
      'Black Local Authorities charged rent and service fees for townships.',
      'They provided almost no services in return.',
      'Housing was bad. Streets were dirty. Electrification was poor.',
      'The bucket-toilet system was humiliating.',
      'In the mid-1980s, residents organised rent boycotts.',
      'Civic organisations led the boycotts.',
      'Some councillors resigned. Others were attacked or killed.',
      'Police were sent in. Protesters were shot.',
      'In Mamelodi (1985), 13 people were killed during rent protests.',
      'In Thembisa, leaders like Jaki Seroke were detained.',
    ],
  },

  'p2-negotiations-1989-1991': {
    title: 'The Start of Negotiations, 1989–1991',
    sentences: [
      'In 1989, PW Botha suffered a stroke. FW de Klerk took over.',
      'On 2 February 1990, de Klerk unbanned the ANC, PAC, and SACP.',
      'On 11 February 1990, Nelson Mandela walked free after 27 years.',
      'In May 1990, at Groote Schuur, both sides committed to negotiate.',
      'In August 1990, the ANC suspended armed struggle.',
      'The NP lifted the State of Emergency.',
      'In September 1991, the National Peace Accord was signed.',
      'The Cold War was ending — the "communist threat" excuse for apartheid had gone.',
      'Sanctions were hurting the economy.',
      'Township resistance was ungovernable.',
    ],
  },

  'p2-codesa': {
    title: 'CODESA',
    sentences: [
      'On 20 December 1991, CODESA 1 opened with 19 political parties.',
      'The CP and PAC did not attend.',
      'Parties signed a Declaration of Intent.',
      'They agreed to draw up a new constitution.',
      'But they disagreed on power-sharing and the Constituent Assembly.',
      'The NP wanted strong minority vetoes.',
      'The ANC wanted a simple majority-based assembly.',
      'On 2 May 1992, CODESA 2 met and deadlocked.',
      'In March 1992, a whites-only referendum gave de Klerk 68.7% support.',
      'CODESA itself had failed.',
    ],
  },

  'p2-violence-derail': {
    title: 'The Violence that Tried to Derail Negotiations',
    sentences: [
      'Between 1990 and 1994, South Africa was in a low-level civil war.',
      'A "Third Force" was suspected of fuelling the violence.',
      'Sebokeng (March 1990): 12 killed by police.',
      'Boipatong (June 1992): 45+ killed. ANC walked out of CODESA.',
      'Bisho (September 1992): 28 killed by Ciskei troops.',
      'St James Church (July 1993): 11 killed by APLA.',
      'Chris Hani was assassinated on 10 April 1993.',
      'Mandela went on TV and calmed the nation.',
      'The violence was meant to frighten both sides away from the table.',
      'It failed. Negotiations continued.',
    ],
  },

  'p2-road-to-1994': {
    title: 'The Road to 1994',
    sentences: [
      'After CODESA broke down, negotiations resumed in 1992.',
      'Joe Slovo proposed the "Sunset Clause" to break the deadlock.',
      'Parties winning over 5% would serve in a Government of National Unity.',
      'The GNU would last for 5 years. Whites could keep their positions.',
      'On 2 April 1993, the Multi-Party Negotiating Forum agreed.',
      'The election was set for 27 April 1994.',
      'The ANC won 62.6%. The NP won 20.4%. The IFP won 10.5%.',
      'Nelson Mandela became the first democratically elected President.',
      'Thabo Mbeki and FW de Klerk became his deputies.',
      'The GNU was born.',
    ],
  },

  'p2-trc-establishment': {
    title: 'The TRC — Establishment',
    sentences: [
      'In 1995, the Promotion of National Unity and Reconciliation Act established the TRC.',
      'The TRC had three committees.',
      'Human Rights Violations heard victims\u2019 stories.',
      'Amnesty heard perpetrators apply for amnesty.',
      'Reparations recommended compensation for victims.',
      'Archbishop Desmond Tutu chaired the TRC.',
      'Dullah Omar was the Minister who proposed it.',
      'The choice was: Nuremberg-style trials, or amnesty in exchange for truth.',
      'South Africa chose truth.',
      'For the first time, apartheid\u2019s crimes were investigated openly.',
    ],
  },

  'p2-trc-justice': {
    title: 'TRC — Retributive vs Restorative Justice',
    sentences: [
      'Retributive justice means: punish the wrongdoer. Trials and prison.',
      'Restorative justice means: heal the victim, repair the community.',
      'The TRC chose restorative justice.',
      'Amnesty was not forgiveness — it was a legal exchange.',
      'Full truth in return for immunity from prosecution.',
      'Victims told their stories in public.',
      'The community heard what happened.',
      'Amnesty was granted only if the perpetrator made full disclosure.',
      'If the perpetrator lied or hid facts, amnesty was refused.',
      'The TRC\u2019s approach was imperfect but deliberate.',
    ],
  },

  'p2-trc-amnesty': {
    title: 'TRC — Amnesty',
    sentences: [
      'Amnesty meant: no prosecution for a politically motivated crime.',
      'The act had to be politically motivated.',
      'The applicant had to make full disclosure.',
      'The act had to be proportionate to the objective.',
      'The Amnesty Committee decided each case individually.',
      'Many South Africans were furious that killers walked free.',
      'Victims\u2019 families were not always told the truth.',
      'Reparations were slow and small.',
      'Some said the TRC put victims\u2019 pain on display without giving closure.',
      'Amnesty gave truth, but not always justice.',
    ],
  },

  'p2-trc-case-studies': {
    title: 'TRC — Case Studies',
    sentences: [
      'Sizwe Kondile was an ANC activist abducted in 1981.',
      'He was tortured, shot, and burned by the security police.',
      'His mother, Charity Kondile, refused to forgive his killers.',
      'She wanted a trial, not amnesty.',
      'In 2016, a symbolic "spiritual repatriation" was held at Freedom Park.',
      'Rev. Tshenuwani Farisani was tortured in Venda between 1977 and 1987.',
      'He testified at the TRC, asking for truth, not revenge.',
      'The Amnesty Committee rejected the amnesty of three policemen who tortured him.',
      'They did not make full disclosure.',
      'The TRC gave some families closure — others only the truth.',
    ],
  },

  'p2-gorbachev-reforms': {
    title: 'Gorbachev\'s Reforms',
    sentences: [
      'In 1985, Mikhail Gorbachev became leader of the Soviet Union.',
      'The economy was broken and the arms race had drained the treasury.',
      'He introduced Perestroika — economic reconstruction.',
      'Perestroika allowed small-scale private ownership.',
      'He introduced Glasnost — openness.',
      'Glasnost reduced censorship and allowed criticism of government.',
      'Political prisoners were released.',
      'Relations with the USA were normalised.',
      'But Glasnost also allowed criticism of communism itself.',
      'Both reforms went further than Gorbachev intended.',
    ],
  },

  'p2-eastern-europe': {
    title: 'Eastern Europe, 1989',
    sentences: [
      'The Soviet Union controlled Eastern Europe since WWII.',
      'In 1989, one by one, the satellite states broke away.',
      'Poland held free elections in June.',
      'Hungary opened its border to Austria in August.',
      'On 9 November 1989, the Berlin Wall fell.',
      'Czechoslovakia had its Velvet Revolution in November.',
      'Romania overthrew and executed Ceausescu in December.',
      'Gorbachev refused to send Soviet troops.',
      'Without Soviet tanks, the regimes fell to their own people.',
      'The Brezhnev Doctrine was dead.',
    ],
  },

  'p2-ussr-disintegration': {
    title: 'The Disintegration of the USSR',
    sentences: [
      'The USSR was made up of 15 republics.',
      'Old nationalisms had been suppressed, not killed.',
      'Glasnost allowed them to speak.',
      'Perestroika gave them economic reasons to leave.',
      'In 1990, several republics declared independence.',
      'Boris Yeltsin became the leader of Russia.',
      'In August 1991, hardliners tried a coup. It failed.',
      'On 25 December 1991, Gorbachev resigned.',
      'The USSR was dissolved.',
      'The Cold War was over.',
    ],
  },

  'p2-globalisation': {
    title: 'Globalisation',
    sentences: [
      'Globalisation means the world has become more connected.',
      'Trade, technology, transport, and communication have all accelerated.',
      'Money, goods, and ideas move faster and cheaper than ever.',
      'It has created huge opportunities — and huge inequality.',
      'Free trade agreements opened markets.',
      'Multinational companies expanded globally.',
      'From above: driven by powerful nations and institutions.',
      'From below: driven by grassroots movements resisting exploitation.',
      'Beneficiaries: multinationals, rich nations, urban elites.',
      'Losers: local industries, workers, the environment.',
    ],
  },

  'p2-balance-of-power-africa': {
    title: 'Balance of Power and Africa',
    sentences: [
      'When the Cold War ended, Africa lost its strategic value.',
      'The USA and USSR no longer needed allies in Africa.',
      'In the 1980s, many African countries fell into debt crises.',
      'They turned to the IMF and World Bank for loans.',
      'The IMF and World Bank required Structural Adjustment Programmes.',
      'SAPs meant: cut spending, privatise, remove subsidies, open markets.',
      'These policies hurt the poor most.',
      'They left countries dependent on foreign lenders.',
      'Some argued Africa had swapped one master for another.',
      'Debt, not empire, became the new form of control.',
    ],
  },

  'p2-brics': {
    title: 'BRICS',
    sentences: [
      'BRIC began in 2006 with Brazil, Russia, India, and China.',
      'South Africa joined in 2010, making it BRICS.',
      'The aim was to counter-balance the economic dominance of the G7.',
      'On 1 January 2024, six new countries joined.',
      'They were Argentina, Egypt, Ethiopia, Iran, Saudi Arabia, and the UAE.',
      'BRICS wants a multi-polar world.',
      'It advocates de-dollarisation — reducing reliance on the US dollar.',
      'It created the New Development Bank as an alternative to the IMF.',
      'It is building an independent payment system.',
      'The Global South is organising.',
    ],
  },

  'p2-responses-globalisation': {
    title: 'Responses to Globalisation',
    sentences: [
      'Globalisation has not delivered on all its promises.',
      'Inequality has grown. The environment has suffered.',
      'Local industries have collapsed in many countries.',
      'In the Global South, people have protested.',
      'Trade unions, community groups, and social movements have resisted.',
      'In 2011, South African unions resisted Walmart\u2019s takeover of Massmart.',
      'They called Walmart an "economic coloniser".',
      'They demanded protection for local jobs and industries.',
      'The Global North dominates the global economy.',
      'The Global South argues that the rules are rigged.',
    ],
  },

};

export const HISTORY_AUTO_ORDER = [
  // P1 — unchanged
  'cold-war-origins',
  'cold-war-containment',
  'cold-war-berlin-1948',
  'berlin-wall',
  'cold-war-vietnam',
  'independent-africa-angola',
  'cuito-cuanavale',
  'independent-africa-congo',
  'civil-rights-sit-ins',
  'civil-rights-selma',
  'civil-rights-freedom-rides',
  'march-on-washington',
  'mlk-non-violence',
  'black-power-movement',
  // P2 — new
  'p2-bc-nature-aims',
  'p2-bcm-organisations',
  'p2-soweto-1976',
  'p2-black-local-authorities',
  'p2-trade-union-movement',
  'p2-internal-resistance-1980s',
  'p2-rent-boycotts',
  'p2-negotiations-1989-1991',
  'p2-codesa',
  'p2-violence-derail',
  'p2-road-to-1994',
  'p2-trc-establishment',
  'p2-trc-justice',
  'p2-trc-amnesty',
  'p2-trc-case-studies',
  'p2-gorbachev-reforms',
  'p2-eastern-europe',
  'p2-ussr-disintegration',
  'p2-globalisation',
  'p2-balance-of-power-africa',
  'p2-brics',
  'p2-responses-globalisation',
];