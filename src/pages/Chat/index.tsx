import { useRecoilValue } from 'recoil';
import Heading from '../../components/Heading';
import useMessages from '../../hook/useMessage';
import { authUser } from '../../provider';
import React from 'react';

const Chat = () => {
  const { allMessage, sendMessages } = useMessages();
  const authUserValue = useRecoilValue(authUser);
  const [sendMessage, setSendMessage] = React.useState('');

  const messageSent = async () => {
    await sendMessages(sendMessage);
    setSendMessage('');
  };

  return (
    <div className='m-10 h-screen'>
      <div className=' h-4/5 overflow-y-auto rounded-lg bg-slate-100 !shadow-2xl'>
        <Heading text='All Messages' type='heading' className='flex justify-center' />
        <div>
          <ul>
            {allMessage?.map(message =>
              authUserValue?.user?.id === message?.profile_id ? (
                <div key={message.id} className='m-2 flex justify-end space-x-2'>
                  <li className='rounded-lg bg-blue-500 p-2 text-white'>{message.content}</li>
                  <div className='relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600'>
                    <span className='font-medium text-gray-600 dark:text-gray-300'>HK</span>
                    <span className='absolute top-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800'></span>
                  </div>
                </div>
              ) : (
                <div key={message.id} className='m-2 flex justify-start space-x-2'>
                  <div className='relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600'>
                    <span className='font-medium text-gray-600 dark:text-gray-300'>MK</span>
                    <span className='absolute top-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800'></span>
                  </div>
                  <li className='rounded-lg bg-green-500 p-2 text-white'>{message.content}</li>
                </div>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className='1/5'>
        <div className='relative'>
          <textarea
            value={sendMessage}
            className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
            onChange={event => setSendMessage(event.target.value)}
          />
          <button
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none'
            onClick={messageSent}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
