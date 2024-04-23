import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import InfoRow from '@arcblock/ux/lib/InfoRow';
import Button from '@arcblock/ux/lib/Button';

export default function ProfileDisplay({ userInfo, setMode }) {
  const { t } = useTranslation();

  return (
    <div>
      <InfoRow nameWidth={80} name={t('userName')}>
        {userInfo.userName ?? ''}
      </InfoRow>
      <InfoRow nameWidth={80} name={t('phone')}>
        {userInfo.phone ?? ''}
      </InfoRow>
      <InfoRow nameWidth={80} name={t('mail')}>
        {userInfo.mail ?? ''}
      </InfoRow>

      <Button
        variant="contained"
        color="primary"
        className="button"
        onClick={() => {
          setMode('edit');
        }}>
        {t('edit')}
      </Button>
    </div>
  );
}

ProfileDisplay.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
};
