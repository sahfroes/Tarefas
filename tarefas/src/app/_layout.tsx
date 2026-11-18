import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { migrar } from '../db/db';

// Emoji como ícone: sem biblioteca extra.
const icone = (e: string) => () => <Text style={{ fontSize: 20 }}>{e}</Text>;

export default function Layout() {
  return (
    <SQLiteProvider databaseName="tarefas.db" onInit={migrar}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Tarefas', tabBarIcon: icone('📝') }} />
        <Tabs.Screen name="categorias" options={{ title: 'Categorias', tabBarIcon: icone('🏷️') }} />
        <Tabs.Screen name="resumo" options={{ title: 'Resumo', tabBarIcon: icone('📊') }} />
      </Tabs>
    </SQLiteProvider>
  );
}