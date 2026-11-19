
import { TextInput, View, StyleSheet } from 'react-native';
import { cores } from '../estilo';

type Props = {
  valor: string;
  aoMudar: (texto: string) => void;
};

export default function BarraPesquisa({ valor, aoMudar }: Props) {
  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Pesquisar tarefa..."
        placeholderTextColor={cores.secundario}
        value={valor}
        onChangeText={aoMudar}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: cores.branco,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 14,
    marginVertical: 15,
  },

  input: {
    height: 46,
    color: cores.texto,
    fontSize: 14,
  },
});
