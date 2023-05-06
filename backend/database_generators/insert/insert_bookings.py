import random
import string

import psycopg2
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS_DESCRIPTION
from faker import Faker

def insert_data_bookings():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_bookings.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                # cursor.execute("SELECT id from flight")
                # flight_ids = [el[0] for el in cursor.fetchall()]
                # cursor.execute("SELECT id from passenger")
                # passenger_ids = [el[0] for el in cursor.fetchall()]
                insert_query = \
                    "INSERT INTO booking (flight_id, passenger_id, seat_number, booking_date, price) VALUES "
                values = []

                for i in range(1000000):
                    flight_id = random.randint(1,1000000)
                    passenger_id = random.randint(1,1000000)

                    seat_number = fake.random_element(
                        elements=('A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8', 'I9', 'J10',
                                  'K11', 'L12', 'M13', 'N14', 'O15', 'P16', 'Q17', 'R18',
                                  'S19', 'T20', 'U21', 'V22', 'W23', 'X24', 'Y25', 'Z26', 'AA27', 'BB28',
                                  'CC29', 'DD30', 'EE31', 'FF32', 'GG33', 'HH34', 'II35', 'JJ36',
                                  'KK37', 'LL38', 'MM39', 'NN40', 'OO41', 'PP42', 'QQ43', 'RR44',
                                  'SS45', 'TT46', 'UU47', 'VV48', 'WW49', 'XX50'))

                    booking_date = fake.date_between(start_date='-60d', end_date='+60d')
                    price = fake.pyint(min_value=50, max_value=50000)
                    values.append(
                        f"({flight_id}, {passenger_id}, '{seat_number}', '{booking_date}', {price})")

                    if len(values) == 1000:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()



