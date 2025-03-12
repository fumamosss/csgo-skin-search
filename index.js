const inputWeapon = document.querySelector('#weaponName');
const divOutput = document.querySelector('#output');

function fetchData() {
    divOutput.innerHTML = '';
    const inputWeaponName = inputWeapon.value;

    if (inputWeaponName === '') {
        return;
    }

    const url = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';

    fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            let result = '';
            data.filter((obj) => {
                const weaponName = obj.name.split('|')[0];
                const skinName = obj.name.split('|')[1];
                const rarity = obj.rarity.name;
                const rarityClass = obj.rarity.id;

                if (obj.name.split('|')[0].includes(inputWeaponName)) {
                    result += `<div class='item ${rarityClass}'>
                    <div class='info'>
                    <img src='${obj.image}'/>
                    <div class='name'>${weaponName}</div>
                    <div class='skin'>${skinName}</div>
                    </div>
                    <div class='rarity'>${rarity}</div>
                    </div>`;
                }
            });
            divOutput.innerHTML += result;
        })
        .catch((error) => console.error(error));
}

inputWeapon.addEventListener('change', () => fetchData());
