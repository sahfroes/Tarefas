
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../estilo';

export default function ListaVazia() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.icone}>☁</Text>
      <Text style={estilos.titulo}>Nenhuma tarefa encontrada</Text>
      <Text style={estilos.descricao}>
        Adicione uma tarefa para começar sua organização.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25,
  },

  icone: {
    fontSize: 35,
    color: cores.roxo,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
  },

  descricao: {
    fontSize: 12,
    color: cores.secundario,
    textAlign: 'center',
    marginTop: 7,
  },
});
