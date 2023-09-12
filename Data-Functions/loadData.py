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
    teams = doc.findAll("a", attrs={"class": "Anchor_anchor__cSc3P RosterRow_team__AunTP"})
    
    
    for index in range(len(teams)):
        print(index + 1,teams[index].text)
        cur.execute("INSERT OR IGNORE INTO Teams (teamAbv) VALUES (?)", (teams[index].text,))
        conn.commit()

    
    
    fh.close()
    return 0



def loadPlayerData(test):
    try: 
        conn = sqlite3.connect("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/Players-Teams.db")
        cur = conn.cursor()
    except:
        print("Cannot connect to database 'loadPlayerData()' failed") 
        return -1 # -1 will be the error case
    try:
        fh = open("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/test.html")
    except:
        print("Cannot open html file 'loadPlayerData()' failed")
        return -1
    
    doc = BeautifulSoup(fh, "html.parser")
    
    players = doc.findAll("tr")
    
    playersCleaned = []
    
    for playerIndex in range(len(players)):
        playerDict = {}
        if (playerIndex == 0):
            continue
        # data for individual player AKA row
        playerData = BeautifulSoup(str(players[playerIndex]), "html.parser")
        
        # name -- first and last delimited with a space
        try: 
            name = ""
            nameData = playerData.findAll("p")
            for index in range(len(nameData)):
                name += nameData[index].text 
                if (index != (len(nameData) - 1)):
                    name += " "
        except:
            name = "NA"
                # print(nameData[index].text)
                
            #current team
        try:
            team = playerData.find("a", attrs={"class": "Anchor_anchor__cSc3P RosterRow_team__AunTP"}).text
        except: 
            team = "NA"
            # print(team.text)
            
            #rest of the data
            
        otherData = playerData.findAll("td")
        try: 
            jerseyNumber = otherData[2].text
        except:
            jerseyNumber = "NA"
            
            
        try: 
            position = otherData[3].text
        except:
            position = "NA"
            
            
        try:
            height = otherData[4].text
        except:
            height = "NA"
        
        try:
            weight = str(otherData[5].text)
            weight = int(weight.split(" ")[0])
        except:
            weight = -1
            
        checks = [name, team, jerseyNumber, position, height, weight]
        for index in range(len(checks)):
            if ((len(str(checks[index])) == 0) and (type(checks[index]) != int)):
                checks[index] = "NA"
                # print("true")
        
        playerDict["name"] = checks[0]
        playerDict["team"] = checks[1]
        playerDict["jerseyNumber"] = checks[2]
        playerDict["position"] = checks[3]
        playerDict["height"] = checks[4]
        playerDict["weight"] = checks[5] 
        
        playersCleaned.append(playerDict)
        
        # print(name, team, jerseyNumber, position, height, weight)
        
        if (test == 1):
            for item in playerDict:
                if (len(str(playerDict[item])) == 0):
                    playerDict[item] = "NA"
                if (playerDict[item] == "NA" or playerDict[item] == -1):
                    with open("errorLog2.html", "a") as fh:
                        fh.write(f"name: {playerDict['name']} team: { playerDict['team']} jerseyNumber: { playerDict['jerseyNumber']} position: { playerDict['position']} height: { playerDict['height']} weight: { playerDict['weight']}")
                        fh.write("\n\n")
                        break
        
    
    
    # for index in range(len(playersCleaned)):
    #     for item in playersCleaned[index]:
    #         print(playersCleaned[index][item], end=" ")
    #     print()
    for player in (playersCleaned):
        if (player["team"] == "NA"):
            cur.execute("Insert into ")
        # for item in playersCleaned[index]:
        #     if (item == "team"):
        #         if (playersCleaned[index][item] == "NA"):
        #             cur
        
                        
    return 0
    


# loadPlayerData(0)





# function will be to load the player database