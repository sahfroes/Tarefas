
import { Text, View, StyleSheet } from 'react-native';

import { Tabs } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { migrar } from '../db/db';

const cores = {
  roxo: '#6558D3',
  roxoClaro: '#EFEDFF',
  texto: '#26324A',
  cinza: '#929BB0',
  branco: '#FFFFFF',
  borda: '#E6E8F0',
};

function Icone({
  emoji,
  focused,
}: {
  emoji: string;
  focused: boolean;
}) {
  return (
    <View style={[
      estilos.icone,
      focused && estilos.iconeAtivo,
    ]}>
      <Text style={[
        estilos.iconeTexto,
        { color: focused ? cores.roxo : cores.cinza },
      ]}>
        {emoji}
      </Text>
    </View>
  );
}

function Navegacao() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: cores.roxo,
        tabBarInactiveTintColor: cores.cinza,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },

        tabBarItemStyle: {
          flex: 1,
        },

        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingTop: 5,
          paddingBottom: Math.max(insets.bottom, 8),

          backgroundColor: cores.branco,
          borderTopWidth: 1,
          borderTopColor: cores.borda,

          elevation: 10,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ focused }) => (
            <Icone emoji="✓" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="categorias"
        options={{
          title: 'Categorias',
          tabBarIcon: ({ focused }) => (
            <Icone emoji="▦" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="resumo"
        options={{
          title: 'Resumo',
          tabBarIcon: ({ focused }) => (
            <Icone emoji="▥" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ focused }) => (
            <Icone emoji="i" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="item"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider
        databaseName="tarefas.db"
        onInit={migrar}
      >
        <Navegacao />
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  icone: {
    width: 42,
    height: 30,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconeAtivo: {
    backgroundColor: cores.roxoClaro,
  },

  iconeTexto: {
    fontSize: 21,
    fontWeight: '800',
  },
});
