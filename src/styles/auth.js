import styled from 'styled-components';

import { silver, infinity, red } from './constants';

export const Auth = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${silver};
  z-index: ${infinity};
`;

export const Form = styled.form`
  width: 100%;
  height: calc(100% - 8px);
  padding: 25px 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Error = styled.div`
  height: 20px;
  color: ${red};
`;
