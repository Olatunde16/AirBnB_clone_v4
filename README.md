# AirBnB Clone - The Console

## Introduction
The console is the first segment of the AirBnB project at Holberton School that covers fundamental concepts of higher-level programming. This segment aims to eventually deploy a server that replicates the functionality of the AirBnB website (HBnB). The command interpreter manages objects for the AirBnB (HBnB) website.

## Functionalities of this command interpreter:
- Create a new object (e.g., User, Place)
- Retrieve an object from a file or database
- Perform operations on objects (count, compute stats, etc.)
- Update attributes of an object
- Destroy an object

## Table of Contents
- Environment
- Installation
- File Descriptions
- Usage
- Examples of use
- Bugs
- Authors
- License

## Environment
This project is interpreted and tested on Ubuntu 14.04 LTS using Python3 (version 3.4.3).

## Installation
1. Clone this repository: `git clone "https://github.com/kaleabendrias/AirBnB_clone_v4.git"`
2. Access AirBnb directory: `cd AirBnB_clone`
3. Run hbnb(interactively): `./console` and enter command
4. Run hbnb(non-interactively): `echo "<command>" | ./console.py`

## File Descriptions
- `console.py`: The entry point of the command interpreter.
- `models/` directory contains classes used for this project.
- `models/engine` directory contains the File Storage class that handles JSON serialization and deserialization.

## Usage
Sample usage of the console:

```bash
vagrantAirBnB_clone$./console.py
(hbnb) help
# ... (commands list)

(hbnb) all MyModel
** class doesn't exist **

# ... (sample command sequence)

(hbnb) quit
```

## Bugs
No known bugs at this time.

## Authors
- Kaleab Endrias - [Github](https://github.com/kaleabendrias)
- Rafael John - [Github](https://github.com/RafaelJohn9)

## License
Public Domain. No copyright protection.