// src/data/MathsContent.js
// Pure Mathematics Grade 12 — NSC P1 + P2
// 56 concepts across 13 topics
// TEACHING_SCRIPTS (Layer 2) + AUTO_SCRIPTS + AUTO_ORDER (Layer 3)

// ═══════════════════════════════════════════════════════════════════
// LAYER 2 — TEACHING SCRIPTS
// Every concept: 4-6 sections, ends with an `example` section.
// Every `scene` section has: sceneId, caption, steps, stepTexts, config.title
// ═══════════════════════════════════════════════════════════════════

export const MATHS_TEACHING_SCRIPTS = {

  // ───────────────────────────────────────────────────────────────
  // TOPIC 1 — ALGEBRA, EQUATIONS & INEQUALITIES (6 concepts)
  // ───────────────────────────────────────────────────────────────

  'alg-factorising-quadratics': {
    sections: [
      { type: 'heading', text: 'Factorising Quadratics' },
      { type: 'concept', label: 'The Big Idea', text: 'A quadratic is any equation with x² as its highest power. To solve it, we usually factorise — write it as two brackets multiplied together.' },
      {
        type: 'scene',
        sceneId: 'alg-factorising-quadratics',
        caption: 'Think of a quadratic as a rectangle. Factorising splits it into two sides.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Factorising a Quadratic' },
        stepTexts: [
          null,
          'x² + 5x + 6 is the area of a rectangle.',
          'It splits into (x + 2)(x + 3) — the two side lengths.',
          'Set each side to zero: x = −2 or x = −3.',
        ],
      },
      { type: 'bullets', label: 'The Golden Rule', items: [
        'If (A)(B) = 0, then A = 0 or B = 0.',
        'Find two numbers that multiply to the constant and add to the middle coefficient.',
        'Always check your factors by expanding back.',
      ]},
      {
        type: 'example',
        scenario: 'Solve (3x − 6)(x + 2) = 0.',
        steps: ['Set each bracket to zero.', '3x − 6 = 0 → x = 2.', 'x + 2 = 0 → x = −2.'],
        answer: 'x = 2 or x = −2',
        sceneId: 'alg-factorising-quadratics',
      },
    ],
  },

  'alg-quadratic-formula': {
    sections: [
      { type: 'heading', text: 'The Quadratic Formula' },
      { type: 'concept', label: 'The Big Idea', text: 'When a quadratic will not factorise neatly, the quadratic formula always works. Memorise it — it is on the info sheet.' },
      {
        type: 'scene',
        sceneId: 'alg-quadratic-formula',
        caption: 'The formula is a machine: feed in a, b, c and out come the roots.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'The Quadratic Formula' },
        stepTexts: [
          null,
          'Write the equation in the form ax² + bx + c = 0.',
          'Identify a, b, c carefully — signs matter.',
          'Substitute into x = (−b ± √(b² − 4ac)) / 2a.',
        ],
      },
      { type: 'bullets', label: 'Watch Out For', items: [
        'Bring everything to one side first — standard form.',
        'If the question says "two decimal places", round at the very end.',
        'The ± gives you two answers.',
      ]},
      {
        type: 'example',
        scenario: 'Solve 2x² − 6x + 1 = 0 (correct to TWO decimals).',
        steps: ['a = 2, b = −6, c = 1.', 'x = (6 ± √(36 − 8)) / 4.', 'x = (6 ± √28) / 4.'],
        answer: 'x = 2.82 or x = 0.18',
        sceneId: 'alg-quadratic-formula',
      },
    ],
  },

  'alg-quadratic-inequalities': {
    sections: [
      { type: 'heading', text: 'Quadratic Inequalities' },
      { type: 'concept', label: 'The Big Idea', text: 'A quadratic inequality asks: for which x-values is the parabola above or below the x-axis? Solve the equality first, then read the graph.' },
      {
        type: 'scene',
        sceneId: 'alg-quadratic-inequalities',
        caption: 'The parabola crosses the x-axis at the critical values. The inequality tells you which side to shade.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Reading the Parabola' },
        stepTexts: [
          null,
          'Factorise and find the critical values where the expression equals zero.',
          'These critical values split the number line into intervals.',
          'Test one value in each interval, or read off the parabola shape.',
        ],
      },
      { type: 'bullets', label: 'The Method', items: [
        'Move everything to the left: expression > 0 or < 0.',
        'Factorise the left side.',
        'Find critical values, then test intervals.',
        'Write the answer in interval notation.',
      ]},
      {
        type: 'example',
        scenario: 'Solve x² − 90 > x.',
        steps: ['x² − x − 90 > 0.', '(x + 9)(x − 10) > 0.', 'Critical values: x = −9, x = 10. Parabola opens up, so > 0 outside the roots.'],
        answer: 'x < −9 or x > 10',
        sceneId: 'alg-quadratic-inequalities',
      },
    ],
  },

  'alg-surds': {
    sections: [
      { type: 'heading', text: 'Surd Equations' },
      { type: 'concept', label: 'The Big Idea', text: 'A surd equation has the unknown under a square root. Isolate the root first, then square both sides. Always check your answers — squaring can introduce false solutions.' },
      {
        type: 'scene',
        sceneId: 'alg-surds',
        caption: 'Squaring both sides is like lifting a mask — sometimes a fake solution slips through.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Solving a Surd Equation' },
        stepTexts: [
          null,
          'Get the square root on its own on one side.',
          'Square both sides to remove the root.',
          'Solve the resulting equation, then test both answers in the ORIGINAL equation.',
        ],
      },
      { type: 'bullets', label: 'The Trap', items: [
        'Squaring both sides can create solutions that do not work.',
        'ALWAYS substitute back into the original equation.',
        'Reject the false one — write "x ≠ ..." or "invalid".',
      ]},
      {
        type: 'example',
        scenario: 'Solve x − 7√x = −12.',
        steps: ['Let √x = k, so x = k².', 'k² − 7k + 12 = 0.', '(k − 3)(k − 4) = 0 → k = 3 or k = 4.'],
        answer: 'x = 9 or x = 16 (both valid)',
        sceneId: 'alg-surds',
      },
    ],
  },

  'alg-simultaneous-equations': {
    sections: [
      { type: 'heading', text: 'Simultaneous Equations' },
      { type: 'concept', label: 'The Big Idea', text: 'When one equation is linear and the other is not, isolate one variable in the linear equation, then substitute into the other.' },
      {
        type: 'scene',
        sceneId: 'alg-simultaneous-equations',
        caption: 'The linear equation gives you a "handle" on one variable. Use it to unlock the other.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Substitution Method' },
        stepTexts: [
          null,
          'From the linear equation, make one variable the subject.',
          'Substitute that expression into the non-linear equation.',
          'Solve the resulting quadratic — you get two pairs of answers.',
        ],
      },
      { type: 'bullets', label: 'Remember', items: [
        'Two equations, two unknowns.',
        'Answers come in PAIRS — (x; y).',
        'Always give both pairs.',
      ]},
      {
        type: 'example',
        scenario: 'Solve 2x − y = 2 and xy = 4 simultaneously.',
        steps: ['From the linear: y = 2x − 2.', 'Substitute: x(2x − 2) = 4 → 2x² − 2x − 4 = 0.', 'x² − x − 2 = 0 → (x − 2)(x + 1) = 0.'],
        answer: '(2; 2) or (−1; −4)',
        sceneId: 'alg-simultaneous-equations',
      },
    ],
  },

  'alg-exponential-equations': {
    sections: [
      { type: 'heading', text: 'Exponential Equations' },
      { type: 'concept', label: 'The Big Idea', text: 'An exponential equation has the unknown in the exponent. The trick is to get the SAME BASE on both sides, then equate the exponents.' },
      {
        type: 'scene',
        sceneId: 'alg-exponential-equations',
        caption: 'Same base on both sides means the exponents must be equal.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Same Base, Equal Exponents' },
        stepTexts: [
          null,
          'Use exponent laws to simplify each side.',
          'If you can write both sides as the same base, drop the bases.',
          'Solve the resulting linear or quadratic equation.',
        ],
      },
      { type: 'bullets', label: 'Key Laws', items: [
        'aᵐ × aⁿ = aᵐ⁺ⁿ',
        'aᵐ ÷ aⁿ = aᵐ⁻ⁿ',
        '(aᵐ)ⁿ = aᵐⁿ',
        'a⁰ = 1 for any a ≠ 0',
        'If aˣ = aʸ then x = y.',
      ]},
      {
        type: 'example',
        scenario: 'Solve 2^(2x) − 2^(x+2) − 32 = 0.',
        steps: ['Rewrite: 2^(2x) − 4·2ˣ − 32 = 0.', 'Let k = 2ˣ: k² − 4k − 32 = 0.', '(k − 8)(k + 4) = 0 → k = 8 (k = −4 invalid).'],
        answer: '2ˣ = 8 → x = 3',
        sceneId: 'alg-exponential-equations',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 2 — PATTERNS & SEQUENCES (5 concepts)
  // ───────────────────────────────────────────────────────────────

  'seq-geometric-series': {
    sections: [
      { type: 'heading', text: 'Geometric Series' },
      { type: 'concept', label: 'The Big Idea', text: 'In a geometric sequence, each term is found by multiplying the previous one by a constant ratio r. If |r| < 1, the series converges to a finite sum.' },
      {
        type: 'scene',
        sceneId: 'seq-geometric-series',
        caption: 'Each term is a scaled copy of the one before it — like zooming in or out.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Geometric Growth' },
        stepTexts: [
          null,
          'First term a, common ratio r.',
          'Tₙ = a·r^(n−1).',
          'Sum of n terms: Sₙ = a(rⁿ − 1)/(r − 1) for r ≠ 1.',
          'Sum to infinity: S∞ = a/(1 − r) only if −1 < r < 1.',
        ],
      },
      { type: 'bullets', label: 'Formulae', items: [
        'Tₙ = a·r^(n−1)',
        'Sₙ = a(rⁿ − 1)/(r − 1)',
        'S∞ = a/(1 − r), −1 < r < 1',
      ]},
      {
        type: 'example',
        scenario: 'First term 14, 6th term 448. Find r.',
        steps: ['T₆ = 14·r⁵ = 448.', 'r⁵ = 32.', 'r = 2.'],
        answer: 'r = 2',
        sceneId: 'seq-geometric-series',
      },
    ],
  },

  'seq-sigma-notation': {
    sections: [
      { type: 'heading', text: 'Sigma Notation' },
      { type: 'concept', label: 'The Big Idea', text: 'The Σ symbol means "add up". The bottom tells you where to start, the top where to stop, and the formula after Σ tells you what to add each time.' },
      {
        type: 'scene',
        sceneId: 'seq-sigma-notation',
        caption: 'Sigma is a compact way of writing "add all these terms".',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Breaking Down Σ' },
        stepTexts: [
          null,
          'Σ from p = 0 to k means: start at p = 0, stop at p = k.',
          'Substitute each p-value into the formula.',
          'Add all the results together.',
        ],
      },
      { type: 'bullets', label: 'Common Forms', items: [
        'Σ(linear in p) → arithmetic series.',
        'Σ(a·r^p) → geometric series.',
        'n = (top) − (bottom) + 1 terms.',
      ]},
      {
        type: 'example',
        scenario: 'If Σ(p=0 to k)(⅓p + ⅙) = 20⅙, find k.',
        steps: ['T₁ = ⅙, T₂ = ⅓ + ⅙ = ½. d = ⅓.', 'Sₙ = n/2[2(⅙) + (n−1)(⅓)] = 121/6.', 'n² = 121 → n = 11.'],
        answer: 'k = n − 1 = 10',
        sceneId: 'seq-sigma-notation',
      },
    ],
  },

  'seq-quadratic-patterns': {
    sections: [
      { type: 'heading', text: 'Quadratic Patterns' },
      { type: 'concept', label: 'The Big Idea', text: 'A quadratic pattern has a constant SECOND difference. Its general term is Tₙ = an² + bn + c, where 2a = second difference.' },
      {
        type: 'scene',
        sceneId: 'seq-quadratic-patterns',
        caption: 'First differences change by a constant amount — the second difference.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'The Second Difference' },
        stepTexts: [
          null,
          'Write the terms. Find first differences.',
          'Find the difference of the first differences — this is constant.',
          '2a = second difference, then solve for b and c.',
        ],
      },
      { type: 'bullets', label: 'Key Facts', items: [
        '2a = constant second difference.',
        'Use T₁, T₂, T₃ to set up equations for b and c.',
        'Check: does Tₙ match all given terms?',
      ]},
      {
        type: 'example',
        scenario: 'Tₙ = n² + bn + 9 and first difference starts at 7. Find b.',
        steps: ['T₁ = 1 + b + 9 = b + 10.', 'T₂ = 4 + 2b + 9 = 2b + 13.', 'T₂ − T₁ = b + 3 = 7.'],
        answer: 'b = 4',
        sceneId: 'seq-quadratic-patterns',
      },
    ],
  },

  'seq-arithmetic-series': {
    sections: [
      { type: 'heading', text: 'Arithmetic Series' },
      { type: 'concept', label: 'The Big Idea', text: 'In an arithmetic sequence, you ADD the same number d each time. The sum of the first n terms is a neat formula.' },
      {
        type: 'scene',
        sceneId: 'seq-arithmetic-series',
        caption: 'Equal steps along a number line — that is an arithmetic sequence.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Equal Steps' },
        stepTexts: [
          null,
          'First term a, common difference d.',
          'Tₙ = a + (n − 1)d.',
          'Sₙ = n/2[2a + (n − 1)d] = n/2(a + ℓ).',
        ],
      },
      { type: 'bullets', label: 'Formulae', items: [
        'Tₙ = a + (n − 1)d',
        'Sₙ = n/2[2a + (n − 1)d]',
        'Sₙ = n/2(a + last term)',
      ]},
      {
        type: 'example',
        scenario: 'Series 7 + 12 + 17 + … Find T₉₁ and S₉₁.',
        steps: ['a = 7, d = 5.', 'T₉₁ = 7 + 90(5) = 457.', 'S₉₁ = 91/2(7 + 457) = 91/2(464).'],
        answer: 'T₉₁ = 457, S₉₁ = 21112',
        sceneId: 'seq-arithmetic-series',
      },
    ],
  },

  'seq-mixed-geometric-arithmetic': {
    sections: [
      { type: 'heading', text: 'Mixed Sequence Problems' },
      { type: 'concept', label: 'The Big Idea', text: 'Some questions give you BOTH an arithmetic and a geometric sequence, then link them. Write both formulae, set up the equation, solve.' },
      {
        type: 'scene',
        sceneId: 'seq-mixed-geometric-arithmetic',
        caption: 'Two sequences side by side — find the link and equate.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Linking Two Sequences' },
        stepTexts: [
          null,
          'Write the AS sum: Sₙ = n/2[2a + (n−1)d].',
          'Write the GS sum: S∞ = a/(1 − r) or Sₙ = a(rⁿ−1)/(r−1).',
          'Set the given relationship equal and solve.',
        ],
      },
      { type: 'bullets', label: 'Watch Out For', items: [
        'Same first term a is often given.',
        'S∞ only exists if |r| < 1.',
        'Words like "734 more than" mean add 734.',
      ]},
      {
        type: 'example',
        scenario: 'GS and AS share first term a. r = ⅓, d = 3. S₂₂ = S∞ + 734. Find a.',
        steps: ['S₂₂ = 22/2[2a + 21(3)] = 22a + 693.', 'S∞ = a/(1 − ⅓) = 3a/2.', '22a + 693 = 3a/2 + 734.'],
        answer: 'a = 2',
        sceneId: 'seq-mixed-geometric-arithmetic',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 3 — FUNCTIONS & GRAPHS (5 concepts)
  // ───────────────────────────────────────────────────────────────

  'func-hyperbola': {
    sections: [
      { type: 'heading', text: 'The Hyperbola' },
      { type: 'concept', label: 'The Big Idea', text: 'A hyperbola is the graph of y = a/(x + p) + q. It has TWO asymptotes: a vertical line x = −p and a horizontal line y = q.' },
      {
        type: 'scene',
        sceneId: 'func-hyperbola',
        caption: 'Two curves that race away from the asymptotes but never touch them.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'y = a/(x + p) + q' },
        stepTexts: [
          null,
          'Vertical asymptote: x = −p.',
          'Horizontal asymptote: y = q.',
          'The shape depends on the sign of a.',
        ],
      },
      { type: 'bullets', label: 'Key Features', items: [
        'Asymptotes intersect at (−p; q).',
        'Axes of symmetry: y = x + t and y = −x + t through the intersection point.',
        'x-intercept: set y = 0. y-intercept: set x = 0.',
      ]},
      {
        type: 'example',
        scenario: 'h(x) = 1/(x + p) + q. Asymptotes intersect at (1; 2).',
        steps: ['Vertical asymptote x = 1 → −p = 1 → p = −1.', 'Horizontal asymptote y = 2 → q = 2.'],
        answer: 'p = −1, q = 2',
        sceneId: 'func-hyperbola',
      },
    ],
  },

  'func-parabola-exponential': {
    sections: [
      { type: 'heading', text: 'Parabola & Exponential Together' },
      { type: 'concept', label: 'The Big Idea', text: 'Many questions show a parabola f(x) = ax² + bx + c and an exponential g(x) = a·2ˣ + q on the same axes. Find each shape\'s key features, then read the intersections.' },
      {
        type: 'scene',
        sceneId: 'func-parabola-exponential',
        caption: 'A U-shape and a curve that climbs — find where they meet.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Parabola Meets Exponential' },
        stepTexts: [
          null,
          'Turning point of parabola: x = −b/(2a).',
          'Exponential asymptote: y = q.',
          'Intersections: set f(x) = g(x).',
        ],
      },
      { type: 'bullets', label: 'Checklist', items: [
        'y-intercept of parabola = c.',
        'Turning point (x; y) — substitute x back in.',
        'Range of exponential depends on sign of a and asymptote.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = x² − 4x − 5, C is y-intercept of f and lies on asymptote of g.',
        steps: ['C = (0; −5).', 'Asymptote of g: y = −5 → q = −5.', 'Turning point of f: x = 2, y = 4 − 8 − 5 = −9.'],
        answer: 'D(2; −9)',
        sceneId: 'func-parabola-exponential',
      },
    ],
  },

  'func-inverses': {
    sections: [
      { type: 'heading', text: 'Inverse Functions' },
      { type: 'concept', label: 'The Big Idea', text: 'The inverse of a function "undoes" it. Swap x and y, then solve for y. The inverse is a reflection of the original graph in the line y = x.' },
      {
        type: 'scene',
        sceneId: 'func-inverses',
        caption: 'Reflecting in y = x flips the graph — that is the inverse.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Reflecting in y = x' },
        stepTexts: [
          null,
          'Write the original as y = f(x).',
          'Swap x and y: x = f(y).',
          'Solve for y to get f⁻¹(x).',
        ],
      },
      { type: 'bullets', label: 'Key Facts', items: [
        'The inverse is not always a function — restrict the domain if needed.',
        'f and f⁻¹ intersect on the line y = x.',
        'For g(x) = 2x + 6, g⁻¹(x) = (x − 6)/2.',
      ]},
      {
        type: 'example',
        scenario: 'g(x) = 2x + 6. Find g⁻¹(x).',
        steps: ['y = 2x + 6.', 'Swap: x = 2y + 6.', 'Solve: y = (x − 6)/2.'],
        answer: 'g⁻¹(x) = ½x − 3',
        sceneId: 'func-inverses',
      },
    ],
  },

  'func-exponential-log': {
    sections: [
      { type: 'heading', text: 'Exponential & Logarithmic Graphs' },
      { type: 'concept', label: 'The Big Idea', text: 'y = aˣ and y = log_a x are inverses of each other. The exponential grows (or decays); the logarithm "reads off" the exponent.' },
      {
        type: 'scene',
        sceneId: 'func-exponential-log',
        caption: 'The exponential curve mirrors into the log curve across y = x.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'aˣ and log_a x' },
        stepTexts: [
          null,
          'y = aˣ has asymptote y = 0.',
          'y = log_a x has asymptote x = 0.',
          'They are reflections of each other in y = x.',
        ],
      },
      { type: 'bullets', label: 'Key Features', items: [
        'y = aˣ passes through (0; 1).',
        'y = log_a x passes through (1; 0).',
        'If a > 1 the graph increases; if 0 < a < 1 it decreases.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = 2ˣ − 4. Find the x-intercept.',
        steps: ['Set f(x) = 0.', '2ˣ = 4.', 'x = 2.'],
        answer: 'B(2; 0)',
        sceneId: 'func-exponential-log',
      },
    ],
  },

  'func-transformations': {
    sections: [
      { type: 'heading', text: 'Transformations of Graphs' },
      { type: 'concept', label: 'The Big Idea', text: 'Shifting a graph changes its equation: f(x) + k moves it UP, f(x + k) moves it LEFT, −f(x) flips it vertically.' },
      {
        type: 'scene',
        sceneId: 'func-transformations',
        caption: 'Each transformation is a rule applied to the whole graph.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Shifting the Curve' },
        stepTexts: [
          null,
          'f(x) + k: shift UP by k units.',
          'f(x + k): shift LEFT by k units.',
          'f(x − k): shift RIGHT by k units.',
          '−f(x): reflect in the x-axis.',
        ],
      },
      { type: 'bullets', label: 'Remember', items: [
        'INSIDE the bracket → horizontal shift (opposite direction).',
        'OUTSIDE the bracket → vertical shift (same direction).',
        'Reflection in y-axis: f(−x).',
      ]},
      {
        type: 'example',
        scenario: 'g(x) = f(x) + 4 where f(x) = 2ˣ − 4.',
        steps: ['Add 4 to the whole function.', 'g(x) = 2ˣ − 4 + 4.', 'Simplify.'],
        answer: 'g(x) = 2ˣ',
        sceneId: 'func-transformations',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 4 — FINANCIAL MATHEMATICS (4 concepts)
  // ───────────────────────────────────────────────────────────────

  'fin-compound-interest': {
    sections: [
      { type: 'heading', text: 'Compound Interest' },
      { type: 'concept', label: 'The Big Idea', text: 'Compound interest means interest earns interest. The formula is A = P(1 + i)ⁿ where i is the rate per period and n the number of periods.' },
      {
        type: 'scene',
        sceneId: 'fin-compound-interest',
        caption: 'Money grows like a staircase — each step is bigger than the last.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'A = P(1 + i)ⁿ' },
        stepTexts: [
          null,
          'P is the principal (starting amount).',
          'i is the rate PER PERIOD — divide annual rate by periods per year.',
          'n is the number of periods — multiply years by periods per year.',
        ],
      },
      { type: 'bullets', label: 'Watch Out For', items: [
        'Compounded quarterly: i = annual/4, n = 4 × years.',
        'Compounded monthly: i = annual/12, n = 12 × years.',
        'Effective rate: 1 + i_eff = (1 + i_nom/m)ᵐ.',
      ]},
      {
        type: 'example',
        scenario: 'R12000 at m% p.a. compounded quarterly → R13459 after 24 months. Find m.',
        steps: ['13459 = 12000(1 + m/400)⁸.', '(1 + m/400)⁸ = 1.121.', '1 + m/400 = 1.0144.'],
        answer: 'm = 5.78%',
        sceneId: 'fin-compound-interest',
      },
    ],
  },

  'fin-annuities-future-value': {
    sections: [
      { type: 'heading', text: 'Future Value Annuities' },
      { type: 'concept', label: 'The Big Idea', text: 'An annuity is a series of equal payments. The future value formula F = x[(1+i)ⁿ − 1]/i tells you how much you will have after n payments.' },
      {
        type: 'scene',
        sceneId: 'fin-annuities-future-value',
        caption: 'Each deposit grows for a different amount of time — some for longer than others.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'F = x[(1+i)ⁿ − 1]/i' },
        stepTexts: [
          null,
          'x is the regular payment.',
          'i is the rate per period.',
          'n is the number of payments.',
        ],
      },
      { type: 'bullets', label: 'Deposit Timing', items: [
        'Deposits at END of period: standard future value formula.',
        'Deposits at BEGINNING: multiply by (1 + i) once more.',
        'Last deposit earns no interest.',
      ]},
      {
        type: 'example',
        scenario: 'R1000 monthly deposits at 7.5% p.a. compounded monthly for 12 months. Will Tino afford R13000?',
        steps: ['i = 0.075/12, n = 12, x = 1000.', 'F = 1000[(1 + 0.075/12)¹² − 1]/(0.075/12).', 'F = R12421.22.'],
        answer: 'No — short by R578.78',
        sceneId: 'fin-annuities-future-value',
      },
    ],
  },

  'fin-loans-present-value': {
    sections: [
      { type: 'heading', text: 'Loan Repayments' },
      { type: 'concept', label: 'The Big Idea', text: 'A loan is an annuity in reverse. The present value formula P = x[1 − (1+i)⁻ⁿ]/i tells you the loan amount that a series of repayments can pay off.' },
      {
        type: 'scene',
        sceneId: 'fin-loans-present-value',
        caption: 'Each payment chips away at the loan — but interest keeps adding back.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'P = x[1 − (1+i)⁻ⁿ]/i' },
        stepTexts: [
          null,
          'P is the loan amount (present value).',
          'x is the monthly repayment.',
          'n is the number of payments.',
        ],
      },
      { type: 'bullets', label: 'Tricky Cases', items: [
        'First payment delayed: grow the loan by (1+i) for the delay period.',
        'Extra payment: recalculate balance, then new n.',
        'Final payment may be smaller than usual.',
      ]},
      {
        type: 'example',
        scenario: 'R250000 car, 15% deposit, 13% p.a. compounded monthly over 6 years.',
        steps: ['Loan = 0.85 × 250000 = 212500.', 'i = 0.13/12, n = 72.', 'x = 212500 × i/[1 − (1+i)⁻⁷²].'],
        answer: 'x ≈ R4 270/month',
        sceneId: 'fin-loans-present-value',
      },
    ],
  },

  'fin-depreciation': {
    sections: [
      { type: 'heading', text: 'Depreciation' },
      { type: 'concept', label: 'The Big Idea', text: 'Depreciation is compound interest working BACKWARDS. Straight-line: A = P(1 − in). Reducing balance: A = P(1 − i)ⁿ.' },
      {
        type: 'scene',
        sceneId: 'fin-depreciation',
        caption: 'The value slides downhill — straight-line is a slope, reducing-balance is a curve.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Two Ways to Lose Value' },
        stepTexts: [
          null,
          'Straight-line: lose the SAME amount every year.',
          'Reducing balance: lose a PERCENTAGE of current value each year.',
          'Reducing balance always reaches zero more slowly.',
        ],
      },
      { type: 'bullets', label: 'Formulae', items: [
        'Straight-line: A = P(1 − in).',
        'Reducing balance: A = P(1 − i)ⁿ.',
        'To find when value = 0 (straight-line): n = 1/i.',
      ]},
      {
        type: 'example',
        scenario: 'A printer halves in value over 4 years using straight-line. Find the rate.',
        steps: ['½P = P(1 − 4i).', '½ = 1 − 4i.', '4i = ½ → i = 12.5%.'],
        answer: 'r = 12.5% per year',
        sceneId: 'fin-depreciation',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 5 — DIFFERENTIAL CALCULUS — RULES & FIRST PRINCIPLES (3)
  // ───────────────────────────────────────────────────────────────

  'calc-first-principles': {
    sections: [
      { type: 'heading', text: 'Derivative from First Principles' },
      { type: 'concept', label: 'The Big Idea', text: 'The derivative is the LIMIT of the average gradient as h → 0. It gives the gradient of the curve at a single point.' },
      {
        type: 'scene',
        sceneId: 'calc-first-principles',
        caption: 'A chord shrinks down to a tangent as h shrinks to zero.',
        steps: 4,
        stepDuration: 3200,
        config: { title: 'The Limit Definition' },
        stepTexts: [
          null,
          'Start with two points on the curve: x and x + h.',
          'The chord gradient is [f(x+h) − f(x)]/h.',
          'Let h shrink toward zero.',
          'The chord becomes the tangent — that is f\'(x).',
        ],
      },
      { type: 'bullets', label: 'The Formula', items: [
        'f\'(x) = lim(h→0) [f(x+h) − f(x)]/h.',
        'Expand f(x+h), simplify, then let h = 0.',
        'Never let h = 0 too early — you get 0/0.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = x² + x. Find f\'(x) from first principles.',
        steps: ['f(x+h) = (x+h)² + (x+h) = x² + 2xh + h² + x + h.', 'f(x+h) − f(x) = 2xh + h² + h.', 'Divide by h: 2x + h + 1. Let h → 0.'],
        answer: 'f\'(x) = 2x + 1',
        sceneId: 'calc-first-principles',
      },
    ],
  },

  'calc-differentiation-rules': {
    sections: [
      { type: 'heading', text: 'Differentiation Rules' },
      { type: 'concept', label: 'The Big Idea', text: 'For simple polynomials you do not need first principles. Use the power rule: bring the exponent down, subtract one from it.' },
      {
        type: 'scene',
        sceneId: 'calc-differentiation-rules',
        caption: 'The power drops down and steps aside — a clean, quick rule.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'The Power Rule' },
        stepTexts: [
          null,
          'For f(x) = axⁿ, f\'(x) = n·a·x^(n−1).',
          'Constants differentiate to zero.',
          'Rewrite roots and fractions as powers first.',
        ],
      },
      { type: 'bullets', label: 'Rules', items: [
        'd/dx[k] = 0.',
        'd/dx[xⁿ] = n·x^(n−1).',
        'd/dx[kf(x)] = k·f\'(x).',
        'Sum rule: differentiate term by term.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = 2x⁵ − 3x⁴ + 8x. Find f\'(x).',
        steps: ['Differentiate each term.', '2x⁵ → 10x⁴.', '−3x⁴ → −12x³.', '8x → 8.'],
        answer: 'f\'(x) = 10x⁴ − 12x³ + 8',
        sceneId: 'calc-differentiation-rules',
      },
    ],
  },

  'calc-tangents': {
    sections: [
      { type: 'heading', text: 'Tangents to Curves' },
      { type: 'concept', label: 'The Big Idea', text: 'The gradient of the tangent at a point is the value of the derivative at that point. Substitute x into f\'(x) to get m, then use y − y₁ = m(x − x₁).' },
      {
        type: 'scene',
        sceneId: 'calc-tangents',
        caption: 'The tangent just touches the curve — same gradient at the point of contact.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Finding the Tangent' },
        stepTexts: [
          null,
          'Find f\'(x).',
          'Substitute x = a to get m = f\'(a).',
          'Use point-slope form: y − f(a) = m(x − a).',
        ],
      },
      { type: 'bullets', label: 'Remember', items: [
        'Tangent: touches curve at one point, same gradient.',
        'Normal: perpendicular to tangent, m_normal = −1/m_tangent.',
        'Horizontal tangent when f\'(x) = 0.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = x³ − 4x² + 2x + 3. Find the tangent at x = 2.',
        steps: ['f\'(x) = 3x² − 8x + 2.', 'm = f\'(2) = 12 − 16 + 2 = −2.', 'f(2) = 8 − 16 + 4 + 3 = −1.'],
        answer: 'y = −2x + 3',
        sceneId: 'calc-tangents',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 6 — CALCULUS — CUBIC GRAPHS & OPTIMISATION (4)
  // ───────────────────────────────────────────────────────────────

  'calc-cubic-graphs': {
    sections: [
      { type: 'heading', text: 'Cubic Graphs' },
      { type: 'concept', label: 'The Big Idea', text: 'A cubic f(x) = ax³ + bx² + cx + d has up to two turning points and one point of inflection. Its shape tells you whether a > 0 or a < 0.' },
      {
        type: 'scene',
        sceneId: 'calc-cubic-graphs',
        caption: 'An S-shape when a > 0, a reverse-S when a < 0.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Shape of a Cubic' },
        stepTexts: [
          null,
          'a > 0: rises on the right, falls on the left.',
          'a < 0: rises on the left, falls on the right.',
          'Turning points where f\'(x) = 0.',
        ],
      },
      { type: 'bullets', label: 'Key Features', items: [
        'Turning points: solve f\'(x) = 0.',
        'Point of inflection: solve f\'\'(x) = 0.',
        'y-intercept: substitute x = 0.',
        'x-intercepts: factorise f(x) = 0.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = −x³ + 6x² − 9x + 4. Find turning points.',
        steps: ['f\'(x) = −3x² + 12x − 9 = 0.', 'x² − 4x + 3 = 0 → (x−1)(x−3) = 0.', 'x = 1 → f(1) = 0; x = 3 → f(3) = 4.'],
        answer: 'Turning points: (1; 0) and (3; 4)',
        sceneId: 'calc-cubic-graphs',
      },
    ],
  },

  'calc-turning-points-concavity': {
    sections: [
      { type: 'heading', text: 'Concavity & Inflection' },
      { type: 'concept', label: 'The Big Idea', text: 'The second derivative f\'\'(x) tells you concavity. f\'\' > 0 → concave up (smile). f\'\' < 0 → concave down (frown). f\'\' = 0 → point of inflection.' },
      {
        type: 'scene',
        sceneId: 'calc-turning-points-concavity',
        caption: 'Concave up is a smile; concave down is a frown.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Concavity' },
        stepTexts: [
          null,
          'Find f\'\'(x).',
          'Where f\'\' > 0, the curve holds water — concave up.',
          'Where f\'\' < 0, the curve spills water — concave down.',
          'Where f\'\' = 0, the curve changes shape — inflection.',
        ],
      },
      { type: 'bullets', label: 'Applications', items: [
        'Concave up: f\'\'(x) > 0.',
        'Concave down: f\'\'(x) < 0.',
        'Point of inflection: f\'\'(x) = 0 and sign of f\'\' changes.',
      ]},
      {
        type: 'example',
        scenario: 'g(x) = ax³ + 3x² + bx + c has minimum gradient at (−1; −7). For which x is g concave up?',
        steps: ['g\'(x) = 3ax² + 6x + b. Min gradient at x = −1.', 'g\'\'(x) = 6ax + 6. Set g\'\'(−1) = 0: 6a(−1) + 6 = 0 → a = 1.', 'Concave up: g\'\'(x) > 0 → 6x + 6 > 0.'],
        answer: 'x > −1',
        sceneId: 'calc-turning-points-concavity',
      },
    ],
  },

  'calc-optimisation': {
    sections: [
      { type: 'heading', text: 'Optimisation Problems' },
      { type: 'concept', label: 'The Big Idea', text: 'Optimisation means finding the MAXIMUM or MINIMUM of a real-world quantity. Set up a formula, differentiate, set derivative = 0.' },
      {
        type: 'scene',
        sceneId: 'calc-optimisation',
        caption: 'At the peak or valley, the gradient is flat — derivative = 0.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Peak or Valley' },
        stepTexts: [
          null,
          'Write the quantity you want to maximise or minimise as a formula.',
          'If two variables, use the constraint to reduce to one.',
          'Differentiate, set to zero, solve. Confirm max or min.',
        ],
      },
      { type: 'bullets', label: 'Typical Problems', items: [
        'Maximum volume of a box.',
        'Minimum surface area of a container.',
        'Minimum distance from a point to a curve.',
        'Maximum speed, minimum time.',
      ]},
      {
        type: 'example',
        scenario: 'A rectangular poster has text area 432 cm². Find page dimensions minimising total page area.',
        steps: ['Text: x by 432/x. Page: (x+8)(432/x + 6).', 'A(x) = 3456/x + 6x + 480.', 'A\'(x) = −3456/x² + 6 = 0.'],
        answer: 'x = 24 cm',
        sceneId: 'calc-optimisation',
      },
    ],
  },

  'calc-rates-of-change': {
    sections: [
      { type: 'heading', text: 'Rates of Change' },
      { type: 'concept', label: 'The Big Idea', text: 'The derivative tells you the RATE at which something changes. Speed is the rate of change of distance. Acceleration is the rate of change of speed.' },
      {
        type: 'scene',
        sceneId: 'calc-rates-of-change',
        caption: 'Speed tells you how fast distance is changing. Its derivative gives acceleration.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Rates' },
        stepTexts: [
          null,
          's(t) = distance at time t.',
          's\'(t) = speed (rate of distance).',
          's\'\'(t) = acceleration (rate of speed).',
        ],
      },
      { type: 'bullets', label: 'Key Points', items: [
        'Maximum speed: set s\'\'(t) = 0.',
        'Total distance: integrate or antidifferentiate.',
        'Stopped when s\'(t) = 0.',
      ]},
      {
        type: 'example',
        scenario: 'Cyclist speed s\'(t) = −3t² + 18t. Find maximum speed.',
        steps: ['Set s\'\'(t) = −6t + 18 = 0.', 't = 3.', 's\'(3) = −27 + 54.'],
        answer: 'Max speed = 27 km/h at t = 3 h',
        sceneId: 'calc-rates-of-change',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 7 — PROBABILITY (4 concepts)
  // ───────────────────────────────────────────────────────────────

  'prob-venn-diagrams': {
    sections: [
      { type: 'heading', text: 'Venn Diagrams' },
      { type: 'concept', label: 'The Big Idea', text: 'A Venn diagram shows events as overlapping circles. Overlaps mean "both happened". The area outside all circles is "none happened".' },
      {
        type: 'scene',
        sceneId: 'prob-venn-diagrams',
        caption: 'Overlaps show events that happen together. Outside shows nothing happening.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Two or Three Events' },
        stepTexts: [
          null,
          'Each circle is an event. Overlaps are "and".',
          'Total inside all circles = P(at least one).',
          'Outside all circles = P(none) = 1 − P(at least one).',
        ],
      },
      { type: 'bullets', label: 'Formulae', items: [
        'P(A or B) = P(A) + P(B) − P(A and B).',
        'P(none) = 1 − P(at least one).',
        'If independent: P(A and B) = P(A) × P(B).',
      ]},
      {
        type: 'example',
        scenario: '3-event Venn, P(at least one) = 0.893. Find P(none).',
        steps: ['P(none) = 1 − P(at least one).', '= 1 − 0.893.'],
        answer: 'y = 0.107',
        sceneId: 'prob-venn-diagrams',
      },
    ],
  },

  'prob-tree-diagrams': {
    sections: [
      { type: 'heading', text: 'Tree Diagrams' },
      { type: 'concept', label: 'The Big Idea', text: 'A tree diagram shows a sequence of events. Each branch is a probability. Multiply along a branch, add up all branches that give the same outcome.' },
      {
        type: 'scene',
        sceneId: 'prob-tree-diagrams',
        caption: 'First event splits, second event splits again. Multiply along branches, add across outcomes.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Two-Stage Tree' },
        stepTexts: [
          null,
          'First branch: probability of first event.',
          'Second branch: conditional probability given first.',
          'Multiply along each full path, then add paths for the desired outcome.',
        ],
      },
      { type: 'bullets', label: 'Key Points', items: [
        'Probabilities on each split sum to 1.',
        'Multiply along the branch.',
        'Add across branches for "or".',
      ]},
      {
        type: 'example',
        scenario: 'Rain 5%, then snow-given-rain 72%. Find P(rain AND snow).',
        steps: ['P(rain) = 0.05.', 'P(snow | rain) = 0.72.', 'Multiply along branch.'],
        answer: 'P(both) = 0.036',
        sceneId: 'prob-tree-diagrams',
      },
    ],
  },

  'prob-counting-principles': {
    sections: [
      { type: 'heading', text: 'Counting Principles' },
      { type: 'concept', label: 'The Big Idea', text: 'The fundamental counting principle: if one choice has m options and another has n options, together they have m × n options. Add when choices are exclusive.' },
      {
        type: 'scene',
        sceneId: 'prob-counting-principles',
        caption: 'Each choice branches — multiply the branches, add the alternative paths.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Counting Choices' },
        stepTexts: [
          null,
          'Count choices for each position.',
          'Multiply when ALL positions must be filled together.',
          'Add when alternative cases are exclusive.',
        ],
      },
      { type: 'bullets', label: 'Key Rules', items: [
        'With repetition: same options each time.',
        'Without repetition: options reduce each time.',
        'n! = n × (n−1) × ... × 1.',
        'Order matters → permutations.',
      ]},
      {
        type: 'example',
        scenario: 'A 4-digit code must be even, no 0 or 1, no repeated digits.',
        steps: ['Digits allowed: 2,3,4,5,6,7,8,9 (8 options).', 'Last digit must be even (4 options).', 'First 3 digits: 7 × 6 × 5 choices.'],
        answer: '7 × 6 × 5 × 4 = 840 codes',
        sceneId: 'prob-counting-principles',
      },
    ],
  },

  'prob-independent-mutually-exclusive': {
    sections: [
      { type: 'heading', text: 'Independent vs Mutually Exclusive' },
      { type: 'concept', label: 'The Big Idea', text: 'Independent events do not affect each other. Mutually exclusive events cannot happen together. Both terms have exact tests.' },
      {
        type: 'scene',
        sceneId: 'prob-independent-mutually-exclusive',
        caption: 'Independent: circles overlap. Mutually exclusive: circles do NOT touch.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Two Different Ideas' },
        stepTexts: [
          null,
          'Independent: P(A and B) = P(A) × P(B).',
          'Mutually exclusive: P(A and B) = 0.',
          'Mutually exclusive events are NOT independent.',
        ],
      },
      { type: 'bullets', label: 'The Tests', items: [
        'Independent if P(A and B) = P(A) × P(B).',
        'Mutually exclusive if P(A and B) = 0.',
        'These are different concepts — do not confuse them.',
      ]},
      {
        type: 'example',
        scenario: 'A and B independent. P(A) = ⅓, P(B) = ¾. Find P(A and B).',
        steps: ['Use independence. P(A and B) = P(A) × P(B).', '= ⅓ × ¾.'],
        answer: 'P(A and B) = ¼',
        sceneId: 'prob-independent-mutually-exclusive',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 8 — STATISTICS & REGRESSION (5 concepts)
  // ───────────────────────────────────────────────────────────────

  'stats-scatter-plots': {
    sections: [
      { type: 'heading', text: 'Scatter Plots' },
      { type: 'concept', label: 'The Big Idea', text: 'A scatter plot shows two variables as dots. If the dots trend upward, positive correlation; downward, negative. No trend means no correlation.' },
      {
        type: 'scene',
        sceneId: 'stats-scatter-plots',
        caption: 'Dots climbing right = positive. Dots falling right = negative. Random cloud = no correlation.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Reading a Scatter Plot' },
        stepTexts: [
          null,
          'Each dot is a pair (x; y).',
          'A tight line-up of dots means strong correlation.',
          'A loose cloud means weak or no correlation.',
        ],
      },
      { type: 'bullets', label: 'Key Terms', items: [
        'Positive correlation: x up, y up.',
        'Negative correlation: x up, y down.',
        'Correlation coefficient r: −1 ≤ r ≤ 1.',
      ]},
      {
        type: 'example',
        scenario: 'Do IQ scores predict number of votes?',
        steps: ['Points are scattered — no clear trend.', 'Correlation is weak.', 'IQ alone is a poor predictor.'],
        answer: 'IQ is not a good indicator',
        sceneId: 'stats-scatter-plots',
      },
    ],
  },

  'stats-least-squares': {
    sections: [
      { type: 'heading', text: 'Least Squares Regression' },
      { type: 'concept', label: 'The Big Idea', text: 'The least squares line ŷ = a + bx is the "best fit" straight line through a scatter plot. Your calculator gives a and b directly.' },
      {
        type: 'scene',
        sceneId: 'stats-least-squares',
        caption: 'The line that makes the dots\' total vertical distance as small as possible.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'ŷ = a + bx' },
        stepTexts: [
          null,
          'a is the y-intercept of the line.',
          'b is the gradient — how much ŷ changes per unit x.',
          'Substitute x to predict ŷ.',
        ],
      },
      { type: 'bullets', label: 'Using It', items: [
        'Enter data in your calculator, use the regression function.',
        'a and b are given — write the equation.',
        'Predict: substitute the given x into the equation.',
      ]},
      {
        type: 'example',
        scenario: 'Popularity vs votes: a = 1.77, b = 0.22. Predict votes for popularity 72.',
        steps: ['ŷ = 1.77 + 0.22x.', 'ŷ = 1.77 + 0.22(72).', 'ŷ = 17.61.'],
        answer: '≈ 18 votes',
        sceneId: 'stats-least-squares',
      },
    ],
  },

  'stats-correlation': {
    sections: [
      { type: 'heading', text: 'Correlation Coefficient' },
      { type: 'concept', label: 'The Big Idea', text: 'The correlation coefficient r measures how strong the linear relationship is. r near 1 or −1 means strong. r near 0 means weak or no linear relationship.' },
      {
        type: 'scene',
        sceneId: 'stats-correlation',
        caption: 'r tells you how tightly the dots hug the line.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'r Values' },
        stepTexts: [
          null,
          'r = 1: perfect positive correlation.',
          'r = −1: perfect negative correlation.',
          'r = 0: no linear relationship.',
        ],
      },
      { type: 'bullets', label: 'Interpreting r', items: [
        '0.9 to 1.0: very strong.',
        '0.7 to 0.9: strong.',
        '0.4 to 0.7: moderate.',
        '0 to 0.4: weak.',
      ]},
      {
        type: 'example',
        scenario: 'r = 0.98. Is the prediction reliable?',
        steps: ['r is close to 1.', 'This is very strong positive correlation.', 'The prediction is reliable.'],
        answer: 'Yes — very strong correlation',
        sceneId: 'stats-correlation',
      },
    ],
  },

  'stats-standard-deviation': {
    sections: [
      { type: 'heading', text: 'Standard Deviation' },
      { type: 'concept', label: 'The Big Idea', text: 'Standard deviation σ measures how SPREAD OUT the data is. Small σ = data clustered near the mean. Large σ = data widely scattered.' },
      {
        type: 'scene',
        sceneId: 'stats-standard-deviation',
        caption: 'Small σ: dots huddled. Large σ: dots scattered wide.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'How Spread Out?' },
        stepTexts: [
          null,
          'Find the mean x̄.',
          'Find each deviation (x − x̄).',
          'Square, average, square root: σ = √(Σ(x − x̄)²/n).',
        ],
      },
      { type: 'bullets', label: 'Rules', items: [
        'Adding a constant to every data point does NOT change σ.',
        'Multiplying by k multiplies σ by |k|.',
        'Data outside x̄ ± σ are "unusual".',
      ]},
      {
        type: 'example',
        scenario: 'Mean 15.5, SD 4.59. How many learners scored below x̄ − σ?',
        steps: ['x̄ − σ = 15.5 − 4.59 = 10.91.', 'Count learners with fewer than 10.91 votes.', '8 learners were above.'],
        answer: '8 learners invited (below-threshold excluded)',
        sceneId: 'stats-standard-deviation',
      },
    ],
  },

  'stats-ogives-histograms': {
    sections: [
      { type: 'heading', text: 'Ogives & Histograms' },
      { type: 'concept', label: 'The Big Idea', text: 'An ogive is a cumulative frequency graph. A histogram shows frequency per class. Both tell you about the shape of the data.' },
      {
        type: 'scene',
        sceneId: 'stats-ogives-histograms',
        caption: 'Ogives climb smoothly; histograms rise and fall like a bar chart.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Two Views of the Same Data' },
        stepTexts: [
          null,
          'Ogive: cumulative frequency vs upper class boundary.',
          'Histogram: frequency vs class interval (no gaps).',
          'Read the ogive to find median, quartiles, IQR.',
        ],
      },
      { type: 'bullets', label: 'Key Points', items: [
        'Median: read at 50% cumulative frequency.',
        'Q1: 25%, Q3: 75%. IQR = Q3 − Q1.',
        'Skewed right if tail extends right.',
      ]},
      {
        type: 'example',
        scenario: 'Ogive shows 60 employees. How many spent > 22.5% on fuel?',
        steps: ['Read ogive at 22.5%: cumulative = 34.', 'Employees above = 60 − 34.'],
        answer: '26 employees',
        sceneId: 'stats-ogives-histograms',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 9 — ANALYTICAL GEOMETRY — LINES & CIRCLES (5 concepts)
  // ───────────────────────────────────────────────────────────────

  'anageo-distance-gradient-midpoint': {
    sections: [
      { type: 'heading', text: 'Distance, Gradient, Midpoint' },
      { type: 'concept', label: 'The Big Idea', text: 'Three core formulae for any two points: distance (Pythagoras), gradient (rise/run), midpoint (average of coordinates).' },
      {
        type: 'scene',
        sceneId: 'anageo-distance-gradient-midpoint',
        caption: 'A right-angled triangle connects the points — Pythagoras does the rest.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'The Three Formulae' },
        stepTexts: [
          null,
          'Distance: d = √((x₂−x₁)² + (y₂−y₁)²).',
          'Gradient: m = (y₂−y₁)/(x₂−x₁).',
          'Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2).',
        ],
      },
      { type: 'bullets', label: 'Applications', items: [
        'Gradient and tan(θ) are linked: m = tan θ.',
        'Perpendicular: m₁ × m₂ = −1.',
        'Parallel: m₁ = m₂.',
      ]},
      {
        type: 'example',
        scenario: 'A(4;2), B(6;−4). Find gradient of AB and angle of inclination.',
        steps: ['m = (−4−2)/(6−4) = −3.', 'tan α = −3.', 'α = 180° − 71.57°.'],
        answer: 'm = −3, α = 108.43°',
        sceneId: 'anageo-distance-gradient-midpoint',
      },
    ],
  },

  'anageo-line-equations': {
    sections: [
      { type: 'heading', text: 'Equation of a Line' },
      { type: 'concept', label: 'The Big Idea', text: 'To find the equation of a line you need a point and the gradient. Use y − y₁ = m(x − x₁) or y = mx + c.' },
      {
        type: 'scene',
        sceneId: 'anageo-line-equations',
        caption: 'A point anchors the line; the gradient tilts it.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Point + Gradient = Line' },
        stepTexts: [
          null,
          'Find m — using two points or a parallel/perpendicular rule.',
          'Pick ONE point on the line.',
          'Use y − y₁ = m(x − x₁).',
        ],
      },
      { type: 'bullets', label: 'Forms', items: [
        'Slope-intercept: y = mx + c.',
        'Point-slope: y − y₁ = m(x − x₁).',
        'Standard form: ax + by + c = 0.',
      ]},
      {
        type: 'example',
        scenario: 'Line through C(−2; −3) and parallel to AB with m = −3.',
        steps: ['Parallel → same gradient, m = −3.', 'y − (−3) = −3(x − (−2)).', 'y + 3 = −3x − 6.'],
        answer: 'y = −3x − 9',
        sceneId: 'anageo-line-equations',
      },
    ],
  },

  'anageo-circles': {
    sections: [
      { type: 'heading', text: 'Equation of a Circle' },
      { type: 'concept', label: 'The Big Idea', text: 'A circle with centre (a; b) and radius r has equation (x − a)² + (y − b)² = r². Expand it if the question asks for standard form.' },
      {
        type: 'scene',
        sceneId: 'anageo-circles',
        caption: 'Every point on the circle is exactly r units from the centre.',
        steps: 3,
        stepDuration: 3200,
        config: { title: '(x−a)² + (y−b)² = r²' },
        stepTexts: [
          null,
          'Centre gives a and b.',
          'Radius comes from distance between centre and any point on circle.',
          'Expand brackets to get x² + y² + Dx + Ey + F = 0.',
        ],
      },
      { type: 'bullets', label: 'Key Points', items: [
        'Centre (a; b), radius r.',
        'Point on circle? Substitute and check.',
        'Tangents are perpendicular to the radius at the point of contact.',
      ]},
      {
        type: 'example',
        scenario: 'Centre M(3; −5), point N(7; −2) on circle.',
        steps: ['r² = (7−3)² + (−2−(−5))².', 'r² = 16 + 9 = 25.', 'Centre (3; −5), r = 5.'],
        answer: '(x − 3)² + (y + 5)² = 25',
        sceneId: 'anageo-circles',
      },
    ],
  },

  'anageo-tangents': {
    sections: [
      { type: 'heading', text: 'Tangents to Circles' },
      { type: 'concept', label: 'The Big Idea', text: 'The tangent to a circle at a point is perpendicular to the radius at that point. So m_tangent × m_radius = −1.' },
      {
        type: 'scene',
        sceneId: 'anageo-tangents',
        caption: 'A tangent kisses the circle — perpendicular to the radius at the contact point.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Tangent ⊥ Radius' },
        stepTexts: [
          null,
          'Find m_radius from centre to contact point.',
          'm_tangent = −1/m_radius.',
          'Use the point of contact to write the tangent equation.',
        ],
      },
      { type: 'bullets', label: 'Remember', items: [
        'Tangents from an external point are equal in length.',
        'A line is a tangent if distance from centre = radius.',
        'A line is a secant if distance < radius.',
      ]},
      {
        type: 'example',
        scenario: 'Circle centre M(3; −5), tangent at N(7; −2). Find tangent equation.',
        steps: ['m_radius = (−2+5)/(7−3) = ¾.', 'm_tangent = −4/3.', 'y + 2 = (−4/3)(x − 7).'],
        answer: 'y = −4/3 x + 22/3',
        sceneId: 'anageo-tangents',
      },
    ],
  },

  'anageo-optimisation': {
    sections: [
      { type: 'heading', text: 'Tangent Length Optimisation' },
      { type: 'concept', label: 'The Big Idea', text: 'To find the minimum length of a tangent from an external point, use Pythagoras: tangent² = distance_to_centre² − radius². Minimise the expression.' },
      {
        type: 'scene',
        sceneId: 'anageo-optimisation',
        caption: 'The tangent, radius, and centre-to-point line make a right triangle.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Right Triangle Trick' },
        stepTexts: [
          null,
          'Tangent ⊥ radius at contact point.',
          'Pythagoras: tangent² + r² = (distance to centre)².',
          'Minimise tangent by minimising distance to centre.',
        ],
      },
      { type: 'bullets', label: 'Common Question', items: [
        'Given circle and external point A, find minimum tangent length.',
        'Set up tangent² as a function of t.',
        'Differentiate (or complete the square) to find minimum.',
      ]},
      {
        type: 'example',
        scenario: 'AB tangent from A(t; t) to circle centre M(3; −5), r = 5.',
        steps: ['AB² = (t−3)² + (t+5)² − 25.', '= 2t² + 4t + 9.', 'Minimum at t = −1: AB² = 7.'],
        answer: 'min AB = √7',
        sceneId: 'anageo-optimisation',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 10 — TRIGONOMETRY — IDENTITIES & EQUATIONS (5 concepts)
  // ───────────────────────────────────────────────────────────────

  'trig-reduction-formulae': {
    sections: [
      { type: 'heading', text: 'Reduction Formulae' },
      { type: 'concept', label: 'The Big Idea', text: 'Reduction formulae rewrite trig functions of large angles in terms of small ones. Use the CAST diagram to decide the sign.' },
      {
        type: 'scene',
        sceneId: 'trig-reduction-formulae',
        caption: 'CAST tells you which functions are positive in each quadrant.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'The CAST Diagram' },
        stepTexts: [
          null,
          'All positive in Q1 (0° to 90°).',
          'Sin positive in Q2 (90° to 180°).',
          'Tan positive in Q3 (180° to 270°).',
          'Cos positive in Q4 (270° to 360°).',
        ],
      },
      { type: 'bullets', label: 'Useful Reductions', items: [
        'sin(180° − x) = sin x.',
        'cos(180° − x) = −cos x.',
        'sin(360° + x) = sin x.',
        'cos(90° + x) = −sin x.',
      ]},
      {
        type: 'example',
        scenario: 'Simplify sin(360° + x) and cos(180° + x).',
        steps: ['360° is a full turn: sin(360° + x) = sin x.', '180° + x falls in Q3, cos is negative: cos(180° + x) = −cos x.'],
        answer: 'sin x and −cos x',
        sceneId: 'trig-reduction-formulae',
      },
    ],
  },

  'trig-compound-double-angle': {
    sections: [
      { type: 'heading', text: 'Compound & Double Angle Formulae' },
      { type: 'concept', label: 'The Big Idea', text: 'Compound angle formulae break sin(A + B) and cos(A + B) into separate parts. Double-angle formulae come from setting A = B.' },
      {
        type: 'scene',
        sceneId: 'trig-compound-double-angle',
        caption: 'A split angle becomes two parts you can calculate separately.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Splitting Angles' },
        stepTexts: [
          null,
          'sin(A + B) = sin A cos B + cos A sin B.',
          'cos(A + B) = cos A cos B − sin A sin B.',
          'Set A = B for double-angle: sin 2A = 2 sin A cos A.',
        ],
      },
      { type: 'bullets', label: 'Three Forms of cos 2A', items: [
        'cos 2A = cos²A − sin²A.',
        'cos 2A = 1 − 2sin²A.',
        'cos 2A = 2cos²A − 1.',
      ]},
      {
        type: 'example',
        scenario: 'Simplify cos(x+y)·cos(x−y).',
        steps: ['Expand each: (cos x cos y − sin x sin y)(cos x cos y + sin x sin y).', '= cos²x cos²y − sin²x sin²y.', '= 1 − sin²x − sin²y.'],
        answer: '1 − sin²x − sin²y',
        sceneId: 'trig-compound-double-angle',
      },
    ],
  },

  'trig-general-solutions': {
    sections: [
      { type: 'heading', text: 'General Solutions' },
      { type: 'concept', label: 'The Big Idea', text: 'Trig equations have infinitely many solutions — the general solution adds k·360° (for sin, cos) or k·180° (for tan) to cover them all.' },
      {
        type: 'scene',
        sceneId: 'trig-general-solutions',
        caption: 'Every 360° the pattern repeats — so add k·360° to your base answer.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'All the Solutions' },
        stepTexts: [
          null,
          'Find the reference angle.',
          'Use CAST to find the base solution.',
          'Add k·360° (or k·180° for tan) to get the general solution.',
        ],
      },
      { type: 'bullets', label: 'Standard Forms', items: [
        'sin θ = k: θ = ref + k·360° or 180° − ref + k·360°.',
        'cos θ = k: θ = ±ref + k·360°.',
        'tan θ = k: θ = ref + k·180°.',
      ]},
      {
        type: 'example',
        scenario: 'Solve (cos x + 2 sin x)(3 sin 2x − 1) = 0.',
        steps: ['Factor 1: cos x + 2 sin x = 0 → tan x = −½.', 'Factor 2: sin 2x = ⅓.', 'Combine general solutions.'],
        answer: 'x = 153.43° + k·180° or x = 9.74° + k·180°',
        sceneId: 'trig-general-solutions',
      },
    ],
  },

  'trig-identities-proof': {
    sections: [
      { type: 'heading', text: 'Proving Identities' },
      { type: 'concept', label: 'The Big Idea', text: 'Proving an identity means showing LHS = RHS for ALL values of x. Work on ONE side, use known identities, and aim at the other side.' },
      {
        type: 'scene',
        sceneId: 'trig-identities-proof',
        caption: 'One side transforms into the other — like a caterpillar into a butterfly.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Proving LHS = RHS' },
        stepTexts: [
          null,
          'Start with the more complex side.',
          'Use identities: sin² + cos² = 1, tan = sin/cos.',
          'Factorise, simplify, and stop when it matches the other side.',
        ],
      },
      { type: 'bullets', label: 'Strategy', items: [
        'Convert everything to sin and cos.',
        'Look for common factors.',
        'Factorise difference of squares.',
        'Never cross-multiply across the equals sign.',
      ]},
      {
        type: 'example',
        scenario: 'Prove (cos⁴x + sin²x·cos²x)/(1 + sin x) = 1 − sin x.',
        steps: ['Factorise numerator: cos²x(cos²x + sin²x) = cos²x.', 'LHS = cos²x/(1 + sin x).', 'cos²x = 1 − sin²x = (1 − sin x)(1 + sin x).'],
        answer: 'LHS = 1 − sin x = RHS ✓',
        sceneId: 'trig-identities-proof',
      },
    ],
  },

  'trig-2d-3d-problems': {
    sections: [
      { type: 'heading', text: '2D & 3D Trig Problems' },
      { type: 'concept', label: 'The Big Idea', text: 'In 2D and 3D problems, use the sine rule, cosine rule, and area rule to solve triangles you cannot solve with right-angle trig.' },
      {
        type: 'scene',
        sceneId: 'trig-2d-3d-problems',
        caption: 'Any triangle can be solved if you know the right combination of sides and angles.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Sine, Cosine, Area Rules' },
        stepTexts: [
          null,
          'Sine rule: a/sin A = b/sin B = c/sin C.',
          'Cosine rule: a² = b² + c² − 2bc·cos A.',
          'Area rule: Area = ½ab·sin C.',
        ],
      },
      { type: 'bullets', label: 'Choosing a Rule', items: [
        'Sine rule: one complete pair (side + opposite angle).',
        'Cosine rule: three sides or two sides + included angle.',
        'Area rule: two sides + included angle.',
      ]},
      {
        type: 'example',
        scenario: 'Flagpole AB vertical, cables AC and AD. Find AD given AB = √5p, BD = 2p.',
        steps: ['Triangle ABD right-angled at B.', 'AD² = AB² + BD² = 5p² + 4p².', 'AD = 3p.'],
        answer: 'AD = 3p',
        sceneId: 'trig-2d-3d-problems',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 11 — TRIGONOMETRY — GRAPHS & APPLICATIONS (3 concepts)
  // ───────────────────────────────────────────────────────────────

  'trig-graphs-tan-sin-cos': {
    sections: [
      { type: 'heading', text: 'Trig Graphs' },
      { type: 'concept', label: 'The Big Idea', text: 'Each trig function has a characteristic shape: sin is a wave, cos is a shifted wave, tan has vertical asymptotes and period 180°.' },
      {
        type: 'scene',
        sceneId: 'trig-graphs-tan-sin-cos',
        caption: 'Sin and cos wave up and down; tan races up and down every 180°.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Three Trig Graphs' },
        stepTexts: [
          null,
          'y = sin x: amplitude 1, period 360°.',
          'y = cos x: same shape, shifted 90° left.',
          'y = tan x: period 180°, asymptotes at 90° + k·180°.',
        ],
      },
      { type: 'bullets', label: 'Key Features', items: [
        'Period: how often the graph repeats.',
        'Amplitude: half the distance between max and min.',
        'Asymptotes: where the function is undefined.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = tan x, g(x) = 2sin 2x. Intersection at A(60°; k).',
        steps: ['g(60°) = 2sin(120°) = 2(√3/2).', 'k = √3 ≈ 1.73.', 'Period of g = 360°/2 = 180°.'],
        answer: 'k = √3, period = 180°',
        sceneId: 'trig-graphs-tan-sin-cos',
      },
    ],
  },

  'trig-graph-transformations': {
    sections: [
      { type: 'heading', text: 'Trig Graph Transformations' },
      { type: 'concept', label: 'The Big Idea', text: 'Shifting a trig graph changes its equation. Shifting f(x) = cos 2x left by 45° gives h(x) = cos(2(x + 45°)) = cos(2x + 90°).' },
      {
        type: 'scene',
        sceneId: 'trig-graph-transformations',
        caption: 'A horizontal shift is INSIDE the bracket — it changes the angle, not the amplitude.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Shifting Trig Graphs' },
        stepTexts: [
          null,
          'f(x − k): shift RIGHT by k.',
          'f(x + k): shift LEFT by k.',
          'f(x) + k: shift UP by k.',
        ],
      },
      { type: 'bullets', label: 'Useful Simplifications', items: [
        'cos(2x + 90°) = −sin 2x.',
        'sin(x + 90°) = cos x.',
        'cos(x + 180°) = −cos x.',
      ]},
      {
        type: 'example',
        scenario: 'f(x) = cos 2x shifted 45° left. Find h(x).',
        steps: ['h(x) = cos(2(x + 45°)).', '= cos(2x + 90°).', '= −sin 2x.'],
        answer: 'h(x) = −sin 2x',
        sceneId: 'trig-graph-transformations',
      },
    ],
  },

  'trig-inequalities': {
    sections: [
      { type: 'heading', text: 'Trig Inequalities' },
      { type: 'concept', label: 'The Big Idea', text: 'A trig inequality asks where one graph is above or below another. Read the graph carefully and identify the intervals.' },
      {
        type: 'scene',
        sceneId: 'trig-inequalities',
        caption: 'Above or below — read the interval on the x-axis where the condition holds.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Reading the Interval' },
        stepTexts: [
          null,
          'Where does the graph cross the boundary?',
          'Which side of the crossing satisfies the inequality?',
          'Write the interval in bracket notation.',
        ],
      },
      { type: 'bullets', label: 'Points to Check', items: [
        'Endpoints: include or exclude based on < vs ≤.',
        'Asymptotes: exclude.',
        'Multiple intervals: give them all.',
      ]},
      {
        type: 'example',
        scenario: 'For which x is sin x · cos x = p exactly twice on [−180°; 180°]?',
        steps: ['sin x cos x = ½sin 2x.', 'So ½sin 2x = p → sin 2x = 2p.', 'Range of sin is [−1;1], so p ∈ [−½; ½].'],
        answer: 'p = ±½ gives two solutions',
        sceneId: 'trig-inequalities',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 12 — EUCLIDEAN GEOMETRY — CIRCLE THEOREMS (4 concepts)
  // ───────────────────────────────────────────────────────────────

  'euc-cyclic-quad': {
    sections: [
      { type: 'heading', text: 'Cyclic Quadrilaterals' },
      { type: 'concept', label: 'The Big Idea', text: 'A cyclic quadrilateral has all four vertices on a circle. Its opposite angles add up to 180°.' },
      {
        type: 'scene',
        sceneId: 'euc-cyclic-quad',
        caption: 'Opposite corners of a cyclic quad always sum to 180°.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Opposite Angles Sum to 180°' },
        stepTexts: [
          null,
          'A cyclic quad has all vertices on the circle.',
          'Opposite angles add to 180°.',
          'Exterior angle = interior opposite angle.',
        ],
      },
      { type: 'bullets', label: 'Key Theorems', items: [
        'Opposite angles of cyclic quad sum to 180°.',
        'Exterior angle of cyclic quad = interior opposite angle.',
        'Converse: if opposite angles sum to 180°, it is cyclic.',
      ]},
      {
        type: 'example',
        scenario: 'MNPR is cyclic, M̂₂ = 64°. Find P̂.',
        steps: ['M̂ + P̂ = 180° (opposite angles).', 'P̂ = 180° − 64°.'],
        answer: 'P̂ = 116°',
        sceneId: 'euc-cyclic-quad',
      },
    ],
  },

  'euc-centre-chord': {
    sections: [
      { type: 'heading', text: 'Centre & Chord Theorems' },
      { type: 'concept', label: 'The Big Idea', text: 'The angle at the centre is TWICE the angle at the circumference subtended by the same arc. A line from the centre perpendicular to a chord bisects it.' },
      {
        type: 'scene',
        sceneId: 'euc-centre-chord',
        caption: 'Centre angles are double the angles on the circle from the same arc.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Centre vs Circumference' },
        stepTexts: [
          null,
          'Angle at centre = 2 × angle at circumference (same arc).',
          'Perpendicular from centre to chord bisects chord.',
          'Angle in semicircle = 90°.',
        ],
      },
      { type: 'bullets', label: 'Key Theorems', items: [
        'Angle at centre = 2 × angle at circumference.',
        'Angle in semicircle = 90°.',
        'Line from centre ⊥ chord bisects chord.',
      ]},
      {
        type: 'example',
        scenario: 'OD bisects chord AB. Prove OD ⊥ AB.',
        steps: ['Draw OA and OB.', 'In ΔOAD and ΔOBD: OA = OB (radii), OD = OD (common), AD = BD (given).', '∴ ΔOAD ≡ ΔOBD (SSS).'],
        answer: '∴ OD ⊥ AB (angles on straight line)',
        sceneId: 'euc-centre-chord',
      },
    ],
  },

  'euc-tangents': {
    sections: [
      { type: 'heading', text: 'Tangent Theorems' },
      { type: 'concept', label: 'The Big Idea', text: 'A tangent is perpendicular to the radius at the point of contact. Tangents from an external point are equal. The tan-chord theorem links tangents and inscribed angles.' },
      {
        type: 'scene',
        sceneId: 'euc-tangents',
        caption: 'Tangent touches at one point — perpendicular to radius there.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Tangent Theorems' },
        stepTexts: [
          null,
          'Tangent ⊥ radius at contact point.',
          'Tangents from external point are equal in length.',
          'Tan-chord: angle between tangent and chord = angle in alternate segment.',
        ],
      },
      { type: 'bullets', label: 'Key Theorems', items: [
        'Tangent ⊥ radius.',
        'Two tangents from same point are equal.',
        'Tan-chord theorem.',
      ]},
      {
        type: 'example',
        scenario: 'OTBG: OT from centre to midpoint of chord, OB radius to tangent at B.',
        steps: ['OĜT = 90° (line from centre to midpoint of chord).', 'OBD = 90° (tangent ⊥ radius).', 'Both angles = 90° → OTBG cyclic.'],
        answer: 'OTBG is cyclic (equal angles subtend same line)',
        sceneId: 'euc-tangents',
      },
    ],
  },

  'euc-cyclic-quad-proofs': {
    sections: [
      { type: 'heading', text: 'Cyclic Quad Proofs' },
      { type: 'concept', label: 'The Big Idea', text: 'In geometry proofs, you combine theorems. Work from what you know toward what you want, giving a reason for every statement.' },
      {
        type: 'scene',
        sceneId: 'euc-cyclic-quad-proofs',
        caption: 'Every step needs a reason. Build the proof like a staircase.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Building a Proof' },
        stepTexts: [
          null,
          'Write each statement with its reason in brackets.',
          'Use known theorems: cyclic quad, tan-chord, exterior angle.',
          'Chain the statements until you reach the goal.',
        ],
      },
      { type: 'bullets', label: 'Common Reasons', items: [
        'Angles in same segment.',
        'Exterior angle of cyclic quad.',
        'Tan-chord theorem.',
        'Alternate angles (parallel lines).',
      ]},
      {
        type: 'example',
        scenario: 'PQRS cyclic. Prove Ŝ₁ = T̂₂.',
        steps: ['P̂₁ = Q̂₁ (tan-chord).', 'Ŝ₁ = Q̂₁ + Q̂₂ (exterior angle of cyclic quad).', 'T̂₂ = R̂₂ + Q̂₂ (exterior angle of Δ).', 'But P̂₁ = R̂₂ (given), so Ŝ₁ = T̂₂.'],
        answer: 'Ŝ₁ = T̂₂ ✓',
        sceneId: 'euc-cyclic-quad-proofs',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // TOPIC 13 — EUCLIDEAN GEOMETRY — SIMILARITY & PROPORTIONALITY (3)
  // ───────────────────────────────────────────────────────────────

  'euc-similarity': {
    sections: [
      { type: 'heading', text: 'Similar Triangles' },
      { type: 'concept', label: 'The Big Idea', text: 'Two triangles are similar if their corresponding angles are equal. Then their corresponding sides are in the same proportion.' },
      {
        type: 'scene',
        sceneId: 'euc-similarity',
        caption: 'Same shape, different size — like a photo enlarged.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Similar Triangles' },
        stepTexts: [
          null,
          'Same angles → similar triangles.',
          'Corresponding sides are in proportion.',
          'Name triangles with corresponding vertices in the same order.',
        ],
      },
      { type: 'bullets', label: 'Key Tests', items: [
        'AAA (all angles equal).',
        'Sides in proportion.',
        'Write as ΔABC ||| ΔDEF.',
      ]},
      {
        type: 'example',
        scenario: 'ΔEDF and ΔEAB: Ê common, EDF̂ = Â (corresponding), ED̂F = EB̂A.',
        steps: ['Ê is common.', 'EDF̂ = Â (corresponding angles, EA || CB).', 'ED̂F = EB̂A (corresponding angles, DC || AB).'],
        answer: 'ΔEDF ||| ΔEAB (∠∠∠)',
        sceneId: 'euc-similarity',
      },
    ],
  },

  'euc-proportionality': {
    sections: [
      { type: 'heading', text: 'Proportionality Theorem' },
      { type: 'concept', label: 'The Big Idea', text: 'A line parallel to one side of a triangle divides the other two sides proportionally. This is the proportionality theorem (and its converse).' },
      {
        type: 'scene',
        sceneId: 'euc-proportionality',
        caption: 'Parallel line cuts the sides into matching ratios.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Line || One Side' },
        stepTexts: [
          null,
          'If a line is parallel to one side, it cuts the other two proportionally.',
          'AD/DB = AE/EC.',
          'Converse: if the ratios are equal, the line is parallel.',
        ],
      },
      { type: 'bullets', label: 'The Theorem', items: [
        'If DE || BC, then AD/DB = AE/EC.',
        'Midpoint theorem is a special case.',
        'Use ratios to find unknown lengths.',
      ]},
      {
        type: 'example',
        scenario: 'DE || BH, FC/BF = ¼, DE = 3x−1, GH = x+1. Find x.',
        steps: ['BG = 2·DE (midpoint theorem).', 'BG = 6x − 2.', 'Use BG/GH = BF/FC.'],
        answer: 'x = 3',
        sceneId: 'euc-proportionality',
      },
    ],
  },

  'euc-proportionality-proofs': {
    sections: [
      { type: 'heading', text: 'Proportionality Proofs' },
      { type: 'concept', label: 'The Big Idea', text: 'Many proportionality proofs need you to construct a line, identify similar triangles, then write the proportion.' },
      {
        type: 'scene',
        sceneId: 'euc-proportionality-proofs',
        caption: 'Draw the auxiliary line, find the similar triangles, write the ratio.',
        steps: 3,
        stepDuration: 3200,
        config: { title: 'Proof Strategy' },
        stepTexts: [
          null,
          'Draw the auxiliary line if needed.',
          'Identify similar or proportional triangles.',
          'Write the ratio, cross-multiply, simplify.',
        ],
      },
      { type: 'bullets', label: 'Common Tricks', items: [
        'Add a parallel line to create similar triangles.',
        'Use the same side in two different proportions.',
        'Equate the two expressions.',
      ]},
      {
        type: 'example',
        scenario: 'Prove AG·AD = AC·AF in circle with tangent EA.',
        steps: ['D̂₁ = AF̂G = x (tan-chord).', '∴ DC || FG (alternate angles).', 'AG/AC = AF/AD (prop theorem, DC || FG).'],
        answer: 'AG·AD = AC·AF ✓',
        sceneId: 'euc-proportionality-proofs',
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// LAYER 3 — AUTO SCRIPTS (8-10 fact-dense sentences per concept)
// ═══════════════════════════════════════════════════════════════════

export const MATHS_AUTO_SCRIPTS = {
  'alg-factorising-quadratics': {
    title: 'Factorising Quadratics',
    sentences: [
      'A quadratic equation has x squared as its highest power.',
      'To solve a quadratic, first write it in the form ax squared plus bx plus c equals zero.',
      'Factorise the quadratic into two brackets multiplied together.',
      'The golden rule: if A times B equals zero, then A equals zero or B equals zero.',
      'To factorise x squared plus bx plus c, find two numbers that multiply to c and add to b.',
      'For the example 3x minus 6 times x plus 2 equals zero, set each bracket to zero separately.',
      '3x minus 6 equals zero gives x equals 2.',
      'x plus 2 equals zero gives x equals negative 2.',
      'Always check your factors by expanding back to the original.',
      'If the quadratic will not factorise, use the quadratic formula instead.',
    ],
  },
  'alg-quadratic-formula': {
    title: 'The Quadratic Formula',
    sentences: [
      'The quadratic formula solves any quadratic equation.',
      'It is x equals negative b plus or minus the square root of b squared minus 4ac, all divided by 2a.',
      'This formula is on the information sheet, so you do not need to memorise it.',
      'Write the equation in standard form ax squared plus bx plus c equals zero first.',
      'Identify a, b, and c carefully — signs matter.',
      'Substitute into the formula and simplify.',
      'The plus-or-minus sign gives you two answers.',
      'If the question says two decimal places, round at the very end.',
      'The part under the square root, b squared minus 4ac, is called the discriminant.',
      'If the discriminant is negative, the equation has no real solutions.',
    ],
  },
  'alg-quadratic-inequalities': {
    title: 'Quadratic Inequalities',
    sentences: [
      'A quadratic inequality asks for which x-values the expression is positive or negative.',
      'Move everything to one side so the other side is zero.',
      'Factorise the quadratic.',
      'Find the critical values where the expression equals zero.',
      'These critical values split the number line into intervals.',
      'Test one value in each interval to see if the inequality holds.',
      'Alternatively, use the shape of the parabola to decide.',
      'A parabola opening upwards is positive outside its roots and negative between them.',
      'Write the answer in interval notation or as an inequality.',
      'Always double-check by testing a value from each interval.',
    ],
  },
  'alg-surds': {
    title: 'Surd Equations',
    sentences: [
      'A surd equation has the unknown under a square root.',
      'Isolate the square root on one side of the equation first.',
      'Then square both sides to remove the root.',
      'Solve the resulting equation.',
      'Always substitute your answers back into the ORIGINAL equation.',
      'Squaring both sides can introduce false solutions.',
      'Reject any answer that does not work in the original.',
      'Sometimes a substitution like k equals square root of x makes the equation simpler.',
      'Write the final answer clearly, marking any rejected values.',
      'Check your work — surd equations are easy to get wrong by skipping the check step.',
    ],
  },
  'alg-simultaneous-equations': {
    title: 'Simultaneous Equations',
    sentences: [
      'Simultaneous equations are two equations with two unknowns.',
      'When one is linear and one is not, use substitution.',
      'From the linear equation, make one variable the subject.',
      'Substitute that expression into the non-linear equation.',
      'Solve the resulting quadratic.',
      'You will get two values for one variable.',
      'Substitute each back to find the matching value of the other variable.',
      'Answers come in pairs, written as (x; y).',
      'Always give both pairs of answers.',
      'Check by substituting both pairs into the original equations.',
    ],
  },
  'alg-exponential-equations': {
    title: 'Exponential Equations',
    sentences: [
      'An exponential equation has the unknown in the exponent.',
      'The key trick is to get the SAME BASE on both sides.',
      'Use exponent laws to simplify each side.',
      'If a to the power m equals a to the power n, then m equals n.',
      'This lets you drop the bases and solve the exponents.',
      'Some equations need a substitution, like letting k equal 2 to the power x.',
      'This turns the equation into a quadratic.',
      'Solve for k, then convert back to find x.',
      'Remember that 2 to the power x is always positive, so reject negative k values.',
      'Always check your final answer in the original equation.',
    ],
  },
  'seq-geometric-series': {
    title: 'Geometric Series',
    sentences: [
      'A geometric sequence multiplies by a constant ratio r each time.',
      'The nth term is Tn equals a times r to the power n minus 1.',
      'The sum of n terms is Sn equals a times r to the power n minus 1, divided by r minus 1.',
      'This formula only works when r is not equal to 1.',
      'If the absolute value of r is less than 1, the series converges.',
      'The sum to infinity is S infinity equals a divided by 1 minus r.',
      'If the absolute value of r is 1 or greater, the series diverges — no finite sum.',
      'The formula for the sum to infinity is on the info sheet.',
      'Always check that the value of r falls within the convergence range.',
      'Geometric series are used in finance, physics, and many real-world models.',
    ],
  },
  'seq-sigma-notation': {
    title: 'Sigma Notation',
    sentences: [
      'The sigma symbol means "add up".',
      'The bottom number tells you where to start.',
      'The top number tells you where to stop.',
      'The expression after sigma is the general term.',
      'Substitute each value of the index into the general term.',
      'Add all the results together.',
      'If the general term is linear in the index, it is an arithmetic series.',
      'If it is a constant times r to the power of the index, it is geometric.',
      'The number of terms is top minus bottom plus 1.',
      'Sigma notation is a compact way to write a long sum.',
    ],
  },
  'seq-quadratic-patterns': {
    title: 'Quadratic Patterns',
    sentences: [
      'A quadratic pattern has a constant SECOND difference.',
      'The general term is Tn equals an squared plus bn plus c.',
      'The value of 2a equals the constant second difference.',
      'First differences change by a constant amount.',
      'To find a, b, and c, use the first three terms.',
      'Set up three equations from T1, T2, and T3.',
      'Solve the system to find a, b, and c.',
      'Always verify by checking T4 or another term.',
      'Quadratic patterns appear in physics, economics, and sequences problems.',
      'The shape of the pattern is a parabola.',
    ],
  },
  'seq-arithmetic-series': {
    title: 'Arithmetic Series',
    sentences: [
      'An arithmetic sequence adds a constant difference d each time.',
      'The nth term is Tn equals a plus n minus 1 times d.',
      'The sum of n terms is Sn equals n over 2 times 2a plus n minus 1 times d.',
      'An alternative form is Sn equals n over 2 times a plus the last term.',
      'The last term is often written as l.',
      'Both sum formulae are on the information sheet.',
      'Arithmetic sequences appear everywhere — from salary increases to taxi fares.',
      'The difference d can be negative, giving a decreasing sequence.',
      'To find n when given a term value, substitute Tn and solve.',
      'The average of an arithmetic sequence is the average of the first and last terms.',
    ],
  },
  'seq-mixed-geometric-arithmetic': {
    title: 'Mixed Sequence Problems',
    sentences: [
      'Some questions link an arithmetic sequence and a geometric sequence.',
      'Write down the formula for each sequence.',
      'Often the first term is the same for both sequences.',
      'Set up an equation using the given relationship.',
      'Solve the equation for the unknown.',
      'Common relationships: "S of arithmetic is X more than S of geometric".',
      'For geometric sums, remember S infinity only exists when the ratio is between negative 1 and 1.',
      'Check your answer by substituting back.',
      'Mixed problems test your understanding of both types.',
      'Write the final answer clearly with the unknown identified.',
    ],
  },
  'func-hyperbola': {
    title: 'The Hyperbola',
    sentences: [
      'A hyperbola has the form y equals a divided by x plus p, plus q.',
      'It has two asymptotes: a vertical one at x equals negative p, and a horizontal one at y equals q.',
      'The asymptotes cross at the point negative p, q.',
      'The shape depends on the sign of a.',
      'If a is positive, the curves are in quadrants 1 and 3.',
      'If a is negative, the curves are in quadrants 2 and 4.',
      'Axes of symmetry pass through the intersection of the asymptotes.',
      'The axes of symmetry have gradients 1 and negative 1.',
      'To find x-intercepts, set y equals 0 and solve.',
      'To find y-intercepts, set x equals 0 and solve.',
    ],
  },
  'func-parabola-exponential': {
    title: 'Parabola & Exponential',
    sentences: [
      'Many questions show a parabola and an exponential on the same axes.',
      'The parabola has form f of x equals ax squared plus bx plus c.',
      'The turning point is at x equals negative b over 2a.',
      'The exponential has form g of x equals a times 2 to the power x plus q.',
      'Its horizontal asymptote is at y equals q.',
      'To find intersections, set f of x equal to g of x.',
      'The y-intercept of the parabola is c.',
      'The y-intercept of the exponential is a plus q.',
      'Ranges depend on the shape and the asymptote.',
      'Read the graph carefully — it often gives key points.',
    ],
  },
  'func-inverses': {
    title: 'Inverse Functions',
    sentences: [
      'The inverse of a function "undoes" it.',
      'To find the inverse, swap x and y in the equation.',
      'Then solve for y.',
      'The inverse is a reflection of the original in the line y equals x.',
      'Not all inverses are functions — you may need to restrict the domain.',
      'The inverse of a linear function is another linear function.',
      'The inverse of y equals 2 to the power x is y equals log base 2 of x.',
      'The inverse of y equals x squared is y equals plus or minus square root of x.',
      'To make the inverse a function, restrict x to non-negative values.',
      'The graphs of a function and its inverse intersect on the line y equals x.',
    ],
  },
  'func-exponential-log': {
    title: 'Exponential & Log Graphs',
    sentences: [
      'The exponential function y equals a to the power x grows or decays rapidly.',
      'It has a horizontal asymptote at y equals 0.',
      'It passes through the point 0, 1 for any a greater than 0.',
      'The logarithmic function y equals log base a of x is its inverse.',
      'It has a vertical asymptote at x equals 0.',
      'It passes through the point 1, 0.',
      'The two graphs are reflections of each other in the line y equals x.',
      'If a is greater than 1, both graphs increase.',
      'If a is between 0 and 1, both graphs decrease.',
      'Logarithms "read off" the exponent that gives a particular value.',
    ],
  },
  'func-transformations': {
    title: 'Transformations of Graphs',
    sentences: [
      'A transformation changes a graph\'s position or shape.',
      'Adding k outside the function shifts the graph up by k units.',
      'Adding k inside the bracket shifts the graph LEFT by k units.',
      'Subtracting k inside shifts RIGHT.',
      'A negative sign in front of the function reflects in the x-axis.',
      'A negative sign inside reflects in the y-axis.',
      'Multiplying by a constant stretches or shrinks the graph vertically.',
      'The order of transformations matters.',
      'Read carefully whether the shift is inside or outside the bracket.',
      'Combining transformations is common in exam questions.',
    ],
  },
  'fin-compound-interest': {
    title: 'Compound Interest',
    sentences: [
      'Compound interest means interest earns interest.',
      'The formula is A equals P times 1 plus i to the power n.',
      'P is the principal — the starting amount.',
      'i is the interest rate PER PERIOD.',
      'n is the number of periods.',
      'If interest is compounded quarterly, divide the annual rate by 4 and multiply years by 4.',
      'If compounded monthly, divide the annual rate by 12 and multiply years by 12.',
      'The effective annual rate is 1 plus nominal over m, all to the power m, minus 1.',
      'Compound interest grows faster than simple interest over time.',
      'It is the foundation of all annuity and loan calculations.',
    ],
  },
  'fin-annuities-future-value': {
    title: 'Future Value Annuities',
    sentences: [
      'An annuity is a series of equal payments made at regular intervals.',
      'The future value formula is F equals x times 1 plus i to the power n minus 1, all divided by i.',
      'x is the regular payment amount.',
      'i is the interest rate per period.',
      'n is the total number of payments.',
      'Each payment grows for a different length of time.',
      'The first payment grows the longest, the last payment grows the shortest.',
      'Deposits made at the BEGINNING of each period earn one extra period of interest.',
      'In that case, multiply the result by 1 plus i.',
      'Future value annuities are used for savings plans and sinking funds.',
    ],
  },
  'fin-loans-present-value': {
    title: 'Loan Repayments',
    sentences: [
      'A loan is an annuity in reverse.',
      'The present value formula is P equals x times 1 minus 1 plus i to the power negative n, all divided by i.',
      'P is the loan amount.',
      'x is the monthly repayment.',
      'n is the number of payments.',
      'The formula gives the loan that a series of repayments can pay off.',
      'If the first payment is delayed, grow the loan by 1 plus i for the delay period.',
      'Extra payments reduce the balance — recalculate n for the new term.',
      'The final payment may be smaller than the regular one.',
      'Always check whether payments are monthly, quarterly, or annual.',
    ],
  },
  'fin-depreciation': {
    title: 'Depreciation',
    sentences: [
      'Depreciation is compound interest working backwards.',
      'Straight-line depreciation loses the SAME amount every year.',
      'The straight-line formula is A equals P times 1 minus i times n.',
      'Reducing-balance depreciation loses a PERCENTAGE of the current value.',
      'The reducing-balance formula is A equals P times 1 minus i to the power n.',
      'Reducing balance reaches zero more slowly than straight line.',
      'To find when straight-line value hits zero, solve 1 minus i n equals 0.',
      'That gives n equals 1 over i.',
      'Real-world assets usually use reducing balance.',
      'Cars, computers, and equipment all depreciate.',
    ],
  },
  'calc-first-principles': {
    title: 'Derivative from First Principles',
    sentences: [
      'The derivative is the limit of the average gradient as h approaches zero.',
      'The formula is f prime of x equals the limit as h goes to zero of f of x plus h minus f of x, all divided by h.',
      'Start with two points on the curve: x and x plus h.',
      'The chord gradient is the difference in y values divided by h.',
      'Expand f of x plus h carefully.',
      'Simplify the numerator.',
      'Factor out h from the numerator.',
      'Cancel h with the denominator.',
      'Then let h approach zero.',
      'The result is the derivative, which is the tangent gradient.',
    ],
  },
  'calc-differentiation-rules': {
    title: 'Differentiation Rules',
    sentences: [
      'The power rule is the fastest way to differentiate polynomials.',
      'For f of x equals ax to the power n, f prime of x equals n times a times x to the power n minus 1.',
      'Bring the exponent down as a multiplier.',
      'Subtract 1 from the exponent.',
      'Constants differentiate to zero.',
      'The derivative of x is 1.',
      'The derivative of a sum is the sum of the derivatives.',
      'Rewrite roots and fractions as powers of x first.',
      'For example, square root of x is x to the power one half.',
      'The rule works for any real exponent.',
    ],
  },
  'calc-tangents': {
    title: 'Tangents to Curves',
    sentences: [
      'The gradient of the tangent at a point is the derivative at that point.',
      'Substitute the x-value into f prime of x to get the gradient m.',
      'Then use the point-slope form: y minus y1 equals m times x minus x1.',
      'You need a point on the curve AND the gradient.',
      'The point is found by substituting x into the ORIGINAL function.',
      'A horizontal tangent has gradient zero.',
      'The normal is perpendicular to the tangent.',
      'Its gradient is negative 1 over the tangent gradient.',
      'Tangents are used in optimisation problems.',
      'Always double-check that your point is on the curve.',
    ],
  },
  'calc-cubic-graphs': {
    title: 'Cubic Graphs',
    sentences: [
      'A cubic function has the form ax cubed plus bx squared plus cx plus d.',
      'It can have up to two turning points.',
      'It always has exactly one point of inflection.',
      'If a is positive, the graph rises to the right and falls to the left.',
      'If a is negative, it rises to the left and falls to the right.',
      'To find turning points, set f prime of x equal to zero.',
      'To find the point of inflection, set f double prime of x equal to zero.',
      'To find x-intercepts, factorise f of x.',
      'To find y-intercept, substitute x equals zero.',
      'Sketch the graph by plotting all key points.',
    ],
  },
  'calc-turning-points-concavity': {
    title: 'Concavity & Inflection',
    sentences: [
      'The second derivative tells you the concavity of the curve.',
      'If f double prime is positive, the curve is concave up — like a smile.',
      'If f double prime is negative, the curve is concave down — like a frown.',
      'Where f double prime equals zero, there may be a point of inflection.',
      'At a point of inflection, the curve changes from concave up to concave down, or vice versa.',
      'To find the point of inflection, solve f double prime equals zero.',
      'Check that the sign of f double prime changes on either side.',
      'Concavity is used to determine maxima versus minima.',
      'A local minimum occurs where f prime is zero and f double prime is positive.',
      'A local maximum occurs where f prime is zero and f double prime is negative.',
    ],
  },
  'calc-optimisation': {
    title: 'Optimisation Problems',
    sentences: [
      'Optimisation means finding the maximum or minimum of a real quantity.',
      'First write the quantity as a formula.',
      'If there are two variables, use a constraint to reduce to one.',
      'Differentiate and set the derivative equal to zero.',
      'Solve for the variable.',
      'Check whether the answer gives a maximum or minimum.',
      'Use the second derivative test for confirmation.',
      'Common problems include maximum volume, minimum surface area, and minimum distance.',
      'Read the question carefully to know what is being optimised.',
      'Always give the answer with the correct units.',
    ],
  },
  'calc-rates-of-change': {
    title: 'Rates of Change',
    sentences: [
      'The derivative represents a rate of change.',
      'Speed is the rate of change of distance with respect to time.',
      'Acceleration is the rate of change of speed.',
      'If s of t is the distance, s prime of t is the speed.',
      's double prime of t is the acceleration.',
      'To find maximum speed, set s double prime equal to zero.',
      'To find total distance, antidifferentiate the speed.',
      'The object is stationary when s prime of t equals zero.',
      'Rates of change appear in physics, biology, and economics.',
      'Always check what is being asked — speed, distance, or acceleration.',
    ],
  },
  'prob-venn-diagrams': {
    title: 'Venn Diagrams',
    sentences: [
      'A Venn diagram shows events as overlapping circles.',
      'The overlap represents "both events happen".',
      'The outside region represents "none of the events happen".',
      'The total probability inside all circles equals P of at least one event.',
      'The probability outside all circles equals 1 minus that.',
      'For two events, P of A or B equals P of A plus P of B minus P of A and B.',
      'For three events, the formula extends.',
      'If events are independent, P of A and B equals P of A times P of B.',
      'If events are mutually exclusive, P of A and B equals zero.',
      'Always check that probabilities add up correctly.',
    ],
  },
  'prob-tree-diagrams': {
    title: 'Tree Diagrams',
    sentences: [
      'A tree diagram shows a sequence of events.',
      'Each branch represents a probability.',
      'The probabilities on each split sum to 1.',
      'Multiply along a branch to find the probability of that path.',
      'Add paths together to find the probability of a combined outcome.',
      'Branches are read from left to right.',
      'The first split shows the first event.',
      'The second split shows the second event, given the first.',
      'Tree diagrams are especially useful for conditional probability.',
      'Always label each branch with its probability.',
    ],
  },
  'prob-counting-principles': {
    title: 'Counting Principles',
    sentences: [
      'The fundamental counting principle: if one choice has m options and another has n, together they have m times n.',
      'Multiply when the choices are made together.',
      'Add when the choices are mutually exclusive.',
      'With repetition allowed, the number of options stays the same.',
      'Without repetition, the number of options decreases each time.',
      'The number of ways to arrange n objects is n factorial.',
      'n factorial equals n times n minus 1, and so on, down to 1.',
      'Order matters for permutations; order does not matter for combinations.',
      'Read the question carefully to decide which to use.',
      'Always check for restrictions like "no repeats".',
    ],
  },
  'prob-independent-mutually-exclusive': {
    title: 'Independent vs Mutually Exclusive',
    sentences: [
      'Independent events do not affect each other.',
      'Mutually exclusive events cannot happen together.',
      'These are two different concepts.',
      'For independent events, P of A and B equals P of A times P of B.',
      'For mutually exclusive events, P of A and B equals zero.',
      'Mutually exclusive events are NOT independent (unless one has probability zero).',
      'To test independence, check the multiplication rule.',
      'To test mutually exclusive, check if the intersection is empty.',
      'Venn diagrams help visualise both concepts.',
      'Misunderstanding these is a common exam mistake.',
    ],
  },
  'stats-scatter-plots': {
    title: 'Scatter Plots',
    sentences: [
      'A scatter plot shows pairs of data points.',
      'Each dot represents one observation with two variables.',
      'If the dots trend upward, there is positive correlation.',
      'If the dots trend downward, there is negative correlation.',
      'If the dots show no trend, there is no correlation.',
      'The tighter the dots hug a line, the stronger the correlation.',
      'Scatter plots help you see relationships visually.',
      'An outlier is a point far from the rest.',
      'Outliers can strongly influence the regression line.',
      'Always plot the data before doing any calculations.',
    ],
  },
  'stats-least-squares': {
    title: 'Least Squares Regression',
    sentences: [
      'The least squares regression line is the best-fit straight line.',
      'It has the form y hat equals a plus bx.',
      'a is the y-intercept of the line.',
      'b is the gradient — how much y hat changes when x increases by 1.',
      'Your calculator can compute a and b directly from the data.',
      'To predict a value, substitute x into the equation.',
      'The line minimises the sum of squared vertical distances from the points.',
      'The regression line is used to make predictions.',
      'Predictions are only reliable within the range of the data.',
      'Extrapolating far outside the data range can be unreliable.',
    ],
  },
  'stats-correlation': {
    title: 'Correlation Coefficient',
    sentences: [
      'The correlation coefficient r measures the strength of the linear relationship.',
      'r is always between negative 1 and positive 1.',
      'r equals 1 means perfect positive correlation.',
      'r equals negative 1 means perfect negative correlation.',
      'r equals 0 means no linear relationship.',
      'Values close to 1 or negative 1 indicate strong correlation.',
      'Values close to 0 indicate weak correlation.',
      'The sign of r tells you the direction of the relationship.',
      'r is calculated using the formula on the info sheet.',
      'Always interpret r in context — not just "strong" or "weak".',
    ],
  },
  'stats-standard-deviation': {
    title: 'Standard Deviation',
    sentences: [
      'Standard deviation measures how spread out the data is.',
      'It is denoted by sigma.',
      'A small sigma means data is clustered near the mean.',
      'A large sigma means data is widely scattered.',
      'The formula is sigma equals the square root of the sum of squared deviations from the mean, divided by n.',
      'First find the mean.',
      'Then find each deviation from the mean.',
      'Square each deviation and add them up.',
      'Divide by n and take the square root.',
      'Data outside the mean plus or minus one sigma is considered unusual.',
    ],
  },
  'stats-ogives-histograms': {
    title: 'Ogives & Histograms',
    sentences: [
      'An ogive is a cumulative frequency graph.',
      'It shows how many data points are below each value.',
      'A histogram shows frequency per class interval.',
      'Histograms have no gaps between bars.',
      'The median is read at 50 percent cumulative frequency.',
      'The lower quartile is at 25 percent; the upper quartile at 75 percent.',
      'The interquartile range is Q3 minus Q1.',
      'Skewness tells you which side the tail is on.',
      'Right-skewed data has a tail on the right.',
      'Both ogives and histograms help visualise data distribution.',
    ],
  },
  'anageo-distance-gradient-midpoint': {
    title: 'Distance, Gradient, Midpoint',
    sentences: [
      'These three formulae are the foundation of analytical geometry.',
      'Distance: d equals the square root of x2 minus x1 squared plus y2 minus y1 squared.',
      'Gradient: m equals y2 minus y1 divided by x2 minus x1.',
      'Midpoint: M equals x1 plus x2 over 2, y1 plus y2 over 2.',
      'The gradient is linked to the angle of inclination: m equals tangent of theta.',
      'Perpendicular lines have gradients whose product is negative 1.',
      'Parallel lines have equal gradients.',
      'Distance is used to find lengths of segments.',
      'Gradient is used to test whether lines are parallel or perpendicular.',
      'Midpoint is used to find the centre of a segment.',
    ],
  },
  'anageo-line-equations': {
    title: 'Equation of a Line',
    sentences: [
      'To write the equation of a line, you need a point and the gradient.',
      'Use the point-slope form: y minus y1 equals m times x minus x1.',
      'Alternatively, use y equals mx plus c.',
      'If you know two points, find the gradient first.',
      'If the line is parallel to another, use the same gradient.',
      'If perpendicular, use m2 equals negative 1 over m1.',
      'Substitute the known point to find c.',
      'Write the final equation in the form the question asks for.',
      'The x-intercept is found by setting y equals zero.',
      'The y-intercept is found by setting x equals zero.',
    ],
  },
  'anageo-circles': {
    title: 'Equation of a Circle',
    sentences: [
      'A circle with centre (a; b) and radius r has equation (x minus a) squared plus (y minus b) squared equals r squared.',
      'The centre gives you a and b.',
      'The radius comes from the distance between the centre and any point on the circle.',
      'Expand the brackets for the standard form: x squared plus y squared plus Dx plus Ey plus F equals zero.',
      'To find the centre from the general form, complete the square.',
      'The tangent at any point is perpendicular to the radius at that point.',
      'A line is a tangent if its distance from the centre equals the radius.',
      'A line is a secant if its distance is less than the radius.',
      'Points inside the circle satisfy the equation with less than r squared.',
      'The circle is used in many analytical geometry problems.',
    ],
  },
  'anageo-tangents': {
    title: 'Tangents to Circles',
    sentences: [
      'A tangent touches the circle at exactly one point.',
      'The tangent is perpendicular to the radius at the point of contact.',
      'So m_tangent times m_radius equals negative 1.',
      'Find the radius gradient from the centre to the contact point.',
      'Then the tangent gradient is negative 1 over that.',
      'Use the point of contact to write the tangent equation.',
      'Tangents from the same external point are equal in length.',
      'The tangent-radius triangle is right-angled.',
      'Pythagoras can be used to find tangent length.',
      'Tangent problems often combine with circle equation problems.',
    ],
  },
  'anageo-optimisation': {
    title: 'Tangent Length Optimisation',
    sentences: [
      'To find the minimum length of a tangent, use Pythagoras.',
      'Tangent squared plus radius squared equals distance-to-centre squared.',
      'So tangent squared equals distance squared minus radius squared.',
      'Write the distance as a function of the variable point.',
      'Simplify the tangent-squared expression.',
      'Minimise by differentiation or by completing the square.',
      'Set the derivative to zero to find the minimum.',
      'Substitute back to find the minimum tangent length.',
      'Always check that the answer makes geometric sense.',
      'These problems often appear as the last part of an analytical geometry question.',
    ],
  },
  'trig-reduction-formulae': {
    title: 'Reduction Formulae',
    sentences: [
      'Reduction formulae rewrite trig functions of large angles.',
      'Use the CAST diagram to decide the sign.',
      'In Q1, all functions are positive.',
      'In Q2, only sin is positive.',
      'In Q3, only tan is positive.',
      'In Q4, only cos is positive.',
      'sin of 180 minus x equals sin x.',
      'cos of 180 minus x equals negative cos x.',
      'sin of 360 plus x equals sin x.',
      'cos of 90 plus x equals negative sin x.',
    ],
  },
  'trig-compound-double-angle': {
    title: 'Compound & Double Angles',
    sentences: [
      'Compound angle formulae expand sin and cos of sums and differences.',
      'sin of A plus B equals sin A cos B plus cos A sin B.',
      'cos of A plus B equals cos A cos B minus sin A sin B.',
      'For A minus B, the signs in the middle flip.',
      'Set A equals B to get the double-angle formulae.',
      'sin 2A equals 2 sin A cos A.',
      'cos 2A has three forms: cos squared minus sin squared, 1 minus 2 sin squared, or 2 cos squared minus 1.',
      'Choose the form that simplifies best.',
      'These formulae are used to prove identities and solve equations.',
      'They are all on the information sheet.',
    ],
  },
  'trig-general-solutions': {
    title: 'General Solutions',
    sentences: [
      'Trig equations have infinitely many solutions.',
      'The general solution covers them all.',
      'First find the reference angle.',
      'Use CAST to find the base solution in the correct quadrant.',
      'Add k times 360 degrees for sin and cos equations.',
      'Add k times 180 degrees for tan equations.',
      'For sin theta equals k: theta equals ref plus k times 360, or 180 minus ref plus k times 360.',
      'For cos theta equals k: theta equals plus or minus ref plus k times 360.',
      'For tan theta equals k: theta equals ref plus k times 180.',
      'Always state k is an integer.',
    ],
  },
  'trig-identities-proof': {
    title: 'Proving Identities',
    sentences: [
      'Proving an identity means showing LHS equals RHS for all x.',
      'Start with the more complicated side.',
      'Use known identities to simplify.',
      'Common identities: sin squared plus cos squared equals 1.',
      'tan x equals sin x over cos x.',
      'Factorise when possible.',
      'Look for differences of squares.',
      'Convert everything to sin and cos if stuck.',
      'Stop as soon as you reach the other side.',
      'Never cross-multiply across the equals sign in a proof.',
    ],
  },
  'trig-2d-3d-problems': {
    title: '2D & 3D Trig Problems',
    sentences: [
      'In 2D and 3D problems, use sine rule, cosine rule, and area rule.',
      'Sine rule: a over sin A equals b over sin B equals c over sin C.',
      'Cosine rule: a squared equals b squared plus c squared minus 2bc cos A.',
      'Area rule: Area equals one half ab sin C.',
      'Use sine rule when you have a complete pair.',
      'Use cosine rule when you have three sides or two sides plus the included angle.',
      'Use area rule when you have two sides and the included angle.',
      'Draw a clear diagram — mark all known values.',
      'Break 3D problems into 2D triangles.',
      'Right-angled triangles can use SOH CAH TOA.',
    ],
  },
  'trig-graphs-tan-sin-cos': {
    title: 'Trig Graphs',
    sentences: [
      'Each trig function has a distinctive shape.',
      'y equals sin x has period 360 degrees and amplitude 1.',
      'y equals cos x has the same shape, shifted 90 degrees left.',
      'y equals tan x has period 180 degrees.',
      'Tan has vertical asymptotes every 180 degrees.',
      'Amplitude is the maximum displacement from the middle.',
      'Period is the length of one complete cycle.',
      'Transformations like y equals a sin bx change amplitude and period.',
      'The period of sin bx is 360 over b degrees.',
      'Read intersections from the graph by finding where the curves cross.',
    ],
  },
  'trig-graph-transformations': {
    title: 'Trig Graph Transformations',
    sentences: [
      'Shifting a trig graph changes its equation.',
      'A shift inside the bracket affects the angle.',
      'A shift outside the bracket affects the vertical position.',
      'f of x plus k shifts the graph k units to the left.',
      'f of x minus k shifts the graph k units to the right.',
      'cos of 2x plus 90 degrees simplifies to negative sin 2x.',
      'sin of x plus 90 degrees equals cos x.',
      'cos of x plus 180 degrees equals negative cos x.',
      'Use these to simplify transformed equations.',
      'Watch out for transformations combined with amplitude changes.',
    ],
  },
  'trig-inequalities': {
    title: 'Trig Inequalities',
    sentences: [
      'A trig inequality asks where one function is above or below another.',
      'Read the graph to find the intervals.',
      'The endpoints are where the graphs meet.',
      'Use less-than or greater-than signs to decide which side satisfies the inequality.',
      'Exclude asymptotes from the interval.',
      'Write the answer in bracket notation.',
      'Multiple intervals may be needed.',
      'Always check the interval of x given in the question.',
      'A sketch helps you see the solution.',
      'Common mistakes include reversing inequality signs and missing endpoints.',
    ],
  },
  'euc-cyclic-quad': {
    title: 'Cyclic Quadrilaterals',
    sentences: [
      'A cyclic quadrilateral has all four vertices on a circle.',
      'Its opposite angles add up to 180 degrees.',
      'Its exterior angle equals the interior opposite angle.',
      'To prove a quadrilateral is cyclic, show that opposite angles sum to 180 degrees.',
      'Or show that an exterior angle equals the interior opposite angle.',
      'Angles in the same segment are equal.',
      'These theorems are used together in geometry proofs.',
      'Draw the circle and mark all given angles.',
      'Label every angle you can find with a reason.',
      'Work from what you know toward what you need to prove.',
    ],
  },
  'euc-centre-chord': {
    title: 'Centre & Chord Theorems',
    sentences: [
      'The angle at the centre is twice the angle at the circumference on the same arc.',
      'The angle in a semicircle is 90 degrees.',
      'A line from the centre perpendicular to a chord bisects the chord.',
      'The perpendicular bisector of a chord passes through the centre.',
      'Equal chords are equidistant from the centre.',
      'These theorems are used in circle geometry proofs.',
      'Draw auxiliary lines from the centre to key points.',
      'Use radii to create isosceles triangles.',
      'Mark equal angles and sides.',
      'Give a reason for every step.',
    ],
  },
  'euc-tangents': {
    title: 'Tangent Theorems',
    sentences: [
      'A tangent is perpendicular to the radius at the point of contact.',
      'Tangents from the same external point are equal in length.',
      'The tan-chord theorem states: angle between tangent and chord equals the angle in the alternate segment.',
      'Two tangents and a chord form a symmetric figure.',
      'Use tangent theorems to prove lines are equal or angles are equal.',
      'Tangent length can be found using Pythagoras.',
      'Tangent-chord problems often link to cyclic quadrilaterals.',
      'A tangent meets a chord at the point of contact.',
      'Mark all right angles at tangent points.',
      'Reason every statement carefully.',
    ],
  },
  'euc-cyclic-quad-proofs': {
    title: 'Cyclic Quad Proofs',
    sentences: [
      'Geometry proofs combine multiple theorems.',
      'Work systematically from known facts to the goal.',
      'Write each statement with its reason in brackets.',
      'Common reasons: angles in same segment, exterior angle of cyclic quad, tan-chord theorem.',
      'Look for parallel lines and corresponding or alternate angles.',
      'Use the transitive property: if A equals B and B equals C, then A equals C.',
      'Draw auxiliary lines if needed.',
      'Identify similar triangles or equal angles.',
      'Chain statements until you reach the result.',
      'Check that every statement follows from the previous one.',
    ],
  },
  'euc-similarity': {
    title: 'Similar Triangles',
    sentences: [
      'Two triangles are similar if corresponding angles are equal.',
      'Their corresponding sides are in the same ratio.',
      'Write the triangles in matching order: triangle ABC similar to triangle DEF.',
      'Common tests: AAA, sides in proportion.',
      'Similar triangles have the same shape but not necessarily the same size.',
      'Use similarity to find unknown lengths.',
      'Set up proportions: side1 over side2 equals side3 over side4.',
      'Cross-multiply and solve.',
      'Similarity is used in proportionality proofs.',
      'Look for parallel lines to create similar triangles.',
    ],
  },
  'euc-proportionality': {
    title: 'Proportionality Theorem',
    sentences: [
      'A line parallel to one side of a triangle divides the other two sides proportionally.',
      'If DE is parallel to BC, then AD over DB equals AE over EC.',
      'The converse is also true: equal ratios mean parallel lines.',
      'The midpoint theorem is a special case.',
      'Use this theorem to find unknown lengths.',
      'Set up the proportion and cross-multiply.',
      'Proportionality is used in many Euclidean geometry problems.',
      'Always check which sides correspond.',
      'Draw a clear diagram.',
      'Give the reason "prop theorem; line parallel to one side" in proofs.',
    ],
  },
  'euc-proportionality-proofs': {
    title: 'Proportionality Proofs',
    sentences: [
      'Proportionality proofs often need auxiliary lines.',
      'Draw the line parallel to one side of a triangle.',
      'Identify the similar triangles created.',
      'Write the proportion from the similarity.',
      'Cross-multiply to get the desired equation.',
      'Sometimes you need two different proportions that share a side.',
      'Equate the two expressions and simplify.',
      'Always give the theorem name as the reason.',
      'Check the final equation against what was asked.',
      'These proofs are often the last part of a geometry question.',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// LAYER 3 — AUTO ORDER (all 56 concept IDs, in teaching order)
// ═══════════════════════════════════════════════════════════════════

export const MATHS_AUTO_ORDER = [
  // P1 — Algebra
  'alg-factorising-quadratics',
  'alg-quadratic-formula',
  'alg-quadratic-inequalities',
  'alg-surds',
  'alg-simultaneous-equations',
  'alg-exponential-equations',
  // P1 — Sequences
  'seq-geometric-series',
  'seq-sigma-notation',
  'seq-quadratic-patterns',
  'seq-arithmetic-series',
  'seq-mixed-geometric-arithmetic',
  // P1 — Functions
  'func-hyperbola',
  'func-parabola-exponential',
  'func-inverses',
  'func-exponential-log',
  'func-transformations',
  // P1 — Financial Maths
  'fin-compound-interest',
  'fin-annuities-future-value',
  'fin-loans-present-value',
  'fin-depreciation',
  // P1 — Calculus Rules
  'calc-first-principles',
  'calc-differentiation-rules',
  'calc-tangents',
  // P1 — Calculus Cubics
  'calc-cubic-graphs',
  'calc-turning-points-concavity',
  'calc-optimisation',
  'calc-rates-of-change',
  // P1 — Probability
  'prob-venn-diagrams',
  'prob-tree-diagrams',
  'prob-counting-principles',
  'prob-independent-mutually-exclusive',
  // P2 — Statistics
  'stats-scatter-plots',
  'stats-least-squares',
  'stats-correlation',
  'stats-standard-deviation',
  'stats-ogives-histograms',
  // P2 — Analytical Geometry
  'anageo-distance-gradient-midpoint',
  'anageo-line-equations',
  'anageo-circles',
  'anageo-tangents',
  'anageo-optimisation',
  // P2 — Trig Identities & Equations
  'trig-reduction-formulae',
  'trig-compound-double-angle',
  'trig-general-solutions',
  'trig-identities-proof',
  'trig-2d-3d-problems',
  // P2 — Trig Graphs
  'trig-graphs-tan-sin-cos',
  'trig-graph-transformations',
  'trig-inequalities',
  // P2 — Euclidean Circle Theorems
  'euc-cyclic-quad',
  'euc-centre-chord',
  'euc-tangents',
  'euc-cyclic-quad-proofs',
  // P2 — Euclidean Similarity & Proportionality
  'euc-similarity',
  'euc-proportionality',
  'euc-proportionality-proofs',
];