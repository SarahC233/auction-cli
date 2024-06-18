# Auction CLI Tool

## Description

Auction CLI Tool is a command-line interface (CLI) tool that allows users to manage auction items in a MongoDB database. It provides functionality to seed data, add new auction items, delete specific items, clear the entire database, and retrieve items based on search criteria through an API.

## Features

- **Seed Data**: Insert predefined auction items into the specified database.
- **Add Item**: Add a new auction item to the specified database.
- **Delete Item**: Delete a specific auction item by its ID from the specified database.
- **Clear Database**: Delete all auction items from the specified database.
- **API Search**: Retrieve items that match a specified search criteria via an API.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js installation includes npm (Node Package Manager). Verify the installation with:
  ```sh
  node -v
  npm -v
  ```
- **MongoDB**: Ensure MongoDB is installed and running on your local machine. You can download it from mongodb.com.

## Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd auction-cli
   ```
2. **Install Dependencies**: Run the following command to install the necessary dependencies:

   ```sh
   npm install
   ```

3. **Link package locally (for testing)**
   npm link

## CLI Commands

**Seed data into specified database**
auction-cli seed <dbName>

**Delete All Data from the Specified Database**
auction-cli delete <dbName>

**Add a New Auction Item to the Specified Database**
auction-cli add <dbName> -- -t <title> -d <description> -s <start_price> -r <reserve_price>

example: auction-cli add auctionDB -- -t "Antique Clock" -d "A beautiful antique clock." -s 150 -r 300

**Delete a Specific Auction Item by ID from the Specified Database**
auction-cli delete-item <dbName> -- -i <item_id>

example: auction-cli delete-item auctionDB -- -i 60c72b2f9af1f2d9c786c610

## API Commands

**Start the API Server**
 auction-cli serve <dbName>

**Search for Items**
Use a tool like Postman or curl to test the search endpoint:
e.g., curl "http://localhost:5000/api/items/search?keyword=antique"


## Configuration

**Database Connection**
The database connection is configured in the config/db.js file. The CLI tool connects to a MongoDB instance running on localhost:27017. The database name is dynamically passed as an argument when running the CLI commands.

**Seed Data**
The seed data is defined in the data/seedData.js file. Modify this file to customise the auction items.

## Contributing 
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License
This project is licensed under the MIT License. 

## Author
SarahC233

## Acknowledgments
Thanks to the creators of Commander.js and Mongoose for their excellent libraries. 