import {database,ready} from '../lib/stitch-db.js';
import {blackFridayOffer} from '../lib/black-friday.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 try{await ready();return res.status(200).json({offer:await blackFridayOffer(database())});}
 catch{return res.status(503).json({offer:null});}
}
