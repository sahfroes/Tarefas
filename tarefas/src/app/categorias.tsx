import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { adicionarCategoria, listarCategorias, removerCategoria, type Categoria } from '../db/db';
import { s } from '../estilo';

export default function Categorias() {
  const db = useSQLiteContext();
  const [itens, setItens] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');

  const carregar = useCallback(async () => {
    setItens(await listarCategorias(db));
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function salvar() {
    const n = nome.trim();
    if (!n) return;
    try {
      await adicionarCategoria(db, n);
      setNome('');
      await carregar();
    } catch {
      // ponytail: qualquer erro vira "já existe"; o esperado é a violação do UNIQUE.
      Alert.alert('Categoria já existe', `"${n}" já está cadastrada.`);
    }
  }

  function apagar(c: Categoria) {
    Alert.alert('Excluir categoria', `Excluir "${c.nome}"? As tarefas ficam sem categoria.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removerCategoria(db, c.id);
          await carregar();
        },
      },
    ]);
  }

  return (
    <View style={s.tela}>
      <View style={s.linha}>
        <TextInput style={s.input} value={nome} onChangeText={setNome} placeholder="Nova categoria" onSubmitEditing={salvar} />
        <Pressable style={s.botao} onPress={salvar}>
          <Text style={s.botaoTxt}>Adicionar</Text>
        </Pressable>
      </View>

      <FlatList
        data={itens}
        keyExtractor={(c) => String(c.id)}
        ListEmptyComponent={<Text style={s.vazio}>Nenhuma categoria ainda.</Text>}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Text style={[s.texto, s.itemTexto]}>{item.nome}</Text>
            <Pressable onPress={() => apagar(item)}>
              <Text style={s.apagar}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}