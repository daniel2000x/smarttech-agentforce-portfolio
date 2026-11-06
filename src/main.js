import {products, money} from './catalog.js';
import {answerFor, validateLead, buildLead} from './engine.js';

const $ = id => document.getElementById(id);
const leads = []; // Somente memória: não armazenar dados pessoais no navegador ou transmitir para fora.
function node(tag, className='', content='') {const el=document.createElement(tag);if(className)el.className=className;el.textContent=content;return el;}

for(const product of products){
  const c=node('article','product-card');
  c.append(node('div','product-icon',product.icon));
  c.append(node('span','product-category',product.category.toUpperCase()));
  c.append(node('h3','',product.name));
  c.append(node('p','',product.description));
  const foot=node('div','product-foot');foot.append(node('b','',money(product.price)));
  const btn=node('button','choose-product','Tenho interesse ↗');btn.type='button';btn.addEventListener('click',()=>{$('lead-product').value=product.id;$('lead-name').focus();location.hash='atendimento';});foot.append(btn);
  c.append(foot);$('products').append(c);
  const option=document.createElement('option');option.value=product.id;option.textContent=product.name;$('lead-product').append(option);
}
function message(text,from='assistant'){
  const wrap=node('div',`message ${from}`);
  if(from==='assistant')wrap.append(node('span','mini-avatar','✦'));
  wrap.append(node('p','',text));$('chat-messages').append(wrap);
  $('chat-messages').scrollTop=$('chat-messages').scrollHeight;
}
message('Olá! Sou o SmartTech Assist. Posso indicar um produto, apresentar preços ilustrativos ou orientar como registrar um interesse. Esta é uma simulação local — ainda não estou conectado ao Salesforce.');
function send(q){const t=String(q).trim();if(!t)return;message(t,'visitor');message(answerFor(t));}
$('chat-form').addEventListener('submit',e=>{e.preventDefault();const t=$('chat-input').value;$('chat-input').value='';send(t);});
document.querySelectorAll('[data-question]').forEach(btn=>btn.addEventListener('click',()=>send(btn.dataset.question)));
$('lead-form').addEventListener('submit',e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));const err=validateLead({...data,consent:data.consent==='on'});
  const box=$('lead-message');box.textContent='';box.className='form-feedback';
  if(err){box.textContent=err;box.classList.add('error');return;}
  const lead=buildLead(data);leads.unshift(lead);$('lead-count').textContent=String(leads.length);
  const body=$('lead-list');body.replaceChildren();
  for(const l of leads){const tr=document.createElement('tr');for(const v of [l.name,l.email,l.product,l.status])tr.append(node('td','',v));body.append(tr);}
  box.textContent=`Lead ${lead.id} criado apenas nesta sessão (não enviado ao Salesforce).`;
  e.currentTarget.reset();
  message('Interesse registrado nesta demonstração. Na versão integrada, uma ação Salesforce Flow criará um Lead real após validação e consentimento.');
});
