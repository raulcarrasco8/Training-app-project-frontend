import { useContext, useState } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AuthContext } from "../context/auth.context";
import { DEMO_CREDENTIALS } from "../utils/demo";

// Entra con el usuario demo en un clic (pensado para quien prueba la app)
function DemoLoginButton(props) {
  const { logIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    logIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)
      .catch((error) => {
        console.error("Demo login error:", error);
        notifications.show({
          title: "The demo isn't available right now",
          message: "Try again in a moment, or create your own account.",
          color: "red",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Button variant="light" loading={isLoading} onClick={handleClick} {...props}>
      Try the demo
    </Button>
  );
}

export default DemoLoginButton;
