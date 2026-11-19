
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { cores, s } from '../estilo';

export default function Sobre() {
  return (
    <SafeAreaView style={s.tela} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 35,
        }}
      >
        <Text style={s.pequeno}>
          INFORMAÇÕES
        </Text>

        <Text style={s.titulo}>
          Sobre o aplicativo
        </Text>

        <Text style={s.subtitulo}>
          Conheça um pouco mais sobre o Lista de Tarefas.
        </Text>

        {/* Identificação */}
        <View style={[
          s.cartao,
          estilos.destaque,
        ]}>
          <Text style={{ fontSize: 45 }}>
            📋
          </Text>

          <Text style={estilos.nomeApp}>
            Lista de Tarefas
          </Text>

          <Text style={s.pequeno}>
            Versão 1.0.0
          </Text>
        </View>

        {/* Sobre o projeto */}
        <View style={s.cartao}>
          <Text style={estilos.tituloCartao}>
            Sobre o projeto
          </Text>

          <Text style={s.subtitulo}>
            Aplicativo desenvolvido para organizar tarefas,
            gerenciar categorias e acompanhar atividades.
            Os dados são armazenados localmente no aparelho.
          </Text>
        </View>

        {/* Tecnologias */}
        <View style={s.cartao}>
          <Text style={estilos.tituloCartao}>
            Tecnologias utilizadas
          </Text>

          <Text style={s.subtitulo}>
            React Native, Expo, TypeScript, SQLite e Kotlin.
          </Text>
        </View>

        {/* Informações adicionais */}
        <View style={s.cartao}>
          <Text style={estilos.tituloCartao}>
            Funcionamento
          </Text>

          <Text style={s.subtitulo}>
            O aplicativo permite organizar atividades,
            acompanhar tarefas concluídas e gerenciar
            informações mesmo sem conexão com a internet.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  destaque: {
    marginTop: 25,
    alignItems: 'center',
    paddingVertical: 30,
  },

  nomeApp: {
    fontSize: 21,
    fontWeight: '800',
    color: cores.roxo,
    marginTop: 12,
    marginBottom: 5,
  },

  tituloCartao: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 9,
  },
});
