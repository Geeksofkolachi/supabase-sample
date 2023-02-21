import * as React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FormError from '../FormError';

interface FormInputType extends React.ComponentProps<'input'> {
  name?: string;
  label?: string;
  error?: string;
  focus?: boolean;
  className?: string;
  transparent?: boolean;
  preAppendIcon?: boolean;
  containerClassName?: string;
  icon?: React.ReactNode | null;
  noRadius?: boolean;
}

const FormInput: React.FC<FormInputType> = ({ icon, type, error, label, preAppendIcon, containerClassName = '', onBlur, ...rest }) => {
  const [, setIsFocus] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const _label = label ? (
    <label htmlFor={type} className='mb-1 ml-2 block text-xs font-medium text-gray-900 md:text-sm'>
      {label}
    </label>
  ) : null;
  return (
    <div className={`my-3 ${containerClassName}`}>
      {_label}
      <div>
        {icon && preAppendIcon ? icon : null}

        <input
          type={showPass ? 'text' : type}
          className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
          onFocus={() => setIsFocus(true)}
          onBlur={e => {
            setIsFocus(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          {...rest}
        />
        {icon && !preAppendIcon ? icon : null}

        {type === 'password' ? (
          <div className='cursor-pointer' onClick={() => setShowPass(!showPass)}>
            {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        ) : null}
      </div>
      <FormError error={error} />
    </div>
  );
};

export default FormInput;
