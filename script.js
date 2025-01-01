"use strict";

const createMonsterBtn = document.querySelector(".createMonsterBtn");
const monstersDiv = document.querySelector(".monstersDiv");
const boostBtn = document.querySelector(".boostBtn");
const heroDefense = document.querySelector(".heroDefense");
const heroHealth = document.querySelector(".heroHealth");

function heroCreator() {
  let defense = 10;
  let health = 50;

  const getDefense = () => {
    return defense;
  };

  const getHealth = () => {
    return health;
  };

  const reduceHealth = () => {
    health -= 1;
  };

  const increaseHealth = (amount) => {
    health += amount;
  };

  return { getDefense, getHealth, reduceHealth, increaseHealth };
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

let createdMonsters = 0;

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
  });
}

createMonsterBtn.addEventListener("click", spawnMonster);

let boostActive = false;

boostBtn.addEventListener("click", () => {
  if (boostActive) return;

  boostActive = true;
  const boostAmount = 20;

  hero.increaseHealth(boostAmount);
  heroHealth.textContent = hero.getHealth();

  setTimeout(() => {
    hero.increaseHealth(-boostAmount);
    heroHealth.textContent = hero.getHealth();

    boostActive = false;
  }, 10000);
});
