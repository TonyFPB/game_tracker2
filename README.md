# Game Tracker

## POST/games
- Must have a body in format
```
body: {userName: string, game: string, type: string }
```
- If the user does not exists will return error status 404
- If user already have the game will return error status 409

## GET/games
- Can receive a query called game
- If the query exists, it looks for the games that look like the query 
- If you don't send a query it does a search for all games
```
/games

or

/games?game=gameName
```

## GET/games/:user_id
- If the user does not exist it will return error status 404
- If the user has no games, it will return error status 404
- Will return the games from user

## PUT/games/:user_id/:game_id
- Only change the completed status to  **true**
- If the status is already **true** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404
- If the user doesn't have the game or not user does not exists will return a error 404

## DELETE/games/:user_id/:game_id
- Only deletes if the completed status is **true**
- If the status is **false** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404
- If the user doesn't have the game or not user does not exists will return a error 404


## POST/users
```
body: {name: string}
```
- If the user already exists it will give a conflict error 
- Will return status 201 if correct

## GET/users
```
body: {name: string}
```
- If the user does not exist it will return status 404
- Will return user if it exists

