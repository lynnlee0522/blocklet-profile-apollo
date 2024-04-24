import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@arcblock/ux/lib/ErrorBoundary';
import InfoRow from '@arcblock/ux/lib/InfoRow';
import Button from '@arcblock/ux/lib/Button';

export default function ProfileDisplay({ userInfo, setMode }) {
  const { t } = useTranslation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
    </ErrorBoundary>
  );
}

ProfileDisplay.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
};
