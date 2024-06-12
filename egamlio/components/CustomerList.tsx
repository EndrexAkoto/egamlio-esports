// components/CustomerList.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CustomerList: React.FC = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1');
      setCustomers(response.data.response);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleRowClick = (customerId: string) => {
    router.push(`/customer/${customerId}`);
  };

  const filteredCustomers = customers.filter((customer: any) =>
    Object.values(customer).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Other Names</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer: any) => (
            <tr key={customer.customer_id} onClick={() => handleRowClick(customer.customer_id)}>
              <td>{customer.customer_id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.other_names}</td>
              <td>{customer.email}</td>
              <td>{customer.mobile}</td>
              <td>{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
