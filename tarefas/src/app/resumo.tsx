
import { useCallback, useState } from 'react';

import {
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resumo, type Resumo } from '../db/db';
import { cores, s } from '../estilo';

export default function ResumoTela() {
  const db = useSQLiteContext();

  const [dados, setDados] = useState<Resumo[]>([]);

  const carregar = useCallback(async () => {
    try {
      const resultado = await resumo(db);
      setDados(resultado);
    } catch {
      console.log('Erro ao carregar resumo.');
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const total = dados.reduce(
    (soma, item) => soma + item.total,
    0
  );

  const feitas = dados.reduce(
    (soma, item) => soma + item.feitas,
    0
  );

  const percentualGeral = total > 0
    ? Math.round((feitas / total) * 100)
    : 0;

  return (
    <SafeAreaView style={s.tela} edges={['top']}>
      <FlatList
        data={dados}
        keyExtractor={item => item.categoria}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 35,
          flexGrow: 1,
        }}

        ListHeaderComponent={
          <View>
            <Text style={s.pequeno}>
              ESTATÍSTICAS
            </Text>

            <Text style={s.titulo}>
              Meu resumo
            </Text>

            <Text style={s.subtitulo}>
              Acompanhe sua organização.
            </Text>

            {/* Resumo geral */}
            <View style={[s.cartao, { marginTop: 22 }]}>
              <Text style={s.pequeno}>
                TOTAL DE TAREFAS
              </Text>

              <Text style={estilos.numero}>
                {total}
              </Text>

              <Text style={s.subtitulo}>
                {feitas} tarefas concluídas
              </Text>

              <View style={estilos.progresso}>
                <View
                  style={[
                    estilos.progressoInterno,
                    { width: `${percentualGeral}%` },
                  ]}
                />
              </View>

              <Text style={estilos.percentual}>
                {percentualGeral}% concluído
              </Text>
            </View>

            <Text style={[
              s.titulo,
              {
                fontSize: 18,
                marginTop: 12,
                marginBottom: 15,
              },
            ]}>
              Por categoria
            </Text>
          </View>
        }

        renderItem={({ item }) => {
          const percentual = item.total > 0
            ? Math.round((item.feitas / item.total) * 100)
            : 0;

          return (
            <View style={s.cartao}>
              <Text style={estilos.nomeCategoria}>
                {item.categoria}
              </Text>

              <Text style={s.subtitulo}>
                {item.feitas} de {item.total} concluídas
              </Text>

              <View style={estilos.progresso}>
                <View
                  style={[
                    estilos.progressoInterno,
                    { width: `${percentual}%` },
                  ]}
                />
              </View>

              <Text style={estilos.percentual}>
                {percentual}% concluído
              </Text>
            </View>
          );
        }}

        ListEmptyComponent={
          <Text style={s.vazio}>
            Ainda não existem dados.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  numero: {
    fontSize: 35,
    fontWeight: '800',
    color: cores.roxo,
    marginTop: 8,
  },

  nomeCategoria: {
    color: cores.texto,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 6,
  },

  progresso: {
    height: 8,
    backgroundColor: cores.roxoClaro,
    borderRadius: 10,
    marginTop: 13,
    overflow: 'hidden',
  },

  progressoInterno: {
    height: 8,
    backgroundColor: cores.roxo,
    borderRadius: 10,
  },

  percentual: {
    color: cores.azul,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 9,
  },
});
