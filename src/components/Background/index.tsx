const Background = () => {
  return (
    <div className='fixed -z-20 h-full w-full bg-amber-50 blur-[300px]'>
      {/* Circle One */}
      <div className='-z-10 -mt-40 -ml-24 h-96 w-96 rounded-full bg-green-400 ' />
      <div className='flex justify-between'>
        {/* Circle Two */}
        <div className='-m-40 mt-20 h-80 w-80 rounded-full bg-rose-600 ' />
        {/* Circle Three */}
        <div className='bg-secondary-blue ml-32 h-56 w-56 rounded-full ' />
        {/* Circle Four */}
        <div className='h-[30rem] w-[30rem] rounded-full bg-teal-300 ' />
      </div>
    </div>
  );
};

export default Background;
