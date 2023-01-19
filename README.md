<<<<<<< HEAD
# onboarding-driven-poc-ts
=======
# Game Tracker
<<<<<<< HEAD
>>>>>>> 616951b (Update README.md)
=======

## POST/games
- Must have a body in format
```
body: {name:"Game name", type:"Game type"}
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

## PUT/games/:game_id
- Only change the completed status to  **true**
- If the status is already **true** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404

## DELETE/games/:game_id
- Only deletes if the completed status is **true**
- If the status is **false** will return a error 400 with message
- If the **games_id** doesn't exisit will return a error 404



>>>>>>> b1ac447 (feat: dump and readme)
