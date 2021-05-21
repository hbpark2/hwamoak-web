import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from '../shared';
import sanitizeHtml from 'sanitize-html';
const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Comment = ({ author, payload }) => {
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, '<mark>$&</mark>'),
    { allowedTags: ['mark'] },
  );

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      ></CommentCaption>
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
