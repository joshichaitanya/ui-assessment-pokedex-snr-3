export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: string;
  maxCP: string;
  maxHP: string;
};
