import React from 'react';
import { supabase } from '../supabase';
import { AllUser } from '../types';
import { showToast } from '../utils/Toast';
import { useRecoilState } from 'recoil';
import { userData } from '../provider/index';

export const useSupabase = () => {
  const [allUser, setAllUser] = React.useState<AllUser[] | null>([]);
  const [allUserData, setUserData] = useRecoilState(userData);
  const getAllUser = async () => {
    if (supabase) {
      // @ts-ignore
      const { data } = await supabase.from('personaldetails').select('*');
      setAllUser(data);
      setUserData(data);
    }
  };

  const createUser = async (data: AllUser) => {
    if (supabase) {
      try {
        const { data: createUser } = await supabase
          .from('personaldetails')
          .insert({
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
          })
          .select();

        if (allUser && createUser) {
          const clone = JSON.parse(JSON.stringify(allUserData));

          clone.push(createUser[0]);

          setUserData(clone);
          setAllUser(clone);
        }

        setAllUser(JSON.parse(JSON.stringify(createUser)));

        showToast({ type: 'success', message: 'User Created Successfully' });
      } catch (err) {
        showToast({ type: 'error', message: 'Something went wrong' });
      }
    }
  };

  const updateUser = async (data: AllUser, id?: number) => {
    if (supabase) {
      try {
        await supabase
          .from('personaldetails')
          .update({
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
          })
          .match({ id: id })
          .select();

        showToast({ type: 'success', message: 'User Updated Successfully' });
      } catch (err) {
        showToast({ type: 'error', message: 'Something went wrong' });
      }
    }
  };

  const deleteUser = async (id: number) => {
    if (supabase) {
      try {
        const { data } = await supabase.from('personaldetails').delete().match({ id: id }).select();
        if (data) {
          const filterdata = allUserData?.filter(item => item.id !== data[0].id);
          filterdata ? setUserData(filterdata) : null;
        }
        showToast({ type: 'success', message: 'User Deleted Successfully' });
      } catch (err) {
        showToast({ type: 'error', message: 'Something went wrong' });
      }
    }
  };

  return {
    updateUser,
    getAllUser,
    createUser,
    deleteUser,
    allUser,
  };
};
