import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { resumo, type Resumo } from '../db/db';
import { s } from '../estilo';

export default function ResumoTela() {
  const db = useSQLiteContext();
  const [itens, setItens] = useState<Resumo[]>([]);

  useFocusEffect(
    useCallback(() => {
      resumo(db).then(setItens);
    }, [db]),
  );

  return (
    <View style={s.tela}>
      <FlatList
        data={itens}
        keyExtractor={(r) => r.categoria}
        ListEmptyComponent={<Text style={s.vazio}>Sem tarefas para resumir.</Text>}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Text style={[s.texto, s.itemTexto]}>{item.categoria}</Text>
            <Text>
              {item.feitas}/{item.total} feitas
            </Text>
          </View>
        )}
      />
    </View>
  );
}