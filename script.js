const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");
const replayBtn = document.getElementById("replay");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");

const heartsContainer = document.getElementById("hearts");
const petalsContainer = document.getElementById("petals");


/* =====================================================
   NO BUTTON
===================================================== */

let noCount = 0;
let yesScale = 1;

const noResponses = [
    "Are you sure? 😅",
    "Really? 🥺",
    "Think again... 🤨",
    "Wait... what?! 😭",
    "Please reconsider 🥹",
    "That hurts a little 💔",
    "Are you REALLY sure? 👀",
    "Maybe press YES instead? 👉👈",
    "Wrong button 😌",
    "I don't think you mean that 😭",
    "Nice try 😂",
    "You almost got me! 😳",
    "Nope nope nope 😤",
    "I'm too fast 😎",
    "You can't catch me! 🏃‍♂️",
    "Why are you doing this to me? 🥺",
    "One more chance? 💕",
    "I'll pretend you didn't click that 😌",
    "Let's try that again...",
    "Come onnnn 🥹👉👈",
    "You're breaking my heart 💔",
    "This is getting awkward 😭",
    "The YES button looks nicer 👀",
    "I know you want to say YES 😏",
    "Okay, now you're just teasing me 😂",
    "STOP TRYING TO CLICK ME 😭",
    "Fine... I'll keep running 🏃",
    "You really won't give up, huh? 😂",
    "Last last last chance! 💕",
    "Okay, seriously... YES? 🥺"
];


/* =====================================================
   CHANGE NO TEXT
===================================================== */

function changeNoText() {

    noBtn.textContent =
        noResponses[
            noCount % noResponses.length
        ];

    noCount++;
}


/* =====================================================
   MOVE NO BUTTON
===================================================== */

function moveNoButton() {

    changeNoText();


    /*
      Make YES bigger every time
      she tries to press NO.
    */

    yesScale += 0.08;

    if (yesScale > 2.2) {
        yesScale = 2.2;
    }

    yesBtn.style.transform =
        `scale(${yesScale})`;


    /*
      Calculate button dimensions.
    */

    const buttonWidth =
        noBtn.offsetWidth;

    const buttonHeight =
        noBtn.offsetHeight;


    const padding = 25;


    /*
      Keep button completely
      inside the viewport.
    */

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;


    const x =
        padding +
        Math.random() *
        Math.max(
            1,
            maxX - padding
        );


    const y =
        padding +
        Math.random() *
        Math.max(
            1,
            maxY - padding
        );


    noBtn.style.position = "fixed";

    noBtn.style.left =
        `${x}px`;

    noBtn.style.top =
        `${y}px`;


    /*
      Small rotation makes it
      feel more playful.
    */

    const rotation =
        -8 +
        Math.random() * 16;

    noBtn.style.transform =
        `rotate(${rotation}deg)`;


    /*
      Change background color
      occasionally.
    */

    const colors = [
        "#eee8ee",
        "#ffe4ed",
        "#e9e2f3",
        "#f5e1e9",
        "#e8edf7"
    ];

    noBtn.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    /*
      Little vibration effect.
    */

    noBtn.animate(
        [
            {
                transform:
                    `translateX(-4px)
                     rotate(${rotation}deg)`
            },
            {
                transform:
                    `translateX(4px)
                     rotate(${rotation}deg)`
            },
            {
                transform:
                    `translateX(0)
                     rotate(${rotation}deg)`
            }
        ],
        {
            duration: 180
        }
    );
}


/* =====================================================
   DESKTOP
===================================================== */

/*
  Instead of waiting for mouseenter,
  detect the cursor getting close.
*/

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            noBtn.style.position !==
            "fixed"
        ) {
            return;
        }


        const rect =
            noBtn.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;

        const centerY =
            rect.top +
            rect.height / 2;


        const distance =
            Math.sqrt(
                Math.pow(
                    event.clientX -
                    centerX,
                    2
                ) +
                Math.pow(
                    event.clientY -
                    centerY,
                    2
                )
            );


        /*
          If cursor gets within
          70px, RUN.
        */

        if (distance < 70) {
            moveNoButton();
        }

    }
);


/*
  Also keep mouseenter as a backup.
*/

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


/* =====================================================
   MOBILE / TOUCH
===================================================== */

noBtn.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/*
  Prevent an actual click.
*/

noBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        moveNoButton();

    }
);


/* =====================================================
   YES BUTTON
===================================================== */

yesBtn.addEventListener(
    "click",
    () => {

        questionCard.classList.add(
            "hidden"
        );

        successCard.classList.remove(
            "hidden"
        );


        /*
          Remove the escaped NO button
          from the screen.
        */

        noBtn.style.display =
            "none";


        createCelebration();

    }
);


/* =====================================================
   REPLAY
===================================================== */

if (replayBtn) {

    replayBtn.addEventListener(
        "click",
        () => {
            location.reload();
        }
    );

}


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;


musicBtn.addEventListener(
    "click",
    async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

                musicBtn.textContent =
                    "🎶";

                musicStatus.textContent =
                    "Music playing 💕";

            } else {

                music.pause();

                musicPlaying = false;

                musicBtn.textContent =
                    "🎵";

                musicStatus.textContent =
                    "Play music";

            }

        } catch (error) {

            console.log(
                "Music error:",
                error
            );

            musicStatus.textContent =
                "Couldn't play music";

        }

    }
);


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "heart";


    const heartTypes = [
        "♡",
        "♥",
        "💕",
        "💗",
        "💖"
    ];


    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}vw`;


    heart.style.fontSize =
        `${12 + Math.random() * 18}px`;


    heart.style.animationDuration =
        `${6 + Math.random() * 6}s`;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => {
            heart.remove();
        },
        13000
    );
}


setInterval(
    createHeart,
    750
);


/* =====================================================
   CHERRY BLOSSOM PETALS
===================================================== */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className =
        "petal";


    petal.style.left =
        `${Math.random() * 100}vw`;


    petal.style.width =
        `${8 + Math.random() * 7}px`;


    petal.style.height =
        `${12 + Math.random() * 8}px`;


    petal.style.animationDuration =
        `${5 + Math.random() * 7}s`;


    petalsContainer.appendChild(
        petal
    );


    setTimeout(
        () => {
            petal.remove();
        },
        14000
    );
}


setInterval(
    createPetal,
    600
);


/* =====================================================
   CELEBRATION
===================================================== */

function createCelebration() {

    /*
      Big burst of hearts.
    */

    for (
        let i = 0;
        i < 40;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 70
        );

    }


    /*
      Cherry blossoms too.
    */

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 60
        );

    }

}


/* =====================================================
   INITIAL DECORATIONS
===================================================== */

for (
    let i = 0;
    i < 10;
    i++
) {

    setTimeout(
        createHeart,
        i * 220
    );

}


for (
    let i = 0;
    i < 12;
    i++
) {

    setTimeout(
        createPetal,
        i * 180
    );

}
