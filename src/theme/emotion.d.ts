import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      black: string;
      lightBlue: string;
    };
  }
}
