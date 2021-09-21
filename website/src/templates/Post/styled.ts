import styled from "styled-components";

export const Main = styled.main`
  padding: 10px;
  display: grid;
  gap: 20px;
  min-width: 0;
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 250px;
  }
`;

export const BlockContainer = styled.div`
  max-width: 800px;
  width: 100%;
  min-width: 0;

  a {
    word-wrap: break-word;
  }
`;

export const Aside = styled.aside`
  margin-bottom: 20px;

  @media (min-width: 700px) {
    top: 0;
    position: sticky;
    height: auto;
    max-height: 50vh;
  }
`;

export const Header = styled.header`
  [data-gatsby-image-wrapper] {
    min-height: 20vh;
    max-height: 40vh;
  }

  h1 {
    padding: 30px 10px 0;
  }

  p {
    padding: 10px;
  }

  h1,
  p {
    max-width: 900px;
    margin: 0 auto;
  }
`;
