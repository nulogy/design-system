import { createGlobalStyle } from "styled-components";
import { theme } from "@nulogy/components";

const HighlightStyles = createGlobalStyle`

.hljs, code {
  display: block;
  overflow-x: auto;
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  padding: ${theme.space.x2};
  box-shadow: ${theme.shadows.medium};
  color: ${theme.colors.darkBlue};
  border-radius: 4px;
  margin-bottom: ${theme.space.x3};
}

.hljs-tag,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-strong,
.hljs-name {
  color: ${theme.colors.blackBlue};
}

.hljs-code {
  color: ${theme.colors.darkBlue};
}

.hljs-class .hljs-title {
  color: ${theme.colors.darkBlue};
}

.hljs-attribute,
.hljs-symbol,
.hljs-regexp,
.hljs-link {
  color: ${theme.colors.darkBlue};
}

.hljs-string,
.hljs-bullet,
.hljs-subst,
.hljs-title,
.hljs-section,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: ${theme.colors.green};
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-selector-id {
  font-weight: 500;
}
`;

export default HighlightStyles;
