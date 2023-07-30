import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Administrador',
    auth: '1,2',
    icon: 'user-check',
    subItems: [
      {
        label: 'Usuarios',
        link: 'admin/user-list',
      },
      {
        label: 'Salas',
        link: 'admin/room-list',
      },
      {
        label: 'Recursos',
        link: 'admin/resource-list',
      },
    ]
  },
  {
    label: 'Reservaciones',
    icon: 'calendar',
    auth: '1,2,3',
    subItems: [
      {
        label: 'Nueva Reservación',
        link: './reservation/reservation-calendar',
      },
    ]
  },
  ];
