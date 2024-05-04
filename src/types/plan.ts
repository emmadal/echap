type Feature = {
  id: string;
  feature: string;
  icon: boolean;
};

export type Plan = {
  id: string;
  plan: string;
  price: string;
  mode: string;
  features: Feature[];
};
