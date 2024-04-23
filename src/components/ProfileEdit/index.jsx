import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import InfoRow from '@arcblock/ux/lib/InfoRow';
import Button from '@arcblock/ux/lib/Button';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import useSnackbar from '../../hooks/use-snackbar';

// import '../../../node_modules/react-international-phone/style.css';
import styles from './index.module.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const SAVE_USER_MUTATION = gql`
  mutation SaveUser($user: UserInput!) {
    saveUser(user: $user)
  }
`;

export default function ProfileEdit({ userInfo, setMode, refetch }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [saveUserMutation] = useMutation(SAVE_USER_MUTATION);
  const { showMsg, SnackbarComponent } = useSnackbar();

  const saveUserToDatabase = async (userData) => {
    try {
      const { data } = await saveUserMutation({ variables: { user: userData } });
      return data.saveUser;
    } catch (error) {
      console.error(error); // 处理错误
      return false;
    }
  };

  const handleCancel = () => {
    setMode('show');
  };

  const formik = useFormik({
    initialValues: {
      userName: userInfo.userName ?? '',
      phone: userInfo.phone ?? '',
      mail: userInfo.mail ?? '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      userName: Yup.string().max(15, t('userNameValid')),
      phone: Yup.string().test('valid', t('phoneValid'), (value) => {
        try {
          const result = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value));
          return result;
        } catch (error) {
          return false;
        }
      }),
      mail: Yup.string().email(t('mailValid')),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const result = await saveUserToDatabase({ did: window.blocklet.did, ...values });
      if (result) {
        setIsLoading(false);
        showMsg('success');
        refetch();
        setTimeout(() => {
          setMode('show');
        }, 1000);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InfoRow nameWidth={80} name={t('userName')}>
        <TextField
          label="userName"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formik.errors?.userName}
          helperText={formik.errors.userName}
          {...formik.getFieldProps('userName')}
        />
      </InfoRow>
      <InfoRow nameWidth={80} name={t('phone')} style={{ overflow: 'visible' }} className={styles.phone}>
        <TextField
          label="phone"
          color="primary"
          fullWidth
          error={!!formik.errors?.phone}
          helperText={formik.errors.phone}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <PhoneInput
                defaultCountry="cn"
                {...formik.getFieldProps('phone')}
                onChange={(value) => {
                  formik.setFieldValue('phone', value);
                }}
              />
            ),
          }}
        />
      </InfoRow>
      <InfoRow nameWidth={80} name={t('mail')}>
        <TextField
          label="mail"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formik.errors?.mail}
          helperText={formik.errors.mail}
          {...formik.getFieldProps('mail')}
        />
      </InfoRow>

      <Button variant="contained" color="primary" type="submit" loading={isLoading}>
        {t('save')}
      </Button>
      <Button variant="contained" className={styles.cancelBtn} onClick={handleCancel}>
        {t('cancel')}
      </Button>
      <SnackbarComponent />
    </form>
  );
}

ProfileEdit.propTypes = {
  userInfo: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
