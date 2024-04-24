import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem } from '@mui/material';

export default function LocaleSelector() {
  const [selectedValue, setSelectedValue] = useState('en');
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select labelId="dropdown-label" id="dropdown" value={selectedValue} onChange={handleChange}>
      <MenuItem value="zh">简体中文</MenuItem>
      <MenuItem value="en">English</MenuItem>
    </Select>
  );
}
