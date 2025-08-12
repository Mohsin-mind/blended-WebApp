/* eslint-disable no-warning-comments */
import { useFormContext } from 'react-hook-form';
import InputField from '@/components/common/FormFields/InputField';
import Select from '@/components/common/FormFields/Select';
import DatePickerField from '@/components/common/FormFields/DatePickerField';
import ROLE from '@/utils/constant/role';
// import MEMBERSHIP_TYPE from '@/utils/constant/membershipType';
import VERFICATION_STATUS from '@/utils/constant/verificationStatus';
import useSWR from 'swr';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import cn from '@/lib/clsx';

export default function UserFilter({ isOpen, toggle, onApplyFilters }) {
  const methods = useFormContext();
  const { handleSubmit, reset, watch } = methods;
  const [searchParams, setSearchParams] = useSearchParams();
  const [citySearch, setCitySearch] = useState('');

  const shouldFetch = citySearch.length >= 3;
  const { data: cityOptions = [], isLoading: isCityLoading } = useSWR(
    shouldFetch ? `/common/city?search=${citySearch}` : null
  );

  const citySearchHandler = useCallback(inputValue => {
    setCitySearch(inputValue);
  }, []);

  const cityOptionsArray = useMemo(
    () =>
      cityOptions?.data?.map(loc => ({
        value: loc.id,
        label: `${loc.city}, ${loc.state}, ${loc.country}`,
      })) || [],
    [cityOptions]
  );

  useEffect(() => {
    const city_id = searchParams.get('city_id');
    const city_label = searchParams.get('city_label');

    const defaultValues = {
      search: searchParams.get('search') || '',
      city_id:
        city_label && city_id ? { value: city_id, label: city_label } : '',
      role: searchParams.get('role') || '',
      membership_type: searchParams.get('membership_type') || '',
      verification_status: searchParams.get('verification_status') || '',
      last_active: searchParams.get('last_active')
        ? new Date(searchParams.get('last_active'))
        : '',
    };

    reset(defaultValues);
  }, [searchParams, reset]);

  const resolveCity = data => {
    return typeof data.city_id === 'object'
      ? data.city_id
      : cityOptionsArray.find(opt => opt.value === data.city_id);
  };

  const buildFilters = (data, city) => ({
    search: data.search || '',
    city_id: city?.value || '',
    city_label: city?.label || '',
    role: data.role || '',
    membership_type: data.membership_type || '',
    verification_status: data.verification_status || '',
    last_active: data.last_active
      ? format(new Date(data.last_active), 'yyyy-MM-dd')
      : '',
  });

  const applyFiltersToURL = filters => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const onSubmit = data => {
    const city = resolveCity(data);
    const filters = buildFilters(data, city);
    applyFiltersToURL(filters);
    onApplyFilters?.(filters);
  };

  const isFilterApplied = useMemo(() => {
    const keysToCheck = [
      'search',
      'city_id',
      'role',
      'membership_type',
      'verification_status',
      'last_active',
    ];
    return keysToCheck.some(key => searchParams.get(key));
  }, [searchParams]);

  const emptyFields = watch([
    'search',
    'city_id',
    'role',
    'membership_type',
    'verification_status',
    'last_active',
  ]);

  const isFormEmpty = emptyFields.every(val => {
    if (!val) return true;

    if (typeof val === 'object') {
      if (val instanceof Date) {
        return !format(val, 'yyyy-MM-dd');
      }

      return Object.keys(val).length === 0;
    }

    return false;
  });

  return (
    <div className='bg-white p-5 space-y-5'>
      {/* Header */}
      <div
        className='flex items-center justify-between cursor-pointer'
        onClick={toggle}
      >
        <div className='flex items-center gap-2'>
          <div className='text-18 font-semibold'>Filters</div>
          {!isOpen && isFilterApplied && (
            <span className='w-2.5 h-2.5 rounded-full bg-gold animate-pulse' />
          )}
        </div>
        <i
          className={`icon-arrow-down text-24 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {/* Animated Filter Body */}
      <Transition
        show={isOpen}
        as='div'
        enter='transition-all ease-in-out duration-300'
        enterFrom='opacity-0 max-h-0 scale-y-95'
        enterTo='opacity-100 max-h-screen scale-y-100'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100 max-h-screen scale-y-100'
        leaveTo='opacity-0 max-h-0 scale-y-95'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-5 items-center'>
            <InputField
              name='search'
              label='Search'
              placeholder='username, email'
              icon='icon-search text-20'
              isRequired={false}
            />
            <Select
              name='city_id'
              label='Location'
              placeholder='London, United Kingdom'
              variant='search'
              isClearable
              isRequired
              isSearchIcon='icon-location'
              loadOptions={citySearchHandler}
              options={cityOptionsArray}
              isLoading={isCityLoading}
            />
            <Select
              name='role'
              label='Role'
              placeholder='Select User Type'
              options={ROLE}
              variant='static'
              isClearable
              isRequired
              isSearchIcon='icon-arrow-down'
              isSearchIconPosition='right'
            />

            {/* TODO: Add this back when membership type is available */}
            {/* <Select
              name='membership_type'
              label='Membership Type'
              placeholder='Select'
              options={MEMBERSHIP_TYPE}
              variant='static'
              isClearable
              isSearchIcon='icon-arrow-down'
              isSearchIconPosition='right'
            /> */}
            <Select
              name='verification_status'
              label='Verification Status'
              placeholder='Select'
              options={VERFICATION_STATUS}
              variant='static'
              isClearable
              isRequired
              isSearchIcon='icon-arrow-down'
              isSearchIconPosition='right'
            />

            <DatePickerField
              name='last_active'
              label='Last Active'
              placeholder='Choose Date'
              fromYear={1900}
            />
          </div>

          <div className='flex flex-1 justify-end items-center gap-3.5 mt-5'>
            <button
              type='button'
              onClick={() => {
                reset();
                setSearchParams({});
              }}
              className='text-black bg-white border border-black py-2 px-9 rounded-xl text-14 font-bold font-montserrat hover:bg-black hover:text-white transition-all duration-200'
            >
              Reset
            </button>

            <button
              type='submit'
              disabled={isFormEmpty}
              className={cn(
                'py-2 bg-black px-4 rounded-xl !text-14 font-bold font-montserrat transition-all duration-200 border',
                isFormEmpty
                  ? 'bg-gray-300 text-gray cursor-not-allowed'
                  : ' text-white hover:bg-white hover:text-black hover:border-black'
              )}
            >
              Apply Filter
            </button>
          </div>
        </form>
      </Transition>
    </div>
  );
}
