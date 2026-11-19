
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../estilo';

type Props = {
  conectado: boolean;
  pendentes: number;
  sincronizando?: boolean;
};

export default function StatusSincronizacao({
  conectado,
  pendentes,
  sincronizando = false,
}: Props) {
  if (!conectado) {
    return (
      <View style={[estilos.faixa, { backgroundColor: cores.amareloClaro }]}>
        <Text style={{ color: '#997B45' }}>
          Sem internet. Suas alterações estão salvas no aparelho.
        </Text>
      </View>
    );
  }

  if (sincronizando) {
    return (
      <View style={[estilos.faixa, { backgroundColor: cores.azulClaro }]}>
        <Text style={{ color: cores.azul }}>
          Sincronizando alterações...
        </Text>
      </View>
    );
  }

  if (pendentes > 0) {
    return (
      <View style={[estilos.faixa, { backgroundColor: cores.roxoClaro }]}>
        <Text style={{ color: cores.roxo }}>
          {pendentes} alterações aguardando sincronização.
        </Text>
      </View>
    );
  }

  return null;
}

const estilos = StyleSheet.create({
  faixa: {
    padding: 11,
    alignItems: 'center',
  },
});
