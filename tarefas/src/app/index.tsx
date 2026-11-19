
import { useCallback, useMemo, useState } from 'react';

import {
  Alert,
  FlatList,
  Text,
  View,
  Pressable,
} from 'react-native';

import { useFocusEffect, router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  listar,
  alternar,
  remover,
  type Tarefa,
} from '../db/db';

import BarraPesquisa from '../components/BarraPesquisa';
import BarraProgresso from '../components/BarraProgresso';
import CartaoResumo from '../components/CartaoResumo';
import CartaoTarefa from '../components/CartaoTarefa';
import BotaoAdicionar from '../components/BotaoAdicionar';
import ListaVazia from '../components/ListaVazia';

import { cores, s } from '../estilo';

type Filtro = 'Todas' | 'Pendentes' | 'Concluídas';

export default function Index() {
  const db = useSQLiteContext();

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('Todas');

  // Carrega as tarefas do banco.
  const carregar = useCallback(async () => {
    try {
      const dados = await listar(db);
      setTarefas(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  }, [db]);

  // Atualiza a lista quando a tela recebe foco.
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  // Estatísticas.
  const concluidas = tarefas.filter(t => t.feita === 1).length;
  const pendentes = tarefas.length - concluidas;

  // Pesquisa e filtros.
  const filtradas = useMemo(() => {
    return tarefas.filter(item => {
      const termo = pesquisa.trim().toLowerCase();

      const correspondePesquisa =
        item.titulo.toLowerCase().includes(termo) ||
        (item.categoria ?? '').toLowerCase().includes(termo);

      const correspondeFiltro =
        filtro === 'Todas' ||
        (filtro === 'Pendentes' && item.feita === 0) ||
        (filtro === 'Concluídas' && item.feita === 1);

      return correspondePesquisa && correspondeFiltro;
    });
  }, [tarefas, pesquisa, filtro]);

  // Concluir tarefa.
  async function concluir(id: number) {
    try {
      await alternar(db, id);
      await carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  }

  // Excluir tarefa.
  function excluir(id: number) {
    Alert.alert(
      'Excluir tarefa',
      'Deseja realmente excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await remover(db, id);
              await carregar();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={s.tela} edges={['top']}>
      <FlatList
        data={filtradas}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"

        contentContainerStyle={[
          s.conteudo,
          {
            paddingBottom: 35,
            flexGrow: 1,
          },
        ]}

        renderItem={({ item }) => (
          <CartaoTarefa
            item={item}
            aoConcluir={() => concluir(item.id)}
            aoEditar={() => router.push(`/item/${item.id}`)}
            aoExcluir={() => excluir(item.id)}
          />
        )}

        ListHeaderComponent={
          <View>
            <Text style={s.pequeno}>
              BEM-VINDA! ✨
            </Text>

            <Text style={s.titulo}>
              Minhas tarefas
            </Text>

            <Text style={s.subtitulo}>
              Organize seu dia com facilidade.
            </Text>

            {/* Estatísticas */}
            <View style={{
              flexDirection: 'row',
              gap: 8,
              marginTop: 20,
            }}>
              <CartaoResumo
                titulo="Total"
                valor={tarefas.length}
                cor={cores.roxo}
              />

              <CartaoResumo
                titulo="Concluídas"
                valor={concluidas}
                cor={cores.azul}
              />

              <CartaoResumo
                titulo="Pendentes"
                valor={pendentes}
                cor={cores.amarelo}
              />
            </View>

            {/* Progresso */}
            <BarraProgresso
              total={tarefas.length}
              concluidas={concluidas}
            />

            {/* Adicionar tarefa */}
            <BotaoAdicionar
              aoPressionar={() => router.push('/item/novo')}
            />

            <Text style={[
              s.titulo,
              {
                fontSize: 18,
                marginTop: 15,
                marginBottom: 12,
              },
            ]}>
              Minha lista
            </Text>

            {/* Pesquisa */}
            <BarraPesquisa
              valor={pesquisa}
              aoMudar={setPesquisa}
            />

            {/* Filtros */}
            <View style={{
              flexDirection: 'row',
              gap: 8,
              marginBottom: 18,
              marginTop: 10,
            }}>
              {(['Todas', 'Pendentes', 'Concluídas'] as Filtro[]).map(opcao => (
                <Pressable
                  key={opcao}
                  onPress={() => setFiltro(opcao)}
                  style={{
                    backgroundColor:
                      filtro === opcao ? cores.roxo : cores.branco,
                    paddingHorizontal: 14,
                    paddingVertical: 11,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      filtro === opcao ? cores.roxo : cores.borda,
                  }}
                >
                  <Text style={{
                    color:
                      filtro === opcao ? cores.branco : cores.texto,
                    fontSize: 12,
                    fontWeight: '700',
                  }}>
                    {opcao}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }

        ListEmptyComponent={<ListaVazia />}
      />
    </SafeAreaView>
  );
}
