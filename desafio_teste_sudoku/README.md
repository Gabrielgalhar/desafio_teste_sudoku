# Sudoku Binário 6x6 - Testes em JavaScript

**Colaborador:** Gabriel Galhardone Felipe.

**Identificação acadêmica:** NOME: Gabriel Galhardone Felipe. RA:24021292-2. TURMA: ESOFT-6S-B.

## Especificação do desafio

Base: [desafios da disciplina](https://github.com/JoaoChoma/teste_software_2026/blob/main/desafios.md). Implementação e testes em JavaScript, conforme solicitado. Este projeto é independente e deve ser publicado em um repositório chamado **desafio_teste_sudoku**.

Tabuleiro 6 x 6 com os símbolos 0 e 1. Cada linha e coluna completa deve conter três zeros e três uns; não pode haver três valores iguais consecutivos horizontalmente ou verticalmente; duas linhas completas não podem ser iguais, assim como duas colunas completas.

Uma casa vazia é representada por `null`. Tabuleiros parciais são aceitos se não violarem as restrições já observáveis. Linhas ou colunas ainda incompletas não são consideradas duplicatas entre si. O tabuleiro é concluído quando todas as casas estão preenchidas e válidas.

Pistas recebidas no construtor são fixas. Casas editáveis podem receber 0, 1 ou `null` para apagar. Uma jogada inválida lança exceção e preserva integralmente o estado anterior. A entrada e as consultas são copiadas para impedir alterações externas.

O escopo é validar tabuleiros e jogadas; não inclui um solucionador, gerador de quebra-cabeças ou garantia de solução única. O enunciado exige testes do sudoku binário, e não um algoritmo de geração.

## Executar

Requisito: Node.js 22 ou superior, com npm. O projeto não possui dependências externas; não é necessário executar `npm install`.

```bash
npm test
npm run coverage
```

O primeiro comando executa todos os testes com `node:test` e `node:assert/strict`. O segundo acrescenta o relatório de cobertura nativo do Node. O processo termina com código diferente de zero se algum teste falhar.

## Exemplo rápido de uso

```javascript
import { SudokuBinario } from './src/sudoku.js';
const jogo = new SudokuBinario();
jogo.jogar(0, 0, 1);
jogo.jogar(0, 1, 1);
// jogo.jogar(0, 2, 1) lançaria uma exceção: três uns consecutivos.
console.log(jogo.tabuleiro[0]); // [1, 1, null, null, null, null]
```

Os exemplos são executados como módulos ES, em um arquivo `.js` dentro deste projeto. A lógica fica em [src/sudoku.js](src/sudoku.js) e os testes em [test/sudoku.test.js](test/sudoku.test.js).

## Casos de teste

Cada teste prepara uma partida independente, executa uma ação pública do motor e compara o resultado ou o estado esperado. Operações inválidas são verificadas com `assert.throws`; quando relevante, o estado anterior e posterior também é comparado. Os testes não substituem a implementação por mocks.

| Caso | Comportamento verificado |
|---|---|
| CT01 | aceita tabuleiro 6x6 vazio e incompleto |
| CT02 | aceita solucao balanceada, sem trincas e sem duplicatas |
| CT03 | rejeita dimensoes e valores invalidos |
| CT04 | rejeita tres valores iguais consecutivos na linha |
| CT05 | rejeita tres valores iguais consecutivos na coluna |
| CT06 | rejeita quatro ocorrencias do mesmo valor em uma linha |
| CT07 | rejeita quatro ocorrencias do mesmo valor em uma coluna |
| CT08 | rejeita linhas completas iguais |
| CT09 | rejeita colunas completas iguais |
| CT10 | preserva pistas fixas e copia a entrada |
| CT11 | jogada invalida nao altera o tabuleiro |
| CT12 | permite apagar celula editavel e protege a consulta |
| CT13 | rejeita indices e simbolos invalidos |
| CT14 | reconhece a conclusao ao preencher a ultima casa |

## Evidências da execução

Execução em 10/11/2026, Node.js 22.19.0: **14 testes aprovados, zero falhas, zero ignorados**. Saída completa em [evidencias/testes.log](evidencias/testes.log).

Cobertura do arquivo de produção: **100.00% de linhas, 100.00% de ramificações e 100.00% de funções**. Os percentuais são do arquivo `src/sudoku.js`; não foi usada a média que inclui o código dos testes. Cobertura indica código exercitado e não prova ausência de defeitos ou atendimento de variantes não especificadas.

## Organização e entrega

`src/` contém o motor do jogo e `test/` contém os casos automatizados. As evidências são geradas no terminal durante a execução dos comandos de teste. O projeto não exige navegador, banco ou interface gráfica. Há uma configuração de GitHub Actions para repetir os testes a cada push ou pull request.

O professor exige um repositório por desafio e aceita no máximo cinco para avaliação. Este pacote permite revisar o projeto individualmente antes de escolher quais cinco serão enviados. Não há histórico de contribuição artificial: commits devem registrar as contribuições reais dos integrantes.

## Evidências geradas durante a execução

O projeto é entregue sem a pasta `evidencias/` e sem resultados previamente gerados.

Ao executar:

```powershell
npm test
```

o projeto executa os testes e cria `evidencias/testes.log` com a saída real daquela execução.

Ao executar:

```powershell
npm run coverage
```

o projeto executa os testes com cobertura e cria `evidencias/cobertura.log` com a saída real da execução.

As evidências, portanto, não são pré-preenchidas no ZIP. Elas são produzidas somente depois que os comandos são executados.
