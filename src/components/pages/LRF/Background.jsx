import BgImg from '@/assets/images/log-in-hero.webp';

function Background() {
  return (
    <div className='w-full h-screen absolute top-0 left-0'>
      <img
        src={BgImg}
        alt='The login page'
        className='w-full h-full object-cover'
      />
    </div>
  );
}

export default Background;
