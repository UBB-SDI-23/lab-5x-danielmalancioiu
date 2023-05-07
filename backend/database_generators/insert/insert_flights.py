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
        with open("./queries/insert_flights.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                cursor.execute("SELECT id from airline")
                airline_ids = [el[0] for el in cursor.fetchall()]
                cursor.execute("SELECT id from users")
                user_ids = [el[0] for el in cursor.fetchall()]
                insert_query = \
                    "INSERT INTO flight (call_sign, capacity, departure_airport, arrival_airport, airline_id, user_id) VALUES "
                values = []

                for i in range(1000000):

                    airline_id = random
                    prefix = ''.join(random.choices(string.ascii_uppercase, k=3))
                    number = ''.join(random.choices(string.digits, k=4))
                    call_sign = prefix + number

                    airline_id = random.choice(airline_ids)

                    airports_list = ["JFK", "LAX", "ATL", "ORD", "DXB", "HND", "LHR", "CDG", "SYD", "PEK", "SFO", "DEN", "AMS", "FRA", "MUC", "MEL", "ICN", "SIN", "BKK", "FCO", "NRT", "SHA", "PVG", "BOM", "DEL", "GRU", "GIG", "MEX", "EZE", "LIM"]
                    departure_airport = random.choice(airports_list)
                    arrival_airport = random.choice(airports_list)

                    capacity = random.randint(50, 1000)

                    user_id = random.choice(user_ids)

                    values.append(
                        f"('{call_sign}', {capacity}, '{departure_airport}', '{arrival_airport}', {airline_id}, {user_id})")

                    if len(values) == 1000:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()



