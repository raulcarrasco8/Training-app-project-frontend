import { Center, Loader } from "@mantine/core";

// Indicador de carga mientras se comprueba la sesión
function PageLoader() {
  return (
    <Center h={240}>
      <Loader />
    </Center>
  );
}

export default PageLoader;
