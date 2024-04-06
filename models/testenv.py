import os

# Use os.getenv to access the environment variable
storage_t = os.getenv("HBNB_TYPE_STORAGE")

# Check if the environment variable is set
if storage_t is not None:
    print("HBNB_TYPE_STORAGE is set to:", storage_t)
else:
    print("HBNB_TYPE_STORAGE is not set.")
