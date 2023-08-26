"use strict";

import { getUsers } from "./usersRequest.js";

export async function displayUsers() {
    const table = document.getElementById("usersTable");
    
    // Remove all rows except the first one (header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    };

    const users = await getUsers();

    users.forEach((user) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = user.email;
        cell2.textContent = user.brand;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "x";
        deleteButton.setAttribute("data-email", user.email);
        cell3.appendChild(deleteButton);
    });
};

export function displayAlert(userEmail, callback) {
    const modal = document.getElementById('deleteModal');
    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');
    const exitSpan = document.querySelector("#deleteModal > div > span");

    // Set the text in the modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.querySelector('p').textContent = `¿Desea eliminar a ${userEmail}?`;

    // Show the modal
    modal.style.display = 'block';

    // Define event handler functions
    function handleConfirmClick() {
        modal.style.display = 'none';
        if (callback) {
            callback(true);
        };
        // Remove event listeners
        confirmButton.removeEventListener('click', handleConfirmClick);
        cancelButton.removeEventListener('click', handleCancelClick);
        exitSpan.removeEventListener('click', handleExitClick);
    };
    function handleCancelClick() {
        modal.style.display = 'none';
        if (callback) {
            callback(false);
        };
        // Remove event listeners
        confirmButton.removeEventListener('click', handleConfirmClick);
        cancelButton.removeEventListener('click', handleCancelClick);
        exitSpan.removeEventListener('click', handleExitClick);
    };
    function handleExitClick() {
        modal.style.display = 'none';
        if (callback) {
            callback(false);
        };
        // Remove event listeners
        confirmButton.removeEventListener('click', handleConfirmClick);
        cancelButton.removeEventListener('click', handleCancelClick);
        exitSpan.removeEventListener('click', handleExitClick);
    };

    // Add event listeners for confirm and cancel buttons
    confirmButton.addEventListener('click', handleConfirmClick);
    exitSpan.addEventListener('click', handleExitClick);
    cancelButton.addEventListener('click', handleCancelClick);
};