/* Motor de combate compartido de Ludus Imperium, edición compacta. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.LI=api;})(typeof self!=='undefined'?self:globalThis,function(){'use strict';
const ATTR=['Fuerza','Velocidad','Técnica','Resistencia','Defensa','Agilidad','Táctica','Agresividad','Voluntad','Disciplina','Carisma'];
const CLASSES=[
{name:'Murmillo',weapon:'Gladius y scutum',desc:'Escudo pesado, presión constante. Domina la corta distancia; sufre ante el tridente.',atk:1.02,def:1.18,speed:.84,range:1,special:'Carga de escudo',counter:3},
{name:'Thraex',weapon:'Sica y parmula',desc:'La hoja curva sortea escudos. Ágil y técnico, pero menos protegido.',atk:1.08,def:.91,speed:1.12,range:1,special:'Sica al flanco',counter:0},
{name:'Retiarius',weapon:'Red y tridente',desc:'Controla la distancia y desequilibra con su red. Vulnerable a la presión del secutor.',atk:1.02,def:.85,speed:1.18,range:3,special:'Lanzamiento de red',counter:0},
{name:'Secutor',weapon:'Gladius y escudo',desc:'Perseguidor protegido, casco cerrado. Cierra distancias contra el retiarius.',atk:1.04,def:1.12,speed:.94,range:1,special:'Asalto del perseguidor',counter:2},
{name:'Hoplomachus',weapon:'Lanza y escudo',desc:'Alcance y defensa equilibrados. Castiga las entradas de los luchadores rápidos.',atk:.98,def:1.03,speed:1,range:3,special:'Estocada de lanza',counter:5},
{name:'Dimachaerus',weapon:'Dos espadas',desc:'Ráfagas y contraataques con dos hojas. Poca defensa frente a armas largas.',atk:1.18,def:.80,speed:1.1,range:1,special:'Doble filo',counter:1},
{name:'Provocator',weapon:'Espada y pectoral',desc:'Duelista equilibrado con una excelente recuperación. Gana los combates largos.',atk:.98,def:1.05,speed:.98,range:2,special:'Desafío del veterano',counter:4}
];
function clamp(n,a=0,b=100){return Math.max(a,Math.min(b,n));}
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function rand(w){let t=w.rng+=0x6D2B79F5;w.rng>>>=0;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
function pick(w,a){return a[Math.floor(rand(w)*a.length)];}
function int(w,a,b){return Math.floor(rand(w)*(b-a+1))+a;}
function normal(w){return (rand(w)+rand(w)+rand(w)+rand(w)-2)*1.73;}
function pwr(g){return Math.round(g.attrs.slice(0,9).reduce((a,b)=>a+b,0)/9);}
function combat(inputs,seed=1,opts={}){const r={rng:typeof seed==='string'?hash(seed):seed>>>0};const random=opts.randomness??1;
let fs=inputs.map((g,i)=>({g,team:opts.teams?opts.teams[i]:(opts.royale?i:i%2),hp:100,st:100,damage:0,hits:0,attempts:0,blocks:0,dodges:0,actions:0,down:false,form:normal(r)*15*random}));let ev=[],eliminations=[];let time=0,ending='incapacidad';const max=opts.maxTurns||int(r,34,75);
function log(e){if(opts.log!==false)ev.push(e);}
for(let turn=0;turn<max;turn++){const alive=fs.filter(f=>!f.down);const teams=new Set(alive.map(f=>f.team));if(teams.size<=1)break;time++;
const weights=alive.map(f=>(f.g.attrs[1]+f.g.attrs[5]+40)*CLASSES[f.g.class].speed);let n=rand(r)*weights.reduce((a,b)=>a+b,0),actor=alive[0];for(let i=0;i<alive.length;i++){n-=weights[i];if(n<=0){actor=alive[i];break;}}
const rivals=alive.filter(f=>f.team!==actor.team);const target=pick(r,rivals),a=actor.g,b=target.g,ac=CLASSES[a.class],bc=CLASSES[b.class];let action='rápido';let roll=rand(r);const tactical=a.tactic||'equilibrada';
if(actor.st<23||roll<.09+(tactical==='defensiva'?.08:0)){let recover=18+a.attrs[3]*.12;actor.st=clamp(actor.st+recover);log({t:time,a:a.id,b:b.id,act:'recuperar',d:0,h:Math.ceil(actor.hp),s:Math.round(actor.st),bh:Math.ceil(target.hp),bs:Math.round(target.st)});continue;}
if(roll<.27+(a.attrs[7]-50)/500)action='potente';else if(roll<.41)action='especial';else if(roll<.50)action='distancia';else if(roll<.59)action='contraataque';
let cost=({rápido:6,potente:13,especial:16,distancia:5,contraataque:8})[action];actor.st=clamp(actor.st-cost*(1.2-a.attrs[3]/250)*(opts.heat?1.12:1));actor.attempts++;actor.actions++;
let attack=a.attrs[2]*.44+a.attrs[1]*.18+a.attrs[6]*.14+a.attrs[0]*.14+a.xp*.07+a.morale*.03;
attack+=actor.form;let defense=b.attrs[4]*.38+b.attrs[5]*.30+b.attrs[6]*.15+b.attrs[1]*.10+b.xp*.07;
defense+=target.form;const style=(ac.counter===b.class?8:0)-(bc.counter===a.class?6:0);const stamina=(actor.st-target.st)*.1-(a.fatigue-b.fatigue)*.09;
if(a.trait==='Paciente'&&action==='contraataque')attack+=5;if(a.trait==='Temerario'&&action==='potente')attack+=5;let chance=clamp(.63+(attack-defense+style+stamina)/150+(tactical==='agresiva'?.045:tactical==='defensiva'?-.035:0),.15,.91);
if(action==='potente')chance-=.12;if(action==='distancia')chance+=ac.range>bc.range?.07:-.025;
const noise=.5+(rand(r)-.5)*clamp(random,.15,2.5);let damage=0,result=action;
if(noise<chance){let base=4+a.attrs[0]*.075+a.attrs[2]*.025+a.equipment*.55;let mult=action==='potente'?1.75:action==='especial'?1.45:action==='contraataque'?1.20:action==='distancia'?.72:1;
damage=Math.max(1,(base*ac.atk/bc.def*mult)*(1-b.attrs[4]/350)*(0.65+actor.st/230)*(1+(rand(r)-.5)*.5*random));
if(action==='especial'&&a.class===2){target.st=clamp(target.st-20);result='red';}if(action==='especial'&&(a.class===0||a.class===3)){target.st=clamp(target.st-14);result='desequilibrio';}
if(action==='especial'&&a.class===6)actor.st=clamp(actor.st+16);
if(tactical==='agresiva')damage*=1.12;if(b.tactic==='defensiva')damage*=.88;
damage=Math.round(damage*10)/10;target.hp=Math.max(0,target.hp-damage);actor.damage+=damage;actor.hits++;
}else if(rand(r)<b.attrs[5]/130){result='esquiva';target.dodges++;target.st=clamp(target.st-3);}else{result='bloqueo';target.blocks++;target.st=clamp(target.st-5);}
if(target.hp<=0||(target.hp<12&&rand(r)<(100-b.attrs[8])/300)){target.down=true;result=target.hp<=0?'incapacidad':'rendición';ending=result;eliminations.push({id:b.id,by:a.id,t:time});}
for(const f of fs)if(!f.down)f.st=clamp(f.st+1.1+f.g.attrs[3]/100);
log({t:time,a:a.id,b:b.id,act:result,d:damage,h:Math.ceil(actor.hp),s:Math.round(actor.st),bh:Math.ceil(target.hp),bs:Math.round(target.st),out:target.down});
}
const alive=fs.filter(f=>!f.down);let winner=alive.slice().sort((a,b)=>(b.hp+b.damage*.45)-(a.hp+a.damage*.45))[0]||fs.slice().sort((a,b)=>b.damage-a.damage)[0];
// A finite time limit still yields a complete, unambiguous BR placement.
const remaining=alive.filter(f=>f!==winner).sort((a,b)=>(a.hp+a.damage*.45)-(b.hp+b.damage*.45));
for(const f of remaining){eliminations.push({id:f.g.id,by:winner.g.id,t:++time,decision:true});f.down=true;log({t:time,a:winner.g.id,b:f.g.id,act:'decisión',d:0,h:Math.ceil(winner.hp),s:Math.round(winner.st),bh:Math.ceil(f.hp),bs:Math.round(f.st),out:true});}
const ranking=[winner.g.id,...eliminations.slice().reverse().map(e=>e.id)].filter((id,i,a)=>a.indexOf(id)===i);

return {ranking,eliminations,winner:winner.g.id,team:winner.team,method:new Set(alive.map(f=>f.team)).size===1?ending:'decisión',turns:time,events:ev,stats:fs.map(f=>({id:f.g.id,team:f.team,hp:Math.ceil(f.hp),st:Math.round(f.st),damage:Math.round(f.damage),hits:f.hits,attempts:f.attempts,blocks:f.blocks,dodges:f.dodges,down:f.down}))};}

return {ATTR,CLASSES,clamp,hash,rand,pick,int,pwr,combat};});
