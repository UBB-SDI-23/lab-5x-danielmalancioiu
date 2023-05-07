import random
import string

import psycopg2
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS_DESCRIPTION
from faker import Faker

def insert_data_passengers():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_passengers.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                cursor.execute("SELECT id from users")
                user_ids = [el[0] for el in cursor.fetchall()]
                insert_query = \
                    "INSERT INTO passenger (first_name, last_name, date_of_birth, nationality, passport_number, user_id) VALUES "
                values = []

                for i in range(1000000):

                    nationalities = ['USA', 'UK', 'Canada', 'Australia', 'Japan', 'China', 'France', 'Germany', 'Spain','Italy', 'Brazil', 'Mexico', 'India', 'Russia', 'South Africa', 'Sweden', 'Norway','Finland', 'Denmark', 'Netherlands', 'Switzerland', 'Belgium', 'Austria', 'Ireland','New Zealand', 'South Korea', 'Greece', 'Israel', 'Turkey', 'Portugal']


                    first_name = fake.first_name()
                    last_name = fake.last_name()
                    date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=100)
                    nationality = random.choice(nationalities)
                    passport_number = fake.random_int(min=10000000, max=99999999)
                    user_id = random.choice(user_ids)

                    values.append(
                        f"('{first_name}', '{last_name}', '{date_of_birth}', '{nationality}', '{passport_number}', {user_id})")

                    if len(values) == 1000:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()



