import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Administrador',
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
    subItems: [
      {
        label: 'Nueva Reservación',
        link: './reservation/reservation-calendar',
      },
    ]
  },
  ];
