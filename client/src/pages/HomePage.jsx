import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import dbConfigs from "../api/configs/db.configs";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={dbConfigs.mediaType.movie}
        mediaCategory={dbConfigs.mediaCategory.popular}
      />

      <Box margin="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide
            mediaType={dbConfigs.mediaType.movie}
            mediaCategory={dbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="popular series">
          <MediaSlide
            mediaType={dbConfigs.mediaType.tv}
            mediaCategory={dbConfigs.mediaCategory.popular}
          ></MediaSlide>
        </Container>

        <Container header="top rated movies">
          <MediaSlide
            mediaType={dbConfigs.mediaType.movie}
            mediaCategory={dbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>

        <Container header="top rated serives">
          <MediaSlide
            mediaType={dbConfigs.mediaType.tv}
            mediaCategory={dbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
