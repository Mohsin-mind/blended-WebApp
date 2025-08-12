import cn from '@/lib/clsx';
import ReactPaginate from 'react-paginate';

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  className = '',
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const handlePageClick = ({ selected }) => {
    onPageChange(selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between py-[10px] px-5 bg-white',
        className
      )}
    >
      <div className='text-sm font-poppins text-black/40'>
        Showing {to === 0 ? 0 : from}-{to} out of {totalItems} results
      </div>

      <ReactPaginate
        breakLabel='...'
        nextLabel='›'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel='‹'
        forcePage={currentPage - 1}
        containerClassName='pagination-container'
        pageClassName='pagination-page'
        previousClassName='pagination-nav'
        nextClassName='pagination-nav'
        activeClassName='pagination-active'
        disabledClassName='pagination-disabled'
      />
    </div>
  );
}
