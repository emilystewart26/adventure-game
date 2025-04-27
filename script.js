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
        name: " Smoke on the Water",
        power: 30
    },
    {
        name: " Sweet Child O' Mine",
        power: 50
    },
    {
        name: " Thunderstruck",
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
        name: "Jimi Hendrix",
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
        text: "You step into the tent, blinking as the bright festival sun fades behind you and your eyes adjust. The air is thick with laughter and spilled beer. Festival-goers clad in sequins are chattering excitedly about the set they just saw at the John Peel stage, whilst three men in banana suits weave through the crowd, shouting gleefully for others to join an impromptu conga line.\n\n To your right you can see the bar, made up of massive metal kegs with chalkboards boasting the finest local beers on draught. There's an offer on: 10 cans for 10 cash. \n\n Toward the far end of the tent, a small stage glitters under fairy lights. You make out the figure of someone tuning their acoustic guitar, ready to perform."
    },
    {
        name: "other stage",
        "button text": ["Bring it on!", "Go to West Holts Stage", "Go back to Pyramid Stage"],
        "button functions": [battleGuitarist, goWestHolts, goPyramid],
        text: "You follow the surge of festival-goers past the Bandstand and over the bridge. Towering above the crowd, the Other Stage looms into view. \n\n A band tears into their set, thunderous riffs blasting from colossal speaker stacks. Beams of colour slash through the air, driving the crowd into a frenzy. \n\n Fighting your way to the front, you find yourself looking up at the performers on stage. Suddenly, a hand darts out from above — grabbing you. \n\n In a blink, you’re hauled onto the stage. \n\n You’ve been challenged to a riff-off!"
    },
    {
        name: "battle",
        "button text": ["Battle!", "Guitar solo!", "Actually..."],
        "button functions": [attack, guitarSolo, goPyramid],
        text: "You are on stage, face to face with a guitar legend. The crowd has gone silent. This is your chance to show those promoters what you're made of! What do you do?"
    },
    {
        name: "beat guitarist",
        "button text": ["Go to Pyramid Stage", "Go to West Holts Stage", "Go to the bar"],
        "button functions": [goPyramid, goWestHolts, goBar],
        text: "The guitarist screams as their face is melted by your supreme shredding. You gain kudos and earn some cash. Where would you like to go now?"
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "The final notes of their mighty riff crashes over you like a wave. You feel your knees buckling beneath you - luckily a roadie rushes over just in time to break your fall! \n\n Overwhelmed and exhausted, you reach for a beer, only to realise you have none left. With nothing left to give, you stagger back to your tent for the night, defeated. \n\n Oh well. You can always try and get on the bill tomorrow night instead."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You approach the stage and notice a gate to the right marked ARTISTS ONLY. You unclip it and walk through.\n\n An important looking woman with a clipboard and headset instantly clocks you. 'What are you doing back here?!!', she snaps. 'You better get on stage for soundcheck, you're on in 5 minutes!!' \n\n Congratulations, you earned yourself a spot on the bill!"
    },
    {
        name: "west holts stage",
        "button text": ["Bring it on!", "Go to Other Stage", "Go to Pyramid Stage"],
        "button functions": [battleGuitarist2, goOther, goPyramid],
        text: "You head east, weaving through rows of colourful food trucks, each one offering a tantalising mix of delicious smells. The warm air hums with the beat of distant dance music, while the soft tinkling of windchimes from nearby stalls blends with the chatter of festival-goers rushing to catch the next set. The West Holts Stage comes into view, enveloped in a sea of people. The vibe is electric - a funk band is playing, with carnival dancers shimmying to the punchy music, their vibrant costumes sparkling in the sunlight. \n\n Pushing through the crowd, you find yourself right in front of the stage, looking up at the performers. Suddenly, a hand shoots out from the stage and grabs you by the wrist. \n\n Before you can even react, you're pulled onto the stage. \n\n You've been challenged to a riff-off!"
    },
    {
        name: "backstage",
        "button text": ["Go to Pyramid Stage", "Go to Other Stage", "Go to the bar"],
        "button functions": [goPyramid, goOther, goBar],
        text: "You approach the stage and notice a gate to the right marked ARTISTS ONLY. You unclip it and walk through. An important looking woman with a clipboard and headset instantly clocks you."
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

function goWestHolts() {
    update(locations[7])
}

function sneakBackstage() {
    update(locations[8]);
    if (kudos < 30) {
        text.innerText += " 'Get out!', she snaps. 'You don't have enough kudos to be back here! Come back when you reach 30.'";
    } else {
        winGame()
    }
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
        text.innerText = "You approach the musician. You share stories of past festivals and she offers to teach you a new song. You accept. You can now play " + newSong + "! You drop 30 cash in her case as a thank you." ;
        repertoire.push(newSong);
        text.innerText += " In your repertoire you now have: " + repertoire;
    } else {
        text.innerText = "You approach the musican and notice her guitar case open on the ground in front of her. You don't have enough cash to drop in, so decide not to bother her. Shame. She's very talented, she may have been able to teach you a thing or two!";
    }   
    } else {
        text.innerText = "You already know the most powerful song!";
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

function generateRandomBoolean() {
    return Math.random() >= 0.5;
}

function guitarSolo() {
    text.innerText = "You turn to the crowd, drop to your knees, and start to shred.";
        if (generateRandomBoolean()) {
                text.innerText += " You killed it. The crowd goes wild and the cheers can be heard across the entire site. You gain mad kudos.";
                kudos += 5;
                kudosText.innerText = kudos;
            } else {
                text.innerText += " The crowd boos and someone even throws a muddy boot at your head! This is a devastating hit to your reputation at the festival, the promoters will never put you on the bill if this carries on! You lose all kudos.";
                kudos = 0;
                kudosText.innerText = kudos;
            }
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
		defeatGuitarist();
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