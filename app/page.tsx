"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { IExtNodeElement, ExtChat, Chat } from '../types/shopUser'

export default function Home() {
  const [data, setData] = useState<ExtChat>();

  function convertData(chat: Chat): ExtChat {
    const extChat: ExtChat = {
      Title: chat.title,
      ChatItems: []
    };
  
    chat.nodesList.forEach((node) => {
      const extNode: IExtNodeElement = {
        FirsName: node.firsName,
        LastName: node.lastName,
        Age: node.age,
        BirthDate: {
          seconds: new Date(node.birthDate).getTime() / 1000,
          nanos: 0
        },
        ShoppingItems: []
      };
  
      if (node.shoppingItemsList) {
        node.shoppingItemsList.forEach((item) => {
          extNode.ShoppingItems.push({
            Title: item.title,
            Price: item.price,
            Currency: item.currency,
            Date: {
              seconds: new Date(item.date).getTime() / 1000,
              nanos: 0
            }
          });
        });
      }
  
      extChat.ChatItems.push(extNode);
    });
  
    setData(extChat)
    console.log(extChat)
    return extChat;
  }

  function generateTestData(): Chat {
    return {
      title: 'Test Chat',
      nodesList: [
        {
          firsName: 'John',
          lastName: 'Doe',
          age: 30,
          birthDate: '1990-01-01',
          shoppingItemsList: [
            {
              title: 'Shirt',
              price: 20,
              currency: 'USD',
              date: '2020-01-01'
            },
            {
              title: 'Pants',
              price: 30,
              currency: 'USD',
              date: '2020-01-02'
            }
          ]
        },
        {
          firsName: 'Jane',
          lastName: 'Doe',
          age: 25,
          birthDate: '1995-01-01'
        }
      ]
    };
  }

  useEffect(() => {
    convertData(generateTestData())
  },[])

  return (
    <div className={styles.container}>
        <h1>Converted Data Sample - {data?.Title}</h1>
        {data?.ChatItems?.length > 0 ? (
          data?.ChatItems.map((item) => {
            return (
              <table>
	<thead>
		<tr>
			<td>FirsName</td>
			<td>LastName</td>
			<td>Age</td>
			<td>BirthDate.seconds</td>
			<td>BirthDate.nanos</td>
			<td>ShoppingItems.Title</td>
			<td>ShoppingItems.Price</td>
			<td>ShoppingItems.Currency</td>
			<td>ShoppingItems.Date.seconds</td>
			<td>ShoppingItems.Date.nanos</td>
			<td>ShoppingItems.Title</td>
			<td>ShoppingItems.Price</td>
			<td>ShoppingItems.Currency</td>
			<td>ShoppingItems.Date.seconds</td>
			<td>ShoppingItems.Date.nanos</td>
		</tr>
	</thead>
</table>
            )
          })
        ) : null}
        
    </div>
  );
  
}
