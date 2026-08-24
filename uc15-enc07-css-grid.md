CSS Grid: layout em duas dimensões
**Quando uma linha não basta: linhas E colunas ao mesmo tempo**

**Duração:** 3h · **Editor:** VS Code · **Projeto:** landing Oportuni
**Referência:** SILVA, *CSS Grid Layout* · DEITEL, cap. 5 · MDN Grid · jogo: CSS Grid Garden

---

## Onde estamos

No Enc. 6 o Flexbox tirou os cards da pilha e colocou tudo lado a lado. Resolveu **uma dimensão** — ou linha, ou coluna. Hoje entra a ferramenta que trabalha nas **duas ao mesmo tempo**: o CSS Grid. É com ela que se monta a estrutura completa de uma página — cabeçalho, conteúdo, barra lateral, rodapé — e galerias que se organizam sozinhas em qualquer tela.

E tem o presente do dia: no fim da aula a turma vai escrever **uma linha de CSS** que deixa a galeria responsiva **sem nenhuma media query**. Guarde esse momento para o final.

---

## Setup Teams — antes da aula

**Class Notebook:** criar seção "Enc. 07 — CSS Grid" com páginas:
- `Grid vs Flexbox` — tabela comparativa (o aluno preenche junto)
- `Propriedades` — referência rápida de `grid-template-*`, `fr`, `repeat`, `gap`
- `Minha galeria` — onde o aluno cola o CSS da seção nova

**Atividades de Aula:** criar **"Enc. 07 — Galeria em Grid"** · prazo: final desta aula

**Reflect entrada** (postar 10 min antes):
> *"Você pesquisou: qual a diferença entre Flexbox e CSS Grid? Responda em uma frase — quando usar cada um?"*

---

## Abertura — Reflect + gancho · 15 min

Ler as respostas em voz alta. Vão aparecer variações de *"Flexbox é linha, Grid é tabela"*. Validar e refinar:

```
FLEXBOX → UMA dimensão  → uma linha OU uma coluna
GRID    → DUAS dimensões → linhas E colunas ao mesmo tempo
```

**Gancho visual — mostrar o problema:**

Abrir a landing atual. Perguntar:

> *"Vocês conseguiram três cards lado a lado com Flexbox. Agora imaginem que eu quero SEIS oportunidades: três em cima, três embaixo, todas do mesmo tamanho, alinhadas em linha e em coluna. Com Flexbox dá pra forçar com wrap — mas fica gambiarra, cada card com uma largura, alinhamento desalinhado. Com Grid isso é UMA declaração."*

Mostrar no navegador (F12 ou um exemplo pronto) uma grade 3×2 perfeita ao lado do wrap desalinhado. A diferença visual vende a aula sozinha.

---

## Conceito 1 — Container e itens, de novo · 20 min

Boa notícia para a turma: a lógica **pai e filhos** é a mesma do Flexbox. Muda a palavra e o poder.

```
┌────────── GRID CONTAINER (pai) ──────────┐
│  display: grid                            │
│  ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ item │ │ item │ │ item │   ← linha 1   │
│  └──────┘ └──────┘ └──────┘               │
│  ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ item │ │ item │ │ item │   ← linha 2   │
│  └──────┘ └──────┘ └──────┘               │
└───────────────────────────────────────────┘
     coluna 1   coluna 2   coluna 3
```

**A declaração mínima:**

```css
.container {
    display: grid;                          /* vira grade */
    grid-template-columns: 200px 200px 200px;  /* três colunas de 200px */
}
```

> *"Repare: eu não disse quantas LINHAS. O Grid cria as linhas sozinho conforme os itens vão chegando. Você define as colunas, ele resolve o resto. Isso se chama grid implícito."*

### Demonstração ao vivo mínima

Aplicar no `#categorias` (que hoje está com Flexbox) só para ver o efeito:

```css
#categorias {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    gap: 24px;
}
```

Salvar → os três cards viram uma grade rígida e perfeitamente alinhada. **Comentar:** ficou alinhado, mas ficou duro — 300px fixos não se adaptam. É exatamente o problema que a próxima unidade resolve.

---

## Conceito 2 — A unidade `fr` e o `repeat()` · 20 min

**`fr` = fração do espaço livre.** A unidade que só existe no Grid e é a razão de ele ser tão bom.

```css
grid-template-columns: 1fr 1fr 1fr;    /* três colunas iguais */
grid-template-columns: 2fr 1fr;        /* a primeira ocupa o dobro */
grid-template-columns: 250px 1fr;      /* fixa + flexível (menu + conteúdo) */
```

```
1fr 1fr 1fr    │████████│████████│████████│   três partes iguais
2fr 1fr        │████████████████│████████│    dobro e metade
250px 1fr      │██fixa██│██████resto██████│   clássico sidebar + conteúdo
```

> *"px é rígido: 300px são 300px, na TV ou no celular. `fr` é elástico: divide o espaço que sobrou. É a diferença entre fatiar a pizza com régua e fatiar em partes iguais, seja a pizza grande ou pequena."*

**`repeat()` — o atalho contra repetição:**

```css
/* estas duas linhas fazem exatamente a mesma coisa */
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-columns: repeat(4, 1fr);
```

Aplicar no `#categorias` e salvar:

```css
#categorias {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
```

Redimensionar a janela → as colunas encolhem e crescem juntas, sempre iguais. **Aqui a turma entende o `fr`.**

---

## ☕ Pausa · 10 min

---

## Conceito 3 — Linhas, `gap` e o grid implícito · 15 min

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 200px 200px;   /* altura explícita das linhas */
    gap: 24px;                          /* espaço entre linhas E colunas */
    row-gap: 32px;                      /* só entre linhas */
    column-gap: 16px;                   /* só entre colunas */
}
```

Três pontos que evitam dúvida depois:

- **`gap` é o mesmo do Flexbox** — mesma propriedade, mesmo comportamento. Um conceito já pago.
- **Não precisa declarar as linhas.** Se você define 3 colunas e joga 7 itens, o Grid cria 3 linhas sozinho. A última fica com um item só.
- **`grid-auto-rows`** controla a altura das linhas que o Grid cria automaticamente:

```css
grid-auto-rows: minmax(180px, auto);   /* no mínimo 180px, cresce se o conteúdo pedir */
```

---

## Conceito 4 — Posicionar itens: `span` e áreas · 20 min

Até aqui os itens caem em ordem. Agora o controle fino.

**`span` — ocupar mais de uma célula:**

```css
.card-destaque {
    grid-column: span 2;   /* ocupa 2 colunas */
    grid-row: span 2;      /* ocupa 2 linhas */
}
```

```
┌───────────────────┬────────┐
│                   │  item  │
│   DESTAQUE        ├────────┤
│   span 2 x 2      │  item  │
├────────┬──────────┼────────┤
│  item  │   item   │  item  │
└────────┴──────────┴────────┘
```

> *"É assim que sites de notícia fazem a manchete principal ocupar o dobro do espaço das outras. Uma linha de CSS."*

**`grid-template-areas` — desenhar o layout com palavras:**

Essa é a que costuma arrancar um "aaah" da turma. Mostrar, sem obrigar a usar hoje:

```css
.pagina {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        "cabecalho cabecalho"
        "menu      conteudo"
        "rodape    rodape";
    gap: 16px;
}

header  { grid-area: cabecalho; }
nav     { grid-area: menu; }
main    { grid-area: conteudo; }
footer  { grid-area: rodape; }
```

> *"Olhem o CSS. Ele é um DESENHO do layout. Você lê o código e enxerga a página. Nenhuma outra tecnologia de layout faz isso."*

---

## Conceito 5 — O truque do dia: grid responsivo sem media query · 10 min

Escrever no quadro e deixar lá até o fim da aula:

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Traduzir palavra por palavra:

```
repeat(     → repita
auto-fit,   → quantas colunas couberem (o navegador conta)
minmax(     → cada coluna entre...
250px,      → ...no mínimo 250px
1fr))       → ...e no máximo uma fração igual do espaço
```

> *"Leia como uma frase: 'crie quantas colunas couberem, cada uma com pelo menos 250px, dividindo o resto igualmente'. No monitor grande dá quatro colunas. No tablet, duas. No celular, uma. Sem media query. Sem JavaScript. Uma linha."*

Demonstrar redimensionando a janela devagar, do largo para o estreito. As colunas quebram sozinhas. **Este é o momento de impacto da aula — não corra.**

---

## Live coding — Grid na landing Oportuni · 35 min

### 1. Nova seção no HTML — galeria de oportunidades

Colar no `index.html`, depois da seção de categorias:

```html
<!-- Galeria de oportunidades: seis itens para exercitar o Grid -->
<section id="galeria">
    <h2>Oportunidades da semana</h2>

    <div class="grade-galeria">
        <article class="card-op destaque">
            <h3>Rodízio de pizza no Bom Fim</h3>
            <p>Terça e quarta, 30% off para quem reservar pelo app.</p>
        </article>

        <article class="card-op">
            <h3>Trilha guiada na Lomba</h3>
            <p>Sábado de manhã, saída às 7h.</p>
        </article>

        <article class="card-op">
            <h3>Corte + barba na Cidade Baixa</h3>
            <p>Agende online e pague menos.</p>
        </article>

        <article class="card-op">
            <h3>Feira de vinis no Centro</h3>
            <p>Domingo, entrada gratuita.</p>
        </article>

        <article class="card-op">
            <h3>Aula aberta de dança</h3>
            <p>Quinta à noite, sem custo.</p>
        </article>

        <article class="card-op">
            <h3>Café especial na Redenção</h3>
            <p>Segunda a sexta, combo por R$ 18.</p>
        </article>
    </div>
</section>
```

### 2. A grade — versão fixa primeiro

```css
/* ============ GALERIA EM GRID ============ */
.grade-galeria {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1000px;
    margin: 0 auto;
}

.card-op {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-top: 4px solid #1a5fb4;   /* azul da marca */
}

.card-op h3 {
    color: #172a45;
    margin-bottom: 8px;
}
```

Salvar → grade 3×2 perfeita. Comparar com o Flexbox do encontro anterior: **aqui as colunas se alinham também na vertical.** Apontar isso no navegador.

### 3. O card em destaque

```css
.destaque {
    grid-column: span 2;             /* ocupa duas colunas */
    border-top: 4px solid #ff8904;   /* laranja: é a oportunidade principal */
    background-color: #fff8f0;
}
```

Salvar → o primeiro card estica e os outros se reorganizam sozinhos. Ninguém mexeu nos outros cinco.

### 4. A virada responsiva

Trocar **uma linha** e salvar com a turma olhando:

```css
.grade-galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    max-width: 1000px;
    margin: 0 auto;
}
```

Redimensionar a janela → 3 colunas, 2 colunas, 1 coluna. **Parar aqui e deixar a reação acontecer.**

### 5. Rodapé em colunas

```css
footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    text-align: left;
    padding: 40px 20px;
    background-color: #172a45;
    color: white;
}
```

### 6. Bônus, se sobrar tempo — a página inteira em áreas

Mostrar (não precisa entregar) o esqueleto com `grid-template-areas` do Conceito 4 aplicado ao `body`. Serve como gancho de curiosidade e prepara o vocabulário de layout completo.

---

## Prática guiada — CSS Grid Garden · 15 min

```
https://cssgridgarden.com/#pt-br
```

> *"Mesma ideia do Flexbox Froggy, mas agora você rega cenouras. Vamos fazer os cinco primeiros níveis juntos e depois vocês avançam sozinhos."*

Projetar e resolver os primeiros níveis coletivamente, verbalizando o raciocínio: *"quantas colunas? qual delas eu quero pegar?"*

---

## Atividade individual · 20 min

**Instrução (Teams → Atividades de Aula):**

```
GALERIA EM GRID — LANDING OPORTUNI

Obrigatório:
[ ] Criar a seção <section id="galeria"> com 6 cards
[ ] Aplicar display: grid na grade
[ ] Usar repeat() e a unidade fr (nada de largura em px nas colunas)
[ ] gap entre os itens
[ ] Um card em destaque com grid-column: span 2
[ ] Deixar a grade responsiva com:
    repeat(auto-fit, minmax(250px, 1fr))
[ ] Testar redimensionando a janela — as colunas quebram sozinhas?

Desafio:
[ ] Colocar o rodapé em colunas usando Grid
[ ] Explicar no Class Notebook, em duas linhas, por que a
    galeria ficou em Grid e os cards de categoria podem
    seguir em Flexbox

Complete pelo menos o nível 12 do CSS Grid Garden.

Entrega: HTML + CSS no Teams até o final da aula.
```

Circular. Perguntas comuns:

**"Os cards ficaram um embaixo do outro."** → `display: grid` sem `grid-template-columns` cria **uma** coluna. Faltou definir as colunas.

**"Só apareceram 3 cards na linha e o resto sumiu."** → não sumiu, desceu. Rolar a página. O Grid criou a segunda linha sozinho.

**"O card destaque bagunçou tudo."** → conferir se o total de colunas comporta o span. Com 3 colunas e um `span 2`, sobra uma célula na linha — é esperado.

**"`auto-fit` e `auto-fill` são a mesma coisa?"** → quase. `auto-fit` estica os itens para preencher o espaço; `auto-fill` mantém colunas vazias. Para landing, use `auto-fit`.

---

## Fechamento — Reflect de saída · 10 min

Postar no Teams → Reflect:

> *"Quando você usaria Flexbox e quando usaria Grid? Dê um exemplo de cada um dentro da nossa landing Oportuni."*

**Tabela de consolidação — projetar no fechamento:**

| | **Flexbox** | **CSS Grid** |
|---|---|---|
| Dimensões | Uma (linha **ou** coluna) | Duas (linhas **e** colunas) |
| Ponto de partida | O conteúdo se organiza | O layout é definido antes |
| Melhor para | Menus, barras, grupos de botões, alinhar coisas | Galerias, cards em grade, layout da página |
| Na landing | Nav, header, redes do rodapé | Galeria de oportunidades, rodapé em colunas |

```
Regra de bolso:

Alinhar um punhado de coisas numa fila?  → FLEXBOX
Montar uma grade ou a página inteira?    → GRID

E eles convivem: um Grid pode ter um Flexbox dentro
de cada célula. Não é escolha de time, é escolha de tarefa.
```

---

## Para o próximo encontro

Aviso:

> *"Hoje a galeria já se adapta sozinha, mas o resto da landing ainda não. No celular, o header está grande demais, a fonte pequena demais e o hero desproporcional. Na próxima aula: **responsividade e media queries** — mobile first, breakpoints e o F12 no modo dispositivo. A landing vai ficar boa no celular de verdade. Tragam a galeria em Grid funcionando."*

Trazer respondido no Class Notebook:

> *"Abra a sua landing no celular (ou no F12 → modo dispositivo). Liste três coisas que ficaram ruins na tela pequena."*

---

## Perguntas prováveis em sala

**"Grid substitui o Flexbox?"**
Não. Resolvem problemas diferentes e trabalham juntos o tempo todo. Grid é o esqueleto da página, Flexbox é o alinhamento dentro de cada parte. É comum um card ser item de um Grid e ser, ele mesmo, um container Flexbox por dentro. Quem domina os dois escolhe a ferramenta certa em vez de forçar uma só.

**"Então o Flexbox que eu aprendi ontem foi perdido?"**
Nada. `gap`, `justify-content` e `align-items` funcionam no Grid também, com o mesmo comportamento. Você aprendeu vocabulário que serve nas duas ferramentas — foi economia, não desperdício.

**"Por que usar `fr` em vez de `%`?"**
Porcentagem não desconta o `gap`. Se você fizer três colunas de 33.33% com 24px de espaço entre elas, o total estoura a largura e aparece barra de rolagem horizontal. O `fr` divide o que **sobrou** depois do gap. Por isso ele existe.

**"Grid funciona em navegador antigo?"**
Em todos os navegadores modernos, sim, e há anos. Internet Explorer tinha uma versão antiga e incompatível — mas o IE está descontinuado. Em projeto novo, use Grid sem receio.

**"Quantas colunas eu devo usar?"**
Não existe número mágico, mas 12 colunas é a convenção do mercado (Bootstrap, Figma, design systems em geral) porque 12 divide bem por 2, 3, 4 e 6. Para a nossa landing, 3 e 4 resolvem. O importante é a grade ser consistente na página inteira.

**"Posso usar Grid dentro de Grid?"**
Pode. Chama-se grid aninhado e é normal em projeto real. Só tome cuidado com o excesso: se o CSS ficar difícil de ler, provavelmente o layout está mais complicado do que precisa.

---

## Mapa da aula

```
ENCONTRO 7 — CSS GRID                            3h

0:00  Reflect + gancho Flexbox vs Grid          15 min
0:15  Container, itens e grid-template-columns  20 min
0:35  A unidade fr + repeat()                   20 min
0:55  Pausa                                     10 min
1:05  Linhas, gap e grid implícito              15 min
1:20  span e grid-template-areas                20 min
1:40  auto-fit + minmax — o truque do dia       10 min
1:50  Live coding — galeria Oportuni            35 min
2:25  CSS Grid Garden                           15 min
2:40  Atividade individual + Reflect de saída   20 min
```

---

*UC15 · Técnico em Informática · Senac-RS · PTD v2*
