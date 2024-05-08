// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', {
//         email: email,
//         password: password
//       });
//       console.log('Login successful:', response.data);
//       navigate('/');
//     } catch (error: any) {
//       setError(error.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>Error: {error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;



//// * --------- * /////


// import { useState } from 'react';
// import { useAuth } from '@/provider/AuthContextProvider';
// import { useNavigate } from 'react-router-dom';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>('santiagoeherrera@gmail.com');
//   const [password, setPassword] = useState<string>('asdqweasd123s');
//   const [error, setError] = useState<string | null>(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate('/');
//     } catch (error: any) {
//       if (error.isAxiosError && error.response && error.response.data && error.response.data.error) {
//         setError(error.response.data.error);
//       } else if (error.isAxiosError && error.message) {
//         setError(error.message);
//       } else {
//         setError('An unexpected error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       {error && <p className='text-red-500'>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email    : string;
  password : string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  
  const initialValues: LoginFormValues = {
    email    : 'santiagoeherrera@gmail.com',
    password : 'asdqweasd123',
  };

  const validationSchema = Yup.object({
    email    : Yup.string().email('Invalid email address').required('Required'),
    password : Yup.string().required('Required'),
  });

  const onSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    setError(null)
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error: any) {
      setError(error.response.data.error)
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Login</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" required />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <label>Password:</label>
              <Field type="password" name="password" required />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <div className="text-red-500">
              {error && <div>{error}</div>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      
    </div>
  );
};

export default LoginPage;