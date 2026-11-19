
import NetInfo from '@react-native-community/netinfo';

export async function verificarConexao(): Promise<boolean> {
  const estado = await NetInfo.fetch();

  return (
    estado.isConnected === true &&
    estado.isInternetReachable !== false
  );
}

export function observarConexao(
  callback: (conectado: boolean) => void
) {
  return NetInfo.addEventListener(estado => {
    callback(
      estado.isConnected === true &&
      estado.isInternetReachable !== false
    );
  });
}
