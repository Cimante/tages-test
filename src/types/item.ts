export type Item = {
  id: string;
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
