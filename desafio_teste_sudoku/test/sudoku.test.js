import test from 'node:test';
import assert from 'node:assert/strict';
import { SudokuBinario, validarTabuleiro } from '../src/sudoku.js';

const criarVazio = () => Array.from({ length: 6 }, () => Array(6).fill(null));

const solucaoValida = [
  [0, 0, 1, 0, 1, 1],
  [0, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 1]
];

test('CT01 - aceita tabuleiro vazio ou incompleto', () => {
  assert.equal(validarTabuleiro(criarVazio()), true);
  assert.equal(new SudokuBinario().concluido, false);
});

test('CT02 - aceita uma solucao completa e valida', () => {
  assert.equal(validarTabuleiro(solucaoValida), true);
  assert.equal(new SudokuBinario(solucaoValida).concluido, true);
});

test('CT03 - recusa dimensoes e valores fora da regra', () => {
  const casos = [
    [],
    null,
    Array(6).fill([]),
    Array(6).fill(Array(6).fill(2))
  ];

  for (const caso of casos) {
    assert.equal(validarTabuleiro(caso), false);
  }

  assert.throws(() => new SudokuBinario([]), RangeError);
});

test('CT04 - recusa tres valores iguais em sequencia na linha', () => {
  const tabuleiro = criarVazio();
  tabuleiro[0] = [0, 0, 0, null, null, null];
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT05 - recusa tres valores iguais em sequencia na coluna', () => {
  const tabuleiro = criarVazio();
  [0, 1, 2].forEach(linha => { tabuleiro[linha][5] = 1; });
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT06 - recusa quatro ocorrencias do mesmo valor na linha', () => {
  const tabuleiro = criarVazio();
  tabuleiro[0] = [0, 0, 1, 0, null, 0];
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT07 - recusa quatro ocorrencias do mesmo valor na coluna', () => {
  const tabuleiro = criarVazio();
  [0, 1, 3, 5].forEach(linha => { tabuleiro[linha][0] = 1; });
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT08 - recusa linhas completas repetidas', () => {
  const tabuleiro = criarVazio();
  tabuleiro[0] = [...solucaoValida[0]];
  tabuleiro[3] = [...solucaoValida[0]];
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT09 - recusa colunas completas repetidas', () => {
  const tabuleiro = criarVazio();
  solucaoValida[0].forEach((valor, linha) => {
    tabuleiro[linha][0] = valor;
    tabuleiro[linha][3] = valor;
  });
  assert.equal(validarTabuleiro(tabuleiro), false);
});

test('CT10 - mantem pistas e protege a entrada original', () => {
  const entrada = criarVazio();
  entrada[0][0] = 1;

  const jogo = new SudokuBinario(entrada);
  entrada[0][0] = 0;

  assert.equal(jogo.tabuleiro[0][0], 1);
  assert.throws(() => jogo.jogar(0, 0, 0));
  assert.throws(() => jogo.jogar(0, 0, null));
});

test('CT11 - jogada invalida preserva o estado anterior', () => {
  const jogo = new SudokuBinario();
  jogo.jogar(0, 0, 1);
  jogo.jogar(0, 1, 1);

  const antes = jogo.tabuleiro;
  assert.throws(() => jogo.jogar(0, 2, 1));
  assert.deepEqual(jogo.tabuleiro, antes);
});

test('CT12 - permite apagar casa editavel e protege a consulta', () => {
  const jogo = new SudokuBinario();
  jogo.jogar(0, 0, 1);

  const consulta = jogo.tabuleiro;
  consulta[0][0] = 0;
  assert.equal(jogo.tabuleiro[0][0], 1);

  jogo.jogar(0, 0, null);
  assert.equal(jogo.tabuleiro[0][0], null);
});

test('CT13 - recusa coordenadas e simbolos invalidos', () => {
  const jogo = new SudokuBinario();
  const casos = [
    [-1, 0, 0],
    [6, 0, 0],
    [0, 6, 1],
    [0.5, 0, 1],
    [0, 0, 2],
    [0, 0, '1']
  ];

  for (const [linha, coluna, valor] of casos) {
    assert.throws(() => jogo.jogar(linha, coluna, valor), RangeError);
  }
});

test('CT14 - identifica a conclusao ao preencher a ultima casa', () => {
  const entrada = solucaoValida.map(linha => [...linha]);
  entrada[5][5] = null;

  const jogo = new SudokuBinario(entrada);
  assert.equal(jogo.concluido, false);

  jogo.jogar(5, 5, 1);
  assert.equal(jogo.concluido, true);
});
