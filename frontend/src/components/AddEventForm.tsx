import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from './TextInput';

const AddEventForm = ({ getEvents }: { getEvents: () => Promise<void> }) => {
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
              .matches(/^([^0-9]*)$/, 'Numbers not allowed')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .matches(/^([^0-9]*)$/, 'Numbers not allowed')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            date: Yup.date().min(new Date(), 'Must be a future date'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await axios.post('http://localhost:3000/events', {
              ...values,
            });

            setSubmitting(false);
            getEvents();
          }}
        >
          <Form>
            <TextInput
              label='First Name'
              name='firstName'
              type='text'
              placeholder='Jane'
            />

            <TextInput
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Doe'
            />

            <TextInput
              label='Email Address'
              name='email'
              type='email'
              placeholder='michalrosa@mail.com'
            />

            <TextInput label='Date' name='date' type='datetime-local' />

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
