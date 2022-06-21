import React, { useMemo } from "react";
import { Container, Profile, Welcome, Username } from "./styles";
import emojis from "../../utils/emojis";

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);
    return emojis[index];
  }, []);

  return (
    <Container>
      <Profile>
        <Welcome>Olá {emoji}</Welcome>
      </Profile>
    </Container>
  );
};

export default MainHeader;
