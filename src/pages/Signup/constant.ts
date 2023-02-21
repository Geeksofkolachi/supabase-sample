import { UseFormGetValues } from 'react-hook-form';
import { SignUpType } from '../../types';

export enum registerPassword {
  PASSWORD = 'password',
  CONFIRMPASSWORD = 'confirmPassword',
}

const registerPasswordField = {
  name: registerPassword.PASSWORD,
  title: 'Password',
  placeholder: 'Enter Password',
};

const confirmPasswordField = (getValues: UseFormGetValues<SignUpType>) => ({
  name: registerPassword.CONFIRMPASSWORD,
  title: 'Confirm Password',
  placeholder: 'Enter Confirm Password',
  rules: {
    validate: {
      matchPassword: (value?: string) => value === getValues().password || 'Passwords do not match',
    },
  },
});

export const registerPasswordFields = [registerPasswordField, confirmPasswordField];
