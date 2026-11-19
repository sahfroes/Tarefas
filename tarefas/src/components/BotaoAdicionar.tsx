
import { Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../estilo';

type Props = {
  aoPressionar: () => void;
};

export default function BotaoAdicionar({ aoPressionar }: Props) {
  return (
    <Pressable style={estilos.botao} onPress={aoPressionar}>
      <Text style={estilos.texto}>+ Adicionar tarefa</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: cores.roxo,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginVertical: 15,
  },

  texto: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: '700',
  },
});
