import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <a href="./dashboard">
        <Img src="white-logo.png" alt="Logo" />
      </a>
    </StyledLogo>
  );
}

export default Logo;
