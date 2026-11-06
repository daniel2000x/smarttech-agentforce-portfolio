import {products, money} from './catalog.js';

/** Respostas locais determinísticas: NÃO são IA generativa nem acesso ao Salesforce. */
export function answerFor(message) {
  const raw = String(message ?? '').trim();
  if (!raw) return 'Digite uma pergunta para começar.';
  const q = raw.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  if (/humano|vendedor|atendente|pessoa|especialista/.test(q)) {
    return 'Posso encaminhar seu interesse à equipe comercial. Nesta demonstração, o botão “Registrar lead” cria apenas um registro temporário, sem enviá-lo ao Salesforce.';
  }
  if (/privacidade|dados pessoais|lgpd|consentimento/.test(q)) {
    return 'Esta demonstração não envia seus dados a servidores. Os leads são armazenados somente na memória da aba atual e desaparecem ao recarregar a página. Não informe dados pessoais reais.';
  }
  if (/entrega|frete|prazo/.test(q)) return 'Na SmartTech AI, condições de entrega são ilustrativas. Em produção, eu consultaria as políticas e o CEP em uma fonte autorizada antes de informar prazos ou valores.';
  if (/garantia|troca|devolucao|devolu/.test(q)) return 'As políticas de garantia e troca ainda não foram cadastradas na organização Salesforce. Não vou inventar condições: um atendente deverá confirmar os termos aplicáveis.';
  if (/desconto|cupom|parcelamento|pagamento/.test(q)) return 'As condições comerciais precisam de confirmação pela equipe. Não tenho permissão para prometer descontos ou parcelamentos nesta demonstração.';
  if (/preco|quanto custa|valor|catalogo|produtos|opcoes/.test(q)) {
    return 'Catálogo fictício: ' + products.map(p => `${p.name}: ${money(p.price)}`).join(' · ') + '. Para uma indicação mais específica, diga que tipo de produto procura.';
  }
  const match = products.find(p => [p.category, p.name.toLocaleLowerCase('pt-BR'), ...p.tags].some(term => q.includes(term.toLocaleLowerCase('pt-BR'))));
  if (match) return `Sugestão: ${match.name} — ${match.description}, por ${money(match.price)} (preço ilustrativo). Estoque de demonstração: ${match.stock} unidades. Se desejar atendimento comercial, use “Registrar lead”.`;
  if (/oi|ola|bom dia|boa tarde|boa noite|ajuda/.test(q)) return 'Olá! Posso apresentar notebooks, monitores, celulares e headsets, ou explicar como funciona o atendimento da SmartTech AI.';
  return 'Não tenho uma resposta verificada para isso no catálogo de demonstração. Você pode perguntar sobre um produto ou solicitar um atendimento humano.';
}

export function validateLead({name,email,productId,consent}) {
  if (!consent) return 'É necessário confirmar o consentimento para usar dados fictícios nesta demonstração.';
  if (!name || name.trim().length < 2) return 'Informe um nome com pelo menos 2 caracteres.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? ''))) return 'Informe um e-mail com formato válido.';
  if (!products.some(p=>p.id===productId)) return 'Escolha um produto do catálogo.';
  return null;
}

export function buildLead({name,email,productId}) {
  const product = products.find(p=>p.id===productId);
  return {id:`DEMO-${Date.now().toString(36).toUpperCase()}`,name:name.trim(),email:email.trim(),product:product.name,status:'Novo (simulado)',createdAt:new Date().toLocaleString('pt-BR')};
}
