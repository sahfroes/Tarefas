
import { StyleSheet } from 'react-native';

export const cores = {
  fundo: '#F6F7FC',
  branco: '#FFFFFF',

  roxo: '#6C63FF',
  roxoEscuro: '#5148D8',
  roxoClaro: '#EEEDFF',

  azul: '#3985F7',
  azulClaro: '#EAF2FF',

  texto: '#252641',
  secundario: '#85869A',
  borda: '#EAEBF2',

  verde: '#39A985',
  verdeClaro: '#E5F7F0',

  vermelho: '#E56B78',
  vermelhoClaro: '#FCECEF',

  amarelo: '#E9AE48',
  amareloClaro: '#FFF5DF',
};

export const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    padding: 20,
    paddingBottom: 35,
    flexGrow: 1,
    
  },

  titulo: {
    fontSize: 25,
    fontWeight: '800',
    color: cores.texto,
    marginTop: 8,
  },

  subtitulo: {
    fontSize: 14,
    color: cores.secundario,
    marginTop: 6,
    lineHeight: 21,

  },

  cartao: {
      backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 17,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: cores.borda,
  },

  botao: {
   backgroundColor: cores.roxo,
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    color: cores.branco,
    fontWeight: '700',
    fontSize: 14,
  },

  input: {
 flex: 1,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 14,
    color: cores.texto,
  },

  texto: {
    fontSize: 15,
    color: cores.texto,
  },

  pequeno: {
    fontSize: 12,
    color: cores.secundario,
    fontWeight: '600',
  },
  
 vazio: {
    color: cores.secundario,
    textAlign: 'center',
    marginTop: 35,
    fontSize: 14,
  },

   item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 15,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  }, 

    itemTexto: {
    flex: 1,
    fontSize: 15,
    color: cores.texto,
    fontWeight: '600',
  },

   linha: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  botaoTxt: {
    color: cores.branco,
    fontWeight: '700',
  },
   chips: {
    flexGrow: 0,
    marginBottom: 12,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.roxo,
  },

  chipOn: {
    backgroundColor: cores.roxo,
  },

  chipTxt: {
    color: cores.roxo,
    fontWeight: '600',
  },

  chipTxtOn: {
    color: cores.branco,
  },

  feita: {
    textDecorationLine: 'line-through',
    color: cores.secundario,
  },
 apagar: {
    color: cores.vermelho,
    fontWeight: '600',
    padding: 5,
  },

 

});
