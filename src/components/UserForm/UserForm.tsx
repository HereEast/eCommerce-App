import styles from './UserForm.module.scss';
import { ReactElement } from 'react';
import { useFormik } from 'formik';
import { Input } from '../../types/enums';
import { IFormInputs } from '../../types/interfaces';
import { initialUserValues, dates, months, years } from '../../constant';
import { InputField } from '../input-fields/InputField';
import { SelectField } from '../input-fields/SelectField';
import { PasswordField } from '../input-fields/PasswordField';
import validate from '../../utils/validations';

export default function UserForm(): ReactElement {
  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: (values: IFormInputs): void => {
      console.log('Submit:', values);
    },
    validate,
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
      <InputField formik={formik} name={Input.Email} type="email" placeholder="Email" />
      <PasswordField formik={formik} formName="register" />
      <InputField formik={formik} name={Input.FirstName} placeholder="First name" />
      <InputField formik={formik} name={Input.LastName} placeholder="Last name" />

      <div className="selects__container">
        <div className={styles.selects}>
          <SelectField formik={formik} name={Input.Date} options={dates} />
          <SelectField formik={formik} name={Input.Month} options={months} />
          <SelectField formik={formik} name={Input.Year} options={years} />
        </div>

        {formik.errors.date && formik.touched.date ? (
          <span className={styles.message__error}>{formik.errors.date}</span>
        ) : null}
      </div>

      <button className={styles.button__primary}>Register ( ^ω^)*</button>
    </form>
  );
}