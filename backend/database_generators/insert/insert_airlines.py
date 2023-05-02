import random
import string

import faker
import psycopg2
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS_DESCRIPTION
from faker import Faker


def insert_data_airlines():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_airlines.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                insert_query = \
                    "INSERT INTO airline (name, iata_code, fleet_size, website, country) VALUES "
                values = []

                for i in range(10):

                    domain = fake.domain_name()
                    tld = fake.tld()
                    website = 'www.' + domain + '.' + tld

                    iataCode = ''.join(random.choices(string.ascii_uppercase, k=3))

                    fleet_size = random.randint(100, 1000)

                    country = fake.country()

                    name = fake.company()

                    values.append(
                        f"('{name}', '{iataCode}', {fleet_size}, '{website}', '{country}')")

                    if len(values) == 10:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()



