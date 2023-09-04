import styles from './profile.module.scss';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { selectUserData, selectUserLoadingInfo } from '../../store/user/selectors';
import { getUserThunk } from '../../store/user/thunks';
import { Loader } from '../../components/shared/Loader';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { Tabs } from '../../components/Profile/Tabs';
import { useIsEditMode } from './profileContext';
import { GreetingTitle } from '../../components/Profile/GreetingTitle';
import { selectIsAuthorized } from '../../store/auth/selectors';
import { PATH } from '../../router/constants/paths.ts';
import { Page } from '../../router/types';
import { useNavigate } from 'react-router-dom';

export default function Profile(): ReactElement {
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  const { status, error } = useSelector(selectUserLoadingInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.id) {
      dispatch(getUserThunk());
    }

    if (!isAuthorized) {
      navigate(PATH[Page.Login]);
    }
  }, [user, dispatch]);

  const isEditMode = useIsEditMode();

  return (
    <div className={styles.root}>
      {status === 'loading' && <Loader />}
      {error && <ErrorMessage text={error} />}

      {status === 'success' && !error && (
        <div className={styles.root__container}>
          {!isEditMode && <GreetingTitle />}
          <Tabs />
        </div>
      )}
    </div>
  );
}
