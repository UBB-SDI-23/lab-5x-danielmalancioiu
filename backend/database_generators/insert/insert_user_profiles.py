import random
import psycopg2
from faker import Faker
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, SPECIAL_CHARS_DESCRIPTION
from datetime import datetime, timedelta

def insert_data_user_profiles():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_user_profiles.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                insert_query = \
                    "INSERT INTO user_profiles (bio, location, birth_date, gender, status) VALUES "
                values = []

                for i in range(0, 10000):
                    bio = fake.paragraph(nb_sentences=1)
                    bio = "".join(c for c in bio if c not in SPECIAL_CHARS_DESCRIPTION)

                    birthday = fake.date_between(start_date='-90d', end_date='+90d')

                    gender_list = ['male', 'female']
                    gender = random.choice(gender_list)

                    location = fake.country()
                    location = "".join(c for c in location if c not in SPECIAL_CHARS_DESCRIPTION)

                    marital_status_list = ['single', 'married', 'divorced', 'separated', 'civil union',
                                           'domestic partnership']
                    status = random.choice(marital_status_list)

                    values.append(f"('{bio}','{location}', '{birthday}', '{gender}', '{status}')")
                    if len(values) == 1000:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []

    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()