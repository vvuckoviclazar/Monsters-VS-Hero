"use strict";

const createMonsterBtn = document.querySelector(".createMonsterBtn");
const monstersDiv = document.querySelector(".monstersDiv");
const boostBtn = document.querySelector(".boostBtn");
const heroDefense = document.querySelector(".heroDefense");
const heroHealth = document.querySelector(".heroHealth");
const heroH1 = document.querySelector(".heroH1");
const boostDiv = document.querySelector(".boostDiv");
const IMGdiv = document.querySelector(".IMGdiv");

function heroCreator() {
  let defense = 10;
  let health = 50;
  let boostActive = false;

  const getDefense = () => {
    return defense;
  };

  const getHealth = () => {
    return health;
  };

  const reduceHealth = () => {
    health -= 10;
  };

  const increaseHealth = (amount) => {
    health += amount;
  };

  const restartHealth = () => {
    return (health = 50);
  };

  const toggleBoostActive = () => {
    boostActive = !boostActive;
    return boostActive;
  };

  const isBoostActive = () => {
    return boostActive;
  };

  const updateHeroRestartUI = () => {
    heroH1.innerHTML = `<h1 class="innerH1">HERO DEFEATED</h1>`;
    boostDiv.innerHTML = `<button class="restartBtn">RESTART</button>`;
    IMGdiv.innerHTML = `<img class="escanor" src="escanorDefeated.jpg" />`;
  };

  return {
    getDefense,
    getHealth,
    reduceHealth,
    increaseHealth,
    restartHealth,
    updateHeroRestartUI,
    toggleBoostActive,
    isBoostActive,
  };
}

const hero = heroCreator();

heroDefense.textContent = hero.getDefense();
heroHealth.textContent = hero.getHealth();

function monsterCreator() {
  let power = 20;
  let health = 1;

  const getPower = () => {
    return power;
  };

  const getHealth = () => {
    return health;
  };

  return { getPower, getHealth };
}

function getMonsterHTML() {
  return `
    <button class="attackBtn attackCSS">ATTACK</button>
    <span class="monster">
      <img
        class="monsterPic"
        src="Johnny_Worthington_III_Monsters_At_Work.webp"
        alt="Monster"
      />
    </span>
    <div class="powerDiv">
      <p class="monsterPower powerCSS"> </p>
      <p class="monsterHealth healthCSS"> </p>
    </div>`;
}

function restartGame() {
  hero.restartHealth();
  heroHealth.textContent = hero.getHealth();
  heroH1.innerHTML = `<h1 class="heroH1 heroFix">HERO</h1>`;
  IMGdiv.innerHTML = `<img class="escanor" src="escanor.jpg" />`;
  const allMonsters = document.querySelectorAll(".monsterDiv");
  allMonsters.forEach((monster) => monster.remove());
  boostBtn.removeEventListener("click", boostListener);
  boostDiv.innerHTML = `<button class="boostBtn">BOOST</button>`;

  boostBtn.addEventListener("click", boostListener);

  const allAttackButtons = document.querySelectorAll(".attackBtn");
  allAttackButtons.forEach((button) => (button.disabled = false));
}

function boostListener() {
  if (hero.isBoostActive()) return;

  hero.toggleBoostActive();
  const boostAmount = 20;

  hero.increaseHealth(boostAmount);
  heroHealth.textContent = hero.getHealth();

  setTimeout(() => {
    hero.increaseHealth(-boostAmount);

    getHeroDefeated();

    heroHealth.textContent = hero.getHealth();

    hero.toggleBoostActive();
  }, 10000);
}

function spawnMonster() {
  const monster = document.createElement("div");

  const uniqueID = crypto.randomUUID();
  monster.id = uniqueID;

  monster.classList.add("monsterDiv");

  monster.innerHTML = getMonsterHTML();

  monstersDiv.appendChild(monster);

  const monsterData = monsterCreator();

  const targetMonster = document.getElementById(uniqueID);
  const attackButton = targetMonster.querySelector(".attackBtn");
  const monsterPower = targetMonster.querySelector(".monsterPower");
  const monsterHealth = targetMonster.querySelector(".monsterHealth");

  monsterPower.textContent = `POWER: ${monsterData.getPower()}`;
  monsterHealth.textContent = `HEALTH: ${monsterData.getHealth()}`;

  attackButton.addEventListener("click", (e) => {
    hero.reduceHealth();
    heroHealth.textContent = hero.getHealth();
    targetMonster.remove();
    console.log(hero.getHealth());
    getHeroDefeated();
  });
}

function getHeroDefeated() {
  if (hero.getHealth() <= 0) {
    hero.updateHeroRestartUI();
    const allAttackButtons = document.querySelectorAll(".attackBtn");
    allAttackButtons.forEach((button) => (button.disabled = true));
  }

  const restartBtn = document.querySelector(".restartBtn");

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      restartGame();
    });
  }
}

createMonsterBtn.addEventListener("click", spawnMonster);

boostBtn.addEventListener("click", () => {
  if (hero.isBoostActive()) return;

  hero.toggleBoostActive();
  const boostAmount = 20;

  hero.increaseHealth(boostAmount);
  heroHealth.textContent = hero.getHealth();

  setTimeout(() => {
    hero.increaseHealth(-boostAmount);

    getHeroDefeated();

    heroHealth.textContent = hero.getHealth();

    hero.toggleBoostActive();
  }, 10000);
});
