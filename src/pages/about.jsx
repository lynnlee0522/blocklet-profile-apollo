import { useTranslation } from 'react-i18next';
import StoreLogo from '@arcblock/icons/lib/StoreLogoNotext';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import Dashboard from '@blocklet/ui-react/lib/Dashboard';

import Profile from '../components/Profile';
import LocaleSelector from '../components/LocaleSelector';

const groupedLinks = [
  {
    icon: <TerminalOutlinedIcon />,
    children: [
      { url: '/home', title: 'Home', icon: <WidgetsOutlinedIcon /> },
      { url: '/about', title: 'profile', icon: <TerminalOutlinedIcon /> },
    ],
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <Dashboard
      links={groupedLinks}
      title="Blocklets"
      headerProps={{
        brand: `${t('title')}`,
        addons: <LocaleSelector />,
        logo: <StoreLogo height={54} />,
      }}
      fullWidth
      legacy={false}>
      <Profile />
    </Dashboard>
  );
}
