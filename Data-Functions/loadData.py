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
    cur.close()
    return 0



def loadPlayerData(test):
    #open required databases and files
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
    
    # load data into the database
    try: 
        for player in (playersCleaned):
            temp = cur.execute("Select id from Teams where teamAbv = (?)", (player["team"],))
            teamID = str(temp.fetchone()[0])
            cur.execute("Insert into Players (playerName, currentTeam, jerseyNumber, position, height, weight) values (?,?,?,?,?,?)", (player["name"], teamID, player["jerseyNumber"], player["position"], player["height"], player["weight"],))
            conn.commit()
    except:
        print("Error Loading the playerData")
        return -1
        
    cur.close() 
    fh.close()       
    return 0
    

def loadPlayerStats():
    #open required databases and files
    fields = ["PLAYER_ID","TEAM_ID","AGE","GAMES_PLAYED","WINS","LOSSES","MINS","PTS","FGM","FGA","FG_PERCENT","THREEPM","THREEPA","","FTM","FTA", "FT_PERCENT","OREB","DREB","REB","AST","TOV","STL","BLK","PF","FANTASY_POINTS","DD2","DD3","PLUS_MINUS"]
    try: 
        conn = sqlite3.connect("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/Players-Teams.db")
        cur = conn.cursor()
    except:
        print("Cannot connect to database 'loadPlayerData()' failed") 
        return -1 # -1 will be the error case
    try:
        fh = open("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/Data-Functions/statsPage.html")
    except:
        print("Cannot open html file 'loadPlayerData()' failed")
        return -1
    
    doc = BeautifulSoup(fh, "html.parser")
    
    playerTable = doc.find("tbody", attrs={"class": "Crom_body__UYOcU"})
    # playesData = BeautifulSoup(str(playerTable), "html.parser")
    players = playerTable.findAll("tr")
    
    def getATagData(lst, num):
        try:
            tempStream = BeautifulSoup(str(lst[num]), "html.parser")
            item = tempStream.find("a").text
            return item
        
        except:
            with open("statsErrors.txt", "a") as fh:
                fh.write(f"'{name}',")
            return ""
    
    def getData(list, index):
        try:
            item = list[index].text
            # print(item, name)
            return item
        except:
            with open("statsErrors.txt", "a") as fh:
                fh.write(f"'{item}',")
            return ""
            
    
    for playerIndex in range(len(players)):
        playerDataStream = BeautifulSoup(str(players[playerIndex]), "html.parser")
        playerData = playerDataStream.findAll("td")
        
        items = list()
        
        
        #name_id
        try: 
            tempStream = BeautifulSoup(str(playerData[1]), "html.parser")
            name = tempStream.find("a").text
            name_id = cur.execute("Select id from Players where playerName =(?)", (name,)).fetchone()[0]
            items.append(name_id)
            # print(name_id, name)
            
        except:
            with open("statsErrors.txt", "a") as fh:
                fh.write(f"'{name}',")
        try:
        # team_id
            tempStream = BeautifulSoup(str(playerData[2]), "html.parser")
            team = tempStream.find("a").text
            team_id = cur.execute("Select id from Teams where teamAbv =(?)", (team,)).fetchone()[0]
            items.append(team_id)
            # print(team_id, name)
        except:
            with open("statsErrors.txt", "a") as fh:
                fh.write(f"'{name}',")
                
        for cellIndex in range(len(playerData)):
            if (cellIndex < 3):
                continue
            item = getData(playerData, cellIndex)
            if (len(item) == 0):
                item = getATagData(playerData, cellIndex)
            items.append(item)
        print(name, end=" ")
        
        # items is the same length as the terms list should all line up
        # cur.execute("INSERT OR IGNORE INTO StatsPerGame2022_2023 ('PLAYER_ID','TEAM_ID', 'AGE','GAMES_PLAYED','WINS','LOSSES','MINS','PTS','FGM','FGA','FG_PERCENT','THREEPM','THREEPA','FTM','FTA', 'FT_PERCENT','OREB','DREB','REB','AST','TOV','STL','BLK','PF','FANTASY_POINTS','DD2','DD3','PLUS_MINUS') values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (items[0],items[1],items[2],items[3],items[4],items[5],items[6],items[7],items[8],items[9],items[10],items[11],items[12],items[13],items[14],items[15],items[16],items[17],items[18],items[19],items[20],items[21],items[22],items[23],items[24],items[25],items[26],items[27],items[28],items[29],))
        # conn.commit()
        print(items[0])
        # print(len(fields), len(items))
        
        # for index in range(len(items)):
        #     print(items[index], end=" ")
        # print()
                

            
        
                
            
            
        
        
        
        
        
        
        
        # try:
        #     team = playerData.find("a", attrs={"class": "Anchor_anchor__cSc3P RosterRow_team__AunTP"}).text
        # except: 
        #     team = "NA"

def loadExtra():
    names = ['Juan Toscano-Anderson','KZ Okpala','Matthew Dellavedova','Noah Vonleh','Daishen Nix','John Wall','Justin Jackson','Vit Krejci','Frank Kaminsky','Hamidou Diallo','PJ Dozier','Serge Ibaka','Tyrese Martin','Bryn Forbes','R.J. Hampton','Ryan Arcidiacono','Leandro Bolmaro','Vernon Carey Jr.','Boban Marjanovic','Jarrett Culver','Kemba Walker','Stanley Johnson','Tony Bradley','Malcolm Hill','Rodney McGruder','Gorgui Dieng','Joshua Primo','Marko Simonovic','Trevor Keels','Facundo Campazzo','Sterling Brown','Trevelin Queen','Tyler Dorsey','Alize Johnson','Chima Moneke','Chris Silva','Deonte Burton','Devon Dotson','Donovan Williams','Jordan Hall','Kobi Simmons','Michael Foster Jr.','Skylar Mays','Chance Comanche','Frank Jackson','Jarrell Brantley','Jordan Schakel','Justin Minaya','RaiQuan Gray','Xavier Sneed']
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
    
    for name in names:
        cur.execute("Insert or IGNORE into Players  (playerName,  currentTeam, jerseyNumber,  position, height, weight) values (?, ?, ?, ?, ?, ?)", (name, "NA", "NA", "NA", "NA", -1,))
        conn.commit()
    
    cur.close()
    return 0

loadPlayerStats()




# function will be to load the player database