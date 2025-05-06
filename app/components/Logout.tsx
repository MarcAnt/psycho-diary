import { Button } from "@mantine/core";
import { handleLogout } from "../actions/handleLogout";

const Logout = () => {
  const logout = async () => {
    await handleLogout();
  };

  return <Button onClick={logout}>Salir</Button>;
};

export default Logout;
