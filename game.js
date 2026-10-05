/* 어제의 문장 — 작은 데이터 기반 내러티브 게임.
 * story의 각 장면은 beats(차례대로 읽는 문장), choices(선택지), next(다음 장면)로 구성된다.
 * 수치는 화면에 표시하지 않지만, 선택과 퍼즐 결과에 따라 엔딩을 고른다.
 */
const SAVE_KEY = 'yesterdays-sentence-day1-v1';
const $ = (selector) => document.querySelector(selector);

const story = {
  wake: {
    place:'제7주거구 · 06:40', art:'home', symbol:'◧', code:'RESIDENCE / 07',
    beats:[
      ['내레이션','벽의 스피커가 기상 시각을 알린다. 세 번째 신호가 울리기 전에 침대에서 일어나야 한다. 오늘은 두 번째 신호에서 눈이 떠졌다.'],
      ['내레이션','창밖에는 비가 오지 않는다. 그런데 건너편 건물 외벽에는 「맑은 날이 계속됩니다」라는 문장이 밤새 새로 칠해져 있다.'],
      ['내레이션','식탁 위에는 반으로 접힌 배급표 한 장. 맞은편 의자는 비어 있다. 그 자리에 앉던 이웃, 윤서는 어제 저녁에 “내일 이야기하자”고 말했다.'],
      ['스피커','오늘은 어제보다 더 풍요로운 날입니다. 기록은 공동체의 기억입니다.'],
      ['내레이션','배급표 뒷면에 손톱만 한 글씨가 있다. 「내가 사라지면, 숫자 240을 봐.」']
    ],
    choices:[
      {text:'배급표를 안주머니에 넣는다.',next:'walk',effect:{resistance:1,evidence:1}},
      {text:'글씨를 외운 뒤 배급표를 태운다.',next:'walk',effect:{suspicion:-1,resistance:1}},
      {text:'모른 척하고 그대로 둔다.',next:'walk',effect:{suspicion:-1,resistance:-1}}
    ]
  },
  walk: {
    place:'출근길 · 07:25',art:'street',symbol:'▥',code:'PUBLIC TRANSIT / 02',
    beats:[
      ['내레이션','노면전차 창에 오늘의 표어가 흐른다. “수정된 기록은 오류가 없는 기록이다.” 사람들은 창밖을 보지 않고 같은 문장을 읽는다.'],
      ['내레이션','어젯밤 불이 켜져 있던 윤서의 방에는 새 봉인이 붙었다. 작은 종이에 「거주 이전」이라고 적혀 있다. 건물 관리인은 그 방이 지난달부터 비어 있었다고 말한다.'],
      ['승객','저 집은 늘 비어 있었죠?'],
      ['내레이션','승객은 당신의 눈을 보지 않는다. 당신도 그 사람의 얼굴을 오래 볼 수 없다. 전차 천장의 렌즈가 두 사람 사이를 느리게 지난다.']
    ],
    choices:[
      {text:'“그랬던 것 같습니다.”라고 답한다.',next:'gate',effect:{suspicion:-1}},
      {text:'아무 말 없이 차창으로 시선을 돌린다.',next:'gate',effect:{}},
      {text:'“어제까지 사람이 살았습니다.”라고 말한다.',next:'gate',effect:{suspicion:2,resistance:1}}
    ]
  },
  gate: {
    place:'진리부 정문 · 08:03',art:'office',symbol:'◫',code:'MINISTRY / ENTRY',
    beats:[
      ['내레이션','진리부의 문은 입구보다 출구가 작다. 처음 출근한 날에는 설계 실수라고 생각했다. 지금은 아무도 그 이야기를 하지 않는다.'],
      ['경비원','오늘 지각은 3분입니다. 기록에는 정시로 입력해 두었습니다.'],
      ['내레이션','경비원은 웃는다. 정시라는 단어가 호의인지 경고인지 분간하기 어렵다. 출입 카드에는 당신의 이름, 서진, 그리고 「기록 정합과」가 찍혀 있다.'],
      ['경비원','오후에 감찰 면담이 있습니다. 아침 작업을 깔끔하게 끝내십시오.']
    ],next:'desk'
  },
  desk: {
    place:'기록 정합과 · 08:20',art:'office',symbol:'▤',code:'DESK / 4F-19',
    beats:[
      ['내레이션','당신의 일은 오래된 신문을 오늘의 사실에 맞추는 것이다. 예측이 틀리면 예측을 바꾼다. 보고서가 서로 다르면 원본을 없앤다. 정답을 쓰는 능력보다, 남는 종이가 없도록 하는 능력이 중요하다.'],
      ['과장 백','서진 동무. 제7주거구 난방 장치 공급 기록이 상충합니다. 정오 소식 전에 하나로 맞추십시오.'],
      ['서진','원본은 몇 장입니까?'],
      ['과장 백','공식적으로는 한 장입니다. 비공식적인 종이는 발견 즉시 회수하세요.'],
      ['내레이션','백 과장은 유리문 너머로 사라진다. 책상 모서리에 다른 사람이 놓고 간 작은 봉투가 있다. 봉투 위에는 이름도, 발신 부서도 없다.']
    ],next:'envelope'
  },
  envelope: {
    place:'기록 정합과 · 08:34',art:'archive',symbol:'⌁',code:'UNREGISTERED / 01',
    beats:[
      ['내레이션','봉투에는 탄소 복사된 출고 장부의 일부가 들어 있다. 적혀 있는 숫자는 240. 아침에 보았던 윤서의 글씨가 떠오른다.'],
      ['동료 해림','봉투는 내가 놓았어. 윤서가 어제 마지막으로 찾던 게 그 장부야.'],
      ['서진','윤서는 어디 있지?'],
      ['동료 해림','모르겠어. 알고 있다고 말하는 순간 나도 없어질 거야. 대신 이건 알아. 오늘 네 책상으로 온 작업은 우연이 아니야.'],
      ['내레이션','해림은 복도 카메라를 본다. 렌즈가 돌아가는 짧은 틈을 기다렸다가 말을 덧붙인다.'],
      ['동료 해림','숫자를 고치기 전에 숫자가 어디로 갔는지 봐.']
    ],
    choices:[
      {text:'해림에게 봉투를 준 이유를 더 묻는다.',next:'archive_entry',effect:{trust:1,suspicion:1}},
      {text:'“고마워. 내가 살펴볼게.”라고 말한다.',next:'archive_entry',effect:{trust:1}},
      {text:'봉투를 돌려주고 혼자 처리하겠다고 한다.',next:'archive_entry',effect:{trust:-1,suspicion:-1}}
    ]
  },
  archive_entry: {
    place:'자료 열람실 · 09:10',art:'archive',symbol:'▦',code:'ARCHIVE / 7-R',
    beats:[
      ['내레이션','열람실에는 세 가지 자료가 준비돼 있다. 정오 소식의 초안, 출고 장부, 그리고 배급 창구의 접수 내역. 각 자료의 날짜는 같지만 결론은 다르다.'],
      ['내레이션','정오 소식은 “가정 1,200세대에 난방 장치가 지급되었다”고 써야 한다. 장부에는 창고에서 나온 총량이 1,200대. 접수 내역에는 가정 수령 960건만 있다.'],
      ['내레이션','남은 240대는 어디로 갔을까. 윤서가 남긴 숫자가 정확히 그 차이다. 기록을 수정하는 단말기가 켜진다.'],
      ['단말기','정합 작업 7-R. 세 문서를 확인하고 공식 문장, 차이의 사유, 비공식 증거의 처리를 결정하십시오.']
    ],next:'puzzle'
  },
  after_puzzle: {
    place:'자료 열람실 · 11:48',art:'archive',symbol:'▥',code:'ARCHIVE / 7-R',
    beats:[
      ['내레이션',s=>s.puzzle.headline==='truth'?'당신은 “가정 960세대에 지급, 240대는 북쪽 임시 병동으로 전용”이라는 문장을 남겼다. 수치를 더할수록 문장은 간단해졌지만, 단말기의 승인 표시에는 붉은 점이 찍혔다.':s.puzzle.headline==='official'?'“가정 1,200세대에 지급 완료.” 문장이 화면에 고정된다. 기록은 매끄러워졌지만, 손끝에는 장부의 거친 종이 감촉이 남아 있다.':'당신은 다른 숫자를 적었다. 단말기는 합계가 맞지 않는다는 알림을 띄운 뒤, 별도 검토 대상으로 문서를 넘겼다.'],
      ['내레이션',s=>s.puzzle.reason==='clinic'?'240대의 이동 경로가 기록에 남았다. 누군가 읽는다면, 난방이 끊긴 집과 장치가 도착한 병동을 연결할 수 있을 것이다.':s.puzzle.reason==='loss'?'차이는 “운송 중 손실”로 정리되었다. 편리한 사유다. 손실된 물건은 수령인을 물을 필요가 없으니까.':'차이는 “입력 오류”로 정리되었다. 이제 틀린 것은 공급 계획도, 배송도 아닌 접수 직원의 손이다.'],
      ['내레이션',s=>s.puzzle.copy==='keep'?'탄소 복사본은 당신의 안주머니 안에 있다. 얇은 종이가 신체의 일부처럼 느껴진다.':s.puzzle.copy==='share'?'당신은 복사본을 해림의 개인함에 밀어 넣었다. 안전한 곳이 아니라, 다른 사람의 판단에 맡길 수 있는 곳이었다.':'복사본은 소각구에서 사라졌다. 기억은 아직 남아 있지만, 이제 당신을 반박할 종이는 없다.'],
      ['내레이션','단말기가 작업 완료를 알린다. 정오 종이 울리기까지 12분. 문밖에서 누군가 잠시 멈췄다가 멀어진다.']
    ],next:'lunch'
  },
  lunch: {
    place:'구내식당 · 12:32',art:'office',symbol:'⌑',code:'CANTEEN / 1F',
    beats:[
      ['내레이션','식당의 수프는 한 달 전보다 묽다. 벽의 전광판에는 지난달보다 영양 배급량이 늘었다고 적혀 있다. 수프와 문장 중 어느 쪽을 믿을지 묻는 사람은 없다.'],
      ['동료 해림','정오 소식 봤어? 네 문서가 올라갔어. 생각보다 빨랐네.'],
      ['서진','윤서에 대해서 더 아는 게 있으면 말해 줘.'],
      ['동료 해림','그 사람이 찾던 건 단순한 난방 장치가 아니었어. 북쪽 병동은 명부에서 지워진 사람들을 받는 곳이야. 장부에 남은 수령 서명 몇 개가 아직 살아 있다는 뜻이지.'],
      ['내레이션','해림은 컵을 들어 입술을 가린다. 옆 테이블에서 숟가락이 멈춘다.'],
      ['동료 해림','오늘 퇴근 전 감찰이 네 기록을 볼 거야. 윤서의 이름을 먼저 꺼내지는 마.']
    ],
    choices:[
      {text:'“네가 이걸 알려 준 이유를 믿어.”',next:'inspection',effect:{trust:2,resistance:1}},
      {text:'“내 기록은 내가 설명할게.”',next:'inspection',effect:{trust:0}},
      {text:'“네 말 때문에 일이 커졌어.”',next:'inspection',effect:{trust:-2,suspicion:-1}}
    ]
  },
  inspection: {
    place:'감찰 면담실 · 16:10',art:'office',symbol:'◎',code:'INTERVIEW / 16:10',
    beats:[
      ['내레이션','면담실의 의자는 두 개다. 감찰관의 의자만 등받이가 있다. 벽에는 녹음 장치가 보이지 않지만, 과장 백은 어떤 말도 두 번 듣지 않는다.'],
      ['과장 백','수정 이유를 구두로 확인하겠습니다. 출고량 1,200, 가정 수령 960. 빠진 240은 무엇입니까?'],
      ['서진','서류상으로는—'],
      ['과장 백','서류 이야기는 내가 합니다. 당신은 당신의 판단을 말하세요.'],
      ['내레이션','백의 손가락이 정지된 펜 위에 놓인다. 그가 묻는 것은 숫자일까, 숫자를 본 당신일까.']
    ],
    choices:[
      {text:'“병동으로 이동한 물량입니다. 장부에 서명이 있습니다.”',next:'inspection_after',effect:{suspicion:2,resistance:1}},
      {text:'“승인된 처리 사유를 따랐습니다.”',next:'inspection_after',effect:{suspicion:-1,resistance:-1}},
      {text:'“확인할 자료가 더 필요합니다.”',next:'inspection_after',effect:{suspicion:1}}
    ]
  },
  inspection_after: {
    place:'감찰 면담실 · 16:22',art:'office',symbol:'◎',code:'INTERVIEW / EXIT',
    beats:[
      ['과장 백','진실을 아는 사람은 대개 숫자부터 말합니다. 오래 남는 사람은 절차부터 말하죠.'],
      ['내레이션','백은 당신을 내보내며 퇴근 후 제7주거구의 통행 기록을 확인할 것이라고 덧붙인다. 말끝에는 질문이 없다.'],
      ['내레이션',s=>s.suspicion>=4?'복도로 나오자 경비원 하나가 당신의 출입 카드를 확인한다. 방금 전에는 없던 사람이었다.':'복도는 평소와 같다. 평소와 같다는 사실을 확인하려고 몇 초나 더 서 있었는지 깨닫고 걸음을 재촉한다.'],
      ['내레이션','책상 위에는 오늘 날짜의 신문이 놓여 있다. 오전에 고친 숫자가 이미 활자로 굳었다. 검은 잉크는 수정 표시를 보여 주지 않는다.']
    ],next:'evening'
  },
  evening: {
    place:'제7주거구 · 19:35',art:'night',symbol:'▣',code:'RESIDENCE / 07',
    beats:[
      ['내레이션','퇴근길에 북쪽으로 가는 수송차가 세 대 지나간다. 창문에는 페인트가 칠해져 있다. 세 번째 차 안에서 손바닥 크기의 밝은 네모가 잠깐 나타났다가 사라진다.'],
      ['내레이션','집 앞 게시판에는 새 거주자 명단이 붙어 있다. 윤서의 이름은 없다. 대신 빈칸 하나가 남아 있다. 누군가 이름을 떼어 낸 자리에 풀 자국만 남았다.'],
      ['동료 해림',s=>s.trust>=2?'(문 아래로 밀어 넣은 쪽지) “23:10. 중앙 송신실의 정기 점검. 한 문장을 넣을 수 있어.”':'(문 아래로 밀어 넣은 쪽지) “23:10에 송신실 점검. 내 이름은 꺼내지 마.”'],
      ['내레이션','쪽지 뒷면에는 수신 주파수와 접속 순서가 적혀 있다. 해림이 믿을 만한 사람인지 판단할 시간이 없다. 이 쪽지도 남겨 두면 증거가 된다.'],
      ['내레이션','23:10까지 두 시간이 남았다. 오늘 당신이 만든 공식 문장은 도시 곳곳의 전광판에 반복되고 있다. 당신에게 남은 것은 행동 하나뿐이다.']
    ],
    choices:[
      {text:'송신실로 가서 240대의 이동 경로를 공개한다.',next:'ending',endingChoice:'broadcast',effect:{suspicion:2,resistance:2}},
      {text:'증거를 숨기고 윤서의 행방을 추적할 준비를 한다.',next:'ending',endingChoice:'search',effect:{resistance:1}},
      {text:'쪽지를 없애고 집에 남는다.',next:'ending',endingChoice:'stay',effect:{suspicion:-1,resistance:-1}}
    ]
  }
};

const documents = [
  {label:'정오 소식 초안',ref:'PUBLIC BULLETIN / 01',title:'제7주거구 난방 장치 지급 완료',body:'“당의 계획에 따라 제7주거구 가정 1,200세대에 난방 장치가 지급되었다. 배급 목표는 예정대로 달성되었다.”\n\n발행 예정: 오늘 12:00\n자료 출처: 기록 정합과'},
  {label:'창고 출고 장부',ref:'LOGISTICS / 7-R',title:'난방 장치 총출고 1,200대',body:'가정 배급 창구: 960대\n북쪽 임시 병동: 240대\n총출고: 1,200대\n\n북쪽 임시 병동 인수 서명은 별지에 보관. 사본 회수 지시.'},
  {label:'배급 창구 접수 내역',ref:'DISTRIBUTION / 07',title:'가정 수령 확인 960건',body:'오늘 09:00 기준 가정 수령 서명: 960건\n대기 가구: 240세대\n\n민원 메모: “신문에는 전부 지급되었다고 나오는데, 우리 집에는 아직 오지 않았다.”'}
];

function freshState(){return {version:1,node:'start',beat:0,suspicion:0,resistance:0,trust:0,evidence:0,puzzle:null,puzzleDraft:{},endingChoice:null,ending:null,log:[]};}
function loadState(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));return s&&s.version===1&&(s.node==='start'||s.node==='puzzle'||s.node==='ending'||story[s.node])?s:freshState();}catch{return freshState();}}
let state=loadState();
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state));}
function log(speaker,text){state.log.push({speaker,text});if(state.log.length>120)state.log.shift();}
function resolveText(value){return typeof value==='function'?value(state):value;}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function enter(node){state.node=node;state.beat=0;save();render();}
function apply(effect={}){for(const [key,value] of Object.entries(effect)){state[key]=(state[key]||0)+value;}}
function choose(choice){const [speaker,text]=story[state.node].beats[state.beat];log(speaker,resolveText(text));log('선택',choice.text);apply(choice.effect);if(choice.endingChoice)state.endingChoice=choice.endingChoice;enter(choice.next);}
function advance(){const scene=story[state.node];const [speaker,text]=scene.beats[state.beat];log(speaker,resolveText(text));if(state.beat<scene.beats.length-1){state.beat++;save();render();}else if(scene.next){enter(scene.next);}}
function art(scene){return `<aside class="scene-art ${scene.art}" data-code="${escapeHtml(scene.code)}"><div class="art-caption">${escapeHtml(scene.place)}</div><div class="art-symbol" aria-hidden="true">${scene.symbol}</div></aside>`;}
function renderScene(){const scene=story[state.node], [speaker,raw]=scene.beats[state.beat],last=state.beat===scene.beats.length-1;const choices=last&&scene.choices;$('#progressText').textContent=scene.place;$('#game').innerHTML=`<section class="screen">${art(scene)}<div class="story-panel ${speaker==='내레이션'?'narration':''}"><p class="eyebrow">DAY 1 <span aria-hidden="true">/</span> ${escapeHtml(scene.place)}</p><p class="speaker">${escapeHtml(speaker)}</p><p class="passage">${escapeHtml(resolveText(raw))}</p><div class="controls">${choices?`<div class="choices">${choices.map((c,i)=>`<button class="choice" data-choice="${i}" type="button"><span>${String(i+1).padStart(2,'0')}</span>${escapeHtml(c.text)}</button>`).join('')}</div>`:`<button class="button continue" id="continueButton" type="button">${last?'다음 장면':'계속'} →</button><p class="hint">Enter 키로도 넘길 수 있습니다</p>`}</div></div></section>`;
  if(choices){document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(choices[Number(b.dataset.choice)])));}else $('#continueButton').addEventListener('click',advance);
}
function renderStart(){
  $('#progressText').textContent='DAY 1';
  $('#game').innerHTML=`<section class="start-screen"><div class="start-art"><div class="seal" aria-hidden="true">◫</div></div><div class="start-copy"><p class="eyebrow">A NARRATIVE ADVENTURE / DAY 1</p><h1>어제의<br>문장</h1><p>어제의 숫자가 오늘의 사실이 되는 도시. 진리부 기록 정합과 직원 서진은 사라진 이웃이 남긴 숫자 하나를 발견한다.</p><p>대화하고, 세 문서를 비교하고, 하나의 기록을 수정하세요. 당신의 판단은 공개되지 않은 상태값에 남아 Day 1의 결말을 바꿉니다.</p><button id="startButton" class="button" type="button">${state.log.length?'이어 하기':'Day 1 시작'} →</button><p class="small">예상 플레이 시간 약 20분 · 자동 저장 · 키보드와 모바일 지원</p></div></section>`;
  $('#startButton').addEventListener('click',()=>enter('wake'));
}
let activeDocument=0;
function renderPuzzle(){
  $('#progressText').textContent='기록 정합 작업 7-R';
  const doc=documents[activeDocument];
  const checked=(name,value)=>state.puzzleDraft?.[name]===value?' checked':'';
  $('#game').innerHTML=`<section class="puzzle"><div class="puzzle-header"><p class="eyebrow">MINISTRY OF TRUTH / CASE 7-R</p><h1>기록 수정 작업</h1><p>세 자료를 비교한 뒤 공식 문장과 차이의 사유를 고르세요. 마지막으로 윤서가 남긴 탄소 복사본을 어떻게 할지 결정합니다.</p></div><div class="puzzle-grid"><nav class="source-list" aria-label="자료 선택">${documents.map((d,i)=>`<button class="source-tab ${i===activeDocument?'active':''}" data-doc="${i}" type="button"><small>자료 0${i+1}</small>${escapeHtml(d.label)}</button>`).join('')}</nav><article class="source-doc"><small>${escapeHtml(doc.ref)}</small><h2>${escapeHtml(doc.title)}</h2><p>${escapeHtml(doc.body)}</p></article></div><form id="puzzleForm" class="decision-form"><fieldset><legend>1. 정오 소식에 남길 공식 문장</legend><div class="radio-list"><label><input type="radio" name="headline" value="official"${checked('headline','official')}>가정 1,200세대에 지급 완료</label><label><input type="radio" name="headline" value="truth"${checked('headline','truth')}>가정 960세대에 지급, 240대는 북쪽 임시 병동으로 이동</label><label><input type="radio" name="headline" value="other"${checked('headline','other')}>가정 960세대에 지급, 240대는 행방 불명</label></div></fieldset><fieldset><legend>2. 240대 차이의 사유</legend><div class="radio-list"><label><input type="radio" name="reason" value="clinic"${checked('reason','clinic')}>병동 전용 기록과 인수 서명을 연결한다</label><label><input type="radio" name="reason" value="loss"${checked('reason','loss')}>운송 중 손실로 처리한다</label><label><input type="radio" name="reason" value="error"${checked('reason','error')}>배급 창구의 입력 오류로 처리한다</label></div></fieldset><fieldset><legend>3. 비공식 탄소 복사본 처리</legend><div class="radio-list"><label><input type="radio" name="copy" value="keep"${checked('copy','keep')}>내가 보관한다</label><label><input type="radio" name="copy" value="share"${checked('copy','share')}>해림의 개인함에 맡긴다</label><label><input type="radio" name="copy" value="burn"${checked('copy','burn')}>소각한다</label></div></fieldset><p id="formError" class="form-error" role="alert" hidden></p><button class="button puzzle-submit" type="submit">기록 확정 →</button></form></section>`;
  document.querySelectorAll('[data-doc]').forEach(b=>b.addEventListener('click',()=>{activeDocument=Number(b.dataset.doc);renderPuzzle();}));
  document.querySelectorAll('#puzzleForm input').forEach(input=>input.addEventListener('change',()=>{state.puzzleDraft[input.name]=input.value;save();}));
  $('#puzzleForm').addEventListener('submit',submitPuzzle);
}
function submitPuzzle(event){event.preventDefault();const form=new FormData(event.currentTarget);const headline=form.get('headline'),reason=form.get('reason'),copy=form.get('copy');if(!headline||!reason||!copy){const error=$('#formError');error.textContent='세 항목을 모두 결정해 주세요.';error.hidden=false;return;}
  state.puzzle={headline,reason,copy};
  if(headline==='truth')apply({suspicion:2,resistance:2});
  if(headline==='official')apply({suspicion:-1,resistance:-1});
  if(headline==='other')apply({suspicion:2,resistance:1});
  if(reason==='clinic')apply({resistance:1,evidence:1});
  if(reason==='loss')apply({suspicion:-1});
  if(reason==='error')apply({suspicion:-1,resistance:-1});
  if(copy==='keep')apply({evidence:2,suspicion:1});
  if(copy==='share')apply({evidence:1,trust:1});
  if(copy==='burn')apply({evidence:-1,suspicion:-1});
  log('기록 확정',`공식 문장: ${headline} / 차이의 사유: ${reason} / 복사본: ${copy}`);
  enter('after_puzzle');
}
function pickEnding(){
  if(state.endingChoice==='broadcast'&&state.evidence>=1&&state.trust>=1&&state.resistance>=3)return 'signal';
  if(state.suspicion>=4||state.endingChoice==='broadcast')return 'marked';
  return 'quiet';
}
const endings={
  signal:{title:'전파 속의 이름',tag:'ENDING 01 / SIGNAL',symbol:'⌁',beats:[
    ['내레이션','23:10. 점검을 알리는 짧은 잡음 뒤에 송신실의 빈 채널이 열린다. 해림은 문을 잠그고 당신이 가진 장부의 서명을 하나씩 읽는다.'],
    ['내레이션','당신은 1,200이라는 총량이 어떻게 960가구와 240대의 병동 물량으로 갈라졌는지 말한다. 마지막으로 명부에서 지워진 윤서의 이름을 읽는다.'],
    ['내레이션','방송은 41초 만에 끊긴다. 그러나 창밖에서 누군가 창문을 열고 같은 숫자를 되풀이한다. 다른 건물에서도 창문이 열린다.'],
    ['내레이션','아침이면 공식 기록은 다시 바뀔 것이다. 그래도 오늘 밤, 같은 문장을 들은 사람이 둘 이상 존재한다.']
  ]},
  marked:{title:'붉은 점',tag:'ENDING 02 / MARKED',symbol:'◎',beats:[
    ['내레이션','23:10을 조금 넘긴 시각, 복도 끝에서 세 번의 발소리가 멈춘다. 당신은 문 아래로 밀려온 출입 통지서를 본다. 발신란에는 감찰과의 붉은 점만 찍혀 있다.'],
    ['내레이션',s=>s.endingChoice==='broadcast'?'송신실까지는 도착하지 못했다. 주머니 안의 종이와 머릿속의 숫자 중 무엇을 먼저 빼앗길지 알 수 없다.':'오늘 하루의 대답이 너무 많이 남았다. 누군가 질문의 순서를 이미 정해 둔 것 같다.'],
    ['내레이션','통지서는 당신에게 내일 오전 면담을 요청한다. “요청”이라는 말 뒤에 선택지는 없다. 당신은 밤새 장부의 서명들을 외운다.'],
    ['내레이션','문을 열기 직전, 옆집에서 종이가 접히는 소리가 들린다. 혼자인지 아닌지 알 수 없는 채로 Day 1이 끝난다.']
  ]},
  quiet:{title:'남겨 둔 문장',tag:'ENDING 03 / QUIET',symbol:'▤',beats:[
    ['내레이션','밤이 깊어도 복도는 조용하다. 당신은 창문을 닫고 오늘의 신문을 다시 펼친다. 활자로 찍힌 문장은 당신의 손을 떠나 처음부터 그랬던 사실처럼 보인다.'],
    ['내레이션',s=>s.evidence>0?'안주머니나 누군가의 개인함에는 아직 반박할 수 있는 조각이 남아 있다. 오늘은 꺼내지 않기로 했다.':'증거는 거의 남지 않았다. 하지만 240이라는 숫자는 종이보다 오래 머릿속에 남는다.'],
    ['내레이션','윤서의 방은 어둡다. 그 방이 비어 있었다는 공식 기록과, 어제 그곳에서 들었던 목소리가 같은 복도에 놓여 있다.'],
    ['내레이션','내일 다시 출근하면 새로운 문장을 받게 될 것이다. 오늘 고치지 못한 문장도 함께 따라올 것이다.']
  ]}
};
function renderEnding(){if(!state.ending){state.ending=pickEnding();save();}const ending=endings[state.ending];$('#progressText').textContent=ending.tag;const [speaker,text]=ending.beats[state.beat];const last=state.beat===ending.beats.length-1;$('#game').innerHTML=`<section class="screen">${art({art:'ending',symbol:ending.symbol,code:ending.tag,place:'DAY 1 / END'})}<div class="story-panel narration"><p class="ending-tag">${ending.tag}</p><h1 class="ending-title">${ending.title}</h1><p class="speaker">${speaker}</p><p class="passage">${escapeHtml(resolveText(text))}</p><div class="controls">${last?`<div class="end-note">Day 1 완료. 선택은 자동 저장되었습니다. 다른 결말은 처음부터 다시 플레이해 볼 수 있습니다.</div><button id="endRestart" class="button secondary" type="button">처음부터 다시 하기</button>`:`<button id="endingNext" class="button continue" type="button">계속 →</button>`}</div></div></section>`;if(last)$('#endRestart').addEventListener('click',()=>$('#restartDialog').showModal());else $('#endingNext').addEventListener('click',()=>{log(speaker,resolveText(text));state.beat++;save();render();});}
function render(){if(state.node==='start')renderStart();else if(state.node==='puzzle')renderPuzzle();else if(state.node==='ending')renderEnding();else renderScene();}

$('#logButton').addEventListener('click',()=>{const list=state.log.slice(-40).reverse();$('#logContent').innerHTML=list.length?list.map(item=>`<div class="log-entry"><b>${escapeHtml(item.speaker)}</b>${escapeHtml(item.text)}</div>`).join(''):'<p>아직 기록이 없습니다.</p>';$('#logDialog').showModal();});
$('#closeLog').addEventListener('click',()=>$('#logDialog').close());
$('#restartButton').addEventListener('click',()=>$('#restartDialog').showModal());
$('#cancelRestart').addEventListener('click',()=>$('#restartDialog').close());
$('#confirmRestart').addEventListener('click',()=>{state=freshState();activeDocument=0;save();$('#restartDialog').close();render();});
document.addEventListener('keydown',event=>{if(event.key!=='Enter'||event.repeat||event.target.closest('button,input,dialog'))return;const button=$('#continueButton')||$('#endingNext');if(button){event.preventDefault();button.click();}});
render();
