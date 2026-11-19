
import { useCallback, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import {
  buscarTarefa,
  editar,
  type Tarefa,
} from '../../db/db';

import { cores, s } from '../../estilo';

export default function EditarTarefa() {
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [item, setItem] = useState<Tarefa | null>(null);
  const [titulo, setTitulo] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const dados = await buscarTarefa(db, Number(id));

        if (dados) {
          setItem(dados);
          setTitulo(dados.titulo);
          setQuantidade(String(dados.quantidade));
          setObservacao(dados.observacao ?? '');
        }
      }

      carregar();
    }, [db, id])
  );

  async function salvar() {
    const qtd = Number(quantidade);

    if (!titulo.trim() || !Number.isInteger(qtd) || qtd < 1) {
      Alert.alert('Atenção', 'Verifique o nome e a quantidade.');
      return;
    }

    if (!item) return;

    await editar(
      db,
      item.id,
      titulo.trim(),
      qtd,
      observacao.trim(),
      item.categoria_id
    );

    router.back();
  }

  if (!item) {
    return (
      <Text style={s.vazio}>Carregando tarefa...</Text>
    );
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Editar tarefa</Text>

      <Text style={{ marginTop: 25, marginBottom: 8 }}>Nome</Text>
      <TextInput
        style={s.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={{ marginTop: 20, marginBottom: 8 }}>Quantidade</Text>
      <TextInput
        style={s.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={{ marginTop: 20, marginBottom: 8 }}>Observação</Text>
      <TextInput
        style={[s.input, { height: 90, textAlignVertical: 'top', paddingTop: 12 }]}
        multiline
        value={observacao}
        onChangeText={setObservacao}
      />

      <Pressable style={[s.botao, { marginTop: 30 }]} onPress={salvar}>
        <Text style={s.botaoTexto}>Salvar alterações</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ padding: 15 }}>
        <Text style={{ textAlign: 'center', color: cores.secundario }}>
          Cancelar
        </Text>
      </Pressable>
    </ScrollView>
  );
}
