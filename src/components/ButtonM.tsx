import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const ButtonM: React.FC<LoadingButtonProps> = ({ loading, children, ...buttonProps }) => {
  return (
    <Button
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
      endIcon={loading && <CircularProgress size={20} color="inherit" />}
    >
      {children}
    </Button>
  );
};

export default ButtonM;
