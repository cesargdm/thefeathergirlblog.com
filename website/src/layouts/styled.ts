import styled from 'styled-components'

export const Body = styled.body`
  width: 100%;
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
`

export const Footer = styled.footer`
  background-color: #f1f1f1;
  color: black;
  color: black;
  padding: 30px 10px;

  @supports (padding: max(0px)) {
    padding-left: max(10px, env(safe-area-inset-left));
    padding-right: max(10px, env(safe-area-inset-right));
  }

  > div {
    max-width: 900px;
    margin: 0 auto;
    gap: 20px;
    display: grid;
    grid-template-columns: 1fr;

    > * {
      justify-self: center;
    }

    @media (min-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`
