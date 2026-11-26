import {database} from './stitch-db.js';
export async function complimentaryAccess(user,pool=database()){
 const result=await pool.query(`SELECT id,end_date FROM smartclass_subscriptions WHERE (user_id=$1 OR lower(user_id)=lower($2)) AND status='complimentary' AND package='Full Academy' AND amount=0 AND payment_reference LIKE 'complimentary:%' AND (end_date IS NULL OR end_date>NOW()) LIMIT 1`,[String(user.customerId),user.email]);
 return result.rows[0]||null;
}
export function complimentaryState(user,grant){return {configured:true,checkoutEnabled:false,mode:'live',csrf:user.csrf,plan:'academy',complimentary:true,subscription:{plan:'academy',status:'complimentary',accessUntil:grant.end_date||null,nextRenewal:null,canCancel:false,pending:false}}}
