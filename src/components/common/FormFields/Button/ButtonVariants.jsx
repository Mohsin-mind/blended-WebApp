import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gold: 'bg-gold-gradient max-sm:w-full w-[408px] md:py-3.5 py-2.5 rounded-xl text-16 font-montserrat font-bold text-black',
        goldOutline:
          'w-fit text-16 font-medium font-open-sans text-gold px-4 py-2 border border-gold bg-gold/10 rounded-xl hover:underline',
        silver:
          'bg-silver-gradient max-sm:w-full w-[408px] md:py-3.5 py-2.5 rounded-xl text-16 font-montserrat font-bold text-black',
        black:
          'p-2 w-fit h-fit bg-black text-white font-open-sans font-bold rounded-full flrx justify-center items-center',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
