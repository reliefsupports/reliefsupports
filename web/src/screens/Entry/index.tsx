import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import VerifiedIcon from 'assets/icons/Verified';

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
} from 'utils/entries';

import {
  Conatiner,
  Header,
  Heading,
  ID,
  Meta,
  Category,
  Labels,
  Label,
  Body,
  Phone,
} from './styled';

export default function EntrySingle() {
  const location = useLocation();

  const state = location.state as IEntry;
  const { id, createdAt, isVerified } = state;

  return (
    <PageLayout>
      <Conatiner>
        <Labels>
          <Label>{getReqType(state)}</Label>
          <Label>{getReqPriority(state)}</Label>
        </Labels>

        <Header>
          <Heading>
            <ID>{id}</ID> - {getSummary(state)} {isVerified && <VerifiedIcon />}
          </Heading>
          <Meta>
            In <Category>{getCategory(state)}</Category> &bull;{' '}
            <span>{getDistrict(state)}</span>,{' '}
            {dayjs(createdAt).format('MMM DD, YYYY HH:mm')} &bull;{' '}
            <span>
              {` by ${getAuthorName(state)}`}{' '}
              {getOrganization(state) && (
                <span>{` on behalf of ${getOrganization(state)}`} </span>
              )}
            </span>
            &bull; <span>{getStatus(state)}</span>
          </Meta>
        </Header>

        <Body dangerouslySetInnerHTML={{ __html: state.body }} />

        <Phone>Phone: {state.author.phone}</Phone>
      </Conatiner>
    </PageLayout>
  );
}
