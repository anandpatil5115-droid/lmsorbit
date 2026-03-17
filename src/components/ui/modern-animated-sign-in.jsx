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
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm  file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
             disabled:cursor-not-allowed disabled:opacity-50
             group-hover/input:shadow-none transition duration-400
            `,
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
  boxColor = '#5046e6',
  duration = 0.5,
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
    <div
      ref={ref}
      style={{
        position: position,
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
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
          borderRadius: 4,
        }}
      />
    </div>
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
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_bottom,black,transparent)]",
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderOpacity = 5 + i * 5;

        return (
          <span
            key={i}
            className="absolute animate-ripple rounded-full bg-foreground/15 border"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: '1px',
              borderColor: `rgba(var(--foreground-rgb), ${borderOpacity / 100})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
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
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <div
        style={{
          '--duration': duration,
          '--radius': radius,
          '--delay': -delay,
        }}
        className={cn(
          "absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]",
          { "[animation-direction:reverse]": reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
});

// ==================== TechOrbitDisplay Component ====================
const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = 'Animated Login',
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 z-10">
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
          {icon.component()}
        </OrbitingCircles>
      ))}
    </div>
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !event.target[field.label]?.value) {
        newErrors[field.label] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(event);
    }
  };

  return (
    <div className="max-md:w-full flex flex-col gap-4 w-96 mx-auto">
      <BoxReveal boxColor="var(--skeleton)" duration={0.3}>
        <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
          {header}
        </h2>
      </BoxReveal>

      {subHeader && (
        <BoxReveal boxColor="var(--skeleton)" duration={0.3} className="pb-2">
          <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
            {subHeader}
          </p>
        </BoxReveal>
      )}

      {googleLogin && (
        <>
          <BoxReveal boxColor="var(--skeleton)" duration={0.3} overflow="visible" width="unset">
            <button
              className="g-button group/btn bg-transparent w-full rounded-md border h-10 font-medium outline-none hover:cursor-pointer transition-colors border-gray-200 dark:border-zinc-800"
              type="button"
              onClick={() => console.log('Google login clicked')}
            >
              <span className="flex items-center justify-center w-full h-full gap-3">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  width={26}
                  height={26}
                  alt="Google Icon"
                />
                {googleLogin}
              </span>
              <BottomGradient />
            </button>
          </BoxReveal>

          <BoxReveal boxColor="var(--skeleton)" duration={0.3} width="100%">
            <div className="flex items-center gap-4 my-2">
              <hr className="flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-700" />
              <p className="text-neutral-700 text-sm dark:text-neutral-300">or</p>
              <hr className="flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-700" />
            </div>
          </BoxReveal>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`grid grid-cols-1 md:grid-cols-${fieldPerRow} gap-4`}>
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <BoxReveal boxColor="var(--skeleton)" duration={0.3}>
                <Label htmlFor={field.label}>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
              </BoxReveal>

              <BoxReveal width="100%" boxColor="var(--skeleton)" duration={0.3} className="flex flex-col space-y-2 w-full">
                <div className="relative">
                  <Input
                    type={field.type === 'password' ? (visible ? 'text' : 'password') : field.type}
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    onChange={field.onChange}
                  />
                  {field.type === 'password' && (
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400"
                    >
                      {visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                  )}
                </div>
                {errors[field.label] && <p className="text-red-500 text-xs">{errors[field.label]}</p>}
              </BoxReveal>
            </div>
          ))}
        </div>

        {errorField && (
           <BoxReveal width="100%" boxColor="var(--skeleton)" duration={0.3}>
              <p className="text-red-500 text-sm">{errorField}</p>
           </BoxReveal>
        )}

        <BoxReveal width="100%" boxColor="var(--skeleton)" duration={0.3} overflow="visible">
          <button
            className="bg-gradient-to-br relative group/btn from-zinc-200 dark:from-zinc-900 dark:to-zinc-900 to-zinc-200 block dark:bg-zinc-800 w-full text-black dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] outline-none hover:cursor-pointer"
            type="submit"
          >
            {submitButton} &rarr;
            <BottomGradient />
          </button>
        </BoxReveal>

        {textVariantButton && goTo && (
          <BoxReveal boxColor="var(--skeleton)" duration={0.3}>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-blue-500 hover:underline outline-none"
                onClick={goTo}
              >
                {textVariantButton}
              </button>
            </div>
          </BoxReveal>
        )}
      </form>
    </div>
  );
});

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

// ==================== AuthTabs Component ====================
const AuthTabs = memo(function AuthTabs({ formFields, goTo, handleSubmit }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <AnimatedForm
        header={formFields.header}
        subHeader={formFields.subHeader}
        fields={formFields.fields}
        submitButton="Sign in"
        googleLogin="Sign in with Google"
        onSubmit={handleSubmit}
        goTo={goTo}
        textVariantButton="Don't have an account? Sign up"
      />
    </div>
  );
});

// ==================== Label Component ====================
const Label = memo(function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    />
  );
});

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
