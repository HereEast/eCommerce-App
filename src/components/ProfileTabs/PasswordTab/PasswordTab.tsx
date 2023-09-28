import { Formik } from 'formik';
import { ReactElement } from 'react';
import { PasswordField } from '../../shared/PasswordField';
import { Input } from '../../../types/enums.ts';
import { Button } from '../../shared/Button';
import styles from './passwordTab.module.scss';
import { initialChangePassord } from '../../../constant';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/user/selectors';
import { useAppDispatch } from '../../../store/store.ts';
import { updPasswordThunk } from '../../../store/user/thunks';
import { IUpdPasswordData } from '../../../store/user/types';
import { Notice } from '../../shared/Notice';
import { useProfileMessages } from '../../../hooks';
import { Loader } from '../../shared/Loader';

export interface IChangePassword {
  password: string;
  newPassword: string;
}

function PasswordTab(): ReactElement {
  const [editStatus, editError, isSuccess, isEditMode, toggleEditMode] = useProfileMessages();
  const user = useSelector(selectUserData);
  const dispatch = useAppDispatch();

  function handleSubmit(values: IChangePassword): void {
    const updPassData: IUpdPasswordData = {
      email: user.email,
      passwordData: {
        id: user.id,
        version: user.version,
        currentPassword: values.password,
        newPassword: values.newPassword,
      },
    };
    dispatch(updPasswordThunk(updPassData));
  }

  return (
    <div className={styles.root}>
      {!isEditMode && (
        <div>
          <div>
            <div className={styles.root__label}>Password</div>
            <input className={styles.root__input} type="password" value="********" disabled aria-label="password" />
          </div>
          <button className={styles.root__editBtn} type="button" onClick={toggleEditMode}>
            Change password
          </button>
          {isSuccess && <Notice text={'Profile information was successfully updated ٩(｡•́‿•̀｡)۶'} type="success" />}
        </div>
      )}
      {isEditMode && (
        <>
          <Formik initialValues={initialChangePassord} onSubmit={handleSubmit} validateOnBlur={false}>
            {({ handleSubmit, errors, touched, setFieldTouched, values }): ReactElement => (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <PasswordField
                  fieldName={Input.Password}
                  placeholder="Password"
                  value={values.password}
                  error={errors?.password}
                  touched={touched?.password}
                  setFieldTouched={setFieldTouched}
                  isDisabled={editStatus === 'loading'}
                />
                <PasswordField
                  formName="register"
                  fieldName={Input.NewPassword}
                  placeholder="New password"
                  value={values[Input.NewPassword]}
                  error={errors?.[Input.NewPassword]}
                  touched={touched?.[Input.NewPassword]}
                  setFieldTouched={setFieldTouched}
                  isDisabled={editStatus === 'loading'}
                />
                <Button
                  type="submit"
                  name={editStatus === 'loading' ? <Loader type="points" /> : 'Save changes'}
                  className={styles.form__button}
                  disabled={editStatus === 'loading'}
                />
                <button type="button" className={styles.rootEdit__closeBtn} onClick={toggleEditMode}>
                  Close
                </button>
              </form>
            )}
          </Formik>
          {editError && <Notice text="Something bad happened... Try again! (つω`｡)" type="error" />}
        </>
      )}
    </div>
  );
}

export default PasswordTab;
