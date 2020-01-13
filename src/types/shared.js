// @flow

export type Props = { [string]: string | Props };

export type CreateElement = (
  string,
  Props,
  (string | HTMLElement)[]
) => HTMLElement;
