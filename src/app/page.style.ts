import { CSSProperties } from 'react';

export const pageStyle: CSSProperties = {
  fontSize: '30px',
};

export const wrapperStyle: CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
};

export const contentStyle: CSSProperties = {
  position: 'relative',
  flex: 3,
  width: '100%',
  boxSizing: 'border-box',
  maxWidth: '85%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: '2rem',
  paddingBottom: '2rem',
};
