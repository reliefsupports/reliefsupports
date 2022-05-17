import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import MedicalIcon from 'assets/icons/medical';
import VerifiedIcon from 'assets/icons/Verified';
import CommentIcon from 'assets/icons/Comment';

import { IEntry } from 'types';
import PageLayout from 'layouts/PageLayout';

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
} from 'utils/entries';

import {
  Conatiner,
  Header,
  Heading,
  ID,
  Meta,
  Labels,
  Label,
  Body,
  Phone,
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

export default function EntrySingle() {
  const location = useLocation();
  const [showComments, setShowComments] = useState(false);

  const state = location.state as IEntry;
  const { id, summary, createdAt, author } = state;

  const onClick = () => {
    setShowComments(true);
  };

  const onBlur = () => {
    setShowComments(false);
    // todo
  };

  const showIcon = getCategory(state) === 'medicine' ? true : false;

  return (
    <PageLayout>
      <Conatiner>
        <Labels>
          <Label>{getReqType(state)}</Label>
          <Label>{getReqPriority(state)}</Label>
        </Labels>

        <Header>
          <Heading>
            <ID>{id}</ID> - {summary}
          </Heading>
          <Meta>
            At <span>{getDistrict(state)}</span>,{' '}
            {dayjs(createdAt).format('MMM DD, YYYY HH:mm')} &bull;{' '}
            <span>
              {` by ${author.name}`}{' '}
              {author.orgnization && (
                <span>{` on behalf of ${author.orgnization}`} </span>
              )}
            </span>
            &bull; <span>{getStatus(state)}</span>
          </Meta>
        </Header>

        <Body dangerouslySetInnerHTML={{ __html: state.body }} />

        <Phone>Phone: {state.author.phone}</Phone>

        {/* <CommentsArea onClick={onClick}>
          <Icon>
            {' '}
            <CommentIcon />
          </Icon>
          <p> Comment</p>
        </CommentsArea>
        {showComments && <CommentsInput onBlur={onBlur} />} */}
      </Conatiner>
    </PageLayout>
  );
}
