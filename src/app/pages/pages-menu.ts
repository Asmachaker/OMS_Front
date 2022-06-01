import { NbMenuItem } from '@nebular/theme';

export const ADMIN_MENU: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Booking',
    icon: 'shopping-cart-outline',
    link: '/pages/booking',
  },
  {
    title: 'Client',
    icon: 'map-outline',
    link: '/pages/client/liste',
  },
  
    {
      title: 'Prix',
      group: true,
    },

     {
        title: 'Zone',
        icon: 'keypad-outline',
        link: '/pages/zone',
      },
      {
        title: 'Taille',
        icon:'options-outline',
        link: '/pages/taille',
      },
      {
        title: 'Tarif',
        icon:'browser-outline',
        link: '/pages/tarif/liste',
      },

    
  {
    title: 'Finance',
    group:true ,
  },
      {
        title: 'Bordereaux',
        icon: 'bar-chart-outline',
        link: '/pages/bordereau/liste',
      },
      {
        title: 'Factures',
        icon:'clipboard-outline',
        link: '/pages/facture',
      },
      {
        title: 'Facture d\'avoir',
        icon:'briefcase-outline',
        link: '/pages/factureAV',
      },

    

  
  {
    title: 'Administration',
    icon: 'people-outline',
    link: '/pages/admin/liste',
  },
]

export const USER_MENU: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Booking',
    icon: 'shopping-cart-outline',
    link: '/pages/booking',
  },
  {
    title: 'Client',
    icon: 'map-outline',
    link: '/pages/client/liste',
  },
  
    {
      title: 'Prix',
      group: true,
    },

     {
        title: 'Zone',
        icon: 'keypad-outline',
        link: '/pages/zone',
      },
      {
        title: 'Taille',
        icon:'options-outline',
        link: '/pages/taille',
      },
      {
        title: 'Tarif',
        icon:'browser-outline',
        link: '/pages/tarif/liste',
      },

    
  {
    title: 'Finance',
    group:true ,
  },
      {
        title: 'Bordereaux',
        icon: 'bar-chart-outline',
        link: '/pages/bordereau/liste',
      },
      {
        title: 'Factures',
        icon:'clipboard-outline',
        link: '/pages/facture',
      },
      {
        title: 'Facture d\'avoir',
        icon:'briefcase-outline',
        link: '/pages/factureAV',
      },

  
]