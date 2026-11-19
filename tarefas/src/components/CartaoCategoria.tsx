
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../estilo';

type Props = {
  nome: string;
  quantidade: number;
};

export default function CartaoCategoria({ nome, quantidade }: Props) {
  return (
    <View style={estilos.cartao}>
      <View style={estilos.icone}>
        <Text style={{ fontSize: 18 }}>🏷️</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={estilos.nome}>{nome}</Text>
        <Text style={estilos.quantidade}>
          {quantidade} tarefas
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },

  icone: {
    backgroundColor: cores.roxoClaro,
    padding: 11,
    borderRadius: 12,
  },

  nome: {
    fontWeight: '700',
    color: cores.texto,
  },

  quantidade: {
    color: cores.secundario,
    fontSize: 11,
    marginTop: 4,
  },
});
