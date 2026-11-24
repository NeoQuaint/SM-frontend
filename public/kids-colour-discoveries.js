/* Stable illustrated colour examples, shared across devices. */
(()=>{'use strict';
const art=[
'<path d="M46 51Q24 77 61 136Q80 161 99 136Q136 77 114 51Z" fill="#f04459"/><path d="M80 57L43 40l22-2 15-22 13 23 25 3-35 18Z" fill="#38a664"/><g fill="#ffe3a1">'+[[-19,0],[14,3],[-26,22],[3,25],[23,26],[-9,47],[7,60]].map(([x,y])=>'<ellipse cx="'+(80+x)+'" cy="'+(69+y)+'" rx="3" ry="5"/>').join('')+'</g>',
'<g stroke="#ffce36" stroke-width="10" stroke-linecap="round">'+Array.from({length:8},(_,i)=>'<path d="M80 15v12" transform="rotate('+i*45+' 80 80)"/>').join('')+'</g><circle cx="80" cy="80" r="36" fill="#ffcf36"/><path d="M66 90q14 15 28 0" fill="none" stroke="#a66b32" stroke-width="4" stroke-linecap="round"/>',
'<path d="M28 78q9-53 60-36q42 10 44 49q-22 40-72 23l-30 17 4-34Z" fill="#348fe8"/><path d="M122 80l25-18-4 44-20-9" fill="#68b9f7"/><circle cx="52" cy="72" r="5" fill="#233e65"/><path d="M72 110q20 18 32-3" fill="#68b9f7"/>',
'<path d="M31 126Q11 39 133 23Q145 142 31 126Z" fill="#37b66e"/><path d="M28 137L111 48m-57 62-7-32m30 10 26 1" fill="none" stroke="#d0ef9a" stroke-width="6" stroke-linecap="round"/>',
'<circle cx="80" cy="91" r="51" fill="#ff943e"/><path d="M80 40q-4-23 14-26" fill="none" stroke="#7b7140" stroke-width="7"/><path d="M83 39q22-35 45-13q-16 27-45 13" fill="#48ae68"/><path d="M48 69q8-15 18-16" fill="none" stroke="#ffd283" stroke-width="7" stroke-linecap="round"/>',
[[59,53],[99,53],[42,78],[79,81],[117,78],[60,108],[99,108],[80,134]].map(([x,y])=>'<circle cx="'+x+'" cy="'+y+'" r="20" fill="#9a63d7" stroke="#c392ed" stroke-width="3"/>').join('')+'<path d="M79 33q0-21 19-24" fill="none" stroke="#459963" stroke-width="7"/>',
'<path d="M80 90v55" stroke="#42aa67" stroke-width="8"/>'+Array.from({length:5},(_,i)=>'<ellipse cx="80" cy="49" rx="19" ry="30" fill="#f18ac0" transform="rotate('+i*72+' 80 78)"/>').join('')+'<circle cx="80" cy="78" r="18" fill="#ffe57d"/>',
'<circle cx="45" cy="39" r="23" fill="#a57650"/><circle cx="115" cy="39" r="23" fill="#a57650"/><ellipse cx="80" cy="87" rx="57" ry="59" fill="#a57650"/><ellipse cx="80" cy="108" rx="28" ry="23" fill="#e7be91"/><g fill="#382c2d"><circle cx="59" cy="77" r="5"/><circle cx="101" cy="77" r="5"/><ellipse cx="80" cy="101" rx="9" ry="6"/></g>',
'<path d="M33 69L31 21l33 22q17-7 32 0l33-22-2 48q13 72-47 73Q20 141 33 69" fill="#3f4455"/><g fill="#e9db79"><ellipse cx="59" cy="81" rx="8" ry="10"/><ellipse cx="101" cy="81" rx="8" ry="10"/></g><path d="M74 104h12l-6 7Z" fill="#efb6c6"/>',
'<path d="M31 112C-2 105 6 67 34 66C29 28 86 13 105 54C145 40 170 94 135 112Z" fill="#fffaf0" stroke="#b4d8e5" stroke-width="4"/>'
];
window.ColourDiscoveries={names:['strawberry','sun','blue fish','leaf','orange','grapes','flower','teddy bear','cat','cloud'],art:i=>'<svg viewBox="0 0 160 160" role="img" aria-label="'+window.ColourDiscoveries.names[i]+'">'+art[i]+'</svg>'};
})();
