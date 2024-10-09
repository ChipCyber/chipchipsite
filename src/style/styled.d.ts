// eslint-disable-next-line import/no-unresolved
import { CustomTheme } from '../theme'
// import { Colors, Breakpoints, MediaQueries, Spacing, Shadows, Radii, FlattenSimpleInterpolation, ZIndices } from "./types";
declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends CustomTheme {}
}
