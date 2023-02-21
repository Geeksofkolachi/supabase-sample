import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { LoginType } from '../../types';

const Login = () => {
  const { control, handleSubmit } = useForm<LoginType>();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginType> = async data => {
    await login(data);
  };

  return (
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidden'>
      <div className='m-auto w-full rounded-md bg-white p-6 shadow-2xl lg:max-w-xl'>
        <h1 className='text-center text-3xl font-semibold uppercase text-purple-700'>Sign in</h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <Controller
              name={'email'}
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <>
                  <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
                    Email
                  </label>
                  <input
                    type={name}
                    value={value}
                    onChange={onChange}
                    placeholder='Enter Email Address'
                    className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
                  />
                </>
              )}
            />
          </div>
          <div className='mb-2'>
            <Controller
              name={'password'}
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <>
                  <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
                    Password
                  </label>
                  <input
                    type={name}
                    value={value}
                    placeholder='Enter Password'
                    onChange={onChange}
                    className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
                  />
                </>
              )}
            />
          </div>
          <div className='mt-6'>
            <button
              className='w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>

        <p className='mt-8 text-center text-xs font-light text-gray-700'>
          Donot have an account?{' '}
          <a href='/signup' className='font-medium text-purple-600 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
