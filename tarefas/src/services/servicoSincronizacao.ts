
import type { SQLiteDatabase } from 'expo-sqlite';
import { verificarConexao } from './servicoRede';
import { executarComTentativas } from './servicoTentativas';

export async function sincronizar(db: SQLiteDatabase) {
  const conectado = await verificarConexao();

  if (!conectado) return false;

  const pendentes = await db.getAllAsync<{
    id: number;
    tarefa_id: number;
    tipo: string;
    dados: string;
  }>(
    'SELECT * FROM fila_sincronizacao ORDER BY id'
  );

  for (const operacao of pendentes) {
    try {
      await executarComTentativas(async () => {
        // Simulação: nenhum servidor recebe os dados.
        console.log('Enviando operação simulada:', operacao);

        await new Promise(resolve => setTimeout(resolve, 500));
      });

      // Remove somente após a simulação terminar.
      await db.runAsync(
        'DELETE FROM fila_sincronizacao WHERE id = ?',
        operacao.id
      );
    } catch {
      return false;
    }
  }

  return true;
}
