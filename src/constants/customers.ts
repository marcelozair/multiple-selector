export interface Customer {
  id: number;
  name: string;
  email: string;
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Alissa Prince',
    email: 'alissa.prince@gmail.com'
  },
  {
    id: 2,
    name: 'Hiba Miles',
    email: 'hiba.miles@gmail.com'
  },
  {
    id: 3,
    name: 'Osian Shepard',
    email: 'osian.shepard@gmail.com'
  },
  {
    id: 4,
    name: 'Ollie Hickman',
    email: 'ollie.hickman@gmail.com'
  },
]