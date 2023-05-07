import random
import string

import psycopg2
from constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS_DESCRIPTION, SPECIAL_CHARS
from faker import Faker

usernames = {}

def insert_data_users():
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_users.sql", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                cursor.execute("SELECT id from user_profiles")
                user_profile_ids = [el[0] for el in cursor.fetchall()]
                insert_query = "INSERT INTO users (username, password, user_profile_id) VALUES "
                values = []

                for user_profile_id in user_profile_ids:
                    username = fake.user_name()
                    while username in usernames.keys():
                        username = fake.user_name()
                    usernames[username] = 1

                    password = "password"


                    values.append(f"('{username}', '{password}', '{user_profile_id}')")
                    if len(values) == 1000:
                        f.write(insert_query + ", ".join(values) + ";\n")
                        values = []

    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()
