# JavaScript — primeiro contato
**Guia do aluno · UC15 · Encontro 9 · Landing Oportuni**

> Este material é seu. Consulte durante a aula, use para fazer a atividade e guarde para o projeto final. Você não precisa decorar nada daqui — precisa saber **onde procurar**.

---

## Onde você está na trilha

```
✅  Enc. 1–4   HTML — a ESTRUTURA
                → você aprendeu a dizer o que cada coisa É

✅  Enc. 5     CSS — a APARÊNCIA
                → a página ganhou cor, fonte e respiro

✅  Enc. 6     Flexbox — o ALINHAMENTO
                → os elementos saíram da pilha

✅  Enc. 7     CSS Grid — a GRADE
                → você montou layout de verdade

✅  Enc. 8     Responsividade — a ADAPTAÇÃO
                → a mesma página, boa em qualquer tela

👉  Enc. 9     JavaScript — o COMPORTAMENTO
                → a página deixa de ser cartaz e vira PROGRAMA

⬜  Enc. 10+   Mais JS: formulário, validação, interação

⬜  Final      WordPress — publicar de verdade
```

Hoje é uma virada de página no curso. Até agora você **descreveu** coisas. A partir de hoje você vai **mandar acontecer**.

---

## A parede em que a gente bateu

No encontro passado sua landing ficou responsiva. Mas um problema sobrou:

> No celular, o menu continua quebrando em duas linhas e comendo um pedaço da tela.

Todo site profissional resolve isso com o **menu hambúrguer** — as três listrinhas que abrem e fecham. E é aqui que o CSS chega no limite dele:

```
O CSS sabe:      deixar o menu escondido
O CSS sabe:      deixar o menu visível

O CSS NÃO sabe:  perceber que você clicou e trocar
                 de um estado para o outro
```

CSS **estiliza**. Ele não **decide**. Para decidir, reagir e mudar de estado, entra a terceira linguagem da web.

---

## As três linguagens

| | Papel | Analogia | Pergunta que responde |
|---|---|---|---|
| **HTML** | Estrutura | o esqueleto | *o que é isso?* |
| **CSS** | Aparência | a roupa | *como isso se parece?* |
| **JavaScript** | Comportamento | os músculos e o cérebro | *o que isso FAZ?* |

```
HTML         <button>Menu</button>
             → existe um botão

CSS          button { background: laranja; }
             → o botão é laranja

JavaScript   quando clicarem no botão, abra o menu
             → o botão FUNCIONA
```

Um site só com HTML é um documento. Com CSS, vira um cartaz. Com JavaScript, vira um **programa** que roda dentro do navegador.

---

## Onde o JavaScript mora

Crie o arquivo `js/script.js` e chame ele no seu HTML — **na última linha antes de `</body>`**:

```html
    <script src="js/script.js"></script>
</body>
</html>
```

⚠️ **A posição não é decoração — é a causa do erro nº 1 desta aula.**

```
O navegador lê a página DE CIMA PARA BAIXO.

Script no <head>:
  o JS procura o botão → o botão ainda não existe → erro (null)

Script antes de </body>:
  a página inteira já foi lida → o botão existe → funciona
```

Regra simples: **CSS no topo, JavaScript no fim.**

---

## O console: sua bancada de trabalho

```
F12 → aba "Console"
```

É aqui que você testa código, vê mensagens e — principalmente — **lê os erros**. Todo erro de JavaScript aparece em vermelho no console, com o nome do arquivo e o número da linha.

> Quem não abre o console programa no escuro. Deixe ele aberto o tempo todo.

Seu primeiro comando:

```javascript
console.log("Oi, mundo!");
```

Salve, recarregue a página e olhe o console. Apareceu? Então seu arquivo JS está conectado. **Sempre teste isso antes de escrever qualquer outra coisa.**

---

## Variáveis: guardar informação

Uma variável é uma **caixa com etiqueta** onde você guarda um valor para usar depois.

```javascript
let contador = 0;              // pode mudar depois
const nomeDoSite = "Oportuni"; // NÃO muda mais
```

| | Quando usar |
|---|---|
| `const` | **use por padrão.** Para tudo que não vai mudar |
| `let` | só quando o valor realmente precisa mudar |
| `var` | forma antiga. Você vai ver em códigos velhos — não use |

> Começar com `const` e trocar para `let` só quando o navegador reclamar é um bom hábito. Menos coisa mudando é menos coisa quebrando.

**Os tipos que você vai usar hoje:**

```javascript
const texto  = "isto é uma string";   // texto, sempre entre aspas
const numero = 42;                    // number, sem aspas
const ligado = true;                  // boolean: true ou false
```

---

## Funções: um bloco que espera ser chamado

```javascript
function saudacao() {
    console.log("Bem-vindo à Oportuni!");
}

saudacao();   // ← só agora o código roda
```

```
function nome() { ... }   →  você DEFINE o que fazer
nome();                   →  você MANDA fazer
```

Definir não executa. É a diferença entre escrever a receita e cozinhar.

---

## O DOM: a página como objeto

Quando o navegador carrega seu HTML, ele monta uma árvore de objetos na memória. Essa árvore se chama **DOM** (Document Object Model).

```
document
   └── html
        ├── head
        └── body
             ├── header
             │     ├── img.logo
             │     └── nav
             ├── main
             └── footer
```

O importante: **o JavaScript enxerga essa árvore e pode mexer nela.** Trocar texto, adicionar classe, esconder, mostrar. E o navegador redesenha a tela na hora.

### Selecionar um elemento

```javascript
document.querySelector("#menu");      // pelo ID       (# igual no CSS)
document.querySelector(".card-op");   // pela CLASSE   (. igual no CSS)
document.querySelector("h1");         // pela TAG
```

> Boa notícia: **é a mesma sintaxe de seletor do CSS.** `#` para id, `.` para classe. Você já sabe essa parte desde o Enc. 5.

`querySelector` pega **o primeiro** que encontrar. Para pegar todos:

```javascript
document.querySelectorAll(".card-op");   // pega todos
```

### Mudar um elemento

```javascript
const titulo = document.querySelector("h1");

titulo.textContent = "Novo título";        // troca o texto
titulo.style.color = "orange";             // muda estilo direto
titulo.classList.add("destaque");          // adiciona uma classe
titulo.classList.remove("destaque");       // remove
titulo.classList.toggle("destaque");       // ← se tem, tira. Se não tem, põe
```

**`classList.toggle()` é a estrela de hoje.** Guarde ela:

```
toggle = interruptor

tem a classe?  → remove
não tem?       → adiciona

É exatamente o comportamento de abrir e fechar um menu.
```

E repare na jogada: o JavaScript não escreve estilo nenhum. Ele só **liga e desliga uma classe** — quem cuida da aparência continua sendo o CSS. Cada linguagem no seu papel.

---

## Eventos: reagir ao usuário

```javascript
const botao = document.querySelector("#btnMenu");

botao.addEventListener("click", function() {
    console.log("clicaram!");
});
```

Leia em voz alta, que fica óbvio:

```
botao . addEventListener ( "click" , função )
  ↑            ↑             ↑          ↑
 quem      "fique de      qual        o que
           olho em"      evento       fazer
```

**Eventos comuns:**

| Evento | Dispara quando |
|---|---|
| `click` | o usuário clica |
| `input` | o usuário digita num campo |
| `submit` | um formulário é enviado |
| `mouseover` | o mouse passa por cima |

---

## Código de referência — o menu hambúrguer

Os três arquivos trabalhando juntos. É a primeira vez no curso que isso acontece.

### 1. HTML — o botão

No `<header>`, **antes** do `<nav>`:

```html
<header>
    <img src="imagens/logo-dark.png" alt="Logotipo da Oportuni" class="logo">

    <!-- aria-expanded avisa leitores de tela se o menu está aberto -->
    <button class="btn-menu" id="btnMenu" aria-expanded="false" aria-label="Abrir menu">
        ☰
    </button>

    <nav id="menu">
        <a href="#categorias">Categorias</a>
        <a href="#galeria">Oportunidades</a>
        <a href="#depoimentos">Depoimentos</a>
        <a href="#contato">Contato</a>
    </nav>
</header>
```

### 2. CSS — os dois estados

```css
/* ===== BASE (celular) ===== */

.btn-menu {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 4px 12px;
}

/* O menu começa ESCONDIDO no celular */
nav {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
}

/* Esta classe é o interruptor. Quem liga e desliga ela é o JavaScript. */
nav.aberto {
    display: flex;
}

/* ===== A PARTIR DE 768px ===== */
@media (min-width: 768px) {

    /* No desktop não existe hambúrguer */
    .btn-menu {
        display: none;
    }

    /* E o menu está sempre visível, em linha */
    nav {
        display: flex;
        flex-direction: row;
        gap: 24px;
        width: auto;
    }
}
```

### 3. JavaScript — a decisão

```javascript
// ===== MENU HAMBÚRGUER =====

// 1. Guardar os elementos em variáveis
const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");

// 2. Ficar de olho no clique do botão
btnMenu.addEventListener("click", function() {

    // 3. Liga/desliga a classe que o CSS já sabe estilizar
    menu.classList.toggle("aberto");

    // 4. Trocar o ícone e avisar leitores de tela
    if (menu.classList.contains("aberto")) {
        btnMenu.textContent = "✕";
        btnMenu.setAttribute("aria-expanded", "true");
        btnMenu.setAttribute("aria-label", "Fechar menu");
    } else {
        btnMenu.textContent = "☰";
        btnMenu.setAttribute("aria-expanded", "false");
        btnMenu.setAttribute("aria-label", "Abrir menu");
    }
});
```

### O que aconteceu aqui

```
HTML  → criou o botão e o menu
CSS   → definiu como fica FECHADO e como fica ABERTO
JS    → decidiu QUANDO trocar de um para o outro

Três linguagens, três papéis, zero sobreposição.
É assim que a web funciona de verdade.
```

---

## Desafio — fechar o menu ao clicar num link

Problema real: no celular, você abre o menu, clica em "Contato", a página rola até lá — **e o menu continua aberto por cima do conteúdo.**

Resolva assim:

```javascript
// Pega TODOS os links do menu
const links = document.querySelectorAll("#menu a");

// Para cada um deles, fique de olho no clique
links.forEach(function(link) {
    link.addEventListener("click", function() {
        menu.classList.remove("aberto");
        btnMenu.textContent = "☰";
        btnMenu.setAttribute("aria-expanded", "false");
    });
});
```

```
querySelectorAll  → pega vários elementos
forEach           → "para cada um deles, faça isto"
```

---

## Checklist da entrega

```
OBRIGATÓRIO

[ ] Criar o arquivo js/script.js
[ ] Chamar o <script> na última linha antes de </body>
[ ] Testar com console.log("Oi, mundo!") ANTES de tudo
[ ] Botão hambúrguer no HTML, com id
[ ] CSS: nav escondido na base, nav.aberto visível
[ ] CSS: botão escondido a partir de 768px
[ ] JS: addEventListener de click com classList.toggle
[ ] Ícone alternando entre ☰ e ✕

TESTE NO F12 → MODO DISPOSITIVO

    375px   → o hambúrguer aparece? abre e fecha?
    768px+  → o hambúrguer some e o menu fica em linha?
    Console → está limpo, sem nada em vermelho?

DESAFIO

[ ] O menu fecha sozinho quando você clica num link

NO CLASS NOTEBOOK

[ ] Explique com suas palavras o que classList.toggle() faz
[ ] Por que o <script> vai no fim do body?
```

---

## Deu errado? Comece por aqui

**Primeiro passo, sempre: abra o console (F12).** O erro está escrito lá, com a linha exata.

**`Cannot read properties of null`**
O erro mais comum de todos. Significa: *"você mandou eu mexer numa coisa que não existe."* Causas, nesta ordem:
1. O `<script>` está no `<head>` em vez do fim do `<body>` — o JS rodou antes do elemento existir.
2. O id no HTML e o id no `querySelector` estão diferentes. Confira letra por letra.
3. Esqueceu o `#` ou o `.` no seletor.

**"Não acontece nada quando eu clico."**
Confira se o `console.log("Oi, mundo!")` aparece. Se não aparecer, o problema é o caminho do arquivo no `src`, não o seu código.

**"O menu abre mas não fecha."**
Provavelmente você usou `classList.add` em vez de `classList.toggle`. `add` só sabe adicionar.

**"O menu já começa aberto."**
Falta `display: none` no `nav` da base, ou a media query de 768px está antes da regra base no arquivo. Lembre do Enc. 8: **a de baixo vence**.

**"No desktop o menu sumiu."**
Sua media query de 768px precisa devolver `display: flex` ao `nav`. Sem isso, o `display: none` da base vale em todas as telas.

**`btnmenu is not defined`**
JavaScript diferencia maiúscula de minúscula. `btnMenu` e `btnmenu` são duas coisas diferentes. Isso vale para tudo: variáveis, funções, ids.

---

## Glossário rápido

| Termo | O que é |
|---|---|
| **JavaScript** | A linguagem que dá comportamento à página |
| **Console** | Aba do F12 onde aparecem mensagens e erros |
| **Variável** | Caixa com etiqueta que guarda um valor |
| **Função** | Bloco de código que só roda quando é chamado |
| **DOM** | A página transformada em árvore de objetos que o JS enxerga |
| **Seletor** | A forma de encontrar um elemento — mesma sintaxe do CSS |
| **Evento** | Algo que acontece na página (clique, digitação, envio) |
| **Listener** | O "vigia" que espera um evento acontecer |
| **`toggle`** | Interruptor: se tem, tira; se não tem, põe |

---

## Para explorar depois da aula

- **MDN — Primeiros passos em JavaScript:** `developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps`
- **Teste no console de outros sites:** abra o F12 em qualquer site e digite `document.querySelector("h1").textContent = "Editado por mim"`. O título muda na hora. (Só na sua tela — você mexeu no DOM local, não no servidor.)
- **Desafio opcional:** faça um botão que troca a cor de fundo da página. Dica: é `classList.toggle` de novo, com uma classe `.tema-escuro` no `body`.

---

## E na próxima aula

Seu formulário de contato ainda não faz nada. Você preenche, clica em "Quero receber"… e a página só recarrega.

Na próxima aula: **JavaScript no formulário** — capturar o que o usuário digitou, validar antes de enviar, e mostrar mensagem de erro ou de sucesso na tela. É o último pedaço para a landing funcionar de ponta a ponta.

**Traga funcionando:** o menu hambúrguer abrindo e fechando.

---

*UC15 · Técnico em Informática · Senac-RS*
