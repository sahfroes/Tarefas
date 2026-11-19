
import type { SQLiteDatabase } from 'expo-sqlite';

export type Categoria = {
  id: number;
  nome: string;
};

export type Tarefa = {
  id: number;
  titulo: string;
  quantidade: number;
  observacao: string | null;
  feita: number;
  categoria_id: number | null;
  categoria: string | null;
};

export type Resumo = {
  categoria: string;
  total: number;
  feitas: number;
};

// Criação e atualização do banco.
export async function migrar(db: SQLiteDatabase) {
  await db.execAsync('PRAGMA foreign_keys = ON');

  const versao = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );

  let atual = versao?.user_version ?? 0;

  if (atual === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE COLLATE NOCASE
      );

      CREATE TABLE tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        feita INTEGER NOT NULL DEFAULT 0,
        categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL
      );

      PRAGMA user_version = 2;
    `);

    atual = 2;
  }

  if (atual === 1) {
    await db.execAsync(`
      CREATE TABLE categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE COLLATE NOCASE
      );

      ALTER TABLE tarefas ADD COLUMN categoria_id INTEGER
      REFERENCES categorias(id) ON DELETE SET NULL;

      PRAGMA user_version = 2;
    `);

    atual = 2;
  }

  if (atual === 2) {
    await db.execAsync(`
      ALTER TABLE tarefas ADD COLUMN quantidade INTEGER NOT NULL DEFAULT 1;
      ALTER TABLE tarefas ADD COLUMN observacao TEXT;
      ALTER TABLE tarefas ADD COLUMN atualizado_em TEXT;

      CREATE TABLE fila_sincronizacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tarefa_id INTEGER NOT NULL,
        tipo TEXT NOT NULL,
        dados TEXT NOT NULL,
        criado_em TEXT NOT NULL
      );

      PRAGMA user_version = 3;
    `);
  }
}

// Lista tarefas.
export const listar = (db: SQLiteDatabase) =>
  db.getAllAsync<Tarefa>(`
    SELECT t.*, c.nome AS categoria
    FROM tarefas t
    LEFT JOIN categorias c ON c.id = t.categoria_id
    ORDER BY t.id DESC
  `);

// Busca uma tarefa.
export const buscarTarefa = (db: SQLiteDatabase, id: number) =>
  db.getFirstAsync<Tarefa>(`
    SELECT t.*, c.nome AS categoria
    FROM tarefas t
    LEFT JOIN categorias c ON c.id = t.categoria_id
    WHERE t.id = ?
  `, id);

// Adiciona tarefa.
export const adicionar = (
  db: SQLiteDatabase,
  titulo: string,
  quantidade: number,
  observacao: string,
  categoriaId: number | null
) =>
  db.runAsync(`
    INSERT INTO tarefas
    (titulo, quantidade, observacao, categoria_id, atualizado_em)
    VALUES (?, ?, ?, ?, ?)
  `,
    titulo,
    quantidade,
    observacao,
    categoriaId,
    new Date().toISOString()
  );

// Edita tarefa.
export const editar = (
  db: SQLiteDatabase,
  id: number,
  titulo: string,
  quantidade: number,
  observacao: string,
  categoriaId: number | null
) =>
  db.runAsync(`
    UPDATE tarefas
    SET titulo = ?, quantidade = ?, observacao = ?,
        categoria_id = ?, atualizado_em = ?
    WHERE id = ?
  `,
    titulo,
    quantidade,
    observacao,
    categoriaId,
    new Date().toISOString(),
    id
  );

// Marca como concluída.
export const alternar = (db: SQLiteDatabase, id: number) =>
  db.runAsync(
    'UPDATE tarefas SET feita = 1 - feita WHERE id = ?',
    id
  );

// Exclui tarefa.
export const remover = (db: SQLiteDatabase, id: number) =>
  db.runAsync('DELETE FROM tarefas WHERE id = ?', id);

// Categorias.
export const listarCategorias = (db: SQLiteDatabase) =>
  db.getAllAsync<Categoria>(
    'SELECT * FROM categorias ORDER BY nome'
  );

export const adicionarCategoria = (
  db: SQLiteDatabase,
  nome: string
) =>
  db.runAsync(
    'INSERT INTO categorias (nome) VALUES (?)',
    nome
  );

export const removerCategoria = (
  db: SQLiteDatabase,
  id: number
) =>
  db.runAsync(
    'DELETE FROM categorias WHERE id = ?',
    id
  );

// Estatísticas.
export const resumo = (db: SQLiteDatabase) =>
  db.getAllAsync<Resumo>(`
    SELECT
      COALESCE(c.nome, 'Sem categoria') AS categoria,
      COUNT(*) AS total,
      SUM(t.feita) AS feitas
    FROM tarefas t
    LEFT JOIN categorias c ON c.id = t.categoria_id
    GROUP BY t.categoria_id
    ORDER BY categoria
  `);
