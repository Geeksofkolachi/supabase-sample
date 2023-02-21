import React from 'react';
import Heading from '../Heading';
import { useSupabase } from '../../hook/useSupbase';

interface DeleteTypes {
  Id: number;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Delete: React.FC<DeleteTypes> = ({ Id, showModal, setShowModal }) => {
  const { deleteUser } = useSupabase();

  const userDelete = async () => {
    await deleteUser(Id);
    setShowModal(false);
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
                  <h3 className='text-3xl font-semibold'>Delete User</h3>
                  <button
                    className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none'>×</span>
                  </button>
                </div>
                {/*body*/}
                <div className='p-10'>
                  <Heading text='Are You Sure You Want To Delete This User' type='subheading' />
                  <div className='flex justify-center'>
                    <button
                      className='mr-1 mb-1 rounded bg-blue-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none '
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className='mr-1 mb-1 rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none '
                      type='submit'
                      onClick={userDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </>
  );
};

export default Delete;
