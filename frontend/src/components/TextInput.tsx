import { useField } from 'formik';

type Label = 'First Name' | 'Last Name' | 'Email Address' | 'Date';
type Name = 'firstName' | 'lastName' | 'email' | 'date';
type Type = 'datetime-local' | 'text' | 'email';

interface TextInputProps {
  label: Label;
  name: Name;
  id: Name;
  placeholder?: string;
  type: Type;
}

const TextInput = (props: TextInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col my-4'>
      <label className=' py-1' htmlFor={props.id || props.name}>
        {props.label}
      </label>
      <input className='p-2 text-xs' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='text-sm text-red-500 p-1'>{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
