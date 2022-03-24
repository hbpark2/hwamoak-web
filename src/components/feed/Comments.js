import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from 'Hooks/useUser';
import Comment from './Comment';
import { CREATE_COMMENT } from '../../Scheme/commentScheme';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  display: block;
  margin: 10px 0;
  opacity: 0.7;
  font-weight: 600;
  font-size: 12px;
`;

const CommentIptWrap = styled.div`
  margin-top: 5px;
`;

const CommentInput = styled.input``;

const Comments = ({ photoId, author, caption, commentNumber, comments }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue('payload', '');

    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now() + '',
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpdate,
  });

  const onValid = data => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <CommentIptWrap>
        <form onSubmit={handleSubmit(onValid)}>
          <CommentInput
            ref={register({ required: true })}
            name="payload"
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </CommentIptWrap>
    </CommentsContainer>
  );
};
Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
};

export default Comments;
