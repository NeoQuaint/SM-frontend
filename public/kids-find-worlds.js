
(()=>{
const T=(item,clue,problem,yes,options,skill='Useful discoveries')=>[item,clue,options,clue,yes,skill,null,problem];
window.FIND_WORLDS=[
{title:'The mountain of little wonders',intro:'Juppy is waiting for a picnic. Help Maya follow the trail, find useful things and reach her friend.',stops:['The sunny meadow','The whispering forest','The mountain summit'],reward:'book',rewardName:'A story corner',ending:'Our mountain picnic!',next:'A little paper boat floats down from the hill. Where will the river take us?'},
{title:'The river’s little secret',intro:'A paper boat carries a picture of a lake house. Follow the green riverbank with Maya and Coco to find where it came from.',stops:['The willow bank','The stepping-stone bend','The water-lily cove'],reward:'boat',rewardName:'A little boat pond',ending:'A message from Lily!',next:'Inside the boat is an invitation. Lily is waiting at the little lake house.',
tasks:[
T('duck','I have a bill and paddle on the water.','Who can show us the way along the river? Listen for quack.','The duck leads us along the bank.',['duck','cat','cow'],'Animal clues'),
T('leaf','I am green and grow on a branch.','The boat has a leaf-shaped mark. Find its match.','The leaf mark points downstream.',['leaf','flower','apple'],'Nature clues'),
T('boat','I float on the water and carry things.','How can the little message travel along the river?','The paper boat floats beside us.',['boat','shoe','book']),
T('flower','I have petals around my middle.','The note says to turn beside the flowers. Find our landmark.','The flowers mark the bend.',['flower','tree','cloud'],'Nature clues'),
T('tree','I have a trunk and leafy branches.','We need a shady place for a little rest. What gives shade?','We rest under the willow tree.',['tree','lamp','umbrella'],'Nature clues'),
T('shoe','You wear me on your foot.','Our feet need covering on this pebbly path. What can we wear?','Shoes on, ready for the path.',['shoe','cup','spoon']),
T('umbrella','I open above your head when rain falls.','A shower is coming. What will keep our friends dry?','The umbrella catches the raindrops.',['umbrella','book','key']),
T('two','Count one, two. Find a pair of stones.','This little puddle needs two stones. Which group fits?','Two stones make a tiny crossing.',['two','three','four'],'Counting groups'),
T('fish','I have fins and swim under the water.','A tail splashes below the surface. Who lives there?','The fish swims towards the cove.',['fish','cat','duck'],'Animal clues'),
T('circle','I am round with no corners.','A round ripple shows where the fish went. Match its shape.','Round ripples lead us onward.',['circle','square','triangle'],'Shape matching'),
T('three','Count one, two, three stones.','The last crossing has room for three stones. Find the right group.','Three stones, and a clear way across.',['three','two','four'],'Counting groups'),
T('cup','I have a handle and hold a drink.','Our friends have brought clean drinking water. What shall we pour it into?','A refreshing drink from our bottle.',['cup','spoon','book']),
T('apple','I am a crunchy red fruit with a leaf.','We brought a snack for our rest. Find the red fruit.','We share our apple snack.',['apple','grapes','banana'],'Fruit clues'),
T('book','I have a cover and pages.','The message is tucked into a little picture book. Find it.','A picture of Lily and a lake house!',['book','door','key']),
T('boat','I float and have a little pointed bow.','The invitation belongs in our boat. Find it for our next adventure.','Lily has invited us to the lake house!',['boat','umbrella','shoe'])
]},
{title:'The little lake house',intro:'Lily has invited her friends for a cosy afternoon. Help them follow the dock, make the house comfortable and share a story.',stops:['The sunny dock','Lily’s cosy room','The lakeside picnic'],reward:'cup',rewardName:'A picnic table',ending:'A cosy afternoon together',next:'A glowing little light appears outside. Suzy knows a garden where the fireflies dance.',
tasks:[
T('boat','I float beside the dock.','Which thing brought the invitation to us?','We tie our little boat beside the dock.',['boat','book','shoe']),
T('square','I have four equal straight sides.','Lily’s window has four equal sides. Match its shape.','That is Lily’s window!',['square','triangle','circle'],'Shape matching'),
T('key','I fit into a lock.','Lily left us a key for the front door. Find it.','The front door is unlocked.',['key','spoon','leaf']),
T('door','I have a handle and open into a room.','We have the key. Where do we go into the house?','Welcome to the lake house!',['door','tree','book']),
T('shoe','I cover your foot.','Let’s put our outdoor shoes by the door. Find one.','Shoes neatly by the door.',['shoe','cup','flower']),
T('lamp','I give light when switched on.','Our reading corner is dim. What can make it bright?','The reading lamp glows warmly.',['lamp','cloud','umbrella']),
T('book','My pages can hold a story.','Lily wants to read with us. What should we bring?','A story to share on a cosy afternoon.',['book','spoon','key']),
T('cup','I hold a drink and have a handle.','Lily is pouring drinking water. Find something to drink from.','A cup for our guest.',['cup','flower','shoe']),
T('spoon','I have a handle and a little bowl.','We have a bowl of yoghurt. What helps us eat it?','A spoon for our snack.',['spoon','key','lamp']),
T('four','Count one, two, three, four.','Four friends need a place. Find a group of four counters.','Four places, one for each friend.',['four','two','three'],'Counting groups'),
T('grapes','I am a bunch of little purple fruit.','Find the purple fruit for our picnic bowl.','Our fruit bowl is ready.',['grapes','apple','banana'],'Fruit clues'),
T('banana','I am a curved yellow fruit.','Coco asked for the yellow fruit. Which one is it?','A banana for the picnic.',['banana','grapes','apple'],'Fruit clues'),
T('umbrella','I open wide and have a curved handle.','A little rain taps on the deck. What helps us carry our picnic inside?','Everyone stays dry together.',['umbrella','tree','cup']),
T('flower','I have soft colourful petals.','Lily wants to look at the garden. Find the flower growing outside.','We enjoy the flowers where they grow.',['flower','leaf','cloud'],'Nature clues'),
T('lantern','I am a little light with a handle.','Evening is coming. Find the battery lantern for our next walk.','A glowing path is waiting for us.',['lantern','book','boat'])
]},
{title:'The firefly garden',intro:'Follow the glowing path with Suzy. Help the friends care for a little garden, then watch the fireflies light up the evening.',stops:['The fern path','The growing garden','The glowing clearing'],reward:'flower',rewardName:'A glowing flower patch',ending:'A garden full of little lights',next:'Our campsite is growing. Visit a favourite place again for new clues and discoveries.',
tasks:[
T('lantern','I have a handle and shine a gentle light.','The path is getting dark. What can light our way?','Our battery lantern lights the path.',['lantern','cup','shoe']),
T('tree','I have a trunk and branches.','Follow the path beside the tall leafy landmark. What is it?','The tree marks the garden entrance.',['tree','flower','leaf'],'Nature clues'),
T('leaf','I am green and grow on a plant.','A green shape is printed on the garden sign. Find the matching leaf.','The leaf sign leads to the ferns.',['leaf','apple','grapes'],'Nature clues'),
T('circle','I have no corners.','The moon looks round tonight. Which shape matches?','A circle in the evening sky.',['circle','triangle','square'],'Shape matching'),
T('key','I turn inside a lock.','The garden keeper left a key. What opens the gate?','The garden gate swings open.',['key','spoon','book']),
T('seed','I am tiny, but I can grow into a plant.','What shall we put into this little patch of soil?','A seed is tucked into the soil.',['seed','stone','cup'],'Growing things'),
T('watering','I have a handle and a spout for watering plants.','Our new seed needs a little water. What should we use?','A gentle sprinkle for our seed.',['watering','book','shoe'],'Growing things'),
T('three','Count three little round counters.','Three seed spots are ready. Find the matching group.','Three seeds have room to grow.',['three','two','four'],'Counting groups'),
T('flower','I open into colourful petals.','This older plant has already grown. What is blooming?','The garden has flowers at every stage.',['flower','cloud','leaf'],'Growing things'),
T('umbrella','I shelter you from the rain.','A shower will water the garden. What can keep us dry while we watch?','Rain for the plants, shelter for our friends.',['umbrella','lamp','spoon']),
T('book','I have a cover and pages.','Let’s draw what we saw in our nature book. Find it.','Our garden memories have a home.',['book','door','key']),
T('four','Count a group of four.','Four little lights are glowing. Find the same number of counters.','Four lights twinkle above the ferns.',['four','two','three'],'Counting groups'),
T('triangle','I have three straight sides.','Our tent has a pointed front. Find the shape it looks like.','The tent shows us the way back to camp.',['triangle','circle','square'],'Shape matching'),
T('cup','I hold a drink.','A warm rest at camp! Find a cup for our water.','Everyone has a place at camp.',['cup','spoon','flower']),
T('firefly','I am a tiny insect with a glowing light.','Who is making the little lights above the garden?','Fireflies! We watch them gently, and leave them free.',['firefly','fish','duck'],'Nature clues')
]}];
const svg=b=>'<svg viewBox="0 0 160 160" aria-hidden="true">'+b+'</svg>';
window.FindExtraArt=n=>({
leaf:svg('<path d="M30 135Q5 10 140 20 150 140 30 135" fill="#79ad65"/><path d="m25 145 90-90m-50 50-8-36m32 12 32 5" fill="none" stroke="#4f8655" stroke-width="6" stroke-linecap="round"/>'),
boat:svg('<path d="M12 90h136l-29 44H43Z" fill="#c88f74"/><path d="M78 88V18l58 70Z" fill="#f8e9bd"/><path d="M72 26 22 84h50Z" fill="#a1c6b5"/><path d="M10 143q20-10 40 0t40 0t50 0" fill="none" stroke="#87bbcb" stroke-width="5"/>'),
fish:svg('<path d="m115 80 33-35v70Z" fill="#d99e67"/><ellipse cx="70" cy="80" rx="53" ry="34" fill="#efbf7f"/><circle cx="40" cy="73" r="6" fill="#46594f"/><path d="m70 50 20-18 14 32" fill="#d99e67"/>'),
seed:svg('<ellipse cx="80" cy="89" rx="29" ry="42" transform="rotate(30 80 89)" fill="#b18c61"/><path d="M67 113q22-17 29-45" fill="none" stroke="#ddc5a1" stroke-width="5"/>'),
stone:svg('<path d="M25 106q-15-55 48-62 58-8 68 48 8 40-55 41-50 4-61-27" fill="#a6b2b4"/>'),
watering:svg('<path d="M39 65h69v66H39Z" fill="#88b6b5"/><path d="m108 104 27-50 16 9-25 62Z" fill="#88b6b5"/><path d="M41 72Q5 44 15 105q6 20 27 8" fill="none" stroke="#659a9b" stroke-width="12"/><path d="M58 66V42q15-22 35 0v24" fill="none" stroke="#659a9b" stroke-width="9"/>'),
lantern:svg('<path d="M58 35V22q22-23 44 0v13" fill="none" stroke="#8f9b79" stroke-width="8"/><rect x="45" y="35" width="70" height="103" rx="15" fill="#6f9983"/><rect x="56" y="52" width="48" height="64" rx="10" fill="#f8df92"/><path d="m80 63 7 19 18 5-18 6-7 19-7-19-18-6 18-5Z" fill="#fff6c9"/>'),
firefly:svg('<ellipse cx="58" cy="67" rx="26" ry="15" transform="rotate(30 58 67)" fill="#d5e6d3"/><ellipse cx="102" cy="67" rx="26" ry="15" transform="rotate(-30 102 67)" fill="#d5e6d3"/><ellipse cx="80" cy="98" rx="22" ry="34" fill="#f6db84"/><circle cx="80" cy="58" r="18" fill="#719679"/><circle cx="74" cy="54" r="3" fill="#263e3a"/><circle cx="87" cy="54" r="3" fill="#263e3a"/>')
}[n]||'');
})();
