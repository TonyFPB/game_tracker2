# Game Tracker

## POST/games
- Must have a body in format
```
body: {userName: "Name user", game:"Game name", type:"Game type"}
```

## GET/games
- Can receive a query called game
- If the query exists, it looks for the games that look like the query 
- If you don't send a query it does a search for all games
```
/games

or

/games?game=gameName
```

## PUT/games/:user_id/:game_id
- Only change the completed status to  **true**
- If the status is already **true** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404

## DELETE/games/:user_id/:game_id
- Only deletes if the completed status is **true**
- If the status is **false** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404

