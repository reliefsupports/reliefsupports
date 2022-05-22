import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import VerifiedIcon from 'assets/icons/Verified';

import { IEntry, IComment } from 'types';
import AuthContext from 'contexts/Auth';
import PageLayout from 'layouts/PageLayout';
import TextArea from 'components/TextArea';

import {
  getReqType,
  getReqPriority,
  getAuthorName,
  getStatus,
  getDistrict,
  getCategory,
  getSummary,
  getOrganization,
  buildCommentsTree,
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
import { Formik } from 'formik';
import { Button } from '../../components/core';
import { createComment } from '../../api/entries';
import { useMemo, useState } from 'react';

const CommentsContext = createContext({
  updateComments: (comments: IComment) => {},
  postId: '',
});

interface ICommentEditorProps {
  replyingTo?: string;
}

const commentEditorInitialValues = {
  body: '',
};

function CommentEditor({ replyingTo }: ICommentEditorProps) {
  const { postId, updateComments } = useContext(CommentsContext);

  return (
    <Formik
      initialValues={commentEditorInitialValues}
      validate={(values) => {
        const errors: any = {};
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        values.body = '<p>'.concat(values.body, '</p>');
        const response = await createComment(postId, {
          ...values,
          ...(replyingTo && { parent: replyingTo }),
          ...{
            author: {
              name: 'Snoop dogg',
              phone: '+94711111111',
              avatarUrl: null,
              orgnization: null,
            },
          },
        });
        if (response) {
          setSubmitting(false);
          resetForm();
          updateComments(response);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <TextArea
            name="body"
            label="Comment"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
            error={errors.body}
            touched={touched.body}
          />
          <div style={{ marginTop: 20 }}>
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

function Comment(comment: IComment): JSX.Element {
  const [showReply, setShowReply] = useState(false);

  return (
    <div
      style={{
        borderLeft: '1px solid #e6e6e6',
      }}
      id={`comment_${comment.id}`}
    >
      <Body dangerouslySetInnerHTML={{ __html: comment.body }} />
      <Meta>
        {dayjs(comment.createdAt).format('MMM DD, YYYY HH:mm')} &bull;{' '}
        <span>
          {` by ${getAuthorName(comment)}`}{' '}
          {getOrganization(comment) && (
            <span>{` on behalf of ${getOrganization(comment)}`} </span>
          )}
        </span>
      </Meta>
      <div style={{ paddingLeft: '1rem' }}>
        <Button
          onClick={() => setShowReply(!showReply)}
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #f5f5f5',
            color: '#000',
          }}
        >
          {showReply ? 'Hide reply' : 'Reply'}
        </Button>
        {showReply && <CommentEditor replyingTo={comment.id} />}
        {comment?.children?.map((c) => (
          <Comment key={`reply_${c.id}`} {...c} />
        ))}
      </div>
    </div>
  );
}

export default function EntrySingle() {
  const { user }: any = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as IEntry;
  const { id, createdAt, isVerified } = state;

  const commentsTree = useMemo(() => {
    return buildCommentsTree(state.comments || []);
  }, [state.comments]);

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

        {!!user && (
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
      <CommentsContext.Provider
        value={{
          updateComments: (comment: IComment) => {
            navigate(``, {
              state: { ...state, comments: [...state.comments, comment] },
            });
          },
          postId: id,
        }}
      >
        {commentsTree.map((c) => (
          <Comment key={`comment_${c.id}`} {...c} />
        ))}
        <CommentEditor />
      </CommentsContext.Provider>
    </PageLayout>
  );
}
