export const BLACK_FRIDAY=Object.freeze({id:'black-friday-2026',limit:250,initialAmount:7900,recurringAmount:12900});
// A pending provider checkout reserves its place: never release it while it
// can still accept a payment. Paid places remain counted after cancellation.
const occupied=`o.promotion=$1 AND o.mode=$2 AND (o.status NOT IN ('cancelled','closed','abandoned') OR EXISTS(SELECT 1 FROM sc_stitch_payments p WHERE p.order_id=o.id))`;
export async function blackFridayOffer(db,mode='live',userId=null){
 const {rows:[row]}=await db.query(`SELECT COUNT(DISTINCT o.user_id)::int AS used,COALESCE(bool_or(o.user_id=$3),false) AS claimed FROM sc_stitch_orders o WHERE ${occupied}`,[BLACK_FRIDAY.id,mode,userId===null?null:String(userId)]);
 return {...BLACK_FRIDAY,available:row.used<BLACK_FRIDAY.limit&&!row.claimed};
}
export async function reserveBlackFriday(db,order,quote){
 if(order.plan==='academy'){
  await db.query('SELECT pg_advisory_xact_lock(hashtext($1))',['promotion:'+BLACK_FRIDAY.id+':'+order.mode]);
  const offer=await blackFridayOffer(db,order.mode,order.user_id);
  if(offer.available){order.initial_amount=offer.initialAmount;order.promotion=offer.id;}
 }
 assertQuote(order,quote);
 return order;
}
export function assertQuote(order,quote){
 if(!quote||quote.initialAmount!==(order.initial_amount??order.amount)||quote.recurringAmount!==order.amount)
  throw Object.assign(Error('This offer has changed or your checkout needs refreshing. Close checkout and choose your package again to review the current price.'),{status:409});
}
