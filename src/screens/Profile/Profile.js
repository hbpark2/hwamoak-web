import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';

import React from 'react';
import { useParams } from 'react-router';
import { PHOTO_FRAGMENT } from 'fragments';
import styled from 'styled-components';
import { FatText } from 'components/common/shared';
import {
  faHeart,
  faComment,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/auth/Button';
import { PageTitle } from 'components/common/PageTitle';
import useUser from 'Hooks/useUser';
import Layout from 'components/Layout/Layout';
import { Link } from 'react-router-dom';
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from '../../Scheme/userScheme';

const Header = styled.div`
  display: flex;
  svg {
    font-size: 160px;
    margin-left: 50px;
    margin-right: 150px;
  }
  @media screen and (max-width: 1024px) {
    justify-content: space-between;
    padding: 0 20px;

    svg {
      margin: 0;
      font-size: 100px;
    }
  }
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
    margin: 0;
  }
`;

const Column = styled.div`
  @media screen and (min-width: 1280px) {
    width: 400px;
  }
`;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
`;

const UserNameWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 14px;
`;
const Name = styled(FatText)`
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    margin: 30px 0 0;
    grid-auto-rows: 130px;
    gap: 10px;
  }
`;

const Photo = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
const ProfileBtn = styled(Button).attrs({
  as: 'span',
})`
  width: 60%;
  margin-left: 10px;
  margin-top: 0;
  cursor: pointer;
  background: ${props => props.theme.contentBg};
  border: ${props => props.theme.contentBorder};
  color: #333;
  transition: all 0.3s;
  @media screen and (min-width: 1280px) {
    &:hover {
      background: #333;
      color: ${props => props.theme.bgColor};
    }
  }
`;

const ModifyLink = styled(Link)`
  width: 60%;
  margin-left: 10px;
  margin-top: 0;
  padding: 8px 0px;
  cursor: pointer;
  border-radius: 3px;
  background: ${props => props.theme.contentBg};
  border: ${props => props.theme.contentBorder};
  text-align: center;
  color: #333;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s;
  @media screen and (min-width: 1280px) {
    width: 60%;
    &:hover {
      background: #333;
      color: ${props => props.theme.bgColor};
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: unfollowUserUpdate,
  });

  const followUserCompleted = data => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    onCompleted: followUserCompleted,
  });

  const getButton = seeProfile => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <ModifyLink
          to={{
            pathname: `/edit/${data?.seeProfile?.username}`,
            state: {
              username: data?.seeProfile?.username,
              avatar: data?.seeProfile?.avatar,
            },
          }}
        >
          프로필 수정
        </ModifyLink>
      );
    }

    if (isFollowing) {
      return <ProfileBtn onClick={unfollowUser}>팔로우 취소</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={followUser}>팔로우</ProfileBtn>;
    }
  };
  return (
    <Layout>
      <PageTitle
        title={
          loading ? 'Loading . . . ' : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <Header>
        {data?.seeProfile?.avatar ? (
          <Avatar src={data?.seeProfile?.avatar} />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} color="#8c8c82" />
        )}

        <Column>
          <UserNameWrap>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data?.seeProfile) : null}
          </UserNameWrap>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map(photo => (
          <Photo key={photo.id} bg={photo.images[0].file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </Layout>
  );
};

export default Profile;
