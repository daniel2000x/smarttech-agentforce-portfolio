# Configuração real no Salesforce — roteiro de implementação

> **Pendente.** Esta documentação orienta a próxima fase; nenhuma ação abaixo foi executada nesta organização para o projeto SmartTech AI.

## 0. Organização

Criar uma **Developer Edition compatível com Agentforce** para o projeto autoral; evitar usar o Playground temporário do badge Coral Cloud como ambiente definitivo. Confirmar funcionalidades e limites de uso na organização.

## 1. Modelo de dados

- **Product2**: cadastrar os quatro produtos fictícios do `src/catalog.js` com Product Code e descrição.
- **Lead**: usar campos padrão `FirstName`, `LastName`, `Email`, `Company`, `Status`, `LeadSource`. Adicionar campo personalizado `Produto_de_Interesse__c` (texto ou lookup conforme modelo escolhido) apenas se necessário.
- **Opportunity**: opcional; criar somente quando houver regra comercial e relacionamento apropriado com conta/contato.
- **Observação:** no Salesforce, Company pode ser exigido para Lead em algumas configurações; utilizar uma convenção fictícia definida para B2C (por exemplo, 'Consumidor final') e validar antes de testar.

## 2. Flows

### `Consultar_Produto`
Entrada: `codigoProduto` (Texto). Pesquisar Product2 autorizado; saída: nome, descrição, preço de tabela e disponibilidade **somente se existirem fontes de dados confiáveis**. Não inventar estoque.

### `Registrar_Lead`
Entradas: `nome`, `email`, `codigoProduto`, `consentimento` (Boolean). Validar consentimento, e-mail e parâmetros; impedir duplicidade por e-mail conforme a regra de negócio; criar Lead; retornar `leadId` ou erro claro. **Evitar colocar dados pessoais em logs públicos.**

### `Encaminhar_Atendimento`
Oferecer atendimento humano; incluir fila e horário de suporte se configurados. Não prometer transferência se o canal não estiver habilitado.

## 3. Agentforce Studio

- Criar `SmartTech Sales Agent` (nome de desenvolvedor sugerido `SmartTech_Sales_Agent`).
- Criar subagente `Product Advisory` e adicionar as ações de Flow.
- Definir instruções em `docs/AGENT_INSTRUCTIONS.md`.
- Testar intenções: catálogo, recomendação, preço, captura de lead, perguntas sem base e atendimento humano.
- Conferir permissões mínimas do usuário do agente, limites e autorização de dados.
- Publicar e ativar versão somente após corrigir problemas reportados pelo Builder.

## 4. Canal de atendimento

Preferir **Embedded Messaging / Enhanced Web Chat** em um site compatível ou Experience Cloud; usar configuração oficial da organização. Não copiar credenciais ou inserir tokens no código do site público. É necessário validar deployment, roteamento e políticas de acesso antes de afirmar que o chat está conectado.

## 5. Demonstração e prova de implementação

- Print da versão ativa do Agentforce.
- Print dos Flows ativos e mapeamento das entradas/saídas.
- Evidência do teste do chat real com dados fictícios.
- Evidência de Lead criado no CRM real (com dados totalmente fictícios).
- Capturas de relatório ou dashboard.
- Vídeo curto mostrando o fluxo completo.

Fontes oficiais:
- https://help.salesforce.com/s/articleView?id=service_agent_setup.htm&type=5
- https://help.salesforce.com/s/articleView?id=experience.support_add_agent_to_site.htm&type=5
