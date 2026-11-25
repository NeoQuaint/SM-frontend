import assert from 'node:assert/strict';
import {seal,unseal} from '../lib/stitch-setup.js';
import setup from '../api/billing-setup.js';
import {SignJWT} from 'jose';
process.env.AUTH_SESSION_SECRET='local-test-only-not-a-real-session-secret';
process.env.ARI_OWNER_EMAIL='owner@example.test';
const plain='whsec_fixture_only',encrypted=seal(plain);assert.equal(unseal(encrypted),plain);assert.notEqual(seal(plain),encrypted);const changed=Buffer.from(encrypted,'base64');changed[20]^=1;assert.throws(()=>unseal(changed.toString('base64')));
const jwt=await new SignJWT({customerId:'fixture',email:'other@example.test'}).setProtectedHeader({alg:'HS256'}).setIssuer('smartclass').setAudience('smartclass-parent').setExpirationTime('1h').sign(new TextEncoder().encode(process.env.AUTH_SESSION_SECRET));
for(const cookie of ['', '__Host-sc-parent='+jwt]){const res={setHeader(){},status(n){this.code=n;return this},json(d){this.data=d;return this},end(){return this}};await setup({method:'POST',headers:{cookie}},res);assert.equal(res.code,cookie?403:401)}
console.log('PASS: webhook-secret encryption, tamper rejection, anonymous and non-owner setup denied.');
