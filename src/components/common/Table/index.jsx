import { useEffect, useState } from 'react';
import cn from '@/lib/clsx';
import Pagination from './Pagination';
import SORT_ORDERS from '@/utils/constant/tableCont';
import Loader from '../Loader';

function GenericTable({
  columns = [],
  data = [],
  tableWrapperClass = '',
  stickyHeaderClass = '',
  showCheckbox = true,
  onSelectionChange = () => {
    return;
  },
  currentPage = 1,
  onPageChange = () => {
    return;
  },
  pageSize = 10,
  totalItems = 0,
  loading = false,
  sortBy = '',
  sortOrder = 'asc',
  onSortChange = () => {
    return;
  },
}) {
  const safeData = Array.isArray(data) ? data : [];
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const handleCheckboxChange = rowIndex => {
    const globalIndex = (currentPage - 1) * pageSize + rowIndex;
    setSelectedRows(prev =>
      prev.includes(globalIndex)
        ? prev.filter(i => i !== globalIndex)
        : [...prev, globalIndex]
    );
  };

  const handleMasterCheckbox = () => {
    const currentPageIndexes = safeData.map(
      (_, idx) => (currentPage - 1) * pageSize + idx
    );

    const allSelected = currentPageIndexes.every(i => selectedRows.includes(i));

    if (allSelected) {
      setSelectedRows(prev =>
        prev.filter(i => !currentPageIndexes.includes(i))
      );
    } else {
      setSelectedRows(prev => [
        ...prev,
        ...currentPageIndexes.filter(i => !prev.includes(i)),
      ]);
    }
  };

  const isAllCurrentPageSelected = safeData.every((_, idx) =>
    selectedRows.includes((currentPage - 1) * pageSize + idx)
  );

  return (
    <div>
      {loading ? (
        <div className='text-center flex items-center justify-center py-10 text-16 text-grayDark font-poppins h-[200px]'>
          <Loader color='gray' size='30' />
        </div>
      ) : safeData.length > 0 ? (
        <>
          <div
            className={`overflow-auto border border-black/10 border-b-0 ${tableWrapperClass}`}
          >
            <table className='table-auto border-collapse w-full relative'>
              <thead>
                <tr className={`${stickyHeaderClass} shadow z-30`}>
                  {columns.map(column => (
                    <th
                      key={column.key}
                      className={cn(
                        'px-6 py-3.5 text-left bg-[#eef0f4] text-black',
                        column.key === 'action' &&
                          column.isSticky &&
                          'min-w-fit sticky right-0 shadow-2xl'
                      )}
                    >
                      <span
                        className={cn(
                          'flex items-center gap-1 cursor-pointer select-none'
                        )}
                        onClick={() => {
                          if (!column.isSortable) return;
                          const sortKey = column.sortKey || column.key;
                          const nextOrder =
                            sortBy === sortKey && sortOrder === SORT_ORDERS.ASC
                              ? SORT_ORDERS.DESC
                              : SORT_ORDERS.ASC;
                          onSortChange(sortKey, nextOrder);
                        }}
                      >
                        {showCheckbox && column.key === 'sr_no' && (
                          <input
                            type='checkbox'
                            checked={
                              isAllCurrentPageSelected && safeData.length > 0
                            }
                            onChange={handleMasterCheckbox}
                            className='mr-2'
                            onClick={e => e.stopPropagation()} // prevent triggering sort
                          />
                        )}
                        <span className='text-14 text-black font-medium font-poppins whitespace-nowrap'>
                          {column.title}
                        </span>

                        {column.isSortable && (
                          <span className='flex flex-col items-center justify-center leading-none ml-1'>
                            <i
                              className={cn(
                                'icon-sort-up text-[12px]',
                                sortBy === (column.sortKey || column.key) &&
                                  sortOrder === SORT_ORDERS.ASC
                                  ? 'text-black'
                                  : 'text-black/30'
                              )}
                            />
                            <i
                              className={cn(
                                'icon-sort-down text-[12px] -mt-2.5',
                                sortBy === (column.sortKey || column.key) &&
                                  sortOrder === SORT_ORDERS.DESC
                                  ? 'text-black'
                                  : 'text-black/30'
                              )}
                            />
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {safeData.map((row, rowIndex) => (
                  <tr className='group relative'>
                    {columns.map(column => {
                      const cellValue = row[column.key];
                      const childValue = column.childKey
                        ? row[column.childKey]
                        : null;

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            'bg-white px-6 py-3 group-hover:bg-gray-50 min-w-max border-b border-b-black/10 text-16 text-grayDark font-regular whitespace-nowrap',
                            column.key === 'action' &&
                              column.isSticky &&
                              'min-w-fit sticky right-0 shadow-2xl bg-white border-b',
                            column.key === 'action' &&
                              !column.isSticky &&
                              'min-w-fit relative border-l-1 border-l-black',
                            column.key === 'sr_no' && 'min-w-[80px]'
                          )}
                        >
                          {column.key === 'action' && (
                            <span className='w-[1px] h-full bg-black/15 absolute top-0 left-0' />
                          )}

                          {column.key === 'sr_no' && showCheckbox ? (
                            <div className='flex items-center gap-2'>
                              <input
                                type='checkbox'
                                checked={selectedRows.includes(
                                  (currentPage - 1) * pageSize + rowIndex
                                )}
                                onChange={() => handleCheckboxChange(rowIndex)}
                              />
                              <span>
                                {column.renderContent(
                                  cellValue,
                                  childValue,
                                  (currentPage - 1) * pageSize + rowIndex
                                )}
                              </span>
                            </div>
                          ) : column.key === 'action' ? (
                            column.renderContent(row, rowIndex)
                          ) : (
                            column.renderContent(
                              cellValue,
                              childValue,
                              (currentPage - 1) * pageSize + rowIndex
                            )
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / pageSize)}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className='text-center py-10 text-16 text-grayDark font-poppins bg-white h-[420px] flex justify-center items-center'>
          No result found for the applied filter.
        </div>
      )}
    </div>
  );
}

export default GenericTable;
