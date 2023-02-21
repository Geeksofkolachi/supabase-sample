import React from 'react';
import { useRecoilValue } from 'recoil';
import { MdDelete } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import Empty from '../Empty';
import Search from '../Search';
import Delete from '../Delete';
import Heading from '../Heading';
import useAuth from '../../hook/useAuth';
import { SearchUserData } from '../../utils';
import CreateUpdate from '../CreateAndUpdate';
import { AllUser, CRUD } from '../../types';
import { useSupabase } from '../../hook/useSupbase';
import { authUser, userData } from '../../provider';
import { ROUTES } from '../../routes';

const Home = () => {
  const { getAllUser } = useSupabase();
  const { signout } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [modal, setModal] = React.useState(0);
  const [defaultUser, setDefaultUser] = React.useState<AllUser[]>();
  const [btnText, setBtnText] = React.useState<CRUD>(CRUD.CREATE);
  const [selectedId, setSelectedId] = React.useState(0);
  const [filterText, setFilterText] = React.useState('');
  const allUserData = useRecoilValue(userData);
  const isLogin = useRecoilValue(authUser);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogin) {
      getAllUser();
    } else {
      navigate(ROUTES.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userCreate = () => {
    setModal(1);
    setShowModal(true);
    setBtnText(CRUD.CREATE);
  };

  const editUser = (id: number) => {
    const filterUser = allUserData?.filter(item => item.id === id);
    setDefaultUser(filterUser);
    setModal(2);
    setShowModal(true);
    setBtnText(CRUD.UPDATE);
  };

  const deleteUser = async (id: number) => {
    setSelectedId(id);
    setModal(3);
    setShowModal(true);
  };

  const filteredItems = React.useMemo(() => SearchUserData(allUserData, filterText), [filterText, allUserData]);

  return (
    <div className='m-10'>
      <div className='flex justify-between'>
        <Heading text='All Users' type='title' />
        <button
          className='mr-1 mb-1 rounded bg-purple-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none '
          onClick={signout}
        >
          Sign out
        </button>
      </div>
      <Search {...{ setFilterText }} />
      <div className='mt-4 flex justify-end'>
        <div>
          <button
            className='mr-1 mb-1 rounded bg-purple-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none '
            onClick={userCreate}
          >
            Create User
          </button>
        </div>
      </div>

      <DataTable
        columns={[
          {
            name: 'First Name',
            selector: row => row?.firstname,
          },
          {
            name: 'Last Name',
            selector: row => row?.lastname,
          },
          {
            name: 'Created At',
            selector: row => row?.created_at,
            width: '300px',
          },
          {
            name: 'Phone Number',
            selector: row => row?.phonenumber,
          },
          {
            name: 'Email Address',
            selector: row => row?.email,
          },
          {
            name: 'Actions',
            selector: row => row?.id,
            cell: row => {
              return (
                <span className='flex space-x-2'>
                  <FaUserEdit size={24} className='cursor-pointer' onClick={() => editUser(row?.id)} />
                  <MdDelete size={24} className='cursor-pointer' onClick={() => deleteUser(row?.id)} />
                </span>
              );
            },
          },
        ]}
        data={filteredItems ?? []}
        pagination
        noDataComponent={<Empty />}
      />

      {modal === 1 && showModal ? <CreateUpdate {...{ showModal, setShowModal, btnText }} /> : null}
      {modal === 2 && showModal && defaultUser ? <CreateUpdate {...{ showModal, setShowModal, defaultUser, btnText }} /> : null}
      {modal === 3 && showModal ? <Delete showModal={showModal} setShowModal={setShowModal} Id={selectedId} /> : null}
    </div>
  );
};
export default Home;
