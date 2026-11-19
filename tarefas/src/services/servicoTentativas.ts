
export function esperar(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function executarComTentativas<T>(
  acao: () => Promise<T>,
  maxTentativas = 4
): Promise<T> {
  for (let i = 0; i < maxTentativas; i++) {
    try {
      return await acao();
    } catch (erro) {
      if (i === maxTentativas - 1) {
        throw erro;
      }

      const espera = 1000 * Math.pow(2, i);

      await esperar(espera);
    }
  }

  throw new Error('Falha após todas as tentativas.');
}
