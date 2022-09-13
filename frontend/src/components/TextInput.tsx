import { useField } from 'formik';

const TextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col my-4'>
      <label className=' py-1' htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className='p-2 text-xs' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='text-sm text-red-500 p-1'>{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
