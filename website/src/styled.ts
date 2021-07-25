import styled from "styled-components";

export const Article = styled.article`
  --highlight-color: #ffd00d;
  padding: 20px;

  h2 {
    display: inline;
  }

  :hover h2 {
    background: linear-gradient(
      to top,
      var(--highlight-color) 50%,
      transparent 50%
    );
  }
`;

export const Header = styled.header`
  padding-top: 40px;
  text-align: center;
`;
