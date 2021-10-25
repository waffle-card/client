export const Common = {
  colors: {
    point: 'rgba(255, 208, 57, 1)',

    blue: 'rgba(81, 223, 253, 1)',
    green: 'rgba(57, 219, 178, 1)',
    pink: 'rgba(219, 69, 168, 1)',
    yellow: 'rgba(247, 173, 42, 1)',
    purple: 'rgba(162, 75, 240, 1)',
    red: 'rgba(233, 53, 80, 1)',
    indigo: 'rgba(92, 107, 192, 1)',
    teal: 'rgba(38, 166, 154, 1)',
    lime: 'rgba(212, 225, 87, 1)',
    brown: 'rgba(141, 110, 99, 1)',
    deepOrange: 'rgba(255, 112, 67, 1)',
    blueGrey: 'rgba(120, 144, 156, 1)',

    background: 'rgba(26, 31, 39, 1)',
    background_menu: 'rgba(255, 255, 255, 0.1)',
    background_pointer: 'rgba(255, 255, 255, 0.2)',
    background_modal: 'rgba(43, 51, 63, 1)',
    border: 'rgba(255, 255, 255, 0.5)',

    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    tertiary: 'rgba(255, 255, 255, 0.35)',
  },

  shadow: {
    menu: '3px 2px 8px rgba(0, 0, 0, 0.7)',
    modal: '7px 14px 20px rgba(0, 0, 0, 1.2)',
    card: '2px 5px 6px rgba(0, 0, 0, 1.2)',
    chattingHeader: '2px 5px 6px rgba(0, 0, 0, 1.2)',
    chattingElement: '2px 5px 6px rgba(0, 0, 0, 1.2)',
  },

  fontSize: {
    micro: `0.75rem`,
    small: `0.875rem`,
    base: `1rem`,
    medium: `1.125rem`,
    large: `1.5rem`,
  },

  fontStyle: {
    micro: () => `
      font-size: 0.75rem;
      line-height: 16px;
      letter-spacing: -0.005em;
    `,
    small: () => `
      font-size: 0.875rem;
      line-height: 24px;
      letter-spacing: -0.01em;
    `,
    base: () => `
      font-size: 1rem;
      line-height: 24px;
      letter-spacing: -0.01em;
    `,
    medium: () => `
      font-size: 1.125rem;
      line-height: 28px;
      letter-spacing: -0.02em;
    `,
    large: () => `
      font-size: 1.5rem;
      line-height: 34px;
      letter-spacing: -0.01em;
    `,
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },

  spacing: {
    base: 8,
  },

  media: {
    sm: '(max-width: 768px)',
    md: '(min-width : 769px) and (max-width : 1200px)',
    lg: '(min-width: 1201px)',
  },
};
