// Hent knap og menu-elementer
const burgerMenuButton = document.getElementById('burgerMenuButton');
const navMenu = document.getElementById('navMenu');

// Tilføj klik-event for at vise/skjule menuen
burgerMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
  }

  // Luk dropdown, hvis brugeren klikker udenfor
  window.onclick = function (event) {
    if (!event.target.matches('button')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };