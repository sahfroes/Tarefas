
import { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

import { adicionar, listarCategorias, type Categoria } from '../../db/db';
import { cores, s } from '../../estilo';

export default function NovaTarefa() {
  const db = useSQLiteContext();

  const [titulo, setTitulo] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useFocusEffect(
    useCallback(() => {
      listarCategorias(db).then(setCategorias);
    }, [db])
  );

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Digite o nome da tarefa.');
      return;
    }

    const qtd = Number(quantidade);

    if (!Number.isInteger(qtd) || qtd < 1) {
      Alert.alert('Atenção', 'Informe uma quantidade válida.');
      return;
    }

    await adicionar(
      db,
      titulo.trim(),
      qtd,
      observacao.trim(),
      categoriaId
    );

    router.back();
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Nova tarefa</Text>
      <Text style={s.subtitulo}>Preencha as informações abaixo.</Text>

      <Text style={{ marginTop: 25, marginBottom: 8, color: cores.texto }}>
        Nome da tarefa
      </Text>

      <TextInput
        style={s.input}
        placeholder="Ex: Comprar materiais"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={{ marginTop: 20, marginBottom: 8, color: cores.texto }}>
        Quantidade
      </Text>

      <TextInput
        style={s.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={{ marginTop: 20, marginBottom: 8, color: cores.texto }}>
        Observação
      </Text>

      <TextInput
        style={[s.input, { height: 90, textAlignVertical: 'top', paddingTop: 12 }]}
        placeholder="Alguma informação adicional..."
        multiline
        value={observacao}
        onChangeText={setObservacao}
      />

      <Text style={{ marginTop: 20, marginBottom: 10, color: cores.texto }}>
        Categoria
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pressable
          onPress={() => setCategoriaId(null)}
          style={{
            backgroundColor: categoriaId === null ? cores.roxoClaro : cores.branco,
            padding: 11,
            borderRadius: 20,
          }}
        >
          <Text>Sem categoria</Text>
        </Pressable>

        {categorias.map(c => (
          <Pressable
            key={c.id}
            onPress={() => setCategoriaId(c.id)}
            style={{
              backgroundColor: categoriaId === c.id ? cores.roxoClaro : cores.branco,
              padding: 11,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: cores.texto }}>{c.nome}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={[s.botao, { marginTop: 30 }]} onPress={salvar}>
        <Text style={s.botaoTexto}>Salvar tarefa</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ padding: 15 }}>
        <Text style={{ textAlign: 'center', color: cores.secundario }}>
          Cancelar
        </Text>
      </Pressable>
    </ScrollView>
  );
}
