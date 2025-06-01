#!/bin/bash
# start-dev.sh: A script to start the local development environment.
# It:
#   1. Activates your virtual environment.
#   2. Checks that PostgreSQL is running (and attempts to start it if not).
#   3. Starts the Django development server.
#   4. Starts the frontend development server.

# Exit immediately if a command exits with a non-zero status.
set -e

trap 'echo "Terminating..."; kill $(jobs -p); exit 0' SIGINT SIGTERM

echo "Activating virtual environment..."
# Adjust the path to your virtual environment if needed.
source ./backend/env/bin/activate

echo "Checking PostgreSQL status..."
# Use pg_isready to check if PostgreSQL is accepting connections.
if pg_isready > /dev/null 2>&1; then
  echo "PostgreSQL is running."
else
  echo "PostgreSQL is not running. Attempting to start it..."
  # If using systemd (Linux):
  if command -v systemctl > /dev/null; then
    sudo systemctl start postgresql
  # If using Homebrew (macOS):
  elif command -v brew > /dev/null; then
    echo "starting PostgreSQL using Homebrew..."
    brew services start postgresql
  else
    echo "Could not determine how to start PostgreSQL. Please start it manually."
    exit 1
  fi

  # Wait a few seconds to ensure PostgreSQL starts
  sleep 3
fi

echo "Starting Django server..."
# Start the Django development server in the background.
python3 ./backend/grooveMapsBackend/manage.py runserver &

echo "Starting Frontend server..."
# Change directory to the frontend folder and start the dev server in the background.
cd grooveMaps
npm run dev &
cd ..

echo "All services started."
echo "Press Ctrl+C to stop all servers."
wait
