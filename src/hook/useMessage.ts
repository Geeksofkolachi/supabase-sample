import React from 'react';
import { supabase } from '../supabase';
import { authUser } from '../provider';
import { useRecoilValue } from 'recoil';
import { MessagesType } from '../types';

const useMessages = () => {
  const [allMessage, setAllMessages] = React.useState<MessagesType[] | null>([]);
  const authUserValue = useRecoilValue(authUser);
  React.useEffect(() => {
    const getData = async () => {
      if (supabase) {
        const { data: allMessagesData } = await supabase.from('messages').select();
        const msg: MessagesType[] | undefined = allMessagesData?.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        if (msg) {
          setAllMessages(msg);
        }
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (supabase) {
      const subscription = supabase
        .channel('RealTimeChat')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          payload => {
            setAllMessages((current: any) => [...current, payload.new]);
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const sendMessages = async (content: string) => {
    if (content) {
      if (supabase) {
        await supabase
          .from('messages')
          .insert({
            content: content,
            profile_id: authUserValue?.user?.id,
            username: 'Hassan Khan',
          })
          .select();
      }
    }
  };

  return {
    allMessage,
    sendMessages,
  };
};

export default useMessages;
