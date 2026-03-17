'use client';

import { useState } from 'react';
import { Ripple, AuthTabs, TechOrbitDisplay } from '../components/ui/modern-animated-sign-in';
import { useNavigate } from 'react-router-dom';

// Technology logos configuration
const iconsArray = [
  {
    component: () => <img width={40} height={40} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' alt='HTML5' />,
    radius: 70,
    duration: 20,
    delay: 5,
    className: 'z-10'
  },
  {
    component: () => <img width={40} height={40} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' alt='CSS3' />,
    radius: 70,
    duration: 20,
    delay: 15,
    className: 'z-10'
  },
  {
    component: () => <img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' alt='JS' />,
    radius: 120,
    duration: 25,
    delay: 8,
    reverse: true,
  },
  {
    component: () => <img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' alt='TS' />,
    radius: 120,
    duration: 25,
    delay: 20,
    reverse: true,
  },
  {
    component: () => <img width={60} height={60} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' alt='React' />,
    radius: 180,
    duration: 30,
    delay: 10,
  },
  {
    component: () => <img width={60} height={60} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' alt='Nextjs' className="dark:invert" />,
    radius: 180,
    duration: 30,
    delay: 25,
  },
  {
    component: () => <img width={45} height={45} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' alt='Tailwind' />,
    radius: 240,
    duration: 35,
    delay: 12,
    reverse: true,
  },
  {
    component: () => <img width={45} height={45} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' alt='Git' />,
    radius: 240,
    duration: 35,
    delay: 28,
    reverse: true,
  }
];

export default function Login() {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState('');

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorField('');
    
    const email = event.target.Email.value;
    const password = event.target.Password.value;

    console.log('Login attempt:', { email, password });
    
    // Simulate login for now - you can connect this to your Auth provider later
    if (email && password) {
       navigate('/dashboard');
    } else {
       setErrorField('Please fill in all fields');
    }
  };

  const formFields = {
    header: 'Welcome back',
    subHeader: 'Sign in to your account',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Enter your email address',
        onChange: () => {},
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: 'Enter your password',
        onChange: () => {},
      }
    ]
  };

  return (
    <main className="flex min-h-screen bg-background dark:bg-zinc-950 transition-colors">
      {/* Left Side - Animated Display */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative bg-neutral-50 dark:bg-white/5 overflow-hidden border-r border-gray-200 dark:border-zinc-800">
        <Ripple mainCircleSize={120} />
        <TechOrbitDisplay iconsArray={iconsArray} text="LearnFlow" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <AuthTabs 
          formFields={formFields} 
          goTo={handleForgotPassword} 
          handleSubmit={handleSubmit} 
          errorField={errorField}
        />
      </div>
    </main>
  );
}