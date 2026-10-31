const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Find the input field (use a locator like window.locator('#todo-input')).
    const todoInput = window.locator('#todo-input');
    // 2. Type the `taskText` into it.
    todoInput.fill(taskText);
    // 3. Find and click the "Add" button.
    await window.locator('#add-todo-btn').click();


    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list. A good locator might be `window.locator('.todo-item')`.
    const newItem = window.locator('.todo-item');
    await expect(newItem).toHaveCount(1);
    // 2. Assert that its text content contains the `taskText`.
    await expect(newItem).toContainText(taskText);
    

    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox within the new todo item.
    await newItem.locator('input[type="checkbox"]').check();
    // 2. Click the checkbox.
    // 3. Assert that the todo item now has the 'completed' class.
    await expect(newItem).toHaveClass(/completed/);


    // --- TODO: Task 4: Delete the todo item ---
    // 1. Find the delete button within the todo item.
    await newItem.locator('.delete-btn').click();
    // 2. Click the delete button.
    // 3. Assert that the todo item is no longer visible on the page.
    await expect(newItem).toHaveCount(0);


    // Close the app
    await electronApp.close();
});
