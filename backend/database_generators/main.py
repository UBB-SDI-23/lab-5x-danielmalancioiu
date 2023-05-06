# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from insert.insert_airlines import insert_data_airlines
from insert.insert_bookings import insert_data_bookings
from insert.insert_flights import insert_data_flights
from insert.insert_passengers import insert_data_passengers


def insert_flights():
    print("Inserting flights...")
    insert_data_flights()
    print("Finished inserting flights")

def insert_airlines():
    print("Inserting airlines...")
    insert_data_airlines()
    print("Finished inserting airlines")

def insert_passengers():
    print("Inserting passengers...")
    insert_data_passengers()
    print("Finished inserting passengers")

def insert_bookings():
    print("Inserting bookings...")
    insert_data_bookings()
    print("Finished inserting bookings")



def insert():
    print("===== Insert script is running! =====")
    #insert_passengers()
    #insert_flights()
    insert_bookings()
    #insert_airlines()
    print("===== Insert script was successful! =====")


if __name__ == '__main__':
    insert()