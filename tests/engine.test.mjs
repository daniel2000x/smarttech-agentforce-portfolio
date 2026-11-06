import test from 'node:test';
import assert from 'node:assert/strict';
import {answerFor,validateLead,buildLead} from '../src/engine.js';

test('recomenda item do catálogo, sem inventar produto',()=>assert.match(answerFor('Quero um notebook para trabalho'),/Notebook Pro 14/));
test('encaminha atendimento humano em vez de prometer ação Salesforce',()=>assert.match(answerFor('Quero falar com um vendedor'),/temporário/));
test('não inventa política de garantia',()=>assert.match(answerFor('Qual a garantia?'),/Não vou inventar/));
test('bloqueia lead sem consentimento',()=>assert.match(validateLead({name:'Ana',email:'ana@example.com',productId:'N001',consent:false}),/consentimento/));
test('bloqueia email inválido',()=>assert.match(validateLead({name:'Ana',email:'x',productId:'N001',consent:true}),/e-mail/));
test('aceita lead sintético válido',()=>assert.equal(validateLead({name:'Ana',email:'ana@example.com',productId:'N001',consent:true}),null));
test('lead criado é explicitamente simulado',()=>assert.equal(buildLead({name:'Ana',email:'ana@example.com',productId:'N001'}).status,'Novo (simulado)'));
