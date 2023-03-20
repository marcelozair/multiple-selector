import { customers } from './constants/customers'
import { customersToOptions } from './helpers/OptionParse';
import { MultipleSelector } from './componets/MultipleSelector/MultipleSelector'

function App() {
  const customerOptions = customersToOptions(customers);

  return (
    <div className="wrapper">
      <div className="box">
        <MultipleSelector options={customerOptions} />
      </div>
    </div>
  )
}

export default App
