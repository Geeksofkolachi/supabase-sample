import React from 'react';
import FormInput from '../FormInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabase } from '../../hook/useSupbase';
import { CRUD, AllUser } from '../../types';

interface ModalTypes {
  btnText: CRUD;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  defaultUser?: AllUser[];
}

const CreateUpdate: React.FC<ModalTypes> = ({ btnText, showModal, setShowModal, defaultUser }) => {
  const { control, handleSubmit } = useForm<AllUser>();
  const { createUser, updateUser, getAllUser } = useSupabase();
  const onSubmit: SubmitHandler<AllUser> = async data => {
    if (btnText === CRUD.CREATE) {
      await createUser(data);
      setShowModal(false);
    }
    if (btnText === CRUD.UPDATE && defaultUser?.length) {
      await updateUser(data, defaultUser[0]?.id);
      await getAllUser();
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                  <h3 className='text-3xl font-semibold'>Create User</h3>
                  <button
                    className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none'>×</span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-2 gap-10 p-6'>
                    <div>
                      <Controller
                        name={'firstname'}
                        control={control}
                        defaultValue={defaultUser?.length ? defaultUser[0]?.firstname : ''}
                        render={({ field: { name, onChange, value } }) => (
                          <FormInput
                            label='First Name'
                            name={name}
                            type={name}
                            value={value}
                            placeholder='Enter First Name'
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        name={'phonenumber'}
                        control={control}
                        defaultValue={defaultUser?.length ? defaultUser[0]?.phonenumber : ''}
                        render={({ field: { name, onChange, value } }) => (
                          <FormInput
                            label='Phone Number'
                            name={name}
                            value={value}
                            type={name}
                            placeholder='Enter Phone Number'
                            onChange={onChange}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name={'lastname'}
                        control={control}
                        defaultValue={defaultUser?.length ? defaultUser[0]?.lastname : ''}
                        render={({ field: { name, onChange, value } }) => (
                          <FormInput
                            label='Last Name'
                            name={name}
                            value={value}
                            type={name}
                            placeholder='Enter Last Name'
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        name={'email'}
                        control={control}
                        defaultValue={defaultUser?.length ? defaultUser[0]?.email : ''}
                        render={({ field: { name, onChange, value } }) => (
                          <FormInput
                            label='Email Address'
                            name={name}
                            value={value}
                            type={name}
                            placeholder='Enter Email Address'
                            onChange={onChange}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/*footer*/}
                  <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
                    <button
                      className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className='mr-1 mb-1 rounded bg-purple-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none'
                      type='submit'
                    >
                      {btnText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </>
  );
};

export default CreateUpdate;
