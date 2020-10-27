import { Customer } from '../models/customer.model';

export interface CustomersState {
  customers: Customer[] | null;
  isLoading: boolean;
  error: string;
}

export const customersInitialState: CustomersState = {
  customers: null,
  isLoading: true,
  error: null
};
