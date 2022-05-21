import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import VerifiedIcon from 'assets/icons/Verified';

import { IEntry, IComment } from 'types';
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
  buildCommentsTree,
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
} from './styled';
import TextArea from '../../components/TextArea';
import { Formik } from 'formik';
import { Button } from '../../components/core';
import { createComment } from '../../api/entries';
import { useMemo, useState } from 'react';

interface ICommentEditorProps {
  postId: string;
  replyingTo?: string;
}

const initialValues: any = {
  body: '',
};

function CommentEditor({ postId, replyingTo }: ICommentEditorProps) {
  return (
    <Formik
      initialValues={initialValues}
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

function Comment(comment: IComment & { postId: string }): JSX.Element {
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
        {showReply && (
          <CommentEditor postId={comment.postId} replyingTo={comment.id} />
        )}
        {comment?.children?.map((c) => (
          <Comment key={`reply_${c.id}`} postId={comment.postId} {...c} />
        ))}
      </div>
    </div>
  );
}

export default function EntrySingle() {
  const location = useLocation();

  const state = location.state as IEntry;
  const { id, createdAt, isVerified } = state;

  const commentsTree = useMemo(() => {
    return buildCommentsTree(state.comments || []);
  }, [state.comments]);

  console.log(commentsTree);

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
            At <span>{getDistrict(state)}</span>,{' '}
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
      {commentsTree.map((c) => (
        <Comment key={`comment_${c.id}`} postId={state.id} {...c} />
      ))}
      <CommentEditor postId={id} />
    </PageLayout>
  );
}
