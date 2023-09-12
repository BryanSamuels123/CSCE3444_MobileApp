# function to load the databases
import sqlite3
from bs4 import BeautifulSoup
import requests

def loadTeamData():
    try: 
        conn = sqlite3.connect("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/Players-Teams.db")
        cur = conn.cursor()
    except:
        print("Cannot connect to database 'loadTeamData() failed'") 
        return -1 # -1 will be the error case
    
    fh = open("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/test.html")
    
    
    # url = "https://www.nba.com/players"
    # result = requests.get(url)
    
    doc = BeautifulSoup(fh, "html.parser")
    players = doc.findAll("a", attrs={"class": "Anchor_anchor__cSc3P RosterRow_team__AunTP"})
    
    
    for index in range(len(players)):
        print(index + 1,players[index].text)
        cur.execute("INSERT OR IGNORE INTO Teams (teamAbv) VALUES (?)", (players[index].text,))
        conn.commit()

    
    
    
    
    fh.close()
    return 0

loadTeamData()




# function will be to load the player database