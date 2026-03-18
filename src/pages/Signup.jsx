'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from '../components/ui/modern-animated-sign-in';

const iconsArray = [
  {
    component: () => (
      <img
        width={45}
        height={45}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
        alt='React'
      />
    ),
    className: 'border-none bg-transparent',
    duration: 15,
    delay: 0,
    radius: 120,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={40}
        height={40}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
        alt='TypeScript'
      />
    ),
    className: 'border-none bg-transparent',
    duration: 20,
    delay: 5,
    radius: 180,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={40}
        height={40}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
        alt='Next.js'
        className="invert"
      />
    ),
    className: 'border-none bg-transparent',
    duration: 18,
    delay: 10,
    radius: 240,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={40}
        height={40}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
        alt='Tailwind'
      />
    ),
    className: 'border-none bg-transparent',
    duration: 25,
    delay: 0,
    radius: 300,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={35}
        height={35}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
        alt='JS'
      />
    ),
    className: 'border-none bg-transparent',
    duration: 30,
    delay: 15,
    radius: 360,
    path: true,
    reverse: false,
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, name) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (authError) throw authError;

      // Supabase by default requires email confirm
      navigate('/login');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const formFields = {
    header: 'Create account',
    subHeader: 'Join SkillOrbit today',
    errorField: error,
    fields: [
      {
        label: 'Name',
        required: true,
        type: 'text',
        placeholder: 'Enter your full name',
        onChange: (e) => handleInputChange(e, 'name'),
      },
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Enter your email address',
        onChange: (e) => handleInputChange(e, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: 'Create a password',
        onChange: (e) => handleInputChange(e, 'password'),
      },
    ],
    submitButton: loading ? 'Creating account...' : 'Create account',
    textVariantButton: 'Already have an account? Sign in',
  };

  return (
    <section className='flex min-h-screen bg-white dark:bg-gray-950 overflow-hidden'>
      {/* Left Side - Consistent Dark Atmosphere */}
      <div className='hidden lg:flex flex-col justify-center w-5/12 relative bg-gray-900 overflow-hidden'>
        <Ripple mainCircleSize={120} mainCircleOpacity={0.15} numCircles={8} />
        <TechOrbitDisplay iconsArray={iconsArray} text="LEARNFLOW" />
      </div>

      {/* Right Side */}
      <div className='w-full lg:w-7/12 flex flex-col justify-center items-center bg-white dark:bg-gray-950'>
        <AuthTabs
          formFields={formFields}
          goTo={goToLogin}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
