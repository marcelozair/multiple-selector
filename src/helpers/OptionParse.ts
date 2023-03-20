import { Option } from "../componets/MultipleSelector/MultipleSelector";
import { Customer } from "../constants/customers";

export function customersToOptions(
  customers: Customer[]
): Option<Customer>[] {
  return customers.map((customer) => ({
    label: customer.name,
    value: customer,
  }));
}
