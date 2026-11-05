/* Original local simulation. No fetch, endpoint, timer, third-party runtime or real agent. */
(() => {
  'use strict';
  const KEY = 'harbor-desk-ui-trial-v1';
  const IDS = ['REQ-201', 'REQ-202', 'REQ-203'];
  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  const initial = () => ({schema:1, appearance:'system', filter:'all', selected:'REQ-201', step:0, actionSequence:0,
    requests:[
      {id:'REQ-201', proposal:'PROP-401', version:3, session:'SES-101', revision:12, title:'Opening keynote', time:'10:00', before:'West 101', after:'Harbor Hall', segment:'SEG-31', segmentText:'Registered attendees for the opening keynote; registration snapshot captured at 08:40 UTC. No live recipient count is supplied.', notice:'The opening keynote at 10:00 has moved from West 101 to Harbor Hall. Please use the main foyer entrance. The start time is unchanged.', rationale:'The room-change record identifies Harbor Hall as the replacement venue. The draft keeps the original start time and names the main foyer entrance.', attention:'Needs review', allowed:true, hidden:false, observed:0, effect:null, action:null},
      {id:'REQ-202', proposal:'PROP-402', version:2, session:'SES-102', revision:8, title:'Designing together', time:'11:15', before:'Studio 2', after:'East 204', segment:'SEG-32', segmentText:'Registered attendees for Designing together; registration snapshot captured at 08:41 UTC. No live recipient count is supplied.', notice:'Designing together at 11:15 will now take place in East 204, instead of Studio 2. Follow the east corridor signs. The session time is unchanged.', rationale:'The session record changes only the room. This wording names the replacement room and preserves the session time.', attention:'Needs review', allowed:true, hidden:false, observed:0, effect:null, action:null},
      {id:'REQ-203', proposal:'PROP-403', version:1, session:'SES-103', revision:5, title:'Community roundtable', time:'14:00', before:'Garden', after:'Library', segment:'SEG-33', segmentText:'Registered attendees for the community roundtable; registration snapshot captured at 08:42 UTC. No live recipient count is supplied.', notice:'The community roundtable at 14:00 is moving from the Garden to the Library. Please enter through the courtyard doors. The start time is unchanged.', rationale:'The replacement room is the Library. The proposed wording distinguishes the room change from the unchanged start time.', attention:'Needs review', allowed:true, hidden:false, observed:0, effect:null, action:null}
    ], corrections:[], cancellation:null});
  let state = initial();
  let inspected;
  let offline = false;
  let retentionFailure = false;
  let retentionReady = false;
  let recoveryLock = false;
  let storageNote = '';
  let restoreNote = 'Starting fixture. No retained prior actions.';
  let lookup = {};
  let draftOpen = false;
  let draftBase = '';
  let draftBaseVersion = 0;
  let correctionBase = '';
  let pendingNavigation = null;
  let dirtyFocus = null;
  const request = () => state.requests.find(r => r.id === state.selected);
  const clock = step => `08:${String(45 + Math.floor(step / 60)).padStart(2,'0')}:${String(step % 60).padStart(2,'0')} UTC · fixture step ${step}`;
  const next = () => ++state.step;
  const text = (id, value) => { $(id).textContent = value; };
  const announce = value => { text('announcement', value); };
  const bounded = (s, n=10000) => typeof s === 'string' && s.length <= n;
  const integer = n => Number.isInteger(n) && n >= 0 && n < 10000;
  const validScope = scope => Array.isArray(scope) && scope.length > 0 && scope.length <= 3 && new Set(scope).size === scope.length && scope.every(id => IDS.includes(id));
  const actionStates = ['prepared','requested','accepted','confirmed','unknown','rejected'];
  function validRecord(value) {
    if (!value || value.schema !== 1 || !['system','light','dark'].includes(value.appearance) || !['all','review','unresolved','visible'].includes(value.filter) || !IDS.includes(value.selected) || !integer(value.step) || !integer(value.actionSequence)) return false;
    if (!Array.isArray(value.requests) || value.requests.length !== 3 || !Array.isArray(value.corrections) || value.corrections.length > 100) return false;
    const bases = initial().requests;
    for (let i=0;i<3;i++) {
      const r=value.requests[i], b=bases[i];
      if (!r || ['id','proposal','session','revision','title','time','before','after','segment','segmentText','rationale'].some(k => r[k] !== b[k])) return false;
      if (!integer(r.version) || r.version < b.version || !bounded(r.notice,6000) || !['Needs review','Decision pending','Resolved','Superseded','Expired'].includes(r.attention) || typeof r.allowed !== 'boolean' || typeof r.hidden !== 'boolean' || !integer(r.observed)) return false;
      if (r.effect && (!/^FX-\d+$/.test(r.effect.id) || !integer(r.effect.step) || !integer(r.effect.version) || r.effect.proposal !== r.proposal)) return false;
      const a=r.action;
      if (a && (!/^ACT-\d+$/.test(a.id) || a.request !== r.id || a.proposal !== r.proposal || !integer(a.version) || a.revision !== r.revision || a.segment !== r.segment || !bounded(a.notice,6000) || !actionStates.includes(a.state) || !integer(a.step) || !(a.checked === null || integer(a.checked)) || !bounded(a.lookupNote,1000) || typeof a.recheck !== 'boolean' || a.dispatchCount !== 1)) return false;
    }
    for (const c of value.corrections) {
      if (!c || !/^COR-\d+$/.test(c.id) || c.version !== 1 || !validScope(c.scope) || !bounded(c.text,4000) || !['sending','acknowledged','applied','unknown'].includes(c.state) || !integer(c.step) || !Array.isArray(c.applicability) || c.applicability.length>3 || c.applicability.some(a => !bounded(a,150))) return false;
    }
    const c=value.cancellation;
    return !c || (/^CAN-\d+$/.test(c.id) && validScope(c.scope) && ['requested','acknowledged','closed','unknown'].includes(c.state) && integer(c.step) && (c.requestedStep===undefined || integer(c.requestedStep)) && (c.acknowledgedStep===undefined || c.acknowledgedStep===null || integer(c.acknowledgedStep)) && (c.closedStep===undefined || c.closedStep===null || integer(c.closedStep)) && (c.lostReply===undefined || typeof c.lostReply==='boolean'));
  }
  // Reconstruct only the selected schema; unknown properties never enter active state.
  function sanitize(value) {
    const out = initial();
    for (const k of ['appearance','filter','selected','step','actionSequence']) out[k]=value[k];
    out.requests=out.requests.map((b,i) => {
      const r=value.requests[i];
      for (const k of ['version','notice','attention','allowed','hidden','observed']) b[k]=r[k];
      if(r.effect) b.effect={id:r.effect.id,step:r.effect.step,version:r.effect.version,proposal:r.effect.proposal};
      if(r.action) { b.action={};for(const k of ['id','request','proposal','version','revision','segment','notice','state','step','checked','lookupNote','recheck','dispatchCount'])b.action[k]=r.action[k]; }
      return b;
    });
    out.corrections=value.corrections.map(c => ({id:c.id,version:1,scope:[...c.scope],text:c.text,state:c.state,step:c.step,applicability:[...c.applicability]}));
    if(value.cancellation) {const c=value.cancellation;out.cancellation={id:c.id,scope:[...c.scope],state:c.state,step:c.step,requestedStep:c.requestedStep??c.step,acknowledgedStep:c.acknowledgedStep??null,closedStep:c.closedStep??null,lostReply:c.lostReply??false};}
    return out;
  }
  function retain() {
    if(recoveryLock || retentionFailure) {
      retentionReady=false;
      storageNote=recoveryLock ? 'Recovery locked: a corrupt or unreadable prior record may contain unresolved actions. Reset this fictional fixture deliberately to start again.' : 'Retention failure simulated. Newer changes are memory-only; prior saved evidence may be older. Publish and new control dispatch are gated.';
      return false;
    }
    try {
      const payload=JSON.stringify(state);
      localStorage.setItem(KEY,payload);
      if(localStorage.getItem(KEY)!==payload) throw new Error('Read-back mismatch');
      retentionReady=true;
      storageNote='Fixture identities, saved/submitted snapshots and last-observed evidence are retained on this browser until reset or browser data removal. Unsubmitted editor text is memory-only. No service retention guarantee.';
      return true;
    } catch {
      retentionReady=false;
      storageNote='Local storage is unavailable or its read-back failed. Newer changes are memory-only; prior saved evidence may be older. Publish and new control dispatch are gated. Do not infer that an earlier action failed.';
      return false;
    }
  }
  try {
    const raw=localStorage.getItem(KEY);
    if(raw!==null) {
      const saved=JSON.parse(raw);
      if(!validRecord(saved))throw new Error('Invalid fixture record');
      state=sanitize(saved);
      for(const r of state.requests) if(r.action && r.action.state!=='confirmed' && r.action.state!=='rejected') {
        if(r.action.state==='prepared') r.action.state='unknown';
        r.action.recheck=true;
        r.action.lookupNote='Restored last-observed evidence. Reauthorize fixture lookup with Check status; return does not establish current outcome.';
      }
      restoreNote='Restored this browser’s permitted fixture record. Editable unsent text was not retained. Outstanding actions require an explicit status check.';
    }
    retain();
  } catch {
    recoveryLock=true; retentionReady=false;
    storageNote='Prior fixture data is corrupt or cannot be read. Its unresolved action history cannot be recovered. Publish is locked; no safe recovery is claimed. Use the explicit local-fixture reset to start a new simulation.';
    restoreNote='Prior local evidence could not be recovered. Starting fixtures below are reference content, not a recovered action history.';
  }
  inspected=clone(request());
  $('appearance').value=state.appearance;
  document.documentElement.dataset.theme=state.appearance;
  $('request-filter').value=state.filter;

  function gate(button, reason) {
    $(button).setAttribute('aria-disabled',String(Boolean(reason)));
  }
  function staleReason() {
    const r=request();
    if(!r.allowed)return 'Publishing permission and recipient-record access were withdrawn. The inspected version and your local text remain available; protected recipient detail is hidden.';
    if(r.version!==inspected.version)return `You inspected ${inspected.proposal} v${inspected.version}. Current fixture evidence is v${r.version}. The old decision is unavailable. Review the new comparison deliberately; approval is never carried forward.`;
    if(r.attention==='Expired' || r.attention==='Superseded')return `This request is ${r.attention.toLowerCase()}. Its inspected version remains available, but this decision cannot be published.`;
    return '';
  }
  function publishReason() {
    const r=request(), a=r.action;
    if(recoveryLock)return 'Unavailable: prior fixture history could not be recovered. An unknown earlier action must not be silently replaced. Reset only to begin a new fictional simulation.';
    if(!retentionReady)return 'Unavailable: minimal recovery identity cannot be acknowledged in local storage. Restore retention before dispatch.';
    if(a)return a.state==='confirmed' ? 'Published effect is established for the original action. This fixture offers no repeat publication or recall.' : a.state==='rejected' ? 'The original action was rejected. This fixture offers no new decision/retry contract.' : `An original action (${a.id}) is unresolved. A fresh overlapping publish is unavailable; use Check status. A new proposal or action ID would not prevent both effects.`;
    if(staleReason())return staleReason();
    if(r.attention!=='Needs review')return 'This attention item is resolved or pending elsewhere. That is separate from the absence of published-effect evidence. No publish decision is available.';
    if(offline)return 'Observation is offline. Reconnect before a new local dispatch; the last execution observation has not changed.';
    return '';
  }
  function selectedScope() {
    const val=$('correction-scope').value;
    return state.requests.filter(r => !r.effect && (val==='remaining' || r.id===val)).map(r=>r.id);
  }
  function correctionReason() {
    const scope=selectedScope();
    if(!retentionReady || recoveryLock)return 'Submission unavailable until this fixture can acknowledge local retention.';
    if(!scope.length)return 'No remaining unsent sessions in this scope. A correction cannot change a published notice.';
    const overlap=state.corrections.find(c=>c.state!=='applied' && c.scope.some(id=>scope.includes(id)));
    if(overlap)return `${overlap.id} has unconfirmed applicability for overlapping work. Another overlapping correction is unavailable. You can keep editing; choose a non-overlapping remaining session where available.`;
    if(offline)return 'Observation is offline. Reconnect before submitting a new local command.';
    if(!$('correction-text').value.trim())return 'Enter a correction for the selected remaining sessions.';
    if(state.corrections.length>=100)return 'This bounded fixture retains at most 100 correction records. Reset deliberately for a new simulation.';
    return '';
  }
  function cancelReason() {
    const c=state.cancellation;
    if(c)return c.state==='unknown' ? `${c.id}: cancellation command outcome unknown. No duplicate-safe cancellation retry or command-lookup policy is supplied. Repeat is unavailable; later execution observation does not prove receipt.` : `${c.id}: cancellation already ${c.state==='closed'?'has a closed task record':c.state}. Repeat is unavailable. This establishes no stop or rollback guarantee.`;
    if(!retentionReady || recoveryLock)return 'Request unavailable until this fixture can acknowledge local retention.';
    if(offline)return 'Observation is offline. Reconnect before requesting a new local command.';
    if(state.requests.every(r=>r.effect))return 'No remaining unsent fixture sessions. Published effects cannot be recalled.';
    return '';
  }
  function isDraftDirty() {return draftOpen && $('draft-text').value!==draftBase;}
  function isCorrectionDirty(){return $('correction-text').value!==correctionBase;}
  function updateEditorState(){
    text('draft-state',isDraftDirty()?'Unsaved working text · memory-only. The immutable reviewed version is unchanged.':'Working copy matches its base version.');
    gate('save-draft', !retentionReady ? 'Retention unavailable.' : !request().allowed ? 'Permission withdrawn.' : request().version!==draftBaseVersion ? 'Base version changed.' : request().action ? 'Existing action.' : request().attention!=='Needs review' ? 'Request unavailable.' : !$('draft-text').value.trim() ? 'Text required.' : '');
  }
  function renderList(){
    let count=0;
    for(const r of state.requests){
      const row=document.querySelector(`[data-request-row="${r.id}"]`),button=row.querySelector('button');
      const unresolved=r.action && !['confirmed','rejected'].includes(r.action.state);
      const show=state.filter==='all'||state.filter==='review'&&r.attention==='Needs review'||state.filter==='unresolved'&&unresolved||state.filter==='visible'&&!r.hidden;
      row.hidden=!show;if(show)count++;
      button.setAttribute('aria-current',String(r.id===state.selected));
      button.querySelector('[data-list-attention]').textContent=r.attention+(r.hidden?' · notification hidden':'');
      button.querySelector('[data-list-observed]').textContent=`Observed ${clock(r.observed)}`;
    }
    text('filter-summary',`${count} of 3 requests shown. Selection and filter stay in place.`);
    $('empty-filter').hidden=count!==0;
  }
  const actionLabel = a => ({prepared:'Prepared; delivery unconfirmed',requested:'Requested; delivery unconfirmed',accepted:'Accepted; publication pending',confirmed:'Published',unknown:'Publication outcome unknown',rejected:'Rejected'})[a.state];
  function renderSummary(){
    text('return-copy',restoreNote);
    const ul=$('return-items');ul.replaceChildren();
    for(const r of state.requests){
      const li=document.createElement('li'),b=document.createElement('button');b.className='text-button';b.dataset.inspect=r.id;
      b.textContent=`${r.id}: ${r.effect?'confirmed publication':r.action?actionLabel(r.action):r.attention.toLowerCase()}`;
      li.append(b);ul.append(li);
    }
    if(state.corrections.length){const li=document.createElement('li');li.textContent=`${state.corrections.length} submitted correction snapshot(s); applicability shown below.`;ul.append(li);}
    if(state.cancellation){const li=document.createElement('li');li.textContent=`${state.cancellation.id}: ${state.cancellation.state==='closed'?'task record closed':state.cancellation.state}. Execution remains separately observed.`;ul.append(li);}
  }
  function renderCorrection(){
    const scope=selectedScope();
    text('correction-scope-detail',scope.length?`Current scope: ${scope.join(', ')}. Exact scope is frozen when submitted.`:'No unsent sessions match.');
    const reason=correctionReason();gate('submit-correction',reason);
    text('correction-gate',reason || 'Ready to submit this scope. Receipt and confirmed applicability will be separate evidence.');
    const history=$('correction-history');history.replaceChildren();
    for(const c of [...state.corrections].reverse()){
      const a=document.createElement('article'),h=document.createElement('h3'),p=document.createElement('p'),s=document.createElement('p'),e=document.createElement('p');
      h.textContent=`${c.id} / v${c.version} · ${{sending:'Sending; receipt unconfirmed',acknowledged:'Receipt acknowledged; applicability unconfirmed',applied:'Applicability confirmed by fixture evidence',unknown:'Receipt / applicability unconfirmed — reply lost'}[c.state]}`;
      p.textContent=c.text;s.className='support';s.textContent=`Immutable submitted snapshot · scope ${c.scope.join(', ')} · ${clock(c.step)}. Editable text above is independent.`;
      e.className='support';e.textContent=c.state==='applied'?`Explicit fixture application evidence: ${c.applicability.join('; ')}. This confirms only these named later draft revisions.`:'No later draft revision is established as using this correction. Matching wording alone would prove nothing.';
      a.append(h,p,s,e);history.append(a);
    }
  }
  function render(){
    const r=request(),v=inspected,a=r.action;
    text('retention-message',storageNote);$('retention-message').classList.toggle('error',!retentionReady);
    renderList();renderSummary();
    text('detail-kicker',`${v.id} / ${v.session}`);text('request-heading',v.title);text('session-meta',`${v.time} · Room-change decision · Run RUN-HARBOR-07`);
    text('attention-badge',r.attention);text('execution-state',r.effect?'Published effect observed':'No published effect established');
    text('execution-detail',r.effect?`${r.effect.id} · ${r.effect.proposal} v${r.effect.version} · ${clock(r.effect.step)}`:`Draft ready; session record last observed ${clock(r.observed)}`);
    text('attention-state',r.attention);text('attention-detail',r.attention==='Resolved'?'Decision attention is closed; inspect effect evidence separately.':r.hidden?'Notification hidden locally; request remains in All requests.':'This request has its own decision.');
    text('command-state',a?actionLabel(a):'Not submitted');text('command-detail',a?`${a.id} · submitted v${a.version}${a.recheck?' · status check required after return':''}`:'No publish authorization sent.');
    text('freshness-state',offline?'Offline observation':'Local fixture available');text('freshness-detail',`${offline?'Stale; ':''}last observed ${clock(r.observed)}. No live connection.`);
    const stale=staleReason();$('stale-review').hidden=!stale;text('stale-copy',stale);gate('review-current',!r.allowed?'Recipient access is withdrawn.':'');
    text('proposal-label',`${v.proposal} · v${v.version}`);text('before-room',v.before);text('after-room',v.after);text('notice-text',v.notice);text('proposal-identity',`${v.proposal} / immutable v${v.version}`);text('expected-revision',`${v.session} / rev ${v.revision}`);text('target-session',`${v.title} · ${v.time} · ${v.session}`);
    text('segment-summary',r.allowed?`${v.segment} · captured 08:${40+IDS.indexOf(v.id)} UTC; no live count`:`${v.segment} · protected detail unavailable; recipient access withdrawn`);
    text('publish-consequence',`In this simulation, dispatch authorizes the complete ${v.proposal} v${v.version} notice for ${v.title}, against ${v.session} revision ${v.revision}, to recipient snapshot ${v.segment}. In a real service this would change the externally visible notice; here only fictional local evidence changes.`);
    const reason=publishReason();gate('publish-notice',reason);text('publish-gate',reason||'Ready for this reviewed version. The local recovery identity will be written and read back before dispatch.');
    gate('edit-draft',r.action?'The original action must remain separate; this fixture does not revise dispatched intent.':!r.allowed?'Permission withdrawn.':r.attention!=='Needs review'?'The request is not currently available.':r.version!==v.version?'Review the current proposal first.':'');
    text('hide-notification',r.hidden?'Show notification':'Hide notification');
    $('action-record').hidden=!a;
    if(a){
      text('action-summary',`${actionLabel(a)}. Original dispatch count: ${a.dispatchCount}. ${r.effect?'A matching effect is established.':'No confirmed published effect is established by this command state.'}`);
      text('action-identity',`${a.id} · ${a.request}`);text('action-version',`${a.proposal} v${a.version} · ${r.session} rev ${a.revision} · ${a.segment}`);text('action-notice',a.notice);text('action-checked',a.checked===null?'Not checked after dispatch':clock(a.checked));
      text('lookup-note',a.lookupNote||'Use a staged local lookup fixture, then Check status. No automatic retry or overlapping publication is supported.');
      gate('check-status',offline?'Observation offline.':'');
    }
    text('session-evidence',`CHANGE-${201+IDS.indexOf(v.id)} · ${v.session} revision ${v.revision}: ${v.before} → ${v.after}. Start time ${v.time} unchanged. Source: authorized fictional venue session register.`);
    text('session-observation',`Observed 08:43 UTC · room-change fixture; reviewed proposal v${v.version}. ${r.version!==v.version?`Current proposal is v${r.version}; this comparison has not been replaced.`:'No contradictory session record is supplied.'}`);
    text('segment-evidence',r.allowed?`${v.segment} · ${v.segmentText}`:`${v.segment} · Access withdrawn. Previously inspected recipient detail is removed; this permitted snapshot reference remains.`);
    text('segment-observation',r.allowed?'Source: fictional registration export · snapshot, not a live recipient set. No participant result or delivery result is supplied.':'The current fixture permission no longer authorizes recipient detail. No cached protected content is shown.');
    text('explanation-evidence',v.rationale);
    $('draft-editor').hidden=!draftOpen;$('comparison').hidden=draftOpen;updateEditorState();renderCorrection();
    const c=state.cancellation,cr=cancelReason();gate('request-cancellation',cr);text('cancel-gate',cr||'Requests best-effort cancellation of the remaining unsent fixture sessions only.');
    text('cancel-state',c?({requested:'Cancellation requested; receipt unconfirmed.',acknowledged:'Receipt acknowledged. Execution stop is not established.',closed:'Task record closed. Underlying execution stop is not established.',unknown:'Cancellation command outcome unknown; reply lost. This is not evidence of failure or stopped work.'})[c.state]:'No cancellation requested.');
    text('cancel-reference',c?`${c.id} · RUN-HARBOR-07 · scope ${c.scope.join(', ')}. Requested ${clock(c.requestedStep)}. Receipt ${c.acknowledgedStep===null?'unconfirmed':`acknowledged ${clock(c.acknowledgedStep)}`}. Task record ${c.closedStep===null?'not observed closed':`closed ${clock(c.closedStep)}`}.${c.lostReply?' A cancellation reply was lost; run observation alone does not settle receipt.':''}`:'No command identity exists.');
    text('cancel-observation',c?`Execution is observed separately: ${state.requests.filter(x=>x.effect).map(x=>`${x.id} ${x.effect.id}`).join('; ')||'no published effects established'}. Refreshing or advancing execution observation cannot establish cancellation receipt. No command-specific lookup or safe repeat policy exists.`:'No cancellation command has been submitted. No recall or rollback is available.');
  }
  function focus(id){$(id).focus();}
  function navigate(callback){
    if(isDraftDirty()){
      pendingNavigation=callback;dirtyFocus=document.activeElement;$('dirty-choice').hidden=false;focus('keep-editing');
      announce('Navigation paused. Keep editing or explicitly discard the memory-only working draft.');return;
    }
    callback();
  }
  function inspect(id){
    if(!IDS.includes(id))return;
    navigate(()=>{state.selected=id;inspected=clone(request());draftOpen=false;$('draft-error').hidden=true;retain();render();focus('request-heading');});
  }
  document.addEventListener('click',event=>{const button=event.target.closest('[data-inspect]');if(button)inspect(button.dataset.inspect);});
  $('keep-editing').addEventListener('click',()=>{pendingNavigation=null;$('dirty-choice').hidden=true;focus(draftOpen?'draft-text':dirtyFocus?.id||'request-heading');});
  $('discard-changes').addEventListener('click',()=>{const go=pendingNavigation;pendingNavigation=null;$('dirty-choice').hidden=true;$('draft-text').value=draftBase;draftOpen=false;if(go)go();});
  $('dirty-choice').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();$('keep-editing').click();}});
  $('return-list').addEventListener('click',()=>navigate(()=>{draftOpen=false;render();const b=document.querySelector(`[data-inspect="${state.selected}"]`);if(b&&!b.closest('li').hidden)b.focus();else{focus('request-filter');announce('Selected request is outside the active filter. The filter and inspected context are preserved.');}}));
  $('request-filter').addEventListener('change',()=>{state.filter=$('request-filter').value;retain();render();});
  $('show-all').addEventListener('click',()=>{state.filter='all';$('request-filter').value='all';retain();render();focus('request-filter');});
  $('appearance').addEventListener('change',()=>{state.appearance=$('appearance').value;document.documentElement.dataset.theme=state.appearance;retain();render();});
  $('hide-notification').addEventListener('click',()=>{request().hidden=!request().hidden;retain();render();announce(request().hidden?'Notification hidden locally. All requests remains a route back; no decision was resolved.':'Notification shown. No decision changed.');});
  $('review-current').addEventListener('click',()=>{if($('review-current').getAttribute('aria-disabled')==='true')return;navigate(()=>{inspected=clone(request());draftOpen=false;render();focus('comparison-heading');announce('Current fixture proposal opened for a new review. No previous approval was carried forward.');});});
  document.querySelectorAll('[data-evidence-link]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('evidence-records').open=true;focus(a.dataset.evidenceLink);}));
  $('decline-request').addEventListener('click',()=>announce('Decline unavailable: no verified fixture resolution or recovery contract. No authorization was sent.'));
  $('edit-draft').addEventListener('click',()=>{if($('edit-draft').getAttribute('aria-disabled')==='true')return;draftOpen=true;draftBase=inspected.notice;draftBaseVersion=inspected.version;$('draft-text').value=draftBase;text('draft-base',`Working copy of ${inspected.proposal} v${draftBaseVersion} · ${inspected.session} rev ${inspected.revision}.`);render();focus('draft-text');});
  $('draft-text').addEventListener('input',()=>{$('draft-error').hidden=true;updateEditorState();});
  $('leave-editor').addEventListener('click',()=>navigate(()=>{draftOpen=false;render();focus('comparison-heading');}));
  $('save-draft').addEventListener('click',()=>{
    const r=request();
    if($('save-draft').getAttribute('aria-disabled')==='true'){
      text('draft-error','Cannot save this working copy: retention, permission, base-version or unresolved-action gate applies. Your valid text remains here. Review current evidence without replaying it against a new version.');$('draft-error').hidden=false;focus('draft-error');return;
    }
    const old=clone(r);r.version++;r.notice=$('draft-text').value;r.observed=next();
    if(!retain()){Object.assign(r,old);text('draft-error','The new local snapshot could not be acknowledged. Your working text is preserved in memory; no saved version or published effect is claimed.');$('draft-error').hidden=false;render();focus('draft-error');return;}
    inspected=clone(r);draftBase=r.notice;draftOpen=false;pendingNavigation=null;dirtyFocus=null;$('dirty-choice').hidden=true;render();focus('comparison-heading');announce(`Saved local proposal ${r.proposal} v${r.version}. Review it before any publish decision. Nothing was published.`);
  });
  $('publish-notice').addEventListener('click',()=>{
    const reason=publishReason();if(reason){announce(reason);return;}
    const r=request();
    // Reserve and acknowledge the original recovery identity before the dispatch boundary.
    const a={id:`ACT-${++state.actionSequence}`,request:r.id,proposal:inspected.proposal,version:inspected.version,revision:inspected.revision,segment:inspected.segment,notice:inspected.notice,state:'prepared',step:state.step,checked:null,lookupNote:'',recheck:false,dispatchCount:1};
    r.action=a;
    if(!retain()){r.action=null;render();announce('Dispatch gated: recovery identity retention failed. No publish command crossed the local dispatch boundary.');return;}
    a.state='requested';a.step=next();r.attention='Decision pending';r.observed=state.step;
    retain();render();announce(`${a.id} requested; delivery unconfirmed. Advance matching fixture evidence to establish acceptance or publication.`);
  });
  $('check-status').addEventListener('click',()=>{
    const r=request(),a=r.action;if(!a)return;if(offline){announce('Status check unavailable while observation is offline. Execution evidence is unchanged.');return;}
    a.checked=next();const result=lookup[a.id]||'unknown';a.recheck=false;
    if(result==='confirmed'){
      a.state='confirmed';r.attention='Resolved';r.observed=state.step;r.effect={id:`FX-${201+IDS.indexOf(r.id)}`,proposal:a.proposal,version:a.version,step:state.step};a.lookupNote='Authorized local fixture lookup matched the original action, proposal and revision and supplied effect evidence.';
    }else{
      if(a.state!=='confirmed')a.state='unknown';
      a.lookupNote=result==='denied'?'Current lookup access denied. Prior confirmed effect, if present, remains historical evidence. Missing current access proves neither success nor failure.':'No conclusive matching fixture status. Outcome remains unknown unless a prior confirmed effect exists; no new overlapping publish is enabled.';
    }
    retain();render();announce(result==='confirmed'?`${a.id}: matching published effect confirmed by local lookup.`:a.lookupNote);
  });
  $('correction-text').addEventListener('input',()=>{const reason=correctionReason();gate('submit-correction',reason);text('correction-gate',reason||'Ready to submit. Editable text is independent of every earlier submitted snapshot.');});
  $('correction-scope').addEventListener('change',renderCorrection);
  $('discard-correction').addEventListener('click',()=>{if(!isCorrectionDirty())return;$('correction-text').value=correctionBase;renderCorrection();announce('Unsubmitted correction edits discarded. Submitted snapshots and applicability evidence are unchanged.');focus('correction-text');});
  $('submit-correction').addEventListener('click',()=>{
    const reason=correctionReason();if(reason){announce(reason);return;}
    const c={id:`COR-${state.corrections.length+1}`,version:1,scope:selectedScope(),text:$('correction-text').value,state:'sending',step:next(),applicability:[]};
    state.corrections.push(c);
    if(!retain()){state.corrections.pop();render();announce('Correction dispatch gated: submitted snapshot could not be retained. Editable text remains in memory.');return;}
    correctionBase=c.text;render();announce(`${c.id} sending. Receipt and applicability are not established. You can keep editing without changing this snapshot.`);
  });
  $('request-cancellation').addEventListener('click',()=>{
    const reason=cancelReason();if(reason){announce(reason);return;}
    const step=next();state.cancellation={id:'CAN-1',scope:state.requests.filter(r=>!r.effect).map(r=>r.id),state:'requested',step,requestedStep:step,acknowledgedStep:null,closedStep:null,lostReply:false};
    if(!retain()){state.cancellation=null;render();announce('Cancellation dispatch gated: local identity retention failed. No cancellation command sent.');return;}
    render();announce('CAN-1 cancellation requested. Receipt and execution stop are not established.');
  });
  $('fixture-offline').addEventListener('change',()=>{offline=$('fixture-offline').checked;render();announce(offline?'Observation offline. Last-observed execution truth is unchanged.':'Local fixture observation available. No automatic status lookup or retry occurred.');});
  $('fixture-retention-failure').addEventListener('change',()=>{retentionFailure=$('fixture-retention-failure').checked;retain();render();announce(retentionFailure?'Retention failure simulated; new dispatch is gated. Existing evidence is unchanged.':'Retention checked again. Any prior unknown action still requires reconciliation.');});
  function publishEffect(r){const a=r.action;if(!a)return false;a.state='confirmed';r.effect={id:`FX-${201+IDS.indexOf(r.id)}`,proposal:a.proposal,version:a.version,step:state.step};r.attention='Resolved';r.observed=state.step;return true;}
  $('advance-fixture').addEventListener('click',()=>{
    const ev=$('fixture-event').value,r=request(),a=r.action;let message='';
    if(offline){message='No observation advanced while offline. Reconnect to receive fictional evidence; execution truth has not changed.';text('fixture-result',message);announce(message);return;}
    const step=next();
    if(ev==='accept-publish'){
      if(!a || a.state==='confirmed')message='Choose a request with an unresolved original publish action first.';
      else {a.state='accepted';a.recheck=false;r.observed=step;message=`${a.id}: matching acceptance evidence. Publication remains pending.`;}
    }else if(ev==='confirm-publish' || ev==='late-effect'){
      if(ev==='late-effect' && !state.cancellation)message='Request cancellation first, then advance a later effect for an already dispatched publish action.';
      else message=publishEffect(r)?`${a.id}: published effect ${r.effect.id} observed${ev==='late-effect'?'; cancellation history is preserved. Record closure never proved execution stopped.':'.'}`:'Dispatch a publish decision on this request before supplying its effect evidence.';
    }else if(ev==='lose-publish-reply'){
      if(!a)message='Dispatch a publish decision first.';
      else if(a.state==='confirmed')message='Confirmed effect evidence is preserved. A later missing reply cannot make that historical effect unknown.';
      else{a.state='unknown';r.observed=step;message=`${a.id}: reply lost. Publication outcome unknown. Original identity remains; overlapping publish is gated.`;}
    }else if(ev.startsWith('reconcile-')){
      if(!a)message='Dispatch a publish decision first so lookup can match its original identity.';
      else{lookup[a.id]=ev.replace('reconcile-','');message=`Staged ${lookup[a.id]} lookup result for ${a.id}. Use “Check status” to observe it; no command state changed yet.`;}
    }else if(ev==='change-proposal' || ev==='long-text'){
      r.version++;r.notice=ev==='long-text'?('The community program has a room change. This fictional notice deliberately contains a longer explanation, a replacement venue, unchanged session time and clear wayfinding information. ').repeat(18)+`For ${r.title}, use ${r.after} at ${r.time}.`:r.notice+' Please follow the updated venue signs.';r.observed=step;message=`Current ${r.proposal} is now v${r.version}. The inspected copy and editable text are preserved; deliberately review current evidence.`;
    }else if(ev==='lose-permission' || ev==='restore-permission'){
      r.allowed=ev==='restore-permission';r.observed=step;message=r.allowed?'Fixture publishing and recipient access restored. No approval was replayed.':'Fixture permission withdrawn. Protected recipient detail removed; inspected version and local text preserved.';
    }else if(ev==='resolve-elsewhere' || ev==='expire-request'){
      r.attention=ev==='resolve-elsewhere'?'Resolved':'Expired';r.observed=step;message=ev==='resolve-elsewhere'?'Attention resolved by another fictional operator. No published effect is established.':'Request expired. Old actions are gated; inspected text is preserved.';
    }else if(ev.startsWith('correction-') || ev==='lose-correction-reply'){
      const c=[...state.corrections].reverse().find(x=>x.state!=='applied');
      if(!c)message='Submit a correction first. No unresolved correction identity is available.';
      else if(ev==='correction-applied'){
        c.state='applied';c.applicability=[];
        for(const id of c.scope){const target=state.requests.find(x=>x.id===id);if(!target.effect){target.version++;target.observed=step;c.applicability.push(`${target.id} / ${target.proposal} v${target.version} used ${c.id} v1 (fixture application record)`);}}
        if(!c.applicability.length){c.state='unknown';message=`${c.id}: all scoped notices already published. Applicability remains unconfirmed; no later draft revision supplied.`;}
        else message=`${c.id}: explicit fixture evidence names ${c.applicability.length} later draft revision(s). Typed edits are unchanged.`;
      }else if(ev==='correction-ack'){c.state='acknowledged';message=`${c.id}: receipt acknowledged only. Applicability remains unconfirmed; overlapping submission stays gated.`;}
      else if(c.state==='acknowledged'){message=`${c.id}: later reply lost. Known receipt acknowledgement is preserved; applicability remains unconfirmed and overlapping submission stays gated.`;}
      else{c.state='unknown';message=`${c.id}: reply lost. Receipt and applicability remain unconfirmed; no overlapping repeat policy exists.`;}
    }else if(ev==='cancel-ack' || ev==='cancel-close' || ev==='lose-cancel-reply'){
      const c=state.cancellation;
      if(!c)message='Request cancellation first so evidence can match its command identity.';
      else{if(ev==='cancel-ack')c.acknowledgedStep=step;else if(ev==='cancel-close')c.closedStep=step;else c.lostReply=true;c.state=ev==='cancel-close'||c.closedStep!==null?'closed':ev==='cancel-ack'?'acknowledged':'unknown';message=ev==='lose-cancel-reply'?`${c.id}: cancellation reply lost. No new receipt or stop evidence; prior acknowledged/closed evidence is preserved. Repeat is gated; no safe-repeat or command-lookup contract exists.`:ev==='cancel-close'?`${c.id}: task record closed. Execution stop is not established. A later publish effect remains possible.`:`${c.id}: receipt acknowledged. This is not execution-stop evidence.`;}
    }
    retain();render();text('fixture-result',message);announce(message);
  });
  $('reset-fixture').addEventListener('click',()=>navigate(()=>{$('reset-confirm').hidden=false;focus('keep-fixture');}));
  $('keep-fixture').addEventListener('click',()=>{$('reset-confirm').hidden=true;focus('reset-fixture');});
  $('confirm-reset').addEventListener('click',()=>{
    try{localStorage.removeItem(KEY);if(localStorage.getItem(KEY)!==null)throw new Error('Reset readback failed');}
    catch{announce('Local fixture record could not be cleared. No reset or recovery success is claimed.');return;}
    state=initial();inspected=clone(request());lookup={};draftOpen=false;draftBase='';correctionBase='';$('correction-text').value='';offline=false;retentionFailure=false;recoveryLock=false;$('fixture-offline').checked=false;$('fixture-retention-failure').checked=false;$('reset-confirm').hidden=true;$('appearance').value='system';$('request-filter').value='all';document.documentElement.dataset.theme='system';restoreNote='Explicitly reset this fictional local simulation. This does not cancel or reverse real work.';retain();render();focus('request-heading');announce('Local fixture reset. No real cancellation, recall or rollback occurred.');
  });
  window.addEventListener('beforeunload',e=>{if(isDraftDirty()||isCorrectionDirty()){e.preventDefault();e.returnValue='';}});
  render();
})();
