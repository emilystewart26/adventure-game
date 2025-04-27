let kudos = 0;
let beers = 100;
let cash = 50;
let currentSong = 0;
let battling;
let guitaristHealth;
let repertoire = ["Wonderwall"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const kudosText = document.querySelector("#kudosText");
const beersText = document.querySelector("#beersText");
const cashText = document.querySelector("#cashText");
const guitaristStats = document.querySelector("#guitaristStats");
const guitaristNameText = document.querySelector("#guitaristName");
const guitaristHealthText = document.querySelector("#guitaristHealth");

const songs = [
    {
        name: "Wonderwall",
        power: 5
    },
    {
        name: "Smoke on the Water",
        power: 30
    },
    {
        name: "Sweet Child O' Mine",
        power: 50
    },
    {
        name: "Thunderstruck",
        power: 100
    },
];

const guitarists = [
    {
        name: "Slash",
        level: 2,
        beers: 15

    },
    {
        name: "Angus Young",
        level: 8,
        beers: 60
    },
    {
        name: "guitarist backstage",
        level: 20,
        beers: 300
    },
]

const locations = [
    {
        name: "pyramid stage",
        "button text": ["Go to bar", "Go to Other Stage", "Sneak backstage"],
        "button functions": [goBar, goOther, sneakBackstage],
        text: "You are at the Pyramid Stage. You see a large sign that says \"bar\" above a massive circus-style tent, and to the left, music from the Other Stage is drifting across."
    },
    {
        name: "bar",
        "button text": ["Buy beers", "Talk to musician", "Go back to Pyramid Stage"],
        "button functions": [buyBeers, learnSong, goPyramid],
        text: "You enter the bar tent and peer around, eyes adjusting from the bright sunshine outside. To your right you can see the bar, made up of massive metal kegs with chalkboards listing the delcious local beers on draught. There's an offer on: 10 cans for 10 cash. Festival-goers clad in sequins are talking excitedly about the set they just saw at the John Peel stage, whilst three men in banana suits and oversized sunglasses call out to start a conga line. It's pleasantly warm, you can smell feshly cut grass and the faint smell of barbeque drifting across from a nearby food van. Towards the back of the tent you see a small stage and microphone set up, and someone tuning up their acoustic guitar ready to perform"
    },
    {
        name: "other stage",
        "button text": ["Battle Guitarist 1", "Battle Guitarist 2", "Go to Pyramid Stage"],
        "button functions": [battleGuitarist, battleGuitarist2, goPyramid],
        text: "You follow the throng of excited festival-goers past the Bandstand and across the bridge. Looming tall above you, the Other Stage comes slowly into view. There is a band performing. Music pumps loudly from the gigantic speaker stack either side of the stage, whilst a spectacular light show drives the crowd wild. You push your way through the crowd until you are right at the front, looking up at the performers on stage. Suddenly, one of them reaches into the crowd and before you know it you have been pulled on stage - you have been challeged to a riff-off!"
    },
    {
        name: "battle",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goPyramid],
        text: "You are in a guitar battle!"
    },
    {
        name: "beat guitarist",
        "button text": ["Go to Pyramid Stage", "Go to Pyramid Stage", "Go to Pyramid Stage"],
        "button functions": [goPyramid, goPyramid, goPyramid],
        text: "The guitarist screams as their face is melted by your supreme shredding. You gain kudos and earn some cash."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You die."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "The promoters look at you wide eyed and open mouthed. They've never witnessed a performance like it! You better get on stage for soundcheck, you're on in 5 minutes!! You win the game!"
    },

]

// initialise buttons

button1.onclick = goBar;
button2.onclick = goOther;
button3.onclick = sneakBackstage;

function update(location) {
    guitaristStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goPyramid() {
    update(locations[0]);
}

function goBar() {
    update(locations[1]);
}

function goOther() {
    update(locations[2])
}



function buyBeers() {
    if (cash >= 10) {
        cash -= 10;
        beers += 10;
        cashText.innerText = cash;
        beersText.innerText = beers;  
    } else {
        text.innerText = "You do not have enough cash to buy beers."
    }
   
}

function learnSong() {
    if (currentSong < songs.length - 1) {
       if (cash >= 30) {
        cash -= 30;
        currentSong++;
        cashText.innerText = cash;
        let newSong = songs[currentSong].name;
        text.innerText = "You approach the musician. You share stories of past festivals and she offers to teach you a new song. You accept. You can now play " + newSong + "! You drop some cash in her case as a thank you." ;
        repertoire.push(newSong);
        text.innerText += " In your repertoire you now have: " + repertoire;
    } else {
        text.innerText = "You approach the musican and notice her guitar case open on the ground in front of her. You don't have enough cash to drop in, so decide not to bother her. Shame. She's very talented, she may have been able to teach you a thing or two!";
    }   
    } else {
        text.innerText = "You already know the most powerful song!";
        button2.innerText = "Teach song for 15 cash";
        button2.onclick = teachSong;
    }
    
}

function teachSong() {
    if (repertoire.length > 1) {
        cash += 15;
        cashText.innerText = cash;
        let currentSong = repertoire.shift()
        text.innerText = "You sold a " + currentSong + ".";
        text.innerText += " In your repertoire you have: " + repertoire;
    } else {
        text.innerText = "Don't teach your only song!";
    }

}


function battleGuitarist() {
    battling = 0;
    goBattle();
    
}

function battleGuitarist2() {
    battling = 1;
    goBattle();

}

function sneakBackstage() {
    battling = 2;
    goBattle();
    
}

function goBattle() {
    update(locations[3]);
    guitaristHealth = guitarists[battling].beers;
    guitaristStats.style.display = "block";
    guitaristNameText.innerText = guitarists[battling].name;
    guitaristHealthText.innerText = guitaristHealth;
}

function attack() {
    text.innerText = guitarists[battling].name + " plays a mighty riff. You stagger backwards from the sonic intensity and drop some of your beer cans.";
    text.innerText += " You counter by playing " + songs[currentSong].name + ".";
    
    if (isGuitaristHit(beers)) {
        beers -= getGuitaristAttackValue(guitarists[battling].level);
    } else {
		text.innerText += " Your performance falls flat.";
	}
    
    guitaristHealth -= songs[currentSong].power + Math.floor(Math.random() * kudos) + 1;
	beersText.innerText = beers;
	guitaristHealthText.innerText = guitaristHealth;   
	if (beers <= 0) {
		lose();
	} else if (guitaristHealth <= 0) {
		battling === 2 ? winGame() : defeatGuitarist();
	}

	if (Math.random() <= .1 && repertoire.length !== 1) {
        text.innerText += " Your guitar string breaks mid-solo! You manage to fix it, but completely forget how to play " + repertoire.pop() + " in the chaos.";
        currentSong--;
	}
}

function getGuitaristAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * kudos));
    console.log(hit);
    return hit;
}

function isGuitaristHit(beers) {
    return Math.random() > .2 || beers < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + guitarists[battling].name + ".";
}

function defeatGuitarist() {
    cash += Math.floor(guitarists[battling].level * 6.7);
    kudos += guitarists[battling].level;
    cashText.innerText = cash;
    kudosText.innerText = kudos;
    update(locations[4])
}

function lose() {
    update(locations[5])
}

function winGame() {
    update(locations[6]);
}

function restart() {
    kudos = 0;
    beers = 100;
    cash = 50;
    currentSong = 0;
    repertoire = ["Wonderwall"];
    cashText.innerText = cash;
    beersText.innerText = beers;
    kudosText.innerText = kudos;
    goPyramid();
}