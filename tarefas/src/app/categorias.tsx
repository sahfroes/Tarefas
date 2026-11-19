
import { useCallback, useState } from 'react';

import {
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  listarCategorias,
  adicionarCategoria,
  removerCategoria,
  type Categoria,
} from '../db/db';

import { cores, s } from '../estilo';

export default function Categorias() {
  const db = useSQLiteContext();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');

  // Carrega as categorias do SQLite
  const carregar = useCallback(async () => {
    try {
      const dados = await listarCategorias(db);
      setCategorias(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as categorias.');
    }
  }, [db]);

  // Atualiza quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  // Adiciona uma categoria
  async function salvar() {
    const valor = nome.trim();

    if (!valor) {
      Alert.alert('Atenção', 'Digite o nome da categoria.');
      return;
    }

    try {
      await adicionarCategoria(db, valor);
      setNome('');
      await carregar();
    } catch {
      Alert.alert(
        'Categoria existente',
        'Essa categoria já está cadastrada.'
      );
    }
  }

  // Exclui uma categoria
  function excluir(id: number, categoria: string) {
    Alert.alert(
      'Excluir categoria',
      `Deseja excluir "${categoria}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removerCategoria(db, id);
              await carregar();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir.');
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={s.tela} edges={['top']}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"

        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
          flexGrow: 1,
        }}

        // Cabeçalho
        ListHeaderComponent={
          <View>
            <Text style={estilos.etiqueta}>
              ORGANIZAÇÃO
            </Text>

            <Text style={s.titulo}>
              Categorias
            </Text>

            <Text style={s.subtitulo}>
              Separe suas tarefas e mantenha tudo organizado.
            </Text>

            {/* Campo para adicionar */}
            <View style={estilos.formulario}>
              <TextInput
                style={estilos.input}
                placeholder="Nome da categoria..."
                placeholderTextColor={cores.secundario}
                value={nome}
                onChangeText={setNome}
                onSubmitEditing={salvar}
                returnKeyType="done"
              />

              <Pressable
                style={estilos.botao}
                onPress={salvar}
              >
                <Text style={estilos.botaoTexto}>+</Text>
              </Pressable>
            </View>

            {/* Título da lista */}
            <View style={estilos.tituloLista}>
              <Text style={estilos.subtituloLista}>
                Minhas categorias
              </Text>

              <Text style={estilos.contador}>
                {categorias.length}
              </Text>
            </View>
          </View>
        }

        // Cartões
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            <View style={estilos.icone}>
              <Text style={{ fontSize: 20 }}>🏷️</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={estilos.nome}>
                {item.nome}
              </Text>

              <Text style={estilos.descricao}>
                Categoria de tarefas
              </Text>
            </View>

            <Pressable
              onPress={() => excluir(item.id, item.nome)}
              style={estilos.botaoExcluir}
              hitSlop={8}
            >
              <Text style={estilos.excluir}>
                Excluir
              </Text>
            </Pressable>
          </View>
        )}

        // Lista vazia
        ListEmptyComponent={
          <View style={estilos.vazio}>
            <Text style={{ fontSize: 38 }}>📂</Text>

            <Text style={estilos.vazioTitulo}>
              Nenhuma categoria
            </Text>

            <Text style={estilos.vazioTexto}>
              Adicione sua primeira categoria para organizar suas tarefas.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  etiqueta: {
    color: cores.roxo,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  formulario: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 52,
    color: cores.texto,
    fontSize: 14,
  },

  botao: {
    width: 52,
    height: 52,
    backgroundColor: cores.roxo,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 28,
  },

  tituloLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  subtituloLista: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
  },

  contador: {
    backgroundColor: cores.roxoClaro,
    color: cores.roxo,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    fontWeight: '700',
    overflow: 'hidden',
  },

  cartao: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    gap: 12,
    marginBottom: 10,
    minHeight: 75,
  },

  icone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: cores.roxoClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nome: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
  },

  descricao: {
    fontSize: 11,
    color: cores.secundario,
    marginTop: 5,
  },

  botaoExcluir: {
    paddingHorizontal: 9,
    paddingVertical: 10,
  },

  excluir: {
    color: cores.vermelho,
    fontSize: 12,
    fontWeight: '700',
  },

  vazio: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  vazioTitulo: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },

  vazioTexto: {
    color: cores.secundario,
    textAlign: 'center',
    fontSize: 13,
    marginTop: 7,
    lineHeight: 20,
  },
});
