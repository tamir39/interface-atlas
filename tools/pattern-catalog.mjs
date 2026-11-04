import assert from 'node:assert/strict';
import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
assert.ok(process.argv.slice(2).every(arg=>arg==='--check'),'Usage: node tools/pattern-catalog.mjs [--check]');
const check=process.argv.includes('--check');
const scalarFields=['id','name','revision','status','entry_creator','summary','source_mode','reviewed_on'];
const listFields=['decisions','fit_types','dependencies'];
function metadata(text){
 const blocks=text.replace(/^\uFEFF/,'').split(/^---\s*$/m);assert.ok(blocks.length>=3&&!blocks[0].trim(),'Expected README frontmatter');const result={};
 for(const line of blocks[1].trim().split(/\r?\n/)){if(!line.trim()||line.trim().startsWith('#'))continue;const match=/^([a-z][a-z0-9_]*):\s*(.+)$/.exec(line);assert.ok(match,'Unsupported metadata line '+line);const[,key,raw]=match;assert.ok(!Object.hasOwn(result,key),'Duplicate field '+key);const scalar=value=>value.trim().replace(/^(['"])(.*)\1$/,'$2');result[key]=raw.startsWith('[')&&raw.endsWith(']')?raw.slice(1,-1).split(',').filter(v=>v.trim()).map(scalar):scalar(raw);}
 for(const key of scalarFields)assert.ok(typeof result[key]==='string'&&result[key],'Missing scalar '+key);for(const key of listFields)assert.ok(Array.isArray(result[key]),'Missing inline list '+key);
 assert.ok(['draft','researching','ready-for-extraction','validated'].includes(result.status),'Invalid status');assert.ok(['original-with-credited-references','licensed-adaptation','mixed'].includes(result.source_mode),'Invalid source mode');assert.ok(result.decisions.length&&result.fit_types.length,'Provide decisions and fit');assert.match(result.reviewed_on,/^\d{4}-\d{2}-\d{2}$/);return result;
}
const patterns=[];
for(const entry of (await readdir(path.join(root,'patterns'),{withFileTypes:true})).filter(e=>e.isDirectory()&&e.name!=='preview-assets'&&!e.name.startsWith('.')).sort((a,b)=>a.name.localeCompare(b.name))){
 const base=path.join(root,'patterns',entry.name),meta=metadata(await readFile(path.join(base,'README.md'),'utf8'));assert.equal(meta.id,entry.name);assert.match(meta.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);const documents={},reading_words={};
 for(const name of ['README.md','pattern.md','sources.md','validation.md']){try{const filename=path.join(base,name);assert.ok((await stat(filename)).isFile());const key=name==='README.md'?'readme':name.slice(0,-3);documents[key]='patterns/'+entry.name+'/'+name;const text=await readFile(filename,'utf8');reading_words[key]=text.replace(/^---[\s\S]*?---\s*/,'').trim().split(/\s+/).filter(Boolean).length;}catch(error){if(name!=='validation.md'||error.code!=='ENOENT')throw error;}}
 if(meta.status==='validated')assert.ok(documents.validation,'Validated needs actual evidence; a record is not conformance proof');const preview='patterns/'+entry.name+'/preview/index.html';assert.ok((await stat(path.join(root,preview))).isFile(),'Preview missing');patterns.push({...meta,documents,reading_words,preview});
}
assert.ok(patterns.length,'Expected implemented patterns');const output=JSON.stringify({schema_version:1,patterns},null,2)+'\n';const filename=path.join(root,'catalog/patterns.json');if(check)assert.equal(await readFile(filename,'utf8'),output,'Pattern catalog is stale; run node tools/pattern-catalog.mjs');else await writeFile(filename,output);console.log((check?'Verified':'Generated')+' catalog for '+patterns.length+' pattern(s).');
