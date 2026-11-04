import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Burger, Button, Container, Divider, Drawer, Group, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../context/auth.context";
import BrandMark from "./BrandMark";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/workouts", label: "Workouts" },
  { to: "/disciplines", label: "Disciplines" },
];

// Iniciales del usuario para el avatar ("Alice Smith" -> "AS")
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    closeDrawer();
    logOutUser();
    navigate("/");
  };

  const navLinks = NAV_LINKS.map((link) => (
    <NavLink key={link.to} to={link.to} className="nav-link" onClick={closeDrawer}>
      {link.label}
    </NavLink>
  ));

  return (
    <Container size="lg" h="100%">
      <Group h="100%" justify="space-between" wrap="nowrap">
        <Group gap="xl" wrap="nowrap">
          <Link to="/" className="brand" onClick={closeDrawer}>
            <BrandMark />
            <span className="brand-name">Training App</span>
          </Link>

          {isLoggedIn && (
            <Group gap="lg" visibleFrom="sm" component="nav" aria-label="Main">
              {navLinks}
            </Group>
          )}
        </Group>

        {/* Escritorio */}
        <Group gap="sm" visibleFrom="sm">
          {isLoggedIn ? (
            <Menu position="bottom-end" width={220} shadow="md">
              <Menu.Target>
                <UnstyledButton className="user-button" aria-label="Account menu">
                  <Group gap="xs" wrap="nowrap">
                    <Avatar color="lane" radius="xl" size="sm">
                      {getInitials(user?.name)}
                    </Avatar>
                    <Text size="sm" fw={500}>{user?.name}</Text>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user?.email}</Menu.Label>
                <Menu.Item onClick={handleLogout}>Log out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <>
              <Button component={Link} to="/login" variant="subtle" color="dark">
                Log in
              </Button>
              <Button component={Link} to="/signup">
                Sign up
              </Button>
            </>
          )}
        </Group>

        {/* Móvil */}
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" aria-label="Open menu" />
      </Group>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="right"
        size="75%"
        hiddenFrom="sm"
        title={<span className="brand-name">Training App</span>}
      >
        {isLoggedIn ? (
          <Stack gap="md">
            <Text size="sm" c="dimmed">Signed in as {user?.name}</Text>
            <Stack gap="sm" component="nav" aria-label="Main">{navLinks}</Stack>
            <Divider />
            <Button variant="light" color="dark" onClick={handleLogout}>Log out</Button>
          </Stack>
        ) : (
          <Stack gap="sm">
            <Button component={Link} to="/login" variant="default" onClick={closeDrawer}>Log in</Button>
            <Button component={Link} to="/signup" onClick={closeDrawer}>Sign up</Button>
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}

export default Navbar;
