import cn from '@/lib/clsx';

export default function Footer({ className = '' }) {
  return (
    <footer
      className={cn(
        'flex-shrink-0 bg-white border-t border-white/30 px-6 py-3 text-blended-gray_5',
        className
      )}
    >
      <div className='flex items-center justify-between text-sm'>
        {/* Left side - Version info */}
        <div className='flex items-center'>
          <span className='font-medium'>v1.2.08-beta</span>
          <span className='mx-2'>|</span>
          <span>@2025, All Right Reserved.</span>
        </div>

        {/* Right side - Navigation links */}
        <div className='flex items-center space-x-4 '>
          <a href='#' className='hover:text-blended-blue_3 transition-colors'>
            Terms of Use
          </a>
          <span className=''>|</span>
          <a href='#' className='hover:text-blended-blue_3 transition-colors'>
            Privacy Policy
          </a>
          <span className=''>|</span>
          <a href='#' className=' hover:text-blended-blue_3 transition-colors'>
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
