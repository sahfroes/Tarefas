import type { SQLiteDatabase } from 'expo-sqlite';

export type Categoria = { id: number; nome: string };
export type Tarefa = {
  id: number;
  titulo: string;
  feita: number;
  categoria_id: number | null;
  categoria: string | null; // nome, vindo do JOIN
};
export type Resumo = { categoria: string; total: number; feitas: number };

// Roda toda vez que o banco abre. PRAGMA user_version guarda a versão do esquema.
export async function migrar(db: SQLiteDatabase) {
  // Vale por conexão e vem desligado no SQLite: sem isto o REFERENCES é ignorado.
  await db.execAsync('PRAGMA foreign_keys = ON');

  const r = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let atual = r?.user_version ?? 0;

  if (atual === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        feita INTEGER NOT NULL DEFAULT 0
      );
      PRAGMA user_version = 1;
    `);
    atual = 1;
  }
  if (atual === 1) {
    // Transação: ou tudo é aplicado (inclusive o user_version), ou nada.
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE categorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL UNIQUE COLLATE NOCASE
        );
        ALTER TABLE tarefas ADD COLUMN categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL;
        PRAGMA user_version = 2;
      `);
    });
    atual = 2;
  }
}

// ---- tarefas ----
export const listar = (db: SQLiteDatabase) =>
  db.getAllAsync<Tarefa>(`
    SELECT t.id, t.titulo, t.feita, t.categoria_id, c.nome AS categoria
    FROM tarefas t LEFT JOIN categorias c ON c.id = t.categoria_id
    ORDER BY t.id DESC`);

export const adicionar = (db: SQLiteDatabase, titulo: string, categoriaId: number | null) =>
  db.runAsync('INSERT INTO tarefas (titulo, categoria_id) VALUES (?, ?)', titulo, categoriaId);

export const alternar = (db: SQLiteDatabase, id: number) =>
  db.runAsync('UPDATE tarefas SET feita = 1 - feita WHERE id = ?', id);

export const remover = (db: SQLiteDatabase, id: number) =>
  db.runAsync('DELETE FROM tarefas WHERE id = ?', id);

// ---- categorias ----
export const listarCategorias = (db: SQLiteDatabase) =>
  db.getAllAsync<Categoria>('SELECT * FROM categorias ORDER BY nome');

// Lança erro se o nome já existir (UNIQUE).
export const adicionarCategoria = (db: SQLiteDatabase, nome: string) =>
  db.runAsync('INSERT INTO categorias (nome) VALUES (?)', nome);

// As tarefas da categoria ficam sem categoria (ON DELETE SET NULL).
export const removerCategoria = (db: SQLiteDatabase, id: number) =>
  db.runAsync('DELETE FROM categorias WHERE id = ?', id);

// ---- resumo ----
export const resumo = (db: SQLiteDatabase) =>
  db.getAllAsync<Resumo>(`
    SELECT COALESCE(c.nome, 'Sem categoria') AS categoria,
           COUNT(*) AS total,
           SUM(t.feita) AS feitas
    FROM tarefas t LEFT JOIN categorias c ON c.id = t.categoria_id
    GROUP BY t.categoria_id
    ORDER BY categoria`);