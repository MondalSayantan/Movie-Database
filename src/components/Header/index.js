import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";
import HeroImage from "../HeroImage";

const Header = () => (
  <Wrapper>
    <Content>
      <Link to="/">
        <LogoImg src={RMDBLogo} alt="RMDBLogo" />
      </Link>
      <TMDBLogoImg src={TMDBLogo} alt="TMDBLogo" />
    </Content>
  </Wrapper>
);

HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Header;
