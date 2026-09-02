# Projeto: [NOME_DA_APLICACAO]
## Objetivo: Modernizar frontend mantendo lógica Java como backend

### Contexto
- Backend: Aplicação Java com estrutura de classes (DAO, Model, Service) 
- Frontend: Será HTML5 + CSS3 + JavaScript vanilla (sem frameworks)
- Conexão: API REST via Spring Boot / Servlet simples
- Público: Usuários de [TIPO_DE_USUARIO] | Contexto: [ONDE_SERÁ_USADO]

### Entregáveis Esperados

#### 1. Backend (Java)
- Expor endpoints REST nas rotas:
  - `GET /api/[recurso]` — listar todos
  - `GET /api/[recurso]/{id}` — buscar um
  - `POST /api/[recurso]` — criar
  - `PUT /api/[recurso]/{id}` — atualizar
  - `DELETE /api/[recurso]/{id}` — deletar
- Respostas em JSON com estrutura: `{ status: "success|error", data: {...}, message: "..." }`
- Tratamento de erro com status HTTP apropriado (400, 404, 500)
- CORS habilitado para `http://localhost:8080` (ou porta do frontend)

#### 2. Frontend (HTML/CSS/JS Puro)
- **Arquivo: index.html**
  - Semântica HTML5 (header, nav, main, section, footer)
  - Estrutura modular (componentes como custom elements ou data attributes)
  - Nenhuma dependência externa (sem jQuery, React, Vue, etc)
  - Comentários descritivos em cada bloco principal
  - Acessibilidade: roles, aria-labels, contraste de cores (WCAG AA)

- **Arquivo: style.css**
  - Mobile-first (breakpoints: 480px, 768px, 1024px, 1440px)
  - Variáveis CSS para cores, fonts, espaçamento (--cor-primaria, --font-size-base, etc)
  - Nenhum framework CSS (sem Bootstrap, Tailwind)
  - Animações suaves (transições, keyframes) para UX fluida
  - BEM naming convention: `.bloco__elemento--modificador`
  - Comentários explicando decisões de design

- **Arquivo: app.js**
  - Classe ou objeto para gerenciar estado (State/Store pattern)
  - Funções puras para renderização (template literals)
  - Fetch API para comunicação com backend (async/await)
  - Validação de entrada no cliente
  - Tratamento de erros com feedback visual (toast/modal)
  - Event delegation para eficiência
  - Comentários linha a linha nos trechos complexos
  - Teste unitário mínimo (exemplo: teste de validação com console.assert ou suite manual)

### Identidade Visual & Filosofia
- Paleta: [DESCREVER CORES OU LINK FIGMA]
- Tipografia: [FONT FAMILY] para títulos, [FONT FAMILY] para corpo
- Tom: [FORMAL/DESCONTRAÍDO/TÉCNICO]
- Inspiração: [URL/DESCRIÇÃO DE DESIGN SIMILAR]
- Casos de uso prioritários: [LISTAR 3-5 FLUXOS PRINCIPAIS]

### Estrutura de Dados (exemplo)
A aplicação trabalha com:
- Entidade: [NOME]
- Atributos: [id, campo1, campo2, ...]
- Validações: [REGRAS]

### Requisitos Não-Funcionais
- Performance: Carregamento da página em < 2s (sem cache)
- Responsividade: Funcional em mobile (320px), tablet, desktop
- Offline-ready: Indicar modo offline e cachear última resposta
- Acessibilidade: WCAG AA mínimo
- Manutenibilidade: Código comentado, sem hard-codes, configurações centralizadas

### Gerar:
1. Código Java (Spring Boot Controller + tratamento de erro)
2. `index.html` completo, semântico, comentado
3. `style.css` modular, responsivo, comentado
4. `app.js` com gerenciamento de estado e chamadas API, comentado
5. Arquivo `README.md` com instruções de rodar locally (portas, dependências)

### Estilo de Comentários
- Português, didático
- Cada função: explicar entrada, saída e regra de negócio
- Cada seção CSS: explicar responsabilidade
- Evitar óbvios ("// incrementar i"), focar em "por quê"

### Diferencial Esperado
Código que um aluno do técnico olhe e pense: "Ah, é assim que se monta um front real".