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
    fields = ["PLAYER_ID","TEAM_ID","AGE","GAMES_PLAYED","WINS","LOSSES","MINS","PTS","FGM","FGA","FG_PERCENT","THREEPM","THREEPA","THREEP_PERCENT","FTM","FTA", "FT_PERCENT","OREB","DREB","REB","AST","TOV","STL","BLK","PF","FANTASY_POINTS","DD2","DD3","PLUS_MINUS"]
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
        
        # uncomment this to run it
        # cur.execute("INSERT OR IGNORE INTO StatsPerGame2022_2023 ('PLAYER_ID','TEAM_ID', 'AGE','GAMES_PLAYED','WINS','LOSSES','MINS','PTS','FGM','FGA','FG_PERCENT','THREEPM','THREEPA', 'THREEP_PERCENT','FTM','FTA', 'FT_PERCENT','OREB','DREB','REB','AST','TOV','STL','BLK','PF','FANTASY_POINTS','DD2','DD3','PLUS_MINUS') values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (items[0],items[1],items[2],items[3],items[4],items[5],items[6],items[7],items[8],items[9],items[10],items[11],items[12],items[13],items[14],items[15],items[16],items[17],items[18],items[19],items[20],items[21],items[22],items[23],items[24],items[25],items[26],items[27],items[28],))
        # conn.commit()
        
        # print(items[0])
        # print(len(fields), len(items))
        
        for index in range(len(items)):
            print(items[index], end=" ")
        print()
        
        cur.close()
                

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

#function to save player headshot images
#file paths have been removed to avoid overwriting
# had to make some edits to the logic to use for the server instead
def loadHeadShots():
    try: 
        conn = sqlite3.connect("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/mobile_app/Data-Functions/Players-Teams.db")
        cur = conn.cursor()
    except:
        print("Cannot connect to database 'loadPlayerData()' failed") 
        return -1 # -1 will be the error case
    
    fh = open("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/mobile_app/Data-Functions/test.html")
    doc = BeautifulSoup(fh, "html.parser")
    playerImagesRaw = doc.findAll("img", attrs={"class": "PlayerImage_image__wH_YX PlayerImage_round__bIjPr"})
    # print(playerImagesRaw[0])
    print("[", end="")
    for img in playerImagesRaw:
        rawName = img.get("alt").split(" ")
        name = ""
        for index in range(len(rawName)): 
            # print(range(len(rawName)))
            if (index == len(rawName) -1):
                break
            name += rawName[index]
            name += " "
        finName = name.strip()
        
        idTup  = cur.execute("Select id from Players where playerName=(?)", (finName,)).fetchone()
        # print(cur.fetchone())
        if(idTup == None):
            # print("error:", finName)
            # with open("", "a") as meh:
            #     finName += "\n"
            #     meh.write(finName)
            continue
        else:
            # print(finName, end=": ")
            id = "{id:" + str(idTup[0]) + ", "
            print(id,end="")
            finName = "name: '" + finName + "', "
            print(finName)
            src = "src: '" +img.get("src") + "'}, "
            print(src, end="")
            # respImage = requests.get(src)
            
            # if respImage.status_code == 200:
            #     path = ""
            #     path += f"/headShot-{id}.png"
            #     with open(path, "wb") as nFile:
            #         nFile.write(respImage.content)
            #     cur.execute("UPDATE Players SET playerHeadshot=(?) WHERE id=(?)", (f"/headShot-{id}.png", id,))
            #     conn.commit()
    conn.close()
    fh.close
    print("]")

def getTeamLogo():
    fh = open("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/mobile_app/Data-Functions/test1.html")
    doc = BeautifulSoup(fh, "html.parser")
    logos = doc.findAll("img", attrs={"class": "TeamLogo_logo__PclAJ"})
    nLogos = list()
    print("[", end="")
    for logo in logos:
        name = logo.get("alt").split(" ")
        src = logo.get("src")
        name = name[0] +" "+ name[1]
        if {"teamName": name, "src": src} not in nLogos:
            nLogos.append({"teamName": name, "src": src})
    print(nLogos)
    
def checkDb():
    try:
        conn = sqlite3.connect("/Users/bryan/Desktop/CSCE/projects/CSCE-3444/mobile_app/Data-Functions/Players-TeamsOnServer.db")
        cur = conn.cursor()
    except:
        print("Cannot connect to database")
        return -1

    data = list()
    coolData = list()  
    finData = list()  
    
    # data = cur.execute("Select * from Players").fetchall()
    
    # coolData = cur.execute("Select  Players.*, Teams.teamName, Teams.teamAbv, StatsPerGame2022_2023.PTS, StatsPerGame2022_2023.AST, StatsPerGame2022_2023.REB, StatsPerGame2022_2023.FG_PERCENT, StatsPerGame2022_2023.TOV, StatsPerGame2022_2023.PLUS_MINUS  from   Players  INNER JOIN StatsPerGame2022_2023 On StatsPerGame2022_2023.PLAYER_ID = Players.id INNER JOIN Teams On Players.currentTeam = Teams.id").fetchall()
    # # print(len(data))
    # # print(len(coolData))

    # check = False
    
    # for item in data:
       
    #     for nitem in coolData:
    #         # print (nitem[1], item[1])
    #         # return
    #         if item[1] == nitem[1]:
    #             check = True
    #             break
    #     if (check == False):
    #         finData.append(item)
    #     check = False
    finData = [7, 19, 21, 24, 34, 37, 45, 48, 50, 51, 56, 61, 66, 69, 74, 77, 81, 89, 96, 97, 102, 103, 107, 114, 115, 122, 133, 153, 154, 162, 163, 164, 166, 167, 170, 173, 177, 180, 186, 200, 201, 204, 218, 220, 224, 225, 226, 231, 232, 237, 238, 243, 255, 259, 261, 263, 264, 272, 275, 291, 292, 315, 316, 318, 321, 323, 330, 340, 346, 358, 361, 363, 364, 365, 366, 377, 387, 394, 397, 399, 405, 406, 414, 419, 420, 421, 422, 426, 430, 442, 452, 467, 472, 473, 476, 479, 483, 488, 492, 494, 495, 496, 501, 504, 508, 519, 520, 522, 526, 528, 532, 533, 536, 539, 543, 546, 552, 553, 555, 556, 565, 571, 572, 589, 593]
    # print(len(finData))
    for item in finData:
        # cur.execute("Update StatsPerGame2022_2023 set PTS='NA', AST='NA', REB='NA', FG_PERCENT='NA', TOV='NA', PLUS_MINUS='NA' where PLAYER_ID=(?)", (item,))
        # conn.commit()
        print(item)
    
    conn.close()
        
# checkDb()
    # for logo in logos:
    #     name 
# getTeamLogo()

# function will be to load the player database