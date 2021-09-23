import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from 'components/shared';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Left = styled.li``;

const Right = styled.li`
  color: ${props => props.theme.red};
  button {
    cursor: pointer;
  }
`;

const Comment = ({ id, photoId, author, payload, isMine }) => {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      //evict : 삭제
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    variables: { id },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Left>
        <Link to={`/users/${author}`}>
          <FatText>{author}</FatText>
        </Link>
        <CommentCaption>
          {payload.split(' ').map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hastags/${word}`}>{word}</Link>{' '}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            ),
          )}
        </CommentCaption>
      </Left>
      <Right>
        {isMine ? <button onClick={onDeleteClick}>삭제</button> : null}
      </Right>
    </CommentContainer>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};

export default Comment;
