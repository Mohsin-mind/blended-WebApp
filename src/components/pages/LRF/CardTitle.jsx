import { Fragment } from 'react';
import PropTypes from 'prop-types';
import logo from '@/assets/images/svg/BlendedED_Logo.svg';

function CardTitle({ title, subTitle }) {
  return (
    <Fragment>
      <div className='flex items-center justify-center mb-[50px]'>
        <img src={logo} alt='BlendEd Logo' width={130} />
      </div>
      <h2 className='text-2xl font-semibold text-white text-center font-poppins mb-2'>
        {title}
      </h2>
      {subTitle && (
        <p className='text-base text-white text-center font-poppins mb-6'>
          {subTitle}
        </p>
      )}
    </Fragment>
  );
}

CardTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default CardTitle;
