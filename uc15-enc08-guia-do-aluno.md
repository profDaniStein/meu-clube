# Responsividade — guia do aluno
**UC15 · Encontro 8 · Landing Oportuni**

> Este material é seu. Consulte durante a aula, use para fazer a atividade e guarde para o projeto final. Não precisa decorar nada do que está aqui — precisa saber **onde procurar**.

---

## Onde você está na trilha

```
✅  Enc. 1–4   HTML — a ESTRUTURA
                tags, semântica, imagens, formulários
                → você aprendeu a dizer o que cada coisa É

✅  Enc. 5     CSS — a APARÊNCIA
                cores, fontes, box model
                → a página deixou de ser preto no branco

✅  Enc. 6     Flexbox — o ALINHAMENTO
                lado a lado, distribuição, gap
                → os elementos saíram da pilha

✅  Enc. 7     CSS Grid — a GRADE
                linhas e colunas ao mesmo tempo
                → você montou layout de verdade

👉  Enc. 8     RESPONSIVIDADE — a ADAPTAÇÃO
                a mesma página, boa em qualquer tela
                → é aqui que o site fica pronto para o mundo real

⬜  Enc. 9+    JavaScript — o COMPORTAMENTO
                a página deixa de ser cartaz e vira programa

⬜  Final      WordPress — publicar de verdade
```

Repare no desenho: cada encontro é uma camada em cima da anterior. Nada do que você aprendeu foi substituído. O Flexbox do Enc. 6 continua vivo dentro do Grid do Enc. 7, e os dois continuam vivos dentro das media queries de hoje.

---

## O problema de hoje

Mais da metade dos acessos à web no Brasil vem do celular. Ou seja: **a maioria das pessoas vai ver o seu site numa tela de 6 polegadas, não no monitor onde você o construiu.**

Seu site atual foi pensado para o monitor. No celular ele provavelmente tem alguns destes sintomas — você mesmo listou vários deles no dever de casa:

- o título fica desproporcional
- os cards ficam espremidos ou com sobra estranha
- o menu ocupa metade da tela
- aparece uma barra de rolagem **horizontal** (o clássico)
- alguma imagem estoura para fora
- o texto fica pequeno demais para ler

Nada disso é culpa sua. É o comportamento padrão de um site que ainda não recebeu as instruções de adaptação. Hoje você entrega essas instruções.

---

## As quatro camadas da responsividade

Guarde esta ordem — ela vale para qualquer projeto que você fizer daqui pra frente:

```
1. meta viewport       → sem isso, NADA funciona
2. unidades relativas  → rem, %, vw, clamp()
3. layout flexível     → flex-wrap, auto-fit, minmax
4. media queries       → só onde a ESTRUTURA muda
```

E o mais importante:

> **Quanto mais você resolve nas camadas 2 e 3, menos media query você precisa escrever.**
> Um CSS cheio de media queries geralmente é sinal de que o layout base é rígido demais. Poucas media queries = CSS maduro.

---

## Camada 1 — A meta viewport

Esta linha já está no `<head>` do seu HTML desde o começo do curso. Hoje você descobre o que ela faz:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```
width=device-width   → "use a largura REAL deste aparelho"
initial-scale=1.0    → "não aplique zoom ao abrir"
```

**Sem ela**, o celular finge ter 980px de largura e encolhe a página inteira por zoom — letra ilegível, o usuário tendo que pinçar a tela. E, pior: **as media queries são simplesmente ignoradas.**

> Primeiro item do checklist, sempre. Antes de investigar qualquer problema de responsividade, confira se essa linha está lá.

---

## Camada 2 — Unidades relativas

Parar de usar `px` em tudo já resolve metade do problema.

| Unidade | Relativa a quê | Quando usar |
|---|---|---|
| `px` | nada — é absoluta | bordas, sombras, detalhes finos |
| `%` | ao elemento **pai** | larguras dentro de containers |
| `rem` | à fonte **raiz** (16px) | **tipografia e espaçamentos** |
| `em` | à fonte do **próprio** elemento | padding interno de botões |
| `vw` / `vh` | 1% da largura / altura da tela | elementos que acompanham a tela |

```
1rem  = 16px        2rem = 32px         0.875rem = 14px
100vw = tela toda   50vh = metade da altura da tela
```

**Por que `rem` na tipografia:** se o usuário aumentar a fonte padrão do navegador — algo que muita gente com baixa visão faz — um site em `rem` acompanha, e um site em `px` fica travado. Responsividade e acessibilidade são a mesma conversa.

### `clamp()` — o coringa

```css
h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
}
```

```
clamp(  mínimo  ,  ideal  ,  máximo  )

1.8rem  → nunca menor que isso   (celular)
5vw     → cresce junto com a tela (o valor que "respira")
2.6rem  → nunca maior que isso   (monitor grande)
```

Uma linha, e o título fica proporcional em **todas** as telas — sem nenhuma media query. É o mesmo raciocínio do `minmax()` que você usou no Grid: define o intervalo e deixa o navegador calcular.

---

## Camada 3 — Layout que já se adapta sozinho

Você já escreveu isto no Enc. 7 e talvez nem tenha percebido o que ganhou:

```css
.grade-galeria {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

Sua galeria **já é responsiva**. Vai de três colunas para duas e para uma sozinha, e você não vai precisar tocar nela hoje. Mesma ideia com `flex-wrap: wrap` no Flexbox.

> Quando dá para resolver assim, resolva assim.

---

## Camada 4 — Media queries

### Anatomia

```css
@media (min-width: 768px) {
    /* este CSS SÓ vale se a tela tiver 768px ou MAIS */
    .grade-galeria {
        gap: 32px;
    }
}
```

```
@media           → "atenção, condição de mídia"
(min-width: ...) → a condição a ser testada
{ ... }          → o CSS que só entra em ação se for verdadeira
```

### Mobile first — a ordem que você vai usar

Existem duas estratégias. Você vai usar a segunda, que é o padrão de mercado:

```css
/* ❌ DESKTOP FIRST — escreve pro grande, remenda pro pequeno */
.card { width: 400px; }
@media (max-width: 768px) {
    .card { width: 100%; }
}

/* ✅ MOBILE FIRST — escreve pro pequeno, melhora pro grande */
.card { width: 100%; }
@media (min-width: 768px) {
    .card { width: 400px; }
}
```

**Regra para gravar:**

```
mobile first  → min-width  → "A PARTIR de tal largura, faça assim"
desktop first → max-width  → "ATÉ tal largura, faça assim"
```

Mobile first ganhou porque o CSS base fica mais simples (uma coluna empilhada é o comportamento natural do HTML), porque celular em rede ruim carrega menos, e porque começar pela tela mais apertada obriga você a decidir o que é essencial de verdade.

⚠️ **Ordem no arquivo importa:** as media queries vão **no fim** do CSS, depois das regras base. Em CSS, quando duas regras têm a mesma força, **a de baixo vence**. Media query no topo do arquivo é o erro nº 1 desta aula.

### Breakpoints — e a verdade sobre eles

| Largura | Aparelho típico | Papel na landing |
|---|---|---|
| até 480px | celular | **base** — sem media query |
| 768px | tablet | duas colunas |
| 1024px | notebook | layout completo |
| 1440px+ | monitor grande | limitar largura máxima |

> **Não existe lista oficial de breakpoints.** Esses números viraram convenção porque combinam com aparelhos comuns. O critério profissional de verdade é outro: **coloque o breakpoint onde o SEU layout quebra.** Estica a janela devagar, vê onde fica feio, olha o número, põe a media query ali. O layout manda — não a tabela.

---

## Sua ferramenta de trabalho: F12 → modo dispositivo

```
1. F12 para abrir as ferramentas do navegador
2. Ctrl + Shift + M  (ou clique no ícone de celular/tablet)
3. Escolha o aparelho no menu de cima
   → iPhone SE (375px) é o mais apertado: se funciona nele, funciona
4. Arraste a borda devagar e OLHE O NÚMERO da largura no topo
   → é assim que você descobre onde seu layout quebra
5. O ícone de rotação testa a tela deitada
```

O número no canto superior é a informação mais útil da tela. Anote em que largura seu layout fica feio: aquele número é o seu breakpoint. Não é chute, é medição.

---

## Código de referência

Cole no **fim** do seu `style.css` e ajuste ao seu projeto.

### Base — pensada para o celular

```css
/* Tipografia fluida */
#hero h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
}

.subtitulo {
    font-size: clamp(1rem, 3vw, 1.25rem);
}

/* Padding menor: 20px de cada lado comem muito de uma tela de 375px */
section {
    padding: 32px 16px;
}

/* Categorias empilhadas por padrão */
#categorias {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

/* O card destaque NÃO estica no celular:
   pedir "span 2" numa grade de UMA coluna é um pedido impossível */
.destaque {
    grid-column: auto;
}

/* Menu compacto */
nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    font-size: 0.95rem;
}

footer {
    text-align: center;
}
```

### A partir do tablet

```css
@media (min-width: 768px) {

    section {
        padding: 40px 20px;
    }

    /* Categorias voltam para a linha */
    #categorias {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }

    /* Agora sim o destaque ocupa duas colunas */
    .destaque {
        grid-column: span 2;
    }

    nav {
        gap: 24px;
        font-size: 1rem;
    }

    footer {
        text-align: left;
    }
}
```

### Limite para monitor grande

```css
@media (min-width: 1440px) {
    section {
        max-width: 1200px;
    }
}
```

> Sem esse limite, num monitor ultrawide o texto atravessa a tela inteira e o olho perde a linha ao voltar. Responsividade também é proteger o layout do **excesso** de espaço, não só da falta.

---

## Checklist da entrega

```
OBRIGATÓRIO

[ ] meta viewport conferida no <head>
[ ] CSS base escrito pensando no CELULAR (mobile first)
[ ] Pelo menos DUAS media queries com min-width
[ ] Media queries no FIM do arquivo
[ ] h1 com clamp() ou unidade relativa
[ ] Cards de categoria: empilhados no celular, lado a lado no desktop
[ ] .destaque corrigido no mobile (grid-column: auto)
[ ] ZERO barra de rolagem horizontal em 375px

TESTE NOS TRÊS TAMANHOS (F12 → modo dispositivo)

    375px   iPhone SE   → tudo empilhado e legível?
    768px   iPad        → duas colunas?
    1440px  desktop     → layout completo?

NO CLASS NOTEBOOK

[ ] Dois prints: mobile ANTES e mobile DEPOIS
[ ] Seus breakpoints e POR QUE você escolheu esses números
```

---

## Deu errado? Comece por aqui

**"Minha media query não faz nada."**
Três suspeitos, nesta ordem:
1. Falta a meta viewport no `<head>` — sem ela o celular ignora as media queries.
2. A media query está **antes** da regra base no arquivo. Em CSS, a de baixo vence. Mova para o fim.
3. Tem um `;` sobrando depois do `)`. Confira: `@media (min-width: 768px) {` — sem ponto e vírgula.

**"Tem uma barra de rolagem lateral e eu não acho o motivo."**
Cole isto temporariamente no topo do CSS e veja qual bloco fica com contorno vermelho:
```css
* { outline: 1px solid red; }
```
O culpado é quase sempre uma largura fixa em `px` maior que a tela, uma imagem sem `max-width: 100%`, ou um `padding` somado a `width: 100%` sem `box-sizing: border-box`. Apague o `outline` depois.

**"Os cards ficaram um do lado do outro no celular, espremidos."**
Faltou `flex-direction: column` na base, ou o `min-width` dos cards está pequeno demais. No celular, uma coluna.

**"O card destaque bagunçou a galeria no celular."**
É o `grid-column: span 2`. Na tela pequena existe uma coluna só. Coloque `grid-column: auto` na base e devolva o `span 2` dentro da media query.

**"Mudou no F12 mas no celular real continua feio."**
O modo dispositivo simula o tamanho da tela, não o aparelho inteiro. Vale testar no celular de verdade quando possível.

**"Preciso de media query para tudo?"**
Não. `clamp`, `minmax`, `auto-fit`, `%` e `flex-wrap` resolvem boa parte sozinhos. Media query é para quando a **estrutura** muda — de uma coluna para três, de empilhado para lado a lado. Para tamanho, prefira unidades relativas.

---

## Glossário rápido

| Termo | O que é |
|---|---|
| **Responsividade** | A capacidade de a página se adaptar ao tamanho da tela |
| **Viewport** | A área visível da página no aparelho |
| **Mobile first** | Escrever o CSS para a tela pequena primeiro e ir acrescentando |
| **Breakpoint** | A largura em que o layout muda de estrutura |
| **Media query** | O bloco `@media` que aplica CSS sob uma condição |
| **Unidade relativa** | Medida que depende de outra coisa (`rem`, `%`, `vw`) em vez de ser fixa |
| **`clamp()`** | Define mínimo, valor ideal e máximo em uma linha só |

---

## Para explorar depois da aula

- **MDN — Media queries:** `developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries`
- **Teste real:** abra sites que você usa no F12 e vá estreitando. Veja onde eles quebram e o que muda. Todo site profissional está fazendo exatamente o que você fez hoje.
- **Desafio opcional:** descubra o que faz `@media (prefers-color-scheme: dark)` — é como sites detectam o modo escuro do sistema.

---

## E na próxima aula

Repare numa coisa: mesmo depois de tudo isso, no celular o menu ainda quebra em duas linhas e come um pedaço da tela. Todo site profissional resolve isso com o **menu hambúrguer** — as três listrinhas que abrem e fecham.

E aqui a gente bate num limite: **o CSS não sabe reagir a um clique.** Ele sabe estilizar, não sabe decidir. Para o menu abrir e fechar, é preciso a terceira linguagem da web.

**Traga pesquisado:** qual a diferença entre HTML, CSS e JavaScript? Uma frase para cada um.

---

*UC15 · Técnico em Informática · Senac-RS*
