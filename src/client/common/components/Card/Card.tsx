import styled from "styled-components";
import {
  cardBackgroundColor,
  standardBorderRadius,
  cardBoxShadow,
} from "../../variables";

interface ICardProps {
  expand?: boolean;
}

export const Card = styled.div<ICardProps>`
  display: inline-block;
  ${standardBorderRadius}
  ${cardBackgroundColor}
  ${cardBoxShadow}
`;
