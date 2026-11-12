import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const cobertura = process.argv[2] === 'coverage';
const comando = cobertura
  ? ['--test', '--experimental-test-coverage']
  : ['--test'];

mkdirSync('evidencias', { recursive: true });

const inicio = new Date();
let saida = '';

const processo = spawn(process.execPath, comando, { stdio: ['inherit', 'pipe', 'pipe'] });

processo.stdout.on('data', (dados) => {
  const texto = dados.toString();
  saida += texto;
  process.stdout.write(texto);
});

processo.stderr.on('data', (dados) => {
  const texto = dados.toString();
  saida += texto;
  process.stderr.write(texto);
});

processo.on('close', (codigo) => {
  const fim = new Date();
  const nome = cobertura ? 'cobertura.log' : 'testes.log';
  const cabecalho = [
    'EVIDÊNCIA DE EXECUÇÃO - Sudoku Binário 6x6',
    `Data/hora de início: ${inicio.toLocaleString('pt-BR')}`,
    `Data/hora de término: ${fim.toLocaleString('pt-BR')}`,
    `Comando: npm run ${cobertura ? 'coverage' : 'test'}`,
    `Código de saída: ${codigo}`,
    '',
    '--- SAÍDA REAL DO NODE.JS ---',
    ''
  ].join('\n');

  writeFileSync(`evidencias/${nome}`, cabecalho + saida, 'utf8');

  console.log('');
  console.log(`Evidência gerada em: evidencias/${nome}`);
  console.log(codigo === 0 ? 'Execução concluída com sucesso.' : 'A execução terminou com falhas.');

  process.exitCode = codigo;
});
