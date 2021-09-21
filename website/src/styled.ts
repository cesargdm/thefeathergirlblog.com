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

  h1 {
    text-align: left;
  }

  @supports (padding: max(0px)) {
    padding-left: max(10px, env(safe-area-inset-left));
    padding-right: max(10px, env(safe-area-inset-right));
  }
`;

export const HeaderLinks = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

export const PostsContainer = styled.div`
  padding: 0;
  display: grid;
  width: 100%;
  min-width: 0;
  grid-auto-flow: dense;
  grid-template-columns: 1fr;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @supports (padding: max(0px)) {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
`;
