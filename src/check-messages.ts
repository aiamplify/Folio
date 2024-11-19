import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function checkMessages() {
  const client = new Client({
    cloud: {
      secureConnectBundle: path.resolve(process.env.ASTRA_DB_SECURE_BUNDLE_PATH || ''),
    },
    credentials: {
      username: process.env.ASTRA_DB_CLIENT_ID || '',
      password: process.env.ASTRA_DB_CLIENT_SECRET || '',
    },
    keyspace: process.env.ASTRA_DB_KEYSPACE,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const query = 'SELECT * FROM contact_messages';
    const result = await client.execute(query);

    if (result.rows.length === 0) {
      console.log('No messages found in the database');
    } else {
      console.log('Found messages:');
      result.rows.forEach(row => {
        console.log('-------------------');
        console.log('ID:', row.id);
        console.log('Name:', row.name);
        console.log('Email:', row.email);
        console.log('Message:', row.message);
        console.log('Created at:', row.created_at);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.shutdown();
  }
}

checkMessages();
