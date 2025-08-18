import logo from '@/assets/images/svg/BlendedED_Logo_blue.svg';

function LRFHeaderSection() {
  return (
    <div className='h-28 lg:h-[20%] flex items-center justify-center bg-blended-white_2/30'>
      <div className='text-center'>
        <img src={logo} alt='BlendED' className='h-8 mx-auto' />
      </div>
    </div>
  );
}

export default LRFHeaderSection;
