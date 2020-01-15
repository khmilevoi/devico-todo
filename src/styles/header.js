import styled from 'styled-components';

import { main } from './constants';

export const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${main};
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Login = styled.div`
  color: white;
`;
