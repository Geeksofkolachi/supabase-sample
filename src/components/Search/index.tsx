interface SearchType {
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
}
const Search: React.FC<SearchType> = ({ setFilterText }) => {
  return (
    <form>
      <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <input
          type='text'
          id='default-search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500  dark:text-black dark:placeholder-gray-400'
          placeholder='Search Users'
          onChange={event => setFilterText(event.target.value)}
          required
        />
        <button
          type='submit'
          className='absolute right-2.5 bottom-2.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white focus:outline-none'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
