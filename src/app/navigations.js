import { authRoles } from './auth/authRoles'

export const navigations = [
  {
    name: 'Courses',
    path: '/instructor/courses',
    icon: 'ondemand_video'
  }, {
    name: 'Communication',
    path: '/instructor/communication',
    icon: 'comment'
  },
  // {
  //   name: 'Performance',
  //   path: '/instructor/performance',
  //   icon: 'bar_chart'
  // },
  {
    name: 'Tools',
    path: '/instructor/tools',
    icon: 'settings'
  },
  {
    name: 'Resources',
    path: '/instructor/resources',
    icon: 'help_outline'
  },
  // {
  //   label: 'Management',
  //   type: 'label'
  // },
  // {
  //   name: 'Course',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Courses List',
  //       iconText: 'SI',
  //       path: '/courses/list'
  //     },
  //     {
  //       name: 'Add Course',
  //       iconText: 'SI',
  //       path: '/courses/add'
  //     }
  //   ]
  // },
  // {
  //   name: 'Class',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Classes List',
  //       iconText: 'SI',
  //       path: '/classes/list'
  //     },
  //     {
  //       name: 'Add Course',
  //       iconText: 'SI',
  //       path: '/classes/add'
  //     }
  //   ]
  // },
  // {
  //   name: 'Room',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Rooms List',
  //       iconText: 'SI',
  //       path: '/rooms/list'
  //     },
  //     {
  //       name: 'Add Room',
  //       iconText: 'SI',
  //       path: '/rooms/add'
  //     }
  //   ]
  // },
  // {
  //   name: 'Admin',
  //   path: '/dashboard',
  //   icon: 'home'
  // },
  // {
  //   name: 'Enrollment',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Enrollments List',
  //       iconText: 'SI',
  //       path: '/enrollments/list'
  //     },
  //     {
  //       name: 'Enroll First Course',
  //       iconText: 'SI',
  //       path: '/enrollments/first-course'
  //     },
  //     {
  //       name: 'Enroll Next Course',
  //       iconText: 'SI',
  //       path: '/enrollments/next-course'
  //     }
  //   ]
  // },
  // {
  //   name: 'Student',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Students List',
  //       iconText: 'SI',
  //       path: '/students/list'
  //     },
  //     {
  //       name: 'Add Student',
  //       iconText: 'SI',
  //       path: '/students/add'
  //     }
  //   ]
  // },
  // {
  //   name: 'Instructor',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Instructors List',
  //       iconText: 'SI',
  //       path: '/instructors/list'
  //     },
  //     {
  //       name: 'Add Instructor',
  //       iconText: 'SI',
  //       path: '/instructors/add'
  //     }
  //   ]
  // },
  // {
  //   label: 'Schedule',
  //   type: 'label',
  // },
  // {
  //   name: 'Room Schedule',
  //   icon: 'home',
  //   path: '/room-schedule'
  // },
  // {
  //   name: 'Leave',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Leave Requests List',
  //       iconText: 'SI',
  //       path: '/leaves/request'
  //     },
  //     {
  //       name: 'Add Leave Request',
  //       iconText: 'SI',
  //       path: '/leaves/add'
  //     }
  //   ]
  // },
  // {
  //   label: 'Finance',
  //   type: 'label',
  // },
  // {
  //   name: 'Invoice',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Invoices List',
  //       iconText: 'SI',
  //       path: '/invoices/list'
  //     },
  //     {
  //       name: 'Add Invoice',
  //       iconText: 'SI',
  //       path: '/invoices/add'
  //     }
  //   ]
  // },
  // {
  //   name: 'Expense',
  //   icon: 'home',
  //   children: [
  //     {
  //       name: 'Expenses List',
  //       iconText: 'SI',
  //       path: '/expenses/list'
  //     },
  //     {
  //       name: 'Add Expense',
  //       iconText: 'SI',
  //       path: '/expenses/add'
  //     }
  //   ]
  // },
  // {
  //   label: 'Extra',
  //   type: 'label',
  // },
  // {
  //   name: 'Courses',
  //   icon: 'school',
  //   children: [
  //     {
  //       name: 'Courses List',
  //       iconText: 'SI',
  //       path: '/scheduling/courses/list'
  //     },
  //     {
  //       name: 'Classes List',
  //       iconText: 'SI',
  //       path: '/scheduling/classes/list'
  //     },
  //     {
  //       name: 'Rooms List',
  //       iconText: 'SI',
  //       path: '/scheduling/rooms/list'
  //     },
  //     {
  //       name: "Bookings",
  //       iconText: 'SI',
  //       path: '/scheduling/courses/bookings'
  //     },
  //     {
  //       name: 'Enrollments',
  //       iconText: 'SI',
  //       path: '/scheduling/courses/enrollments'
  //     }
  //   ],
  // },
  // {
  //   name: 'Timetables',
  //   icon: 'school',
  //   children: [
  //     {
  //       name: 'Course Availability Calendar',
  //       iconText: 'SI',
  //       path: '/timetables/course-availability'
  //     },
  //     {
  //       name: 'School Calendar',
  //       iconText: 'SI',
  //       path: '/timetables/school'
  //     },
  //     {
  //       name: "Weekly Scheduling Calendar",
  //       iconText: 'SI',
  //       path: '/timetables/weekly'
  //     }
  //   ],
  // },
  // {
  //   name: "Instructor Scheduling",
  //   icon: 'school',
  //   path: '/instructor-scheduling'
  // },
  // {
  //   name: 'Leaves And Holidays',
  //   icon: 'school',
  //   children: [
  //     {
  //       name: 'School Holidays',
  //       iconText: 'SI',
  //       path: '/leaves-holidays/school'
  //     },
  //     {
  //       name: "Instructors' Personal Leaves",
  //       iconText: 'SI',
  //       path: '/leaves-holidays/instructor'
  //     },
  //     {
  //       name: "Student's Personal Leaves",
  //       iconText: 'SI',
  //       path: '/leaves-holidays/student'
  //     }
  //   ],
  // },
  // {
  //   label: 'Profiles',
  //   type: 'label',
  // },
  // {
  //   name: 'Administrator',
  //   icon: 'school',
  //   path: '/profiles/admins'
  // },
  // {
  //   name: 'Instructor',
  //   icon: 'school',
  //   path: '/profiles/instructors/list'
  // },
  // {
  //   name: 'Student',
  //   icon: 'school',
  //   path: '/profiles/students/list'
  // },
  // {
  //   label: 'Pages',
  //   type: 'label',
  // },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     {
  //       name: 'Sign in',
  //       iconText: 'SI',
  //       path: '/signin',
  //     },
  //     {
  //       name: 'Sign up',
  //       iconText: 'SU',
  //       path: '/signup',
  //     },
  //     {
  //       name: 'Forgot Password',
  //       iconText: 'FP',
  //       path: '/forgot-password',
  //     },
  //     {
  //       name: 'Error',
  //       iconText: '404',
  //       path: '/404',
  //     },
  //   ],
  // },
  // {
  //   label: 'Components',
  //   type: 'label',
  // },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     {
  //       name: 'Auto Complete',
  //       path: '/material/autocomplete',
  //       iconText: 'A',
  //     },
  //     {
  //       name: 'Buttons',
  //       path: '/material/buttons',
  //       iconText: 'B',
  //     },
  //     {
  //       name: 'Checkbox',
  //       path: '/material/checkbox',
  //       iconText: 'C',
  //     },
  //     {
  //       name: 'Dialog',
  //       path: '/material/dialog',
  //       iconText: 'D',
  //     },
  //     {
  //       name: 'Drag and Drop',
  //       iconText: 'D',
  //       path: '/others/drag-and-drop',
  //     },
  //     {
  //       name: 'Expansion Panel',
  //       path: '/material/expansion-panel',
  //       iconText: 'E',
  //     },
  //     {
  //       name: 'Form',
  //       path: '/material/form',
  //       iconText: 'F',
  //     },
  //     {
  //       name: 'Icons',
  //       path: '/material/icons',
  //       iconText: 'I',
  //     },
  //     {
  //       name: 'Menu',
  //       path: '/material/menu',
  //       iconText: 'M',
  //     },
  //     {
  //       name: 'Progress',
  //       path: '/material/progress',
  //       iconText: 'P',
  //     },
  //     {
  //       name: 'Radio',
  //       path: '/material/radio',
  //       iconText: 'R',
  //     },
  //     {
  //       name: 'Switch',
  //       path: '/material/switch',
  //       iconText: 'S',
  //     },
  //     {
  //       name: 'Slider',
  //       path: '/material/slider',
  //       iconText: 'S',
  //     },
  //     {
  //       name: 'Snackbar',
  //       path: '/material/snackbar',
  //       iconText: 'S',
  //     },
  //     {
  //       name: 'Table',
  //       path: '/material/table',
  //       iconText: 'T',
  //     },
  //   ],
  // },
  // {
  //   name: 'Form',
  //   icon: 'format_list_bulleted',
  //   children: [
  //     {
  //       name: 'Baisc',
  //       path: '/forms/basic',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Editor',
  //       path: '/forms/editor',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Upload',
  //       path: '/forms/upload',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Invoice',
  //       path: '/forms/invoice',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Order',
  //       path: '/forms/order',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Wizzard',
  //       path: '/forms/Wizzard',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     }
  //   ]
  // },
  // {
  //   name: 'Chat Box',
  //   icon: 'school',
  //   path: '/chat'
  // },
  // {
  //   name: 'Utilities',
  //   icon: 'format_list_bulleted',
  //   children: [
  //     {
  //       name: 'Color',
  //       path: '/utilities/color',
  //       iconText: 'C',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Spacing',
  //       path: '/utilities/spacing',
  //       iconText: 'S',
  //       auth: authRoles.admin,
  //     },
  //     {
  //       name: 'Typography',
  //       path: '/utilities/typography',
  //       iconText: 'T',
  //     },
  //     {
  //       name: 'Display',
  //       path: '/utilities/display',
  //       iconText: 'D',
  //     },
  //     {
  //       name: 'Position',
  //       path: '/utilities/position',
  //       iconText: 'P',
  //     },
  //     {
  //       name: 'Shadow',
  //       path: '/utilities/shadow',
  //       iconText: 'S',
  //     },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [
  //     {
  //       name: 'Echarts',
  //       path: '/charts/echarts',
  //       iconText: 'E',
  //     }
  //   ],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
]
