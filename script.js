const CONFIG = {
  question: "ကျွန်တော့်ကို ပြန်ချစ်ပေးမလား?",
  noMessages: ["တကယ်လား? 🥺", "ပြန်စဉ်းစားပါဦးနော်...", "No ကို နှိပ်လို့ရတော့မှာ မဟုတ်ဘူးနော် 😆", "Yes ကို နှိပ်လိုက်ပါ 💕"],
  to: "💌... ချစ်ရပါသော ... 💌",
  letter: "လူတွေအများကြီးထဲကမှ မမ နဲ့ ဆုံတွေ့ခဲ့ရတာဟာ ကျနော့်အတွက်တော့အလှပဆုံး ကံကြမ္မာတစ်ခုပါ။\n\nအမြဲတမ်းပျော်ရွှင်အောင် ထားပေးပါ့မယ်ဆိုပြီး ကတိမပေးနိုင်ရင်တောင်\n\nကျနော့်အတွက်နဲ့စိတ်မညစ်စေရတော့ပါဘူးလ်ို့ ပြောပါရစေ။\n\nLove you so much ...🥀💖",
  from: "-- The one who loves you"
};

(function() {
  const bg = document.createElement("div");
  bg.className = "bg";
  const set = ["🥹", "😭", "✨", "🥺"];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.textContent = set[i % set.length];
    s.style.left = (Math.random() * 95) + "vw";
    s.style.fontSize = (14 + Math.random() * 18) + "px";
    s.style.animationDuration = (16 + Math.random() * 14) + "s";
    s.style.animationDelay = (-Math.random() * 20) + "s";
    bg.appendChild(s);
  }
  document.body.insertBefore(bg, document.body.firstChild);
})();

const $ = (id) => document.getElementById(id);
const yes = $("yes");
const no = $("no");
const noTooltip = $("no-tooltip");
const card = $("card");
let clicks = 0;

$("q").textContent = CONFIG.question;
$("to").textContent = CONFIG.to;
$("body").textContent = CONFIG.letter;
$("from").textContent = CONFIG.from;

function dodge() {
  no.classList.add("run");
  const maxX = card.clientWidth - no.offsetWidth - 24;
  const maxY = card.clientHeight - no.offsetHeight - 24;
  no.style.left = Math.max(24, Math.random() * maxX) + "px";
  no.style.top = Math.max(24, Math.random() * maxY) + "px";
}

function refuse(e) {
  if (e) e.preventDefault();
  clicks++;
  
  const msgIndex = Math.min(clicks - 1, CONFIG.noMessages.length - 1);
  noTooltip.textContent = CONFIG.noMessages[msgIndex];
  noTooltip.classList.add("show");
  
  const s = Math.max(0.45, 1 - clicks * 0.12);
  no.style.fontSize = (16 * s) + "px";
  no.style.padding = (12 * s) + "px " + (28 * s) + "px";
  
  yes.style.fontSize = (16 + clicks * 6) + "px";
  yes.style.padding = (12 + clicks * 4) + "px " + (28 + clicks * 10) + "px";
  
  $("bears").classList.add("hug");
  dodge();
}

no.addEventListener("click", refuse);

no.addEventListener("pointerenter", (e) => {
  if (e.pointerType === "mouse") refuse();
});

no.addEventListener("touchstart", (e) => {
  refuse(e);
}, { passive: false });

function hearts() {
  const hSet = ["💖", "💕", "💗", "❤️", "🌸"];
  for (let i = 0; i < 35; i++) { 
    const s = document.createElement("span");
    s.className = "heart";
    s.textContent = hSet[i % hSet.length];
    s.style.left = (Math.random() * 95) + "vw";
    s.style.animationDelay = (Math.random() * 1.5) + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 5000);
  }
}

yes.addEventListener("click", () => {
  $("ask").style.display = "none";
  $("letter").style.display = "block";
  noTooltip.classList.remove("show");
  
  const bgElement = document.querySelector('.bg');
  if (bgElement) {
    bgElement.style.display = 'none';
  }
  
  hearts();
});
