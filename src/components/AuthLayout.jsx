import { Paper, Stack, Text, Title } from "@mantine/core";
import BrandMark from "./BrandMark";

// Contenedor común para las páginas de login y registro
function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <Stack align="center" mt="xl">
      <Paper withBorder radius="lg" p="xl" w="100%" maw={420} shadow="sm">
        <Stack gap={4} mb="lg" align="center" ta="center">
          <BrandMark size={40} />
          <Title order={2} mt="sm">{title}</Title>
          <Text c="dimmed" size="sm">{subtitle}</Text>
        </Stack>
        {children}
      </Paper>
      <Text size="sm" c="dimmed">{footer}</Text>
    </Stack>
  );
}

export default AuthLayout;
