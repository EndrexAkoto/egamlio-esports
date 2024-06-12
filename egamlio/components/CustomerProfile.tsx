// components/CustomerProfile.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CustomerProfile: React.FC = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const [customerDetails, setCustomerDetails] = useState<any>({});

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetails(customerId as string);
    }
  }, [customerId]);

  const fetchCustomerDetails = async (customerId: string) => {
    try {
      const response = await axios.get(`https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/${customerId}`);
      setCustomerDetails(response.data.response);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  return (
    <div>
      <h1>Customer Profile</h1>
      <div>
        <strong>First Name:</strong> {customerDetails.first_name}
      </div>
      <div>
        <strong>Other Names:</strong> {customerDetails.other_names}
      </div>
      <div>
        <strong>Mobile Number:</strong> {customerDetails.mobile}
      </div>
      <div>
        <strong>Gender:</strong> {customerDetails.gender}
      </div>
      <div>
        <strong>Email:</strong> {customerDetails.email}
      </div>
    </div>
  );
};

export default CustomerProfile;
