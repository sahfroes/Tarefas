import { useCallback, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { adicionar, alternar, listar, listarCategorias, remover, type Categoria, type Tarefa } from '../db/db';
import { s } from '../estilo';

export default function Tarefas() {
  const db = useSQLiteContext();
  const [itens, setItens] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [texto, setTexto] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    setItens(await listar(db));
    const cats = await listarCategorias(db);
    setCategorias(cats);
    // Se a categoria selecionada foi apagada, volta para "sem categoria".
    setCategoriaId((atual) => (cats.some((c) => c.id === atual) ? atual : null));
  }, [db]);

  // As abas ficam montadas; useFocusEffect recarrega toda vez que esta aba ganha foco
  // (assim uma categoria criada na outra aba aparece aqui).
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function salvar() {
    const titulo = texto.trim();
    if (!titulo) return;
    await adicionar(db, titulo, categoriaId);
    setTexto('');
    await carregar();
  }

  async function marcar(id: number) {
    await alternar(db, id);
    await carregar();
  }

  async function apagar(id: number) {
    await remover(db, id);
    await carregar();
  }

  const opcoes: { id: number | null; nome: string }[] = [{ id: null, nome: 'Sem categoria' }, ...categorias];

  return (
    <View style={s.tela}>
      <View style={s.linha}>
        <TextInput style={s.input} value={texto} onChangeText={setTexto} placeholder="Nova tarefa" onSubmitEditing={salvar} />
        <Pressable style={s.botao} onPress={salvar}>
          <Text style={s.botaoTxt}>Adicionar</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chips}>
        {opcoes.map((c) => {
          const ativo = c.id === categoriaId;
          return (
            <Pressable key={c.id ?? 'nenhuma'} onPress={() => setCategoriaId(c.id)} style={[s.chip, ativo && s.chipOn]}>
              <Text style={ativo ? s.chipTxtOn : s.chipTxt}>{c.nome}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={itens}
        keyExtractor={(t) => String(t.id)}
        ListEmptyComponent={<Text style={s.vazio}>Nenhuma tarefa ainda.</Text>}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Pressable style={s.itemTexto} onPress={() => marcar(item.id)}>
              <Text style={[s.texto, item.feita === 1 && s.feita]}>{item.titulo}</Text>
              {item.categoria && <Text style={s.pequeno}>{item.categoria}</Text>}
            </Pressable>
            <Pressable onPress={() => apagar(item.id)}>
              <Text style={s.apagar}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}