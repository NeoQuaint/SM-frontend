import {cronAuthorized} from '../lib/push.js';
import {deliverMail,syncMailbox,mailboxes} from '../lib/mail.js';
export const maxDuration=300;
export default async function handler(req,res){res.setHeader('Cache-Control','no-store');if(req.method!=='GET')return res.status(405).end();if(!cronAuthorized(req.headers.authorization))return res.status(401).json({error:'Not authorised'});const result={};try{result.delivery=await deliverMail()}catch{result.delivery={error:'Mail queue unavailable'}}for(const box of Object.keys(mailboxes)){try{result[box]=await syncMailbox(box)}catch{result[box]={error:'Mailbox sync unavailable'}}}return res.status(200).json(result)}
