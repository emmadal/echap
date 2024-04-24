import {Plan} from 'types/plan';

export const pricing: Array<Plan> = [
  {
    id: '1',
    plan: 'Gratuit',
    price: '0 FCFA/mois',
    features: [
      {
        id: '1',
        feature: "Création d'articles (03 Max)",
        icon: true,
      },
      {
        id: '2',
        feature: 'Assistance support',
        icon: true,
      },
      {
        id: '3',
        feature: "Téléchargement d'images limitée",
        icon: true,
      },
      {
        id: '7',
        feature: 'Boutique en ligne',
        icon: false,
      },
      {
        id: '4',
        feature: 'Publicité',
        icon: false,
      },

      {
        id: '5',
        feature: 'Assistance virtuelle (24/7)',
        icon: false,
      },
      {
        id: '6',
        feature: 'Chat instantanée',
        icon: false,
      },
    ],
  },
  {
    id: '2',
    plan: 'Premium',
    price: '1000 FCFA/mois',
    features: [
      {
        id: '1',
        feature: "Création d'articles illimitée",
        icon: true,
      },
      {
        id: '2',
        feature: 'Boutique en ligne',
        icon: true,
      },
      {
        id: '3',
        feature: 'Assistance support',
        icon: true,
      },
      {
        id: '4',
        feature: "Téléchargement d'images illimitée",
        icon: true,
      },
      {
        id: '5',
        feature: 'Publicité',
        icon: true,
      },

      {
        id: '6',
        feature: 'Assistance virtuelle (24/7)',
        icon: true,
      },
      {
        id: '7',
        feature: 'Chat instantanée',
        icon: true,
      },
    ],
  },
];
