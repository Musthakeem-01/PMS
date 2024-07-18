import * as Icons from '@mui/icons-material';

const getIconComponent = (iconName) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) {
    // Handle the case when the icon does not exist
    return Icons.HelpOutline; // Default icon or fallback
  }
  return IconComponent;
};

export default getIconComponent;
