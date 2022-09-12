import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }: any) => {
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

const AddEventForm = () => {
  return (
    <div className='w-96 bg-slate-100 rounded-lg  mx-auto text-zinc-600 '>
      <div className='w-10/12 mx-auto py-6'>
        <h2 className='text-center'>Add new event</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            date: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            date: Yup.date().min(new Date(), 'Must be a future date'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyTextInput
              label='First Name'
              name='firstName'
              type='text'
              placeholder='Jane'
            />

            <MyTextInput
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Doe'
            />

            <MyTextInput
              label='Email Address'
              name='email'
              type='email'
              placeholder='michalrosa@mail.com'
            />

            <MyTextInput label='Date' name='date' type='datetime-local' />

            <button
              type='submit'
              className='bg-slate-600 rounded-lg px-10 py-2 text-sky-100'
            >
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default AddEventForm;
