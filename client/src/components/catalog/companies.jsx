import { ReactComponent as Logo } from '../../assets/companies/planmeca.svg';
import {categories} from '../products'
const Companies = ({ setFilter }) => {
    const companies = categories("company")
    return (
      <ul className='companies'>
        {companies.map((company, index) => (
          <li key={index} className='company' onClick={() => setFilter({ company: company })}>
            <Logo className='logo' />
            <span>{company}</span>
          </li>
        ))}
      </ul>
    );
  };

  export default Companies;