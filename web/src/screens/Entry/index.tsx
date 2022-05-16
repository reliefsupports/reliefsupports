import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IEntry } from 'types';
import PageLayout from 'layouts/PageLayout';
import {
  SingleEntryConatiner,
  Label,
  Div,
  Author,
  InforBox,
  Seperator,
  Title,
  Text,
  StatusLabel,
  Icon,
  CommentsArea,
  CommentsInput,
} from './styled';
import {
  getReqType,
  getReqPriority,
  getAuthorName,
  getStatus,
  getDistrict,
  getCategory,
  getSummary,
  getOrganization,
  IsVerified,
} from '../../utils/entries';

import MedicalIcon from '../../assets/icons/medical';
import VerifiedIcon from '../../assets/icons/Verified';
import Reportcon from '../../assets/icons/Report';
import CommentIcon from '../../assets/icons/Comment';

export default function EntrySingle() {
  const location = useLocation();
  const [showComments, setShowComments] = useState(false);
  var state = location.state as IEntry;

  const onClick = () => {
    setShowComments(true);
  };

  const onBlur = () => {
    setShowComments(false);
    // todo
  };

  console.log(state);
  const showIcon = getCategory(state) === 'medicine' ? true : false;
  return (
    <PageLayout>
      <SingleEntryConatiner>
        <Div>
          <Label>Type: {getReqType(state)}</Label>
          <Label>Priority: {getReqPriority(state)}</Label>
          {showIcon && (
            <Icon>
              <MedicalIcon />
            </Icon>
          )}
        </Div>
        <Div></Div>
        <Div>
          <Author>{getAuthorName(state)}</Author>
          {IsVerified(state) && (
            <Icon>
              <VerifiedIcon />{' '}
            </Icon>
          )}
          <Icon>
            <p>{getOrganization(state)}</p>
          </Icon>
        </Div>
        <Div>
          <InforBox>
            <Title>Category</Title>
            <Text>{getCategory(state)}</Text>
          </InforBox>
          <Seperator />
          <InforBox>
            <Title>District</Title>
            <Text>{getDistrict(state)}</Text>
          </InforBox>
          <Seperator />
          <InforBox>
            <Title>Status</Title>
            <StatusLabel>{getStatus(state)}</StatusLabel>
          </InforBox>
        </Div>

        <InforBox>
          <Title>Looking For</Title>
          <Text>{getSummary(state)}</Text>
        </InforBox>

        <CommentsArea onClick={onClick}>
          <Icon>
            {' '}
            <CommentIcon />
          </Icon>
          <p> Comment</p>
        </CommentsArea>
        {showComments && <CommentsInput onBlur={onBlur} />}
      </SingleEntryConatiner>
    </PageLayout>
  );
}
