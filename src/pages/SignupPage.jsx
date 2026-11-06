import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, Anchor, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import AuthLayout from "../components/AuthLayout";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    axios
      .post(`${API_URL}/auth/signup`, { email, password, name })
      // Tras registrarse, iniciamos sesión directamente: el usuario entra ya con sus disciplinas
      .then(() => axios.post(`${API_URL}/auth/login`, { email, password }))
      .then(async (response) => {
        storeToken(response.data.authToken);
        // Al activarse la sesión, IsAnon redirige a /disciplines
        await authenticateUser();
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrorMessage(error.response?.data?.message || "We couldn't create your account. Try again in a moment.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start logging your training in less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Anchor component={Link} to="/login">Log in</Anchor>
        </>
      }
    >
      <form onSubmit={handleSignupSubmit}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            data-autofocus
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <PasswordInput
            label="Password"
            description="At least 6 characters, with a number, a lowercase and an uppercase letter."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          {errorMessage && <Alert color="red" variant="light">{errorMessage}</Alert>}
          <Button type="submit" loading={isSubmitting} fullWidth mt="xs">
            Create account
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
