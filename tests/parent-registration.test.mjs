import assert from 'node:assert/strict';
import {saveParent} from '../api/parent-auth.js';
const original=globalThis.fetch;let calls=0;
try{
 globalThis.fetch=async(url,options)=>{calls++;assert.equal(url,'https://smartclass-wlgb.onrender.com/api/auth/google');assert.equal(options.method,'POST');assert.deepEqual(JSON.parse(options.body),{credential:'test-token'});return {ok:true,json:async()=>({status:'success',user:{id:42,email:'PARENT@example.com'}})}};
 assert.equal(await saveParent('test-token',{email:'parent@example.com'}),'42');assert.equal(calls,1);
 globalThis.fetch=async()=>({ok:true,json:async()=>({status:'success',user:{id:42,email:'different@example.com'}})});
 await assert.rejects(()=>saveParent('test-token',{email:'parent@example.com'}));
 globalThis.fetch=async()=>({ok:false,json:async()=>({error:'unavailable'})});await assert.rejects(()=>saveParent('test-token',{email:'parent@example.com'}));
 console.log('PASS: backend request, durable customer identity, identity mismatch and failed registration');
}finally{globalThis.fetch=original}
