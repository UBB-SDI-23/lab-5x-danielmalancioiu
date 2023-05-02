import random
import string

import psycopg2
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS_DESCRIPTION
from faker import Faker

def insert_data_flights():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_cars.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                insert_query = \
                    "INSERT INTO flight (call_sign, capacity, departure_airport, arrival_airport, airline_id) VALUES "
                values = []

                for i in range(10):

                    airline_id = random
                    prefix = ''.join(random.choices(string.ascii_uppercase, k=3))
                    number = ''.join(random.choices(string.digits, k=4))
                    call_sign = prefix + number

                    airports_list = ["JFK", "LAX", "ATL", "ORD", "DXB", "HND", "LHR", "CDG", "SYD", "PEK"]
                    departure_airport = random.choice(airports_list)
                    arrival_airport = random.choice(airports_list)

                    capacity = random.randint(100, 1000)

                    values.append(
                        f"('{call_sign}', {capacity}, '{departure_airport}', '{arrival_airport}')")

                    if len(values) == 10:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()



