import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Anchor, Button, Divider, PasswordInput, Stack, TextInput } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import AuthLayout from "../components/AuthLayout";
import DemoLoginButton from "../components/DemoLoginButton";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logIn } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Al activarse la sesión, IsAnon redirige a la home (panel de resumen)
    logIn(email, password)
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(error.response?.data?.message || "We couldn't log you in. Try again in a moment.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your workouts."
      footer={
        <>
          Don't have an account?{" "}
          <Anchor component={Link} to="/signup">Sign up</Anchor>
        </>
      }
    >
      <form onSubmit={handleLoginSubmit}>
        <Stack gap="md">
          <TextInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            data-autofocus
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {errorMessage && <Alert color="red" variant="light">{errorMessage}</Alert>}
          <Button type="submit" loading={isSubmitting} fullWidth mt="xs">
            Log in
          </Button>
          <Divider label="or" labelPosition="center" />
          <DemoLoginButton fullWidth />
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
