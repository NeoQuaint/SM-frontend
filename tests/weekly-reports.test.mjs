import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const context={window:{},Date,Map,Set,Intl};vm.runInNewContext(fs.readFileSync('public/kids-weekly-reports.js','utf8'),context);const {build,weekEnd}=context.window.WeeklyReports;
const end=Date.parse('2026-11-21T22:00:00Z');assert.equal(weekEnd(Date.parse('2026-11-21T21:59:59Z')),end-7*86400000);assert.equal(weekEnd(end),end);assert.equal(weekEnd(Date.parse('2026-11-25T12:00:00Z')),end);
const categories={numbers:['123','Numbers'],colours:['','Colours'],find:['','Find']},tips={numbers:'Count together',colours:'Name a colour',find:'Look together'};
const events=Array.from({length:4},(_,i)=>({at:end-1000,category:'numbers',kind:'attempt',item:String(i),ok:true}));events.push(...Array.from({length:2},()=>({at:end-1000,category:'colours',kind:'attempt',item:'red',ok:false})),{at:end,category:'find',kind:'explore'});
let r=build({name:'Neo',events,time:[]},categories,tips,end);assert.match(r.strength,/4 of 4/);assert.match(r.practice,/Colours/);assert.equal(r.visited.length,2);assert.equal(r.missing[0],'find');assert.equal(r.next,'Name a colour');
r=build({events:events.map(e=>({...e,assisted:true})),time:[]},categories,tips,end);assert.doesNotMatch(r.strength,/4 of 4/);assert.match(r.practice,/No repeated/);
r=build({events:[],time:[]},categories,tips,end);assert.match(r.strength,/No activity/);assert.equal(r.completed,0);console.log('PASS: Sunday SA boundary, fixed reporting window, evidence thresholds, assisted answers and empty state');

const api=context.window.WeeklyReports;api.setPaid(true);assert.equal(api.envelopeState({},Date.parse('2026-11-25T12:00:00Z')),'intro');assert.equal(api.envelopeState({weeklyIntroDone:true},Date.parse('2026-11-25T12:00:00Z')),null);assert.equal(api.envelopeState({weeklyIntroDone:true},end),'report');assert.equal(api.envelopeState({weeklyIntroDone:true,weeklyDismissed:end},end),null);assert.equal(api.envelopeState({weeklyIntroDone:true},end+86400000),null);console.log('PASS: purchase introduction, Sunday-only envelope, Done dismissal and Monday hiding');
