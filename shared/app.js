(() => {
 const $ = q => document.querySelector(q);
 const form = $('#booking-form');
 if(form){
  const day=$('#day');const now=new Date();const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');day.min=today;
  const choose = value => {const select=$('#service');if(![...select.options].some(x=>x.value===value))select.add(new Option(value,value));select.value=value;$('#message-preview').hidden=true;};
  document.querySelectorAll('.select-service').forEach(b=>b.addEventListener('click',()=>{choose(b.dataset.service);$('#booking').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});$('#customer').focus({preventScroll:true});}));
  const incoming=new URLSearchParams(location.search).get('service');if(incoming)choose(incoming.slice(0,200));
  form.addEventListener('input',()=>{$('#message-preview').hidden=true;day.setCustomValidity(day.value&&day.value<today?'اختاري اليوم أو تاريخًا قادمًا.':'');});
  form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const v=new FormData(form);const text=`السلام عليكم ${document.body.dataset.name}، أرغب بالاستفسار عن موعد.\nالاسم: ${v.get('customer').trim()}\nالخدمة: ${v.get('service')}\nاليوم المفضل: ${v.get('day')}\nالوقت المفضل: ${v.get('time')}${v.get('notes').trim()?'\nملاحظات: '+v.get('notes').trim():''}\nأرجو تأكيد التوفر والسعر النهائي.\nأرسلت الطلب من نموذج واقع للتصميم المقترح.`;$('#message-text').textContent=text;$('#whatsapp-ready').href=`https://wa.me/${document.body.dataset.phone}?text=${encodeURIComponent(text)}`;$('#message-preview').hidden=false;$('#message-preview').scrollIntoView({behavior:'smooth',block:'nearest'});});
 }
 const search=$('#menu-search');if(search){let group='all';const rows=[...document.querySelectorAll('.catalog-item')];const filter=()=>{let n=0;const q=search.value.trim().toLowerCase();rows.forEach(r=>{r.hidden=!((group==='all'||r.dataset.group===group)&&r.dataset.search.includes(q));if(!r.hidden)n++});$('#menu-count').textContent=n?`${n} خدمة ضمن النتائج`:'لا توجد خدمة بهذا الاسم. جرّبي كلمة أخرى أو اختاري الكل.';};search.addEventListener('input',filter);document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{group=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});filter();}));filter();}
})();
