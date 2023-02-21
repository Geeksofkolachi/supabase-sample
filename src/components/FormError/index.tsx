import { AiOutlineWarning } from 'react-icons/ai';

const FormError: React.FC<{ error: string | undefined }> = ({ error }) => {
  if (!error) return null;

  return (
    <div className='mt-1 ml-2 flex items-center gap-1 text-xs text-red-500'>
      <div>
        <AiOutlineWarning />
      </div>
      <p>{error}</p>
    </div>
  );
};

export default FormError;
