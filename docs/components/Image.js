import styled from "styled-components";
import { theme } from "@nulogy/components";

const Image = styled.img({
  background: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=")`,
  padding: theme.space.x3,
  marginBottom: theme.space.x3
});

export default Image;
