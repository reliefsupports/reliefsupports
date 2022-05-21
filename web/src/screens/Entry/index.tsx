import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import VerifiedIcon from 'assets/icons/Verified';

import AuthContext from 'contexts/Auth';
import PageLayout from 'layouts/PageLayout';
import TextArea from 'components/TextArea';

import { IEntry } from 'types';

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
  const { user }: any = useContext(AuthContext);
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

        {user && user?.userRole === 'moderator' && (
          <div>
            <p>Approve</p>
            <p>Reject</p>
          </div>
        )}

        <Tabs>
          <TabList>
            <Tab>Responses</Tab>
            <Tab>Activity Logs</Tab>
          </TabList>
          <TabPanel>
            {!!user && (
              <div>
                <p>Responses</p>
                <TextArea />
              </div>
            )}
            <div>All the responses goes here</div>
          </TabPanel>
          <TabPanel>
            <div>Activity logs goes here</div>
          </TabPanel>
        </Tabs>
      </Conatiner>
    </PageLayout>
  );
}
