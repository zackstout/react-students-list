# React Students List
Copying base project from Prime's repo. Use `npm run server` to spin up the server and `npm run client` to spin up the client.

Note to self: do *not* mess with the value of `proxy` in the `package.json`. It seems that when you initialize your project it fixes what you write there in an irrevocable way. Or at least I couldn't revoke it.

Functionality: 
[x] Add a new GitHub username to the database, and display all users in a list on the DOM.
[x] Click on a "More Info" button for each user, pinging the GitHub API and displaying data about that user and their repos.