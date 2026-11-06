# SmartTech AI · Atendimento e pré-vendas

![Status](https://img.shields.io/badge/status-MVP%20simulado-0c766e) ![Salesforce](https://img.shields.io/badge/Agentforce-integra%C3%A7%C3%A3o%20planejada-4c6589) ![Testes](https://img.shields.io/badge/testes-node.js-418646)

Projeto autoral de portfólio: interface de atendimento de uma loja fictícia de eletrônicos, catálogo, simulação de chat e captação consentida de leads. **A primeira versão é uma demonstração local, sem IA generativa ou conexão com Salesforce.** O objetivo das próximas iterações é integrar o site a um agente criado no **Salesforce Agentforce**, usando **Flow** para consultar produtos e registrar leads reais em uma organização de desenvolvimento.

## Demonstração v0.1

- Página responsiva e catálogo fictício de quatro produtos.
- Chat demonstrativo com respostas determinísticas e restrição a informações conhecidas.
- Formulário de Lead com validação e consentimento explícito.
- Tabela de Leads temporários **apenas em memória**, sem servidor ou persistência.
- Testes automatizados com Node.js e CI GitHub Actions.
- Plano de implementação do Agentforce e documentação da arquitetura futura.

## Abrir localmente

**Opção simples:** abra `index.html` em um navegador moderno. Se a política do navegador impedir módulos locais, execute um servidor local.

```bash
python3 -m http.server 8000
# Abra http://localhost:8000
```

**Rodar testes:**

```bash
npm test
```

Não é necessário `npm install`: a aplicação usa HTML/CSS/JavaScript nativos e os testes usam o Node.js.

## Estrutura

```text
smarttech-agentforce-portfolio/
├── index.html                  # Interface web
├── src/
│   ├── main.js                 # UI e estados de sessão
│   ├── engine.js               # Simulação e validação
│   ├── catalog.js              # Dados fictícios
│   └── style.css
├── tests/engine.test.mjs       # Testes automatizados
├── docs/
│   ├── ARCHITECTURE.md
│   ├── AGENTFORCE_SETUP.md
│   ├── AGENT_INSTRUCTIONS.md
│   ├── TEST_PLAN.md
│   └── CURRICULO.md
└── .github/workflows/test.yml  # CI
```

## Próximas etapas

- [x] Protótipo do site e motor de simulação
- [x] Catálogo sintético, validação de leads e testes
- [ ] Criar organização Salesforce Developer Edition adequada
- [ ] Cadastrar produtos e modelagem do Lead
- [ ] Criar Flows de consulta e registro com permissões mínimas
- [ ] Criar o `SmartTech Sales Agent` e subagente `Product Advisory`
- [ ] Testar ações no Preview e registrar evidências
- [ ] Publicar canal Embedded Messaging e vincular o agente ao site
- [ ] Construir dashboard e gravar vídeo de demonstração

## Privacidade e limites

- Não use dados pessoais reais na demonstração. Os dados ficam somente na memória da página, sem envio para rede por este projeto (o arquivo CSS pode buscar fontes do Google Fonts).
- Não faça upload de senhas, tokens, IDs privados da organização, conversas reais ou arquivos de trabalho para o GitHub.
- Preço, estoque e descrições foram inventados para fins de demonstração.
- Este é um projeto não oficial, sem associação comercial com a Salesforce.

## Autor

Desenvolvido como projeto de portfólio por **Daniel Rosa**.

- GitHub: https://github.com/daniel2000x
- LinkedIn: https://www.linkedin.com/in/daniel-rosa-ti/
