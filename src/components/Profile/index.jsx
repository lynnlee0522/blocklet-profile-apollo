import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ProfileDisplay from '../ProfileDisplay';
import ProfileEdit from '../ProfileEdit';

import styles from './index.module.css';

const FIND_USER_QUERY = gql`
  query FindUser($did: String!) {
    findUser(did: $did) {
      did
      userName
      mail
      phone
    }
  }
`;

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [mode, setMode] = useState('show');

  const { loading, error, data, refetch } = useQuery(FIND_USER_QUERY, {
    variables: { did: window.blocklet.did },
  });

  useEffect(() => {
    setUserInfo(data?.findUser ?? {});
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles.container}>
      {mode === 'show' ? (
        <ProfileDisplay userInfo={userInfo} setMode={setMode} />
      ) : (
        <ProfileEdit userInfo={userInfo} setMode={setMode} refetch={refetch} />
      )}
    </div>
  );
}
