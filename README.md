# sunvoy-challenge
A Node.js script that reverse engineers sunvoy legacy web application

## Prerequisites

- Node.js (latest LTS recommended)
- NPM
- `.env` file with the following credentials:

```env
USERNAME=your_sunvoy_username
PASSWORD=your_sunvoy_password
```

## Installation

- Clone this repository.
- Install dependencies:

```bash
npm install
```

## Running the Script

```bash
npm run start
```

## What It Does
- Loads existing cookie session (if available).
- (checker) Attempts to fetch a user list:
  - If session is valid, it proceeds.
  - If session is invalid (401 error), it logs in and stores new credentials.
- Fetches:
  - All users
  - Current logged-in user from a signed request
- Saves all data to a JSON file (output path is defined in the saveToJsonFile helper).
