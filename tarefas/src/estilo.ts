import { StyleSheet } from 'react-native';

// Estilos compartilhados pelas três telas.
export const s = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#fff' },
  linha: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12 },
  botao: { backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 14, justifyContent: 'center' },
  botaoTxt: { color: '#fff', fontWeight: '600' },
  chips: { flexGrow: 0, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, borderRadius: 16, borderWidth: 1, borderColor: '#2563eb' },
  chipOn: { backgroundColor: '#2563eb' },
  chipTxt: { color: '#2563eb' },
  chipTxtOn: { color: '#fff' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  itemTexto: { flex: 1 },
  texto: { fontSize: 16 },
  pequeno: { fontSize: 12, color: '#2563eb' },
  feita: { textDecorationLine: 'line-through', color: '#999' },
  apagar: { color: '#dc2626' },
  vazio: { color: '#888', textAlign: 'center', marginTop: 24 },
});