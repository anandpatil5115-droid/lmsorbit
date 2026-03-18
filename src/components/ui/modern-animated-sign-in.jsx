'use client';
import {
  memo,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

// ==================== Input Component ====================

const Input = memo(
  forwardRef(function Input(
    { className, type, ...props },
    ref
  ) {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='group/input rounded-lg p-[2px] transition duration-300'
      >
        <input
          type={type}
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-100 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  })
);

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  overflow = 'hidden',
  position = 'relative',
  className,
}) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <section
      ref={ref}
      style={{
        position,
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial='hidden'
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#7c5cfc',
          borderRadius: 4,
        }}
      />
    </section>
  );
});

// ==================== Ripple Component ====================

const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 11,
  className = '',
}) {
  return (
    <section
      className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';

        return (
          <span
            key={i}
            className='absolute animate-ripple rounded-full border border-gray-400/20 dark:border-white/10'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.max(0, opacity),
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </section>
  );
});

// ==================== OrbitingCircles Component ====================

const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}) {
  return (
    <>
      {path && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          className='pointer-events-none absolute inset-0 size-full'
        >
          <circle
            className='stroke-black/5 stroke-1 dark:stroke-white/5'
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
          />
        </svg>
      )}
      <section
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
          }
        }
        className={cn(
          'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </section>
    </>
  );
});

// ==================== TechOrbitDisplay Component ====================

const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = 'Animated Login',
}) {
  return (
    <section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden'>
      <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-center text-8xl font-bold leading-none text-transparent dark:from-white dark:to-gray-500'>
        {text}
      </span>

      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          <div className="flex items-center justify-center w-full h-full scale-110">
            {icon.component()}
          </div>
        </OrbitingCircles>
      ))}
    </section>
  );
});

// ==================== AnimatedForm Component ====================

const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  textVariantButton,
  errorField,
  fieldPerRow = 1,
  onSubmit,
  googleLogin,
  goTo,
}) {
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setVisible(!visible);

  const validateForm = (event) => {
    const currentErrors = {};
    fields.forEach((field) => {
      const value = event.target[field.label]?.value;

      if (field.required && !value) {
        currentErrors[field.label] = `${field.label} is required`;
      }

      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        currentErrors[field.label] = 'Invalid email address';
      }

      if (field.type === 'password' && value && value.length < 6) {
        currentErrors[field.label] =
          'Password must be at least 6 characters long';
      }
    });
    return currentErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm(event);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(event);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <section className='max-md:w-full flex flex-col gap-6 w-full max-w-md'>
      <div className="space-y-2">
        <BoxReveal boxColor='#7c5cfc' duration={0.3}>
          <h2 className='font-bold text-4xl text-gray-900 dark:text-white tracking-tight'>
            {header}
          </h2>
        </BoxReveal>

        {subHeader && (
          <BoxReveal boxColor='#7c5cfc' duration={0.3}>
            <p className='text-gray-500 dark:text-gray-400 text-lg'>
              {subHeader}
            </p>
          </BoxReveal>
        )}
      </div>

      {googleLogin && (
        <div className="space-y-6">
          <BoxReveal boxColor='#7c5cfc' duration={0.3} width="100%">
            <button
              className='w-full py-3 px-4 flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm'
              type='button'
            >
                <img
                  src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
                  width={24}
                  height={24}
                  alt='Google'
                />
                {googleLogin}
            </button>
          </BoxReveal>

          <BoxReveal boxColor='#7c5cfc' duration={0.3} width='100%'>
            <div className='flex items-center gap-4'>
              <hr className='flex-1 border-gray-200 dark:border-gray-800' />
              <p className='text-gray-400 text-sm font-medium'>OR</p>
              <hr className='flex-1 border-gray-200 dark:border-gray-800' />
            </div>
          </BoxReveal>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorField && (
          <BoxReveal boxColor='#ef4444' duration={0.3} width="100%">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl font-medium">
              {errorField}
            </div>
          </BoxReveal>
        )}
        {fields.map((field) => (
          <div key={field.label} className='space-y-1.5'>
            <BoxReveal boxColor='#7c5cfc' duration={0.3}>
              <Label htmlFor={field.label} className="text-gray-700 dark:text-gray-300 font-semibold px-1">
                {field.label} <span className="text-red-500">*</span>
              </Label>
            </BoxReveal>

            <BoxReveal width='100%' boxColor='#7c5cfc' duration={0.3}>
              <div className='relative'>
                <Input
                  type={field.type === 'password' && !visible ? 'password' : 'text'}
                  id={field.label}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                  name={field.label}
                  className="rounded-xl border-gray-200 bg-white"
                />

                {field.type === 'password' && (
                  <button
                    type='button'
                    onClick={toggleVisibility}
                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>

              {errors[field.label] && (
                <p className='text-red-500 text-xs px-1 mt-1'>
                  {errors[field.label]}
                </p>
              )}
            </BoxReveal>
          </div>
        ))}

        <div className="pt-4">
          <button
            className='w-full py-4 bg-brand hover:bg-brand/90 text-brand-foreground rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-brand/20 hover:shadow-xl active:scale-[0.95]'
            style={{ backgroundColor: '#7c5cfc', color: '#ffffff' }}
            type='submit'
          >
            {submitButton} &rarr;
          </button>
        </div>

        <div className="flex justify-between items-center mt-2 px-1">
          <BoxReveal boxColor='#7c5cfc' duration={0.3}>
            <button
              type="button"
              className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'
              onClick={() => console.log('Forgot password clicked')}
            >
              Forgot password?
            </button>
          </BoxReveal>

          {textVariantButton && goTo && (
            <BoxReveal boxColor='#7c5cfc' duration={0.3}>
              <button
                className='text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors'
                onClick={goTo}
              >
                {textVariantButton}
              </button>
            </BoxReveal>
          )}
        </div>
      </form>
    </section>
  );
});

const BottomGradient = () => (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
);

// ==================== AuthTabs Component ====================

const AuthTabs = memo(function AuthTabs({
  formFields,
  goTo,
  handleSubmit,
}) {
  return (
    <div className='w-full max-w-md px-4'>
        <AnimatedForm
          {...formFields}
          fieldPerRow={1}
          onSubmit={handleSubmit}
          goTo={goTo}
        />
    </div>
  );
});

// ==================== Label Component ====================

const Label = memo(function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none text-gray-700 dark:text-gray-300',
        className
      )}
      {...props}
    />
  );
});

// ==================== Exports ====================

export {
  Input,
  BoxReveal,
  Ripple,
  OrbitingCircles,
  TechOrbitDisplay,
  AnimatedForm,
  AuthTabs,
  Label,
  BottomGradient,
};
