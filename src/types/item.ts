export type Item = {
  id: null;
  name: string;
  code: string;
  price: {
    old_price: number | null;
    current_price: number;
  };
  image: {
    url: string;
  };
  material: number;
};
