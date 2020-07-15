import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'campanhas',
        title: 'Campanhas',
        type: 'item',
        url: '/dashboard/campanhas',
        icon: 'feather icon-pie-chart',
        breadcrumbs: false,
      },
    ]
  },
  {
    id: 'cadastros',
    title: 'Cadastros',
    type: 'group',
    icon: 'feather icon-layout',
    children: [
      {
        id: 'clusters',
        title: 'Clusters',
        type: 'item',
        url: '/cadastros/clusters',
        icon: 'fa fa-layer-group',
        breadcrumbs: false,
      },
      {
        id: 'cortesias',
        title: 'Cortesias',
        type: 'item',
        url: '/cadastros/cortesias',
        icon: 'feather icon-award',
        breadcrumbs: false,
      },
      {
        id: 'mcc',
        title: 'MCC',
        type: 'item',
        url: '/cadastros/mcc',
        icon: 'fa fa-barcode',
        breadcrumbs: false,
      },
      {
        id: 'moedas',
        title: 'Moedas',
        type: 'item',
        url: '/cadastros/moedas',
        icon: 'fa fa-dollar-sign',
        breadcrumbs: false,
      },
      {
        id: 'pacotes-beneficios',
        title: 'Pacotes de Benefícios',
        type: 'item',
        url: '/cadastros/pacotes-beneficios',
        icon: 'feather icon-box',
        breadcrumbs: false,
      },
      {
        id: 'validades-pontos',
        title: 'Validades de Pontos',
        type: 'item',
        url: '/cadastros/validades-pontos',
        icon: 'fa fa-calendar',
        breadcrumbs: false,
      },
      {
        id: 'valores-pontos',
        title: 'Valores de Pontos',
        type: 'item',
        url: '/cadastros/valores-pontos',
        icon: 'fa fa-dollar-sign',
        breadcrumbs: false,
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
