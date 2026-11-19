
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../estilo';

type Props = {
  total: number;
  concluidas: number;
};

export default function BarraProgresso({ total, concluidas }: Props) {
  const progresso = total > 0 ? (concluidas / total) * 100 : 0;

  return (
    <View style={estilos.container}>
      <View style={estilos.linha}>
        <Text style={estilos.titulo}>Meu progresso</Text>
        <Text style={estilos.porcentagem}>
          {Math.round(progresso)}%
        </Text>
      </View>

      <View style={estilos.fundo}>
        <View
          style={[
            estilos.preenchimento,
            { width: `${progresso}%` },
          ]}
        />
      </View>

      <Text style={estilos.descricao}>
        {concluidas} de {total} tarefas concluídas
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: cores.branco,
    borderRadius: 17,
    padding: 18,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: cores.borda,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  titulo: {
    color: cores.texto,
    fontWeight: '700',
  },

  porcentagem: {
    color: cores.roxo,
    fontWeight: '800',
  },

  fundo: {
    height: 9,
    backgroundColor: cores.roxoClaro,
    borderRadius: 10,
    overflow: 'hidden',
  },

  preenchimento: {
    height: 9,
    backgroundColor: cores.roxo,
    borderRadius: 10,
  },

  descricao: {
    color: cores.secundario,
    fontSize: 11,
    marginTop: 10,
  },
});
