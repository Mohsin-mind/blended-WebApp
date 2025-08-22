import { useForm, FormProvider } from 'react-hook-form';
import { useState, useMemo, useEffect } from 'react';
import GenericTable from '@/components/common/Table';
import UserFilter from '@/components/pages/UserManagement/UserFilter';
import ToggleSwitch from '@/components/common/FormFields/ToggleSwitch';
import useSWR, { useSWRConfig } from 'swr';
import { formatDateTime } from '@/lib/dateFormat';
import { useSearchParams } from 'react-router-dom';
import { updateUserStatus } from '@/services/apiService';
import EyeButton from '@/components/common/FormFields/EyeButton';
import SORT_ORDERS from '@/utils/constant/tableCont';
import useSWRMutation from 'swr/mutation';
import { USER_STATUS } from '@/utils/constant/userStatus';
import { showToast } from '@/lib/toast';

function ManageUsers() {
  const ITEMS_PER_PAGE = 10;
  const methods = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useSWRConfig();

  const { trigger } = useSWRMutation('/user-status', async (key, { arg }) => {
    return await updateUserStatus(arg);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Reading from search params
  const pageParam = parseInt(searchParams.get('page'), 10);
  const currentPage = Number.isNaN(pageParam) ? 1 : pageParam;
  const sortBy = searchParams.get('sort_by') || '';
  const sortOrder = searchParams.get('sort_order') || SORT_ORDERS.ASC;

  // SWR Key based on search params
  const queryKey = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage,
      per_page: ITEMS_PER_PAGE,
    });

    if (sortBy) {
      params.set('sort_by', sortBy);
      params.set('sort_order', sortOrder);
    }

    const filterKeys = [
      'search',
      'city_id',
      'role',
      'verification_status',
      'last_active',
    ];
    filterKeys.forEach(key => {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    });

    return `/user/list?${params.toString()}`;
  }, [searchParams, currentPage, sortBy, sortOrder]);

  const { data } = useSWR(queryKey, {
    keepPreviousData: true,
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  });

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  const users = data?.data || [];
  const totalItems = data?.meta?.total || 0;

  // Handle page change
  const handlePageChange = page => {
    setIsLoading(true);
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('page', page);
      return updated;
    });
  };

  // Handle sorting
  const handleSortChange = (key, order) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('sort_by', key);
      updated.set('sort_order', order);
      updated.set('page', '1');
      return updated;
    });
  };

  async function onToggle(arg) {
    try {
      const { meta } = await trigger(arg);
      if (meta?.code === 1) {
        showToast(
          'success',
          meta?.message || 'User status updated successfully'
        );
        mutate(queryKey);
      } else {
        showToast('error', meta?.message || 'Failed to update user status');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        'Failed to update user status';
      showToast('error', errorMessage);
    }
  }

  const userTableColumns = [
    {
      key: 'sr_no',
      title: 'Sr. No',
      renderContent: (_, __, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      key: 'email',
      title: 'Email',
      isSortable: true,
      sortKey: 'email',
      renderContent: value => <span>{value || '-'}</span>,
    },
    {
      key: 'username',
      title: 'Username',
      isSortable: true,
      sortKey: 'username',
      renderContent: value => <span>{value || '-'}</span>,
    },
    {
      key: 'user_type',
      title: 'User Type',
      isSortable: true,
      sortKey: 'user_type',
      renderContent: value => <span>{value || '-'}</span>,
    },
    {
      key: 'city',
      title: 'City',
      isSortable: true,
      sortKey: 'city',
      renderContent: value => <span>{value || '-'}</span>,
    },
    {
      key: 'current_plan',
      title: 'Current Plan',
      isSortable: false,
      renderContent: value => <span>{value || '-'}</span>,
    },
    {
      key: 'last_active',
      title: 'Last Active',
      isSortable: true,
      sortKey: 'last_login_at',
      renderContent: value => <span>{formatDateTime(value) || '-'}</span>,
    },
    {
      key: 'verification_status',
      title: 'Verification Status',
      isSortable: false,
      renderContent: value => <span>{formatDateTime(value) || '-'}</span>,
    },
    {
      key: 'action',
      title: 'Actions',
      isSticky: true,
      renderContent: row => (
        <div className='flex gap-2'>
          <EyeButton to={`/users/${row.user_id}`} />
          <ToggleSwitch
            defaultChecked={row.is_active}
            onToggle={async checked => {
              const status = checked
                ? USER_STATUS.ACTIVE
                : USER_STATUS.INACTIVE;
              onToggle({ userId: row.user_id, status });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className='p-[30px] space-y-5'>
        <h2 className='text-26 font-semibold text-black'>Manage Users</h2>

        <UserFilter
          isOpen={isFilterOpen}
          toggle={() => setIsFilterOpen(prev => !prev)}
          onApplyFilters={filters => {
            setIsLoading(true);
            const params = new URLSearchParams(searchParams);

            Object.entries(filters).forEach(([key, value]) => {
              if (value) {
                params.set(key, value);
              } else {
                params.delete(key);
              }
            });

            params.set('page', '1');
            setSearchParams(params);
          }}
        />

        <GenericTable
          columns={userTableColumns}
          data={users}
          showCheckbox={false}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          pageSize={ITEMS_PER_PAGE}
          loading={isLoading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
    </FormProvider>
  );
}

export default ManageUsers;
