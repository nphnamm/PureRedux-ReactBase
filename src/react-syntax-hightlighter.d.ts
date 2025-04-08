declare module 'react-syntax-highlighter' {
    import * as React from 'react';
  
    export const Light: any;
    export const Prism: any;
    // REMOVE: export const default: any; ❌ this line is illegal
    const SyntaxHighlighter: any;
    export default SyntaxHighlighter;
  }
  
  declare module 'react-syntax-highlighter/dist/esm/styles/prism';
  declare module 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
  