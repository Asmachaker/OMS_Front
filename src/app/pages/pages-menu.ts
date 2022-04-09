import { NbMenuItem } from '@nebular/theme';

export const ADMIN_MENU: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bar-chart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Planning',
    icon: 'person-outline',
    link: '/pages/planning',
  },
  {
    title: 'Booking',
    icon: 'bar-chart-outline',
    link: '/pages/booking',
  },
  {
    title: 'Client',
    icon: 'bar-chart-outline',
    link: '/pages/client/liste',
  },
  {
    title: 'Prix',
    icon: 'flip-2-outline',

     children:[{
        title: 'Zone',
        link: '/pages/zone',
      },
      {
        title: 'Taille',
        link: '/pages/taille',
      },
      {
        title: 'Tarif',
        link: '/pages/tarif',
      },

    ]

  },
  {
    title: 'Finance',
    icon: 'flip-2-outline',

    children: [

      {
        title: 'Bordereaux',
        link: '/pages/bordereau',
      },
      {
        title: 'Factures',
        link: '/pages/facture',
      },
      {
        title: 'Facture d\'avoir',
        link: '/pages/factureAV',
      },

    ]

  },
  {
    title: 'Administration',
    icon: 'map-outline',
    link: '/pages/admin/liste',
  },
]

export const USER_MENU: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bar-chart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Planning',
    icon: 'person-outline',
    link: '/pages/planning',
  },
  {
    title: 'Booking',
    icon: 'bar-chart-outline',
    link: '/pages/booking',
  },
  {
    title: 'Client',
    icon: 'bar-chart-outline',
    link: '/pages/client/liste',
  },
  {
    title: 'Prix',
    icon: 'flip-2-outline',

     children:[{
        title: 'Zone',
        link: '/pages/zone',
      },
      {
        title: 'Taille',
        link: '/pages/taille',
      },
      {
        title: 'Tarif',
        link: '/pages/tarif/liste',
      },

    ]

  },
  {
    title: 'Finance',
    icon: 'flip-2-outline',

    children: [

      {
        title: 'Bordereaux',
        link: '/pages/bordereau',
      },
      {
        title: 'Factures',
        link: '/pages/facture',
      },
      {
        title: 'Facture d\'avoir',
        link: '/pages/factureAV',
      },

    ]

  },
]