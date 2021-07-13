import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const [followers, setFollowers] = useState([]);
  const usuarioAleatorio = "KallerMG";

  useEffect(async () => {
    await fetch("https://api.github.com/users/juunegreiros/followers")
      .then((res) => res.json())
      .then((res) => {
        setFollowers(res);
      });
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet
              recados={999}
              fotos={30}
              videos={5}
              fas={1000029}
              mensagens={159}
              confiavel={3}
              legal={3}
              sexy={999}
            />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({followers.length})
            </h2>

            <ul>
              {followers.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual.login}`} key={itemAtual.login}>
                      <img src={`https://github.com/${itemAtual.login}.png`} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
