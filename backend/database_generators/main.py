# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from insert.insert_airlines import insert_data_airlines
from insert.insert_flights import insert_data_flights


def insert_flights():
    print("Inserting flights...")
    insert_data_flights()
    print("Finished inserting flights")

def insert_airlines():
    print("Inserting airlines...")
    insert_data_airlines()
    print("Finished inserting airlines")


def insert():
    print("===== Insert script is running! =====")
    #insert_flights()
    insert_airlines()
    print("===== Insert script was successful! =====")


if __name__ == '__main__':
    insert()