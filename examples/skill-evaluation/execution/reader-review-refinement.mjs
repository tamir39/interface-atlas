import {readFile,appendFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root='D:/Projects/InterfaceAtlas';
const stage='C:/Users/PC/.codex/visualizations/2026/10/12/01a13103-a26d-7172-81af-e67e7cee6101/interface-atlas-skill-implementation-2026-10-17';
const [trial,relative,mode='--whole',selector='',...purposeParts]=process.argv.slice(2);
if(!trial||!relative||!/^[-a-z0-9]+$/.test(trial))throw Error('Usage: trial-read.mjs trial-id repository-path [--whole|--headings|--section selector|--range start:end] [purpose]');
const folder=path.join(stage,'runs',trial);
const record=async item=>{await mkdir(folder,{recursive:true});let prior='';try{prior=await readFile(path.join(folder,'read-events.jsonl'),'utf8');}catch{}const sequence=prior.trim()?prior.trim().split('\n').length+1:1;await appendFile(path.join(folder,'read-events.jsonl'),JSON.stringify({sequence,timestamp:new Date().toISOString(),...item})+'\n');};
process.on('uncaughtException',async error=>{try{await record({path:relative,purpose:purposeParts.join(' '),status:'failed',requestedMode:mode,selector,returnedBytes:0,error:String(error.message)});}finally{process.stderr.write(String(error.message)+'\n');process.exit(1);}});
const absolute=path.resolve(root,relative),rel=path.relative(root,absolute).replaceAll('\\','/');
if(rel.startsWith('..')||path.isAbsolute(rel)||rel.startsWith('.git/'))throw Error('Repository content only');
const buffer=await readFile(path.join(stage,'frozen-source-v2',rel)),text=buffer.toString('utf8'),lines=text.split('\n');
let output,selection;
if(mode==='--whole'){output=text;selection={kind:'whole'};}
else if(mode==='--headings'){output=lines.filter(l=>/^#{1,6}\s/.test(l)).join('\n')+'\n';selection={kind:'headings'};}
else if(mode==='--section'){const entries=lines.map((line,i)=>({i,m:line.match(/^(#{1,6})\s+(.+?)\s*$/)})).filter(x=>x.m);const hits=entries.filter(x=>x.m[2]===selector||lines[x.i]===selector);if(hits.length!==1)throw Error('Section must match exactly once: '+selector);const start=hits[0];const next=entries.find(x=>x.i>start.i&&x.m[1].length<=start.m[1].length);const end=next?.i??lines.length;output=lines.slice(start.i,end).join('\n');if(!output.endsWith('\n'))output+='\n';selection={kind:'section',heading:selector,startLine:start.i+1,endLine:end};}
else if(mode==='--range'){const parts=selector.split(':').map(Number);if(parts.length!==2||parts.some(x=>!Number.isInteger(x)||x<1)||parts[1]<parts[0]||parts[1]>lines.length)throw Error('Invalid range');output=lines.slice(parts[0]-1,parts[1]).join('\n')+'\n';selection={kind:'line-range',startLine:parts[0],endLine:parts[1]};}
else throw Error('Unknown mode');
const digest=b=>createHash('sha256').update(b).digest('hex');
const returned=Buffer.from(output,'utf8');
await record({path:rel,purpose:purposeParts.join(' ')||'task-relevant content',status:'returned',selection,sourceBytes:buffer.length,sourceSHA256:digest(buffer),returnedBytes:returned.length,returnedSHA256:digest(returned)});
process.stdout.write(output);
