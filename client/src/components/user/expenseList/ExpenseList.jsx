// import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import { Container, Title, Card, Text, Button, Group, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../config/axios';
 
 

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const fetchExpenseItems = async () =>{
        try{
            const res = await axiosInstance.get("/api/expense", {
                withCredentials: true,
            });
            setExpenses(res.data.expenses);

        }catch(e){
            console.log(e);
        }
    }
    console.log(expenses, "expenses");
    useEffect(() => {
        fetchExpenseItems();
    }, []);
  const handleDelete = (id) => {
    console.log(`Delete expense with id: ${id}`);
    // Add your delete logic here
  };

  return (
    <Container>
      <Title order={1} align="center" style={{ marginBottom: '2rem' }}>Expenses</Title>
      <Flex direction="column" align="center" >
        {expenses.map((expense) => (
          <Card key={expense._id} shadow="sm" padding="lg" style={{ marginBottom: '1rem', width: '100%', maxWidth: '400px' }}>
             <Flex justify="space-between" align="center" gap="xs">
              <Flex direction="column" gap="xs" style={{ flexGrow: 1, overflowWrap: 'break-word', wordBreak: 'break-all', maxWidth: '70%' }}>
                <Text>{expense.name}</Text>
                
                <Text size="sm" c="dimmed">{expense.createAt}</Text>
              </Flex>
              <Text>${expense.amount}</Text>
              <Button color="red" style={{ minWidth: '50px' }} onClick={() => handleDelete(expense.id)} >
                <IconTrash  size={20} stroke={2} />
               
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Container>
  );
}