import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import dayjs from 'dayjs';

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
import { createComment, deleteComment } from '../../api/entries';
import { useMemo, useState } from 'react';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

const CommentsContext = createContext({
  onAddComment: (comment: IComment) => {},
  onDeleteComment: (comment: IComment) => {},
  postId: '',
});

interface ICommentEditorProps {
  replyingTo?: string;
}

const commentEditorInitialValues = {
  body: '',
};

function CommentEditor({ replyingTo }: ICommentEditorProps) {
  const { postId, onAddComment: updateComments } = useContext(CommentsContext);

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
            label={replyingTo ? 'Reply' : 'Comment'}
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { postId, onDeleteComment } = useContext(CommentsContext);

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
        {!comment.deleted && (
          <>
            <Button onClick={() => setShowReply(!showReply)}>
              {showReply ? 'Hide reply' : 'Reply'}
            </Button>
            <Button onClick={() => setShowDeleteConfirmation(true)}>
              Delete
            </Button>
          </>
        )}
        <ConfirmationDialog
          open={showDeleteConfirmation}
          title="Delete Comment"
          description="Are you sure you want to delete this comment?"
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={async () => {
            const deletedComment = await deleteComment(postId, comment.id);
            onDeleteComment(deletedComment);
            setShowDeleteConfirmation(false);
          }}
        />
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
            <CommentsContext.Provider
              value={{
                onAddComment: (comment: IComment) => {
                  navigate(``, {
                    replace: true,
                    state: { ...state, comments: [...state.comments, comment] },
                  });
                },
                onDeleteComment: (comment: IComment) => {
                  navigate(``, {
                    replace: true,
                    state: {
                      ...state,
                      comments: [
                        ...state.comments.filter((c) => c.id !== comment.id),
                        comment,
                      ],
                    },
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
          </TabPanel>
          <TabPanel>
            <div>Activity logs goes here</div>
          </TabPanel>
        </Tabs>
      </Conatiner>
    </PageLayout>
  );
}
