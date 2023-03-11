import { abbvStates, cities } from '../utilities/stateCityList';

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')' + ' ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
};

export const deformatPhoneNumber = (phoneNumberString: string) => {
  return ('' + phoneNumberString).replace(/\D/g, '');
};

export const stringToRoleFormat = (role: string) => {
  if (role !== 'Role') {
    return role.split(' ').join('_').toLowerCase();
  }
  return '';
};

export const getRoleList = (rolesList, defaultOption: string) => {
  return [{ name: defaultOption }, ...rolesList.slice(1)];
};

export const roleToStringFormat = (role: string) => {
  return role.split('_').join(' ').toUpperCase();
};

export const capitalizeFirst = (role: string) => {
  return role[0].toUpperCase() + role.slice(1);
};

export const CamelCase = (role: string) => {
  return role[0].toUpperCase() + role.slice(1).toLocaleLowerCase();
};


export const capitalizeString = (role: string) => {
  return role.split('_').join(' ');
};

export let newCityList = [];
export let addDistrictCityList = [];

export const getCitiesList = (stateE: string, defaultOption) => {
  if (stateE !== 'State') {
    const cityList = cities[0][stateE];
    newCityList = [];
    newCityList.push({ name: defaultOption });
    cityList?.sort().map((city) => newCityList.push({ name: city }));
  } else {
    newCityList = [];
    newCityList.push({ name: defaultOption });
  }
};

export const getAddDistrictCitiesList = (stateE: string, defaultOption) => {
  if (stateE !== '--Select--') {
    const cityList = cities[0][stateE];
    addDistrictCityList = [];
    addDistrictCityList.push({ name: defaultOption });
    cityList?.sort().map((city) => addDistrictCityList.push({ name: city }));
    return addDistrictCityList;
  } else {
    addDistrictCityList = [];
    addDistrictCityList.push({ name: defaultOption });
    return addDistrictCityList;
  }
};

export const employeesStateFormat = (state: string) => {
  if (state !== 'State') {
    getCitiesList(state, 'City');
    const index = abbvStates.findIndex((x) => x?.name === state);
    const value = abbvStates[index]?.abbreviation;

    return state ? value : '';
  }
  getCitiesList(state, 'City');
  return '';
};

export const formatName = (role?: string) => {
  return role.trimStart();
};
export const trim = (role?: string) => {
  return role.trim();
};

export const ReduceNameSpace = (role?: string) => {
  return role.trim().split(/ +/).join(' ');
};


export const districtsStateFormat = (state: string) => {
  if (state !== 'State') {
    getCitiesList(state, 'City');
    return state;
  }
  getCitiesList(state, 'City');
  return '';
};

export const getStatesList = (statesList, defaultOption: string) => {
  return [{ name: defaultOption }, ...statesList.slice(0)];
};

export const convertDateFormat = (hiringDate?: string) => {
  const date = new Date(hiringDate);
  const options: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return Intl.DateTimeFormat('en-US', options)?.format(date);
};

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export const changeDateFormat = (days?: any) => {
  const date = new Date(days);
  const options = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return options;
};

let temp;
export const getMappedDistrictManagers = (data) => {
  temp = [];
  // data.records.map((item) =>
  data.map((item) =>
    temp.push({
      name: item?.fullName
        ? `${item?.firstName[0].toUpperCase() + item?.firstName.slice(1)} ${item?.lastName} - ${
            item?.employeeId
          }`
        : `${item?.firstName[0].toUpperCase() + item?.firstName.slice(1)} - ${item?.lastName}`,
      id: item.id,
    }),
  );
  // console.log("data____",temp);
  return temp;
};


