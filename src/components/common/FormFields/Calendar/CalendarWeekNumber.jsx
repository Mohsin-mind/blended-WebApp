import PropTypes from 'prop-types';

function CalendarWeekNumber({ children, ...props }) {
  return (
    <td {...props}>
      <div className='flex items-center justify-center text-center'>
        {children}
      </div>
    </td>
  );
}

CalendarWeekNumber.propTypes = {
  children: PropTypes.node,
};

export default CalendarWeekNumber;
