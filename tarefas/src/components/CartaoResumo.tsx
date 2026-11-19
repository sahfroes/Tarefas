
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../estilo';

type Props = {
  titulo: string;
  valor: number;
  cor: string;
};

export default function CartaoResumo({ titulo, valor, cor }: Props) {
  return (
    <View style={estilos.cartao}>
      <Text style={[estilos.valor, { color: cor }]}>{valor}</Text>
      <Text style={estilos.titulo}>{titulo}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flex: 1,
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },

  valor: {
    fontSize: 24,
    fontWeight: '800',
  },

  titulo: {
    color: cores.secundario,
    fontSize: 11,
    marginTop: 5,
  },
});
