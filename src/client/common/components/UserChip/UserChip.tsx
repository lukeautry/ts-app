import React from "react";
import styled from "styled-components";
import Gravatar from "react-gravatar";
import { gravatarSize, navBgDark } from "../../variables";

interface IUserChipProps {
  email: string;
  name: string;
}

const Container = styled.div`
  display: flex;
  background-color: ${navBgDark};
  margin-bottom: 5px;
`;

const GravatarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 8px 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  padding: 0 10px;
`;

const InfoInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  height: 100%;
`;

const NameContainer = styled.div`
  color: white;
  font-size: 14px;
  margin-bottom: 3px;
  white-space: pre;
  text-overflow: ellipsis;
  width: 100%;
`;

const EmailContainer = styled.div`
  font-size: 12px;
  color: #b9b9b9;
`;

export const UserChip: React.FC<IUserChipProps> = ({ email, name }) => {
  return (
    <Container>
      <GravatarContainer>
        <Gravatar
          email={email}
          size={gravatarSize}
          style={{ borderRadius: "50%" }}
        />
      </GravatarContainer>
      <InfoContainer>
        <InfoInnerContainer>
          <NameContainer>{name}</NameContainer>
          <EmailContainer>{email}</EmailContainer>
        </InfoInnerContainer>
      </InfoContainer>
    </Container>
  );
};
