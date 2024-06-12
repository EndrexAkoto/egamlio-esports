import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CreateCustomer.module.css';

const Home: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [customers, setCustomers] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        mobileNumber: '',
        email: '',
        description: ''
    });
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/login');
        } else {
            setFirstName(localStorage.getItem('firstName') || '');
            setLastName(localStorage.getItem('lastName') || '');
            fetchCustomers(accessToken);
        }
        setLoading(false);
    }, [router]);

    const fetchCustomers = async (accessToken: string) => {
        try {
            const response = await fetch('https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setCustomers(data.response || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        router.push('/login');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://stemprotocol.codefremics.com/api/v2/customers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Customer created successfully:', data);
            fetchCustomers(localStorage.getItem('accessToken') || ''); 
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const handleCustomerClick = (customerId: string) => {
        router.push(`/customer/${customerId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Welcome, {firstName} {lastName}</h1>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            <div className={styles.formContainer}>
                <h2>Create New Customer</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formField}>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            placeholder="Gender"
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className={styles.textInput}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
            <div className={styles.customerList}>
                <h2>Customer List</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customer_id} onClick={() => handleCustomerClick(customer.customer_id)}>
                                <td>{customer.first_name}</td>
                                <td>{customer.other_names}</td>
                                <td>{customer.number}</td>
                                <td>{customer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
