const TAMANHO = 6;

export function validarTabuleiro(tabuleiro) {
  if (!Array.isArray(tabuleiro) || tabuleiro.length !== TAMANHO ||
      tabuleiro.some(linha => !Array.isArray(linha) || linha.length !== TAMANHO ||
        linha.some(valor => valor !== null && valor !== 0 && valor !== 1))) {
    return false;
  }

  const colunas = Array.from({ length: TAMANHO }, (_, indice) =>
    tabuleiro.map(linha => linha[indice])
  );

  for (const grupo of [tabuleiro, colunas]) {
    const completas = new Set();

    for (const linha of grupo) {
      const zeros = linha.filter(valor => valor === 0).length;
      const uns = linha.filter(valor => valor === 1).length;

      if (zeros > 3 || uns > 3) return false;

      for (let i = 0; i <= TAMANHO - 3; i++) {
        if (linha[i] !== null &&
            linha[i] === linha[i + 1] &&
            linha[i] === linha[i + 2]) {
          return false;
        }
      }

      if (!linha.includes(null)) {
        const chave = linha.join('');
        if (completas.has(chave)) return false;
        completas.add(chave);
      }
    }
  }

  return true;
}

export class SudokuBinario {
  #tabuleiro;
  #fixas;

  constructor(inicial = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(null))) {
    if (!validarTabuleiro(inicial)) {
      throw new RangeError('Tabuleiro invalido');
    }

    this.#tabuleiro = inicial.map(linha => [...linha]);
    this.#fixas = inicial.map(linha => linha.map(valor => valor !== null));
  }

  jogar(linha, coluna, valor) {
    if (![linha, coluna].every(numero =>
      Number.isInteger(numero) && numero >= 0 && numero < TAMANHO)) {
      throw new RangeError('Coordenada invalida');
    }

    if (this.#fixas[linha][coluna]) {
      throw new Error('Pista fixa');
    }

    if (valor !== null && valor !== 0 && valor !== 1) {
      throw new RangeError('Use 0, 1 ou null');
    }

    const novoTabuleiro = this.tabuleiro;
    novoTabuleiro[linha][coluna] = valor;

    if (!validarTabuleiro(novoTabuleiro)) {
      throw new Error('Jogada viola as regras');
    }

    this.#tabuleiro = novoTabuleiro;
  }

  get tabuleiro() {
    return this.#tabuleiro.map(linha => [...linha]);
  }

  get concluido() {
    return this.#tabuleiro.every(linha => !linha.includes(null));
  }
}
