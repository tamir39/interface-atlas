/* Original Interface Atlas pattern labs. No backend, storage, or upstream component code. */
(() => {
 'use strict';
 const root=document.documentElement;
 const byId=id=>document.getElementById(id);
 const appearance=byId('appearance');
 const media={reduced:matchMedia('(prefers-reduced-motion: reduce)'),forced:matchMedia('(forced-colors: active)')};
 function initButton(){
  const add=byId('add-item'),reset=byId('reset-button'),toggle=byId('emphasis-toggle'),list=byId('item-list');
  const samples=[['Name the action','Use a label that predicts the visible result.'],['Keep the focus visible','A keyboard location is separate from persistent state.'],['Explain the boundary','An unavailable action needs an understandable reason.']];
  let count=0;
  function render(){byId('item-count').textContent=count+' of 3 sample items added';add.disabled=count===samples.length;byId('add-help').textContent=count===samples.length?'All three sample items have been added. Reset example is available to start again.':'Three original sample items are available. Completion moves focus to Reset example.';}
  add.addEventListener('click',()=>{if(count===samples.length)return;const row=document.createElement('li'),strong=document.createElement('strong'),copy=document.createElement('p');strong.textContent=samples[count][0];copy.textContent=samples[count][1];row.append(strong,copy);list.append(row);count+=1;render();byId('button-status').textContent='Added '+count+' of 3 sample items.'+(count===3?' All samples are present. Focus moved to Reset example.':'');if(count===3)reset.focus();});
  toggle.addEventListener('click',()=>{const on=toggle.getAttribute('aria-pressed')!=='true';toggle.setAttribute('aria-pressed',String(on));byId('emphasis-preview').classList.toggle('is-emphasized',on);byId('emphasis-state').textContent='Preview emphasis: '+(on?'on.':'off.');});
  reset.addEventListener('click',()=>{count=0;list.replaceChildren();toggle.setAttribute('aria-pressed','false');byId('emphasis-preview').classList.remove('is-emphasized');byId('emphasis-state').textContent='Preview emphasis: off.';render();byId('button-status').textContent='Example reset. No items are added and emphasis is off. Focus moved to Add sample item.';add.focus();});
  return()=>{reset.disabled=false;toggle.disabled=false;render();};
 }
 function initLoading(){
  const lab=byId('loading-lab'),start=byId('request-start'),reset=byId('request-reset'),outcomes=byId('outcome-controls'),results=byId('loading-results'),list=byId('result-list'),empty=byId('result-empty'),error=byId('loading-error'),placeholder=byId('loading-placeholder'),motion=byId('animate-placeholder');
  let state='idle';
  function render(){lab.dataset.state=state;const pending=state==='pending';start.disabled=pending;outcomes.disabled=!pending;results.setAttribute('aria-busy',String(pending));placeholder.hidden=!pending||list.children.length>0;empty.hidden=pending||list.children.length>0;error.hidden=state!=='error';start.textContent=state==='error'?'Retry simulated load':state==='idle'?'Start simulated load':'Start another simulated load';if(state==='idle')empty.textContent='No sample has been loaded.';else if(state==='empty')empty.textContent='The simulated response returned no items.';else if(state==='error')empty.textContent='No previous sample results are available.';}
  function setMotion(){root.dataset.shimmer=motion.checked?'on':'off';byId('motion-note').textContent=media.forced.matches?'System colors are active. Placeholder motion is off.':media.reduced.matches?'The device requests reduced motion. Placeholder motion is off.':motion.checked?'Placeholder motion is enabled while the first simulated load is pending. It does not indicate progress.':'Placeholder motion is off. The device\'s reduced-motion and forced-color choices override it.';}
  start.addEventListener('click',()=>{if(state==='pending')return;state='pending';render();byId('loading-status').textContent='Simulated load pending. '+(list.children.length?'Previous sample results remain visible. ':'No sample results are available yet. ')+'Choose an outcome below; no request has been sent.';byId('resolve-items').focus();});
  function settle(kind){if(state!=='pending')return;state=kind;if(kind==='success'){list.replaceChildren();for(const[title,copy]of [['Semantic color roles','Name the job of each color before selecting a value.'],['Visible keyboard route','Keep a clear focus indicator through the task.'],['Content pressure','Check long labels and useful recovery copy.']]){const row=document.createElement('li'),strong=document.createElement('strong'),p=document.createElement('p');strong.textContent=title;p.textContent=copy;row.append(strong,p);list.append(row);}}else if(kind==='empty')list.replaceChildren();if(kind==='error')error.textContent='The simulated load failed. Use Retry simulated load to try another outcome.';render();byId('loading-status').textContent=kind==='success'?'Simulated load resolved with three original sample results.':kind==='empty'?'Simulated load resolved with an empty set. Previous sample items were replaced.':'Simulated load failed. '+(list.children.length?'Previous sample results remain visible. ':'No previous sample results are available. ')+'Retry simulated load is available.';start.focus();}
  byId('resolve-items').addEventListener('click',()=>settle('success'));byId('resolve-empty').addEventListener('click',()=>settle('empty'));byId('reject-load').addEventListener('click',()=>settle('error'));
  reset.addEventListener('click',()=>{state='idle';list.replaceChildren();error.textContent='';render();byId('loading-status').textContent='Simulation reset. No sample has been loaded. Inactive outcome controls cannot finish a load.';start.focus();});
  motion.addEventListener('change',setMotion);Object.values(media).forEach(query=>query.addEventListener('change',setMotion));
  return()=>{reset.disabled=false;motion.disabled=false;render();setMotion();};
 }
 function initHero(){
  const long=byId('long-content'),layout=byId('hero-layout');
  long.addEventListener('change',()=>{byId('sample-title').textContent=long.checked?'A calmer way to plan a working week when priorities, collaborators, and long project names all need room.':'A calmer way to plan a working week.';byId('sample-description').textContent=long.checked?'Bring changing priorities, the people who share the work, and the next useful step into one readable view. This longer original example deliberately includes more detail to reveal wrapping, grouping, and narrow-layout decisions without changing the fictional brief.':'Bring priorities, people and the next useful step into one readable view. This is original example content for evaluating a layout.';});
  layout.addEventListener('change',()=>{byId('sample-hero').dataset.layout=layout.value==='stacked'?'stacked':'split';});
  return()=>{long.disabled=false;layout.disabled=false;};
 }
 const enable=root.dataset.pattern==='button-feedback'?initButton():root.dataset.pattern==='loading-feedback'?initLoading():initHero();
 appearance.addEventListener('change',()=>{root.dataset.appearance=['light','dark','system'].includes(appearance.value)?appearance.value:'system';});
 enable();appearance.disabled=false;byId('js-status').textContent='Local controls ready. Choices belong to this page and reset on reload.';root.dataset.ready='true';
})();
