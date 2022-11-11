import { Formik, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { HandleSubmit } from '../views/Main';
import TextInput from './TextInput';

type SignType = 'register' | 'login';

const SignForm = ({ handleSubmit }: { handleSubmit: HandleSubmit }) => {
  const [signType, setSignType] = useState<SignType>('login');
  return (
    <div className='w-96 bg-slate-100 rounded-lg  mx-auto text-zinc-600 my-8'>
      <div className='w-10/12 mx-auto py-6'>
        <div className='flex justify-between'>
          <button
            onClick={() => setSignType('login')}
            className={` rounded-lg px-10 py-2 text-sky-100 ${
              signType === 'login' ? 'bg-slate-600' : 'bg-slate-400'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setSignType('register')}
            className={` rounded-lg px-10 py-2 text-sky-100 ${
              signType === 'register' ? 'bg-slate-600' : 'bg-slate-400'
            }`}
          >
            Sign up
          </button>
        </div>
        {signType === 'register' ? (
          <SignUpForm handleSubmit={handleSubmit} />
        ) : (
          <SignInForm handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};
export default SignForm;

const SignInForm = ({ handleSubmit }: { handleSubmit: HandleSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          .required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <TextInput
          label='Email Address'
          name='email'
          id='email'
          type='email'
          placeholder='michalrosa@mail.com'
        />

        <TextInput
          label='Password'
          name='password'
          id='password'
          type='password'
          placeholder='password'
        />

        <button
          type='submit'
          className='bg-slate-600 rounded-lg px-10 py-2 text-sky-100'
        >
          Add
        </button>
      </Form>
    </Formik>
  );
};
const SignUpForm = ({ handleSubmit }: { handleSubmit: HandleSubmit }) => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          .required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <TextInput
          label='First Name'
          name='firstName'
          id='firstName'
          type='text'
          placeholder='Jane'
        />

        <TextInput
          label='Last Name'
          name='lastName'
          id='lastName'
          type='text'
          placeholder='Doe'
        />

        <TextInput
          label='Email Address'
          name='email'
          id='email'
          type='email'
          placeholder='michalrosa@mail.com'
        />

        <TextInput
          label='Password'
          name='password'
          id='password'
          type='password'
          placeholder='password'
        />

        <button
          type='submit'
          className='bg-slate-600 rounded-lg px-10 py-2 text-sky-100'
        >
          Add
        </button>
      </Form>
    </Formik>
  );
};
