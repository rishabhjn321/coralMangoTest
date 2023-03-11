export type List = {
  abilityToTravelBetweenBuildings?: boolean;
  abilityToTravel?: boolean;
  addedShift?: string;
  name?: string;
  logoUrl?: string;
  building?: [
    {
      buildingName?: string;
      belongsTo?: {
        name: string;
      };
    },
  ];
  department?: string;
  email?: string;
  employeeId?: string;
  firstName?: string;
  fullName?: string;
  fullTime?: boolean;
  hiringDate?: string;
  id?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  jobDescription?: string;
  lastDayWorked?: string;
  lastName?: string;
  milesRadiusFromPrimaryBuilding?: string | number;
  notes?: string;
  permanentAddress?: string;
  permanentCity?: string;
  permanentState?: string;
  permanentZipcode?: string;
  buildings?: string;
  phone?: string;
  preferredContact?: string;
  preferredLanguage?: string;
  primaryBuilding?: string;
  profileImageUrl?: string;
  role?: string;
  scheduleNotes?: string;
  shift?: string;
  shiftHours?: string;
  statusChanged?: string;
  title?: string;
  travelNotes?: string;
  workAddress?: string;
  workCity?: string;
  workSchedule?: string;
  workState?: string;
  workZipcode?: string;
  records?: any;
};

export type EditDistrictType = {
  cityName?: string;
  districtManagers?: List;
  id?: string;
  state?: string;
};
export type EditCustomerType = {
  firstName?: string;
  lastName?: string;
  contactBuildingScope?: any;
  title?: string;
  created_at?: string;
  name?: string;
  address?: string;
  buildings?: any;
  buildingsCount?: any;
  city?: string;
  clientManagers?: any;
  clientManagersCount?: string;
  createdAt?: string;
  email?: string;
  id?: any;
  isActive?: boolean;
  isCompanyVerifed?: boolean;
  logoUrl?: string;
  phone?: string;
  state?: string;
  statusChanged?: string;
  supervisors?: any;
  supervisorsCount?: any;
  zipcode?: string;
  role?: string;
  buildingName?: string;
  profileImageUrl?: any;
  shift?: string;
  department?: string;
  viewContacts?: boolean;
  createWorkSchedules?: boolean;
  buildingsId?: any;
};

export type IDCardList = {
  building?: string;
  customer?: string;
  name?: string;
  id?: any;
  role?: string;
  profileImageUrl?: any;
  employeeId?: string;
  isActive?: any;
  status?: string;
  reportsTo?: any;
  onClose?: () => void;
  showId?: boolean;
};
export type AdminOffice = {
  name?: string;
  address?: string;
  email?: string;
  buildings?: any;
  opens?: string;
  closes?: string;
  buildingName?: string;
  phone?: string;
  id?: any;
  belongsTo?: any;
  leads?:any;
  buildingCity?: string;
  buildingState?: string;
  clientManagers?: string;
  supervisors?: string;
  districtManager?: {
    name?: string;
    id?: string;
    email?: string;
    phone?: string;
    role?: string;
    fullName?: string;
  };
 
  lumpers?: string;
  swingShift?: any;
  dayShift?: any;
};
