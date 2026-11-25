import assert from 'node:assert/strict';
import {checkoutEnabled} from '../lib/stitch-core.js';
const cfg={mode:'live',owner:'owner@example.test'},owner={email:'owner@example.test'},other={email:'other@example.test'};
assert.equal(checkoutEnabled(cfg,owner,{}),false);
assert.equal(checkoutEnabled(cfg,owner,{STITCH_LIVE_ENABLED:'owner'}),true);
assert.equal(checkoutEnabled(cfg,other,{STITCH_LIVE_ENABLED:'owner'}),false);
assert.equal(checkoutEnabled({...cfg,owner:undefined},owner,{STITCH_LIVE_ENABLED:'owner'}),false);
assert.equal(checkoutEnabled(cfg,other,{STITCH_LIVE_ENABLED:'true'}),true);
console.log('PASS: owner-only checkout accepts the verified owner and denies other accounts; absent flag disables live checkout.');
