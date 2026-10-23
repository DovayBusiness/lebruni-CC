(async function(){
  const central=document.getElementById('cbn-rate-central');
  const detail=document.getElementById('cbn-rate-detail');
  const date=document.getElementById('cbn-rate-date');
  if(!central||!detail||!date)return;
  try{
    const response=await fetch('rate.json?refresh='+new Date().toISOString().slice(0,10),{cache:'no-store'});
    if(!response.ok)throw new Error('Rate data unavailable');
    const rate=await response.json();
    if(!rate||!rate.centralrate||!rate.ratedate)throw new Error('Invalid rate data');
    const fmt=value=>Number(value).toLocaleString('en-NG',{minimumFractionDigits:4,maximumFractionDigits:4});
    central.textContent='₦'+fmt(rate.centralrate)+' per USD';
    detail.textContent='Buying ₦'+fmt(rate.buyingrate)+' · Selling ₦'+fmt(rate.sellingrate);
    date.textContent='Rate date: '+new Date(rate.ratedate+'T00:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  }catch(error){central.textContent='Rate temporarily unavailable';detail.textContent='';date.textContent='';}
})();
