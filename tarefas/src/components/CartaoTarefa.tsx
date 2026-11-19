
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Tarefa } from '../db/db';
import { cores } from '../estilo';

type Props = {
  item: Tarefa;
  aoConcluir: () => void;
  aoEditar: () => void;
  aoExcluir: () => void;
};

export default function CartaoTarefa({
  item,
  aoConcluir,
  aoEditar,
  aoExcluir,
}: Props) {
  const feita = item.feita === 1;

  return (
    <View style={estilos.cartao}>
      <Pressable onPress={aoConcluir} style={estilos.check}>
        <View style={[estilos.circulo, feita && estilos.circuloAtivo]}>
          {feita && <Text style={estilos.marcado}>✓</Text>}
        </View>
      </Pressable>

      <View style={estilos.conteudo}>
        <Text style={[estilos.titulo, feita && estilos.concluido]}>
          {item.titulo}
        </Text>

        <Text style={estilos.detalhe}>
          Quantidade: {item.quantidade}
        </Text>

        {item.categoria && (
          <Text style={estilos.categoria}>{item.categoria}</Text>
        )}

        {item.observacao ? (
          <Text style={estilos.detalhe}>{item.observacao}</Text>
        ) : null}
      </View>

      <View style={estilos.acoes}>
        <Pressable onPress={aoEditar}>
          <Text style={estilos.editar}>Editar</Text>
        </Pressable>

        <Pressable onPress={aoExcluir}>
          <Text style={estilos.excluir}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 16,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },

  check: {
    marginRight: 12,
  },

  circulo: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: cores.roxo,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circuloAtivo: {
    backgroundColor: cores.roxo,
  },

  marcado: {
    color: cores.branco,
    fontWeight: 'bold',
  },

  conteudo: {
    flex: 1,
  },

  titulo: {
    fontSize: 14,
    color: cores.texto,
    fontWeight: '700',
  },

  concluido: {
    textDecorationLine: 'line-through',
    color: cores.secundario,
  },

  detalhe: {
    color: cores.secundario,
    fontSize: 11,
    marginTop: 5,
  },

  categoria: {
    color: cores.roxo,
    backgroundColor: cores.roxoClaro,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    fontSize: 10,
    marginTop: 6,
  },

  acoes: {
    gap: 12,
    marginLeft: 8,
  },

  editar: {
    color: cores.azul,
    fontSize: 11,
    fontWeight: '600',
  },

  excluir: {
    color: cores.vermelho,
    fontSize: 11,
    fontWeight: '600',
  },
});
