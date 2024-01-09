#!/bin/bash
commands=(
    "yarn install --yes"
    "yarn run test"
)

# Loop through each command
for command in "${commands[@]}"; do
    # Run the command
    $command

    # Check the exit status
    if [ $? -eq 0 ]; then
        echo "Command '$command' executed successfully."
    else
        echo "Command '$command' failed to execute. Please check for errors."
        exit 1  # Exit the script if any command fails
    fi
done
