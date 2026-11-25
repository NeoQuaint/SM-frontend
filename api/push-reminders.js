import {configured,cronAuthorized,runReminders} from '../lib/push.js';
export const maxDuration=120;
export default async function handler(req,res){res.setHeader('Cache-Control','no-store');if(req.method!=='GET')return res.status(405).end();if(!cronAuthorized(req.headers.authorization))return res.status(401).json({error:'Not authorised'});if(!configured())return res.status(503).json({error:'Push not configured'});try{return res.json(await runReminders())}catch{return res.status(503).json({error:'Reminder run failed'})}}
