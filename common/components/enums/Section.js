const Section = {
  AboutProject: 'AboutProject',
  AboutGroup: 'AboutGroup',
  AboutUs: 'AboutUs',
  CreateProject: 'CreateProject',
  EditProject: 'EditProject',
  EditGroup: 'EditGroup',
  Landing: 'Landing',
  Home: 'Home',
  FindProjects: 'FindProjects',
  FindGroups: 'FindGroups',
  FindEvents: 'FindEvents',
  MyProjects: 'MyProjects',
  MyGroups: 'MyGroups',
  MyEvents: 'MyEvents',
  Profile: 'Profile',
  SignUp: 'SignUp',
  LogIn: 'LogIn',
  ResetPassword: 'ResetPassword',
  ChangePassword: 'ChangePassword',
  EditProfile: 'EditProfile',
  SignedUp: 'SignedUp',
  EmailVerified: 'EmailVerified',
  PartnerWithUs: 'PartnerWithUs',
  Donate: 'Donate',
  ThankYou: 'ThankYou',
  Press: 'Press',
  ContactUs: 'ContactUs',
  CreateGroup: 'CreateGroup',
  CreateEvent: 'CreateEvent',
  AboutEvent: 'AboutEvent',
  LiveEvent: 'LiveEvent',
  CorporateEvent: 'CorporateEvent',
  Error: 'Error'
};

export type SectionType = $Keys<typeof Section>;

export default Section;
