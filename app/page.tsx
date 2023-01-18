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
      title: 'Test Data',
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
          data?.ChatItems.map((item, index) => {
            return (
              <section key={index+'main'}>
                {item?.FirsName + ' ' + item?.LastName} Age: {item?.Age}
                <hr />
                {item?.ShoppingItems.map((product, productIndex) => {
                  return (
                    <p key={productIndex+'sub'}>
                      {product.Title}, {product.Price}, {product.Currency}, {product.Date.seconds}
                    </p>
                  )
                })}
              </section>
            )
          })
        ) : null}
        
    </div>
  );
  
}
